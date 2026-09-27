import { ArrowUpRight, Radio } from "lucide-react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { Link } from "react-router-dom";
import { ProductVisual } from "./ProductVisual";
import type { ProductChannel } from "./products";

export function ProductScene({
  product,
  index,
  count,
  progress,
  isActive,
  activeIndex,
}: {
  product: ProductChannel;
  index: number;
  count: number;
  progress: MotionValue<number>;
  isActive: boolean;
  activeIndex: number;
}) {
  const gap = 1 / (count - 1);
  const center = index * gap;
  const range =
    index === 0
      ? [0, gap * 0.36, gap * 0.48]
      : index === count - 1
        ? [center - gap * 0.48, center - gap * 0.36, 1]
        : [center - gap * 0.48, center - gap * 0.36, center + gap * 0.36, center + gap * 0.48];
  const opacityOutput = index === 0 ? [1, 1, 0] : index === count - 1 ? [0, 1, 1] : [0, 1, 1, 0];
  const yOutput = index === 0 ? [0, 0, -38] : index === count - 1 ? [38, 0, 0] : [38, 0, 0, -38];
  const scaleOutput =
    index === 0 ? [1, 1, 0.985] : index === count - 1 ? [0.985, 1, 1] : [0.985, 1, 1, 0.985];

  // Explicit clamping prevents a scene from being extrapolated back into
  // view once the scroll position has moved beyond its channel range.
  const opacity = useTransform(progress, range, opacityOutput, { clamp: true });
  const y = useTransform(progress, range, yOutput, { clamp: true });
  const scale = useTransform(progress, range, scaleOutput, { clamp: true });

  return (
    <motion.article
      className="product-channel-scene"
      style={{ opacity, y, scale, zIndex: isActive ? 2 : 1 }}
      aria-hidden={!isActive}
      aria-label={`${product.name} product channel`}
    >
      <div className="product-channel-copy">
        <div className="product-channel-kicker">
          <Radio aria-hidden="true" />
          <span>CH {String(index + 1).padStart(2, "0")}</span>
          <i aria-hidden="true" />
          <span>{product.category}</span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <ul aria-label={`${product.name} capabilities`}>
          {product.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <div className="product-channel-meta">
          <span>{product.metric}</span>
          <Link to={product.path} tabIndex={isActive ? 0 : -1}>
            Explore {product.name}
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="product-channel-visual">
        <ProductVisual product={product} shouldLoad={Math.abs(index - activeIndex) <= 1} />
      </div>
    </motion.article>
  );
}
