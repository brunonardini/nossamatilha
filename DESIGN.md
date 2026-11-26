---
name: Nossa Matilha
description: Warm, playful and reassuring design system for a dog boarding and daycare business in Resende/RJ, built from the brand brochure.
colors:
  forest: "#384E20"
  olive: "#4A5B32"
  leaf: "#67973F"
  leaf-ink: "#507531"
  lime: "#A8CF45"
  brown: "#693922"
  sun: "#FFCB03"
  cream: "#F3EEE2"
  cream-light: "#FAF7F0"
  ink: "#231F20"
  white: "#FFFFFF"
typography:
  lettering:
    fontFamily: "Goldplay Alt, Outfit, system-ui, sans-serif"
    fontSize: "fit to column width (lettering-fit-*)"
    fontWeight: 900
    fontStyle: italic
    lineHeight: 1
  display-xl:
    fontFamily: "Grandstander, Arial Rounded MT Bold, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.75rem + 3.75vw, 5rem)"
    fontWeight: 900
    lineHeight: 1.05
  display:
    fontFamily: "Grandstander, Arial Rounded MT Bold, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.55rem + 2.25vw, 3.5rem)"
    fontWeight: 900
    lineHeight: 1.1
  h1:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.45rem + 1.5vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 1.15
  h2:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 1.2rem + 0.9vw, 2rem)"
    fontWeight: 700
    lineHeight: 1.2
  h3:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)"
    fontWeight: 700
    lineHeight: 1.3
  intro:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.12rem + 0.6vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.5
  lead:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.05rem + 0.35vw, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.45
  eyebrow:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    letterSpacing: "0.1em"
rounded:
  sm: "8px"
  md: "14px"
  card: "24px"
  blob: "40px"
  full: "9999px"
spacing:
  gutter: "16px"
  gutter-sm: "32px"
  section: "64px"
  section-sm: "96px"
  reading: "38rem"
  page: "72rem"
components:
  button-primary:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.forest}"
    rounded: "{rounded.full}"
    padding: "10px 24px"
    height: "48px"
  button-secondary:
    backgroundColor: "{colors.brown}"
    textColor: "{colors.cream}"
    rounded: "{rounded.full}"
    padding: "10px 24px"
    height: "48px"
  button-outline:
    textColor: "{colors.forest}"
    rounded: "{rounded.full}"
    padding: "10px 24px"
    height: "48px"
  button-dark:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
    padding: "10px 24px"
    height: "48px"
  button-link:
    textColor: "{colors.forest}"
    height: "48px"
  button-small:
    rounded: "{rounded.full}"
    padding: "6px 16px"
    height: "40px"
  button-icon-chip:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
    size: "36px"
  rating-seal:
    backgroundColor: "{colors.white}"
    textColor: "{colors.forest}"
    rounded: "{rounded.card}"
    padding: "12px 16px"
  highlights-band:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.cream}"
    rounded: "{rounded.blob}"
    padding: "24px"
  highlights-raised-card:
    backgroundColor: "{colors.leaf}"
    textColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "20px"
  service-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "24px"
  team-box:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.cream}"
    rounded: "{rounded.blob}"
    padding: "24px"
  review-bubble:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "20px"
  review-bubble-alt:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.cream}"
    rounded: "{rounded.card}"
    padding: "20px"
  contact-window:
    backgroundColor: "{colors.white}"
    textColor: "{colors.forest}"
    rounded: "{rounded.blob}"
    padding: "40px"
  choice-pill:
    backgroundColor: "{colors.white}"
    textColor: "{colors.forest}"
    rounded: "{rounded.full}"
    padding: "8px 20px 8px 10px"
  choice-pill-checked:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.forest}"
    rounded: "{rounded.full}"
    padding: "8px 20px 8px 10px"
  scroll-cue:
    backgroundColor: "{colors.white}"
    textColor: "{colors.forest}"
    rounded: "{rounded.full}"
    padding: "6px 6px 6px 20px"
  card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "24px"
  card-dark:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.cream}"
    rounded: "{rounded.card}"
    padding: "24px"
  alert:
    backgroundColor: "{colors.brown}"
    textColor: "{colors.cream}"
    rounded: "{rounded.card}"
    padding: "24px"
  speech-bubble:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "16px 20px"
