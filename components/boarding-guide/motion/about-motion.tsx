'use client';

import { useRef, type ReactNode } from 'react';
import { animateChapterHeading } from '@/components/boarding-guide/motion/chapter-heading';
import {
  countUp,
  restoreCounts,
} from '@/components/boarding-guide/motion/count-up';
import { MOTION_OK, gsap, useGSAP } from '@/lib/gsap';

/** Props for {@link AboutMotion}. */
export type AboutMotionProps = {
  children: ReactNode;
};

/**
 * Scroll choreography of chapter 1 ("Quem somos e como é o espaço"). Wrap
 * the whole `ChapterSection`. Targets, by data attribute:
 *
 * - The chapter heading (see {@link animateChapterHeading}).
 * - `data-stat` items: pop in one after the other while their
 *   `data-count-to` number counts up from zero (pt-BR formatting).
 * - `data-space-photo`: the three space photos rise in a fanned sequence.
 * - `data-play-photo`, `data-play-text`, `data-play-bacon`: the group play
 *   block; photo and text slide in from opposite sides, then Bacon pops in
 *   and wiggles.
 *
 * Without JavaScript or with reduced motion, everything is static and final.
 */
export function AboutMotion({ children }: AboutMotionProps): ReactNode {
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

        // Stats: pop in and count up.
        const stats = root.querySelectorAll<HTMLElement>('[data-stat]');
        const stl = gsap.timeline({
          scrollTrigger: { trigger: stats[0] ?? root, start: 'top 80%' },
        });
        stats.forEach((stat, index) => {
          const at = index * 0.2;
          stl.from(
            stat,
            {
              autoAlpha: 0,
              y: 32,
              scale: 0.85,
              duration: 0.7,
              ease: 'back.out(1.8)',
            },
            at,
          );
          const number = stat.querySelector<HTMLElement>('[data-count-to]');
          const count = number ? countUp(number) : null;
          if (count) stl.add(count, at);
        });

        // Space photos: rise in a fanned sequence. One trigger per photo so
        // stacked photos on mobile animate as each one arrives; the delay
        // keeps the sequence when they arrive together (desktop row).
        q('[data-space-photo]').forEach((photo, index) => {
          gsap.from(photo, {
            autoAlpha: 0,
            y: 64,
            scale: 0.92,
            rotate: [-4, 0, 4][index % 3] ?? 0,
            duration: 0.9,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: photo, start: 'top 85%' },
          });
        });

        // Group play: photo and text meet, then Bacon pops in and wiggles.
        const play = gsap.timeline({
          defaults: { ease: 'power3.out', duration: 0.8 },
          scrollTrigger: {
            trigger: q('[data-play-photo]')[0] ?? root,
            start: 'top 75%',
          },
        });
        play
          .from(q('[data-play-photo]'), { autoAlpha: 0, x: -56, rotate: -3 })
          .from(q('[data-play-text]'), { autoAlpha: 0, x: 56 }, '<0.1')
          .from(
            q('[data-play-bacon]'),
            { autoAlpha: 0, y: 40, scale: 0.9, ease: 'back.out(1.7)' },
            '-=0.3',
          )
          .to(q('[data-play-bacon] img'), {
            rotate: 6,
            duration: 0.12,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 5,
            transformOrigin: '50% 90%',
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
