import sanixorMark from "@/assets/sanixor-mark.png";
import { CustomNavbar, FullscreenNav } from "@/components/ui/immersive-full-screen-nav";
import {
  NavPreviewTV,
  type PreviewChannel,
} from "@/components/sanixor/product-showcase/NavPreviewTV";
import { COMPANY } from "@/config/company.config";
import { lenisInstance } from "@/hooks/useSmoothScroll";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OVERLAY_BG = "#07060d";
const OPEN_DURATION = 1;

/** Each menu entry is also a channel on the menu's preview set. */
const menuChannels: PreviewChannel[] = [
  {
    id: "products",
    name: "Products",
    href: "/#products",
    kicker: "Five AI products",
    description: "HackEval, BitBench, AutoDash, Socio AI and Nyay AI — on one set.",
    shot: "/nav-preview/products.webp",
    accentRgb: "192, 132, 252",
  },
  {
    id: "services",
    name: "Services",
    href: "/#services",
    kicker: "Built for you",
    description: "Agent as a Service, custom agents, API integration and AI architecture.",
    shot: "/nav-preview/services.webp",
    accentRgb: "86, 204, 242",
  },
  {
    id: "events",
    name: "Events",
    href: "/#event",
    kicker: "AgentVerse 2.0",
    description: "Build, compete and ship autonomous AI agents with the community.",
    shot: "/nav-preview/events.webp",
    accentRgb: "255, 120, 98",
  },
  {
    id: "learn",
    name: "Learn",
    href: "/#learn",
    kicker: "Training",
    description: "Architecture-level AI fundamentals, written for people who build.",
    shot: "/nav-preview/learn.webp",
    accentRgb: "128, 255, 170",
  },
  {
    id: "achievements",
    name: "Achievements",
    href: "/achievements",
    kicker: "Milestones",
    description: "HackEval's launch, evaluations at scale and what comes next.",
    shot: "/nav-preview/achievements.webp",
    accentRgb: "255, 196, 40",
  },
  {
    id: "contact",
    name: "Contact",
    href: "/contact",
    kicker: "Initialize connection",
    description: "Talk to the Sanixor team about your product, agents or training.",
    shot: "/nav-preview/contact.webp",
    accentRgb: "167, 139, 250",
  },
];

const socials = [
  { type: "twitter", href: "https://twitter.com/sanixorai", label: "Sanixor AI on X" },
  {
    type: "linkedin",
    href: "https://www.linkedin.com/company/sanixor-ai/",
    label: "Sanixor AI on LinkedIn",
  },
  {
    type: "instagram",
    href: "https://www.instagram.com/sanixorai/",
    label: "Sanixor AI on Instagram",
  },
];

/**
 * Jumps to a home-page section. After a route change the section may not be
 * rendered yet, and Lenis may still hold the previous page's scroll limit, so
 * this waits for the element and re-measures before jumping.
 */
function scrollToSection(id: string, attempt = 0) {
  const element = document.getElementById(id);
  if (!element) {
    if (attempt < 40) window.setTimeout(() => scrollToSection(id, attempt + 1), 50);
    return;
  }
  const top = element.getBoundingClientRect().top + window.scrollY;
  if (lenisInstance) {
    lenisInstance.resize();
    lenisInstance.scrollTo(top, { immediate: true, force: true });
  } else {
    window.scrollTo({ top, behavior: "auto" });
  }
}

/**
 * Site header: a quiet brand + menu toggle that steps out of the way while
 * reading, and a full-screen menu that wipes in over the page.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [tuned, setTuned] = useState(0);
  const anchorRef = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();

  // Only reads scrollY (no layout), and only re-renders when a flag flips.
  useEffect(() => {
    let frame = 0;
    anchorRef.current = window.scrollY;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      const travel = y - anchorRef.current;
      if (y < 96) {
        setHidden(false);
        anchorRef.current = y;
      } else if (Math.abs(travel) > 18) {
        setHidden(travel > 0);
        anchorRef.current = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Smooth scrolling must not move the page underneath an open menu.
  // Opening the menu also tunes the preview set to the page you are on.
  const onToggle = useCallback(
    (open: boolean) => {
      if (open) {
        lenisInstance?.stop();
        const current = menuChannels.findIndex((channel) => channel.href === location.pathname);
        setTuned(current === -1 ? 0 : current);
      } else {
        lenisInstance?.start();
      }
    },
    [location.pathname],
  );

  useEffect(() => () => void lenisInstance?.start(), []);

  const go = useCallback(
    (href: string, close: () => void) => (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      close();

      if (href.startsWith("/#")) {
        const id = href.slice(2);
        if (location.pathname === "/") {
          // Jump while the closing panel still covers the page.
          requestAnimationFrame(() => scrollToSection(id));
        } else {
          navigate("/");
          window.setTimeout(() => scrollToSection(id), 120);
        }
        return;
      }
      navigate(href);
    },
    [location.pathname, navigate],
  );

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[999] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <FullscreenNav
        clipOrigin="top"
        overlayBg={OVERLAY_BG}
        openDuration={OPEN_DURATION}
        closeDuration={0.9}
        ease="power4.inOut"
        headerClosedColor="#f4f4f6"
        headerOpenColor="#ffffff"
        headerHidden={hidden}
        onToggle={onToggle}
        headerClassName={cn(
          "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:-z-10 before:h-28 before:bg-gradient-to-b before:from-[#07060d]/90 before:via-[#07060d]/45 before:to-transparent before:transition-opacity before:duration-500",
          scrolled ? "before:opacity-100" : "before:opacity-0",
        )}
        brandNode={
          <Link
            to="/"
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight transition-opacity duration-300 hover:opacity-80"
          >
            <img src={sanixorMark} alt="" className="h-8 w-8 rounded-lg shadow-lg" />
            Sanixor<span className="text-gradient">AI</span>
          </Link>
        }
        headerActions={(isOpen) => (
          <Link
            to="/contact"
            tabIndex={isOpen ? -1 : undefined}
            className={cn(
              "group relative hidden h-10 items-center overflow-hidden rounded-full border border-white/15 px-5 text-sm font-medium transition-[opacity,border-color] duration-500 hover:border-transparent md:flex",
              isOpen && "pointer-events-none opacity-0",
            )}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative">Contact Us</span>
          </Link>
        )}
      >
        {(isOpen, close) => (
          <CustomNavbar
            isOpen={isOpen}
            overlayBg={OVERLAY_BG}
            delay={OPEN_DURATION}
            agencyName="Sanixor AI — Menu"
            tagline="Build with intelligence."
            location={`${COMPANY.jurisdiction.state}, ${COMPANY.jurisdiction.country}`}
            links={menuChannels.map((channel, index) => ({
              label: channel.name,
              href: channel.href,
              meta: String(index + 1).padStart(2, "0"),
              onClick: go(channel.href, close),
              onActivate: () => setTuned(index),
            }))}
            aside={
              <NavPreviewTV
                channels={menuChannels}
                target={tuned}
                powered={isOpen}
                onSelect={(event, channel) => go(channel.href, close)(event)}
              />
            }
            socials={socials}
            backdrop={
              <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute -top-1/4 right-[-10%] h-[70vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.22),transparent)]" />
                <div className="absolute -bottom-1/3 left-[-10%] h-[60vh] w-[50vw] rounded-full bg-[radial-gradient(closest-side,rgba(232,121,249,0.12),transparent)]" />
                <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:88px_88px]" />
              </div>
            }
          />
        )}
      </FullscreenNav>
    </>
  );
}
