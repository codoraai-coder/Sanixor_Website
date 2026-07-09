import { useEffect, useRef, type ReactNode } from "react";

/* ── SVG icon defaults for each step position ── */
const defaultIcons: ReactNode[] = [
  /* 1 – Register / clipboard */
  <>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M12 11h4M12 16h4M8 11h.01M8 16h.01" />
  </>,
  /* 2 – Confirmation / mail-check */
  <>
    <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    <path d="m16 19 2 2 4-4" />
  </>,
  /* 3 – Participate / users */
  <>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </>,
  /* 4 – Win & Grow / trophy */
  <>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </>,
];

export interface TimelineStep {
  step: number;
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface RegistrationTimelineProps {
  steps: TimelineStep[];
  sectionId?: string;
}

export function RegistrationTimeline({ steps, sectionId = "timeline" }: RegistrationTimelineProps) {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const els = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("av2-tl-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );

    els.forEach((el) => observer.observe(el));
    return () => els.forEach((el) => observer.unobserve(el));
  }, [steps]);

  return (
    <>
      <style>{`
        /* ── Registration Timeline ── */
        .av2-tl-section {
          padding: clamp(40px, 6vw, 80px) 0;
        }
        .av2-tl-header {
          text-align: center;
          margin-bottom: clamp(40px, 5vw, 64px);
        }
        .av2-tl-eyebrow {
          font-size: 13px;
          font-weight: 700;
          color: #c084fc;
          text-transform: uppercase;
          letter-spacing: .15em;
          margin-bottom: 12px;
        }
        .av2-tl-heading {
          font-size: clamp(28px, 5vw, 44px);
          font-weight: 800;
          color: #fff;
          letter-spacing: -.02em;
          line-height: 1.15;
        }
        .av2-tl-heading em {
          font-style: normal;
          background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Track (horizontal on desktop, vertical on mobile) ── */
        .av2-tl-track {
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
        }
        @media (min-width: 768px) {
          .av2-tl-track {
            flex-direction: row;
            align-items: flex-start;
          }
        }

        /* ── Individual step wrapper ── */
        .av2-tl-step {
          flex: 1;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 20px;
          position: relative;
          padding-left: 32px;
          padding-bottom: 40px;
        }
        @media (min-width: 768px) {
          .av2-tl-step {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding-left: 0;
            padding-bottom: 0;
            gap: 0;
          }
        }

        /* ── Vertical connector line (mobile) ── */
        .av2-tl-step::before {
          content: '';
          position: absolute;
          left: 11px;
          top: 36px;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, rgba(139, 92, 246, 0.5), rgba(139, 92, 246, 0.05));
        }
        .av2-tl-step:last-child::before {
          display: none;
        }
        @media (min-width: 768px) {
          .av2-tl-step::before {
            display: none;
          }
        }

        /* ── Node (circle on the line) ── */
        .av2-tl-node {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border: 3px solid #09090b;
          box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.4), 0 0 16px rgba(139, 92, 246, 0.3);
          flex-shrink: 0;
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .av2-tl-node-num {
          font-size: 10px;
          font-weight: 800;
          color: #fff;
          line-height: 1;
        }
        @media (min-width: 768px) {
          .av2-tl-node {
            margin-bottom: 20px;
          }
        }

        /* ── Horizontal connector (desktop only) ── */
        .av2-tl-connector {
          display: none;
        }
        @media (min-width: 768px) {
          .av2-tl-connector {
            display: block;
            position: absolute;
            top: 12px;
            left: calc(50% + 16px);
            right: calc(-50% + 16px);
            height: 2px;
            background: linear-gradient(90deg, rgba(139, 92, 246, 0.5), rgba(139, 92, 246, 0.1));
            z-index: 1;
          }
          .av2-tl-connector::after {
            content: '';
            position: absolute;
            top: -2px;
            left: 0;
            width: 30%;
            height: 6px;
            background: linear-gradient(90deg, #a855f7, transparent);
            border-radius: 3px;
            animation: av2-tl-flow 2.5s ease-in-out infinite;
          }
          @keyframes av2-tl-flow {
            0% { left: -10%; opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { left: 110%; opacity: 0; }
          }
          .av2-tl-step:last-child .av2-tl-connector {
            display: none;
          }
        }

        /* ── Card ── */
        .av2-tl-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(139, 92, 246, 0.12);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 18px;
          padding: 24px;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.06), 0 8px 32px rgba(0, 0, 0, 0.3);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          /* scroll reveal initial state */
          opacity: 0;
          transform: translateY(30px);
        }
        .av2-tl-card.av2-tl-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .av2-tl-card:hover {
          border-color: rgba(139, 92, 246, 0.35);
          transform: translateY(-4px);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 12px 40px rgba(139, 92, 246, 0.2);
        }
        .av2-tl-visible.av2-tl-card:hover {
          transform: translateY(-4px);
        }
        @media (min-width: 768px) {
          .av2-tl-card {
            margin: 0 8px;
            padding: 28px 20px;
          }
        }

        /* ── Card icon ── */
        .av2-tl-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.05));
          border: 1px solid rgba(139, 92, 246, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c4b5fd;
          margin-bottom: 16px;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          flex-shrink: 0;
        }
        .av2-tl-card:hover .av2-tl-icon {
          background: linear-gradient(135deg, #7c3aed, #5b21b6);
          color: #fff;
          border-color: #a78bfa;
          box-shadow: 0 0 20px rgba(124, 58, 237, 0.4);
          transform: scale(1.08) rotate(5deg);
        }
        .av2-tl-icon svg {
          width: 22px;
          height: 22px;
        }

        /* ── Card text ── */
        .av2-tl-title {
          font-size: 17px;
          font-weight: 700;
          color: #f0ecff;
          margin-bottom: 8px;
          letter-spacing: 0.01em;
        }
        .av2-tl-desc {
          font-size: 14px;
          color: #a78bfa;
          line-height: 1.6;
        }

        /* ── Stagger delays for scroll reveal ── */
        .av2-tl-step:nth-child(1) .av2-tl-card { transition-delay: 0ms; }
        .av2-tl-step:nth-child(2) .av2-tl-card { transition-delay: 120ms; }
        .av2-tl-step:nth-child(3) .av2-tl-card { transition-delay: 240ms; }
        .av2-tl-step:nth-child(4) .av2-tl-card { transition-delay: 360ms; }

        /* ── Mobile tweaks ── */
        @media (max-width: 480px) {
          .av2-tl-card { padding: 18px 16px; }
          .av2-tl-icon { width: 40px; height: 40px; border-radius: 12px; }
          .av2-tl-icon svg { width: 18px; height: 18px; }
          .av2-tl-title { font-size: 15px; }
          .av2-tl-desc { font-size: 13px; }
        }
      `}</style>

      <section id={sectionId} className="av2-tl-section">
        <div className="av2-tl-header">
          <div className="av2-tl-eyebrow">How It Works</div>
          <h2 className="av2-tl-heading">
            Your Path to <em>AgentVerse</em>
          </h2>
        </div>

        <div className="av2-tl-track">
          {steps.map((s, i) => (
            <div className="av2-tl-step" key={s.step}>
              {/* Desktop horizontal connector */}
              <div className="av2-tl-connector" style={{ animationDelay: `${i * 0.4}s` }} />

              {/* Node on line */}
              <div className="av2-tl-node">
                <span className="av2-tl-node-num">{s.step}</span>
              </div>

              {/* Glass card */}
              <div
                className="av2-tl-card"
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
              >
                <div className="av2-tl-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {s.icon || defaultIcons[i] || defaultIcons[0]}
                  </svg>
                </div>
                <div className="av2-tl-title">{s.title}</div>
                <div className="av2-tl-desc">{s.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
