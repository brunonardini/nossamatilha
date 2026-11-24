import type { Metadata } from 'next';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { Hero } from '@/components/home/hero';
import { SiteHeader } from '@/components/home/site-header';
import { PawIcon } from '@/components/ui/icons';
import { highlightsLead, homeHighlights } from '@/lib/home/highlights';

export const metadata: Metadata = {
  title: 'Rascunho: box de destaques',
  robots: { index: false, follow: false },
};

/**
 * Draft page (temporary): three options for the highlights box below the
 * home hero, so the owner can pick one. Delete it once the box is built.
 */
export default function HighlightsDraftPage(): ReactNode {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Option label="Opção A: faixa folha">
          <LeafBand />
        </Option>
        <Option label="Opção B: noite com cartão em destaque">
          <NightBand />
        </Option>
        <Option label="Opção C: cartões no creme">
          <CreamCards />
        </Option>
      </main>
    </>
  );
}

function Option({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}): ReactNode {
  return (
    <section className="tone-light px-4 pb-20 sm:px-8">
      <div className="mx-auto max-w-page">
        <p className="mb-6 inline-block rounded-full bg-sun px-4 py-1 font-heading font-bold text-ink">
          {label}
        </p>
        {children}
      </div>
    </section>
  );
}

/** Round photo of the lead, with a lime ring and a soft halo. */
function LeadPhoto({ className = '' }: { className?: string }): ReactNode {
  return (
    <div
      className={`shrink-0 overflow-hidden rounded-full ring-4 ring-lime ${className}`}
    >
      <Image
        src={highlightsLead.photo.src}
        alt=""
        sizes="112px"
        className="size-full object-cover"
      />
    </div>
  );
}

/** A: mockup 8. Leaf → forest band with a white border, figures split by lines. */
function LeafBand(): ReactNode {
  return (
    <div className="rounded-blob border-4 border-white bg-linear-to-r from-leaf-ink to-forest p-6 text-white shadow-lift sm:p-8 lg:flex lg:items-center lg:gap-8 lg:px-10">
      <div className="flex items-center gap-5 lg:w-80 lg:shrink-0">
        <div className="rounded-full bg-lime/25 p-2">
          <LeadPhoto className="size-20 sm:size-24" />
        </div>
        <div>
          <p className="font-heading text-h3 font-bold">
            {highlightsLead.title}
          </p>
          <p className="mt-1 text-cream/85">{highlightsLead.detail}</p>
        </div>
      </div>
      <ul className="mt-6 grid divide-y divide-white/15 border-t border-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:mt-0 lg:flex-1 lg:border-t-0">
        {homeHighlights.map((item) => (
          <li
            key={item.value}
            className="flex flex-col py-5 text-center sm:px-4 lg:py-2"
          >
            <p className="font-display text-h1 font-black whitespace-nowrap lg:text-h2">
              {item.value}
            </p>
            <p className="mx-auto mt-1 max-w-60 text-cream/85">{item.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** B: mockup 4. Forest band; the area figure rises as a lit card with a photo. */
function NightBand(): ReactNode {
  const [area, ...rest] = homeHighlights;
  return (
    <div className="mt-8 rounded-blob bg-forest p-6 text-cream shadow-lift sm:p-8 lg:grid lg:grid-cols-[1.1fr_1.2fr_1fr_1fr] lg:items-center lg:gap-6 lg:py-6">
      <div className="lg:border-r lg:border-cream/15 lg:pr-6">
        <p className="flex items-center gap-2 font-heading text-h3 font-bold text-white">
          {highlightsLead.title}
          <PawIcon className="size-5 shrink-0 text-lime" />
        </p>
        <p className="mt-2 font-heading font-semibold text-lime">
          {highlightsLead.detail}
        </p>
      </div>

      {area ? (
        <div className="relative my-6 overflow-hidden rounded-card border border-white/15 bg-linear-to-br from-leaf to-olive p-5 shadow-lift lg:-my-14 lg:py-8">
          <div className="absolute -top-10 -right-10 size-28 rounded-full bg-lime/20" />
          <div className="relative flex items-center gap-4 lg:block">
            <div className="size-20 shrink-0 overflow-hidden rounded-md ring-2 ring-white/70">
              <Image
                src={highlightsLead.photo.src}
                alt=""
                sizes="80px"
                className="size-full object-cover"
              />
            </div>
            <div className="lg:mt-4">
              <p className="font-display text-h1 font-black whitespace-nowrap text-white">
                {area.value}
              </p>
              <p className="mt-1 text-cream">{area.label}</p>
            </div>
          </div>
        </div>
      ) : null}

      {rest.map((item) => (
        <div
          key={item.value}
          className="border-t border-cream/15 py-5 lg:border-t-0 lg:py-0"
        >
          <p className="font-display text-h1 font-black whitespace-nowrap text-lime lg:text-h2">
            {item.value}
          </p>
          <p className="mt-1 text-cream/85">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

/** C: loose cards on cream. Brown lead card with the photo, white figure cards. */
function CreamCards(): ReactNode {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <li className="flex flex-col justify-between gap-6 rounded-card bg-brown p-6 text-cream shadow-card">
        <LeadPhoto className="size-20" />
        <div>
          <p className="font-heading text-h3 font-bold">
            {highlightsLead.title}
          </p>
          <p className="mt-2 font-heading font-semibold text-sun">
            {highlightsLead.detail}
          </p>
        </div>
      </li>
      {homeHighlights.map((item) => (
        <li
          key={item.value}
          className="relative overflow-hidden rounded-card bg-white p-6 shadow-card"
        >
          <span className="absolute inset-x-6 top-0 h-1.5 rounded-b-full bg-lime" />
          <p className="mt-6 font-display text-h1 font-black whitespace-nowrap text-forest">
            {item.value}
          </p>
          <p className="mt-2 text-ink/80">{item.label}</p>
        </li>
      ))}
    </ul>
  );
}
