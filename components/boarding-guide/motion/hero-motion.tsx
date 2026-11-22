'use client';

import { useRef, type ReactNode } from 'react';
import { MOTION_OK, ScrollTrigger, SplitText, gsap, useGSAP } from '@/lib/gsap';

/** Props for {@link HeroMotion}. */
export type HeroMotionProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Entrance choreography of the boarding guide hero. Children mark their role
 * with `data-hero`: `logo`, `intro` (split into words), `cta`, `photo` and
 * `bacon`. On desktop everything enters on load and the photo drifts up on
 * scroll; on mobile the photo and Bacon are below the first screen, so they
 * enter when scrolled into view.
 *
 * The wrapper starts hidden through `motion-pending` (only with JavaScript
 * and without reduced motion), so the server-rendered content never flashes
 * before the timeline takes over.
 */
export function HeroMotion({
  children,
  className = '',
}: HeroMotionProps): ReactNode {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: MOTION_OK,
          desktop: '(min-width: 768px)',
        },
        (context) => {
          const { motion, desktop } = context.conditions ?? {};
          if (!motion) return;

          const split = SplitText.create(q('[data-hero="intro"]'), {
            type: 'words',
          });
          const photo = q('[data-hero="photo"]');
          const bacon = q('[data-hero="bacon"]');
          const photoFrom = { autoAlpha: 0, scale: 0.9, rotate: -4 };
          const baconFrom = {
            autoAlpha: 0,
            y: 48,
            scale: 0.9,
            ease: 'back.out(1.6)',
          };

          // Text block: plays on load on every screen.
          const tl = gsap.timeline({
            defaults: { ease: 'power3.out', duration: 0.8 },
          });
          tl.from(q('[data-hero="logo"]'), {
            autoAlpha: 0,
            y: 24,
            scale: 0.85,
            ease: 'back.out(1.7)',
          })
            .from(
              split.words,
              { autoAlpha: 0, y: 14, stagger: 0.025, duration: 0.5 },
              0.4,
            )
            .from(q('[data-hero="cta"]'), { autoAlpha: 0, y: 16 }, '-=0.3');

          if (desktop) {
            // Photo and Bacon are on the first screen: join the entrance.
            tl.from(photo, { ...photoFrom, duration: 1.1 }, 0.15).from(
              bacon,
              baconFrom,
              '-=0.5',
            );

            // Gentle parallax: the photo drifts up as the hero leaves.
            gsap.to(photo, {
              yPercent: -10,
              ease: 'none',
              scrollTrigger: {
                trigger: root,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
              },
            });
          } else {
            // Mobile: they are below the first screen; animate on arrival.
            gsap.from(photo, {
              ...photoFrom,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: { trigger: photo, start: 'top 85%' },
            });
            gsap.from(bacon, {
              ...baconFrom,
              duration: 0.8,
              scrollTrigger: { trigger: bacon, start: 'top 90%' },
            });
          }

          return () => split.revert();
        },
      );

      // Hidden states are set; show the wrapper (also with reduced motion).
      gsap.set(root, { visibility: 'visible' });
      ScrollTrigger.refresh();
    },
    { scope },
  );

  return (
    <div ref={scope} className={`motion-pending ${className}`}>
      {children}
    </div>
  );
}
