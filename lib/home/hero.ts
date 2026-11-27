import type { StaticImageData } from 'next/image';
import orbitLyingFluffy from '@/assets/photos/home/hero-orbit-lying-fluffy.webp';
import orbitSmilingBully from '@/assets/photos/home/hero-orbit-smiling-bully.webp';
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
    src: orbitLyingFluffy,
    alt: 'Um cão peludo preto e caramelo deitado no chão da área coberta da creche, com a língua de fora.',
  },
  {
    src: orbitSmilingBully,
    alt: 'Um bully caramelo de olhos fechados e língua de fora, sorrindo no gramado ao lado de uma bolinha azul.',
  },
  {
    src: orbitYardTrio,
    alt: 'Três cães sorridentes no gramado olhando para a câmera: um border collie, um são-bernardo filhote e um jack russell.',
  },
];
