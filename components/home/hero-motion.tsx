'use client';

import { useRef, type ReactNode } from 'react';
import { MOTION_OK, gsap, useGSAP } from '@/lib/gsap';

/** Props for {@link HeroMotion}. */
export type HeroMotionProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Entrance of the home hero visual: the orbit photos and the rating seal
 * (`data-hero-pop`) pop in one after the other. The portrait itself is never
 * hidden, so it paints as soon as it loads (it is the LCP candidate on
 * mobile). Popped elements start hidden through `motion-pending`.
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
      const pops = gsap.utils.toArray<HTMLElement>('[data-hero-pop]', root);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.from(pops, {
          autoAlpha: 0,
          scale: 0.6,
          duration: 0.6,
          ease: 'back.out(1.8)',
          stagger: 0.12,
          delay: 0.3,
        });
      });

      // Start states are set (or skipped with reduced motion): reveal.
      gsap.set(pops, { visibility: 'visible' });
    },
    { scope },
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
