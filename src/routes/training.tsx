import { useState } from "react";
import {
  ArrowRight,
  Code2,
  Briefcase,
  Workflow,
  Users,
  Trophy,
  Clock,
  Search,
  Target,
  Server,
  Database,
  Cpu,
  Network
} from "lucide-react";
import { Layout } from "@/components/sanixor/Layout";

// Updated authentic content
const programs = [
  {
    id: "engineering",
    type: "Engineering",
    title: "Applied AI Engineering Architecture",
    duration: "16 weeks",
    cohort: "Cohort 24B",
    desc: "Architect production-grade distributed AI systems. Focuses on orchestrating multi-agent environments, fine-tuning large models for edge deployment, and rigorous system design.",
    features: ["Production deployments", "1:1 Senior Engineering Mentorship", "System Design Reviews", "Enterprise Certification"],
    color: "#7c3aed", 
    level: "Intermediate - Advanced",
    price: "$3,499",
  },
  {
    id: "residency",
    type: "Residency",
    title: "Sanixor Technical Residency",
    duration: "6 months",
    cohort: "Funded",
    desc: "Embedded directly within our core infrastructure team. Ship features to real users. High conversion rate to full-time engineering roles.",
    features: ["Core product contribution", "Direct PR reviews", "Monthly Stipend", "Priority hiring track"],
    color: "#3b82f6", 
    level: "Advanced",
    price: "Funded",
  },
  {
    id: "accelerator",
    type: "Accelerator",
    title: "Technical Career Accelerator",
    duration: "8 weeks",
    cohort: "1:1 Mentored",
    desc: "Intensive preparation for senior technical interviews. System design mock interviews, deep architectural reviews, and algorithmic optimization.",
    features: ["Whiteboard mock interviews", "Resume & GitHub audit", "Private hiring network", "Lifetime alumni access"],
    color: "#b89830", 
    level: "All Levels",
    price: "$999",
  },
  {
    id: "agentic-rag",
    type: "Engineering",
    title: "Advanced Agentic RAG Systems",
    duration: "10 weeks",
    cohort: "Cohort 24C",
    desc: "Build highly autonomous Retrieval-Augmented Generation pipelines. Learn to construct self-correcting agents, semantic routing, and integrate complex vector database topologies.",
    features: ["Self-Reflection Agents", "Vector DB Optimization", "Knowledge Graph RAG", "LangChain & LlamaIndex Core"],
    color: "#10b981", 
    level: "Advanced",
    price: "$2,499",
  },
  {
    id: "aiml-core",
    type: "Foundations",
    title: "AI/ML Core Fundamentals",
    duration: "12 weeks",
    cohort: "Cohort 24C",
    desc: "A rigorous mathematical and algorithmic deep dive into machine learning. From backpropagation and gradient descent to transformer mechanics and latent space physics.",
    features: ["Linear Algebra & Calculus", "Custom Neural Networks from scratch", "PyTorch Mastery", "Algorithmic Complexity"],
    color: "#ec4899", 
    level: "Intermediate",
    price: "$1,999",
  },
  {
    id: "fullstack-ai",
    type: "Engineering",
    title: "Full-Stack AI Application Architecture",
    duration: "14 weeks",
    cohort: "Cohort 24B",
    desc: "Bridge the gap between AI models and user interfaces. Build robust full-stack applications with streaming responses, real-time sockets, and scalable backend services.",
    features: ["Next.js & React Server Components", "Streaming LLM Responses", "Database Architecture", "Edge Authentication"],
    color: "#f59e0b", 
    level: "Intermediate - Advanced",
    price: "$2,899",
  },
];

const domains = [
  {
    icon: Cpu,
    title: "Distributed Systems & Scalability",
    desc: "Master horizontally scalable architectures necessary for high-throughput AI inference.",
    color: "#7c3aed",
  },
  {
    icon: Network,
    title: "Multi-Agent Orchestration",
    desc: "Design deterministic communication protocols for autonomous agent swarms.",
    color: "#3b82f6",
  },
  {
    icon: Server,
    title: "Edge & On-Prem Deployment",
    desc: "Optimize model weights and implement secure containerization for enterprise edge servers.",
    color: "#b89830",
  },
  {
    icon: Database,
    title: "High-Dimensional Vector Data",
    desc: "Implement custom retrieval-augmented generation pipelines backed by robust vector DBs.",
    color: "#10b981", 
  },
  {
    icon: Workflow,
    title: "CI/CD for Machine Learning",
    desc: "Rigorous testing paradigms, automated evaluation pipelines, and blue/green model rollouts.",
    color: "#ec4899", 
  },
  {
    icon: Code2,
    title: "Systems Level Programming",
    desc: "Memory management, concurrent processing, and highly optimized hardware interfacing.",
    color: "#f59e0b", 
  },
];

