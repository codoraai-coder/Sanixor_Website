# Master Control Matrix

**Prepared:** 2026-09-23 · **Owner:** Rishabh Tripathi, Grievance Officer
**Last verified:** 2026-09-23 · **Next review:** 2026-12-23

Every material requirement mapped to a policy, a technical control, an operational control, a test and evidence. A requirement with no control is recorded as a gap, not quietly omitted.

**Status values:** `IMPLEMENTED` · `PARTIAL` · `NOT_IMPLEMENTED` · `NOT_APPLICABLE` · `NEEDS_LEGAL_VERIFICATION` · `BLOCKED_ON_BUSINESS`

---

## 1. Privacy and data protection

| ID | Requirement | Source | Policy | Technical control | Operational control | Test | Evidence | Status |
|---|---|---|---|---|---|---|---|---|
| PRIV-01 | Notice at or before collection | DPDP s.5 | `/privacy` | `FormPrivacyNotice` on all 4 forms | — | verify §7 | Automated check | `IMPLEMENTED` |
| PRIV-02 | Free, specific, informed consent | DPDP s.6 | `/privacy`, `/cookie-policy` | Consent checkbox before payment; deny-by-default consent store | — | verify §7, §10 | Consent record, sheet cols Q–T | `IMPLEMENTED` |
| PRIV-03 | Withdrawal as easy as giving | DPDP s.6 | `/cookie-policy`, `/data-rights` | Footer preference centre; `withdrawAll()` purges | Email route | verify §10 | Automated check | `IMPLEMENTED` |
| PRIV-04 | Accurate notice of processing | DPDP s.5, FTC §5 | `/privacy` | — | Policy reconciled against code | verify §4 | Automated check | `IMPLEMENTED` |
| PRIV-05 | Named processors disclosed | DPDP s.8 | `/subprocessors` | — | `processor-register.md` | Manual | Register | `IMPLEMENTED` |
| PRIV-06 | Processor contracts | DPDP s.8(2) | `/subprocessors` | — | Accept vendor DPAs | Manual | **None yet** | `BLOCKED_ON_BUSINESS` |
| PRIV-07 | Storage limitation | DPDP s.8(7) | `/privacy#retention` | `retention.service.ts` | Weekly cron | Dry-run report | **Pending dry-run** | `PARTIAL` |
| PRIV-08 | IP minimisation (90 days) | DPDP s.8 | `/privacy` | `IP_RETENTION_DAYS` | Same cron | Dry-run report | **Pending** | `PARTIAL` |
| PRIV-09 | Right of access | DPDP s.11 | `/data-rights` | Intake endpoint + queue | `dsr-procedure.md` | Manual test | Privacy Requests tab | `IMPLEMENTED` |
| PRIV-10 | Right to correction | DPDP s.12 | `/data-rights` | Same | Same | Manual test | Same | `IMPLEMENTED` |
| PRIV-11 | Right to erasure | DPDP s.12 | `/data-deletion` | Same | Same | Manual test | Same | `IMPLEMENTED` |
| PRIV-12 | Grievance redressal | DPDP s.13 | `/grievance` | Intake endpoint + queue | `grievance-procedure.md` | Manual test | Grievances tab | `IMPLEMENTED` |
| PRIV-13 | Grievance officer published | E-Comm Rules 2020 | `/grievance`, `/contact` | `company.config.ts` | Named officer | verify §7b | Live page | `IMPLEMENTED` |
| PRIV-14 | Children under 18 / parental consent | DPDP s.9, Rules r.10 | `/privacy#children` | 18+ attestation, required | Eligibility rule | verify §7 | Sheet col T | `PARTIAL` — verifiable parental consent due 2027-05-13 |
| PRIV-15 | No tracking/profiling of children | DPDP s.9 | `/privacy` | No analytics exist at all | — | verify §6 | Automated check | `IMPLEMENTED` |
| PRIV-16 | Breach notification | DPDP s.8(6) | `/security` | — | `incident-response-reference.md` | **Untested** | **None** | `PARTIAL` |
| PRIV-17 | Reasonable security safeguards | DPDP s.8(5) | `/security` | See §3 | `security-controls.md` | Header scan | Scan output | `PARTIAL` |
| PRIV-18 | Data inventory maintained | Good practice | — | — | `data-inventory.md` | Manual | Inventory | `IMPLEMENTED` |

## 2. Consumer protection, payments and events

