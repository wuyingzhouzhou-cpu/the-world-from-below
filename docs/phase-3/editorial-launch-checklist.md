# Editorial launch checklist

Do not treat seeded CMS documents as published reporting. Demo labels must stay visible until real copy and rights replace them.

## Publication shell

- [ ] `siteSettings` title, question, tagline proofread
- [ ] `homepageCover` chosen (`photo` / `typographic` / `split`)
- [ ] About singleton written (`lede` + sections). Current dataset has **no About document** — the public `/about` page shows a CMS-empty note.
- [ ] Newsletter name/description remain an announcement until a provider exists

## People

- [ ] Replace author `[Author Name]` (`author.unassigned`) with a real byline, or leave stories without a public author
- [ ] Do not publish bracket placeholders as bylines

## First real stories

- [ ] First Feature: real reported copy, sources, rights
- [ ] First Essay
- [ ] First Field Note
- [ ] `editorialStatus` → Ready only when an editor has signed off
- [ ] `publishedAt` is a real publication datetime (do not fabricate)
- [ ] SEO: `metaTitle`, `metaDescription`, `canonicalUrl` if it differs from the site URL
- [ ] `socialImage` only if rights allow social reuse

## Places / Forces / Library

- [ ] Places: identity copy, no invented captions
- [ ] Forces: question + description
- [ ] Library: real works, creator names, rights-safe covers
- [ ] Relationships (place ↔ story ↔ library) are true, not fixtures

## Images and sources

- [ ] Every public image: credit or source, or marked placeholder and **replaced before launch**
- [ ] `rights: unknown` images must not ship
- [ ] Photo attribution matches the file
- [ ] Source quotes have text, attribution, and source

## Demo content that must not launch as reporting

| Document | Why it blocks launch |
| --- | --- |
| `story.when-the-factory-closed` | Editorial demo Feature; Unsplash placeholder images; demo source quote; `editorialStatus: in-review` |
| `story.editorial-demo-essay` | Explicitly “not a published piece”; `editorialStatus: draft` |
| `author.unassigned` | `[Author Name]` placeholder |
| `library.factory-girls` | Seeded as a CMS relation fixture (`whyICame` says so) |
| Feature hero Unsplash URL | Provenance `placeholder`; not a verified historical photograph |

Final copy proofread is an editor action. This repo does not invent replacement reporting.
