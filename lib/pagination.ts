/** One page of a list that wraps around at both ends. */
export type Page<T> = {
  /** Items on this page (the last page may hold fewer). */
  items: readonly T[];
  /** Page index normalized to `0 … pages - 1`. */
  index: number;
  /** Number of pages (at least 1). */
  pages: number;
};

/**
 * Returns page `page` of `items` split into pages of `size`, wrapping around:
 * after the last page comes the first, and before the first, the last.
 */
export function wrappedPage<T>(
  items: readonly T[],
  page: number,
  size: number,
): Page<T> {
  const perPage = Math.max(1, Math.floor(size));
  const pages = Math.max(1, Math.ceil(items.length / perPage));
  const index = ((Math.trunc(page) % pages) + pages) % pages;
  return {
    items: items.slice(index * perPage, index * perPage + perPage),
    index,
    pages,
  };
}
