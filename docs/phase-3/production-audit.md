# Phase 3 production audit

Date: 2026-09-04  
HEAD at audit: `5657e1e` (`fix: complete phase 2 editorial relationships`)  
Working tree: clean. Frozen: Phase 1 CMS, Phase 2 frontend. No hostname chosen.

## Repository shape

Monorepo without a git remote.

| Path | Role |
| --- | --- |
| `sanity/` | Studio + schemas + seed. `projectId` `e0cbf8ib`, dataset `production`. |
| `web/` | Next.js 16.3.4 public site. This is the Vercel app. |
| `_design-reference/` | Read-only Figma export. Not production. |
| Root `package.json` | Orchestrates `test` / `typecheck` / `lint` / `build` across both packages. Root `build` also builds Studio — **do not use as the Vercel build command**. |

Lockfiles: `web/package-lock.json`, `sanity/package-lock.json`. No root lockfile.

## Sanity

- API version in the web client: `2026-06-23` (hardcoded).
- Studio Presentation preview origin: hardcoded `http://localhost:3000`, locations → `/preview/{slug}`.
- Client: `useCdn: true`, `perspective: 'published'`, optional `SANITY_API_READ_TOKEN`.
- Token is present locally because the project may still be unclaimed; published perspective does not return Sanity drafts.
- `editorialStatus` is internal workflow (`draft` / `in-review` / `ready`) and is not a public field. Public visibility is Sanity published documents.
- Singletons: `siteSettings`, `aboutPage`. About has no seeded document.
- Image pipeline: `@sanity/image-url` + `srcsetFor`. Homepage cover already has 390–1440 srcset. Story hero still uses a single 1600w URL.
- CORS for the eventual publication host is not configured from this repo (Sanity manage UI).

## Environment

Root `.env.example` documents `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, optional `SANITY_API_READ_TOKEN`.

Missing from example: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SANITY_API_VERSION`, `PREVIEW_SECRET`, `SANITY_STUDIO_PREVIEW_ORIGIN`.

`web/.gitignore` ignores `.env*` (would ignore a `web/.env.example`). Root ignores `.env`, `.env.local`, `*.local`. No remote; Vercel CLI is not installed.

## Frontend production gaps

Present: route metadata helper (`pageMetadata`), `not-found.tsx`, next/font (Fraunces / Inter / Lora), Sanity CDN image URLs, `perspective: 'published'`.

Absent: `NEXT_PUBLIC_SITE_URL`, canonical helper, `app/sitemap.ts`, `app/robots.ts`, RSS, metadataBase, Twitter cards, JSON-LD, search `noindex`, preview production gate, security headers, favicon/app icons (only leftover create-next-app SVGs in `web/public/`).

Preview `/preview/[slug]` and `/preview/home/[cover]` render published content (not draft perspective). They must not be indexed. Production should not leave them open without a secret.

Search `/search?q=…` currently has indexable titles like `Search: factory`.

## Domain

Umbrella: `asherlog.me`. Publication host not locked (`blog.asherlog.me` vs `below.asherlog.me`). Do not hardcode either. One origin: `NEXT_PUBLIC_SITE_URL`. Local fallback: `http://localhost:3000`. Do not invent a production hostname.

## Content launch blockers (do not treat as published reporting)

Seeded Feature `when-the-factory-closed` (editorialStatus `in-review`), demo essay, placeholder Unsplash hero, `[Author Name]` author, Factory Girls used as a CMS relation fixture, no About document, newsletter copy states subscription is not open.

## Recommended Vercel

Root Directory: `web`. Framework: Next.js. Build: `npm run build`. Do not deploy Studio as the public site for first launch (keep Studio local until the project is claimed and access is controlled).
