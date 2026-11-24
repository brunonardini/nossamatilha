'use client';

import { useRef, type ReactNode } from 'react';
import { ArrowDownIcon } from '@/components/ui/icons';
import { MOTION_OK, ScrollTrigger, gsap, useGSAP } from '@/lib/gsap';

/** Scroll distance (px) over which the cue fades out and retires. */
const FADE_DISTANCE = 160;

/** Mobile only: the cue is hidden from `lg`, where the hero shows its text. */
const MOBILE = '(max-width: 1023.98px)';

/**
 * Mobile scroll cue of the home hero: plain text fixed at the bottom of the
 * screen ("Explore mais" and a bobbing arrow, no box). It fades
 * out over the first {@link FADE_DISTANCE}px of scroll and, once gone, never
 * comes back (scrolling up again does not revive it). With reduced motion the
 * arrow stays still and the cue simply disappears after that distance. It is
 * decorative (`aria-hidden`), so it never blocks taps on the page.
 */
export function ScrollCue(): ReactNode {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      // Opened mid-page (reload, back navigation): nothing to invite to.
      if (window.scrollY > FADE_DISTANCE) {
        gsap.set(root, { display: 'none' });
        return;
      }

      const arrow = root.querySelector('[data-scroll-cue-arrow]');
      const mm = gsap.matchMedia();

      mm.add(
        { motion: `${MOTION_OK} and ${MOBILE}`, still: MOBILE },
        (context) => {
          const motion = Boolean(context.conditions?.motion);
          const bob = motion
            ? gsap.to(arrow, {
                y: 4,
                duration: 0.7,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
              })
            : null;

          const scrollTrigger = {
            start: 0,
            end: FADE_DISTANCE,
            onLeave: (self: ScrollTrigger) => {
              // Retire for good: hide it, stop the bob and the trigger.
              gsap.set(root, { display: 'none' });
              bob?.kill();
              self.kill();
            },
          };

          if (motion) {
            gsap.to(root, {
              autoAlpha: 0,
              y: 16,
              ease: 'none',
              scrollTrigger: { ...scrollTrigger, scrub: true },
            });
          } else {
            ScrollTrigger.create(scrollTrigger);
          }
        },
      );
    },
    { scope },
  );

  return (
    <div
      ref={scope}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-20 flex justify-center lg:hidden"
    >
      <ScrollCueLabel />
    </div>
  );
}

/**
 * The visible label of {@link ScrollCue}, without its fixed position or
 * motion (also shown statically on `/design-system`).
 */
export function ScrollCueLabel(): ReactNode {
  return (
    <span className="flex items-center gap-1.5 font-heading text-body font-bold text-forest">
      Explore mais
      <ArrowDownIcon data-scroll-cue-arrow className="size-5" />
    </span>
  );
}
