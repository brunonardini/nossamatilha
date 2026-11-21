# Illustration guide output

The Bacon illustrations follow [the illustration guide](illustration-guide.md). This record tracks approvals, generation, image processing, and files for the boarding guide.

## Confirmed workflow

- Use the current conversation for the character sheet and all eleven poses. Wait for the owner's approval of the sheet, then attach the approved sheet as the visual reference for each pose.
- Export each chapter pose as a transparent PNG at `tmp/marca/ilustracoes/` using the filename in the guide. If the generated PNG is smaller than 2048 px on its longest side, resize it proportionally to 2048 px, preserving its alpha channel. Record the native and delivered dimensions for any resized pose.
- Generate transparent WebP copies in `assets/illustrations/boarding-guide/` for the boarding guide, targeting less than 40 KB each. Verify that the poses match the approved sheet and that transparency survives optimization.
- Apply lazy loading to illustrations below the initial viewport when the boarding-guide page consumes the assets.

## Character sheet

- Generated with the built-in image generation tool using the guide's character sheet prompt and three owner-provided Bacon photographs as references. The prompt specified six full-body views in two rows, four expressions, a blank round silver tag, and a transparent background without a ground shadow.
- Saved the 1199 × 1312 transparent reference as `tmp/marca/ilustracoes/bacon-character-sheet.png`. The 2048 px minimum applies to the chapter poses.
- Checked the alpha channel and reviewed the sheet against the cream brand color. The sheet shows standing and sitting views from the front, side, and three-quarter angle, plus happy, curious, proud, and sleepy expressions.

## Character sheet revision

- The owner confirmed that Bacon is a male Labrador Retriever and requested a new sheet.
- Generated the revision with the built-in image generation tool and the same three photo references. The prompt called for a young adult male yellow Labrador Retriever and refined the structure of the head, muzzle, ears, chest, legs, and tail while preserving Bacon's lean build, caramel coat, white chest patch, and blue collar.
- Saved the 1312 × 1199 transparent revision as `tmp/marca/ilustracoes/bacon-character-sheet-v2.png`. Verified the alpha channel and reviewed all six full-body views and four expressions over the cream brand color.

## Character sheet revision from the portrait

- The owner supplied a close-up portrait and asked for a closer likeness. The built-in image generation tool used the portrait as the primary facial reference, the previous sheet for layout and standing and sitting proportions, and an original Bacon photo for coat and chest markings.
- The prompt emphasized Bacon's open amber-brown eyes, pinkish-brown nose, rounded hanging ears, warm caramel coat, and open smile. It preserved the guide's flat illustration style, royal-blue collar, blank round silver tag, six full-body views, and four expressions.
- Saved the 1312 × 1199 transparent PNG as `tmp/marca/ilustracoes/bacon-character-sheet-v3.png`. Verified the alpha channel and visually checked all ten drawings on a cream preview.

## Chapter poses

The owner approved the third character sheet. Generated one pose per chapter with the built-in image generation tool, using the corresponding [chapter prompt](illustration-guide.md#poses-one-per-chapter), the guide's style block, and the approved sheet as an image reference for each generation. The prompts called for one centered full-body Bacon, true transparency, no cast shadow, and a blank tag. The clock pose was revised to remove a generated question mark and accent marks. The clock face retains only hands and hour ticks.

All eleven generated poses were below 2048 px on their longest side. Sharp resized each pose proportionally using Lanczos3, preserving transparency. The transparent PNG masters are in `tmp/marca/ilustracoes/`. The transparent WebP files are in `assets/illustrations/boarding-guide/` (statically imported through `lib/boarding-guide/illustrations.ts`) at 512 px on the longest side. The export checks confirmed alpha channels, transparent pixels, and the absence of embedded EXIF, IPTC, and XMP metadata. Each WebP is under 40000 bytes.

| File stem            | Native PNG (px) | Master PNG (px) | WebP (px) | WebP (bytes) |
| -------------------- | --------------- | --------------- | --------- | ------------ |
| `bacon-00-ola`       | 1157 × 1360     | 1742 × 2048     | 436 × 512 | 37260        |
| `bacon-01-brincando` | 1536 × 1024     | 2048 × 1365     | 512 × 341 | 35846        |
| `bacon-02-orgulhoso` | 1024 × 1536     | 1365 × 2048     | 341 × 512 | 29902        |
| `bacon-03-comendo`   | 1024 × 1536     | 1365 × 2048     | 341 × 512 | 32404        |
| `bacon-04-vacina`    | 1120 × 1404     | 1634 × 2048     | 409 × 512 | 33876        |
| `bacon-05-celular`   | 1774 × 887      | 2048 × 1024     | 512 × 256 | 27974        |
| `bacon-06-relogio`   | 1376 × 1143     | 2048 × 1701     | 512 × 425 | 34164        |
| `bacon-07-malinha`   | 1536 × 1024     | 2048 × 1365     | 512 × 341 | 32364        |
| `bacon-08-pensando`  | 1774 × 887      | 2048 × 1024     | 512 × 256 | 25138        |
| `bacon-09-banho`     | 1052 × 1495     | 1441 × 2048     | 360 × 512 | 37764        |
| `bacon-10-festa`     | 1536 × 1024     | 2048 × 1365     | 512 × 341 | 31682        |

Reviewed the poses against the approved character sheet for silhouette, coat, ears, collar, tag, and chapter props. The complete contact sheet for review is `tmp/marca/ilustracoes/bacon-poses-preview.png`.

The boarding-guide page is planned. When it is implemented, use the optimized assets and lazy-load the poses below the initial viewport.
