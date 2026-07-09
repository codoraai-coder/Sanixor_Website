import { Navbar } from '@/components/sanixor/Navbar';
import { Footer } from '@/components/sanixor/Footer';
import { ScrollReveal } from '@/components/sanixor/ScrollReveal';
import { EventCard } from '@/components/events/EventCard';

export default function Events() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background snx-page">
      <Navbar />
      <ScrollReveal>
        <section className="mx-auto max-w-7xl px-4 md:px-6 py-12">
          <h1 className="text-3xl font-bold mb-6">Events</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <EventCard
              title="AgentVerse 2.0"
              subtitle="AI Agent Competition"
              slug="agentverse-2"
              description="Join AgentVerse 2.0, the premier AI‑agent competition hosted by Sanixor AI. Prizes, internships, and a chance to showcase your intelligent agents."
            />
          </div>
        </section>
      </ScrollReveal>
      <Footer />
    </div>
  );
}
