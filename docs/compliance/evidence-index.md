# Evidence Index

**Prepared:** 2026-09-23 · **Owner:** Rishabh Tripathi, Grievance Officer

What evidence exists, what does not, and how to produce the missing pieces. Evidence that has not been generated is listed as **MISSING** rather than described as if it existed.

---

## 1. Present — machine-generated

| Evidence | File | Produced by | Freshness |
|---|---|---|---|
| Compliance verification output | run output | `npm run verify:compliance` | Per run |
| SBOM | `evidence/sbom.json` | `npm run security:scan` | 2026-09-23 |
| Dependency audit, split by production impact | `evidence/dependency-audit.md` | same | 2026-09-23 |
| Secret scan, with reviewed allowlist | `evidence/secret-scan.md` | same | 2026-09-23 |

## 2. Present — documentation

| Evidence | File |
|---|---|
| Legal research with source-retrieval status | `compliance-research.md` |
| Policy-to-code mapping | `policy-to-code-mapping.md` |
| Data inventory | `data-inventory.md` |
| Retention matrix | `retention-matrix.md` |
| Consent model | `consent-model.md` |
| Processor register with real contractual mechanisms | `processor-register.md` |
| DSR procedure | `dsr-procedure.md` |
| Grievance procedure | `grievance-procedure.md` |
| Incident response reference | `incident-response-reference.md` |
| Security controls | `security-controls.md` |
| Backup and recovery | `backup-and-recovery.md` |
| Sheets hardening checklist | `google-sheets-hardening.md` |
| Master control matrix | `master-control-matrix.md` |
| Phase reports 1–5 | `PHASE-*-REPORT.md` |

## 3. Present — live artefacts

| Evidence | Where |
|---|---|
| 13 general policy pages, versioned | `sanixor.space/{privacy,terms,…}` |
| 5 event policy pages | `sanixor.space/events/agentverse-2/*` |
| `security.txt` | `sanixor.space/.well-known/security.txt` |
| Published price | Event page pricing block |
| Business information | `/contact` |
| Security headers | `public/_headers`, backend `app.ts` |

---

## 4. MISSING — requires production access

Everything here needs credentials or account access I do not have. Each has tooling ready.

| # | Evidence | How to produce | Blocks |
|---|---|---|---|
| 1 | **Retention dry-run report** | Put prod `GOOGLE_*` in `.dev.vars`, `npm run dev`, then `npm run retention:dry-run` in the backend | Gate 1; enabling retention |
| 2 | **Retention execution evidence** | After (1) is reviewed: set `RETENTION_ENFORCE=true`, run one cycle, capture `wrangler tail` | Gate 1 |
| 3 | **Sheet bootstrap report** | `npm run sheets:bootstrap` | Gate 1; P2-B02 |
| 4 | **DSR end-to-end test** | Submit a real request at `/data-rights`, work it through, record the row | Gate 4 |
| 5 | **Grievance end-to-end test** | Submit at `/grievance`, work it through | Gate 4 |
| 6 | **Refund end-to-end test** | Submit at `/refund-policy`, review, issue in Razorpay, record the reference | Gate 2 |
| 7 | **Consent test evidence** | Load the site, screenshot banner; accept, reject, withdraw; screenshot the record in devtools | Gate 4 |
| 8 | **Security header scan** | `curl -sI https://sanixor.space` and `https://api.sanixor.space/health` after deploy | Gate 3 |
| 9 | **CSP violation report** | Deploy report-only, collect violations for one cycle including a real payment | Gate 3 |
| 10 | **Rate-limit test** | Burst the form endpoints, confirm 429 | Gate 3 |
| 11 | **Payment flow tests** | Test-mode success, failure, duplicate; confirm Payment Events rows | Gate 2 |
| 12 | **Webhook test** | Trigger from the Razorpay dashboard after setting `RAZORPAY_WEBHOOK_SECRET` | Gate 2 |
| 13 | **Backup restoration test** | `backup-and-recovery.md` §5 | Gate 3 |
| 14 | **Sheets access review** | `google-sheets-hardening.md` §2 | Gate 1 |
| 15 | **Vendor DPA acceptance** | `processor-register.md` §2b | Gate 1 |
| 16 | **Email auth check** | `dig TXT sanixor.space`, `dig TXT _dmarc.sanixor.space`, Resend dashboard | Gate 3 |
| 17 | **Accessibility audit** | axe DevTools across all routes | Gate 3 |
| 18 | **Incident-response tabletop** | Walk `incident-response-reference.md` with the team | Gate 3 |
| 19 | **Production deployment evidence** | Deploy log, smoke tests, post-deploy verify run | Gate 4 |

---

## 5. Directory

```
docs/compliance/
├── evidence/
│   ├── sbom.json                        ✔ generated
│   ├── dependency-audit.md              ✔ generated
│   ├── secret-scan.md                   ✔ generated
│   ├── retention-dry-run-report.md      ✗ run npm run retention:dry-run
│   ├── sheet-bootstrap-report.md        ✗ run npm run sheets:bootstrap
│   ├── security-header-scan.md          ✗ after deploy
│   ├── consent-test-evidence.md         ✗ manual
│   ├── dsr-test-evidence.md             ✗ manual
│   ├── grievance-test-evidence.md       ✗ manual
│   ├── refund-test-evidence.md          ✗ manual
│   ├── payment-test-evidence.md         ✗ manual
│   ├── backup-restore-evidence.md       ✗ manual
│   ├── vendor-dpa/                       ✗ countersigned copies
│   └── access-review/                    ✗ sharing exports, MFA screenshots
└── *.md                                 ✔ all present
```

---

## 6. Retention of evidence

| Type | Keep |
|---|---|
| Scans, audits | 2 years |
| Access reviews | 3 years |
| Incident records | 5 years |
| DPAs | Life of the relationship + 3 years |
| Consent records | For as long as the underlying data is held |
| Restore tests | 2 years |

Evidence containing personal data — DSR and grievance test records in particular — is itself in scope for the retention schedule. Use test data where possible, and redact before filing where not.
