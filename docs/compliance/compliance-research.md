# Compliance Research — Sanixor AI Policy Foundation

**Prepared:** 2026-09-23
**Scope:** Product-level compliance for the Sanixor AI website and its form/registration backend. Excludes company formation, tax, payroll and accounting.
**Primary jurisdiction:** India.

> Compliance-engineering research, not legal advice. Statutory conclusions below should be confirmed with a qualified Indian practitioner before being relied on. Where a primary source could not be retrieved, that is stated explicitly rather than papered over.

---

## 1. Source retrieval notes

| Source | Outcome |
|---|---|
| MeitY DPDP Act page | **HTTP 403** — the site blocks automated retrieval. Not read directly. |
| DPDP Rules 2025 notification (PIB) | Retrieved via search result; notification date and compliance deadline corroborated across multiple independent summaries. |
| DPDP Act section text (ss. 5, 6, 8, 13) | Corroborated across independent legal summaries and statute-text mirrors. |
| Razorpay merchant / onboarding requirements | Retrieved from Razorpay's published compliance guidance and onboarding documentation. |
| Consumer Protection (E-Commerce) Rules, 2020 | Retrieved via law-firm analyses (Khaitan, Trilegal) and ICSI's published copy of the Rules. |
| CERT-In directions | **Not retrieved this pass.** Figures used elsewhere (6-hour reporting, 180-day logs) are marked `needs-verification`. |

**Consequence:** every conclusion below carries a confidence rating. Nothing is asserted as settled law on the strength of a secondary summary alone.

---

## 2. India — Digital Personal Data Protection Act, 2023

### 2.1 Status and timeline

- The DPDP Act, 2023 is enacted.
- The **DPDP Rules, 2025 were notified on 14 November 2025**.
- The Rules set an **18-month runway, with the principal compliance deadline falling on 13 May 2027**.

**Confidence: high** on dates (corroborated across several independent sources). **Practical read:** the obligations are not yet at their enforcement cliff, but the runway is finite and the cheap moment to build consent and retention plumbing is before volume accumulates, not after.

### 2.2 Obligations that bite for this product

| Section | Obligation | How it lands here |
|---|---|---|
| **s.5** | A request for consent must be **accompanied or preceded by a notice** stating the personal data concerned, the purpose, how to exercise rights under ss.6 and 13, and how to complain to the Board. | Drove `FormPrivacyNotice` — an itemised notice at the point of collection on all four forms, not a link buried in a footer. |
| **s.6** | Consent must be free, specific, informed, unconditional and unambiguous, with a clear affirmative action. Withdrawal must be as easy as giving. | Drove the explicit acceptance checkbox before payment, and the published one-email withdrawal route. |
| **s.8** | The Data Fiduciary remains responsible for processing carried out on its behalf by a Data Processor, **irrespective of any agreement to the contrary**. Also: reasonable security safeguards, breach notification, and erasure on withdrawal. | Drove the named subprocessor page and the honest statement that DPAs are still being formalised. |
| **s.9** | Children's data: a **child is anyone under 18**. Verifiable parental consent is required, and tracking, behavioural monitoring and targeted advertising to children are prohibited. | Drove the 18+ attestation at registration and the correction of the published age threshold from 16 to 18. |
| **s.13** | Data Principals have a right to grievance redressal; the Data Fiduciary must publish a means of exercising it. | Drove `/grievance` and the named Grievance Officer block. |

### 2.3 Children's data — the specific trap

The previous policy set its children's threshold at **16**, which is the GDPR-derived number. For an India-based Data Fiduciary processing Indian students' data, the operative threshold is **18**.

Rule 10 of the DPDP Rules, 2025 requires **verifiable parental consent**, with approved verification routes including DigiLocker-based identity checks and reliance on existing verified identity/age records.

Sanixor runs student-facing paid events and collects roll numbers and college names. Indian undergraduate intake routinely includes 17-year-olds, and the registration flow previously collected **no age signal at all** — meaning the question "do we hold children's data?" was unanswerable. The 18+ attestation makes it answerable.

**Confidence: high** on the under-18 threshold and the parental-consent requirement. **Medium** on exactly which verification method will be considered adequate for a low-value event registration by May 2027.

---

## 3. India — Consumer Protection (E-Commerce) Rules, 2020

Sanixor sells event registrations online for money, which brings it within the e-commerce regime.

