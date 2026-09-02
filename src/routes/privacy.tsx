import { Layout } from "@/components/sanixor/Layout";

export default function Privacy() {
  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-6 py-32">
        <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-10">
          Effective Date: August 25, 2026
          <br />
          Last Updated: August 25, 2026
        </p>

        <p className="mb-6">
          Sanixor AI ("Sanixor AI," "we," "us," or "our") operates the website{" "}
          <a
            href="https://sanixor.space/"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://sanixor.space/
          </a>{" "}
          (the "Site") and related products and services (collectively, the "Services"). This
          Privacy Policy explains how we collect, use, disclose, and protect information when you
          use our Services, including when you connect or sign in with your LinkedIn account.
        </p>
        <p className="mb-10">
          By using our Services, you agree to the collection and use of information in accordance
          with this Privacy Policy.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>

            <h3 className="text-lg font-semibold mt-5 mb-2">
              1.1 Information You Provide Directly
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name, email address, and account credentials when you register.</li>
              <li>Content you submit, upload, or generate while using our Services.</li>
              <li>Communications you send us (support requests, feedback, etc.).</li>
            </ul>

            <h3 className="text-lg font-semibold mt-5 mb-2">
              1.2 Information Collected via LinkedIn
            </h3>
            <p className="mb-3">
              If you choose to connect your LinkedIn account or sign in using LinkedIn OAuth, we may
              collect the following, subject to the permissions you approve during login:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your name, profile photo, and LinkedIn headline.</li>
              <li>Your email address associated with your LinkedIn account.</li>
              <li>Your LinkedIn profile URL and public profile information.</li>
              <li>
                Basic professional details you have made available via LinkedIn's API (e.g., current
                position, organization), where explicitly authorized by you.
              </li>
            </ul>
            <p className="mt-3">
              We only request the minimum LinkedIn scopes necessary to provide sign-in and related
              functionality (e.g., <code className="text-sm">openid</code>,{" "}
              <code className="text-sm">profile</code>, <code className="text-sm">email</code>). We
              do <strong>not</strong> access your LinkedIn connections, messages, or post on your
              behalf unless we explicitly disclose and request that permission at the time of
              authorization.
            </p>

            <h3 className="text-lg font-semibold mt-5 mb-2">
              1.3 Automatically Collected Information
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address, browser type, device identifiers, and operating system.</li>
              <li>Usage data such as pages visited, features used, and timestamps.</li>
              <li>Cookies and similar tracking technologies (see Section 6).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                Create and manage your account, including authenticating you via LinkedIn Sign-In.
              </li>
              <li>Provide, operate, and maintain the Services.</li>
              <li>
                Personalize your experience and pre-fill profile information from LinkedIn (where
                authorized).
              </li>
              <li>
                Communicate with you, including sending service updates and responding to inquiries.
              </li>
              <li>Monitor and analyze usage trends to improve our Services.</li>
              <li>
                Detect, investigate, and prevent fraudulent, unauthorized, or illegal activity.
              </li>
              <li>Comply with legal obligations.</li>
            </ol>
            <p className="mt-3">
              We do <strong>not</strong> sell your personal information, and we do not use
              LinkedIn-sourced data for advertising or share it with third parties for their own
              marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              3. Legal Basis for Processing (GDPR / Applicable Regions)
            </h2>
            <p className="mb-3">
              Where required by applicable law, we process your personal data based on:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Consent</strong> &mdash; such as when you authorize LinkedIn Sign-In or opt
                into non-essential cookies.
              </li>
              <li>
                <strong>Contractual necessity</strong> &mdash; to provide the Services you have
                requested.
              </li>
              <li>
                <strong>Legitimate interests</strong> &mdash; such as improving and securing our
                Services.
              </li>
              <li>
                <strong>Legal obligation</strong> &mdash; where processing is required to comply
                with the law.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. How We Share Your Information</h2>
            <p className="mb-3">We may share information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Service providers</strong> who perform functions on our behalf (e.g.,
                hosting, analytics, customer support), under contractual confidentiality
                obligations.
              </li>
              <li>
                <strong>LinkedIn Corporation</strong>, to the extent necessary to authenticate your
                account, in accordance with LinkedIn's own{" "}
                <a
                  href="https://www.linkedin.com/legal/privacy-policy"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong>Legal and regulatory authorities</strong>, where required to comply with
                applicable law, regulation, legal process, or governmental request.
              </li>
              <li>
                <strong>Successors</strong>, in the event of a merger, acquisition, or sale of
                assets, subject to standard confidentiality terms.
              </li>
            </ul>
            <p className="mt-3">
              We do not sell or rent your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Data Retention</h2>
            <p>
              We retain personal information, including data obtained via LinkedIn, only for as long
              as necessary to fulfill the purposes described in this Privacy Policy, unless a longer
              retention period is required or permitted by law. You may request deletion of your
              data at any time (see Section 8).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Cookies and Tracking Technologies</h2>
            <p className="mb-3">We use cookies and similar technologies to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Keep you signed in.</li>
              <li>Remember your preferences.</li>
              <li>Analyze traffic and usage patterns.</li>
            </ul>
            <p className="mt-3">
              You can control cookies through your browser settings. Disabling cookies may affect
              the functionality of the Services, including LinkedIn Sign-In.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Data Security</h2>
            <p>
              We implement reasonable technical and organizational measures designed to protect your
              information from unauthorized access, alteration, disclosure, or destruction. However,
              no method of transmission or storage is 100% secure, and we cannot guarantee absolute
              security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Your Rights and Choices</h2>
            <p className="mb-3">Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Access</strong> the personal information we hold about you.
              </li>
              <li>
                <strong>Correct</strong> inaccurate or incomplete information.
              </li>
              <li>
                <strong>Delete</strong> your personal information ("right to be forgotten").
              </li>
              <li>
                <strong>Restrict or object to</strong> certain processing activities.
              </li>
              <li>
                <strong>Data portability</strong> &mdash; receive your data in a structured,
                machine-readable format.
              </li>
              <li>
                <strong>Withdraw consent</strong> at any time, including revoking LinkedIn account
                access (which you can also do directly via your{" "}
                <a
                  href="https://www.linkedin.com/psettings/permitted-services"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn Settings
                </a>
                ).
              </li>
            </ul>
            <p className="mt-3">
              To exercise these rights, contact us using the information in Section 12.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Children's Privacy</h2>
            <p>
              Our Services are not directed to individuals under the age of 16 (or the applicable
              age of digital consent in your jurisdiction). We do not knowingly collect personal
              information from children. If you believe a child has provided us with personal
              information, please contact us so we can delete it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own.
              Where required, we take steps to ensure such transfers comply with applicable data
              protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">11. Third-Party Links</h2>
            <p>
              Our Services may contain links to third-party websites, including LinkedIn. We are not
              responsible for the privacy practices of these third parties. We encourage you to
              review their respective privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">12. Contact Us</h2>
            <p className="mb-3">
              If you have questions or concerns about this Privacy Policy or our data practices,
              please contact us:
            </p>
            <p>
              <strong>Sanixor AI</strong>
              <br />
              Website:{" "}
              <a
                href="https://sanixor.space/"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://sanixor.space/
              </a>
              <br />
              Email:{" "}
              <a href="mailto:privacy@sanixor.space" className="text-primary hover:underline">
                privacy@sanixor.space
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">13. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of material
              changes by posting the updated policy on this page with a revised "Last Updated" date.
              Continued use of the Services after changes take effect constitutes acceptance of the
              revised policy.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
