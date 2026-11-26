import Image from 'next/image';
import type { ReactNode } from 'react';
import { CheckIcon } from '@/components/ui/icons';
import { teamLeadPhoto, teamPhoto, teamSection } from '@/lib/home/team';

/**
 * Home team section: a compact forest box (like the highlights band) with
 * Silvia stepping out of its top edge over a lime leaf, the title, a short
 * intro and the team facts in the middle, and a small group photo on the
 * right. On mobile everything stacks and Silvia's name sits beside her.
 */
export function Team(): ReactNode {
  return (
    <section
      aria-labelledby="equipe-titulo"
      className="tone-light px-4 pt-24 pb-16 sm:px-8 sm:pb-24"
    >
      <div className="mx-auto grid max-w-page gap-6 rounded-blob bg-forest p-6 text-cream shadow-lift sm:p-8 lg:grid-cols-[auto_1fr_17rem] lg:gap-8 lg:py-6">
        <div className="-mt-20 flex items-end gap-4 lg:-mt-16 lg:self-start">
          <div className="relative w-32 shrink-0 lg:w-44">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 aspect-square rounded-full rounded-tr-sm bg-linear-to-br from-lime to-leaf"
            />
            {/* The rounded bottom clips the cut-out to the leaf's curve. */}
            <div className="relative overflow-hidden rounded-b-full">
              <Image
                src={teamLeadPhoto.src}
                alt={teamLeadPhoto.alt}
                sizes="(min-width: 1024px) 132px, 96px"
                className="mx-auto h-auto w-3/4"
              />
            </div>
          </div>
          <div className="pb-2 lg:hidden">
            <p className="font-heading text-h3 font-extrabold text-white">
              {teamSection.leadName}
            </p>
            <p className="text-caption text-lime">{teamSection.leadRole}</p>
          </div>
        </div>

        <div className="lg:self-center">
          <p className="font-heading text-caption font-semibold tracking-widest text-lime uppercase">
            {teamSection.eyebrow}
          </p>
          <h2
            id="equipe-titulo"
            className="mt-2 text-h2 font-extrabold text-white"
          >
            {teamSection.title}
          </h2>
          <p className="mt-2 text-cream/85">{teamSection.intro}</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {teamSection.facts.map((fact) => (
              <li key={fact} className="flex items-center gap-2">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-lime text-forest">
                  <CheckIcon className="size-3" />
                </span>
                {fact}
              </li>
            ))}
          </ul>
        </div>

        <figure className="lg:self-center">
          <Image
            src={teamPhoto.src}
            alt={teamPhoto.alt}
            sizes="(min-width: 1024px) 17rem, (min-width: 640px) 80vw, 100vw"
            className="h-auto w-full rounded-card ring-2 ring-white/70"
          />
          <figcaption className="mt-2 text-caption text-cream/85">
            {teamSection.teamCaption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
