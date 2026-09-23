/**
 * ════════════════════════════════════════════════════════════════════════
 *  CONSENT AND TECHNOLOGY REGISTRY
 * ════════════════════════════════════════════════════════════════════════
 *
 * The authoritative inventory of every storage and third-party technology
 * this site uses. The Cookie Policy, the consent banner and the preference
 * centre all read from here, so the published page cannot drift from what
 * the code actually does.
 *
 * ── THIS LIST WAS DERIVED FROM THE CODE, NOT FROM THE POLICY ───────────
 * Verified 2026-09-23 by scanning for `document.cookie`, `localStorage`,
 * `sessionStorage` and outbound network requests:
 *
 *   • cookies set:        NONE. The only `document.cookie` write lives in
 *                         `ui/sidebar.tsx`, which is imported nowhere.
 *   • localStorage:       two keys, both first-party and functional.
 *   • sessionStorage:     none.
 *   • third-party loads:  NONE. Typefaces are self-hosted (Phase 4) and the
 *                         OpenStreetMap embed was removed (Phase 2). The
 *                         only third-party origin the browser ever contacts
 *                         is Razorpay's checkout, and only at the moment a
 *                         visitor chooses to pay.
 *
 * ── WHY THERE ARE NO ANALYTICS OR MARKETING ENTRIES ────────────────────
 * Because the site runs none. Presenting an "Analytics" toggle that governs
 * nothing would be a fabricated choice — the mirror image of a dark
 * pattern. The categories are modelled so the architecture is ready, but a
 * category with no registered technologies is never shown.
 *
 * ── WHEN YOU ADD A TECHNOLOGY ──────────────────────────────────────────
 * Add it here FIRST, with an honest category. `verify-compliance` checks
 * that every real localStorage key appears in this registry, and the Cookie
 * Policy is generated from it.
 */

export type ConsentCategory =
  "necessary" | "functional" | "analytics" | "marketing" | "third-party-content";

export interface CategoryMeta {
  id: ConsentCategory;
  label: string;
  description: string;
  /** Necessary technologies cannot be declined; everything else can. */
  optional: boolean;
}

export const CONSENT_CATEGORIES: CategoryMeta[] = [
  {
    id: "necessary",
    label: "Strictly necessary",
    description:
      "Required for the site to work and to remember the choice you make here. Cannot be switched off.",
    optional: false,
  },
  {
    id: "functional",
    label: "Functional",
    description:
      "Remembers preferences on your own device — your theme, and whether you have already booked a demo. The site works fine without these; it simply forgets.",
    optional: true,
  },
  {
    id: "analytics",
    label: "Analytics",
    description: "Measuring how the site is used.",
    optional: true,
  },
  {
    id: "marketing",
    label: "Marketing",
    description: "Advertising and cross-site tracking.",
    optional: true,
  },
  {
    id: "third-party-content",
    label: "Third-party content",
    description:
      "Content served by another company, which receives your IP address when your browser fetches it.",
    optional: true,
  },
];

export interface TechnologyEntry {
  id: string;
  category: ConsentCategory;
  name: string;
  purpose: string;
  /** Storage key, or the origin contacted. */
  identifier: string;
  mechanism: "localStorage" | "sessionStorage" | "cookie" | "network-request";
  duration: string;
  provider: string;
  firstParty: boolean;
}

export const TECHNOLOGY_REGISTRY: TechnologyEntry[] = [
  {
    id: "consent-record",
    category: "necessary",
    name: "Consent record",
    purpose:
      "Stores the choice you make about optional technologies, so we do not ask again on every page.",
    identifier: "sanixor_consent",
    mechanism: "localStorage",
    duration: "Until you clear your browser storage or change your choice",
    provider: "Sanixor AI",
    firstParty: true,
  },
  {
    id: "theme",
    category: "functional",
    name: "Theme preference",
    purpose: "Remembers the colour theme you chose so it is not reset on every visit.",
    identifier: "sanixor-theme",
    mechanism: "localStorage",
    duration: "Until you clear your browser storage",
    provider: "Sanixor AI",
    firstParty: true,
  },
  {
    id: "demo-booked",
    category: "functional",
    name: "Demo booked flag",
    purpose: "Remembers that you already booked a demo, so we do not prompt you again.",
    identifier: "sanixor_demo_booked",
    mechanism: "localStorage",
    duration: "Until you clear your browser storage",
    provider: "Sanixor AI",
    firstParty: true,
  },
];

/**
 * Technologies the browser loads before any script runs, which therefore
 * cannot be gated behind an in-app consent choice.
 *
 * **Currently empty.** Google Fonts used to sit here: it loaded from a
 * stylesheet link in `index.html` and could only be disclosed, not
 * controlled. Phase 4 self-hosted the typefaces, which removed the third
 * party entirely rather than continuing to explain why it could not be
 * switched off.
 *
 * Keep this list empty if at all possible. An entry here is an admission
 * that we are telling people about something they cannot decline.
 */
export const UNGATEABLE_TECHNOLOGY_IDS: string[] = [];

/**
 * Bump when the categories, the technologies or the banner wording change
 * in a way that alters what a person was actually agreeing to. Existing
 * records keep their old version — they are never rewritten.
 */
export const CONSENT_VERSION = "1.0";

/** The exact wording shown when consent is asked for. Hashed into the record. */
export const CONSENT_NOTICE_TEXT =
  "Sanixor AI sets no cookies and runs no analytics or advertising. We would like to use two small items of browser storage to remember your theme and whether you have booked a demo. These stay on your device and are never sent to us. You can decline, and change your mind at any time.";

/** Categories that actually have a technology registered and can be gated. */
export function gateableOptionalCategories(): CategoryMeta[] {
  return CONSENT_CATEGORIES.filter(
    (c) =>
      c.optional &&
      TECHNOLOGY_REGISTRY.some(
        (t) => t.category === c.id && !UNGATEABLE_TECHNOLOGY_IDS.includes(t.id),
      ),
  );
}

/** Technologies in a category. */
export function technologiesIn(category: ConsentCategory): TechnologyEntry[] {
  return TECHNOLOGY_REGISTRY.filter((t) => t.category === category);
}
