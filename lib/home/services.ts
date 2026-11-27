import boarding from '@/assets/photos/home/services/boarding.webp';
import daycare from '@/assets/photos/home/services/daycare.webp';
import training from '@/assets/photos/home/services/training.webp';
import type { HomePhoto } from '@/lib/home/hero';

/** A service card of the home services section. */
export type HomeService = {
  id: string;
  name: string;
  /** Short facts line above the name; omitted while unconfirmed. */
  meta?: string;
  summary: string;
  /** Checked points; empty while the owner has not confirmed details. */
  highlights: readonly string[];
  /** Card photo (3:2 WebP crop, no metadata). */
  photo: HomePhoto;
};

/**
 * Services of the home page, in the owner's order. Copy only states facts
 * from docs/business.md (and the hero subtitle for the last three services,
 * whose details still need the owner's input).
 */
export const homeServices: readonly HomeService[] = [
  {
    id: 'creche',
    name: 'Creche',
    meta: '7h às 18h · Gramado e área coberta',
    summary:
      'Um dia de brincadeira e convivência, em grupos formados pelo nível de energia de cada cão.',
    highlights: [
      'Grupos por nível de energia, não por porte',
      'Mais de 1.200 m² para lazer, recreação e descanso',
      'Monitores com experiência em cuidado de cães',
    ],
    photo: {
      src: daycare,
      alt: 'Quatro cães sorridentes no gramado da creche e, ao fundo, outro cão na área coberta.',
    },
  },
  {
    id: 'hospedagem',
    name: 'Hospedagem',
    meta: 'Diária de 24h · Reserva com 48h',
    summary:
      'Brincadeira de dia nas áreas da creche e uma noite tranquila nos quartos de descanso, com plantonista.',
    highlights: [
      'Monitoramento 24h por equipe qualificada',
      'Equipe com formação de auxiliar veterinário',
      'Até 32 cães, com atenção a cada um',
      'Dormitórios fechados, climatizados e aconchegantes',
    ],
    photo: {
      src: boarding,
      alt: 'Três cães descansando em caminhas no quarto da hospedagem; na frente, um shih-tzu numa cama rosa.',
    },
  },
  {
    id: 'adestramento',
    name: 'Adestramento',
    meta: 'Certificação FBAA',
    summary:
      'Educação com reforço positivo, com profissionais qualificados, em um espaço adequado com as devidas condições sanitárias.',
    highlights: [
      'Treinamento sem petiscos',
      'Certificado de conclusão',
      'Espaço de socialização com outros cães',
      'Aulas com o tutor',
    ],
    photo: {
      src: training,
      alt: 'Aula de adestramento na área coberta: tutores com seus cães na guia e a turma ouvindo a orientação.',
    },
  },
];
