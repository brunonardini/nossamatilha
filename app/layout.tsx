import type { Metadata, Viewport } from 'next';
import { fontVariables } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nossa Matilha',
  description: 'Nossa Matilha | Resende/RJ',
};

export const viewport: Viewport = {
  themeColor: '#4a5b32',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="pt-BR" className={fontVariables} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
