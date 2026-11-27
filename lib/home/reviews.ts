import type { StaticImageData } from 'next/image';
import andreaPimentel from '@/assets/photos/home/reviews/andrea-pimentel.webp';
import ariana from '@/assets/photos/home/reviews/ariana.webp';
import fabiano from '@/assets/photos/home/reviews/fabiano.webp';
import leonardo from '@/assets/photos/home/reviews/leonardo.webp';
import luciene from '@/assets/photos/home/reviews/luciene.webp';
import paolla from '@/assets/photos/home/reviews/paolla.webp';
import patriciaSuane from '@/assets/photos/home/reviews/patricia-suane.webp';

/**
 * A five-star Google review shown on the home page. The reviewers authorized
 * the use of their name, profile photo and text (see AGENTS.md).
 */
export type HomeReview = {
  id: string;
  name: string;
  /** Google profile photo (72px WebP, no metadata); decorative. */
  avatar: StaticImageData;
  /** Excerpt of the review: only cut ("…") and typos fixed, never reworded. */
  text: string;
};

/** Google Maps page of the business with all reviews (no tracking parameters). */
export const googleReviewsUrl =
  'https://www.google.com/maps?cid=18369256326643483100';

/** Reviews in display order: the strongest first. */
export const homeReviews: readonly HomeReview[] = [
  {
    id: 'fabiano',
    name: 'Fabiano Dutra',
    avatar: fabiano,
    text: 'Em um dia pude ver correções de comportamentos com o adestrador que demorei quase um mês para ver em experiências passadas de adestramento.',
  },
  {
    id: 'ariana',
    name: 'Ariana de A. S. da Silva',
    avatar: ariana,
    text: 'No começo me senti culpada em deixá-los, mas depois foi impossível não amar. Eu recebia vários vídeos, fotos… Koda e Violeta foram bem cuidados com muito amor e carinho.',
  },
  {
    id: 'paolla',
    name: 'Paolla Cabral Silva Brasil',
    avatar: paolla,
    text: 'Para o Haroldo, nosso pequeno gigante, ela se tornou uma segunda casa. (…) Encontramos orientação, profissionalismo e, acima de tudo, amor pelos cães.',
  },
  {
    id: 'luciene',
    name: 'Luciene Santos',
    avatar: luciene,
    text: 'Vocês o acolheram no momento mais precioso e delicado, e a transformação dele é emocionante. Hoje ele é outro cachorro, muito mais feliz, sociável e saudável!',
  },
  {
    id: 'leonardo',
    name: 'Leonardo Pimentel',
    avatar: leonardo,
    text: 'Encontrei um lugar que aceitou a Nala, uma Pitbull filhote. Ela foi muito bem recebida e tratada com profissionalismo. O local é amplo, os colaboradores são atenciosos.',
  },
  {
    id: 'patricia-suane',
    name: 'Patrícia Suane',
    avatar: patriciaSuane,
    text: 'Minha cachorrinha é muito medrosa, voltou tranquila e sem sinais de estresse. Fomos muito bem acolhidas.',
  },
  {
    id: 'andrea-pimentel',
    name: 'Andréa Pimentel',
    avatar: andreaPimentel,
    text: 'Nós super recomendamos o Nossa Matilha! Lá nosso cachorro, o Bacana, está sempre feliz! Volta exausto e contentíssimo! Depois do Nossa Matilha, ele é outro: super sociável, obediente… recomendo muito!',
  },
];
