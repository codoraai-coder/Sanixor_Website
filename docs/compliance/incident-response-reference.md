# Incident Response Reference

**Prepared:** 2026-09-23 · **Owner:** Rishabh Tripathi, Grievance Officer
**Status:** Reference procedure. **Not yet exercised** — no tabletop has been run.

> **Two figures below are unverified.** CERT-In is widely reported to require incident reporting within **6 hours** and retention of ICT logs for **180 days** within India. These were not confirmed against the primary source in this phase. **Verify at [cert-in.org.in](https://www.cert-in.org.in/) before relying on them.** They are recorded here so the procedure exists, not as settled law.

---

## 1. First 60 minutes

1. **Contain.** Stop the bleeding before investigating. Rotate the exposed credential, revoke the sharing link, take the endpoint offline.
2. **Preserve.** Do not delete logs or overwrite evidence. Capture `wrangler tail` output and any relevant sheet state.
3. **Record the clock.** Note the time the incident was *noticed* — reporting deadlines run from awareness, not from occurrence.
4. **Assess scope.** Which data, whose data, how many people, still ongoing?

---

## 2. Notification obligations

| Who | When | What |
|---|---|---|
| **CERT-In** | Within **6 hours** of noticing, for in-scope incidents | Nature, timing, affected systems, action taken — *verify current directions* |
| **Data Protection Board of India** | As required by DPDP Act s.8(6) | Breach particulars |
| **Affected Data Principals** | As required by DPDP Act s.8(6) | What happened, what data, what we did, what they can do |
| **Razorpay** | Immediately, if payment-related | Order/payment identifiers affected |
| **Google / Cloudflare / Resend** | If the incident involves their platform | Support case |

---

## 3. Credential exposure — the known-live scenario

A Google service-account key has been revoked before, and the symptom is specific and misleading:

- Forms return **503 "Could not save your submission"**.
- The backend log shows `GoogleApiError: Google token exchange failed (HTTP 400)`.
- `/health` still reports `googleSheets: "configured"` — because it only checks that env vars exist, **not that they authenticate**.

**Diagnosis.** Hit Google's token endpoint directly with the key. `invalid_grant / Invalid JWT Signature` means the key no longer matches the service account — rotated, or auto-revoked by Google after detecting exposure.

**Response.**
1. Generate a fresh JSON key for the service account in Google Cloud.
2. `wrangler secret put GOOGLE_PRIVATE_KEY --name sanixorbackend` (single line, literal `\n`) and `GOOGLE_CLIENT_EMAIL`.
3. Update local `.dev.vars` and `.env` (both gitignored).
4. Verify with a POST to `/api/contact` — expect `201 {persisted:true}`.
5. If the old key was exposed in a commit, treat it as a credential breach: assess what it could have reached, and rotate anything else in the same blast radius.

> **Target `sanixorbackend` (no hyphen).** A hyphenated orphan Worker exists; setting secrets there does nothing to production. Verify against `api.sanixor.space/health`, never the workers.dev URL.

---

## 4. Spreadsheet over-sharing

The highest-likelihood incident for the current architecture: the CRM sheet is shared too widely, or link-sharing is switched on.

1. Revoke the sharing immediately.
2. Check Google Workspace audit logs for who accessed or exported it, and when.
3. Treat any export as a disclosure of every field in that tab — including Hiring and AgentVerse.
4. Assess notification obligations against §2.
5. Re-run the access audit in [`google-sheets-hardening.md`](./google-sheets-hardening.md).

---

## 5. Payment incident

Card data never reaches our servers — Razorpay's hosted checkout keeps it out of scope entirely. A payment incident is therefore about **order metadata**, not card data. Say so accurately in any notification: overstating a breach is its own harm.

Signature verification and server-side order re-confirmation mean a forged payment callback should not finalise a registration. If one did, that is a code defect — capture the payload and treat it as a security incident.

---

## 6. After the incident

1. Write it up: timeline, root cause, what was affected, what changed.
2. Record it in the `Logs` tab and in this repository.
3. Fix the root cause, not only the symptom.
4. Update this document with what was actually learned.

---

## 7. Gaps, stated plainly

| Gap | Consequence |
|---|---|
| **CERT-In figures unverified** | The 6-hour and 180-day numbers may be wrong. Verify before an incident, not during one. |
| **Log retention is platform default** | Likely short of a 180-day requirement. Durable log export is not configured. |
| **No tabletop exercise** | This procedure has never been rehearsed. |
| **Single responder** | One named owner, no documented deputy. |
| **No alerting** | Nothing pages anyone. Discovery depends on someone noticing. |
| **No notification templates** | Drafting under time pressure is how deadlines get missed. |
