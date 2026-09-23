import { cn } from "@/lib/utils";

interface ProductHuntEmbedProps {
  className?: string;
  /** Visual theme to match surrounding page accent */
  accentColor?: "emerald" | "cyan" | "purple";
}

/**
 * Embeds the official Product Hunt launch badge for BitBench.
 * Uses the PH embed iframe for upvote widget + a styled card wrapper.
 */
export function ProductHuntEmbed({ className, accentColor = "emerald" }: ProductHuntEmbedProps) {
  const glowMap = {
    emerald: "hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]",
    cyan: "hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]",
    purple: "hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]",
  };

  const borderMap = {
    emerald: "hover:border-emerald-500/30",
    cyan: "hover:border-cyan-500/30",
    purple: "hover:border-primary/30",
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-foreground/[0.08] bg-foreground/[0.02] p-6 backdrop-blur-sm transition-all duration-500",
        glowMap[accentColor],
        borderMap[accentColor],
        className,
      )}
    >
      {/* Subtle top-glow */}
      <div
        className={cn(
          "pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-60 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          accentColor === "emerald" && "bg-emerald-500/10",
          accentColor === "cyan" && "bg-cyan-500/10",
          accentColor === "purple" && "bg-primary/10",
        )}
      />

      <div className="relative flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          <svg viewBox="0 0 26.245 26.256" className="h-4 w-4" fill="currentColor">
            <path d="M26.2 13.1C26.2 5.9 20.3 0 13.1 0S0 5.9 0 13.1s5.9 13.1 13.1 13.1 13.1-5.8 13.1-13.1zM13.1 19.1H9.6l-3.5-6h3.5V7.2h3.5c3.3 0 6 2.7 6 6s-2.7 5.9-6 5.9z" />
          </svg>
          Featured on Product Hunt
        </div>

        <a
          href="https://www.producthunt.com/posts/bitbench-by-sanixor-ai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-bitbench-by-sanixor-ai"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=956498&theme=dark&t=1737564000"
            alt="BitBench by Sanixor AI - AI-powered benchmarking and performance intelligence | Product Hunt"
            width="250"
            height="54"
            className="transition-transform duration-300 hover:scale-105"
          />
        </a>

        <p className="max-w-xs text-xs leading-relaxed text-muted-foreground/70">
          Upvote us on Product Hunt — help us reach more developers and teams.
        </p>
      </div>
    </div>
  );
}
