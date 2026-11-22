import { describe, expect, it } from 'vitest';
import { formatBRL } from './pricing';

describe('formatBRL', () => {
  it('formats reais in pt-BR with a plain space', () => {
    expect(formatBRL(120)).toBe('R$ 120,00');
    expect(formatBRL(1234.5)).toBe('R$ 1.234,50');
  });
});
