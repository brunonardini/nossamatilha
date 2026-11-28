import { CANCELLATION, DAILY_RATE_BRL } from './pricing';

/** Notice given before the scheduled check-in. */
export type Notice = 'withNotice' | 'late';

/** Largest number of daily rates the cancellation simulator accepts. */
export const MAX_STAY_DAYS = 30;

/**
 * Keeps a number of daily rates within `1…MAX_STAY_DAYS`, rounding to a
 * whole day.
 *
 * @param days - Requested number of daily rates.
 */
export function clampStayDays(days: number): number {
  return Math.min(MAX_STAY_DAYS, Math.max(1, Math.round(days)));
}

/** Result of {@link cancellationQuote}; amounts in BRL. */
export type CancellationQuote = {
  /** Amount paid for the stay. */
  paid: number;
  /** Fraction of the amount returned as a refund (0–1). */
  refundRate: number;
  /** Fraction of the amount kept as credit (0–1). */
  creditRate: number;
  /** Amount refunded if the visitor chooses the refund. */
  refund: number;
  /** Amount withheld when choosing the refund. */
  retained: number;
  /** Credit available if the visitor chooses credit. */
  credit: number;
};

/**
 * Calculates both cancellation options (refund or credit) for a stay,
 * following the policy in docs/business.md.
 *
 * @param days - Number of daily rates paid (clamped to a valid range).
 * @param notice - How early the visitor cancelled.
 */
export function cancellationQuote(
  days: number,
  notice: Notice,
): CancellationQuote {
  const paid = clampStayDays(days) * DAILY_RATE_BRL;
  const policy = CANCELLATION[notice];
  const refund = paid * policy.refund;
  return {
    paid,
    refundRate: policy.refund,
    creditRate: policy.credit,
    refund,
    retained: paid - refund,
    credit: paid * policy.credit,
  };
}
