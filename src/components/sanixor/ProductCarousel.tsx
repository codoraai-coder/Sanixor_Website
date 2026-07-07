import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { createPortal } from "react-dom";

const PRODUCTS = [
  {
    id: "hackeval",
    name: "HACKEVAL",
    tagline:
      "AI-powered hackathon evaluation platform that automates judging, scoring, and feedback at scale.",
    category: "AI Platform",
    accent: "#3B82F6",
    video: "/videos/hackeval.gif",
    image:
      "https://kceggzvolonyqavvowwc.supabase.co/storage/v1/object/public/codoora/hackeven%20image.png",
    description:
      "Transform how hackathons are judged. HackEval uses advanced AI agents to evaluate submissions in real-time, providing consistent, unbiased, and detailed feedback to every participant.",
    features: [
      "Real-time automated submission evaluation",
      "Multi-criteria intelligent scoring system",
      "Instant personalized participant feedback",
      "Customizable judging rubrics & weights",
      "Live leaderboards with analytics dashboard",
    ],
    stats: { speed: "50x", accuracy: "98.7%", events: "200+" },
  },
  {
    id: "bitbench",
    name: "BITBENCH",
    tagline:
      "Comprehensive benchmarking suite for evaluating AI models against industry-standard metrics.",
    category: "Analytics",
    accent: "#10B981",
    video: "/videos/bitbench.gif",
    image:
      "https://kceggzvolonyqavvowwc.supabase.co/storage/v1/object/public/codoora/BitBench%20image.png",
    description:
      "Stop guessing which model works best. BitBench runs your AI models through rigorous, standardized tests and gives you clear, actionable performance reports.",
    features: [
      "Standardized cross-model comparison",
      "Performance tracking over time",
      "Cost-efficiency analysis per query",
      "Custom benchmark creation tools",
      "Automated regression detection alerts",
    ],
    stats: { models: "500+", tests: "10K+", latency: "<2s" },
  },
  {
    id: "autodash",
    name: "AUTODASH",
    tagline: "Automated CI/CD pipeline intelligence that predicts failures before they happen.",
    category: "DevOps",
    accent: "#F59E0B",
    video: "/videos/autodash.gif",
    image:
      "https://kceggzvolonyqavvowwc.supabase.co/storage/v1/object/public/codoora/AutoDash%20image.png",
    description:
      "Your deployment pipeline, on autopilot. AutoDash monitors every stage of your CI/CD workflow, predicts failures before they occur, and auto-heals common issues.",
    features: [
      "Predictive failure detection with AI",
      "Auto-healing for common pipeline issues",
      "Smart deployment scheduling & rollback",
      "Cross-platform integration hub",
      "Real-time team alert notifications",
    ],
    stats: { uptime: "99.9%", deploys: "50K+", saved: "12h/w" },
  },
  {
    id: "aas",
    path: "/agent-as-a-service",
    name: "AGENT AS A SERVICE",
    tagline:
      "Deploy intelligent AI agents as managed cloud services with enterprise-grade reliability.",
    category: "Infrastructure",
    accent: "#8B5CF6",
    video: "/videos/agent-as-a-service.gif",
    image:
      "https://kceggzvolonyqavvowwc.supabase.co/storage/v1/object/public/codoora/Agent%20as%20a%20Service%20image.png",
    description:
      "Why build AI agents from scratch? AaaS gives you production-ready intelligent agents that run 24/7 in the cloud. Scale up or down instantly based on demand.",
    features: [
      "One-click agent deployment to cloud",
      "Auto-scaling based on traffic load",
      "Built-in memory & context management",
      "Multi-model fallback & redundancy",
      "Usage-based metered billing system",
    ],
    stats: { agents: "1K+", uptime: "99.99%", regions: "12" },
  },
  {
    id: "cas",
    path: "/custom-agent-dev",
    name: "CUSTOMIZED AGENTIC SOLUTIONS",
    tagline: "Bespoke AI agent architectures engineered for your unique business challenges.",
    category: "Enterprise",
    accent: "#EC4899",
    video: "/videos/custom-agent.gif",
    image:
      "https://kceggzvolonyqavvowwc.supabase.co/storage/v1/object/public/codoora/Customized%20Agentic%20Solutions%20image.png",
    description:
      "Every business is different. Our team designs, builds, and deploys custom AI agent systems tailored specifically to your workflows, data, and goals.",
    features: [
      "End-to-end custom agent architecture",
      "Deep integration with existing tools",
      "Dedicated solution engineering team",
      "Ongoing optimization & support SLA",
      "White-label & private deployment options",
    ],
    stats: { clients: "50+", roi: "4.2x", weeks: "4-8" },
  },
];

