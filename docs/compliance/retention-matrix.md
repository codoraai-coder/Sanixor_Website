# Retention Matrix

**Prepared:** 2026-09-23 · **Owner:** Rishabh Tripathi, Grievance Officer
**Implementation:** `Sanixor_Website_backend/src/config/retention.config.ts` and `src/services/retention.service.ts`

The machine-readable schedule and the published policy are the same schedule. If they diverge, the published policy is the promise and the config is the bug.

---

## 1. The matrix

| Data class | Period | Clock starts | Action on expiry | Basis |
|---|---|---|---|---|
| Contact enquiries | 24 months | Submission | Anonymise PII columns | Published policy |
| Demo requests | 24 months | Submission | Anonymise PII columns | Published policy |
| Job applications | 12 months | Submission | Anonymise PII columns | Published policy — **needs legal verification** |
| Event registrations | 12 months | Submission | Anonymise PII columns | Published policy |
| **IP addresses (all tabs)** | **90 days** | Submission | Clear the IP cell | Minimisation — collected for abuse prevention only |
| Payment records | **Legal hold** | — | Never auto-cleared | Tax and accounting |
| Consent proof | **Legal hold** | — | Never auto-cleared | Evidence consent was validly obtained |
| Privacy requests | Not auto-cleared | — | Manual review | Audit trail of rights handling |
| Grievances | Not auto-cleared | — | Manual review | Redressal audit trail |

---

## 2. Why anonymisation rather than row deletion

Records live in a Google Sheet. Deleting a row shifts the index of every row beneath it, and live form traffic appends concurrently. A delete-by-index job racing an append is a realistic way to destroy the wrong person's record — and a spreadsheet has no transaction to roll back.

Anonymisation overwrites named cells in place. Nothing shifts, the operation is idempotent, and re-running it is harmless. Cleared cells are written with the marker `[erased: retention]`, so the disposal is visible and auditable rather than looking like data that was never collected.

Hard deletion is deliberately **not** automated. Subject-initiated erasure runs through the DSR procedure, where a person verifies identity first.

---

## 3. Safety controls

| Control | Behaviour |
|---|---|
| **Dry-run by default** | `runRetention()` defaults to `dryRun: true`. The scheduled handler enforces only when `RETENTION_ENFORCE=true`. |
| **Blast-radius cap** | A run touching more than 500 rows aborts and reports. Guards against a wrong timestamp column wiping a tab. |
| **Protected columns** | Payment and consent columns are excluded from every clearing operation. |
| **Unparseable timestamps** | Skipped, never treated as expired. |
| **Idempotent** | Already-cleared rows are detected and skipped. |
| **Audit** | Every enforced run writes a summary to the `Logs` tab and to Workers observability. |

---

## 4. Schedule

Cloudflare Cron Trigger, weekly, Sunday 02:00 UTC (`0 2 * * 0`), configured in `wrangler.jsonc`.

---

## 5. Enabling enforcement

Enforcement is currently **off**. To turn it on:

1. Let the cron run for at least one cycle in dry-run.
2. Read the report: `npx wrangler tail sanixorbackend`.
3. Confirm the candidate rows are genuinely expired and that **no payment row is listed**.
4. Set the secret: `wrangler secret put RETENTION_ENFORCE --name sanixorbackend`, value `true`.
5. Watch the first enforced run.

To disable again, set the value to anything other than `true`.

> Target the Worker **`sanixorbackend`** (no hyphen). A hyphenated orphan Worker exists; deploying or setting secrets there does nothing to production.

---

## 6. Open items

1. **Applicant retention** — verify whether employment law sets a minimum exceeding 12 months for job applications.
2. **Backups.** Google Workspace may retain copies beyond our clearing. Until that lifecycle is understood and documented, we do not claim data is irrecoverably destroyed — only that it is cleared from the live record. The Data Deletion page is worded accordingly.
3. **Log retention** — CERT-In is commonly reported to require 180 days of ICT logs within India. Unverified; Workers observability currently uses the platform default.
