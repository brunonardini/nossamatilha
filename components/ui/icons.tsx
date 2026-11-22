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
