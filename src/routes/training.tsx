import { useState, useEffect } from "react";
import {
  GraduationCap,
  Rocket,
  Compass,
  ArrowRight,
  Code2,
  BarChart3,
  Palette,
  Briefcase,
  Workflow,
  Bot,
  Play,
  Star,
  Users,
  Trophy,
  Clock,
  Search,
  Filter,
  BookOpen,
  Target,
  Sparkles,
} from "lucide-react";
import { Layout } from "@/components/sanixor/Layout";

const programs = [
  {
    id: "bootcamp",
    type: "Bootcamp",
    title: "AI Engineering Bootcamp",
    duration: "12 weeks",
    cohort: "Cohort Based",
    desc: "Ship a production-grade AI product. Mentorship from Sanixor engineers and weekly live builds.",
    features: ["Weekly live projects", "1:1 mentorship", "Career support", "Certificate"],
    color: 220,
    level: "Intermediate",
    price: "$2,499",
  },
  {
    id: "internship",
    type: "Internship",
    title: "Internship Program",
    duration: "3–6 months",
    cohort: "Paid",
    desc: "Work on real Sanixor products under senior engineers. Top performers convert to full-time.",
    features: ["Real production work", "Senior mentorship", "Stipend", "Conversion opportunity"],
    color: 280,
    level: "Beginner",
    price: "Paid",
  },
  {
    id: "career",
    type: "Career",
    title: "Career Guidance",
    duration: "Ongoing",
    cohort: "1:1 Sessions",
    desc: "Resume reviews, interview prep, and a private network of AI hiring managers.",
    features: ["Resume review", "Mock interviews", "Network access", "Lifetime updates"],
    color: 170,
    level: "All Levels",
    price: "$499",
  },
];

const tracks = [
  {
    icon: GraduationCap,
    title: "AI Engineering Bootcamp",
    duration: "12 weeks",
    cohort: "Cohort Based",
    desc: "Ship a production-grade AI product. Mentorship from Sanixor engineers and weekly live builds.",
    features: ["Weekly live projects", "1:1 mentorship", "Career support", "Certificate"],
    color: 220,
  },
  {
    icon: Rocket,
    title: "Internship Program",
    duration: "3–6 months",
    cohort: "Paid",
    desc: "Work on real Sanixor products under senior engineers. Top performers convert to full-time.",
    features: ["Real production work", "Senior mentorship", "Stipend", "Conversion opportunity"],
    color: 280,
  },
  {
    icon: Compass,
    title: "Career Guidance",
    duration: "Ongoing",
    cohort: "1:1 Sessions",
    desc: "Resume reviews, interview prep, and a private network of AI hiring managers.",
    features: ["Resume review", "Mock interviews", "Network access", "Lifetime updates"],
    color: 170,
  },
];

const domains = [
  {
    icon: Code2,
    title: "Technology & Development",
    desc: "Full-stack engineering, modern frameworks, and production systems.",
    color: 210,
  },
  {
    icon: BarChart3,
    title: "Data Analytics & BI",
    desc: "SQL, data warehousing, Power BI, Tableau — decisions from data.",
    color: 260,
  },
  {
    icon: Palette,
    title: "UI/UX & Product Design",
    desc: "Design systems, prototyping, and shipping delightful products.",
    color: 320,
  },
  {
    icon: Briefcase,
    title: "Career Skills",
    desc: "Resume, interview prep, communication — built for employability.",
    color: 180,
  },
  {
    icon: Workflow,
    title: "Automation & No-Code",
    desc: "Modern automation tools to remove repetitive workflows.",
    color: 240,
  },
  {
    icon: Bot,
    title: "Agentic AI",
    desc: "Advanced multi-agent architectures and intelligent system design.",
    color: 290,
  },
];

const stats = [
  { value: "500+", label: "Graduates", icon: Users },
  { value: "92%", label: "Placement Rate", icon: Trophy },
  { value: "4.9", label: "Average Rating", icon: Star },
  { value: "50+", label: "Hiring Partners", icon: Briefcase },
];

const learningPath = [
  {
    week: "Weeks 1-4",
    title: "Foundation",
    desc: "Python, ML fundamentals, neural networks",
    progress: 33,
  },
  {
    week: "Weeks 5-8",
    title: "Deep Dive",
    desc: "LLMs, agents, fine-tuning, deployment",
    progress: 66,
  },
  { week: "Weeks 9-11", title: "Build", desc: "Production project with team", progress: 90 },
  { week: "Week 12", title: "Launch", desc: "Demo day, portfolio, interviews", progress: 100 },
];

const programTypes = ["All", "Bootcamp", "Internship", "Career"];
const levels = ["All", "Beginner", "Intermediate", "Advanced", "All Levels"];

