Prepare this finalized design for code handoff to an external development team.

IMPORTANT:
Do NOT redesign, restyle, simplify, or regenerate the UI.
Do NOT change typography, spacing, colors, responsive behavior, layout, or content hierarchy.

I need a COMPLETE CODE EXPORT of the current approved design, preserving the current visual implementation as closely as possible.

Please organize the exported project with clear, semantic file names instead of generic names such as Component1.tsx, Frame23.tsx, or Page1.tsx.

Use the following preferred structure where applicable:

src/
  pages/
    HomePage.tsx
    PlacesPage.tsx
    ForcesPage.tsx
    LibraryPage.tsx
    AboutPage.tsx

    articles/
      PaperFeatureArticle.tsx
      CinematicFeatureArticle.tsx
      FieldNoteArticle.tsx
      LibraryItemDetail.tsx

  components/
    layout/
      SiteHeader.tsx
      SiteFooter.tsx
      PaperSheet.tsx
      MobileNavigation.tsx

    home/
      EditorialStatement.tsx
      PhotoCover.tsx
      TypographicCover.tsx
      SplitCover.tsx
      FeaturedStory.tsx
      ExploreByForce.tsx
      PlacesSection.tsx
      LibrarySection.tsx
      FieldNotesSection.tsx
      NewsletterSection.tsx

    editorial/
      EditorialMarginalia.tsx
      StoryMetadata.tsx
      PullQuote.tsx
      SourceQuote.tsx
      EditorialImage.tsx
      WideImage.tsx
      FullImage.tsx
      ImagePair.tsx
      Gallery.tsx
      Aside.tsx
      SourceNote.tsx
      SectionHeading.tsx

    places/
      PlaceFeature.tsx
      PlaceCard.tsx

    forces/
      ForceList.tsx
      ForceItem.tsx

    library/
      LibraryRow.tsx
      LibraryFeature.tsx
      LibraryMetadata.tsx

    field-notes/
      FieldNoteList.tsx
      FieldNoteRow.tsx

  styles/
    globals.css
    typography.css
    editorial.css
    responsive.css

  data/
    demoContent.ts

  assets/
    images/
    icons/

public/
  images/
  icons/

Also include, if used by the generated project:

package.json
tsconfig.json
vite.config.ts / next.config.ts / equivalent build configuration
postcss.config.*
tailwind.config.*
README.md

ASSET EXPORT RULES:

1. Export every image asset actually used by the design.

2. Preserve meaningful filenames.

Bad:
image1.png
frame-22.jpg
asset239.png

Good:
home-factory-feature.jpg
place-shenyang-placeholder.jpg
place-brooklyn.jpg
place-mumbai.jpg
library-tree-grows-in-brooklyn-cover.jpg

3. Do not rename an unverified placeholder image as if it were a verified documentary photograph.

If provenance is unknown, use names such as:

placeholder-factory-feature.jpg
placeholder-shenyang-place.jpg
editorial-demo-brooklyn.jpg

4. Export icons separately rather than embedding them as unexplained base64 strings where possible.

5. Preserve SVG files as SVG where possible.

6. Do not unnecessarily convert high-quality source images into low-resolution screenshots.

7. Keep mobile and desktop assets shared where the design uses the same source image.

Do not create duplicate assets unless the design genuinely requires separate files.

CODE RULES:

1. Keep desktop and mobile layouts responsive rather than creating completely unrelated duplicate applications.

2. Preserve the existing approved breakpoints and responsive behavior.

3. Preserve current typography exactly as closely as possible.

4. Clearly identify all fonts used.

If fonts come from Google Fonts or another public source, document the font family and weights in README.md.

5. Preserve design tokens for:

- paper background
- text colors
- accent color
- borders
- typography scale
- spacing
- content widths
- image widths
- breakpoints

Prefer CSS variables where practical.

6. Do not hardcode demo content deeply inside layout components if it can easily be separated into demoContent.ts.

7. Do not introduce backend, CMS, database, authentication, API, or business logic.

This export is a VISUAL REFERENCE IMPLEMENTATION only.

HANDOFF DOCUMENTATION:

Create README.md containing:

1. How to install dependencies
2. How to run the exported design locally
3. Framework used
4. Fonts used
5. Important breakpoints
6. Main design tokens
7. List of page files
8. List of major reusable components
9. Asset directory explanation
10. Any dependencies required to reproduce the design

Also create:

DESIGN_MANIFEST.md

with a simple mapping like:

Homepage Photo Cover
→ src/pages/HomePage.tsx
→ src/components/home/PhotoCover.tsx

Homepage Typographic Cover
→ src/components/home/TypographicCover.tsx

Homepage Split Cover
→ src/components/home/SplitCover.tsx

Paper Feature Article
→ src/pages/articles/PaperFeatureArticle.tsx

Cinematic Feature Article
→ src/pages/articles/CinematicFeatureArticle.tsx

Places
→ src/pages/PlacesPage.tsx

Forces
→ src/pages/ForcesPage.tsx

Library
→ src/pages/LibraryPage.tsx

Library Item Detail
→ src/pages/articles/LibraryItemDetail.tsx

Field Notes
→ src/pages/articles/FieldNoteArticle.tsx

About
→ src/pages/AboutPage.tsx

FINAL OUTPUT:

Prepare the complete project for export/download as one folder or archive.

Do not only show code snippets in chat.

I need:
- all TS/TSX files
- all CSS/style files
- all image assets
- all icons
- configuration files
- package.json
- README.md
- DESIGN_MANIFEST.md

Preserve the current approved design exactly.

Do not make further visual design decisions.