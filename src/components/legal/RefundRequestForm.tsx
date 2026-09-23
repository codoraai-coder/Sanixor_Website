import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { COMPANY } from "@/config/company.config";
import { refundService, type RefundReason, type RefundReceipt } from "@/services/form.service";
import { ApiError } from "@/utils/apiError";

/**
 * Refund request intake.
 *
 * Records a request and returns a reference. It does **not** issue a refund:
 * a person reviews it and initiates the refund in the Razorpay dashboard,
 * which is exactly what the published Refund Policy describes.
 *
 * The reason categories mirror the policy one-for-one, so a request is
 * classified against the terms the customer actually read.
 */

const REASONS: { value: RefundReason; label: string; note?: string }[] = [
  {
    value: "duplicate-payment",
    label: "I was charged more than once",
    note: "Full refund of the duplicate charge.",
  },
  {
    value: "payment-taken-no-registration",
    label: "Money was taken but I got no registration",
    note: "Full refund, or we complete your registration — your choice.",
  },
  {
    value: "event-cancelled",
    label: "The event was cancelled",
    note: "Full refund.",
  },
  {
    value: "event-postponed",
    label: "The event moved to a date I cannot make",
    note: "Full refund if requested within 14 days of the announcement.",
  },
  {
    value: "changed-mind",
    label: "I changed my mind",
    note: "Normally non-refundable — but tell us anyway if something else is going on.",
  },
  {
    value: "cannot-attend",
    label: "I can no longer attend",
    note: "Normally non-refundable — see exceptional circumstances below.",
  },
  {
    value: "exceptional-circumstances",
    label: "Something serious happened",
    note: "A medical emergency, a bereavement, or anything that makes the normal answer plainly unfair. We look at these on their own facts.",
  },
];

const inputClass =
  "w-full rounded-lg border border-foreground/[0.12] bg-foreground/[0.03] px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const labelClass = "mb-1.5 block text-sm font-medium text-foreground/85";

export function RefundRequestForm() {
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<RefundReceipt | null>(null);
  const [reasonCategory, setReasonCategory] = useState<RefundReason>("duplicate-payment");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const form = new FormData(e.currentTarget);
    setSubmitting(true);
    try {
      const result = await refundService.submitRefundRequest({
        reasonCategory,
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        registrationId: String(form.get("registrationId") ?? ""),
        orderId: String(form.get("orderId") ?? ""),
        paymentId: String(form.get("paymentId") ?? ""),
        reason: String(form.get("reason") ?? ""),
        website: String(form.get("website") ?? ""),
      });
      setReceipt(result);
      toast.success("Refund request recorded.");
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Could not record your request. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (receipt) {
    return (
      <div className="rounded-xl border border-foreground/[0.1] bg-foreground/[0.03] p-6">
        <h3 className="text-lg font-semibold text-foreground">Refund request received</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Keep this reference and quote it in any follow-up.
        </p>
        <p className="mt-4 rounded-lg border border-primary/30 bg-primary/[0.08] px-4 py-3 text-center font-mono text-lg font-semibold tracking-wider text-foreground">
          {receipt.refundId}
        </p>
        <ul className="mt-4 space-y-1.5 text-sm leading-relaxed text-foreground/80">
          <li>
            We will decide within <strong>{receipt.decisionBusinessDays} business days</strong> and
            tell you the outcome.
          </li>
          <li>
            If approved, we initiate the refund within{" "}
            <strong>{receipt.initiationBusinessDays} business days</strong>.
          </li>
          <li>Your bank then typically takes a further 5–7 business days.</li>
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Refunds are reviewed and initiated by a person — they are not automatic. That is why there
          is a review step rather than an instant result. Once initiated, we will give you the
          Razorpay refund reference so you can follow it up with your bank directly if it is slow.
        </p>
      </div>
    );
  }

  const selected = REASONS.find((r) => r.value === reasonCategory);

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="rfd-reason" className={labelClass}>
          What happened?
        </label>
        <select
          id="rfd-reason"
          value={reasonCategory}
          onChange={(e) => setReasonCategory(e.target.value as RefundReason)}
          className={inputClass}
        >
          {REASONS.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
        {selected?.note && (
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{selected.note}</p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="rfd-name" className={labelClass}>
            Your name
          </label>
          <input id="rfd-name" name="name" required className={inputClass} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="rfd-email" className={labelClass}>
            Email you registered with
          </label>
          <input
            id="rfd-email"
            name="email"
            type="email"
            required
            className={inputClass}
            autoComplete="email"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="rfd-regid" className={labelClass}>
            Registration ID
          </label>
          <input id="rfd-regid" name="registrationId" className={inputClass} placeholder="AV2-…" />
        </div>
        <div>
          <label htmlFor="rfd-order" className={labelClass}>
            Order ID <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input id="rfd-order" name="orderId" className={inputClass} placeholder="order_…" />
        </div>
        <div>
          <label htmlFor="rfd-payment" className={labelClass}>
            Payment ID <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input id="rfd-payment" name="paymentId" className={inputClass} placeholder="pay_…" />
        </div>
      </div>

      <div>
        <label htmlFor="rfd-detail" className={labelClass}>
          Tell us what happened
        </label>
        <textarea
          id="rfd-detail"
          name="reason"
          rows={4}
          required
          minLength={10}
          className={inputClass}
          placeholder="Anything we should know. If this is an exceptional circumstance, tell us — we would rather be asked than have you assume the answer is no."
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
        We record your name, email, the references you give us and your IP address in order to
        process this request and keep an audit trail. Prefer email? Write to{" "}
        <a
          href={`mailto:${COMPANY.contact.support}`}
          className="text-primary underline-offset-4 hover:underline"
        >
          {COMPANY.contact.support}
        </a>
        . Please do not raise a bank chargeback before contacting us — it takes far longer than a
        direct refund.
      </p>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg border border-foreground/20 bg-foreground/[0.06] px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.12] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {submitting ? "Recording…" : "Submit refund request"}
      </button>
    </form>
  );
}
