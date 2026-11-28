import { describe, expect, it } from 'vitest';
import { percent, plural, splitLastWord } from './format';

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

describe('splitLastWord', () => {
  it('splits before the last word, keeping the space in the lead', () => {
    expect(splitLastWord('Estrutura em Resende, RJ')).toEqual([
      'Estrutura em Resende, ',
      'RJ',
    ]);
  });

  it('ignores surrounding spaces', () => {
    expect(splitLastWord('  Nossa Matilha  ')).toEqual(['Nossa ', 'Matilha']);
  });

  it('returns an empty lead for a single word', () => {
    expect(splitLastWord('Resende')).toEqual(['', 'Resende']);
  });
});
