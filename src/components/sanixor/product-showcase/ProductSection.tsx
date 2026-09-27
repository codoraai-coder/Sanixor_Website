import { useCallback, useRef, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowUpRight, RadioTower } from "lucide-react";
import { useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { lenisInstance } from "@/hooks/useSmoothScroll";
import { ChannelIndicator } from "./ChannelIndicator";
import { ChannelTransition } from "./ChannelTransition";
import { ProductScene } from "./ProductScene";
import { ProductVisual } from "./ProductVisual";
import { PRODUCT_CHANNELS } from "./products";
import "./product-showcase.css";

function ReducedProductSection() {
  return (
    <section id="products" className="products-reduced" aria-labelledby="products-heading-reduced">
      <div className="products-reduced-heading">
        <span>Product signal</span>
        <h2 id="products-heading-reduced">Every tool is an AI agent.</h2>
        <p>Five purpose-built systems. Explore every Sanixor product channel.</p>
      </div>
      <div className="products-reduced-list">
        {PRODUCT_CHANNELS.map((product, index) => (
          <article
            className="products-reduced-card"
            key={product.id}
            style={
              {
                "--product-accent": product.accent,
                "--product-accent-rgb": product.accentRgb,
              } as CSSProperties
            }
          >
            <div className="products-reduced-copy">
              <small>
                CH {String(index + 1).padStart(2, "0")} · {product.category}
              </small>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <Link to={product.path}>
                Explore {product.name}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
            <ProductVisual product={product} shouldLoad />
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProductSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const signalStrength = useTransform(scrollYProgress, (value) => {
    const position = value * (PRODUCT_CHANNELS.length - 1);
    const fraction = position - Math.floor(position);
    return Math.pow(Math.sin(fraction * Math.PI), 4);
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const nextIndex = Math.min(
      PRODUCT_CHANNELS.length - 1,
      Math.max(0, Math.round(value * (PRODUCT_CHANNELS.length - 1))),
    );
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  const selectChannel = useCallback((index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const scrollableDistance = Math.max(0, rect.height - window.innerHeight);
    const target = sectionTop + (index / (PRODUCT_CHANNELS.length - 1)) * scrollableDistance;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (lenisInstance && !prefersReduced) {
      lenisInstance.scrollTo(target, { duration: 1.05 });
    } else {
      window.scrollTo({ top: target, behavior: prefersReduced ? "auto" : "smooth" });
    }
  }, []);

  if (reduceMotion) return <ReducedProductSection />;

  const activeProduct = PRODUCT_CHANNELS[activeIndex];
  const sectionStyle = {
    "--product-count": PRODUCT_CHANNELS.length,
    "--product-accent": activeProduct.accent,
    "--product-accent-rgb": activeProduct.accentRgb,
  } as CSSProperties;

  return (
    <section
      id="products"
      ref={sectionRef}
      className="products-broadcast"
      style={sectionStyle}
      aria-labelledby="products-heading"
    >
      <div className="products-sticky">
        <div className="products-ambient" aria-hidden="true">
          <div className="products-ambient-grid" />
          <div className="products-ambient-orbit products-ambient-orbit-one" />
          <div className="products-ambient-orbit products-ambient-orbit-two" />
        </div>

        <div className="products-shell">
          <header className="products-heading">
            <div className="products-heading-label">
              <RadioTower aria-hidden="true" /> Product signal
            </div>
            <h2 id="products-heading">Every tool is an AI agent.</h2>
            <p>Scroll to tune into the next product.</p>
          </header>

          <div className="crt-layout">
            <div className="crt-frame">
              <div className="crt-frame-highlight" aria-hidden="true" />
              <div className="crt-screen">
                <div className="crt-screen-glow" aria-hidden="true" />
                {PRODUCT_CHANNELS.map((product, index) => {
                  // Keep only the channels that can participate in the current
                  // transition. Far-away scenes must never remain in the CRT's
                  // compositor stack as faint residual images.
                  if (Math.abs(index - activeIndex) > 1) return null;

                  return (
                    <ProductScene
                      key={product.id}
                      product={product}
                      index={index}
                      count={PRODUCT_CHANNELS.length}
                      progress={scrollYProgress}
                      isActive={index === activeIndex}
                      activeIndex={activeIndex}
                    />
                  );
                })}
                <div className="crt-scanlines" aria-hidden="true" />
                <div className="crt-vignette" aria-hidden="true" />
                <ChannelTransition strength={signalStrength} />
              </div>
              <div className="crt-hardware" aria-hidden="true">
                <span>
                  <i /> SANIXOR SIGNAL ARRAY
                </span>
                <span>AI / {String(activeIndex + 1).padStart(2, "0")}</span>
              </div>
            </div>

            <ChannelIndicator
              products={PRODUCT_CHANNELS}
              activeIndex={activeIndex}
              onSelect={selectChannel}
            />
          </div>

          <div className="products-scroll-cue" aria-hidden="true">
            <span>
              {activeIndex === PRODUCT_CHANNELS.length - 1 ? "Continue" : "Change channel"}
            </span>
            <ArrowDown />
          </div>
        </div>
      </div>

      <div className="sr-only">
        <h3>Sanixor product directory</h3>
        {PRODUCT_CHANNELS.map((product) => (
          <p key={product.id}>
            <Link to={product.path}>{product.name}</Link>: {product.description}
          </p>
        ))}
      </div>
    </section>
  );
}
