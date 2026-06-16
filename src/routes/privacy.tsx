import { Layout } from "@/components/sanixor/Layout";

export default function Privacy() {
  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-6 py-32">
        <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-10">
          Last Updated: June 2026
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
            <p>
              Sanixor AI respects your privacy and is committed to protecting
              your personal information. This Privacy Policy explains how we
              collect, use, and safeguard information when you interact with
              our website, products, and services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name and contact information.</li>
              <li>Email addresses submitted through forms.</li>
              <li>Organization or company information.</li>
              <li>Usage analytics and website interaction data.</li>
              <li>Technical information such as browser and device type.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. How We Use Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to inquiries and support requests.</li>
              <li>Provide and improve products and services.</li>
              <li>Communicate updates and announcements.</li>
              <li>Maintain security and prevent abuse.</li>
              <li>Analyze website performance and user experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Data Security</h2>
            <p>
              We implement reasonable administrative and technical safeguards
              to protect personal information against unauthorized access,
              disclosure, or misuse.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Third-Party Services</h2>
            <p>
              We may use trusted third-party providers for analytics,
              communications, hosting, payment processing, and infrastructure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Your Rights</h2>
            <p>
              You may request access, correction, or deletion of your personal
              information by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Contact</h2>
            <p>
              For privacy-related inquiries, contact us at:
              <br />
              team@sanixor.space
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}