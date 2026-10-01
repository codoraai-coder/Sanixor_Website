import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import sanixorMark from "@/assets/sanixor-mark.png";
import { BroadcastFootage } from "./BroadcastFootage";
import { channelNumber, type ProductChannel } from "./products";

/**
 * One channel's programme: product footage filling the tube, with broadcast
 * graphics (network bug, lower third, crawl) laid over it the way a TV
 * station would — not a web card sitting inside a screen.
 */
export function BroadcastScene({
  product,
  index,
  count,
  loadFootage,
  playing,
}: {
  product: ProductChannel;
  index: number;
  count: number;
  loadFootage: boolean;
  playing: boolean;
}) {
  const channel = channelNumber(index);
  const crawl = [...product.features, product.metric];

  return (
    <article
      className="bc-scene"
      aria-labelledby={`bc-title-${product.id}`}
      aria-describedby={`bc-desc-${product.id}`}
    >
      <BroadcastFootage product={product} load={loadFootage} playing={playing} />
      <div className="bc-scrim" aria-hidden="true" />

      <div className="bc-bug" aria-hidden="true">
        <img src={sanixorMark} alt="" width={20} height={20} decoding="async" />
        <span>Sanixor</span>
        <i />
        <b>On air</b>
      </div>

      <div className="bc-lower-third">
        <p className="bc-kicker">
          <span className="bc-kicker-ch">CH {channel}</span>
          <span className="bc-kicker-rule" aria-hidden="true" />
          <span>{product.category}</span>
          <span className="sr-only">
            , channel {index + 1} of {count}
          </span>
        </p>
        <h3 id={`bc-title-${product.id}`} className="bc-title">
          {product.name}
        </h3>
        <p id={`bc-desc-${product.id}`} className="bc-desc">
          {product.description}
        </p>
        <Link to={product.path} className="snx-btn-primary bc-cta">
          Explore {product.name}
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>

      <div className="bc-crawl" aria-hidden="true">
        <span className="bc-crawl-tag">{product.name}</span>
        <div className="bc-crawl-window">
          <div className="bc-crawl-track">
            {[0, 1].map((copy) => (
              <span key={copy}>
                {crawl.map((item) => (
                  <em key={item}>{item}</em>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
