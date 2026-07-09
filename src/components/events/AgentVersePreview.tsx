import React from "react";

export function AgentVersePreview() {
  const openEvent = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open("/events/agentverse-2", "_blank");
  };

  return (
    <a
      href="/events/agentverse-2"
      target="_blank"
      rel="noopener noreferrer"
      className="av2-root"
      onClick={openEvent}
    >
      {/* ── Premium Inline Styles ── */}
      <style>{`
        .av2-root {
          position: relative;
          width: 100%;
          min-height: 620px;
          background: #09090b;
          background-image: radial-gradient(circle at 10% 20%, rgba(124, 58, 237, 0.08) 0%, transparent 50%),
                            radial-gradient(circle at 90% 80%, rgba(139, 92, 246, 0.06) 0%, transparent 50%);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          border: 1px solid rgba(139, 92, 246, 0.15);
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.95), 
                      inset 0 1px 1px rgba(255, 255, 255, 0.05),
                      0 0 40px rgba(124, 58, 237, 0.05);
          border-radius: clamp(16px, 3vw, 28px);
          overflow: hidden;
          padding: clamp(32px, 5vw, 72px) clamp(20px, 4vw, 80px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          color: inherit;
          cursor: pointer;
        }
        .av2-root:hover {
          border-color: rgba(139, 92, 246, 0.35);
          box-shadow: 0 50px 120px rgba(0, 0, 0, 0.98), 
                      inset 0 1px 1px rgba(255, 255, 255, 0.1),
                      0 0 60px rgba(124, 58, 237, 0.12);
        }

        /* ── Dot Grid ── */
        .av2-dot-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 32px 32px;
          opacity: 1;
          mask-image: radial-gradient(ellipse at 50% 50%, black 60%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse at 50% 50%, black 60%, transparent 100%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Soft floating particles ── */
        .av2-particle {
          position: absolute;
          border-radius: 50%;
          background: #c084fc;
          opacity: 0.12;
          filter: blur(4px);
          pointer-events: none;
          z-index: 1;
        }
        .av2-p1 { width: 120px; height: 120px; top: 15%; left: 45%; animation: av2-float-slow 20s infinite ease-in-out; }
        .av2-p2 { width: 160px; height: 160px; bottom: 10%; right: 40%; animation: av2-float-slow 28s infinite ease-in-out reverse; }
        @keyframes av2-float-slow {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); }
          50% { transform: translateY(-40px) translateX(20px) scale(1.1); }
        }

        /* ── Feature Pills Row ── */
        .av2-pills-row {
          display: flex;
          gap: 12px;
          justify-content: center;
          align-items: center;
          margin-top: 4px;
          flex-wrap: wrap;
        }
        .av2-fp {
          position: relative;
          padding: 8px 16px;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(139, 92, 246, 0.2);
          backdrop-filter: blur(12px);
          font-size: 11px;
          font-weight: 700;
          color: #e9d5ff;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .av2-fp::before {
          content: '';
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #a855f7;
        }
        .av2-fp-1 { animation: av2-pill-float 5s infinite ease-in-out; }
        .av2-fp-2 { animation: av2-pill-float 5.5s infinite ease-in-out 0.8s; }
        .av2-fp-3 { animation: av2-pill-float 6s infinite ease-in-out 1.6s; }
        @keyframes av2-pill-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        /* ── Layout Grid ── */
        .av2-body {
          position: relative;
          z-index: 3;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: clamp(40px, 6vw, 64px);
        }
        @media (min-width: 992px) {
          .av2-body {
            display: grid;
            grid-template-columns: 1.1fr 1fr;
            align-items: center;
          }
        }
        .av2-body-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .av2-body-right {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* ── Badge ── */
        .av2-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          background: rgba(34, 197, 94, 0.08);
          color: #4ade80;
          border: 1px solid rgba(34, 197, 94, 0.2);
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.05);
          margin-bottom: 24px;
        }
        .av2-status-badge::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 8px #22c55e;
          animation: av2-blink 2s ease-in-out infinite;
        }
        @keyframes av2-blink { 0%,100%{opacity:1; } 50%{opacity:.3; } }

        .av2-eyebrow {
          font-size: 13px;
          font-weight: 700;
          color: #c084fc;
          text-transform: uppercase;
          letter-spacing: .18em;
          margin-bottom: 12px;
        }
        .av2-title {
          font-size: clamp(38px, 6.5vw, 68px);
          font-weight: 800;
          line-height: 1.05;
          color: #fff;
          letter-spacing: -.03em;
          margin-bottom: 18px;
        }
        .av2-title em {
          font-style: normal;
          background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .av2-desc {
          font-size: clamp(15px, 1.8vw, 17px);
          line-height: 1.65;
          color: #a78bfa;
          margin-bottom: 28px;
          max-width: 580px;
        }

        /* ── Journey Steps ── */
        .av2-journey {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          max-width: 520px;
          margin-bottom: 12px;
        }
        .av2-j-step {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          color: #c084fc;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .av2-j-dot {
          width: 16px; height: 16px;
          border-radius: 50%;
          background: rgba(139, 92, 246, 0.2);
          border: 1px solid rgba(139, 92, 246, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          color: #c4b5fd;
        }
        .av2-j-step.av2-j-active .av2-j-dot {
          background: #a855f7;
          border-color: #c084fc;
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
          color: #fff;
        }
        .av2-j-line {
          flex: 1;
          height: 1px;
          background: rgba(139, 92, 246, 0.15);
        }

        /* ── Event Preview Panel ── */
        .av2-preview-panel {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(139, 92, 246, 0.12);
          border-radius: 20px;
          padding: 24px;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.05);
        }
        .av2-panel-title {
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #fff;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .av2-panel-title svg { width: 16px; height: 16px; color: #a855f7; }
        .av2-highlights {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .av2-high-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 13.5px;
          color: #a78bfa;
          line-height: 1.5;
        }
        .av2-high-bullet {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #a855f7;
          margin-top: 7px;
          flex-shrink: 0;
        }

        /* ── Row of Statistics ── */
        .av2-stats-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        @media (min-width: 480px) {
          .av2-stats-row {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .av2-stat-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 14px;
          padding: 14px;
          text-align: left;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .av2-stat-card:hover {
          background: rgba(139, 92, 246, 0.05);
          border-color: rgba(139, 92, 246, 0.2);
          transform: translateY(-2px);
        }
        .av2-stat-label {
          font-size: 11px;
          font-weight: 600;
          color: #a1a1aa;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }
        .av2-stat-value {
          font-size: 15px;
          font-weight: 800;
          color: #fff;
        }

        /* ── Premium CTA Card ── */
        .av2-cta-card {
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(124, 58, 237, 0.05) 100%);
          border: 1px solid rgba(168, 85, 247, 0.3);
          border-radius: 20px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .av2-cta-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.15), transparent);
          transform: skewX(-25deg);
          pointer-events: none;
        }
        .av2-cta-card:hover::before {
          animation: av2-cta-shine 1.5s ease-in-out;
        }
        @keyframes av2-cta-shine {
          100% { left: 200%; }
        }
        .av2-cta-card:hover {
          border-color: rgba(168, 85, 247, 0.6);
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.22) 0%, rgba(124, 58, 237, 0.1) 100%);
          box-shadow: 0 10px 30px rgba(139, 92, 246, 0.15);
        }
        .av2-cta-text-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .av2-cta-sub {
          font-size: 11px;
          font-weight: 700;
          color: #c084fc;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 4px;
        }
        .av2-cta-main {
          font-size: 18px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.01em;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .av2-cta-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(168, 85, 247, 0.15);
          border: 1px solid rgba(168, 85, 247, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .av2-cta-card:hover .av2-cta-icon {
          background: #a855f7;
          border-color: #c084fc;
          color: #fff;
          transform: translateX(4px);
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.4);
        }
        .av2-cta-icon svg {
          width: 20px;
          height: 20px;
        }

        /* ── Scroll Indicator ── */
        .av2-scroll-indicator {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 24px;
          opacity: 0.4;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .av2-root:hover .av2-scroll-indicator {
          opacity: 0.8;
        }
        .av2-scroll-indicator svg {
          width: 20px; height: 20px;
          color: #c4b5fd;
          animation: av2-bounce 2s infinite;
        }
        @keyframes av2-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }

      `}</style>

      {/* Background patterns and glowing nodes */}
      <div className="av2-dot-grid" />
      <div className="av2-particle av2-p1" />
      <div className="av2-particle av2-p2" />

      <div className="av2-body">
        {/* Left Column: Eyebrow, Title, Copy, Journey Steps */}
        <div className="av2-body-left">
          <div className="av2-status-badge">Registrations Open — Only 15 Seats Left</div>
          <div className="av2-eyebrow">The Ultimate AI Builder Arena</div>
          <h1 className="av2-title">
            Agent<em>Verse</em> 2.0
          </h1>
          <p className="av2-desc">
            The world is not waiting for AI to arrive. It already has. Join AgentVerse 2.0 — a
            high-stakes hacking environment for Agentic AI Swarms and MCP Servers. Build, compile,
            and battle live.
          </p>

          {/* 4-Step Journey */}
          <div className="av2-journey">
            <div className="av2-j-step av2-j-active">
              <span className="av2-j-dot">1</span> Register
            </div>
            <div className="av2-j-line" />
            <div className="av2-j-step">
              <span className="av2-j-dot">2</span> Build
            </div>
            <div className="av2-j-line" />
            <div className="av2-j-step">
              <span className="av2-j-dot">3</span> Pitch
            </div>
            <div className="av2-j-line" />
            <div className="av2-j-step">
              <span className="av2-j-dot">4</span> Win
            </div>
          </div>
        </div>

        {/* Right Column: Highlights, Stats Row, CTA Card */}
        <div className="av2-body-right">
          {/* Highlights Preview */}
          <div className="av2-preview-panel">
            <div className="av2-panel-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
              Live Telemetry Arena Highlights
            </div>
            <div className="av2-highlights">
              <div className="av2-high-item">
                <span className="av2-high-bullet" />
                <span>
                  <strong>Act I &amp; II</strong>: High-throughput swarms workshop &amp; problem
                  release.
                </span>
              </div>
              <div className="av2-high-item">
                <span className="av2-high-bullet" />
                <span>
                  <strong>Act III</strong>: Continuous live local benchmark leaderboard test
                  iterations.
                </span>
              </div>
              <div className="av2-high-item">
                <span className="av2-high-bullet" />
                <span>
                  <strong>Act IV</strong>: Evaluation run, final showcases, and internship
                  selections.
                </span>
              </div>
            </div>
          </div>

          {/* Row of statistic cards */}
          <div className="av2-stats-row">
            <div className="av2-stat-card">
              <div className="av2-stat-label">Prize Pool</div>
              <div className="av2-stat-value">$1,500</div>
            </div>
            <div className="av2-stat-card">
              <div className="av2-stat-label">Team Size</div>
              <div className="av2-stat-value">1 - 4</div>
            </div>
            <div className="av2-stat-card">
              <div className="av2-stat-label">Duration</div>
              <div className="av2-stat-value">Full-Day</div>
            </div>
            <div className="av2-stat-card">
              <div className="av2-stat-label">Internship</div>
              <div className="av2-stat-value">Paid Offer</div>
            </div>
          </div>

          {/* Premium CTA Card */}
          <div className="av2-cta-card">
            <div className="av2-cta-text-wrap">
              <span className="av2-cta-sub">Experience the Arena</span>
              <span className="av2-cta-main">Enter AgentVerse 2.0</span>
            </div>
            <div className="av2-cta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* In-line feature pills right below the CTA card */}
          <div className="av2-pills-row">
            <span className="av2-fp av2-fp-1">AI Swarms</span>
            <span className="av2-fp av2-fp-2">MCP Servers</span>
            <span className="av2-fp av2-fp-3">Internship Offer</span>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="av2-scroll-indicator">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="7 13 12 18 17 13" />
          <polyline points="7 6 12 11 17 6" />
        </svg>
      </div>
    </a>
  );
}