const thicknessLayers = [-1.47, -0.73, 0, 0.73, 1.47];

function ProductDetailModal({
  product,
  onClose,
}: {
  product: (typeof PRODUCTS)[number];
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose]);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 400);
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className={`modal-backdrop ${visible ? "modal-backdrop-active" : "modal-backdrop-enter"}`}
      style={{ background: "rgba(0,0,0,0.65)" }}
      onClick={handleClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div
        className={`modal-card ${visible ? "modal-card-active" : "modal-card-enter"}`}
        style={{ background: "#0a0a0a" }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
      >
        <div className="modal-card-visual">
          <img src={product.video} alt={product.name} className="modal-card-video" />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, #0a0a0a 0%, transparent 50%)",
            }}
          />
          <button className="modal-close" onClick={handleClose}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1L13 13M13 1L1 13"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div
            className="animate-in animate-in-1 modal-category"
            style={{
              background: `${product.accent}18`,
              color: product.accent,
              border: `1px solid ${product.accent}30`,
            }}
          >
            {product.category}
          </div>

          <div className="animate-in animate-in-2 modal-title">{product.name}</div>
          <div className="animate-in animate-in-2 modal-tagline">{product.tagline}</div>

          <div className="animate-in animate-in-3 modal-stats">
            {Object.entries(product.stats).map(([key, val]) => (
              <div key={key} className="modal-stat">
                <div className="modal-stat-value" style={{ color: product.accent }}>
                  {val}
                </div>
                <div className="modal-stat-label">{key}</div>
              </div>
            ))}
          </div>

          <div className="animate-in animate-in-4 modal-section">
            <div className="modal-section-title">Overview</div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.6,
              }}
            >
              {product.description}
            </div>
          </div>

          <div className="animate-in animate-in-5 modal-section">
            <div className="modal-section-title">Key Features</div>
            {product.features.map((f, idx) => (
              <div key={idx} className="modal-feature">
                <div className="modal-feature-dot" style={{ background: product.accent }} />
                <div className="modal-feature-text">{f}</div>
              </div>
            ))}
          </div>

          <a
            href={product.path || `/${product.id}`}
            className="animate-in animate-in-5 modal-cta"
            style={{
              background: product.accent,
              color: "white",
              marginTop: "0.5rem",
              textDecoration: "none",
            }}
          >
            Learn More
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 7H13M13 7L8 2M13 7L8 12"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function ProductCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeProduct, setActiveProduct] = useState<(typeof PRODUCTS)[number] | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [spinAngles, setSpinAngles] = useState<Record<number, number>>({});

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const next = () => {
    setActiveIndex((prev) => {
      const nextIdx = (prev + 1) % PRODUCTS.length;
      setSpinAngles((s) => ({ ...s, [nextIdx]: (s[nextIdx] || 0) - 360 }));
      return nextIdx;
    });
  };

  const prev = () => {
    setActiveIndex((prev) => {
      const nextIdx = (prev - 1 + PRODUCTS.length) % PRODUCTS.length;
      setSpinAngles((s) => ({ ...s, [nextIdx]: (s[nextIdx] || 0) + 360 }));
      return nextIdx;
    });
  };

  return (
    <>
      <style>{`
        .modal-backdrop { position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 0.4s cubic-bezier(0.16, 1, 0.3, 1); padding: 1.5rem; }
        .modal-backdrop-enter { opacity: 0; backdrop-filter: blur(0px); }
        .modal-backdrop-active { opacity: 1; backdrop-filter: blur(24px); }
        
        /* Mobile First Modal Base */
        .modal-card { position: relative; width: 100%; max-width: 440px; border-radius: 24px; overflow: hidden; transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1); max-height: 85vh; display: flex; flex-direction: column; -webkit-overflow-scrolling: touch; overscroll-behavior-y: contain; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
        .modal-card-enter { transform: scale(0.95) translateY(20px); opacity: 0; }
        .modal-card-active { transform: scale(1) translateY(0); opacity: 1; }
        
        .modal-card-visual { position: relative; width: 100%; aspect-ratio: 16/9; flex-shrink: 0; overflow: hidden; }
        .modal-card-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .modal-close { position: absolute; top: 1rem; right: 1rem; width: 32px; height: 32px; border-radius: 50%; background: color-mix(in srgb, var(--background) 50%, transparent); border: 1px solid color-mix(in srgb, var(--foreground) 15%, transparent); color: var(--foreground); display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 50; transition: background 0.2s, transform 0.2s; backdrop-filter: blur(8px); }
        .modal-close:hover { background: rgba(255,255,255,0.15); transform: scale(1.1); }
        
        .modal-body { padding: 1.25rem; overflow-y: auto; flex-grow: 1; background: var(--card); display: flex; flex-direction: column; }
        .modal-body::-webkit-scrollbar { display: none; }
        .modal-category { display: inline-flex; align-items: center; padding: 0.3rem 0.75rem; border-radius: 999px; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.75rem; align-self: flex-start; }
        .modal-title { font-size: 1.4rem; font-weight: 800; color: var(--foreground); letter-spacing: -0.02em; line-height: 1.15; margin-bottom: 0.5rem; }
        .modal-tagline { font-size: 0.85rem; color: color-mix(in srgb, var(--foreground) 70%, transparent); line-height: 1.4; margin-bottom: 1.25rem; }
        
        .modal-section { background: color-mix(in srgb, var(--foreground) 3%, transparent); border: 1px solid color-mix(in srgb, var(--foreground) 6%, transparent); border-radius: 16px; padding: 1rem; margin-bottom: 0.75rem; }
        .modal-section-title { font-size: 0.65rem; font-weight: 700; color: color-mix(in srgb, var(--foreground) 50%, transparent); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.6rem; }
        .modal-feature { display: flex; align-items: flex-start; gap: 0.6rem; padding: 0.25rem 0; }
        .modal-feature-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; margin-top: 6px; }
        .modal-feature-text { font-size: 0.8rem; color: color-mix(in srgb, var(--foreground) 80%, transparent); line-height: 1.4; }
        
        .modal-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin-bottom: 0.75rem; }
        .modal-stat { background: color-mix(in srgb, var(--foreground) 3%, transparent); border: 1px solid color-mix(in srgb, var(--foreground) 6%, transparent); border-radius: 12px; padding: 0.75rem 0.25rem; text-align: center; }
        .modal-stat-value { font-family: 'JetBrains Mono', monospace; font-size: 0.95rem; font-weight: 700; color: var(--foreground); }
        .modal-stat-label { font-size: 0.55rem; color: color-mix(in srgb, var(--foreground) 50%, transparent); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.2rem; }
        
        .modal-cta { display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; padding: 0.85rem; border-radius: 12px; border: none; font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 700; cursor: pointer; transition: transform 0.2s, opacity 0.2s; letter-spacing: 0.02em; margin-top: auto; }
        .modal-cta:hover { transform: scale(1.02); }
        .modal-cta:active { transform: scale(0.98); }

        /* Desktop Modal Layout */
        @media (min-width: 800px) {
          .modal-backdrop { align-items: center; }
          .modal-card { 
            flex-direction: row;
            border-radius: 24px; 
            max-height: 92vh; 
            width: 94vw; 
            max-width: 1000px; 
          }
          .modal-card-enter { transform: scale(0.85) translateY(40px); opacity: 0; }
          .modal-card-active { transform: scale(1) translateY(0); opacity: 1; }
          
          .modal-card-visual { width: 45%; aspect-ratio: auto; border-right: 1px solid rgba(255,255,255,0.08); }
          .modal-body { width: 55%; padding: 1.75rem 2rem; display: flex; flex-direction: column; }
          
          .modal-title { font-size: 1.5rem; }
          .modal-tagline { font-size: 0.85rem; margin-bottom: 0.75rem; }
          .modal-section { padding: 1rem; margin-bottom: 0.75rem; }
          .modal-section-title { margin-bottom: 0.5rem; }
          .modal-feature { padding: 0.2rem 0; }
          .modal-stat { padding: 0.75rem 0.5rem; }
          .modal-stat-value { font-size: 0.9rem; }
          .modal-stats { gap: 0.5rem; margin-bottom: 0.75rem; }
          .modal-cta { margin-top: auto; padding: 0.8rem; }
        }

        @keyframes fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fade-in 0.4s ease forwards; }
        .animate-in-1 { animation-delay: 0.05s; opacity: 0; }
        .animate-in-2 { animation-delay: 0.1s; opacity: 0; }
        .animate-in-3 { animation-delay: 0.15s; opacity: 0; }
        .animate-in-4 { animation-delay: 0.2s; opacity: 0; }
        .animate-in-5 { animation-delay: 0.25s; opacity: 0; }
      `}</style>
      <div className="relative w-full h-[600px] flex flex-col items-center justify-center overflow-hidden py-12 group">
        {/* Navigation Buttons */}
        <div className="absolute inset-y-0 left-2 md:left-8 flex items-center z-50 pointer-events-none">
          <button
            onClick={prev}
            className="p-3 md:p-4 rounded-full bg-background/40 border border-foreground/10 text-foreground backdrop-blur-xl hover:bg-foreground/10 transition-all hover:scale-110 pointer-events-auto md:opacity-0 group-hover:opacity-100 md:-translate-x-4 group-hover:translate-x-0 duration-300"
            aria-label="Previous product"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
          </button>
        </div>
        <div className="absolute inset-y-0 right-2 md:right-8 flex items-center z-50 pointer-events-none">
          <button
            onClick={next}
            className="p-3 md:p-4 rounded-full bg-background/40 border border-foreground/10 text-foreground backdrop-blur-xl hover:bg-foreground/10 transition-all hover:scale-110 pointer-events-auto md:opacity-0 group-hover:opacity-100 md:translate-x-4 group-hover:translate-x-0 duration-300"
            aria-label="Next product"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
          </button>
        </div>

        {/* Track */}
        <div
          className="relative flex items-center justify-center w-full h-full max-w-6xl mx-auto"
          style={{ perspective: "1200px" }}
        >
          {PRODUCTS.map((p, i) => {
            let offset = i - activeIndex;
            if (offset > PRODUCTS.length / 2) offset -= PRODUCTS.length;
            if (offset < -PRODUCTS.length / 2) offset += PRODUCTS.length;

            const isActive = offset === 0;
            const absOffset = Math.abs(offset);
            const zIndex = 50 - absOffset;
            const opacity = Math.max(0, 1 - absOffset * (isMobile ? 0.6 : 0.4));
            const scale = Math.max(0.6, 1 - absOffset * (isMobile ? 0.2 : 0.15));
            const translateX = offset * (isMobile ? 220 : 400);

            // Mouse 3D Tilt for active card
            const tiltX = isActive && isHovered ? mousePos.y * -15 : 0;
            const tiltY = isActive && isHovered ? mousePos.x * 15 : 0;

            const extraSpin = spinAngles[i] || 0;
            const rotateY = offset * (isMobile ? -15 : -20) + tiltY + extraSpin;
            const rotateX = tiltX;
            const translateZ = -absOffset * (isMobile ? 120 : 150);

            const cardWidth = isMobile ? "280px" : "500px";
            const cardHeight = isMobile ? "380px" : "320px";

            if (absOffset > (isMobile ? 1.5 : 2.5)) return null;

            return (
              <div
                key={p.id}
                className="absolute transition-all duration-700 ease-[cubic-bezier(0.25,1,0.3,1)] cursor-pointer"
                style={{
                  zIndex,
                  opacity,
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
                  width: cardWidth,
                  height: cardHeight,
                  transformStyle: "preserve-3d",
                }}
                onClick={() => {
                  if (isActive) {
                    setActiveProduct(p);
                  } else {
                    setActiveIndex(i);
                    setSpinAngles((s) => ({ ...s, [i]: (s[i] || 0) + (offset > 0 ? -360 : 360) }));
                  }
                }}
                onMouseMove={(e) => {
                  if (!isActive) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
                  const y = (e.clientY - rect.top) / rect.height - 0.5;
                  setMousePos({ x, y });
                }}
                onMouseEnter={() => {
                  if (isActive) setIsHovered(true);
                }}
                onMouseLeave={() => {
                  if (isActive) {
                    setIsHovered(false);
                    setMousePos({ x: 0, y: 0 });
                  }
                }}
              >
                <div
                  className="w-full h-full rounded-[24px] overflow-hidden relative transition-all duration-500 group/card"
                  style={{
                    background: "color-mix(in srgb, var(--card) 60%, transparent)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: `1px solid ${p.accent}50`,
                    boxShadow: isActive
                      ? `0 20px 50px -10px ${p.accent}40, inset 0 1px 1px rgba(255,255,255,0.1)`
                      : "none",
                    clipPath: "inset(0 0 0 0 round 24px)",
                    WebkitClipPath: "inset(0 0 0 0 round 24px)",
                    transform: "translateZ(0)",
                  }}
                >
                  {/* Fallback image + Video */}
                  <img
                    src={p.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-lighten rounded-[24px]"
                  />
                  <img
                    src={p.video}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-lighten rounded-[24px]"
                  />

                  {/* Elegant gradient overlay for text readability */}
                  <div
                    className="absolute inset-0 rounded-[24px]"
                    style={{
                      background: `linear-gradient(to top, var(--background) 0%, transparent 60%, ${p.accent}10 100%)`,
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 text-foreground">
                    <div
                      className="mb-auto mt-2 inline-flex self-start px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-widest rounded-full backdrop-blur-md transition-all duration-300"
                      style={{
                        background: `${p.accent}15`,
                        color: p.accent,
                        border: `1px solid ${p.accent}40`,
                      }}
                    >
                      {p.category}
                    </div>

                    <div className="space-y-2">
                      <h3
                        className="text-2xl font-extrabold tracking-tight"
                        style={{
                          textShadow:
                            "0 4px 12px color-mix(in srgb, var(--foreground) 30%, transparent)",
                        }}
                      >
                        {p.name}
                      </h3>
                      <p
                        className="text-sm opacity-80 line-clamp-2 leading-relaxed"
                        style={{
                          textShadow:
                            "0 2px 6px color-mix(in srgb, var(--foreground) 30%, transparent)",
                        }}
                      >
                        {p.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Interaction indicator */}
                  {isActive && (
                    <div className="absolute top-7 right-7 flex items-center gap-2 text-[0.6rem] font-bold tracking-[0.2em] text-foreground opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                      <span className="w-2 h-2 rounded-full bg-foreground animate-ping" />
                      <span className="relative">EXPLORE</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {activeProduct && (
          <ProductDetailModal product={activeProduct} onClose={() => setActiveProduct(null)} />
        )}
      </div>
    </>
  );
}
