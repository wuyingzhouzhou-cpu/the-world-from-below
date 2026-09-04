# The World From Below

Independent documentary editorial magazine. Phase 1 (Sanity CMS) and Phase 2 (public frontend) are complete. Phase 3 is production readiness.

The Figma Make export in `_design-reference/figma-make-export/` is read-only design reference. Do not import it.

## Local development

Studio (port 3333):

```sh
cd sanity && npm run dev
```

Website (port 3000):

```sh
cd web && npm run dev
```

Copy `.env.example` to `web/.env.local` and `sanity/.env.local`. Use `NEXT_PUBLIC_SITE_URL=http://localhost:3000` locally.

- Studio: `http://localhost:3333`
- Site: `http://localhost:3000`
- Preview (dev only, no secret): `http://localhost:3000/preview/when-the-factory-closed`

## Sanity Studio

Keep Studio local/admin-only for first launch. Do not deploy an unsecured Studio. After the Sanity project is claimed, `cd sanity && npm run deploy` is optional.

Project id `e0cbf8ib`, dataset `production`. Unclaimed projects expire.

Claim (owner only — anyone with the link becomes the owner, do not share it):

https://www.sanity.io/manage/claim/9Vcl0eCCFXhYMG_yZxOKvoKCRyo8Kk92ArTRc1xCmUY

Deadline: 4 September 2026, 12:00 UTC.

## Environment variables

See `.env.example`. Never commit secrets. `SANITY_API_READ_TOKEN` and `PREVIEW_SECRET` are server-only.

## Testing and build

From the repository root:

```sh
npm test
npm run typecheck
npm run lint
npm run build
```

`npm test` seeds `sanity/seed.json` and validates the dataset.

## Production

Deploy **`web/`** as the Vercel Root Directory. See `docs/phase-3/vercel-deployment.md` and `docs/phase-3/domain-setup.md`.

Editorial launch: `docs/phase-3/editorial-launch-checklist.md`. Seeded stories are editorial demos, not production reporting.
