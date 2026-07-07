import { Layout } from "@/components/sanixor/Layout";
import { Link } from "react-router-dom";
import { Trophy, Award, Rocket, TrendingUp, Users, Star, ArrowRight } from "lucide-react";

// NOTE: Placeholder content — swap these milestones/stats for real achievements,
// press mentions, and metrics as they land. Structure is ready to drop data into.
const stats = [
  { value: "50+", label: "AI agents shipped" },
  { value: "10k+", label: "Submissions evaluated" },
  { value: "95%+", label: "Code-analysis accuracy" },
  { value: "3", label: "Flagship products" },
];

const milestones = [
  {
    icon: Rocket,
    title: "HackEval launched",
    desc: "The first agent-powered hackathon evaluation platform — grading decks and dissecting repos end-to-end.",
  },
  {
    icon: TrendingUp,
    title: "Evaluations at scale",
    desc: "Thousands of hackathon submissions assessed with consistent, explainable scoring.",
  },
  {
    icon: Star,
    title: "A growing product suite",
    desc: "BitBench, Sanixor Studio, LexAI and AutoDash — built on one agent platform.",
  },
  {
    icon: Users,
    title: "Community & partnerships",
    desc: "Working with institutions and builders across the AgentVerse ecosystem.",
  },
  {
    icon: Award,
    title: "Recognized for innovation",
    desc: "Acknowledged for pushing what autonomous AI agents can evaluate and automate.",
  },
  {
    icon: Trophy,
    title: "More on the way",
    desc: "New milestones ship every quarter — this page grows with the team.",
  },
];

export default function Achievements() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-4 pt-16 pb-10 text-center md:pt-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-sm font-medium text-amber-400">
          <Trophy className="h-4 w-4" />
          Milestones
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
          Our <span className="text-amber-400">Achievements</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          The milestones, metrics, and moments that mark Sanixor AI's journey building autonomous
          agents that ship real outcomes.
        </p>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="rounded-2xl border border-foreground/10 bg-foreground/5 p-6 text-center"
            >
              <div className="text-3xl font-bold text-amber-400 md:text-4xl">{value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Milestones */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {milestones.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-2xl border border-foreground/10 bg-foreground/5 p-6 transition-all duration-300 hover:border-amber-400/30 hover:bg-foreground/[0.08]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400 transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-24 pt-6 text-center">
        <p className="text-muted-foreground">Want to build the next milestone with us?</p>
        <Link
          to="/hiring"
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-6 py-3 font-medium text-amber-400 transition-colors duration-300 hover:bg-amber-400/20"
        >
          See open roles
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </Layout>
  );
}
