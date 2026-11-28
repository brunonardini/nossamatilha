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

/** A postal address split into the lines the site shows. */
export type PostalAddress = {
  /** Street and number, e.g. `Avenida Riachuelo, 356`. */
  street: string;
  district: string;
  city: string;
  /** Two-letter state code, e.g. `RJ`. */
  state: string;
  /** CEP with the hyphen, e.g. `27510-132`. */
  postalCode: string;
  country: string;
};

/** Business address, provided by the owner for publication on the site. */
export const BUSINESS_ADDRESS: PostalAddress = {
  street: 'Avenida Riachuelo, 356',
  district: 'Liberdade',
  city: 'Resende',
  state: 'RJ',
  postalCode: '27510-132',
  country: 'Brasil',
};

/** Google Maps page of the business (listing and reviews, no tracking parameters). */
export const GOOGLE_MAPS_URL =
  'https://www.google.com/maps?cid=18369256326643483100';

/**
 * Google Maps embed chosen by the owner: Street View in front of the gates.
 * Loaded only after the visitor asks for it (see `LocationMap`).
 */
export const GOOGLE_MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!4v1795867127605!6m8!1m7!1si0i8EAm-g7NBndKLkY3D4A!2m2!1d-22.46719649447375!2d-44.46253424105593!3f84.99824899771468!4f-1.81575548823848!5f0.7820865974627469';

/**
 * Formats an address on one line, as map services expect it.
 *
 * @param address - Address to format.
 * @returns e.g. `Avenida Riachuelo, 356, Liberdade, Resende - RJ, 27510-132, Brasil`.
 */
export function formatAddress(address: PostalAddress): string {
  const { street, district, city, state, postalCode, country } = address;
  return `${street}, ${district}, ${city} - ${state}, ${postalCode}, ${country}`;
}

/**
 * Builds a Google Maps directions link to an address (Maps URLs, no API key).
 * The visitor's starting point is chosen by Google Maps itself.
 *
 * @param address - Destination.
 */
export function directionsLink(address: PostalAddress): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(formatAddress(address))}`;
}

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
 * Links only carry generic messages (e.g. "Quero um orçamento"); never put
 * personal data in them.
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
