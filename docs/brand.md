# Brand reference

Raw brand material is in `tmp/marca/` (gitignored, provided by the owner). This file records the brand sources and decisions; the design system built from them is in [DESIGN.md](../DESIGN.md).

## Assets in `tmp/marca/`

| Path                                     | Content                                                                    |
| ---------------------------------------- | -------------------------------------------------------------------------- |
| `logo/NossaMatilha-600x400.png`          | Full logo, 951×400 PNG with transparency                                   |
| `logo/NossaMatilha400.png`               | Full logo, 400×168 PNG with transparency                                   |
| `logo/nossa-matilha-navbar-logo.png`     | Navbar logo, 163×60 PNG with transparency                                  |
| `Hospedagem_Nossa_Matilha_corrigido.pdf` | Boarding brochure (content in [business.md](business.md))                  |
| `HOSPEDAGEM NOSSA MATILHA/`              | Source file of the brochure (with page previews)                           |
| `fotos/`                                 | Photos grouped by topic (space, daycare, grooming, team, social media art) |

Some photos are `.HEIC`; convert them before use. Photos may show identifiable people or personal data — follow "Privacy and LGPD" in `AGENTS.md` before using any of them.

## Logo

Silhouettes of a dog, a cat and a small dog inside a green leash-shaped circle, above the wordmark "NOSSA" (green) / "Matilha" (brown).

## Colors

The brand palette, sampled from the brochure artwork, is defined as design tokens. See [DESIGN.md](../DESIGN.md#colors) for values, usage and contrast rules.

## Typography

The brochure fonts (Kanesty, Amithen) are not licensed for the web, so the site uses Google Fonts (SIL Open Font License) chosen to match them. Load them with `next/font/google`, which self-hosts the files at build time (no request to Google at runtime). Latin subset only.

| Role     | Font                                                           | Weights                          | Matches                                                                                  | Use                                                                                                                                                                       |
| -------- | -------------------------------------------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Display  | [Grandstander](https://fonts.google.com/specimen/Grandstander) | 900 (Black)                      | Logo wordmark: heavy, rounded, playful hand-drawn letters with the same single-story `a` | Large text only: hero titles, chapter openers, big numbers (e.g. "R$ 120,00"), short exclamations ("Segue a gente lá!"). Never below ~24px or for more than a short line. |
| Headings | [Outfit](https://fonts.google.com/specimen/Outfit)             | 600–800 (variable)               | Brochure headings (Kanesty ExtraBold): rounded geometric, tight                          | Section titles, card titles, buttons, labels.                                                                                                                             |
| Body     | [Figtree](https://fonts.google.com/specimen/Figtree)           | 400–700 (variable, with italics) | Friendly geometric with open shapes; very legible at small sizes on mobile               | All running text, lists, captions, form fields. Minimum 16px.                                                                                                             |

The hero lettering is drawn as SVG from the outlines of **Little Paws** (Tigadestd), the font of the logo wordmark. Its license is free for personal use only; Nossa Matilha holds the commercial license (owner's confirmation). The font file itself is never committed or served: only the SVG paths of the title are, in `components/home/hero-lettering.tsx`.

Approximate latin `woff2` sizes: Grandstander Black ~22 KB, Outfit ~32 KB, Figtree ~21 KB (roman). Preload only the display and body fonts used above the fold.

Rejected during the comparison: Chewy (first pick, replaced by the owner's choice), Londrina Solid (more angular than the logo), Boogaloo, Spicy Rice, DynaPuff; Kanit and Lexend for headings; Lexend, Outfit and Atkinson Hyperlegible Next for body (too wide, too tight, or too plain).

## Voice

Warm, caring and reassuring ("Tudo será recebido e utilizado com carinho!", "Chega em casa pronto: é só abraçar."), while being clear and firm about rules and policies.
