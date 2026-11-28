'use client';

import { useRef, type ReactNode } from 'react';
import { animateChapterHeading } from '@/components/boarding-guide/motion/chapter-heading';
import { MOTION_OK, gsap, useGSAP } from '@/lib/gsap';

/** Props for {@link TeamMotion}. */
export type TeamMotionProps = {
  children: ReactNode;
};

/**
 * Scroll choreography of chapter 2 ("Quem cuida do seu cão"). Wrap the whole
 * `ChapterSection`. Targets, by data attribute:
 *
 * - The chapter heading (see {@link animateChapterHeading}).
 * - `data-team-photo`: Silvia and Bacon's photo drops in like a print and
 *   settles; `data-team-intro` fades up while `data-team-highlight` (the
 *   marker under Silvia's name) draws from left to right.
 * - `data-team-bacon`: pops in, then puffs up with pride.
 * - `data-team-fact`: the training cards slide in one after the other.
 * - `data-team-group`: the team photo rises and straightens.
 *
 * Without JavaScript or with reduced motion, everything is static and final.
 */
export function TeamMotion({ children }: TeamMotionProps): ReactNode {
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

        // Silvia: the photo drops in, the text follows, her name is marked.
        const silvia = gsap.timeline({
          defaults: { ease: 'power3.out', duration: 0.8 },
          scrollTrigger: {
            trigger: q('[data-team-photo]')[0] ?? root,
            start: 'top 75%',
          },
        });
        silvia
          .from(q('[data-team-photo]'), {
            autoAlpha: 0,
            y: -48,
            rotate: -8,
            duration: 1,
            ease: 'back.out(1.4)',
          })
          .from(q('[data-team-intro]'), { autoAlpha: 0, y: 20 }, '-=0.6')
          .from(
            q('[data-team-highlight]'),
            {
              scaleX: 0,
              transformOrigin: '0% 50%',
              duration: 0.6,
              ease: 'power2.inOut',
            },
            '-=0.3',
          );

        // Bacon: pops in when he arrives, then puffs up with pride.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: q('[data-team-bacon]')[0] ?? root,
              start: 'top 85%',
            },
          })
          .from(q('[data-team-bacon]'), {
            autoAlpha: 0,
            y: 40,
            scale: 0.9,
            duration: 0.7,
            ease: 'back.out(1.7)',
          })
          .to(q('[data-team-bacon] img'), {
            scale: 1.08,
            duration: 0.25,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 3,
            transformOrigin: '50% 100%',
          });

        // Training cards: slide in one after the other.
        gsap.from(q('[data-team-fact]'), {
          autoAlpha: 0,
          x: -48,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: q('[data-team-fact]')[0] ?? root,
            start: 'top 80%',
          },
        });

        // Team photo: rises and straightens.
        gsap.from(q('[data-team-group]'), {
          autoAlpha: 0,
          y: 64,
          rotate: 4,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: q('[data-team-group]')[0] ?? root,
            start: 'top 85%',
          },
        });

        return () => revertHeading?.();
      });
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