---

# Design System: Nossa Matilha

Source of truth for the visual system of the site, for agents and humans. The web version is `/design-system` (`app/design-system/page.tsx`, not indexed). Implementation: tokens in `app/globals.css` (Tailwind v4 `@theme`), fonts in `app/fonts.ts`, primitives in `components/ui/`. Brand sources and font history: `docs/brand.md`. **Any change to the design system updates this file, `app/globals.css` and `/design-system` in the same change.**

## Overview

**Creative North Star: "A carta da Matilha"** (the pack's letter): the site reads like a warm letter from the team, narrated by Bacon (Silvia's dog), that turns firm and clear when it reaches the rules.

The look comes straight from the boarding brochure: cream paper pages alternating with deep olive-green pages, chunky rounded lettering from the logo wordmark, soft generously rounded cards with a lime bar, and real photos of the dogs and the space. It is mobile-first and made for reading: most visitors arrive from WhatsApp on a phone. Personality lives in the display type, Bacon's illustrations and small playful motion; structure, contrast and clarity are never traded for it.

Color carries meaning, not decoration: cream is story, dark green is attention, brown is critical. Visitors learn the pattern ("when it gets dark, pay attention") and the site never breaks it.

**Key Characteristics:**
- Two section tones (`tone-light`, `tone-dark`) plus an alert block (`tone-alert`); components follow the tone through semantic utilities.
- Brand-only palette: Tailwind's default colors are removed and do not compile.
- Three fonts with strict roles: Grandstander (display), Outfit (headings, UI), Figtree (reading).
- Rounded everything (pill buttons, 24px cards), warm green-tinted shadows.
- Playful but optional motion: GSAP and CSS, always off with reduced motion, content complete without JavaScript.

## Colors

Earthy greens and browns sampled from the brochure, lit by a lime highlight and a sun-yellow alarm. The PNG logos in `tmp/marca/logo/` use an older, lighter green and brown (`#90B144`, `#996037`); the brochure values above are the reference.

### Primary
- **Forest** (`forest`): headings on light sections, raised surfaces (cards) on dark sections, text on lime.
- **Olive** (`olive`): background of dark sections; also the browser `themeColor` in `app/layout.tsx` (a literal hex there is the one allowed exception, metadata cannot read CSS variables).
- **Lime** (`lime`): primary buttons, card accent bars, selection, checked states, decorative highlights.

### Secondary
- **Brown** (`brown`): logo brown; accent text (eyebrows) on light sections, secondary buttons, the critical alert surface.
- **Leaf** (`leaf`): logo green; illustrations, confetti, paws and other non-text shapes only.
- **Leaf ink** (`leaf-ink`): leaf darkened for text: logo-green words, big numbers and links on light sections.

### Tertiary
- **Sun** (`sun`): headings inside alerts, highlights and the focus ring on dark surfaces. Under ~1% of any screen.

### Neutral
- **Cream** (`cream`): light section background, text on dark sections.
- **Cream light** (`cream-light`): subtle surface on cream: the background of the home services band, so it reads apart from the cream hero.
- **White** (`white`): cards on light sections, headings on dark sections.
- **Ink** (`ink`): running text on light sections.

### Section tones

Every section sets one tone class; components use semantic utilities that resolve per tone.

| Utility | `tone-light` | `tone-dark` | `tone-alert` |
|---|---|---|---|
| `bg-surface` | cream | olive | brown |
| `bg-surface-raised` | white | forest | brown + 18% ink |
| `text-fg` | ink | cream | cream |
| `text-fg-muted` | ink 72% on cream | cream 80% on olive | cream 82% on brown |
| `text-heading` (and `h1`–`h4`) | forest | white | sun |
| `text-accent` | brown | lime lifted 20% toward cream | lime |
| `text-highlight` | leaf-ink | sun | sun |
| focus ring (`--tone-focus`) | forest | sun | sun |

