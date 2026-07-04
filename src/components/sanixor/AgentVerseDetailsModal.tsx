import React from "react";

interface Props {
  onClose: () => void;
}

export function AgentVerseDetailsModal({ onClose }: Props) {
  return (
    <div 
      className="av2-overlay" 
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div className="av2-modal" onClick={(e) => e.stopPropagation()} data-lenis-prevent="true">
        <div className="av2-modal-head">
          <h2>Event Details</h2>
          <button className="av2-modal-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div className="av2-modal-body" style={{ overflowY: 'auto', maxHeight: 'calc(85vh - 80px)' }}>
          <span className="av2-sec-label">A New Chapter Begins</span>
          <p className="av2-sec-text">
            AgentVerse 1.0 lit a spark with 50+ builders. Now we are taking it to the next level. A purely online, high-stakes arena. 
            With real pressure. Real competition. And a real problem that needs a real solution. 
            Forget single-model AI. We are building ecosystems of specialized intelligent agents (Swarms) and MCP Servers.
          </p>

          <span className="av2-sec-label">The Format: Four Acts. One Unforgettable Day.</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {[
              {
                label: "Act I — The Workshop",
                text: "Learn from the people who build this for a living. Deep, no-nonsense online workshop on Agentic AI.",
                icon: <><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></>,
              },
              {
                label: "Act II & III — The Problem",
                text: "A real-world problem is placed in front of you. No hints. No templates. Just your thinking, tools, and execution.",
                icon: <><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2z"/></>,
              },
              {
                label: "Act IV — The Showcase",
                text: "Step up, present your solution to a panel of judges, articulate your thinking, and defend your decisions.",
                icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
              },
            ].map(({ label, text, icon }) => (
              <div className="av2-detail-row" key={label} style={{ margin: 0, height: '100%' }}>
                <div className="av2-detail-ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
                </div>
                <div>
                  <span className="av2-detail-label" style={{ color: '#fff' }}>{label}</span>
                  <div className="av2-detail-text">{text}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 200px' }}>
              <span className="av2-sec-label">Who Belongs In This Arena</span>
              <p className="av2-sec-text">
                Students who want something real in their portfolio. Developers evolving from code to intelligence. 
                Professionals refusing to be left behind.
              </p>
            </div>
            
            <div style={{ flex: '1 1 200px' }}>
              <span className="av2-sec-label">What You Walk Away With</span>
              <p className="av2-sec-text">
                A working intelligent system you built yourself. Top 3 performers take home exclusive prizes. 
                <span style={{ color: '#c4b5fd', fontWeight: 600 }}> One outstanding builder secures an internship.</span>
              </p>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
