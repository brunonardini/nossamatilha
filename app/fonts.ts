import { Figtree, Grandstander, Outfit } from 'next/font/google';

/**
 * Display typeface, closest Google Fonts match to the logo wordmark.
 * Only the Black (900) weight is loaded. Use it for large, short text only.
 */
export const fontDisplay = Grandstander({
  weight: '900',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-grandstander',
});

/** Heading typeface, matching the brochure headings (Kanesty ExtraBold). */
export const fontHeading = Outfit({
  weight: ['600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

/** Body typeface for running text, tuned for legibility on mobile. */
export const fontBody = Figtree({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-figtree',
});

/** Class names that expose every font CSS variable; apply once on `<html>`. */
export const fontVariables = [
  fontDisplay.variable,
  fontHeading.variable,
  fontBody.variable,
].join(' ');