| Tone | Meaning | Use for |
|---|---|---|
| `tone-light` (cream) | Story | Narrative, emotion, read at the visitor's pace: the space, the team, the day, grooming |
| `tone-dark` (olive) | Attention | Rules to absorb and interactive checkpoints: vaccines, bag, simulators |
| `tone-alert` (brown) | Critical | One rule whose violation causes a real problem ("tudo por escrito") |

`<body>` is `tone-light`. There is no OS dark mode: the brand tones are the design. In custom CSS read `var(--tone-*)`, not `var(--color-surface)` and friends (those resolve on `:root`, where no tone is set).

### Contrast (WCAG 2.2, verified)

| Pair | Ratio | Allowed for |
|---|---|---|
| ink on cream / white | 14.1 / 16.3 | Any text |
| forest on cream / white | 8.0 / 9.2 | Any text |
| brown on cream / white | 8.2 / 9.5 | Any text |
| leaf-ink on cream / white | 4.6 / 5.3 | Any text |
| cream on olive / forest | 6.4 / 8.0 | Any text |
| white on olive | 7.4 | Any text |
| dark accent (lime 80% + cream) on olive / forest | 4.5 / 5.6 | Any text |
| lime on forest | 5.1 | Any text |
| sun on olive / forest | 4.9 / 6.1 | Any text, focus ring |
| forest on lime | 5.1 | Any text (primary button) |
| cream on brown / sun on brown / lime on brown | 8.2 / 6.3 / 5.3 | Any text |
| pure lime on olive | 4.1 | Large text only (24px+, or 19px+ bold) |
| leaf on cream | 3.0 (2.99) | **No text.** Fails even large text; illustrations only |
| sun on cream | 1.3 | Never, not even as a focus ring |

### Named Rules
**The 60-30-10 Rule.** ~60% cream and white (light sections, cards), ~30% olive and forest (dark sections, headings), ~10% loud colors (lime, brown, leaf, sun). Roughly one section in three is dark. The brochure measures 51/32/15; the site leans lighter for long phone reading and keeps accents scarce so calls to action stand out.

**The Dark Means Attention Rule.** Never use `tone-dark` only for visual rhythm: a dark section holds a rule or an interaction. `tone-alert` is a block inside a section (card or callout), never a full section, at most two per page.

**The Logo Green Is Not Ink Rule.** `leaf` never carries text. When a word or number should look logo-green, use `leaf-ink` on light surfaces and `text-accent`/`lime` on dark ones.

## Typography

**Lettering Font:** Goldplay Alt Black Italic 900 (Latinotype, license held by Nossa Matilha; with Outfit, system-ui), hero title only
**Display Font:** Grandstander Black 900 (with Arial Rounded MT Bold, system-ui)
**Heading Font:** Outfit 600–800 (with system-ui)
**Body Font:** Figtree 400–700, with italics (with system-ui)

**Character:** a chunky, hand-drawn rounded display that echoes the logo wordmark, a tight geometric heading face matching the brochure headings, and a friendly, open body face built for phone legibility. Google fonts are self-hosted through `next/font/google` (latin subset); Goldplay Alt Black Italic is a local woff2 subset (`app/fonts/goldplay-alt-black-italic.woff2`, Latin + Portuguese accents) loaded with `next/font/local`.

### Hierarchy
- **Display XL** (`font-display text-display-xl`, 900, 40→80px, 1.05): big single-block titles.
- **Hero lettering** (`HeroTitle`, `components/home/hero-title.tsx`; `font-lettering font-black italic uppercase`, `text-highlight`): the home hero title is live text in two lines, "A ROTINA QUE SEU" over "CÃO MERECE". Each line's ink fills the column (`@container` on the title, `lettering-fit-<ink width em×1000>` per line), so the shorter second line comes out bigger and stresses "cão" and "merece"; `lettering-inset-<em×1000>` pulls an italic line flush left and `lettering-room-<em×1000>` makes room for the tilde. The DOM text stays in sentence case (screen readers, search); the capitals come from CSS. When the text changes, re-measure each line in the browser with the font loaded and update those values. Goldplay Alt is for this title only.
- **Display** (`font-display text-display`, 900, 32→56px, 1.1): story chapter openers, big numbers ("R$ 120,00").
- **H1** (`text-h1 font-extrabold`, 800, 28→44px, 1.15): section titles, rule chapter titles.
- **H2** (`text-h2 font-bold`, 700, 22→32px, 1.2): subsection titles.
- **H3** (`text-h3 font-bold`, 700, 18→22px, 1.3): card titles.
- **Intro** (`text-intro`, 20→24px, 1.5): the single opening paragraph of a page.
- **Lead** (`text-lead`, 18→21px, 1.55): chapter intros, Bacon's lines.
- **Body** (`text-body`, 16px, 1.6): running text, the default. Text columns use `max-w-reading` (38rem, about 65 characters).
- **Caption** (`text-caption`, 14px, 1.45): photo captions, metadata, short notes only.
- **Eyebrow** (`font-heading text-caption font-semibold tracking-widest uppercase text-accent`): chapter numbers and labels ("02 · Parada 1 de 4").

