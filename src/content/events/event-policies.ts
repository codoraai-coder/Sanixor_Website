import type { LegalDocument } from "@/components/legal/legal-content";
import { formatFee, type EventMeta } from "@/config/events.config";

/**
 * Generic event policy framework.
 *
 * Each builder takes an EventMeta and returns a document, so a new event
 * gets a complete, consistent policy suite by adding one entry to
 * events.config.ts — not by copying five pages.
 *
 * Event-specific facts come from EventMeta and are never invented here.
 */

/** The five sibling documents an event policy may cross-link to. */
const SIBLINGS = ["terms", "code-of-conduct", "rules", "refund", "privacy"] as const;

/**
 * Rewrites sibling links written as `](rules)` into absolute paths like
 * `](/events/agentverse-2/rules)`.
 *
 * Content is authored with short sibling names for readability, but the
 * renderer treats any href not starting with "/" as external and opens it in
 * a new tab. Resolving them here keeps the content clean and guarantees
 * event cross-links stay internal.
 */
export function localiseEventLinks(doc: LegalDocument, event: EventMeta): LegalDocument {
  const fix = (text: string): string =>
    SIBLINGS.reduce(
      (acc, sibling) => acc.split(`](${sibling})`).join(`](/events/${event.slug}/${sibling})`),
      text,
    );

  const mapStrings = (value: unknown): unknown => {
    if (typeof value === "string") return fix(value);
    if (Array.isArray(value)) return value.map(mapStrings);
    if (value && typeof value === "object") {
      return Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, mapStrings(v)]),
      );
    }
    return value;
  };

  return mapStrings(doc) as LegalDocument;
}

