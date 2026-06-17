import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/sanixor/ScrollReveal";
import { CTASection, Footer } from "@/components/sanixor/Footer";
import { Navbar } from "@/components/sanixor/Navbar";
import { Counter } from "@/components/sanixor/Counter";
import { GlassCard } from "@/components/sanixor/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Cpu,
  FileCheck,
  Gauge,
  ShieldAlert,
  Signal,
  Terminal,
  TrendingUp,
  Upload,
  Users,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Terminal,
    title: "Multi-Agent AI Evaluation",
    desc: "Specialized AI agents collaboratively assess code quality, originality, and architectural decisions across multiple judging criteria.",
    span: "md:col-span-2",
  },
  {
    icon: ShieldAlert,
    title: "Bias-Free Scoring",
    desc: "Objective and consistent scoring framework that eliminates human error.",
  },
  {
    icon: Users,
    title: "Automated Judge Allocation",
    desc: "Intelligently assigns experts and agents based on project tech-stacks and complexity.",
  },
  {
    icon: TrendingUp,
    title: "Live Leaderboards",
    desc: "Real-time ranking updates and instant feedback for participants.",
  },
  {
    icon: Code2,
    title: "Real-Time Analytics",
    desc: "Deep insights into overall performance, common bugs, and trending technologies.",
    span: "md:col-span-2",
  },
  {
    icon: CheckCircle2,
    title: "Scalable Event Management",
    desc: "Handle thousands of concurrent submissions without degradation in judging speed.",
  },
];

const stats = [
  { value: 500, suffix: "+", label: "Projects Evaluated", icon: FileCheck },
  { value: 98, suffix: "%", label: "Evaluation Accuracy", icon: Gauge },
  { value: 72, suffix: "%", label: "Time Saved vs Manual", icon: Zap },
];

const steps = [
  {
    num: "01",
    icon: Upload,
    title: "Submit Projects",
    desc: "Teams upload their projects with repositories, documentation, and demo links.",
  },
  {
    num: "02",
    icon: Cpu,
    title: "AI Agent Assignment",
    desc: "Specialized AI agents are automatically assigned based on the project's tech stack.",
  },
  {
    num: "03",
    icon: Signal,
    title: "Multi-Criteria Scoring",
    desc: "Agents evaluate code quality, innovation, impact, and presentation independently.",
  },
  {
    num: "04",
    icon: TrendingUp,
    title: "Results & Rankings",
    desc: "Aggregated scores generate live leaderboards and detailed performance reports.",
  },
];

const customers = [
  "Universities & Colleges",
  "Innovation Cells",
  "Startup Incubators",
  "Corporate Innovation",
  "Government Challenges",
  "Tech Conferences",
];

export default function HackEval() {
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
            <Code2 className="h-3.5 w-3.5" /> AI-Powered Judging
          </Badge>

          <h1 className="max-w-4xl text-center text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl">
            Autonomous Hackathon{" "}
            <span className="bg-gradient-to-r from-primary via-primary-glow to-violet-400 bg-[length:200%_200%] bg-clip-text text-transparent animate-[hackGradient_8s_ease_infinite]">
              Evaluation
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            HackEval is an AI-powered multi-agent hackathon evaluation platform designed to automate project assessment, judging workflows, score aggregation, and result generation.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="h-12 gap-2 rounded-xl px-8 font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all hover:shadow-[0_0_50px_rgba(139,92,246,0.4)]">
              <a href="#features">
                Explore Features <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 gap-2 rounded-xl border-white/10 bg-white/5 px-8 font-semibold text-foreground backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all">
              <a href="#demo">Book a Demo <ArrowUpRight className="h-4 w-4" /></a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mt-16 w-full max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a14]/90 backdrop-blur-xl shadow-[0_0_60px_rgba(139,92,246,0.08)]">
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/60" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
              <span className="h-3 w-3 rounded-full bg-green-500/60" />
              <span className="ml-3 text-xs text-white/30 font-mono">hackeval evaluation pipeline</span>
            </div>
            <div className="p-6 space-y-3 font-mono text-sm">
              <div className="flex items-center gap-3 text-green-400/80">
                <span className="text-white/30 select-none">~</span>
                <span className="text-white/50">$</span>
                <span>hackeval run --project stellar-falcon --stage scoring</span>
              </div>
              <div className="text-white/40 pl-7 leading-relaxed">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>{"[Agent:CodeReview]"} {"  "}Analyzing repository structure... <span className="text-green-400/70">OK</span></motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>{"[Agent:Innovation]"} {" "}Evaluating technical novelty... <span className="text-green-400/70">OK</span></motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>{"[Agent:Impact]"} {"   "}Assessing real-world applicability... <span className="text-green-400/70">OK</span></motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>{"[Aggregator]"} {"   "}Computing weighted scores... <span className="text-yellow-400/70">...</span></motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="text-primary/80 pt-2">{"✓"} Final Score: <span className="text-white font-bold">92.4 / 100</span> — Rank <span className="text-white font-bold">#2</span> of 148</motion.div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </section>

      {/* ── PROBLEM & SOLUTION ── */}
      <ScrollReveal delay={100}>
        <section className="relative z-10 border-y border-white/[0.06] bg-white/[0.015] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2">
              <motion.div whileHover={{ scale: 1.01 }} className="glass rounded-3xl p-10 border-l-4 border-l-red-500/60">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                  <ShieldAlert className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">The Problem</h3>
                <p className="leading-relaxed text-lg text-muted-foreground">
                  Traditional hackathon evaluation processes are manual, time-consuming, and inconsistent — leading to delayed results, human bias, and unfair assessments that demotivate participants.
                </p>
              </motion.div>

              <motion.div whileHover={{ scale: 1.01 }} className="glass rounded-3xl p-10 border-l-4 border-l-primary/60">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Solution</h3>
                <p className="leading-relaxed text-lg text-muted-foreground">
                  HackEval leverages multi-agent AI to automate project evaluation across multiple judging criteria, ensuring fairness, consistency, and scalability throughout the entire evaluation lifecycle.
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
                  className="flex flex-col items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-sm text-center hover:border-primary/20 transition-all duration-300"
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
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">Capabilities</p>
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
                  <Card className="group h-full relative border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-primary/20 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]">
                    <CardHeader>
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                        <feat.icon className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                      <CardTitle className="text-lg">{feat.title}</CardTitle>
                      <CardDescription className="text-sm mt-2 leading-relaxed">{feat.desc}</CardDescription>
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
        <section className="relative z-10 border-y border-white/[0.06] bg-white/[0.015] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">Process</p>
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
                    <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:shadow-[0_0_24px_rgba(139,92,246,0.15)] group-hover:scale-110">
                      <Icon className="h-7 w-7 text-primary/70 transition-colors duration-300 group-hover:text-primary" />
                    </div>
                    <span className="mb-2 text-xs font-bold tracking-widest text-primary/40">{num}</span>
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
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">Who It's For</p>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Built for Scale</h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Trusted by organizations of every size to deliver fair, fast, and transparent hackathon judging.
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
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-foreground backdrop-blur-sm hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all duration-300 cursor-default">
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
        <CTASection className="py-20" />
      </ScrollReveal>
      <Footer />
    </div>
  );
}