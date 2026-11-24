import type { ReactNode } from 'react';
import { HeroLettering } from '@/components/home/hero-lettering';
import { HeroMotion } from '@/components/home/hero-motion';
import { HeroPortrait } from '@/components/home/hero-portrait';
import { ScrollCue } from '@/components/home/scroll-cue';
import { Button } from '@/components/ui/button';
import { ChevronRightIcon } from '@/components/ui/icons';

/**
 * Home hero. Mobile first: the title and the portrait fill the first screen
 * (the portrait overlaps the title, so Silvia stands in front of the words)
 * and a {@link ScrollCue} invites the visitor down; the description and the
 * calls to action appear only from `lg`, with the text on the left and the
 * portrait on the right.
 */
export function Hero(): ReactNode {
  return (
    <section
      aria-labelledby="hero-titulo"
      className="tone-light overflow-x-clip"
    >
      <div className="mx-auto grid max-w-page px-4 pt-4 pb-16 sm:px-8 sm:pb-24 lg:grid-cols-2 lg:items-center lg:gap-x-16 lg:pt-12">
        {/* Lettering in the logo font, drawn as SVG; the real text is for
            screen readers and search engines. */}
        <h1
          id="hero-titulo"
          className="text-highlight lg:col-start-1 lg:row-start-1 lg:max-w-md lg:self-end"
        >
          <span className="sr-only">A rotina que seu cão merece</span>
          <HeroLettering />
        </h1>

        <HeroMotion className="-mt-6 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0">
          <HeroPortrait />
        </HeroMotion>

        <div className="hidden lg:col-start-1 lg:block lg:row-start-2 lg:mt-8 lg:self-start">
          <p className="max-w-reading text-lead">
            Creche, hospedagem 24h, banho e tosa, adestramento positivo,
            passeios educativos e transporte. Cuidado completo com uma equipe
            especializada e apaixonada pelo que faz.
          </p>
          {/* No actions yet: the target sections are built later. */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button icon={<ChevronRightIcon className="size-5" />}>
              Explorar serviços
            </Button>
            <Button variant="link">Solicitar avaliação</Button>
          </div>
        </div>
      </div>
      <ScrollCue />
    </section>
  );
}
