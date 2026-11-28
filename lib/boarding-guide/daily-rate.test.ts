import { describe, expect, it } from 'vitest';
import {
  BUSINESS_HOUR_OPTIONS,
  DAYS_LATER_OPTIONS,
  MAX_DAYS_LATER,
  calculateStay,
  dailyRateFractions,
  daysLaterLabel,
  weekdayAfter,
} from './daily-rate';
import { BUSINESS_HOURS, DAILY_RATE_BRL } from './pricing';

describe('weekdayAfter', () => {
  it('returns the same day for offset 0', () => {
    expect(weekdayAfter(0, 0)).toBe('segunda');
  });

  it('wraps around the week', () => {
    expect(weekdayAfter(4, 2)).toBe('domingo');
    expect(weekdayAfter(6, 1)).toBe('segunda');
    expect(weekdayAfter(0, 14)).toBe('segunda');
  });

  it('handles negative offsets', () => {
    expect(weekdayAfter(0, -1)).toBe('domingo');
  });
});

describe('daysLaterLabel', () => {
  it('labels the same day, the next day and later days', () => {
    expect(daysLaterLabel(4, 0)).toBe('sexta (mesmo dia)');
    expect(daysLaterLabel(4, 1)).toBe('sábado (dia seguinte)');
    expect(daysLaterLabel(4, 2)).toBe('domingo (2 dias depois)');
  });
});

describe('simulator options', () => {
  it('offers every hour within business hours', () => {
    expect(BUSINESS_HOUR_OPTIONS[0]).toBe(BUSINESS_HOURS.opens);
    expect(BUSINESS_HOUR_OPTIONS.at(-1)).toBe(BUSINESS_HOURS.closes);
    expect(BUSINESS_HOUR_OPTIONS).toHaveLength(
      BUSINESS_HOURS.closes - BUSINESS_HOURS.opens + 1,
    );
  });

  it('offers check-out from the same day up to the longest stay', () => {
    expect(DAYS_LATER_OPTIONS[0]).toBe(0);
    expect(DAYS_LATER_OPTIONS.at(-1)).toBe(MAX_DAYS_LATER);
  });
});

describe('calculateStay', () => {
  it('rejects a check-out at or before check-in', () => {
    expect(
      calculateStay({ checkInHour: 10, daysLater: 0, checkOutHour: 10 }),
    ).toEqual({ valid: false });
    expect(
      calculateStay({ checkInHour: 10, daysLater: 0, checkOutHour: 8 }),
    ).toEqual({ valid: false });
  });

  it('charges one full daily rate for stays under 24 hours', () => {
    const result = calculateStay({
      checkInHour: 8,
      daysLater: 0,
      checkOutHour: 12,
    });
    expect(result).toMatchObject({
      valid: true,
      hours: 4,
      days: 1,
      total: DAILY_RATE_BRL,
      lastDayHours: 4,
      savableHours: null,
      earlierTotal: null,
    });
  });

  it('charges exactly one daily rate per 24h block', () => {
    expect(
      calculateStay({ checkInHour: 10, daysLater: 2, checkOutHour: 10 }),
    ).toMatchObject({ hours: 48, days: 2, lastDayHours: 24 });
  });

  it('suggests leaving earlier when a few hours start a new daily rate', () => {
    // Script example: Friday 10h → Sunday 16h.
    expect(
      calculateStay({ checkInHour: 10, daysLater: 2, checkOutHour: 16 }),
    ).toMatchObject({
      hours: 54,
      days: 3,
      total: 3 * DAILY_RATE_BRL,
      lastDayHours: 6,
      savableHours: 6,
      earlierTotal: 2 * DAILY_RATE_BRL,
    });
  });

  it('does not suggest leaving earlier past the tip threshold', () => {
    expect(
      calculateStay({ checkInHour: 10, daysLater: 1, checkOutHour: 17 }),
    ).toMatchObject({
      days: 2,
      lastDayHours: 7,
      savableHours: null,
      earlierTotal: null,
    });
  });
});

describe('dailyRateFractions', () => {
  it('fills every daily rate except the partial last one', () => {
    expect(dailyRateFractions(3, 6)).toEqual([1, 1, 0.25]);
  });

  it('fills the last daily rate when it is complete', () => {
    expect(dailyRateFractions(1, 24)).toEqual([1]);
  });
});
