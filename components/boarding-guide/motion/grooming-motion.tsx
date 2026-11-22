'use client';

import { useRef, type ReactNode } from 'react';
import { animateChapterHeading } from '@/components/boarding-guide/motion/chapter-heading';
import { MOTION_OK, gsap, useGSAP } from '@/lib/gsap';

/** Props for {@link GroomingMotion}. */
export type GroomingMotionProps = {
  children: ReactNode;
};

/**
 * Scroll choreography of chapter 9 ("Banho e tosa"). Wrap the whole
 * `ChapterSection`. Targets, by data attribute:
 *
 * - The chapter heading (see {@link animateChapterHeading}).
 * - `data-grooming-photo`: the photos rise with opposite tilts, while the
 *   decorative `data-grooming-bubble` soap bubbles float up and pop.
 * - `data-grooming-text` fades up and `data-grooming-cta` pops in.
 * - `data-grooming-bacon`: pops in, then shakes off the water like a wet dog.
 *
 * Bubbles are hidden by default (decoration only). Without JavaScript or with
 * reduced motion, everything else is static and final.
 */
export function GroomingMotion({ children }: GroomingMotionProps): ReactNode {
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

        // Photos rise with opposite tilts; bubbles float up and pop.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: triggerOf('[data-grooming-photo]'),
              start: 'top 80%',
            },
          })
          .from(q('[data-grooming-photo]'), {
            autoAlpha: 0,
            y: 64,
            rotate: (index: number) => (index % 2 === 0 ? -6 : 6),
            duration: 0.9,
            ease: 'back.out(1.4)',
            stagger: 0.15,
          })
          .fromTo(
            q('[data-grooming-bubble]'),
            { autoAlpha: 0, y: 0, scale: 0.3 },
            {
              keyframes: {
                autoAlpha: [0, 0.9, 0.9, 0],
                scale: [0.3, 1, 1, 1.4],
              },
              y: () => gsap.utils.random(-220, -120),
              x: () => gsap.utils.random(-24, 24),
              duration: () => gsap.utils.random(1.6, 2.4),
              ease: 'sine.out',
              stagger: { each: 0.12, from: 'random' },
            },
            0.3,
          );

        // Text and call to action.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: triggerOf('[data-grooming-text]'),
              start: 'top 85%',
            },
          })
          .from(q('[data-grooming-text]'), {
            autoAlpha: 0,
            y: 20,
            duration: 0.6,
            ease: 'power3.out',
          })
          .from(
            q('[data-grooming-cta]'),
            {
              autoAlpha: 0,
              scale: 0.8,
              duration: 0.6,
              ease: 'back.out(2.2)',
            },
            '-=0.2',
          );

        // Bacon pops in, then shakes off the water.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: triggerOf('[data-grooming-bacon]'),
              start: 'top 85%',
            },
          })
          .from(q('[data-grooming-bacon]'), {
            autoAlpha: 0,
            y: 40,
            scale: 0.9,
            duration: 0.7,
            ease: 'back.out(1.7)',
          })
          .to(q('[data-grooming-bacon] img'), {
            keyframes: { rotate: [0, -10, 10, -8, 8, -4, 4, 0] },
            transformOrigin: '50% 70%',
            duration: 0.7,
            ease: 'none',
          });

        return () => revertHeading?.();
      });
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
