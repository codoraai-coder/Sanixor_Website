# Sanixor Website (Frontend)

React + Vite + TypeScript marketing site for Sanixor AI, deployed on Cloudflare
Pages. All form submissions are handled by the centralized Sanixor backend
(`https://api.sanixor.space`) through a single reusable API layer.

## 🚀 Quick start

```bash
npm install
cp .env.example .env      # set VITE_API_BASE_URL (defaults to production)
npm run dev
```

## 🔧 Environment variables

Only `VITE_`-prefixed variables are exposed to the browser build.

| Variable            | Required | Default                     | Purpose                          |
| ------------------- | -------- | --------------------------- | -------------------------------- |
| `VITE_API_BASE_URL` | No       | `https://api.sanixor.space` | Base URL of the Sanixor backend. |

- **Local development:** `VITE_API_BASE_URL=http://localhost:8080`
- **Production:** leave unset (uses the default) or set to your backend URL.

> Legacy variables `VITE_N8N_WEBHOOK_URL` and `VITE_SCRIPT_URL` were **removed**
> in Phase 5 — the app now talks only to the backend.

## 📜 Scripts

| Script          | Purpose                       |
| --------------- | ----------------------------- |
| `npm run dev`   | Vite dev server (hot reload)  |
| `npm run build` | Production build → `dist/`    |
| `npm run preview` | Preview the production build |
| `npm run lint`  | ESLint                        |

## 🔌 Backend integration

Every form posts to the backend via a single reusable layer — **no component
calls `fetch` directly.** See [docs/API_INTEGRATION.md](docs/API_INTEGRATION.md)
for the full guide.

**Deployment:** [docs/CLOUDFLARE_PAGES_SETUP.md](docs/CLOUDFLARE_PAGES_SETUP.md)
(auto-deploy on push to `main`). CI type-checks + builds every push via
`.github/workflows/ci.yml`. `public/_redirects` handles SPA routing + the
`www → apex` redirect; `public/_headers` sets security/cache headers.

| Form | Component | Endpoint |
| ---- | --------- | -------- |
| Contact | `routes/contact.tsx` | `POST /api/contact` |
| Book a Demo | `components/sanixor/BookDemoModal.tsx` | `POST /api/demo` |
| Hiring | `routes/hiring.tsx` | `POST /api/hiring` |
| AgentVerse | `components/sanixor/AgentVerseRegistrationModal.tsx` | `POST /api/agentverse` |

**Architecture (in `src/`):**

```
config/api.config.ts     Base URL (env) + timeout + endpoint map
services/api.ts          Reusable fetch wrapper (timeout, JSON, errors, auth-ready)
services/form.service.ts Typed submit functions per form
utils/apiError.ts        Typed ApiError (+ field errors)
utils/responseHandler.ts Parses the standard backend envelope
hooks/useFormSubmission  Loading state, toasts, dedupe guard, field errors
components/ui/spinner.tsx Reusable accessible loading spinner
```

Toast notifications use `sonner` (mounted once in `main.tsx`).

## ✨ UX behaviour

- Submit buttons disable + show a spinner while a request is in flight.
- Success → toast + form reset / modal close.
- Failure → friendly toast, **entered values are kept**, backend validation
  errors are available for inline highlighting.
- Duplicate submissions are ignored while a request is pending.
- Network/timeout failures surface a clear message — nothing fails silently.
