import type { ReactNode } from 'react';

/** Props for {@link ChapterSection}. */
export type ChapterSectionProps = {
  /** Anchor id, from `lib/boarding-guide/chapters.ts`. */
  id: string;
  /** Section tone: `light` for story, `dark` for rules and checkpoints. */
  tone: 'light' | 'dark';
  /** Chapter number shown in the eyebrow. */
  number: number;
  /** Short label shown in the eyebrow (e.g. "Parada 1 de 4"). */
  eyebrow?: string;
  /** Chapter title (rendered as `h2`). */
  title: ReactNode;
  /** `display` uses Grandstander for story chapters; `heading` uses Outfit. */
  titleStyle?: 'display' | 'heading';
  /** Optional intro paragraph under the title. */
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
};

/**
 * A chapter of the boarding guide: a full-width section with the tone that
 * tells the visitor what kind of content it holds.
 */
export function ChapterSection({
  id,
  tone,
  number,
  eyebrow,
  title,
  titleStyle = 'display',
  intro,
  children,
  className = '',
}: ChapterSectionProps): ReactNode {
  const headingId = `${id}-titulo`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`${tone === 'dark' ? 'tone-dark' : 'tone-light'} scroll-mt-16 px-4 py-16 sm:px-8 sm:py-24 ${className}`}
    >
      <div className="mx-auto max-w-page">
        <p className="font-heading text-caption font-semibold tracking-widest text-accent uppercase">
          {String(number).padStart(2, '0')}
          {eyebrow ? ` · ${eyebrow}` : null}
        </p>
        <h2
          id={headingId}
          className={
            titleStyle === 'display'
              ? 'mt-2 font-display text-display'
              : 'mt-2 text-h1 font-extrabold'
          }
        >
          {title}
        </h2>
        {intro ? (
          <div className="mt-4 max-w-reading text-lead">{intro}</div>
        ) : null}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
