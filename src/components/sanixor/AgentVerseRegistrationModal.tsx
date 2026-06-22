import React, { useState } from "react";

interface Props {
  onClose: () => void;
}

export function AgentVerseRegistrationModal({ onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if ((userType === "student" || userType === "professional") && !isPaying) {
      setIsPaying(true);
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const handleDummyPayment = () => {
    setIsProcessingPayment(true);
    
    // TODO: Integrate payment gateway endpoint here for students
    // Example endpoint usage:
    // fetch('/api/payment', { method: 'POST', body: JSON.stringify({ amount: 500, userDetails: form }) })

    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsPaying(false);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    }, 1500);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="av2-overlay" onClick={handleClose}>
      <div className="av2-modal" onClick={(e) => e.stopPropagation()}>
        <div className="av2-modal-head">
          <h2>{submitted ? "Registration Complete" : "Register for AgentVerse"}</h2>
          {!submitted && (
            <button className="av2-modal-close" onClick={handleClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>
        <div className="av2-modal-body">
          {submitted ? (
            <div className="av2-success">
              <div className="av2-success-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div className="av2-success-title">Registration Successful</div>
              <p className="av2-success-sub">
                Thank you for registering. We'll send confirmation to{" "}
                {form.email || "your email"}.
              </p>
            </div>
          ) : isPaying ? (
            <div className="av2-payment-step">
              <span className="av2-sec-label">Payment Gateway (Dummy)</span>
              <p className="av2-sec-text" style={{ marginBottom: 20 }}>
                Complete your {userType} registration by paying the entry fee.
              </p>
              
              <div style={{ background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(139, 92, 246, 0.15)', borderRadius: 16, padding: 32, textAlign: 'center', marginBottom: 24, boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 8, letterSpacing: '-0.02em' }}>₹{userType === 'student' ? '500' : '1500'}.00</div>
                <div style={{ fontSize: 13, color: '#a78bfa', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>AgentVerse 2.0 Entry Fee</div>
              </div>

              <button 
                type="button" 
                className="av2-submit" 
                onClick={handleDummyPayment}
                disabled={isProcessingPayment}
                style={{ opacity: isProcessingPayment ? 0.7 : 1, cursor: isProcessingPayment ? 'wait' : 'pointer' }}
              >
                {isProcessingPayment ? "Processing Payment..." : `Pay ₹${userType === 'student' ? '500' : '1500'} & Complete`}
                {!isProcessingPayment && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                )}
              </button>
              
              <button 
                type="button" 
                className="av2-back-btn" 
                onClick={() => setIsPaying(false)}
                style={{ marginTop: 20, justifyContent: 'center', width: '100%', marginLeft: 0 }}
                disabled={isProcessingPayment}
              >
                Cancel Payment
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
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22, color: '#a78bfa' }}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                  </div>
                  <div>
                    <div className="av2-type-btn-title">Student</div>
                    <div className="av2-type-btn-desc">Register yourself as a college student</div>
                  </div>
                </button>
                <button type="button" className="av2-type-btn" onClick={() => setUserType("professional")}>
                  <div className="av2-type-btn-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22, color: '#a78bfa' }}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                  </div>
                  <div>
                    <div className="av2-type-btn-title">Working Professional</div>
                    <div className="av2-type-btn-desc">Register as an industry professional</div>
                  </div>
                </button>
                <button type="button" className="av2-type-btn" onClick={() => setUserType("institution")}>
                  <div className="av2-type-btn-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22, color: '#a78bfa' }}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                  <div>
                    <div className="av2-type-btn-title">Institution / Community</div>
                    <div className="av2-type-btn-desc">Register on behalf of an organization</div>
                  </div>
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <button type="button" className="av2-back-btn" onClick={() => setUserType("")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
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

              {userType === "institution" && (
                <>
                  <div className="av2-fg">
                    <label className="av2-label">Institution / Organization Name *</label>
                    <input className="av2-input" name="organization" value={form.organization} onChange={handleChange} placeholder="Name of institution or community" required pattern="^[A-Za-z0-9\s.,&'-]+$" title="Enter a valid institution name" />
                  </div>
                  <div className="av2-fg">
                    <label className="av2-label">Contact Person (POC) *</label>
                    <input className="av2-input" name="name" value={form.name} onChange={handleChange} placeholder="Full Name of POC" required pattern="^[A-Za-z\s]+$" title="Only letters and spaces allowed" />
                  </div>
                  <div className="av2-frow">
                    <div className="av2-fg">
                      <label className="av2-label">Email *</label>
                      <input className="av2-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" required />
                    </div>
                    <div className="av2-fg">
                      <label className="av2-label">Contact Number (POC) *</label>
                      <input className="av2-input" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="9876543210" required pattern="^[0-9]{10}$" title="Enter a valid 10-digit phone number" />
                    </div>
                  </div>
                  <div className="av2-fg">
                    <label className="av2-label">Number of Participants *</label>
                    <input className="av2-input" type="number" name="participants" value={form.participants} onChange={handleChange} placeholder="Expected number of participants" required min="1" />
                  </div>
                </>
              )}

              <button type="submit" className="av2-submit">
                {(userType === 'student' || userType === 'professional') ? 'Proceed to Payment' : 'Complete Registration'}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  {(userType === 'student' || userType === 'professional') ? (
                    <><path d="M5 12h14M12 5l7 7-7 7"/></>
                  ) : (
                    <><path d="M5 12h14M12 5l7 7-7 7"/></>
                  )}
                </svg>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
