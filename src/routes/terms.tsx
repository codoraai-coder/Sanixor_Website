import { Layout } from "@/components/sanixor/Layout";

export default function Terms() {
  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-6 py-32">
        <h1 className="text-5xl font-bold mb-4">Terms & Conditions</h1>

        <p className="text-muted-foreground mb-10">Last Updated: June 2026</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Acceptance</h2>
            <p>
              By accessing or using Sanixor AI products, services, or websites, you agree to these
              Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Use of Services</h2>
            <p>
              Users must use our services lawfully and responsibly. Any misuse, abuse, unauthorized
              access attempts, or harmful activity is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Intellectual Property</h2>
            <p>
              All trademarks, branding, software, content, and intellectual property associated with
              Sanixor AI remain the property of Sanixor AI unless otherwise stated.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. User Content</h2>
            <p>
              Users are responsible for content they submit and must ensure they possess the rights
              required to share such content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Service Availability</h2>
            <p>We may modify, suspend, or discontinue services at any time without prior notice.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Limitation of Liability</h2>
            <p>
              Sanixor AI shall not be liable for indirect, incidental, consequential, or special
              damages arising from use of our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Privacy</h2>
            <p>Use of our services is also governed by our Privacy Policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Changes to Terms</h2>
            <p>
              We reserve the right to update these Terms at any time. Continued use of the service
              constitutes acceptance of updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Contact Information</h2>
            <p>
              Questions regarding these Terms may be directed to:
              <br />
              team@sanixor.space
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
