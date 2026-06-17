import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/sanixor/ScrollReveal";
import { CTASection, Footer } from "@/components/sanixor/Footer";
import { Navbar } from "@/components/sanixor/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, BrainCircuit, Blocks, Lightbulb, Link2, MonitorDot, Wrench } from "lucide-react";

export default function CustomAgentDev() {
  const features = [
    {
      icon: Blocks,
      title: "End-to-End Automation",
      desc: "Complete automation pipelines that span across your entire tech stack seamlessly."
    },
    {
      icon: MonitorDot,
      title: "Domain-Specific AI Agents",
      desc: "Agents trained exclusively on your domain logic, vocabulary, and proprietary knowledge."
    },
    {
      icon: Link2,
      title: "Enterprise Workflow Integration",
      desc: "Direct integration into your existing ERP, CRM, and internal communication tools."
    },
    {
      icon: Lightbulb,
      title: "Decision Intelligence Systems",
      desc: "AI that doesn't just execute, but advises and predicts outcomes based on historical data."
    },
    {
      icon: BrainCircuit,
      title: "Custom Model Development",
      desc: "Fine-tuning open source or proprietary LLMs specifically for your unique use cases."
    },
    {
      icon: Wrench,
      title: "Scalable Enterprise Architecture",
      desc: "Deployed on highly available infrastructure designed for massive enterprise loads."
    }
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center w-full max-w-6xl px-4"
        >
          <div className="hero-tag">
            <Wrench className="h-4 w-4" /> Bespoke Engineering
          </div>
          <h1 className="max-w-5xl text-center text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Customized Agentic <span className="grad">Solutions</span>
          </h1>
          <p className="hero-sub max-w-3xl text-center mt-4 text-lg md:text-xl leading-relaxed text-muted-foreground">
            Tailor-made AI automation systems designed specifically around an organization's workflows, operational processes, and business objectives.
          </p>
          
          <div className="hero-actions mt-10">
            <a href="#details" className="snx-btn-primary">
              Learn About Custom Dev <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-full mt-16 rounded-2xl overflow-hidden border border-border/50 shadow-glow relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000" 
              alt="Engineering" 
              className="w-full h-[400px] object-cover opacity-70"
            />
          </motion.div>
        </motion.div>
      </section>

      <ScrollReveal delay={100}>
        <section id="details" className="relative z-10 border-y border-border/30 bg-card/20 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-16">
              <motion.div whileHover={{ scale: 1.02 }} className="glass-strong rounded-3xl p-10 border-l-4 border-l-destructive/60">
                <h3 className="text-2xl font-bold mb-4 text-destructive-foreground">Problem Statement</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Generic AI tools often fail to address industry-specific requirements, proprietary data structures, and unique organizational workflows.
                </p>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} className="glass-strong rounded-3xl p-10 border-l-4 border-l-primary/60">
                <h3 className="text-2xl font-bold mb-4 text-primary">Solution</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Sanixor AI designs, develops, and deploys custom AI agents and automation ecosystems aligned to each client's exact business requirements.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="relative z-10 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">Capabilities</p>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Key Features</h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                  <Card className="group h-full relative overflow-hidden border-border/50 bg-card/40 backdrop-blur-xl transition-all duration-500 hover:border-primary/25 hover:-translate-y-2 hover:shadow-glow">
                    <CardHeader>
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                        <feat.icon className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                      <CardTitle className="text-xl">{feat.title}</CardTitle>
                      <CardDescription className="text-base mt-2">{feat.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="relative z-10 border-y border-border/30 bg-card/20 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative h-[400px] rounded-3xl overflow-hidden border border-border/50 glow-ring order-2 md:order-1">
                <img 
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000" 
                  alt="Custom Solutions" 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-transparent p-10 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold mb-3 text-white">Value Proposition</h3>
                  <p className="text-xl text-gray-300 font-light leading-relaxed">
                    Delivering AI systems that fit business operations precisely, maximizing automation effectiveness and ROI.
                  </p>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <h3 className="text-2xl font-bold mb-6 text-primary">Target Customers</h3>
                <ul className="space-y-3">
                  {["Enterprises", "Manufacturing Companies", "Healthcare Organizations", "Financial Institutions", "Government Agencies", "High-Growth Startups"].map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 text-lg text-muted-foreground"
                    >
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <CTASection className="py-20" />
      </ScrollReveal>
      <Footer />
    </div>
  );
}