### 3.1 Mandatory disclosures

An e-commerce entity must display:

- **Legal name** of the entity.
- **Registered office address**.
- **Customer care contact details**, including a working telephone number.
- **Name, contact details and designation of a Grievance Officer**.
- Its **return, refund, exchange, warranty, delivery and payment** policies, accessible **before** purchase.

### 3.2 Grievance timelines

- **Acknowledge** a consumer complaint within **48 hours**.
- **Redress** it within **one month** of receipt.

**Confidence: high.** These are consistently reported across multiple independent law-firm analyses.

**Consequence for this build:** the site previously published only an email address and the string "Noida, India" — a city, not an address — with no phone number and no grievance officer. Those are now structural fields in `company.config.ts`, rendered as visible `[ TO BE CONFIRMED ]` markers until the real values are supplied. They are the **principal remaining P0 blocker**.

---

## 4. Razorpay merchant requirements (contractual)

Classified as `CONTRACTUAL_CUSTOMER_REQUIREMENT`, not law — but non-compliance risks the payment account, which is a harder commercial stop than most statutes.

Razorpay's onboarding requires that the merchant website publish, accurate and current:

- Privacy Policy
- Terms and Conditions
- **Refund and Cancellation Policy, with explicit timelines** (its guidance uses 5–7 business days as the illustrative figure)
- Pricing
- About Us
- Contact Us, with **a working phone number, email address and registered address**

**Confidence: high.**

**Consequence:** `/refund-policy` and the event-scoped refund pages now exist with stated timelines. Pricing remains a gap — the AgentVerse page never displays the ₹79 fee anywhere in the frontend; the amount lives only in the backend constant.

---

## 5. Payments and PCI DSS

Razorpay's **hosted checkout** means card number, CVV and expiry never traverse Sanixor's servers. Verified in code: no PAN, CVV or expiry field exists anywhere in either repository, and payment instrument data goes directly from the browser to Razorpay.

This keeps Sanixor at the narrowest PCI DSS scope (SAQ-A territory) **by design**. The single most consequential thing the team can do here is *not regress it* by ever building a custom card form.

**Confidence: high** on the architectural fact. **Medium** on the precise SAQ classification, which depends on Razorpay's integration mode and should be confirmed with the acquirer.

---

## 6. AI governance — assessed and not applicable

Sanixor AI *builds* AI products, but the **website itself runs no model on visitor data**. Verified: no LLM SDK, no inference call, no model provider exists in either source tree, and no form submission is processed by a model.

Therefore the EU AI Act and the `AI_GOVERNANCE` domain are **not applicable to this website** on current facts. Recording this explicitly matters: it prevents a future policy draft from importing AI-governance boilerplate that would be a false claim.

This changes the moment any product (HackEval, BitBench, LexAI, NyayAI, AutoDash) processes real customer data — at which point the assessment must be re-run with a populated model inventory.

---

## 7. EU / UK — conditional, and a live business decision

GDPR Art. 3(2) turns on **targeting**, not mere accessibility. A Noida company selling ₹79 tickets to Indian college students does not obviously target EU data subjects.

However, the **previous privacy policy contained a full "Legal Basis for Processing (GDPR / Applicable Regions)" section** — which a regulator or an enterprise buyer would reasonably read as a representation that GDPR is being applied. That created GDPR-shaped *promises* without GDPR-shaped *machinery*.

**Decision taken in this phase:** the rewritten policies are scoped to **India**, with DPDP as the operative framework, and do not claim GDPR applicability. This is the honest position on current facts.

**If Sanixor later targets EU users** — localised pricing, EU-specific marketing, an EU sales motion — this must be revisited and the machinery actually built. **Flagged for counsel.**

---

## 8. Accessibility

- **WCAG 2.2 Level AA** is the target standard (voluntary standard, not Indian law).
- The **European Accessibility Act** applies to e-commerce in the EU, and is therefore contingent on the EU-scope decision in §7.
- Institutional and government buyers routinely require WCAG-AA conformance in procurement regardless of statute.

**Position taken:** the Accessibility Statement claims **partial conformance** and lists known gaps, because no independent audit has been performed. Claiming full conformance without an audit would itself be a false claim.

---

## 9. CERT-In — flagged, not relied on

CERT-In directions under s.70B of the IT Act, 2000 are commonly reported to require **6-hour incident reporting** and **180-day ICT log retention within India**.

