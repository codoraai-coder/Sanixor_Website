/**
 * ════════════════════════════════════════════════════════════════════════
 *  COMPANY IDENTITY — SINGLE SOURCE OF TRUTH FOR ALL LEGAL PAGES
 * ════════════════════════════════════════════════════════════════════════
 *
 * Every legally-required company fact lives here and ONLY here. All policy
 * pages read from this file, so changing a value once updates every page
 * that references it.
 *
 * ── SOURCE OF THIS DATA ────────────────────────────────────────────────
 * Identity facts below were taken from the company's **verified Udyam
 * Registration Certificate** (supplied 2026-09-23) and from contact details
 * confirmed by the owner.
 *
 * ── SECURITY: WHAT MUST NEVER APPEAR HERE ──────────────────────────────
 * The Udyam certificate also carries the proprietor's PAN, bank account
 * number and IFSC. Those are private and MUST NOT be added to this file,
 * published on the site, or committed anywhere in this repository.
 *
 * ── THREE VALUE STATES ─────────────────────────────────────────────────
 *   plain string  — confirmed; renders normally.
 *   TODO("...")   — not yet confirmed; renders as a visible
 *                   "[ TO BE CONFIRMED ]" marker rather than invented text.
 *   NOT_REGISTERED — the company genuinely does not hold this registration.
 *                   Renders as "Not registered". NEVER fabricate a number
 *                   to fill one of these.
 *
 * ── WHY THESE FIELDS ARE REQUIRED ──────────────────────────────────────
 * • Consumer Protection (E-Commerce) Rules, 2020 require an e-commerce
 *   entity to display its legal name, registered office address, customer
 *   care contact, and the name/contact/designation of a grievance officer.
 * • Razorpay's merchant onboarding requires published business contact
 *   details including a working phone number and registered address.
 * • DPDP Act, 2023 s.13 requires a published grievance-redressal route.
 *
 * See `docs/compliance/compliance-research.md` for the sourced detail.
 */

/** Marks a legally-important fact that has not yet been confirmed. */
export const TODO = (what: string): string => `__TODO__${what}`;

/**
 * Marks a registration the company genuinely does not hold. Distinct from
 * TODO: this is a confirmed negative, not a gap awaiting an answer.
 */
export const NOT_REGISTERED = "__NOT_REGISTERED__";

/** True when a value is still an unconfirmed placeholder. */
export function isUnconfirmed(value: string): boolean {
  return value.startsWith("__TODO__");
}

/** True when the company confirmed it does not hold this registration. */
export function isNotRegistered(value: string): boolean {
  return value === NOT_REGISTERED;
}

/** The human-readable description of what still needs confirming. */
export function unconfirmedLabel(value: string): string {
  return value.replace("__TODO__", "");
}

