import type { LegalDocument } from "@/components/legal/legal-content";

/** Acceptable Use Policy, Intellectual Property Policy and Disclaimer. */

export const acceptableUseDocument: LegalDocument = {
  intro: [
    "This policy sets out what you may and may not do with the Sanixor AI website, its forms, its API and our events. It forms part of our [Terms of Service](/terms).",
    "The principle behind it is simple: use our services for what they are for, and do not damage them or harm other people through them.",
  ],

  sections: [
    {
      id: "permitted",
      heading: "What you may do",
      blocks: [
        {
          type: "ul",
          items: [
            "Browse the website and read anything published on it.",
            "Submit our forms in good faith with accurate information about yourself.",
            "Register for and take part in our events, following that event's rules.",
            "Link to our pages, and quote short extracts with attribution.",
            "Report a security vulnerability responsibly, as described in our [Security Policy](/security).",
          ],
        },
      ],
    },

    {
      id: "prohibited",
      heading: "What you must not do",
      blocks: [
        {
          type: "p",
          text: "**Against our infrastructure:**",
        },
        {
          type: "ul",
          items: [
            "Attempt to gain unauthorised access to any part of the website, the API, our accounts or our storage.",
            "Probe, scan or test the security of our systems except as permitted under our [Security Policy](/security).",
            "Run a denial-of-service attack, or deliberately flood our forms or endpoints.",
            "Circumvent rate limits, honeypots or other protective measures, including by distributing requests to disguise their origin.",
            "Scrape the site by automated means beyond ordinary search-engine indexing, or reverse-engineer the API.",
            "Introduce malware, or upload or link to anything designed to cause harm.",
          ],
        },
        {
          type: "p",
          text: "**Through our forms and communications:**",
        },
        {
          type: "ul",
          items: [
            "Submit false or misleading information, or impersonate another person or organisation.",
            "Submit another person's personal data without their knowledge and permission.",
            "Use our forms to send spam, advertising, chain messages or bulk solicitation.",
            "Send unlawful, defamatory, obscene, harassing, hateful or threatening content.",
            "Submit material that infringes someone else's intellectual property or confidentiality.",
          ],
        },
        {
          type: "p",
          text: "**At our events:**",
        },
        {
          type: "ul",
          items: [
            "Harass, discriminate against, intimidate or abuse any participant, judge, mentor or member of staff.",
            "Cheat, plagiarise, misrepresent authorship, or submit work that is not yours to submit.",
            "Share credentials, attend on someone else's registration, or register multiple times to gain an advantage.",
            "Disrupt the event or prevent others from taking part.",
          ],
        },
      ],
    },

    {
      id: "enforcement",
      heading: "What happens if you breach this policy",
      blocks: [
        {
          type: "p",
          text: "Depending on how serious the breach is, we may warn you, block your access, remove you from an event without refund, cancel your registration, retain evidence, or report the matter to the authorities where the law requires or where someone is at risk.",
        },
        {
          type: "p",
          text: "We aim to respond proportionately, and where it is practical and lawful we will tell you what we have done and why. If you think we have acted wrongly, use [Grievance Redressal](/grievance).",
        },
      ],
    },

    {
      id: "reporting",
      heading: "Reporting misuse",
      blocks: [
        {
          type: "p",
          text: "To report abuse of our services or of someone at one of our events, email **{{contact.support}}**. For security vulnerabilities, use {{contact.security}} and follow the [Security Policy](/security).",
        },
      ],
    },
  ],
};

/* ══════════════════════════════════════════════════════════════════════ */

