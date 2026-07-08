import { Layout } from "@/components/sanixor/Layout";
import { Check, Clock, Loader2, Mail, MapPin, Send, Zap } from "lucide-react";
import { useState } from "react";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { formService, type ContactTopic } from "@/services/form.service";

const topics: ContactTopic[] = [
  "General Inquiry",
  "Product Demo",
  "Training",
  "Partnership",
  "Press",
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "team@sanixor.space",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Noida, India",
  },
  {
    icon: Clock,
    label: "Response",
    value: "Under 24h",
  },
  {
    icon: Zap,
    label: "Status",
    value: "Online",
  },
];

const faqs = [
  {
    question: "What does Sanixor AI do?",
    answer: "Sanixor AI builds intelligent products and AI-powered solutions for students, developers, institutions, and enterprises.",
  },
  {
    question: "Can I request a product demo?",
    answer: "Yes. Submit the form and our team will schedule a personalized demonstration.",
  },
  {
    question: "Do you provide custom AI development?",
    answer: "Absolutely. We offer custom AI agents, automation workflows, integrations, and enterprise solutions.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [selectedTopic, setSelectedTopic] = useState<ContactTopic>("General Inquiry");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { submit, status, reset } = useFormSubmission({
    submit: formService.submitContact,
    successMessage: "Message sent — we'll reply within 24 hours.",
    onSuccess: () => {
      setFormData({ name: "", email: "", company: "", message: "" });
      setTimeout(reset, 4000);
    },
    onError: () => {
      setTimeout(reset, 4000);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      <main className="relative min-h-screen w-full bg-black text-white overflow-hidden font-sans">
        
        {/* --- DYNAMIC MESH BACKGROUND (STRICT PURPLE/BLACK/WHITE) --- */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-purple-600/10 blur-[120px] mix-blend-screen animate-pulse duration-[8000ms]" />
          <div className="absolute bottom-[-10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-purple-400/5 blur-[130px] mix-blend-screen animate-pulse duration-[10000ms]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          
          {/* --- HERO SECTION --- */}
          <section className="mx-auto w-full max-w-4xl px-6 pt-32 pb-12 text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.0] mb-6">
              <span className="text-white drop-shadow-sm">Let's </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-500 to-purple-400 pr-2">
                connect.
              </span>
            </h1>
            <p className="mx-auto text-base sm:text-lg text-white/60 max-w-xl font-light leading-relaxed balance">
              Deploy agents, schedule a technical demo, or explore enterprise integrations. 
            </p>
          </section>

          {/* --- BENTO BOX GRID --- */}
          <section className="w-full max-w-[1300px] px-4 sm:px-6 pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:auto-rows-[minmax(280px,auto)]">
              
              {/* BENTO BLOCK 1: MAIN FORM (Spans 8 columns, 2 rows) */}
              <div className="lg:col-span-8 lg:row-span-2 group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none" />
                <div className="relative h-full bg-white/[0.02] backdrop-blur-[40px] border border-white/10 rounded-[2.5rem] p-6 sm:p-10 transition-colors duration-500 hover:bg-white/[0.04] hover:border-white/20">
                  <form onSubmit={handleSubmit} className="flex flex-col h-full space-y-8">
                    
                    {/* Topics Pill Toggle */}
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-purple-400 block mb-4">
                        Subject Designation
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {topics.map((topic) => (
                          <button
                            key={topic}
                            type="button"
                            onClick={() => setSelectedTopic(topic)}
                            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border ${
                              selectedTopic === topic
                                ? "bg-purple-500/20 border-purple-400/50 text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                                : "bg-white/[0.03] border-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            {topic}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Inputs Matrix */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-white/50 ml-1">Name</label>
                        <input
                          required type="text" name="name" value={formData.name} onChange={handleInputChange}
                          className="w-full rounded-2xl bg-white/[0.03] px-4 py-4 text-sm border border-white/5 text-white focus:border-purple-500/50 focus:bg-white/10 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-white/50 ml-1">Email</label>
                        <input
                          required type="email" name="email" value={formData.email} onChange={handleInputChange}
                          className="w-full rounded-2xl bg-white/[0.03] px-4 py-4 text-sm border border-white/5 text-white focus:border-purple-500/50 focus:bg-white/10 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-white/50 ml-1">Company (Optional)</label>
                      <input
                        type="text" name="company" value={formData.company} onChange={handleInputChange}
                        className="w-full rounded-2xl bg-white/[0.03] px-4 py-4 text-sm border border-white/5 text-white focus:border-purple-500/50 focus:bg-white/10 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-1.5 flex-grow flex flex-col">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-white/50 ml-1">Message Payload</label>
                      <textarea
                        required name="message" value={formData.message} onChange={handleInputChange}
                        className="w-full flex-grow rounded-2xl bg-white/[0.03] px-4 py-4 text-sm border border-white/5 text-white focus:border-purple-500/50 focus:bg-white/10 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all duration-300 resize-none min-h-[120px]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading" || status === "success"}
                      className={`w-full group inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-5 text-sm font-semibold tracking-wide shadow-xl transition-all duration-300 ${
                        status === "success"
                          ? "bg-purple-500/20 border border-purple-500/50 text-purple-200"
                          : status === "error"
                            ? "bg-white/10 border border-white/30 text-white"
                            : "bg-white text-black hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:bg-purple-100"
                      }`}
                    >
                      {status === "loading" && <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>}
                      {status === "success" && <><Check className="h-4 w-4 animate-bounce" /> Transmission Successful</>}
                      {status === "error" && "Transmission Failed. Retry."}
                      {status === "idle" && <>Initiate Transmission <Send className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" /></>}
                    </button>
                  </form>
                </div>
              </div>

              {/* BENTO BLOCK 2: THE MAP (Spans 4 columns, 1 row) */}
              <div className="lg:col-span-4 lg:row-span-1 relative group h-[280px] lg:h-auto overflow-hidden rounded-[2.5rem]">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none" />
                <div className="relative h-full bg-white/[0.02] backdrop-blur-[40px] border border-white/10 rounded-[2.5rem] overflow-hidden transition-colors duration-500 hover:border-white/20">
                  <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,1)] z-20 pointer-events-none" />
                  <div className="absolute inset-0 bg-purple-900/30 mix-blend-overlay z-10 pointer-events-none transition-colors duration-500 group-hover:bg-purple-900/10" />
                  <iframe
                    title="Sanixor.AI Global Hub"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=77.26%2C28.47%2C77.38%2C28.59&layer=mapnik&marker=28.5355%2C77.3910"
                    className="absolute inset-0 w-full h-full border-0 grayscale opacity-40 group-hover:opacity-70 transition-all duration-700 ease-out scale-125 pointer-events-none filter sepia-[0.3] hue-rotate-[250deg]"
                    loading="lazy"
                  />
                  
                  {/* Floating Overlay Label */}
                  <div className="absolute bottom-6 left-6 z-30">
                    <div className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase tracking-widest text-white/80">
                      Coordinates Locked
                    </div>
                  </div>
                </div>
              </div>

              {/* BENTO BLOCK 3: QUICK INFO 2x2 GRID (Spans 4 columns, 1 row) */}
              <div className="lg:col-span-4 lg:row-span-1 relative group">
                <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none" />
                <div className="relative h-full bg-white/[0.02] backdrop-blur-[40px] border border-white/10 rounded-[2.5rem] p-6 sm:p-8 flex flex-col transition-colors duration-500 hover:bg-white/[0.04] hover:border-white/20">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400 mb-6">
                    Operational Status
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-y-8 gap-x-4 flex-grow content-center">
                    {contactInfo.map((info, idx) => (
                      <div key={idx} className="flex flex-col gap-2 group/item">
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 transition-colors group-hover/item:border-purple-500/40 group-hover/item:bg-purple-500/10">
                          <info.icon className="h-4 w-4 text-white/60 group-hover/item:text-purple-400 transition-colors" />
                        </div>
                        <div>
                          <p className="text-[9px] font-mono uppercase tracking-widest text-white/50 mb-0.5">
                            {info.label}
                          </p>
                          <p className="text-sm font-medium text-white break-all">
                            {info.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* BENTO BLOCK 4: INTEGRATED FAQ (Spans 12 columns, 1 row) */}
              <div className="lg:col-span-12 relative group mt-4 lg:mt-0">
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none" />
                <div className="relative h-full bg-white/[0.02] backdrop-blur-[40px] border border-white/10 rounded-[2.5rem] p-6 sm:p-10 transition-colors duration-500 hover:bg-white/[0.04] hover:border-white/20">
                  <div className="flex flex-col md:flex-row gap-10 items-start">
                    
                    <div className="w-full md:w-1/3 shrink-0">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400 mb-4">
                        Intelligence Database
                      </h3>
                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                        FAQ
                      </h2>
                      <p className="text-white/60 text-sm">
                        Quick answers regarding our operational protocols.
                      </p>
                    </div>

                    <div className="w-full flex-grow space-y-2">
                      {faqs.map((faq, index) => {
                        const isOpen = openFaq === index;
                        return (
                          <div key={index} className="border border-white/5 bg-white/[0.01] rounded-2xl overflow-hidden transition-all duration-300">
                            <button
                              onClick={() => setOpenFaq(isOpen ? null : index)}
                              className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors hover:bg-white/[0.03] group"
                            >
                              <span className={`font-medium text-sm sm:text-base transition-colors ${isOpen ? "text-purple-300" : "text-white/80 group-hover:text-white"}`}>
                                {faq.question}
                              </span>
                              <div className={`text-xs ml-4 transition-transform duration-300 ${isOpen ? "rotate-180 text-purple-400" : "text-white/40"}`}>
                                ▼
                              </div>
                            </button>
                            <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                              <div className="overflow-hidden">
                                <div className="px-5 sm:px-6 pb-6 text-sm text-white/60 leading-relaxed">
                                  {faq.answer}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                  </div>
                </div>
              </div>

            </div>
          </section>

        </div>
      </main>
    </Layout>
  );
}
