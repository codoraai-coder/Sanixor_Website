import { useState, useEffect, useRef } from "react";

export interface NavItem {
  id: string;
  label: string;
}

export interface SmartScrollNavProps {
  items: NavItem[];
  offset?: number;
}

export function SmartScrollNav({ items, offset = 120 }: SmartScrollNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLButtonElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  /* ── Throttled Scroll Progress & Sticky State ── */
  useEffect(() => {
    let ticked = false;

    const handleScroll = () => {
      if (!ticked) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

          // Direct DOM manipulation of the progress bar width (prevents layout thrashing and high-frequency state updates)
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${pct}%`;
          }

          // Only trigger state updates when boundaries are crossed
          const shouldBeSticky = scrollTop > 400;
          setIsSticky((prev) => (prev !== shouldBeSticky ? shouldBeSticky : prev));

          ticked = false;
        });
        ticked = true;
      }
    };

    // Initialize progress bar
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Intersection Observer for active section ── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        { threshold: 0.15, rootMargin: `-${offset}px 0px -40% 0px` }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [items, offset]);

  /* ── Auto-scroll mobile nav to keep active item visible ── */
  useEffect(() => {
    if (activeItemRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const item = activeItemRef.current;
      const itemLeft = item.offsetLeft;
      const itemWidth = item.offsetWidth;
      const containerWidth = container.offsetWidth;
      const scrollTarget = itemLeft - containerWidth / 2 + itemWidth / 2;
      container.scrollTo({ left: scrollTarget, behavior: "smooth" });
    }
  }, [activeId]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        /* ── Progress Bar ── */
        .av2-nav-progress {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          z-index: 1001;
          background: transparent;
          pointer-events: none;
        }
        .av2-nav-progress-bar {
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, #7c3aed, #a855f7, #c084fc);
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
          border-radius: 0 2px 2px 0;
        }

        /* ── Sticky Nav Bar ── */
        .av2-nav-bar {
          position: fixed;
          top: -60px;
          left: 0;
          right: 0;
          z-index: 95; /* Set below main navbar's z-[100] */
          background: rgba(9, 9, 11, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(139, 92, 246, 0.1);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
          transition: top 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .av2-nav-bar.av2-nav-sticky {
          top: 72px; /* Position directly underneath primary site Navbar */
        }
        .av2-nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
          height: 52px;
          display: flex;
          align-items: center;
          gap: 4px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .av2-nav-inner::-webkit-scrollbar {
          display: none;
        }

        /* ── Nav Item ── */
        .av2-nav-item {
          background: none;
          border: none;
          color: #a1a1aa;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: .04em;
          padding: 8px 16px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
          position: relative;
          font-family: inherit;
          flex-shrink: 0;
        }
        .av2-nav-item:hover {
          color: #e2e8f0;
          background: rgba(139, 92, 246, 0.08);
        }
        .av2-nav-item.av2-nav-active {
          color: #fff;
          background: rgba(139, 92, 246, 0.15);
          border: 1px solid rgba(139, 92, 246, 0.25);
          box-shadow: 0 0 12px rgba(139, 92, 246, 0.15);
        }
        .av2-nav-item.av2-nav-active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2px;
          background: #a855f7;
          border-radius: 2px;
          box-shadow: 0 0 8px rgba(168, 85, 247, 0.5);
        }

        /* ── Mobile: horizontal scrollable pills ── */
        @media (max-width: 768px) {
          .av2-nav-inner {
            padding: 0 12px;
            gap: 2px;
            height: 48px;
          }
          .av2-nav-item {
            font-size: 12px;
            padding: 6px 12px;
          }
          .av2-nav-bar.av2-nav-sticky {
            top: 56px; /* Align with mobile navbar height */
          }
        }
      `}</style>

      {/* Reading progress bar */}
      <div className="av2-nav-progress">
        <div ref={progressBarRef} className="av2-nav-progress-bar" />
      </div>

      {/* Sticky navigation */}
      <div
        ref={navRef}
        className={`av2-nav-bar ${isSticky ? "av2-nav-sticky" : ""}`}
      >
        <div className="av2-nav-inner" ref={scrollContainerRef}>
          {items.map((item) => (
            <button
              key={item.id}
              ref={item.id === activeId ? activeItemRef : undefined}
              className={`av2-nav-item ${item.id === activeId ? "av2-nav-active" : ""}`}
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
