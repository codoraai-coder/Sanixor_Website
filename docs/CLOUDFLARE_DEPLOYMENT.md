# Cloudflare Workers Deployment (frontend)

The Sanixor website is a static Vite + React SPA. It deploys to **Cloudflare
Workers static assets** — no server Worker script; Cloudflare serves the built
`dist/` from the edge, with unmatched routes falling back to `index.html` so
React Router handles them client-side.

Config: [`wrangler.jsonc`](../wrangler.jsonc) (`assets.directory = ./dist`,
`not_found_handling = single-page-application`).

## One-time

```bash
npm install
npx wrangler login          # interactive; authorises your Cloudflare account
```

## Deploy manually

```bash
npm run deploy              # = npm run build && wrangler deploy
```

First deploy prints the live URL: `https://sanixor-website.<subdomain>.workers.dev`.
Verify it loads and that a client route (e.g. `/careers`) works on refresh.

## Deploy via GitHub (automatic)

`.github/workflows/deploy-cloudflare.yml` builds and deploys on every push to
`master`. Add two repository secrets first (Settings → Secrets and variables →
Actions):

- `CLOUDFLARE_API_TOKEN` — dashboard → My Profile → API Tokens → **Edit Cloudflare Workers** template
- `CLOUDFLARE_ACCOUNT_ID` — dashboard → Workers & Pages → Account ID

## Local preview of the built site

```bash
npm run cf:preview         # build + wrangler dev (serves dist/ like production)
```

## API base URL

The app reads `VITE_API_BASE_URL` at build time (`.env.production` →
`https://api.sanixor.space`, also set in both CI workflows). Point it at the
**deployed backend** URL:

- If the backend Worker is on `*.workers.dev`, set this to that URL until
  `api.sanixor.space` is wired up (custom domains need the zone on Cloudflare).
- Update it in `.env.production`, `.github/workflows/ci.yml`,
  `.github/workflows/deploy-cloudflare.yml`, and the Cloudflare dashboard.

## Custom domain (sanixor.space)

Attaching `sanixor.space` / `www.sanixor.space` to this Worker requires the zone
on Cloudflare (nameserver delegation — not a registrar transfer). Per the
project's DNS constraint the GoDaddy nameservers stay, so the Cloudflare
deployment lives at `*.workers.dev` unless/until that decision changes. The
`_redirects` www→apex rule and `_headers` only take effect once a custom domain
is attached.

