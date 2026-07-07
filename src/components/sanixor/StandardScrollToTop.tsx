import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StandardScrollToTop() {
  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min(100, Math.max(0, (currentScroll / docHeight) * 100)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const isVisible = scrollY > 200;

  // SVG circle calculations
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-[90] group flex h-14 w-14 items-center justify-center rounded-full transition-all duration-500",
        isVisible
          ? "opacity-100 translate-y-0 shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_8px_40px_rgba(168,85,247,0.4)]"
          : "opacity-0 translate-y-10 pointer-events-none",
      )}
      aria-label="Scroll to top"
    >
      {/* Background blur & base style */}
      <div className="absolute inset-0 rounded-full bg-card/60 backdrop-blur-xl border border-foreground/5 transition-transform duration-300 group-hover:scale-110" />

      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100 group-hover:scale-110" />

      {/* SVG Progress Ring */}
      <svg
        className="absolute inset-0 h-full w-full -rotate-90 transition-transform duration-300 group-hover:scale-110"
        viewBox="0 0 50 50"
      >
        <circle cx="25" cy="25" r={radius} className="fill-none stroke-white/10" strokeWidth="2" />
        <circle
          cx="25"
          cy="25"
          r={radius}
          className="fill-none stroke-primary transition-all duration-150 ease-out"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>

      {/* Arrow Icon */}
      <div className="relative flex items-center justify-center text-foreground/80 transition-all duration-300 group-hover:text-foreground group-hover:-translate-y-1">
        <ArrowUp size={22} strokeWidth={2.5} />
      </div>
    </button>
  );
}
