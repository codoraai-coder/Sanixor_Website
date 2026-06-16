import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export function CTASection({ className }: { className?: string }) {
  return (
    <section id="cta" className={cn("mx-auto max-w-5xl px-4 md:px-6", className)}>
      <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-card/30 p-10 text-center backdrop-blur-xl md:p-16">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary-glow/10" />
        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-primary-glow/15 blur-3xl" />

        <div className="relative">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Ready to deploy
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Start building with
            <br />
            <span className="text-gradient">Sanixor AI today.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground md:text-lg">
            Real agents. Real accuracy. Real results — for students, institutions, and developers.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 rounded-full bg-gradient-to-r from-secondary via-primary to-primary-glow px-10 shadow-glow transition-all hover:scale-[1.02]"
          >
            <a href="https://sanixor.space" target="_blank" rel="noopener noreferrer">
              Open Sanixor.space
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <>
      <style>{`
        .sx-footer {
          position: relative;
          z-index: 1;
          width: 100%;
          background: linear-gradient(178deg, rgba(12, 10, 26, 0.95) 0%, rgba(6, 5, 15, 0.99) 100%);
          border-top: 1px solid rgba(124, 58, 237, 0.15);
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
          gap: clamp(20px, 4vw, 48px);
          margin-bottom: clamp(28px, 5vw, 56px);
        }
        .sx-brand { max-width: 320px; }
        .sx-brand-name {
          font-family: 'Syne', sans-serif;
          font-size: clamp(20px, 3vw, 28px);
          font-weight: 800;
          color: #f2f0f8;
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
          font-family: 'DM Mono', monospace;
          font-size: clamp(11px, 1.3vw, 13px);
          font-weight: 500;
          color: #a78bfa;
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: color 0.25s ease;
        }
        .sx-brand-link:hover { color: #f5c542; }
        .sx-brand-link svg {
          width: clamp(12px, 1.5vw, 14px);
          height: clamp(12px, 1.5vw, 14px);
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
        .sx-link-columns {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(20px, 3vw, 40px);
        }
        .sx-link-col h4 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(10px, 1.2vw, 12px);
          font-weight: 700;
          
          color: #f2f0f8;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: clamp(12px, 2vw, 20px);
          position: relative;
          padding-bottom: clamp(8px, 1.2vw, 12px);
        }
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
        .sx-link-col li a {
          
          font-family: 'DM Mono', monospace;
          font-size: clamp(10px, 1.3vw, 13px);
          font-weight: 400;
          color: #857fa3;
          text-decoration: none;
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          position: relative;
        }
        .sx-link-col li a::before {
          content: '';
          width: 0;
          height: 1px;
          background: #a78bfa;
          transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          flex-shrink: 0;
        }
        .sx-link-col li a:hover { color: #f2f0f8; }
        .sx-link-col li a:hover::before { width: 12px; }
        .sx-link-col li a[data-highlight="true"] { color: #a78bfa; }
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
          .learn-col{
          width: 195px;
          }
        .sx-copyright {
          font-family: 'DM Mono', monospace;
          font-size: clamp(9px, 1.2vw, 12px);
          color: #4a4565;
          letter-spacing: 0.03em;
        }
        .sx-copyright span { color: #b89830; }
        .sx-footer-bottom-links {
          display: flex;
          gap: clamp(12px, 2vw, 24px);
        }
        .sx-footer-bottom-links a {
          font-family: 'DM Mono', monospace;
          font-size: clamp(9px, 1.2vw, 11px);
          color: #4a4565;
          text-decoration: none;
          transition: color 0.25s ease;
          letter-spacing: 0.03em;
        }
        .sx-footer-bottom-links a:hover { color: #857fa3; }
        @media (max-width: 375px) {
          .sx-footer { padding: 32px 16px 20px; }
          .sx-footer-top { flex-direction: column; gap: 24px; }
          .sx-brand { max-width: 100%; }
          .sx-link-columns { grid-template-columns: repeat(2, 1fr); gap: 20px 16px; }
          .sx-footer-bottom { flex-direction: column; align-items: flex-start; gap: 10px; }
        }
        @media (min-width: 376px) and (max-width: 480px) {
          .sx-footer-top { flex-direction: column; gap: 28px; }
          .sx-link-columns { grid-template-columns: repeat(2, 1fr); gap: 22px 20px; }
        }
        @media (min-width: 481px) and (max-width: 600px) {
          .sx-footer-top { flex-direction: column; gap: 28px; }
          .sx-link-columns { grid-template-columns: repeat(2, 1fr); gap: 24px 24px; }
        }
        @media (min-width: 601px) and (max-width: 768px) {
          .sx-link-columns { grid-template-columns: repeat(2, 1fr); gap: 28px 32px; }
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
              <a href="https://sanixor.space" className="sx-brand-link" target="_blank" rel="noopener noreferrer">
                sanixor.space
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
              </a>
              <div className="sx-socials">
                <a href="https://www.instagram.com/sanixorai/" className="sx-social-icon" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 1.8h8.5a3.95 3.95 0 0 1 3.95 3.95v8.5a3.95 3.95 0 0 1-3.95 3.95h-8.5a3.95 3.95 0 0 1-3.95-3.95v-8.5A3.95 3.95 0 0 1 7.75 3.8zm8.95 1.35a.95.95 0 1 0 0 1.9.95.95 0 0 0 0-1.9zM12 6.35A5.65 5.65 0 1 0 17.65 12 5.656 5.656 0 0 0 12 6.35zm0 1.8A3.85 3.85 0 1 1 8.15 12 3.854 3.854 0 0 1 12 8.15z"/>
                  </svg>
                </a>
                <a href="https://twitter.com/sanixorai" className="sx-social-icon" aria-label="Twitter / X">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/sanixor-ai/" className="sx-social-icon" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>

            <div className="sx-link-columns">
              <div className="sx-link-col">
                <h4>Products</h4>
                <ul>
                  <li><a href="#">HackEval</a></li>
                  <li><a href="#">BitBenchmark</a></li>
                  <li><a href="#">Sanixor Studio</a></li>
                  <li><a href="#">LexAI by Sanixor</a></li>
                </ul>
              </div>
              <div className="sx-link-col">
                <h4>Services</h4>
                <ul>
                  <li><a href="#">Agent as a Service</a></li>
                  <li><a href="#">Custom Agent Dev</a></li>
                  <li><a href="#">API Integration</a></li>
                  <li><a href="#">Event Automation</a></li>
                </ul>
              </div>
              <div className="sx-link-col">
                <h4>Agent Verse</h4>
                <ul>
                  <li><a href="#" data-highlight="true">AgentVerse 2.0</a></li>
                  <li><a href="#" data-highlight="true">Register College</a></li>
                  <li><a href="#">Event Details</a></li>
                </ul>
              </div>
              <div className="sx-link-col learn-col">
                <h4>Learn</h4>
                <ul>
                  <li><a href="#">Transformer Architecture</a></li>
                  <li><a href="#">Agent System Design</a></li>
                  <li><a href="#">LLM Internals</a></li>
                  <li><a href="#">Industry Tracks</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="sx-footer-divider"></div>

          <div className="sx-footer-bottom">
            <p className="sx-copyright">&copy; 2025 <span>Sanixor AI</span>. Built for the next generation.</p>
            <div className="sx-footer-bottom-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms & Conditions</a>
              <a href="/contact">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
