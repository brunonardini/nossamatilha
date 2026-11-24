import { guidePhotos } from '@/lib/boarding-guide/photos';
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
export const highlightsLead: {
  title: string;
  detail: string;
  photo: HomePhoto;
} = {
  title: 'Estrutura completa em Resende, RJ',
  detail: 'Entrada e retirada das 7h às 18h',
  photo: guidePhotos.spaceDaycareLawn,
};

/** The three figures of the home highlights box, in display order. */
export const homeHighlights: readonly HomeHighlight[] = [
  { value: '+1.200 m²', label: 'de espaço para lazer, recreação e descanso' },
  { value: '24 horas', label: 'de cuidado e acompanhamento profissional' },
  { value: 'Até 32 cães', label: 'hospedados com atenção individualizada' },
];
