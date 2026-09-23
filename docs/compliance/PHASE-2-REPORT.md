# Phase 2 Final Report — Privacy Engineering and Data Lifecycle

**Date:** 2026-09-23
**Phase 1 status:** `PHASE_1_COMPLETE`
**Phase 2 status:** `PHASE_2_COMPLETE_WITH_BLOCKERS`

> Reported with blockers because two controls are built but **not yet switched on in production**, and four data-processing agreements remain unexecuted. Nothing published claims otherwise — every gap below is disclosed on the live pages it affects.

---

## 1. Phase 1 finalisation

### 1.1 Company identity resolved

All eleven previously-unconfirmed facts are now confirmed from the Udyam Registration Certificate and owner confirmation, in `src/config/company.config.ts`.

| Field | Value |
|---|---|
| Legal name | SANIXOR AI |
| Entity type | **Proprietorship** (not incorporated) |
| Proprietor | Reeta Tripathi |
| Registered address | Salahpur, Dhaorua, Malipur, Ambedkar Nagar, Uttar Pradesh – 224159, India |
| Udyam | UDYAM-UP-04-0054404 (Micro Enterprise) |
| CIN | **Not registered** — a proprietorship has none |
| GSTIN | **Not registered** |
| Public contact | dsrishabh23@gmail.com · +91 99848 45854 |
| Grievance Officer | Rishabh Tripathi, Grievance Officer |
| Jurisdiction | Courts at Lucknow, Uttar Pradesh |

**Three deliberate decisions:**

1. **`NOT_REGISTERED` is a distinct state from `TODO`.** CIN and GSTIN render as "Not registered" — a confirmed negative — rather than as an unresolved gap or, worse, a fabricated number.
2. **Not a Data Protection Officer.** Rishabh Tripathi is published as **Grievance Officer** only. DPO is a distinct statutory role that has not been established, so no page uses that title. The Privacy Policy's former "data protection contact" framing was removed.
3. **Privacy contact switched to the owner-confirmed address.** The previous `privacy@sanixor.space` had never been verified as deliverable. A policy that routes rights requests to an unmonitored mailbox is worse than one pointing at a mailbox someone reads.

**Never published:** the PAN, bank account number and IFSC that also appear on the Udyam certificate. `company.config.ts` carries an explicit warning against adding them.

### 1.2 Pricing published

Verified from the backend constant `AGENTVERSE_PRICING` (7900 paise) — **not** assumed from the earlier ₹79 figure. Now displayed on:

- the event page, in a dedicated **Registration Fee** section with links to refund rules, event terms, code of conduct and privacy notice **before** purchase;
- the registration modal, above the consent block, so the amount is visible at the moment of acceptance.

A new automated check compares the frontend `feePaise` against the backend constant and **fails the build on drift**.

### 1.3 Contact page corrected

The page claimed an office in **Noida** while the only verified address is in **Ambedkar Nagar**, and embedded an OpenStreetMap iframe pinned to unverifiable Noida coordinates.

Replaced with the confirmed registered address as plain text. This removed an unverified location claim, invented coordinates, and a third-party embed that leaked every visitor's IP — and is more accessible than a map. All three policy pages that referenced OpenStreetMap were corrected in the same change.

> **If a separate Noida operating office genuinely exists**, confirm it and it can be published as an additional address. It was not invented in the meantime.

### 1.4 Phase 1 exit criteria

| Criterion | Status |
|---|---|
| No unresolved identity placeholders | **Met** |
| Confirmed information propagated everywhere | **Met** — 17/17 placeholders resolve, asserted by an automated check |
| Public pricing displayed | **Met** |
| Privacy Policy matches actual collection | **Met** |
| Terms match actual functionality | **Met** |
| Refund Policy matches actual payment behaviour | **Met** — manual, request-based, as implemented |
| Event policies match actual event | **Met** |
| All compliance tests pass | **Met** — 0 failures, 0 warnings |
| Production build passes | **Met** |
| No fabricated legal claims | **Met** |

---

## 2. Phase 2 implementation

### 2.1 Consent management

| Component | File |
|---|---|
| Technology registry | `src/config/consent.config.ts` |
| Consent store | `src/lib/consent.ts` |
| Provider | `src/components/consent/ConsentProvider.tsx` |
| Banner | `src/components/consent/ConsentBanner.tsx` |
| Preference centre | `src/components/consent/PreferenceCentre.tsx` |

**Record:** `consentId`, `subject`, per-category `choices`, `consentVersion`, `noticeHash` (fingerprint of the exact wording shown), `timestamp`, `source`, `withdrawnAt`. A later decision writes a new record; records are never edited in place.

**Rules enforced in code, not just documented:**

