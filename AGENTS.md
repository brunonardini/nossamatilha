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

Contact data shown on the site must be confirmed by the owner as public. Phone numbers are never written in the repository: they come from environment variables read through `lib/contact.ts` (see [`docs/environment.md`](docs/environment.md)); `.env` is gitignored and `.env.example` holds fictitious values only. Other confirmed public channels (the Instagram URL) live in `lib/contact.ts`, not in `docs/`.

**Approved exceptions** (owner's consent):

- **Silvia Matrumoto**, CEO and public face of the brand: her name and photos (`tmp/marca/fotos/silvia`) may be used on the site and in docs. **Bacon**, her dog, is the site's narrator.
- **Customers quoted in the home reviews** (`lib/home/reviews.ts`): they authorized the owner to publish their name, Google profile photo and review text. Excerpts may only be cut or have typos fixed, never reworded. Adding another review needs the same authorization first.
- **Photos of staff and customers' dogs** in `tmp/marca/fotos`: the business holds signed image-use authorizations, so they may be published. Still strip metadata and never publish documents (vaccination cards, forms) visible in a photo.

**Material in `tmp/`** may contain personal data (e.g. people in photos, a vaccination card with the owner's name). Before publishing any of it:

- Photos of identifiable people are covered by the authorizations above; any new photo source needs the owner's confirmation first.
- Strip EXIF/GPS metadata from every image added to the repository.
- Do not publish documents, cards or screenshots with personal data; crop or blur them.

**Site features that touch personal data:**

- Collect only the minimum data needed (data minimization) and state the purpose next to the form. This applies to the planned online registration form (ficha cadastral), which today is exchanged on WhatsApp: it holds personal and pet health data and needs a privacy review before being built.
- Do not store or log form data in the repository, build output or client storage; send it straight to the agreed channel.
- Do not load analytics, marketing pixels or other non-essential cookies/trackers before the visitor consents; essential cookies only by default.
- Keep the privacy policy page ("Política de Privacidade", `app/politica-de-privacidade/page.tsx`) linked in the footer, and update it, with its `UPDATED_AT` date, whenever data collection, cookies, hosting or third-party services change. It states only what the site and the business actually do; legal wording needs the owner's review.
- Prefer embeds and third-party scripts that do not track visitors (or load them only after consent).

When unsure whether some data is personal or confidential, treat it as such and ask the owner.

## Environment

- Node.js version is pinned in `.nvmrc`. Always run `nvm use` before any `node`, `npm` or `npx` command. In a non-interactive shell, load nvm first: `source ~/.nvm/nvm.sh && nvm use`.
- Install dependencies with `npm ci` (not `npm install`) unless you are intentionally changing dependencies.
- Pin exact versions when adding dependencies.
- The dev and production servers always use port 4630 (`npm run dev` / `npm run start`). Do not change it or start Next on another port; if 4630 is busy, report it instead of switching.

## AI tooling

Two local tools are wired into Claude Code through the project hooks in `.claude/settings.json`. The hooks are no-ops when a tool is not installed; if `rtk` or `graphify` is missing, install it before working.

### RTK (command output compression)

[RTK](https://github.com/rtk-ai/rtk) rewrites Bash commands (e.g. `git status` → `rtk git status`) to condense their output. Install from the official repository only — `cargo install rtk` from crates.io is an unrelated project:

```bash
curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/refs/heads/master/install.sh | sh
```

Verify with `rtk gain` (must print the savings dashboard). Project-specific output filters go in `.rtk/filters.toml`.

<!-- rtk-instructions v2 -->

Command output here is condensed to save tokens, keeping every signal and dropping costly noise. Treat it as the complete result: run commands normally, and batch related commands into one call to avoid extra turns. Truncated results state their recovery path in their own output. Re-run a command as `rtk bypass <cmd>` only when its result is unusable: empty when output was clearly expected, contradicting its exit code, or garbled.

<!-- /rtk-instructions -->

### graphify (codebase knowledge graph)

[graphify](https://pypi.org/project/graphifyy/) keeps a knowledge graph of the repository in `graphify-out/`. The graph is **local only**: `graphify-out/` is gitignored and must never be committed. The skill is vendored in `.claude/skills/graphify/`. Install the CLI with `uv tool install graphifyy` (or `pipx install graphifyy`).

Rules:

- Before your first grep, search or source-file read for a codebase question, run `graphify query "<question>"`. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for a focused concept. Read raw files only for lines the graph or an earlier read already located. Put this rule in every subagent prompt that explores code.
- Read `graphify-out/GRAPH_REPORT.md` only for broad architecture review or when query/path/explain are not enough.
- Always work with an up-to-date graph. It is refreshed automatically (AST only, no LLM cost) on session start, at the end of every turn (`Stop` hook) and after commits, checkouts, merges and rebases (git hooks). After modifying code mid-task, run `graphify update .` yourself before querying again.
- If `graphify-out/graph.json` is missing, run `graphify update .` to build it.
- The automatic updates cover code only. After significant changes to `docs/` or other non-code files, run `/graphify . --update` to re-extract them semantically.
- On a fresh clone, install the git hooks once with `graphify hook install`, then delete the `.gitattributes` file it creates (the graph is not committed, so the merge driver is not needed).
- `tmp/` is gitignored and therefore excluded from the graph. Do not force it in: it contains personal data (see [Privacy and LGPD](#privacy-and-lgpd)).

### GSAP skills

The official [GSAP skills](https://github.com/greensock/gsap-skills) (MIT) are vendored in `.claude/skills/gsap-*` (core, react, scrolltrigger, timeline, plugins, performance, utils; source commit in `.claude/skills/gsap-core/SOURCE`). Load `gsap-react` plus the relevant topic skill before writing or reviewing animation code. Where a skill conflicts with this file (e.g. installing without exact versions, Vue/Svelte notes), this file wins.

### Design and quality skills

Installed from audited commits (each has a `SOURCE` file). `impeccable` and `web-design-guidelines` live in `~/.claude/skills/`; the others are vendored in `.claude/skills/`.

- `impeccable`: design direction, critique and polish. User scope, because its minified scripts cannot pass this repo's lint. Skill only: never enable its plugin or hooks (`/impeccable hooks on`), and keep telemetry, update check and hooks off in `.impeccable/config.json`.
- `web-design-guidelines`: UI and UX review. User scope, because it declares no license and this repo is public.
- `emil-design-eng`, `review-animations`, `improve-animations`: UI polish and motion review. Implement their advice with GSAP or CSS; never add Motion.
- `vercel-react-best-practices`: React and Next.js performance.
- `accessibility`, `best-practices`, `core-web-vitals`, `performance`, `seo`, `web-quality-audit`: web quality.

Rules:

- This file, `DESIGN.md`, `docs/brand.md` and `docs/business.md` win over any skill: tokens, fonts, tones, copy and facts are not up for redesign without the owner's approval.
- Do not install or update a skill or MCP server without auditing the diff and pinning a commit or exact version. Never use `@latest`.
- Do not send personal data, `tmp/` content or unpublished pages to a third-party service through these tools.

### MCP servers

- `next-devtools` (`.mcp.json`): runtime errors, routes and logs from the dev server. Pinned, with telemetry off.
- `chrome-devtools` (local Claude Code scope, because it holds a machine-specific browser path): Lighthouse, traces and mobile emulation. Keep `--isolated --no-usage-statistics --no-performance-crux`.

## Before finishing a task

Run all checks and make sure they pass — they mirror the CI pipeline:

```bash
npm run lint
npm run typecheck
npm run format:check
npm run test:coverage
npm run build
```

Use `npm run format:write` to fix formatting issues.

A task is not done while any check fails or reports warnings. Fix the root cause; never weaken a check to make it pass.

## Conventions

- Next.js App Router lives in `app/`. Import alias `@/*` maps to the repo root.
- Generated files are not committed: `.next/`, `next-env.d.ts` (recreated by `next dev`, `next build` and `next typegen`).

## Design system

- The design system has two faces that must always match: [`DESIGN.md`](DESIGN.md) at the repo root (source of truth for agents and skills, in the DESIGN.md format read by `impeccable`) and the web version at `/design-system` (`app/design-system/page.tsx`, the brand's design system for people, not indexed). Tokens are implemented in `app/globals.css`. Read `DESIGN.md` before building UI.
- **Whenever you change the design system** (a token, tone, font role, radius, shadow, motion token, component variant or usage rule), update `DESIGN.md`, `app/globals.css` and `/design-system` in the same change. A change that touches only one of them is incomplete.
- Use only design tokens: no hex values, arbitrary colors (`bg-[#...]`), arbitrary font sizes or ad-hoc shadows in components. Missing a token? Add it to `app/globals.css`, `DESIGN.md` and `/design-system` in the same change.
- Every section sets `tone-light` or `tone-dark`; components use semantic utilities (`bg-surface`, `text-fg`, `text-heading`, `text-accent`…) so they work in both tones.
- Grandstander (`font-display`) only for short text at 24px+; body text never below 16px; respect the contrast table.
- Motion: animate `transform`/`opacity` only and keep the page fully usable with `prefers-reduced-motion`.
- Animation library is GSAP (`gsap`, `@gsap/react`); do not add another one (Motion, Lenis, Lottie…) without the owner's approval. Rules: animate only in small `'use client'` components (pages stay server components); use `useGSAP` with a `scope` ref, never raw `useEffect`; import GSAP, plugins and `useGSAP` only from `lib/gsap.ts` (registers them once; exports `MOTION_OK`); wrap every animation in `gsap.matchMedia()` with a `(prefers-reduced-motion: no-preference)` condition; content must be visible and final without JavaScript (hidden states are set by GSAP; for above-the-fold entrances, add `motion-pending` to the animated wrapper and show it with `gsap.set` once the timeline exists). `GuidePhoto`/`BaconSays` inside a GSAP-animated block need `reveal={false}` (CSS animations override GSAP's inline transforms). Keep simple hover/focus transitions in CSS.
- Reuse `components/ui/` primitives before creating new ones; new primitives go there with TSDoc.

## Unit tests

- Vitest + Testing Library (jsdom). Config in `vitest.config.mts`, setup in `vitest.setup.ts`. Tests sit next to the code as `*.test.ts(x)`.
- Test behavior and logic, never styles, class names, markup snapshots or animations. Every test must fail if a rule or interaction breaks.
- Business logic (prices, dates, policies, parsing, formatting, stores) lives in `lib/` as pure functions, never inside components. Components only call `lib/` and render the result.
- Coverage is enforced only on `lib/**/*.ts`: 90% lines, branches, functions and statements. Exclude a `lib/` file from coverage only when it holds no logic (static data, asset maps, GSAP registration), listed with a reason in `vitest.config.mts`. Never lower thresholds.
- Components have no coverage target: test interactive ones (simulators, forms) through what the visitor does and sees (roles, labels, text). Do not test static or server components, or GSAP motion.
- Test data must be fictitious (see [Privacy and LGPD](#privacy-and-lgpd)); stub env vars with `vi.stubEnv`.

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
- Do not add files to `.prettierignore` to skip formatting, except generated files and AI files.
- AI files (`AGENTS.md`, `CLAUDE.md`, `DESIGN.md`, `.claude/`, `.rtk/`) are read by machines and are intentionally not formatted by Prettier, to save tokens. Keep them compact: no alignment padding in tables, no decorative whitespace.

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

CircleCI config is in `.circleci/config.yml`. A `setup` job installs dependencies and shares the workspace with the `lint`, `format-check`, `type-check`, `unit-test` and `build` jobs. `unit-test` stores JUnit results and the coverage report as artifacts. The Docker image tag must match `.nvmrc` — update both together (the `setup` job fails if they differ).

## Documentation

- Extra documentation goes in `docs/`. Keep it current when the facts it describes change.
- When a rule for agents changes, update this file (and the issue/PR templates); when setup or scripts change, update `README.md`.

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Routine debugging is not feedback. Verify changes before retaining them as feedback candidates. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Retain qualifying friction even if it is later fixed or worked around; record the final outcome during the reporting pass.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `npx --no-install next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->
