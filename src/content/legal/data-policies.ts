import type { LegalDocument } from "@/components/legal/legal-content";

/**
 * Subprocessors, Data Rights, Data Deletion and Grievance Redressal.
 *
 * The subprocessor list is derived from the backend service layer, not from
 * a vendor wishlist. Any change to `services/` that introduces a new
 * outbound destination for personal data MUST be reflected here.
 */

export const subprocessorsDocument: LegalDocument = {
  intro: [
    "A subprocessor is a third-party service that processes personal data on our behalf, on our instructions. This page lists every one we use, what it receives, and what for.",
    'We publish this because "we share data with service providers" tells you nothing useful when the providers are a known, fixed and nameable list.',
  ],

  sections: [
    {
      id: "current",
      heading: "Current subprocessors",
      blocks: [
        {
          type: "table",
          caption: "Third parties processing personal data on our behalf",
          headers: ["Provider", "Purpose", "Personal data it receives", "Processing location"],
          rows: [
            [
              "**Google LLC** — Google Sheets API",
              "Our record system. Every form submission is written to a private spreadsheet.",
              "Everything submitted through any form: name, email, phone, organisation, college, roll number, application details, message text and IP address",
              "Global infrastructure, including outside India",
            ],
            [
              "**Cloudflare, Inc.**",
              "Hosting, content delivery, TLS termination and protection against attack, for both the website and the API.",
              "IP address and standard request metadata for every visit; form contents transit through it",
              "Global edge network",
            ],
            [
              "**Razorpay Software Private Limited**",
              "Payment processing for paid events. Operates the hosted checkout.",
              "Name, email, phone and the registration details attached to the payment order; payment instrument data goes directly to Razorpay and never to us",
              "India",
            ],
            [
              "**Resend, Inc.**",
              "Delivery of transactional email — confirmations, tickets and replies.",
              "Recipient name and email address, and the content of the message",
              "Global infrastructure, including outside India",
            ],
          ],
        },
      ],
    },

    {
      id: "not-subprocessors",
      heading: "Third-party content that is not a subprocessor",
      blocks: [
        {
          type: "p",
          text: "**None.** Every asset the site needs is served from our own domain, so browsing sanixor.space causes your browser to contact no other company. We previously loaded typefaces from Google and embedded a third-party map; both have been removed.",
        },
        {
          type: "p",
          text: "The only exception is **Razorpay's checkout**, which loads at the moment you choose to pay — and that is what keeps your card details off our servers.",
        },
        {
          type: "p",
          text: "See the [Cookie Policy](/cookie-policy) for the full picture of what your browser loads.",
        },
      ],
    },

    {
      id: "safeguards",
      heading: "Our obligations and theirs",
      blocks: [
        {
          type: "p",
          text: "Under the DPDP Act, 2023 we remain responsible for personal data processed on our behalf, regardless of any agreement with a processor. We engage each provider under its data-processing terms, use each only for the purpose above, and give each only the data it needs for that purpose.",
        },
        {
          type: "warning",
          text: "**Status, stated honestly.** Formalising and filing executed data-processing agreements with each provider above is work in progress. The processing described here is real and current; the contractual paperwork behind it is being completed. We will update this page as each is finalised rather than implying it is already done.",
        },
      ],
    },

    {
      id: "changes",
      heading: "Changes to this list",
      blocks: [
        {
          type: "p",
          text: "We update this page when we add or remove a subprocessor. If you want to be told in advance of a change, email {{contact.privacy}} and we will add you to the notification list.",
        },
      ],
    },
  ],
};

/* ══════════════════════════════════════════════════════════════════════ */

