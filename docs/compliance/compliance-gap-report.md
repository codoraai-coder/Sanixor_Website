# Compliance Gap Report — Phase 1

**Prepared:** 2026-09-23 · **Updated:** 2026-09-23 (Phase 1 closed)
**Status:** `PHASE_1_COMPLETE`
**Verification:** `npm run verify:compliance` — **0 failures, 0 warnings**

> **This report is superseded.** Phase 1's blockers are closed: all eleven company identity facts were confirmed from the Udyam Registration Certificate, and pricing is published. The current live position is in [`PHASE-2-REPORT.md`](./PHASE-2-REPORT.md); this file is kept as the record of what Phase 1 found.

---

## 1. Blocked by missing company information (P0) — **RESOLVED 2026-09-23**

These are the only things standing between the current state and a publishable legal layer. Each is a **single-line edit** in [`src/config/company.config.ts`](../../src/config/company.config.ts) — nothing else needs to change.

| # | Field in `company.config.ts` | What is needed | Why it is required |
|---|---|---|---|
| 1 | `legalName` | Registered legal entity name | E-Commerce Rules r.4/5; Razorpay onboarding |
| 2 | `entityType` | e.g. "Private Limited Company", "Sole Proprietorship" | Privacy Policy identifies the Data Fiduciary |
| 3 | `registeredAddress` | Full registered office address with PIN | E-Commerce Rules; Razorpay |
| 4 | `cin` | CIN, if incorporated | Statutory disclosure where applicable |
| 5 | `gstin` | GSTIN, if registered | Invoicing and statutory disclosure |
| 6 | `udyam` | Udyam / MSME registration number | **Required before any MSME trust badge may be shown** |
| 7 | `contact.phone` | Working customer-support phone | E-Commerce Rules explicitly require a phone number |
| 8 | `grievanceOfficer.name` | Full name | E-Commerce Rules require the name to be displayed |
| 9 | `grievanceOfficer.designation` | Designation | E-Commerce Rules require the designation |
| 10 | `dataProtectionContact.name` | Person answering data-protection queries | DPDP Act s.13 |
| 11 | `jurisdiction.forum` | Court seat for disputes | Terms of Service governing-law clause |

**RESOLVED.** All eleven were supplied from the verified Udyam certificate and owner confirmation. CIN and GSTIN were confirmed as *not held* (a proprietorship has no CIN; the business is not GST-registered) and render as "Not registered" rather than as gaps. See PHASE-2-REPORT §1.1.

Original note: **Until these are supplied**, every page that references them displays an amber `[ TO BE CONFIRMED — … ]` marker. That is deliberate: a fabricated registered address or grievance-officer name is a far worse outcome than a visible gap, because both are claims a regulator and a customer are entitled to rely on.

**Also verify:** that `privacy@sanixor.space` is a live, monitored mailbox. Every policy routes rights requests and complaints to it. A dead address on a privacy policy is exactly what payment-provider and app review check.

---

## 2. Blocked by engineering work (Phase 2)

Each of these is **honestly disclosed on the live pages** rather than hidden, so none makes a published policy false. They are commitments to close, not misstatements.

| # | Gap | Currently disclosed at | Effort |
|---|---|---|---|
| 1 | **No automated retention/deletion.** No scheduled job deletes expired records. | `/privacy#retention`, `/data-deletion`, `/security#limitations` | Cloudflare Cron Trigger + a sheet sweeper |
| 2 | **Consent not persisted for non-payment forms.** Contact, demo and hiring show the notice but store no consent version. | Not claimed anywhere | Add consent columns to 3 sheet tabs + pass version through |
| 3 | **No DSR tooling.** Requests are handled by hand; there is no cross-tab lookup by email. | `/data-rights` describes the manual process | Lookup script or admin route |
| 4 | **PII in a spreadsheet.** No RBAC, no audit trail. | `/security#limitations` | Migrate to D1 |
| 5 | **No Content-Security-Policy.** | `/security#limitations` | Report-only, then enforce |
| 6 | **Rate limiting is per-isolate.** | `/security#limitations` | Cloudflare WAF rule |
| 7 | **Google Fonts loaded from Google's CDN.** | `/cookie-policy`, `/subprocessors` | Self-host via `@fontsource` |
| 8 | **OpenStreetMap iframe loads on page load.** | `/cookie-policy` | Click-to-load placeholder |
| 9 | **Price not displayed in the frontend.** ₹79 exists only in a backend constant; the event page shows no price. | — | Razorpay requires published pricing |
| 10 | **No `security.txt`.** | `/security` gives an email, but no machine-readable route | One static file |
| 11 | **No open-source attribution file.** | `/intellectual-property` says one is being compiled | Generate `NOTICE` in CI |
| 12 | **Colour contrast unverified; no independent a11y audit.** | `/accessibility#known-issues` | axe run + audit |
| 13 | **Logger does not redact PII.** Secrets are redacted; `email`/`name`/`phone` are not. No call site currently logs a payload. | Not claimed | Add keys to `SENSITIVE_KEY` |
| 14 | **DPAs not executed/filed.** | `/subprocessors#safeguards` | Administrative, not engineering |

