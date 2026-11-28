# Photo selection — boarding guide

Photos chosen for each chapter of the [script](boarding-guide-script.md). Sources are in `tmp/marca/fotos/` (gitignored); nothing here is published until it is processed. Image-use authorizations are on file (see "Privacy and LGPD" in `AGENTS.md`).

Status: **approved and processed** (except P03, see below). Masters are in `assets/photos/boarding-guide/`; import them through `lib/boarding-guide/photos.ts`, which also holds the pt-BR alt texts.

| Id  | Chapter          | Use                                                                                            | Source (`tmp/marca/fotos/…`)                            | Size (px)   | Notes                                                                     |
| --- | ---------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ----------- | ------------------------------------------------------------------------- |
| C22 | 0 · Bem-vindo    | Hero photo next to the illustrated Bacon                                                       | `creche/IMG_1179.HEIC`                                  | 3024 × 4032 | Dogs of very different sizes looking at the camera                        |
| P03 | 1 · Espaço       | "+ de 1.200 m²" aerial view (the brochure image still says 1.100; the correct figure is 1.200) | Brochure page 4 (embedded image)                        | 1503 × 916  | **Confirm the source**: looks like a map/satellite screenshot (licensing) |
| C10 | 1 · Espaço       | Daycare: outdoor corridor and lawn                                                             | `creche/6AB679C2-598B-4D1E-A198-F39F18604138.png`       | 1086 × 1448 |                                                                           |
| C09 | 1 · Espaço       | Daycare: covered play area                                                                     | `creche/4A2F44EF-90B9-4580-BDE4-42A661D1BDDF.png`       | 1086 × 1448 |                                                                           |
| H01 | 1 · Espaço       | Kennel: corridor of the rest rooms where boarded dogs sleep                                    | `hospedagem/0053A554-28D3-42C1-8FB7-68640F55FC3A.png`   | 1086 × 1448 |                                                                           |
| C58 | 1 · Socialização | "Energy, not size"                                                                             | `creche/IMG_8875.HEIC`                                  | 3024 × 4032 | Large white dog with small dogs                                           |
| S10 | 2 · Equipe       | Silvia with Bacon                                                                              | `silvia/IMG_6051.JPG`                                   | 2062 × 3664 | Warmest photo of the two                                                  |
| T01 | 2 · Equipe       | Team photo                                                                                     | `time/75d364e1-a6d7-4d04-b6d1-0ff02e58c769.jpg`         | 1200 × 1600 | Only team photo available                                                 |
| C25 | 3 · Manhã        | Morning in the yard                                                                            | `creche/IMG_1420.JPG`                                   | 1980 × 3520 |                                                                           |
| H02 | 3 · Manhã        | Individual feeding, staff with a dog                                                           | `hospedagem/1B827F89-…_DEAA88B0-….jpg`                  | 739 × 1066  | Low resolution: small card only                                           |
| C29 | 3 · Tarde        | Two dogs playing on the lawn                                                                   | `creche/IMG_1611.JPG`                                   | 1980 × 3520 | Chosen by the owner                                                       |
| C53 | 3 · Tarde        | Dogs resting in the covered area                                                               | `creche/IMG_5723.JPG`                                   | 1980 × 3520 |                                                                           |
| H05 | 3 · Noite        | Two dogs resting on a bed in a kennel room                                                     | `hospedagem/IMG_8983.JPG`                               | 1980 × 3520 | Shown together with H07                                                   |
| H07 | 3 · Noite        | Two dogs on their own beds in a kennel room                                                    | `hospedagem/DEE05FA0-A4D1-4415-B87D-A0C1A2ED89BE.jpg`   | 2160 × 3840 | Chosen by the owner                                                       |
| H03 | 7 · Malinha      | Food preparation room ("sua ração fica aqui")                                                  | `hospedagem/71110D00-A6B8-4EF4-8CC2-E4C277BC9E1C.png`   | 1086 × 1448 | Optional                                                                  |
| B03 | 9 · Banho e tosa | Bath in progress                                                                               | `banho e tosa/IMG_5513.HEIC`                            | 3024 × 4032 |                                                                           |
| B01 | 9 · Banho e tosa | Grooming room                                                                                  | `banho e tosa/02D3D5F7-749F-406F-AEB3-FA09BAFC2C82.png` | 1086 × 1448 |                                                                           |
| S14 | 10 · Tudo pronto | Silvia and Bacon saying goodbye                                                                | `silvia/IMG_6067.JPG`                                   | 2062 × 3664 |                                                                           |
| C31 | 10 · Tudo pronto | Happy dog with a ball                                                                          | `creche/IMG_2299.JPG`                                   | 1980 × 3520 |                                                                           |