export const COMPANY = {
  /** Trading / brand name. */
  brandName: "Sanixor AI",

  /** Registered legal name, exactly as on the Udyam certificate. */
  legalName: "SANIXOR AI",

  /**
   * Entity type. Sanixor AI is a **proprietorship** — not a private limited
   * company, LLP or any incorporated entity. Nothing on the site may
   * describe it as incorporated.
   */
  entityType: "Proprietorship",

  /** Proprietor of the business, per the Udyam certificate. */
  proprietor: "Reeta Tripathi",

  /** Full registered address, per the Udyam certificate. */
  registeredAddress: "Salahpur, Dhaorua, Malipur, Ambedkar Nagar, Uttar Pradesh – 224159, India",

  /** Registered district and state, for the jurisdiction clause. */
  registeredState: "Uttar Pradesh",

  /**
   * Corporate Identity Number — applies only to companies incorporated
   * under the Companies Act. A proprietorship does not have one.
   */
  cin: NOT_REGISTERED,

  /**
   * GSTIN — the business is not currently GST-registered. This must render
   * as "Not registered", never as a fabricated number.
   */
  gstin: NOT_REGISTERED,

  /** Udyam (MSME) registration number — verified from the certificate. */
  udyam: "UDYAM-UP-04-0054404",

  /** MSME enterprise classification, per the certificate. */
  enterpriseType: "Micro Enterprise",

  contact: {
    /**
     * General support. Existing published address, also the backend's
     * MAIL_FROM sender, so it is known-live.
     */
    support: "team@sanixor.space",
    /**
     * Privacy, data-rights and grievance contact.
     *
     * Deliberately the owner-confirmed address rather than the previous
     * `privacy@sanixor.space`, whose deliverability was never verified. A
     * privacy policy that routes rights requests to an unmonitored mailbox
     * is worse than one that points at a mailbox someone actually reads.
     */
    privacy: "dsrishabh23@gmail.com",
    grievance: "dsrishabh23@gmail.com",
    /** Security / vulnerability reports. */
    security: "team@sanixor.space",
    /** Confirmed customer-care number. */
    phone: "+91 99848 45854",
    /** Support hours. */
    hours: "Monday to Friday, 10:00–18:00 IST, excluding public holidays",
  },

  /**
   * Grievance Officer — Consumer Protection (E-Commerce) Rules, 2020
   * require the NAME, CONTACT DETAILS and DESIGNATION to be displayed on
   * the consumer-facing platform.
   *
   * NOTE: this person is the **Grievance Officer**. He has NOT been
   * appointed as a Data Protection Officer, and no page may describe him as
   * one. A DPO is a distinct statutory role that a Significant Data
   * Fiduciary must appoint; that designation has not been established here.
   */
  grievanceOfficer: {
    name: "Rishabh Tripathi",
    designation: "Grievance Officer",
    email: "dsrishabh23@gmail.com",
    phone: "+91 99848 45854",
    /**
     * Acknowledgement target, in BUSINESS days.
     *
     * The Consumer Protection (E-Commerce) Rules, 2020 reference 48 hours.
     * Sanixor currently has one named Grievance Officer and no deputy, so a
     * 48-hour clock that runs across weekends and absences is a commitment
     * the business cannot reliably meet. Publishing 2 business days is a
     * deliberate, documented deviation: it is slightly longer than the Rules
     * reference, and it is one we can actually honour.
     *
     * A published SLA that is quietly missed is worse than a slightly longer
     * one that is met. FLAGGED FOR COUNSEL — see docs/compliance/gap-report.
     * Revert to 48 hours the moment a backup officer is appointed.
     */
    acknowledgementBusinessDays: 2,
    redressalDays: 30,
  },

  /** Governing law and forum for disputes. */
  jurisdiction: {
    country: "India",
    state: "Uttar Pradesh",
    governingLaw: "the laws of India",
    forum: "Lucknow, Uttar Pradesh",
  },

  web: {
    site: "https://sanixor.space",
    api: "https://api.sanixor.space",
  },
} as const;

/**
 * Every unconfirmed fact in this file, for the compliance gap report and the
 * `verify-compliance` check. Confirmed negatives (NOT_REGISTERED) are not
 * gaps and are excluded.
 */
export function listUnconfirmedFacts(): { path: string; needs: string }[] {
  const out: { path: string; needs: string }[] = [];

  const walk = (obj: Record<string, unknown>, prefix: string): void => {
    for (const [key, value] of Object.entries(obj)) {
      const path = prefix ? `${prefix}.${key}` : key;
      if (typeof value === "string" && isUnconfirmed(value)) {
        out.push({ path, needs: unconfirmedLabel(value) });
      } else if (value && typeof value === "object") {
        walk(value as Record<string, unknown>, path);
      }
    }
  };

  walk(COMPANY as unknown as Record<string, unknown>, "");
  return out;
}

/** Resolves a dotted path like "contact.phone" against COMPANY. */
export function resolveCompanyFact(path: string): string | undefined {
  const value = path
    .split(".")
    .reduce<unknown>(
      (acc, key) =>
        acc && typeof acc === "object" ? (acc as Record<string, unknown>)[key] : undefined,
      COMPANY,
    );
  return typeof value === "string" ? value : undefined;
}
