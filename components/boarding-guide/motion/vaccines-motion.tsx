'use client';

import { useRef, type ReactNode } from 'react';
import { animateChapterHeading } from '@/components/boarding-guide/motion/chapter-heading';
import { MOTION_OK, gsap, useGSAP } from '@/lib/gsap';

/** Props for {@link VaccinesMotion}. */
export type VaccinesMotionProps = {
  children: ReactNode;
};

/**
 * Scroll choreography and micro-interactions of chapter 4 (vaccines,
 * checkpoint 1). Wrap the whole `ChapterSection`. Targets, by data attribute:
 *
 * - The chapter heading (see {@link animateChapterHeading}).
 * - `data-vaccine-item`: checklist rows rise one after the other. When a box
 *   is ticked, its check mark stamps in; when every required box is ticked,
 *   the `data-checklist-state="done"` block pops in.
 * - `data-vaccine-bacon`: Bacon pops in and shivers (the "picadinha").
 * - `data-not-accepted` with a `data-not-accepted-icon`: the list slides in
 *   and each cross spins into place.
 *
 * The checklist itself stays CSS-only; this only adds motion on top. Without
 * JavaScript or with reduced motion, everything is static and final.
 */
export function VaccinesMotion({ children }: VaccinesMotionProps): ReactNode {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const root = scope.current;
      if (!root || !contextSafe) return;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const section = root.querySelector('section');
        const revertHeading = section
          ? animateChapterHeading(section)
          : undefined;

        // Checklist rows rise one after the other.
        gsap.from(q('[data-vaccine-item]'), {
          autoAlpha: 0,
          y: 28,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: q('[data-vaccine-item]')[0] ?? root,
            start: 'top 85%',
          },
        });

        // Bacon pops in, then shivers.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: q('[data-vaccine-bacon]')[0] ?? root,
              start: 'top 85%',
            },
          })
          .from(q('[data-vaccine-bacon]'), {
            autoAlpha: 0,
            y: 40,
            scale: 0.9,
            duration: 0.7,
            ease: 'back.out(1.7)',
          })
          .to(q('[data-vaccine-bacon] img'), {
            x: 3,
            duration: 0.05,
            ease: 'none',
            yoyo: true,
            repeat: 9,
          });

        // "Not accepted" list: rows slide in, crosses spin into place.
        gsap
          .timeline({
            defaults: { ease: 'power3.out' },
            scrollTrigger: {
              trigger: q('[data-not-accepted]')[0] ?? root,
              start: 'top 85%',
            },
          })
          .from(q('[data-not-accepted]'), {
            autoAlpha: 0,
            x: 40,
            duration: 0.6,
            stagger: 0.12,
          })
          .from(
            q('[data-not-accepted-icon]'),
            {
              rotate: -180,
              scale: 0,
              duration: 0.6,
              stagger: 0.12,
              ease: 'back.out(2)',
            },
            0.1,
          );

        // Ticking a box: stamp the check mark; all required: pop the badge.
        const required = root.querySelectorAll<HTMLInputElement>(
          'input[data-required]',
        );
        const allRequired = (): boolean =>
          Array.from(required).every((input) => input.checked);
        let wasDone = allRequired();

        const onChange = contextSafe((event: Event) => {
          const input = event.target;
          if (!(input instanceof HTMLInputElement)) return;
          if (input.checked) {
            const mark = input.parentElement?.querySelector('svg');
            if (mark) {
              gsap.fromTo(
                mark,
                { scale: 0, rotate: -45 },
                { scale: 1, rotate: 0, duration: 0.45, ease: 'back.out(3)' },
              );
            }
          }
          const done = allRequired();
          if (done && !wasDone) {
            gsap.fromTo(
              q('[data-checklist-state="done"]'),
              { autoAlpha: 0, y: 16, scale: 0.92 },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: 'back.out(1.8)',
              },
            );
          }
          wasDone = done;
        });
        root.addEventListener('change', onChange);

        return () => {
          root.removeEventListener('change', onChange);
          revertHeading?.();
        };
      });
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
