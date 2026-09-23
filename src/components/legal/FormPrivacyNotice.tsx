import { Link } from "react-router-dom";

/**
 * The itemised notice shown at the point of collection on every form.
 *
 * DPDP Act, 2023 s.5 requires that a request for consent be accompanied or
 * preceded by a notice telling the Data Principal what personal data will be
 * processed, for what purpose, how to exercise their rights, and how to
 * complain. This component is that notice.
 *
 * Place it immediately above the submit button, so it is read at the moment
 * consent is given rather than buried in a policy page.
 */

type NoticeVariant = "contact" | "demo" | "hiring" | "event";

const NOTICES: Record<NoticeVariant, { collects: string; purpose: string }> = {
  contact: {
    collects: "your name, email address, and anything you type into this form",
    purpose: "to reply to your enquiry and keep a record of the conversation",
  },
  demo: {
    collects: "your name, email address, organisation and product interest",
    purpose: "to arrange and follow up on your demo",
  },
  hiring: {
    collects:
      "your name, email address, the role you are applying for, and any links or details you provide",
    purpose: "to assess your application for a role with us",
  },
  event: {
    collects:
      "your name, email address, phone number, and the eligibility details for your participant type",
    purpose: "to register you, take payment, issue your ticket and admit you to the event",
  },
};

export function FormPrivacyNotice({
  variant,
  className = "",
}: {
  variant: NoticeVariant;
  className?: string;
}) {
  const { collects, purpose } = NOTICES[variant];

  return (
    <p className={`text-xs leading-relaxed text-muted-foreground ${className}`}>
      We collect {collects}, {purpose}. We also record your IP address to prevent spam. Your data is
      stored securely and is never sold. You can ask us to access, correct or delete it at any time
      — see{" "}
      <Link to="/data-rights" className="text-primary underline-offset-4 hover:underline">
        your data rights
      </Link>
      ,{" "}
      <Link to="/privacy" className="text-primary underline-offset-4 hover:underline">
        our privacy policy
      </Link>{" "}
      or{" "}
      <Link to="/grievance" className="text-primary underline-offset-4 hover:underline">
        raise a complaint
      </Link>
      . By submitting this form you consent to this processing.
    </p>
  );
}
