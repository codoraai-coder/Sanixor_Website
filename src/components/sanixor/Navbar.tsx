import sanixorMark from "@/assets/sanixor-mark.png";
import { cn } from "@/lib/utils";
import { Box, Briefcase, Calendar, GraduationCap, X, Twitter, Linkedin, Instagram } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MenuToggle } from "./MenuToggle";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, THEMES } from "./ThemeProvider";

const homeLinks = [
  { href: "/#products", label: "Products", icon: Box, gradientFrom: "#a955ff", gradientTo: "#ea51ff" },
  { href: "/#services", label: "Services", icon: Briefcase, gradientFrom: "#56CCF2", gradientTo: "#2F80ED" },
  { href: "/#event", label: "Events", icon: Calendar, gradientFrom: "#FF9966", gradientTo: "#FF5E62" },
  { href: "/#learn", label: "Learn", icon: GraduationCap, gradientFrom: "#80FF72", gradientTo: "#7EE8FA" },
];

const socialLinks = [
  { href: "https://twitter.com/sanixorai", label: "Twitter / X", icon: Twitter },
  { href: "https://www.linkedin.com/company/sanixor-ai/", label: "LinkedIn", icon: Linkedin },
  { href: "https://www.instagram.com/sanixorai/", label: "Instagram", icon: Instagram },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
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
            ? "border-b border-white/10 bg-[#090911]/70 py-3 backdrop-blur-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)]"
            : "border-b border-white/[0.03] bg-gradient-to-b from-[#030307] via-[#030307]/90 to-transparent backdrop-blur-md py-4",
        )}
      >
        <Link to="/" className={cn("flex items-center gap-2.5 text-lg font-bold tracking-tight hover:opacity-80 transition-all duration-300", menuOpen && "blur-sm")}>
          <img src={sanixorMark} alt="Sanixor" className="h-8 w-8 rounded-lg shadow-lg" />
          Sanixor<span className="text-gradient animate-pulse">AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-3 md:flex md:absolute md:left-1/2 md:-translate-x-1/2">
          {homeLinks.map(({ href, label, icon: Icon, gradientFrom, gradientTo }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleHashClick(e, href)}
              style={{ '--gradient-from': gradientFrom, '--gradient-to': gradientTo } as React.CSSProperties}
              className="relative w-[48px] h-[48px] bg-white/5 border border-white/10 shadow-lg rounded-full flex items-center justify-center transition-all duration-500 hover:w-[130px] hover:shadow-none group cursor-pointer"
            >
              {/* Gradient background on hover */}
              <span className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 transition-all duration-500 group-hover:opacity-100"></span>
              
              {/* Blur glow */}
              <span className="absolute top-[8px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[15px] opacity-0 -z-10 transition-all duration-500 group-hover:opacity-40"></span>

              {/* Icon */}
              <span className="relative z-10 transition-all duration-500 group-hover:scale-0 flex items-center justify-center">
                <Icon className="h-[22px] w-[22px] text-white/70" />
              </span>

              {/* Title */}
              <span className="absolute text-white font-bold tracking-wide text-sm transition-all duration-500 scale-0 group-hover:scale-100 delay-75">
                {label}
              </span>
            </a>
          ))}
        </nav>



        {/* Placeholder to keep flex-between layout on mobile */}
        <div className="h-10 w-10 md:hidden" />
      </header>

      {/* Mobile Menu Trigger (Standalone so it sits above drawer) */}
      <div
        className={cn(
          "fixed z-[102] flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-500 md:hidden",
          "right-4",
          menuOpen || !scrolled ? "top-4" : "top-3"
        )}
      >
        <MenuToggle open={menuOpen} onOpenChange={setMenuOpen} className="h-5 w-5" />
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
              className="fixed top-0 right-0 z-[101] h-[100dvh] w-[85vw] max-w-sm bg-background/95 backdrop-blur-xl border-l border-white/10 md:hidden flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              tabIndex={-1}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <Link to="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight hover:opacity-80 transition-all duration-300" onClick={() => setMenuOpen(false)}>
                  <img src={sanixorMark} alt="Sanixor" className="h-8 w-8 rounded-lg shadow-lg" />
                  Sanixor<span className="text-gradient animate-pulse">AI</span>
                </Link>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
                {/* Primary Navigation - Home Sections */}
                <div>
                  <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Explore</h3>
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
                          style={{ '--gradient-from': gradientFrom, '--gradient-to': gradientTo } as React.CSSProperties}
                          className="group flex items-center gap-4 rounded-xl p-3 bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                        >
                          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110">
                            <span className="absolute inset-0 rounded-lg bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 transition-opacity duration-300 group-hover:opacity-20"></span>
                            <Icon className="relative z-10 h-5 w-5 text-white/70 transition-colors duration-300 group-hover:text-white" />
                          </span>
                          <span className="font-medium text-white transition-colors group-hover:text-foreground">{label}</span>
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Theme Picker */}
                <div>
                  <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Theme</h3>
                  <div className="flex flex-wrap gap-2">
                    {THEMES.map((t) => {
                      const isActive = theme === t.id;
                      return (
                        <button
                          key={t.id}
                          onClick={() => setTheme(t.id)}
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-2 transition-all duration-300 ${
                            isActive
                              ? "ring-primary scale-110"
                              : "ring-white/10 hover:ring-primary/50 hover:scale-105"
                          }`}
                          style={{ background: t.swatch }}
                          aria-label={t.label}
                          aria-pressed={isActive}
                        >
                          {isActive && <svg className="h-5 w-5 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Follow</h3>
                  <div className="flex gap-3">
                    {socialLinks.map(({ href, label, icon: Icon }) => (
                      <a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-400 transition-all duration-300 hover:bg-primary/10 hover:border-primary/30 hover:text-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
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