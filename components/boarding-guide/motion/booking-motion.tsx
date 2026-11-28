'use client';

import { useRef, type ReactNode } from 'react';
import { animateChapterHeading } from '@/components/boarding-guide/motion/chapter-heading';
import {
  countUp,
  restoreCounts,
} from '@/components/boarding-guide/motion/count-up';
import { MOTION_OK, gsap, useGSAP } from '@/lib/gsap';

/** Props for {@link BookingMotion}. */
export type BookingMotionProps = {
  children: ReactNode;
};

/**
 * Scroll choreography of chapter 5 ("Como reservar"). Wrap the whole
 * `ChapterSection`. Targets, by data attribute:
 *
 * - The chapter heading (see {@link animateChapterHeading}).
 * - `data-booking-notice`: the big notice period pops in while its
 *   `data-count-to` number counts up; `data-booking-text` fades up after it.
 * - `data-booking-bacon`: pops in, then taps the phone.
 * - `data-booking-step` with a `data-booking-number`: the steps arrive like
 *   chat messages, one after the other, each number popping in.
 * - `data-booking-card` and its `data-booking-warning` line: the card rises,
 *   then "Orçamento não é reserva" gets a short nudge.
 *
 * Without JavaScript or with reduced motion, everything is static and final.
 */
export function BookingMotion({ children }: BookingMotionProps): ReactNode {
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

        // Notice period: pops in and counts up; the text follows.
        const notice = gsap.timeline({
          scrollTrigger: {
            trigger: q('[data-booking-notice]')[0] ?? root,
            start: 'top 80%',
          },
        });
        notice.from(q('[data-booking-notice]'), {
          autoAlpha: 0,
          scale: 0.6,
          rotate: -6,
          duration: 0.8,
          ease: 'back.out(1.8)',
        });
        const number = root.querySelector<HTMLElement>(
          '[data-booking-notice] [data-count-to]',
        );
        const count = number ? countUp(number, 1.2) : null;
        if (count) notice.add(count, 0);
        notice.from(
          q('[data-booking-text]'),
          { autoAlpha: 0, y: 20, duration: 0.7, ease: 'power3.out' },
          0.3,
        );

        // Bacon: pops in, then taps the phone with his paw.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: q('[data-booking-bacon]')[0] ?? root,
              start: 'top 85%',
            },
          })
          .from(q('[data-booking-bacon]'), {
            autoAlpha: 0,
            y: 40,
            scale: 0.9,
            duration: 0.7,
            ease: 'back.out(1.7)',
          })
          .to(q('[data-booking-bacon] img'), {
            y: -6,
            duration: 0.12,
            ease: 'power1.out',
            yoyo: true,
            repeat: 5,
          });

        // Steps: arrive like chat messages, numbers pop.
        const steps = gsap.timeline({
          scrollTrigger: {
            trigger: q('[data-booking-step]')[0] ?? root,
            start: 'top 80%',
          },
        });
        q('[data-booking-step]').forEach((step, index) => {
          const at = index * 0.25;
          steps
            .from(
              step,
              {
                autoAlpha: 0,
                x: 48,
                scale: 0.95,
                transformOrigin: '100% 50%',
                duration: 0.5,
                ease: 'power3.out',
              },
              at,
            )
            .from(
              step.querySelector('[data-booking-number]'),
              { scale: 0, duration: 0.45, ease: 'back.out(2.5)' },
              at + 0.15,
            );
        });

        // Card rises; then the warning line gets a short nudge.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: q('[data-booking-card]')[0] ?? root,
              start: 'top 85%',
            },
          })
          .from(q('[data-booking-card]'), {
            autoAlpha: 0,
            y: 40,
            duration: 0.7,
            ease: 'power3.out',
          })
          .to(q('[data-booking-warning]'), {
            x: 4,
            duration: 0.07,
            ease: 'none',
            yoyo: true,
            repeat: 5,
          });

        return () => {
          revertHeading?.();
          restoreCounts(root);
        };
      });
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
