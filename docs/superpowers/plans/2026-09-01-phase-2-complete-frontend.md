# Phase 2 — Complete public frontend

Date: 2026-09-01

## Goal

Ship the full public editorial frontend for The World From Below, reusing the Phase 2A Sanity → GROQ → view model → Portable Text → design system chain. Do not start Phase 3.

## Constraints

- Frozen core story schema. Additive `siteSettings.homepageCover` only if required for editor-selected cover modes.
- Figma export is read-only visual source of truth.
- Do not fabricate documentary content. Seed demo labels stay labels.
- `[Author Name]` is not a byline — omit it.
- No newsletter backend, no maps, no ratings, no fake issue metadata.

## Approved Phase 2 schema extension: siteSettings.homepageCover

`siteSettings.homepageCover` was added during Phase 2 as the editorial control for `photo` | `typographic` | `split`. Readers cannot switch it. The public homepage reads the stored value. Fallback: hero exists → photo; no hero → typographic. Do not remove this field.

## Architecture

```
SANITY
  → centralized GROQ (web/sanity/queries.ts)
  → typed view models (story, home, place, force, library, search, site)
  → route pages
  → focused components (layout / home / story / editorial / places / forces / library / search)
  → tokens + typography + editorial + site CSS
```

Public routes:

- `/` homepage
- `/stories` `/stories/[slug]`
- `/places` `/places/[slug]`
- `/forces` `/forces/[slug]`
- `/library` `/library/[slug]`
- `/about`
- `/search`
- `/preview/[slug]` CMS preview
- `/preview/home/[cover]` cover-mode preview (not public nav)

## Tasks

- [x] Baseline commit of Phase 1 + 2A
- [x] Paper Feature QA fixes A–F
- [x] Shared header, footer, site/article shells, routing
- [x] Homepage covers + sections from live Sanity data
- [x] Stories index + Feature / Essay / Field Note / cinematic mood
- [x] Places index + detail
- [x] Forces index + detail
- [x] Library index + detail
- [x] About + Search
- [x] Tests, visual QA, screenshots, lint, typecheck, build
- [x] Coherent git commits
