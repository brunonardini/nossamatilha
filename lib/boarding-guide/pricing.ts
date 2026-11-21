/**
 * Boarding prices and policies used by the guide (source: docs/business.md).
 * Keep every value here so the page and its simulators never disagree.
 */

/** Price of one daily rate (diária), in BRL. */
export const DAILY_RATE_BRL = 120;

/** Hours covered by one daily rate, counted from check-in. */
export const DAILY_RATE_HOURS = 24;

/** Business hours for check-in and pick-up (24h clock). */
export const BUSINESS_HOURS = { opens: 7, closes: 18 } as const;

/** Minimum booking notice before check-in, in hours. */
export const BOOKING_NOTICE_HOURS = 48;

/** Cancellation options as fractions of the amount paid. */
export const CANCELLATION = {
  withNotice: { refund: 0.9, credit: 1 },
  late: { refund: 0.6, credit: 0.9 },
  creditValidityMonths: 3,
} as const;

const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

/**
 * Formats a value in BRL for display (e.g. `R$ 120,00`).
 *
 * @param value - Amount in reais.
 */
export function formatBRL(value: number): string {
  return brl.format(value).replace(/ /g, ' ');
}
