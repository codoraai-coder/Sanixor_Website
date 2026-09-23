# Data Inventory

**Prepared:** 2026-09-23 · **Owner:** Rishabh Tripathi, Grievance Officer
**Derived from:** backend Zod validators, `constants/index.ts` sheet headers, the service layer, and a scan of browser storage and outbound requests. Not from the policy text.

Every personal-data element Sanixor AI holds, where it came from, where it lives, how long it stays and how it is disposed of.

> **Maintenance rule:** adding a form field, a sheet column or an outbound destination means updating this file, the Privacy Policy collection table, and `consent.config.ts` where browser storage is involved. `npm run verify:compliance` fails if the storage registry and the code disagree.

---

## 1. Collection surfaces

| Surface | Route | Endpoint | Basis |
|---|---|---|---|
| Contact form | `/contact` | `POST /api/contact` | Consent (notice at collection) |
| Book a demo | modal, several pages | `POST /api/demo` | Consent (notice at collection) |
| Careers application | `/hiring` | `POST /api/hiring` | Consent (notice at collection) |
| Event registration | AgentVerse modal | `POST /api/payments/create-order` | Consent (explicit acceptance) + performance of the registration |
| Privacy request | `/data-rights`, `/data-deletion` | `POST /api/privacy-request` | Handling your rights request |
| Grievance | `/grievance` | `POST /api/grievance` | Handling your complaint |

---

## 2. Field-level inventory

### 2.1 Contact form → `Contact` tab

| Field | Category | Required | Storage | Processor | Retention | Disposal |
|---|---|:---:|---|---|---|---|
| Name | Identity | Yes | Sheets col B | Google | 24 months | Anonymise |
| Email | Contact | Yes | col C | Google | 24 months | Anonymise |
| Phone | Contact | No | col D | Google | 24 months | Anonymise |
| Company | Organisation | No | col E | Google | 24 months | Anonymise |
| Topic | Non-personal | Yes | col F | Google | 24 months | Retained (not personal) |
| Message | Free text | Yes | col G | Google | 24 months | Anonymise |
| IP address | Technical | Auto | col H | Google | **90 days** | Anonymise |

### 2.2 Book a demo → `Demo` tab

| Field | Category | Required | Storage | Retention | Disposal |
|---|---|:---:|---|---|---|
| Name | Identity | Yes | col B | 24 months | Anonymise |
| Business email | Contact | Yes | col C | 24 months | Anonymise |
| Organisation | Organisation | Yes | col D | 24 months | Anonymise |
| Product | Non-personal | Yes | col E | 24 months | Retained |
| Message | Free text | No | col F | 24 months | Anonymise |
| IP address | Technical | Auto | col G | **90 days** | Anonymise |

### 2.3 Careers application → `Hiring` tab

| Field | Category | Required | Storage | Retention | Disposal |
|---|---|:---:|---|---|---|
| Name | Identity | Yes | col B | 12 months | Anonymise |
| Email | Contact | Yes | col C | 12 months | Anonymise |
| Role applied for | Employment | Yes | col D | 12 months | Retained (not personal alone) |
| LinkedIn URL | Employment | No | col E | 12 months | Anonymise |
| Portfolio / CV URL | Employment | No | col F | 12 months | Anonymise |
| Message | Free text | No | col G | 12 months | Anonymise |
| IP address | Technical | Auto | col H | **90 days** | Anonymise |

> **Open item.** The 12-month period is taken from the published policy. Some regimes set a minimum retention for applicant records to cover discrimination-claim windows. **Flagged for legal verification** — if a minimum applies, this period must lengthen, not shorten.

### 2.4 Event registration → `AgentVerse` tab

| Field | Category | Required | Storage | Retention | Disposal |
|---|---|:---:|---|---|---|
| User type | Non-personal | Yes | col B | 12 months post-event | Retained |
| Name | Identity | Yes | col C | 12 months | Anonymise |
| Email | Contact | Yes | col D | 12 months | Anonymise |
| Phone | Contact | Yes | col E | 12 months | Anonymise |
| Roll number | Education | Student only | col F | 12 months | Anonymise |
| College | Education | Student only | col G | 12 months | Anonymise |
| Experience (years) | Employment | Professional only | col H | 12 months | Retained (not identifying alone) |
| Organisation | Organisation | Professional only | col I | 12 months | Anonymise |
| IP address | Technical | Auto | col K | **90 days** | Anonymise |
| Registration ID | Transaction | Generated | col L | **Legal hold** | Never auto-cleared |
| Payment ID | Transaction | Auto | col M | **Legal hold** | Never auto-cleared |
| Order ID | Transaction | Auto | col N | **Legal hold** | Never auto-cleared |
| Amount (INR) | Transaction | Auto | col O | **Legal hold** | Never auto-cleared |
| Payment status | Transaction | Auto | col P | **Legal hold** | Never auto-cleared |
| Terms version | Consent proof | Auto | col Q | **Legal hold** | Never auto-cleared |
| Privacy version | Consent proof | Auto | col R | **Legal hold** | Never auto-cleared |
| Consent timestamp | Consent proof | Auto | col S | **Legal hold** | Never auto-cleared |
| Age confirmed (18+) | Consent proof | Auto | col T | **Legal hold** | Never auto-cleared |

