import { useEffect, useRef } from "react";
import { BarChart3, Check, MessageSquare, Scale, Search, Users } from "lucide-react";
import type { ProductChannel } from "./products";

function VideoFootage({ product, playing }: { product: ProductChannel; playing: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      // Autoplay can be refused (data saver, power saving); the poster
      // frame stays on screen in that case, which is an acceptable picture.
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [playing]);

  if (product.footage.type !== "video") return null;

  return (
    <video
      ref={videoRef}
      className="bc-video"
      poster={product.footage.poster}
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    >
      <source src={product.footage.webm} type="video/webm" />
      <source src={product.footage.mp4} type="video/mp4" />
    </video>
  );
}

function SocioFootage() {
  return (
    <div className="bc-ui socio-ui" aria-hidden="true">
      <aside className="bc-ui-rail">
        <div className="bc-ui-brand">S</div>
        <Users />
        <MessageSquare />
        <BarChart3 />
      </aside>
      <div className="bc-ui-main">
        <div className="bc-ui-heading">
          <div>
            <small>Unified workspace</small>
            <strong>Audience pulse</strong>
          </div>
          <span className="bc-ui-pill">
            <i /> Live sync
          </span>
        </div>
        <div className="socio-metrics">
          <div>
            <small>Reach</small>
            <strong>2.4M</strong>
            <span>+18.6%</span>
          </div>
          <div>
            <small>Conversations</small>
            <strong>18.2K</strong>
            <span>+9.1%</span>
          </div>
          <div>
            <small>Resolved by AI</small>
            <strong>84%</strong>
            <span>+6.4%</span>
          </div>
        </div>
        <div className="socio-lower">
          <div className="socio-chart">
            <div className="bc-ui-label">Engagement velocity</div>
            <svg viewBox="0 0 360 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="socio-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="currentColor" stopOpacity="0.34" />
                  <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                className="chart-area"
                d="M0 105 C40 98 55 72 94 79 S145 103 180 64 S228 76 265 42 S314 56 360 18 L360 120 L0 120Z"
              />
              <path
                className="chart-line"
                d="M0 105 C40 98 55 72 94 79 S145 103 180 64 S228 76 265 42 S314 56 360 18"
              />
            </svg>
          </div>
          <div className="socio-inbox">
            <div className="bc-ui-label">Agent inbox</div>
            {["Product question", "Enterprise lead", "Support request"].map((label, index) => (
              <div className="inbox-row" key={label}>
                <span>{index + 1}</span>
                <p>{label}</p>
                <i className={index === 1 ? "hot" : ""} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NyayFootage() {
  return (
    <div className="bc-ui nyay-ui" aria-hidden="true">
      <div className="nyay-document">
        <div className="document-heading">
          <Scale />
          <div>
            <small>Reviewing</small>
            <strong>Vendor Agreement.pdf</strong>
          </div>
          <span>43 pages</span>
        </div>
        <div className="document-copy">
          <span className="copy-line wide" />
          <span className="copy-line" />
          <span className="copy-line medium" />
          <div className="risk-clause">
            <small>Clause 8.4 · Liability</small>
            <p>Liability is uncapped for indirect damages and survives termination.</p>
          </div>
          <span className="copy-line wide" />
          <span className="copy-line short" />
        </div>
      </div>
      <aside className="nyay-insights">
        <div className="nyay-score">
          <small>Risk score</small>
          <strong>72</strong>
          <span>/100</span>
        </div>
        <div className="insight-card critical">
          <Search />
          <div>
            <small>High risk</small>
            <strong>Uncapped liability</strong>
          </div>
        </div>
        <div className="insight-card">
          <Check />
          <div>
            <small>Compliant</small>
            <strong>Data processing</strong>
          </div>
        </div>
      </aside>
    </div>
  );
}

export function BroadcastFootage({
  product,
  load,
  playing,
}: {
  product: ProductChannel;
  /** False until the set is switched on, so no video downloads early. */
  load: boolean;
  playing: boolean;
}) {
  return (
    <div className={`bc-footage bc-footage-${product.footage.type}`}>
      {product.footage.type === "video" ? (
        load && <VideoFootage product={product} playing={playing} />
      ) : product.footage.type === "socio" ? (
        <SocioFootage />
      ) : (
        <NyayFootage />
      )}
    </div>
  );
}
