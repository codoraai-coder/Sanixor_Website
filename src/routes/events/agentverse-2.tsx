import { useEffect, useRef } from 'react';
import { AgentVerse2 } from '@/components/sanixor/AgentVerse2';
import { Navbar } from '@/components/sanixor/Navbar';
import { Footer } from '@/components/sanixor/Footer';
import { RegistrationTimeline } from '@/components/events/RegistrationTimeline';
import { StickyCTA } from '@/components/events/StickyCTA';
import { SmartScrollNav } from '@/components/events/SmartScrollNav';
import { 
  Calendar, 
  Layers, 
  Users, 
  Award, 
  HelpCircle, 
  Handshake, 
  ClipboardCheck, 
  Mail,
  Clock,
  BookOpen,
  Terminal,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function AgentVersePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const registerTriggerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const title = 'AgentVerse 2.0 – Sanixor AI Event';
    const description =
      'Join AgentVerse 2.0, the premier AI‑agent competition hosted by Sanixor AI. Prizes, internships, and a chance to showcase your intelligent agents.';
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (metaDesc) metaDesc.content = description; else {
      const m = document.createElement('meta'); m.name = 'description'; m.content = description; document.head.appendChild(m);
    }
    const setMeta = (prop: string, content: string) => {
      let tag = document.querySelector(`meta[property="${prop}"]`) as HTMLMetaElement | null;
      if (!tag) { tag = document.createElement('meta'); tag.setAttribute('property', prop); document.head.appendChild(tag); }
      tag.content = content;
    };
    setMeta('og:title', title);
    setMeta('og:description', description);
    setMeta('og:url', window.location.href);
    setMeta('og:type', 'website');
    const setTwitter = (name: string, content: string) => {
      let t = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!t) { t = document.createElement('meta'); t.name = name; document.head.appendChild(t); }
      t.content = content;
    };
    setTwitter('twitter:card', 'summary_large_image');
    setTwitter('twitter:title', title);
    setTwitter('twitter:description', description);
    let canon = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canon) { canon = document.createElement('link'); canon.rel = 'canonical'; document.head.appendChild(canon); }
    canon.href = window.location.href;
  }, []);

  const timelineSteps = [
    { step: 1, title: 'Register', description: 'Complete the registration form and secure your seat.' },
    { step: 2, title: 'Confirmation', description: 'Receive confirmation and event details via email.' },
    { step: 3, title: 'Participate', description: 'Join the event, collaborate with your team, and build innovative AI solutions.' },
    { step: 4, title: 'Win & Grow', description: 'Compete for prizes, certificates, and internship opportunities.' },
  ];

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'agenda', label: 'Agenda' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'tracks', label: 'Tracks' },
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'prizes', label: 'Prizes' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'partners', label: 'Partners' },
    { id: 'register', label: 'Register' },
    { id: 'contact', label: 'Contact' },
  ];

  const triggerRegisterModal = () => {
    if (registerTriggerRef.current) {
      registerTriggerRef.current();
    }
  };

  return (
    <div className="relative min-h-screen elite-bg" style={{ overflowX: "clip" }}>
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 elite-grid" />
      </div>

      <Navbar />

      <SmartScrollNav items={navItems} />

      <main className="mx-auto max-w-[1500px] px-4 py-20 md:py-32 md:px-6 flex flex-col gap-24 md:gap-32">
        {/* Overview Section */}
        <section id="overview" ref={heroRef} className="scroll-mt-24">
          <AgentVerse2 registerTriggerRef={registerTriggerRef} />
        </section>

        {/* Agenda Section */}
        <section id="agenda" className="scroll-mt-24">
          <div className="text-center mb-12">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-400">The Schedule</p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl mt-2">Event Agenda</h2>
          </div>
          <div className="max-w-4xl mx-auto grid gap-6">
            {[
              { time: "09:00 AM - 11:00 AM", title: "Act I — Deep Dive Workshops", desc: "Expert lectures on multi-agent collaboration, MCP Servers, and swarm intelligence architecture.", icon: BookOpen },
              { time: "11:00 AM - 02:00 PM", title: "Act II — Problem Announcement & Ideation", desc: "Release of the secret target metrics, API constraints, and live dataset challenges.", icon: Terminal },
              { time: "02:00 PM - 06:00 PM", title: "Act III — Dev & Optimization Arena", desc: "Continuous building, testing against local benchmarks, and active leaderboard updates.", icon: Clock },
              { time: "06:00 PM - 08:00 PM", title: "Act IV — Showcases & Evaluation", desc: "Final evaluation run, agent swarm telemetry review, and internship candidate interviews.", icon: ShieldCheck }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-4 p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md hover:border-purple-500/30 transition-all duration-300">
                <div className="md:w-1/4 flex flex-col gap-1">
                  <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">{item.time}</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 mt-2">
                    <item.icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-purple-200/60 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section id="timeline" className="scroll-mt-24">
          <RegistrationTimeline steps={timelineSteps} />
        </section>

        {/* Tracks Section */}
        <section id="tracks" className="scroll-mt-24">
          <div className="text-center mb-12">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-400">Target Verticals</p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl mt-2">Competition Tracks</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
            {[
              { title: "Agentic Swarms", desc: "Orchestrate multi-agent systems to solve complex multi-step reasoning workflows with real-time feedback loops.", icon: Layers },
              { title: "MCP Servers", desc: "Implement custom Model Context Protocol servers to link LLMs with external tools, systems, and local system environments.", icon: Terminal },
              { title: "Autonomous Workflows", desc: "Build agent networks that automate full software pipelines, research pipelines, or code generation workflows.", icon: Calendar }
            ].map((track, idx) => (
              <div key={idx} className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md hover:border-purple-500/35 hover:-translate-y-1 transition-all duration-300">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                  <track.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{track.title}</h3>
                <p className="text-sm text-purple-200/60 leading-relaxed">{track.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Eligibility Section */}
        <section id="eligibility" className="scroll-mt-24">
          <div className="text-center mb-12">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-400">Who Can Enter</p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl mt-2">Eligibility Criteria</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {[
              { title: "Undergraduate & Graduate Students", desc: "Currently enrolled in any technical, mathematics, or computer science degree program. Perfect for displaying build telemetry." },
              { title: "Early Career Developers", desc: "Professionals with up to 3 years of industry experience looking to break into Agent systems design." },
              { title: "Individual or Team Registration", desc: "Participate solo or in teams of up to 4 members. Collaboration across roles is highly encouraged." },
              { title: "Technical Requirements", desc: "Proficiency in Python/NodeJS, basic understanding of LLM prompt configuration, and server API integration." }
            ].map((el, idx) => (
              <div key={idx} className="flex gap-4 p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md hover:border-purple-500/20 transition-all duration-300">
                <CheckCircle2 className="h-6 w-6 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-bold text-white mb-2">{el.title}</h3>
                  <p className="text-sm text-purple-200/60 leading-relaxed">{el.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Prizes Section */}
        <section id="prizes" className="scroll-mt-24">
          <div className="text-center mb-12">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-400">Reward Arena</p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl mt-2">Prizes &amp; Internships</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {[
              { rank: "Winner Swarm", prize: "$1,500 Cash + VIP Swag", desc: "Awarded to the team scoring highest on target task metrics and architectural evaluation.", border: "border-yellow-500/30" },
              { rank: "Runner Up", prize: "$1,000 Cash + Certificates", desc: "Awarded to the second highest scoring intelligent multi-agent framework implementation.", border: "border-slate-300/30" },
              { rank: "Internship Candidate", prize: "Guaranteed Interview", desc: "One exceptional builder will secure a paid remote AI Architecture internship at Sanixor AI.", border: "border-amber-600/30" }
            ].map((p, idx) => (
              <div key={idx} className={`p-8 rounded-3xl border ${p.border} bg-white/[0.02] backdrop-blur-md hover:-translate-y-1 transition-all duration-300 text-center relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
                <Award className="h-10 w-10 text-purple-400 mx-auto mb-4" />
                <span className="text-xs font-semibold text-purple-400/80 uppercase tracking-widest">{p.rank}</span>
                <h3 className="text-2xl font-black text-white mt-2 mb-3">{p.prize}</h3>
                <p className="text-sm text-purple-200/60 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs Section */}
        <section id="faqs" className="scroll-mt-24">
          <div className="text-center mb-12">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-400">Got Questions?</p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl mt-2">Frequently Asked</h2>
          </div>
          <div className="grid gap-6 max-w-3xl mx-auto">
            {[
              { q: "Is AgentVerse 2.0 fully remote?", a: "Yes, the entire workshop and hacking session will be conducted online via Discord and Google Meet rooms. Evaluation runs are performed remotely." },
              { q: "Can I enter if I have never built an LLM Agent?", a: "Absolutely. Act I includes a comprehensive architectural workshop covering the basics of MCP server implementation." },
              { q: "What API keys will be provided?", a: "All participants will receive complimentary usage credits for leading LLM providers during the active hacking acts." }
            ].map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md">
                <div className="flex gap-3">
                  <HelpCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-base font-bold text-white mb-2">{faq.q}</h3>
                    <p className="text-sm text-purple-200/60 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Partners Section */}
        <section id="partners" className="scroll-mt-24">
          <div className="text-center mb-12">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-400">Collaboration</p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl mt-2">Partners &amp; Sponsors</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              "Anthropic SDK Hub", "Llama Swarms", "MCP Spec Group", "Vercel AI"
            ].map((partner, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md flex items-center justify-center hover:border-purple-500/20 transition-all duration-300">
                <span className="text-sm font-semibold text-purple-200/50 uppercase tracking-widest">{partner}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Register Section */}
        <section id="register" className="scroll-mt-24 max-w-4xl mx-auto w-full">
          <div className="p-8 md:p-12 rounded-3xl border border-purple-500/20 bg-purple-950/10 backdrop-blur-md text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-radial-gradient(circle at center, rgba(168, 85, 247, 0.1) 0%, transparent 70%) pointer-events-none" />
            <ClipboardCheck className="h-12 w-12 text-purple-400 mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold text-white mb-4">Secure Your Seat Today</h2>
            <p className="text-purple-200/60 max-w-xl mx-auto mb-8">
              Join dozens of developers pushing the boundary of Agentic AI. Team registration or solo entry.
            </p>
            <button 
              onClick={triggerRegisterModal}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-500 shadow-glow transition-all duration-300"
            >
              Start Registration
            </button>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={footerRef} className="scroll-mt-24 text-center max-w-xl mx-auto">
          <Mail className="h-10 w-10 text-purple-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Have Event Inquiries?</h2>
          <p className="text-sm text-purple-200/60 mb-6 leading-relaxed">
            Reach out to our events coordination team for sponsor details, technical queries, or special accommodation request.
          </p>
          <a href="mailto:events@sanixor.ai" className="text-purple-400 hover:underline font-semibold">
            events@sanixor.ai
          </a>
        </section>
      </main>

      <Footer />

      <style>{`
        /* Shift global scroll-to-top button above the mobile bottom StickyCTA bar */
        @media (max-width: 768px) {
          button[aria-label="Scroll to top"] {
            bottom: 88px !important;
            right: 16px !important;
            z-index: 899 !important;
          }
        }
      `}</style>

      <StickyCTA 
        label="Register Now" 
        statusBadge="Registrations Open" 
        onClick={triggerRegisterModal} 
        heroRef={heroRef} 
        footerRef={footerRef} 
      />
    </div>
  );
}
