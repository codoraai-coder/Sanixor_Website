import React, { useState, useEffect } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  productType: "BitBench" | "Hackathon Evaluation";
}

interface DemoForm {
  fullName: string;
  businessEmail: string;
  organization: string;
  message: string;
}

// ─── Product Meta ─────────────────────────────────────────────────────────────

const PRODUCT_META: Record<
  BookDemoModalProps["productType"],
  { icon: React.ReactNode; accent: string; tagline: string }
> = {
  BitBench: {
    tagline: "AI Performance & Benchmarking Platform",
    accent: "#6366f1",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: 20, height: 20 }}
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  "Hackathon Evaluation": {
    tagline: "AI-Powered Hackathon Judging System",
    accent: "#a855f7",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: 20, height: 20 }}
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

// ─── Submission status type ───────────────────────────────────────────────────
type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function BookDemoModal({
  isOpen,
  onClose,
  productType,
}: BookDemoModalProps) {
  // ── Form state ──────────────────────────────────────────────────────────────
  const [form, setForm] = useState<DemoForm>({
    fullName: "",
    businessEmail: "",
    organization: "",
    message: "",
  });

  // ── Security / duplicate-request check ─────────────────────────────────────
  // Read localStorage once on mount so the flag is available for SSR-safe rendering.
  const [alreadyBooked, setAlreadyBooked] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("sanixor_demo_booked") === "true") {
      setAlreadyBooked(true);
    }
  }, []);

  // ── Submission UI state ─────────────────────────────────────────────────────
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const meta = PRODUCT_META[productType];

  if (!isOpen) return null;

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOverlayClick = () => {
    // Prevent accidental close while a request is in flight
    if (submitStatus !== "submitting") onClose();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Read the webhook URL from the Vite env variable
    const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined;

    if (!webhookUrl) {
      console.error(
        "[BookDemoModal] VITE_N8N_WEBHOOK_URL is not defined. " +
        "Check your .env file and restart the dev server."
      );
      setErrorMessage(
        "Configuration error: webhook URL is missing. Please contact support."
      );
      setSubmitStatus("error");
      return;
    }

    setSubmitStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName,
          email: form.businessEmail,
          company: form.organization,
          message: form.message,
          productType,
        }),
      });

      if (response.status === 409) {
        setErrorMessage("You have already booked a demo with this email!");
        setSubmitStatus("error");
        return;
      }

      if (response.status === 200 || response.status === 201) {
        // ✅ Success — persist flag and show confirmation
        localStorage.setItem("sanixor_demo_booked", "true");
        setAlreadyBooked(true);
        setSubmitStatus("success");
      } else {
        // Server returned an unexpected status
        throw new Error(`Server responded with status ${response.status}.`);
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again.";
      console.error("[BookDemoModal] Submission failed:", err);
      setErrorMessage(message);
      setSubmitStatus("error");
    }
  };

  const isSubmitting = submitStatus === "submitting";

  return (
    <>
      {/* ── Scoped Styles ──────────────────────────────────────────────────── */}
      <style>{`
        /* Overlay — owns all scroll so wheel/trackpad never reaches the page */
        .bdm-overlay {
          position: fixed;
          inset: 0;
          background: color-mix(in srgb, var(--background) 85%, transparent);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 1100;
          /* Scroll lives HERE, not on the modal card */
          overflow-y: auto;
          overscroll-behavior: contain; /* hard-stop: no bleed to body */
          -webkit-overflow-scrolling: touch; /* smooth on iOS */
          /* Flex centering: flex-start + auto-margin centres short content
             but lets the modal push the overlay taller on small screens */
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 24px;
          animation: bdm-fadeIn 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes bdm-fadeIn {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to   { opacity: 1; backdrop-filter: blur(12px); }
        }

        /* Scrollbar on the overlay (the actual scroll container) */
        .bdm-overlay::-webkit-scrollbar { width: 5px; }
        .bdm-overlay::-webkit-scrollbar-track { background: transparent; }
        .bdm-overlay::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.22);
          border-radius: 10px;
        }
        .bdm-overlay::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.42);
        }

        /* Modal Card — natural height, no inner scroll needed */
        .bdm-modal {
          background: color-mix(in srgb, var(--card) 85%, transparent);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(139, 92, 246, 0.28);
          border-radius: 24px;
          width: 100%;
          max-width: 560px;
          /* auto-margin centres the card vertically when overlay has room */
          margin: auto;
          /* No max-height / overflow-y here — the overlay scrolls, not the card */
          box-shadow:
            0 40px 100px rgba(0, 0, 0, 0.85),
            inset 0 1px 1px rgba(255, 255, 255, 0.06),
            0 0 48px rgba(139, 92, 246, 0.12);
          animation: bdm-modalIn 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes bdm-modalIn {
          from { opacity: 0; transform: scale(0.96) translateY(18px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Header */
        .bdm-head {
          padding: 28px 32px 24px;
          border-bottom: 1px solid rgba(139, 92, 246, 0.15);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          background: linear-gradient(180deg, rgba(139, 92, 246, 0.07) 0%, transparent 100%);
        }
        .bdm-head-left {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 0;
        }
        .bdm-product-icon {
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(99, 102, 241, 0.12));
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 14px;
          color: #c4b5fd;
          box-shadow: inset 0 0 12px rgba(139, 92, 246, 0.12);
        }
        .bdm-head-titles { min-width: 0; }
        .bdm-head-titles h2 {
          font-size: 20px;
          font-weight: 700;
          color: var(--foreground);
          margin: 0 0 3px;
          letter-spacing: -0.015em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .bdm-head-tagline {
          font-size: 12px;
          color: var(--primary);
          font-weight: 500;
          letter-spacing: 0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Close Button */
        .bdm-close {
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(139, 92, 246, 0.08);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 10px;
          color: #c4b5fd;
          cursor: pointer;
          padding: 0;
          transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .bdm-close svg { width: 18px; height: 18px; }
        .bdm-close:hover {
          background: rgba(139, 92, 246, 0.22);
          border-color: rgba(167, 139, 250, 0.45);
          color: #fff;
          transform: rotate(90deg) scale(1.05);
        }

        /* Info Banner */
        .bdm-banner {
          margin: 28px 32px 0;
          padding: 14px 18px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(99, 102, 241, 0.06));
          border: 1px solid rgba(139, 92, 246, 0.18);
          border-radius: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .bdm-banner-dot {
          width: 8px;
          height: 8px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #a78bfa;
          box-shadow: 0 0 8px rgba(167, 139, 250, 0.8);
          animation: bdm-pulse 2s infinite;
        }
        @keyframes bdm-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.65; transform: scale(0.8); }
        }
        .bdm-banner-text {
          font-size: 13px;
          color: var(--foreground);
          line-height: 1.55;
          font-weight: 500;
        }
        .bdm-banner-text strong { color: var(--foreground); font-weight: 700; }

        /* Body */
        .bdm-body { padding: 28px 32px 32px; }

        /* Section Label */
        .bdm-sec-label {
          display: block;
          font-size: 10.5px;
          font-weight: 800;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 20px;
        }

        /* Field Group */
        .bdm-fg { margin-bottom: 20px; }
        .bdm-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          color: var(--foreground);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 8px;
        }
        .bdm-label .bdm-opt {
          font-weight: 500;
          color: #7c6fa0;
          text-transform: none;
          letter-spacing: 0;
          font-size: 10px;
          margin-left: 6px;
        }

        /* Input & Textarea */
        .bdm-input,
        .bdm-textarea {
          width: 100%;
          padding: 13px 16px;
          background: color-mix(in srgb, var(--foreground) 6%, transparent);
          border: 1px solid color-mix(in srgb, var(--primary) 15%, transparent);
          border-radius: 12px;
          font-size: 14px;
          color: var(--foreground);
          font-family: inherit;
          outline: none;
          appearance: none;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          box-sizing: border-box;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.12);
        }
        .bdm-input::placeholder,
        .bdm-textarea::placeholder {
          color: rgba(167, 139, 250, 0.35);
          font-weight: 400;
        }
        .bdm-input:hover,
        .bdm-textarea:hover {
          border-color: rgba(139, 92, 246, 0.32);
          background: rgba(0, 0, 0, 0.3);
        }
        .bdm-input:focus,
        .bdm-textarea:focus {
          border-color: #a78bfa;
          background: rgba(139, 92, 246, 0.055);
          box-shadow:
            0 0 0 4px rgba(139, 92, 246, 0.15),
            inset 0 2px 4px rgba(0, 0, 0, 0.12);
        }
        .bdm-textarea {
          resize: vertical;
          min-height: 108px;
          line-height: 1.65;
        }

        /* Divider */
        .bdm-divider {
          border: none;
          border-top: 1px solid rgba(139, 92, 246, 0.1);
          margin: 24px 0;
        }

        /* Submit Button */
        .bdm-submit {
          width: 100%;
          margin-top: 8px;
          padding: 15px 20px;
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          color: #fff;
          border: none;
          border-radius: 14px;
          font-size: 13.5px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          font-family: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          box-shadow:
            0 10px 32px rgba(124, 58, 237, 0.42),
            inset 0 1px 1px rgba(255, 255, 255, 0.22);
        }
        .bdm-submit svg { width: 17px; height: 17px; transition: transform 0.3s; }
        .bdm-submit:hover {
          transform: translateY(-2px);
          box-shadow:
            0 18px 44px rgba(124, 58, 237, 0.62),
            inset 0 1px 1px rgba(255, 255, 255, 0.3);
        }
        .bdm-submit:hover svg { transform: translateX(4px); }
        .bdm-submit:active { transform: translateY(0); box-shadow: 0 6px 16px rgba(124, 58, 237, 0.4); }

        /* Privacy note */
        .bdm-privacy {
          margin-top: 14px;
          text-align: center;
          font-size: 11.5px;
          color: #6b5f85;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .bdm-privacy svg { width: 12px; height: 12px; flex-shrink: 0; }

        /* ── Already-booked banner ── */
        .bdm-booked-banner {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 40px 28px 36px;
          gap: 0;
        }
        .bdm-booked-ico {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.18), rgba(99, 102, 241, 0.1));
          border: 2px solid rgba(139, 92, 246, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c4b5fd;
          margin-bottom: 20px;
          animation: bdm-successPop 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .bdm-booked-ico svg { width: 28px; height: 28px; }
        .bdm-booked-title {
          font-size: 17px;
          font-weight: 700;
          color: var(--foreground);
          margin-bottom: 10px;
          letter-spacing: -0.01em;
        }
        .bdm-booked-sub {
          font-size: 13.5px;
          line-height: 1.65;
          color: #a78bfa;
          max-width: 340px;
        }

        /* ── Success state ── */
        .bdm-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 40px 28px 36px;
        }
        .bdm-success-ico {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(34, 197, 94, 0.12);
          border: 2px solid rgba(34, 197, 94, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #22c55e;
          margin-bottom: 20px;
          animation: bdm-successPop 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .bdm-success-ico svg { width: 28px; height: 28px; }
        @keyframes bdm-successPop {
          from { transform: scale(0.7); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        @keyframes bdm-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .bdm-success-title {
          font-size: 17px;
          font-weight: 700;
          color: var(--foreground);
          margin-bottom: 10px;
          letter-spacing: -0.01em;
        }
        .bdm-success-sub {
          font-size: 13.5px;
          line-height: 1.65;
          color: #86efac;
          max-width: 340px;
        }

        /* ── Error toast (inline, above submit) ── */
        .bdm-error-toast {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 13px 16px;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.25);
          border-radius: 12px;
          margin-bottom: 16px;
          animation: bdm-modalIn 0.25s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .bdm-error-toast svg {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          color: #f87171;
          margin-top: 1px;
        }
        .bdm-error-toast p {
          font-size: 13px;
          color: #fca5a5;
          line-height: 1.55;
          margin: 0;
        }

        /* Submit disabled state */
        .bdm-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          transform: none !important;
        }

        /* ── Responsive ── */
        @media (max-width: 600px) {
          .bdm-overlay { padding: 12px; }
          /* no max-height on modal — overlay is the scroll container */
          .bdm-head { padding: 18px 20px 14px; }
          .bdm-head-titles h2 { font-size: 16px; }
          .bdm-banner { margin: 16px 20px 0; }
          .bdm-body { padding: 18px 20px 20px; }
          .bdm-input, .bdm-textarea { padding: 10px 14px; }
          .bdm-fg { margin-bottom: 16px; }
        }
        @media (max-width: 380px) {
          .bdm-head { padding: 14px 16px 12px; }
          .bdm-banner { margin: 12px 16px 0; }
          .bdm-body { padding: 14px 16px 16px; }
          .bdm-input, .bdm-textarea { padding: 8px 12px; }
          .bdm-fg { margin-bottom: 14px; }
        }
      `}</style>

      {/* ── Overlay ────────────────────────────────────────────────────────── */}
      <div className="bdm-overlay" onClick={handleOverlayClick}>
        <div className="bdm-modal" onClick={handleModalClick}>

          {/* ── Header ───────────────────────────────────────────────────── */}
          <div className="bdm-head">
            <div className="bdm-head-left">
              <div className="bdm-product-icon">{meta.icon}</div>
              <div className="bdm-head-titles">
                <h2>Book a Demo</h2>
                <div className="bdm-head-tagline">{productType} · {meta.tagline}</div>
              </div>
            </div>
            <button
              className="bdm-close"
              onClick={onClose}
              disabled={isSubmitting}
              aria-label="Close demo booking modal"
            >
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
          </div>

          {/* ────────────────────────────────────────────────────────────────
               Conditional body rendering:
               1. alreadyBooked  → already-submitted banner
               2. success        → confirmation screen
               3. default        → live indicator + form
          ──────────────────────────────────────────────────────────────── */}

          {alreadyBooked && submitStatus !== "success" ? (
            /* ── Already-booked state ─────────────────────────────────── */
            <div className="bdm-booked-banner">
              <div className="bdm-booked-ico">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.61 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="bdm-booked-title">Demo Already Requested!</div>
              <p className="bdm-booked-sub">
                You have already requested a demo. Our team will contact you
                shortly at your registered email to schedule a personalised
                walkthrough.
              </p>
            </div>
          ) : submitStatus === "success" ? (
            /* ── Success state ────────────────────────────────────────── */
            <div className="bdm-success">
              <div className="bdm-success-ico">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="bdm-success-title">Demo Request Sent!</div>
              <p className="bdm-success-sub">
                Thank you! We've received your request for{" "}
                <strong style={{ color: "#a7f3d0" }}>{productType}</strong>. Our
                team will reach out to <strong style={{ color: "#a7f3d0" }}>{form.businessEmail || "your email"}</strong>{" "}
                within 1 business day.
              </p>
            </div>
          ) : (
            /* ── Default: live indicator banner + form ────────────────── */
            <>
              <div className="bdm-banner">
                <div className="bdm-banner-dot" />
                <p className="bdm-banner-text">
                  Our team typically responds within{" "}
                  <strong>1 business day</strong>. Fill in your details and
                  we'll reach out to schedule a personalised walkthrough.
                </p>
              </div>

              <div className="bdm-body">
                <span className="bdm-sec-label">Your Details</span>

                {/* ── Inline error toast ──────────────────────────────── */}
                {submitStatus === "error" && (
                  <div className="bdm-error-toast" role="alert">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <p>{errorMessage || "Something went wrong. Please try again."}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  {/* Full Name */}
                  <div className="bdm-fg">
                    <label className="bdm-label" htmlFor="bdm-fullName">
                      Full Name
                    </label>
                    <input
                      id="bdm-fullName"
                      className="bdm-input"
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Arjun Mehta"
                      required
                      disabled={isSubmitting}
                      autoComplete="name"
                      pattern="^[A-Za-z\s]+$"
                      title="Only letters and spaces allowed"
                    />
                  </div>

                  {/* Business Email */}
                  <div className="bdm-fg">
                    <label className="bdm-label" htmlFor="bdm-businessEmail">
                      Business Email
                    </label>
                    <input
                      id="bdm-businessEmail"
                      className="bdm-input"
                      type="email"
                      name="businessEmail"
                      value={form.businessEmail}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      required
                      disabled={isSubmitting}
                      autoComplete="email"
                    />
                  </div>

                  {/* Organization */}
                  <div className="bdm-fg">
                    <label className="bdm-label" htmlFor="bdm-organization">
                      Organization / Company
                    </label>
                    <input
                      id="bdm-organization"
                      className="bdm-input"
                      type="text"
                      name="organization"
                      value={form.organization}
                      onChange={handleChange}
                      placeholder="e.g. Acme Corp / IIT Bombay"
                      required
                      disabled={isSubmitting}
                      autoComplete="organization"
                      pattern="^[A-Za-z0-9\s.,&'\-]+$"
                      title="Enter a valid organization name"
                    />
                  </div>

                  <hr className="bdm-divider" />

                  {/* Specific Requirement (Optional) */}
                  <div className="bdm-fg" style={{ marginBottom: 0 }}>
                    <label className="bdm-label" htmlFor="bdm-message">
                      Specific Requirement / Message
                      <span className="bdm-opt">(Optional)</span>
                    </label>
                    <textarea
                      id="bdm-message"
                      className="bdm-textarea"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      placeholder={`Tell us about your use-case for ${productType}. What problem are you looking to solve?`}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="bdm-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            animation: "bdm-spin 0.8s linear infinite",
                          }}
                        >
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        Sending Request…
                      </>
                    ) : (
                      <>
                        Request Demo for {productType}
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
                      </>
                    )}
                  </button>
                </form>

                {/* Privacy note */}
                <p className="bdm-privacy">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Your data is kept private and never shared with third parties.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
