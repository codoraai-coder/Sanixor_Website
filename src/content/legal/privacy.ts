import type { LegalDocument } from "@/components/legal/legal-content";

/**
 * PRIVACY POLICY v2.0
 *
 * Every statement here was reconciled against the source code on 2026-09-23.
 * Before editing, re-verify against:
 *   • backend src/validators/*.ts          — what is actually collected
 *   • backend src/constants/index.ts       — what is actually stored
 *   • backend src/services/*               — who actually receives it
 *   • frontend index.html + contact.tsx    — third-party browser requests
 *
 * Deliberately ABSENT because the product does not implement them:
 *   ✗ LinkedIn OAuth / social sign-in      ✗ user accounts or credentials
 *   ✗ analytics or advertising cookies     ✗ AI processing of visitor data
 *   ✗ automated decision-making            ✗ automated deletion jobs
 */
export const privacyDocument: LegalDocument = {
  intro: [
    '{{brandName}} ("Sanixor AI", "we", "us") operates [sanixor.space](https://sanixor.space) and the API at `api.sanixor.space`. This policy explains what personal data we collect through this website, why we collect it, who processes it on our behalf, how long we keep it, and the rights you hold over it.',
    "This policy describes **only** what the website and its backend actually do today. Where a control is planned but not yet built, we say so plainly rather than implying it already exists.",
  ],

  sections: [
    {
      id: "who-we-are",
      heading: "Who we are",
      blocks: [
        {
          type: "p",
          text: "The entity responsible for the personal data described in this policy is **{{legalName}}**, a {{entityType}} (Udyam registration {{udyam}}, {{enterpriseType}}) owned by {{proprietor}}, with its registered address at {{registeredAddress}}.",
        },
        {
          type: "p",
          text: "Under the Digital Personal Data Protection Act, 2023, we act as a **Data Fiduciary** for the personal data described below: we determine why and how it is processed.",
        },
        {
          type: "definitions",
          items: [
            {
              term: "Data Principal",
              text: "You — the individual the personal data relates to.",
            },
            {
              term: "Data Fiduciary",
              text: "Us — the party that determines the purpose and means of processing.",
            },
            {
              term: "Data Processor",
              text: "A third-party service that processes personal data on our instructions. Each one is named in [Subprocessors](/subprocessors).",
            },
            {
              term: "Personal data",
              text: "Any data about an individual who is identifiable by or in relation to that data.",
            },
          ],
        },
      ],
    },

    {
      id: "what-we-collect",
      heading: "What we collect, and where",
      blocks: [
        {
          type: "p",
          text: "We collect personal data at exactly **four** points on this website. There is no other collection surface: this site has no user accounts, no login, and no social sign-in of any kind.",
        },
        {
          type: "table",
          caption: "Personal data collected by each form",
          headers: ["Where", "What we collect", "Why"],
          rows: [
            [
              "**Contact form** ([/contact](/contact))",
              "Name, email, phone (optional), company (optional), enquiry topic, your message, IP address",
              "To answer your enquiry and keep a record of the correspondence",
            ],
            [
              "**Book a demo**",
              "Name, email, organisation, product of interest, your message, IP address",
              "To arrange and follow up on a product demonstration",
            ],
            [
              "**Careers / hiring form** ([/hiring](/hiring))",
              "Name, email, role applied for, LinkedIn URL (optional), portfolio or résumé URL (optional), your message, IP address",
              "To assess your application for a role with us",
            ],
            [
              "**Event registration**",
              "Name, email, phone, and — for students — roll number and college; for professionals — organisation and years of experience. Plus payment reference data (order ID, payment ID, amount, status) and your registration ID",
              "To register you for the event, take payment, issue your ticket and admit you on the day",
            ],
          ],
        },
        {
          type: "warning",
          text: "**On the LinkedIn field.** The careers form has an optional free-text box where you may paste your LinkedIn profile URL. That is all it is — a text field you fill in yourself. We do **not** connect to LinkedIn, we do not use LinkedIn sign-in, and we hold no permission or token against your LinkedIn account. There is nothing on LinkedIn's side for you to revoke.",
        },
      ],
      subsections: [
        {
          id: "ip-addresses",
          heading: "IP addresses",
          blocks: [
            {
              type: "p",
              text: "When you submit any form, we record the IP address the submission came from, alongside the rest of the form data. We use it solely to detect and investigate spam and abuse of our forms, which are open to the public and unauthenticated.",
            },
            {
              type: "p",
              text: "We treat your IP address as personal data. It is stored in the same record as your name and email — see [Retention](#retention) for how long.",
            },
          ],
        },
        {
          id: "no-tracking",
          heading: "What we do not collect",
          blocks: [
            {
              type: "p",
              text: "For the avoidance of doubt, and unusually for a commercial website, this site runs **no analytics and no advertising technology at all**:",
            },
            {
              type: "ul",
              items: [
                "No Google Analytics, Google Tag Manager, Meta Pixel, PostHog, Mixpanel, Hotjar or Microsoft Clarity.",
                "No advertising, remarketing or conversion-tracking pixels.",
                "No behavioural profiling, scoring, ranking or automated decision-making about you.",
                "No AI or machine-learning model processes anything you submit through this website. Sanixor AI builds AI products, but this website does not run them on your form submissions.",
                "No user accounts, passwords, credentials or authentication sessions.",
                "No selling or renting of personal data, to anyone, ever.",
              ],
            },
            {
              type: "p",
              text: "See the [Cookie Policy](/cookie-policy) for the small number of strictly-functional browser-storage items the site does use.",
            },
          ],
        },
      ],
    },

    {
      id: "legal-basis",
      heading: "Our basis for processing",
      blocks: [
        {
          type: "p",
          text: "Under the DPDP Act, 2023, we process your personal data on the basis of **your consent**, which you give by submitting a form after being shown a notice describing what we will do with the data.",
        },
        {
          type: "table",
          headers: ["Processing", "Basis", "How consent is captured"],
          rows: [
            [
              "Contact, demo and careers forms",
              "Consent",
              "A notice is shown immediately above the submit button. Submitting the form is the affirmative action that gives consent.",
            ],
            [
              "Paid event registration",
              "Consent, and performance of the registration you asked for",
              "You must explicitly tick a box accepting the Terms of Service and this Privacy Policy before payment. We record which **version** of each you accepted, and when.",
            ],
            [
              "Spam and abuse prevention (IP address)",
              "Consent, alongside our legitimate need to keep public forms usable",
              "Disclosed in the notice at the point of collection and in this policy.",
            ],
          ],
        },
        {
          type: "p",
          text: "You can withdraw your consent at any time — see [Your rights](#your-rights). Withdrawing is as straightforward as giving it: one email. Withdrawal does not undo processing that already lawfully happened before you withdrew.",
        },
      ],
    },

    {
      id: "how-we-use-it",
      heading: "How we use your data",
      blocks: [
        {
          type: "ol",
          items: [
            "To respond to your enquiry, demo request or application.",
            "To register you for an event, take payment for it, issue your ticket and QR code, and admit you on the day.",
            "To send you transactional email directly related to something you asked for — a confirmation, a ticket, a reply.",
            "To detect, investigate and prevent spam, fraud and abuse of our public forms.",
            "To keep records we are required to keep, including payment records.",
          ],
        },
        {
          type: "p",
          text: "We do not use your data for any other purpose without asking you first. In particular, we do not currently send marketing or newsletter email. If that changes, we will ask for separate, specific consent and every such message will carry a working unsubscribe link.",
        },
      ],
    },

    {
      id: "who-receives-it",
      heading: "Who else processes your data",
      blocks: [
        {
          type: "p",
          text: "We use a small number of third-party services to run this website. Each processes personal data on our instructions, and each is listed with what it receives and where it processes on the [Subprocessors](/subprocessors) page.",
        },
        {
          type: "table",
          headers: ["Service", "What it receives", "Purpose"],
          rows: [
            [
              "**Google Sheets** (Google LLC)",
              "Everything you submit through any form, including your IP address",
              "This is our record system — submissions are written to a private spreadsheet",
            ],
            [
              "**Razorpay** (Razorpay Software Private Limited)",
              "Your name, email, phone and the registration details attached to the payment order",
              "Payment processing for paid events. Razorpay is an RBI-authorised payment aggregator",
            ],
            [
              "**Resend** (Resend, Inc.)",
              "Your name and email address, and the content of the email we send you",
              "Delivery of transactional email such as confirmations and tickets",
            ],
            [
              "**Cloudflare** (Cloudflare, Inc.)",
              "Your IP address and request metadata, as for any website visit",
              "Hosting, content delivery and protection against attacks",
            ],
          ],
        },
        {
          type: "p",
          text: "We may also disclose personal data where we are legally required to — for example in response to a valid order from a court or a competent authority. We will not do so voluntarily.",
        },
        {
          type: "p",
          text: "**We do not sell or rent your personal data, and we do not share it with anyone for their own marketing.**",
        },
      ],
      subsections: [
        {
          id: "embeds",
          heading: "Third-party content loaded by your browser",
          blocks: [
            {
              type: "p",
              text: "One third party receives your IP address simply because your browser fetches content from it when a page loads. This is a normal consequence of how the web works, but you should know about it:",
            },
            {
              type: "ul",
              items: [
                "**Google Fonts** — typefaces are loaded from Google's servers on every page. Google receives your IP address as part of that request.",
              ],
            },
            {
              type: "p",
              text: "It is not used to track you across sites and sets no advertising cookie for us. We are working to remove this dependency by serving typefaces from our own domain. We previously embedded a third-party map on the contact page; that has been removed, and our address is now published as plain text. See the [Cookie Policy](/cookie-policy) for the current position.",
            },
          ],
        },
        {
          id: "transfers",
          heading: "Processing outside India",
          blocks: [
            {
              type: "p",
              text: "Google, Resend and Cloudflare are global services and may process or store data on infrastructure outside India. Razorpay processes payment data in India. The DPDP Act, 2023 permits transfer of personal data outside India except to territories specifically restricted by the Central Government; we monitor that list and will update this policy if it affects any service we use.",
            },
          ],
        },
      ],
    },

    {
      id: "retention",
      heading: "How long we keep it",
      blocks: [
        {
          type: "p",
          text: "Our retention schedule is set out below. We keep personal data no longer than we need it for the purpose it was collected for, or for as long as the law requires.",
        },
        {
          type: "table",
          headers: ["Data", "Retention period", "Then what"],
          rows: [
            ["Contact and demo enquiries", "24 months from your last contact with us", "Deleted"],
            [
              "Careers applications (unsuccessful)",
              "12 months from the hiring decision",
              "Deleted",
            ],
            [
              "Event registrations",
              "12 months after the event",
              "Deleted, except the payment record below",
            ],
            [
              "Payment records (order ID, payment ID, amount, status, date)",
              "As long as tax and accounting law requires",
              "Retained — we cannot delete these on request",
            ],
            ["IP addresses", "90 days from submission", "Cleared from the record"],
          ],
        },
        {
          type: "warning",
          text: "**Current state, stated honestly.** This schedule is our published commitment and we apply it, but enforcement is at present a **manual** process rather than an automated one — there is no scheduled job that deletes expired records on its own. Automating it is planned work. If you ask us to delete your data we will do it by hand, within the timeline on the [Data Deletion](/data-deletion) page. We would rather tell you this than imply an automated guarantee we do not yet have.",
        },
      ],
    },

    {
      id: "security",
      heading: "How we protect it",
      blocks: [
        {
          type: "p",
          text: "The technical and organisational measures we apply are described in full on the [Security Policy](/security) page. In summary: traffic is encrypted in transit, our API validates and size-limits every request, form endpoints are rate-limited, our access to the record system is restricted and protected by multi-factor authentication, and our application logs are configured to redact secrets and personal data.",
        },
        {
          type: "p",
          text: "We never see or store your card details. Payments are taken on Razorpay's own hosted checkout — card numbers, CVV and expiry data never reach our servers at any point.",
        },
        {
          type: "p",
          text: "No system is perfectly secure, and we will not claim otherwise. If a personal data breach occurs, we will notify the Data Protection Board of India and affected Data Principals as the DPDP Act, 2023 requires, and follow the process in our [Security Policy](/security).",
        },
      ],
    },

    {
      id: "your-rights",
      heading: "Your rights",
      blocks: [
        {
          type: "p",
          text: "Under the DPDP Act, 2023, you have the following rights over your personal data. Every one of them is exercised the same way — email {{contact.privacy}} — and [Your Data Rights](/data-rights) explains each in detail.",
        },
        {
          type: "definitions",
          items: [
            {
              term: "Right to access",
              text: "Get a summary of the personal data we hold about you and how we have processed it.",
            },
            {
              term: "Right to correction and completion",
              text: "Have inaccurate or incomplete data corrected, completed or updated.",
            },
            {
              term: "Right to erasure",
              text: "Have your personal data deleted, unless we are required by law to keep it. See [Data Deletion](/data-deletion).",
            },
            {
              term: "Right to withdraw consent",
              text: "Withdraw consent at any time, as easily as you gave it.",
            },
            {
              term: "Right to grievance redressal",
              text: "Complain to us and get a response. See [Grievance Redressal](/grievance).",
            },
            {
              term: "Right to nominate",
              text: "Nominate another individual to exercise your rights on your behalf in the event of your death or incapacity.",
            },
          ],
        },
        {
          type: "p",
          text: "We respond to rights requests within **30 days**. We may need to verify your identity first — usually by confirming you control the email address the data was submitted with. If you are not satisfied with our response, you may complain to the Data Protection Board of India.",
        },
      ],
    },

    {
      id: "children",
      heading: "Children and young people",
      blocks: [
        {
          type: "p",
          text: "Under the DPDP Act, 2023, a **child** is anyone under **18 years of age**. Processing a child's personal data requires verifiable consent from a parent or lawful guardian, and we must not track, profile or serve behavioural advertising to children.",
        },
        {
          type: "p",
          text: "Our services are directed at adults. Some of our events are aimed at college students, and we recognise that a college cohort can include people under 18. We therefore ask you to confirm your age at registration.",
        },
        {
          type: "p",
          text: "**If you are under 18**, please do not register or submit a form without your parent or guardian doing so with you and on your behalf. If you believe we hold the personal data of a child without proper consent, contact {{contact.privacy}} and we will delete it.",
        },
        {
          type: "note",
          text: "We do not track, profile or behaviourally target anybody, of any age — the website carries no analytics or advertising technology at all, as described in [What we do not collect](#no-tracking). That restriction is therefore met by design.",
        },
      ],
    },

    {
      id: "contact-and-grievances",
      heading: "Contact and complaints",
      blocks: [
        {
          type: "p",
          text: "For any privacy question or to exercise a right, email {{contact.privacy}}. Privacy matters are handled by {{grievanceOfficer.name}}, our {{grievanceOfficer.designation}}.",
        },
        {
          type: "p",
          text: "To raise a formal complaint, contact our Grievance Officer, {{grievanceOfficer.name}} ({{grievanceOfficer.designation}}), at {{contact.grievance}}. We acknowledge complaints within 48 hours and aim to resolve them within 30 days — the full process is on the [Grievance Redressal](/grievance) page.",
        },
        {
          type: "p",
          text: "Postal address: {{legalName}}, {{registeredAddress}}. Phone: {{contact.phone}} ({{contact.hours}}).",
        },
      ],
    },

    {
      id: "changes",
      heading: "Changes to this policy",
      blocks: [
        {
          type: "p",
          text: "When we change this policy substantively — what we collect, why, who receives it, or how long we keep it — we publish a new version with a new version number and effective date, both shown at the top of this page.",
        },
        {
          type: "p",
          text: "If a change materially affects how we handle data you have already given us, we will make reasonable efforts to notify you directly at the email address we hold, rather than relying on you to re-read this page.",
        },
        {
          type: "note",
          text: "**Version 2.0** is a complete rewrite. The previous version described a LinkedIn sign-in feature, user accounts and account credentials that this website has never implemented, and omitted several processors that it does use. This version was reconciled against the source code line by line so that it describes what the product actually does.",
        },
      ],
    },
  ],
};
