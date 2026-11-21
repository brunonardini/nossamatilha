import 'react';

declare module 'react' {
  /** Allows CSS custom properties (e.g. `--count-to`) in inline styles. */
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
