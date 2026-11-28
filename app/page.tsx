import type { ReactNode } from 'react';
import { Contact } from '@/components/home/contact';
import { Hero } from '@/components/home/hero';
import { Highlights } from '@/components/home/highlights';
import { Location } from '@/components/home/location';
import { Reviews } from '@/components/home/reviews';
import { Services } from '@/components/home/services';
import { SiteFooter } from '@/components/home/site-footer';
import { SiteHeader } from '@/components/home/site-header';
import { Team } from '@/components/home/team';

/** Home page. Sections are added one by one (navbar, hero, highlights, services, team, reviews, contact, location and footer). */
export default function Home(): ReactNode {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Highlights />
        <Services />
        <Team />
        <Reviews />
        <Contact />
        <Location />
      </main>
      <SiteFooter />
    </>
  );
}