export const dataRightsDocument: LegalDocument = {
  intro: [
    "The Digital Personal Data Protection Act, 2023 gives you specific rights over your personal data. This page explains each right and exactly how to use it.",
    "Every request goes to the same place: **{{contact.privacy}}**. There is no form to hunt for and no account to create.",
  ],

  sections: [
    {
      id: "your-rights",
      heading: "The rights you have",
      blocks: [
        {
          type: "definitions",
          items: [
            {
              term: "Right to access information",
              text: "Ask for a summary of the personal data we hold about you, what we have done with it, and which third parties have received it.",
            },
            {
              term: "Right to correction and completion",
              text: "Ask us to correct data that is wrong, complete data that is missing, or update data that is out of date.",
            },
            {
              term: "Right to erasure",
              text: "Ask us to delete your personal data. See [Data Deletion](/data-deletion) for the detail, including the narrow categories we must keep.",
            },
            {
              term: "Right to withdraw consent",
              text: "Withdraw your consent to processing at any time, as easily as you gave it. We stop processing for that purpose. Processing that already lawfully happened is not undone.",
            },
            {
              term: "Right to grievance redressal",
              text: "Complain to us about how we have handled your data and get a proper answer. See [Grievance Redressal](/grievance).",
            },
            {
              term: "Right to nominate",
              text: "Nominate another person to exercise these rights on your behalf if you die or become incapacitated. Tell us who, and we will record it.",
            },
          ],
        },
      ],
    },

    {
      id: "how-to-ask",
      heading: "How to make a request",
      blocks: [
        {
          type: "p",
          text: "Email **{{contact.privacy}}** and tell us:",
        },
        {
          type: "ol",
          items: [
            "Which right you want to use — access, correction, erasure, withdrawal or nomination.",
            "The **email address you used** when you gave us the data. This is how we find your records.",
            "Anything that helps us locate it — a registration ID, the approximate date, or which form you used.",
            "For a correction: what is wrong, and what it should say.",
          ],
        },
        {
          type: "note",
          text: "Send the request **from the email address the data was submitted with** where you can. That is the simplest way for us to verify it is really you, and it usually means we can act immediately.",
        },
      ],
    },

    {
      id: "verification",
      heading: "How we verify it is you",
      blocks: [
        {
          type: "p",
          text: "We have to be sure we are not disclosing or deleting someone else's data on a stranger's say-so. Normally, confirming you control the email address the data was submitted with is enough.",
        },
        {
          type: "p",
          text: "If a request comes from a different address, or asks for something unusually broad, we may ask for more — such as confirmation of a registration ID or a detail only you would know. We will ask for the least we can get away with, and we will not demand identity documents for a routine request.",
        },
      ],
    },

    {
      id: "timelines",
      heading: "How long we take",
      blocks: [
        {
          type: "table",
          headers: ["Stage", "Timeline"],
          rows: [
            ["We acknowledge your request", "Within **2 business days**"],
            ["We complete it, or explain why we cannot", "Within **30 days**"],
            [
              "If it is genuinely complex",
              "We will tell you before the 30 days are up, explain why, and give you a date",
            ],
          ],
        },
        {
          type: "p",
          text: "There is no charge for making a request.",
        },
      ],
    },

    {
      id: "limits",
      heading: "When we may not be able to comply",
      blocks: [
        {
          type: "p",
          text: "Occasionally we must decline part of a request. If so, we will tell you which part, and why. The usual reasons:",
        },
        {
          type: "ul",
          items: [
            "**Legal retention.** Payment and tax records must be kept for a statutory period, even if you ask us to delete them.",
            "**Someone else's data.** We will not disclose information that would reveal another person's personal data.",
            "**We cannot identify you.** If we genuinely cannot match a request to any record, there is nothing for us to act on.",
            "**Legal claims.** We may retain data needed to establish, exercise or defend a legal claim.",
          ],
        },
      ],
    },

    {
      id: "duties",
      heading: "Your duties",
      blocks: [
        {
          type: "p",
          text: "The DPDP Act, 2023 also places duties on you as a Data Principal: do not impersonate someone else when giving data, do not suppress material information where the law requires it, do not register a false or frivolous grievance, and give only authentic information when exercising the right to correction.",
        },
      ],
    },

    {
      id: "escalation",
      heading: "If you are not satisfied",
      blocks: [
        {
          type: "p",
          text: "First, raise it with our Grievance Officer through [Grievance Redressal](/grievance). If you remain unsatisfied after that, you may complain to the **Data Protection Board of India**.",
        },
      ],
    },
  ],
};

/* ══════════════════════════════════════════════════════════════════════ */

