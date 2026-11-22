import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// The store is module state: load a fresh copy for each test.
async function loadStore(): Promise<typeof import('./stay-store')> {
  vi.resetModules();
  return import('./stay-store');
}

describe('stay store', () => {
  let store: Awaited<ReturnType<typeof loadStore>>;

  beforeEach(async () => {
    store = await loadStore();
  });

  it('starts with the default example stay', () => {
    const { result } = renderHook(() => store.useStayDays());
    expect(result.current).toBe(store.DEFAULT_STAY_DAYS);
  });

  it('notifies readers when the stay changes', () => {
    const { result } = renderHook(() => store.useStayDays());
    act(() => store.setStayDays(5));
    expect(result.current).toBe(5);
  });

  it('keeps at least one whole daily rate', () => {
    const { result } = renderHook(() => store.useStayDays());
    act(() => store.setStayDays(0));
    expect(result.current).toBe(1);
    act(() => store.setStayDays(2.4));
    expect(result.current).toBe(2);
  });

  it('stops notifying after unmount', () => {
    const { result, unmount } = renderHook(() => store.useStayDays());
    unmount();
    act(() => store.setStayDays(7));
    expect(result.current).toBe(store.DEFAULT_STAY_DAYS);
  });
});
