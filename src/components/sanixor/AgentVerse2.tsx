import { useState } from "react";

export function AgentVerse2() {
  const [showDetails, setShowDetails] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    college: "",
    lead: "",
    email: "",
    phone: "",
    size: "5",
    experience: "beginner",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setShowRegister(false);
      setSubmitted(false);
      setForm({ college: "", lead: "", email: "", phone: "", size: "5", experience: "beginner", notes: "" });
    }, 3000);
  };

  const closeRegister = () => {
    setShowRegister(false);
    setSubmitted(false);
  };

  return (
    <>
      <style>{`
        .av2-root {
          position: relative;
          width: 100%;
          min-height: 560px;
          background: linear-gradient(135deg, #0d0b1e 0%, #150f30 50%, #0d0b1e 100%);
          border-radius: clamp(16px, 3vw, 24px);
          overflow: hidden;
          padding: clamp(32px, 5vw, 52px) clamp(28px, 5vw, 52px) clamp(28px, 4vw, 44px);
          display: flex;
          align-items: center;
        }
        .av2-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(139,92,246,.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,.055) 1px, transparent 1px);
          background-size: 44px 44px;
          pointer-events: none;
          z-index: 0;
        }
        .av2-glow1 {
          position: absolute;
          top: -100px; left: -80px;
          width: 420px; height: 420px;
          background: radial-gradient(circle, rgba(124,58,237,.2) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .av2-glow2 {
          position: absolute;
          bottom: -80px; right: -60px;
          width: 340px; height: 340px;
          background: radial-gradient(circle, rgba(245,197,66,.09) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .av2-wm {
          position: absolute;
          top: 20px; right: 32px;
          font-size: clamp(72px, 14vw, 128px);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -4px;
          background: linear-gradient(180deg, rgba(139,92,246,.32) 0%, rgba(139,92,246,.07) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          user-select: none;
          pointer-events: none;
          z-index: 0;
        }
        .av2-body {
          position: relative;
          z-index: 2;
          max-width: 600px;
          width: 100%;
        }
        .av2-badges {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 22px;
          opacity: 0;
          animation: av2-up .5s .1s ease forwards;
        }
        .av2-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          border-radius: 100px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .1em;
          text-transform: uppercase;
        }
        .av2-badge-gold {
          background: rgba(245,197,66,.12);
          color: #f5c542;
          border: 1px solid rgba(245,197,66,.26);
        }
        .av2-badge-gold::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #f5c542;
          animation: av2-blink 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes av2-blink { 0%,100%{opacity:1} 50%{opacity:.35} }
        .av2-badge-purple {
          background: rgba(139,92,246,.12);
          color: #a78bfa;
          border: 1px solid rgba(139,92,246,.2);
        }
        .av2-eyebrow {
          font-size: 10px;
          font-weight: 600;
          color: #c084fc;
          text-transform: uppercase;
          letter-spacing: .14em;
          margin-bottom: 8px;
          opacity: 0;
          animation: av2-up .5s .18s ease forwards;
        }
        .av2-divider {
          width: 48px; height: 2px;
          background: linear-gradient(90deg, #7c3aed, transparent);
          border-radius: 2px;
          margin-bottom: 14px;
          opacity: 0;
          animation: av2-up .5s .22s ease forwards;
        }
        .av2-title {
          font-size: clamp(32px, 6vw, 54px);
          font-weight: 800;
          line-height: 1.08;
          color: #f0ecff;
          letter-spacing: -.025em;
          margin-bottom: 14px;
          opacity: 0;
          animation: av2-up .5s .26s ease forwards;
        }
        .av2-title em {
          font-style: normal;
          background: linear-gradient(120deg, #f5c542 0%, #fde68a 50%, #f5c542 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .av2-desc {
          font-size: clamp(12px, 1.8vw, 14px);
          line-height: 1.8;
          color: #b8b0d8;
          margin-bottom: 28px;
          max-width: 480px;
          opacity: 0;
          animation: av2-up .5s .32s ease forwards;
        }
        .av2-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 24px;
          opacity: 0;
          animation: av2-up .5s .38s ease forwards;
        }
        .av2-feat {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 14px;
          background: rgba(139,92,246,.07);
          border: 1px solid rgba(139,92,246,.13);
          border-radius: 12px;
          font-size: clamp(10px, 1.5vw, 12px);
          color: #d0c8f0;
          transition: all .25s cubic-bezier(.22,1,.36,1);
          cursor: default;
        }
        .av2-feat:hover {
          background: rgba(139,92,246,.14);
          border-color: rgba(139,92,246,.26);
          transform: translateY(-2px);
        }
        .av2-feat-ico {
          width: 26px; height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(139,92,246,.18);
          border-radius: 8px;
          flex-shrink: 0;
          color: #a78bfa;
        }
        .av2-feat-ico svg {
          width: 14px; height: 14px;
        }
        .av2-callout {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 18px;
          background: linear-gradient(135deg, rgba(139,92,246,.1) 0%, rgba(245,197,66,.05) 100%);
          border: 1px solid rgba(139,92,246,.16);
          border-radius: 14px;
          margin-bottom: 28px;
          opacity: 0;
          animation: av2-up .5s .44s ease forwards;
        }
        .av2-callout-ico {
          width: 40px; height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, #7c3aed, #5b21b6);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .av2-callout-ico svg { width: 20px; height: 20px; color: white; }
        .av2-callout-title {
          font-size: 13px;
          font-weight: 700;
          color: #f0ecff;
          margin-bottom: 3px;
        }
        .av2-callout-sub {
          font-size: 11px;
          color: #b8b0d8;
          line-height: 1.5;
        }
        .av2-actions {
          display: flex;
          gap: 12px;
          opacity: 0;
          animation: av2-up .5s .5s ease forwards;
        }
        .av2-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: clamp(11px, 2vw, 14px) clamp(14px, 2.5vw, 22px);
          border-radius: 12px;
          font-size: clamp(10px, 1.5vw, 12px);
          font-weight: 600;
          letter-spacing: .06em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: all .3s cubic-bezier(.22,1,.36,1);
          position: relative;
          overflow: hidden;
          text-decoration: none;
        }
        .av2-btn svg { width: 15px; height: 15px; flex-shrink: 0; }
        .av2-btn-primary {
          background: linear-gradient(135deg, #7c3aed 0%, #9333ea 100%);
          color: white;
          box-shadow: 0 8px 28px rgba(124,58,237,.38);
        }
        .av2-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 44px rgba(124,58,237,.55);
        }
        .av2-btn-primary:active { transform: translateY(0); }
        .av2-btn-outline {
          background: rgba(139,92,246,.08);
          color: #a78bfa;
          border: 1.5px solid rgba(139,92,246,.22);
        }
        .av2-btn-outline:hover {
          background: rgba(139,92,246,.16);
          border-color: rgba(139,92,246,.38);
          transform: translateY(-2px);
        }
        .av2-ribbon {
          margin-top: 20px;
          font-size: 10px;
          color: #5a527a;
          letter-spacing: .05em;
          text-align: right;
          opacity: 0;
          animation: av2-up .5s .62s ease forwards;
        }
        .av2-ribbon span { color: #c9a227; }
        @keyframes av2-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── MODAL ── */
        .av2-overlay {
          position: fixed;
          inset: 0;
          background: rgba(5,4,18,.78);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: av2-fadeIn .25s ease;
        }
        @keyframes av2-fadeIn { from{opacity:0} to{opacity:1} }
        .av2-modal {
          background: linear-gradient(150deg, #1a1630 0%, #110e26 100%);
          border: 1px solid rgba(139,92,246,.18);
          border-radius: 20px;
          width: 100%;
          max-width: 560px;
          max-height: 88vh;
          overflow-y: auto;
          box-shadow: 0 24px 80px rgba(0,0,0,.6), 0 0 0 1px rgba(139,92,246,.07);
          animation: av2-modalIn .35s cubic-bezier(.22,1,.36,1);
        }
        @keyframes av2-modalIn {
          from { opacity:0; transform: scale(.96) translateY(16px); }
          to   { opacity:1; transform: scale(1) translateY(0); }
        }
        .av2-modal-head {
          padding: 26px 30px 22px;
          border-bottom: 1px solid rgba(139,92,246,.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .av2-modal-head h2 {
          font-size: 20px;
          font-weight: 700;
          color: #f0ecff;
          margin: 0;
        }
        .av2-modal-close {
          width: 32px; height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(139,92,246,.1);
          border: 1px solid rgba(139,92,246,.18);
          border-radius: 8px;
          color: #a78bfa;
          cursor: pointer;
          transition: all .2s;
          padding: 0;
        }
        .av2-modal-close svg { width: 16px; height: 16px; }
        .av2-modal-close:hover {
          background: rgba(139,92,246,.2);
          transform: rotate(90deg);
        }
        .av2-modal-body { padding: 26px 30px 30px; }
        .av2-sec-label {
          display: block;
          font-size: 10px;
          font-weight: 700;
          color: #9d7fd8;
          text-transform: uppercase;
          letter-spacing: .12em;
          margin-bottom: 10px;
        }
        .av2-sec-text {
          font-size: 13px;
          line-height: 1.8;
          color: #b8b0d8;
          margin-bottom: 22px;
        }
        .av2-detail-row {
          display: flex;
          gap: 12px;
          margin-bottom: 14px;
          align-items: flex-start;
        }
        .av2-detail-ico {
          width: 34px; height: 34px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(139,92,246,.15);
          border-radius: 9px;
          color: #a78bfa;
          transition: all .25s cubic-bezier(.22,1,.36,1);
        }
        .av2-detail-row:hover .av2-detail-ico {
          background: rgba(139,92,246,.25);
          transform: translateY(-2px);
        }
        .av2-detail-ico svg { width: 17px; height: 17px; }
        .av2-detail-label {
          display: block;
          font-size: 10px;
          font-weight: 600;
          color: #9d7fd8;
          text-transform: uppercase;
          letter-spacing: .08em;
          margin-bottom: 3px;
        }
        .av2-detail-text { font-size: 13px; color: #e0daf5; line-height: 1.5; }

        /* form */
        .av2-fg { margin-bottom: 16px; }
        .av2-frow { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .av2-label {
          display: block;
          font-size: 10px;
          font-weight: 600;
          color: #9d7fd8;
          text-transform: uppercase;
          letter-spacing: .08em;
          margin-bottom: 7px;
        }
        .av2-input, .av2-select, .av2-textarea {
          width: 100%;
          padding: 10px 13px;
          background: rgba(139,92,246,.07);
          border: 1.5px solid rgba(139,92,246,.14);
          border-radius: 9px;
          font-size: 13px;
          color: #e0daf5;
          transition: all .2s;
          appearance: none;
          outline: none;
          font-family: inherit;
        }
        .av2-input::placeholder, .av2-textarea::placeholder { color: rgba(184,176,216,.45); }
        .av2-input:hover, .av2-select:hover, .av2-textarea:hover {
          border-color: rgba(139,92,246,.26);
          background: rgba(139,92,246,.1);
        }
        .av2-input:focus, .av2-select:focus, .av2-textarea:focus {
          border-color: rgba(139,92,246,.5);
          background: rgba(139,92,246,.13);
          box-shadow: 0 0 0 4px rgba(139,92,246,.1);
        }
        .av2-select option { background: #1a1630; }
        .av2-textarea { resize: vertical; min-height: 90px; }
        .av2-submit {
          width: 100%;
          margin-top: 20px;
          padding: 13px;
          background: linear-gradient(135deg, #7c3aed, #9333ea);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: .06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all .3s cubic-bezier(.22,1,.36,1);
          box-shadow: 0 8px 24px rgba(124,58,237,.35);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: inherit;
        }
        .av2-submit svg { width: 15px; height: 15px; }
        .av2-submit:hover { transform: translateY(-2px); box-shadow: 0 16px 36px rgba(124,58,237,.5); }
        .av2-submit:active { transform: translateY(0); }
        .av2-success { text-align: center; padding: 36px 20px; }
        .av2-success-ico {
          width: 60px; height: 60px;
          background: rgba(34,197,94,.12);
          border: 2px solid rgba(34,197,94,.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          color: #22c55e;
          animation: av2-successPop .5s cubic-bezier(.22,1,.36,1);
        }
        @keyframes av2-successPop {
          from { transform: scale(.7); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        .av2-success-ico svg { width: 28px; height: 28px; }
        .av2-success-title { font-size: 18px; font-weight: 700; color: #f0ecff; margin-bottom: 8px; }
        .av2-success-sub { font-size: 13px; color: #b8b0d8; }

        @media (max-width: 480px) {
          .av2-features { grid-template-columns: 1fr; }
          .av2-actions { flex-direction: column; }
          .av2-frow { grid-template-columns: 1fr; }
          .av2-callout { flex-direction: column; text-align: center; gap: 10px; }
        }
        @media (max-width: 360px) {
          .av2-root { padding: 24px 18px 20px; }
          .av2-title { font-size: 28px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <div className="av2-root">
        <div className="av2-grid" />
        <div className="av2-glow1" />
        <div className="av2-glow2" />
        <div className="av2-wm">2.0</div>

        <div className="av2-body">
          <div className="av2-badges">
            <span className="av2-badge av2-badge-gold">Open Registration</span>
            <span className="av2-badge av2-badge-purple">Season Two</span>
          </div>

          <div className="av2-eyebrow">India's only agent-exclusive AI event</div>
          <div className="av2-divider" />

          <div className="av2-title">
            Agent<em>Verse</em> 2.0
          </div>

          <p className="av2-desc">
            A revolutionary competition where students collaborate, compete, and build
            autonomous AI agents that solve real-world problems — backed by institutional partnerships.
          </p>

          <div className="av2-features">
            {[
              { label: "Agent-Based Only", icon: <path d="M13 10V3L4 14h7v7l9-11h-7z" /> },
              { label: "College Collaboration", icon: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></> },
              { label: "Open to All", icon: <><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></> },
              { label: "Institutional Partners", icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></> },
            ].map(({ label, icon }) => (
              <div className="av2-feat" key={label}>
                <div className="av2-feat-ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {icon}
                  </svg>
                </div>
                {label}
              </div>
            ))}
          </div>

          <div className="av2-callout">
            <div className="av2-callout-ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="8" width="20" height="8" rx="2"/>
                <path d="M6 20v-4M18 20v-4M8 12h.01M16 12h.01M12 8V4H8"/>
              </svg>
            </div>
            <div>
              <div className="av2-callout-title">Agents Only — No Traditional Hackathon Categories</div>
              <div className="av2-callout-sub">Build autonomous agents that solve real-world problems at scale</div>
            </div>
          </div>

          <div className="av2-actions">
            <button className="av2-btn av2-btn-primary" onClick={() => setShowRegister(true)}>
              Register Your College
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button className="av2-btn av2-btn-outline" onClick={() => setShowDetails(true)}>
              View Details
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 16 16 12 12 8"/><line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
            </button>
          </div>

          <div className="av2-ribbon">Season Two · <span>Coming Soon</span></div>
        </div>
      </div>

      {/* ── DETAILS MODAL ── */}
      {showDetails && (
        <div className="av2-overlay" onClick={() => setShowDetails(false)}>
          <div className="av2-modal" onClick={(e) => e.stopPropagation()}>
            <div className="av2-modal-head">
              <h2>Event Details</h2>
              <button className="av2-modal-close" onClick={() => setShowDetails(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="av2-modal-body">
              <span className="av2-sec-label">About AgentVerse 2.0</span>
              <p className="av2-sec-text">
                India's premier competition dedicated exclusively to autonomous AI agents. Unlike traditional
                hackathons, this event focuses on building intelligent agents that make decisions, learn, and
                solve complex real-world problems independently.
              </p>

              <span className="av2-sec-label">Key Features</span>
              {[
                {
                  label: "Advanced AI Models",
                  text: "Access to cutting-edge LLMs and agent frameworks including OpenAI, Anthropic, and open-source models.",
                  icon: <><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></>,
                },
                {
                  label: "Institutional Partnerships",
                  text: "Collaborate with partner organizations to tackle real industry challenges and gain mentorship.",
                  icon: <><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2z"/></>,
                },
                {
                  label: "Timeline",
                  text: "Registration open now. 8-week competition with weekly checkpoints and a grand final showcase.",
                  icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
                },
              ].map(({ label, text, icon }) => (
                <div className="av2-detail-row" key={label}>
                  <div className="av2-detail-ico">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
                  </div>
                  <div>
                    <span className="av2-detail-label">{label}</span>
                    <div className="av2-detail-text">{text}</div>
                  </div>
                </div>
              ))}

              <span className="av2-sec-label" style={{ marginTop: 20, display: "block" }}>Eligibility</span>
              <p className="av2-sec-text">
                Open to all undergrad and grad students across Indian institutions. Teams of 3–6 members.
                AI/ML fundamentals recommended but not required.
              </p>

              <span className="av2-sec-label">Prizes & Recognition</span>
              <p className="av2-sec-text" style={{ marginBottom: 0 }}>
                Cash prizes, internship opportunities with partner companies, industry networking, and
                AgentVerse Hall of Fame placement. All teams receive completion certificates.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── REGISTER MODAL ── */}
      {showRegister && (
        <div className="av2-overlay" onClick={closeRegister}>
          <div className="av2-modal" onClick={(e) => e.stopPropagation()}>
            <div className="av2-modal-head">
              <h2>{submitted ? "Registration Complete" : "Register Your College"}</h2>
              {!submitted && (
                <button className="av2-modal-close" onClick={closeRegister}>
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
                    Thank you for registering {form.college || "your college"}. We'll send confirmation to{" "}
                    {form.email || "your email"}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="av2-fg">
                    <label className="av2-label">College / Institution Name *</label>
                    <input className="av2-input" name="college" value={form.college} onChange={handleChange} placeholder="E.g., GLA University" required />
                  </div>
                  <div className="av2-frow">
                    <div className="av2-fg">
                      <label className="av2-label">Team Lead Name *</label>
                      <input className="av2-input" name="lead" value={form.lead} onChange={handleChange} placeholder="Full name" required />
                    </div>
                    <div className="av2-fg">
                      <label className="av2-label">Contact Email *</label>
                      <input className="av2-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" required />
                    </div>
                  </div>
                  <div className="av2-frow">
                    <div className="av2-fg">
                      <label className="av2-label">Contact Phone *</label>
                      <input className="av2-input" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" required />
                    </div>
                    <div className="av2-fg">
                      <label className="av2-label">Team Size *</label>
                      <select className="av2-select" name="size" value={form.size} onChange={handleChange}>
                        <option value="3">3 members</option>
                        <option value="4">4 members</option>
                        <option value="5">5 members</option>
                        <option value="6">6 members</option>
                      </select>
                    </div>
                  </div>
                  <div className="av2-fg">
                    <label className="av2-label">Experience Level *</label>
                    <select className="av2-select" name="experience" value={form.experience} onChange={handleChange}>
                      <option value="beginner">Beginner — Learning AI/ML basics</option>
                      <option value="intermediate">Intermediate — Some AI/ML experience</option>
                      <option value="advanced">Advanced — Built ML models before</option>
                      <option value="expert">Expert — Multiple project experience</option>
                    </select>
                  </div>
                  <div className="av2-fg">
                    <label className="av2-label">Additional Notes</label>
                    <textarea className="av2-textarea" name="notes" value={form.notes} onChange={handleChange} placeholder="Tell us about your team's interests or special requirements..." />
                  </div>
                  <button type="submit" className="av2-submit">
                    Complete Registration
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AgentVerse2;