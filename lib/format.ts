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