export function buildEventTerms(event: EventMeta): LegalDocument {
  const fee = formatFee(event.feePaise);

  return {
    intro: [
      `These terms govern your registration for and participation in **${event.name}**, a ${event.kind} organised by {{legalName}}.`,
      "They apply **in addition** to our general [Terms of Service](/terms). Where the two conflict, these event terms govern for this event.",
    ],
    sections: [
      {
        id: "eligibility",
        heading: "Who can take part",
        blocks: [
          { type: "p", text: `${event.name} is open to:` },
          { type: "ul", items: event.eligibility },
          {
            type: "p",
            text: "You must be at least **18 years old** to register and pay for this event yourself. If you are under 18, a parent or lawful guardian must complete the registration on your behalf and accept these terms for you.",
          },
          {
            type: "p",
            text: "We may ask you to evidence your eligibility — for example a student ID or enrolment record. Registering without meeting the criteria, or with false information, means your registration may be cancelled without refund.",
          },
        ],
      },
      {
        id: "registration",
        heading: "Registration and payment",
        blocks: [
          {
            type: "ul",
            items: [
              `The registration fee is **${fee}**, payable at the time of registration.`,
              "Payment is taken through **Razorpay**'s hosted checkout. We never receive or store your card details.",
              "Your registration is confirmed only once payment has been verified and you have received a **registration ID** and confirmation email. Beginning a payment does not by itself reserve a place.",
              "Your registration is **personal to you**. It cannot be transferred, shared or resold.",
              "You must register with accurate details. Your name and email are used to issue your ticket and to admit you.",
            ],
          },
          {
            type: "p",
            text: "Refunds and cancellations are governed by the [event refund rules](refund) and our general [Refund and Cancellation Policy](/refund-policy).",
          },
        ],
      },
      {
        id: "format",
        heading: "Format and delivery",
        blocks: [
          {
            type: "p",
            text: `**${event.format}.** The event runs on ${event.platforms.join(" and ")}. You are responsible for your own device, internet connection and accounts needed to join these platforms.`,
          },
          {
            type: "p",
            text: "You must comply with the terms of any third-party platform used to run the event. We do not control those platforms and are not responsible for their availability.",
          },
          {
            type: "p",
            text: `Participation is **${event.participation === "individual" ? "individual only — this is a solo competition and team entries are not accepted" : "as a team, under the team rules published for this event"}**.`,
          },
        ],
      },
      {
        id: "changes",
        heading: "Changes, postponement and cancellation",
        blocks: [
          {
            type: "p",
            text: "We may change the schedule, format, platform, judging panel, mentors or prize structure where we reasonably need to. Where a change is material, we will tell registrants by email as soon as we can.",
          },
          {
            type: "ul",
            items: [
              "**If we postpone**, your registration carries over to the new date. If the new date does not work for you, you may request a full refund within 14 days of the announcement.",
              "**If we cancel**, every registrant receives a full refund.",
              "**If a force-majeure event prevents the event going ahead**, we will reschedule or refund. See [Force majeure](/terms#force-majeure).",
            ],
          },
        ],
      },
      {
        id: "prizes",
        heading: "Prizes and certificates",
        blocks: [
          { type: "p", text: "Prizes announced for this event:" },
          { type: "ul", items: event.prizes },
          {
            type: "ul",
            items: [
              "Prizes are awarded at the judges' discretion, on the criteria in the [event rules](rules). Judging decisions are final.",
              "Prizes are **not transferable** and cannot be exchanged for cash unless we say otherwise.",
              "You must have complied with these terms, the [rules](rules) and the [code of conduct](code-of-conduct) to receive a prize.",
              "**Any tax payable on a prize is the winner's responsibility.** We may need identity or tax details before releasing a prize, and may withhold amounts where the law requires.",
              "Third-party prizes such as software subscriptions are subject to that provider's own terms and eligibility, which we do not control.",
              "An internship opportunity mentioned in connection with this event is **discretionary**. Participating, or placing, does not entitle you to an offer.",
            ],
          },
        ],
      },
      {
        id: "media",
        heading: "Recording and publicity",
        blocks: [
          {
            type: "p",
            text: "Sessions may be recorded for participants who could not attend live, and we may take screenshots or clips for reporting on the event.",
          },
          {
            type: "ul",
            items: [
              "Where a session is recorded, we will say so at the start.",
              "You can take part with your camera off and, where the platform allows, under a display name of your choosing.",
              "We may publish the names and placements of winners, and may reference submissions as described in the [Intellectual Property Policy](/intellectual-property#event-submissions).",
              "If you do not want to appear in event publicity, email {{contact.support}} and we will respect that.",
            ],
          },
        ],
      },
      {
        id: "conduct",
        heading: "Conduct and removal",
        blocks: [
          {
            type: "p",
            text: "All participants must follow the [Code of Conduct](code-of-conduct). We may remove a participant who breaches it, without refund, and may exclude them from future events.",
          },
        ],
      },
      {
        id: "liability",
        heading: "Liability",
        blocks: [
          {
            type: "p",
            text: "The limitations in our general [Terms of Service](/terms#liability) apply to this event. In particular, our total liability in connection with the event is limited as set out there, and we are not liable for failures of third-party platforms, your own connectivity, or loss of your work.",
          },
          {
            type: "p",
            text: "**Keep your own backups of your work.** We are not responsible for work lost during the event.",
          },
        ],
      },
      {
        id: "contact",
        heading: "Questions and complaints",
        blocks: [
          {
            type: "p",
            text: "Questions: {{contact.support}}. Complaints: [Grievance Redressal](/grievance). These terms are governed by {{jurisdiction.governingLaw}}.",
          },
        ],
      },
    ],
  };
}

/* ══════════════════════════════════════════════════════════════════════ */

