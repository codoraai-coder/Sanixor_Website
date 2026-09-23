import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/sanixor/ScrollReveal";
import { Footer } from "@/components/sanixor/Footer";
import { Navbar } from "@/components/sanixor/Navbar";
import { Counter } from "@/components/sanixor/Counter";
import { TrustBadges } from "@/components/sanixor/TrustBadges";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookDemoModal } from "@/components/sanixor/BookDemoModal";
import { usePageMeta } from "@/hooks/usePageMeta";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Cpu,
  FileCheck,
  Gauge,
  GitBranch,
  Layers,
  LayoutDashboard,
  ShieldAlert,
  Signal,
  Terminal,
  TrendingUp,
  Upload,
  Users,
  Zap,
  Trophy,
  BarChart3,
  Bot,
} from "lucide-react";

/* ─────────────────────────────── DATA ─────────────────────────────── */

const features = [
  {
    icon: Bot,
    title: "Multi-Agent AI Evaluation",
    desc: "Specialized AI agents collaboratively assess code quality, originality, and architectural decisions across multiple judging criteria — in parallel, not sequentially.",
    visual: "agent-network",
  },
  {
    icon: ShieldAlert,
    title: "Bias-Free Scoring",
    desc: "Objective and consistent scoring framework that eliminates human error and unconscious bias. Every project gets the same rigorous, standardized evaluation.",
    visual: "shield",
  },
  {
    icon: Users,
    title: "Automated Judge Allocation",
    desc: "Intelligently assigns expert agents based on project tech-stacks and complexity. No manual judge scheduling, no bottlenecks.",
    visual: "allocation",
  },
  {
    icon: TrendingUp,
    title: "Live Leaderboards",
    desc: "Real-time ranking updates and instant feedback for participants. Scores update as agents complete each evaluation cycle.",
    visual: "leaderboard",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    desc: "Deep insights into overall performance, common bugs, trending technologies, and submission patterns — all in one analytics dashboard.",
    visual: "analytics",
  },
  {
    icon: Layers,
    title: "Scalable Event Management",
    desc: "Handle thousands of concurrent submissions without degradation in judging speed. Built for hackathons with 50 teams or 5,000.",
    visual: "scale",
  },
];

const stats = [
  { value: 500, suffix: "+", label: "Projects Evaluated", icon: FileCheck },
  { value: 98, suffix: "%", label: "Evaluation Accuracy", icon: Gauge },
  { value: 72, suffix: "%", label: "Time Saved vs Manual", icon: Zap },
  { value: 15, suffix: "+", label: "Hackathons Powered", icon: Trophy },
];

const steps = [
  {
    num: "01",
    icon: Upload,
    title: "Submit Projects",
    desc: "Teams upload their projects with repositories, documentation, and demo links through a simple portal.",
  },
  {
    num: "02",
    icon: Cpu,
    title: "AI Agent Assignment",
    desc: "Specialized AI agents are automatically assigned based on the project's tech stack and evaluation criteria.",
  },
  {
    num: "03",
    icon: Signal,
    title: "Multi-Criteria Scoring",
    desc: "Agents evaluate code quality, innovation, impact, and presentation independently — then cross-validate.",
  },
  {
    num: "04",
    icon: TrendingUp,
    title: "Results & Rankings",
    desc: "Aggregated scores generate live leaderboards and detailed performance reports with actionable feedback.",
  },
];

const integrations = [
  "GitHub",
  "GitLab",
  "Devfolio",
  "Bitbucket",
  "VS Code",
  "Devpost",
  "HackerEarth",
  "Unstop",
];

const useCases = [
  "Universities & Colleges",
  "Innovation Cells",
  "Startup Incubators",
  "Corporate Innovation Labs",
  "Government Challenges",
  "Tech Conferences",
  "Open Source Events",
  "Inter-College Fests",
];

/* ─────────────────────────────── PAGE ─────────────────────────────── */

