import { DAILY_RATE_BRL, DAILY_RATE_HOURS } from './pricing';

/** Weekday names in pt-BR, starting on Monday (index 0). */
export const WEEKDAYS = [
  'segunda',
  'terça',
  'quarta',
  'quinta',
  'sexta',
  'sábado',
  'domingo',
] as const;

/**
 * Returns the weekday name `offset` days after `weekday`.
 *
 * @param weekday - Index in {@link WEEKDAYS} (0 = segunda).
 * @param offset - Days to add (0 = same day).
 */
export function weekdayAfter(weekday: number, offset: number): string {
  return WEEKDAYS[(((weekday + offset) % 7) + 7) % 7];
}

/** Input of {@link calculateStay}: hours use the 24h clock. */
export type StayInput = {
  checkInHour: number;
  /** Days between check-in and check-out (0 = same day). */
  daysLater: number;
  checkOutHour: number;
};

/** Result of {@link calculateStay}. */
export type StayResult =
  | { valid: false }
  | {
      valid: true;
      /** Total hours of the stay. */
      hours: number;
      /** Number of daily rates charged. */
      days: number;
      /** Total in BRL. */
      total: number;
      /** Hours used of the last daily rate (1–24). */
      lastDayHours: number;
      /**
       * Hours past the last full 24h block when leaving a little earlier
       * would save a daily rate; `null` when there is no such saving.
       */
      savableHours: number | null;
    };

/** Hours past a 24h boundary that still trigger the "leave earlier" tip. */
const TIP_THRESHOLD_HOURS = 6;

/**
 * Calculates the daily rates of a stay. Each daily rate covers 24 hours
 * counted from check-in, and there are no half days: any stay up to 24 hours
 * costs one full daily rate (docs/business.md).
 *
 * @param input - Check-in hour, days later and check-out hour.
 */
export function calculateStay(input: StayInput): StayResult {
  const hours = input.daysLater * 24 + (input.checkOutHour - input.checkInHour);
  if (hours <= 0) {
    return { valid: false };
  }
  const days = Math.max(1, Math.ceil(hours / DAILY_RATE_HOURS));
  const lastDayHours = hours - (days - 1) * DAILY_RATE_HOURS;
  const savableHours =
    days > 1 && lastDayHours <= TIP_THRESHOLD_HOURS ? lastDayHours : null;
  return {
    valid: true,
    hours,
    days,
    total: days * DAILY_RATE_BRL,
    lastDayHours,
    savableHours,
  };
}
