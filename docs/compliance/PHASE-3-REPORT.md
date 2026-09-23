# Phase 3 Report — Payments, Events and Consumer Protection

**Date:** 2026-09-23
**Status:** `PHASE_3_COMPLETE_WITH_BLOCKERS`

Blocked only on evidence that requires production credentials — every control is built and verified in code.

---

## 1. Refund lifecycle

Previously there was no refund machinery at all: requests arrived as unstructured email and nothing recorded what happened to them.

**Now:** a nine-state lifecycle persisted to a `Refunds` sheet tab, with a public request form at `/refund-policy`.

```
REQUESTED → UNDER_REVIEW → APPROVED → INITIATED → PROCESSING → COMPLETED
                         ↘ REJECTED   ↘ NOT_ELIGIBLE      ↘ FAILED
```

Captured per request: refund ID, status, registration/order/payment IDs, requester, reason category, preliminary eligibility, reviewer, decision notes, Razorpay refund reference, and timestamps for initiation and completion.

### The money still moves by hand — deliberately

There is **no** Razorpay refund API call anywhere in this codebase. Two reasons, both load-bearing:

1. **The published Refund Policy describes exactly this process** — a person reviews within 7 business days and initiates within 3. Adding silent automatic refunds would make the published policy wrong.
2. **Moving money from code needs an authenticated operator**, and no admin authentication exists in this product. Adding a money-moving endpoint without one would be a significant new attack surface on the payment path.

`INITIATED` is where a real refund call would slot in once admin auth exists. The lifecycle already records `Razorpay Refund ID` for it.

### Eligibility is advisory, never automatic

`assessEligibility()` classifies the stated reason against the published policy so the reviewer starts from the right place. It deliberately **auto-rejects nothing** — the Refund Policy promises that exceptional circumstances are considered on their own facts, and an automatic rejection would break that promise.

---

## 2. Payment audit trail

A `Payment Events` tab now records every **signature-verified** Razorpay webhook: event ID, type, order, payment, refund, amount, status and a summary. Written *before* processing, so an event that later fails to finalise is still visible.

The summary is a summary, not the raw payload — webhook bodies carry contact details and there is no reason to duplicate those into another tab.

## 3. Webhook defect found and fixed

`verifyWebhookSignature` used `RAZORPAY_KEY_SECRET`. Razorpay signs webhooks with the **webhook secret** configured against the webhook in the dashboard — a different value.

Where those differ, **every legitimate webhook fails verification**, and the failure is silent: a rejected webhook looks exactly like one that never arrived. For a payment system, that means a paid registration can go unfinalised with nothing obviously wrong.

Now prefers `RAZORPAY_WEBHOOK_SECRET`, falling back to the key secret with a logged warning so existing deployments keep working.

**Action required:** `wrangler secret put RAZORPAY_WEBHOOK_SECRET --name sanixorbackend`

---

## 4. Pricing consistency

| Surface | Source | Verified |
|---|---|---|
| Event page | `events.config.ts` | Live |
| Registration modal | same | Live |
| Razorpay order | `AGENTVERSE_PRICING` | Backend |
| Refund policy | references the published fee | Live |

`verify-compliance` §8b compares the frontend published price against the backend constant and **fails the build on drift**. A price that differs between what is shown and what is charged is a consumer-protection problem, so it is now impossible to introduce silently.

The fee is also shown **inside the registration modal above the consent block**, so the amount is visible at the moment of acceptance rather than first appearing on Razorpay's checkout.

---

## 5. Event governance

The generic framework built in Phase 1 covers every Phase 3 requirement. Verified coverage:

| Required | Where |
|---|---|
| Event terms | `/events/:slug/terms` |
| Privacy notice | `/events/:slug/privacy` |
| Refund rules | `/events/:slug/refund` |
| Code of conduct | `/events/:slug/code-of-conduct` |
| Competition rules | `/events/:slug/rules` |
| Judging rules, conflicts, tie-breaks | rules §judging |
| Prize rules, tax, substitution | terms §prizes |
| Submission / IP rules | rules §submissions, `/intellectual-property` |
| Eligibility, 18+ | terms §eligibility |
| Registration and payment | terms §registration |
| Cancellation, postponement, force majeure | terms §changes, `/terms#force-majeure` |
| Disqualification and appeal | rules §disqualification, `/grievance` |

Adding an event to `events.config.ts` generates all five pages. No copying.

## 6. Registration evidence recorded

Timestamp · terms version · privacy version · consent timestamp · age confirmation · payment ID · order ID · amount · payment status · registration ID.

Payment cannot bypass acceptance: the submit button is disabled until both boxes are ticked, the handler re-checks, and the backend Zod schema requires `ageConfirmed` to be literal `true`.

---

## 7. Preserved — no regressions

Razorpay hosted checkout · payment signature verification with constant-time comparison · server-side order re-confirmation · Zod validation · CORS allowlist · request-ID correlation · secret redaction. All verified by typecheck, lint, build and the compliance suite.

---

## 8. Gate 2 status

| Criterion | Status |
|---|---|
| Pricing consistency | **Pass** — automated |
| Payment integrity | **Pass** — preserved and extended |
| Refund lifecycle | **Pass** — built |
| Event terms / privacy / conduct / rules / prizes | **Pass** |
| Registration acceptance enforced | **Pass** |
| End-to-end payment evidence | **BLOCKED** — needs Razorpay test mode |
| Webhook evidence | **BLOCKED** — needs the webhook secret set |

Two blockers, both requiring production access. Tooling and process are in place; see `evidence-index.md` §4 items 6, 11, 12.
