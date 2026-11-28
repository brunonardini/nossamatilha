'use client';

import { useRef, type ReactNode } from 'react';
import { Laurel } from '@/components/ui/laurel';
import { gsap, MOTION_OK, useGSAP } from '@/lib/gsap';

/** Props for {@link ReviewsHeading}. */
export type ReviewsHeadingProps = {
  /** `id` of the `h2`, for the section's `aria-labelledby`. */
  id: string;
  eyebrow: string;
  title: string;
};

/**
 * Centered reviews title between two `sun` laurels (award style). When it
 * scrolls in, the leaves grow from the base of each branch to the tip and
 * the eyebrow and title rise in.
 */
export function ReviewsHeading({
  id,
  eyebrow,
  title,
}: ReviewsHeadingProps): ReactNode {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({
            scrollTrigger: { trigger: scope.current, start: 'top 85%' },
          })
          .from('[data-leaf]', {
            scale: 0,
            transformOrigin: '50% 100%',
            duration: 0.5,
            ease: 'back.out(2.5)',
            stagger: 0.04,
          })
          .from(
            '[data-title-line]',
            {
              y: 24,
              autoAlpha: 0,
              duration: 0.7,
              ease: 'power3.out',
              stagger: 0.1,
            },
            0,
          );
      });
    },
    { scope },
  );

  return (
    <div
      ref={scope}
      className="flex items-center justify-center gap-1 sm:gap-5"
    >
      <Laurel className="h-28 w-14 text-sun sm:h-32 sm:w-16" />
      <div className="text-center">
        <p
          data-title-line
          className="font-heading text-caption font-semibold tracking-widest text-accent uppercase"
        >
          {eyebrow}
        </p>
        <h2 id={id} data-title-line className="mt-2 text-h1 font-extrabold">
          {title}
        </h2>
      </div>
      <Laurel flip className="h-28 w-14 text-sun sm:h-32 sm:w-16" />
    </div>
  );
}
