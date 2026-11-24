import type { ReactNode } from 'react';
import { Hero } from '@/components/home/hero';
import { SiteHeader } from '@/components/home/site-header';

/** Home page. Sections are added one by one (navbar and hero so far). */
export default function Home(): ReactNode {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
      </main>
    </>
  );
}
