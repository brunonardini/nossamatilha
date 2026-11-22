import { describe, expect, it } from 'vitest';
import { percent, plural } from './format';

describe('plural', () => {
  it('uses the singular only for one', () => {
    expect(plural(1, 'diária', 'diárias')).toBe('1 diária');
    expect(plural(0, 'diária', 'diárias')).toBe('0 diárias');
    expect(plural(3, 'diária', 'diárias')).toBe('3 diárias');
  });
});

describe('percent', () => {
  it('rounds to a whole percentage', () => {
    expect(percent(0.9)).toBe('90%');
    expect(percent(1)).toBe('100%');
    expect(percent(0.666)).toBe('67%');
  });
});
