import Image from 'next/image';
import type { ReactNode } from 'react';
import { AwardIcon, StarIcon } from '@/components/ui/icons';
import { heroOrbitPhotos, heroPortrait } from '@/lib/home/hero';

/** The seal always shows five stars (the score varies between 4,8 and 5). */
const stars = [0, 1, 2, 3, 4] as const;

/** Where each orbit photo sits around the frame (mobile → desktop). */
const orbitPositions = [
  'top-[8%] -left-[11%]',
  'top-[10%] -right-[14%]',
  '-right-[4%] -bottom-[7%]',
] as const;

/**
 * Hero visual: one composed image (the lime leaf frame with Silvia and Bacon
 * stepping out of its top edge), three round photos orbiting the frame and
 * the Google seal (five stars, no score). Children marked `data-hero-pop` are
 * popped in by {@link HeroMotion}.
 */
export function HeroPortrait(): ReactNode {
  return (
    <div className="relative mx-auto w-[86%] max-w-md lg:w-full lg:max-w-lg">
      <Image
        src={heroPortrait.src}
        alt={heroPortrait.alt}
        sizes="(min-width: 1024px) 32rem, 86vw"
        loading="eager"
        className="h-auto w-full"
      />

      {/* Box over the frame inside the image: the orbit photos and the seal
          are placed relative to it. */}
      <div className="absolute inset-x-0 bottom-[1%] aspect-square">
        {heroOrbitPhotos.map((photo, i) => (
          <div
            key={photo.alt}
            data-hero-pop
            className={`motion-pending absolute z-10 size-20 overflow-hidden rounded-full bg-cream shadow-card ring-4 ring-white sm:size-24 lg:size-28 ${orbitPositions[i]}`}
          >
            <Image
              src={photo.src}
              alt=""
              sizes="96px"
              className="size-full object-cover"
            />
          </div>
        ))}

        <div
          data-hero-pop
          className="motion-pending absolute -bottom-7 -left-3 z-20 rounded-card bg-white px-4 py-3 text-ink shadow-lift sm:-left-8"
        >
          <p className="flex justify-between text-sun">
            {stars.map((i) => (
              <StarIcon key={i} className="size-6" />
            ))}
            <span className="sr-only">
              Avaliação de cinco estrelas no Google
            </span>
          </p>
          <p className="mt-2.5 flex items-center gap-1.5 border-t border-forest/10 pt-2.5 text-caption font-semibold text-forest">
            <AwardIcon className="size-4 text-brown" />
            Certificação FBAA
          </p>
        </div>
      </div>
    </div>
  );
}
