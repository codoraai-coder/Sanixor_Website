import type { LegalDocument } from "@/components/legal/legal-content";

/**
 * REFUND AND CANCELLATION POLICY v1.0
 *
 * ── TRUTHFULNESS CONSTRAINT ────────────────────────────────────────────
 * The backend implements NO automatic refund. `payment.service.ts` verifies
 * a payment signature and finalises a registration; there is no call to
 * Razorpay's refund API anywhere in the codebase.
 *
 * This policy therefore describes a REQUEST-BASED refund process operated
 * manually through the Razorpay dashboard. Do not introduce "automatic
 * refund" language here unless and until that code exists.
 */
export const refundDocument: LegalDocument = {
  intro: [
    "This policy explains when a registration fee paid to **{{legalName}}** can be refunded, how to request a refund, and how long it takes. It forms part of our [Terms of Service](/terms).",
    "It applies to paid event registrations bought through [sanixor.space](https://sanixor.space). Where a specific event publishes its own refund rules, those rules apply to that event in addition to this policy.",
  ],

  sections: [
    {
      id: "summary",
      heading: "The short version",
      blocks: [
        {
          type: "table",
          headers: ["Situation", "Refund"],
          rows: [
            ["You change your mind or cannot attend", "**Not refundable**"],
            ["You do not turn up (no-show)", "**Not refundable**"],
            ["**We cancel** the event", "**Full refund**"],
            [
              "**We postpone or reschedule** and the new date does not work for you",
              "**Full refund**",
            ],
            ["You were **charged twice** for one registration", "**Full refund of the duplicate**"],
            [
              "Money left your account but **no registration was created**",
              "**Full refund**, or we complete your registration — your choice",
            ],
            ["We remove you for breaching the code of conduct", "**Not refundable**"],
          ],
        },
        {
          type: "note",
          text: "Our registration fees are deliberately low and are committed to event costs in advance, which is why participant-side cancellations are not refundable. Where the fault is ours, you get your money back in full.",
        },
      ],
    },

    {
      id: "not-refundable",
      heading: "When a fee is not refundable",
      blocks: [
        {
          type: "p",
          text: "Registration fees are **non-refundable** where:",
        },
        {
          type: "ul",
          items: [
            "You decide not to attend, or your circumstances change.",
            "You do not attend on the day, or attend only part of the event.",
            "You registered with inaccurate or false information and we cancel your registration as a result.",
            "You are removed from the event for breaching the event's code of conduct, rules or our [Acceptable Use Policy](/acceptable-use).",
            "You are unable to attend because of something within your own control — travel, scheduling, device or internet problems at your end.",
          ],
        },
        {
          type: "p",
          text: "This does not affect your statutory rights under the Consumer Protection Act, 2019. If you believe a fee should be refunded despite the above, tell us — see [Exceptional circumstances](#exceptions).",
        },
      ],
    },

    {
      id: "refundable",
      heading: "When you get a full refund",
      blocks: [
        {
          type: "p",
          text: "We refund the full amount you paid, without deduction, where:",
        },
        {
          type: "definitions",
          items: [
            {
              term: "We cancel the event",
              text: "If we call the event off entirely, every registrant is refunded in full. We will tell you by email and start refunds without you having to ask.",
            },
            {
              term: "We postpone or reschedule it",
              text: "If we move the event to a different date, and the new date does not work for you, you can ask for a full refund instead of carrying your registration over. Tell us within **14 days** of us announcing the new date.",
            },
            {
              term: "We change it materially",
              text: "If we change the event so substantially that it is no longer what you registered for, you may request a full refund within 14 days of the announcement.",
            },
            {
              term: "Duplicate payment",
              text: "If you were charged more than once for the same registration, we refund every duplicate charge in full.",
            },
            {
              term: "Payment taken, registration not created",
              text: "If money left your account but no registration was created — a failure during verification, for instance — we will either complete your registration or refund you in full. You choose.",
            },
            {
              term: "We made a pricing error",
              text: "If we charged you more than the published price, we refund the difference. If the error is substantial, we refund the whole amount and let you re-register at the correct price.",
            },
          ],
        },
      ],
    },

    {
      id: "how-to-request",
      heading: "How to request a refund",
      blocks: [
        {
          type: "p",
          text: "Email **{{contact.support}}** with the subject line `Refund request`, and include:",
        },
        {
          type: "ol",
          items: [
            "Your **registration ID** (it looks like `AV2-XXXXXX` and is in your confirmation email).",
            "The **email address** you registered with.",
            "The **Razorpay payment ID** or order ID, if you have it — it is in your payment confirmation.",
            "Which of the situations above applies, and anything we should know.",
          ],
        },
        {
          type: "p",
          text: "You can also raise it through [Grievance Redressal](/grievance) if you would prefer it treated as a formal complaint, or if you have already asked and are not satisfied with the answer.",
        },
        {
          type: "warning",
          text: "**Please do not raise a chargeback with your bank before contacting us.** A chargeback takes much longer than a direct refund, and we cannot resolve it quickly once the bank is involved. Email us first — in almost every case we can settle it faster.",
        },
      ],
    },

    {
      id: "timelines",
      heading: "How long it takes",
      blocks: [
        {
          type: "table",
          headers: ["Stage", "Timeline"],
          rows: [
            ["We acknowledge your request", "Within **2 business days**"],
            ["We decide, and tell you the outcome", "Within **7 business days** of your request"],
            [
              "We initiate the refund with Razorpay, once approved",
              "Within **3 business days** of approval",
            ],
            [
              "The money reaches your account",
              "Typically **5–7 business days** after we initiate it, depending on your bank or card issuer",
            ],
          ],
        },
        {
          type: "p",
          text: "The final step is controlled by your bank and by Razorpay, not by us. Once we have initiated a refund we will give you the Razorpay refund reference so you can follow it up with your bank directly if it is slow.",
        },
      ],
    },

    {
      id: "how-refunds-are-paid",
      heading: "How refunds are paid",
      blocks: [
        {
          type: "ul",
          items: [
            "Refunds go back to the **original payment method** — the same card, UPI ID, wallet or account you paid from. We cannot redirect a refund to a different instrument or person.",
            "Refunds are made in **Indian Rupees**, for the amount actually received. We do not compensate for currency conversion differences or bank charges applied by your own bank.",
            "If your original payment method has since been closed, tell us — we will work with you and Razorpay to find a route, which may take longer.",
            "Refunds are processed through **Razorpay**, which acts as our payment processor. Razorpay's own terms apply to the mechanics of the refund.",
          ],
        },
        {
          type: "note",
          text: "**How refunds are actually processed.** Refunds are reviewed and initiated by a person on our team through the Razorpay dashboard — they are not automatic. This is why the timelines above allow for a review step. We would rather publish a process we actually run than promise an instant automated refund we have not built.",
        },
      ],
    },

    {
      id: "partial",
      heading: "Partial refunds",
      blocks: [
        {
          type: "p",
          text: "We do not normally make partial refunds — a registration is either refunded in full or not at all. The exceptions are a pricing error, where we refund the overcharge, and any case where an event's own published rules provide for a partial refund.",
        },
      ],
    },

    {
      id: "exceptions",
      heading: "Exceptional circumstances",
      blocks: [
        {
          type: "p",
          text: "Rules cannot cover everything. If something serious has happened — a medical emergency, a bereavement, or anything else that makes the outcome above feel plainly unfair — write to {{contact.support}} and tell us.",
        },
        {
          type: "p",
          text: "We will look at it properly and on its own facts. We would rather be asked than have you assume the answer is no. Deciding one case this way does not commit us to deciding every similar case the same way.",
        },
      ],
    },

    {
      id: "contact",
      heading: "Contact",
      blocks: [
        {
          type: "p",
          text: "Refund requests and questions: **{{contact.support}}** · Phone: {{contact.phone}} ({{contact.hours}}).",
        },
        {
          type: "p",
          text: "Not satisfied with how we handled a refund? Escalate it to our Grievance Officer, {{grievanceOfficer.name}}, at {{contact.grievance}} — see [Grievance Redressal](/grievance). You also retain your rights under the Consumer Protection Act, 2019 and may approach the appropriate consumer forum.",
        },
      ],
    },
  ],
};
