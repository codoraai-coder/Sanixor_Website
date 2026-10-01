import type { Ref } from "react";
import { BroadcastScene } from "./BroadcastScene";
import { ChannelTransition } from "./ChannelTransition";
import { channelNumber, type ProductChannel } from "./products";
import type { TunerPhase } from "./useChannelTuner";

/**
 * The CRT tube: picture → signal effects → phosphor/scanlines → curved glass.
 * Only the channel actually being shown is mounted, so a switch never leaves
 * ghost scenes in the compositor and only one video decodes at a time.
 */
export function TelevisionScreen({
  screenRef,
  products,
  shown,
  phase,
  tuneCount,
  powered,
  playing,
}: {
  screenRef: Ref<HTMLDivElement>;
  products: ProductChannel[];
  shown: number;
  phase: TunerPhase;
  tuneCount: number;
  powered: boolean;
  playing: boolean;
}) {
  const product = products[shown];

  return (
    <div ref={screenRef} className="tv-tube" data-phase={phase} data-power={powered ? "on" : "off"}>
      <svg className="tv-defs" aria-hidden="true" focusable="false">
        <filter
          id="tv-rgb-split"
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
          <feOffset in="red" dx="-5" result="redShift" />
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
          <feOffset in="blue" dx="5" result="blueShift" />
          <feBlend in="redShift" in2="green" mode="screen" result="redGreen" />
          <feBlend in="redGreen" in2="blueShift" mode="screen" />
        </filter>
      </svg>

      <div className="tv-raster">
        <div className="tv-picture">
          <BroadcastScene
            key={product.id}
            product={product}
            index={shown}
            count={products.length}
            loadFootage={powered}
            playing={playing}
          />
        </div>

        <ChannelTransition />

        {powered && (
          <div className="tv-osd" key={tuneCount} aria-hidden="true">
            <span>CH</span>
            <strong>{channelNumber(shown)}</strong>
          </div>
        )}
      </div>

      <div className="tv-phosphor" aria-hidden="true" />
      <div className="tv-scanlines" data-tune="" aria-hidden="true" />
      <div className="tv-vignette" aria-hidden="true" />
      <div className="tv-glass" aria-hidden="true" />
    </div>
  );
}
