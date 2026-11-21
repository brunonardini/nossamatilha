# Design system

Tokens live in [`app/globals.css`](../app/globals.css) (Tailwind v4 `@theme`), fonts in [`app/fonts.ts`](../app/fonts.ts), and the first UI primitives in [`components/ui/`](../components/ui). A live preview of everything is at `/design-system` (not indexed by search engines). Brand sources and font choices: [brand.md](brand.md).

## Colors

Tailwind's default palette is removed: only brand colors exist, so classes like `bg-red-500` do not compile.

| Token         | Hex       | Use                                                           |
| ------------- | --------- | ------------------------------------------------------------- |
| `forest`      | `#384E20` | Headings on light sections, raised surfaces on dark sections  |
| `olive`       | `#4A5B32` | Dark section background                                       |
| `leaf`        | `#67973F` | Logo green: illustrations and display text (24px+) only       |
| `leaf-ink`    | `#507531` | Logo green darkened for small text and links (4.6:1 on cream) |
| `lime`        | `#A8CF45` | Highlights, primary buttons, card accent bars                 |
| `brown`       | `#693922` | Logo brown: subtitles, secondary buttons, warnings            |
| `sun`         | `#FFCB03` | Important notes on dark sections, keyboard focus ring         |
| `cream`       | `#F3EEE2` | Light section background                                      |
| `cream-light` | `#FAF7F0` | Subtle surface on cream                                       |
| `ink`         | `#231F20` | Running text on light sections                                |
| `white`       | `#FFFFFF` | Cards on light sections                                       |

Values come from the brochure artwork. The PNG logo files in `tmp/marca/logo/` use an older, lighter green and brown (`#90B144`, `#996037`); the brochure colors are the reference.

### Color distribution (60-30-10)

| Share | Role   | Colors                                      | Where                                                                                                                                                      |
| ----- | ------ | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ~60%  | Main   | `cream`, `white`                            | Light sections (`tone-light`), cards on light sections. Most reading happens here.                                                                         |
| ~30%  | Second | `olive`, `forest`                           | Dark sections (`tone-dark`), headings on light sections, cards on dark sections.                                                                           |
| ~10%  | Loud   | `lime`, `brown` (+ `leaf`, `sun` sparingly) | Primary/secondary buttons, card accent bars, logo-colored words, highlights, illustrations. `sun` stays under ~1%: critical notes and the focus ring only. |

`ink` is the text color and is not counted. Measured on the brochure (photos excluded): light ≈ 51%, dark greens ≈ 32%, accents ≈ 15%, text ≈ 2%. The site leans a bit more on cream, because long reading on a phone is more comfortable on a light background, and keeps accents scarcer so calls to action stand out. On a long page, alternate tones so that roughly one section in three is dark.

### Contrast (WCAG 2.2)

| Pair              | Ratio  | Allowed for                            |
| ----------------- | ------ | -------------------------------------- |
| ink on cream      | 14.1:1 | Any text                               |
| forest on cream   | 8.0:1  | Any text                               |
| brown on cream    | 8.2:1  | Any text                               |
| cream on olive    | 6.4:1  | Any text                               |
| forest on lime    | 5.1:1  | Any text (primary button)              |
| leaf-ink on cream | 4.6:1  | Any text                               |
| sun on olive      | 4.9:1  | Any text                               |
| lime on olive     | 4.1:1  | Large text only (24px+, or 19px+ bold) |
| leaf on cream     | 3.0:1  | Display text only, never running text  |

## Section tones

The brochure alternates cream pages and dark green pages. Every section sets one tone class, and components read semantic colors that follow it:

| Semantic utility                | `tone-light` | `tone-dark` | `tone-alert`    |
| ------------------------------- | ------------ | ----------- | --------------- |
| `bg-surface`                    | cream        | olive       | brown           |
| `bg-surface-raised`             | white        | forest      | brown + ink 18% |
| `text-fg`                       | ink          | cream       | cream           |
| `text-fg-muted`                 | ink 72%      | cream 80%   | cream 82%       |
| `text-heading` (also `h1`–`h4`) | forest       | white       | sun             |
| `text-accent`                   | brown        | lime        | lime            |
| `text-highlight`                | leaf-ink     | sun         | sun             |

