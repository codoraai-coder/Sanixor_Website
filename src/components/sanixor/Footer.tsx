import { Link } from "react-router-dom";

const socialLinks = [
  { label: "Twitter", Icon: Twitter, href: "#" },
  { label: "LinkedIn", Icon: Linkedin, href: "#" },
  { label: "GitHub", Icon: Github, href: "#" },
];

export function Footer() {
  return (
<<<<<<< HEAD
    <footer className="relative border-t border-border/60 mt-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo size="md" />
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            Build with Intelligence. Production-grade AI agents for code analysis, legal research,
            and document intelligence.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">Mumbai, India · Global</p>
          <div className="mt-6 flex gap-3">
            {socialLinks.map(({ label, Icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full glass transition-smooth hover:text-primary hover:scale-110"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold">Products</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="#" className="hover:text-foreground">
                AI Code Analyst
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Legal Research Agent
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Document Intelligence
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Custom Agents
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                API Access
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="#" className="hover:text-foreground">
                About Sanixor
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Blog
              </a>
            </li>
            <li>
              <Link to="/hiring" className="hover:text-foreground">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground">
                Contact Us
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Partners
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="#" className="hover:text-foreground">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Cookie Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Security
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 px-6 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Sanixor.AI — Automating Intelligence. Eliminating Bias.
=======
    <footer className="snx-footer">
      <Link to="/" className="footer-logo">
        Sanixor<span>AI</span>
      </Link>
      <div className="footer-links">
        <Link to="/products">Products</Link>
        <Link to="/team">Team</Link>
        <Link to="/contact">Contact</Link>
        <a href="https://sanixor.space" target="_blank" rel="noopener noreferrer">sanixor.space</a>
>>>>>>> origin/main
      </div>
      <div className="footer-copy">© 2025 Sanixor AI. Built for the next generation.</div>
    </footer>
  );
}
