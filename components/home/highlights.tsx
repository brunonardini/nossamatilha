import Image from 'next/image';
import type { ReactNode } from 'react';
import { PawIcon } from '@/components/ui/icons';
import { splitLastWord } from '@/lib/format';
import {
  highlightsArea,
  highlightsLead,
  homeHighlights,
} from '@/lib/home/highlights';

/**
 * Highlights box below the home hero (information only, no links): a forest
 * band with the lead (where and when), the area figure raised above the band
 * as a lit card with a photo, and the other figures in lime, split by a thin
 * line (between "24 horas" and "Até 32 cães"). On mobile everything stacks
 * inside the band, with the same line between those two figures.
 */
export function Highlights(): ReactNode {
  // The paw stays on the same line as the last word of the title.
  const [titleLead, titleLast] = splitLastWord(highlightsLead.title);
  return (
    <section
      aria-label="Nossa estrutura"
      className="tone-light px-4 pb-16 sm:px-8 sm:pb-24 lg:pt-14"
    >
      <div className="mx-auto max-w-page rounded-blob bg-forest p-6 text-cream shadow-lift sm:p-8 lg:grid lg:grid-cols-[1.1fr_1.2fr_1fr_1fr] lg:items-center lg:gap-6 lg:py-6">
        <div>
          <p className="font-heading text-h3 font-bold text-white">
            {titleLead}
            <span className="whitespace-nowrap">
              {titleLast}
              <PawIcon className="ml-1.5 inline-block size-6 -translate-y-0.5 rotate-12 align-middle text-lime" />
            </span>
          </p>
          <p className="mt-2 font-heading font-semibold text-lime">
            {highlightsLead.detail}
          </p>
        </div>

        <div className="relative mt-6 mb-1 overflow-hidden rounded-card border border-white/15 bg-linear-to-br from-leaf to-olive p-5 shadow-lift lg:-my-14 lg:py-8">
          <div
            aria-hidden="true"
            className="absolute -top-10 -right-10 size-28 rounded-full bg-lime/20"
          />
          <div className="relative flex items-center gap-4 lg:block">
            <div className="size-20 shrink-0 overflow-hidden rounded-md ring-2 ring-white/70">
              <Image
                src={highlightsArea.photo.src}
                alt={highlightsArea.photo.alt}
                sizes="80px"
                className="size-full object-cover"
              />
            </div>
            <div className="lg:mt-4">
              <p className="font-display text-h1 font-black whitespace-nowrap text-white">
                {highlightsArea.value}
              </p>
              <p className="mt-1 text-cream">{highlightsArea.label}</p>
            </div>
          </div>
        </div>

        {homeHighlights.map((item) => (
          <div
            key={item.value}
            className="border-cream/15 py-5 last:border-t last:pb-0 lg:py-0 lg:last:border-t-0 lg:last:border-l lg:last:pl-6"
          >
            <p className="font-display text-h1 font-black whitespace-nowrap text-lime lg:text-h2">
              {item.value}
            </p>
            <p className="mt-1 text-cream/85">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