**These figures were not verified against the primary source this pass.** They are recorded in the Security Policy as commitments to a process, and the specific numbers are marked `needs-verification` pending a direct read of the current direction text at [cert-in.org.in](https://www.cert-in.org.in/).

---

## 10. Truthfulness constraints applied to drafting

Every one of these was enforced against the code, and each one changed what the published text says:

| Constraint | Evidence in code | Effect on the policies |
|---|---|---|
| No LinkedIn OAuth exists | Zero OAuth/auth implementation in either repo | All LinkedIn sign-in language removed; replaced with a note explaining the optional URL text field |
| No user accounts exist | No credential storage, no session, no user records | All account/credential language removed |
| No analytics exist | No GA/GTM/Pixel/PostHog/Mixpanel/Hotjar/Clarity | Cookie Policy states plainly that **no cookies are set at all** |
| No AI processes visitor data | No model SDK or inference call | Disclaimer states the website runs no AI on submissions |
| No automated deletion exists | No retention, purge, TTL or cron logic | Retention described as a published schedule enforced **manually**, with the gap stated outright |
| No automatic refund exists | No Razorpay refund API call anywhere | Refund Policy describes a **request-based, manually initiated** process; the UI promise of automatic refunds was reworded |
| No consent logging existed | No consent columns | Consent capture was **built** (versioned acceptance recorded per registration) so the claim became true |
| No certifications held | No ISO/SOC evidence | Security Policy states explicitly that no third-party certification is held |

---

## 11. Open items for legal verification

1. **EU/UK scope** — confirm Sanixor does not target EU/UK data subjects, or build the machinery (§7).
2. **CERT-In current text** — verify the 6-hour and 180-day figures directly (§9).
3. **DPDP Significant Data Fiduciary thresholds** — almost certainly far above current volumes, but confirm the criteria.
4. **Whether under-18s actually register** — a factual question that determines how hard the s.9 regime bites.
5. **Razorpay executed merchant agreement** — the published guidance was used; the signed terms govern.
6. **Company registration status, GSTIN and Udyam number** — required before publishing identity facts or any MSME badge.
7. **Employment-law retention** for job applicants — some regimes mandate a minimum retention for discrimination-claim windows, which interacts with the 12-month deletion commitment.
8. **Governing-law forum** — confirm the correct court seat for the dispute-resolution clause.

---

## 12. Sources

**Checked 2026-09-23:**

- [DPDP Rules 2025 Notified — PIB](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf)
- [DPDP Act 2023 and DPDP Rules 2025: Compliance Guide — EY India](https://www.ey.com/en_in/insights/cybersecurity/decoding-the-digital-personal-data-protection-act-2023)
- [Section 5, DPDP Act 2023 — Indian Kanoon](https://indiankanoon.org/doc/102130291/)
- [Verifiable Parental Consent Under DPDP Rules 2025 — Consently](https://www.consently.in/blog/verifiable-parental-consent-dpdp-rules-2025-edtech-gaming)
- [India's DPDP Rules Draw the Line at 18 — Xident](https://xident.io/blog/india-dpdp-age-verification-verifiable-parental-consent-childrens-data-2026/)
- [Consumer Protection (E-Commerce) Rules, 2020 — ICSI](https://www.icsi.edu/media/webmodules/Consumer_Protection_E-Commerce_Rules_2020.pdf)
- [Stricter Regulations on E-Commerce — Khaitan & Co](https://www.khaitanco.com/thought-leaderships/Stricter-Regulations-on-E-Commerce-The-Consumer-Protection-E-Commerce-Rules-2020)
- [Consumer Protection (E-Commerce) Rules, 2020 — Trilegal](https://trilegal.com/knowledge_repository/consumer-protection-e-commerce-rules-2020/)
- [Payment Gateway Compliance in 2026 — Razorpay](https://razorpay.com/blog/payment-gateway-compliance/)
- [Razorpay Terms & Conditions](https://razorpay.com/terms/)

**Authoritative anchors to verify against:**
[MeitY](https://www.meity.gov.in/) · [CERT-In](https://www.cert-in.org.in/) · [Dept. of Consumer Affairs](https://consumeraffairs.nic.in/) · [W3C WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) · [PCI SSC](https://www.pcisecuritystandards.org/)

**Method:** [global-saas-compliance-skill](https://github.com/Shubh-Singhal-Taken/global-saas-compliance-skill).
