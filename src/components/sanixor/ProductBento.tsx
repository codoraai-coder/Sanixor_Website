import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, BarChart2, BookOpen, Check, Layers, Scale, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BentoGridShowcase } from "@/components/ui/bento-product-features";
import { cn } from "@/lib/utils";

function ProductCard({
  icon: Icon,
  title,
  description,
  features,
  cta,
  highlight,
  accent = "primary",
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  features?: string[];
  cta?: string;
  highlight?: string;
  accent?: "primary" | "cyan" | "amber" | "green" | "coral";
  className?: string;
}) {
  const accentMap = {
    primary: "bg-primary/10 text-primary border-primary/20",
    cyan: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    coral: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };

  return (
    <Card
      className={cn(
        "group flex h-full flex-col border-border/50 bg-card/40 backdrop-blur-xl transition-all duration-300",
        "hover:border-primary/30 hover:shadow-glow",
        className,
      )}
    >
      <CardHeader>
        <div className="mb-3 flex items-start justify-between">
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl border",
              accentMap[accent],
            )}
          >
            <Icon className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
            Live
          </Badge>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
      </CardHeader>
      {features && features.length > 0 && (
        <CardContent className="flex-1">
          <ul className="space-y-2">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      )}
      {(highlight || cta) && (
        <CardFooter className="mt-auto flex flex-col items-start gap-3">
          {highlight && (
            <div className="w-full rounded-lg border border-primary/15 bg-primary/5 px-3 py-2">
              <p className="text-xs font-semibold text-primary">{highlight}</p>
            </div>
          )}
          {cta && (
            <Button
              variant="ghost"
              size="sm"
              className="group/btn px-0 text-primary hover:bg-transparent"
              asChild
            >
              <a href="#">
                {cta}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}

export function ProductBento() {
  return (
    <BentoGridShowcase
      integration={
        <ProductCard
          icon={Trophy}
          title="HackEval"
          description="The only agent-powered hackathon evaluation platform. Judges PPT decks with 5%+ accuracy improvement and dissects GitHub repositories end-to-end with 95%+ code analysis precision."
          features={[
            "Agent-based PPT evaluator with rubric intelligence",
            "GitHub Agent — code analysis & quality scoring",
            "Automated leaderboard & judge panel",
          ]}
          cta="Learn more"
          highlight="95%+ Code Analysis Accuracy"
          className="h-full"
        />
      }
      trackers={
        <ProductCard
          icon={BarChart2}
          title="BitBench"
          description="Your complete developer progress dashboard. GitHub and LeetCode unified into one score."
          accent="cyan"
          cta="View Dashboard"
          highlight="Track Your Progress"
        />
      }
      statistic={
        <Card className="relative h-full overflow-hidden border-border/50 bg-card/40 backdrop-blur-xl">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <CardContent className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center">
            <span className="text-6xl font-bold text-gradient md:text-7xl">95%+</span>
            <p className="mt-2 text-sm text-muted-foreground">Analysis accuracy across agents</p>
          </CardContent>
        </Card>
      }
      focus={
        <ProductCard
          icon={BookOpen}
          title="Sanixor Studio — Story"
          description="One prompt. A fully generated story with characters, arc, and world-building."
          accent="amber"
          cta="Create a story"
        />
      }
      productivity={
        <ProductCard
          icon={Scale}
          title="LexAI"
          description="Constitutional AI for legal professionals — GST, criminal law, and citation-aware research."
          accent="coral"
          cta="Explore LexAI"
        />
      }
      shortcuts={
        <ProductCard
          icon={Layers}
          title="Sanixor Studio — Image"
          description="Bi-directional image intelligence. Image to prompt, prompt to image, and AI vs real detection — all in one agent."
          accent="green"
          features={[
            "Image to Prompt reverse engineering",
            "Prompt to Image generation",
            "AI vs Real image detection",
          ]}
          cta="Try Studio Image"
        />
      }
    />
  );
}
