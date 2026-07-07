import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/sanixor/ScrollReveal";
import { Footer } from "@/components/sanixor/Footer";
import { InteractiveConsole } from "@/components/sanixor/InteractiveConsole";
import { Navbar } from "@/components/sanixor/Navbar";
import { Counter } from "@/components/sanixor/Counter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookDemoModal } from "@/components/sanixor/BookDemoModal";
import {
  ArrowRight,
  ArrowUpRight,
  Activity,
  BarChart4,
  CheckCircle2,
  Cpu,
  Gauge,
  Layers,
  LineChart,
  Server,
  ShieldAlert,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Gauge,
    title: "AI Model Benchmarking",
    desc: "Rigorously test LLMs and specialized models across diverse prompts, contexts, and edge cases with standardized scoring.",
    span: "md:col-span-2",
  },
  {
    icon: Server,
    title: "Infrastructure Scoring",
    desc: "Measure latency, throughput, and resource utilization across your deployment environments.",
  },
  {
    icon: LineChart,
    title: "Comparative Analytics",
    desc: "Compare models and cloud providers side-by-side to make data-driven architecture choices.",
  },
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    desc: "Track model degradation and infrastructure health continuously as your user base scales.",
  },
  {
    icon: Layers,
    title: "Visual Dashboards",
    desc: "Interactive real-time visualizations that make complex performance metrics accessible to all stakeholders.",
    span: "md:col-span-2",
  },
  {
    icon: BarChart4,
    title: "Performance Reporting",
    desc: "Automated generation of reports summarizing benchmarks for leadership and compliance review.",
  },
];

const stats = [
  { value: 12000, suffix: "+", label: "Benchmarks Run", icon: BarChart4 },
  { value: 99, suffix: ".7%", label: "Uptime SLA", icon: ShieldAlert },
  { value: 40, suffix: "ms", label: "Avg Latency Tracked", icon: Zap },
];

const steps = [
  {
    num: "01",
    icon: Cpu,
    title: "Connect Stack",
    desc: "Link your models, APIs, and infrastructure endpoints to the benchmarking pipeline.",
  },
  {
    num: "02",
    icon: Layers,
    title: "Define Benchmarks",
    desc: "Choose standardized metrics or create custom evaluation criteria for your use case.",
  },
  {
    num: "03",
    icon: Activity,
    title: "Run & Monitor",
    desc: "Execute benchmarks with real-time progress tracking and live performance feeds.",
  },
  {
    num: "04",
    icon: BarChart4,
    title: "Analyze & Optimize",
    desc: "Review comparative insights, identify bottlenecks, and implement data-driven improvements.",
  },
];

const customers = [
  "AI Startups",
  "ML Engineering Teams",
  "Enterprise Platform Ops",
  "Research Organizations",
  "Cloud Infrastructure Providers",
  "DevOps & SRE Teams",
];