Sizes are fluid (`clamp()`, 390px → 1280px), so no breakpoint overrides. Headings get `text-wrap: balance`, paragraphs `pretty`. Tailwind's default `text-sm`/`text-base`/`text-lg`… exist but are off-limits: use the scale above.

### Named Rules
**The Short And Loud Rule.** Grandstander only for short text at 24px+ (a title, a number, an exclamation), never a paragraph or a UI label.

**The 16px Floor Rule.** Reading text is never below 16px. `text-caption` (14px) is for metadata and labels, never for content the visitor must read to follow a rule.

## Layout

Mobile-first single column that opens into two columns from `md` where content pairs (text + photo, rule + simulator). Sections are full-bleed bands; content sits in `max-w-page` (72rem, centered) with gutters `px-4` (16px) on mobile and `sm:px-8` (32px) above. Section padding is `py-16` (64px) on mobile and `sm:py-24` (96px) above; the stack inside a chapter is title → `mt-4` intro → `mt-10` content. The home hero stacks title → portrait → text and calls to action on mobile, so the title and the photo fill the first screen; from `lg` the text column sits left and the portrait right. The home header is 64px (80px from `lg`); the boarding guide header is 56px high (+1px border); `min-h-below-header` fills the first screen below it (`min-h-below-home-header` does the same below the 64px home header, for the mobile hero), and chapter anchors use scroll margins that land the eyebrow just under it. Grids use `gap-4` (16px) between cards and `gap-10` (40px) between columns.

## Elevation & Depth

Depth is soft and warm: two shadows tinted with forest green, never grey or black, plus tonal layering (surface → surface-raised) inside each tone.

### Shadow Vocabulary
- **Card** (`shadow-card`: `0 1px 2px rgb(56 78 32 / .08), 0 8px 24px -6px rgb(56 78 32 / .16)`): cards, photos, speech bubbles and filled buttons at rest.
- **Lift** (`shadow-lift`: `0 2px 4px rgb(56 78 32 / .1), 0 18px 40px -12px rgb(56 78 32 / .28)`): hover on filled buttons and the alert block.

### Named Rules
**The Warm Shadow Rule.** Only `shadow-card` and `shadow-lift` exist. No ad-hoc `box-shadow`, no neutral grey shadows, no glows.

## Shapes

Everything is rounded, like the brochure cards and the logo's leash circle. Corners: `rounded-sm` (8px, focus ring, small marks), `rounded-md` (14px, list rows, form rows), `rounded-card` (24px, cards, photos, swatches, bubbles), `rounded-blob` (40px, big illustrative shapes), `rounded-full` (buttons, pills, the card accent bar). Photos are 4:5 and rounded. Borders are rare: 2px `border-current` for checkpoint marks; outline buttons draw the same 2px line as an inset ring (`inset-ring-2 inset-ring-current`) so it adds no height. Icons are 24px line icons, 2px stroke, round caps and joins (`components/ui/icons.tsx`); no brand logos as icons (Instagram is a camera). `PauseIcon` and `PlayIcon` are for self-changing content (the reviews). The **laurel** (`components/ui/laurel.tsx`) is an award branch drawn in `currentColor`, always `sun` and in pairs around a short centered title (left plain, right `flip`), only where the content is an award or praise (the reviews title); each leaf has `data-leaf` so it can grow in with GSAP.

