import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/sanixor/ScrollReveal";
import { Footer } from "@/components/sanixor/Footer";
import { InteractiveConsole } from "@/components/sanixor/InteractiveConsole";
import { Navbar } from "@/components/sanixor/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Boxes, GitBranch, PenTool, Rocket, Workflow } from "lucide-react";

export default function SanixorStudio() {
  const features = [
    {
      icon: Workflow,
      title: "Visual Node Editor",
      desc: "Drag-and-drop interface for constructing complex agent workflows. Connect LLMs, tools, memory stores, and logic gates without writing boilerplate.",
    },
    {
      icon: GitBranch,
      title: "Logic & Routing",
      desc: "Implement conditional branching, human-in-the-loop checkpoints, and semantic routing directly on the canvas.",
    },
    {
      icon: Rocket,
      title: "One-Click Deploy",
      desc: "Instantly compile your visual workflow into a scalable, high-performance API endpoint hosted on Sanixor's edge infrastructure.",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background snx-page">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      </div>

      <Navbar />

      <section className="hero relative min-h-[90vh]">
        <div className="hero-glow" />
        <div className="hero-grid" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="hero-tag">
            <PenTool className="h-4 w-4" /> Agentic IDE
          </div>
          <h1 className="max-w-4xl text-center">
            Build Agents <span className="grad">Visually</span>
          </h1>
          <p className="hero-sub max-w-2xl text-center mt-6">
            Sanixor Studio is a powerful visual development environment that empowers engineers and
            domain experts to design, test, and deploy multi-agent architectures effortlessly.
          </p>
          <div className="hero-actions mt-8">
            <a href="#features" className="snx-btn-primary">
              Discover Studio <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </section>

      <ScrollReveal delay={100}>
        <section
          id="features"
          className="relative z-10 border-y border-border/30 bg-card/20 py-20 md:py-28"
        >
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Architecture Made Easy
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                From Idea to Endpoint
              </h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Stop fighting with complex orchestration libraries. Studio gives you a birds-eye
                view of your agent's thought process, memory, and tool execution.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {features.map((feat, idx) => (
                <Card
                  key={idx}
                  className="group relative overflow-hidden border-border/50 bg-card/40 backdrop-blur-xl transition-all duration-500 hover:border-primary/25 hover:shadow-glow"
                >
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                      <feat.icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <CardTitle className="text-xl">{feat.title}</CardTitle>
                    <CardDescription className="text-base mt-2">{feat.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-20 glass-strong rounded-3xl p-10 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-xl">
                <h3 className="text-2xl font-bold mb-4">Extensible Tool Library</h3>
                <p className="text-muted-foreground">
                  Access hundreds of pre-built integrations for databases, web search, APIs, and
                  business tools. Need something specific? Write custom TypeScript tools directly in
                  the browser and inject them into your workflow.
                </p>
                <div className="flex gap-3 mt-6 flex-wrap">
                  <Badge
                    variant="outline"
                    className="border-primary/30 bg-primary/10 px-3 py-1 text-sm"
                  >
                    TypeScript Support
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-primary/30 bg-primary/10 px-3 py-1 text-sm"
                  >
                    Python Support
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-primary/30 bg-primary/10 px-3 py-1 text-sm"
                  >
                    NPM Modules
                  </Badge>
                </div>
              </div>
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative w-48 h-48 rounded-2xl border border-primary/20 bg-primary/5 flex items-center justify-center glow-ring overflow-hidden">
                  <Boxes className="w-20 h-20 text-primary-glow animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <InteractiveConsole className="py-20" />
      </ScrollReveal>
      <Footer />
    </div>
  );
}
