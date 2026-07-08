# Cloudflare Pages Setup (Frontend)

Deploy `sanixor-website` to Cloudflare Pages with auto-deploy on every push to
`main`.
## Create the Pages project

1. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
2. Select `codoraai-coder/Sanixor_Website`.
3. Build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** (repo root)
4. **Environment variables** → add:
   - `VITE_API_BASE_URL = https://api.sanixor.space`
     (also committed in `.env.production`; the dashboard value wins.)
5. **Save and Deploy.** Every push to `main` now rebuilds automatically; PRs get
   preview deployments.

## SPA routing & headers (already in the repo)

- `public/_redirects`
  - `www → apex` 301 redirect (canonical host)
  - `/* /index.html 200` SPA fallback for React Router
- `public/_headers`
  - Security headers (X-Frame-Options, X-Content-Type-Options, HSTS, …)
  - `Cache-Control: immutable` for `/assets/*`; no-cache for `index.html`

Cloudflare Pages copies everything in `public/` to the site root, so these take
effect automatically.

## Custom domains

1. Pages project → **Custom domains → Set up a custom domain.**
2. Add `sanixor.space` **and** `www.sanixor.space`. Cloudflare wires the DNS
   records (both proxied) since the zone is already on Cloudflare.
3. `www` → apex canonicalization is handled by `public/_redirects`.
4. See the backend repo's `docs/DNS_CONFIGURATION.md` for the full DNS picture.

## HTTPS

Automatic — Cloudflare issues and renews the certificate. Enable **Always Use
HTTPS** (SSL/TLS → Edge Certificates) for http→https.

## Verify

```bash
curl -I https://sanixor.space           # 200, served by cloudflare
curl -sI https://www.sanixor.space | grep -i location   # → https://sanixor.space/
```

Then load the site and submit a form — it should POST to
`https://api.sanixor.space` and show a success toast.

## Notes

- `wrangler.jsonc` in the repo is a leftover Workers template and is **not** used
  by Pages Git builds; it can be ignored or deleted.
