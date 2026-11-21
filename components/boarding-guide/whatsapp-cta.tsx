import type { ReactNode } from 'react';
import { buttonClasses, type ButtonVariant } from '@/components/ui/button';
import { ChatIcon } from '@/components/ui/icons';
import { getWhatsApp, whatsAppLink } from '@/lib/contact';

/** Generic prefilled message (no personal data). */
const QUOTE_MESSAGE =
  'Olá! Li o guia da hospedagem e quero pedir um orçamento.';

/** Props for {@link WhatsAppButton}. */
export type WhatsAppButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

/** Button that opens the official WhatsApp with a quote message. */
export function WhatsAppButton({
  children,
  variant = 'primary',
  className,
}: WhatsAppButtonProps): ReactNode {
  return (
    <a
      href={whatsAppLink(getWhatsApp(), QUOTE_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClasses(variant, className)}
    >
      <ChatIcon className="size-5" />
      {children}
    </a>
  );
}

/**
 * Floating WhatsApp button, always reachable on mobile. The page reserves
 * bottom space so it never covers content.
 */
export function WhatsAppFloatingButton(): ReactNode {
  return (
    <a
      href={whatsAppLink(getWhatsApp(), QUOTE_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pedir orçamento no WhatsApp"
      className="fixed right-4 bottom-4 z-20 grid size-14 md:hidden place-items-center rounded-full bg-lime text-forest shadow-lift transition-transform duration-(--duration-base) ease-playful hover:-translate-y-1"
    >
      <ChatIcon className="size-7" />
    </a>
  );
}
