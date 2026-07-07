import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ServiceInfo } from "@/components/sanixor/ServiceDetailsModal";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface ServiceCubeData extends ServiceInfo {
  iconComponent: React.ElementType;
  shortSubtitle: string;
}

const TILT = -12;

const ROTATIONS = [
  { x: TILT, y: 0 },
  { x: TILT, y: -90 },
  { x: TILT, y: -180 },
  { x: TILT, y: -270 },
  { x: -90, y: 0 },
  { x: 90, y: 0 },
];

export function ServicesCube({
  services,
  onSelectService,
}: {
  services: ServiceCubeData[];
  onSelectService: (service: ServiceInfo) => void;
}) {
  const [active, setActive] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the tall container
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0 → 1) to face index (0 → 5)
  const faceIndex = useTransform(scrollYProgress, [0, 1], [0, 5]);

  // Smoothly interpolate rotation values
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.16, 0.33, 0.5, 0.66, 0.83],
    [
      ROTATIONS[0].x,
      ROTATIONS[1].x,
      ROTATIONS[2].x,
      ROTATIONS[3].x,
      ROTATIONS[4].x,
      ROTATIONS[5].x,
    ],
  );
  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.16, 0.33, 0.5, 0.66, 0.83],
    [
      ROTATIONS[0].y,
      ROTATIONS[1].y,
      ROTATIONS[2].y,
      ROTATIONS[3].y,
      ROTATIONS[4].y,
      ROTATIONS[5].y,
    ],
  );

  // Update the active state for the buttons/counter display
  useMotionValueEvent(faceIndex, "change", (latest) => {
    const clamped = Math.max(0, Math.min(5, Math.round(latest)));
    setActive(clamped);
  });

  const S = 310;
  const H = S / 2;

  const svc = services[active] ?? services[0];
  const go = (i: number) => {
    // Manual navigation: scroll the container to the right position
    const container = scrollContainerRef.current;
    if (!container) return;
    const idx = ((i % 6) + 6) % 6;
    const containerRect = container.getBoundingClientRect();
    const containerTop = container.offsetTop;
    const scrollableHeight = container.scrollHeight - window.innerHeight;
    const targetScroll = containerTop + (idx / 5) * scrollableHeight;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    // Tall outer container — creates the scroll runway
    <div ref={scrollContainerRef} className="relative" style={{ height: "400vh" }}>
      {/* Sticky inner — pins to viewport while user scrolls */}
      <div
        id="services"
        className="sticky top-0 h-screen border-y border-border/30 overflow-hidden flex flex-col justify-center"
        style={{ background: "var(--background)" }}
      >
        {/* ── Section Header ── */}
        <div className="mx-auto text-center max-w-3xl pb-12 px-4 relative z-10 pt-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">SERVICES</p>
        </div>

        {/* Cube and controls wrapper */}
        <div className="relative w-full flex flex-col items-center justify-center z-10 flex-1 pb-12">
          {/* ── Background marquee ── */}
          {[-1, 0, 1].map((row) => (
            <div
              key={row}
              className="absolute z-0 overflow-hidden pointer-events-none select-none"
              style={{
                top: `calc(45% + ${row} * clamp(70px, 15vw, 160px))`,
                left: 0,
                right: 0,
                transform: "translateY(-50%)",
              }}
            >
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 25 + Math.abs(row) * 6 }}
                className="whitespace-nowrap font-mono text-[2.25rem] sm:text-[4rem] md:text-[7rem] lg:text-[9rem] font-black flex gap-8 md:gap-24"
                style={{
                  width: "max-content",
                  backgroundImage: "radial-gradient(circle, #ffffff 2.2px, transparent 2.5px)",
                  backgroundSize: "8px 8px",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  opacity: 0.35 + Math.abs(row) * 0.05,
                }}
              >
                <div className="flex gap-12 md:gap-24 shrink-0">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <span key={i}>Services @ Sanixor Ai</span>
                  ))}
                </div>
                <div className="flex gap-12 md:gap-24 shrink-0">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <span key={i}>Services @ Sanixor Ai</span>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}

          {/* ── Ambient glow ── */}
          <div
            className="absolute z-0 rounded-full blur-[120px] pointer-events-none"
            style={{
              width: 600,
              height: 600,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
              opacity: 0.15,
            }}
          />

          {/* ── Cube & Controls ── */}
          <div className="relative z-10 flex flex-col items-center w-full max-w-4xl px-4 gap-8">
            {/* Cube and navigation arrows */}
            <div className="flex items-center gap-6 md:gap-10">
              <ArrowBtn dir="left" onClick={() => go(active - 1)} />

              <div style={{ perspective: "1000px", perspectiveOrigin: "50% 48%" }}>
                <motion.div
                  style={{
                    width: S,
                    height: S,
                    transformStyle: "preserve-3d",
                    rotateX,
                    rotateY,
                  }}
                  transition={{ type: "tween", ease: "easeOut", duration: 0.1 }}
                >
                  {/* 4 side faces */}
                  {[
                    { r: `rotateY(0deg)   translateZ(${H}px)`, i: 0 },
                    { r: `rotateY(90deg)  translateZ(${H}px)`, i: 1 },
                    { r: `rotateY(180deg) translateZ(${H}px)`, i: 2 },
                    { r: `rotateY(-90deg) translateZ(${H}px)`, i: 3 },
                  ].map(({ r, i }) => {
                    const s = services[i];
                    return s ? (
                      <div
                        key={s.id}
                        className="absolute"
                        style={{ width: S, height: S, transform: r, backfaceVisibility: "hidden" }}
                      >
                        <CubeFace service={s} onClick={() => onSelectService(s)} index={i} />
                      </div>
                    ) : null;
                  })}
                  {/* Top face */}
                  <div
                    className="absolute"
                    style={{
                      width: S,
                      height: S,
                      transform: `rotateX(90deg) translateZ(${H}px)`,
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <CubeFace
                      service={services[4]}
                      onClick={() => onSelectService(services[4])}
                      index={4}
                    />
                  </div>
                  {/* Bottom face */}
                  <div
                    className="absolute"
                    style={{
                      width: S,
                      height: S,
                      transform: `rotateX(-90deg) translateZ(${H}px)`,
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <CubeFace
                      service={services[5]}
                      onClick={() => onSelectService(services[5])}
                      index={5}
                    />
                  </div>
                </motion.div>
              </div>

              <ArrowBtn dir="right" onClick={() => go(active + 1)} />
            </div>

            {/* 6 Labeled Buttons */}
            <div className="flex flex-wrap justify-center gap-2.5 max-w-2xl mt-16">
              {services.slice(0, 6).map((s, idx) => {
                const Icon = s.iconComponent as React.ComponentType<{ className?: string }>;
                const isActive = idx === active;
                return (
                  <button
                    key={s.id}
                    onClick={() => go(idx)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg text-xs md:text-sm font-mono uppercase tracking-wider transition-all duration-300 outline-none border",
                      isActive
                        ? "bg-white/10 text-foreground border-white shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                        : "bg-card/45 text-muted-foreground border-border hover:bg-card/85 hover:text-foreground",
                    )}
                  >
                    <Icon className="w-4 h-4 text-current" />
                    <span className="hidden sm:inline">{s.title}</span>
                    <span className="sm:hidden">{String(idx + 1).padStart(2, "0")}</span>
                  </button>
                );
              })}
            </div>

            {/* Counter */}
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-muted-foreground">
              {String(active + 1).padStart(2, "0")} / 06
            </p>

            {/* Scroll hint */}
            <motion.div
              className="flex flex-col items-center gap-2 text-muted-foreground/50"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span className="text-[10px] font-mono uppercase tracking-widest">
                Scroll to explore
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowBtn({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-card border border-border shrink-0"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="text-muted-foreground"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {dir === "left" ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 18 15 12 9 6" />
        )}
      </svg>
    </button>
  );
}

const FACE_COLORS = [
  "rgba(124, 58, 237, 0.12)", // Purple
  "rgba(59, 130, 246, 0.12)", // Blue
  "rgba(236, 72, 153, 0.12)", // Pink
  "rgba(16, 185, 129, 0.12)", // Emerald
  "rgba(245, 158, 11, 0.12)", // Amber
  "rgba(99, 102, 241, 0.12)", // Indigo
];

const FACE_GLOWS = [
  "rgba(124, 58, 237, 0.4)",
  "rgba(59, 130, 246, 0.4)",
  "rgba(236, 72, 153, 0.4)",
  "rgba(16, 185, 129, 0.4)",
  "rgba(245, 158, 11, 0.4)",
  "rgba(99, 102, 241, 0.4)",
];

function CubeFace({
  service,
  onClick,
  index = 0,
}: {
  service: ServiceCubeData;
  onClick: () => void;
  index?: number;
}) {
  const color = FACE_COLORS[index % 6];
  const glow = FACE_GLOWS[index % 6];

  return (
    <div
      onClick={onClick}
      className="w-full h-full flex flex-col items-center justify-center p-6 cursor-pointer overflow-hidden relative group rounded-none"
      style={{
        backgroundColor: "var(--card)",
        backgroundImage: `radial-gradient(circle at center, ${glow} 0%, transparent 60%)`,
        border: `1px solid rgba(255,255,255,0.05)`,
        boxShadow: `inset 0 0 100px rgba(0,0,0,0.95), 0 20px 40px -10px rgba(0,0,0,0.5)`,
      }}
    >
      {/* ── High Frequency Noise Overlay (Film Grain / Static) ── */}
      <div
        className="absolute inset-0 opacity-[0.4] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Shine on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)",
        }}
      />

      {/* ── Simple Inner Frame ── */}
      <div className="absolute inset-8 pointer-events-none z-10 border-[3px] border-[#7C3AED] shadow-[0_0_15px_rgba(124,58,237,0.4),inset_0_0_15px_rgba(124,58,237,0.4)]" />

      <h3 className="font-mono font-bold tracking-[0.15em] uppercase z-20 text-center mb-auto mt-12 text-sm md:text-base text-white/90 drop-shadow-md">
        {service.title}
      </h3>

      <div className="flex-1 flex items-center justify-center z-20 w-full">
        {React.createElement(service.iconComponent, {
          className:
            "w-24 h-24 md:w-32 md:h-32 transition-transform duration-500 group-hover:scale-110",
          style: { color: "#ffffff", filter: `drop-shadow(0 0 15px ${glow})` },
        })}
      </div>

      <div className="flex flex-col items-center justify-center h-10 z-20 mb-10 relative w-full">
        <p className="text-[10px] md:text-[11px] font-mono text-center text-white/50 uppercase tracking-widest transition-opacity duration-300 group-hover:opacity-0 absolute">
          ({service.shortSubtitle})
        </p>
        <div
          className="flex items-center gap-2 text-[10px] md:text-[11px] font-mono font-bold text-white uppercase tracking-widest opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 absolute"
          style={{ textShadow: `0 0 8px ${glow}` }}
        >
          <span>Click to explore</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>
    </div>
  );
}
