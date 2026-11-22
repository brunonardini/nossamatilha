'use client';

import { useRef, type ReactNode } from 'react';
import { animateChapterHeading } from '@/components/boarding-guide/motion/chapter-heading';
import { MOTION_OK, gsap, useGSAP } from '@/lib/gsap';

/** Props for {@link ReadyMotion}. */
export type ReadyMotionProps = {
  children: ReactNode;
};

/**
 * Scroll choreography of chapter 10 (summary). Wrap the whole
 * `ChapterSection`. Targets, by data attribute:
 *
 * - The chapter heading (see {@link animateChapterHeading}).
 * - `data-ready-score` pops in; `[data-checkpoint-item]` rows slide in and
 *   the check marks of completed checkpoints pop one after the other.
 * - `data-ready-confetti` pieces burst from the "Guia concluído" card when
 *   every checkpoint is complete (decoration, hidden by default).
 * - `data-ready-cta` pops in and pulses once; `data-ready-bacon` pops in and
 *   jumps for joy.
 * - `data-ready-photo` rise with opposite tilts; `data-ready-instagram`
 *   rises at the end.
 *
 * Without JavaScript or with reduced motion, everything is static and final.
 */
export function ReadyMotion({ children }: ReadyMotionProps): ReactNode {
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

        // Score and checklist; completed marks pop, then confetti if all done.
        const items = q('[data-checkpoint-item]');
        // Completion is read when the summary arrives (onEnter).
        const celebrate = contextSafe((): void => {
          const doneMarks = items
            .map((item) => item.querySelector('.checkpoint-mark svg'))
            .filter(
              (mark): mark is SVGSVGElement =>
                mark instanceof SVGSVGElement &&
                getComputedStyle(mark).opacity === '1',
            );
          if (doneMarks.length > 0) {
            gsap.from(doneMarks, {
              scale: 0,
              rotate: -45,
              duration: 0.45,
              delay: 0.5,
              ease: 'back.out(3)',
              stagger: 0.15,
            });
          }
          const doneCard = root.querySelector('[data-all-checkpoints="done"]');
          if (doneCard && getComputedStyle(doneCard).display !== 'none') {
            const pieces = q('[data-ready-confetti]');
            gsap
              .timeline({ delay: 0.9 })
              .fromTo(
                pieces,
                { autoAlpha: 1, x: 0, y: 0, scale: 0, rotate: 0 },
                {
                  x: () => gsap.utils.random(-180, 180),
                  y: () => gsap.utils.random(-170, -40),
                  rotate: () => gsap.utils.random(-360, 360),
                  scale: () => gsap.utils.random(1, 1.6),
                  duration: 0.9,
                  ease: 'power3.out',
                  stagger: 0.015,
                },
              )
              // Then they fall a little and fade out.
              .to(pieces, {
                y: '+=60',
                autoAlpha: 0,
                duration: 1.2,
                ease: 'power1.in',
                stagger: 0.015,
              });
          }
        });

        const summary = gsap.timeline({
          scrollTrigger: {
            trigger: triggerOf('[data-ready-score]'),
            start: 'top 80%',
            onEnter: () => celebrate(),
          },
        });
        summary
          .from(q('[data-ready-score]'), {
            autoAlpha: 0,
            y: 16,
            duration: 0.5,
            ease: 'power3.out',
          })
          .from(
            items,
            {
              autoAlpha: 0,
              x: -32,
              duration: 0.5,
              ease: 'power3.out',
              stagger: 0.1,
            },
            0.2,
          );

        // Call to action pops in and pulses once; Bacon jumps for joy.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: triggerOf('[data-ready-cta]'),
              start: 'top 90%',
            },
          })
          .from(q('[data-ready-cta]'), {
            autoAlpha: 0,
            scale: 0.8,
            duration: 0.6,
            ease: 'back.out(2.2)',
          })
          .to(q('[data-ready-cta]'), {
            scale: 1.06,
            duration: 0.25,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 3,
          });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: triggerOf('[data-ready-bacon]'),
              start: 'top 90%',
            },
          })
          .from(q('[data-ready-bacon]'), {
            autoAlpha: 0,
            y: 40,
            scale: 0.9,
            duration: 0.7,
            ease: 'back.out(1.7)',
          })
          .to(q('[data-ready-bacon] img'), {
            keyframes: {
              y: [0, -22, 0, -14, 0],
              rotate: [0, -6, 0, 6, 0],
            },
            duration: 1,
            ease: 'power1.inOut',
          });

        // Photos and the Instagram card.
        gsap.from(q('[data-ready-photo]'), {
          autoAlpha: 0,
          y: 64,
          rotate: (index: number) => (index % 2 === 0 ? -5 : 5),
          duration: 0.9,
          ease: 'back.out(1.4)',
          stagger: 0.15,
          scrollTrigger: {
            trigger: triggerOf('[data-ready-photo]'),
            start: 'top 85%',
          },
        });
        gsap.from(q('[data-ready-instagram]'), {
          autoAlpha: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: triggerOf('[data-ready-instagram]'),
            start: 'top 90%',
          },
        });

        return () => revertHeading?.();
      });
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
