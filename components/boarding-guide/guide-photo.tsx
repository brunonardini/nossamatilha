import Image from 'next/image';
import type { ReactNode } from 'react';
import type { GuidePhoto as GuidePhotoData } from '@/lib/boarding-guide/photos';

/** Props for {@link GuidePhoto}. */
export type GuidePhotoProps = {
  photo: GuidePhotoData;
  /** `sizes` attribute for responsive loading. */
  sizes: string;
  /** Optional pt-BR caption shown under the photo. */
  caption?: ReactNode;
  /** Loads eagerly with high priority (only for the hero). */
  priority?: boolean;
  /** Fades in with the CSS `scroll-reveal` (turn off when GSAP animates it). */
  reveal?: boolean;
  className?: string;
};

/** A rounded 4:5 photo with blur placeholder and an optional caption. */
export function GuidePhoto({
  photo,
  sizes,
  caption,
  priority = false,
  reveal = true,
  className = '',
}: GuidePhotoProps): ReactNode {
  return (
    <figure className={`${reveal ? 'scroll-reveal' : ''} ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        sizes={sizes}
        placeholder="blur"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        className="aspect-4/5 h-auto w-full rounded-card object-cover shadow-card"
      />
      {caption ? (
        <figcaption className="mt-2 text-caption text-fg-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
