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
  { id: 'quem-somos', title: 'Quem somos e o espaço', kind: 'story' },
  { id: 'equipe', title: 'Nossa equipe', kind: 'story' },
  { id: 'um-dia', title: 'Um dia na Matilha', kind: 'story' },
  { id: 'vacinas', title: 'A carteirinha está em dia?', kind: 'rule' },
  { id: 'como-reservar', title: 'Como reservar', kind: 'story' },
  { id: 'diaria', title: 'Como funciona a diária', kind: 'rule' },
  { id: 'malinha', title: 'Arrumando a malinha', kind: 'rule' },
  { id: 'cancelamento', title: 'E se os planos mudarem?', kind: 'rule' },
  { id: 'banho-e-tosa', title: 'Banho e tosa', kind: 'story' },
  { id: 'tudo-pronto', title: 'Tudo pronto!', kind: 'story' },
];
