'use client';

import { useRef, type ReactNode } from 'react';
import { animateChapterHeading } from '@/components/boarding-guide/motion/chapter-heading';
import { MOTION_OK, gsap, useGSAP } from '@/lib/gsap';

/** Props for {@link BagMotion}. */
export type BagMotionProps = {
  children: ReactNode;
};

/**
 * Scroll choreography and micro-interactions of chapter 7 (the bag,
 * checkpoint 3). Wrap the whole `ChapterSection`. Targets, by data attribute:
 *
 * - The chapter heading (see {@link animateChapterHeading}).
 * - `data-bag-bacon`: pops in, then hops.
 * - `data-bag-item` rows rise one after the other; `data-bag-skip` (not to
 *   bring) slides in and its `data-bag-skip-icon` cross spins.
 * - `data-bag`: the bag drops in. When an item is ticked, its icon jumps, its
 *   `data-bag-chip="<id>"` flies into the bag, the bag wobbles and the item's
 *   `data-bag-note` fades in. When the required item is ticked, the
 *   `data-checklist-state="done"` block pops in.
 * - `data-bag-rule` cards slide in, `data-bag-photo` rises and the
 *   `data-bag-alert` block pops with a short shake.
 *
 * The packer itself stays CSS-only; this only adds motion on top. Without
 * JavaScript or with reduced motion, everything is static and final.
 */
export function BagMotion({ children }: BagMotionProps): ReactNode {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const root = scope.current;
      if (!root || !contextSafe) return;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      const triggerOf = (selector: string): Element => q(selector)[0] ?? root;

      mm.add(MOTION_OK, () => {
        const section = root.querySelector('section');
        const revertHeading = section
          ? animateChapterHeading(section)
          : undefined;

        // Bacon pops in, then hops.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: triggerOf('[data-bag-bacon]'),
              start: 'top 85%',
            },
          })
          .from(q('[data-bag-bacon]'), {
            autoAlpha: 0,
            y: 40,
            scale: 0.9,
            duration: 0.7,
            ease: 'back.out(1.7)',
          })
          .to(q('[data-bag-bacon] img'), {
            y: -14,
            duration: 0.22,
            ease: 'power2.out',
            yoyo: true,
            repeat: 3,
          });

        // Items rise; "not to bring" slides in with a spinning cross.
        gsap.from(q('[data-bag-item]'), {
          autoAlpha: 0,
          y: 28,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: triggerOf('[data-bag-item]'),
            start: 'top 85%',
          },
        });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: triggerOf('[data-bag-skip]'),
              start: 'top 85%',
            },
          })
          .from(q('[data-bag-skip]'), {
            autoAlpha: 0,
            x: 40,
            duration: 0.6,
            ease: 'power3.out',
          })
          .from(
            q('[data-bag-skip-icon]'),
            { rotate: -180, scale: 0, duration: 0.6, ease: 'back.out(2)' },
            0.15,
          );

        // The bag drops in.
        gsap.from(q('[data-bag]'), {
          autoAlpha: 0,
          y: -60,
          rotate: -4,
          duration: 0.9,
          ease: 'bounce.out',
          scrollTrigger: { trigger: triggerOf('[data-bag]'), start: 'top 90%' },
        });

        // Notes: cards slide in, photo rises, the written-rules alert shakes.
        gsap.from(q('[data-bag-rule]'), {
          autoAlpha: 0,
          x: -48,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: triggerOf('[data-bag-rule]'),
            start: 'top 85%',
          },
        });
        gsap.from(q('[data-bag-photo]'), {
          autoAlpha: 0,
          y: 64,
          rotate: 3,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: triggerOf('[data-bag-photo]'),
            start: 'top 85%',
          },
        });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: triggerOf('[data-bag-alert]'),
              start: 'top 85%',
            },
          })
          .from(q('[data-bag-alert]'), {
            autoAlpha: 0,
            scale: 0.9,
            duration: 0.6,
            ease: 'back.out(1.8)',
          })
          .to(q('[data-bag-alert]'), {
            keyframes: { rotate: [0, -1.5, 1.5, -1, 1, 0] },
            duration: 0.5,
            ease: 'none',
          });

        // Packing: icon jumps, chip flies into the bag, bag wobbles.
        const required = root.querySelectorAll<HTMLInputElement>(
          'input[data-required]',
        );
        const allRequired = (): boolean =>
          Array.from(required).every((input) => input.checked);
        let wasDone = allRequired();

        const onChange = contextSafe((event: Event) => {
          const input = event.target;
          if (!(input instanceof HTMLInputElement)) return;
          const label = input.closest('label');
          if (input.checked) {
            const id = input.id.replace(/^malinha-/, '');
            const icon = label?.querySelector('[data-bag-icon] svg');
            const note = label?.querySelector('[data-bag-note]');
            const chip = root.querySelector(`[data-bag-chip="${id}"]`);
            if (icon) {
              gsap.fromTo(
                icon,
                { y: 0, rotate: 0 },
                {
                  keyframes: { y: [0, -10, 0], rotate: [0, -12, 0] },
                  duration: 0.45,
                  ease: 'power1.inOut',
                },
              );
            }
            if (note) {
              gsap.fromTo(
                note,
                { autoAlpha: 0, y: -6 },
                { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' },
              );
            }
            if (chip) {
              gsap.fromTo(
                chip,
                { autoAlpha: 0, y: -40, scale: 0.5 },
                {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.6,
                  ease: 'back.out(2)',
                },
              );
            }
            gsap.fromTo(
              q('[data-bag]'),
              { rotate: 0 },
              {
                keyframes: { rotate: [0, -3, 3, -1.5, 0] },
                duration: 0.5,
                delay: 0.25,
                ease: 'none',
              },
            );
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
                delay: 0.2,
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
