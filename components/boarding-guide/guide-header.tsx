import Image from 'next/image';
import type { ReactNode } from 'react';
import logoMark from '@/assets/brand/logo-mark.svg';
import { ChapterMenu } from '@/components/boarding-guide/chapter-menu';

/**
 * Sticky header with the brand mark, the chapter index menu and the
 * reading progress bar.
 */
export function GuideHeader(): ReactNode {
  return (
    <header className="sticky top-0 z-20 border-b border-forest/10 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-page items-center justify-between gap-4 px-4 sm:px-8">
        {/* Native anchor: next/link skips the scroll when the hash is unchanged. */}
        <a
          href="#boas-vindas"
          className="flex items-center gap-2 font-heading font-bold text-forest"
        >
          <Image src={logoMark} alt="" className="size-9" unoptimized />
          <span>Guia da hospedagem</span>
        </a>
        <ChapterMenu />
      </div>
      <div
        aria-hidden="true"
        className="scroll-progress absolute inset-x-0 bottom-0 h-1 bg-lime"
      />
    </header>
  );
}
