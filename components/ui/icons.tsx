import type { ComponentProps, ReactNode } from 'react';

/** Props shared by the inline SVG icons (decorative by default). */
export type IconProps = ComponentProps<'svg'>;

function Svg({
  children,
  className = 'size-6',
  ...props
}: IconProps): ReactNode {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}

/** Chat bubble, used for WhatsApp calls to action. */
export function ChatIcon(props: IconProps): ReactNode {
  return (
    <Svg {...props}>
      <path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 21l2.1-5.6A8.4 8.4 0 1 1 21 11.5Z" />
      <path d="M8.5 10h7M8.5 13.5h4.5" />
    </Svg>
  );
}

/** Check mark. */
export function CheckIcon(props: IconProps): ReactNode {
  return (
    <Svg {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Svg>
  );
}

/** Cross mark, for things that are not allowed. */
export function CrossIcon(props: IconProps): ReactNode {
  return (
    <Svg {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Svg>
  );
}

/** Arrow pointing down, for "scroll down" cues. */
export function ArrowDownIcon(props: IconProps): ReactNode {
  return (
    <Svg {...props}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </Svg>
  );
}

/** Chevron pointing right, for "go forward" calls to action. */
export function ChevronRightIcon(props: IconProps): ReactNode {
  return (
    <Svg {...props}>
      <path d="m9 6 6 6-6 6" />
    </Svg>
  );
}

/** Calendar, used for booking calls to action ("Agendar"). */
export function CalendarIcon(props: IconProps): ReactNode {
  return (
    <Svg {...props}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
      <path d="M8 3v4M16 3v4M3.5 10h17M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" />
    </Svg>
  );
}

/** Award ribbon, for certifications (e.g. FBAA). */
export function AwardIcon(props: IconProps): ReactNode {
  return (
    <Svg {...props}>
      <circle cx="12" cy="9" r="6" />
      <path d="m8.5 13.9-1.5 7.1 5-3 5 3-1.5-7.1" />
    </Svg>
  );
}

/** Five-point star, filled, for ratings (decorative; pair with text). */
export function StarIcon({
  className = 'size-6',
  ...props
}: IconProps): ReactNode {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="currentColor"
      {...props}
    >
      <path d="M12 2.8l2.76 5.6 6.18.9-4.47 4.36 1.05 6.15L12 16.9l-5.52 2.9 1.05-6.15L3.06 9.3l6.18-.9L12 2.8Z" />
    </svg>
  );
}

/** List icon, used by the chapter index button. */
export function ListIcon(props: IconProps): ReactNode {
  return (
    <Svg {...props}>
      <path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" />
    </Svg>
  );
}

/** Camera outline, used for the Instagram link (no brand logo). */
export function CameraIcon(props: IconProps): ReactNode {
  return (
    <Svg {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </Svg>
  );
}

/** Paw print, filled, for decoration. */
export function PawIcon({
  className = 'size-6',
  ...props
}: IconProps): ReactNode {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="currentColor"
      {...props}
    >
      <ellipse cx="32" cy="44" rx="14" ry="12" />
      <ellipse cx="14" cy="28" rx="6" ry="8" />
      <ellipse cx="25" cy="16" rx="6" ry="8" />
      <ellipse cx="39" cy="16" rx="6" ry="8" />
      <ellipse cx="50" cy="28" rx="6" ry="8" />
    </svg>
  );
}

/** Pause (two bars), for media-like controls. */
export function PauseIcon(props: IconProps): ReactNode {
  return (
    <Svg {...props}>
      <path d="M9 5v14M15 5v14" />
    </Svg>
  );
}

/** Play (triangle), for media-like controls. */
export function PlayIcon(props: IconProps): ReactNode {
  return (
    <Svg {...props}>
      <path d="M8 5.5v13l10-6.5-10-6.5Z" fill="currentColor" />
    </Svg>
  );
}
