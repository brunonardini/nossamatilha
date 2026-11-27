import Image from 'next/image';
import type { ReactNode } from 'react';
import { ButtonLink } from '@/components/ui/button';
import { CameraIcon, ChatIcon } from '@/components/ui/icons';
import {
  getWhatsApp,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  whatsAppLink,
} from '@/lib/contact';
import { footerSnapshots } from '@/lib/home/footer';

/** Generic prefilled WhatsApp message (no personal data). */
const WHATSAPP_MESSAGE =
  'Olá, Nossa Matilha! Vim pelo site e gostaria de mais informações.';

/** Tilt of each Instagram snapshot, like the footer's. */
const tilts = ['-rotate-6', 'rotate-3', '-rotate-2'];

/**
 * Last home section ("Vamos conversar?"): two cards side by side, WhatsApp
 * (the main channel, forest) and Instagram (white, with three snapshots).
 * The WhatsApp number is read here, on the server, from the environment (see
 * docs/environment.md); the site collects nothing.
 */
export function Contact(): ReactNode {
  const whatsAppHref = whatsAppLink(getWhatsApp(), WHATSAPP_MESSAGE);

  return (
    <section
      id="contato"
      aria-labelledby="contato-titulo"
      className="tone-light px-4 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-reading text-center">
          <p className="font-heading text-caption font-semibold tracking-widest text-accent uppercase">
            Fale com a gente
          </p>
          <h2 id="contato-titulo" className="mt-2 text-h1 font-extrabold">
            Vamos conversar?
          </h2>
          <p className="mt-4 text-lead text-fg-muted">
            Tire dúvidas, peça um orçamento ou agende pelo WhatsApp. No
            Instagram, você acompanha o dia a dia da matilha.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-[1.2fr_1fr]">
          <div className="tone-dark flex flex-col rounded-card bg-surface-raised p-6 shadow-lift sm:p-8">
            <span
              aria-hidden="true"
              className="flex size-12 items-center justify-center rounded-full bg-lime text-forest"
            >
              <ChatIcon />
            </span>
            <h3 className="mt-5 text-h2 font-bold">WhatsApp</h3>
            <p className="mt-2 text-fg-muted">
              Orçamentos, reservas e dúvidas: é por lá que a gente conversa com
              os tutores.
            </p>
            <div className="mt-auto pt-6">
              <ButtonLink
                href={whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                icon={<ChatIcon />}
              >
                Chamar no WhatsApp
              </ButtonLink>
            </div>
          </div>

          <div className="flex flex-col rounded-card bg-surface-raised p-6 shadow-card sm:p-8">
            <span aria-hidden="true" className="flex -space-x-3">
              {footerSnapshots.map((photo, i) => (
                <span
                  key={photo.src}
                  className={`block w-16 shrink-0 rounded-md bg-white p-1 shadow-card ${tilts[i % tilts.length]}`}
                >
                  <Image
                    src={photo}
                    alt=""
                    sizes="64px"
                    className="aspect-square w-full rounded-sm object-cover"
                  />
                </span>
              ))}
            </span>
            <h3 className="mt-5 text-h2 font-bold">Instagram</h3>
            <p className="mt-2 text-fg-muted">
              Fotos e vídeos do dia a dia na creche e na hospedagem.
            </p>
            <div className="mt-auto pt-6">
              <ButtonLink
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                icon={<CameraIcon />}
              >
                {INSTAGRAM_HANDLE}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
