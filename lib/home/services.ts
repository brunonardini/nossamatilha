import boarding from '@/assets/photos/home/services/boarding.webp';
import daycare from '@/assets/photos/home/services/daycare.webp';
import grooming from '@/assets/photos/home/services/grooming.webp';
import training from '@/assets/photos/home/services/training.webp';
import transport from '@/assets/photos/home/services/transport.webp';
import walk from '@/assets/photos/home/services/walk.webp';
import type { HomePhoto } from '@/lib/home/hero';

/** A service card of the home services section. */
export type HomeService = {
  id: string;
  /** Two-digit order shown in the card badge ("01"). */
  number: string;
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
    number: '01',
    name: 'Creche',
    meta: '7h às 18h · Gramado e área coberta',
    summary:
      'Um dia de brincadeira e convivência, em grupos formados pelo nível de energia de cada cão.',
    highlights: [
      'Grupos por nível de energia, não por porte',
      'Mais de 1.200 m² para lazer, recreação e descanso',
      'Equipe treinada como monitor de creche',
    ],
    photo: {
      src: daycare,
      alt: 'Quatro cães sorridentes no gramado da creche e, ao fundo, outro cão na área coberta.',
    },
  },
  {
    id: 'hospedagem',
    number: '02',
    name: 'Hospedagem',
    meta: 'Diária de 24h · Reserva com 48h',
    summary:
      'Brincadeira de dia nas áreas da creche e uma noite tranquila nos quartos de descanso, com plantonista.',
    highlights: [
      'Monitoramento 24h por equipe qualificada',
      'Equipe com formação de auxiliar veterinário',
      'Até 32 cães, com atenção a cada um',
    ],
    photo: {
      src: boarding,
      alt: 'Três cães descansando em caminhas no quarto da hospedagem; na frente, um shih-tzu numa cama rosa.',
    },
  },
  {
    id: 'banho-e-tosa',
    number: '03',
    name: 'Banho e tosa',
    meta: 'Parceria Encantacão · Aqui no espaço',
    summary:
      'Banho e tosa feitos no nosso espaço pela parceira Encantacão, com agendamento direto com ela.',
    highlights: [
      'Pode ser incluído na hospedagem, para o seu cão voltar limpo para casa',
      'Atendimento no espaço que o seu cão já conhece',
    ],
    photo: {
      src: grooming,
      alt: 'Um cão caramelo molhado durante o banho, olhando para a câmera, com a banhista ao lado.',
    },
  },
  {
    id: 'adestramento',
    number: '04',
    name: 'Adestramento',
    meta: 'Certificação FBAA',
    summary:
      'Educação com reforço positivo, com a equipe liderada por Silvia Matrumoto, adestradora certificada pela FBAA.',
    highlights: [],
    photo: {
      src: training,
      alt: 'Aula de adestramento na área coberta: tutores com seus cães na guia e a turma ouvindo a orientação.',
    },
  },
  {
    id: 'passeio-educativo',
    number: '05',
    name: 'Passeio educativo',
    summary: 'Passeios educativos conduzidos pela nossa equipe.',
    highlights: [],
    photo: {
      src: walk,
      alt: 'Condutores com cães na guia sobre um tapete vermelho, num evento ao ar livre.',
    },
  },
  {
    id: 'transporte',
    number: '06',
    name: 'Transporte',
    summary: 'Transporte do seu cão, para facilitar a rotina da família.',
    highlights: [],
    photo: {
      src: transport,
      alt: 'Um border collie de língua de fora no banco de trás de um carro, protegido por uma capa de banco.',
    },
  },
];
