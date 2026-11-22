'use client';

import { useRef, type ReactNode } from 'react';
import { animateChapterHeading } from '@/components/boarding-guide/motion/chapter-heading';
import { MOTION_OK, gsap, useGSAP } from '@/lib/gsap';

/** Props for {@link CancellationMotion}. */
export type CancellationMotionProps = {
  children: ReactNode;
};

/**
 * Scroll choreography of chapter 8 (cancellation, checkpoint 4). Wrap the
 * whole `ChapterSection`. Targets, by data attribute:
 *
 * - The chapter heading (see {@link animateChapterHeading}).
 * - `data-cancel-policy`: the two policies meet from opposite sides, ready
 *   to be compared.
 * - `data-cancel-simulator` rises, then `data-cancel-note` fades in (the
 *   simulator animates its own changes).
 * - `data-cancel-bacon`: pops in, then tilts his head, thinking.
 * - `data-cancel-extend`: the "stay longer" card slides in.
 *
 * Without JavaScript or with reduced motion, everything is static and final.
 */
export function CancellationMotion({
  children,
}: CancellationMotionProps): ReactNode {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      const triggerOf = (selector: string): Element => q(selector)[0] ?? root;

      mm.add(MOTION_OK, () => {
        const section = root.querySelector('section');
        const revertHeading = section
          ? animateChapterHeading(section)
          : undefined;

        // The two policies meet from opposite sides.
        q('[data-cancel-policy]').forEach((card, index) => {
          gsap.from(card, {
            autoAlpha: 0,
            x: index % 2 === 0 ? -56 : 56,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' },
          });
        });

        // Simulator rises; the credit note follows.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: triggerOf('[data-cancel-simulator]'),
              start: 'top 80%',
            },
          })
          .from(q('[data-cancel-simulator]'), {
            autoAlpha: 0,
            y: 48,
            duration: 0.8,
            ease: 'power3.out',
          })
          .from(
            q('[data-cancel-note]'),
            { autoAlpha: 0, duration: 0.6 },
            '-=0.3',
          );

        // Bacon pops in and tilts his head, thinking; the card slides in.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: triggerOf('[data-cancel-bacon]'),
              start: 'top 85%',
            },
          })
          .from(q('[data-cancel-bacon]'), {
            autoAlpha: 0,
            y: 40,
            scale: 0.9,
            duration: 0.7,
            ease: 'back.out(1.7)',
          })
          .from(
            q('[data-cancel-extend]'),
            { autoAlpha: 0, x: 56, duration: 0.7, ease: 'power3.out' },
            0.15,
          )
          .to(q('[data-cancel-bacon] img'), {
            keyframes: { rotate: [0, -7, -7, 4, 0] },
            transformOrigin: '50% 90%',
            duration: 1.6,
            ease: 'sine.inOut',
          });

        return () => revertHeading?.();
      });
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
