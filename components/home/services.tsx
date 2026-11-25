import Image from 'next/image';
import type { ReactNode } from 'react';
import { CheckIcon, PawIcon } from '@/components/ui/icons';
import { homeServices, type HomeService } from '@/lib/home/services';

/**
 * Home services section (eyebrow "Conheça nossos serviços", then the title): six information cards on
 * a `cream-light` band, in the owner's order. No filters or buttons. A card
 * without a photo shows a paw placeholder until one is chosen.
 */
export function Services(): ReactNode {
  return (
    <section
      aria-labelledby="servicos-titulo"
      className="tone-light bg-cream-light px-4 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-page">
        <div>
          <p className="font-heading text-caption font-semibold tracking-widest text-accent uppercase">
            Conheça nossos serviços
          </p>
          <h2 id="servicos-titulo" className="mt-3 text-h1 font-extrabold">
            Cada cuidado pensado para o bem-estar do seu cão.
          </h2>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homeServices.map((service) => (
            <li key={service.id}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** One service card: photo (or placeholder) with the number badge, then text. */
function ServiceCard({ service }: { service: HomeService }): ReactNode {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-forest/10 bg-white shadow-card">
      <div className="relative aspect-3/2 overflow-hidden bg-cream">
        {service.photo ? (
          <Image
            src={service.photo.src}
            alt={service.photo.alt}
            sizes="(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw"
            className="size-full object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex size-full items-center justify-center"
          >
            <PawIcon className="size-16 rotate-12 text-forest/15" />
          </div>
        )}
        <span
          aria-hidden="true"
          className="absolute top-3.5 left-3.5 flex size-9 items-center justify-center rounded-full rounded-tr-sm bg-white font-heading text-caption font-extrabold text-forest shadow-card"
        >
          {service.number}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          {service.meta ? (
            <p className="text-caption font-bold tracking-wider text-leaf-ink uppercase">
              {service.meta}
            </p>
          ) : null}
          <h3 className="mt-1.5 text-h3 font-extrabold">{service.name}</h3>
          <p className="mt-1.5 text-fg-muted">{service.summary}</p>
        </div>

        {service.highlights.length > 0 ? (
          <ul className="space-y-2">
            {service.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-lime/35 text-forest">
                  <CheckIcon className="size-3" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
