import { BarChart3, Check, MessageSquare, Scale, Search, Users } from "lucide-react";
import type { ProductChannel } from "./products";

function WindowBar({ address }: { address: string }) {
  return (
    <div className="channel-window-bar" aria-hidden="true">
      <span />
      <span />
      <span />
      <div>{address}</div>
    </div>
  );
}

function DemoVisual({ product, shouldLoad }: { product: ProductChannel; shouldLoad: boolean }) {
  if (product.visual.type !== "demo") return null;

  return (
    <div className="channel-window channel-window-demo">
      <WindowBar address={`${product.id}.sanixor.ai / live`} />
      <div className="channel-demo-stage">
        {shouldLoad ? (
          <img
            src={product.visual.src}
            alt={`${product.name} product interface`}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="channel-demo-placeholder" aria-hidden="true" />
        )}
        <div className="channel-demo-sheen" aria-hidden="true" />
      </div>
    </div>
  );
}

function SocioVisual() {
  return (
    <div
      className="channel-window custom-product-ui socio-ui"
      aria-label="Socio AI command center preview"
    >
      <WindowBar address="socio.sanixor.ai / command-center" />
      <div className="custom-ui-body">
        <aside className="custom-ui-rail" aria-hidden="true">
          <div className="rail-brand">S</div>
          <Users />
          <MessageSquare />
          <BarChart3 />
        </aside>
        <div className="custom-ui-main">
          <div className="custom-ui-heading">
            <div>
              <small>Unified workspace</small>
              <strong>Audience pulse</strong>
            </div>
            <span className="status-pill">
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
              <div className="ui-section-label">Engagement velocity</div>
              <svg viewBox="0 0 360 120" role="img" aria-label="Rising engagement chart">
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
              <div className="ui-section-label">Agent inbox</div>
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
    </div>
  );
}

function NyayVisual() {
  return (
    <div
      className="channel-window custom-product-ui nyay-ui"
      aria-label="Nyay AI legal review preview"
    >
      <WindowBar address="nyay.sanixor.ai / contract-review" />
      <div className="nyay-body">
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
          <button type="button">View suggested revision</button>
        </aside>
      </div>
    </div>
  );
}

export function ProductVisual({
  product,
  shouldLoad,
}: {
  product: ProductChannel;
  shouldLoad: boolean;
}) {
  if (product.visual.type === "demo") {
    return <DemoVisual product={product} shouldLoad={shouldLoad} />;
  }

  if (product.visual.type === "socio") return <SocioVisual />;
  return <NyayVisual />;
}
