# The World From Below

Independent documentary editorial magazine. Phase 0 + Phase 1 is the Sanity editorial CMS. The approved Figma frontend is not implemented yet.

The Figma Make export in `_design-reference/figma-make-export/` is read-only design reference. Do not import it.

## Claim the Sanity project

Unclaimed projects and their content are deleted after 72 hours. Claim it here:

https://www.sanity.io/manage/claim/9Vcl0eCCFXhYMG_yZxOKvoKCRyo8Kk92ArTRc1xCmUY

Deadline: 4 September 2026, 12:00 UTC. Claiming is free and does not interrupt local work. Anyone with that link becomes the owner — do not share it.

Until claimed:

- Image **uploads** are unavailable. Use an external image URL on each image.
- Open Studio from the URL printed by `npx sanity dev` (it includes a one-time token hash).
- The website runs on port 3000.

## Run locally

Studio (port 3333):

```sh
cd sanity && npm run dev
```

Website / CMS preview (port 3000):

```sh
cd web && npm run dev
```

Then:

- Studio: `http://localhost:3333`
- Preview index: `http://localhost:3000`
- Feature preview: `http://localhost:3000/preview/when-the-factory-closed`

## Checks

From the repository root:

```sh
npm test
npm run typecheck
npm run lint
npm run build
```

`npm test` seeds `sanity/seed.json` and runs `sanity documents validate`.

## Environment

See `.env.example`. Real values live in `sanity/.env.local` and `web/.env.local` (gitignored). `SANITY_API_READ_TOKEN` is server-only and must never be prefixed with `NEXT_PUBLIC_`.
