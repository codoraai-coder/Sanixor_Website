import { useState, useEffect, useCallback, type RefObject } from "react";

export interface StickyCTAProps {
  label: string;
  statusBadge?: string;
  onClick: () => void;
  heroRef: RefObject<HTMLElement | null>;
  footerRef: RefObject<HTMLElement | null>;
}

export function StickyCTA({ label, statusBadge, onClick, heroRef, footerRef }: StickyCTAProps) {
  const [visible, setVisible] = useState(false);

  const checkVisibility = useCallback(() => {
    const heroEl = heroRef.current;
    const footerEl = footerRef.current;
    if (!heroEl) return;

    const heroBottom = heroEl.getBoundingClientRect().bottom;
    const pastHero = heroBottom < 0;

    let nearFooter = false;
    if (footerEl) {
      const footerTop = footerEl.getBoundingClientRect().top;
      nearFooter = footerTop < window.innerHeight + 20;
    }

    setVisible(pastHero && !nearFooter);
  }, [heroRef, footerRef]);

  useEffect(() => {
    checkVisibility();
    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, [checkVisibility]);

  return (
    <>
      <style>{`
        /* ── Sticky CTA ── */
        .av2-sticky-wrap {
          position: fixed;
          z-index: 900;
          transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Desktop: bottom-right */
        @media (min-width: 769px) {
          .av2-sticky-wrap {
            bottom: 104px; /* Stacks above the standard scroll-to-top button */
            right: 32px;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .av2-sticky-wrap.av2-sticky-hidden {
            transform: translateX(calc(100% + 40px));
            opacity: 0;
            pointer-events: none;
          }
          .av2-sticky-wrap.av2-sticky-visible {
            transform: translateX(0);
            opacity: 1;
          }
        }

        /* Mobile: full-width bottom bar */
        @media (max-width: 768px) {
          .av2-sticky-wrap {
            bottom: 0;
            left: 0;
            right: 0;
            padding: 12px 16px;
            background: rgba(9, 9, 11, 0.92);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-top: 1px solid rgba(139, 92, 246, 0.15);
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .av2-sticky-wrap.av2-sticky-hidden {
            transform: translateY(100%);
            opacity: 0;
            pointer-events: none;
          }
          .av2-sticky-wrap.av2-sticky-visible {
            transform: translateY(0);
            opacity: 1;
          }
        }

        /* ── Badge ── */
        .av2-sticky-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          background: rgba(245, 197, 66, 0.08);
          color: #f5c542;
          border: 1px solid rgba(245, 197, 66, 0.2);
          backdrop-filter: blur(8px);
          white-space: nowrap;
        }
        .av2-sticky-badge::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #f5c542;
          box-shadow: 0 0 8px #f5c542;
          animation: av2-sticky-blink 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes av2-sticky-blink {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px #f5c542; }
          50% { opacity: 0.4; box-shadow: 0 0 2px #f5c542; }
        }

        /* ── Button ── */
        .av2-sticky-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%);
          color: white;
          box-shadow: 0 4px 18px rgba(124, 58, 237, 0.45);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          white-space: nowrap;
          animation: av2-sticky-pulse 3s ease-in-out infinite;
          font-family: inherit;
        }
        @keyframes av2-sticky-pulse {
          0%, 100% { box-shadow: 0 4px 18px rgba(124, 58, 237, 0.45); }
          50% { box-shadow: 0 4px 28px rgba(124, 58, 237, 0.7), 0 0 40px rgba(168, 85, 247, 0.2); }
        }
        .av2-sticky-btn::after {
          content: "";
          position: absolute;
          top: 0;
          left: -60%;
          width: 40%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.35), transparent);
          transform: skewX(-20deg);
          pointer-events: none;
          animation: av2-sticky-shine 3.5s ease-in-out infinite;
        }
        @keyframes av2-sticky-shine {
          0% { left: -60%; }
          55%, 100% { left: 130%; }
        }
        .av2-sticky-btn:hover {
          transform: translateY(-3px);
          background: linear-gradient(135deg, #b062fa 0%, #8b5cf6 100%);
          box-shadow: 0 10px 30px rgba(124, 58, 237, 0.65);
        }
        .av2-sticky-btn:active {
          transform: translateY(0);
        }
        .av2-sticky-btn svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          transition: transform 0.3s;
        }
        .av2-sticky-btn:hover svg {
          transform: translateX(3px);
        }

        /* Mobile: button fills remaining space */
        @media (max-width: 768px) {
          .av2-sticky-btn {
            flex: 1;
            padding: 12px 20px;
            font-size: 13px;
          }
        }
      `}</style>

      <div
        className={`av2-sticky-wrap ${visible ? "av2-sticky-visible" : "av2-sticky-hidden"}`}
      >
        {statusBadge && <span className="av2-sticky-badge">{statusBadge}</span>}
        <button className="av2-sticky-btn" onClick={onClick}>
          {label}
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
        </button>
      </div>
    </>
  );
}
