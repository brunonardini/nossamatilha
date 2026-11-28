import type { ReactNode } from 'react';
import { ReviewsCarousel } from '@/components/home/reviews-carousel';
import { ReviewsHeading } from '@/components/home/reviews-heading';
import { googleReviewsUrl, homeReviews } from '@/lib/home/reviews';

/**
 * Home reviews section ("O que dizem os tutores"): the laurel title, the
 * self-changing row of review messages and a discreet text link to all the
 * reviews on Google (a plain link, not a button, so visitors stay on the
 * site; it opens in a new tab).
 */
export function Reviews(): ReactNode {
  return (
    <section
      id="avaliacoes"
      aria-labelledby="avaliacoes-titulo"
      className="tone-light bg-cream-light px-4 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-page">
        <ReviewsHeading
          id="avaliacoes-titulo"
          eyebrow="O que dizem os tutores"
          title="Cuidado que transforma a rotina."
        />
        <div className="mt-10">
          <ReviewsCarousel reviews={homeReviews} />
        </div>
        <p className="mt-6 text-center">
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-caption text-fg-muted underline decoration-1 underline-offset-4 hover:text-heading"
          >
            Ver todas as avaliações no Google
          </a>
        </p>
      </div>
    </section>
  );
}