`tone-alert` (brown surface, cream text, `sun` headings) exists for critical warnings only.

### What each tone means

Tones are not decoration: each one tells the visitor what kind of content they are in. Use them consistently so the visitor learns the pattern ("when it gets dark, pay attention").

| Tone                 | Meaning   | Use for                                                                         | Examples                                                                             |
| -------------------- | --------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `tone-light` (cream) | Story     | Narrative and emotional content, read at the visitor's own pace                 | The space, the team, a day in the routine, bath and grooming                         |
| `tone-dark` (olive)  | Attention | Rules the visitor must absorb and the interactive checkpoints                   | Vaccine checklist, packing the bag, cancellation simulator, 24-hour daily-rate clock |
| `tone-alert` (brown) | Critical  | A single rule whose violation causes real problems; at most one or two per page | "All instructions must be in writing"                                                |

Rules:

- Never use `tone-dark` only for visual rhythm; if a section is dark, it holds a rule or an interaction.
- `tone-alert` is a block inside a section (a card or callout), never a full section, and never more than two per page.
- With the planned script (about 10 chapters, 4–5 interactive checkpoints), the 60-30-10 split follows naturally; review the proportion once the script is final.

`<body>` is `tone-light`. Prefer semantic utilities inside components so they work in both tones; use raw brand colors only for brand moments (logo-colored words, illustrations). There is no OS dark mode: the brand tones are the design.

In custom CSS, read `var(--tone-*)` directly, not `var(--color-surface)` and friends: those resolve on `:root`, where no tone is set.

## Typography

| Utility                        | Font               | Size (mobile → desktop) | Use                              |
| ------------------------------ | ------------------ | ----------------------- | -------------------------------- |
| `font-display text-display-xl` | Grandstander Black | 40 → 80px               | Hero title                       |
| `font-display text-display`    | Grandstander Black | 32 → 56px               | Chapter openers, big numbers     |
| `text-h1`                      | Outfit             | 28 → 44px               | Section title (`font-extrabold`) |
| `text-h2`                      | Outfit             | 22 → 32px               | Subsection title (`font-bold`)   |
| `text-h3`                      | Outfit             | 18 → 22px               | Card title (`font-bold`)         |
| `text-lead`                    | Figtree            | 18 → 21px               | Intro paragraphs                 |
| `text-body`                    | Figtree            | 16px                    | Running text (default)           |
| `text-caption`                 | Figtree            | 14px                    | Captions and metadata only       |

Sizes are fluid (`clamp()`), so no breakpoint overrides are needed. Headings get `text-wrap: balance`, paragraphs `pretty`. Grandstander is only for short, large text (24px+). Body text is never below 16px.

## Shape, depth and layout

- Radii: `rounded-sm` (8px), `rounded-md` (14px), `rounded-card` (24px, cards and swatches), `rounded-blob` (40px, big illustrative shapes), `rounded-full` (buttons, pills).
- Shadows: `shadow-card` (resting) and `shadow-lift` (hover), both warm and tinted with forest green.
- Widths: `max-w-reading` (38rem, text columns) and `max-w-page` (72rem, page content). Page gutters are `px-4` on mobile and `sm:px-8` above.

## Motion

- Easings: `ease-out-soft` (default for entrances), `ease-playful` (slight overshoot, for buttons and playful details), `ease-in-out-soft` (loops).
- Durations: `duration-(--duration-fast)` 150ms, `duration-(--duration-base)` 300ms, `duration-(--duration-slow)` 600ms.
- Animations: `animate-reveal` (fade and rise on entry) and `animate-wag` (tail-wag rotation loop).
- `prefers-reduced-motion: reduce` disables all animations and transitions globally. Content must be fully understandable without motion.
- Animate only `transform` and `opacity` (plus colors and shadows on hover) to stay on the compositor.

## Components

- `ButtonLink` / `Button` (`components/ui/button.tsx`): variants `primary` (lime), `secondary` (brown), `outline` (follows the tone). Minimum height 48px for touch.
- `Card` (`components/ui/card.tsx`): rounded raised surface with the optional lime accent bar from the brochure.

## Accessibility

- Focus ring: 3px `sun` outline on every focusable element (`:focus-visible`).
- Touch targets of at least 48 × 48px.
- Decorative SVGs and shapes use `aria-hidden="true"`.
