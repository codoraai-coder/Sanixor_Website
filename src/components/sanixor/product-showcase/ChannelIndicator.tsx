import type { ProductChannel } from "./products";

export function ChannelIndicator({
  products,
  activeIndex,
  onSelect,
}: {
  products: ProductChannel[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <nav className="channel-indicator" aria-label="Product channels">
      {products.map((product, index) => {
        const channel = String(index + 1).padStart(2, "0");
        const isActive = index === activeIndex;

        return (
          <button
            type="button"
            key={product.id}
            className={isActive ? "is-active" : ""}
            onClick={() => onSelect(index)}
            aria-current={isActive ? "step" : undefined}
            aria-label={`Channel ${channel}: ${product.name}`}
          >
            <span className="channel-indicator-number">{channel}</span>
            <i aria-hidden="true" />
            <span className="channel-indicator-name">{product.name}</span>
          </button>
        );
      })}
    </nav>
  );
}
