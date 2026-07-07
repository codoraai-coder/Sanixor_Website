import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/sanixor/ScrollReveal";
import { Footer } from "@/components/sanixor/Footer";
import { InteractiveConsole } from "@/components/sanixor/InteractiveConsole";
import { Navbar } from "@/components/sanixor/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Share2, MessageSquare, Globe } from "lucide-react";

export default function SocioAi() {
  const features = [
    {
      icon: Share2,
      title: "Omnichannel Linking",
      desc: "Connect all your social media accounts in one place. Publish, schedule, and manage content across every platform simultaneously.",
    },
    {
      icon: Users,
      title: "Intelligent CRM",
      desc: "Automatically track interactions, build unified user profiles, and segment your audience using AI-driven behavioral analysis.",
    },
    {
      icon: MessageSquare,
      title: "Automated Engagement",
      desc: "Deploy intelligent agents to reply to common queries, filter spam, and escalate high-value interactions instantly.",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <Navbar />

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
            <Globe className="h-3.5 w-3.5" /> Social Media CRM
          </Badge>
          <h1 className="max-w-5xl text-center flex flex-col items-center leading-[0.85] tracking-tight mb-8">
            <span className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[9rem] font-extrabold pb-0">
              <span className="text-white">Socio</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-purple-400 to-purple-700">
                Ai
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
            The ultimate intelligent CRM tool designed for linking, managing, and automating all
            your social media platforms from a single powerful interface.
          </p>
          <div className="hero-actions mt-8">
            <a href="#features" className="snx-btn-primary">
              Connect Accounts <ArrowRight className="ml-2 w-4 h-4" />
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
                Socio Ai Features
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Unify Your Presence</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Stop jumping between apps. Socio Ai brings all your followers, messages, and
                analytics into one smart, automated dashboard.
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
