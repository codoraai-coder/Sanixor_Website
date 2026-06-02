import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import sanixorMark from "@/assets/sanixor-mark.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <>
      <header className={`inner-nav${scrolled ? " scrolled" : ""}`}>
        <Link to="/" className="inner-nav-logo">
          <img src={sanixorMark} alt="Sanixor" className="inner-nav-mark" />
          Sanixor<span className="accent">AI</span>
        </Link>

        <ul className="inner-nav-links">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`inner-nav-link${location.pathname === l.to ? " active" : ""}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link to="/contact" className="inner-nav-cta">
          Get in Touch
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="inner-nav-hamburger"
          aria-label="Open menu"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {menuOpen && (
        <div className="inner-nav-mobile-overlay">
          <div className="inner-nav-mobile-header">
            <span className="inner-nav-mobile-logo">
              Sanixor<span className="accent">AI</span>
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="inner-nav-mobile-close"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          <div className="inner-nav-mobile-links">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`inner-nav-mobile-link${location.pathname === l.to ? " active" : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
