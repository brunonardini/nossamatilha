import type { ReactNode } from 'react';
import { ContactForm } from '@/components/home/contact-form';
import { getWhatsApp } from '@/lib/contact';
import { homeServices } from '@/lib/home/services';

/**
 * Last home section: the quote request form ("Complete a mensagem e
 * envie."). The WhatsApp number is read here, on the server, from the
 * environment (see docs/environment.md).
 */
export function Contact(): ReactNode {
  return (
    <section
      id="orcamento"
      aria-labelledby="contato-titulo"
      className="tone-light px-4 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="font-heading text-caption font-semibold tracking-widest text-accent uppercase">
            Orçamento sem compromisso
          </p>
          <h2 id="contato-titulo" className="mt-2 text-h1 font-extrabold">
            Complete a mensagem e envie.
          </h2>
        </div>
        <div className="mt-8">
          <ContactForm
            contact={getWhatsApp()}
            services={homeServices.map((service) => service.name)}
          />
        </div>
      </div>
    </section>
  );
}
