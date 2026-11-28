import type { ReactNode } from 'react';

/** Props for {@link HeroTitle}. */
export type HeroTitleProps = {
  /** Extra classes (grid placement). */
  className?: string;
  /**
   * Element to render: the home hero uses the `h1` (with the `hero-titulo`
   * id its section points to); previews such as `/design-system` use `p`.
   */
  as?: 'h1' | 'p';
};

/**
 * Hero title as live text in Goldplay Alt Black Italic, all caps: "A ROTINA
 * QUE SEU / CÃO MERECE". Each line's ink fills the column, so the shorter
 * second line comes out bigger and stresses "cão" and "merece". The
 * `lettering-fit-*` values are each line's ink width in em × 1000 and
 * `lettering-inset-*` its left bearing (`lettering-room-*` makes space for
 * the tilde), measured in the browser with the font loaded; re-measure when
 * the text changes. The DOM text stays in sentence case for screen readers;
 * the capitals come from CSS.
 */
export function HeroTitle({
  className = '',
  as: Tag = 'h1',
}: HeroTitleProps): ReactNode {
  return (
    <Tag
      id={Tag === 'h1' ? 'hero-titulo' : undefined}
      className={`@container font-lettering font-black text-highlight uppercase italic ${className}`}
    >
      <span className="lettering-fit-9370">A rotina que seu</span>{' '}
      <span className="lettering-fit-6247 lettering-inset-78 lettering-room-220">
        cão merece
      </span>
    </Tag>
  );
}
