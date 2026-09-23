# Processor Register

**Prepared:** 2026-09-23 · **Owner:** Rishabh Tripathi, Grievance Officer
**Public version:** https://sanixor.space/subprocessors

Derived from the backend service layer, not from a vendor list. Any change in `services/` that introduces a new outbound destination for personal data must be reflected here, on the public page, and in the Privacy Policy, in the same change.

> **DPA status is recorded honestly.** Under DPDP Act s.8, Sanixor remains responsible for processing carried out on its behalf **irrespective of any agreement to the contrary** — so an unexecuted DPA does not shift liability, and claiming one exists when it does not would be a false statement.

---

## 1. Active processors

### Google LLC — Google Sheets API

| | |
|---|---|
| **Purpose** | System of record. Every form submission is written to a private spreadsheet ("Sanixor CRM"). |
| **Data categories** | Identity, contact, education, employment, organisation, free text, technical (IP), transaction references, consent proof |
| **Processing location** | Global infrastructure, including outside India |
| **Transfer basis** | DPDP Act permits transfer except to territories restricted by the Central Government; that list is monitored |
| **DPA status** | **NOT VERIFIED IN ACCOUNT** — mechanism in §2b |
| **Security** | TLS in transit; access restricted to authorised Google accounts with MFA; service account scoped to Sheets |
| **Public disclosure** | Yes — `/subprocessors` |

### Cloudflare, Inc.

| | |
|---|---|
| **Purpose** | Hosting, CDN, TLS termination, attack protection, for both the website and the API |
| **Data categories** | IP address, request metadata; all form content transits |
| **Processing location** | Global edge network |
| **DPA status** | **NOT VERIFIED IN ACCOUNT** — mechanism in §2b |
| **Security** | TLS; platform DDoS and WAF capability; observability logs with PII redacted at source |
| **Public disclosure** | Yes |

### Razorpay Software Private Limited

| | |
|---|---|
| **Purpose** | Payment processing for paid events; operates the hosted checkout |
| **Data categories** | Name, email, phone, registration details attached to the order; **card data goes directly to Razorpay and never to us** |
| **Processing location** | India |
| **DPA status** | **Merchant terms accepted at onboarding**; whether they carry adequate processing terms is unverified — §2b |
| **Security** | RBI-authorised payment aggregator; PCI-DSS scope sits with Razorpay; HMAC-SHA256 signature verification on our side with constant-time comparison |
| **Public disclosure** | Yes |

### Resend, Inc.

| | |
|---|---|
| **Purpose** | Transactional email — confirmations, tickets, replies |
| **Data categories** | Recipient name, email address, message content |
| **Processing location** | Global infrastructure, including outside India |
| **DPA status** | **NOT VERIFIED IN ACCOUNT** — mechanism in §2b |
| **Security** | TLS; API key held as a Worker secret, never in source |
| **Public disclosure** | Yes |

---

## 2. Not processors, but they receive data

### Google Fonts (Google LLC)

Serves typefaces. Receives the visitor's IP because the browser fetches the stylesheet directly. Does not process data on our behalf, so it is not a subprocessor — but it is disclosed on the Cookie Policy and the Subprocessors page because the IP transfer is real.

**Planned removal:** self-hosting the five families removes the third party entirely and typically improves load time. Tracked as engineering work.

### Removed in Phase 2 — OpenStreetMap

The contact page previously embedded an OpenStreetMap iframe, which sent every visitor's IP to a third party on page load and pinned coordinates that could not be verified against the registered address. Removed; the address is now published as plain text, which is also more accessible.

---

## 2b. Contractual mechanism — verified 2026-09-23

Researched so the register records the **actual** mechanism rather than an assumed "executed DPA". None of these is marked executed, because none has been confirmed inside the account.

| Provider | Actual mechanism | How to complete | Status |
|---|---|---|---|
| **Google** | **Cloud Data Processing Addendum (CDPA)**. Often incorporated by reference into the Cloud agreement; where it is not, it is accepted in-console. | Google Cloud Console → **IAM & Admin** → *Cloud Data Processing Addendum* → **Review and Accept**. Record the acceptance date and the accepting account. | **NOT VERIFIED IN ACCOUNT** |
| **Cloudflare** | **Cloudflare Customer DPA**, which forms part of the main agreement and takes effect when signed or otherwise agreed. | Cloudflare dashboard → account/legal settings → sign the DPA. Save the countersigned copy. | **NOT VERIFIED IN ACCOUNT** |
| **Razorpay** | **Merchant terms accepted at onboarding.** Whether those terms contain adequate processing commitments, or whether a separate addendum is needed, has not been determined. | Read the executed merchant agreement; ask Razorpay support whether a separate DPA is offered. | **TERMS ACCEPTED; PROCESSING TERMS UNVERIFIED** |
| **Resend** | **Not established.** Public research did not surface a documented DPA acceptance route. | Check the Resend dashboard legal section, or contact Resend support directly and ask for their DPA. | **UNKNOWN — MUST ASK THE VENDOR** |

### The one that may have no answer

**Sanixor accesses Google Sheets through a service account.** If that spreadsheet lives in a **consumer Google account** rather than a Google Workspace or Google Cloud organisation, the Cloud DPA may not be available at all — consumer Google accounts are generally not covered by the business data-processing terms.

If that is the case, the honest options are:

1. Move the spreadsheet into a Google Workspace or Cloud organisation that is covered, or
2. Migrate off Sheets to Cloudflare D1 (already planned), or
3. Record the position explicitly as an accepted risk with counsel.

**This must be checked before any of the above is marked resolved.** It is the single most likely reason this blocker cannot simply be clicked away.

---

## 3. Vendor change process

Before a new processor handles personal data:

1. Record it here with purpose, data categories, location.
2. Execute and file its data-processing terms.
3. Add it to `/subprocessors` and the Privacy Policy.
4. If it involves browser storage or an outbound browser request, add it to `TECHNOLOGY_REGISTRY` and decide its consent category.
5. Run `npm run verify:compliance`.

---

## 4. Open items

| # | Item | Priority |
|---|---|---|
| 1 | Execute and file DPAs with Google, Cloudflare and Resend | **High** — mostly click-through, minutes each |
| 2 | Confirm whether Razorpay's merchant terms include adequate processing terms or whether a separate addendum is needed | **High** |
| 3 | Self-host fonts to remove the Google Fonts transfer | Medium |
| 4 | Record where each vendor's own subprocessor list is published, and subscribe to change notifications | Medium |
| 5 | Confirm the restricted-territories position under DPDP for each global vendor | Medium — needs legal verification |
