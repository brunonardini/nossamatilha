<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent guide

All development in this repository is done by AI agents. This file is the single source of rules and workflow for agents. `README.md` is for humans (project presentation, setup and scripts) — read it for the list of npm scripts, but do not copy its content here or copy rules from here into it.

## Project context

- Institutional website for **Nossa Matilha**, a dog boarding and daycare business in Resende/RJ, Brazil. Production URL: https://www.nossamatilharesende.com.br/
- Business facts (services, policies, prices, contact) live in [`docs/business.md`](docs/business.md). Brand assets and palette live in [`docs/brand.md`](docs/brand.md). Use these as the source of truth for site content; never invent prices, policies or contact data. Contact details are intentionally not in `docs/` — see [Privacy and LGPD](#privacy-and-lgpd).
- `tmp/` is gitignored and holds raw source material provided by the owner (brand PDF, logos, photos). Read from it, but copy anything the site needs into the tracked tree (e.g. `public/`) in an optimized form.
- The current CSS (`app/globals.css`) and fonts in `app/layout.tsx` are placeholders until the design system is defined.

## Language

- **English**: code, identifiers, code comments, TSDoc, commit messages, and all documentation (`README.md`, `AGENTS.md`, `docs/`).
- **Brazilian Portuguese (pt-BR)**: all user-facing site content (copy, metadata, alt text, aria labels, error messages shown to visitors).
- Document exported functions, components, hooks and types with TSDoc.

## Privacy and LGPD

The project must comply with the LGPD (Lei Geral de Proteção de Dados, Lei nº 13.709/2018). This repository is **public**: anything committed is published.

**Never commit personal or confidential data** — in code, docs, commit messages, fixtures or assets:

- Names, phone numbers, emails, documents (CPF, RG, professional registration numbers), addresses or any other data that identifies a person (owner, staff, customers, partners).
- Customer and pet records (registration forms, vaccination cards, medical prescriptions, payment receipts).
- Business information not meant to be public (internal processes, finances, contracts).
- Secrets and credentials. Use environment variables (`.env*` is gitignored; document keys in `.env.example` without values).

Contact data shown on the site (WhatsApp, email, etc.) must be confirmed by the owner as public before it is added, and lives only where the site renders it — not duplicated in `docs/`.

**Material in `tmp/`** may contain personal data (e.g. people in photos, a vaccination card with the owner's name). Before publishing any of it:

- Use photos of identifiable people only with the owner's confirmation that consent was given; prefer photos of the dogs and the space.
- Strip EXIF/GPS metadata from every image added to the repository.
- Do not publish documents, cards or screenshots with personal data; crop or blur them.

**Site features that touch personal data:**

- Collect only the minimum data needed (data minimization) and state the purpose next to the form.
- Do not store or log form data in the repository, build output or client storage; send it straight to the agreed channel.
- Do not load analytics, marketing pixels or other non-essential cookies/trackers before the visitor consents; essential cookies only by default.
- Keep a privacy policy page ("Política de Privacidade", pt-BR) linked in the footer, and update it whenever data collection, cookies or third-party services change.
- Prefer embeds and third-party scripts that do not track visitors (or load them only after consent).

When unsure whether some data is personal or confidential, treat it as such and ask the owner.

## Environment

- Node.js version is pinned in `.nvmrc`. Always run `nvm use` before any `node`, `npm` or `npx` command. In a non-interactive shell, load nvm first: `source ~/.nvm/nvm.sh && nvm use`.
- Install dependencies with `npm ci` (not `npm install`) unless you are intentionally changing dependencies.
- Pin exact versions when adding dependencies.

## Before finishing a task

Run all checks and make sure they pass — they mirror the CI pipeline:

```bash
npm run lint
npm run typecheck
npm run format:check
npm run build
```

Use `npm run format:write` to fix formatting issues.

A task is not done while any check fails or reports warnings. Fix the root cause; never weaken a check to make it pass.

## Conventions

- Next.js App Router lives in `app/`. Import alias `@/*` maps to the repo root.
- Generated files are not committed: `.next/`, `next-env.d.ts` (recreated by `next dev`, `next build` and `next typegen`).

## TypeScript

- `strict` mode is mandatory. Do not disable or relax compiler options in `tsconfig.json`.
- All code is TypeScript (`.ts`/`.tsx`); no new `.js` source files.
- No `any` — use precise types, generics or `unknown` with narrowing.
- No `@ts-ignore` or `@ts-nocheck`. `@ts-expect-error` only with a comment explaining why, and only when there is no typed alternative.
- No non-null assertions (`!`) or type assertions (`as`) to silence errors; narrow with type guards instead. `as const` is fine.
- Type exported APIs explicitly (component props, function parameters and return types of exported functions).
- Use `import type` for type-only imports.
- Use Next.js generated types (`PageProps`, `LayoutProps`, `Metadata`, …) instead of hand-written equivalents; run `npm run typecheck` to regenerate them.

## ESLint

- Configuration is `eslint.config.mjs` (Next.js core-web-vitals + TypeScript rules). `npm run lint` must finish with zero errors **and zero warnings** (`--max-warnings=0`).
- No `eslint-disable` comments, unless for a single line with the rule name and a comment explaining why. Never disable rules globally or for whole files.
- Do not change the ESLint config to silence a rule; change the code. Adding stricter rules is welcome.

## Prettier

- Prettier (`.prettierrc`) and `.editorconfig` own all formatting. Do not hand-format against them or add per-file overrides.
- Run `npm run format:write` after editing and before committing; `npm run format:check` must pass.
- Do not add files to `.prettierignore` to skip formatting, except generated files.

## Commits

Every commit must follow [Conventional Commits v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/):

```
<type>[optional scope][!]: <description>

[optional body]

[optional footer(s)]
```

- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- Description in English, imperative mood, lowercase, no trailing period (e.g. `feat(home): add boarding pricing section`).
- Breaking changes: `!` after the type/scope and a `BREAKING CHANGE:` footer.
- One logical change per commit. PR titles follow the same format.

## Issue and PR templates

Templates live in `.github/ISSUE_TEMPLATE/` (bug report and feature request) and `.github/pull_request_template.md`. Keep them up to date as the project evolves: whenever a rule in this file, an npm script, a CI check or a privacy requirement changes, update the templates' checklists in the same change.

## CI

CircleCI config is in `.circleci/config.yml`. A `setup` job installs dependencies and shares the workspace with the `lint`, `format-check`, `type-check` and `build` jobs. The Docker image tag must match `.nvmrc` — update both together (the `setup` job fails if they differ).

## Documentation

- Extra documentation goes in `docs/`. Keep it current when the facts it describes change.
- When a rule for agents changes, update this file (and the issue/PR templates); when setup or scripts change, update `README.md`.
