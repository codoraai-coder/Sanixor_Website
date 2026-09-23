import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/sanixor/ScrollReveal";
import { Footer } from "@/components/sanixor/Footer";
import { Navbar } from "@/components/sanixor/Navbar";
import { Counter } from "@/components/sanixor/Counter";
import { TrustBadges } from "@/components/sanixor/TrustBadges";
import { ProductHuntEmbed } from "@/components/sanixor/ProductHuntEmbed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookDemoModal } from "@/components/sanixor/BookDemoModal";
import { usePageMeta } from "@/hooks/usePageMeta";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart4,
  CheckCircle2,
  Cpu,
  Gauge,
  Layers,
  LineChart,
  Server,
  ShieldAlert,
  Zap,
  GitBranch,
  Beaker,
  Database,
  Cloud,
  Rocket,
  Building2,
  FlaskConical,
} from "lucide-react";

/* ─────────────────────────────── DATA ─────────────────────────────── */

const features = [
  {
    icon: Gauge,
    title: "AI Model Benchmarking",
    desc: "Rigorously test LLMs and specialized models across diverse prompts, contexts, and edge cases with standardized scoring.",
    size: "lg" as const,
  },
  {
    icon: Server,
    title: "Infrastructure Scoring",
    desc: "Measure latency, throughput, and resource utilization across your deployment environments.",
    size: "sm" as const,
  },
  {
    icon: LineChart,
    title: "Comparative Analytics",
    desc: "Compare models and cloud providers side-by-side to make data-driven architecture choices.",
    size: "sm" as const,
  },
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    desc: "Track model degradation and infrastructure health continuously as your user base scales.",
    size: "sm" as const,
  },
  {
    icon: Layers,
    title: "Visual Dashboards",
    desc: "Interactive real-time visualizations that make complex performance metrics accessible to all stakeholders.",
    size: "lg" as const,
  },
  {
    icon: BarChart4,
    title: "Automated Reporting",
    desc: "Generate performance reports summarizing benchmarks for leadership and compliance review — on schedule.",
    size: "sm" as const,
  },
];

const stats = [
  { value: 12000, suffix: "+", label: "Benchmarks Run", icon: BarChart4 },
  { value: 99, suffix: ".7%", label: "Uptime SLA", icon: ShieldAlert },
  { value: 40, suffix: "ms", label: "Avg Latency Tracked", icon: Zap },
  { value: 50, suffix: "+", label: "Models Benchmarked", icon: Cpu },
];

const pipelineSteps = [
  {
    icon: Database,
    title: "Connect Stack",
    desc: "Link your models, APIs, and infrastructure endpoints.",
  },
  {
    icon: Beaker,
    title: "Define Benchmarks",
    desc: "Choose standardized metrics or create custom criteria.",
  },
  {
    icon: Activity,
    title: "Run & Monitor",
    desc: "Execute with real-time progress tracking and live feeds.",
  },
  {
    icon: BarChart4,
    title: "Analyze & Optimize",
    desc: "Review insights, identify bottlenecks, and improve.",
  },
];

const useCaseTabs = [
  {
    id: "startups",
    label: "AI Startups",
    icon: Rocket,
    scenarios: [
      "Compare foundation models before committing to an API provider",
      "Benchmark custom fine-tuned models against base models",
      "Track inference costs per request across providers",
      "Generate investor-ready performance reports",
    ],
  },
  {
    id: "enterprise",
    label: "Enterprise",
    icon: Building2,
    scenarios: [
      "Audit AI model performance for compliance and governance",
      "Compare deployment environments (cloud vs edge vs on-prem)",
      "Monitor model degradation over time in production",
      "Evaluate vendor proposals with standardized benchmarks",
    ],
  },
  {
    id: "research",
    label: "Research",
    icon: FlaskConical,
    scenarios: [
      "Reproduce and validate benchmark results across institutions",
      "Compare novel architectures against established baselines",
      "Generate publication-ready performance visualizations",
      "Track experiment reproducibility across hardware",
    ],
  },
];

