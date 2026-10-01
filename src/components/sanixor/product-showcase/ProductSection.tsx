import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowDown } from "lucide-react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { lenisInstance } from "@/hooks/useSmoothScroll";
import { CRTTelevision } from "./CRTTelevision";
import { ChannelPresets, ChannelReadout } from "./ChannelIndicator";
import { TelevisionScreen } from "./TelevisionScreen";
import { channelNumber, PRODUCT_CHANNELS } from "./products";
import { detentAngle, readDial } from "./tuning";
import { useChannelTuner } from "./useChannelTuner";
import "./product-showcase.css";

const COUNT = PRODUCT_CHANNELS.length;

/**
 * Products as television channels. A tall section gives each channel an
 * equal slice of the scroll timeline; a sticky viewport holds the set still
 * while scrolling turns its channel knob.
 */
export function ProductSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const needleRef = useRef<HTMLSpanElement>(null);

  const reduceMotion = useReducedMotion() ?? false;
  const [target, setTarget] = useState(0);
  const [powered, setPowered] = useState(false);
  const [inView, setInView] = useState(false);
  const { shown, phase, tuneCount } = useChannelTuner(target, reduceMotion);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Per-scroll work is a few style writes, each skipped when unchanged, and
  // a state update only when a channel boundary is crossed. `--tune` goes
  // straight to the two signal layers that read it, so a scroll frame never
  // restyles the broadcast underneath.
  const lastWrite = useRef({ knob: "", needle: "", tune: "" });
  const applyDial = useCallback((progress: number) => {
    const dial = readDial(progress, COUNT);
    const last = lastWrite.current;
    setTarget((current) => (current === dial.channel ? current : dial.channel));

    const knob = `rotate(${detentAngle(dial.knob, COUNT).toFixed(1)}deg)`;
    if (knob !== last.knob && knobRef.current) {
      knobRef.current.style.transform = knob;
      last.knob = knob;
    }
    const needle = `${(dial.needle * 100).toFixed(1)}%`;
    if (needle !== last.needle && needleRef.current) {
      needleRef.current.style.left = needle;
      last.needle = needle;
    }
    const tune = dial.tune.toFixed(2);
    if (tune !== last.tune && screenRef.current) {
      screenRef.current
        .querySelectorAll<HTMLElement>("[data-tune]")
        .forEach((layer) => layer.style.setProperty("--tune", tune));
      last.tune = tune;
    }
  }, []);

  useMotionValueEvent(scrollYProgress, "change", applyDial);
  useEffect(() => applyDial(scrollYProgress.get()), [applyDial, scrollYProgress]);

  // Switch the set on the first time it is properly in view, and pause the
  // picture whenever it is off screen.
  useEffect(() => {
    const sticky = stickyRef.current;
    if (!sticky || typeof IntersectionObserver === "undefined") {
      setPowered(true);
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.intersectionRatio >= 0.4) setPowered(true);
      },
      { threshold: [0, 0.4] },
    );
    observer.observe(sticky);
    return () => observer.disconnect();
  }, []);

  // Warm the cache with every channel's poster frame once the set is on, so
  // a new channel never lands on an empty picture while its video loads.
  useEffect(() => {
    if (!powered) return;
    PRODUCT_CHANNELS.forEach((product) => {
      if (product.footage.type === "video") new Image().src = product.footage.poster;
    });
  }, [powered]);

  const selectChannel = useCallback(
    (index: number) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const distance = Math.max(0, rect.height - window.innerHeight);
      const y = top + ((index + 0.5) / COUNT) * distance;

      if (lenisInstance && !reduceMotion) {
        lenisInstance.scrollTo(y, { duration: 1.1 });
      } else {
        window.scrollTo({ top: y, behavior: "auto" });
      }
    },
    [reduceMotion],
  );

  const product = PRODUCT_CHANNELS[shown];
  const sectionStyle = {
    "--channels": COUNT,
    "--ch": product.accent,
    "--ch-rgb": product.accentRgb,
  } as CSSProperties;

  return (
    <section
      id="products"
      ref={sectionRef}
      className="tvx"
      style={sectionStyle}
      data-motion={reduceMotion ? "reduced" : "full"}
      aria-labelledby="products-heading"
    >
      <div ref={stickyRef} className="tvx-sticky" data-inview={inView ? "true" : "false"}>
        <div className="tvx-env" aria-hidden="true">
          <div className="tvx-haze" />
          <div className="tvx-spill" />
          <div className="tvx-floor" />
        </div>

        <div className="tvx-layout">
          {/* The set speaks for itself visually; the title stays for assistive tech. */}
          <h2 id="products-heading" className="sr-only">
            Sanixor products: {COUNT} channels. Scroll to change the channel.
          </h2>

          <div className="tvx-stage">
            <CRTTelevision
              channelCount={COUNT}
              knobRef={knobRef}
              powered={powered}
              screen={
                <TelevisionScreen
                  screenRef={screenRef}
                  products={PRODUCT_CHANNELS}
                  shown={shown}
                  phase={phase}
                  tuneCount={tuneCount}
                  powered={powered}
                  playing={powered && inView}
                />
              }
              readout={
                <ChannelReadout products={PRODUCT_CHANNELS} tuned={target} needleRef={needleRef} />
              }
              presets={
                <ChannelPresets
                  products={PRODUCT_CHANNELS}
                  tuned={target}
                  onSelect={selectChannel}
                />
              }
            />

            <div className="tvx-caption" aria-hidden="true">
              <span className="tvx-caption-ch">
                CH {channelNumber(target)} — {PRODUCT_CHANNELS[target].name}
              </span>
              <span className="tvx-caption-hint">
                {target === COUNT - 1 ? "Keep scrolling to continue" : "Scroll to change channel"}
                <ArrowDown />
              </span>
            </div>
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          Now showing channel {shown + 1} of {COUNT}: {product.name}
        </p>
      </div>

      <div className="sr-only">
        <h3>All Sanixor product channels</h3>
        <ul>
          {PRODUCT_CHANNELS.map((item, index) => (
            <li key={item.id}>
              Channel {index + 1}, {item.name} ({item.category}): {item.description}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