- **Deny by default.** An undecided optional category is denied, never granted.
- **Nothing optional loads first.** `ThemeProvider` and `BookDemoModal` consult `allows("functional")` before any read or write.
- **Reject is as easy as accept.** Both banner buttons are visually identical — same size, border and contrast.
- **No pre-ticked boxes**, asserted by an automated check.
- **Withdrawal purges**, rather than merely stopping future writes.
- **Storage failure fails safe.** If `localStorage` throws, we ask again; "could not record" is never treated as "granted".

**The honest part.** Only categories with a registered technology are shown. There is no Analytics toggle, because there are no analytics — a switch governing nothing would be a fabricated choice. Google Fonts is shown as *information rather than a control*, because it loads from `index.html` before any script runs and genuinely cannot be gated in-app. The preference centre says so and names the real fix.

### 2.2 Data lifecycle

**Retention** — `retention.config.ts` + `retention.service.ts`, driven by a weekly Cloudflare Cron Trigger.

The mechanism is **anonymisation, not row deletion**. Records live in a Google Sheet; deleting a row shifts every row beneath it while live traffic appends concurrently, and a delete-by-index racing an append destroys the wrong person's record with no transaction to roll back. Cells are overwritten in place with `[erased: retention]`, so nothing shifts, the operation is idempotent, and the disposal is auditable.

Five safety controls: dry-run default · 500-row blast-radius cap · protected payment/consent columns · unparseable timestamps skipped · idempotent re-runs.

**IP addresses** now carry a shorter 90-day clock than the record they sit in, since they exist only for abuse prevention.

### 2.3 Data-subject rights and grievances

New endpoints `POST /api/privacy-request` and `POST /api/grievance`, writing to two new sheet tabs with full workflow columns. Public forms on `/data-rights`, `/data-deletion` and `/grievance` issue a `DSR-…` or `GRV-…` reference.

**Intake only — and that is the security model.** These endpoints record a request; they never read back, modify or delete anything. A public unauthenticated endpoint that returned or erased records keyed on an email address would let anyone exfiltrate or destroy a stranger's data by typing their address. Identity verification is a human step, and an automated check asserts the service contains no row-mutation call.

### 2.4 Logging

`SENSITIVE_KEY` now redacts personal-data keys — `email`, `name`, `phone`, `roll_no`, `address`, `message`, `ip`, card fields — as well as secrets, at any nesting depth.

Verified that this does **not** break diagnostics: the Error branch assigns `name`, `message` and `stack` before the redaction loop, so error messages survive. Correlators carrying no personal data (`requestId`, `orderId`, `registrationId`, `userType`) are deliberately not redacted, because they are what makes an incident traceable.

---

## 3. Test and build results

| Check | Result |
|---|---|
| Frontend `tsc --noEmit` | **Pass** |
| Frontend ESLint `--max-warnings=0` | **Pass** — 0 errors, 0 warnings |
| Frontend production build | **Pass** |
| All 21 routes HTTP 200 | **Pass** — 21/21 |
| `npm run verify:compliance` | **Pass** — 0 failures, 0 warnings |
| Backend `tsc --noEmit` | **Pass** |
| Backend `build:check` dry-run deploy | **Pass** |

`verify-compliance` now runs **11 sections**. Sections added this phase:

- **7b** — every `{{company.x}}` placeholder resolves against the config (catches a renamed field rendering literally to visitors; this caught a real bug during Phase 1).
- **8b** — published price matches the backend charge.
- **10** — consent: registry completeness, deny-by-default, symmetric accept/reject, no pre-ticked boxes, withdrawal purges, both gated writes consult consent.
- **11** — lifecycle: retention dry-run default, safety cap, protected columns, DSR intake cannot mutate, logger redacts PII.

---

## 4. Blockers

### 4.1 Not switched on in production

| # | Control | Why it is off | To enable |
|---|---|---|---|
| 1 | **Retention enforcement** | Deliberate. It edits live personal data; deleting the wrong record is unrecoverable from a spreadsheet. | Let the weekly cron dry-run once, read the report in `wrangler tail`, confirm no payment row is listed, then `wrangler secret put RETENTION_ENFORCE --name sanixorbackend` = `true` |
| 2 | **New sheet tabs** | `Privacy Requests` and `Grievances` are created on first write | Submit one test request and one test grievance against production |

### 4.2 Administrative

| # | Item |
|---|---|
| 3 | **DPAs unexecuted** with Google, Cloudflare, Resend; Razorpay's merchant terms may or may not suffice. Mostly click-through. Disclosed on `/subprocessors`. |
| 4 | **Google Sheets hardening** — sharing audit, MFA enforcement, splitting Hiring/AgentVerse. Checklist in `google-sheets-hardening.md`; needs a human. |
| 5 | **No backup grievance officer.** One named owner, no deputy, while a 48-hour public clock runs. |

