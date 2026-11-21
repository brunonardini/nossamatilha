# Illustration guide

How the boarding guide ([script](boarding-guide-script.md)) mixes photos and illustrations, the visual style, and the prompts to generate the illustrations with an image model (e.g. ChatGPT).

## What is a photo, what is an illustration, what is code

| Kind                                | Used for                                                                                    | Why                                                                 |
| ----------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Real photos** (`tmp/marca/fotos`) | Silvia, the real Bacon, the team, the space, dogs playing, bath and grooming                | Prove that the place and the people are real; carry the emotion     |
| **Illustrations (generated)**       | Bacon as narrator, one pose per chapter                                                     | A consistent, playful guide that photos cannot give                 |
| **Code (SVG/CSS)**                  | Icons, paw prints, hearts, organic wave shapes, the morning → night sky, the clock, the bag | Tiny, sharp at any size, animatable, recolored by the design tokens |

Keep illustrations few and small: one Bacon pose per chapter, delivered as transparent images and converted to AVIF/WebP. Everything decorative is SVG.

## Style

Matches the existing brand art (`tmp/marca/fotos/artes`): flat illustration, soft organic shapes, hand-drawn doodles, warm and friendly but clean and professional.

- Flat 2D vector-style illustration, clean shapes, soft rounded forms, subtle grain at most; no 3D, no photorealism, no heavy gradients.
- Thick, smooth, slightly irregular dark-brown outline (`#693922`) like the logo lettering.
- Limited palette only: caramel/golden fur for Bacon, cream `#F3EEE2`, leaf green `#67973F`, lime `#A8CF45`, forest green `#384E20`, brown `#693922`, a touch of sun yellow `#FFCB03`.
- Transparent background, character centered, full body, no text, no letters, no logos, no watermark.
- Expressive but not childish: big friendly eyes, readable silhouette at small sizes.

## Bacon (character reference)

From the photos in `tmp/marca/fotos/bacon` and `tmp/marca/fotos/silvia`:

- Slim, tall, young medium-large dog with a lean, athletic body and long legs.
- Short, smooth caramel / golden-tan coat, slightly lighter on the chest and muzzle, small white patch on the chest.
- Long floppy ears, narrow head, long muzzle, pinkish-brown nose, warm amber-brown eyes.
- Long thin tail.
- Royal-blue collar with a round silver tag.
- Personality: goofy, sweet, curious, loves food and attention.

## How to generate

1. Start a new chat. Attach 3–4 photos of Bacon (e.g. `bacon/IMG_6272.JPG`, `bacon/IMG_6274.JPG`, `silvia/IMG_6064.JPG`) and run **Prompt 1** (character sheet).
2. Iterate until the character sheet looks right. This image is the reference for everything else.
3. For every pose, in the same chat, attach the approved character sheet and run the pose prompt. The style block is already included in each prompt.
4. Export each pose as **PNG with transparent background, at least 2048 px** on the longest side, and save it in `tmp/marca/ilustracoes/` named as in the table (e.g. `bacon-01-ola.png`). The agent optimizes and moves them to `public/`.

### Style block (included in every prompt)

> Flat 2D vector-style illustration, clean soft rounded shapes, thick smooth slightly irregular dark brown outline (#693922), limited palette: caramel golden-tan fur, cream #F3EEE2, leaf green #67973F, lime #A8CF45, forest green #384E20, brown #693922, small touches of sun yellow #FFCB03. Friendly and warm but clean and professional, not childish. No 3D, no photorealism, no heavy gradients. Transparent background, no text, no letters, no logos, no watermark.

### Prompt 1 — Character sheet (reference only, not used on the site)

> Create a character sheet of a dog named Bacon, based on the attached photos. Bacon is a slim, tall, young medium-large dog with a lean athletic body and long legs, a short smooth caramel golden-tan coat (lighter on the chest and muzzle, small white patch on the chest), long floppy ears, a narrow head with a long muzzle, a pinkish-brown nose, warm amber-brown eyes, a long thin tail, and a royal-blue collar with a round silver tag. Show him from the front, side and three-quarter view, standing and sitting, plus four facial expressions (happy, curious, proud, sleepy). Keep proportions identical across views. [Style block]

### Poses (one per chapter)

| File                     | Chapter               | Prompt                                                                                                                                                                          |
| ------------------------ | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bacon-00-ola.png`       | 0 · Bem-vindo         | Bacon, from the attached character sheet, sitting and waving one front paw hello at the viewer, big happy open-mouth smile, tail wagging (small motion lines). [Style block]    |
| `bacon-01-brincando.png` | 1 · Quem somos        | Bacon mid-run in a playful bow, ears flying, joyful expression, as if inviting another dog to play. [Style block]                                                               |
| `bacon-02-orgulhoso.png` | 2 · Nossa equipe      | Bacon sitting upright and proud, chest out, wearing a small green bandana with a white paw print, gentle confident smile. [Style block]                                         |
| `bacon-03-comendo.png`   | 3 · Um dia na Matilha | Bacon sitting politely in front of a round green food bowl full of kibble, looking up with a hopeful, excited face, a drop of drool. [Style block]                              |
| `bacon-04-vacina.png`    | 4 · Vacinas           | Bacon sitting bravely with a small round lime-green bandage on his shoulder, holding a small green vaccination booklet in his mouth, proud expression. [Style block]            |
| `bacon-05-celular.png`   | 5 · Como reservar     | Bacon lying on his belly looking at a smartphone between his front paws, the screen showing a generic green chat bubble (no logo, no text), curious happy face. [Style block]   |
| `bacon-06-relogio.png`   | 6 · A diária          | Bacon sitting with his head tilted, looking confused at a big round cream wall clock next to him, one ear up and one ear down. [Style block]                                    |
| `bacon-07-malinha.png`   | 7 · A malinha         | Bacon proudly carrying a small brown travel bag by the handle in his mouth, the bag slightly open with a kibble bag, a blanket corner and a toy bone peeking out. [Style block] |
| `bacon-08-pensando.png`  | 8 · Cancelamento      | Bacon lying down with his chin on his front paws next to a small green calendar, thoughtful eyes looking up, calm and understanding expression. [Style block]                   |
| `bacon-09-banho.png`     | 9 · Banho e tosa      | Bacon freshly bathed, fur fluffy and shiny, sitting with a cream towel over his head, a few soap bubbles around him, sparkles, delighted closed-eye smile. [Style block]        |
| `bacon-10-festa.png`     | 10 · Tudo pronto      | Bacon jumping with joy, all four paws off the ground, ears up, surrounded by a few lime and green confetti pieces and small hearts. [Style block]                               |

## After generating

- Check every pose against the character sheet: same coat color, ears, collar and proportions. Regenerate any that drift.
- Prefer images without a baked-in shadow; the page adds its own.
- The agent converts each PNG to AVIF/WebP at the sizes the page needs (target: under 40 KB each) and lazy-loads every pose below the first screen.
