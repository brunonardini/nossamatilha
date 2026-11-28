'use client';

import { useRef, type ReactNode } from 'react';
import { MOTION_OK, gsap, useGSAP } from '@/lib/gsap';

/** Props for {@link DayMotion}. */
export type DayMotionProps = {
  children: ReactNode;
};

/**
 * Scroll choreography of the "Um dia na Matilha" chapter. Wrap the whole
 * chapter content (sky and moments). Targets, by data attribute:
 *
 * - `data-sky="afternoon" | "night"`: sky layers, scrubbed from morning to
 *   night across the chapter.
 * - `data-sky="orb"` holding `data-sky="sun"` and `data-sky="moon"`: starts
 *   beside the `data-day-title` card, sets towards the bottom right and turns
 *   into the moon, which rises during the night.
 * - The static look (reduced motion, no JavaScript) is the morning sky.
 * - `data-moment`: a moment of the day; its `data-moment-card` slides in and
 *   its `data-moment-photo` items rise in sequence when it enters the screen.
 * - `data-day-bacon`: Bacon's closing line, which pops in.
 */
export function DayMotion({ children }: DayMotionProps): ReactNode {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        // Sky: one scrubbed timeline from the moment the title reaches the
        // top of the screen (progress 0) to the end of the chapter (1).
        const orb = root.querySelector<HTMLElement>('[data-sky="orb"]');
        const title = root.querySelector<HTMLElement>('[data-day-title]');
        const edge = 24;
        // Orb offsets are relative to the sticky sky, which sits at the top of
        // the section until progress 0, so the start is measured from there.
        const besideTitleX = (): number => {
          if (!orb || !title) return 0;
          const titleRight =
            title.getBoundingClientRect().right -
            root.getBoundingClientRect().left;
          const maxLeft = root.clientWidth - orb.offsetWidth - edge;
          return Math.min(titleRight + edge, maxLeft) - orb.offsetLeft;
        };
        const besideTitleY = (): number => {
          if (!orb || !title) return 0;
          const box = title.getBoundingClientRect();
          const middle =
            box.top - root.getBoundingClientRect().top + box.height / 2;
          return middle - orb.offsetHeight / 2 - orb.offsetTop;
        };
        const rightEdgeX = (): number =>
          orb ? root.clientWidth - orb.offsetWidth - edge - orb.offsetLeft : 0;
        const skyY = (fraction: number) => (): number =>
          orb ? window.innerHeight * fraction - orb.offsetTop : 0;

        const sky = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        sky
          // Morning → sunset: the sun goes down towards the right edge.
          .fromTo(
            orb ?? [],
            { x: besideTitleX, y: besideTitleY },
            { x: rightEdgeX, y: skyY(0.7), duration: 0.6, ease: 'sine.in' },
            0,
          )
          .to(q('[data-sky="afternoon"]'), { opacity: 1, duration: 0.15 }, 0.28)
          .to(q('[data-sky="night"]'), { opacity: 1, duration: 0.15 }, 0.55)
          // Nightfall: the sun turns into the moon, which then rises.
          .to(q('[data-sky="sun"]'), { autoAlpha: 0, duration: 0.1 }, 0.58)
          .fromTo(
            q('[data-sky="moon"]'),
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.1 },
            0.6,
          )
          .to(
            orb ?? [],
            { y: skyY(0.3), duration: 0.3, ease: 'sine.out' },
            0.68,
          )
          .to({}, { duration: 0.02 }, 0.98);

        // Moments: card from the side, photos rise one after the other.
        q('[data-moment]').forEach((moment, index) => {
          const reveal = gsap.timeline({
            defaults: { ease: 'power3.out', duration: 0.7 },
            scrollTrigger: { trigger: moment, start: 'top 80%' },
          });
          reveal
            .from(moment.querySelector('[data-moment-card]'), {
              autoAlpha: 0,
              x: index % 2 === 0 ? -48 : 48,
            })
            .from(
              moment.querySelectorAll('[data-moment-photo]'),
              {
                autoAlpha: 0,
                y: 56,
                rotate: (i: number) => (i % 2 === 0 ? -3 : 3),
                stagger: 0.15,
              },
              0.15,
            );
        });

        gsap.from(q('[data-day-bacon]'), {
          autoAlpha: 0,
          y: 40,
          scale: 0.9,
          ease: 'back.out(1.6)',
          duration: 0.7,
          scrollTrigger: { trigger: q('[data-day-bacon]'), start: 'top 85%' },
        });
      });
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
