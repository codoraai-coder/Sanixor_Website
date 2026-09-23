# Policy Inventory and Policy-to-Code Mapping

**Prepared:** 2026-09-23 · **Phase:** 1
**Verified by:** `npm run verify:compliance` (0 failures)

This document does two jobs:

1. **Inventory** — every published policy, its route, version and owner.
2. **Mapping** — for every material policy claim, the code that makes it true. A claim with no code behind it is a liability, so each row below is either backed by an implementation or explicitly marked as a stated limitation.

---

## Part 1 — Policy inventory

### General policies

| Policy | Route | Version | Effective | Source file |
|---|---|:---:|---|---|
| Privacy Policy | `/privacy` | 2.0 | 2026-09-23 | `src/content/legal/privacy.ts` |
| Terms of Service | `/terms` | 2.0 | 2026-09-23 | `src/content/legal/terms.ts` |
| Refund and Cancellation Policy | `/refund-policy` | 1.0 | 2026-09-23 | `src/content/legal/refund.ts` |
| Cookie Policy | `/cookie-policy` | 1.0 | 2026-09-23 | `src/content/legal/site-policies.ts` |
| Security Policy | `/security` | 1.0 | 2026-09-23 | `src/content/legal/site-policies.ts` |
| Accessibility Statement | `/accessibility` | 1.0 | 2026-09-23 | `src/content/legal/site-policies.ts` |
| Subprocessors | `/subprocessors` | 1.0 | 2026-09-23 | `src/content/legal/data-policies.ts` |
| Your Data Rights | `/data-rights` | 1.0 | 2026-09-23 | `src/content/legal/data-policies.ts` |
| Data Deletion Request | `/data-deletion` | 1.0 | 2026-09-23 | `src/content/legal/data-policies.ts` |
| Grievance Redressal | `/grievance` | 1.0 | 2026-09-23 | `src/content/legal/data-policies.ts` |
| Acceptable Use Policy | `/acceptable-use` | 1.0 | 2026-09-23 | `src/content/legal/usage-policies.ts` |
| Intellectual Property Policy | `/intellectual-property` | 1.0 | 2026-09-23 | `src/content/legal/usage-policies.ts` |
| Disclaimer | `/disclaimer` | 1.0 | 2026-09-23 | `src/content/legal/usage-policies.ts` |

### Event policies (generic framework)

Generated per event from `src/config/events.config.ts`. Adding an event entry produces its full policy suite — no new routes, no copied pages.

| Policy | Route pattern | Live URL (AgentVerse 2.0) |
|---|---|---|
| Event Terms and Conditions | `/events/:eventSlug/terms` | `/events/agentverse-2/terms` |
| Participant Code of Conduct | `/events/:eventSlug/code-of-conduct` | `/events/agentverse-2/code-of-conduct` |
| Competition Rules | `/events/:eventSlug/rules` | `/events/agentverse-2/rules` |
| Event Refund Rules | `/events/:eventSlug/refund` | `/events/agentverse-2/refund` |
| Event Privacy Notice | `/events/:eventSlug/privacy` | `/events/agentverse-2/privacy` |

### Supporting infrastructure

| Concern | File |
|---|---|
| Company identity facts (single source) | `src/config/company.config.ts` |
| Policy versions and dates (single source) | `src/config/policies.config.ts` |
| Event facts (single source) | `src/config/events.config.ts` |
| Shared page renderer, TOC, anchors, version block | `src/components/legal/LegalPage.tsx` |
| Unconfirmed-fact marker | `src/components/legal/CompanyFact.tsx` |
| Point-of-collection notice | `src/components/legal/FormPrivacyNotice.tsx` |
| Automated verification | `scripts/verify-compliance.mjs` |

---

## Part 2 — Claim-to-code mapping

### Privacy Policy

| Claim | Backed by | Status |
|---|---|---|
| Data is collected at exactly four points | `contact.tsx`, `BookDemoModal.tsx`, `hiring.tsx`, `AgentVerseRegistrationModal.tsx` | **Verified** |
| Field-by-field collection table is accurate | Backend `src/validators/{contact,demo,hiring,agentverse}.validator.ts` | **Verified** |
| IP address is stored with the submission | Backend `constants/index.ts` — `"IP"` column in every form tab | **Verified** |
| Google Sheets is the record system | `services/googleSheets.service.ts` | **Verified** |
| Razorpay processes payments; we never see card data | `services/razorpay.service.ts`; hosted checkout; no PAN/CVV field anywhere | **Verified** |
| Resend delivers transactional email | `services/mail/providers/resend.provider.ts` | **Verified** |
| Cloudflare hosts both apps | `wrangler.jsonc`, both repos | **Verified** |
| No analytics or advertising technology | Automated check §6 of `verify-compliance.mjs` | **Verified** |
| No user accounts, credentials or LinkedIn OAuth | Automated check §4 — no auth implementation exists | **Verified** |
| No AI model processes visitor submissions | No model SDK or inference call in either repo | **Verified** |
| Consent is captured at the point of collection | `FormPrivacyNotice` on all four forms | **Implemented this phase** |
| Policy versions are recorded for paid registrations | `policies.config.ts` → modal → order notes → sheet columns | **Implemented this phase** |
| Children's threshold is 18 | 18+ attestation in the registration modal | **Implemented this phase** |
| Retention schedule is published | Stated in the policy | **Policy commitment — enforced manually** |
| Retention is **not** automated | Stated as a limitation in the policy itself | **Honest gap, disclosed** |

### Refund Policy

