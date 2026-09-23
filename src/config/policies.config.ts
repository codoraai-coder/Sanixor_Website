/**
 * ════════════════════════════════════════════════════════════════════════
 *  POLICY REGISTRY — VERSIONS, DATES AND ROUTES
 * ════════════════════════════════════════════════════════════════════════
 *
 * Central metadata for every published policy. Version and effective-date
 * information is declared once here and read by the page renderer, the
 * footer, and the consent-capture logic — never hand-copied into a page.
 *
 * ── VERSIONING RULE ────────────────────────────────────────────────────
 * Bump `version` and `effectiveDate` together whenever the SUBSTANCE of a
 * policy changes (what data is collected, how it is used, who receives it,
 * refund terms, liability). Typo and formatting fixes bump `lastUpdated`
 * only.
 *
 * `PRIVACY_VERSION` and `TERMS_VERSION` are recorded against every paid
 * registration, so changing them changes what new registrants are recorded
 * as having accepted. Never retroactively edit a published version — issue
 * a new one.
 */

export type PolicyId =
  | "privacy"
  | "terms"
  | "refund-policy"
  | "cookie-policy"
  | "disclaimer"
  | "acceptable-use"
  | "intellectual-property"
  | "security"
  | "accessibility"
  | "subprocessors"
  | "data-rights"
  | "data-deletion"
  | "grievance";

export interface PolicyMeta {
  id: PolicyId;
  /** Public route, e.g. "/privacy". */
  route: string;
  /** Page title, used in <h1>, <title> and the footer. */
  title: string;
  /** One-line description for meta description and the policy index. */
  summary: string;
  version: string;
  /** ISO date the version took effect. */
  effectiveDate: string;
  /** ISO date of the last edit of any kind. */
  lastUpdated: string;
  /** Which footer group the link belongs to. */
  footerGroup: "primary" | "secondary";
}

/** The date this policy suite was first published. */
const PUBLISHED = "2026-09-23";

export const POLICIES: Record<PolicyId, PolicyMeta> = {
  privacy: {
    id: "privacy",
    route: "/privacy",
    title: "Privacy Policy",
    summary:
      "What personal data Sanixor AI collects through its website forms, why, who processes it, how long it is kept, and how to exercise your rights.",
    version: "2.0",
    effectiveDate: PUBLISHED,
    lastUpdated: PUBLISHED,
    footerGroup: "primary",
  },
  terms: {
    id: "terms",
    route: "/terms",
    title: "Terms of Service",
    summary:
      "The terms governing use of the Sanixor AI website, paid event registrations, and related services.",
    version: "2.0",
    effectiveDate: PUBLISHED,
    lastUpdated: PUBLISHED,
    footerGroup: "primary",
  },
  "refund-policy": {
    id: "refund-policy",
    route: "/refund-policy",
    title: "Refund and Cancellation Policy",
    summary:
      "When registration fees are refundable, how to request a refund, and how long refunds take to process.",
    version: "1.0",
    effectiveDate: PUBLISHED,
    lastUpdated: PUBLISHED,
    footerGroup: "primary",
  },
  "cookie-policy": {
    id: "cookie-policy",
    route: "/cookie-policy",
    title: "Cookie Policy",
    summary:
      "The cookies and browser-storage technologies this website uses. Sanixor AI runs no analytics, advertising or tracking cookies.",
    version: "1.0",
    effectiveDate: PUBLISHED,
    lastUpdated: PUBLISHED,
    footerGroup: "primary",
  },
  security: {
    id: "security",
    route: "/security",
    title: "Security Policy",
    summary:
      "The technical and organisational measures protecting data submitted to Sanixor AI, and how to report a vulnerability.",
    version: "1.0",
    effectiveDate: PUBLISHED,
    lastUpdated: PUBLISHED,
    footerGroup: "primary",
  },
  accessibility: {
    id: "accessibility",
    route: "/accessibility",
    title: "Accessibility Statement",
    summary:
      "Sanixor AI's accessibility commitments, the current conformance position, known limitations and how to report a barrier.",
    version: "1.0",
    effectiveDate: PUBLISHED,
    lastUpdated: PUBLISHED,
    footerGroup: "primary",
  },
  subprocessors: {
    id: "subprocessors",
    route: "/subprocessors",
    title: "Subprocessors",
    summary:
      "Every third-party service provider that processes personal data on behalf of Sanixor AI, what it receives and where it processes.",
    version: "1.0",
    effectiveDate: PUBLISHED,
    lastUpdated: PUBLISHED,
    footerGroup: "secondary",
  },
  "data-rights": {
    id: "data-rights",
    route: "/data-rights",
    title: "Your Data Rights",
    summary:
      "The rights you hold over your personal data under the DPDP Act, 2023, and how to exercise each one.",
    version: "1.0",
    effectiveDate: PUBLISHED,
    lastUpdated: PUBLISHED,
    footerGroup: "secondary",
  },
  "data-deletion": {
    id: "data-deletion",
    route: "/data-deletion",
    title: "Data Deletion Request",
    summary:
      "How to ask Sanixor AI to delete the personal data it holds about you, what happens next, and what cannot be deleted.",
    version: "1.0",
    effectiveDate: PUBLISHED,
    lastUpdated: PUBLISHED,
    footerGroup: "secondary",
  },
  grievance: {
    id: "grievance",
    route: "/grievance",
    title: "Grievance Redressal",
    summary:
      "How to raise a complaint with Sanixor AI, who handles it, and the timelines for acknowledgement and resolution.",
    version: "1.0",
    effectiveDate: PUBLISHED,
    lastUpdated: PUBLISHED,
    footerGroup: "secondary",
  },
  "acceptable-use": {
    id: "acceptable-use",
    route: "/acceptable-use",
    title: "Acceptable Use Policy",
    summary:
      "What constitutes acceptable and prohibited use of the Sanixor AI website, APIs and services.",
    version: "1.0",
    effectiveDate: PUBLISHED,
    lastUpdated: PUBLISHED,
    footerGroup: "secondary",
  },
  "intellectual-property": {
    id: "intellectual-property",
    route: "/intellectual-property",
    title: "Intellectual Property Policy",
    summary:
      "Ownership of Sanixor AI's content and marks, your rights in material you submit, and how to report infringement.",
    version: "1.0",
    effectiveDate: PUBLISHED,
    lastUpdated: PUBLISHED,
    footerGroup: "secondary",
  },
  disclaimer: {
    id: "disclaimer",
    route: "/disclaimer",
    title: "Disclaimer",
    summary:
      "The limits of the information, product claims and third-party links published on this website.",
    version: "1.0",
    effectiveDate: PUBLISHED,
    lastUpdated: PUBLISHED,
    footerGroup: "secondary",
  },
};

/** Ordered list for the footer and the policy index. */
export const POLICY_LIST: PolicyMeta[] = Object.values(POLICIES);

/**
 * Versions recorded against a paid registration as proof of what the
 * registrant accepted. Sent to the backend with every create-order call.
 */
export const PRIVACY_VERSION = POLICIES.privacy.version;
export const TERMS_VERSION = POLICIES.terms.version;

/** Human-readable date, e.g. "23 September 2026". */
export function formatPolicyDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
