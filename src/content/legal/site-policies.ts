import type { LegalDocument } from "@/components/legal/legal-content";

/**
 * Cookie Policy, Security Policy and Accessibility Statement.
 *
 * The cookie inventory below was generated from the source tree on
 * 2026-09-23, not assumed:
 *   • `document.cookie` is written in exactly one file, `ui/sidebar.tsx`,
 *     which is NOT imported anywhere — so no cookie is ever set.
 *   • localStorage is written in exactly two places: ThemeProvider and
 *     BookDemoModal.
 * Re-run that check before revising this policy.
 */

export const cookieDocument: LegalDocument = {
  intro: [
    "This policy explains the cookies and browser-storage technologies used on [sanixor.space](https://sanixor.space).",
    "The summary is unusually short: **this website sets no cookies at all**, and uses two small items of local storage purely to remember your own preferences on your own device.",
  ],

  sections: [
    {
      id: "cookies-we-set",
      heading: "Cookies we set",
      blocks: [
        {
          type: "p",
          text: "**None.** This website does not set any cookies — not strictly-necessary ones, not functional ones, and certainly not analytics or advertising ones.",
        },
        {
          type: "p",
          text: "Because we set no cookies and run no tracking technology, there is no cookie consent banner on this site. There is nothing for you to consent to or opt out of.",
        },
      ],
    },

    {
      id: "local-storage",
      heading: "Browser storage we use",
      blocks: [
        {
          type: "p",
          text: "We use three items of `localStorage`. All three stay on your device and none is ever transmitted to us or to anyone else.",
        },
        {
          type: "table",
          headers: ["Name", "Purpose", "Duration", "Category"],
          rows: [
            [
              "`sanixor_consent`",
              "Records the choice you make about the optional items below, so we do not ask again on every page",
              "Until you clear your browser storage or change your choice",
              "**Strictly necessary** — this is the record of your own decision, so it cannot be switched off",
            ],
            [
              "`sanixor-theme`",
              "Remembers the colour theme you chose so the site does not reset it on every visit",
              "Until you clear your browser storage",
              "**Functional** — optional. Decline and the theme simply starts at the default each visit",
            ],
            [
              "`sanixor_demo_booked`",
              "Remembers that you already booked a demo, so we do not prompt you again",
              "Until you clear your browser storage",
              "**Functional** — optional. Decline and we may prompt you again",
            ],
          ],
        },
      ],
    },

    {
      id: "your-choice",
      heading: "Your choice, and how to change it",
      blocks: [
        {
          type: "p",
          text: "The first time you visit, we ask whether we may use the two optional functional items above. **Nothing optional is stored before you choose** — declining is a single click, presented with exactly the same prominence as accepting, and there is no pre-ticked box anywhere.",
        },
        {
          type: "p",
          text: "You can change your mind at any time using the **Cookie Preferences** link in the footer of every page. The preference centre also lets you withdraw consent entirely, which clears the optional storage immediately rather than merely stopping future writes.",
        },
        {
          type: "note",
          text: "**Where your choice is stored.** Your decision is recorded in your own browser, not on our servers. That is deliberate: this site has no accounts, so storing your choice server-side would mean creating an identifier for someone who has just asked for less tracking. The trade-off, stated plainly, is that your choice is remembered per browser and per device — you will be asked again on a different device, or after clearing your browser storage.",
        },
        {
          type: "p",
          text: "We record which version of the notice you were shown and when you decided, so that both of us have a clear record of what was actually agreed.",
        },
      ],
    },

    {
      id: "no-tracking",
      heading: "What we deliberately do not use",
      blocks: [
        {
          type: "ul",
          items: [
            "No Google Analytics, Google Tag Manager or any other analytics platform.",
            "No Meta Pixel, advertising, remarketing or conversion-tracking tags.",
            "No PostHog, Mixpanel, Hotjar, Microsoft Clarity or session-recording tools.",
            "No cross-site tracking, fingerprinting or behavioural profiling.",
            "No A/B testing or personalisation cookies.",
          ],
        },
        {
          type: "note",
          text: "If we ever introduce analytics, we will update this policy, classify the technology honestly, and — where the law requires consent — ask for it before setting anything. We will not quietly add a tracker and leave this page saying otherwise.",
        },
      ],
    },

    {
      id: "third-party-requests",
      heading: "Third-party content your browser loads",
      blocks: [
        {
          type: "p",
          text: "**Only one**, and only when you choose to use it.",
        },
        {
          type: "table",
          headers: ["Provider", "What it serves", "Where", "Status"],
          rows: [
            [
              "**Razorpay**",
              "The hosted payment checkout",
              "Only when you actually start a payment",
              "Necessary — this is how payment is taken, and it keeps card data off our servers",
            ],
          ],
        },
        {
          type: "p",
          text: "Razorpay's checkout is loaded only at the moment you choose to pay. It is not present on any other page. Everything else the site needs — including every typeface — is served from our own domain, so browsing this site contacts no other company at all. We removed the Google Fonts dependency and the embedded map for exactly this reason.",
        },
      ],
    },

    {
      id: "managing",
      heading: "Managing storage in your browser",
      blocks: [
        {
          type: "p",
          text: 'Every major browser lets you view and clear cookies and site data for an individual site, and block them for future visits. Look for "Privacy and security" → "Cookies and site data" in your browser settings, or open the padlock icon in the address bar.',
        },
        {
          type: "p",
          text: "Because this site depends on no cookies, blocking them entirely will not stop it working.",
        },
      ],
    },

    {
      id: "contact",
      heading: "Questions",
      blocks: [
        {
          type: "p",
          text: "Questions about this policy: {{contact.privacy}}. See also the [Privacy Policy](/privacy) and [Subprocessors](/subprocessors).",
        },
      ],
    },
  ],
};

