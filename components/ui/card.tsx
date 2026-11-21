import type { ComponentProps, ReactNode } from 'react';

/** Props for {@link Card}. */
export type CardProps = ComponentProps<'div'> & {
  /** Shows the lime bar on the left edge, as in the brochure cards. */
  accent?: boolean;
};

/**
 * Rounded content card on the raised surface of the current section tone.
 */
export function Card({
  accent = true,
  className = '',
  children,
  ...props
}: CardProps): ReactNode {
  return (
    <div
      className={`relative overflow-hidden rounded-card bg-surface-raised p-6 shadow-card ${accent ? 'pl-8' : ''} ${className}`.trim()}
      {...props}
    >
      {accent ? (
        <span
          aria-hidden="true"
          className="absolute inset-y-4 left-0 w-2 rounded-r-full bg-lime"
        />
      ) : null}
      {children}
    </div>
  );
}