### 4.3 Engineering, disclosed on the live pages

| # | Item | Disclosed at |
|---|---|---|
| 6 | Consent not persisted for the three non-payment forms (notice shown, version not stored) | Not claimed anywhere |
| 7 | Google Fonts still third-party | `/cookie-policy`, `/subprocessors` |
| 8 | No Content-Security-Policy | `/security#limitations` |
| 9 | Rate limiting per-isolate only | `/security#limitations` |
| 10 | PII in a spreadsheet, no RBAC | `/security#limitations` |
| 11 | No `security.txt`, no OSS `NOTICE` | `/security`, `/intellectual-property` |
| 12 | Contrast unverified, no independent a11y audit | `/accessibility#known-issues` |
| 13 | DSR cross-store lookup is manual | `/data-rights` |

---

## 5. Requires legal verification

1. **CERT-In current text** — the 6-hour and 180-day figures are unverified and marked as such in `incident-response-reference.md`.
2. **Applicant retention** — whether employment law sets a minimum exceeding 12 months.
3. **Razorpay merchant agreement** — whether it includes adequate processing terms or needs a separate addendum.
4. **DPDP restricted territories** — the transfer position for each global vendor.
5. **Significant Data Fiduciary thresholds.**
6. **Governing-law forum** — Lucknow is now published; confirm it is the correct seat.
7. **EU/UK scope** — policies remain scoped to India. Revisit only if Sanixor begins targeting EU/UK users.
8. **Whether under-18s actually register**, which determines how hard DPDP s.9 bites.

---

## 6. Evidence created

| Evidence | Where |
|---|---|
| Automated policy-to-code verification | `npm run verify:compliance` — 11 sections |
| Route availability | 21/21 HTTP 200 |
| Consent records | `sanixor_consent` in-browser; sheet columns Q–T for registrations |
| Retention dry-run report | Workers observability, after the first cron |
| DSR audit trail | `Privacy Requests` tab |
| Grievance audit trail | `Grievances` tab |
| Data inventory | `data-inventory.md` |
| Retention matrix | `retention-matrix.md` |
| Consent model | `consent-model.md` |
| Processor register | `processor-register.md` |
| DSR procedure | `dsr-procedure.md` |
| Grievance procedure | `grievance-procedure.md` |
| Incident response | `incident-response-reference.md` |
| Sheets hardening checklist | `google-sheets-hardening.md` |

---

## 7. Deployment

**Order matters.** Deploy **frontend first, backend second.**

The backend create-order schema requires a `consent` object. Backend-first breaks registration for the still-live old frontend; frontend-first is safe because Zod strips unknown keys. Registration is currently closed, so present risk is low — it matters for the next open registration.

Backend deploys from GitHub `main` via Workers Builds to the Worker **`sanixorbackend`** (no hyphen). A local change that is not committed and pushed will be reverted by the next Git build. Verify against `api.sanixor.space/health`, never the workers.dev URL.

After deploying: run the retention cron in dry-run, submit one test DSR and one test grievance to create the tabs, and confirm the consent banner appears and both buttons work.

---

## 8. Phase 3 prerequisites

**Before Phase 3 starts, Phase 2 must be closed out operationally:**

1. Enable retention enforcement after a reviewed dry-run.
2. Execute and file the four DPAs.
3. Complete the Sheets hardening checklist.
4. Designate a backup grievance officer.
5. Verify the CERT-In figures.

**Then Phase 3 candidates, in dependency order:**

1. **Migrate PII from Sheets to D1** — the structural fix behind RBAC, audit trail, safe hard deletion and automated DSR lookup. Everything else is a workaround until this lands.
2. **Self-host fonts** — removes the last third-party browser request and makes "no third-party content" true without caveat.
3. **CSP** in report-only, then enforced.
4. **Durable log export** meeting whatever CERT-In actually requires.
5. **Independent accessibility audit** — upgrades "partial conformance" to a supportable claim.
6. **Verifiable parental consent**, against the DPDP Rules deadline of **13 May 2027**.
7. **AI governance** — applies the moment any product (HackEval, BitBench, LexAI, NyayAI, AutoDash) processes real customer data. Re-run the assessment then with a populated model inventory; today the website runs no model on visitor data and the EU AI Act is correctly assessed as not applicable.

---

## 9. What is deliberately not claimed

Sanixor AI is **not** described anywhere as "fully compliant", "DPDP compliant", "GDPR compliant", "ISO certified" or "government certified". No such claim is made, and none would be supportable.

What the published pages now say is narrower and true: these are the commitments, this is what is implemented, and these are the gaps. Where a control is not yet built — automated deletion, executed DPAs, an accessibility audit — the page that would otherwise imply it says so plainly instead.
