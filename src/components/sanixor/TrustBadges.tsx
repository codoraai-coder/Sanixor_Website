import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ShieldCheck, Award } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TrustBadge {
  icon: LucideIcon;
  label: string;
  sublabel: string;
}

const MSME_BADGE: TrustBadge = {
  icon: ShieldCheck,
  label: "MSME Registered",
  sublabel: "Government of India",
};

const PRODUCT_HUNT_BADGE: TrustBadge = {
  icon: Award,
  label: "Launched on Product Hunt",
  sublabel: "Community Validated",
};

interface TrustBadgesProps {
  className?: string;
  /** Which badges to show */
  badges?: ("msme" | "producthunt")[];
  /** Accent color for glows */
  accentColor?: "emerald" | "cyan" | "purple";
}

const badgeMap: Record<string, TrustBadge> = {
  msme: MSME_BADGE,
  producthunt: PRODUCT_HUNT_BADGE,
};

const accentStyles = {
  emerald: {
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    hoverBorder: "hover:border-emerald-500/20",
    hoverGlow: "hover:shadow-[0_0_24px_rgba(16,185,129,0.1)]",
  },
  cyan: {
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    hoverBorder: "hover:border-cyan-500/20",
    hoverGlow: "hover:shadow-[0_0_24px_rgba(6,182,212,0.1)]",
  },
  purple: {
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    hoverBorder: "hover:border-primary/20",
    hoverGlow: "hover:shadow-[0_0_24px_rgba(139,92,246,0.1)]",
  },
};

/**
 * Horizontal strip of credibility/trust signals.
 * Displays MSME registration and/or Product Hunt badges.
 */
export function TrustBadges({
  className,
  badges = ["msme"],
  accentColor = "purple",
}: TrustBadgesProps) {
  const styles = accentStyles[accentColor];
  const activeBadges = badges.map((key) => badgeMap[key]).filter(Boolean);

  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-4", className)}>
      {activeBadges.map((badge, i) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className={cn(
            "flex items-center gap-3 rounded-2xl border border-foreground/[0.06] bg-foreground/[0.02] px-6 py-4 backdrop-blur-sm transition-all duration-300",
            styles.hoverBorder,
            styles.hoverGlow,
          )}
        >
          <div
            className={cn("flex h-10 w-10 items-center justify-center rounded-xl", styles.iconBg)}
          >
            <badge.icon className={cn("h-5 w-5", styles.iconColor)} strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">{badge.label}</span>
            <span className="text-xs text-muted-foreground">{badge.sublabel}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
