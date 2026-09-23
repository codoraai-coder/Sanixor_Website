import type { LegalDocument } from "@/components/legal/legal-content";

/**
 * TERMS OF SERVICE v2.0
 *
 * Replaces the previous nine-section page, which carried no payment terms,
 * no refund reference, no governing law and no dispute-resolution clause
 * despite the site selling paid event tickets.
 */
export const termsDocument: LegalDocument = {
  intro: [
    'These Terms of Service govern your use of [sanixor.space](https://sanixor.space) and any service you buy or register for through it, including paid events. They form a binding agreement between you and **{{legalName}}** ("Sanixor AI", "we", "us").',
    "By using this website, or by registering for an event, you accept these terms. If you do not accept them, please do not use the site.",
  ],

  sections: [
    {
      id: "who-may-use",
      heading: "Who may use this website",
      blocks: [
        {
          type: "ul",
          items: [
            "You must be at least **18 years old** to enter into a paid transaction with us. If you are under 18, a parent or lawful guardian must register on your behalf and accept these terms for you.",
            "You must give accurate information. Registering with someone else's identity, a false name, or a college or employer you are not associated with, is a breach of these terms.",
            "You must be legally capable of entering a contract under the Indian Contract Act, 1872.",
          ],
        },
      ],
    },

    {
      id: "using-the-site",
      heading: "Using the website",
      blocks: [
        {
          type: "p",
          text: "You may browse this website, submit our forms in good faith, and register for our events. The [Acceptable Use Policy](/acceptable-use) sets out in detail what you must not do — it forms part of these terms and you should read it.",
        },
        {
          type: "p",
          text: "In short: do not attack, overload, scrape or attempt to gain unauthorised access to the site or the API, do not submit other people's personal data without their permission, and do not use our forms to send spam, malware or unlawful content.",
        },
        {
          type: "p",
          text: "We may suspend or withdraw access to the website, or to a specific service, where we reasonably believe these terms have been breached. Where practical and lawful, we will tell you why.",
        },
      ],
    },

    {
      id: "our-content",
      heading: "Our content and marks",
      blocks: [
        {
          type: "p",
          text: "The website, its design, text, graphics, software, product names and the Sanixor AI name and logo belong to us or our licensors, and are protected by intellectual property law. Nothing on this site transfers any of those rights to you.",
        },
        {
          type: "p",
          text: "You may view and share links to our pages. You may not copy, republish, resell or create derivative works from our content without our written permission, except where the law permits it. The [Intellectual Property Policy](/intellectual-property) covers this in full, including what happens to material you submit to us and how to report infringement.",
        },
      ],
    },

    {
      id: "your-submissions",
      heading: "What you send us",
      blocks: [
        {
          type: "p",
          text: "You keep ownership of everything you submit — enquiries, application materials, event submissions. By sending it, you grant us a limited, non-exclusive licence to use it for the purpose you sent it for: answering your enquiry, assessing your application, or running the event you entered.",
        },
        {
          type: "p",
          text: "You confirm that what you send is yours to send, and that it does not infringe anyone else's rights or break any law. Personal data you submit is handled under our [Privacy Policy](/privacy).",
        },
      ],
    },

    {
      id: "events",
      heading: "Events and registrations",
      blocks: [
        {
          type: "p",
          text: "We run paid and free events including workshops and hackathons. Each event has its own terms, rules and code of conduct, published alongside that event, which apply **in addition** to these terms. Where an event's own terms conflict with these, the event terms govern for that event.",
        },
        {
          type: "ul",
          items: [
            "A registration is confirmed only when payment has been received and verified, and you have been issued a registration ID. Starting a payment does not by itself reserve a place.",
            "Registrations are personal to you and may not be transferred or resold without our written agreement.",
            "You must follow the event's code of conduct. We may remove a participant who breaches it, without refund.",
            "We may change an event's format, schedule, venue, platform, judges, mentors or prizes where we reasonably need to. Where a change is material we will tell registrants as soon as we can.",
          ],
        },
        {
          type: "p",
          text: "Prizes, certificates and other awards are subject to the rules of the specific event, and to your compliance with them. Any tax payable on a prize is the winner's responsibility.",
        },
      ],
    },

    {
      id: "payments",
      heading: "Prices and payment",
      blocks: [
        {
          type: "ul",
          items: [
            "Prices are shown in **Indian Rupees (INR)** on the relevant event page, inclusive of applicable taxes unless stated otherwise.",
            "Payments are processed by **Razorpay**, an RBI-authorised payment aggregator, on its own hosted checkout. We never receive, see or store your card number, CVV or expiry date.",
            "Your payment is also subject to Razorpay's terms and its privacy policy. Payment failures, authorisation declines and bank-side issues are between you, your bank and Razorpay, though we will help you where we can.",
            "We record the payment reference data described in the [Privacy Policy](/privacy) — order ID, payment ID, amount and status — as our record of the transaction.",
            "If an amount is debited but your registration does not complete, contact us and we will reconcile it. See the [Refund and Cancellation Policy](/refund-policy).",
          ],
        },
        {
          type: "p",
          text: "Refunds, cancellations and what happens if we cancel or postpone an event are governed by the [Refund and Cancellation Policy](/refund-policy), which forms part of these terms.",
        },
      ],
    },

    {
      id: "third-parties",
      heading: "Third-party services and links",
      blocks: [
        {
          type: "p",
          text: "This website relies on third-party services — payment, email, hosting and storage — listed on the [Subprocessors](/subprocessors) page. It also links to external websites and social platforms.",
        },
        {
          type: "p",
          text: "We do not control third-party services or sites and are not responsible for their content, availability or practices. A link is not an endorsement. Your use of a third-party service is governed by that party's own terms.",
        },
      ],
    },

    {
      id: "disclaimers",
      heading: "Disclaimers",
      blocks: [
        {
          type: "p",
          text: "The website and its content are provided **as is** and **as available**. We do not warrant that the site will be uninterrupted, error-free, or free of harmful components, and we do not warrant that information on it is complete or current.",
        },
        {
          type: "p",
          text: "Information on this website is general information about our products and services. It is not professional, legal, financial or technical advice, and you should not rely on it as such. Our [Disclaimer](/disclaimer) sets this out more fully.",
        },
        {
          type: "p",
          text: "Nothing in these terms excludes or limits any liability that cannot lawfully be excluded or limited, including liability for death or personal injury caused by negligence, or for fraud.",
        },
      ],
    },

    {
      id: "liability",
      heading: "Limitation of liability",
      blocks: [
        {
          type: "p",
          text: "Subject to the paragraph above, and to the extent permitted by law:",
        },
        {
          type: "ul",
          items: [
            "We are not liable for indirect, incidental, special, consequential or punitive loss, or for loss of profit, revenue, data, goodwill or anticipated savings.",
            "Our total aggregate liability arising out of or in connection with these terms, or your use of the website or an event, is limited to the amount you actually paid us for the service the claim relates to, or **INR 1,000**, whichever is higher.",
            "We are not liable for any failure or delay caused by an event beyond our reasonable control — see [Force majeure](#force-majeure).",
          ],
        },
        {
          type: "p",
          text: "Nothing in this section limits your rights as a consumer under the Consumer Protection Act, 2019, which apply regardless of what these terms say.",
        },
      ],
    },

    {
      id: "indemnity",
      heading: "Indemnity",
      blocks: [
        {
          type: "p",
          text: "You agree to indemnify us against reasonable losses, damages and costs we actually incur arising from your breach of these terms, your misuse of the website, your infringement of a third party's rights, or your violation of law. We will notify you promptly of any claim, will not settle it without consulting you, and will let you participate in its defence.",
        },
      ],
    },

    {
      id: "force-majeure",
      heading: "Force majeure",
      blocks: [
        {
          type: "p",
          text: "We are not in breach of these terms, and not liable for delay or failure to perform, where the cause is beyond our reasonable control. That includes natural disaster, epidemic, war, civil unrest, strike, fire, flood, government action or restriction, failure of a public telecommunications or power network, and failure of a third-party hosting, payment or communications provider.",
        },
        {
          type: "p",
          text: "Where such an event prevents an event from going ahead, the [Refund and Cancellation Policy](/refund-policy) sets out what happens to your registration fee.",
        },
      ],
    },

    {
      id: "suspension",
      heading: "Suspension and termination",
      blocks: [
        {
          type: "p",
          text: "We may suspend or terminate your access to the website or to an event where you materially breach these terms, the [Acceptable Use Policy](/acceptable-use) or an event code of conduct, or where we are required to by law.",
        },
        {
          type: "p",
          text: "You may stop using the website at any time. You can ask us to delete the personal data we hold about you via the [Data Deletion](/data-deletion) page, subject to records we must keep by law.",
        },
      ],
    },

    {
      id: "changes",
      heading: "Changes to these terms",
      blocks: [
        {
          type: "p",
          text: "We may update these terms. The version and effective date at the top of this page always identify the current version, and we keep the version history.",
        },
        {
          type: "p",
          text: "When you register for a paid event, we record **which version** of these terms and of the [Privacy Policy](/privacy) you accepted, and when. A later change to these terms does not retrospectively alter the terms your completed registration was made under.",
        },
      ],
    },

    {
      id: "governing-law",
      heading: "Governing law and disputes",
      blocks: [
        {
          type: "p",
          text: "These terms, and any dispute arising out of or in connection with them, are governed by **{{jurisdiction.governingLaw}}**, without regard to conflict-of-laws rules.",
        },
        {
          type: "p",
          text: "The courts at {{jurisdiction.forum}} have exclusive jurisdiction, except that we may bring proceedings to protect our intellectual property in any court of competent jurisdiction.",
        },
        {
          type: "p",
          text: "**Before starting proceedings, please talk to us.** Most disputes can be resolved quickly. Raise it through [Grievance Redressal](/grievance) — we acknowledge within 2 business days and aim to resolve within 30 days. Nothing here affects your right to approach a consumer forum under the Consumer Protection Act, 2019.",
        },
      ],
    },

    {
      id: "general",
      heading: "General",
      blocks: [
        {
          type: "ul",
          items: [
            "**Entire agreement.** These terms, together with the policies they refer to and any event-specific terms, are the whole agreement between us on this subject.",
            "**Severability.** If any provision is held unenforceable, the rest continues in force and the unenforceable provision applies to the fullest extent the law allows.",
            "**No waiver.** If we do not enforce a right, that is not a waiver of it.",
            "**Assignment.** You may not assign your rights under these terms without our consent. We may assign ours as part of a reorganisation or sale of the business, on notice to you.",
            "**Contact.** Questions about these terms: {{contact.support}}.",
          ],
        },
      ],
    },
  ],
};
