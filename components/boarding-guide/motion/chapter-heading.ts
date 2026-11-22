import { SplitText, gsap } from '@/lib/gsap';

/**
 * Animates a {@link ChapterSection} heading when it scrolls into view: the
 * eyebrow slides in, the title rises word by word and the intro fades up.
 * Targets are the `data-chapter-eyebrow`, `data-chapter-title` and
 * `data-chapter-intro` elements inside `section`.
 *
 * Call it inside a `gsap.matchMedia()` handler (reduced motion off) so the
 * tweens are reverted with it. Returns a cleanup that reverts the text split.
 */
export function animateChapterHeading(section: Element): () => void {
  const eyebrow = section.querySelector('[data-chapter-eyebrow]');
  const title = section.querySelector('[data-chapter-title]');
  const intro = section.querySelector('[data-chapter-intro]');
  const split = title ? SplitText.create(title, { type: 'words' }) : null;

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out', duration: 0.7 },
    scrollTrigger: { trigger: section, start: 'top 75%' },
  });
  if (eyebrow) tl.from(eyebrow, { autoAlpha: 0, x: -24 });
  if (split) {
    tl.from(
      split.words,
      { autoAlpha: 0, y: 28, rotate: 4, stagger: 0.06 },
      '-=0.45',
    );
  }
  if (intro) tl.from(intro, { autoAlpha: 0, y: 16 }, '-=0.4');

  return () => split?.revert();
}
