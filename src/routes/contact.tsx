import { Layout } from "@/components/sanixor/Layout";
import {
  Check,
  Clock,
  Github,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Send,
  Twitter,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { formService, type ContactTopic } from "@/services/form.service";

const topics: ContactTopic[] = ["General Inquiry", "Product Demo", "Training", "Partnership", "Careers", "Press"];

const contactInfo = [
  { icon: Mail, label: "Email", value: "team@sanixor.space", color: "from-blue-500 via-indigo-500 to-purple-600" },
  { icon: MapPin, label: "Office", value: "Noida, Uttar Pradesh, India", color: "from-emerald-500 via-teal-500 to-cyan-600" },
  { icon: Clock, label: "Response Time", value: "Within 24 hours", color: "from-purple-500 via-pink-500 to-rose-600" },
  { icon: Zap, label: "Status", value: "Typically online", color: "from-amber-500 via-orange-500 to-yellow-600" },
];

const faqs = [
  {
    question: "What does Sanixor AI do?",
    answer: "Sanixor AI builds intelligent products and AI-powered solutions for students, developers, institutions, and enterprises."
  },
  {
    question: "Can I request a product demo?",
    answer: "Yes. You can submit the contact form and our team will schedule a personalized product demonstration."
  },
  {
    question: "Do you provide custom AI development services?",
    answer: "Absolutely. We offer custom AI agents, automation workflows, integrations, and enterprise solutions."
  },
  {
    question: "How quickly can I expect a response?",
    answer: "Most inquiries receive a response within 24 hours during business days."
  },
  {
    question: "Are partnership opportunities available?",
    answer: "Yes. We actively collaborate with educational institutions, startups, communities, and enterprises."
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [selectedTopic, setSelectedTopic] = useState<ContactTopic>("General Inquiry");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Centralized submission lifecycle: loading state, toast, error handling,
  // duplicate-submission guard — all handled by the reusable hook.
  const { submit, status, reset } = useFormSubmission({
    submit: formService.submitContact,
    successMessage: "Message sent — we'll reply within 24 hours.",
    onSuccess: () => {
      setFormData({ name: "", email: "", company: "", message: "" });
      // Return the button to its idle label after a short confirmation.
      setTimeout(reset, 4000);
    },
    onError: () => {
      // Keep the entered values; briefly show the error state on the button.
      setTimeout(reset, 4000);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit({
      name: formData.name,
      email: formData.email,
      company: formData.company || undefined,
      topic: selectedTopic,
      message: formData.message,
    });
  };

  return (
    <Layout>
      {/* Structural Page Base Wrapper */}
      <main className="relative min-h-screen w-full bg-background text-slate-100 overflow-hidden selection:bg-primary/30 font-sans">
        
        {/* --- PREMIUM GRADIENT BLAST BACKGROUND CONFIGURATION --- */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none z-0">
          {/* Main High-Intensity Radial Glow Blast */}
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[85vw] max-w-[1000px] h-[550px] rounded-full bg-gradient-to-b from-primary/25 via-purple-600/15 to-transparent blur-[110px] mix-blend-screen opacity-90" />
          
          {/* Secondary Left Accent Blast */}
          <div className="absolute top-[-10%] left-[10%] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-transparent blur-[90px] mix-blend-screen animate-pulse duration-[6000ms]" />
          
          {/* Secondary Right Accent Blast */}
          <div className="absolute top-[-5%] right-[5%] w-[480px] h-[480px] rounded-full bg-gradient-to-tl from-accent/15 via-pink-500/5 to-transparent blur-[100px] mix-blend-screen animate-pulse duration-[8000ms] delay-1000" />
          
          {/* Fine Geometric Background Grid Mesh */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_10%,#000_60%,transparent_100%)]" />
        </div>

        {/* Content Flow Layer Layered Safely Above Background Gradients */}
        <div className="relative z-10">
          
          {/* Hero Section */}
          <section className="mx-auto max-w-4xl px-6 pt-32 pb-16 text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-6 bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-accent animate-text">connect.</span>
            </h1>
            <p className="mx-auto text-lg md:text-xl text-muted-foreground/90 max-w-2xl font-normal leading-relaxed balance">
              Have questions about our deployment capabilities or need a product demo? Leave us a message below.
            </p>
          </section>

          {/* Contact Grid Infrastructure */}
          <section className="mx-auto max-w-6xl px-6 pb-24">
            <div className="grid lg:grid-cols-5 gap-8 items-start">
              
              {/* Form Component Container */}
              <div className="lg:col-span-3">
                <div className="relative rounded-[2.5rem] p-[1px] bg-gradient-to-b from-white/10 via-white/5 to-transparent shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                  <div className="bg-background/90 rounded-[2.4rem] p-6 md:p-10 space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight text-foreground">Send us a message</h2>
                      <p className="text-sm text-muted-foreground mt-1">Our team processes requests globally and routes answers in under 24 hours.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Topic Selector Button Array */}
                      <div className="space-y-3">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">What can we help with?</label>
                        <div className="flex flex-wrap gap-2">
                          {topics.map((topic) => (
                            <button
                              key={topic}
                              type="button"
                              onClick={() => setSelectedTopic(topic)}
                              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 transform active:scale-95 ${
                                selectedTopic === topic
                                  ? "bg-gradient-to-r from-primary via-purple-600 to-accent text-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                                  : "bg-foreground/5 hover:bg-foreground/10 text-muted-foreground hover:text-foreground border border-foreground/5"
                              }`}
                            >
                              {topic}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Inputs Row */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <input
                          required
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your name"
                          className="w-full rounded-xl bg-foreground/5 px-4 py-3.5 text-sm border border-foreground/10 text-foreground placeholder:text-slate-500 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-300"
                        />
                        <input
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Email address"
                          className="w-full rounded-xl bg-foreground/5 px-4 py-3.5 text-sm border border-foreground/10 text-foreground placeholder:text-slate-500 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-300"
                        />
                      </div>

                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Company or Institution (optional)"
                        className="w-full rounded-xl bg-foreground/5 px-4 py-3.5 text-sm border border-foreground/10 text-foreground placeholder:text-slate-500 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-300"
                      />

                      <textarea
                        required
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        placeholder="Tell us more about what you're looking for..."
                        className="w-full rounded-xl bg-foreground/5 px-4 py-3.5 text-sm border border-foreground/10 text-foreground placeholder:text-slate-500 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-300 resize-none"
                      />

                      {/* Status-Driven Submit Button */}
                      <button
                        type="submit"
                        disabled={status === "loading" || status === "success"}
                        className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold shadow-xl transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-90 ${
                          status === "success"
                            ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-foreground"
                            : status === "error"
                            ? "bg-gradient-to-r from-rose-500 to-red-600 text-foreground"
                            : "bg-gradient-to-r from-primary via-purple-600 to-accent text-foreground hover:opacity-95 hover:shadow-xl hover:shadow-primary/10"
                        }`}
                      >
                        {status === "loading" && (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" /> Handshaking Data Packet...
                          </>
                        )}
                        {status === "success" && (
                          <>
                            <Check className="h-5 w-5 animate-bounce" /> Transmission Successful
                          </>
                        )}
                        {status === "error" && "Error Transmitting Form. Try Again."}
                        {status === "idle" && (
                          <>
                            Send Message <Send className="h-4 w-4 ml-1" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Sidebar Module Displays */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Information Cards */}
                <div className="grid gap-4">
                  {contactInfo.map((info) => (
                    <div
                      key={info.label}
                      className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-white/10 to-transparent hover:from-primary/30 hover:to-accent/30 transition-all duration-500"
                    >
                      <div className="bg-background/80 backdrop-blur-md rounded-[15px] p-5 flex items-center gap-4 transition-all">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${info.color} shadow-lg shadow-black/30 transform transition-all duration-300 group-hover:scale-105`}>
                          <info.icon className="h-5 w-5 text-foreground" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                            {info.label}
                          </p>
                          <p className="font-semibold text-slate-200 text-sm sm:text-base mt-0.5">{info.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Geo Map Tracking Bounded Cleanly to Noida Area */}
                <div className="rounded-2xl overflow-hidden border border-foreground/5 shadow-2xl h-48 transition-all duration-300 hover:border-foreground/10 relative group">
                  <iframe
                    title="Sanixor.AI office"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=77.26%2C28.47%2C77.38%2C28.59&layer=mapnik&marker=28.5355%2C77.3910"
                    className="h-full w-full border-0 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                </div>

                {/* Ecosystem Tracking Links */}
                {/*<div className="bg-gradient-to-b from-white/5 to-transparent border border-foreground/5 rounded-2xl p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Follow our ecosystem</p>
                  <div className="flex gap-3">
                    {[Twitter, Linkedin,Instagram].map((Icon, i) => (
                      <a
                        key={i}
                        href="#"
                        className="w-11 h-11 rounded-xl border border-foreground/10 bg-foreground/5 flex items-center justify-center text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary hover:shadow-lg hover:shadow-primary/5"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>*/}
              </div>

            </div>
          </section>

          {/* FAQ Accordion Grid Framework */}
          <section className="mx-auto max-w-4xl px-6 py-20 border-t border-foreground/5 relative">
            {/* Soft Ambient Bottom Blur Blast */}
            <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[70vw] h-[300px] rounded-full bg-purple-900/5 blur-[120px] pointer-events-none" />

            <div className="text-center mb-12 relative z-10">
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">Frequently Asked Questions</h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Quick technical baseline information regarding operational protocols.
              </p>
            </div>

            <div className="space-y-3 relative z-10">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                      isOpen ? "bg-foreground/5 border-primary/20 shadow-inner" : "bg-transparent border-foreground/5"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-foreground/[0.02]"
                    >
                      <span className="font-medium text-sm sm:text-base text-slate-200 pr-4">
                        {faq.question}
                      </span>
                      <div
                        className={`text-xs text-slate-500 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-primary" : ""
                        }`}
                      >
                        ▼
                      </div>
                    </button>

                    {/* Smooth Grid Transitions */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}