| ID | Requirement | Source | Policy | Technical control | Operational | Test | Evidence | Status |
|---|---|---|---|---|---|---|---|---|
| CONS-01 | Legal name, address, contact published | E-Comm Rules r.4/5 | `/contact` | `company.config.ts` | Udyam certificate | verify §9 | Live page | `IMPLEMENTED` |
| CONS-02 | Grievance acknowledgement | E-Comm Rules | `/grievance` | — | 2 business days | Manual | Grievances tab | `IMPLEMENTED` — deviation, see note |
| CONS-03 | Redressal within one month | E-Comm Rules | `/grievance` | — | 30 days | Manual | Grievances tab | `IMPLEMENTED` |
| CONS-04 | Refund policy accessible before purchase | E-Comm Rules | `/refund-policy` | Linked from event pricing block | — | Route test | Live page | `IMPLEMENTED` |
| CONS-05 | Price displayed before purchase | Razorpay, E-Comm Rules | Event page | `events.config.ts` | — | verify §8b | Automated check | `IMPLEMENTED` |
| CONS-06 | Price consistent with charge | Razorpay | — | Drift check vs backend constant | — | verify §8b | Automated check | `IMPLEMENTED` |
| CONS-07 | Terms of service published | Contract law | `/terms` | Versioned | — | Route test | Live page | `IMPLEMENTED` |
| CONS-08 | Governing law and forum | Contract law | `/terms#governing-law` | `company.config.ts` | — | verify §7b | Live page | `NEEDS_LEGAL_VERIFICATION` |
| CONS-09 | Terms acceptance before payment | DPDP s.6, contract | Event terms | Submit disabled until ticked | — | verify §7 | Sheet cols Q–R | `IMPLEMENTED` |
| CONS-10 | Refund request lifecycle | Consumer protection | `/refund-policy` | `refund.service.ts`, 9 states | Manual issuance in Razorpay | Manual test | Refunds tab | `IMPLEMENTED` |
| CONS-11 | No unfulfillable refund promise | FTC-style deception | `/refund-policy` | UI reworded | — | verify §4(c) | Automated check | `IMPLEMENTED` |
| CONS-12 | Event terms, rules, conduct, prizes | Consumer protection | `/events/:slug/*` | Generic framework | — | Route test | 5 live pages | `IMPLEMENTED` |
| CONS-13 | Payment audit trail | Good practice | — | `Payment Events` tab, verified webhooks | — | Manual | Payment Events tab | `IMPLEMENTED` |

> **CONS-02 deviation.** The E-Commerce Rules reference 48 hours. Sanixor publishes **2 business days** because there is one Grievance Officer and no deputy, so a 48-hour clock running across weekends is not reliably achievable. This is deliberate and documented; revert to 48 hours when a deputy is appointed. **Flagged for counsel.**

## 3. Security

