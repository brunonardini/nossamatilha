/** A chapter of the boarding guide, used by the page and the chapter index. */
export type Chapter = {
  /** Anchor id (pt-BR, used in the URL hash). */
  id: string;
  /** Title shown in the chapter index. */
  title: string;
  /** `rule` chapters are the dark checkpoints the visitor must absorb. */
  kind: 'story' | 'rule';
};

/** Chapters in reading order (see docs/boarding-guide-script.md). */
export const chapters: readonly Chapter[] = [
  { id: 'boas-vindas', title: 'Bem-vindo à Matilha', kind: 'story' },
  { id: 'quem-somos', title: 'Quem somos e como é o espaço', kind: 'story' },
  { id: 'equipe', title: 'Quem cuida do seu cão', kind: 'story' },
  { id: 'um-dia', title: 'Um dia na Matilha', kind: 'story' },
  { id: 'vacinas', title: 'Vacinas e cuidados de saúde', kind: 'rule' },
  { id: 'como-reservar', title: 'Como reservar', kind: 'story' },
  { id: 'diaria', title: 'Como funciona a diária', kind: 'rule' },
  { id: 'malinha', title: 'O que levar na malinha', kind: 'rule' },
  {
    id: 'cancelamento',
    title: 'Como cancelar ou prolongar a estadia',
    kind: 'rule',
  },
  {
    id: 'banho-e-tosa',
    title: 'Banho e tosa durante a hospedagem',
    kind: 'story',
  },
  { id: 'tudo-pronto', title: 'Antes da primeira estadia', kind: 'story' },
];
