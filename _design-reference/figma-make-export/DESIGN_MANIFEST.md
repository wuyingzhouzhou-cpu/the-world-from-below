# Design Manifest — The World From Below

Maps each approved design state to its implementation files.

---

## Homepage — Photo Cover
The default homepage. Large editorial hero image, lead story identity below.

→ `src/pages/HomePage.tsx`
→ `src/components/home/EditorialStatement.tsx` (editorial question bar)
→ `src/components/home/PhotoCover.tsx` (hero image + story info)
→ `src/components/home/HomeSections.tsx` (shared lower sections)

---

## Homepage — Typographic Cover
Image-free homepage. Large Roman headline, right annotation column.

→ `src/pages/HomeTypographic.tsx`
→ `src/components/home/EditorialStatement.tsx`
→ `src/components/home/TypographicCover.tsx`
→ `src/components/home/HomeSections.tsx`

---

## Homepage — Split Cover
Asymmetric: image narrow left (5/12), headline wide right (7/12).

→ `src/pages/HomeSplit.tsx`
→ `src/components/home/EditorialStatement.tsx`
→ `src/components/home/SplitCover.tsx`
→ `src/components/home/HomeSections.tsx`

---

## Homepage — Shared Lower Sections

All three homepage covers share these sections below the cover:

| Section | Component |
|---|---|
| Featured story triptych | `src/components/home/FeaturedStory.tsx` |
| Explore by Force | `src/components/home/ExploreByForce.tsx` |
| Places mosaic | `src/components/home/PlacesSection.tsx` |
| Library (asymmetric) | `src/components/home/LibrarySection.tsx` |
| Field Notes list | `src/components/home/FieldNotesSection.tsx` |
| Newsletter signup | `src/components/home/NewsletterSection.tsx` |

Composed in: `src/components/home/HomeSections.tsx`

---

## Paper Feature Article
Documentary feature. Paper mood (default). Reading width 720px. Marginalia columns.

→ `src/pages/articles/PaperFeatureArticle.tsx`

---

## Essay Article
Personal essay. Quiet mood (green accent). Narrower, simpler layout.

→ `src/pages/articles/EssayArticle.tsx`

---

## Library Item Detail
Archive mood. Sticky sidebar with book metadata. Six editorial sections.

→ `src/pages/articles/LibraryItemDetail.tsx`

Sections: WHY I CAME TO THIS BOOK · WHOSE WORLD DOES IT OPEN? · THE LARGER FORCES · WHAT CHOICES REMAIN? · ONE QUESTION I KEPT THINKING ABOUT · READ / WATCH NEXT

---

## Field Notes
Minimal mood. Numbered editorial observations. Content leads on mobile; meta sidebar on desktop.

→ `src/pages/articles/FieldNoteArticle.tsx`

---

## Places Index
Default mood. Asymmetric photo mosaic: one large hero row + 2×2 grid.

→ `src/pages/PlacesPage.tsx`

---

## Forces Index
Default mood. Interactive two-panel on desktop (list + detail). Accordion on mobile.

→ `src/pages/ForcesPage.tsx`

---

## Library Index
Archive mood. Filterable list by medium (Book / Film / Photography). Editorial row layout.

→ `src/pages/LibraryPage.tsx`

---

## About
Quiet mood. Five editorial sections. Publication-first — no influencer aesthetic.

→ `src/pages/AboutPage.tsx`

---

## Prototype Navigation Overlay

A small fixed overlay (bottom-right) lets prototype reviewers switch between the three homepage cover variants. This is NOT part of the editorial UI — it is a demo tool only, to be removed before production.

→ Implemented in `src/App.tsx` (the `overlayOpen` state and overlay JSX)

---

## Navigation

State-based routing. The `View` union type in `src/App.tsx` controls page rendering. No URL router.

→ `src/App.tsx`
→ `src/components/layout/SiteHeader.tsx`

---

## Global Styles

| File | Purpose |
|---|---|
| `src/index.css` | Entry point — imports below in order |
| `src/styles/typography.css` | Google Fonts @import (must be first) |
| `src/styles/globals.css` | Design tokens, moods, base body styles |
| `src/styles/editorial.css` | Keyframe animations, reduced-motion |

---

## Design Tokens Reference

See `src/styles/globals.css` for full token definitions.

Key tokens: `--pub-bg` `--pub-fg` `--pub-fg-muted` `--pub-fg-faint` `--pub-border` `--pub-accent` `--pub-card`
Typography: `--font-display` `--font-ui` `--font-reading`

---

## Locked Design Decisions

The following decisions are approved and must not change:

- Warm paper off-white background (`--pub-bg: #F3EFE6`)
- Red-brown restrained accent (`--pub-accent: #8C3527`)
- Serif-led editorial typography (Fraunces headlines, Lora body)
- Thin hairline rules (`--pub-border: #D0C9BE`)
- Editorial marginalia system (folio numbers, rotated labels)
- Controlled asymmetry in homepage Library and Forces sections
- Documentary photography with explicit placeholder labeling
- Dark mode exists (`data-mood="cinematic"`) but is NOT the default
- Publication-first identity — no influencer aesthetic
