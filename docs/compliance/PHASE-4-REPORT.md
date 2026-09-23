# Phase 4 Report — Security, Infrastructure and Operations

**Date:** 2026-09-23
**Status:** `PHASE_4_COMPLETE_WITH_BLOCKERS`

---

## 1. Third-party requests eliminated

The headline result: **browsing sanixor.space now contacts no other company at all.**

| Was | Now |
|---|---|
| Google Fonts on every page load | **Self-hosted** via `@fontsource` — bundled, content-hashed, cached immutable |
| OpenStreetMap iframe on `/contact` | **Removed** in Phase 2 |
| Razorpay checkout | Still third-party, but loads **only** when someone chooses to pay |

This matters beyond privacy. It removed the one technology the consent system had to describe as *un-gateable* — Google Fonts loaded from `index.html` before any script ran, so it could be disclosed but never controlled. `UNGATEABLE_TECHNOLOGY_IDS` is now empty, and the Cookie Policy's claim is true without caveat.

It is also faster: no cross-origin round trip on the critical path.

## 2. Security headers

**Site** (`public/_headers`, verified shipping to `dist/`):

CSP (report-only) · Permissions-Policy denying every capability except `payment=(self)` · HSTS 1 year with subdomains and preload · `nosniff` · `X-Frame-Options: DENY` · `Referrer-Policy` · COOP · CORP.

**API** (`src/app.ts`): CSP `default-src 'none'` with framing, base-uri, form-action and object-src all denied. An API that returns only JSON should need nothing, and now the policy says so.

### Two honest notes

**CSP is report-only on purpose.** Enforcing a policy nobody has observed is how a payment flow breaks silently in production. Deploy, watch for one full cycle including a real payment, then rename the header.

**`style-src` includes `'unsafe-inline'`.** Several components (Footer, AgentVerse2, BookDemoModal) ship CSS in inline `<style>` elements. This is a genuine weakening, stated in the file rather than buried. Removing it means moving that CSS into the bundle.

## 3. Vulnerability disclosure

`/.well-known/security.txt` published (RFC 9116) — contacts, expiry, policy link, preferred languages, and an explicit statement that **no paid bug-bounty programme exists**, rather than implying one.

## 4. Supply chain

`npm run security:scan` produces three artefacts and classifies advisories by whether they can actually reach production.

### Remediation performed

| | Before | After |
|---|---:|---:|
| Critical | 1 | **0** |
| High | 17 | 5 |
| **Reaching production** | — | **0** |

`npm audit fix` on the frontend cleared everything, verified against typecheck, lint, build and the compliance suite — no regressions.

The remaining 5 high advisories are **all in `wrangler`** and its transitive tree (miniflare, sharp, undici, brace-expansion) — deploy tooling that never forms part of the Worker bundle or the browser bundle. Backend production dependencies are `hono`, `qrcode-generator`, `resend`, `zod`, all clean.

`npm audit fix` on the backend fails with a peer-dependency conflict, so a wrangler upgrade needs testing against the deploy path rather than being applied blind. Recorded as scheduled work, not forced.

> An undifferentiated "5 high" would have been close to useless here. A high advisory in the deploy CLI and one in a runtime dependency are entirely different risks, so the report separates them.

### Secret scan

Scans both repos for 10 credential patterns plus tracked `.env`/`.dev.vars`/service-account files.

**One match, reviewed and suppressed:** a PEM header string literal inside `pemToPkcs8()` — the parser that strips those markers before decoding a key. No key material. The suppression is narrow (file **and** pattern must match), records who decided and why, and the report **lists suppressed matches explicitly** so it is visible rather than silent.

## 5. Operations documentation

`security-controls.md` · `backup-and-recovery.md` · `incident-response-reference.md` · `google-sheets-hardening.md` · `master-control-matrix.md` · `evidence-index.md`.

---

## 6. Gate 3 status

| Criterion | Status |
|---|---|
| Security headers implemented | **Pass** |
| CSP implemented | **Pass** — report-only by design |
| Permissions-Policy | **Pass** |
| `security.txt` published | **Pass** |
| SBOM generated | **Pass** |
| Dependency scanning | **Pass** — 0 reaching production |
| Secret scanning | **Pass** — 0 unreviewed findings |
| Incident response documented | **Pass** — untested |
| Third-party requests minimised | **Pass** — none remain |
| **WAF rate limiting** | **FAIL** — not implemented |
| **Backup restoration tested** | **FAIL** — never performed |
| **Access review completed** | **FAIL** — needs Workspace admin |
| **Email security reviewed** | **FAIL** — needs DNS/Resend check |
| **Header scan evidence** | **BLOCKED** — needs deploy |

**Gate 3 does not pass.** Four items need account access or an operational action, one (WAF) needs a Cloudflare dashboard rule. All are documented with exact steps.

## 7. What Phase 4 did not do, and does not claim

- No WAF rule — suggested limits in `security-controls.md` §3, including the **critical** exclusion of the webhook path (rate-limiting it causes Razorpay retry storms and can leave a paid registration unfinalised).
- No penetration test, no intrusion detection, no alerting.
- No ISO 27001, SOC 2 or any certification — and none claimed.
- No backup restoration test. **A backup that has never been restored is a hypothesis, not a backup**, and `backup-and-recovery.md` says exactly that.
- Email authentication unverified. Having SPF/DKIM/DMARC records is not the same as them being correct; a DMARC record at `p=none` blocks nothing.
