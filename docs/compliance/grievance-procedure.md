# Grievance Redressal Procedure

**Prepared:** 2026-09-23
**Grievance Officer:** Rishabh Tripathi · `dsrishabh23@gmail.com` · +91 99848 45854
**Public entry point:** `/grievance` · **Intake:** `POST /api/grievance` → `Grievances` sheet tab

Required by the Consumer Protection (E-Commerce) Rules, 2020 and by s.13 of the DPDP Act, 2023.

---

## 1. Published commitments

These are now public promises on `/grievance`. Missing them is itself a compliance failure.

| Commitment | Target |
|---|---|
| Acknowledge receipt | **48 hours** |
| Substantive response | **30 days** |
| If longer is needed | Tell the complainant **before** day 30, with a reason and a date |

**The `Grievances` tab must be checked daily.** There is no automated acknowledgement.

---

## 2. Statuses

`RECEIVED` → `VERIFICATION_REQUIRED` → `UNDER_REVIEW` → `RESOLVED` | `REJECTED_WITH_REASON` → `CLOSED`

`REJECTED_WITH_REASON` requires the reason to be written in the `Response` column and sent to the complainant. A rejection without a stated reason is not a rejection, it is a non-answer.

---

## 3. Workflow

| # | Stage | Target | Recorded |
|---|---|---|---|
| 1 | Grievance submitted | — | Row created, `GRV-…` issued, `Status = RECEIVED` |
| 2 | Acknowledge | 48h | `Acknowledged At` |
| 3 | Assign owner | 48h | `Assigned Owner` |
| 4 | Investigate | — | Findings in `Response` |
| 5 | Decide and respond | 30d | `Response`, `Resolved At`, status |
| 6 | Close | — | `Status = CLOSED` |

---

## 4. Category routing

| Category | First step |
|---|---|
| Privacy or personal data | Cross-check against `Privacy Requests`; follow [dsr-procedure.md](./dsr-procedure.md) |
| Payment or refund | Pull the Razorpay order; check against the Refund Policy |
| Event | Check event terms, rules and code of conduct |
| Accessibility | Reproduce the barrier; log against the Accessibility Statement's known issues |
| Content or conduct | Follow the event Code of Conduct process; treat confidentially |
| Other | Owner triages |

A code-of-conduct report involving harassment is handled under the event Code of Conduct, not as an ordinary consumer grievance: the reporter's identity is not disclosed to the person complained about without their agreement.

---

## 5. Escalation we must tell people about

Every response closes by stating that if the complainant is unsatisfied they may approach:

- The **Data Protection Board of India** — personal data matters.
- The appropriate **Consumer Disputes Redressal Commission** or the National Consumer Helpline — consumer matters.
- **Razorpay** or their own bank — payment matters.

We do not require anyone to exhaust this process before going elsewhere, and we say so.

---

## 6. Response template

> Dear [name],
>
> Thank you for raising **[GRV-XXXXXX]** on [date].
>
> **What you told us:** [summary]
> **What we found:** [findings]
> **What we have done:** [action, or the reason for declining]
>
> If you are not satisfied, you may approach the Data Protection Board of India (for personal-data matters) or the appropriate Consumer Disputes Redressal Commission. You are not required to come back to us first.
>
> Rishabh Tripathi · Grievance Officer · SANIXOR AI

---

## 7. Known limitations

1. **No automated acknowledgement.** Entirely dependent on someone checking the tab daily.
2. **Single owner.** One named officer with no documented deputy. If he is unavailable, the 48-hour clock still runs — a backup should be designated.
3. **No SLA alerting.** Nothing warns that a grievance is approaching day 30.
