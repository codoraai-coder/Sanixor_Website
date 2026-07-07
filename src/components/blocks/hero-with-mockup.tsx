import { ArrowUpRight, Bot, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Glow } from "@/components/ui/glow";
import { Mockup } from "@/components/ui/mockup";
import { AgentDashboardMock } from "@/components/sanixor/AgentDashboardMock";

interface HeroWithMockupProps {
  className?: string;
}

export function HeroWithMockup({ className }: HeroWithMockupProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-background text-foreground",
        "px-4 pb-16 pt-28 md:pb-24 md:pt-36 lg:pb-32",
        className,
      )}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
      <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-primary/25 blur-3xl animate-float-orbit" />
      <div className="absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-primary-glow/20 blur-3xl animate-pulse-glow" />

      <div className="relative mx-auto flex max-w-[1280px] flex-col gap-12 lg:gap-20">
        <div className="relative z-10 flex flex-col items-center gap-6 text-center lg:gap-10">
          <div
            className={cn(
              "inline-flex animate-appear items-center gap-2 rounded-full border border-primary/20",
              "bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm",
            )}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Agent-First AI Platform
            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
              2025
            </span>
          </div>

          <h1
            className={cn(
              "animate-appear max-w-4xl opacity-0 [animation-delay:100ms]",
              "bg-gradient-to-b from-foreground via-foreground/90 to-muted-foreground",
              "bg-clip-text text-4xl font-bold leading-[1.08] tracking-tight text-transparent",
              "sm:text-5xl md:text-6xl lg:text-7xl",
            )}
          >
            Intelligence
            <br />
            <span className="text-gradient">Built to Deploy.</span>
          </h1>

          <p
            className={cn(
              "animate-appear max-w-[580px] opacity-0 [animation-delay:200ms]",
              "text-base font-medium text-muted-foreground sm:text-lg md:text-xl",
            )}
          >
            From code analysis to legal research — Sanixor AI builds production-grade AI agents that
            actually work, for students, developers, and institutions.
          </p>

          <div
            className={cn(
              "animate-appear flex flex-wrap justify-center gap-4 opacity-0 [animation-delay:300ms]",
            )}
          >
            <Button
              asChild
              size="lg"
              className="rounded-full bg-gradient-to-r from-secondary via-primary to-primary-glow px-8 shadow-glow transition-all hover:scale-[1.02] hover:shadow-xl"
            >
              <a href="#products">
                Explore Products
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-border/60 bg-background/50 px-8 backdrop-blur-sm transition-all hover:bg-accent/50"
            >
              <a href="#event">
                AgentVerse 2.0
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div
            className={cn(
              "animate-appear grid w-full max-w-2xl grid-cols-3 gap-6 opacity-0 [animation-delay:400ms]",
              "border-t border-border/40 pt-8",
            )}
          >
            {[
              { value: "95%+", label: "Code Analysis Accuracy" },
              { value: "6", label: "AI Agent Products" },
              { value: "Real", label: "No Fake Promises" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-gradient md:text-3xl">{stat.value}</div>
                <div className="mt-1 text-xs text-muted-foreground md:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="relative w-full max-w-4xl pt-8">
            <Mockup
              className={cn(
                "animate-appear mx-auto w-full opacity-0 [animation-delay:600ms]",
                "border-primary/15 shadow-[0_0_60px_-12px_oklch(0.45_0.16_295/0.4)]",
              )}
            >
              <div className="flex w-full items-center gap-2 border-b border-border/40 bg-card/80 px-4 py-3 backdrop-blur-xl">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-primary/50" />
                  <span className="h-2.5 w-2.5 rounded-full bg-primary-glow/50" />
                </div>
                <div className="flex flex-1 items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Bot className="h-3.5 w-3.5 text-primary" />
                  sanixor.space — agent console
                </div>
              </div>
              <AgentDashboardMock />
            </Mockup>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Glow variant="above" className="animate-appear-zoom opacity-0 [animation-delay:800ms]" />
      </div>
    </section>
  );
}
