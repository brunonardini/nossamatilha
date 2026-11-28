import { describe, expect, it } from 'vitest';
import {
  MAX_STAY_DAYS,
  cancellationQuote,
  clampStayDays,
} from './cancellation';
import { DAILY_RATE_BRL } from './pricing';

describe('clampStayDays', () => {
  it('keeps at least one daily rate', () => {
    expect(clampStayDays(0)).toBe(1);
    expect(clampStayDays(-3)).toBe(1);
  });

  it('caps at the largest stay', () => {
    expect(clampStayDays(MAX_STAY_DAYS + 1)).toBe(MAX_STAY_DAYS);
  });

  it('rounds to whole days', () => {
    expect(clampStayDays(2.6)).toBe(3);
  });
});

describe('cancellationQuote', () => {
  it('refunds 90% or credits 100% with 48h notice', () => {
    const paid = 3 * DAILY_RATE_BRL;
    expect(cancellationQuote(3, 'withNotice')).toEqual({
      paid,
      refundRate: 0.9,
      creditRate: 1,
      refund: paid * 0.9,
      retained: paid * 0.1,
      credit: paid,
    });
  });

  it('refunds 60% or credits 90% on late notice or no-show', () => {
    const paid = 2 * DAILY_RATE_BRL;
    expect(cancellationQuote(2, 'late')).toMatchObject({
      paid,
      refund: paid * 0.6,
      retained: paid * 0.4,
      credit: paid * 0.9,
    });
  });

  it('clamps an out-of-range number of daily rates', () => {
    expect(cancellationQuote(0, 'late').paid).toBe(DAILY_RATE_BRL);
  });
});
