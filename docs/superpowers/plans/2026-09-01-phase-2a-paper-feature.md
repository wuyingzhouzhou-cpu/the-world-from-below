# Phase 2A — Paper Feature vertical slice

Date: 2026-09-01

## Goal

Prove that a Sanity `story` can render as the approved Paper Feature layout:

Sanity Story → GROQ → typed view model → Portable Text renderer → design system → Paper Feature (desktop + mobile).

Primary article: **When the Factory Closed** (`storyType: feature`, `visualMood: documentary`).

Do not build homepage, Places, Forces, Library index, Search, or Phase 2B.

## Inspection (before implementation)

Existing production architecture (`web/`):

- Next.js App Router CMS preview only
- GROQ in `web/sanity/queries.ts` already returns `story` + relations
- No generated Sanity TypeScript types
- `components/ArticleBody.tsx` is a labeled CMS test renderer — replace
- `app/globals.css` is placeholder preview CSS — replace
- Preview route `app/preview/[slug]/page.tsx` stays as the article URL for Studio Presentation

Keep:

- `web/sanity/client.ts`
- GROQ filters (`_type == "story"`, stored `storyType`)
- Preview URL `/preview/[slug]`
- Frozen Sanity schema (do not change)

Replace:

- Preview page markup
- `ArticleBody.tsx`
- Global CSS / typography

Figma references for Paper Feature:

- `_design-reference/figma-make-export/src/pages/articles/PaperFeatureArticle.tsx`
- `_design-reference/figma-make-export/src/components/layout/SiteHeader.tsx`
- `_design-reference/figma-make-export/src/components/editorial/EditorialMarginalia.tsx`
- `_design-reference/figma-make-export/src/styles/globals.css`
- `_design-reference/figma-make-export/src/styles/typography.css`
- `_design-reference/figma-make-export/src/styles/editorial.css`
- `_design-reference/figma-make-export/DESIGN_MANIFEST.md`
- `_design-reference/figma-make-export/README.md`

Approved fonts (from inspection, not Newsreader): Fraunces, Inter, Lora.

## Architecture

```
SANITY DATA
  ↓ GROQ (storyBySlugQuery)
FRONTEND VIEW MODEL (toStoryViewModel)
  ↓
SEMANTIC COMPONENTS (StoryPage, PortableTextRenderer, BodyImage, …)
  ↓
VISUAL SYSTEM (tokens.css, typography.css, editorial.css, PaperSheet)
```

Sanity never stores pixel widths. Image role (`bodyImage` / `wideImage` / `fullImage` / `portraitImage`) is semantic; CSS decides geometry.

## Design reference paths

See inspection list above. Do not import Figma components or modify `_design-reference/`.

## Files to create

- `docs/superpowers/plans/2026-09-01-phase-2a-paper-feature.md` (this file)
- `web/styles/tokens.css`
- `web/styles/typography.css`
- `web/styles/editorial.css`
- `web/sanity/story.ts` — view model + mapper
- `web/sanity/image.ts` — URL builder, presentation, unpublished safety
- `web/components/layout/PaperSheet.tsx`
- `web/components/layout/PublicationHeader.tsx`
- `web/components/story/StoryPage.tsx`
- `web/components/story/StoryHeader.tsx`
- `web/components/story/StoryMarginalia.tsx`
- `web/components/story/StoryBody.tsx`
- `web/components/story/StorySources.tsx`
- `web/components/story/StoryRelations.tsx`
- `web/components/editorial/PortableTextRenderer.tsx`
- `web/components/editorial/BodyImage.tsx` (and Wide / Full / Portrait / ImagePair / Gallery)
- `web/components/editorial/PullQuote.tsx` (and SourceQuote / Epigraph / Aside / Divider / SourceNote / Video)
- `web/tests/story-model.test.ts`
- `web/tests/portable-text.test.ts`
- `web/tests/image.test.ts`

## Files to modify

- `web/app/layout.tsx` — fonts, tokens
- `web/app/globals.css` — import production styles
- `web/app/preview/[slug]/page.tsx` — map + StoryPage
- `web/sanity/queries.ts` — image asset projection only (no schema change)
- `web/next.config.ts` — image remote patterns
- `web/package.json` — `@sanity/image-url`, `test` script
- Root `package.json` — include web tests
- `web/components/ArticleBody.tsx` — remove after renderer exists

Do not modify Sanity document schemas.

## Testing strategy

Node test runner (`node --test --experimental-strip-types`):

- Mapper preserves `storyType` and `visualMood`
- `relatedStories` / `relatedLibraryItems` projected
- Sources map from CMS `citation` / `url` / `note` (do not invent citation fields)
- Portable Text type → component name
- Unknown block does not throw
- `rights: unknown` is withheld in production; preview-safe in development
- Image presentation maps from block `_type`

Visual QA: screenshots at 1440 and 390 vs Figma Paper Feature. No CSS snapshot tests.

## Tasks

- [x] Inspect production app + Figma Paper Feature
- [x] Design tokens + PaperSheet + publication header
- [x] Story view model + failing-then-passing mapper tests
- [x] Portable Text renderer + text blocks
- [x] Semantic image system + Sanity URL builder
- [x] Paper Feature shell (header, body, sources, relations)
- [x] Responsive pass (390 / 768 / 1024 / 1440)
- [x] Visual QA vs Figma
- [x] type-check, lint, tests, production build
- [x] Stop. Do not start Phase 2B.