export default function TrainingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [activeTrack, setActiveTrack] = useState(0);

  const filteredPrograms = programs.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || p.type === selectedType;
    const matchesLevel = selectedLevel === "All" || p.level === selectedLevel;
    return matchesSearch && matchesType && matchesLevel;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[70vh] overflow-hidden bg-hero">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="absolute top-1/3 -left-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 -right-40 h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />

        <div className="relative mx-auto max-w-6xl px-6 pt-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              Now Enrolling for 2026
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
              Master <span className="text-gradient">AI.</span>
              <br />
              Build the Future.
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground mb-12">
              Go from beginner to AI engineer in 12 weeks. Project-based learning with mentorship
              from industry experts.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-8">
        <div className="glass-strong rounded-[2rem] p-6 shadow-elegant">
          <div className="flex flex-col gap-4">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl bg-muted/40 pl-12 pr-4 py-3 text-sm outline-none ring-1 ring-border focus:ring-primary"
              />
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-sm text-muted-foreground">Type:</span>
              {programTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedType === type
                      ? "bg-gradient-primary text-primary-foreground"
                      : "glass hover:bg-muted"
                  }`}
                >
                  {type}
                </button>
              ))}
              <span className="text-sm text-muted-foreground ml-4">Level:</span>
              {levels.slice(1).map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(selectedLevel === level ? "All" : level)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                    selectedLevel === level
                      ? "bg-gradient-primary text-primary-foreground"
                      : "glass hover:bg-muted"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Programs Available</h2>
          <p className="text-muted-foreground">{filteredPrograms.length} programs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="group glass rounded-[2rem] p-6 shadow-elegant transition-all duration-500 hover:shadow-glow hover:-translate-y-2 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full glass text-xs font-medium">
                  {program.type}
                </span>
                <span className="text-sm font-semibold text-primary">{program.price}</span>
              </div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, oklch(0.6 0.15 ${program.color}), oklch(0.4 0.12 ${program.color + 30}))`,
                }}
              >
                {program.type === "Bootcamp" && <GraduationCap className="h-5 w-5 text-white" />}
                {program.type === "Internship" && <Rocket className="h-5 w-5 text-white" />}
                {program.type === "Career" && <Compass className="h-5 w-5 text-white" />}
              </div>
              <h3 className="text-lg font-bold mb-2">{program.title}</h3>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {program.duration}
                </span>
                <span>·</span>
                <span>{program.level}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
                {program.desc}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {program.features.slice(2).map((f) => (
                  <span key={f} className="px-2 py-1 rounded-lg glass text-xs">
                    {f}
                  </span>
                ))}
              </div>
              <button className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105 mt-auto">
                Learn More <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              No programs match your criteria. Check back soon!
            </p>
          </div>
        )}
      </section>

      {/* Track Selector - Similar to hiring page */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Explore in Detail</h2>
          <p className="text-muted-foreground">Click to learn more about each program</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tracks.map((track, i) => (
            <button
              key={track.title}
              onClick={() => setActiveTrack(i)}
              className={`group px-5 py-3 rounded-2xl transition-all duration-500 ${
                activeTrack === i
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : "glass hover:bg-muted"
              }`}
            >
              <div className="flex items-center gap-3">
                <track.icon className="h-5 w-5" />
                <span className="font-medium text-sm whitespace-nowrap">{track.title}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="glass-strong rounded-[3rem] p-8 md:p-16 shadow-elegant relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: `radial-gradient(circle at 80% 20%, oklch(0.6 0.15 ${tracks[activeTrack].color}), transparent 50%)`,
            }}
          />
          <div className="relative grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Clock className="h-4 w-4" />
                {tracks[activeTrack].duration} · {tracks[activeTrack].cohort}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">{tracks[activeTrack].title}</h3>
              <p className="text-lg text-muted-foreground mb-8">{tracks[activeTrack].desc}</p>

              <div className="flex flex-wrap gap-3 mb-8">
                {tracks[activeTrack].features.map((f) => (
                  <span key={f} className="px-4 py-2 rounded-full glass text-sm">
                    {f}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <button className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105">
                  Apply Now <ArrowRight className="h-4 w-4" />
                </button>
                <button className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:bg-muted">
                  <Play className="h-4 w-4" /> Preview
                </button>
              </div>
            </div>

            <div className="relative">
              <div
                className="aspect-square rounded-3xl shadow-elegant"
                style={{
                  background: `linear-gradient(135deg, oklch(0.3 0.1 ${tracks[activeTrack].color}), oklch(0.15 0.05 ${tracks[activeTrack].color + 40}))`,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  {(() => {
                    const Icon = tracks[activeTrack].icon;
                    return <Icon className="h-32 w-32 text-white/30" />;
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Your Learning Journey</h2>
          <p className="text-muted-foreground">12 weeks of intensive, hands-on training</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {learningPath.map((step, i) => (
            <div key={i} className="relative">
              <div className="glass rounded-3xl p-6 h-full transition-all duration-500 hover:shadow-glow">
                <div className="text-sm text-primary font-medium mb-2">{step.week}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{step.desc}</p>
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-primary rounded-full transition-all duration-1000"
                    style={{ width: `${step.progress}%` }}
                  />
                </div>
              </div>
              {i < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills You'll Master</h2>
          <p className="text-muted-foreground">Comprehensive training across all AI domains</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((d) => (
            <div
              key={d.title}
              className="group glass rounded-3xl p-8 transition-all duration-500 hover:shadow-glow hover:-translate-y-2"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, oklch(0.6 0.15 ${d.color}), oklch(0.4 0.12 ${d.color + 30}))`,
                }}
              >
                <d.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{d.title}</h3>
              <p className="text-muted-foreground text-sm">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="glass-strong rounded-[3rem] p-12 md:p-16 text-center shadow-elegant relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Career?</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Join our next cohort and become job-ready in AI engineering. Limited seats available.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {/* <a
                href="/hiring"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105"
              >
                Apply Now <ArrowRight className="h-5 w-5" />
              </a> */}
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105"
              >
                Talk to Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
