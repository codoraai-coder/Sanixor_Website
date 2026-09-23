import {
  CONSENT_NOTICE_TEXT,
  CONSENT_VERSION,
  gateableOptionalCategories,
  type ConsentCategory,
} from "@/config/consent.config";

/**
 * Consent record storage.
 *
 * ── WHERE THE RECORD LIVES ─────────────────────────────────────────────
 * In the visitor's own `localStorage`, not on our servers. That is a
 * deliberate choice: this site has no accounts, so there is no identity to
 * attach a server-side consent record to. Sending one would mean creating a
 * tracking identifier for people who have just told us they want less
 * tracking — which would be perverse.
 *
 * The consequence, stated honestly in the Cookie Policy, is that the choice
 * is per-browser and per-device.
 *
 * Consent given at a point where we DO have an identity — paid event
 * registration — is recorded server-side instead, against the order. See
 * `policies.config.ts` and the backend consent columns.
 */

export const CONSENT_STORAGE_KEY = "sanixor_consent";

export type ConsentStatus = "granted" | "denied";

export interface ConsentRecord {
  /** Unique per decision, so a later change is a new record, not an edit. */
  consentId: string;
  /** No account exists, so the subject is the browser itself. */
  subject: "browser-local";
  /** Per-category decision. Categories absent here were never offered. */
  choices: Partial<Record<ConsentCategory, ConsentStatus>>;
  /** Version of the consent model in force when the choice was made. */
  consentVersion: string;
  /** Hash of the exact notice text shown, so we can prove what was read. */
  noticeHash: string;
  /** ISO timestamp of the decision. */
  timestamp: string;
  /** Where the decision was made. */
  source: "banner" | "preference-centre";
  /** Set when consent is later withdrawn wholesale. */
  withdrawnAt: string | null;
}

/**
 * FNV-1a — small, synchronous, dependency-free. Used only to fingerprint the
 * notice text so a stored record can be tied to the exact wording shown.
 * Not a security primitive and not used as one.
 */
export function hashText(text: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(36);
}

function newConsentId(): string {
  const rand =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `c_${Date.now().toString(36)}${rand}`;
}

/**
 * Every storage access is wrapped: `localStorage` throws in some privacy
 * modes and is simply absent during SSR or a thumbnail capture. A consent
 * layer that crashes the page when storage is blocked would be worse than
 * no consent layer at all.
 */
export function readConsent(): ConsentRecord | null {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (!parsed || typeof parsed !== "object" || !parsed.choices) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(record: ConsentRecord): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage blocked — the decision holds for this page view only. The
    // banner will ask again next visit, which is the correct failure mode:
    // we never silently treat "could not record" as "granted".
  }
}

export function buildConsentRecord(
  choices: Partial<Record<ConsentCategory, ConsentStatus>>,
  source: ConsentRecord["source"],
): ConsentRecord {
  return {
    consentId: newConsentId(),
    subject: "browser-local",
    choices,
    consentVersion: CONSENT_VERSION,
    noticeHash: hashText(CONSENT_NOTICE_TEXT),
    timestamp: new Date().toISOString(),
    source,
    withdrawnAt: null,
  };
}

/** All gateable optional categories set to the same decision. */
export function allChoices(status: ConsentStatus): Partial<Record<ConsentCategory, ConsentStatus>> {
  const out: Partial<Record<ConsentCategory, ConsentStatus>> = {};
  for (const c of gateableOptionalCategories()) out[c.id] = status;
  return out;
}

/**
 * Whether a category is permitted right now.
 *
 * **Denied by default.** An undecided optional category is treated as denied,
 * never as granted — optional technologies must not load before a choice is
 * made. Necessary technologies are always permitted.
 */
export function isAllowed(record: ConsentRecord | null, category: ConsentCategory): boolean {
  if (category === "necessary") return true;
  if (!record || record.withdrawnAt) return false;
  return record.choices[category] === "granted";
}

/**
 * True when we still need to ask. False once a decision exists for the
 * current consent version — a version bump re-asks, because the thing being
 * agreed to has changed.
 */
export function needsDecision(record: ConsentRecord | null): boolean {
  if (gateableOptionalCategories().length === 0) return false;
  if (!record || record.withdrawnAt) return true;
  return record.consentVersion !== CONSENT_VERSION;
}
