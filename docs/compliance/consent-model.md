# Consent Model

**Prepared:** 2026-09-23
**Implementation:** `src/config/consent.config.ts` · `src/lib/consent.ts` · `src/components/consent/`

---

## 1. Two kinds of consent, handled differently

| | Browser storage consent | Registration consent |
|---|---|---|
| **What** | Optional localStorage | Terms + Privacy acceptance, 18+ attestation |
| **Where recorded** | The visitor's own browser | Server-side, against the Razorpay order |
| **Why there** | No accounts exist, so there is no identity to bind a server record to | A paid registration has a verified identity |
| **Version tracked** | `CONSENT_VERSION` | `TERMS_VERSION`, `PRIVACY_VERSION` |
| **Withdrawable** | Yes, from the footer at any time | Yes, by email |

**Why browser-storage consent is not sent to the server.** Storing it server-side would mean minting an identifier for someone who has just asked for less tracking. The trade-off — the choice is remembered per browser and per device — is stated plainly in the Cookie Policy rather than hidden.

---

## 2. Categories

Only categories with a registered technology are ever shown. Offering an "Analytics" toggle while running no analytics would be a fabricated choice — the mirror image of a dark pattern.

| Category | Optional | Registered today |
|---|:---:|---|
| Strictly necessary | No | `sanixor_consent` |
| Functional | **Yes** | `sanixor-theme`, `sanixor_demo_booked` |
| Analytics | Yes | **none** — not shown |
| Marketing | Yes | **none** — not shown |
| Third-party content | Yes | Google Fonts — shown as information, not as a control |

### Google Fonts is honest about being un-gateable

Fonts load from a `<link>` in `index.html`, which the browser fetches before any script runs. It cannot be gated by a choice made inside the app. Rather than show a toggle that does nothing, the preference centre displays it with an explanation and states the real fix: self-hosting, which removes the third party entirely. Tracked as engineering work in the Phase 2 report.

---

## 3. The consent record

```ts
{
  consentId:      "c_m2x8...",       // unique per decision
  subject:        "browser-local",    // no account exists
  choices:        { functional: "granted" | "denied" },
  consentVersion: "1.0",
  noticeHash:     "1f4b2c",           // fingerprint of the exact wording shown
  timestamp:      "2026-09-23T...",
  source:         "banner" | "preference-centre",
  withdrawnAt:    null
}
```

`noticeHash` fingerprints the notice text so a stored record can be tied to the exact wording the person read. A later decision writes a **new** record; records are never edited in place.

---

## 4. Rules enforced in code

| Rule | How it is enforced |
|---|---|
| **Deny by default** | `isAllowed()` returns false for any optional category without an explicit `granted`. Undecided is never treated as consent. |
| **Nothing optional loads first** | `ThemeProvider` and `BookDemoModal` consult `allows("functional")` before any read or write. |
| **Reject is as easy as accept** | Both banner buttons share identical styling, size and contrast. |
| **No pre-ticked boxes** | The preference centre seeds optional categories from the stored record, defaulting to denied. Asserted by the automated check. |
| **Withdrawal actually purges** | `withdrawAll()` removes the governed keys, not merely future writes. |
| **Version bump re-asks** | A record whose `consentVersion` differs from the current one triggers the banner again. |
| **Storage failure fails safe** | If `localStorage` throws, the decision holds for that page view only and we ask again. "Could not record" is never treated as "granted". |

---

## 5. Registration consent flow

```
policies.config.ts (TERMS_VERSION, PRIVACY_VERSION)
  → registration modal: 18+ attestation + terms acceptance, submit disabled until both
  → payment.validator.ts: ageConfirmed must be literal true; acceptedAt must be ISO
  → packed into ONE Razorpay order-notes key (notes cap at 15; 12 were already used)
  → unpacked at finalisation
  → written to sheet columns Q–T (Terms Version, Privacy Version, Consent At, Age Confirmed)
```

Those four columns are **protected from retention clearing**: deleting the proof that consent was validly obtained would be the opposite of a privacy improvement.

---

## 6. Changing the model

Bump `CONSENT_VERSION` when the categories, the technologies, or the notice wording change what a person is actually agreeing to. Existing records keep their old version — they are never rewritten. Typo fixes do not need a bump.

Adding a technology: add it to `TECHNOLOGY_REGISTRY` **first**, with an honest category. `npm run verify:compliance` fails if a real storage key is missing from the registry.
