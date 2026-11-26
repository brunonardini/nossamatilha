/**
 * Public contact channels of Nossa Matilha.
 *
 * Phone numbers come from environment variables (see docs/environment.md) so
 * they are never stored in the repository.
 */

/** Official Instagram profile, confirmed as public by the owner. */
export const INSTAGRAM_URL = 'https://www.instagram.com/nossamatilha.resende/';

/** Instagram handle shown next to the profile link. */
export const INSTAGRAM_HANDLE = '@nossamatilha.resende';

/** A WhatsApp contact ready to be rendered. */
export type WhatsAppContact = {
  /** Digits only, with country code (e.g. `5524900000000`). */
  digits: string;
  /** Human-readable Brazilian format (e.g. `(24) 90000-0000`). */
  display: string;
};

/**
 * Parses an E.164 phone number from an environment variable.
 *
 * @param value - Raw value, e.g. `+5524900000000`.
 * @param name - Variable name, used in the error message.
 * @throws If the variable is missing or is not a Brazilian mobile number.
 */
function parsePhone(value: string | undefined, name: string): WhatsAppContact {
  const digits = (value ?? '').replace(/\D/g, '');
  if (!/^55\d{10,11}$/.test(digits)) {
    throw new Error(
      `Environment variable ${name} is missing or invalid. Copy .env.example to .env (see docs/environment.md).`,
    );
  }
  const area = digits.slice(2, 4);
  const local = digits.slice(4);
  const split = local.length - 4;
  return {
    digits,
    display: `(${area}) ${local.slice(0, split)}-${local.slice(split)}`,
  };
}

/** Official Nossa Matilha WhatsApp (bookings, quotes, cancellations). */
export function getWhatsApp(): WhatsAppContact {
  return parsePhone(
    process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER,
    'NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER',
  );
}

/** WhatsApp of the bath and grooming partner (Encantacão). */
export function getGroomingWhatsApp(): WhatsAppContact {
  return parsePhone(
    process.env.NEXT_PUBLIC_GROOMING_WHATSAPP_PHONE_NUMBER,
    'NEXT_PUBLIC_GROOMING_WHATSAPP_PHONE_NUMBER',
  );
}

/**
 * Builds a `wa.me` link that opens a chat, optionally with a prefilled message.
 *
 * Links rendered in the page only carry generic messages (e.g. "Quero um
 * orçamento"); never put personal data in them. The one exception is a link
 * built in the browser when the visitor sends a form (the home quote form):
 * it carries only what they typed, is opened right away and is never stored
 * or logged.
 *
 * @param contact - Contact returned by {@link getWhatsApp} or {@link getGroomingWhatsApp}.
 * @param message - Optional prefilled message in pt-BR.
 */
export function whatsAppLink(
  contact: WhatsAppContact,
  message?: string,
): string {
  const base = `https://wa.me/${contact.digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
