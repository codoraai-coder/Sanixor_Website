import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ServiceInfo } from "@/components/sanixor/ServiceDetailsModal";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";

export interface ServiceCubeData extends ServiceInfo {
  iconComponent: React.ElementType;
  shortSubtitle: string;
  slug?: string;
}

const TILT = 0;

const ROTATIONS = [
  { x: TILT, y: 0 },
  { x: TILT, y: -90 },
  { x: TILT, y: -180 },
  { x: TILT, y: -270 },
  { x: -90, y: -360 },
  { x: 90, y: -360 },
];

export function ServicesCube({
  services,
}: {
  services: ServiceCubeData[];
}) {
  const [active, setActive] = useState(0);
  const [mobileModalOpen, setMobileModalOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Parallax Tilt for Cube (Apple Vision Pro inspired)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  const tiltX = mousePos.y * -5;
  const tiltY = mousePos.x * 5;

  // Track scroll progress through the tall container
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0 → 1) to face index (0 → 5)
  const faceIndex = useTransform(scrollYProgress, [0, 1], [0, 5]);

  // Update the active state for the buttons/panel display
  useMotionValueEvent(faceIndex, "change", (latest) => {
    const clamped = Math.max(0, Math.min(5, Math.round(latest)));
    setActive(clamped);
  });

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const S = windowWidth < 640 ? 240 : windowWidth < 1024 ? 280 : 340;
  const H = S / 2;

  const go = (i: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const idx = ((i % 6) + 6) % 6;
    const containerRect = container.getBoundingClientRect();
    const absoluteTop = window.scrollY + containerRect.top;
    const scrollableHeight = container.scrollHeight - window.innerHeight;
    const targetScroll = absoluteTop + (idx / 5) * scrollableHeight;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    // Tall outer container — creates the scroll runway
    <div ref={scrollContainerRef} className="relative" style={{ height: "400vh" }}>
      {/* Sticky inner — pins to viewport while user scrolls */}
      <div
        id="services"
        className="sticky top-0 h-screen border-y border-border/30 overflow-hidden flex flex-col justify-center pt-20 lg:pt-24"
        style={{ background: "var(--background)" }}
      >
        {/* ── Background marquee ── */}
        {[-1, 0, 1].map((row) => (
          <div
            key={row}
            className="absolute z-0 overflow-hidden pointer-events-none select-none"
            style={{
              top: `calc(50% + ${row} * clamp(110px, 20vw, 160px))`,
              left: 0,
              right: 0,
              transform: "translateY(-50%)",
            }}
          >
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 + Math.abs(row) * 6 }}
              className="whitespace-nowrap font-mono text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] font-black flex gap-8 md:gap-24"
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

        {/* 3-Column Grid Wrapper */}
        <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-[1fr_auto_1fr] items-center w-full max-w-[100rem] mx-auto px-4 lg:px-12 gap-8 lg:gap-16 pb-12">
          
          {/* ========================================= */}
          {/* LEFT COLUMN: Premium Full-Circle Arc Menu */}
          {/* ========================================= */}
          <div className="hidden lg:flex flex-col justify-center items-start w-full max-w-[360px] relative h-[550px] shrink-0">
            
            {/* The High-Tech Rotary Wheel */}
            <div className="absolute top-1/2 -translate-y-1/2 left-[-600px] w-[700px] h-[700px] pointer-events-none rounded-full flex items-center justify-center shadow-[inset_0_0_120px_rgba(168,85,247,0.05)] bg-gradient-to-r from-transparent via-white/[0.01] to-purple-900/[0.1] border border-white/[0.08] backdrop-blur-[2px]">
              
              {/* Spinning Dial Ticks */}
              <svg viewBox="0 0 700 700" className="w-full h-full absolute inset-0 animate-[spin_90s_linear_infinite] opacity-80">
                <circle cx="350" cy="350" r="348" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2 8" />
                <circle cx="350" cy="350" r="335" fill="none" stroke="rgba(168,85,247,0.4)" strokeWidth="2" strokeDasharray="1 15" />
                <circle cx="350" cy="350" r="320" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" strokeDasharray="2 30" />
              </svg>

              <svg viewBox="0 0 700 700" className="w-full h-full absolute inset-0 animate-[spin_120s_linear_infinite_reverse] opacity-60">
                <circle cx="350" cy="350" r="290" fill="none" stroke="rgba(168,85,247,0.2)" strokeWidth="1" strokeDasharray="4 40" />
              </svg>
            </div>
            
            {/* Mechanical Active Lock/Node */}
            <div className="absolute top-1/2 -translate-y-1/2 left-[96px] w-[6px] h-[32px] bg-purple-400 rounded-full shadow-[0_0_20px_rgba(168,85,247,1)] pointer-events-none border border-white/50" />
            <div className="absolute top-1/2 -translate-y-1/2 left-[60px] w-[80px] h-[100px] bg-purple-500/30 rounded-full blur-2xl pointer-events-none" />

            {/* The Buttons */}
            {services.map((s, idx) => {
              const Icon = s.iconComponent as React.ComponentType<{ className?: string }>;
              const isActive = idx === active;
              
              // Math for the arc (R=350, Right Edge=100)
              const d = idx - active;
              const y = d * 105; 
              const x = -Math.pow(Math.abs(d), 2.1) * 16;
              const opacity = isActive ? 1 : 1 - Math.abs(d) * 0.25;
              const scale = isActive ? 1 : 1 - Math.abs(d) * 0.15;

              return (
                <motion.button
                  key={s.id}
                  onClick={() => go(idx)}
                  animate={{ y, x, opacity, scale }}
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
                  style={{ pointerEvents: Math.abs(d) > 2 ? "none" : "auto" }}
                  className={cn(
                    "group absolute left-[68px] top-1/2 -mt-8 flex items-center h-16 rounded-full transition-[width,background-color,border-color,box-shadow] duration-300 ease-out outline-none text-left border overflow-hidden",
                    isActive
                      ? "bg-gradient-to-r from-purple-900/60 to-purple-900/20 border-purple-400 shadow-[0_0_40px_rgba(168,85,247,0.4)] backdrop-blur-2xl w-[300px] px-6 gap-5 z-20"
                      : "bg-white/[0.03] border-white/10 hover:bg-white/[0.1] hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] w-16 justify-center px-0 gap-0 z-10 cursor-pointer backdrop-blur-md"
                  )}
                >
                  {/* Icon */}
                  <div className={cn(
                    "flex items-center justify-center w-12 h-12 transition-all duration-300 shrink-0",
                    isActive ? "rounded-2xl bg-purple-400/30 text-purple-100 rotate-6 shadow-[inset_0_0_20px_rgba(168,85,247,0.7)]" : "rounded-full bg-transparent text-muted-foreground group-hover:text-white group-hover:scale-110"
                  )}>
                    <Icon className="w-6 h-6 shrink-0" />
                  </div>

                  {/* Text content */}
                  <div className={cn(
                    "flex flex-col whitespace-nowrap transition-all duration-300",
                    isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 w-0"
                  )}>
                    <span className={cn(
                      "font-mono text-sm uppercase tracking-wider font-bold transition-colors duration-300",
                      isActive ? "text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.9)]" : "text-muted-foreground group-hover:text-white"
                    )}>
                      {s.title}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* ========================================= */}
          {/* CENTER COLUMN: 3D Cube */}
          {/* ========================================= */}
          <div className="flex flex-col justify-center items-center shrink-0 perspective-[1200px] relative mt-0">
            {/* ── Section Header (Moved to perfectly hug the cube) ── */}
            <div className="relative z-20 mx-auto text-center max-w-3xl mb-8 md:mb-12 px-4">
              <p className="text-sm sm:text-base font-semibold uppercase tracking-[0.3em] text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                SERVICES
              </p>
            </div>
            
            <motion.div
              animate={{ rotateX: tiltX, rotateY: tiltY }}
              transition={{ type: "spring", stiffness: 100, damping: 30 }}
              className="flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div style={{ transformStyle: "preserve-3d", perspectiveOrigin: "50% 50%" }}>
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.05}
                  onDragEnd={(_, { offset, velocity }) => {
                    if (offset.x < -50 || velocity.x < -300) go(active + 1);
                    else if (offset.x > 50 || velocity.x > 300) go(active - 1);
                  }}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setMobileModalOpen(true);
                    }
                  }}
                  className="cursor-grab active:cursor-grabbing touch-none"
                  style={{
                    width: S,
                    height: S,
                    transformStyle: "preserve-3d",
                  }}
                  animate={{
                    rotateX: ROTATIONS[active].x,
                    rotateY: ROTATIONS[active].y,
                  }}
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
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
                        <CubeFace service={s} index={i} />
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
                    <CubeFace service={services[4]} index={4} />
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
                    <CubeFace service={services[5]} index={5} />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Desktop Counter */}
            <div className="hidden lg:flex absolute -bottom-32 left-1/2 -translate-x-1/2 flex-col items-center gap-1 pointer-events-none">
              <p className="font-mono text-sm tracking-[0.3em] uppercase text-muted-foreground font-semibold">
                <span className="text-white">{String(active + 1).padStart(2, "0")}</span> <span className="opacity-40">/ 06</span>
              </p>
            </div>
          </div>

          {/* ========================================= */}
          {/* RIGHT COLUMN: Detail Panel (Apple Style) */}
          {/* ========================================= */}
          <div className="hidden lg:flex flex-col justify-center items-start w-full max-w-[420px] relative h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20, filter: "blur(10px)", scale: 0.96 }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, x: -20, filter: "blur(10px)", scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex flex-col justify-center p-8 rounded-3xl bg-card/40 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden group"
              >
                {/* Slow animated border gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6 text-center">
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-purple-400 mb-2 font-bold">
                      SERVICE CATEGORY
                    </p>
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
                      {services[active].title}
                    </h2>
                    <p className="text-sm text-purple-200/80 font-mono uppercase tracking-wider font-semibold">
                      {services[active].shortSubtitle}
                    </p>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {services[active].description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {services[active].capabilities?.map((cap, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                        <span className="text-xs text-white/80"><strong className="text-white font-medium">{cap.title}</strong>: {cap.desc}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                    {services[active].tags?.map((tag, i) => (
                      <span key={i} className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 rounded-md text-white/60 transition-all duration-300 hover:-translate-y-0.5 cursor-default">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex justify-center w-full">
                    <Link 
                      to={`/${services[active].slug}`}
                      className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-purple-100 transition-colors group/btn shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                      <span className="text-sm">View Service</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Fallback: Horizontal Scroll Menu instead of Arrow Nav */}
          <div className="flex lg:hidden flex-col gap-6 w-full mt-6 relative z-10 px-2 pb-10">
            
            {/* Horizontal Scroll Menu (Icons Only) */}
            <div className="flex justify-between w-full max-w-[320px] mx-auto py-4 items-center px-1">
              {services.map((s, idx) => {
                const Icon = s.iconComponent as React.ComponentType<{ className?: string }>;
                const isActive = active === idx;
                
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      go(idx);
                      setMobileModalOpen(true);
                    }}
                    className={cn(
                      "flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300",
                      isActive
                        ? "bg-purple-500/40 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.5)] scale-110"
                        : "bg-white/[0.05] border-white/10 hover:bg-white/[0.1]"
                    )}
                  >
                    <Icon className={cn("w-4 h-4 transition-colors duration-300", isActive ? "text-white" : "text-muted-foreground")} />
                  </button>
                );
              })}
            </div>
          </div>
          
        </div>
      </div>

      {/* Mobile Modal Popup for Detail View */}
      <AnimatePresence>
        {mobileModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-black/60 backdrop-blur-sm lg:hidden p-4"
            onClick={() => setMobileModalOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full relative group mb-4"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              {/* Close Handle */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/20 rounded-full cursor-pointer" onClick={() => setMobileModalOpen(false)} />
              
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent opacity-80 rounded-3xl blur-xl pointer-events-none" />
              <div className="relative w-full bg-[#0a0a0a]/95 border border-white/10 rounded-3xl p-6 shadow-[0_-20px_60px_-15px_rgba(168,85,247,0.3),inset_0_0_40px_rgba(255,255,255,0.02)] overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full pointer-events-none" />
                
                <div className="flex justify-between items-start mb-4">
                  <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-purple-400 font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                    {services[active].shortSubtitle}
                  </p>
                  <button onClick={() => setMobileModalOpen(false)} className="text-white/50 hover:text-white p-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-white tracking-tight">{services[active].title}</h3>
                
                <p className="text-sm text-white/70 leading-relaxed mb-6">
                  {services[active].description}
                </p>
                
                <div className="space-y-3 mb-8">
                  {services[active].capabilities?.slice(0, 3).map((cap, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                      <span className="text-sm text-white/80 leading-snug"><strong className="text-white font-semibold">{cap.title}</strong>: {cap.desc}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  to={`/${services[active].slug}`} 
                  onClick={() => setMobileModalOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white text-black text-sm font-bold rounded-xl hover:bg-purple-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  View Full Service <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const FACE_GLOWS = [
  "rgba(168, 85, 247, 0.5)",  // Purple 500
  "rgba(216, 180, 254, 0.4)", // Purple 300 (Whiter)
  "rgba(126, 34, 206, 0.6)",  // Purple 700 (Darker)
  "rgba(233, 213, 255, 0.3)", // Purple 200 (Almost white)
  "rgba(147, 51, 234, 0.5)",  // Purple 600
  "rgba(192, 132, 252, 0.4)", // Purple 400
];

function CubeFace({
  service,
  index = 0,
}: {
  service: ServiceCubeData;
  index?: number;
}) {
  const glow = FACE_GLOWS[index % 6];

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden relative group rounded-3xl"
      style={{
        backgroundColor: "#050505",
        backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 40%), radial-gradient(circle at bottom right, ${glow} 0%, transparent 80%)`,
        border: `1px solid rgba(255,255,255,0.15)`,
        boxShadow: `inset 0 0 60px rgba(0,0,0,0.8), 0 20px 40px -10px rgba(0,0,0,0.7), 0 0 30px ${glow.replace(/[0-9.]+\)$/, "0.15)")}`,
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.25] mix-blend-overlay pointer-events-none rounded-3xl"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)",
        }}
      />
      <div className="absolute inset-4 md:inset-6 pointer-events-none z-10 border border-white/5 rounded-2xl group-hover:border-purple-400/30 transition-colors duration-500 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]" />
      <h3 className="font-mono font-bold tracking-[0.2em] uppercase z-20 text-center mb-auto mt-4 md:mt-12 text-sm md:text-base text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        {service.title}
      </h3>
      <div className="flex-1 flex items-center justify-center z-20 w-full mt-2 md:mt-4">
        {React.createElement(service.iconComponent, {
          className:
            "w-16 h-16 md:w-28 md:h-28 transition-all duration-700 group-hover:scale-105 group-hover:-translate-y-2",
          style: { color: "#ffffff", filter: `drop-shadow(0 0 20px ${glow})` },
        })}
      </div>
      <div className="flex flex-col items-center justify-center h-10 z-20 mb-4 md:mb-10 relative w-full">
        <p className="text-[10px] md:text-[11px] font-mono text-center text-white/40 uppercase tracking-widest transition-opacity duration-500 group-hover:opacity-0 absolute">
          ({service.shortSubtitle})
        </p>
      </div>
    </div>
  );
}
