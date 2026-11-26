import Image from 'next/image';
import type { ReactNode } from 'react';
import { CheckIcon, StarIcon } from '@/components/ui/icons';
import type { HomeReview } from '@/lib/home/reviews';

/** Props for {@link ReviewMessage}. */
export type ReviewMessageProps = {
  review: HomeReview;
  /** `left`: white bubble, avatar on the left; `right`: forest, mirrored. */
  side?: 'left' | 'right';
};

/**
 * A review shown as a chat message: the reviewer's photo, a "typing"
 * indicator (hidden; revealed by the carousel's GSAP timeline) and the
 * bubble with the name, five stars, the text and "read" ticks.
 */
export function ReviewMessage({
  review,
  side = 'left',
}: ReviewMessageProps): ReactNode {
  const right = side === 'right';
  return (
    <div
      data-message
      className={`flex h-full items-end gap-3 ${right ? 'flex-row-reverse' : ''}`}
    >
      <Image
        data-avatar
        src={review.avatar}
        alt=""
        sizes="48px"
        className="size-11 shrink-0 rounded-full shadow-card ring-2 ring-white sm:size-12"
      />
      <div className="relative min-w-0 flex-1 self-stretch">
        <div
          data-typing
          aria-hidden="true"
          className={`invisible absolute bottom-0 flex gap-1 rounded-full bg-white px-4 py-3 shadow-card ${right ? 'right-0' : 'left-0'}`}
        >
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              data-dot
              className="size-2 rounded-full bg-forest/40"
            />
          ))}
        </div>
        <figure
          data-bubble
          className={`flex h-full flex-col rounded-card p-5 shadow-card ${right ? 'origin-bottom-right rounded-br-sm bg-forest text-cream' : 'origin-bottom-left rounded-bl-sm bg-white'}`}
        >
          <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
            <span
              className={`font-heading font-bold ${right ? 'text-lime' : 'text-forest'}`}
            >
              {review.name}
            </span>
            <span className="flex gap-0.5 text-sun">
              {[0, 1, 2, 3, 4].map((star) => (
                <StarIcon key={star} className="size-3.5" />
              ))}
              <span className="sr-only">Avaliação de cinco estrelas</span>
            </span>
          </figcaption>
          <blockquote className="mt-2 flex-1">
            <p>{review.text}</p>
          </blockquote>
          <p
            aria-hidden="true"
            className={`mt-1 flex justify-end ${right ? 'text-lime' : 'text-leaf'}`}
          >
            <CheckIcon className="size-3.5" />
            <CheckIcon className="-ml-2 size-3.5" />
          </p>
        </figure>
      </div>
    </div>
  );
}