export default function HackEval() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<"BitBench" | "Hackathon Evaluation">(
    "Hackathon Evaluation",
  );

  usePageMeta(
    "HackEval — AI-Powered Hackathon Evaluation | Sanixor AI",
    "HackEval automates hackathon judging with multi-agent AI — delivering bias-free, consistent evaluation at scale. Live leaderboards, real-time analytics, and instant feedback.",
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <Navbar />

      {/* ══════════════════════ SECTION 1 — HERO ══════════════════════ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-28 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.18)_0%,rgba(14,116,144,0.06)_40%,transparent_70%)] blur-[80px]" />
        <div className="pointer-events-none absolute bottom-1/4 right-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08)_0%,transparent_70%)] blur-[60px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex max-w-6xl flex-col items-center text-center"
        >
          {/* "Now Live" badge */}
          <Badge className="mb-8 gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-xs font-semibold text-cyan-400 backdrop-blur-md hover:border-cyan-500/50 hover:bg-cyan-500/15 hover:shadow-[0_8px_24px_rgba(6,182,212,0.2)] transition-all duration-300">
            <div className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </div>
            Now Live — AI-Powered Judging
          </Badge>

          {/* Title */}
          <h1 className="max-w-5xl text-center flex flex-col items-center leading-[0.85] tracking-tight mb-8">
            <span className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[9rem] font-extrabold pb-0">
              <span className="text-white">Hack</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 to-blue-600">
                Eval
              </span>
            </span>
            <span className="text-lg md:text-xl text-muted-foreground font-medium lowercase tracking-normal mt-3 mb-0">
              by
            </span>
            <span className="text-4xl md:text-6xl lg:text-[4rem] font-extrabold mt-1">
              <span className="text-white">Sanixor</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 to-blue-600">
                AI
              </span>
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl text-center">
            The multi-agent AI platform that automates hackathon evaluation — from project
            assessment to score aggregation — delivering fair, consistent results in minutes, not
            days.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="h-12 gap-2 rounded-xl px-8 font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all hover:shadow-[0_0_50px_rgba(6,182,212,0.4)] border-0"
            >
              <a href="#features">
                Explore Features <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 gap-2 rounded-xl border-foreground/10 bg-foreground/5 px-8 font-semibold text-foreground backdrop-blur-md hover:bg-foreground/10 hover:border-foreground/20 transition-all"
              onClick={() => {
                setSelectedProduct("Hackathon Evaluation");
                setIsDemoModalOpen(true);
              }}
            >
              Book a Demo <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* ── Terminal Mockup ── */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mt-16 w-full max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-cyan-500/[0.12] bg-background/90 backdrop-blur-xl shadow-[0_0_60px_rgba(6,182,212,0.08)]">
            <div className="flex items-center gap-2 border-b border-foreground/[0.06] px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/60" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
              <span className="h-3 w-3 rounded-full bg-green-500/60" />
              <span className="ml-3 text-xs text-foreground/30 font-mono">
                hackeval evaluation pipeline
              </span>
            </div>
            <div className="p-6 space-y-3 font-mono text-sm">
              <div className="flex items-center gap-3 text-cyan-400/80">
                <span className="text-foreground/30 select-none">~</span>
                <span className="text-foreground/50">$</span>
                <span>hackeval run --project stellar-falcon --stage scoring</span>
              </div>
              <div className="text-foreground/40 pl-7 leading-relaxed">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {"[Agent:CodeReview]"} {"  "}Analyzing repository structure...{" "}
                  <span className="text-cyan-400/70">OK</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  {"[Agent:Innovation]"} Evaluating technical novelty...{" "}
                  <span className="text-cyan-400/70">OK</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  {"[Agent:Impact]"} {"   "}Assessing real-world applicability...{" "}
                  <span className="text-cyan-400/70">OK</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                >
                  {"[Aggregator]"} {"   "}Computing weighted scores...{" "}
                  <span className="text-yellow-400/70">...</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                  className="text-cyan-400/80 pt-2"
                >
                  {"✓"} Final Score: <span className="text-foreground font-bold">92.4 / 100</span> —
                  Rank <span className="text-foreground font-bold">#2</span> of 148
                </motion.div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </section>

      {/* ══════════════ SECTION 2 — PRODUCT SCREENSHOT PREVIEW ══════════════ */}
      <ScrollReveal>
        <section className="relative z-10 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
                Dashboard Preview
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                See evaluations unfold in real time.
              </h2>
            </div>

            {/* Tilted dashboard mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto max-w-5xl"
            >
              <div className="relative rounded-2xl border border-cyan-500/[0.15] bg-foreground/[0.02] p-1 shadow-[0_0_80px_rgba(6,182,212,0.06)] backdrop-blur-sm overflow-hidden">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 border-b border-foreground/[0.06] bg-foreground/[0.03] px-4 py-2.5 rounded-t-xl">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
                  <div className="ml-3 flex-1 flex items-center justify-center">
                    <div className="rounded-md bg-foreground/[0.05] px-4 py-1 text-[10px] text-foreground/30 font-mono">
                      app.hackeval.ai/dashboard
                    </div>
                  </div>
                </div>

                {/* Dashboard grid mockup */}
                <div className="p-6 md:p-8 space-y-6 bg-background/50">
                  {/* Top stats row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Active Evaluations", val: "23", accent: "text-cyan-400" },
                      { label: "Completed", val: "147", accent: "text-green-400" },
                      { label: "Avg Score", val: "78.4", accent: "text-yellow-400" },
                      { label: "Teams Online", val: "89", accent: "text-blue-400" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="rounded-xl border border-foreground/[0.06] bg-foreground/[0.02] p-4"
                      >
                        <div className={`text-2xl font-bold ${s.accent}`}>{s.val}</div>
                        <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Main area — leaderboard mockup */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 rounded-xl border border-foreground/[0.06] bg-foreground/[0.02] p-5">
                      <div className="text-xs text-muted-foreground mb-4 flex items-center gap-2">
                        <LayoutDashboard className="h-3.5 w-3.5" /> Live Leaderboard
                      </div>
                      <div className="space-y-3">
                        {[
                          { rank: "#1", name: "Team Nexus", score: "94.2", bar: "94%" },
                          { rank: "#2", name: "Stellar Falcon", score: "92.4", bar: "92%" },
                          { rank: "#3", name: "CodeCraft", score: "89.7", bar: "89%" },
                          { rank: "#4", name: "AI Pioneers", score: "87.1", bar: "87%" },
                          { rank: "#5", name: "DevStorm", score: "85.3", bar: "85%" },
                        ].map((t) => (
                          <div key={t.rank} className="flex items-center gap-3 text-sm">
                            <span className="text-cyan-400/70 font-mono w-6 text-right text-xs">
                              {t.rank}
                            </span>
                            <span className="flex-1 text-foreground/80">{t.name}</span>
                            <div className="hidden sm:block w-32 h-1.5 rounded-full bg-foreground/[0.06] overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                                style={{ width: t.bar }}
                              />
                            </div>
                            <span className="font-mono text-foreground/60 text-xs w-10 text-right">
                              {t.score}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-xl border border-foreground/[0.06] bg-foreground/[0.02] p-5">
                      <div className="text-xs text-muted-foreground mb-4 flex items-center gap-2">
                        <Signal className="h-3.5 w-3.5" /> Agent Activity
                      </div>
                      <div className="space-y-3">
                        {[
                          { agent: "CodeReview", status: "Scoring", color: "bg-cyan-400" },
                          { agent: "Innovation", status: "Analyzing", color: "bg-blue-400" },
                          { agent: "Impact", status: "Completed", color: "bg-green-400" },
                          { agent: "UX/Design", status: "Queued", color: "bg-yellow-400" },
                        ].map((a) => (
                          <div key={a.agent} className="flex items-center gap-2 text-xs">
                            <div className={`h-1.5 w-1.5 rounded-full ${a.color}`} />
                            <span className="text-foreground/70 flex-1 font-mono">{a.agent}</span>
                            <span className="text-muted-foreground">{a.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      {/* ══════════════ SECTION 3 — PROBLEM → SOLUTION ══════════════ */}
      <ScrollReveal delay={100}>
        <section className="relative z-10 border-y border-foreground/[0.06] bg-foreground/[0.015] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="glass rounded-3xl p-10 border-l-4 border-l-red-500/60"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                  <ShieldAlert className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Without HackEval</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400/60 flex-shrink-0" />
                    Manual judging takes days with inconsistent criteria
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400/60 flex-shrink-0" />
                    Human bias leads to unfair evaluations and disputes
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400/60 flex-shrink-0" />
                    Results are delayed — participants lose interest
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400/60 flex-shrink-0" />
                    No detailed feedback beyond a final score
                  </li>
                </ul>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                className="glass rounded-3xl p-10 border-l-4 border-l-cyan-500/60"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
                  <CheckCircle2 className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">With HackEval</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    AI agents evaluate projects in minutes, not days
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    Objective, reproducible scoring across all submissions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    Live leaderboards keep the energy high throughout
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    Rich, actionable feedback on every criterion
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ══════════════ SECTION 4 — STATS + TRUST SIGNALS ══════════════ */}
      <ScrollReveal>
        <section className="relative z-10 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
              {stats.map(({ value, suffix, label, icon: Icon }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-foreground/[0.06] bg-foreground/[0.02] p-8 backdrop-blur-sm text-center hover:border-cyan-500/20 transition-all duration-300 hover:shadow-[0_0_24px_rgba(6,182,212,0.08)]"
                >
                  <Icon className="h-6 w-6 text-cyan-400/60" />
                  <div className="text-4xl font-extrabold text-foreground">
                    <Counter value={value} suffix={suffix} />
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">{label}</span>
                </motion.div>
              ))}
            </div>

            {/* Trust badges */}
            <TrustBadges badges={["msme"]} accentColor="cyan" />
          </div>
        </section>
      </ScrollReveal>

      {/* ══════════════ SECTION 5 — KEY FEATURES (alternating) ══════════════ */}
      <ScrollReveal>
        <section
          id="features"
          className="relative z-10 border-y border-foreground/[0.06] bg-foreground/[0.015] py-20 md:py-28"
        >
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
                Capabilities
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                Everything you need to evaluate at scale.
              </h2>
            </div>

            <div className="space-y-16 md:space-y-24">
              {features.map((feat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-col gap-8 md:gap-12 items-center ${
                    idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Text side */}
                  <div className="flex-1 space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                      <feat.icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{feat.title}</h3>
                    <p className="text-lg leading-relaxed text-muted-foreground">{feat.desc}</p>
                  </div>

                  {/* Visual side — abstract graphic */}
                  <div className="flex-1 flex items-center justify-center">
                    <div className="relative w-full max-w-sm aspect-square rounded-3xl border border-foreground/[0.06] bg-foreground/[0.02] overflow-hidden">
                      {/* Decorative grid */}
                      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
                      {/* Floating accent */}
                      <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 rounded-full blur-3xl"
                        style={{
                          background: `radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)`,
                        }}
                      />
                      {/* Icon center */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-20 w-20 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/10">
                          <feat.icon className="h-10 w-10 text-cyan-400/60" strokeWidth={1} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ══════════════ SECTION 6 — HOW IT WORKS (vertical timeline) ══════════════ */}
      <ScrollReveal>
        <section className="relative z-10 py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
                Process
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">How It Works</h2>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/40 via-cyan-500/20 to-transparent md:-translate-x-px" />

              <div className="space-y-12 md:space-y-16">
                {steps.map(({ num, icon: Icon, title, desc }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className={`relative flex items-start gap-6 md:gap-0 ${
                      i % 2 === 0
                        ? "md:flex-row md:pr-[calc(50%+2rem)]"
                        : "md:flex-row-reverse md:pl-[calc(50%+2rem)]"
                    }`}
                  >
                    {/* Node dot */}
                    <div className="absolute left-8 md:left-1/2 top-2 -translate-x-1/2 z-10">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-cyan-500/30 bg-background shadow-[0_0_16px_rgba(6,182,212,0.15)]">
                        <Icon className="h-4 w-4 text-cyan-400" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="ml-16 md:ml-0 flex-1">
                      <div
                        className={`rounded-2xl border border-foreground/[0.06] bg-foreground/[0.02] p-6 backdrop-blur-sm ${
                          i % 2 === 0 ? "md:text-right" : "md:text-left"
                        }`}
                      >
                        <span className="text-xs font-bold tracking-widest text-cyan-400/40">
                          STEP {num}
                        </span>
                        <h4 className="mt-2 text-lg font-semibold text-foreground">{title}</h4>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ══════════════ SECTION 7 — INTEGRATIONS + USE CASES ══════════════ */}
      <ScrollReveal>
        <section className="relative z-10 border-y border-foreground/[0.06] bg-foreground/[0.015] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            {/* Integrations */}
            <div className="mb-20">
              <div className="mx-auto mb-12 max-w-2xl text-center">
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
                  Integrations
                </p>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Works with your stack.
                </h2>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {integrations.map((name, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="flex items-center gap-2 rounded-full border border-foreground/[0.08] bg-foreground/[0.03] px-5 py-3 text-sm font-medium text-foreground backdrop-blur-sm hover:border-cyan-500/20 hover:bg-cyan-500/5 hover:text-cyan-300 transition-all duration-300"
                  >
                    <GitBranch className="h-3.5 w-3.5 text-cyan-400/50" />
                    {name}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Who It's For */}
            <div>
              <div className="mx-auto mb-12 max-w-2xl text-center">
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
                  Who It's For
                </p>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Built for every hackathon at scale.
                </h2>
                <p className="mt-4 text-muted-foreground text-lg">
                  Trusted by organizations of every size to deliver fair, fast, and transparent
                  judging.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {useCases.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                  >
                    <div className="flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-5 py-3 text-sm font-medium text-foreground backdrop-blur-sm hover:border-cyan-500/30 hover:bg-cyan-500/5 hover:text-cyan-300 transition-all duration-300 cursor-default">
                      <div className="h-1.5 w-1.5 rounded-full bg-cyan-400/60" />
                      {item}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ══════════════ SECTION 8 — CTA ══════════════ */}
      <ScrollReveal>
        <section className="relative z-10 py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-cyan-500/[0.12] bg-foreground/[0.02] p-12 md:p-16 text-center backdrop-blur-sm">
              {/* Glow effects */}
              <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-60 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 right-1/4 h-40 w-60 rounded-full bg-blue-500/8 blur-3xl" />

              <div className="relative">
                <h2 className="text-3xl font-bold md:text-4xl mb-4">
                  Ready to automate your next hackathon?
                </h2>
                <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-8">
                  Stop spending days on manual evaluation. HackEval delivers fair, AI-powered
                  results in minutes.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    size="lg"
                    className="h-12 gap-2 rounded-xl px-8 font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all hover:shadow-[0_0_50px_rgba(6,182,212,0.4)] border-0"
                    onClick={() => {
                      setSelectedProduct("Hackathon Evaluation");
                      setIsDemoModalOpen(true);
                    }}
                  >
                    Book a Demo <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-12 gap-2 rounded-xl border-foreground/10 bg-foreground/5 px-8 font-semibold text-foreground backdrop-blur-md hover:bg-foreground/10 hover:border-foreground/20 transition-all"
                  >
                    <a href="/contact">
                      Talk to our team <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <BookDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        productType={selectedProduct}
      />
      <Footer />
    </div>
  );
}
