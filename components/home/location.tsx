import Image from 'next/image';
import type { ReactNode } from 'react';
import entrance from '@/assets/photos/home/location-entrance.webp';
import { LocationMap } from '@/components/home/location-map';
import { ButtonLink } from '@/components/ui/button';
import { ChevronRightIcon, MapPinIcon } from '@/components/ui/icons';
import {
  BUSINESS_ADDRESS,
  directionsLink,
  GOOGLE_MAPS_EMBED_URL,
  GOOGLE_MAPS_URL,
} from '@/lib/contact';

/**
 * Schematic street drawing shown before the real map loads: local and not to
 * scale, so it needs no request to any map service. Decorative.
 */
function MapPlaceholder(): ReactNode {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className="size-full bg-cream-light"
    >
      <g className="fill-cream">
        <rect x="-10" y="-10" width="120" height="90" rx="10" />
        <rect x="140" y="-10" width="150" height="90" rx="10" />
        <rect x="320" y="-10" width="100" height="90" rx="10" />
        <rect x="-10" y="150" width="120" height="70" rx="10" />
        <rect x="140" y="150" width="150" height="70" rx="10" />
        <rect x="320" y="150" width="100" height="70" rx="10" />
      </g>
      <g className="stroke-white" strokeLinecap="round">
        <path d="M-20 115 H420" strokeWidth="26" />
        <path d="M125 -20 V320" strokeWidth="16" />
        <path d="M305 -20 V320" strokeWidth="16" />
      </g>
      <text
        x="40"
        y="120"
        className="fill-forest/60 font-heading font-bold"
        fontSize="12"
        letterSpacing="1"
      >
        AV. RIACHUELO
      </text>
      <g transform="translate(214 58)">
        <path
          d="M18 52S0 34 0 18a18 18 0 1 1 36 0c0 16-18 34-18 34Z"
          className="fill-forest"
        />
        <circle cx="18" cy="18" r="11" className="fill-lime" />
      </g>
    </svg>
  );
}

/**
 * Home location section ("Fica fácil chegar."), after the contact section:
 * the entrance photo beside a click-to-load Google map (Street View in front
 * of the gates), then the address card with directions and the Google Maps
 * listing. Address and links come from `lib/contact.ts`.
 */
export function Location(): ReactNode {
  const { street, district, city, state, postalCode } = BUSINESS_ADDRESS;

  return (
    <section
      id="localizacao"
      aria-labelledby="localizacao-titulo"
      className="tone-light px-4 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-page">
        <div className="text-center">
          <p className="font-heading text-caption font-semibold tracking-widest text-accent uppercase">
            Onde estamos
          </p>
          <h2 id="localizacao-titulo" className="mt-2 text-h1 font-extrabold">
            Fica fácil chegar.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Image
            src={entrance}
            alt="Entrada da Nossa Matilha vista da calçada: portões cinza abertos, pátio de concreto e, ao fundo, a placa com o logo."
            sizes="(min-width: 1152px) 35rem, (min-width: 768px) 50vw, 100vw"
            className="aspect-4/3 w-full rounded-card object-cover shadow-card"
          />
          <div className="aspect-4/3 overflow-hidden rounded-card bg-white shadow-card">
            <LocationMap embedUrl={GOOGLE_MAPS_EMBED_URL}>
              <MapPlaceholder />
            </LocationMap>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6 rounded-card bg-surface-raised p-6 shadow-card sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <span
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-lime text-forest"
            >
              <MapPinIcon className="size-5" />
            </span>
            <address className="not-italic">
              <p className="font-heading text-h3 font-bold text-heading">
                {street}
              </p>
              <p>
                {district}, {city}/{state}
              </p>
              <p className="text-fg-muted">CEP {postalCode}</p>
            </address>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:justify-start">
            <ButtonLink
              href={directionsLink(BUSINESS_ADDRESS)}
              target="_blank"
              rel="noopener noreferrer"
              icon={<ChevronRightIcon className="size-5" />}
            >
              Como chegar
            </ButtonLink>
            <ButtonLink
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="link"
            >
              Ver no Google Maps
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
