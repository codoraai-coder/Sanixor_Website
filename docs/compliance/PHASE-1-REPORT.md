# Phase 1 Final Report — Sanixor AI Compliance Foundation

**Date:** 2026-09-23
**Status:** `PHASE_1_COMPLETE_WITH_BLOCKERS`
**Baseline:** frontend `fac8551`, backend `df1cf8b`

> Reported as **complete with blockers**, not complete. Every P0 policy exists, is routed, versioned and reconciled against the source code — but eleven company identity facts are unconfirmed, and the Consumer Protection (E-Commerce) Rules, 2020 and Razorpay both require them before this layer can be considered publishable.

---

## 1. What was implemented

### 18 policy pages

**13 general** — `/privacy` · `/terms` · `/refund-policy` · `/cookie-policy` · `/security` · `/accessibility` · `/subprocessors` · `/data-rights` · `/data-deletion` · `/grievance` · `/acceptable-use` · `/intellectual-property` · `/disclaimer`

**5 event-scoped**, generated generically for any registered event — `/events/:eventSlug/{terms,code-of-conduct,rules,refund,privacy}`, live for `agentverse-2`.

All 20 routes (including `/` and `/contact`) verified returning **HTTP 200** against the production build.

### Architecture

Policy text is **structured data**, not hand-written JSX. A shared renderer supplies the chrome, table of contents, section anchors and version block, so pages stay uniform and a new policy is a few lines rather than a bespoke page.

| File | Role |
|---|---|
| `src/config/company.config.ts` | Every company identity fact, once. Unconfirmed values render as visible markers. |
| `src/config/policies.config.ts` | Versions, effective dates, routes. Never duplicated into a page. |
| `src/config/events.config.ts` | Event facts. Adding an entry generates that event's five policy pages. |
| `src/components/legal/LegalPage.tsx` | Shared renderer with a safe inline-markup parser — no `dangerouslySetInnerHTML`. |
| `src/components/legal/FormPrivacyNotice.tsx` | DPDP s.5 notice at the point of collection. |
| `scripts/verify-compliance.mjs` | Automated policy-to-code drift detection. |

### Consent capture (new capability)

- **Notice at the point of collection** on all four forms — contact, demo, hiring, event registration.
- **Explicit acceptance** before payment: an 18+ attestation and a terms/privacy acceptance checkbox, both required; the submit button is disabled until ticked.
- **Versioned proof recorded end to end**: policy versions flow from `policies.config.ts` → modal → validated by Zod → packed into Razorpay order notes → unpacked at finalisation → written to four new Google Sheet columns (Terms Version, Privacy Version, Consent At, Age Confirmed).

Consent is packed into a **single** order-notes key, because Razorpay caps notes at 15 keys and the registration already used 12. `unpackConsent` tolerates a missing value, so orders created before this change still finalise.

### Accessibility

`prefers-reduced-motion` is now honoured globally — a CSS media block plus Lenis smooth-scroll **not initialising at all** under that preference. This was implemented *because* the Accessibility Statement claims it; the automated check asserts both halves exist.

---

## 2. What was changed

| Before | After |
|---|---|
| Privacy Policy built around LinkedIn OAuth, user accounts and credentials — **none implemented anywhere** | Rewritten from the code; describes the four real collection points |
| Omitted Google Sheets, Razorpay, Resend, Cloudflare, IP storage | All named; dedicated `/subprocessors` page |
| Children's threshold 16 (a GDPR number) | **18**, per DPDP Act s.9 |
| No refund policy while taking live ₹79 payments | `/refund-policy` + per-event rules, with stated timelines |
| UI promised refunds "automatically" with no implementation | Reworded to the manual reconciliation that actually happens |
| Terms: no payment, refund, governing-law or dispute clauses | All present |
| No consent capture, no age signal | Notice on every form; versioned acceptance + 18+ attestation before payment |
| Contact page showed "Noida, India" and an email | Statutory Business Information block (legal name, registered office, phone, grievance officer, GSTIN) |
| 2 legal pages, 3 footer links | 18 policy pages, all reachable from a dedicated footer row |
| No drift detection | `npm run verify:compliance` fails the build on policy/code drift |