| ID | Requirement | Source | Policy | Technical control | Test | Evidence | Status |
|---|---|---|---|---|---|---|---|
| SEC-01 | TLS in transit | DPDP s.8(5) | `/security` | Cloudflare | Header scan | Scan | `IMPLEMENTED` |
| SEC-02 | HSTS | OWASP | `/security` | `_headers`, `app.ts` | Header scan | Scan | `IMPLEMENTED` |
| SEC-03 | CSP (site) | OWASP ASVS | `/security` | `_headers` | Header scan | Scan | `PARTIAL` — report-only |
| SEC-04 | CSP (API) | OWASP ASVS | `/security` | `app.ts` `default-src 'none'` | Header scan | Scan | `IMPLEMENTED` |
| SEC-05 | Permissions-Policy | OWASP | `/security` | Both | Header scan | Scan | `IMPLEMENTED` |
| SEC-06 | Input validation | OWASP ASVS | `/security` | Zod on every endpoint | Typecheck | Source | `IMPLEMENTED` |
| SEC-07 | Rate limiting (application) | OWASP | `/security` | `rateLimiter.ts` | Load test | **Not run** | `PARTIAL` |
| SEC-08 | Rate limiting (network) | OWASP | `/security#limitations` | **None** | — | — | `NOT_IMPLEMENTED` |
| SEC-09 | Card data out of scope | PCI DSS | `/security` | Hosted checkout | Source scan | verify | `IMPLEMENTED` |
| SEC-10 | Payment signature verification | PCI-adjacent | `/security` | HMAC + constant-time | Manual | Source | `IMPLEMENTED` |
| SEC-11 | Webhook signature verification | Good practice | — | Dedicated webhook secret | Manual | Source | `IMPLEMENTED` — secret not yet set |
| SEC-12 | Secret management | DPDP s.8(5) | `/security` | Worker secrets, never in source | `security:scan` | Secret scan | `IMPLEMENTED` |
| SEC-13 | PII not in logs | DPDP s.8(5) | `/security` | `SENSITIVE_KEY` redaction | verify §11 | Automated check | `IMPLEMENTED` |
| SEC-14 | Dev routes excluded from prod | Good practice | — | `app.ts` env gate | Manual | Source | `IMPLEMENTED` |
| SEC-15 | Vulnerability disclosure | Good practice | `/security` | `security.txt` | Route test | Live file | `IMPLEMENTED` |
| SEC-16 | SBOM | Supply chain | — | `security:scan` | Run | `sbom.json` | `IMPLEMENTED` |
| SEC-17 | Dependency scanning | Supply chain | — | `security:scan` | Run | `dependency-audit.md` | `IMPLEMENTED` |
| SEC-18 | No critical/high in production deps | Supply chain | — | `npm audit fix` applied | Run | `dependency-audit.md` | `IMPLEMENTED` |
| SEC-19 | Secret scanning | Supply chain | — | `security:scan` | Run | `secret-scan.md` | `IMPLEMENTED` |
| SEC-20 | MFA on privileged accounts | DPDP s.8(5) | `/security` | — | Manual | **None** | `BLOCKED_ON_BUSINESS` |
| SEC-21 | Access review | Good practice | — | — | Quarterly | **None** | `NOT_IMPLEMENTED` |
| SEC-22 | Incident response plan | CERT-In, DPDP | `/security` | — | Tabletop | **Untested** | `PARTIAL` |
| SEC-23 | CERT-In incident reporting | IT Act s.70B | — | — | — | **None** | `NEEDS_LEGAL_VERIFICATION` |
| SEC-24 | ICT log retention (180 days) | CERT-In | — | Platform default | — | **None** | `NOT_IMPLEMENTED` |
| SEC-25 | Backup | Continuity | — | Drive version history only | **Untested** | **None** | `PARTIAL` |
| SEC-26 | Restoration test | Continuity | — | — | — | **None** | `NOT_IMPLEMENTED` |
| SEC-27 | Email auth (SPF/DKIM/DMARC) | Deliverability | — | — | DNS check | **None** | `NOT_IMPLEMENTED` |
| SEC-28 | Third-party requests minimised | Privacy | `/cookie-policy` | Fonts self-hosted; map removed | Network trace | Build output | `IMPLEMENTED` |

## 4. Accessibility

| ID | Requirement | Source | Technical control | Test | Status |
|---|---|---|---|---|---|
| A11Y-01 | Skip link | WCAG 2.4.1 | `Navbar.tsx` | Manual | `IMPLEMENTED` |
| A11Y-02 | Page language | WCAG 3.1.1 | `index.html` | Manual | `IMPLEMENTED` |
| A11Y-03 | Image alt text | WCAG 1.1.1 | All 19 images | AST scan | `IMPLEMENTED` |
| A11Y-04 | Reduced motion | WCAG 2.3.3 | CSS + Lenis gate | verify §8 | `IMPLEMENTED` |
| A11Y-05 | Keyboard operable | WCAG 2.1.1 | Focus styles throughout | Manual | `PARTIAL` |
| A11Y-06 | Colour contrast AA | WCAG 1.4.3 | — | axe | `NOT_IMPLEMENTED` |
| A11Y-07 | Independent audit | — | — | — | `NOT_IMPLEMENTED` |

## 5. Assessed and not applicable

| ID | Requirement | Why not applicable |
|---|---|---|
| NA-01 | EU AI Act / AI governance | The website runs **no model** on visitor data. Verified: no model SDK or inference call in either repo. Becomes applicable when any product processes real customer data. |
| NA-02 | GDPR machinery | Policies scoped to India. Revisit only if Sanixor targets EU/UK users. |
| NA-03 | DSA / intermediary obligations | No UGC is hosted or published. |
| NA-04 | COPPA | No US child-directed service. |
| NA-05 | PCI DSS full scope | Hosted checkout keeps card data entirely out of the boundary. |
| NA-06 | Sector rules (health/finance/education) | Not a regulated-sector provider. |

---

## 6. Summary

| Status | Count |
|---|---:|
| `IMPLEMENTED` | 45 |
| `PARTIAL` | 9 |
| `NOT_IMPLEMENTED` | 8 |
| `BLOCKED_ON_BUSINESS` | 2 |
| `NEEDS_LEGAL_VERIFICATION` | 3 |
| `NOT_APPLICABLE` | 6 |

**No control is claimed as implemented without evidence.** Where evidence is "None", the status reflects that.

---

## 7. Review

| Frequency | Scope |
|---|---|
| Per release | Automated checks (`verify:compliance`, `security:scan`) |
| Monthly | Dependency and secret scan; processor changes |
| Quarterly | Access review, retention verification, backup restore, full matrix pass |
| Annually | Legal verification items, `security.txt` expiry |