## Components

### Buttons
Tactile and confident: a pill that lifts on hover. `Button` and `ButtonLink` (`components/ui/button.tsx`).
- **Shape:** pill (`rounded-full`), 48px tall (`min-h-12`), `px-6 py-2.5` so the 1.6 line height never pushes it past 48px, Outfit bold 16px.
- **Sizes** (`size` prop): `md` (default) is the shape above, for actions inside the page. `sm` is 40px tall, `px-4 py-1.5`, 6px gap, a 32px icon chip (`py-1 pr-1 pl-4`) and 16px icons, still Outfit bold 16px; for compact places like the site header. Any variant takes either size.
- **Primary:** lime with forest text and `shadow-card`. The main action of a block (WhatsApp).
- **Secondary:** brown with cream text and `shadow-card`. The site header action ("Agendar", `size="sm"`, cream inline `CalendarIcon`): brown echoes the logo's "Matilha" and stays apart from the forest hero title and the lime hero CTA.
- **Outline:** 2px inset ring in the current color (no extra height), `text-heading`, follows the tone; for back or low-priority actions.
- **Dark:** forest with white text and `shadow-card`, hover to olive. Lime inline icon. Light tone only; not used on the home header, where it would merge with the forest hero title.
- **Link:** no pill: `text-heading` with a 2px lime underline (offset 6px) that turns to the text color on hover; still 48px tall. The secondary action beside a primary pill ("Solicitar avaliação").
- **Trailing icon** (`icon` prop): on primary the icon sits in a 36px round forest chip with a white icon and the pill tightens to `py-1.5 pr-1.5 pl-6`; the chip nudges right on hover ("Explorar serviços" + `ChevronRightIcon`). On secondary the icon is inline and cream (same as the label); on dark it is inline and lime; on outline and link it is inline in the text color.
- **Hover / Active / Focus:** rises 2px with `ease-playful` (300ms) and swaps to `shadow-lift`; returns on press; focus ring from the tone. Every button and link shows the pointer cursor (global base rule in `globals.css`, since Tailwind v4 resets buttons to the default cursor). Disabled is 50% opacity and not clickable.

### Cards / Containers
Soft paper cards. `Card` (`components/ui/card.tsx`).
- **Corner Style:** 24px.
- **Background:** `bg-surface-raised` (white on light, forest on dark).
- **Shadow Strategy:** `shadow-card`.
- **Accent:** optional lime bar on the left edge (8px wide, inset 16px top and bottom), on by default; `accent={false}` for secondary groups.
- **Internal Padding:** 24px (32px on the left with the bar).

### Alert
The `tone-alert` block: brown card, cream text, sun heading, `shadow-lift`, `rounded-card`, `p-6`. For one critical rule at a time.

### Inputs / Checklists
Native checkboxes (`accent-lime`, 24px) inside full-row labels of at least 48px: `rounded-md bg-surface-raised px-4 py-3`, hover darkens the row, checked rows get a 2px lime ring. Feedback is CSS-only with `.checklist` and `data-checklist-state="empty" | "missing" | "done"` in an `aria-live="polite"` region (see `app/globals.css`). Selects in the simulators are native.

### Navigation
**Home header** (`components/home/site-header.tsx`): not sticky (it scrolls away with the page), 64px (80px from `lg`), `tone-light` with the same cream as the hero and no border or shadow, so header and hero read as one block. Logo PNG (`assets/brand/logo-nossa-matilha.webp`, 48px tall, 56px from `lg`, sized to balance the 40px button) on the left, the brown (secondary) "Agendar" button (`size="sm"`) on the right. The section menu comes once the page sections exist.

**Boarding guide header:** sticky 56px header on translucent cream (`bg-cream/95`, `backdrop-blur-sm`, 1px `border-forest/10`) with the brand mark, a chapter index (native Popover API) and a lime reading-progress bar (`scroll-progress`). Chapter eyebrows number the sections ("01", "02"…).

