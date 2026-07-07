import { useState, useEffect } from "react";
import {
  Code2,
  Gauge,
  BarChart3,
  Bot,
  Workflow,
  X,
  ArrowRight,
  Play,
  Check,
  Zap,
  Shield,
  TrendingUp,
} from "lucide-react";
import { Layout } from "@/components/sanixor/Layout";

const products = [
  {
    id: "hackeval",
    name: "HackEval",
    tag: "AI Judging",
    icon: Code2,
    desc: "Autonomous hackathon evaluation platform designed to automate project assessment, judging workflows, and score aggregation.",
    features: [
      "Multi-Agent AI Evaluation",
      "Bias-Free Scoring",
      "Live Leaderboards",
      "Real-Time Analytics",
    ],
    color: 220,
    stats: "500+ hackathons evaluated",
  },
  {
    id: "bitbench",
    name: "BitBench",
    tag: "Performance Intelligence",
    icon: Gauge,
    desc: "Benchmarks AI models, applications, and infrastructure using standardized metrics and comparative analytics.",
    features: [
      "Model Benchmarking",
      "Infrastructure Scoring",
      "Comparative Analytics",
      "Visual Dashboards",
    ],
    color: 280,
    stats: "Enterprise scale",
  },
  {
    id: "autodash",
    name: "AutoDash",
    tag: "Data Analytics",
    icon: BarChart3,
    desc: "AI-powered analytics and dashboard automation platform that converts raw data into intelligent visualizations.",
    features: [
      "Automated Generation",
      "Predictive Analytics",
      "Anomaly Detection",
      "Automated Reporting",
    ],
    color: 170,
    stats: "Real-time intelligence",
  },
  {
    id: "lexai",
    name: "LexAI by Sanixor",
    tag: "Legal Intelligence",
    icon: Bot,
    desc: "The legal and compliance intelligence engine built for enterprise scale. Actively flag risks and automate legal review.",
    features: ["Contract Analysis", "Regulatory Compliance", "Knowledge Graph", "VPC Deployment"],
    color: 210,
    stats: "SOC2 Compliant",
  },
];

const services = [
  {
    name: "Agent as a Service (AaaS)",
    icon: Bot,
    desc: "Deploy intelligent AI agents without infrastructure complexity.",
    points: [
      "Multi-agent systems",
      "Task automation agents",
      "Conversational AI agents",
      "Workflow orchestration",
    ],
    color: 210,
  },
  {
    name: "Customized Agentic Solutions",
    icon: Workflow,
    desc: "Tailor-made AI systems designed for specific business needs.",
    points: [
      "End-to-end automation",
      "Domain-specific AI agents",
      "Enterprise workflow automation",
      "Decision intelligence systems",
    ],
    color: 260,
  },
];

const tiers = [
  {
    name: "Starter",
    price: "$0",
    desc: "Perfect for getting started.",
    features: ["Community access", "Basic features", "100 API calls/month"],
    popular: false,
  },
  {
    name: "Pro",
    price: "$49",
    desc: "For growing teams.",
    features: [
      "Everything in Starter",
      "Unlimited API calls",
      "Priority support",
      "Custom integrations",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For large organizations.",
    features: [
      "Unlimited everything",
      "Dedicated support",
      "SLA guarantee",
      "On-premise deployment",
    ],
    popular: false,
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Sub-100ms response times with optimized AI pipelines",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "SOC 2 Type II certified with end-to-end encryption",
  },
  { icon: TrendingUp, title: "Scalable", desc: "From startup to Fortune 500 — we scale with you" },
  { icon: Check, title: "Reliable", desc: "99.99% uptime SLA with redundant infrastructure" },
];

export default function ProductsPage() {
  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const active = products.find((p) => p.id === activeProduct);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[80vh] overflow-hidden bg-hero">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-32 h-80 w-80 rounded-full bg-accent/15 blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        <div className="relative mx-auto max-w-6xl px-6 pt-32">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
              Products that <span className="text-gradient">deliver.</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground mb-8">
              Production-grade AI tools built by engineers, for engineers. Ship faster with our
              battle-tested platforms.
            </p>
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              {benefits.slice(0, 4).map((b) => (
                <div
                  key={b.title}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <b.icon className="h-4 w-4 text-primary" /> {b.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActiveProduct(p.id)}
              className="group relative glass rounded-[2rem] p-8 text-left shadow-elegant transition-all duration-500 hover:shadow-glow hover:-translate-y-2"
            >
              <div
                className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-15 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 0%, oklch(0.6 0.15 ${p.color}), transparent 60%)`,
                }}
              />
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-glow"
                    style={{
                      background: `linear-gradient(135deg, oklch(0.6 0.15 ${p.color}), oklch(0.4 0.12 ${p.color + 30}))`,
                    }}
                  >
                    <p.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                </div>
                <p className="text-xs uppercase tracking-wider text-primary mb-2">{p.tag}</p>
                <h3 className="text-2xl font-bold mb-3">{p.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{p.desc}</p>
                <div className="text-sm font-medium text-primary">{p.stats}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Beyond Products — Solutions</h2>
          <p className="text-muted-foreground">Custom AI implementations for enterprise needs</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((s) => (
            <div
              key={s.name}
              className="glass rounded-[2rem] p-8 shadow-elegant transition-all duration-500 hover:shadow-glow"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, oklch(0.6 0.15 ${s.color}), oklch(0.4 0.12 ${s.color + 30}))`,
                  }}
                >
                  <s.icon className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{s.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{s.desc}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {s.points.map((pt) => (
                      <div
                        key={pt}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <span className="h-1 w-1 rounded-full bg-primary" /> {pt}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground">Start free, scale as you grow</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-[2rem] p-8 transition-all duration-500 hover:shadow-glow ${t.popular ? "glass-strong ring-2 ring-primary shadow-glow" : "glass"}`}
            >
              {t.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground shadow-glow">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-semibold mb-2">{t.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold">{t.price}</span>
                {t.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
              </div>
              <p className="text-sm text-muted-foreground mb-6">{t.desc}</p>
              <ul className="space-y-3 mb-8">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full rounded-full py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] ${t.popular ? "bg-gradient-primary text-primary-foreground shadow-glow" : "glass"}`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="glass-strong rounded-[3rem] p-12 md:p-16 text-center shadow-elegant relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to ship faster?</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Get started with our products today. Free tier available for individual developers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105"
              >
                Start Free Trial <ArrowRight className="h-5 w-5" />
              </a>
              <button className="inline-flex items-center gap-2 rounded-full glass px-8 py-4 text-base font-semibold transition-all duration-300 hover:scale-105">
                <Play className="h-4 w-4" /> Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {active && (
        <div
          className="fixed inset-0 z-[200] grid place-items-center bg-background/80 backdrop-blur-xl p-6"
          onClick={() => setActiveProduct(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-[2rem] glass-strong p-10 shadow-elegant"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveProduct(null)}
              aria-label="Close modal"
              className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full glass hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, oklch(0.6 0.15 ${active.color}), oklch(0.4 0.12 ${active.color + 30}))`,
                }}
              >
                <active.icon className="h-8 w-8 text-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{active.name}</h3>
                <p className="text-sm text-primary">{active.tag}</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">{active.desc}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {active.features.map((f) => (
                <div key={f} className="flex items-center gap-3 rounded-xl glass p-3 text-sm">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" /> {f}
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a
                href={`/${active.id}`}
                className="flex-1 text-center rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-[1.02]"
              >
                Learn More
              </a>
              <button className="flex-1 rounded-full glass px-6 py-3 text-sm font-semibold transition-all duration-300 hover:bg-muted">
                Request Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
