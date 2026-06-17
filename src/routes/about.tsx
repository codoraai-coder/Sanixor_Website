import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/sanixor/ScrollReveal";
import { CTASection, Footer } from "@/components/sanixor/Footer";
import { Navbar } from "@/components/sanixor/Navbar";
import { ArrowRight, Target, Zap, Globe2, Briefcase, GraduationCap, Building2, Cpu } from "lucide-react";

export default function About() {
  const missionItems = [
    {
      icon: Cpu,
      title: "Automate Processes",
      desc: "Automate complex processes using advanced AI."
    },
    {
      icon: GraduationCap,
      title: "Empower Individuals",
      desc: "Empower individuals with industry-relevant skills."
    },
    {
      icon: Building2,
      title: "Scalable Solutions",
      desc: "Build scalable, highly resilient enterprise solutions."
    },
    {
      icon: Briefcase,
      title: "Responsible AI",
      desc: "Promote ethical and responsible AI adoption worldwide."
    }
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background snx-page">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      </div>

      <Navbar />

      <section className="hero relative min-h-[80vh] flex flex-col justify-center">
        <div className="hero-glow" />
        <div className="hero-grid" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center w-full max-w-6xl px-4 mx-auto"
        >
          <div className="hero-tag">
            <Globe2 className="h-4 w-4" /> About Us
          </div>
          <h1 className="max-w-5xl text-center text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Culture, Work, and <span className="grad">Automation</span>
          </h1>
          <p className="hero-sub max-w-3xl text-center mt-4 text-xl leading-relaxed text-muted-foreground">
            Sanixor AI is an AI-first technology company focused on building intelligent products, agentic services, and enterprise automation solutions.
          </p>
        </motion.div>
      </section>

      <ScrollReveal delay={100}>
        <section className="relative z-10 border-y border-border/30 bg-card/20 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative h-[500px] rounded-3xl overflow-hidden border border-border/50 shadow-glow">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000" 
                  alt="Team Collaboration" 
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              </div>
              
              <div>
                <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
                  <Target className="w-8 h-8 text-primary" /> Our Vision
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                  To create intelligent systems that seamlessly collaborate with humans, enabling smarter decisions, efficient workflows, and scalable innovation.
                </p>

                <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                  <Zap className="w-8 h-8 text-primary" /> Our Mission
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {missionItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      className="p-6 rounded-2xl bg-card/40 border border-border/50 backdrop-blur-sm"
                    >
                      <item.icon className="w-8 h-8 text-primary mb-4" />
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
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
