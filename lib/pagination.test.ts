import { describe, expect, it } from 'vitest';
import { wrappedPage } from './pagination';

const nine = [1, 2, 3, 4, 5, 6, 7, 8, 9];

describe('wrappedPage', () => {
  it('splits the list into pages of the given size', () => {
    expect(wrappedPage(nine, 0, 3)).toEqual({
      items: [1, 2, 3],
      index: 0,
      pages: 3,
    });
    expect(wrappedPage(nine, 2, 3).items).toEqual([7, 8, 9]);
  });

  it('goes back to the first page after the last one', () => {
    expect(wrappedPage(nine, 3, 3)).toMatchObject({
      items: [1, 2, 3],
      index: 0,
    });
    expect(wrappedPage(nine, 9, 1)).toMatchObject({ items: [1], index: 0 });
  });

  it('goes to the last page before the first one', () => {
    expect(wrappedPage(nine, -1, 3)).toMatchObject({
      items: [7, 8, 9],
      index: 2,
    });
  });

  it('keeps a shorter last page', () => {
    expect(wrappedPage(nine, 2, 4)).toEqual({ items: [9], index: 2, pages: 3 });
  });

  it('treats sizes below one as one item per page', () => {
    expect(wrappedPage(nine, 1, 0)).toMatchObject({ items: [2], pages: 9 });
  });

  it('has a single empty page for an empty list', () => {
    expect(wrappedPage([], 5, 3)).toEqual({ items: [], index: 0, pages: 1 });
  });
});
