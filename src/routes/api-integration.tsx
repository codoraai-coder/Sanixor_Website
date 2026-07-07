import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/sanixor/ScrollReveal";
import { Footer } from "@/components/sanixor/Footer";
import { InteractiveConsole } from "@/components/sanixor/InteractiveConsole";
import { Navbar } from "@/components/sanixor/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Braces, Cable, FileJson, Link2 } from "lucide-react";

export default function APIIntegration() {
  const features = [
    {
      icon: FileJson,
      title: "Comprehensive SDKs",
      desc: "Integrate quickly with our official client libraries for Python, Node.js, and Go, complete with full typing support.",
    },
    {
      icon: Cable,
      title: "Legacy System Support",
      desc: "We build custom adapters allowing modern AI agents to interact with on-premise databases and legacy enterprise software.",
    },
    {
      icon: Braces,
      title: "Real-time Webhooks",
      desc: "Receive instant, event-driven updates on agent state changes, completed tasks, and generated artifacts.",
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
            <Link2 className="h-4 w-4" /> Enterprise Connectivity
          </div>
          <h1 className="max-w-4xl text-center">
            Seamless API <span className="grad">Integration</span>
          </h1>
          <p className="hero-sub max-w-2xl text-center mt-6">
            AI is only as powerful as the systems it can interact with. Connect our advanced agentic
            capabilities directly to your internal tools, CRMs, ERPs, and customer-facing apps.
          </p>
          <div className="hero-actions mt-8">
            <a href="#features" className="snx-btn-primary">
              View Documentation <ArrowRight className="ml-2 w-4 h-4" />
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
                Integration Features
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Connect Everything</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Our APIs are designed by engineers, for engineers. Expect predictable responses,
                robust error handling, and sub-millisecond routing latency.
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
