import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { COMPANY } from "@/config/company.config";
import {
  privacyService,
  type GrievanceCategory,
  type PrivacyRequestType,
  type RequestReceipt,
} from "@/services/form.service";
import { ApiError } from "@/utils/apiError";

/**
 * Intake forms for data-subject rights requests and grievances.
 *
 * ── WHAT THESE DO AND DO NOT DO ────────────────────────────────────────
 * They RECORD a request and return a reference number. They never return,
 * modify or delete anyone's data. Identity is verified by a person before
 * anything is acted on.
 *
 * That separation is the whole security model: an unauthenticated public
 * form that returned or erased records by email address would let anyone
 * exfiltrate or destroy a stranger's data by typing their address.
 */

const REQUEST_TYPES: { value: PrivacyRequestType; label: string; hint: string }[] = [
  { value: "access", label: "Access my data", hint: "Get a summary of what we hold about you." },
  {
    value: "correction",
    label: "Correct my data",
    hint: "Fix something inaccurate, incomplete or out of date.",
  },
  { value: "erasure", label: "Delete my data", hint: "Have your personal data erased." },
  {
    value: "withdraw-consent",
    label: "Withdraw my consent",
    hint: "Stop further processing based on consent you gave.",
  },
  {
    value: "nomination",
    label: "Nominate someone",
    hint: "Name a person to exercise your rights if you cannot.",
  },
];

const GRIEVANCE_CATEGORIES: { value: GrievanceCategory; label: string }[] = [
  { value: "privacy", label: "Privacy or personal data" },
  { value: "payment-or-refund", label: "Payment or refund" },
  { value: "event", label: "An event" },
  { value: "accessibility", label: "Accessibility" },
  { value: "content-or-conduct", label: "Content or someone's conduct" },
  { value: "other", label: "Something else" },
];

const inputClass =
  "w-full rounded-lg border border-foreground/[0.12] bg-foreground/[0.03] px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const labelClass = "mb-1.5 block text-sm font-medium text-foreground/85";

