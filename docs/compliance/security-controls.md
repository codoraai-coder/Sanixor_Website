# Security Controls

**Prepared:** 2026-09-23 · **Owner:** Rishabh Tripathi, Grievance Officer
**Public summary:** https://sanixor.space/security

The internal record of what is implemented, what is not, and how each control is verified. The public Security Policy is a summary of this; where this file says a control is absent, the public page says so too.

---

## 1. Web security

| Control | State | Where | Verification |
|---|---|---|---|
| TLS everywhere | **Implemented** | Cloudflare | Header scan |
| HSTS (1 year, subdomains, preload) | **Implemented** | `public/_headers`, backend `secureHeaders` | Header scan |
| Content-Security-Policy | **Report-only** | `public/_headers` | Observe violations, then enforce |
| CSP on the API | **Enforced** — `default-src 'none'` | `src/app.ts` | Header scan |
| Permissions-Policy | **Implemented** — all capabilities denied except `payment=(self)` | Both | Header scan |
| `X-Content-Type-Options: nosniff` | **Implemented** | Both | Header scan |
| `X-Frame-Options: DENY` / `frame-ancestors 'none'` | **Implemented** | Both | Header scan |
| `Referrer-Policy: strict-origin-when-cross-origin` | **Implemented** | Both | Header scan |
| CORS allowlist | **Implemented** | `src/config/cors.ts` | Origin test |

### Why the CSP is report-only

Enforcing a policy nobody has observed is how a payment flow breaks silently in production. Deploy in report-only, watch for violations for at least one full cycle including a real payment, then rename the header to `Content-Security-Policy`.

**Known weakening:** `style-src` includes `'unsafe-inline'`, because several components (Footer, AgentVerse2, BookDemoModal) ship their CSS in inline `<style>` elements. This is stated rather than hidden. Removing it means moving that CSS into the bundle.

---

## 2. Application security

| Control | State | Where |
|---|---|---|
| Schema validation on every endpoint | **Implemented** | Zod validators |
| Unknown-field stripping | **Implemented** | Zod default behaviour |
| Request size cap | **Implemented** | `bodyLimit` in `app.ts` |
| Request timeout | **Implemented** | `requestTimeout` |
| JSON content-type enforcement | **Implemented** | `enforceJson` |
| Honeypot spam traps | **Implemented** | Every public form |
| Per-isolate rate limiting | **Implemented** | `middleware/rateLimiter.ts` |
| Network-level (WAF) rate limiting | **NOT IMPLEMENTED** | See §3 |
| Dev routes excluded from production | **Implemented** | `app.ts` — mounted only when `!isProd` |
| Secret + PII log redaction | **Implemented** | `config/logger.ts` |
| Request-ID correlation | **Implemented** | `requestId` middleware |

---

## 3. Rate limiting — the honest position

The application limiter keeps in-memory counters **per Worker isolate**. Cloudflare runs many isolates, so the effective global limit is a multiple of the configured value, and a distributed client bypasses it.

It does what it was built for — stopping one abusive client from burning Sheets and Resend quota. It is **not** a security control, and the public Security Policy says so.

**To close:** add a Cloudflare WAF rate-limiting rule in front of `/api/*`. Suggested starting points, to be tuned against real traffic:

| Path | Suggested limit |
|---|---|
| `/api/contact`, `/api/demo`, `/api/hiring` | 5 / minute / IP |
| `/api/privacy-request`, `/api/grievance`, `/api/refund-request` | 3 / minute / IP |
| `/api/payments/create-order` | 10 / minute / IP |
| `/api/payments/verify` | 20 / minute / IP |
| `/api/payments/webhook` | **Do not rate-limit** |

**The webhook exclusion matters.** Razorpay retries webhooks; rate-limiting them causes retry storms and can mean a paid registration is never finalised. Exclude the webhook path explicitly.

---

## 4. Payment security

| Control | State |
|---|---|
| Card data never reaches our servers | **By design** — Razorpay hosted checkout |
| Payment signature verification (HMAC-SHA256, constant-time) | **Implemented** |
| Server-side order re-confirmation before finalisation | **Implemented** |
| Deterministic registration IDs (replay-safe) | **Implemented** |
| Webhook signature verification | **Implemented** |
| Dedicated webhook secret | **Implemented in Phase 4** — see below |
| Payment event audit trail | **Implemented in Phase 4** — `Payment Events` tab |

