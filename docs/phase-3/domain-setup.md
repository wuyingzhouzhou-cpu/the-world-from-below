# Domain setup

Do not choose between `blog.asherlog.me` and `below.asherlog.me` in code. The app reads one origin: `NEXT_PUBLIC_SITE_URL`.

## After a Vercel project exists

1. Vercel → Project → Settings → Domains → Add the hostname you chose.
2. Vercel will show the DNS record to create at the `asherlog.me` DNS host. Typical patterns:
   - **CNAME** for a subdomain (`blog` or `below`) → the `cname.vercel-dns.com` (or current) target Vercel displays
   - **A** only if Vercel asks for an apex record
3. Do not guess the DNS target before the Vercel project exists. Use the value Vercel prints.
4. Set `NEXT_PUBLIC_SITE_URL=https://<that-host>` (no trailing slash).
5. Redeploy Production so `NEXT_PUBLIC_*` is inlined into the build.
6. Verify:
   - `https://<host>/` loads
   - HTML `<link rel="canonical">` uses `https://<host>/…`
   - `/sitemap.xml` URLs use the same host
   - `/rss.xml` `<link>` uses the same host
   - `/robots.txt` `Sitemap:` uses the same host

Local development keeps `http://localhost:3000`. That must not appear in a production build’s canonicals.
