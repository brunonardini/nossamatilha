import type { ReactNode } from 'react';
import { Hero } from '@/components/home/hero';
import { Highlights } from '@/components/home/highlights';
import { SiteHeader } from '@/components/home/site-header';

/** Home page. Sections are added one by one (navbar, hero and highlights so far). */
export default function Home(): ReactNode {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Highlights />
      </main>
    </>
  );
}
