import { useSyncExternalStore } from 'react';

/**
 * Tiny in-memory store shared by the guide's simulators: the daily-rate
 * simulator publishes the number of daily rates, and the cancellation
 * simulator reads it. Nothing is persisted; it lives only during the visit.
 */

/** Daily rates of the default example (Friday 10h → Sunday 16h). */
export const DEFAULT_STAY_DAYS = 3;

let stayDays = DEFAULT_STAY_DAYS;
const listeners = new Set<() => void>();

/**
 * Publishes the number of daily rates of the visitor's simulated stay.
 *
 * @param days - Number of daily rates (at least 1).
 */
export function setStayDays(days: number): void {
  const next = Math.max(1, Math.round(days));
  if (next === stayDays) return;
  stayDays = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Reads the number of daily rates of the simulated stay (React hook). */
export function useStayDays(): number {
  return useSyncExternalStore(
    subscribe,
    () => stayDays,
    () => DEFAULT_STAY_DAYS,
  );
}
