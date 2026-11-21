import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

/** Visual variants available for {@link ButtonLink} and {@link Button}. */
export type ButtonVariant = 'primary' | 'secondary' | 'outline';

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 font-heading text-base font-bold transition-[transform,background-color,box-shadow] duration-(--duration-base) ease-playful hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-lime text-forest shadow-card hover:shadow-lift',
  secondary: 'bg-brown text-cream shadow-card hover:shadow-lift',
  outline:
    'border-2 border-current text-heading hover:bg-fg/10 hover:shadow-none',
};

/**
 * Returns the class names for a button-styled element.
 *
 * @param variant - Visual variant.
 * @param className - Extra classes appended at the end.
 */
export function buttonClasses(
  variant: ButtonVariant = 'primary',
  className = '',
): string {
  return `${base} ${variants[variant]} ${className}`.trim();
}

/** Props for {@link ButtonLink}. */
export type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

/** A link styled as a button (e.g. the WhatsApp call to action). */
export function ButtonLink({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonLinkProps): ReactNode {
  return (
    <Link className={buttonClasses(variant, className)} {...props}>
      {children}
    </Link>
  );
}

/** Props for {@link Button}. */
export type ButtonProps = ComponentProps<'button'> & {
  variant?: ButtonVariant;
};

/** A native button with the brand button styles. */
export function Button({
  variant = 'primary',
  className,
  type = 'button',
  ...props
}: ButtonProps): ReactNode {
  return (
    <button
      type={type}
      className={buttonClasses(variant, className)}
      {...props}
    />
  );
}
