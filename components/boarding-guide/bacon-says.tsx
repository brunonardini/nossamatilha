import Image from 'next/image';
import type { ReactNode } from 'react';
import { baconPoses, type BaconPose } from '@/lib/boarding-guide/illustrations';

/** Props for {@link BaconSays}. */
export type BaconSaysProps = {
  /** Illustrated pose shown next to the speech bubble. */
  pose: BaconPose;
  /** What Bacon says (one short, light line; never a rule). */
  children: ReactNode;
  /** Puts the illustration on the right on larger screens. */
  reverse?: boolean;
  /** Loads the illustration eagerly (only for the first screen). */
  eager?: boolean;
  /** Fades in with the CSS `scroll-reveal` (turn off when GSAP animates it). */
  reveal?: boolean;
  className?: string;
};

/** Bacon, the narrator, with a speech bubble. */
export function BaconSays({
  pose,
  children,
  reverse = false,
  eager = false,
  reveal = true,
  className = '',
}: BaconSaysProps): ReactNode {
  const { src, alt } = baconPoses[pose];
  return (
    <figure
      className={`${reveal ? 'scroll-reveal' : ''} flex items-end gap-3 sm:gap-5 ${reverse ? 'sm:flex-row-reverse' : ''} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        sizes="(min-width: 640px) 176px, 128px"
        loading={eager ? 'eager' : 'lazy'}
        className="h-auto w-32 shrink-0 sm:w-44"
      />
      <figcaption
        className={`relative mb-6 max-w-sm rounded-card bg-surface-raised px-5 py-4 text-fg shadow-card ${reverse ? 'sm:mr-1' : ''}`}
      >
        <span className="sr-only">Bacon diz: </span>
        <span className="font-heading text-lead font-semibold">{children}</span>
      </figcaption>
    </figure>
  );
}
