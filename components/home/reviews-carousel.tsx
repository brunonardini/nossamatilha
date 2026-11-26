'use client';

import { useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { ReviewMessage } from '@/components/home/review-message';
import { ChevronRightIcon, PauseIcon, PlayIcon } from '@/components/ui/icons';
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from '@/lib/gsap';
import type { HomeReview } from '@/lib/home/reviews';
import { wrappedPage } from '@/lib/pagination';

const LG = '(min-width: 1024px)';
/** Seconds a page of messages stays before the next one types in. */
const DWELL = 7;

function subscribeToLg(onChange: () => void): () => void {
  const query = window.matchMedia(LG);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

/** Messages per page: three side by side from `lg`, one below. */
function usePageSize(): number {
  return useSyncExternalStore(
    subscribeToLg,
    () => (window.matchMedia(LG).matches ? 3 : 1),
    () => 3,
  );
}

/** Hides a message's avatar and bubble before {@link typeIn}. */
function hideMessage(message: Element): void {
  gsap.set(message.querySelector('[data-bubble]'), {
    autoAlpha: 0,
    scale: 0.6,
  });
  gsap.set(message.querySelector('[data-avatar]'), {
    autoAlpha: 0,
    scale: 0.5,
  });
}

/** Avatar pops, the three dots bounce, then the bubble pops out of them. */
function typeIn(message: Element): gsap.core.Timeline {
  const typing = message.querySelector('[data-typing]');
  return gsap
    .timeline()
    .to(message.querySelector('[data-avatar]'), {
      autoAlpha: 1,
      scale: 1,
      duration: 0.35,
      ease: 'back.out(2)',
    })
    .to(typing, { autoAlpha: 1, duration: 0.15 }, '<0.1')
    .to(
      message.querySelectorAll('[data-dot]'),
      {
        y: -5,
        duration: 0.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: 3,
        stagger: 0.1,
      },
      '<',
    )
    .to(typing, { autoAlpha: 0, duration: 0.15 })
    .to(
      message.querySelector('[data-bubble]'),
      { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(1.8)' },
      '<',
    );
}

/** Round control button of the carousel. */
function ControlButton({
  label,
  onClick,
  strong = false,
  className = '',
  children,
}: {
  label: string;
  onClick: () => void;
  strong?: boolean;
  className?: string;
  children: ReactNode;
}): ReactNode {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex size-11 shrink-0 items-center justify-center rounded-full shadow-card transition-transform active:scale-95 ${strong ? 'bg-forest text-lime' : 'bg-white text-forest'} ${className}`}
    >
      {children}
    </button>
  );
}

/** Props for {@link ReviewsCarousel}. */
export type ReviewsCarouselProps = {
  reviews: readonly HomeReview[];
};

/**
 * One row of review messages (three from `lg`, one below) that changes by
 * itself: a single bar fills while the current page is shown, then the next
 * messages type in one after another, wrapping back to the first page. It
 * holds while hovered or focused and off screen; the pause button stops it.
 * With reduced motion nothing moves and pages change only with the arrows.
 */
export function ReviewsCarousel({ reviews }: ReviewsCarouselProps): ReactNode {
  const scope = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const timer = useRef<gsap.core.Tween | null>(null);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const pageSize = usePageSize();
  const current = wrappedPage(reviews, page, pageSize);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const messages = gsap.utils.toArray<HTMLElement>('[data-message]');
        messages.forEach(hideMessage);
        const reveal = gsap.timeline({ paused: true });
        messages.forEach((message, i) => reveal.add(typeIn(message), i * 0.45));

        const tween = gsap.fromTo(
          bar.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: DWELL,
            ease: 'none',
            paused: true,
            onComplete: () => setPage((p) => p + 1),
          },
        );
        timer.current = tween;
        reveal.eventCallback('onComplete', () => {
          if (!paused) tween.play();
        });

        ScrollTrigger.create({
          trigger: scope.current,
          start: 'top 75%',
          end: 'bottom 25%',
          onEnter: () => reveal.play(),
          onEnterBack: () => reveal.play(),
          onLeave: () => tween.pause(),
          onLeaveBack: () => tween.pause(),
        });
        return () => {
          timer.current = null;
        };
      });
    },
    {
      scope,
      dependencies: [current.index, pageSize],
      revertOnUpdate: true,
    },
  );

  const { contextSafe } = useGSAP({ scope });

  /** Holds the timer while the visitor reads (hover or focus). */
  const hold = (on: boolean): void =>
    contextSafe((): void => {
      const tween = timer.current;
      if (!tween || paused || tween.progress() === 0) return;
      if (on) tween.pause();
      else tween.resume();
    })();

  const togglePause = (): void => {
    const next = !paused;
    setPaused(next);
    contextSafe((): void => {
      if (next) timer.current?.pause();
      else timer.current?.resume();
    })();
  };

  const go = (dir: 1 | -1): void => setPage(current.index + dir);

  return (
    <div ref={scope}>
      <ul
        aria-live={paused ? 'polite' : 'off'}
        onPointerEnter={() => hold(true)}
        onPointerLeave={() => hold(false)}
        onFocus={() => hold(true)}
        onBlur={() => hold(false)}
        className="grid min-h-64 items-end gap-6 lg:grid-cols-3"
      >
        {current.items.map((review, i) => (
          // Until hydration settles the page size, mobile shows only one.
          <li
            key={review.id}
            className={`h-full ${i > 0 ? 'hidden lg:block' : ''}`}
          >
            <ReviewMessage
              review={review}
              side={(current.index * pageSize + i) % 2 === 1 ? 'right' : 'left'}
            />
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center gap-3">
        <ControlButton label="Avaliações anteriores" onClick={() => go(-1)}>
          <ChevronRightIcon className="size-5 rotate-180" />
        </ControlButton>
        <div
          aria-hidden="true"
          className="h-1 flex-1 overflow-hidden rounded-full bg-forest/10"
        >
          <div
            ref={bar}
            className="h-full origin-left scale-x-0 rounded-full bg-leaf"
          />
        </div>
        <ControlButton
          label={
            paused ? 'Retomar troca automática' : 'Pausar troca automática'
          }
          onClick={togglePause}
          className="motion-reduce:hidden"
        >
          {paused ? (
            <PlayIcon className="size-5" />
          ) : (
            <PauseIcon className="size-5" />
          )}
        </ControlButton>
        <ControlButton label="Próximas avaliações" onClick={() => go(1)} strong>
          <ChevronRightIcon className="size-5" />
        </ControlButton>
      </div>
    </div>
  );
}