### Defect found and fixed in Phase 4

`verifyWebhookSignature` used `RAZORPAY_KEY_SECRET`. Razorpay signs webhooks with the **webhook secret** configured against the webhook in the dashboard, which is a different value. Where the two differ, every legitimate webhook fails verification — and the failure is silent, because a rejected webhook looks exactly like one that never arrived.

Now prefers `RAZORPAY_WEBHOOK_SECRET`, falling back to the key secret with a logged warning so existing deployments keep working.

**Action required:** set the secret.
```
wrangler secret put RAZORPAY_WEBHOOK_SECRET --name sanixorbackend
```

---

## 5. Supply chain

| Control | State | Command |
|---|---|---|
| SBOM generation | **Implemented** | `npm run security:scan` → `evidence/sbom.json` |
| Dependency audit | **Implemented**, split by production impact | same |
| Secret scan | **Implemented**, with a reviewed allowlist | same |
| Tracked-env-file check | **Implemented** | same |
| Automated CI scanning | **NOT IMPLEMENTED** | Run manually for now |

**Current position (2026-09-23):** 0 critical, 0 high advisories reaching production. The 5 remaining high advisories are all in `wrangler` and its transitive tree — deploy tooling that never forms part of the Worker bundle or the browser bundle. `npm audit fix` on the backend fails with a peer-dependency conflict, so a wrangler upgrade needs testing against the deploy path rather than being applied blind.

**Production dependencies (backend):** `hono`, `qrcode-generator`, `resend`, `zod` — all clean.

---

## 6. Access control

| Control | State |
|---|---|
| MFA on privileged accounts | **NOT VERIFIED** — see `google-sheets-hardening.md` |
| Least privilege on the service account | **NOT VERIFIED** |
| Quarterly access review | **Process defined, not yet performed** |
| Secrets held as Worker secrets, never in source | **Implemented** |
| Secret rotation procedure | **Documented** — `incident-response-reference.md` §3 |
| Named offboarding process | **NOT DEFINED** — single operator |

### Secret inventory

| Secret | Where | Rotation |
|---|---|---|
| `GOOGLE_CLIENT_EMAIL` / `GOOGLE_PRIVATE_KEY` | Worker secret | On exposure; procedure documented |
| `GOOGLE_SHEET_ID` | Worker secret | Rarely |
| `RESEND_API_KEY` | Worker secret | On exposure |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | Worker secret | On exposure |
| `RAZORPAY_WEBHOOK_SECRET` | Worker secret | **NOT YET SET** |
| `RETENTION_ENFORCE` | Worker secret | **Deliberately unset** |

---

## 7. Email security

| Control | State |
|---|---|
| SPF / DKIM / DMARC on `sanixor.space` | **NOT VERIFIED** |
| Sender domain alignment | **NOT VERIFIED** |
| Transactional/promotional separation | **N/A** — no promotional mail is sent |
| `List-Unsubscribe` headers | **NOT IMPLEMENTED** — not required while mail is transactional only |
| Bounce / complaint handling | **NOT IMPLEMENTED** |

**To verify:** check the Resend dashboard for domain verification status, and confirm DNS records with `dig TXT sanixor.space` and `dig TXT _dmarc.sanixor.space`.

> Having SPF/DKIM/DMARC records is not the same as them being correct or enforcing. A DMARC record at `p=none` monitors and blocks nothing. Do not treat the presence of a record as a control until the policy has been read.

---

## 8. Verification schedule

| Frequency | Checks |
|---|---|
| **Per release** | `verify:compliance`, typecheck, lint, build, `security:scan` |
| **Monthly** | Dependency review, secret scan, processor changes, incident review |
| **Quarterly** | Access review, Sheets permissions, retention verification, DSR/grievance review, backup restore test |
| **Annually** | Full control-matrix review, `security.txt` expiry refresh |

---

## 9. Not implemented, and not claimed

Recorded so their absence is deliberate rather than an oversight:

- No WAF rate limiting (§3)
- No automated CI security scanning
- No intrusion detection or alerting — discovery depends on someone noticing
- No penetration test
- No ISO/IEC 27001, SOC 2 or any third-party certification
- No bug-bounty programme
- No backup restoration has yet been tested (see `backup-and-recovery.md`)
- No incident-response exercise has been run
