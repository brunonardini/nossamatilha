'use client';

import { useRef, type ReactNode } from 'react';
import { MOTION_OK, gsap, useGSAP } from '@/lib/gsap';

/** Props for {@link FooterMotion}. */
export type FooterMotionProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Motion of the site footer: the Instagram snapshots (`data-shot`) rise in
 * one after another, and the dogs on the scene (`data-dog`) run in from
 * both sides with a few little hops once the scene (`data-scene`) scrolls
 * into view. Everything is visible and still without it.
 */
export function FooterMotion({
  children,
  className = '',
}: FooterMotionProps): ReactNode {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from('[data-shot]', {
          y: 20,
          autoAlpha: 0,
          duration: 0.5,
          ease: 'back.out(2)',
          stagger: 0.1,
          scrollTrigger: { trigger: scope.current, start: 'top 80%' },
        });
        gsap.utils.toArray<HTMLElement>('[data-dog]').forEach((dog, i) => {
          gsap
            .timeline({
              scrollTrigger: { trigger: '[data-scene]', start: 'top 80%' },
              delay: i * 0.12,
            })
            .from(dog, {
              xPercent: i % 2 === 0 ? -400 : 400,
              autoAlpha: 0,
              duration: 1.1,
              ease: 'power3.out',
            })
            .from(
              dog,
              {
                y: -14,
                duration: 0.18,
                yoyo: true,
                repeat: 5,
                ease: 'sine.inOut',
              },
              0,
            );
        });
      });
    },
    { scope },
  );

  return (
    <footer ref={scope} className={className}>
      {children}
    </footer>
  );
}
