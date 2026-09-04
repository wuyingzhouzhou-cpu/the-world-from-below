# Vercel deployment

The public site is the Next.js app in `web/`. Do not set the Vercel root to the repository root: root `npm run build` also builds Sanity Studio.

Vercel CLI is not authenticated in this environment. No Vercel project was created.

## Recommended project settings

| Setting | Value |
| --- | --- |
| Framework Preset | Next.js |
| Root Directory | `web` |
| Install Command | `npm install` (Vercel default in that directory) |
| Build Command | `npm run build` |
| Output | Next.js default (`.next`) |
| Node | 20.x or current Vercel default |

## Environment variables (Vercel project → Settings → Environment Variables)

Set for Production (and Preview if you want canonicals on preview deployments):

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `e0cbf8ib` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2026-06-23` |
| `NEXT_PUBLIC_SITE_URL` | `https://<chosen-host>` after DNS. Leave unset only if you accept the `*.vercel.app` origin. |
| `SANITY_API_READ_TOKEN` | Only if the dataset is still private. Prefer making the dataset publicly readable after claiming the project, then omit this. |
| `PREVIEW_SECRET` | Long random string. Production `/preview/*` returns 404 until this is set and passed as `?secret=`. |

Never set a `NEXT_PUBLIC_` prefix on tokens.

## Git

This clone has **no git remote**. Connect the GitHub repository to Vercel after you create/push it. Do not create a random Vercel project from this agent session.

## After first deploy

1. Confirm `https://<vercel-app>/robots.txt` allows `/` and disallows `/preview`.
2. Confirm `/sitemap.xml` and `/rss.xml` use `NEXT_PUBLIC_SITE_URL` (rebuild after changing it).
3. Add the custom domain (see `docs/phase-3/domain-setup.md`).
4. In [Sanity CORS](https://www.sanity.io/manage), allow the production origin if Studio or browsers talk to the API from that host.
