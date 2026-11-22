import { gsap } from '@/lib/gsap';

/** Formats a counter value the way the page shows numbers (pt-BR). */
function format(value: number): string {
  return Math.round(value).toLocaleString('pt-BR');
}

/**
 * Builds a tween that counts an element's number up from zero to its
 * `data-count-to` value. The element shows `0` right away, so call it inside
 * a `gsap.matchMedia()` handler (reduced motion off) and add the tween to a
 * scroll-triggered timeline. Returns `null` when the element has no valid
 * target. Pair with {@link restoreCounts} in the handler's cleanup.
 */
export function countUp(
  element: HTMLElement,
  duration = 1.4,
): gsap.core.Tween | null {
  const target = Number(element.dataset.countTo);
  if (!Number.isFinite(target)) return null;
  const counter = { value: 0 };
  const render = (): void => {
    element.textContent = format(counter.value);
  };
  render();
  return gsap.to(counter, {
    value: target,
    duration,
    ease: 'power2.out',
    onUpdate: render,
  });
}

/**
 * Puts the real numbers back in every `data-count-to` element inside `root`,
 * so a torn-down animation never leaves a half-counted value.
 */
export function restoreCounts(root: Element): void {
  root.querySelectorAll<HTMLElement>('[data-count-to]').forEach((element) => {
    element.textContent = format(Number(element.dataset.countTo));
  });
}
