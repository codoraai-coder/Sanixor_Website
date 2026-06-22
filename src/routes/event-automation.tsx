import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/sanixor/ScrollReveal";
import { Footer } from "@/components/sanixor/Footer";
import { InteractiveConsole } from "@/components/sanixor/InteractiveConsole";
import { Navbar } from "@/components/sanixor/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CalendarClock, Mail, MessageSquare, Ticket, Users } from "lucide-react";

export default function EventAutomation() {
  const features = [
    {
      icon: Users,
      title: "Smart Registration",
      desc: "Agents autonomously vet applications, parse resumes, and categorize attendees based on their profiles to optimize team formations."
    },
    {
      icon: MessageSquare,
      title: "24/7 Support Bot",
      desc: "A dedicated LLM instance trained on your event docs answers attendee questions via Discord, Slack, or Web Chat instantly."
    },
    {
      icon: CalendarClock,
      title: "Dynamic Scheduling",
      desc: "Automatically handle drop-outs, adjust presentation times, and notify judges of schedule shifts without manual spreadsheet edits."
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="hero-tag">
            <Ticket className="h-4 w-4" /> Logistics AI
          </div>
          <h1 className="max-w-4xl text-center">
            Autonomous Event <span className="grad">Automation</span>
          </h1>
          <p className="hero-sub max-w-2xl text-center mt-6">
            Streamline management for hackathons, conferences, and massive corporate events. Let AI handle the logistics, communication, and scheduling so you can focus on the experience.
          </p>
          <div className="hero-actions mt-8">
            <a href="#features" className="snx-btn-primary">
              See How It Works <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </section>

      <ScrollReveal delay={100}>
        <section id="features" className="relative z-10 border-y border-border/30 bg-card/20 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">Core Modules</p>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Run Events On Autopilot</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Say goodbye to chaotic discord channels and broken spreadsheets. Our agents orchestrate your event flawlessly.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              {features.map((feat, idx) => (
                <Card key={idx} className="group relative overflow-hidden border-border/50 bg-card/40 backdrop-blur-xl transition-all duration-500 hover:border-primary/25 hover:shadow-glow">
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
