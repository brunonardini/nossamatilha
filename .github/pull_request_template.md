<!--
PR title must follow Conventional Commits v1.0.0: <type>[optional scope][!]: <description>
e.g. "feat(home): add boarding pricing section"
This repository is public: do not include personal data in the PR (see "Privacy and LGPD" in AGENTS.md).
-->

## Summary

<!-- What changed and why. -->

Closes #

## Type of change

- [ ] `feat` — new feature or content
- [ ] `fix` — bug fix
- [ ] `docs` — documentation only
- [ ] `style` / `refactor` / `perf` — no behavior change for visitors
- [ ] `test` / `build` / `ci` / `chore`
- [ ] Breaking change (`!`)

## Screenshots

<!-- Required for visual changes: mobile and desktop. -->

## Checklist

- [ ] Commits and PR title follow [Conventional Commits v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)
- [ ] `npm run lint` passes with no warnings
- [ ] `npm run typecheck` passes
- [ ] `npm run format:check` passes
- [ ] `npm run test:coverage` passes (logic in `lib/` covered; interactive behavior tested)
- [ ] `npm run build` passes
- [ ] Code, comments, TSDoc and docs in English; site content in pt-BR
- [ ] Exported functions, components, hooks and types have TSDoc
- [ ] No `any`, `@ts-ignore`, `@ts-expect-error` or `eslint-disable` without a justified comment
- [ ] UI uses design tokens only (no raw hex/arbitrary values), works in both section tones and with reduced motion
- [ ] Design system changes update `DESIGN.md`, `app/globals.css` and the `/design-system` page together
- [ ] New environment variables documented in `docs/environment.md` with fictitious values in `.env.example`
- [ ] No personal or confidential data committed; images stripped of EXIF/GPS metadata
- [ ] Privacy policy / consent updated if data collection, cookies or third-party services changed
- [ ] `AGENTS.md`, `README.md`, `docs/` and these templates updated if rules, scripts or checks changed
