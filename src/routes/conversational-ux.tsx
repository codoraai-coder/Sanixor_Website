import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/sanixor/ScrollReveal";
import { Footer } from "@/components/sanixor/Footer";
import { InteractiveConsole } from "@/components/sanixor/InteractiveConsole";
import { Navbar } from "@/components/sanixor/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Smile, Mic, MessageSquare, Shield, Zap, Sparkles } from "lucide-react";

export default function ConversationalUX() {
  const features = [
    {
      icon: Smile,
      title: "Sentiment Tracking",
      desc: "Real-time emotion detection during interactions to guide responses.",
    },
    {
      icon: MessageSquare,
      title: "Contextual Memory",
      desc: "Remembering user preferences across sessions for a personalized experience.",
    },
    {
      icon: Mic,
      title: "Voice & Text",
      desc: "Seamless switching between spoken and typed input interfaces.",
    },
    {
      icon: Shield,
      title: "Empathy Routing",
      desc: "Escalating to human agents based on user frustration or complex needs.",
    },
    {
      icon: Zap,
      title: "Low Latency",
      desc: "Lightning-fast conversational responses for natural dialogue flow.",
    },
    {
      icon: Sparkles,
      title: "Next-Gen Interfaces",
      desc: "Moving beyond chat boxes to immersive conversational experiences.",
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center w-full max-w-6xl px-4"
        >
          <div className="hero-tag">
            <Smile className="h-4 w-4" /> User Experience
          </div>
          <h1 className="max-w-5xl text-center text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Conversational <span className="grad">UX</span>
          </h1>
          <p className="hero-sub max-w-3xl text-center mt-4 text-lg md:text-xl leading-relaxed text-muted-foreground">
            Design and deploy next-generation conversational interfaces that understand context,
            sentiment, and user intent across voice and text.
          </p>

          <div className="hero-actions mt-10">
            <a href="#details" className="snx-btn-primary">
              Explore Features <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-full mt-16 rounded-2xl overflow-hidden border border-border/50 shadow-glow relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=2000"
              alt="Conversational UX"
              className="w-full h-[400px] object-cover opacity-60"
            />
          </motion.div>
        </motion.div>
      </section>

      <ScrollReveal delay={100}>
        <section
          id="details"
          className="relative z-10 border-y border-border/30 bg-card/20 py-20 md:py-28"
        >
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-16">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-strong rounded-3xl p-10 border-l-4 border-l-destructive/60"
              >
                <h3 className="text-2xl font-bold mb-4 text-destructive-foreground">
                  Problem Statement
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Standard chatbots often frustrate users due to a lack of context, empathy, and
                  inability to handle complex, nuanced queries smoothly.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-strong rounded-3xl p-10 border-l-4 border-l-primary/60"
              >
                <h3 className="text-2xl font-bold mb-4 text-primary">Solution</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Conversational UX integrates sentiment tracking and contextual memory to deliver
                  natural, engaging, and highly effective AI interactions.
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
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Capabilities
              </p>
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
              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary">Target Customers</h3>
                <ul className="space-y-3">
                  {[
                    "Product Teams",
                    "Customer Experience Leaders",
                    "Support Departments",
                    "E-commerce Brands",
                    "App Developers",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
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

              <div className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden border border-border/50 glow-ring">
                <img
                  src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=1000"
                  alt="Conversational Experience"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/80 to-transparent p-10 flex flex-col justify-end">
                  <h3 className="text-3xl font-bold mb-3 text-foreground">Value Proposition</h3>
                  <p className="text-xl text-gray-300 font-light">
                    Move beyond simple chat boxes to truly immersive and empathetic conversational
                    experiences.
                  </p>
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
