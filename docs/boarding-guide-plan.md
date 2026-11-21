# Boarding guide page — plan

An interactive, animated page that replaces the boarding brochure (`tmp/marca/Hospedagem_Nossa_Matilha_corrigido.pdf`) sent to new customers. It is a secondary page, not the home page. Content source: [business.md](business.md). Brand: [brand.md](brand.md).

## Problem and goal

Customers receive a 16-page PDF of rules and services. It is tiring to read, so many skip it or skim it. The page must make the same content pleasant, fun and educational, so customers actually absorb the rules and feel the affection a dog brings to its family — while keeping the tone of a serious, professional business that values quality and excellence.

Hard requirements:

- Keep the Nossa Matilha visual identity (fonts and colors).
- Load and run as smoothly as the reference site on desktop and mobile: no jank, no loading screens.
- Content in pt-BR; LGPD rules from `AGENTS.md` apply.

## Reference: endspeciesism.org

Teardown of the downloaded HTML and JS bundles:

- Next.js App Router + Tailwind; scenes built with `sticky` sections.
- Motion (formerly Framer Motion) with `whileInView` for reveals.
- Lenis smooth scroll.
- 266 PNG sketch illustrations served through `next/image` with `loading="lazy"`.
- Adobe Typekit font; Pace.js loading bar.
- About 290 KB of gzipped JavaScript.

It feels light because content is mostly text and small illustrations loaded lazily. We can be lighter: no Lenis, no loading bar, CSS-driven scroll animations.

## Format: scroll story with interactive checkpoints

Most customers open the link from WhatsApp on a phone, where scrolling is the natural gesture. Pure scroll lets people skim the rules, which is the problem we are solving. So:

- **Scroll carries the narrative:** arrival, the space, the team, a day in the routine (morning, afternoon, night), bath and grooming.
- **Interaction is required where misunderstandings happen later:**
  - Vaccines: a checklist the customer ticks.
  - What to bring: pack the dog's bag.
  - Cancellation: a simulator ("if I cancel X hours before, I get Y").
  - 24-hour daily rate: an interactive clock.
- **Navigation:** progress bar and chapter index, for customers who come back to check a single rule.
- **Ending:** an "I understood the rules" summary with the WhatsApp call to action.
- **No scroll hijacking:** never lock the page or change scroll speed. It hurts performance on phones and accessibility.

## Stack

| Concern               | Choice                                                                                                 | Why                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| Page                  | Next 16, statically generated, Server Components                                                       | Ready HTML, almost no JS on first load                                      |
| Scroll animation      | CSS scroll-driven animations (`animation-timeline: view()`) behind `@supports`, with a simple fallback | Runs on the browser engine, no JS cost                                      |
| Interactive animation | Motion (`motion/react`) with `LazyMotion` + `m`                                                        | Single animation library, ~5 KB initial; gestures and component transitions |
| Illustrations         | Inline SVG animated with CSS/Motion                                                                    | Light, sharp on any screen, recolors with the design system                 |
| Photos                | Real photos from `tmp/marca/fotos`, served via `next/image` (AVIF/WebP)                                | Real emotion                                                                |
| Photo prep            | sharp (convert `.HEIC`, strip EXIF/GPS)                                                                | EXIF/GPS removal is required by the LGPD rules                              |
| Fonts                 | `next/font/google` (Grandstander, Outfit, Figtree — see [brand.md](brand.md#typography))               | Self-hosted at build time, no external request                              |
| Icons                 | Custom SVG in the brochure's icon style                                                                | Keeps the identity                                                          |
| Bundle size           | `@next/bundle-analyzer` + size budget in CI                                                            | Stops the page from growing unnoticed                                       |
| Performance           | Lighthouse CI on CircleCI                                                                              | Measures real speed on every PR                                             |

Avoid unless a specific need appears:

- Lenis (artificial scroll).
- GSAP — great for complex pinned timelines, but it would be a second animation library. Only if Motion cannot do it.
- Lottie (~250 KB) and Rive (runtime 150 KB+). Only for a very specific case (e.g. a mascot dog that reacts to touch), and lazy-loaded.
- Background video, Three.js/WebGL.

## Performance budget

- Page JavaScript under 100 KB gzipped.
- LCP under 2 s on 4G.
- No layout shift while loading (CLS ≈ 0).
- All text readable without JavaScript.
- Respect `prefers-reduced-motion`.

## Skills and tools

- `frontend-design` and `Design` plugins (Anthropic): visual direction, design system tokens, pt-BR UX copy (`ux-copy`), accessibility reviews.
- Figma MCP (connected): storyboard the scenes before coding, if visual validation is wanted.
- `vercel-react-view-transitions`: only if the experience is split into several routes; not needed for a single page.
- `audit-suite` (community): animation and performance audit skills; review before installing.

## Open items before building

1. ~~**Font licensing.**~~ Resolved: Google Fonts alternatives chosen (Grandstander, Outfit, Figtree), see [brand.md](brand.md#typography).
2. ~~**Design system.**~~ Done: tokens, fonts and base components, see [design-system.md](design-system.md).
3. ~~**Photos.**~~ Done: selected and processed, see [photo-selection.md](photo-selection.md) (aerial view pending its source). Bacon illustrations: [illustration-guide-output.md](illustration-guide-output.md).
4. ~~**Script.**~~ Done and reviewed by the owner, see [boarding-guide-script.md](boarding-guide-script.md).

## Build status

**Phase 1 — done.** The page is live at `/guia-da-hospedagem` (`app/guia-da-hospedagem/page.tsx`, components in `components/boarding-guide/`, data in `lib/boarding-guide/`):

- Sticky header with the brand mark (vector, extracted from the brochure: `assets/brand/`), a no-JS chapter index (`<details>`) and a CSS reading-progress bar.
- All 11 chapters with the script copy, Bacon's lines, the photos and the tones.
- Scroll effects in pure CSS: reveals, counting numbers and the morning → night sky of "Um dia na Matilha". No client JavaScript in the page itself.
- The 4 checkpoints show their full rules as static content (also their future no-JS fallback).
- WhatsApp links built from environment variables; a floating WhatsApp button on mobile.

**Next phases:** one interactive checkpoint at a time — vaccine checklist, daily-rate clock, pack the bag, cancellation simulator — then the checkpoint counter and final summary.

**Performance note:** the page ships no JavaScript of its own, but the Next.js/React framework baseline is about 180 KB gzipped, above the 100 KB budget above. Investigate whether the experimental flags in `next.config.ts` (`cacheComponents`, `partialPrefetching`, `agentFeedback`) add to it before adding client components.