/* ══════════════════════════════════════════════════════════════════════ */

export const securityDocument: LegalDocument = {
  intro: [
    "This page describes how we protect data submitted to Sanixor AI, and how to report a security problem.",
    "It states our **current** measures, not aspirations. Where something is planned but not yet implemented, it is listed under [Known limitations](#limitations) rather than described as if it were in place.",
  ],

  sections: [
    {
      id: "reporting",
      heading: "Reporting a vulnerability",
      blocks: [
        {
          type: "p",
          text: "If you believe you have found a security vulnerability in our website or API, please tell us at **{{contact.security}}** with the subject line `Security report`.",
        },
        {
          type: "p",
          text: "Please include enough detail for us to reproduce it — the URL or endpoint, the steps, and what you observed. A proof-of-concept helps.",
        },
        {
          type: "definitions",
          items: [
            {
              term: "Our commitment to you",
              text: "We acknowledge security reports within **2 business days**, keep you updated on our assessment, and will credit you publicly if you would like us to and the report is valid.",
            },
            {
              term: "What we ask of you",
              text: "Give us a reasonable chance to fix the issue before disclosing it publicly. Do not access, modify or delete data that is not yours. Do not run denial-of-service tests, send spam, or use social engineering against our staff or users.",
            },
            {
              term: "Good-faith research",
              text: "We will not pursue action against researchers who follow the above and act in good faith. We do not currently operate a paid bug-bounty programme.",
            },
          ],
        },
      ],
    },

    {
      id: "measures",
      heading: "Measures currently in place",
      blocks: [
        {
          type: "table",
          headers: ["Area", "Control"],
          rows: [
            [
              "**Encryption in transit**",
              "All traffic to the website and API is served over HTTPS/TLS. HTTP is upgraded automatically.",
            ],
            [
              "**Card data**",
              "Payments run on Razorpay's hosted checkout. Card numbers, CVV and expiry data never reach our servers, are never logged and are never stored by us at any point.",
            ],
            [
              "**Payment integrity**",
              "Every payment is verified server-side by checking Razorpay's cryptographic signature using a constant-time comparison, and by independently re-confirming the order's paid status with Razorpay before a registration is finalised.",
            ],
            [
              "**Input validation**",
              "Every API endpoint validates its input against a strict schema, rejects unknown fields, enforces a maximum request size and applies a request timeout.",
            ],
            [
              "**Abuse protection**",
              "Public form endpoints are rate-limited per client, and carry hidden honeypot fields to absorb automated spam.",
            ],
            [
              "**Origin restriction**",
              "The API only accepts browser requests from our own domains, enforced by a strict allowlist.",
            ],
            [
              "**Security headers**",
              "Standard protective response headers are applied to all API responses.",
            ],
            [
              "**Log hygiene**",
              "Application logs are configured to redact credentials, tokens and secrets. Full form payloads are not written to logs.",
            ],
            [
              "**Access control**",
              "Access to the systems holding personal data is limited to people who need it, and protected by multi-factor authentication.",
            ],
            [
              "**Environment separation**",
              "Diagnostic and development endpoints are compiled out of the production build and are unreachable in production.",
            ],
          ],
        },
      ],
    },

    {
      id: "breach",
      heading: "If a breach occurs",
      blocks: [
        {
          type: "p",
          text: "If a personal data breach occurs, we will investigate immediately, contain it, and assess who is affected and how.",
        },
        {
          type: "ul",
          items: [
            "We will notify the **Data Protection Board of India** as required by the Digital Personal Data Protection Act, 2023.",
            "We will notify **affected individuals** directly, describing what happened, what data was involved, what we have done, and what you can do.",
            "We will report to **CERT-In** where the incident falls within its reporting directions.",
            "We will record the incident and what we changed as a result.",
          ],
        },
      ],
    },

    {
      id: "limitations",
      heading: "Known limitations",
      blocks: [
        {
          type: "p",
          text: "We would rather publish these than let their absence be inferred from a page that lists only strengths:",
        },
        {
          type: "ul",
          items: [
            "**Records are held in a private cloud spreadsheet**, not a database with per-record access control or a built-in audit trail. Access is restricted and MFA-protected, but migration to a proper datastore is planned.",
            "**Retention is enforced manually.** No scheduled job yet deletes expired records automatically — see the [Privacy Policy](/privacy#retention).",
            "**Rate limiting is best-effort.** It protects against a single abusive client rather than a distributed one. A network-level rule is planned.",
            "**No Content-Security-Policy is deployed yet.** It is planned, in report-only mode first.",
            "**We hold no third-party security certification.** We are not ISO/IEC 27001 certified and have not completed a SOC 2 audit. We will not imply otherwise.",
          ],
        },
        {
          type: "p",
          text: "No system is perfectly secure. We do not claim absolute security, and any page that claims it of itself should be read sceptically.",
        },
      ],
    },
  ],
};

