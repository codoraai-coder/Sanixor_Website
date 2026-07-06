import { useState } from "react";
import {
  Briefcase,
  MapPin,
  Link2,
  ArrowRight,
  Search,
  Users,
  Building2,
  Globe,
  Sparkles,
} from "lucide-react";
import { Layout } from "@/components/sanixor/Layout";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { formService } from "@/services/form.service";
import { Spinner } from "@/components/ui/spinner";

const jobs = [
  {
    role: "Senior AI Engineer",
    location: "Bengaluru / Remote",
    type: "Full-time",
    team: "Engineering",
    desc: "Lead production model development across HackEval and BitBench.",
    color: 220,
  },
  {
    role: "ML Research Scientist",
    location: "Remote",
    type: "Full-time",
    team: "Research",
    desc: "Push the frontier on bias-detection and explainable AI.",
    color: 280,
  },
  {
    role: "Product Designer",
    location: "Bengaluru",
    type: "Full-time",
    team: "Design",
    desc: "Design premium, interactive surfaces for our AI products.",
    color: 170,
  },
  {
    role: "Growth Engineer",
    location: "Remote",
    type: "Full-time",
    team: "Growth",
    desc: "Own the funnel — from landing to activation, instrumented end-to-end.",
    color: 210,
  },
  {
    role: "Senior Backend Engineer",
    location: "Bengaluru",
    type: "Full-time",
    team: "Engineering",
    desc: "Build scalable APIs and infrastructure for AI products.",
    color: 240,
  },
  {
    role: "Technical Writer",
    location: "Remote",
    type: "Part-time",
    team: "Content",
    desc: "Create documentation and tutorials for developer experience.",
    color: 190,
  },
];

const teams = ["All", "Engineering", "Research", "Design", "Growth", "Content"];
const locations = ["All", "Remote", "Bengaluru"];

const stats = [
  { value: "50+", label: "Team Members" },
  { value: "4", label: "Offices" },
  { value: "15+", label: "Countries" },
  { value: "4.9", label: "Glassdoor Rating" },
];

export default function HiringPage() {
  const [applyTo, setApplyTo] = useState<string | null>(null);
  const [applicant, setApplicant] = useState({
    name: "",
    email: "",
    linkedin: "",
    portfolio: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");

  const resetApplicant = () =>
    setApplicant({ name: "", email: "", linkedin: "", portfolio: "" });

  // Reusable submission lifecycle: loading, toast, error handling, dedupe guard.
  const { submit: submitApplication, isSubmitting } = useFormSubmission({
    submit: formService.submitHiring,
    successMessage: "Application received — we'll be in touch if there's a match.",
    onSuccess: () => {
      setApplyTo(null);
      resetApplicant();
    },
  });

  const handleApplicantChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setApplicant((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyTo) return;
    await submitApplication({
      name: applicant.name,
      email: applicant.email,
      role: applyTo,
      linkedin: applicant.linkedin || undefined,
      portfolio: applicant.portfolio || undefined,
    });
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTeam = selectedTeam === "All" || job.team === selectedTeam;
    const matchesLocation =
      selectedLocation === "All" ||
      (selectedLocation === "Remote"
        ? job.location.includes("Remote")
        : job.location.includes("Bengaluru"));
    return matchesSearch && matchesTeam && matchesLocation;
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
              We're Hiring!
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
              Join the <span className="text-gradient">future</span> of AI
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground mb-12">
              Work on challenging problems with smart people. Build products used by thousands of
              developers worldwide.
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
      <section className="mx-auto max-w-6xl px-6 -mt-8">
        <div className="glass-strong rounded-[2rem] p-6 shadow-elegant">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search roles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl bg-muted/40 pl-12 pr-4 py-3 text-sm outline-none ring-1 ring-border focus:ring-primary"
              />
            </div>
            <div className="flex gap-2">
              {teams.map((team) => (
                <button
                  key={team}
                  onClick={() => setSelectedTeam(team)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedTeam === team
                      ? "bg-gradient-primary text-primary-foreground"
                      : "glass hover:bg-muted"
                  }`}
                >
                  {team}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Open Positions</h2>
          <p className="text-muted-foreground">{filteredJobs.length} roles available</p>
        </div>

        <div className="grid gap-4">
          {filteredJobs.map((job) => (
            <div
              key={job.role}
              className="group glass rounded-2xl p-6 shadow-elegant transition-all duration-500 hover:shadow-glow hover:-translate-y-1"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, oklch(0.6 0.15 ${job.color}), oklch(0.4 0.12 ${job.color + 30}))`,
                    }}
                  >
                    <Briefcase className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {job.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {job.location}
                      </span>
                      <span>·</span>
                      <span>{job.type}</span>
                      <span>·</span>
                      <span className="px-2 py-0.5 rounded-full glass text-xs">{job.team}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm text-muted-foreground hidden md:block max-w-xs">
                    {job.desc}
                  </p>
                  <button
                    onClick={() => setApplyTo(job.role)}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105"
                  >
                    Apply <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No roles match your criteria. Check back soon!</p>
          </div>
        )}
      </section>

      {/* Culture */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Why Sanixor?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Smart teammates</h3>
                  <p className="text-sm text-muted-foreground">
                    Work with people who push you to be better.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Great culture</h3>
                  <p className="text-sm text-muted-foreground">
                    Remote-first, flexible hours, and autonomy.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
                  <Globe className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Impact at scale</h3>
                  <p className="text-sm text-muted-foreground">
                    Build products used by thousands daily.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-[2rem] overflow-hidden glass-strong p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-gradient mb-2">4.9</div>
                <p className="text-muted-foreground">Glassdoor Rating</p>
                <div className="flex justify-center gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 rounded-full bg-primary" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Modal */}
      {applyTo && (
        <div
          className="fixed inset-0 z-[200] grid place-items-center bg-background/80 backdrop-blur-xl p-6"
          onClick={() => setApplyTo(null)}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleApplySubmit}
            className="w-full max-w-lg rounded-[2rem] glass-strong p-8 shadow-elegant"
          >
            <h3 className="text-2xl font-bold mb-2">Apply for {applyTo}</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Tell us about yourself and we'll get back to you.
            </p>
            <div className="space-y-4">
              <input
                required
                name="name"
                value={applicant.name}
                onChange={handleApplicantChange}
                placeholder="Full name"
                autoComplete="name"
                className="w-full rounded-xl bg-muted/40 px-4 py-3 text-sm outline-none ring-1 ring-border focus:ring-primary"
              />
              <input
                required
                type="email"
                name="email"
                value={applicant.email}
                onChange={handleApplicantChange}
                placeholder="Email"
                autoComplete="email"
                className="w-full rounded-xl bg-muted/40 px-4 py-3 text-sm outline-none ring-1 ring-border focus:ring-primary"
              />
              <input
                required
                type="url"
                name="linkedin"
                value={applicant.linkedin}
                onChange={handleApplicantChange}
                placeholder="LinkedIn URL"
                className="w-full rounded-xl bg-muted/40 px-4 py-3 text-sm outline-none ring-1 ring-border focus:ring-primary"
              />
              <div className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-muted/20 px-4 py-3 focus-within:border-primary transition-colors">
                <Link2 className="h-4 w-4 text-primary shrink-0" />
                <input
                  type="url"
                  name="portfolio"
                  value={applicant.portfolio}
                  onChange={handleApplicantChange}
                  placeholder="Portfolio / resume link (optional)"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <>
                  <Spinner className="h-4 w-4" /> Submitting…
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </form>
        </div>
      )}
    </Layout>
  );
}