export function buildEventCodeOfConduct(event: EventMeta): LegalDocument {
  return {
    intro: [
      `Everyone taking part in **${event.name}** — participants, mentors, judges, speakers and staff — is expected to follow this code.`,
      "We want an event where people can do their best work without being harassed, belittled or shut out. That requires a standard everybody is held to, including us.",
    ],
    sections: [
      {
        id: "expected",
        heading: "What we expect",
        blocks: [
          {
            type: "ul",
            items: [
              "**Be respectful.** Disagree with ideas, not with people. Assume good faith.",
              "**Be inclusive.** Behave so that people are not excluded on the basis of gender, gender identity, sexual orientation, disability, appearance, body size, race, caste, religion, nationality, age, or level of experience.",
              "**Be helpful to beginners.** Everyone was new once. Condescension is not mentorship.",
              "**Be honest.** Represent your own work, experience and identity accurately.",
              "**Respect the organisers' decisions**, and raise disagreements through the channels below rather than by disrupting the event.",
            ],
          },
        ],
      },
      {
        id: "unacceptable",
        heading: "What is not acceptable",
        blocks: [
          {
            type: "ul",
            items: [
              "Harassment, intimidation, stalking or unwanted attention, in public channels or in private messages.",
              "Discriminatory, demeaning or hateful language or imagery, including as a joke.",
              "Sexual language or imagery, and unwelcome sexual attention of any kind.",
              "Personal insults, threats, doxxing, or publishing someone's private information.",
              "Sustained disruption of sessions, judging or other participants' work.",
              "Retaliation against someone for reporting a breach of this code.",
              "Encouraging or defending any of the above.",
            ],
          },
          {
            type: "p",
            text: "This applies in every space connected to the event — calls, chat channels, direct messages between participants, shared repositories and any social media activity directed at participants.",
          },
        ],
      },
      {
        id: "integrity",
        heading: "Competition integrity",
        blocks: [
          {
            type: "ul",
            items: [
              "Submit only work you created for this event, or work you have the right to submit and have properly attributed.",
              "Do not plagiarise code, designs, writing or ideas.",
              `Do not register more than once, participate under another person's registration, or let someone else participate under yours. ${event.participation === "individual" ? "This is a solo competition — do not submit work produced by a group as your own." : ""}`,
              "Do not attempt to access other participants' work, the judging systems, or any infrastructure you have not been given access to.",
              "Do not attempt to influence judges improperly.",
              "Follow the event's rules on the use of AI tools — see the [event rules](rules).",
            ],
          },
        ],
      },
      {
        id: "reporting",
        heading: "Reporting a problem",
        blocks: [
          {
            type: "p",
            text: "If you experience or witness behaviour that breaches this code, tell us. Email **{{contact.support}}** with `Code of Conduct` in the subject, or message an organiser directly on the event platform.",
          },
          {
            type: "ul",
            items: [
              "We will take your report seriously and treat it confidentially so far as we can.",
              "We will not require you to confront the person, and we will not disclose your identity to them without your agreement, unless we are legally obliged to.",
              "We will tell you what we decide to do.",
              "If you are in immediate danger, contact your local emergency services first.",
            ],
          },
        ],
      },
      {
        id: "consequences",
        heading: "What happens after a report",
        blocks: [
          {
            type: "p",
            text: "We investigate proportionately and act on what we find. Depending on severity that may mean a private warning, removal from a channel or session, disqualification from judging, removal from the event **without refund**, exclusion from future events, or referral to the authorities where someone is at risk or the law requires it.",
          },
          {
            type: "p",
            text: "If you believe we have acted wrongly, you can challenge it through [Grievance Redressal](/grievance).",
          },
        ],
      },
    ],
  };
}

/* ══════════════════════════════════════════════════════════════════════ */

