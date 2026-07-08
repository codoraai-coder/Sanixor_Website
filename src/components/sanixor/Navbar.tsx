import sanixorMark from "@/assets/sanixor-mark.png";
import { cn } from "@/lib/utils";
import {
  Box,
  Briefcase,
  Calendar,
  GraduationCap,
  Trophy,
  UserPlus,
  X,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MenuToggle } from "./MenuToggle";
import { motion, AnimatePresence } from "framer-motion";

const homeLinks = [
  {
    href: "/#products",
    label: "Products",
    icon: Box,
    gradientFrom: "#a955ff",
    gradientTo: "#ea51ff",
  },
  {
    href: "/#services",
    label: "Services",
    icon: Briefcase,
    gradientFrom: "#56CCF2",
    gradientTo: "#2F80ED",
  },
  {
    href: "/#event",
    label: "Events",
    icon: Calendar,
    gradientFrom: "#FF9966",
    gradientTo: "#FF5E62",
  },
  {
    href: "/#learn",
    label: "Learn",
    icon: GraduationCap,
    gradientFrom: "#80FF72",
    gradientTo: "#7EE8FA",
  },
];

// Route-based nav items (full pages, not home-page sections).
const pageLinks = [
  {
    to: "/achievements",
    label: "Achievements",
    icon: Trophy,
    gradientFrom: "#F7971E",
    gradientTo: "#FFD200",
  },
  // {
  //   to: "/hiring",
  //   label: "Careers",
  //   icon: UserPlus,
  //   gradientFrom: "#FF6A88",
  //   gradientTo: "#FF99AC",
  // },
];

