import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

/**
 * Visual variants available for {@link ButtonLink} and {@link Button}.
 *
 * - `primary`: lime pill, the main action of a block.
 * - `secondary`: brown pill, also the header action ("Agendar").
 * - `outline`: bordered pill that follows the section tone.
 * - `dark`: forest pill with white text, for strong actions on light tones.
 * - `link`: underlined text action beside a primary pill.
 */
export type ButtonVariant =
  'primary' | 'secondary' | 'outline' | 'dark' | 'link';

/**
 * Sizes available for {@link ButtonLink} and {@link Button}.
 *
 * - `md`: 48px tall, the default for actions inside the page.
 * - `sm`: 40px tall, for compact places such as the site header.
 */
export type ButtonSize = 'md' | 'sm';

const shared =
  'group inline-flex items-center justify-center font-heading text-body font-bold disabled:pointer-events-none disabled:opacity-50';

/** Height, gap and padding per size: `plain` without a chip, `chip` with one. */
const sizes: Record<ButtonSize, { base: string; plain: string; chip: string }> =
  {
    md: {
      base: 'min-h-12 gap-2',
      plain: 'px-6 py-2.5',
      chip: 'py-1.5 pr-1.5 pl-6',
    },
    sm: {
      base: 'min-h-10 gap-1.5',
      plain: 'px-4 py-1.5',
      chip: 'py-1 pr-1 pl-4',
    },
  };

/** Diameter of the icon chip per size. */
const chipSizes: Record<ButtonSize, string> = {
  md: 'size-9',
  sm: 'size-8',
};

const pill =
  'rounded-full transition-[transform,background-color,box-shadow] duration-(--duration-base) ease-playful hover:-translate-y-0.5 active:translate-y-0';

const variants: Record<ButtonVariant, string> = {
  primary: `${pill} bg-lime text-forest shadow-card hover:shadow-lift`,
  secondary: `${pill} bg-brown text-cream shadow-card hover:shadow-lift`,
  outline: `${pill} inset-ring-2 inset-ring-current text-heading hover:bg-fg/10 hover:shadow-none`,
  dark: `${pill} bg-forest text-white shadow-card hover:bg-olive hover:shadow-lift`,
  link: 'text-heading underline decoration-lime decoration-2 underline-offset-6 transition-colors duration-(--duration-fast) hover:decoration-current',
};

/**
 * Icon treatment per variant: the primary pill holds the icon in a round
 * forest chip; the others show it inline.
 */
const chips: Partial<Record<ButtonVariant, string>> = {
  primary: 'bg-forest text-white',
};

const inlineIcons: Record<ButtonVariant, string> = {
  primary: '',
  secondary: 'text-cream',
  outline: '',
  dark: 'text-lime',
  link: '',
};

/**
 * Returns the class names for a button-styled element.
 *
 * @param variant - Visual variant.
 * @param className - Extra classes appended at the end.
 * @param withChip - Whether the button ends with an icon chip (tightens the
 *   right padding so the chip sits evenly inside the pill).
 * @param size - Button size (`md` by default).
 */
export function buttonClasses(
  variant: ButtonVariant = 'primary',
  className = '',
  withChip = false,
  size: ButtonSize = 'md',
): string {
  const { base, plain, chip } = sizes[size];
  const padding = variant === 'link' ? '' : withChip ? chip : plain;
  return `${shared} ${base} ${variants[variant]} ${padding} ${className}`.trim();
}

/**
 * Renders the label followed by the optional trailing icon, wrapped in a
 * chip on the primary pill.
 */
function ButtonContent({
  variant,
  size,
  icon,
  children,
}: {
  variant: ButtonVariant;
  size: ButtonSize;
  icon?: ReactNode;
  children: ReactNode;
}): ReactNode {
  if (!icon) return children;
  const chip = chips[variant];
  return (
    <>
      <span>{children}</span>
      {chip ? (
        <span
          className={`ml-1 flex ${chipSizes[size]} shrink-0 items-center justify-center rounded-full transition-transform duration-(--duration-base) ease-playful group-hover:translate-x-0.5 ${chip}`}
        >
          {icon}
        </span>
      ) : (
        <span className={`flex shrink-0 ${inlineIcons[variant]}`}>{icon}</span>
      )}
    </>
  );
}

/** Props shared by {@link ButtonLink} and {@link Button}. */
type ButtonOwnProps = {
  variant?: ButtonVariant;
  /** Button size (`md` by default; `sm` for compact places like the header). */
  size?: ButtonSize;
  /**
   * Decorative icon shown after the label (pass an icon from
   * `components/ui/icons.tsx`, e.g. `<ChevronRightIcon className="size-5" />`).
   */
  icon?: ReactNode;
};

/** Props for {@link ButtonLink}. */
export type ButtonLinkProps = ComponentProps<typeof Link> &
  ButtonOwnProps & {
    children: ReactNode;
  };

/** A link styled as a button (e.g. the WhatsApp call to action). */
export function ButtonLink({
  variant = 'primary',
  size = 'md',
  icon,
  className,
  children,
  ...props
}: ButtonLinkProps): ReactNode {
  return (
    <Link
      className={buttonClasses(
        variant,
        className,
        Boolean(icon && chips[variant]),
        size,
      )}
      {...props}
    >
      <ButtonContent variant={variant} size={size} icon={icon}>
        {children}
      </ButtonContent>
    </Link>
  );
}

/** Props for {@link Button}. */
export type ButtonProps = ComponentProps<'button'> & ButtonOwnProps;

/** A native button with the brand button styles. */
export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  className,
  type = 'button',
  children,
  ...props
}: ButtonProps): ReactNode {
  return (
    <button
      type={type}
      className={buttonClasses(
        variant,
        className,
        Boolean(icon && chips[variant]),
        size,
      )}
      {...props}
    >
      <ButtonContent variant={variant} size={size} icon={icon}>
        {children}
      </ButtonContent>
    </button>
  );
}
