/**
 * Event-scoped policy pages: /events/:eventSlug/{terms,code-of-conduct,rules,refund,privacy}
 *
 * One component serves all five document types for every registered event.
 * Adding an event to `events.config.ts` gives it a complete policy suite
 * with no new routes and no copied pages.
 */
import { Navigate, useParams } from "react-router-dom";
import { LegalPage } from "@/components/legal/LegalPage";
import { getEvent } from "@/config/events.config";
import { POLICIES } from "@/config/policies.config";
import type { LegalDocument } from "@/components/legal/legal-content";
import type { EventMeta } from "@/config/events.config";
import {
  buildEventCodeOfConduct,
  buildEventPrivacy,
  buildEventRefund,
  buildEventRules,
  buildEventTerms,
  localiseEventLinks,
} from "@/content/events/event-policies";

export type EventPolicyKind = "terms" | "code-of-conduct" | "rules" | "refund" | "privacy";

interface KindConfig {
  title: string;
  summary: (event: EventMeta) => string;
  build: (event: EventMeta) => LegalDocument;
  /** Which general policy this event page inherits version metadata from. */
  basePolicy: keyof typeof POLICIES;
}

const KINDS: Record<EventPolicyKind, KindConfig> = {
  terms: {
    title: "Event Terms and Conditions",
    summary: (e) => `The terms governing registration for and participation in ${e.name}.`,
    build: buildEventTerms,
    basePolicy: "terms",
  },
  "code-of-conduct": {
    title: "Participant Code of Conduct",
    summary: (e) =>
      `The behaviour expected of everyone taking part in ${e.name}, and how to report a breach.`,
    build: buildEventCodeOfConduct,
    basePolicy: "terms",
  },
  rules: {
    title: "Competition Rules",
    summary: (e) => `Submission, judging and disqualification rules for ${e.name}.`,
    build: buildEventRules,
    basePolicy: "terms",
  },
  refund: {
    title: "Event Refund and Cancellation Rules",
    summary: (e) => `When the ${e.name} registration fee is refundable, and how to request it.`,
    build: buildEventRefund,
    basePolicy: "refund-policy",
  },
  privacy: {
    title: "Event Privacy Notice",
    summary: (e) => `What personal data we collect when you register for ${e.name}, and why.`,
    build: buildEventPrivacy,
    basePolicy: "privacy",
  },
};

export function EventPolicyPage({ kind }: { kind: EventPolicyKind }) {
  const { eventSlug } = useParams<{ eventSlug: string }>();
  const event = getEvent(eventSlug);

  // Unknown event slug — send the visitor to the events index rather than
  // rendering a policy for an event that does not exist.
  if (!event) return <Navigate to="/events" replace />;

  const config = KINDS[kind];
  const base = POLICIES[config.basePolicy];

  return (
    <LegalPage
      meta={{
        ...base,
        route: `/events/${event.slug}/${kind}`,
        title: config.title,
        summary: config.summary(event),
      }}
      document={localiseEventLinks(config.build(event), event)}
      titleOverride={config.title}
      eyebrow={event.name}
    />
  );
}
