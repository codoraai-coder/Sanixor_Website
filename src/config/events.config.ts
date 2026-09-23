/**
 * ════════════════════════════════════════════════════════════════════════
 *  EVENT REGISTRY
 * ════════════════════════════════════════════════════════════════════════
 *
 * Facts about each event, used to generate its policy suite at
 * /events/:slug/{terms,code-of-conduct,rules,refund,privacy}.
 *
 * ── RULE ───────────────────────────────────────────────────────────────
 * Only put VERIFIED facts here. Every field below for AgentVerse 2.0 was
 * taken from the live event page (src/routes/events/agentverse-2.tsx) or
 * from the backend pricing constant, not invented. Where a fact is not
 * published anywhere, use `null` and the policy pages will omit or flag it
 * rather than state something unverified.
 */

export interface EventMeta {
  /** URL slug, e.g. "agentverse-2". */
  slug: string;
  name: string;
  /** Short descriptor used in policy intros, e.g. "AI agent competition". */
  kind: string;
  /** Event landing page. */
  page: string;
  /** Registration fee in paise, or null if free / not published. */
  feePaise: number | null;
  /** Where it happens. */
  format: string;
  /** Platforms used to run it. */
  platforms: string[];
  /** Whether entries are solo or team. */
  participation: "individual" | "team";
  /** Eligibility bullets, as published on the event page. */
  eligibility: string[];
  /** Prizes, as published. Keep the caveats. */
  prizes: string[];
  /** Whether registration is currently open. */
  registrationOpen: boolean;
  /** ISO date of the event, or null if not yet published. */
  eventDate: string | null;
}

/** Formats paise as an INR string, e.g. 7900 → "INR 79". */
export function formatFee(paise: number | null): string {
  if (paise === null) return "the published registration fee";
  return `INR ${(paise / 100).toLocaleString("en-IN")}`;
}

export const EVENTS: Record<string, EventMeta> = {
  "agentverse-2": {
    slug: "agentverse-2",
    name: "AgentVerse 2.0",
    kind: "AI agent competition and workshop",
    page: "/events/agentverse-2",
    // Source: backend src/constants/index.ts — AGENTVERSE_PRICING (7900 paise).
    feePaise: 7900,
    format: "Fully online",
    platforms: ["Discord", "Google Meet"],
    participation: "individual",
    eligibility: [
      "Undergraduate and graduate students currently enrolled in a technical, mathematics or computer science degree programme.",
      "Early-career developers with up to 3 years of industry experience.",
      "Individual participation only — this is a solo competition and team entries are not accepted.",
      "Working proficiency in Python or Node.js, a basic understanding of LLM prompt configuration, and familiarity with server API integration.",
    ],
    prizes: [
      "Free OpenAI Codex subscription for top performers, subject to eligibility and the terms notified with the prize.",
      "Codex subscription and certificates for runners-up.",
      "Top contestants may receive internship offers. An offer is discretionary and is not guaranteed by participation or by placing.",
    ],
    registrationOpen: false,
    eventDate: null,
  },
};

export function getEvent(slug: string | undefined): EventMeta | undefined {
  return slug ? EVENTS[slug] : undefined;
}

export const EVENT_LIST = Object.values(EVENTS);
