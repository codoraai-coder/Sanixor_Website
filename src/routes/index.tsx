import { ScrollReveal } from "@/components/sanixor/ScrollReveal";
import { AgentVersePreview } from "@/components/events/AgentVersePreview";
import {
  ArrowRight,
  ArrowUpRight,
  Cpu,
  FlaskConical,
  GraduationCap,
  Network,
  PenTool,
  Smile,
  Code2,
  Play,
  Sparkles,
  Heart,
} from "lucide-react";
import { HeroParallax } from "@/components/sanixor/HeroParallax";
import { Footer } from "@/components/sanixor/Footer";
import { InteractiveConsole } from "@/components/sanixor/InteractiveConsole";
import { Navbar } from "@/components/sanixor/Navbar";
import InteractiveSelector from "@/components/ui/interactive-selector";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ServicesCube, ServiceCubeData } from "@/components/sanixor/ServicesCube";

const services: ServiceCubeData[] = [
  {
    num: "01",
    id: "agent-as-a-service",
    title: "Agent as a Service",
    shortSubtitle: "Fully Managed Agents",
    iconComponent: Sparkles,
    description:
      "Build intelligent workflows and deploy interconnected AI agents that collaborate to automate your most complex business processes with zero downtime.",
    slug: "agent-as-a-service",
    tags: ["API Integration", "Event Automation", "Custom Workflows", "Managed Hosting"],
    image: "/service-1.png",
    capabilities: [
      { title: "Multi-Agent Systems", desc: "Deploy interconnected AI agents that collaborate." },
      { title: "Task Automation", desc: "Automate repetitive workflows with zero downtime." },
      { title: "Conversational AI", desc: "Engage users with context-aware capabilities." },
      {
        title: "Zero Infrastructure",
        desc: "We manage the servers and scaling. You consume the API.",
      },
    ],
  },
  {
    num: "02",
    id: "custom-agent-dev",
    title: "Custom Agent Dev",
    shortSubtitle: "Bespoke AI Solutions",
    iconComponent: Code2,
    description:
      "Train models on your proprietary datasets securely and connect custom agents to your internal ERPs & CRMs with full IP ownership.",
    slug: "custom-agent-dev",
    tags: ["Domain-Specific", "Full Ownership", "Docs & Handover", "Institutional"],
    image: "/service-2.png",
    capabilities: [
      { title: "Domain Fine-tuning", desc: "Train models on your proprietary datasets securely." },
      {
        title: "Complex Integrations",
        desc: "Connect custom agents to your internal ERPs & CRMs.",
      },
      {
        title: "Rigorous Evaluation",
        desc: "Red-teaming and benchmark testing before deployment.",
      },
      { title: "Full Code Handover", desc: "Own the IP and the orchestration code entirely." },
    ],
  },
  {
    num: "03",
    id: "api-integration",
    title: "API Integration",
    shortSubtitle: "Enterprise Connectivity",
    iconComponent: Network,
    description:
      "Engineered for high-throughput enterprise scale, our SDKs and webhooks provide sub-millisecond latency for real-time event-driven updates.",
    slug: "api-integration",
    tags: ["Comprehensive SDKs", "Webhooks", "Legacy Support", "REST/GraphQL"],
    image: "/service-3.png",
    capabilities: [
      { title: "Official SDKs", desc: "Python, Node.js, and Go clients with deep typing." },
      { title: "Legacy Adapters", desc: "On-premise database connectivity for AI." },
      { title: "Real-time Webhooks", desc: "Event-driven updates on agent state and output." },
      {
        title: "Sub-millisecond Latency",
        desc: "Engineered for high-throughput enterprise scale.",
      },
    ],
  },
  {
    num: "04",
    id: "event-automation",
    title: "Event Operations",
    shortSubtitle: "Autonomous Management",
    iconComponent: Play,
    description:
      "Deploy 24/7 autonomous agents for instant attendee support, dynamic scheduling, and post-event analytics for seamless live operations.",
    slug: "event-automation",
    tags: ["Live Q&A Agents", "Ticketing", "Scheduling", "Analytics"],
    image: "/service-4.png",
    capabilities: [
      { title: "Live Attendee Support", desc: "24/7 instant answers to logistical questions." },
      { title: "Dynamic Scheduling", desc: "Agents that adapt itineraries based on delays." },
      { title: "Post-Event Analytics", desc: "Automated sentiment and engagement reports." },
      { title: "Speaker Coordination", desc: "Automated briefing and content collection." },
    ],
  },
  {
    num: "05",
    id: "conversational-ux",
    title: "Conversational UX",
    shortSubtitle: "Next-Gen Interfaces",
    iconComponent: Smile,
    description:
      "Next-generation interfaces featuring real-time emotion detection, contextual memory, and seamless switching between voice and text.",
    slug: "conversational-ux",
    tags: ["Sentiment Analysis", "Voice Interfaces", "Emotion AI", "UX Design"],
    image: "/service-1.png",
    capabilities: [
      { title: "Sentiment Tracking", desc: "Real-time emotion detection during interactions." },
      { title: "Contextual Memory", desc: "Remembering user preferences across sessions." },
      { title: "Voice & Text", desc: "Seamless switching between spoken and typed input." },
      { title: "Empathy Routing", desc: "Escalating to human agents based on frustration." },
    ],
  },
  {
    num: "06",
    id: "ai-architecture",
    title: "AI Architecture",
    shortSubtitle: "Strategic System Design",
    iconComponent: PenTool,
    description:
      "Design robust, SOC2 and GDPR compliant multi-model infrastructures with failover strategies for mission-critical enterprise agents.",
    slug: "ai-architecture",
    tags: ["System Design", "Compliance", "Security Audits", "Scalability"],
    image: "/service-2.png",
    capabilities: [
      { title: "Topology Planning", desc: "Designing robust multi-model infrastructures." },
      { title: "Security & Compliance", desc: "Ensuring SOC2 and GDPR readiness for AI." },
      {
        title: "Cost Optimization",
        desc: "Minimizing inference costs without sacrificing quality.",
      },
      { title: "Redundancy Systems", desc: "Failover strategies for mission-critical agents." },
    ],
  },
];