## Placement context (internal, not page copy)

- **Daycare spaces** (C09, C10, and the lawn and covered areas in `creche/`): used during the day by daycare dogs **and** boarded dogs. Fit chapter 1 (the space) and the morning and afternoon of chapter 3.
- **Kennel** (H01 and the rooms in `hospedagem/`): where boarded dogs sleep. Daycare dogs never use it, because daycare is daytime only. Fit chapter 1 (rest rooms) and the night of chapter 3, never a daycare context.

Chapters 4, 6 and 8 (dark checkpoints) and 5 (booking steps) use only the Bacon illustrations and SVG, so the rules stay the focus.

## Avoided

- Photos with a vaccination card or other documents (brochure page 6): personal data.
- Photos with a phone-camera watermark (`creche` C03, C05, C06) or an AI-edit mark (`banho e tosa` B05–B08).
- The wall of customers' photos (`creche` C46, C47).
- Costume photos (Halloween, bee): fun, but seasonal; better for social media.
- Promotional art in `artes/`: has baked-in text and phone numbers.
- Illustrated portraits of Silvia (`silvia` S01, S15): the page uses real photos for people.

## Processing

Done with Pillow (script kept outside the repository):

- HEIC converted, EXIF orientation applied, cropped to **4:5** (focus chosen per photo), resized to at most **1080 × 1350**, saved as **WebP q76**.
- All metadata removed (EXIF, GPS, XMP, ICC): pixels are copied into a fresh image before saving.
- Masters total about 2.9 MB; visitors never download them. `next/image` serves resized AVIF/WebP per device, with width, height and a blur placeholder from the static import (no layout shift).
- Files are named by use (e.g. `day-night-own-beds.webp`), not by source id.
- **P03 (aerial view) is not processed** until the owner confirms its source.

| Id  | File                                                    |
| --- | ------------------------------------------------------- |
| C22 | `hero-dogs-of-all-sizes.webp`                           |
| C10 | `space-daycare-lawn.webp`                               |
| C09 | `space-daycare-covered.webp`                            |
| H01 | `space-kennel-corridor.webp`                            |
| C58 | `socialization-sizes.webp`                              |
| S10 | `team-silvia-and-bacon.webp`                            |
| T01 | `team-group.webp`                                       |
| C25 | `day-morning-yard.webp`                                 |
| H02 | `day-morning-feeding.webp` (739 × 923, small card only) |
| C29 | `day-afternoon-play.webp`                               |
| C53 | `day-afternoon-rest.webp`                               |
| H05 | `day-night-shared-bed.webp`                             |
| H07 | `day-night-own-beds.webp`                               |
| H03 | `bag-food-room.webp`                                    |
| B03 | `grooming-bath.webp`                                    |
| B01 | `grooming-room.webp`                                    |
| S14 | `goodbye-silvia-and-bacon.webp`                         |
| C31 | `goodbye-happy-dog.webp`                                |

`next/image` serves WebP (the Next.js default, which its docs still recommend over AVIF for most cases). Every photo below the first screen is lazy-loaded; only the hero loads eagerly with high priority.
