# Backup and Recovery

**Prepared:** 2026-09-23 · **Owner:** Rishabh Tripathi, Grievance Officer
**Status:** Procedure defined. **No restoration test has been performed.**

> A backup that has never been restored is a hypothesis, not a backup. Until §5 is completed and dated, nothing here should be relied on in an incident.

---

## 1. Critical data

| Asset | Where it lives | Loss impact | Recovery source |
|---|---|---|---|
| **Sanixor CRM spreadsheet** — all form submissions, registrations, consent proof, DSR and grievance records | Google Sheets | **Severe.** This is the only copy of every registration and every consent record. | Google Drive version history / Trash |
| **Payment records** | Razorpay dashboard | Low — Razorpay is the system of record | Razorpay |
| **Source code** | GitHub, both repos | Low — distributed across clones | GitHub |
| **Worker secrets** | Cloudflare | **Severe if lost** — they are write-only and cannot be read back | Regenerate at each provider |
| **Deployed Workers** | Cloudflare | Low — redeployable from source | `wrangler deploy` |
| **Email records** | Resend | Low | Resend retention |

---

## 2. The real exposure

**Worker secrets cannot be read back.** `wrangler secret put` is write-only. If the Cloudflare account is lost, every secret must be regenerated at its origin — a new Google service-account key, new Razorpay keys, a new Resend key.

**Keep an offline record of which secrets exist** (names only, never values) so recovery is a checklist rather than an archaeology exercise. The list is in `security-controls.md` §6.

**The spreadsheet has no independent backup.** Google Drive version history is a platform feature, not a backup under our control — it is subject to Google's retention and to anyone with edit access. There is currently no export to storage we control.

---

## 3. Current backup position, stated plainly

| Asset | Backup | Frequency | Under our control? |
|---|---|---|---|
| Spreadsheet | Google Drive version history | Continuous (platform) | **No** |
| Spreadsheet | Independent export | **NONE** | — |
| Source | GitHub + local clones | Per push | Partly |
| Secrets | **NONE** — regenerate on loss | — | — |
| Payment data | Razorpay | Platform | No |

**This is thin.** The single most valuable dataset has no backup we own.

---

## 4. Minimum viable improvement

Before anything more elaborate:

1. **Monthly manual export.** Download the CRM spreadsheet as `.xlsx`, store it encrypted somewhere access-controlled, and record the date below.
2. **Treat each export as personal data.** It is a full unprotected copy of everything — see `google-sheets-hardening.md` §5. It is in scope for the retention schedule, and it must be deleted when superseded.
3. **Record the secret inventory offline** (names only).
4. **Verify Drive version history reaches back far enough** to be useful.

Migrating to D1 changes this picture entirely: D1 supports point-in-time recovery, which is a real backup rather than a platform convenience.

---

## 5. Restoration test — REQUIRED, NOT YET DONE

| Step | Done | Date | Notes |
|---|:---:|---|---|
| Export the spreadsheet | ☐ | | |
| Restore it to a **separate** test spreadsheet | ☐ | | Never restore over the live sheet |
| Verify row counts match | ☐ | | |
| Verify every tab is present with headers | ☐ | | |
| Verify consent columns survived | ☐ | | Q–T on AgentVerse |
| Point a local backend at the test sheet and submit a form | ☐ | | |
| Record how long the whole thing took | ☐ | | This is your real RTO |

**Until this table is filled in, the recovery position is unknown.** A restoration test is the only thing that converts a backup from an assumption into a control.

---

## 6. Recovery objectives — proposed, not yet validated

| Scenario | Proposed RTO | Proposed RPO |
|---|---|---|
| Worker deploy broken | 15 minutes | 0 — redeploy from source |
| Secret lost or revoked | 2 hours | 0 — regenerate |
| Spreadsheet rows deleted | 4 hours | Since last version-history point |
| Spreadsheet lost entirely | **Unknown** | **Unknown** — no independent backup |
| Cloudflare account lost | 1–2 days | 0 for code; secrets regenerated |

These are targets, not measurements. §5 is what turns them into numbers.

---

## 7. Business continuity

| Dependency | If it fails | Mitigation |
|---|---|---|
| Cloudflare | Site and API both down | None — single point of failure, accepted at this scale |
| Google Sheets | Submissions fail to persist | Backend degrades gracefully; email still sends. **Submissions are lost.** |
| Razorpay | No payments | Pause registration; the event page can say so |
| Resend | No confirmation emails | Sheets row is still written; resend manually |
| Grievance Officer unavailable | 2-business-day clock still runs | **No deputy.** Open item — see `grievance-procedure.md` §7 |

---

## 8. Review

Quarterly, alongside the access review. Record the date of each restoration test in §5 — an untested backup procedure that is a year old is worth less than the paper it is written on.
