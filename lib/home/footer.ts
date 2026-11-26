import type { StaticImageData } from 'next/image';
import beagle from '@/assets/photos/footer/dog-beagle.webp';
import bernese from '@/assets/photos/footer/dog-bernese.webp';
import borderCollie from '@/assets/photos/footer/dog-border-collie.webp';
import dachshund from '@/assets/photos/footer/dog-dachshund.webp';
import golden from '@/assets/photos/footer/dog-golden.webp';
import jackRussell from '@/assets/photos/footer/dog-jack-russell.webp';
import scene from '@/assets/photos/footer/scene.webp';
import beeCostume from '@/assets/photos/home/hero-orbit-bee-costume.webp';
import cape from '@/assets/photos/home/hero-orbit-cape.webp';
import yardTrio from '@/assets/photos/home/hero-orbit-yard-trio.webp';
import type { HomePhoto } from '@/lib/home/hero';

/** A footer link: an anchor on the home page or another route. */
export type FooterLink = { href: string; label: string };

/** Home sections, in page order (each section has the matching `id`). */
export const footerMenu: readonly FooterLink[] = [
  { href: '/#servicos', label: 'Serviços' },
  { href: '/#equipe', label: 'Equipe' },
  { href: '/#avaliacoes', label: 'Avaliações' },
  { href: '/#orcamento', label: 'Orçamento' },
];

/** Pages for tutors. The privacy policy page is required by AGENTS.md. */
export const footerForTutors: readonly FooterLink[] = [
  { href: '/guia-da-hospedagem', label: 'Guia da hospedagem' },
  { href: '/politica-de-privacidade', label: 'Política de Privacidade' },
];

/**
 * Panorama of the covered area and the lawn (WebP, transparent sky, no
 * metadata; the board on the wall is blurred). It sits at the bottom of the
 * footer, cropped around the middle on narrow screens.
 */
export const footerScene: HomePhoto = {
  src: scene,
  alt: 'A área coberta e o gramado da Nossa Matilha.',
};

/** A dog cut-out placed on the footer scene (decorative). */
export type FooterDog = {
  src: StaticImageData;
  /** Left edge in % of the scene below `sm` (cropped scene) and from `sm`. */
  left: number;
  leftSm: number;
  /** Feet line and height in % of the scene: smaller under the roof. */
  bottom: number;
  height: number;
  /** Mirrored to face left. */
  flip: boolean;
  /** Only from `sm`, where the whole scene shows. */
  wideOnly: boolean;
};

/**
 * Dogs under the roof (farther, smaller) and on the lawn. On mobile the
 * beagle stands left of the middle pillar, clear of the golden in front.
 */
export const footerDogs: readonly FooterDog[] = [
  {
    src: dachshund,
    left: 14,
    leftSm: 14,
    bottom: 27,
    height: 15,
    flip: false,
    wideOnly: true,
  },
  {
    src: beagle,
    left: 30,
    leftSm: 70,
    bottom: 27,
    height: 19,
    flip: true,
    wideOnly: false,
  },
  {
    src: jackRussell,
    left: 4,
    leftSm: 4,
    bottom: 4,
    height: 30,
    flip: false,
    wideOnly: false,
  },
  {
    src: borderCollie,
    left: 30,
    leftSm: 30,
    bottom: 2,
    height: 30,
    flip: false,
    wideOnly: true,
  },
  {
    src: golden,
    left: 58,
    leftSm: 58,
    bottom: 3,
    height: 42,
    flip: true,
    wideOnly: false,
  },
  {
    src: bernese,
    left: 86,
    leftSm: 86,
    bottom: 5,
    height: 40,
    flip: false,
    wideOnly: true,
  },
];

/** Three snapshots next to the Instagram link (photos already on the site). */
export const footerSnapshots: readonly StaticImageData[] = [
  yardTrio,
  cape,
  beeCostume,
];
