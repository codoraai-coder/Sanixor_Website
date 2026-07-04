import React, { useState } from "react";

interface PartnershipModalProps {
  onClose: () => void;
}

export function AgentVersePartnershipModal({ onClose }: PartnershipModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    poc: "",
    org: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct email body
    const subject = encodeURIComponent("Partnership Inquiry - AgentVerse 2.0");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPoint of Contact: ${form.poc}\nOrganization/College: ${form.org}\n\nHi Sanixor Team,\n\nWe are interested in partnering for AgentVerse 2.0. Please find our details above.\n\nBest,\n${form.name}`
    );

    const mailtoLink = `mailto:team@sanixor.space?subject=${subject}&body=${body}`;
    
    alert("Opening your email client...");
    window.location.href = mailtoLink;
    onClose();
  };

  return (
    <div className="av2-overlay" onClick={onClose}>
      <div className="av2-modal" onClick={(e) => e.stopPropagation()}>
        <div className="av2-modal-head">
          <h2>Become a Partner</h2>
          <button className="av2-modal-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="av2-modal-body" style={{ overflowY: 'auto', maxHeight: 'calc(85vh - 80px)' }}>
          <span className="av2-sec-label">Partnership Inquiry</span>
          <p className="av2-sec-text">
            We are looking for forward-thinking partners to co-host, support, and grow the AgentVerse ecosystem. Fill out the form below to connect with us, or email us directly at <a href="mailto:team@sanixor.space" style={{ color: '#a855f7' }}>team@sanixor.space</a>.
          </p>

          <form onSubmit={handleSubmit} style={{ marginTop: '24px' }}>
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
                />
              </div>
            </div>

            <button type="submit" className="av2-submit" style={{ marginTop: '32px' }}>
              Connect via Email
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}