export default function BitBench() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<"BitBench" | "Hackathon Evaluation">(
    "BitBench",
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-28 pb-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.2)_0%,rgba(109,40,217,0.08)_40%,transparent_70%)] blur-[80px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex max-w-6xl flex-col items-center text-center"
        >
          <Badge className="mb-8 gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-xs font-semibold text-primary backdrop-blur-md hover:border-primary/50 hover:bg-primary/15 hover:shadow-[0_8px_24px_rgba(139,92,246,0.2)] transition-all duration-300">
            <Activity className="h-3.5 w-3.5" /> Performance Intelligence
          </Badge>

          <h1 className="max-w-5xl text-center flex flex-col items-center leading-[0.85] tracking-tight mb-8">
            <span className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[9rem] font-extrabold pb-0">
              <span className="text-white">Bit</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-purple-400 to-purple-700">
                Bench
              </span>
            </span>
            <span className="text-lg md:text-xl text-muted-foreground font-medium lowercase tracking-normal mt-3 mb-0">
              by
            </span>
            <span className="text-4xl md:text-6xl lg:text-[4rem] font-extrabold mt-1">
              <span className="text-white">Sanixor</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-purple-400 to-purple-700">
                AI
              </span>
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl text-center">
            BitBench evaluates developer environments by standardizing project configuration,
            automating benchmark tests, and generating deterministic performance metrics across tech
            stacks.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="h-12 gap-2 rounded-xl px-8 font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all hover:shadow-[0_0_50px_rgba(139,92,246,0.4)]"
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
          <div className="relative overflow-hidden rounded-2xl border border-foreground/[0.08] bg-background/90 backdrop-blur-xl shadow-[0_0_60px_rgba(139,92,246,0.08)]">
            <div className="flex items-center gap-2 border-b border-foreground/[0.06] px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/60" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
              <span className="h-3 w-3 rounded-full bg-green-500/60" />
              <span className="ml-3 text-xs text-foreground/30 font-mono">
                bitbench --run benchmark-suite
              </span>
            </div>
            <div className="p-6 space-y-3 font-mono text-sm">
              <div className="flex items-center gap-3 text-cyan-400/80">
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
                  {"[Benchmark:Latency]"} {"  "}P50: <span className="text-cyan-400/70">38ms</span>{" "}
                  P99: <span className="text-yellow-400/70">142ms</span> ✓
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  {"[Benchmark:Throughput]"} 684 req/s across 3 models...{" "}
                  <span className="text-green-400/70">OK</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  {"[Benchmark:Accuracy]"} Eval on 10k prompts...{" "}
                  <span className="text-green-400/70">OK</span>
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
                  className="text-primary/80 pt-2"
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

      {/* ── PROBLEM & SOLUTION + STATS ── */}
      <ScrollReveal delay={100}>
        <section
          id="details"
          className="relative z-10 border-y border-foreground/[0.06] bg-foreground/[0.015] py-20 md:py-28"
        >
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="glass rounded-3xl p-10 border-l-4 border-l-red-500/60"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                  <ShieldAlert className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">The Problem</h3>
                <p className="leading-relaxed text-lg text-muted-foreground">
                  Organizations struggle to objectively measure and compare AI model performance,
                  infrastructure efficiency, and deployment effectiveness in production
                  environments.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                className="glass rounded-3xl p-10 border-l-4 border-l-primary/60"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Solution</h3>
                <p className="leading-relaxed text-lg text-muted-foreground">
                  BitBench provides automated benchmarking, real-time performance insights, and
                  comparative analytics to support data-driven optimization decisions for your
                  entire AI stack.
                </p>
              </motion.div>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {stats.map(({ value, suffix, label, icon: Icon }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-foreground/[0.06] bg-foreground/[0.02] p-8 backdrop-blur-sm text-center hover:border-primary/20 transition-all duration-300"
                >
                  <Icon className="h-6 w-6 text-primary/60" />
                  <div className="text-4xl font-extrabold text-foreground">
                    <Counter value={value} suffix={suffix} />
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">{label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── KEY FEATURES ── */}
      <ScrollReveal>
        <section id="features" className="relative z-10 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Core Metrics
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Key Features</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feat, idx) => (
                <motion.div
                  key={idx}
                  className={feat.span || ""}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                >
                  <Card className="group h-full relative border-foreground/[0.06] bg-foreground/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-primary/20 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]">
                    <CardHeader>
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                        <feat.icon className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                      <CardTitle className="text-lg">{feat.title}</CardTitle>
                      <CardDescription className="text-sm mt-2 leading-relaxed">
                        {feat.desc}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── HOW IT WORKS ── */}
      <ScrollReveal>
        <section className="relative z-10 border-y border-foreground/[0.06] bg-foreground/[0.015] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Process
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">How It Works</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {steps.map(({ num, icon: Icon, title, desc }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group relative"
                >
                  {i < steps.length - 1 && (
                    <div className="absolute top-12 left-1/2 hidden h-px w-full bg-gradient-to-r from-primary/40 to-transparent lg:block" />
                  )}
                  <div className="relative flex flex-col items-center text-center">
                    <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-foreground/[0.08] bg-foreground/[0.03] backdrop-blur-sm transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:shadow-[0_0_24px_rgba(139,92,246,0.15)] group-hover:scale-110">
                      <Icon className="h-7 w-7 text-primary/70 transition-colors duration-300 group-hover:text-primary" />
                    </div>
                    <span className="mb-2 text-xs font-bold tracking-widest text-primary/40">
                      {num}
                    </span>
                    <h4 className="mb-2 text-lg font-semibold text-foreground">{title}</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── TARGET CUSTOMERS ── */}
      <ScrollReveal>
        <section className="relative z-10 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Who It's For
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Built for Scale</h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Trusted by teams that demand precise, reproducible performance insights for their AI
                systems.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {customers.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <div className="flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-5 py-3 text-sm font-medium text-foreground backdrop-blur-sm hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all duration-300 cursor-default">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                    {item}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── CTA & FOOTER ── */}
      <ScrollReveal>
        <InteractiveConsole className="py-20" />
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
