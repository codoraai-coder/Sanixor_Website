import React, { useRef, useState } from "react";
import { toast } from "sonner";
import {
  paymentService,
  type CreateOrderPayload,
  type CreateOrderResult,
} from "@/services/payment.service";
import type { RazorpayOptions, RazorpaySuccessResponse } from "@/types/razorpay";
import { ApiError } from "@/utils/apiError";

interface Props {
  onClose: () => void;
}

/** Paid tiers only — institution registration is deferred (no online payment). */
type PaidUserType = "student" | "professional";
type SelectedType = PaidUserType | "";

/**
 * Registration flow phases:
 *   form        — collecting profile + details (default)
 *   redirecting — creating the order and opening secure checkout
 *   verifying   — payment returned; backend is verifying the signature
 *   success     — backend verified the payment (PAYMENT_SUCCESS)
 *   failed      — backend could not verify the payment
 *   dismissed   — checkout was closed without completing payment
 *
 * Success is NEVER shown from the Checkout callback alone — only after the
 * backend `verify` call resolves (Phase 2). The client never trusts Razorpay's
 * client-side success on its own.
 */
type Phase = "form" | "redirecting" | "verifying" | "success" | "failed" | "dismissed";

export function AgentVerseRegistrationModal({ onClose }: Props) {
  const [phase, setPhase] = useState<Phase>("form");
  const [errorMessage, setErrorMessage] = useState("");
  const [registrationId, setRegistrationId] = useState("");
  const [userType, setUserType] = useState<SelectedType>("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    rollNo: "",
    college: "",
    experience: "",
    organization: "",
  });

  // Guards against `ondismiss` overwriting the verification flow when the
  // checkout modal closes immediately after a successful payment handler.
  const paymentSettledRef = useRef(false);
  // Last successful Checkout response, kept so verification can be retried on a
  // transient network failure without re-running the whole payment.
  const lastResponseRef = useRef<RazorpaySuccessResponse | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  /** Build the typed create-order payload for the selected paid profile. */
  const buildPayload = (currentForm: typeof form, type: PaidUserType): CreateOrderPayload => {
    if (type === "student") {
      return {
        userType: "student",
        name: currentForm.name,
        email: currentForm.email,
        phone: currentForm.phone,
        rollNo: currentForm.rollNo,
        college: currentForm.college,
      };
    }
    return {
      userType: "professional",
      name: currentForm.name,
      email: currentForm.email,
      phone: currentForm.phone,
      experience: Number(currentForm.experience),
      organization: currentForm.organization,
    };
  };

  /**
   * Send the Checkout response to the backend for verification. Success is only
   * declared once the backend confirms it — a valid signature the browser
   * cannot forge. Transient failures surface a retry path.
   */
  const runVerification = async (response: RazorpaySuccessResponse) => {
    lastResponseRef.current = response;
    setErrorMessage("");
    setPhase("verifying");
    try {
      const result = await paymentService.verifyPayment({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      });
      console.info("[AgentVerse] Payment verified", {
        status: result.status,
        registrationId: result.registrationId,
      });
      setRegistrationId(result.registrationId);
      setPhase("success");
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "We couldn't verify your payment. If any amount was deducted, it will be refunded.";
      console.warn("[AgentVerse] Payment verification failed");
      setErrorMessage(message);
      setPhase("failed");
    }
  };

  /** Launch Razorpay Checkout for a created order. No registration is completed here. */
  const launchCheckout = async (order: CreateOrderResult) => {
    await paymentService.loadRazorpayCheckout();
    paymentSettledRef.current = false;

    const options: RazorpayOptions = {
      key: order.keyId,
      order_id: order.orderId,
      amount: order.amount,
      currency: order.currency,
      name: "Sanixor AI",
      description: "AgentVerse 2.0 Registration",
      prefill: { name: form.name, email: form.email, contact: form.phone },
      theme: { color: "#7c3aed" },
      handler: (response) => {
        // Payment captured client-side — now VERIFY it server-side before
        // declaring any success. Never trust this callback on its own.
        paymentSettledRef.current = true;
        console.info("[AgentVerse] Payment Initiated", {
          paymentId: response.razorpay_payment_id,
        });
        void runVerification(response);
      },
      modal: {
        ondismiss: () => {
          if (paymentSettledRef.current) return;
          console.info("[AgentVerse] Checkout dismissed");
          setPhase("dismissed");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", () => {
      setErrorMessage("Payment failed. Please try again.");
    });
    console.info("[AgentVerse] Checkout Opened", { orderId: order.orderId });
    rzp.open();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Only the paid tiers reach payment; guard against duplicate/invalid submits.
    if (phase !== "form") return;
    if (userType !== "student" && userType !== "professional") return;

    setPhase("redirecting");
    try {
      const order = await paymentService.createOrder(buildPayload(form, userType));
      console.info("[AgentVerse] Order created", { orderId: order.orderId });
      await launchCheckout(order);
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Something went wrong. Please try again.";
      setErrorMessage(message);
      toast.error(message);
      setPhase("form");
    }
  };

  const handleClose = () => {
    // Never close mid-flight (order being created / checkout opening / verifying).
    if (phase !== "redirecting" && phase !== "verifying") onClose();
  };

  const retryPayment = () => {
    setErrorMessage("");
    setPhase("form");
  };

  /** Re-run verification for the last payment (used after a transient failure). */
  const retryVerification = () => {
    if (lastResponseRef.current) void runVerification(lastResponseRef.current);
  };

  const headTitle =
    phase === "verifying"
      ? "Verifying Payment"
      : phase === "success"
        ? "Registration Confirmed"
        : phase === "failed"
          ? "Verification Failed"
          : phase === "dismissed"
            ? "Payment Incomplete"
            : "Register for AgentVerse";

  return (
    <div
      className="av2-overlay"
      onClick={handleClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div className="av2-modal" onClick={(e) => e.stopPropagation()} data-lenis-prevent="true">
        <div className="av2-modal-head">
          <h2>{headTitle}</h2>
          {phase !== "redirecting" && phase !== "verifying" && (
            <button className="av2-modal-close" onClick={handleClose}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
        <div
          className="av2-modal-body"
          style={{ overflowY: "auto", maxHeight: "calc(85vh - 80px)" }}
        >
          {errorMessage && phase !== "failed" && (
            <div
              style={{
                background: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "#f87171",
                padding: "12px 16px",
                borderRadius: "12px",
                fontSize: "14px",
                marginBottom: "20px",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                style={{ width: 18, height: 18 }}
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {errorMessage}
            </div>
          )}

          {phase === "redirecting" ? (
            <div className="av2-payment-step flex flex-col items-center justify-center gap-4 w-full py-10 text-center animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
              <div className="text-lg font-bold text-white">Redirecting to Secure Payment…</div>
              <p className="text-[13px] text-muted-foreground max-w-[280px]">
                Please wait while we open the secure Razorpay checkout. Do not close this window.
              </p>
            </div>
          ) : phase === "verifying" ? (
            <div className="av2-payment-step flex flex-col items-center justify-center gap-4 w-full py-10 text-center animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
              <div className="text-lg font-bold text-white">Verifying your payment…</div>
              <p className="text-[13px] text-muted-foreground max-w-[300px]">
                Please wait while we securely confirm your payment. Do not close this window.
              </p>
            </div>
          ) : phase === "success" ? (
            <div className="av2-payment-step flex flex-col items-center justify-center gap-4 w-full py-10 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="text-lg font-bold text-white">Registration Successful</div>
              {registrationId && (
                <div className="w-full max-w-[300px] rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-3">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400/80 mb-1">
                    Your Registration ID
                  </div>
                  <div className="text-xl font-bold tracking-wide text-white">{registrationId}</div>
                </div>
              )}
              <p className="text-[13px] text-muted-foreground max-w-[300px]">
                You're registered for AgentVerse 2.0. A confirmation with your Registration ID and a
                check-in QR code has been sent to {form.email || "your email"}.
              </p>
              <button
                type="button"
                className="av2-submit mt-2"
                style={{ width: "auto", paddingInline: "28px" }}
                onClick={onClose}
              >
                Done
              </button>
            </div>
          ) : phase === "failed" ? (
            <div className="av2-payment-step flex flex-col items-center justify-center gap-4 w-full py-10 text-center animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="w-6 h-6"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </div>
              <div className="text-lg font-bold text-white">Payment verification failed</div>
              <p className="text-[13px] text-muted-foreground max-w-[320px]">
                {errorMessage ||
                  "We couldn't verify your payment. If any amount was deducted, it will be refunded automatically."}
              </p>
              <button
                type="button"
                className="av2-submit mt-2"
                style={{ width: "auto", paddingInline: "28px" }}
                onClick={retryVerification}
              >
                Retry Verification
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 4v6h-6M1 20v-6h6" />
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                </svg>
              </button>
            </div>
          ) : phase === "dismissed" ? (
            <div className="av2-payment-step flex flex-col items-center justify-center gap-4 w-full py-10 text-center animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="w-6 h-6"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div className="text-lg font-bold text-white">Payment was not completed.</div>
              <p className="text-[13px] text-muted-foreground max-w-[300px]">
                Your registration has not been created. You can try the payment again to complete
                it.
              </p>
              <button
                type="button"
                className="av2-submit mt-2"
                style={{ width: "auto", paddingInline: "28px" }}
                onClick={retryPayment}
              >
                Try Again
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ) : !userType ? (
            <>
              <span className="av2-sec-label">Select Your Profile</span>
              <p className="av2-sec-text" style={{ marginBottom: 0 }}>
                Please tell us how you are joining AgentVerse 2.0 to proceed with registration.
              </p>
              <div className="av2-type-grid">
                <button
                  type="button"
                  className="av2-type-btn"
                  onClick={() => setUserType("student")}
                >
                  <div className="av2-type-btn-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: 22, height: 22, color: "#a78bfa" }}
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  </div>
                  <div>
                    <div className="av2-type-btn-title">Student</div>
                    <div className="av2-type-btn-desc">Register yourself as a college student</div>
                  </div>
                </button>
                <button
                  type="button"
                  className="av2-type-btn"
                  onClick={() => setUserType("professional")}
                >
                  <div className="av2-type-btn-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: 22, height: 22, color: "#a78bfa" }}
                    >
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <div>
                    <div className="av2-type-btn-title">Working Professional</div>
                    <div className="av2-type-btn-desc">Register as an industry professional</div>
                  </div>
                </button>
                <button
                  type="button"
                  className="av2-type-btn"
                  disabled
                  aria-disabled="true"
                  title="Institution registration is coming soon"
                  style={{ opacity: 0.55, cursor: "not-allowed" }}
                >
                  <div className="av2-type-btn-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: 22, height: 22, color: "#a78bfa" }}
                    >
                      <path d="M3 21h18" />
                      <path d="M5 21V7l8-4v18" />
                      <path d="M19 21V11l-6-4" />
                      <path d="M9 9h.01" />
                      <path d="M9 13h.01" />
                      <path d="M9 17h.01" />
                    </svg>
                  </div>
                  <div>
                    <div className="av2-type-btn-title">
                      Institution{" "}
                      <span style={{ opacity: 0.7, fontWeight: 500 }}>· Coming soon</span>
                    </div>
                    <div className="av2-type-btn-desc">Register an institution or large cohort</div>
                  </div>
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <button type="button" className="av2-back-btn" onClick={() => setUserType("")}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: 14, height: 14 }}
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Back to options
              </button>

              {userType === "student" && (
                <>
                  <div className="av2-fg">
                    <label className="av2-label">Student Name *</label>
                    <input
                      className="av2-input"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      required
                      pattern="^[A-Za-z\s]+$"
                      title="Only letters and spaces allowed"
                    />
                  </div>
                  <div className="av2-frow">
                    <div className="av2-fg">
                      <label className="av2-label">Email *</label>
                      <input
                        className="av2-input"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                        required
                      />
                    </div>
                    <div className="av2-fg">
                      <label className="av2-label">Contact Number *</label>
                      <input
                        className="av2-input"
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="9876543210"
                        required
                        pattern="^[0-9]{10}$"
                        title="Enter a valid 10-digit phone number"
                      />
                    </div>
                  </div>
                  <div className="av2-frow">
                    <div className="av2-fg">
                      <label className="av2-label">Roll No. *</label>
                      <input
                        className="av2-input"
                        name="rollNo"
                        value={form.rollNo}
                        onChange={handleChange}
                        placeholder="Student ID / Roll No"
                        required
                        pattern="^[A-Za-z0-9\-]+$"
                        title="Only alphanumeric characters and hyphens allowed"
                      />
                    </div>
                    <div className="av2-fg">
                      <label className="av2-label">College *</label>
                      <input
                        className="av2-input"
                        name="college"
                        value={form.college}
                        onChange={handleChange}
                        placeholder="College Name"
                        required
                        pattern="^[A-Za-z0-9\s.,&'-]+$"
                        title="Enter a valid college name"
                      />
                    </div>
                  </div>
                </>
              )}

              {userType === "professional" && (
                <>
                  <div className="av2-fg">
                    <label className="av2-label">Name *</label>
                    <input
                      className="av2-input"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      required
                      pattern="^[A-Za-z\s]+$"
                      title="Only letters and spaces allowed"
                    />
                  </div>
                  <div className="av2-frow">
                    <div className="av2-fg">
                      <label className="av2-label">Email *</label>
                      <input
                        className="av2-input"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                        required
                      />
                    </div>
                    <div className="av2-fg">
                      <label className="av2-label">Contact Number *</label>
                      <input
                        className="av2-input"
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="9876543210"
                        required
                        pattern="^[0-9]{10}$"
                        title="Enter a valid 10-digit phone number"
                      />
                    </div>
                  </div>
                  <div className="av2-frow">
                    <div className="av2-fg">
                      <label className="av2-label">Years of Experience *</label>
                      <input
                        className="av2-input"
                        type="number"
                        name="experience"
                        value={form.experience}
                        onChange={handleChange}
                        placeholder="e.g. 3"
                        required
                        min="0"
                        max="50"
                      />
                    </div>
                    <div className="av2-fg">
                      <label className="av2-label">Organization Name *</label>
                      <input
                        className="av2-input"
                        name="organization"
                        value={form.organization}
                        onChange={handleChange}
                        placeholder="Company Name"
                        required
                        pattern="^[A-Za-z0-9\s.,&'-]+$"
                        title="Enter a valid organization name"
                      />
                    </div>
                  </div>
                </>
              )}

              <button type="submit" className="av2-submit">
                Proceed to Payment
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