export const dataDeletionDocument: LegalDocument = {
  intro: [
    "You can ask us to delete the personal data we hold about you. This page explains how, what happens, and the narrow set of records we are legally required to keep.",
  ],

  sections: [
    {
      id: "how",
      heading: "How to request deletion",
      blocks: [
        {
          type: "p",
          text: "Email **{{contact.privacy}}** with the subject line `Data deletion request`, from the email address you gave us. Include:",
        },
        {
          type: "ol",
          items: [
            "A statement that you want your personal data deleted.",
            "The **email address** you submitted it with.",
            "Anything that helps us find it — a registration ID, roughly when you contacted us, or which form you used.",
            "Whether you want **everything** deleted, or only data from a specific form or event.",
          ],
        },
        {
          type: "note",
          text: 'You do not need to give a reason. "Please delete my data" is a complete request.',
        },
      ],
    },

    {
      id: "what-happens",
      heading: "What happens next",
      blocks: [
        {
          type: "table",
          headers: ["Stage", "Timeline", "What we do"],
          rows: [
            ["Acknowledgement", "Within **2 business days**", "We confirm we have your request"],
            [
              "Verification",
              "Usually immediate",
              "We confirm the request came from the address the data was submitted with",
            ],
            [
              "Location",
              "Within a few days",
              "We find every record matching your email across all our records",
            ],
            [
              "Deletion",
              "Within **30 days** of your request",
              "We delete the records, and instruct our processors to do the same where they hold a copy",
            ],
            [
              "Confirmation",
              "On completion",
              "We email you to confirm what was deleted and what was retained, if anything",
            ],
          ],
        },
        {
          type: "warning",
          text: "**How deletion is carried out.** Deletion is performed **manually** by a member of our team. We have not yet automated it. This is why the process takes days rather than seconds, and why we confirm in writing when it is done — so you have a record. Automating retention and deletion is planned work, and we will update this page when it lands.",
        },
      ],
    },

    {
      id: "what-we-keep",
      heading: "What we cannot delete",
      blocks: [
        {
          type: "p",
          text: "A small set of records must survive a deletion request:",
        },
        {
          type: "ul",
          items: [
            "**Payment records** — transaction amount, date, order and payment reference — where tax and accounting law requires us to retain them. We keep the minimum, and we will tell you exactly what was retained.",
            "**Records needed for a live legal claim**, for as long as that claim is live.",
            "**Records we are required to keep by law or by a competent authority's order.**",
          ],
        },
        {
          type: "p",
          text: "Everything else goes. Where a record must be retained for one narrow purpose, we delete the parts not needed for it wherever we can.",
        },
      ],
    },

    {
      id: "consequences",
      heading: "What deletion means for you",
      blocks: [
        {
          type: "ul",
          items: [
            "We lose the history of your correspondence with us, so a future enquiry starts from scratch.",
            "If you delete an event registration **before the event**, you cannot attend on it — deletion is not a refund, and the [Refund and Cancellation Policy](/refund-policy) still governs the fee.",
            "A live job application is withdrawn; we cannot continue to consider it.",
            "Deletion is permanent. We cannot restore the data afterwards.",
          ],
        },
      ],
    },

    {
      id: "alternatives",
      heading: "Alternatives worth considering",
      blocks: [
        {
          type: "p",
          text: "Deletion is not always what you actually want. You can instead ask us to **correct** data that is wrong, **withdraw consent** to stop further processing while leaving records intact, or delete only a **specific** submission rather than everything. Just say which you would prefer. See [Your Data Rights](/data-rights).",
        },
      ],
    },
  ],
};

/* ══════════════════════════════════════════════════════════════════════ */

export const grievanceDocument: LegalDocument = {
  intro: [
    "If something has gone wrong — with your data, a payment, an event or anything else — this page explains how to raise it and what we will do about it.",
    "We would much rather hear a complaint directly than have you left with an unresolved problem.",
  ],

  sections: [
    {
      id: "officer",
      heading: "Grievance Officer",
      blocks: [
        {
          type: "p",
          text: "In accordance with the Consumer Protection (E-Commerce) Rules, 2020 and the Digital Personal Data Protection Act, 2023, we have appointed a Grievance Officer:",
        },
        {
          type: "table",
          headers: ["", ""],
          rows: [
            ["**Name**", "{{grievanceOfficer.name}}"],
            ["**Designation**", "{{grievanceOfficer.designation}}"],
            ["**Email**", "{{contact.grievance}}"],
            ["**Phone**", "{{contact.phone}}"],
            ["**Hours**", "{{contact.hours}}"],
            ["**Address**", "{{legalName}}, {{registeredAddress}}"],
          ],
        },
      ],
    },

    {
      id: "how-to-complain",
      heading: "How to raise a complaint",
      blocks: [
        {
          type: "p",
          text: "Email **{{contact.grievance}}** with the subject line `Grievance`, and tell us:",
        },
        {
          type: "ol",
          items: [
            "What happened, and when.",
            "Which service it concerns — a form, a payment, an event, or your personal data.",
            "Your registration ID or the email address you used, so we can find the record.",
            "What outcome you are looking for.",
          ],
        },
      ],
    },

    {
      id: "timelines",
      heading: "What we commit to",
      blocks: [
        {
          type: "table",
          headers: ["Stage", "Timeline"],
          rows: [
            ["We acknowledge your complaint", "Within **2 business days** of receiving it"],
            ["We investigate and respond substantively", "Within **30 days**"],
            [
              "If it will take longer",
              "We tell you before the 30 days expire, explain why, and give you a date",
            ],
          ],
        },
        {
          type: "p",
          text: "We will tell you the outcome in writing, with our reasoning — not just a decision.",
        },
      ],
    },

    {
      id: "escalation",
      heading: "If we do not resolve it",
      blocks: [
        {
          type: "p",
          text: "If you are not satisfied with our response, or we do not respond in time, you can escalate:",
        },
        {
          type: "ul",
          items: [
            "**For personal data matters** — complain to the **Data Protection Board of India** under the Digital Personal Data Protection Act, 2023.",
            "**For consumer matters** — approach the appropriate **Consumer Disputes Redressal Commission** under the Consumer Protection Act, 2019, or the National Consumer Helpline.",
            "**For payment matters** — you may also raise the issue with **Razorpay**, our payment processor, or with your own bank or card issuer.",
          ],
        },
        {
          type: "p",
          text: "Using this process does not limit any legal right you have, and you are not required to exhaust it before going elsewhere.",
        },
      ],
    },
  ],
};
