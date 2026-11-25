import type { StaticImageData } from 'next/image';
import orbitArmchair from '@/assets/photos/home/hero-orbit-armchair.webp';
import orbitBeeCostume from '@/assets/photos/home/hero-orbit-bee-costume.webp';
import orbitYardTrio from '@/assets/photos/home/hero-orbit-yard-trio.webp';
import silviaAndBacon from '@/assets/photos/home/hero-silvia-and-bacon.webp';

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
 * The three round photos orbiting the hero portrait, in position order: left,
 * top right, bottom right (square WebP crops, no metadata, dogs only).
 */
export const heroOrbitPhotos: readonly HomePhoto[] = [
  {
    src: orbitArmchair,
    alt: 'Um shih-tzu de língua de fora, sentado numa poltroninha rosa de unicórnios.',
  },
  {
    src: orbitBeeCostume,
    alt: 'Um galgo italiano vestido com uma roupinha de abelha, no gramado.',
  },
  {
    src: orbitYardTrio,
    alt: 'Três cães sorridentes no gramado olhando para a câmera: um border collie, um são-bernardo filhote e um jack russell.',
  },
];