### Hero Portrait (signature, home)
`HeroPortrait` (`components/home/hero-portrait.tsx`): one composed image (`assets/photos/home/hero-silvia-and-bacon.webp`, transparent) of the leaf frame (a lime → leaf circle with one crisp top-right corner, like the Folha mockup, and a white border) with Silvia and Bacon stepping out of its top edge. The frame fills the bottom of the image; an invisible square box over it places the orbit photos and the seal. On mobile the portrait is pulled 24px up over the hero title, so Silvia's head covers part of "MERECE" and she seems to stand in front of the words. Around it: three round photos (80px, 96px from `sm`, 112px from `lg`; 4px white ring, `shadow-card`; top-left, top-right and bottom-right, partly outside the frame) and the **rating seal**: a white `rounded-card` with `shadow-lift`, five `sun` stars spread across the full seal width (no label and no number: the score moves between 4,8 and 5,0, the five stars stay; screen readers get "Avaliação de cinco estrelas no Google") and a divided "Certificação FBAA" line with a brown `AwardIcon`. The orbit photos and the seal pop in with GSAP (`HeroMotion`); the photo itself is never hidden (LCP).

On mobile the home hero shows only the lettering and the portrait (the description and the calls to action appear from `lg`), so the first screen is all image. The mobile hero is at least one screen tall (`min-h-below-home-header`), so the next section always starts below the fold and the fixed scroll cue sits on cream, 24px clear of it.

### Scroll Cue (home, mobile)
`ScrollCue` (`components/home/scroll-cue.tsx`): plain text with no box, fixed 24px above the bottom of the screen and centered: "Explore mais" (Outfit bold 16px, `forest`) followed by a 20px `ArrowDownIcon` that bobs gently. It fades out (and drops 16px) over the first 160px of scroll, scrubbed with ScrollTrigger, then retires for good: scrolling back up never brings it back, and a page opened already scrolled never shows it. With reduced motion the arrow stays still and the cue just disappears after those 160px. Decorative (`aria-hidden`, no pointer events), hidden from `lg`. `ScrollCueLabel` is the static label for previews.

### Highlights (home)
`Highlights` (`components/home/highlights.tsx`, content in `lib/home/highlights.ts`), right below the hero, information only (no links or buttons). A `forest` band (`rounded-blob`, `shadow-lift`, cream text) with four blocks from `lg`: the lead ("Estrutura completa em Resende, RJ" in Outfit bold `text-h3` white with a 24px lime `PawIcon` right after its last word (kept on the same line, tilted 12° to the right), and the check-in window in lime Outfit semibold); the area figure as a raised card that overflows the band 56px up and down (`leaf` → `olive` gradient, `rounded-card`, 1px white/15 border, a soft lime circle in the corner, an 80px `rounded-md` photo with a white ring, the value in Grandstander white); then "24 horas" and "Até 32 cães" in Grandstander lime with cream/85 captions, split by a 1px cream/15 vertical line. On mobile the blocks stack inside the band (the photo beside the value in the card) with one horizontal line, only between "24 horas" and "Até 32 cães". Values never wrap (`whitespace-nowrap`). The area is always "+1.200 m²" (see `docs/business.md`).

### Services (home)
`Services` (`components/home/services.tsx`, content in `lib/home/services.ts`): a `cream-light` band (`py-16`, `sm:py-24`) with the eyebrow "Conheça nossos serviços" (small, uppercase, `text-accent`) above the title "Cada cuidado pensado para o bem-estar do seu cão." (Outfit extrabold `text-h1`), then six cards in the owner's order (Creche, Hospedagem, Banho e tosa, Adestramento, Passeio educativo, Transporte): 1 column, 2 from `sm`, 3 from `lg`. No filters, links or buttons. Each card: white, `rounded-card`, 1px `forest/10` border, `shadow-card`; a 3:2 photo (WebP, no metadata) with a leaf-shaped number badge (white, round with a 2px top-right corner, `shadow-card`); then an optional meta line (caption, bold, uppercase, `leaf-ink`), the name (Outfit extrabold `text-h3`), the summary (`fg-muted`) and optional checked points (a `CheckIcon` in a 20px `lime/35` circle). Copy states only facts from `docs/business.md`; services without confirmed details show just the summary.