---

## 3. Deferred by design

| Item | Reason |
|---|---|
| **Verifiable parental consent (DigiLocker)** | DPDP Rules, 2025 compliance deadline is **13 May 2027**. The 18+ attestation added this phase makes the question answerable now; full verification is a dated Phase 3 item. |
| **GDPR machinery** | Policies are scoped to India. Revisit only if Sanixor begins targeting EU/UK users — see `compliance-research.md` §7. |
| **AI governance** | Not applicable: the website runs no model on visitor data. Becomes applicable when any product processes real customer data. |
| **CERT-In figures** | 6-hour / 180-day figures marked `needs-verification` pending a direct read of the current direction text. |

---

## 4. Assumptions made

1. `privacy@sanixor.space` and `team@sanixor.space` are monitored. **Unverified.**
2. Support hours of Mon–Fri 10:00–18:00 IST are a reasonable default. **Change in `company.config.ts` if wrong.**
3. The refund stance — non-refundable with organiser-fault exceptions — was **chosen by the user** during this phase.
4. AgentVerse 2.0 facts (solo entries, online via Discord/Google Meet, eligibility, prizes) were taken from the live event page, not invented.
5. The ₹79 fee was read from the backend constant `AGENTVERSE_PRICING`.
6. Sanixor is below any DPDP Significant Data Fiduciary threshold.
7. The 30-day rights-response and 48-hour acknowledgement commitments are operationally achievable. **These are now public promises — confirm the team can meet them.**

---

## 5. Requires legal verification

Carried forward from `compliance-research.md` §11 — verify with a qualified Indian practitioner before relying on the published text:

1. EU/UK applicability decision.
2. Current CERT-In direction text.
3. DPDP Significant Data Fiduciary thresholds.
4. Whether under-18s actually register for events.
5. Razorpay's executed merchant agreement terms.
6. Company registration status, GSTIN, Udyam.
7. Employment-law minimum retention for job applicants (interacts with the published 12-month deletion commitment).
8. The correct court seat for the governing-law clause.

---

## 6. What changed from the pre-existing state

| Before | After |
|---|---|
| Privacy Policy described LinkedIn OAuth, user accounts and credentials — **none of which exist** | Rewritten from the code; describes the four real collection points |
| Privacy Policy omitted Google Sheets, Razorpay, Resend, Cloudflare, IP storage | All four named, with a dedicated `/subprocessors` page |
| Children's threshold set at 16 (a GDPR number) | Corrected to 18, per DPDP Act s.9 |
| 2 legal pages | 13 general + 5 event-scoped policy pages |
| No refund policy, while taking live payments | `/refund-policy` + per-event refund rules, with stated timelines |
| UI promised automatic refunds with no implementation | Reworded to the manual reconciliation process that actually exists |
| No consent capture anywhere | Notice on all four forms; versioned acceptance recorded for paid registrations |
| No age signal collected | 18+ attestation required before payment |
| Terms had no payment, refund, governing-law or dispute clauses | All present |
| No grievance route | `/grievance` with officer details and statutory timelines |
| Smooth-scroll and animation ignored reduced-motion | `prefers-reduced-motion` honoured globally; Lenis not initialised at all |
| No way to detect policy/code drift | `npm run verify:compliance` fails the build on drift |
