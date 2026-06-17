import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/sanixor/ScrollReveal";
import { CTASection, Footer } from "@/components/sanixor/Footer";
import { Navbar } from "@/components/sanixor/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, BarChart2, Eye, FileSpreadsheet, LayoutTemplate, PieChart, ShieldAlert } from "lucide-react";

export default function AutoDash() {
  const features = [
    {
      icon: LayoutTemplate,
      title: "Automated Dashboard Generation",
      desc: "Instantly create fully interactive dashboards from raw datasets without writing SQL or dragging and dropping."
    },
    {
      icon: LineChartIcon,
      title: "Predictive Analytics",
      desc: "Forecast trends and predict future outcomes automatically using built-in machine learning models."
    },
    {
      icon: Eye,
      title: "Real-Time Monitoring",
      desc: "Dashboards update instantaneously as underlying data sources change, ensuring you never miss a beat."
    },
    {
      icon: ShieldAlert,
      title: "Anomaly Detection",
      desc: "AI automatically flags outliers, unexpected drops in revenue, or spikes in errors and alerts your team."
    },
    {
      icon: PieChart,
      title: "Business Intelligence Integration",
      desc: "Works natively alongside your existing BI tools rather than forcing a complete platform replacement."
    },
    {
      icon: FileSpreadsheet,
      title: "Automated Reporting",
      desc: "Schedule PDF and web reports summarizing key insights to be sent to executives and stakeholders."
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
            <BarChart2 className="h-4 w-4" /> AI Analytics
          </div>
          <h1 className="max-w-5xl text-center text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Intelligent <span className="grad">AutoDash</span>
          </h1>
          <p className="hero-sub max-w-3xl text-center mt-4 text-lg md:text-xl leading-relaxed text-muted-foreground">
            AutoDash is an AI-powered analytics and dashboard automation platform that converts raw data into intelligent visualizations, predictive insights, and real-time business intelligence.
          </p>
          
          <div className="hero-actions mt-10">
            <a href="#details" className="snx-btn-primary">
              See the Dashboards <ArrowRight className="ml-2 w-4 h-4" />
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
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000" 
              alt="Analytics Dashboard" 
              className="w-full h-[400px] object-cover opacity-60"
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
                  Organizations spend significant time and resources manually building dashboards and generating reports from fragmented data sources.
                </p>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} className="glass-strong rounded-3xl p-10 border-l-4 border-l-primary/60">
                <h3 className="text-2xl font-bold mb-4 text-primary">Solution</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  AutoDash automates data analysis and dashboard generation, enabling businesses to gain actionable insights instantly without waiting for a data team.
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
              <div>
                <h3 className="text-2xl font-bold mb-6 text-primary">Target Customers</h3>
                <ul className="space-y-3">
                  {["Enterprises", "Startups", "Data Teams", "Operations Teams", "Business Analysts"].map((item, i) => (
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

                <h3 className="text-2xl font-bold mb-4 mt-12 text-primary">Integrations</h3>
                <div className="flex flex-wrap gap-3">
                  {["Power BI", "Tableau", "SQL Databases", "Custom APIs"].map((intg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium border border-primary/20"
                    >
                      {intg}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative h-[400px] rounded-3xl overflow-hidden border border-border/50 glow-ring">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000" 
                  alt="Business Intelligence" 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/80 to-transparent p-10 flex flex-col justify-end">
                  <h3 className="text-3xl font-bold mb-3 text-white">Value Proposition</h3>
                  <p className="text-xl text-gray-300 font-light leading-relaxed">
                    Turning raw data into actionable intelligence with minimal manual effort.
                  </p>
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

// Quick fallback for icon name error in lucide
const LineChartIcon = ({ className, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M3 3v18h18"/>
    <path d="m19 9-5 5-4-4-3 3"/>
  </svg>
);