### Team (home)
`Team` (`components/home/team.tsx`, content in `lib/home/team.ts`): a compact section after the services, on a `tone-light` (cream) background, kept short because more sections follow. One forest `rounded-blob` box with `shadow-lift`, like the highlights band; from `lg` three columns: Silvia, the text and the team photo. Silvia (waist-up cut-out on a transparent background) sits over a lime → leaf leaf (round with a 2px top-right corner) and steps out of the top of the box (`-mt-16` from `lg`, `-mt-20` on mobile, so the section has `pt-24`); the cut-out is clipped to the leaf's curve with `rounded-b-full`. The middle column has the eyebrow in `lime`, the title (Outfit extrabold `text-h2`, white), a one-line intro (`cream/85`) and four facts with a `CheckIcon` in a 20px `lime` circle (2 columns from `sm`). The group photo is small (17rem from `lg`), `rounded-card` with a 2px `white/70` ring and a caption. On mobile everything stacks and Silvia's name and role sit beside her. The whiteboard behind the team in the photo is blurred.

### Reviews (home)
`Reviews` (`components/home/reviews.tsx`, content in `lib/home/reviews.ts`), after the team, on a `cream-light` band (`py-16`, `sm:py-24`). Title: the eyebrow "O que dizem os tutores" (`text-accent`) and "Cuidado que transforma a rotina." (Outfit extrabold `text-h1`), centered between two `sun` laurels (112px tall, 4px from the title on mobile; 128px and 20px from `sm`); the leaves grow from base to tip and the title rises in when it scrolls in (`ReviewsHeading`). Below, one row of reviews shown as chat messages (`ReviewMessage`): the reviewer's photo (44px, 48px from `sm`, 2px white ring), a bubble with the name (Outfit bold), five 14px `sun` stars, the text and two "read" ticks; bubbles alternate white (avatar left, `rounded-bl-sm`) and `forest` with a `lime` name (avatar right, `rounded-br-sm`). No service tags. `ReviewsCarousel` shows three messages from `lg` and one below, and changes page by itself every 7 seconds, wrapping from the last page to the first (`wrappedPage` in `lib/pagination.ts`): a single `leaf` bar on `forest/10` fills during the current page only (it never shows how many pages there are), then each new message "types in" one after another (avatar pops, three dots bounce, the bubble pops out of them). Controls in one row: previous (white), the bar, pause/play (white, `PauseIcon`/`PlayIcon`) and next (`forest` with a `lime` chevron), 44px round. It holds while hovered or focused and while off screen; when paused the list becomes `aria-live="polite"`. With reduced motion nothing moves, the pause button is hidden and pages change only with the arrows. At the end, a discreet text link "Ver todas as avaliações no Google" (caption, `fg-muted`, underlined; never a button, so visitors stay on the site; new tab). Excerpts are only cut or have typos fixed; reviewers authorized their name and photo (see `AGENTS.md`).

### Contact (home)
`Contact` (`components/home/contact.tsx`, form in `components/home/contact-form.tsx`, logic in `lib/quote.ts`) is the last section: `tone-light` (cream), `max-w-3xl`, the eyebrow "Orçamento sem compromisso" and the title "Complete a mensagem e envie." centered. The form is a chat window: white, `rounded-blob`, `shadow-lift`, `overflow-hidden`. Its `forest` header shows "Para: Nossa Matilha" (a 40px `lime` circle with a `PawIcon` tilted 12°) and a two-option switch (radio buttons on an `olive` track, a `lime` pill that slides under the chosen option with a CSS transform; Outfit bold caption; `sun` focus ring): "Mensagem pronta" and "Escrever do meu jeito". **Mensagem pronta** is a fill-in sentence in Outfit semibold `text-h3`, `forest`: "Olá, Nossa Matilha! Meu nome é ___ e o meu cão se chama ___." The blanks are inline inputs (hidden labels "Seu nome" and "Nome do seu cão"; Outfit bold `leaf-ink`; a 3px `forest/25` underline, `leaf` on focus, `brown` when invalid) that grow with the text. Then the services group, whose legend says "Quero um orçamento de (escolha um ou mais):": one **choice pill** per service (a real checkbox; 48px tall; white with `shadow-card`, an empty 28px circle with a `forest/25` border; when checked the pill turns `lime` and the circle `forest` with a `lime` check that pops in with GSAP). **Escrever do meu jeito** shows a blank textarea ("Sua mensagem", placeholder "Digite sua mensagem aqui", `cream-light`, 2px border, `rounded-md`). Switching modes fades the new content in and keeps what was typed in both. Below a 1px `forest/10` line, aligned right: the primary button with a `ChatIcon` chip, "Solicitar orçamento no WhatsApp" or, when writing, "Enviar mensagem no WhatsApp", and the purpose note (caption, `fg-muted`): nothing is stored, the data only builds the message. Errors are `brown` captions in pt-BR, and focus goes to the first invalid field. Sending opens `wa.me` with the message in a new tab; the number comes from the environment (`lib/contact.ts`).

