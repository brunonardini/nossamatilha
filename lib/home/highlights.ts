import daycareArea from '@/assets/photos/home/daycare-area.webp';
import type { HomePhoto } from '@/lib/home/hero';

/** One figure of the home highlights box: a short value and its caption. */
export type HomeHighlight = {
  value: string;
  label: string;
};

/**
 * Lead of the home highlights box (below the hero): where the business is and
 * the check-in/pick-up window (see docs/business.md).
 */
export const highlightsLead: { title: string; detail: string } = {
  title: 'Estrutura completa em Resende, RJ',
  detail: 'Entrada e retirada das 7h às 18h',
};

/**
 * The area figure, shown in the raised card of the highlights box with this
 * photo (square WebP crop, no metadata, no people).
 */
export const highlightsArea: HomeHighlight & { photo: HomePhoto } = {
  value: '+1.200 m²',
  label: 'de espaço para lazer, recreação e descanso',
  photo: {
    src: daycareArea,
    alt: 'Área coberta da creche, com piso emborrachado, aberta para um gramado amplo.',
  },
};

/** The other figures of the highlights box, in display order. */
export const homeHighlights: readonly HomeHighlight[] = [
  { value: '24 horas', label: 'de cuidado e acompanhamento profissional' },
  { value: 'Até 32 cães', label: 'hospedados com atenção individualizada' },
];
