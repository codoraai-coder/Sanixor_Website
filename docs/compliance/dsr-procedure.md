# Data-Subject Rights Procedure

**Prepared:** 2026-09-23 · **Owner:** Rishabh Tripathi, Grievance Officer
**Public entry points:** `/data-rights`, `/data-deletion`, or email `dsrishabh23@gmail.com`
**Intake:** `POST /api/privacy-request` → `Privacy Requests` sheet tab

---

## 1. The security model

**The intake endpoint records a request. It never reads back, modifies or deletes anyone's data.**

This is the load-bearing design decision. The form is public and unauthenticated. An endpoint that returned or erased records keyed on an email address would let anyone exfiltrate or destroy a stranger's data by typing their address.

So: the machine records, a human verifies, and only then does anything happen to data.

---

## 2. Workflow

| # | Stage | Who | Target | Recorded as |
|---|---|---|---|---|
| 1 | Request submitted | Requester | — | Row created, `Status = RECEIVED`, `Verification = PENDING_VERIFICATION` |
| 2 | Acknowledgement sent | Owner | **48 hours** | Note the date in `Notes` |
| 3 | Identity verified | Owner | — | `Verification = VERIFIED` or `FAILED` |
| 4 | Records located | Owner | — | Which tabs held data, in `Notes` |
| 5 | Human review | Owner | — | Decide what can and cannot be actioned |
| 6 | Action taken | Owner | — | `Action Taken` |
| 7 | Response sent | Owner | **30 days** | `Completed At`, `Status = COMPLETED` |

The request ID (`DSR-…`) is generated at intake and given to the requester. Every stage is recorded against it.

---

## 3. Identity verification

**Normal case.** The request arrives from the same email address the data was submitted with. That is sufficient for a routine request — act on it.

**Different address, or an unusually broad request.** Ask for one corroborating detail the real subject would know: a registration ID, the approximate date of contact, or which form was used. Ask for the least that resolves the doubt.

**Never** demand identity documents for a routine request. Collecting a government ID to service a privacy request creates more sensitive data than the request was about.

**If verification fails**, record `FAILED`, tell the requester why, and do not disclose or delete anything.

---

## 4. Locating records

Search by **email address** across every tab:

`Contact` · `Demo` · `Hiring` · `AgentVerse` · `Privacy Requests` · `Grievances`

Secondary identifiers: phone number, Registration ID (`AV2-…`), Razorpay Payment or Order ID.

This is a manual search by an authorised operator. It is deliberately not an endpoint — see §1.

---

## 5. Handling each request type

| Type | Action | Limits |
|---|---|---|
| **Access** | Compile a summary of what is held, the purposes, and which processors received it | Redact anything that would reveal another person's data |
| **Correction** | Edit the cell(s) in place; note the old value in `Notes` | Only for demonstrably inaccurate data |
| **Erasure** | Clear personal-data cells; write `[erased: request DSR-…]` | **Payment and consent columns are retained** — say so explicitly in the response |
| **Withdraw consent** | Stop processing for that purpose; clear marketing flags if any | Does not undo lawful past processing |
| **Nomination** | Record the nominee in `Notes` | Confirm with the requester in writing |

### What cannot be deleted, and must be said plainly

- **Payment records** (Registration ID, Payment ID, Order ID, Amount, Status) — tax and accounting.
- **Consent proof** (Terms/Privacy version, timestamp, age confirmation) — evidence consent was validly obtained.
- **Records needed for a live legal claim.**
- **The privacy request row itself** — the audit trail that we honoured the request.

Always tell the requester exactly what was retained and why. A deletion confirmation that quietly omits retained data is a misleading statement.

---

## 6. Response template

> Dear [name],
>
> Your request **[DSR-XXXXXX]** of [date] is complete.
>
> **What you asked for:** [type]
> **What we did:** [action]
> **What we retained, and why:** [payment records for tax purposes / nothing]
>
> If you are not satisfied, you can raise a grievance at https://sanixor.space/grievance, or complain to the Data Protection Board of India.
>
> Rishabh Tripathi · Grievance Officer · SANIXOR AI

---

## 7. Known limitations

1. **Manual throughout.** No tooling automates the cross-tab search. At current volumes this is manageable; it will not scale, and the 30-day promise is now public.
2. **Backups.** Google Workspace may retain copies beyond our clearing. We therefore say data is cleared from the live record, not that it is irrecoverably destroyed.
3. **Processor propagation.** Instructing Razorpay and Resend to delete their copies is a manual, per-vendor step.
4. **No acknowledgement automation.** The 48-hour acknowledgement is sent by hand. A missed acknowledgement is a broken public promise, so the Privacy Requests tab must be checked daily.
