import { Figtree, Grandstander, Outfit } from 'next/font/google';
import localFont from 'next/font/local';

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

/**
 * Lettering typeface: Goldplay Alt Black Italic (Latinotype), for the hero
 * title only. License held by Nossa Matilha; the file is a woff2 subset
 * (Latin + Portuguese accents) of the licensed OTF.
 */
export const fontLettering = localFont({
  src: './fonts/goldplay-alt-black-italic.woff2',
  weight: '900',
  style: 'italic',
  display: 'swap',
  variable: '--font-goldplay-alt',
});

/** Class names that expose every font CSS variable; apply once on `<html>`. */
export const fontVariables = [
  fontDisplay.variable,
  fontHeading.variable,
  fontBody.variable,
  fontLettering.variable,
].join(' ');
