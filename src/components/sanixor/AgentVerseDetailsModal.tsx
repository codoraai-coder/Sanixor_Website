import React from "react";

interface Props {
  onClose: () => void;
}

export function AgentVerseDetailsModal({ onClose }: Props) {
  return (
    <div className="av2-overlay" onClick={onClose}>
      <div className="av2-modal" onClick={(e) => e.stopPropagation()}>
        <div className="av2-modal-head">
          <h2>Event Details</h2>
          <button className="av2-modal-close" onClick={onClose}>
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
  );
}