---

## 3. Legal requirements mapped

| Requirement | Instrument | Implementation |
|---|---|---|
| Notice before/with consent | DPDP Act s.5 | `FormPrivacyNotice` on all four forms |
| Free, specific, informed consent + easy withdrawal | DPDP Act s.6 | Acceptance checkbox; one-email withdrawal route |
| Fiduciary responsible for processors | DPDP Act s.8 | `/subprocessors`, with DPA status stated honestly |
| Children under 18 / parental consent | DPDP Act s.9, Rules 2025 r.10 | 18+ attestation; threshold corrected to 18 |
| Grievance redressal | DPDP Act s.13 | `/grievance`, officer block, 48h / 30d timelines |
| Legal name, address, customer care, grievance officer | E-Commerce Rules, 2020 | Contact page Business Information block |
| Refund/cancellation disclosed before purchase | E-Commerce Rules, 2020 | `/refund-policy`, linked from footer and checkout |
| 48h acknowledgement, 1-month redressal | E-Commerce Rules, 2020 | Stated on `/grievance` |
| Published policy pages | Razorpay merchant terms | All present; pricing page still outstanding |
| Card data outside scope | PCI DSS | Hosted checkout — verified, no card field in either repo |

**Sources:** recorded with retrieval status in [`compliance-research.md`](./compliance-research.md). MeitY returned HTTP 403 to automated retrieval, so DPDP section text was corroborated from independent legal summaries rather than read from the primary source — stated there rather than glossed over.

---

## 4. Test and build results

| Check | Result |
|---|---|
| Frontend `tsc --noEmit` | **Pass** |
| Frontend ESLint (`--max-warnings=0`) | **Pass** — 0 errors, 0 warnings |
| Frontend production build | **Pass** — 2,226 modules, ~10s |
| All 20 policy routes HTTP 200 | **Pass** — 20/20 |
| `npm run verify:compliance` | **Pass** — 0 failures, 12 warnings |
| Backend `tsc --noEmit` | **Pass** |
| Backend `build:check` (dry-run deploy) | **Pass** |

The 12 warnings are the 11 unconfirmed company facts plus their summary line. They are blocking for **publication**, not for the build — deliberately, so the layer can be reviewed before the facts land.

### What the compliance check verifies

Not merely that pages render, but that **claims match code**: every registered policy is routed and footer-linked; no false LinkedIn/account/auto-refund claim survives; the cookie policy documents every real `localStorage` key and no cookies are set; no analytics exist; consent capture is wired; reduced-motion is genuinely implemented.

One correction made during this phase: the checker initially failed on the privacy and cookie policies because it matched prose that *denies* LinkedIn and analytics. The check was wrong, not the policies — it now scans implementation files for ground truth and policy files only for specific affirmative false claims.

---

## 5. Blocked by missing company information

Eleven fields in `src/config/company.config.ts`, each a one-line edit:

`legalName` · `entityType` · `registeredAddress` · `cin` · `gstin` · `udyam` · `contact.phone` · `grievanceOfficer.name` · `grievanceOfficer.designation` · `dataProtectionContact.name` · `jurisdiction.forum`

Until supplied, each renders as an amber `[ TO BE CONFIRMED — … ]` marker. That is the intended behaviour: a fabricated registered address or grievance-officer name is materially worse than a visible gap, because both are claims a regulator and a customer are entitled to rely on.

**Also confirm** `privacy@sanixor.space` is a live, monitored mailbox — every policy routes rights requests and complaints there.

---

## 6. Blocked by engineering work (Phase 2)

All **disclosed on the live pages**, so none makes a published policy false:

