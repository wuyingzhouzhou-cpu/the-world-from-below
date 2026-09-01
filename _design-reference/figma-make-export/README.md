# The World From Below — Design Reference Implementation

An independent documentary editorial magazine. Design reference prototype for code handoff.

---

## Quick Start

```bash
pnpm install
pnpm dev
```

The development server runs on `$PORT` (default 8443). Hot reload is active — changes are reflected immediately.

---

## Framework & Tooling

| Tool | Version |
|---|---|
| React | 19 |
| Vite | 8 |
| TypeScript | 5.7 |
| Tailwind CSS | v4 (via `@tailwindcss/vite` plugin) |
| Package manager | pnpm |

---

## Fonts

All fonts are loaded from Google Fonts. No local font files are required.

| Font | Role | Weights |
|---|---|---|
| **Fraunces** | Display / headlines | Variable: ital, opsz 9–144, wght 100–900 |
| **Inter** | UI / metadata / labels | 300, 400, 500, 600 |
| **Lora** | Body reading text | 400, 500, 600 (roman + italic) |

Google Fonts CSS2 imports are in `src/styles/typography.css`, which is loaded before Tailwind in `src/index.css`.

CSS custom properties:
```css
--font-display:  'Fraunces', serif;
--font-ui:       'Inter', sans-serif;
--font-reading:  'Lora', serif;
```

---

## Design Tokens

All visual decisions are expressed as CSS custom properties in `src/styles/globals.css`.

```css
/* Surfaces */
--pub-bg:       #F3EFE6   /* warm paper off-white */
--pub-card:     #EAE5DB   /* card surface */

/* Text */
--pub-fg:       #1A1510   /* near-black warm ink */
--pub-fg-muted: #6B6058   /* secondary text */
--pub-fg-faint: #9A9088   /* metadata / marginalia */

/* Structure */
--pub-border:   #D0C9BE   /* hairline rule */
--pub-accent:   #8C3527   /* restrained red-brown */
```

### Editorial Moods

Five mood variants override a subset of tokens via `data-mood` on `<body>`:

| Mood | Usage |
|---|---|
| *(default)* | Homepage, feature stories |
| `cinematic` | Dark mode — available but not the default |
| `quiet` | Essays (green accent) |
| `archive` | Library items, book reviews (sepia tone) |
| `minimal` | Field notes (near-white, dark accent) |

Set via: `document.body.setAttribute('data-mood', 'archive')`

---

## Breakpoints

Uses Tailwind CSS v4 defaults:

| Name | Width |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

Mobile designs are intentional at 390px. The `md:` prefix is the primary responsive breakpoint throughout.

---

## Content Widths

| Purpose | Max Width |
|---|---|
| Full-page sections | 1400px |
| Feature article with sidebar | 1200px |
| Reading body (essay / field note) | 720px |

---

## Pages

| Route (view state) | File |
|---|---|
| `home` | `src/pages/HomePage.tsx` |
| `home-typographic` | `src/pages/HomeTypographic.tsx` |
| `home-split` | `src/pages/HomeSplit.tsx` |
| `feature` | `src/pages/articles/PaperFeatureArticle.tsx` |
| `essay` | `src/pages/articles/EssayArticle.tsx` |
| `book` | `src/pages/articles/LibraryItemDetail.tsx` |
| `field-note` | `src/pages/articles/FieldNoteArticle.tsx` |
| `places` | `src/pages/PlacesPage.tsx` |
| `forces` | `src/pages/ForcesPage.tsx` |
| `library` | `src/pages/LibraryPage.tsx` |
| `about` | `src/pages/AboutPage.tsx` |

Navigation is state-based (no URL router). The `View` union type in `src/App.tsx` controls which page renders.

---

## Major Reusable Components

### Layout
| Component | File |
|---|---|
| Site header / navigation | `src/components/layout/SiteHeader.tsx` |
| Site footer | `src/components/layout/SiteFooter.tsx` |

### Editorial primitives
| Component | File |
|---|---|
| Editorial marginalia / folio text | `src/components/editorial/EditorialMarginalia.tsx` |

### Homepage sections
| Component | File |
|---|---|
| Editorial statement bar | `src/components/home/EditorialStatement.tsx` |
| Photo cover | `src/components/home/PhotoCover.tsx` |
| Typographic cover | `src/components/home/TypographicCover.tsx` |
| Split cover | `src/components/home/SplitCover.tsx` |
| Featured story triptych | `src/components/home/FeaturedStory.tsx` |
| Explore by Force section | `src/components/home/ExploreByForce.tsx` |
| Places mosaic section | `src/components/home/PlacesSection.tsx` |
| Library section | `src/components/home/LibrarySection.tsx` |
| Field Notes section | `src/components/home/FieldNotesSection.tsx` |
| Newsletter signup | `src/components/home/NewsletterSection.tsx` |

---

## Demo Content

All editorial demo data is separated from layout components in `src/data/demoContent.ts`.

Exports:
- `places` — Place data for PlacesPage and Places section
- `works` — Library items for LibraryPage and Library section
- `forces` — Force definitions for ForcesPage
- `allNotes` — Full field note content for FieldNoteArticle
- `homeForces` — Homepage force list with editorial weight
- `homeFieldNotes` — Short field note list for homepage section

Photo helpers are in `src/config.ts`:
- `photo(id, w, h)` — Unsplash image URL helper
- `PHOTOS` — Named photo ID map
- `BRAND` — Publication name, tagline, newsletter copy

---

## Asset Directory

Images are served from Unsplash via URL (no local image files). The `photo()` helper in `src/config.ts` generates the URLs.

For production, replace Unsplash URLs with verified licensed assets and update `PHOTOS` in `src/config.ts`.

---

## Documentary Integrity

This prototype follows strict placeholder labeling rules:

- All image `alt` text uses `"PLACEHOLDER IMAGE — [description] editorial demo"` when provenance is unknown
- Bylines use `[Author Name]` when no author is assigned
- Captions use `"EXAMPLE CAPTION · editorial demo only"`
- Works, authors, and titles referenced in the Library are verifiable published works
- No fictional authors, photographers, locations, or dates are invented

---

## Build

```bash
pnpm build       # production build → dist/
pnpm preview     # preview production build locally
pnpm typecheck   # TypeScript check (npx tsc --noEmit)
```
