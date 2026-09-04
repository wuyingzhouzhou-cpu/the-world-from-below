# Sanity Studio access

Recommendation for first launch: **keep Studio local**. Do not deploy a public Studio until the Sanity project is claimed and only editors can log in.

## Why not deploy now

- The project may still be unclaimed (uploads limited; claim link in the original Sanity welcome flow).
- `npx sanity deploy` publishes a `*.sanity.studio` host. That is fine after you own the project and Sanity login is required; it is unnecessary for launch of the public Next.js site.
- Presentation preview origin is `SANITY_STUDIO_PREVIEW_ORIGIN` or `http://localhost:3000`.

## Local access

```sh
cd sanity && npm run dev
```

Open `http://localhost:3333`. If the project is unclaimed, use the tokenized Studio URL printed by the CLI.

## Later (optional)

1. Claim the project in Sanity Manage.
2. Confirm CORS for the publication origin.
3. `cd sanity && npx sanity deploy` (requires `sanity login` as the owner).
4. Set `SANITY_STUDIO_PREVIEW_ORIGIN` to `https://<publication-host>` if you want Presentation against production.
5. Production preview URLs require `PREVIEW_SECRET` on the Next.js app (`/preview/<slug>?secret=...`).
