import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import logo from '@/assets/brand/logo-nossa-matilha.webp';
import { ButtonAnchor } from '@/components/ui/button';
import { CalendarIcon } from '@/components/ui/icons';

/**
 * Site header of the home page: logo on the left, the booking action on the
 * right ("Agendar", which glides to the contact section). It shares the hero background (no border or shadow) so both read
 * as one block. The section menu comes later, once every section exists.
 */
export function SiteHeader(): ReactNode {
  return (
    <header className="tone-light">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-4 px-4 sm:px-8 lg:h-20">
        <Link href="/" className="shrink-0">
          <Image
            src={logo}
            alt="Nossa Matilha"
            loading="eager"
            sizes="(min-width: 1024px) 144px, 124px"
            className="h-12 w-auto lg:h-14"
          />
        </Link>
        <ButtonAnchor
          href="/#contato"
          variant="secondary"
          size="sm"
          icon={<CalendarIcon className="size-4" />}
        >
          Agendar
        </ButtonAnchor>
      </div>
    </header>
  );
}
