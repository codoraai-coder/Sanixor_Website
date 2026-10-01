import type { Ref } from "react";
import { channelNumber, type ProductChannel } from "./products";

/**
 * The set's own channel readout: a VFD window with a tuning scale whose
 * needle tracks the scroll position continuously (moved via `needleRef`
 * without re-rendering).
 */
export function ChannelReadout({
  products,
  tuned,
  needleRef,
}: {
  products: ProductChannel[];
  tuned: number;
  needleRef: Ref<HTMLSpanElement>;
}) {
  return (
    <div className="tv-vfd" aria-hidden="true">
      <div className="tv-vfd-row">
        <span className="tv-vfd-ch">CH</span>
        <span className="tv-vfd-num">{channelNumber(tuned)}</span>
        <span className="tv-vfd-name">{products[tuned].name}</span>
      </div>
      <div className="tv-vfd-scale">
        {products.map((product, index) => (
          <i
            key={product.id}
            className={index === tuned ? "is-on" : undefined}
            style={{ left: `${((index + 0.5) / products.length) * 100}%` }}
          />
        ))}
        <span ref={needleRef} className="tv-vfd-needle" />
      </div>
    </div>
  );
}

/** Physical preset push-buttons — the keyboard / pointer way to change channel. */
export function ChannelPresets({
  products,
  tuned,
  onSelect,
}: {
  products: ProductChannel[];
  tuned: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="tv-presets" role="group" aria-label="Product channels">
      {products.map((product, index) => {
        const isActive = index === tuned;
        return (
          <button
            type="button"
            key={product.id}
            className="tv-preset"
            onClick={() => onSelect(index)}
            aria-pressed={isActive}
            aria-label={`Channel ${channelNumber(index)}: ${product.name}`}
            title={`CH ${channelNumber(index)} — ${product.name}`}
          >
            <i aria-hidden="true" />
            <span aria-hidden="true">{index + 1}</span>
          </button>
        );
      })}
    </div>
  );
}