export function buildEventRules(event: EventMeta): LegalDocument {
  return {
    intro: [
      `These are the competition rules for **${event.name}**. They sit alongside the [event terms](terms) and the [code of conduct](code-of-conduct).`,
    ],
    sections: [
      {
        id: "participation",
        heading: "Participation",
        blocks: [
          {
            type: "ul",
            items: [
              `**${event.participation === "individual" ? "Solo entries only." : "Team entries."}** ${event.participation === "individual" ? "Each participant registers and builds individually. Team entries are not accepted." : "Team composition rules are published with the event."}`,
              "One registration per person. Duplicate registrations may be cancelled.",
              `The event runs ${event.format.toLowerCase()} on ${event.platforms.join(" and ")}. You must be reachable on those platforms for the duration.`,
              "Deadlines are published in the event schedule and are applied strictly. Late submissions are not accepted unless we have extended the deadline for everyone.",
            ],
          },
        ],
      },
      {
        id: "submissions",
        heading: "What you submit",
        blocks: [
          {
            type: "ul",
            items: [
              "Submit through the channel and in the format specified in the event brief. Submissions sent another way may not be assessed.",
              "Your submission must be your own work, created for this event, unless the brief says otherwise.",
              "You may use open-source libraries, frameworks and public APIs, provided you comply with their licences and declare significant components.",
              "Pre-existing work must be declared. Undeclared reuse of substantial prior work may lead to disqualification.",
              "You keep ownership of your submission — see the [Intellectual Property Policy](/intellectual-property#event-submissions).",
            ],
          },
        ],
      },
      {
        id: "ai-tools",
        heading: "Use of AI tools",
        blocks: [
          {
            type: "p",
            text: "This is an AI-focused event, and AI coding assistants are permitted unless the event brief says otherwise.",
          },
          {
            type: "ul",
            items: [
              '**You are responsible for everything you submit**, including anything generated by an AI tool. "The model wrote it" is not a defence for licence violations, insecure code or plagiarism.',
              "Declare AI tools that made a **substantial** contribution to your submission, if the brief asks you to.",
              "Do not use AI tools to impersonate another participant, to generate fake results, or to fabricate benchmark output.",
              "Submitting AI-generated work that reproduces someone else's copyrighted material remains plagiarism.",
            ],
          },
        ],
      },
      {
        id: "judging",
        heading: "Judging",
        blocks: [
          {
            type: "ul",
            items: [
              "Submissions are assessed against the criteria published in the event brief.",
              "Judges may include Sanixor AI staff and external judges.",
              "**Conflicts of interest**: a judge with a personal, academic or professional relationship with a participant must declare it and will not score that participant.",
              "Where automated evaluation is used, the same process is applied to every submission. If an evaluation run fails for technical reasons outside your control, tell us immediately and we will re-run it where we can.",
              "**Judging decisions are final.** We do not re-open scoring, though you may report a procedural problem through [Grievance Redressal](/grievance).",
            ],
          },
        ],
      },
      {
        id: "disqualification",
        heading: "Disqualification",
        blocks: [
          {
            type: "p",
            text: "We may disqualify a participant who plagiarises, misrepresents authorship or eligibility, tampers with evaluation infrastructure, attempts to access another participant's work, breaches the [code of conduct](code-of-conduct), or repeatedly ignores organiser instructions.",
          },
          {
            type: "p",
            text: "Disqualification means loss of any placement and prize. The registration fee is not refunded — see the [event refund rules](refund).",
          },
        ],
      },
      {
        id: "changes",
        heading: "Changes to these rules",
        blocks: [
          {
            type: "p",
            text: "If we need to change these rules once the event has begun, we will notify all participants at the same time and apply the change equally. We will not change scoring criteria retrospectively after submissions close.",
          },
        ],
      },
    ],
  };
}

/* ══════════════════════════════════════════════════════════════════════ */

export function buildEventRefund(event: EventMeta): LegalDocument {
  const fee = formatFee(event.feePaise);

  return {
    intro: [
      `How the ${fee} registration fee for **${event.name}** is treated. This applies our general [Refund and Cancellation Policy](/refund-policy) to this event.`,
    ],
    sections: [
      {
        id: "summary",
        heading: "Summary",
        blocks: [
          {
            type: "table",
            headers: ["Situation", "Outcome"],
            rows: [
              ["You cancel, or cannot attend", "**Not refundable**"],
              ["You do not turn up", "**Not refundable**"],
              ["You are disqualified or removed for misconduct", "**Not refundable**"],
              [`**We cancel** ${event.name}`, "**Full refund**"],
              [
                "**We postpone** and the new date does not suit you",
                "**Full refund** if requested within 14 days of the announcement",
              ],
              ["You were charged twice", "**Full refund of the duplicate**"],
              [
                "Payment taken but no registration created",
                "**Full refund**, or we complete your registration — your choice",
              ],
            ],
          },
        ],
      },
      {
        id: "why",
        heading: "Why participant cancellations are not refunded",
        blocks: [
          {
            type: "p",
            text: `The ${fee} fee is deliberately low and is committed in advance to running the event — platform costs, evaluation infrastructure and organiser time. A place you reserve is a place someone else could not take. That is why we do not refund participant-side cancellations, and why we say so before you pay rather than after.`,
          },
        ],
      },
      {
        id: "how",
        heading: "Requesting a refund",
        blocks: [
          {
            type: "p",
            text: "Email **{{contact.support}}** with `Refund request` in the subject line, your registration ID, and the email address you registered with. The full process, including timelines, is in the [Refund and Cancellation Policy](/refund-policy#how-to-request).",
          },
          {
            type: "p",
            text: "Refunds are reviewed and initiated by a person on our team through Razorpay — they are not automatic. We acknowledge within 48 hours, decide within 7 business days, and initiate approved refunds within 3 business days. Your bank then typically takes 5–7 business days.",
          },
        ],
      },
      {
        id: "exceptional",
        heading: "Exceptional circumstances",
        blocks: [
          {
            type: "p",
            text: "If something serious has happened — a medical emergency or a bereavement — write to {{contact.support}} and tell us. We will look at it on its own facts. Ask rather than assume.",
          },
        ],
      },
    ],
  };
}

