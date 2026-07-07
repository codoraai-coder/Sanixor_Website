import React, { useState } from "react";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { formService } from "@/services/form.service";

interface PartnershipModalProps {
  onClose: () => void;
}

export function AgentVersePartnershipModal({ onClose }: PartnershipModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    poc: "",
    org: "",
  });

  const { submit, isSubmitting, error } = useFormSubmission({
    submit: formService.submitContact,
    successMessage: "Partnership inquiry sent. We'll follow up shortly.",
    onSuccess: () => {
      setSubmitted(true);
      setForm({ name: "", email: "", poc: "", org: "" });
      setTimeout(onClose, 2200);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit({
      name: form.name,
      email: form.email,
      company: form.org,
      topic: "Partnership",
      message: [
        "AgentVerse 2.0 partnership inquiry",
        `Point of contact: ${form.poc}`,
        `Organization / College: ${form.org}`,
      ].join("\n"),
    });
  };

  return (
    <div className="av2-overlay" onClick={onClose}>
      <div className="av2-modal" onClick={(e) => e.stopPropagation()}>
        <div className="av2-modal-head">
          <h2>Become a Partner</h2>
          <button className="av2-modal-close" onClick={onClose} aria-label="Close">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div
          className="av2-modal-body"
          style={{ overflowY: "auto", maxHeight: "calc(85vh - 80px)" }}
        >
          {submitted ? (
            <div className="av2-success">
              <div className="av2-success-ico">
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
              <div className="av2-success-title">Partnership Inquiry Sent</div>
              <p className="av2-success-sub">
                Thanks for reaching out. Our team will follow up by email shortly.
              </p>
            </div>
          ) : (
            <>
              <span className="av2-sec-label">Partnership Inquiry</span>
              <p className="av2-sec-text">
                We are looking for forward-thinking partners to co-host, support, and grow the
                AgentVerse ecosystem. Fill out the form below to connect with us, or email us
                directly at{" "}
                <a href="mailto:team@sanixor.space" style={{ color: "#a855f7" }}>
                  team@sanixor.space
                </a>
                .
              </p>

              {error && (
                <div
                  style={{
                    background: "rgba(239, 68, 68, 0.15)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    color: "#f87171",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    fontSize: "14px",
                    marginTop: "20px",
                    fontWeight: 500,
                  }}
                >
                  {error.message}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ marginTop: "24px" }}>
                <div className="av2-frow">
                  <div className="av2-fg">
                    <label className="av2-label">Full Name *</label>
                    <input
                      name="name"
                      required
                      className="av2-input"
                      placeholder="e.g. Sarah Connor"
                      value={form.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="av2-fg">
                    <label className="av2-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="av2-input"
                      placeholder="e.g. sarah@university.edu"
                      value={form.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="av2-frow">
                  <div className="av2-fg">
                    <label className="av2-label">Point of Contact *</label>
                    <input
                      name="poc"
                      required
                      className="av2-input"
                      placeholder="e.g. Dean of AI / +1 234 567 890"
                      value={form.poc}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="av2-fg">
                    <label className="av2-label">Organization / College *</label>
                    <input
                      name="org"
                      required
                      className="av2-input"
                      placeholder="e.g. Stanford University"
                      value={form.org}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="av2-submit"
                  style={{ marginTop: "32px" }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Partnership Inquiry"}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
