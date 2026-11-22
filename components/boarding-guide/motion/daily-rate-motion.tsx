'use client';

import { useRef, type ReactNode } from 'react';
import { animateChapterHeading } from '@/components/boarding-guide/motion/chapter-heading';
import { MOTION_OK, gsap, useGSAP } from '@/lib/gsap';

/** Props for {@link DailyRateMotion}. */
export type DailyRateMotionProps = {
  children: ReactNode;
};

/**
 * Scroll choreography of chapter 6 (daily rate, checkpoint 2). Wrap the
 * whole `ChapterSection`. Targets, by data attribute:
 *
 * - The chapter heading (see {@link animateChapterHeading}).
 * - `data-rate-price` and `data-rate-unit`: the price flips in like a
 *   price tag, its unit follows.
 * - `data-rate-rule`: the rule cards slide in one after the other.
 * - `data-rate-bacon`: pops in, then swings like a clock pendulum.
 * - `data-rate-simulator`: the simulator rises; its `data-rate-bar` bars fill
 *   up the first time it appears (the simulator animates later changes).
 * - `data-rate-note`: the closing note fades in.
 *
 * Without JavaScript or with reduced motion, everything is static and final.
 */
export function DailyRateMotion({ children }: DailyRateMotionProps): ReactNode {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const section = root.querySelector('section');
        const revertHeading = section
          ? animateChapterHeading(section)
          : undefined;

        // Price tag flips in; the unit follows.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: q('[data-rate-price]')[0] ?? root,
              start: 'top 80%',
            },
          })
          .from(q('[data-rate-price]'), {
            autoAlpha: 0,
            rotateX: -90,
            transformPerspective: 400,
            transformOrigin: '50% 0%',
            duration: 0.8,
            ease: 'back.out(1.6)',
          })
          .from(
            q('[data-rate-unit]'),
            { autoAlpha: 0, y: 12, duration: 0.5, ease: 'power3.out' },
            '-=0.4',
          );

        // Rule cards slide in one after the other.
        gsap.from(q('[data-rate-rule]'), {
          autoAlpha: 0,
          x: -48,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: q('[data-rate-rule]')[0] ?? root,
            start: 'top 85%',
          },
        });

        // Bacon pops in, then swings like a pendulum.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: q('[data-rate-bacon]')[0] ?? root,
              start: 'top 85%',
            },
          })
          .from(q('[data-rate-bacon]'), {
            autoAlpha: 0,
            y: 40,
            scale: 0.9,
            duration: 0.7,
            ease: 'back.out(1.7)',
          })
          .to(q('[data-rate-bacon] img'), {
            keyframes: { rotate: [0, -5, 5, -3, 3, 0] },
            transformOrigin: '50% 100%',
            duration: 1.4,
            ease: 'sine.inOut',
          });

        // Simulator rises; its bars fill up once.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: q('[data-rate-simulator]')[0] ?? root,
              start: 'top 80%',
            },
          })
          .from(q('[data-rate-simulator]'), {
            autoAlpha: 0,
            y: 48,
            duration: 0.8,
            ease: 'power3.out',
          })
          .from(
            q('[data-rate-bar]'),
            {
              scaleX: 0,
              duration: 0.7,
              ease: 'power2.out',
              stagger: 0.12,
            },
            '-=0.3',
          )
          .from(
            q('[data-rate-note]'),
            { autoAlpha: 0, duration: 0.6 },
            '-=0.3',
          );

        return () => revertHeading?.();
      });
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