const stats = [
  { value: "400+", label: "Engineers Certified", icon: Users },
  { value: "96%", label: "Industry Placement", icon: Trophy },
  { value: "0.2%", label: "Acceptance Rate", icon: Target },
  { value: "30+", label: "Enterprise Partners", icon: Briefcase },
];

const learningPath = [
  {
    phase: "PHASE 01",
    title: "Architectural Foundations",
    desc: "Deep dive into state-of-the-art model architectures, memory management, and computational constraints.",
  },
  {
    phase: "PHASE 02",
    title: "Agentic Engineering",
    desc: "Building determinism into non-deterministic systems. Workflow orchestration and fault tolerance.",
  },
  {
    phase: "PHASE 03",
    title: "Production Infrastructure",
    desc: "Containerization, horizontal scaling, edge deployment, and continuous evaluation pipelines.",
  },
  {
    phase: "PHASE 04",
    title: "Final Capstone",
    desc: "Architect, build, and deploy an end-to-end enterprise AI product under rigorous code review.",
  },
];

const programTypes = ["All", "Engineering", "Residency", "Accelerator", "Foundations"];

export default function TrainingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const filteredPrograms = programs.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || p.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <Layout>
      <style>{`
        /* Professional Elite Aesthetics */
        .elite-bg {
          background-color: #050505;
          background-image: radial-gradient(circle at 50% 0%, rgba(45, 20, 80, 0.4) 0%, rgba(5, 5, 5, 1) 70%);
        }
        
        .elite-grid {
          background-image: 
            linear-gradient(rgba(124, 58, 237, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124, 58, 237, 0.08) 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: center top;
          mask-image: linear-gradient(to bottom, black 20%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 20%, transparent 100%);
        }

        .prof-card {
          background: linear-gradient(160deg, rgba(25, 18, 40, 0.8) 0%, #0a0a0b 100%);
          border: 1px solid rgba(124, 58, 237, 0.1);
          border-top: 1px solid rgba(124, 58, 237, 0.3);
          box-shadow: 
            inset 0 1px 0 rgba(124, 58, 237, 0.15),
            0 10px 30px -10px rgba(0, 0, 0, 0.8);
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .prof-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top left, rgba(124, 58, 237, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .prof-card:hover {
          transform: translateY(-4px);
          border-top: 1px solid rgba(124, 58, 237, 0.6);
          box-shadow: 
            inset 0 1px 0 rgba(124, 58, 237, 0.3),
            0 20px 40px -10px rgba(124, 58, 237, 0.2);
        }

        .timeline-line {
          position: absolute;
          left: 24px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, rgba(124, 58, 237, 0.6) 0%, transparent 100%);
          z-index: 0;
        }

        .timeline-node {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #0a0a0b;
          border: 1px solid rgba(124, 58, 237, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 10;
          box-shadow: 0 0 15px rgba(124, 58, 237, 0.3), inset 0 0 10px rgba(124, 58, 237, 0.2);
        }

        .elite-text {
          font-family: 'DM Mono', monospace;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
        }
      `}</style>

      {/* Hero */}
      <section className="relative min-h-[60vh] elite-bg overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 elite-grid" />
        
        <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-16 z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 px-3 py-1 mb-8 border border-foreground/10 bg-foreground/5 rounded-full text-xs font-mono uppercase tracking-widest text-foreground/70">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Admissions Open: Cohort 24B
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-tight">
              Elite Engineering <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
                Protocols.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/60 mb-12 max-w-2xl leading-relaxed">
              Rigorous, production-focused technical training designed by core architects. Master distributed systems, agentic orchestration, and robust edge deployment.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-foreground/10 py-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="elite-text text-[0.65rem]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="prof-card p-6 border-foreground/5 border-t-white/10">
          <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg bg-black/50 border border-foreground/10 pl-12 pr-4 py-3 text-sm text-foreground placeholder-white/40 outline-none focus:border-foreground/30 transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex gap-2">
                {programTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                      selectedType === type
                        ? "bg-white text-black"
                        : "bg-foreground/5 text-foreground/60 hover:bg-foreground/10"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section id="tracks" className="mx-auto max-w-6xl px-6 pb-24 scroll-mt-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Available Programs</h2>
          <p className="elite-text">{filteredPrograms.length} active</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="prof-card p-6 md:p-8 flex flex-col group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-6">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center border border-foreground/10"
                  style={{ background: `linear-gradient(135deg, ${program.color}20, transparent)` }}
                >
                  <Cpu className="h-5 w-5" style={{ color: program.color }} />
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-foreground/50 mb-1">{program.type}</div>
                  <div className="text-sm font-semibold text-foreground">{program.price}</div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 tracking-tight">{program.title}</h3>
              
              <div className="flex flex-wrap gap-3 text-xs font-mono text-foreground/50 mb-4 border-b border-foreground/10 pb-4">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3" /> {program.duration}
                </span>
                <span>·</span>
                <span>{program.level}</span>
              </div>
              
              <p className="text-sm text-foreground/70 mb-6 flex-grow leading-relaxed">
                {program.desc}
              </p>
              
              <div className="flex flex-col gap-2 mb-8">
                {program.features.slice(0, 3).map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs text-foreground/60">
                    <div className="w-1 h-1 rounded-full bg-foreground/30" />
                    {f}
                  </div>
                ))}
              </div>
              
              <button className="w-full flex items-center justify-between px-4 py-3 bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 rounded-lg text-sm font-medium transition-colors mt-auto">
                View Curriculum
                <ArrowRight className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-24 prof-card">
            <p className="text-foreground/50 font-mono">No matching protocols found.</p>
          </div>
        )}
      </section>

      {/* Competency Matrix (Skills) */}
      <section id="design" className="border-y border-foreground/10 bg-[#050505] scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Competency Matrix</h2>
            <p className="text-foreground/60 max-w-xl">
              Rigorous, specialized domains engineered for immediate integration into enterprise environments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#7c3aed]/20 border border-[#7c3aed]/20 rounded-2xl overflow-hidden">
            {domains.map((d) => (
              <div
                key={d.title}
                className="bg-[#0a0812] p-6 md:p-8 hover:bg-[#140f24] transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <d.icon className="h-5 w-5" style={{ color: d.color }} />
                  <h3 className="text-sm font-semibold tracking-wide">{d.title}</h3>
                </div>
                <p className="text-sm text-foreground/50 leading-relaxed pl-9">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Timeline (Learning Path) */}
      <section id="architecture" className="mx-auto max-w-5xl px-6 py-32 relative scroll-mt-24">
        <div className="mb-20 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-mono uppercase tracking-widest">
            <Target className="w-3 h-3" />
            Progression Model
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Curriculum <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Architecture</span></h2>
          <p className="text-lg text-foreground/50 max-w-2xl mx-auto">A deterministic, engineering-grade progression model designed to take you from foundational concepts to architecting enterprise AI systems.</p>
        </div>

        <div className="relative pl-8 md:pl-0 mt-10">
          {/* Glowing center line */}
          <div className="hidden md:block absolute left-1/2 -ml-[1px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500/0 via-purple-500/50 to-purple-500/0" />
          <div className="md:hidden absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500/0 via-purple-500/50 to-purple-500/0" />
          
          <div className="flex flex-col gap-16 md:gap-24 relative z-10">
            {learningPath.map((step, i) => (
              <div key={i} className={`relative flex items-center md:justify-between w-full group ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="hidden md:block w-[45%]" />
                
                {/* Node */}
                <div className="absolute left-[-40px] md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full bg-[#050505] border-2 border-purple-500/30 flex items-center justify-center transition-all duration-500 group-hover:border-purple-500 group-hover:bg-purple-500/10 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] group-hover:scale-110">
                  <span className="text-sm font-mono font-bold text-foreground/50 group-hover:text-purple-300 transition-colors">{`0${i+1}`}</span>
                </div>
                
                {/* Card */}
                <div className="w-full md:w-[45%] ml-4 md:ml-0">
                  <div className="prof-card p-6 md:p-8 border border-foreground/5 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-purple-500/30 transition-all duration-500">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="elite-text text-purple-400 font-semibold">{step.phase}</div>
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500/30 to-transparent" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 transition-all">{step.title}</h3>
                    <p className="text-base text-foreground/60 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-foreground/10 bg-[#020202]">
        <div className="mx-auto max-w-4xl px-6 py-32 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-6">
            Ready to Compile?
          </h2>
          <p className="text-lg text-foreground/50 mb-10 max-w-xl mx-auto">
            Admissions for the upcoming technical cohort are highly competitive. Initiate the technical screening process today.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#7c3aed] text-foreground rounded-lg font-bold hover:bg-[#6d28d9] transition-colors shadow-[0_0_20px_rgba(124,58,237,0.4)]"
          >
            Initiate Screening <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </Layout>
  );
}
