# Phase 5 Report — Compliance Verification and Evidence

**Date:** 2026-09-23
**Final status:** `PRODUCTION_COMPLIANCE_READY_WITH_DOCUMENTED_LIMITATIONS`

> Not `PRODUCTION_COMPLIANCE_READY`. Several controls are built but not yet switched on in production, and a set of evidence cannot be generated without account access. Those limitations are documented, not hidden — which is what the middle status is for.
>
> The word **certified** appears nowhere in this programme, because Sanixor holds no certification.

---

## 1. Automated audit — all green

| Check | Result |
|---|---|
| `verify:compliance` (11 sections) | **PASS** — 0 failures, 0 warnings |
| Frontend `tsc --noEmit` | **PASS** |
| Frontend ESLint `--max-warnings=0` | **PASS** |
| Frontend production build | **PASS** |
| Backend `tsc --noEmit` | **PASS** |
| Backend `build:check` dry-run deploy | **PASS** |
| `security:scan` | **PASS** — 0 critical, 0 reaching production, 0 unreviewed secrets |
| All 22 routes HTTP 200 | **PASS** |
| No third-party origin in the build | **PASS** — verified by scanning `dist/` |

### What `verify:compliance` actually checks

Not "does the page render" — that would miss the original defect entirely. It checks **claims against code**:

1. Every registered policy is routed · 2. Event policy routes exist · 3. Footer reaches every policy · 4. No false LinkedIn/account/auto-refund claim survives · 5. Cookie policy matches real storage · 6. The "no tracking" claim holds · 7. Consent capture is wired · 7b. Every `{{company.x}}` placeholder resolves · 8. Accessibility claims hold · 8b. Published price matches the backend charge · 9. Company facts confirmed · 10. Consent management (10 assertions) · 11. Data lifecycle (5 assertions).

Two of these caught real bugs during the programme: §7b caught a policy referencing a config field that had been renamed, which would have rendered `{{operatingCity}}` literally to visitors.

---

## 2. Manual audit

| Verified | Method | Result |
|---|---|---|
| Public legal claims vs implementation | Line-by-line reconciliation | **Pass** |
| Processors vs actual data flow | Service-layer read | **Pass** — 4 processors, all disclosed |
| Cookies/storage vs browser behaviour | Source scan | **Pass** — 0 cookies, 3 localStorage keys, all registered |
| Retention rules vs data stores | Config review | **Pass** — pending live dry-run |
| DSR actions vs data stores | Procedure review | **Pass** — manual, documented as manual |
| Event rules vs implementation | Page review | **Pass** |
| Refund promises vs capability | Code read | **Pass** — manual process, described as manual |
| Company identity vs Udyam certificate | Field-by-field | **Pass** |
| Security statements vs controls | Control review | **Pass** — gaps disclosed on the page itself |

---

## 3. Limitations — the reason for the qualified status

### 3.1 Built but not switched on

| # | Item | Why |
|---|---|---|
| 1 | **Retention enforcement** | Deliberate. Edits live personal data; a spreadsheet has no rollback. Needs a reviewed dry-run first. |
| 2 | **`RAZORPAY_WEBHOOK_SECRET`** | Not set. Until it is, webhook verification falls back to the key secret and may silently reject legitimate events. |
| 3 | **New sheet tabs** | `Privacy Requests`, `Grievances`, `Refunds`, `Payment Events` are created on first write. Run `npm run sheets:bootstrap`. |
| 4 | **CSP enforcement** | Report-only by design until violations are observed. |

### 3.2 Blocked on business action

| # | Item |
|---|---|
| 5 | Vendor DPAs — mechanisms researched and documented; none verified in-account |
| 6 | Google Sheets hardening — sharing audit, MFA, splitting sensitive tabs |
| 7 | No backup grievance officer — SLA softened to 2 business days as the honest alternative |
| 8 | No backup restoration test |
| 9 | Email authentication unverified |
| 10 | WAF rate limiting not configured |

### 3.3 Needs legal verification

CERT-In current directions · applicant retention minimum · Razorpay merchant processing terms · DPDP restricted territories · Significant Data Fiduciary thresholds · Lucknow forum · EU/UK scope · whether under-18s actually register.

### 3.4 The one that may have no clean answer

**If the CRM spreadsheet lives in a consumer Google account**, the Cloud DPA may not be available at all — consumer accounts are generally not covered by business data-processing terms. Options are: move it into Workspace/Cloud, migrate to D1, or record it as an accepted risk with counsel. **Check this before marking PRIV-06 resolved.**

---

## 4. Gate status

| Gate | Status | Blocking |
|---|---|---|
| **1 — Phase 2 closure** | **NOT PASSED** | Dry-run, tab creation, DPAs, Sheets hardening (grievance continuity: closed) |
| **2 — Event & payment** | **NOT PASSED** | Payment/webhook end-to-end evidence |
| **3 — Security** | **NOT PASSED** | WAF, backup test, access review, email check |
| **4 — Production readiness** | **NOT PASSED** | Depends on 1–3 |

**No gate is marked passed that has not passed.** Every blocker requires production credentials, an account action or a business decision — none is a code gap.

---

## 5. Answers to the questions this programme had to answer

**What was implemented?** 18 policy pages with versioning; consent management with deny-by-default and real gating; a retention and anonymisation engine; DSR, grievance and refund intake with full lifecycles; a payment audit trail; PII log redaction; security headers and CSP; self-hosted fonts; SBOM, dependency and secret scanning; and an 11-section automated compliance suite.

**What was verified?** Everything in §1 and §2, by automated check where possible and by reading the code where not.

**What remains unresolved?** §3 — ten operational items and eight legal ones.

**What depends on counsel?** §3.3.

**What depends on the business?** §3.2 — no amount of engineering produces a signed DPA or a second grievance officer.

**What is technically complete?** Every control in the master control matrix marked `IMPLEMENTED` — 45 of 73.

**What evidence proves each control?** `master-control-matrix.md` maps each to its test and artefact; `evidence-index.md` lists what exists and what is still missing.

**What should be monitored?** Per release: the automated suite. Monthly: dependencies, secrets, processor changes. Quarterly: access, retention, backups, the full matrix.

---

## 6. Three defects this programme found

Worth recording, because they are the argument for doing this work rather than writing documents:

1. **The privacy policy described a product that did not exist** — LinkedIn OAuth, user accounts, credentials, none of it implemented, while omitting Google Sheets, IP storage, Razorpay and Resend entirely.
2. **The webhook verified signatures with the wrong secret.** Razorpay signs with a dedicated webhook secret; the code used the API key secret. Where they differ, every legitimate webhook fails — silently, because a rejected webhook is indistinguishable from one that never arrived.
3. **The contact page published an unverified office location** and pinned map coordinates that did not match the only address on the registration certificate.

None would have been caught by a checklist. All three came from reconciling published claims against the code.

---

## 7. What happens next

**Before the next paid event:** items 1–3 in §3.1, plus the DPAs.

**Before claiming any gate has passed:** generate the evidence in `evidence-index.md` §4. The tooling exists; it needs credentials.

**Phase 6 candidates, in dependency order:** migrate PII off Sheets to D1 (the structural fix behind RBAC, audit trail, safe hard deletion and automated DSR lookup) · enforce the CSP · WAF rate limiting · durable log export · independent accessibility audit · verifiable parental consent ahead of **13 May 2027** · AI governance the moment any product processes real customer data.