const integrations = [
  "OpenAI",
  "Anthropic",
  "Google AI",
  "HuggingFace",
  "AWS",
  "Azure",
  "GCP",
  "Ollama",
];

/* ─────────────────────────────── PAGE ─────────────────────────────── */

export default function BitBench() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<"BitBench" | "Hackathon Evaluation">(
    "BitBench",
  );
  const [activeTab, setActiveTab] = useState("startups");

  usePageMeta(
    "BitBench — AI Model Benchmarking & Performance Intelligence | Sanixor AI",
    "BitBench benchmarks AI models, applications, and infrastructure with standardized metrics. Comparative analytics, real-time monitoring, and automated reporting — launched on Product Hunt.",
  );

  const activeUseCase = useCaseTabs.find((t) => t.id === activeTab)!;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <Navbar />

      {/* ══════════════════════ SECTION 1 — HERO ══════════════════════ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-28 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.18)_0%,rgba(5,150,105,0.06)_40%,transparent_70%)] blur-[80px]" />
        <div className="pointer-events-none absolute bottom-1/4 left-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08)_0%,transparent_70%)] blur-[60px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex max-w-6xl flex-col items-center text-center"
        >
          {/* Badge */}
          <Badge className="mb-8 gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 text-xs font-semibold text-emerald-400 backdrop-blur-md hover:border-emerald-500/50 hover:bg-emerald-500/15 hover:shadow-[0_8px_24px_rgba(16,185,129,0.2)] transition-all duration-300">
            <Activity className="h-3.5 w-3.5" /> Performance Intelligence
          </Badge>

          {/* Title */}
          <h1 className="max-w-5xl text-center flex flex-col items-center leading-[0.85] tracking-tight mb-8">
            <span className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[9rem] font-extrabold pb-0">
              <span className="text-white">Bit</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-emerald-400 to-emerald-700">
                Bench
              </span>
            </span>
            <span className="text-lg md:text-xl text-muted-foreground font-medium lowercase tracking-normal mt-3 mb-0">
              by
            </span>
            <span className="text-4xl md:text-6xl lg:text-[4rem] font-extrabold mt-1">
              <span className="text-white">Sanixor</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-emerald-400 to-emerald-700">
                AI
              </span>
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl text-center">
            The AI benchmarking platform that standardizes testing, automates performance
            evaluation, and generates actionable insights across your entire model and
            infrastructure stack.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="h-12 gap-2 rounded-xl px-8 font-semibold bg-gradient-to-r from-emerald-500 to-emerald-700 text-white hover:from-emerald-400 hover:to-emerald-600 shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all hover:shadow-[0_0_50px_rgba(16,185,129,0.4)] border-0"
            >
              <a href="#features">
                See The Analytics <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 gap-2 rounded-xl border-foreground/10 bg-foreground/5 px-8 font-semibold text-foreground backdrop-blur-md hover:bg-foreground/10 hover:border-foreground/20 transition-all"
              onClick={() => {
                setSelectedProduct("BitBench");
                setIsDemoModalOpen(true);
              }}
            >
              Book a Demo <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* ── Terminal Visualization ── */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mt-16 w-full max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-emerald-500/[0.12] bg-background/90 backdrop-blur-xl shadow-[0_0_60px_rgba(16,185,129,0.08)]">
            <div className="flex items-center gap-2 border-b border-foreground/[0.06] px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/60" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
              <span className="h-3 w-3 rounded-full bg-green-500/60" />
              <span className="ml-3 text-xs text-foreground/30 font-mono">
                bitbench --run benchmark-suite
              </span>
            </div>
            <div className="p-6 space-y-3 font-mono text-sm">
              <div className="flex items-center gap-3 text-emerald-400/80">
                <span className="text-foreground/30 select-none">~</span>
                <span className="text-foreground/50">$</span>
                <span>bitbench run --suite full --models gpt-4o,claude-3.5,gemini-pro</span>
              </div>
              <div className="text-foreground/40 pl-7 leading-relaxed">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {"[Benchmark:Latency]"} {"  "}P50:{" "}
                  <span className="text-emerald-400/70">38ms</span> P99:{" "}
                  <span className="text-yellow-400/70">142ms</span> ✓
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  {"[Benchmark:Throughput]"} 684 req/s across 3 models...{" "}
                  <span className="text-emerald-400/70">OK</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  {"[Benchmark:Accuracy]"} Eval on 10k prompts...{" "}
                  <span className="text-emerald-400/70">OK</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                >
                  {"[Aggregator]"} {"      "}Comparative analysis in progress...{" "}
                  <span className="text-yellow-400/70">...</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                  className="text-emerald-400/80 pt-2"
                >
                  {"✓"} Best performer: <span className="text-foreground font-bold">gpt-4o</span> —
                  Score <span className="text-foreground font-bold">94.2/100</span> | Latency{" "}
                  <span className="text-foreground font-bold">38ms</span>
                </motion.div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </section>

      {/* ══════════════ SECTION 2 — DASHBOARD PREVIEW ══════════════ */}
      <ScrollReveal>
        <section className="relative z-10 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
                Analytics Dashboard
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                Performance insights at a glance.
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto max-w-5xl"
            >
              <div className="relative rounded-2xl border border-emerald-500/[0.15] bg-foreground/[0.02] p-1 shadow-[0_0_80px_rgba(16,185,129,0.06)] backdrop-blur-sm overflow-hidden">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 border-b border-foreground/[0.06] bg-foreground/[0.03] px-4 py-2.5 rounded-t-xl">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
                  <div className="ml-3 flex-1 flex items-center justify-center">
                    <div className="rounded-md bg-foreground/[0.05] px-4 py-1 text-[10px] text-foreground/30 font-mono">
                      app.bitbench.dev/dashboard
                    </div>
                  </div>
                </div>

                {/* Dashboard mockup */}
                <div className="p-6 md:p-8 space-y-6 bg-background/50">
                  {/* Metrics row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Active Benchmarks", val: "8", accent: "text-emerald-400" },
                      { label: "Models Tested", val: "12", accent: "text-green-400" },
                      { label: "Avg Latency", val: "42ms", accent: "text-yellow-400" },
                      { label: "Reports Generated", val: "384", accent: "text-emerald-300" },
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

                  {/* Charts area */}
                  <div className="grid md:grid-cols-3 gap-4">
                    {/* Model comparison chart mockup */}
                    <div className="md:col-span-2 rounded-xl border border-foreground/[0.06] bg-foreground/[0.02] p-5">
                      <div className="text-xs text-muted-foreground mb-4 flex items-center gap-2">
                        <BarChart4 className="h-3.5 w-3.5" /> Model Comparison
                      </div>
                      <div className="space-y-4">
                        {[
                          {
                            name: "GPT-4o",
                            latency: "38ms",
                            score: "94.2",
                            bar: "94%",
                            color: "from-emerald-500 to-emerald-600",
                          },
                          {
                            name: "Claude 3.5",
                            latency: "52ms",
                            score: "91.8",
                            bar: "91%",
                            color: "from-emerald-500 to-green-500",
                          },
                          {
                            name: "Gemini Pro",
                            latency: "45ms",
                            score: "89.4",
                            bar: "89%",
                            color: "from-green-500 to-emerald-600",
                          },
                          {
                            name: "Llama 3.1",
                            latency: "67ms",
                            score: "85.1",
                            bar: "85%",
                            color: "from-green-600 to-emerald-700",
                          },
                        ].map((m) => (
                          <div key={m.name} className="space-y-1.5">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-foreground/80 font-mono">{m.name}</span>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>{m.latency}</span>
                                <span className="font-semibold text-foreground/70">{m.score}</span>
                              </div>
                            </div>
                            <div className="h-2 rounded-full bg-foreground/[0.06] overflow-hidden">
                              <div
                                className={`h-full rounded-full bg-gradient-to-r ${m.color}`}
                                style={{ width: m.bar }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Latency distribution mockup */}
                    <div className="rounded-xl border border-foreground/[0.06] bg-foreground/[0.02] p-5">
                      <div className="text-xs text-muted-foreground mb-4 flex items-center gap-2">
                        <Activity className="h-3.5 w-3.5" /> Latency Distribution
                      </div>
                      <div className="flex items-end justify-between gap-1 h-28 px-1">
                        {[30, 45, 65, 85, 95, 80, 60, 40, 25, 15, 10, 5].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t-sm bg-gradient-to-t from-emerald-600/60 to-emerald-400/30"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between text-[9px] text-muted-foreground/50 mt-2 px-1">
                        <span>0ms</span>
                        <span>200ms</span>
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
                <h3 className="text-2xl font-bold text-foreground mb-4">Without BitBench</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400/60 flex-shrink-0" />
                    Manual testing with inconsistent prompts and criteria
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400/60 flex-shrink-0" />
                    No standardized way to compare models or providers
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400/60 flex-shrink-0" />
                    Performance degradation goes unnoticed in production
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400/60 flex-shrink-0" />
                    Spreadsheet-based reporting that nobody trusts
                  </li>
                </ul>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                className="glass rounded-3xl p-10 border-l-4 border-l-emerald-500/60"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">With BitBench</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400/60 flex-shrink-0" />
                    Automated, standardized benchmarks across all models
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400/60 flex-shrink-0" />
                    Side-by-side comparison with deterministic metrics
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400/60 flex-shrink-0" />
                    Real-time monitoring catches regressions instantly
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400/60 flex-shrink-0" />
                    Automated, publication-ready performance reports
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ══════════════ SECTION 4 — STATS + TRUST + PRODUCT HUNT ══════════════ */}
      <ScrollReveal>
        <section className="relative z-10 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            {/* Stats */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
              {stats.map(({ value, suffix, label, icon: Icon }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-foreground/[0.06] bg-foreground/[0.02] p-8 backdrop-blur-sm text-center hover:border-emerald-500/20 transition-all duration-300 hover:shadow-[0_0_24px_rgba(16,185,129,0.08)]"
                >
                  <Icon className="h-6 w-6 text-emerald-400/60" />
                  <div className="text-4xl font-extrabold text-foreground">
                    <Counter value={value} suffix={suffix} />
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">{label}</span>
                </motion.div>
              ))}
            </div>

            {/* Trust badges + Product Hunt */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <TrustBadges badges={["msme", "producthunt"]} accentColor="emerald" />
              <ProductHuntEmbed accentColor="emerald" className="w-full sm:w-auto" />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ══════════════ SECTION 5 — BENTO FEATURES ══════════════ */}
      <ScrollReveal>
        <section
          id="features"
          className="relative z-10 border-y border-foreground/[0.06] bg-foreground/[0.015] py-20 md:py-28"
        >
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
                Core Metrics
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                Everything you need to benchmark.
              </h2>
            </div>

            {/* Bento grid */}
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feat, idx) => (
                <motion.div
                  key={idx}
                  className={feat.size === "lg" ? "md:col-span-2" : ""}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                >
                  <div className="group h-full relative rounded-2xl border border-foreground/[0.06] bg-foreground/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/20 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(16,185,129,0.08)] overflow-hidden p-6">
                    {/* Mini data viz for large cards */}
                    {feat.size === "lg" && (
                      <div className="absolute top-4 right-4 flex items-end gap-0.5 h-8 opacity-30 group-hover:opacity-50 transition-opacity">
                        {[40, 65, 50, 80, 70, 90, 60, 75, 85, 95].map((h, i) => (
                          <div
                            key={i}
                            className="w-1 rounded-t-sm bg-emerald-500/50"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    )}

                    <div className="relative">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                        <feat.icon className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{feat.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{feat.desc}</p>
                    </div>

                    {/* Hover gradient */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ══════════════ SECTION 6 — HOW IT WORKS (pipeline) ══════════════ */}
      <ScrollReveal>
        <section className="relative z-10 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
                Process
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">How It Works</h2>
            </div>

            {/* Horizontal pipeline */}
            <div className="relative">
              {/* Connecting line (desktop only) */}
              <div className="hidden lg:block absolute top-[3.25rem] left-[10%] right-[10%] h-px bg-gradient-to-r from-emerald-500/40 via-emerald-500/20 to-emerald-500/40" />

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {pipelineSteps.map(({ icon: Icon, title, desc }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.5 }}
                    className="group relative flex flex-col items-center text-center"
                  >
                    {/* Pipeline node */}
                    <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-emerald-500/20 bg-foreground/[0.02] backdrop-blur-sm transition-all duration-300 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10 group-hover:shadow-[0_0_24px_rgba(16,185,129,0.15)] group-hover:scale-110 z-10">
                      <Icon className="h-7 w-7 text-emerald-400/70 transition-colors duration-300 group-hover:text-emerald-400" />
                    </div>

                    {/* Arrow between nodes (desktop) */}
                    {i < pipelineSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-[3.25rem] right-0 translate-x-1/2 z-20">
                        <ArrowRight className="h-4 w-4 text-emerald-500/40" />
                      </div>
                    )}

                    <span className="mb-2 text-xs font-bold tracking-widest text-emerald-400/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4 className="mb-2 text-lg font-semibold text-foreground">{title}</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground max-w-[200px]">
                      {desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ══════════════ SECTION 7 — USE CASES (tabbed) + INTEGRATIONS ══════════════ */}
      <ScrollReveal>
        <section className="relative z-10 border-y border-foreground/[0.06] bg-foreground/[0.015] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            {/* Use Cases */}
            <div className="mb-20">
              <div className="mx-auto mb-12 max-w-2xl text-center">
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
                  Use Cases
                </p>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Built for teams that ship AI.
                </h2>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap justify-center gap-2 mb-10">
                {useCaseTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.1)]"
                        : "border border-foreground/[0.08] text-muted-foreground hover:text-foreground hover:border-foreground/20"
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mx-auto max-w-2xl"
              >
                <div className="rounded-2xl border border-foreground/[0.06] bg-foreground/[0.02] p-8 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                      <activeUseCase.icon className="h-5 w-5 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-semibold">{activeUseCase.label}</h3>
                  </div>
                  <div className="space-y-3">
                    {activeUseCase.scenarios.map((scenario, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400/50 mt-0.5 flex-shrink-0" />
                        {scenario}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Integrations */}
            <div>
              <div className="mx-auto mb-12 max-w-2xl text-center">
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
                  Integrations
                </p>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Benchmark any model, any provider.
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
                    className="flex items-center gap-2 rounded-full border border-foreground/[0.08] bg-foreground/[0.03] px-5 py-3 text-sm font-medium text-foreground backdrop-blur-sm hover:border-emerald-500/20 hover:bg-emerald-500/5 hover:text-emerald-300 transition-all duration-300"
                  >
                    <Cloud className="h-3.5 w-3.5 text-emerald-400/50" />
                    {name}
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
            <div className="relative overflow-hidden rounded-[2.5rem] border border-emerald-500/[0.12] bg-foreground/[0.02] p-12 md:p-16 text-center backdrop-blur-sm">
              {/* Glow effects */}
              <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-60 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 right-1/4 h-40 w-60 rounded-full bg-green-500/8 blur-3xl" />

              <div className="relative">
                <h2 className="text-3xl font-bold md:text-4xl mb-4">
                  Start benchmarking in minutes.
                </h2>
                <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-8">
                  Stop guessing which model works best. BitBench gives you clear, reproducible,
                  actionable performance insights.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    size="lg"
                    className="h-12 gap-2 rounded-xl px-8 font-semibold bg-gradient-to-r from-emerald-500 to-emerald-700 text-white hover:from-emerald-400 hover:to-emerald-600 shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all hover:shadow-[0_0_50px_rgba(16,185,129,0.4)] border-0"
                    onClick={() => {
                      setSelectedProduct("BitBench");
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
                      Talk to an engineer <ArrowUpRight className="h-4 w-4" />
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
