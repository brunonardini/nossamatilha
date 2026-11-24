import type { StaticImageData } from 'next/image';
import silviaAndBacon from '@/assets/photos/home/hero-silvia-and-bacon.webp';
import { guidePhotos } from '@/lib/boarding-guide/photos';

/** A photo with its pt-BR alt text. */
export type HomePhoto = {
  src: StaticImageData;
  alt: string;
};

/**
 * Composed hero image: the lime leaf frame (white border) with Silvia and
 * Bacon stepping out of its top edge, on a transparent background (WebP, no
 * metadata). The frame fills the bottom of the image (see `HeroPortrait`).
 * Silvia's name and photos are approved for publication (see AGENTS.md).
 */
export const heroPortrait: HomePhoto = {
  src: silviaAndBacon,
  alt: 'Silvia Matrumoto, CEO da Nossa Matilha, ajoelhada e sorrindo, abraçando o Bacon, um labrador caramelo.',
};

/**
 * The three round photos orbiting the hero portrait. Temporary picks from the
 * boarding guide until the dedicated images are produced.
 */
export const heroOrbitPhotos: readonly HomePhoto[] = [
  guidePhotos.dayAfternoonPlay,
  guidePhotos.groomingBath,
  guidePhotos.dayMorningYard,
];
