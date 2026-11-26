import silvia from '@/assets/photos/home/team/silvia.webp';
import team from '@/assets/photos/home/team/team.webp';
import type { HomePhoto } from '@/lib/home/hero';

/**
 * Copy of the home team section (see docs/business.md, "People" and "Team").
 * Silvia's name and photos are approved for publication (see AGENTS.md).
 */
export const teamSection: {
  eyebrow: string;
  title: string;
  intro: string;
  leadName: string;
  leadRole: string;
  facts: readonly string[];
  teamCaption: string;
} = {
  eyebrow: 'Quem cuida do seu cão',
  title: 'Uma equipe preparada, liderada pela Silvia',
  intro:
    'A Silvia Matrumoto, CEO e adestradora certificada pela FBAA, acompanha de perto a rotina dos cães, com uma equipe em formação contínua.',
  leadName: 'Silvia Matrumoto',
  leadRole: 'CEO · Certificação FBAA',
  facts: [
    'Formação de auxiliar veterinário',
    'Monitores de creche',
    'Formação contínua',
    'Plantão 24 horas',
  ],
  teamCaption: 'Nossa equipe na área coberta da creche.',
};

/**
 * Silvia from the waist up on a transparent background (WebP with alpha, no
 * metadata), shown stepping out of the top of the team box.
 */
export const teamLeadPhoto: HomePhoto = {
  src: silvia,
  alt: 'Silvia Matrumoto, de braços cruzados e sorrindo, com o uniforme da Nossa Matilha.',
};

/**
 * Group photo of the staff (12:7 WebP, no metadata). The whiteboard behind
 * the team is blurred so nothing written on it can be read.
 */
export const teamPhoto: HomePhoto = {
  src: team,
  alt: 'A equipe da Nossa Matilha reunida na área coberta com alguns cães, quase todos com o uniforme branco e verde.',
};