/* ══════════════════════════════════════════════════════════════════════ */

export function buildEventPrivacy(event: EventMeta): LegalDocument {
  return {
    intro: [
      `This notice explains what personal data we collect when you register for **${event.name}**, and what we do with it. It supplements our main [Privacy Policy](/privacy), which governs everything not specifically covered here.`,
    ],
    sections: [
      {
        id: "what",
        heading: "What we collect at registration",
        blocks: [
          {
            type: "table",
            headers: ["Data", "Who from", "Why"],
            rows: [
              [
                "Name, email address, phone number",
                "Every registrant",
                "To register you, issue your ticket, and contact you about the event",
              ],
              [
                "College or institution, and roll number",
                "Student registrants",
                "To confirm student eligibility",
              ],
              [
                "Organisation and years of experience",
                "Professional registrants",
                "To confirm early-career eligibility",
              ],
              [
                "Payment reference data — order ID, payment ID, amount, status",
                "Every paying registrant",
                "To confirm payment and keep a transaction record",
              ],
              ["Registration ID and QR code", "Generated by us", "To admit you to the event"],
              [
                "IP address",
                "Every registrant",
                "To detect and prevent fraudulent or abusive registrations",
              ],
              [
                "Your event submission and evaluation results",
                "Participants who submit",
                "To judge the competition",
              ],
            ],
          },
          {
            type: "note",
            text: "We do not collect your card details at any point. Payment is taken on Razorpay's hosted checkout, and your card number, CVV and expiry go directly to Razorpay.",
          },
        ],
      },
      {
        id: "consent",
        heading: "Your consent",
        blocks: [
          {
            type: "p",
            text: "You give consent by ticking the acceptance box before payment. We record **which version** of the [Terms of Service](/terms) and [Privacy Policy](/privacy) you accepted, and when, so that both of us have a clear record.",
          },
          {
            type: "p",
            text: "You can withdraw consent at any time by emailing {{contact.privacy}}. Withdrawing consent before the event means we can no longer register you — see the [event refund rules](refund) for what happens to your fee.",
          },
        ],
      },
      {
        id: "sharing",
        heading: "Who else sees it",
        blocks: [
          {
            type: "ul",
            items: [
              "**Razorpay** — processes your payment and receives the registration details attached to the order.",
              "**Google Sheets** — our record system, where your registration is stored.",
              "**Resend** — delivers your confirmation email and ticket.",
              "**Cloudflare** — hosts the site and API your registration passes through.",
              "**Judges and mentors** — see your submission, and your name where the judging is not anonymous.",
            ],
          },
          {
            type: "p",
            text: "Full detail on each is on the [Subprocessors](/subprocessors) page. We do not sell your data or pass it to sponsors for their own marketing. If a future event involves sharing data with a sponsor or partner, we will say so clearly at registration and ask separately.",
          },
        ],
      },
      {
        id: "retention",
        heading: "How long we keep it",
        blocks: [
          {
            type: "ul",
            items: [
              "**Registration data** — 12 months after the event, then deleted.",
              "**Payment records** — kept as long as tax and accounting law requires. These cannot be deleted on request.",
              "**IP addresses** — 90 days.",
              "**Submissions and results** — 12 months after the event, unless you ask us to remove yours sooner.",
            ],
          },
          {
            type: "p",
            text: "Retention is currently enforced manually rather than by an automated job — see the [Privacy Policy](/privacy#retention). To have your data removed sooner, use [Data Deletion](/data-deletion).",
          },
        ],
      },
      {
        id: "age",
        heading: "If you are under 18",
        blocks: [
          {
            type: "p",
            text: "Under the Digital Personal Data Protection Act, 2023, anyone under 18 is a child, and processing a child's data requires verifiable consent from a parent or lawful guardian. We ask you to confirm your age at registration.",
          },
          {
            type: "p",
            text: "If you are under 18, a parent or guardian must register on your behalf and accept these terms. We do not profile or behaviourally target any participant, of any age.",
          },
        ],
      },
      {
        id: "rights",
        heading: "Your rights",
        blocks: [
          {
            type: "p",
            text: "You can access, correct or delete your registration data, or withdraw consent, at any time — see [Your Data Rights](/data-rights). Contact {{contact.privacy}}. To complain, see [Grievance Redressal](/grievance).",
          },
        ],
      },
    ],
  };
}