### Bacon Says (signature)
`BaconSays` (`components/boarding-guide/bacon-says.tsx`): Bacon's illustration beside a speech bubble (`bg-surface-raised`, `rounded-card`, `shadow-card`, Outfit semibold lead). One short, light line per bubble; Bacon never states a rule. The illustrations follow `docs/illustration-guide.md`.

### Guide Photo (signature)
`GuidePhoto` (`components/boarding-guide/guide-photo.tsx`): 4:5 photo, `rounded-card`, `shadow-card`, blur placeholder, optional caption in `text-caption text-fg-muted`.

### Motion
- **Easings:** `ease-out-soft` `cubic-bezier(0.22, 1, 0.36, 1)` for entrances; `ease-playful` `cubic-bezier(0.34, 1.56, 0.64, 1)` (slight overshoot) for buttons and playful details; `ease-in-out-soft` `cubic-bezier(0.65, 0, 0.35, 1)` for loops.
- **Durations:** `duration-(--duration-fast)` 150ms (colors), `--duration-base` 300ms (hover, state), `--duration-slow` 600ms (entrances).
- **CSS animations:** `animate-reveal` (fade and rise), `animate-wag` (tail-wag loop), `animate-nudge-down` ("scroll down" cue).
- **CSS scroll-driven (progressive enhancement):** `scroll-reveal` (rise on entering the viewport), `scroll-progress` (reading bar).
- **GSAP** (`gsap`, `@gsap/react`, ScrollTrigger, SplitText) for choreographed and scroll-linked sequences, through `lib/gsap.ts`, `useGSAP` and `gsap.matchMedia()`. Rules in `AGENTS.md`; the boarding guide's motion catalog is in `docs/boarding-guide-plan.md`.
- `motion-pending` hides an above-the-fold block GSAP animates until its start state is set (3s CSS fallback).

## Do's and Don'ts

### Do:
- **Do** set `tone-light` or `tone-dark` on every section and use semantic utilities (`bg-surface`, `text-fg`, `text-heading`, `text-accent`, `text-highlight`) inside components.
- **Do** use only the tokens above; when one is missing, add it to `app/globals.css`, this file and `/design-system` in the same change.
- **Do** keep touch targets at least 48 × 48px and the focus ring visible (3px, offset 3px, tone color).
- **Do** animate only `transform` and `opacity` (colors and shadows on hover are fine) and keep every page complete and understandable with `prefers-reduced-motion: reduce` and without JavaScript.
- **Do** mark decorative SVGs and shapes `aria-hidden="true"`.

### Don't:
- **Don't** write hex values, arbitrary colors (`bg-[#...]`), arbitrary font sizes, Tailwind's default type scale (`text-sm`, `text-base`…) or ad-hoc shadows in components.
- **Don't** put text in `leaf`, or `sun` on a light surface.
- **Don't** use a dark section for rhythm alone, or more than two `tone-alert` blocks per page.
- **Don't** use Grandstander below 24px or for more than a short line.
- **Don't** use grey or black shadows, sharp corners on cards and buttons, or brand logos as icons.
- **Don't** add another animation library (Motion, Lenis, Lottie…) without the owner's approval.
