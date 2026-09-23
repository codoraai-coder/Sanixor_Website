# Dependency Audit

**Generated:** 2026-09-23T11:52:45.251Z
**Result:** `HIGH ADVISORIES PRESENT`

| Repository | Total advisories | Breakdown |
|---|---:|---|
| Sanixor_Website | 2 | critical 0 · high 0 · moderate 0 · low 1 |
| Sanixor_Website_backend | 12 | critical 0 · high 5 · moderate 1 · low 0 |

## Production impact

| Repository | Reaching production | Dev/tooling only | Production dependencies |
|---|---:|---:|---|
| Sanixor_Website | **0** | 0 | @cloudflare/vite-plugin, @fontsource-variable/dm-sans, @fontsource-variable/inter, @fontsource-variable/space-grotesk, @fontsource-variable/syne, @fontsource/dm-mono, @hookform/resolvers, @radix-ui/react-accordion, @radix-ui/react-alert-dialog, @radix-ui/react-aspect-ratio, @radix-ui/react-avatar, @radix-ui/react-checkbox, @radix-ui/react-collapsible, @radix-ui/react-context-menu, @radix-ui/react-dialog, @radix-ui/react-dropdown-menu, @radix-ui/react-hover-card, @radix-ui/react-label, @radix-ui/react-menubar, @radix-ui/react-navigation-menu, @radix-ui/react-popover, @radix-ui/react-progress, @radix-ui/react-radio-group, @radix-ui/react-scroll-area, @radix-ui/react-select, @radix-ui/react-separator, @radix-ui/react-slider, @radix-ui/react-slot, @radix-ui/react-switch, @radix-ui/react-tabs, @radix-ui/react-toggle, @radix-ui/react-toggle-group, @radix-ui/react-tooltip, @react-three/drei, @react-three/fiber, @tailwindcss/vite, @tanstack/react-query, @tanstack/react-router, @tanstack/react-start, @tanstack/router-plugin, class-variance-authority, clsx, cmdk, date-fns, embla-carousel-react, framer-motion, input-otp, lenis, lucide-react, react, react-day-picker, react-dom, react-hook-form, react-parallax-tilt, react-resizable-panels, react-router-dom, recharts, sonner, tailwind-merge, tailwindcss, three, tw-animate-css, vaul, vite-tsconfig-paths, zod |
| Sanixor_Website_backend | **0** | 5 | hono, qrcode-generator, resend, zod |

> **No critical or high advisory affects a package that reaches production.** The remaining advisories are in build and deploy tooling, which runs on a developer machine and in CI but is never part of the deployed Worker or the browser bundle. They should still be cleared on a schedule — a compromised build tool can inject into the output — but they are not a live exposure.

### Tooling-only advisories

- `Sanixor_Website_backend` → brace-expansion [high]
- `Sanixor_Website_backend` → miniflare [high]
- `Sanixor_Website_backend` → sharp [high]
- `Sanixor_Website_backend` → undici [high]
- `Sanixor_Website_backend` → wrangler [high]

## How to read this

`npm audit` reports advisories against the **resolved dependency tree**, which
includes transitive packages a build tool pulls in. A high count is common in
a Vite/React project and does not by itself mean the deployed site is
exploitable — many advisories affect dev-only tooling that never ships.

**What matters:**

1. Any **critical** or **high** advisory in a `required` (production)
   dependency. Fix or replace these.
2. Advisories in dev dependencies are lower priority but should still be
   cleared on a schedule, because a compromised build tool can inject into
   the bundle.

Run `npm audit` in each repository for the detail, and `npm audit fix` for
the ones that resolve without a breaking change.

## Cadence

Monthly, and before any release. See `security-controls.md`.
