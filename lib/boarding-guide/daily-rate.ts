import { BUSINESS_HOURS, DAILY_RATE_BRL, DAILY_RATE_HOURS } from './pricing';

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

/** Longest stay offered by the daily-rate simulator, in days after check-in. */
export const MAX_DAYS_LATER = 14;

/** Hours a visitor can pick for check-in or pick-up, within business hours. */
export const BUSINESS_HOUR_OPTIONS: readonly number[] = Array.from(
  { length: BUSINESS_HOURS.closes - BUSINESS_HOURS.opens + 1 },
  (_, index) => BUSINESS_HOURS.opens + index,
);

/** Check-out day options: 0 (same day) to {@link MAX_DAYS_LATER}. */
export const DAYS_LATER_OPTIONS: readonly number[] = Array.from(
  { length: MAX_DAYS_LATER + 1 },
  (_, index) => index,
);

/**
 * Labels a check-out day option in pt-BR (e.g. `domingo (2 dias depois)`).
 *
 * @param weekday - Check-in weekday, index in {@link WEEKDAYS}.
 * @param daysLater - Days between check-in and check-out.
 */
export function daysLaterLabel(weekday: number, daysLater: number): string {
  const name = weekdayAfter(weekday, daysLater);
  if (daysLater === 0) return `${name} (mesmo dia)`;
  if (daysLater === 1) return `${name} (dia seguinte)`;
  return `${name} (${daysLater} dias depois)`;
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
      /** Total in BRL when leaving earlier saves a daily rate; else `null`. */
      earlierTotal: number | null;
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
    earlierTotal: savableHours === null ? null : (days - 1) * DAILY_RATE_BRL,
  };
}

/**
 * Fraction of 24 hours used by each daily rate of a valid stay: every rate
 * is full (`1`) except possibly the last one.
 *
 * @param days - Number of daily rates.
 * @param lastDayHours - Hours used of the last daily rate (1–24).
 */
export function dailyRateFractions(
  days: number,
  lastDayHours: number,
): number[] {
  return Array.from({ length: days }, (_, index) =>
    index === days - 1 ? lastDayHours / DAILY_RATE_HOURS : 1,
  );
}