export const intellectualPropertyDocument: LegalDocument = {
  intro: [
    "This policy explains who owns what: our content and marks, the material you send us, and what happens to work created at our events.",
  ],

  sections: [
    {
      id: "ours",
      heading: "What belongs to us",
      blocks: [
        {
          type: "p",
          text: "The Sanixor AI name and logo, our product names, and the design, layout, text, graphics, illustrations and software of this website belong to **{{legalName}}** or to our licensors, and are protected by Indian and international intellectual property law.",
        },
        {
          type: "p",
          text: "Nothing on this website grants you a licence to use our trade marks, branding or content except as set out below.",
        },
      ],
    },

    {
      id: "what-you-may-do",
      heading: "What you may do with our content",
      blocks: [
        {
          type: "ul",
          items: [
            "View, print and share pages for your own personal or internal business use.",
            "Link to any page on this site.",
            "Quote short extracts for reporting, review, comment or teaching, with clear attribution to Sanixor AI and a link to the source.",
          ],
        },
        {
          type: "p",
          text: "You must not republish substantial parts of the site, present our content as your own, use our marks in a way that suggests endorsement or affiliation we have not given, or use our content to train a machine-learning model without our written permission.",
        },
      ],
    },

    {
      id: "yours",
      heading: "What belongs to you",
      blocks: [
        {
          type: "p",
          text: "**You keep ownership of everything you send us.** Enquiries, application materials, portfolios and event submissions remain yours.",
        },
        {
          type: "p",
          text: "By sending it, you grant us a limited, non-exclusive, royalty-free licence to use it **only for the purpose you sent it for** — answering your enquiry, assessing your application, or running and judging the event you entered. We do not acquire a right to commercialise your work.",
        },
        {
          type: "p",
          text: "You confirm that what you send is yours to send, that you have any permission needed, and that it does not infringe anyone else's rights.",
        },
      ],
    },

    {
      id: "event-submissions",
      heading: "Work created at our events",
      blocks: [
        {
          type: "ul",
          items: [
            "**You own what you build.** Taking part in a hackathon or workshop does not transfer ownership of your project to us.",
            "**We may show it.** You grant us a licence to display, describe and reference your submission for the purposes of judging, and for promoting the event and our work — including on our website and social channels, with attribution.",
            "**Open-source obligations are yours.** If your submission includes third-party or open-source components, you are responsible for complying with their licences.",
            "**Prizes are not a purchase of rights.** Accepting a prize does not assign your intellectual property to us or to a sponsor unless that event's rules say so explicitly and you agree separately.",
          ],
        },
        {
          type: "p",
          text: "Where an event's published rules deal with intellectual property differently, those rules govern for that event and will say so clearly.",
        },
      ],
    },

    {
      id: "open-source",
      heading: "Open-source software we use",
      blocks: [
        {
          type: "p",
          text: "This website is built on open-source software, used under its respective licences. We are compiling a complete attribution notice listing those components and their licences, and will publish it here.",
        },
      ],
    },

    {
      id: "infringement",
      heading: "Reporting infringement",
      blocks: [
        {
          type: "p",
          text: "If you believe something on this site infringes your intellectual property, email **{{contact.support}}** with the subject line `IP infringement`, and include:",
        },
        {
          type: "ol",
          items: [
            "What you own, and evidence of ownership.",
            "Exactly where the allegedly infringing material appears — a URL.",
            "Why you believe it infringes.",
            "Your contact details, and a statement that your complaint is made in good faith.",
          ],
        },
        {
          type: "p",
          text: "We acknowledge within **2 business days** and investigate promptly. If material is infringing we will remove it. If we think it is not, we will tell you why.",
        },
      ],
    },
  ],
};

/* ══════════════════════════════════════════════════════════════════════ */

export const disclaimerDocument: LegalDocument = {
  intro: ["This page sets out the limits of what you should rely on from this website."],

  sections: [
    {
      id: "general",
      heading: "General information only",
      blocks: [
        {
          type: "p",
          text: "The content of this website is general information about Sanixor AI and our products and services. It is not professional advice — legal, financial, technical or otherwise — and you should not act or refrain from acting on the basis of it alone.",
        },
        {
          type: "p",
          text: "We take care to keep the site accurate and current, but we do not warrant that it is complete, accurate or up to date, and we may change or remove content without notice.",
        },
      ],
    },

    {
      id: "products",
      heading: "Product descriptions and claims",
      blocks: [
        {
          type: "p",
          text: "Product pages describe capabilities, roadmaps and intentions. Availability, features and performance may change as products develop, and screenshots, demonstrations and illustrations are indicative rather than a guarantee of what you will experience.",
        },
        {
          type: "p",
          text: "Nothing on this website is a binding offer or a commitment to deliver a particular feature by a particular date. Where we have agreed something with you in a signed contract, that contract governs — not this website.",
        },
      ],
    },

    {
      id: "ai",
      heading: "About our AI products",
      blocks: [
        {
          type: "p",
          text: "Sanixor AI builds products that use artificial intelligence. AI systems can produce output that is incorrect, incomplete or misleading, even when it reads confidently.",
        },
        {
          type: "p",
          text: "Where you use one of our AI products, you remain responsible for reviewing its output before relying on it, particularly for anything consequential. Our products are tools to support human judgement, not replacements for it. Product-specific terms will govern any such use.",
        },
        {
          type: "note",
          text: "**This website itself runs no AI on your data.** Nothing you submit through the forms on this site is processed by a machine-learning model — see the [Privacy Policy](/privacy#no-tracking).",
        },
      ],
    },

    {
      id: "third-party",
      heading: "External links and third-party content",
      blocks: [
        {
          type: "p",
          text: "This site links to external websites and social platforms, and loads typefaces from a third-party font service. We do not control that content and are not responsible for its accuracy, availability or practices. A link is not an endorsement.",
        },
      ],
    },

    {
      id: "availability",
      heading: "Availability",
      blocks: [
        {
          type: "p",
          text: "We do not guarantee that this website will be available without interruption or free from error. We may suspend, withdraw or restrict any part of it for operational or maintenance reasons, usually without notice.",
        },
      ],
    },

    {
      id: "liability",
      heading: "Liability",
      blocks: [
        {
          type: "p",
          text: "To the extent permitted by law, we exclude liability for loss arising from reliance on this website's content. The limits and exclusions in our [Terms of Service](/terms#liability) apply here in full.",
        },
        {
          type: "p",
          text: "Nothing on this page excludes liability that cannot lawfully be excluded, and nothing affects your statutory rights as a consumer under the Consumer Protection Act, 2019.",
        },
      ],
    },
  ],
};