1. No automated retention/deletion — disclosed at `/privacy#retention`
2. Consent not persisted for the three non-payment forms
3. No DSR tooling (no cross-tab lookup by email)
4. PII in a spreadsheet, no RBAC or audit trail — disclosed at `/security#limitations`
5. No Content-Security-Policy
6. Rate limiting per-isolate only
7. Google Fonts on Google's CDN; OpenStreetMap iframe on load
8. **Price not displayed anywhere in the frontend** — ₹79 lives only in a backend constant, and Razorpay requires published pricing
9. No `security.txt`; no open-source `NOTICE` file
10. Colour contrast unverified; no independent accessibility audit
11. Logger redacts secrets but not PII keys
12. DPAs not executed or filed

Full detail in [`compliance-gap-report.md`](./compliance-gap-report.md).

---

## 7. Assumptions

1. `privacy@sanixor.space` / `team@sanixor.space` are monitored — **unverified**.
2. Support hours Mon–Fri 10:00–18:00 IST — change in `company.config.ts` if wrong.
3. Refund stance (non-refundable + organiser-fault exceptions) — **chosen by the user** this phase.
4. AgentVerse facts taken from the live event page; ₹79 from `AGENTVERSE_PRICING`. Nothing invented.
5. Below any DPDP Significant Data Fiduciary threshold.
6. **The 48-hour acknowledgement and 30-day resolution commitments are now public promises.** Confirm the team can meet them.

---

## 8. Requires legal verification

EU/UK applicability · current CERT-In direction text · Significant Data Fiduciary thresholds · whether under-18s actually register · Razorpay's executed merchant agreement · company registration status, GSTIN, Udyam · employment-law minimum retention for applicants · the correct court seat.

---

## 9. Deployment note

**Deploy the frontend before the backend.**

The backend's create-order schema now **requires** a `consent` object. If the backend ships first while the old frontend is still live, registrations fail validation. Frontend-first is safe: Zod strips unknown keys, so the new payload is accepted by the old backend (consent simply is not recorded) until the backend catches up.

Registration is currently closed, so the present risk is low — but the ordering matters for the next open registration.

Remember the deployment trap: the backend Worker is **`sanixorbackend`** (no hyphen), deployed from GitHub `main` via Workers Builds. Any local backend change must be committed and pushed or the next Git build reverts it.

---

## 10. Phase 2 dependencies

**Ordered by what unblocks the most:**

1. **Supply the 11 company facts** — unblocks publication of the entire layer.
2. **Publish pricing** in the frontend — completes the Razorpay requirement set.
3. **Automate retention/deletion** — converts the largest disclosed gap into a real control.
4. **Persist consent for the three non-payment forms** — completes the consent story.
5. **Execute and file DPAs** — administrative, removes the `/subprocessors` caveat.
6. **Self-host fonts, click-to-load the map, deploy CSP** — closes the third-party exposure.
7. **DSR tooling** — makes the 30-day promise operationally sustainable.
8. **Migrate PII off Sheets to D1** — the structural fix behind several gaps.
9. **Accessibility audit** — upgrades "partial conformance" to a supportable claim.

**Phase 3 (dated):** verifiable parental consent ahead of the DPDP Rules deadline of **13 May 2027**.

---

## 11. Success criteria

| Criterion | Status |
|---|---|
| All required policies exist, accessible, versioned, internally consistent | **Met** |
| Privacy Policy accurately describes real collection and processing | **Met** — reconciled line by line against the code |
| Terms and refund information public and consistent with Razorpay | **Met** |
| Paid registration governed by explicit event terms and participant rules | **Met** |
| Collection points carry notices; acceptance version-tracked | **Met** for paid registration; partial for the other three forms |
| No fabricated company information published | **Met** — gaps render as visible markers |
| Indian legal requirements mapped to sources | **Met**, with retrieval status recorded |
| No policy promises what the software cannot do | **Met** — every gap disclosed on the page itself |
| Automated and manual tests confirm the layer works | **Met** — 20/20 routes, 0 failures, clean build |
| **Company identity published** | **NOT MET** — 11 unconfirmed facts |

**Nine of ten met.** The tenth is the reason this is reported as `PHASE_1_COMPLETE_WITH_BLOCKERS` rather than complete.
