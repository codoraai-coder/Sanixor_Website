import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Instagram, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";



export function Footer() {
  // State tracking which original columns have been clicked/triggered to reveal smoothly
  const [revealedCols, setRevealedCols] = useState<{ [key: number]: boolean }>({
    1: true,
    2: true,
    3: true,
    4: true,
  });

  const toggleColumnReveal = (id: number) => {
    setRevealedCols((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <style>{`
        .sx-footer {
          position: relative;
          z-index: 1;
          width: 100%;
          background: linear-gradient(178deg, color-mix(in srgb, var(--card) 95%, transparent) 0%, color-mix(in srgb, var(--background) 99%, transparent) 100%);
          border-top: 1px solid color-mix(in srgb, var(--primary) 15%, transparent);
          padding: clamp(36px, 6vw, 72px) clamp(20px, 5vw, 64px) clamp(20px, 3vw, 36px);
          overflow: hidden;
        }
        .sx-footer::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #7c3aed 30%, #f5c542 70%, transparent 100%);
          opacity: 0.4;
        }
        .sx-footer::after {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: clamp(200px, 25vw, 400px);
          height: clamp(200px, 25vw, 400px);
          background: conic-gradient(from 200deg at 100% 0%, rgba(124, 58, 237, 0.06), transparent 25%);
          pointer-events: none;
        }
        .sx-footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }
        .sx-footer-top {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          justify-content: space-between;
          gap: clamp(40px, 6vw, 80px);
          margin-bottom: clamp(28px, 5vw, 56px);
        }
        .sx-brand { 
          flex: 1; 
          min-width: 280px; 
          padding-right: clamp(20px, 4vw, 60px);
        }
        .sx-brand-name {
          font-family: 'Syne', sans-serif;
          font-size: clamp(20px, 3vw, 28px);
          font-weight: 800;
          color: var(--foreground);
          letter-spacing: -0.02em;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .sx-brand-dot {
          width: clamp(6px, 0.8vw, 8px);
          height: clamp(6px, 0.8vw, 8px);
          border-radius: 50%;
          background: #f5c542;
          flex-shrink: 0;
          animation: sxBlink 2.5s ease-in-out infinite;
        }
        @keyframes sxBlink {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(245,197,66,0.35); }
          50%      { opacity: 0.5; box-shadow: 0 0 0 5px rgba(245,197,66,0); }
        }
        .sx-brand-tagline {
          font-family: 'DM Mono', monospace;
          font-size: clamp(12px, 1.5vw, 14px);
          line-height: 1.6;
          color: #857fa3;
          margin-bottom: clamp(12px, 2vw, 20px);
        }
        .sx-brand-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Inter', sans-serif;
          font-size: clamp(14px, 1.5vw, 16px);
          font-weight: 500;
          color: #a78bfa;
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: color 0.25s ease;
        }
        .sx-brand-link:hover { color: #f5c542; }
        .sx-brand-link svg {
          width: clamp(14px, 1.5vw, 16px);
          height: clamp(14px, 1.5vw, 16px);
          transition: transform 0.25s ease;
        }
        .sx-brand-link:hover svg { transform: translate(2px, -2px); }
        .sx-socials {
          display: flex;
          gap: clamp(8px, 1.2vw, 12px);
          margin-top: clamp(12px, 2vw, 18px);
        }
        .sx-social-icon {
          width: clamp(32px, 4vw, 38px);
          height: clamp(32px, 4vw, 38px);
          border-radius: clamp(8px, 1vw, 10px);
          background: rgba(124, 58, 237, 0.08);
          border: 1px solid rgba(124, 58, 237, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: pointer;
        }
        .sx-social-icon:hover {
          background: rgba(124, 58, 237, 0.18);
          border-color: rgba(124, 58, 237, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(124, 58, 237, 0.15);
        }
        .sx-social-icon svg {
          width: clamp(14px, 1.8vw, 17px);
          height: clamp(14px, 1.8vw, 17px);
          color: #a78bfa;
          transition: color 0.25s ease;
        }
        .sx-social-icon:hover svg { color: #f2f0f8; }
        
        /* ORIGINAL GRID LAYOUT HELD PERFECTLY BOUNDED */
        .sx-link-columns {
          flex: 2;
          min-width: 300px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(20px, 3vw, 40px);
        }
        .sx-link-col h4 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(10px, 1.2vw, 12px);
          font-weight: 700;
          color: var(--foreground);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: clamp(12px, 2vw, 20px);
          position: relative;
          padding-bottom: clamp(8px, 1.2vw, 12px);
          cursor: pointer;
          user-select: none;
          transition: transform 0.2s ease;
        }
        .sx-link-col h4:active {
          transform: scale(0.98);
        }
        /* ALL YOUR EXACT LINES REMAIN FIXED */
        .sx-link-col h4::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: clamp(16px, 2.5vw, 24px);
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, #7c3aed, #b89830);
        }
        .sx-link-col ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 1vw, 10px);
        }
        
        /* PREMIUM FLASH SEQUENTIAL FILE-SYSTEM ANIMATION DEFS */
        .sx-link-col li {
          opacity: 0;
          transform: translateX(-8px);
          visibility: hidden;
          transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), 
                      transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
                      visibility 0.25s;
        }

        /* Triggered active state running step-by-step cascades */
        .sx-link-col.is-revealed li {
          opacity: 1;
          transform: translateX(0);
          visibility: visible;
          animation: sxFlashLight 0.35s ease-out;
        }

        /* Sequential File Node Time Intervals */
        .sx-link-col.is-revealed li:nth-child(1) { transition-delay: 0.04s; animation-delay: 0.04s; }
        .sx-link-col.is-revealed li:nth-child(2) { transition-delay: 0.12s; animation-delay: 0.12s; }
        .sx-link-col.is-revealed li:nth-child(3) { transition-delay: 0.20s; animation-delay: 0.20s; }
        .sx-link-col.is-revealed li:nth-child(4) { transition-delay: 0.28s; animation-delay: 0.28s; }
        .sx-link-col.is-revealed li:nth-child(5) { transition-delay: 0.36s; animation-delay: 0.36s; }

        @keyframes sxFlashLight {
          0% { color: #ffffff; text-shadow: 0 0 12px #a78bfa; }
          50% { color: #f5c542; text-shadow: 0 0 8px #f5c542; }
          100% { color: inherit; text-shadow: none; }
        }

        .sx-link-col li a {
          font-family: 'DM Mono', monospace;
          font-size: clamp(10px, 1.3vw, 13px);
          font-weight: 400;
          color: color-mix(in srgb, var(--foreground) 60%, transparent);
          text-decoration: none;
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          position: relative;
        }
        .sx-link-col li a:hover { color: var(--foreground); }
        .sx-link-col li a[data-highlight="true"] { color: var(--primary); }
        .sx-link-col li a[data-highlight="true"]:hover { color: #f5c542; }
        
        .sx-footer-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(124, 58, 237, 0.15) 20%, rgba(124, 58, 237, 0.15) 80%, transparent 100%);
          margin: clamp(24px, 4vw, 48px) 0 clamp(16px, 2.5vw, 24px);
        }
        .sx-footer-bottom {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .learn-col{ width: 195px; }
        .sx-copyright {
          font-family: 'DM Mono', monospace;
          font-size: clamp(9px, 1.2vw, 12px);
          color: color-mix(in srgb, var(--foreground) 50%, transparent);
          letter-spacing: 0.03em;
        }
        .sx-copyright span { color: #b89830; }
        .sx-footer-bottom-links { display: flex; gap: clamp(12px, 2vw, 24px); }
        .sx-footer-bottom-links a {
          font-family: 'DM Mono', monospace;
          font-size: clamp(10px, 1.2vw, 12px);
          color: color-mix(in srgb, var(--foreground) 80%, transparent);
          font-weight: 500;
          text-decoration: none;
          transition: all 0.25s ease;
          letter-spacing: 0.05em;
        }
        .sx-footer-bottom-links a:hover { 
          color: var(--foreground); 
          text-shadow: 0 0 10px color-mix(in srgb, var(--foreground) 80%, transparent);
        }
        
        /* EXACT MOBILE QUERIES FROM YOUR ORIGINAL SHIPPED GRAPHIC */
        @media (max-width: 375px) {
          .sx-footer { padding: 24px 16px 16px; }
          .sx-footer-top { flex-direction: column; gap: 20px; }
          .sx-brand { max-width: 100%; }
          .sx-link-columns { grid-template-columns: repeat(2, 1fr); gap: 20px 12px; min-width: 100%; }
          .sx-link-col h4 { font-size: 11px; margin-bottom: 8px; }
          .sx-link-col ul { gap: 4px; }
          .sx-link-col li a { font-size: 12px; padding: 4px 0; }
          .sx-footer-bottom { flex-direction: column; align-items: flex-start; gap: 12px; }
          .sx-footer-bottom-links { flex-wrap: wrap; gap: 10px; }
          .sx-copyright { font-size: 11px; line-height: 1.4; }
          .sx-footer-bottom-links a { font-size: 11px; padding: 2px 0; }
          .learn-col { width: auto; grid-column: span 2; }
        }
        @media (min-width: 376px) and (max-width: 480px) {
          .sx-footer { padding: 28px 20px 20px; }
          .sx-footer-top { flex-direction: column; gap: 24px; }
          .sx-link-columns { grid-template-columns: repeat(2, 1fr); gap: 24px 16px; min-width: 100%; }
          .sx-link-col h4 { font-size: 13px; margin-bottom: 8px; }
          .sx-link-col ul { gap: 4px; }
          .sx-link-col li a { font-size: 14px; padding: 4px 0; }
          .learn-col { grid-column: span 2; width: auto; }
          .sx-footer-bottom { flex-direction: column; align-items: flex-start; gap: 12px; }
          .sx-footer-bottom-links { flex-wrap: wrap; gap: 10px; }
          .sx-copyright { font-size: 12px; line-height: 1.4; }
          .sx-footer-bottom-links a { font-size: 13px; padding: 2px 0; }
        }
        @media (min-width: 481px) and (max-width: 600px) {
          .sx-footer-top { flex-direction: column; gap: 28px; }
          .sx-link-columns { grid-template-columns: repeat(2, 1fr); gap: 32px 24px; min-width: 100%; }
          .learn-col { grid-column: span 2; width: auto; }
        }
        @media (min-width: 601px) and (max-width: 768px) {
          .sx-link-columns { grid-template-columns: repeat(2, 1fr); gap: 28px 32px; min-width: 100%; }
          .learn-col { grid-column: span 2; width: auto; }
        }
        @media (min-width: 1440px) {
          .sx-footer-inner { max-width: 1320px; }
          .sx-footer { padding: 80px 80px 40px; }
        }
      `}</style>

      <footer className="sx-footer">
        <div className="sx-footer-inner">
          <div className="sx-footer-top">
            <div className="sx-brand">
              <div className="sx-brand-name">
                Sanixor AI <span className="sx-brand-dot"></span>
              </div>
              <p className="sx-brand-tagline">Intelligence Built to Deploy.</p>
              <a href="mailto:team@sanixor.space" className="sx-brand-link">
                team@sanixor.space
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7" /><path d="M7 7h10v10" /></svg>
              </a>
              <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-6">
                {/* Twitter / X */}
                <a
                  href="https://twitter.com/sanixorai"
                  aria-label="Twitter / X"
                  className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl sm:rounded-[1.5rem] border border-border bg-card flex items-center justify-center text-muted-foreground transition-all duration-300 outline-none hover:-translate-y-1 hover:text-primary hover:bg-primary/10 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                >
                  <Twitter className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/sanixor-ai/"
                  aria-label="LinkedIn"
                  className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl sm:rounded-[1.5rem] border border-border bg-card flex items-center justify-center text-muted-foreground transition-all duration-300 transform outline-none hover:-translate-y-1 hover:text-primary hover:bg-primary/10 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                >
                  <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/sanixorai/"
                  aria-label="Instagram"
                  className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl sm:rounded-[1.5rem] border border-border bg-card flex items-center justify-center text-muted-foreground transition-all duration-300 transform outline-none hover:-translate-y-1 hover:text-primary hover:bg-primary/10 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                >
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
                </a>
              </div>
            </div>

            <div className="sx-link-columns">
              {/* Column 1 */}
              <div className={cn("sx-link-col", revealedCols[1] && "is-revealed")}>
                <h4 onClick={() => toggleColumnReveal(1)}>Products</h4>
                <ul>
                  <li><a href="/hackeval">HackEval</a></li>
                  <li><a href="/bitbench">BitBench</a></li>
                  <li><a href="/autodash">AutoDash</a></li>
                  <li><a href="/socioai">Socio AI</a></li>
                  <li><a href="/nyayai">Nyay AI</a></li>
                </ul>
              </div>

              {/* Column 2 */}
              <div className={cn("sx-link-col", revealedCols[2] && "is-revealed")}>
                <h4 onClick={() => toggleColumnReveal(2)}>Services</h4>
                <ul>
                  <li><a href="/agent-as-a-service">Agent as a Service</a></li>
                  <li><a href="/custom-agent-dev">Custom Agent Dev</a></li>
                  <li><a href="/api-integration">API Integration</a></li>
                  <li><a href="/event-automation">Event Operations</a></li>
                  <li><a href="/conversational-ux">Conversational UX</a></li>
                  <li><a href="/ai-architecture">AI Architecture</a></li>
                </ul>
              </div>

              {/* Column 3 
              <div className={cn("sx-link-col", revealedCols[3] && "is-revealed")}>
                <h4 onClick={() => toggleColumnReveal(3)}>Agent Verse</h4>
                <ul>
                  <li><a href="/#event" data-highlight="true">AgentVerse 2.0</a></li>
                  <li><a href="/?action=register#event" data-highlight="true">Register College</a></li>
                  <li><a href="/?action=details#event">Event Details</a></li>
                </ul>
              </div>
              */}

              {/* Column 4 */}
              <div className={cn("sx-link-col learn-col", revealedCols[4] && "is-revealed")}>
                <h4 onClick={() => toggleColumnReveal(4)}>Learn</h4>
                <ul>
                  <li><a href="/training#architecture">Core Curriculum & Architecture</a></li>
                  <li><a href="/training#design">Engineering Competency Matrix</a></li>
                  <li><a href="/training#tracks">Available Specialized Tracks</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="sx-footer-divider"></div>

          <div className="sx-footer-bottom">
            <p className="sx-copyright">&copy; 2025 <span>Sanixor AI</span>. Built for the next generation.</p>
            <div className="sx-footer-bottom-links">
              <a href="/contact">Contact Us</a>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}