| Claim | Backed by | Status |
|---|---|---|
| Payments are processed by Razorpay | `razorpay.service.ts` | **Verified** |
| Refunds are reviewed and initiated **by a person** | No refund API call exists in the backend — so the policy describes the manual process that actually happens | **Honest — matches reality** |
| No automatic refund is promised | UI copy reworded; automated check §4(c) | **Fixed this phase** |
| Registration ID format `AV2-XXXXXX` | `makeRegistrationId` in `registrationFinalization.service.ts` | **Verified** |

### Cookie Policy

| Claim | Backed by | Status |
|---|---|---|
| **No cookies are set at all** | `document.cookie` is written only in `ui/sidebar.tsx`, which is imported nowhere. Automated check §5 | **Verified** |
| Exactly two localStorage keys | `sanixor-theme`, `sanixor_demo_booked`. Automated check §5 asserts both are documented | **Verified** |
| Third parties: Google Fonts, OpenStreetMap, Razorpay | `index.html:12-15`, `contact.tsx:261`, checkout script | **Verified** |

### Security Policy

| Claim | Backed by | Status |
|---|---|---|
| HTTPS/TLS everywhere | Cloudflare Workers | **Verified** |
| Card data never reaches our servers | Hosted checkout; no card field in either repo | **Verified** |
| Signature verification with constant-time comparison | `razorpay.service.ts` → `verifyPaymentSignature` | **Verified** |
| Server-side re-confirmation of paid status | `payment.service.ts` → `getOrder` status check | **Verified** |
| Schema validation, body limits, timeouts | Zod validators; `bodyLimit`; `requestTimeout` in `app.ts` | **Verified** |
| Rate limiting on form endpoints | `middleware/rateLimiter.ts` | **Verified (best-effort, disclosed as such)** |
| Strict CORS allowlist | `config/cors.ts` | **Verified** |
| Logs redact secrets | `config/logger.ts` — `SENSITIVE_KEY` | **Verified** |
| Dev routes unreachable in production | `app.ts` — mounted only when `!env.isProd` | **Verified** |
| Records held in a spreadsheet, not a database | Stated as a known limitation | **Honest gap, disclosed** |
| No ISO 27001 / SOC 2 certification | Stated explicitly | **Honest, disclosed** |

### Accessibility Statement

| Claim | Backed by | Status |
|---|---|---|
| Skip-to-content link | `Navbar.tsx:147-152` | **Verified** |
| Text alternatives on all images | All 19 `<img>` elements carry `alt` (AST-style scan) | **Verified** |
| Declared page language | `index.html` — `<html lang="en">` | **Verified** |
| **Reduced motion is honoured** | `styles.css` media block + Lenis gated in `useSmoothScroll.ts`. Automated check §8 | **Implemented this phase** |
| Partial conformance, not full | Stated, with known gaps listed | **Honest, disclosed** |

### Subprocessors

| Claim | Backed by | Status |
|---|---|---|
| Four named subprocessors | Derived from the backend service layer | **Verified** |
| DPAs are still being formalised | Stated as a warning on the page itself | **Honest gap, disclosed** |

---

## Part 3 — Consent data flow

End-to-end path of a consent record, added this phase:

```
policies.config.ts          PRIVACY_VERSION / TERMS_VERSION
        │
        ▼
AgentVerseRegistrationModal  user ticks 18+ and accepts terms
        │                    buildConsent() → { termsVersion, privacyVersion,
        │                                       acceptedAt, ageConfirmed }
        ▼
payment.service.ts (FE)      POST /api/payments/create-order
        │
        ▼
payment.validator.ts (BE)    consentSchema — ageConfirmed must be literal true,
        │                    acceptedAt must be a valid ISO timestamp
        ▼
payment.service.ts (BE)      buildPendingRegistration → packConsent()
        │                    packed into ONE order-notes key
        │                    ("t=2.0;p=2.0;a=1;at=<ISO>") because Razorpay
        │                    caps notes at 15 keys and 12 were already used
        ▼
Razorpay order notes         survives the create-order → verify boundary
        │
        ▼
payment.service.ts (BE)      pendingFromNotes → unpackConsent()
        │
        ▼
registrationFinalization     appendPaidAgentVerse({ termsVersion,
        │                      privacyVersion, consentAt, ageConfirmed })
        ▼
Google Sheet                 4 new columns: Terms Version, Privacy Version,
                             Consent At, Age Confirmed (18+)
```

**Design note.** Consent had to survive a stateless boundary — the registration exists only inside the Razorpay order notes between create-order and verify. Packing into a single delimited key keeps the record intact without exceeding Razorpay's 15-key limit, and `unpackConsent` tolerates a missing or malformed value so an order created before this change still finalises rather than throwing.

**Known limitation.** The three non-payment forms (contact, demo, hiring) show the notice but do **not** yet persist a consent version — they have no equivalent structured record. Adding consent columns to those sheet tabs is Phase 2 work.

---

## Part 4 — Maintenance rules

1. **Adding a subprocessor** — any new outbound destination for personal data in `services/` must be added to `/subprocessors` and the Privacy Policy in the same change.
2. **Adding analytics** — invalidates the Cookie Policy's "no cookies" claim and the Privacy Policy's "no tracking" claim. `verify-compliance.mjs` §6 will fail the build.
3. **Adding a form field** — update the Privacy Policy collection table and the relevant `FormPrivacyNotice` variant.
4. **Changing a policy substantively** — bump `version` **and** `effectiveDate` in `policies.config.ts`. Never edit a published version in place.
5. **Adding an event** — add an entry to `events.config.ts`; the five policy pages generate automatically.
6. **Before any release** — run `npm run verify:compliance`.
