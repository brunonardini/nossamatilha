import Image from 'next/image';
import { cacheLife } from 'next/cache';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import logo from '@/assets/brand/logo-nossa-matilha.webp';
import { FooterMotion } from '@/components/home/footer-motion';
import { CameraIcon } from '@/components/ui/icons';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/lib/contact';
import {
  footerDogs,
  footerForTutors,
  footerMenu,
  footerScene,
  footerSnapshots,
  type FooterLink,
} from '@/lib/home/footer';

/** Tilt of each Instagram snapshot (straightened on hover). */
const tilts = ['-rotate-6', 'rotate-3', '-rotate-2'] as const;

/**
 * Current year for the copyright line. Cache Components does not allow
 * reading the clock while prerendering, so the value is cached (`max`).
 */
async function CopyrightYear(): Promise<string> {
  'use cache';
  // The year changes once a year: refresh at most every 30 days.
  cacheLife('max');
  return String(new Date().getFullYear());
}

/** A titled column of links. */
function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: readonly FooterLink[];
}): ReactNode {
  return (
    <nav aria-label={title}>
      <p className="font-heading font-bold text-forest">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-ink hover:text-leaf-ink hover:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Site footer: on a light sky (cream fading from the section above), the
 * logo and copyright, the "Menu" and "Para tutores" link columns and an
 * "Instagram" column with three tilted snapshots and the handle. Below, the
 * panorama of the covered area and the lawn, whose roof melts into the sky,
 * with dogs that run in when it scrolls into view (`FooterMotion`).
 */
export async function SiteFooter(): Promise<ReactNode> {
  const year = await CopyrightYear();
  return (
    <FooterMotion className="tone-light relative overflow-hidden bg-cream-light pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-cream to-transparent"
      />

      <div className="relative z-10 mx-auto grid max-w-page grid-cols-2 gap-x-6 gap-y-10 px-4 sm:px-8 lg:grid-cols-[1.1fr_0.7fr_0.9fr_1.5fr] lg:items-start">
        <div className="col-span-2 lg:col-span-1">
          <Link href="/" className="inline-block">
            <Image
              src={logo}
              alt="Nossa Matilha"
              sizes="(min-width: 1024px) 247px, 206px"
              className="h-20 w-auto lg:h-24"
            />
          </Link>
          <p className="mt-5 text-caption text-fg-muted">
            © {year} Nossa Matilha.
            <br />
            Todos os direitos reservados.
          </p>
        </div>
        <LinkColumn title="Menu" links={footerMenu} />
        <LinkColumn title="Para tutores" links={footerForTutors} />
        <div className="col-span-2 lg:col-span-1">
          <p className="font-heading font-bold text-forest">Instagram</p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-4 block w-fit"
          >
            <span aria-hidden="true" className="flex -space-x-3">
              {footerSnapshots.map((photo, i) => (
                // GSAP moves the outer span; the tilt is on the inner one.
                <span key={photo.src} data-shot className="block w-20 shrink-0">
                  <span
                    className={`block rounded-md bg-white p-1 shadow-card transition-transform duration-300 group-hover:rotate-0 ${tilts[i % tilts.length]}`}
                  >
                    <Image
                      src={photo}
                      alt=""
                      sizes="80px"
                      className="aspect-square w-full rounded-sm object-cover"
                    />
                  </span>
                </span>
              ))}
            </span>
            <span className="mt-4 inline-flex items-center gap-2 text-ink group-hover:text-leaf-ink group-hover:underline">
              <CameraIcon className="size-5 text-leaf-ink" />
              {INSTAGRAM_HANDLE}
            </span>
          </a>
        </div>
      </div>

      <div
        data-scene
        className="relative mt-10 h-72 w-full overflow-hidden sm:h-96 lg:h-104"
      >
        <Image
          src={footerScene.src}
          alt={footerScene.alt}
          sizes="100vw"
          className="absolute inset-0 size-full object-cover object-bottom"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-1 h-[45%] bg-linear-to-b from-cream-light via-cream-light/70 to-transparent"
        />
        {footerDogs.map((dog) => {
          const place: CSSProperties & Record<`--${string}`, string> = {
            '--dog-left': `${dog.left}%`,
            '--dog-left-sm': `${dog.leftSm}%`,
            bottom: `${dog.bottom}%`,
            height: `${dog.height}%`,
          };
          return (
            <div
              key={dog.src.src}
              data-dog
              style={place}
              className={`absolute left-(--dog-left) z-20 sm:left-(--dog-left-sm) ${dog.wideOnly ? 'hidden sm:block' : ''}`}
            >
              <Image
                src={dog.src}
                alt=""
                sizes="160px"
                className={`h-full w-auto ${dog.flip ? '-scale-x-100' : ''}`}
              />
            </div>
          );
        })}
      </div>
    </FooterMotion>
  );
}