function Receipt({ receipt, kind }: { receipt: RequestReceipt; kind: "request" | "grievance" }) {
  return (
    <div className="rounded-xl border border-foreground/[0.1] bg-foreground/[0.03] p-6">
      <h3 className="text-lg font-semibold text-foreground">
        {kind === "request" ? "Request received" : "Grievance received"}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Please keep this reference. Quote it in any follow-up.
      </p>
      <p className="mt-4 rounded-lg border border-primary/30 bg-primary/[0.08] px-4 py-3 text-center font-mono text-lg font-semibold tracking-wider text-foreground">
        {receipt.requestId}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-foreground/80">
        We will acknowledge this within <strong>{receipt.acknowledgementHours} hours</strong> and
        respond within <strong>{receipt.resolutionDays} days</strong>.
      </p>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        We may need to confirm your identity before we act — usually just by checking you control
        the email address the data was submitted with. We will not disclose or delete anything until
        we have.
      </p>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */

export function PrivacyRequestForm({
  defaultType = "access",
}: {
  defaultType?: PrivacyRequestType;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<RequestReceipt | null>(null);
  const [requestType, setRequestType] = useState<PrivacyRequestType>(defaultType);
  const [confirmed, setConfirmed] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting || !confirmed) return;

    const form = new FormData(e.currentTarget);
    setSubmitting(true);
    try {
      const result = await privacyService.submitPrivacyRequest({
        requestType,
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        details: String(form.get("details") ?? ""),
        confirmOwnData: true,
        website: String(form.get("website") ?? ""),
      });
      setReceipt(result);
      toast.success("Request recorded.");
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Could not record your request. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (receipt) return <Receipt receipt={receipt} kind="request" />;

  const selected = REQUEST_TYPES.find((t) => t.value === requestType);

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="dsr-type" className={labelClass}>
          What would you like to do?
        </label>
        <select
          id="dsr-type"
          value={requestType}
          onChange={(e) => setRequestType(e.target.value as PrivacyRequestType)}
          className={inputClass}
        >
          {REQUEST_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        {selected && <p className="mt-1.5 text-xs text-muted-foreground">{selected.hint}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="dsr-name" className={labelClass}>
            Your name
          </label>
          <input id="dsr-name" name="name" required className={inputClass} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="dsr-email" className={labelClass}>
            Email you gave us
          </label>
          <input
            id="dsr-email"
            name="email"
            type="email"
            required
            className={inputClass}
            autoComplete="email"
          />
        </div>
      </div>

      <div>
        <label htmlFor="dsr-details" className={labelClass}>
          Anything that helps us find your records{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <textarea
          id="dsr-details"
          name="details"
          rows={4}
          className={inputClass}
          placeholder="A registration ID, roughly when you contacted us, or which form you used. For a correction, tell us what is wrong and what it should say."
        />
      </div>

      {/* Honeypot — must stay empty. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <label className="flex cursor-pointer items-start gap-2.5">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          required
          className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[var(--primary)]"
        />
        <span className="text-sm leading-relaxed text-foreground/80">
          I confirm this request is about <strong>my own</strong> personal data, and that the
          details above are accurate.
        </span>
      </label>

      <p className="text-xs leading-relaxed text-muted-foreground">
        We record your name, email, what you asked for and your IP address in order to handle this
        request and keep an audit trail of it. Sending this does not by itself delete anything — see{" "}
        <Link to="/data-rights" className="text-primary underline-offset-4 hover:underline">
          how requests are handled
        </Link>
        . Prefer email? Write to{" "}
        <a
          href={`mailto:${COMPANY.contact.privacy}`}
          className="text-primary underline-offset-4 hover:underline"
        >
          {COMPANY.contact.privacy}
        </a>
        .
      </p>

      <button
        type="submit"
        disabled={submitting || !confirmed}
        className="rounded-lg border border-foreground/20 bg-foreground/[0.06] px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.12] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {submitting ? "Recording…" : "Submit request"}
      </button>
    </form>
  );
}

/* ────────────────────────────────────────────────────────────────────── */

export function GrievanceForm() {
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<RequestReceipt | null>(null);
  const [category, setCategory] = useState<GrievanceCategory>("privacy");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const form = new FormData(e.currentTarget);
    setSubmitting(true);
    try {
      const result = await privacyService.submitGrievance({
        category,
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        reference: String(form.get("reference") ?? ""),
        description: String(form.get("description") ?? ""),
        website: String(form.get("website") ?? ""),
      });
      setReceipt(result);
      toast.success("Grievance recorded.");
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Could not record your grievance. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (receipt) return <Receipt receipt={receipt} kind="grievance" />;

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="grv-category" className={labelClass}>
          What is your complaint about?
        </label>
        <select
          id="grv-category"
          value={category}
          onChange={(e) => setCategory(e.target.value as GrievanceCategory)}
          className={inputClass}
        >
          {GRIEVANCE_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="grv-name" className={labelClass}>
            Your name
          </label>
          <input id="grv-name" name="name" required className={inputClass} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="grv-email" className={labelClass}>
            Your email
          </label>
          <input
            id="grv-email"
            name="email"
            type="email"
            required
            className={inputClass}
            autoComplete="email"
          />
        </div>
      </div>

      <div>
        <label htmlFor="grv-reference" className={labelClass}>
          Reference <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <input
          id="grv-reference"
          name="reference"
          className={inputClass}
          placeholder="Registration ID, order ID, or the email you used"
        />
      </div>

      <div>
        <label htmlFor="grv-description" className={labelClass}>
          What happened?
        </label>
        <textarea
          id="grv-description"
          name="description"
          rows={5}
          required
          minLength={20}
          className={inputClass}
          placeholder="Tell us what happened, when, and what outcome you are looking for."
        />
      </div>

      {/* Honeypot — must stay empty. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <p className="text-xs leading-relaxed text-muted-foreground">
        We record your name, email, what you told us and your IP address in order to investigate and
        keep an audit trail. Your complaint goes to {COMPANY.grievanceOfficer.name},{" "}
        {COMPANY.grievanceOfficer.designation}. We acknowledge within{" "}
        {COMPANY.grievanceOfficer.acknowledgementHours} hours and aim to resolve within{" "}
        {COMPANY.grievanceOfficer.redressalDays} days.
      </p>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg border border-foreground/20 bg-foreground/[0.06] px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.12] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {submitting ? "Recording…" : "Submit grievance"}
      </button>
    </form>
  );
}