**Why columns L–T are protected.** L–P are financial records retained for tax and accounting. Q–T are the proof that a specific person accepted a specific version of the terms at a specific time — deleting them would destroy the evidence that consent was validly obtained, which is the opposite of a privacy improvement.

### 2.5 Privacy requests → `Privacy Requests` tab

Timestamp · Request ID · Request type · Name · Email · Details · Verification status · Assigned owner · Status · Action taken · Completed at · Notes · IP

Retained as the audit trail of rights handling. **Not** auto-anonymised — a record that we honoured a deletion request is itself the evidence of compliance.

### 2.6 Grievances → `Grievances` tab

Timestamp · Grievance ID · Category · Name · Email · Reference · Description · Assigned owner · Status · Response · Acknowledged at · Resolved at · IP

Same rationale: retained as the redressal audit trail.

---

## 3. Browser storage

Authoritative registry: [`src/config/consent.config.ts`](../../src/config/consent.config.ts).

| Key | Category | Purpose | Duration | Consent |
|---|---|---|---|---|
| `sanixor_consent` | Necessary | Records the visitor's own consent choice | Until cleared | Cannot be declined — it *is* the record of the decision |
| `sanixor-theme` | Functional | Remembers the chosen colour theme | Until cleared | **Optional** — gated |
| `sanixor_demo_booked` | Functional | Remembers a demo was booked | Until cleared | **Optional** — gated |

**Cookies set: none.** The only `document.cookie` write in the tree lives in `ui/sidebar.tsx`, which is imported nowhere.

**sessionStorage: none.**

---

## 4. Outbound data flows

| Destination | What it receives | Why | Location |
|---|---|---|---|
| **Google Sheets** | Every form submission, including IP | System of record | Global |
| **Cloudflare** | IP, request metadata; all traffic transits | Hosting, CDN, TLS, attack protection | Global edge |
| **Razorpay** | Name, email, phone, registration details on the order | Payment processing | India |
| **Resend** | Recipient name, email, message body | Transactional email | Global |
| **Google Fonts** | Visitor IP (browser-initiated) | Typefaces | Global |

**Removed in Phase 2:** the OpenStreetMap iframe on the contact page. It sent every visitor's IP to a third party on page load and pinned a location that could not be verified against the registered address.

---

## 5. Logs

| Log | Contains | Retention | Notes |
|---|---|---|---|
| Cloudflare Workers observability | Request ID, method, path, status, duration | Platform default | **PII is redacted at source** — see `config/logger.ts` |
| `Logs` sheet tab | Timestamp, level, context, message | Not auto-cleared | Application events, not ICT logs |

The logger redacts both secrets and personal-data keys (`email`, `name`, `phone`, `roll_no`, `address`, `message`, `ip`, card fields) at any nesting depth. Correlators that carry no personal data — `requestId`, `orderId`, `registrationId`, `userType` — are deliberately **not** redacted, because they are what makes an incident traceable.

---

## 6. What is NOT collected

Recorded explicitly so a future policy draft cannot quietly assume otherwise:

- No account credentials, passwords or authentication sessions — there is no login.
- No LinkedIn or other OAuth tokens — there is no social sign-in.
- No card numbers, CVV or expiry — Razorpay's hosted checkout keeps these off our servers entirely.
- No analytics, advertising or behavioural profiles.
- No AI or machine-learning processing of any submission.
- No special-category data (health, biometric, religion, caste, sexual orientation).
- No location data beyond what an IP address implies.

---

## 7. Cross-store lookup

To locate one person's data, search by **email address** across: `Contact`, `Demo`, `Hiring`, `AgentVerse`, `Privacy Requests`, `Grievances`. Secondary identifiers: phone, Registration ID (`AV2-…`), Razorpay Payment/Order ID.

This is currently a **manual** search by an authorised operator. It is deliberately not exposed as an endpoint: a public lookup keyed on email address would let anyone enumerate a stranger's records. See [`dsr-procedure.md`](./dsr-procedure.md).
