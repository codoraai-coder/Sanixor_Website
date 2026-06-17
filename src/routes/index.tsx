import { ScrollReveal } from "@/components/sanixor/ScrollReveal";
import { AgentVerse2 } from "@/components/sanixor/AgentVerse2";
import { ArrowRight, ArrowUpRight, Cpu, FlaskConical, GraduationCap, Network } from "lucide-react";
import { HeroParallax } from "@/components/sanixor/HeroParallax";
import { CTASection, Footer } from "@/components/sanixor/Footer";
import { Navbar } from "@/components/sanixor/Navbar";
import { ProductCarousel } from "@/components/sanixor/ProductCarousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

const services = [
  {
    num: "01",
    title: "Agent as a Service",
    description:
      "Deploy a Sanixor-built AI agent into your product, workflow, or event. We handle architecture, fine-tuning, and integration — you get a working agent from day one.",
    tags: ["API Integration", "Event Automation", "Custom Workflows", "Managed Hosting"],
    image: "https://kceggzvolonyqavvowwc.supabase.co/storage/v1/object/public/codoora/growtika-nGoCBxiaRO0-unsplash.jpg",
  },
  {
    num: "02",
    title: "Custom Agent Development",
    description:
      "Have a problem that needs a tailored AI solution? We scope, design, and build custom agents for legal, educational, financial, or technical domains — with full handover.",
    tags: ["Domain-Specific", "Full Ownership", "Docs & Handover", "Institutional"],
    image: "https://kceggzvolonyqavvowwc.supabase.co/storage/v1/object/public/codoora/mohammad-rahmani-_Fx34KeqIEw-unsplash.jpg",
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
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">{label}</p>
      <h2 className="text-3xl font-bold tracking-tight md:text-5xl">{title}</h2>
      <p className="mt-4 text-muted-foreground md:text-lg">{description}</p>
    </div>
  );
}

export default function Index() {
  return (
    <div id="main-content" className="relative min-h-screen overflow-x-hidden bg-background">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      </div>

      <Navbar />
      <HeroParallax />

      {/* Products */}
      <ScrollReveal>
        <section id="products" className="relative z-10 bg-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <SectionHeader
              label="Products"
              title="Every tool is an AI agent."
              description="Six purpose-built AI products — each solving a real problem with real accuracy, not demo-mode results."
            />
          </div>
          <ProductCarousel />
        </section>
      </ScrollReveal>

      {/* Services */}
      <ScrollReveal delay={100}>
        <section id="services" className="border-y border-border/30 bg-card/20 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <SectionHeader
              label="Services"
              title="Agents, on demand."
              description="We don't just build our own agents — we build yours. Fully customised, production-ready, and actually deployed."
            />
            <div className="grid gap-6 md:grid-cols-2">
              {services.map((service) => (
                <Card
                  key={service.num}
                  className="group relative overflow-hidden border-border/50 bg-card/40 backdrop-blur-xl transition-all duration-500 hover:border-primary/25 hover:shadow-glow"
                >
                  {service.image && (
                    <div className="relative h-64 w-full overflow-hidden md:h-80">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>
                  )}
                  <CardHeader>
                    <span className="text-4xl font-bold text-primary/20">{service.num}</span>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-primary/20 bg-primary/5 text-primary"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Event */}
      <ScrollReveal delay={100}>
        <section id="event" className="mx-auto max-w-[1500px] px-4 py-20 md:px-6 md:py-28">
          <AgentVerse2 />
        </section>
      </ScrollReveal>

      {/* Learn */}
      <ScrollReveal delay={100}>
        <section id="learn" className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <SectionHeader
            label="Reading & Learning"
            title="Architecture-level AI fundamentals."
            description="Not tutorials. Deep, engineering-grade content on how AI systems actually work — written for people who want to build, not just use."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {learningTracks.map((track) => (
              <Card
                key={track.title}
                className={cn(
                  "border-border/50 bg-card/40 backdrop-blur-xl transition-all",
                  "hover:border-primary/25 hover:shadow-glow",
                )}
              >
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <track.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-lg leading-snug">{track.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{track.text}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="glass-strong rounded-3xl p-10 text-center mt-12 mb-12">
  <h3 className="text-2xl font-bold mb-3">
    Want Structured AI Training?
  </h3>

  <p className="text-muted-foreground max-w-xl mx-auto mb-6">
    Move beyond theory with curated AI, Agent Engineering,
    LLM, RAG, and system design training tracks.
  </p>

  <Link
    to="/training"
    className="group inline-flex items-center gap-3 rounded-full bg-gradient-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105"
  >
    Explore Training Hub
    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
  </Link>
</div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <CTASection className="pb-20" />
      </ScrollReveal>
      <Footer />
    </div>
  );
}
