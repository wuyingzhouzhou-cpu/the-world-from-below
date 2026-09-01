# The World From Below — Project Rules

## Design Source of Truth

The approved visual design is stored in:

`_design-reference/figma-make-export/`

If the folder is named `design-reference/figma-make-export/`, treat it identically.

This directory is **read-only design reference**. It may be inspected for typography, spacing, responsive behavior, component composition, design tokens, image proportions, page structure, and editorial layout intent.

Do not:

- move its source files into the production application
- import components directly from it
- make the production app depend on its `package.json`
- run its architecture as part of the production app
- modify it to solve production problems

Leave it untouched until Phase 2, when it becomes the visual source of truth for implementing the production frontend on top of Sanity.

## Production Architecture

Sanity is the editorial CMS.

Next.js is the public frontend.

Sanity Portable Text is the article content system.

## Editorial Principle

Editors choose semantic meaning, not CSS.

Example:

Good:
- Body Image
- Wide Image
- Full Image

Bad:
- width: 920px
- margin-left: 34px

## Visual Principle

Controlled variety.

The publication supports multiple editorial moods while maintaining one coherent visual system.

## Documentary Integrity

Never fabricate:
- quotations
- photographers
- image locations
- dates
- historical events
- documentary captions
- famous-person bylines

Unverified content must be explicitly marked as placeholder or unverified.

## Current Development Phase

Phase 0 + Phase 1 only:

- Sanity foundation
- content schemas
- editorial CMS experience
- Portable Text blocks
- image rules
- basic preview

Do not implement the final Figma frontend yet.