const socialLinks = [
  { href: "https://twitter.com/sanixorai", label: "Twitter / X", icon: Twitter },
  { href: "https://www.linkedin.com/company/sanixor-ai/", label: "LinkedIn", icon: Linkedin },
  { href: "https://www.instagram.com/sanixorai/", label: "Instagram", icon: Instagram },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = homeLinks.map((link) => link.href.replace("/#", ""));
      let currentActive = "";

      const threshold = window.innerHeight * 0.4; // 40% from top of screen

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();

          if (rect.top <= threshold && rect.bottom > threshold) {
            currentActive = section;
            break;
          }
        }
      }

      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    // Trap focus inside drawer
    drawerRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const handleHashClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const hash = href.replace("/#", "");
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById(hash);
          el?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      } else {
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: "smooth" });
      }
      setMenuOpen(false);
    },
    [location.pathname, navigate],
  );

  return (
    <>
      {/* Skip to content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[999] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-4 transition-all duration-500 md:px-8",
          menuOpen
            ? "py-4 bg-transparent border-transparent shadow-none"
            : scrolled
              ? "border-b border-foreground/10 bg-background/70 py-3 backdrop-blur-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)]"
              : "border-b border-foreground/[0.03] bg-gradient-to-b from-background via-background/90 to-transparent backdrop-blur-md py-4",
        )}
      >
        <Link
          to="/"
          className={cn(
            "flex items-center gap-2.5 text-lg font-bold tracking-tight hover:opacity-80 transition-all duration-300",
            menuOpen && "blur-sm",
          )}
        >
          <img src={sanixorMark} alt="Sanixor" className="h-8 w-8 rounded-lg shadow-lg" />
          Sanixor<span className="text-gradient animate-pulse">AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-3 md:flex md:absolute md:left-1/2 md:-translate-x-1/2">
          {homeLinks.map(({ href, label, icon: Icon, gradientFrom, gradientTo }) => {
            const isActive = activeSection === href.replace("/#", "");
            return (
              <a
                key={href}
                href={href}
                onClick={(e) => handleHashClick(e, href)}
                style={
                  {
                    "--gradient-from": gradientFrom,
                    "--gradient-to": gradientTo,
                  } as React.CSSProperties
                }
                className={cn(
                  "relative h-[48px] bg-foreground/5 border border-foreground/10 shadow-lg rounded-full flex items-center justify-center transition-all duration-500 hover:shadow-none group cursor-pointer",
                  isActive ? "w-[130px]" : "w-[48px] hover:w-[130px]",
                )}
              >
                {/* Gradient background on hover */}
                <span
                  className={cn(
                    "absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] transition-all duration-500",
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                  )}
                ></span>

                {/* Blur glow */}
                <span
                  className={cn(
                    "absolute top-[8px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[15px] -z-10 transition-all duration-500",
                    isActive ? "opacity-40" : "opacity-0 group-hover:opacity-40",
                  )}
                ></span>

                {/* Icon */}
                <span
                  className={cn(
                    "relative z-10 transition-all duration-500 flex items-center justify-center",
                    isActive ? "scale-0" : "group-hover:scale-0",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-[22px] w-[22px] transition-colors",
                      isActive ? "text-foreground" : "text-foreground/70",
                    )}
                  />
                </span>

                {/* Title */}
                <span
                  className={cn(
                    "absolute text-foreground font-bold tracking-wide text-sm transition-all duration-500 delay-75",
                    isActive ? "scale-100" : "scale-0 group-hover:scale-100",
                  )}
                >
                  {label}
                </span>
              </a>
            );
          })}

          {/* Page links (routes) — same pill style, client-side navigation */}
          {pageLinks.map(({ to, label, icon: Icon, gradientFrom, gradientTo }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                style={
                  {
                    "--gradient-from": gradientFrom,
                    "--gradient-to": gradientTo,
                  } as React.CSSProperties
                }
                className={cn(
                  "relative h-[48px] bg-foreground/5 border border-foreground/10 shadow-lg rounded-full flex items-center justify-center transition-all duration-500 hover:shadow-none group cursor-pointer",
                  isActive ? "w-[130px]" : "w-[48px] hover:w-[130px]",
                )}
              >
                <span
                  className={cn(
                    "absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] transition-all duration-500",
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                  )}
                ></span>
                <span
                  className={cn(
                    "absolute top-[8px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[15px] -z-10 transition-all duration-500",
                    isActive ? "opacity-40" : "opacity-0 group-hover:opacity-40",
                  )}
                ></span>
                <span
                  className={cn(
                    "relative z-10 transition-all duration-500 flex items-center justify-center",
                    isActive ? "scale-0" : "group-hover:scale-0",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-[22px] w-[22px] transition-colors",
                      isActive ? "text-foreground" : "text-foreground/70",
                    )}
                  />
                </span>
                <span
                  className={cn(
                    "absolute text-foreground font-bold tracking-wide text-sm transition-all duration-500 delay-75",
                    isActive ? "scale-100" : "scale-0 group-hover:scale-100",
                  )}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right side actions (desktop) - empty since toggle moved */}
        <div className="flex items-center gap-3 relative z-10 md:mr-0 mr-12">
          <a
            href="/contact"
            className="hidden md:flex relative group h-10 items-center justify-center rounded-full bg-foreground/10 px-6 font-medium text-sm transition-all duration-300 overflow-hidden border border-foreground/10 hover:border-transparent hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10 text-foreground group-hover:text-white transition-colors duration-300">
              Contact Us
            </span>
          </a>
        </div>
      </header>

      {/* Mobile Menu Actions (Standalone so it sits above drawer) */}
      <div
        className={cn(
          "fixed z-[102] flex items-center gap-3 transition-all duration-500 md:hidden",
          "right-4",
          menuOpen || !scrolled ? "top-4" : "top-3",
        )}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5">
          <MenuToggle open={menuOpen} onOpenChange={setMenuOpen} className="h-5 w-5" />
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Side Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              ref={drawerRef}
              className="fixed top-0 right-0 z-[101] h-[100dvh] w-[85vw] max-w-sm bg-background/95 backdrop-blur-xl border-l border-foreground/10 md:hidden flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              tabIndex={-1}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-foreground/10">
                <Link
                  to="/"
                  className="flex items-center gap-2.5 text-lg font-bold tracking-tight hover:opacity-80 transition-all duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  <img src={sanixorMark} alt="Sanixor" className="h-8 w-8 rounded-lg shadow-lg" />
                  Sanixor<span className="text-gradient animate-pulse">AI</span>
                </Link>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
                {/* Primary Navigation - Home Sections */}
                <div>
                  <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                    Explore
                  </h3>
                  <div className="space-y-3">
                    {homeLinks.map(({ href, label, icon: Icon, gradientFrom, gradientTo }, i) => (
                      <motion.div
                        key={href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <a
                          href={href}
                          onClick={(e) => handleHashClick(e, href)}
                          style={
                            {
                              "--gradient-from": gradientFrom,
                              "--gradient-to": gradientTo,
                            } as React.CSSProperties
                          }
                          className="group flex items-center gap-4 rounded-xl p-3 bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 transition-all duration-300"
                        >
                          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110">
                            <span className="absolute inset-0 rounded-lg bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 transition-opacity duration-300 group-hover:opacity-20"></span>
                            <Icon className="relative z-10 h-5 w-5 text-foreground/70 transition-colors duration-300 group-hover:text-foreground" />
                          </span>
                          <span className="font-medium text-foreground transition-colors group-hover:text-foreground">
                            {label}
                          </span>
                        </a>
                      </motion.div>
                    ))}
                    {pageLinks.map(({ to, label, icon: Icon, gradientFrom, gradientTo }, i) => (
                      <motion.div
                        key={to}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{
                          delay: (homeLinks.length + i) * 0.06,
                          duration: 0.4,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <Link
                          to={to}
                          onClick={() => setMenuOpen(false)}
                          style={
                            {
                              "--gradient-from": gradientFrom,
                              "--gradient-to": gradientTo,
                            } as React.CSSProperties
                          }
                          className="group flex items-center gap-4 rounded-xl p-3 bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 transition-all duration-300"
                        >
                          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110">
                            <span className="absolute inset-0 rounded-lg bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 transition-opacity duration-300 group-hover:opacity-20"></span>
                            <Icon className="relative z-10 h-5 w-5 text-foreground/70 transition-colors duration-300 group-hover:text-foreground" />
                          </span>
                          <span className="font-medium text-foreground transition-colors group-hover:text-foreground">
                            {label}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Contact CTA */}
                <div>
                  <a
                    href="/contact"
                    className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 p-4 text-center font-semibold text-white transition-transform duration-300 active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                  >
                    Contact Us
                  </a>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                    Follow
                  </h3>
                  <div className="flex gap-3">
                    {socialLinks.map(({ href, label, icon: Icon }) => (
                      <a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-foreground/5 border border-foreground/10 text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:border-primary/30 hover:text-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.5} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
