import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { formService, type AgentVersePayload } from "@/services/form.service";
import { ApiError } from "@/utils/apiError";

const RazorpayButton = () => {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current && formRef.current.children.length === 0) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/payment-button.js";
      script.setAttribute("data-payment_button_id", "pl_T905xEsNxKZXoU");
      script.async = true;
      formRef.current.appendChild(script);
    }
  }, []);

  return <form ref={formRef} className="w-full flex justify-center py-2 relative z-10 min-h-[60px]"></form>;
};

interface Props {
  onClose: () => void;
}

export function AgentVerseRegistrationModal({ onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isSendingToSheet, setIsSendingToSheet] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userType, setUserType] = useState<"student" | "professional" | "institution" | "">("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    rollNo: "",
    college: "",
    experience: "",
    organization: "",
    participants: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  /** Build the typed backend payload for the selected profile. */
  const buildPayload = (
    currentForm: typeof form,
    type: "student" | "professional" | "institution",
  ): AgentVersePayload => {
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
    if (type === "professional") {
      return {
        userType: "professional",
        name: currentForm.name,
        email: currentForm.email,
        phone: currentForm.phone,
        experience: Number(currentForm.experience),
        organization: currentForm.organization,
      };
    }
    return {
      userType: "institution",
      name: currentForm.name,
      email: currentForm.email,
      phone: currentForm.phone,
      organization: currentForm.organization,
      participants: Number(currentForm.participants),
    };
  };

  /**
   * Persist the registration via the centralized backend. Returns true when the
   * caller may proceed (to payment or confirmation). Backend validation and
   * duplicate (409) errors surface inline; entered values are kept on failure.
   */
  const submitRegistration = async (
    currentForm: typeof form,
    type: "student" | "professional" | "institution",
  ): Promise<boolean> => {
    setIsSendingToSheet(true);
    setErrorMessage("");
    try {
      await formService.submitAgentVerse(buildPayload(currentForm, type));
      return true;
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Something went wrong. Please try again.";
      setErrorMessage(message);
      toast.error(message);
      return false;
    } finally {
      setIsSendingToSheet(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Guard against duplicate submits while a request is already in flight.
    if (isSendingToSheet) return;

    const isAllowed = await submitRegistration(form, userType as
      | "student"
      | "professional"
      | "institution");
    if (!isAllowed) return;

    if (userType === "student" || userType === "professional") {
      setIsPaying(true);
    } else if (userType === "institution") {
      setSubmitted(true);
      toast.success("Registration confirmed — check your inbox for details.");
      setTimeout(() => onClose(), 3000);
    }
  };

  const handleClose = () => {
    if (!isProcessingPayment && !isSendingToSheet) {
      onClose();
    }
  };

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
          <h2>{submitted ? "Registration Complete" : "Register for AgentVerse"}</h2>
          {!submitted && (
            <button className="av2-modal-close" onClick={handleClose} disabled={isProcessingPayment || isSendingToSheet}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
        <div className="av2-modal-body" style={{ overflowY: 'auto', maxHeight: 'calc(85vh - 80px)' }}>
          {errorMessage && (
            <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', padding: '12px 16px', borderRadius: '12px', fontSize: '14px', marginBottom: '20px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 18, height: 18 }}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
              {errorMessage}
            </div>
          )}

          {submitted ? (
            <div className="av2-success">
              <div className="av2-success-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="av2-success-title">Registration Successful</div>
              <p className="av2-success-sub">
                Thank you for registering. We'll send confirmation to {form.email || "your email"}.
              </p>
            </div>
          ) : isPaying ? (
            <div className="av2-payment-step flex flex-col gap-4 w-full relative animate-in fade-in zoom-in-95 duration-300">
              <div className="text-center mb-1">
                <span className="av2-sec-label text-xs">Secure Checkout</span>
                <h3 className="text-xl font-bold text-white mt-1">Complete Registration</h3>
              </div>

              {/* Compact Combined Payment Card */}
              <div className="bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl overflow-hidden shadow-glow relative z-10 flex flex-col">
                {/* Slim Order Details */}
                <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm shrink-0 border border-primary/20">
                      {form.name ? form.name.charAt(0).toUpperCase() : "A"}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium text-white truncate">{form.name || "Participant"}</span>
                      <span className="text-xs text-muted-foreground truncate">{form.email || "email@example.com"}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <div className="text-[10px] uppercase tracking-wider text-primary font-semibold mb-0.5">Total</div>
                    <div className="text-sm font-bold text-white">Standard Entry</div>
                  </div>
                </div>

                {/* Payment Area */}
                <div className="px-5 py-6 flex flex-col items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
                  
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  </div>
                  
                  <p className="text-[13px] text-center text-muted-foreground mb-5 max-w-[260px]">
                    Processed securely by Razorpay with 256-bit SSL encryption.
                  </p>

                  <div className="w-full flex justify-center min-h-[45px] relative z-10">
                    <RazorpayButton />
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-white transition-colors duration-200 flex items-center justify-center gap-2 mt-2 w-max mx-auto"
                onClick={() => setIsPaying(false)}
                disabled={isProcessingPayment || isSendingToSheet}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                Go Back
              </button>
            </div>
          ) : !userType ? (
            <>
              <span className="av2-sec-label">Select Your Profile</span>
              <p className="av2-sec-text" style={{ marginBottom: 0 }}>
                Please tell us how you are joining AgentVerse 2.0 to proceed with registration.
              </p>
              <div className="av2-type-grid">
                <button type="button" className="av2-type-btn" onClick={() => setUserType("student")}>
                  <div className="av2-type-btn-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22, color: '#a78bfa' }}><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                  </div>
                  <div>
                    <div className="av2-type-btn-title">Student</div>
                    <div className="av2-type-btn-desc">Register yourself as a college student</div>
                  </div>
                </button>
                <button type="button" className="av2-type-btn" onClick={() => setUserType("professional")}>
                  <div className="av2-type-btn-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22, color: '#a78bfa' }}><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                  </div>
                  <div>
                    <div className="av2-type-btn-title">Working Professional</div>
                    <div className="av2-type-btn-desc">Register as an industry professional</div>
                  </div>
                </button>

              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <button type="button" className="av2-back-btn" onClick={() => setUserType("")} disabled={isSendingToSheet}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                Back to options
              </button>

              {userType === "student" && (
                <>
                  <div className="av2-fg">
                    <label className="av2-label">Student Name *</label>
                    <input className="av2-input" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required pattern="^[A-Za-z\s]+$" title="Only letters and spaces allowed" />
                  </div>
                  <div className="av2-frow">
                    <div className="av2-fg">
                      <label className="av2-label">Email *</label>
                      <input className="av2-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" required />
                    </div>
                    <div className="av2-fg">
                      <label className="av2-label">Contact Number *</label>
                      <input className="av2-input" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="9876543210" required pattern="^[0-9]{10}$" title="Enter a valid 10-digit phone number" />
                    </div>
                  </div>
                  <div className="av2-frow">
                    <div className="av2-fg">
                      <label className="av2-label">Roll No. *</label>
                      <input className="av2-input" name="rollNo" value={form.rollNo} onChange={handleChange} placeholder="Student ID / Roll No" required pattern="^[A-Za-z0-9\-]+$" title="Only alphanumeric characters and hyphens allowed" />
                    </div>
                    <div className="av2-fg">
                      <label className="av2-label">College *</label>
                      <input className="av2-input" name="college" value={form.college} onChange={handleChange} placeholder="College Name" required pattern="^[A-Za-z0-9\s.,&'-]+$" title="Enter a valid college name" />
                    </div>
                  </div>
                </>
              )}

              {userType === "professional" && (
                <>
                  <div className="av2-fg">
                    <label className="av2-label">Name *</label>
                    <input className="av2-input" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required pattern="^[A-Za-z\s]+$" title="Only letters and spaces allowed" />
                  </div>
                  <div className="av2-frow">
                    <div className="av2-fg">
                      <label className="av2-label">Email *</label>
                      <input className="av2-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" required />
                    </div>
                    <div className="av2-fg">
                      <label className="av2-label">Contact Number *</label>
                      <input className="av2-input" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="9876543210" required pattern="^[0-9]{10}$" title="Enter a valid 10-digit phone number" />
                    </div>
                  </div>
                  <div className="av2-frow">
                    <div className="av2-fg">
                      <label className="av2-label">Years of Experience *</label>
                      <input className="av2-input" type="number" name="experience" value={form.experience} onChange={handleChange} placeholder="e.g. 3" required min="0" max="50" />
                    </div>
                    <div className="av2-fg">
                      <label className="av2-label">Organization Name *</label>
                      <input className="av2-input" name="organization" value={form.organization} onChange={handleChange} placeholder="Company Name" required pattern="^[A-Za-z0-9\s.,&'-]+$" title="Enter a valid organization name" />
                    </div>
                  </div>
                </>
              )}

              <button type="submit" className="av2-submit" disabled={isSendingToSheet}>
                {isSendingToSheet ? 'Processing...' : 'Proceed to Payment'}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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