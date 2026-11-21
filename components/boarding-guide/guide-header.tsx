import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import logoMark from '@/assets/brand/logo-mark.svg';
import { CheckIcon, ListIcon } from '@/components/ui/icons';
import { chapters } from '@/lib/boarding-guide/chapters';

/**
 * Sticky header with the brand mark, the chapter index and the reading
 * progress bar. The index is a native `<details>` menu, so it works without
 * JavaScript.
 */
export function GuideHeader(): ReactNode {
  return (
    <header className="sticky top-0 z-20 border-b border-forest/10 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-page items-center justify-between gap-4 px-4 sm:px-8">
        <Link
          href="#boas-vindas"
          className="flex items-center gap-2 font-heading font-bold text-forest"
        >
          <Image src={logoMark} alt="" className="size-9" unoptimized />
          <span>Guia da hospedagem</span>
        </Link>
        <details className="group relative">
          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-full px-3 font-heading font-semibold text-forest hover:bg-forest/10 [&::-webkit-details-marker]:hidden">
            <ListIcon className="size-5" />
            <span>Capítulos</span>
          </summary>
          <nav
            aria-label="Capítulos do guia"
            className="absolute right-0 mt-2 w-72 rounded-card bg-white p-2 shadow-lift"
          >
            <ol className="space-y-1">
              {chapters.map((chapter, index) => (
                <li key={chapter.id}>
                  <a
                    href={`#${chapter.id}`}
                    data-checkpoint-item={
                      chapter.kind === 'rule' ? chapter.id : undefined
                    }
                    className="flex min-h-11 items-center gap-3 rounded-md px-3 py-2 text-ink hover:bg-cream"
                  >
                    <span
                      aria-hidden="true"
                      className={`grid size-7 shrink-0 place-items-center rounded-full font-heading text-caption font-bold ${chapter.kind === 'rule' ? 'bg-olive text-cream' : 'bg-cream text-forest'}`}
                    >
                      {index}
                    </span>
                    <span>{chapter.title}</span>
                    {chapter.kind === 'rule' ? (
                      <span className="checkpoint-mark ml-auto grid size-6 shrink-0 place-items-center rounded-full text-olive">
                        <CheckIcon className="size-4" />
                      </span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </details>
      </div>
      <div
        aria-hidden="true"
        className="scroll-progress absolute inset-x-0 bottom-0 h-1 bg-lime"
      />
    </header>
  );
}