/* ══════════════════════════════════════════════════════════════════════ */

export const accessibilityDocument: LegalDocument = {
  intro: [
    "Sanixor AI wants this website to be usable by everyone, including people who use assistive technology. This statement sets out where we currently stand — including what does not yet work well.",
  ],

  sections: [
    {
      id: "standard",
      heading: "The standard we aim for",
      blocks: [
        {
          type: "p",
          text: "We aim to meet **[Web Content Accessibility Guidelines (WCAG) 2.2, Level AA](https://www.w3.org/WAI/standards-guidelines/wcag/)**.",
        },
        {
          type: "p",
          text: "We are currently **partially conformant**: most of the standard is met, but some parts are not. We have not commissioned an independent audit, so this statement is based on our own testing. We will not describe the site as fully conformant until an audit supports it.",
        },
      ],
    },

    {
      id: "what-works",
      heading: "What is in place",
      blocks: [
        {
          type: "ul",
          items: [
            "A **skip-to-content link** so keyboard users can bypass the navigation.",
            "A declared page language, so screen readers pronounce content correctly.",
            "**Text alternatives on all images**, so their meaning is available to screen-reader users.",
            "Semantic headings and landmarks, so the page can be navigated by structure.",
            "Keyboard-operable navigation and forms.",
            "Form fields with associated labels, and errors reported in text rather than by colour alone.",
            "Legal pages with a table of contents and linkable section anchors.",
          ],
        },
      ],
    },

    {
      id: "known-issues",
      heading: "Known problems we are fixing",
      blocks: [
        {
          type: "warning",
          text: "**Motion.** Parts of this site use smooth-scrolling, parallax and animated 3D graphics. We now honour your operating system's **reduce motion** setting — if you have it enabled, these effects are disabled or substantially reduced. If you still encounter motion that causes discomfort, please tell us so we can fix that specific case.",
        },
        {
          type: "ul",
          items: [
            "**Colour contrast** has not been verified against AA thresholds across every theme. Some combinations may fall short. A full audit is planned.",
            "**Screen-reader testing** has been limited. We have not tested exhaustively with JAWS, NVDA and VoiceOver.",
            "**The embedded map** on the contact page is third-party content whose accessibility we do not control. Our address is always available as text, so no information is only in the map.",
            "**No independent audit** has been carried out yet.",
          ],
        },
      ],
    },

    {
      id: "feedback",
      heading: "Tell us about a barrier",
      blocks: [
        {
          type: "p",
          text: "If you cannot access something on this site, or assistive technology does not work with it, please tell us at **{{contact.support}}**. Describe the page and what happened.",
        },
        {
          type: "p",
          text: "We aim to respond within **5 business days**. If you need information from this site in a different format, ask and we will provide it.",
        },
        {
          type: "p",
          text: "If you are not satisfied with our response, escalate it through [Grievance Redressal](/grievance).",
        },
      ],
    },
  ],
};