const learningTracks = [
  {
    icon: Cpu,
    title: "Transformer Architecture Deep Dives",
    text: "Attention mechanisms, positional encodings, multi-head attention — explained at the implementation level.",
  },
  {
    icon: Network,
    title: "Agent System Design",
    text: "Multi-agent systems, tool use, memory management, and orchestration loops that don't break in production.",
  },
  {
    icon: FlaskConical,
    title: "LLM Internals & Evaluation",
    text: "RLHF, fine-tuning, RAG pipelines, benchmarking — the concepts that separate engineers who understand the stack.",
  },
  {
    icon: GraduationCap,
    title: "Industry Readiness Tracks",
    text: "Structured learning paths aligned to what top companies hire for — built with 1st and 2nd year students in mind.",
  },
];

function SectionHeader({
  label,
  title,
  description,
}: {
  label: string;
  title?: string;
  description?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", description ? "mb-14" : "mb-6")}>
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">{label}</p>
      {title && <h2 className="text-3xl font-bold tracking-tight md:text-5xl">{title}</h2>}
      {description && <p className="mt-4 text-muted-foreground md:text-lg">{description}</p>}
    </div>
  );
}

export default function Index() {
  return (
    <div id="main-content" className="relative min-h-screen elite-bg" style={{ overflowX: "clip" }}>
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 elite-grid" />
      </div>

      <Navbar />
      <HeroParallax />

      {/* Products */}
      <ScrollReveal>
        <section
          id="products"
          className="relative z-10 bg-transparent pt-16 md:pt-32 pb-16 md:pb-32"
        >
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <SectionHeader label="Products" title="Every tool is an AI agent." />
          </div>
          <InteractiveSelector />
        </section>
      </ScrollReveal>

      {/* Services — 3D Cube */}
      <ServicesCube services={services} />

      {/* Event */}
      <ScrollReveal delay={100}>
        <section id="event" className="mx-auto max-w-[1500px] px-4 py-8 md:py-12 md:px-6">
          <div className="mx-auto max-w-7xl px-4 md:px-6 mb-8 md:mb-12">
            <SectionHeader label="Events" />
          </div>
          <AgentVersePreview />
        </section>
      </ScrollReveal>

      {/* Learn */}
      <ScrollReveal delay={100}>
        <section id="learn" className="mx-auto max-w-7xl px-4 py-16 md:py-32 md:px-6">
          <SectionHeader
            label="Learn"
            title="Architecture-level AI fundamentals."
            description="Not tutorials. Deep, engineering-grade content on how AI systems actually work — written for people who want to build, not just use."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {learningTracks.map((track) => (
              <Card
                key={track.title}
                className={cn(
                  "border-border/50 bg-card/40 backdrop-blur-md transition-[border-color,box-shadow,transform] duration-300",
                  "hover:border-primary/25 hover:shadow-glow hover:-translate-y-1",
                )}
                style={{ transform: "translateZ(0)", willChange: "transform, box-shadow" }}
              >
                <CardHeader className="p-5 md:p-6">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <track.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-lg leading-snug">{track.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{track.text}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="glass-strong rounded-3xl p-6 md:p-10 text-center mt-12 mb-12">
            <h3 className="text-2xl font-bold mb-3">Want Structured AI Training?</h3>

            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              Move beyond theory with curated AI, Agent Engineering, LLM, RAG, and system design
              training tracks.
            </p>

            <Link
              to="/training"
              style={{ background: "linear-gradient(135deg, #9333ea, #000000)" }}
              className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-semibold text-foreground transition-all duration-300 hover:scale-105"
            >
              Explore Training Hub
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <InteractiveConsole className="pb-20" />
      </ScrollReveal>
      <Footer />
    </div>
  );
}
