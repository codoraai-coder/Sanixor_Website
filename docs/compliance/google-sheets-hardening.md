# Google Sheets Hardening

**Prepared:** 2026-09-23 · **Owner:** Rishabh Tripathi, Grievance Officer

The "Sanixor CRM" spreadsheet is the system of record for every piece of personal data the site collects — including job applications and student registrations. It is a legitimate MVP datastore, and it is also the single largest structural risk in the current architecture.

> **These are operational actions, not code changes.** Nothing in this file is enforced by the build, so it needs a human to do it and to record that it was done.

---

## 1. What a spreadsheet cannot give you

| Missing | Consequence |
|---|---|
| Role-based access control | Access is whole-sheet, per Google account. Anyone who can read the Hiring tab can read every applicant's details. |
| Audit trail of reads | No record of who viewed or exported what, unless Workspace audit logging is on. |
| Resistance to re-sharing | One "anyone with the link" misclick exposes everything, permanently and silently. |
| Field-level encryption | Everything is plaintext to anyone with access. |
| Separation by sensitivity | Low-value demo leads sit beside job applications and student records. |

The sheet is only as secure as the least-secure Google account it is shared with.

---

## 2. Short-term checklist

| # | Action | Done | Evidence |
|---|---|:---:|---|
| 1 | Export the current sharing list; remove everyone who does not need access | ☐ | Sharing-permission export |
| 2 | Confirm link-sharing is **off** (not "anyone with the link") | ☐ | Screenshot |
| 3 | Enforce MFA on every account with access | ☐ | Workspace security report |
| 4 | Enable Workspace audit logging | ☐ | Audit-log sample |
| 5 | Move **Hiring** and **AgentVerse** into a separately-shared file with a narrower list | ☐ | New file + sharing list |
| 6 | Confirm the service account holds the narrowest Sheets scope that works | ☐ | IAM screenshot |
| 7 | Document who owns access approval | ☐ | This file, §4 |
| 8 | Document how exports and local copies are handled | ☐ | This file, §5 |
| 9 | Confirm no copy of the sheet is shared outside the organisation | ☐ | Sharing review |

---

## 3. Why Hiring and AgentVerse first

**Hiring** holds employment data — names, emails, LinkedIn and CV links, and free-text cover notes from people who applied for a job and have no ongoing relationship with the company. Exposure is career-affecting.

**AgentVerse** holds student data — names, phone numbers, roll numbers and colleges — for a cohort that may include people under 18.

Both are materially more sensitive than a demo lead, and neither needs to be visible to everyone who looks at the CRM.

---

## 4. Access ownership

| Role | Who | Approves |
|---|---|---|
| Data owner | Rishabh Tripathi, Grievance Officer | All access grants |
| Reviewer | — | **Designate a second person.** A single owner means no review and no cover. |

Review the access list quarterly. Record the review date here.

---

## 5. Exports and local copies

A downloaded CSV is a full, unprotected copy of everything in that tab, outside every control above.

- Do not export unless there is a specific need.
- Do not email exports.
- Delete local copies when the task is finished.
- An export that leaves a managed device is a disclosure — treat it as an incident.

---

## 6. Long-term: migrate to D1

The structural fix is a real datastore with per-record access control and a built-in audit trail. Cloudflare D1 sits on the account already.

**What it would close:** RBAC, audit trail, safe hard deletion (no row-index shifting), field-level control, and the ability to automate DSR lookups safely.

**Sequence:** schema from `SHEET_HEADERS` → dual-write → backfill → cut reads over → retire the sheet.

Until then, the Security Policy states publicly that records are held in a spreadsheet rather than a database with per-record access control. That disclosure is deliberate and should stay until it is no longer true.
