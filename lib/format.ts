/**
 * Formats a count with its pt-BR noun (e.g. `1 diária`, `3 diárias`).
 *
 * @param count - Quantity shown before the noun.
 * @param one - Singular form, used when `count` is 1.
 * @param many - Plural form.
 */
export function plural(count: number, one: string, many: string): string {
  return `${count} ${count === 1 ? one : many}`;
}

/**
 * Formats a fraction as a whole percentage (e.g. `0.9` → `90%`).
 *
 * @param fraction - Value between 0 and 1.
 */
export function percent(fraction: number): string {
  return `${Math.round(fraction * 100)}%`;
}

/**
 * Splits text before its last word, so the last word can be kept together
 * with an inline icon that follows it (e.g. `Resende, RJ` + a paw).
 *
 * @param text - Text to split.
 * @returns The leading text (with its trailing space) and the last word;
 *   the leading part is empty when the text has a single word.
 */
export function splitLastWord(text: string): [string, string] {
  const trimmed = text.trim();
  const index = trimmed.lastIndexOf(' ');
  if (index === -1) return ['', trimmed];
  return [trimmed.slice(0, index + 1), trimmed.slice(index + 1)];
}
