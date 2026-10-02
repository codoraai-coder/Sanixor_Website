import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import sanixorMark from "@/assets/sanixor-mark.png";
import { CRTTelevision } from "./CRTTelevision";
import { ChannelReadout } from "./ChannelIndicator";
import { ChannelTransition } from "./ChannelTransition";
import { channelNumber } from "./products";
import { detentAngle } from "./tuning";
import { useChannelTuner } from "./useChannelTuner";
import "./product-showcase.css";

export type PreviewChannel = {
  id: string;
  name: string;
  href: string;
  kicker: string;
  description: string;
  /** Two-screen-tall capture of the destination (see public/nav-preview). */
  shot: string;
  accentRgb: string;
};

/**
 * The menu's preview set: the product section's CRT, tuned to whichever
 * menu link is hovered or focused. Purely a visual companion to the links —
 * hidden from assistive tech, which gets the links themselves.
 */
export function NavPreviewTV({
  channels,
  target,
  powered,
  onSelect,
}: {
  channels: PreviewChannel[];
  target: number;
  powered: boolean;
  onSelect?: (event: MouseEvent<HTMLAnchorElement>, channel: PreviewChannel) => void;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const { shown, phase, tuneCount } = useChannelTuner(target, reduceMotion);
  const knobRef = useRef<HTMLDivElement>(null);
  const needleRef = useRef<HTMLSpanElement>(null);
  const [warmed, setWarmed] = useState(false);
  const [on, setOn] = useState(false);
  const count = channels.length;

  // Switch on once the menu's wipe has uncovered the set, so the CRT
  // power-on is actually seen; switch off the moment the menu closes.
  useEffect(() => {
    if (!powered) {
      setOn(false);
      return;
    }
    const timer = window.setTimeout(() => setOn(true), reduceMotion ? 0 : 750);
    return () => window.clearTimeout(timer);
  }, [powered, reduceMotion]);

  // The knob and needle snap to the hovered link straight away; the picture
  // follows through the analog channel change.
  useEffect(() => {
    if (knobRef.current) {
      knobRef.current.style.transform = `rotate(${detentAngle(target, count)}deg)`;
    }
    if (needleRef.current) {
      needleRef.current.style.left = `${((target + 0.5) / count) * 100}%`;
    }
  }, [target, count]);

  // Fetch every capture the first time the menu opens so hovering never
  // tunes into an empty picture.
  useEffect(() => {
    if (!powered || warmed) return;
    channels.forEach((channel) => {
      new Image().src = channel.shot;
    });
    setWarmed(true);
  }, [powered, warmed, channels]);

  const channel = channels[shown];
  const style = { "--ch-rgb": channel.accentRgb } as CSSProperties;

  return (
    <a
      href={channels[target].href}
      onClick={(event) => onSelect?.(event, channels[target])}
      className="navtv"
      style={style}
      data-motion={reduceMotion ? "reduced" : "full"}
      data-on={on ? "true" : "false"}
      aria-hidden="true"
      tabIndex={-1}
    >
      <CRTTelevision
        channelCount={count}
        knobRef={knobRef}
        powered={on}
        readout={<ChannelReadout products={channels} tuned={target} needleRef={needleRef} />}
        presets={
          <div className="tv-presets" style={{ gridTemplateColumns: `repeat(${count}, 1fr)` }}>
            {channels.map((item, index) => (
              <span
                key={item.id}
                className="tv-preset"
                aria-pressed={index === target ? "true" : "false"}
              >
                <i />
                <span>{index + 1}</span>
              </span>
            ))}
          </div>
        }
        screen={
          <div className="tv-tube" data-phase={phase} data-power={on ? "on" : "off"}>
            <svg className="tv-defs" focusable="false">
              <filter
                id="navtv-rgb-split"
                x="-4%"
                y="0"
                width="108%"
                height="100%"
                colorInterpolationFilters="sRGB"
              >
                <feColorMatrix
                  in="SourceGraphic"
                  type="matrix"
                  values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
                  result="red"
                />
                <feOffset in="red" dx="-4" result="redShift" />
                <feColorMatrix
                  in="SourceGraphic"
                  type="matrix"
                  values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
                  result="green"
                />
                <feColorMatrix
                  in="SourceGraphic"
                  type="matrix"
                  values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
                  result="blue"
                />
                <feOffset in="blue" dx="4" result="blueShift" />
                <feBlend in="redShift" in2="green" mode="screen" result="redGreen" />
                <feBlend in="redGreen" in2="blueShift" mode="screen" />
              </filter>
            </svg>

            <div className="tv-raster">
              <div className="tv-picture">
                <div className="bc-scene" key={channel.id}>
                  <div className="navtv-shot">
                    {on && <img src={channel.shot} alt="" decoding="async" />}
                  </div>
                  <div className="bc-scrim" />

                  <div className="bc-bug">
                    <img src={sanixorMark} alt="" width={20} height={20} decoding="async" />
                    <span>Sanixor</span>
                    <i />
                    <b>Preview</b>
                  </div>

                  <div className="bc-lower-third">
                    <p className="bc-kicker">
                      <span className="bc-kicker-ch">CH {channelNumber(shown)}</span>
                      <span className="bc-kicker-rule" />
                      <span>{channel.kicker}</span>
                    </p>
                    <p className="bc-title">{channel.name}</p>
                    <p className="bc-desc">{channel.description}</p>
                    <span className="navtv-hint">
                      Tune in <ArrowUpRight />
                    </span>
                  </div>
                </div>
              </div>

              <ChannelTransition />

              {on && (
                <div className="tv-osd" key={tuneCount}>
                  <span>CH</span>
                  <strong>{channelNumber(shown)}</strong>
                </div>
              )}
            </div>

            <div className="tv-phosphor" />
            <div className="tv-scanlines" />
            <div className="tv-vignette" />
            <div className="tv-glass" />
          </div>
        }
      />
    </a>
  );
}
