import { ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";

export type ServiceInfo = {
  id: string;
  num: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  capabilities: { title: string; desc: string }[];
};

interface ServiceDetailsModalProps {
  service: ServiceInfo;
  onClose: () => void;
}

export function ServiceDetailsModal({ service, onClose }: ServiceDetailsModalProps) {
  return (
    <>
      <style>{`
        .sd-overlay {
          position: fixed;
          inset: 0;
          background: color-mix(in srgb, var(--background) 85%, transparent);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: sd-fadeIn .3s cubic-bezier(.22,1,.36,1);
        }
        @keyframes sd-fadeIn { from{opacity:0; backdrop-filter: blur(0px);} to{opacity:1; backdrop-filter: blur(12px);} }
        
        .sd-modal {
          background: color-mix(in srgb, var(--card) 65%, transparent);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid color-mix(in srgb, var(--border) 50%, transparent);
          border-radius: 24px;
          width: 100%;
          max-width: 960px;
          max-height: 90vh;
          display: flex;
          flex-direction: row;
          position: relative;
          overflow: hidden;
          box-shadow: 0 32px 96px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.05), 0 0 40px rgba(139, 92, 246, 0.15);
          animation: sd-modalIn .4s cubic-bezier(.22,1,.36,1);
        }
        @keyframes sd-modalIn {
          from { opacity:0; transform: scale(.96) translateY(16px); }
          to   { opacity:1; transform: scale(1) translateY(0); }
        }

        .sd-header {
          position: relative;
          width: 40%;
          border-right: 1px solid rgba(139, 92, 246, 0.15);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 40px;
        }
        .sd-header-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0.4;
          mix-blend-mode: luminosity;
          z-index: 0;
        }
        .sd-header-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, var(--card) 0%, transparent 60%);
          z-index: 1;
        }
        .sd-header-content {
          position: relative;
          z-index: 2;
        }
        
        .sd-num {
          font-family: 'DM Mono', monospace;
          color: var(--primary);
          font-weight: 700;
          font-size: 14px;
          margin-bottom: 8px;
          display: block;
        }
        
        .sd-title {
          font-size: 32px;
          font-weight: 800;
          color: var(--foreground);
          margin: 0;
          letter-spacing: -0.02em;
          text-shadow: 0 4px 12px color-mix(in srgb, var(--foreground) 30%, transparent);
        }
        
        .sd-close {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 10;
          width: 32px; height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: color-mix(in srgb, var(--background) 50%, transparent);
          backdrop-filter: blur(4px);
          border: 1px solid color-mix(in srgb, var(--foreground) 10%, transparent);
          border-radius: 10px;
          color: var(--foreground);
          cursor: pointer;
          transition: all .25s cubic-bezier(.22,1,.36,1);
        }
        .sd-close:hover {
          background: rgba(139, 92, 246, 0.4);
          border-color: rgba(139, 92, 246, 0.6);
          transform: rotate(90deg) scale(1.05);
        }

        .sd-body {
          width: 60%;
          padding: 32px 32px 32px 40px;
          overflow-y: auto;
        }
        
        .sd-body::-webkit-scrollbar {
          width: 6px;
        }
        .sd-body::-webkit-scrollbar-track {
          background: transparent;
        }
        .sd-body::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.2);
          border-radius: 10px;
        }
        .sd-body::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.4);
        }
        
        .sd-desc {
          font-size: 15px;
          line-height: 1.7;
          color: var(--foreground);
          margin-bottom: 28px;
          margin-top: 12px;
          padding-right: 16px;
        }

        .sd-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 32px;
        }
        .sd-tag {
          padding: 6px 12px;
          border-radius: 8px;
          background: color-mix(in srgb, var(--primary) 10%, transparent);
          border: 1px solid color-mix(in srgb, var(--primary) 20%, transparent);
          color: var(--primary);
          font-size: 12px;
          font-weight: 600;
        }

        .sd-cap-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 32px;
        }
        
        .sd-cap-card {
          background: color-mix(in srgb, var(--foreground) 5%, transparent);
          border: 1px solid color-mix(in srgb, var(--border) 50%, transparent);
          border-radius: 16px;
          padding: 20px;
          transition: all 0.3s ease;
        }
        .sd-cap-card:hover {
          background: rgba(139, 92, 246, 0.05);
          border-color: rgba(139, 92, 246, 0.3);
          transform: translateY(-2px);
        }
        .sd-cap-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--foreground);
          margin-bottom: 6px;
        }
        .sd-cap-desc {
          font-size: 12px;
          color: color-mix(in srgb, var(--foreground) 70%, transparent);
          line-height: 1.5;
        }

        .sd-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 16px;
          background: linear-gradient(45deg, #4c1d95, #c026d3, #7c3aed, #ec4899);
          background-size: 300% 300%;
          animation: sd-gradient 4s ease infinite;
          color: white;
          text-decoration: none;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: .05em;
          transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s;
          box-shadow: 0 8px 25px rgba(192, 38, 211, 0.4), inset 0 1px 1px rgba(255,255,255,0.3);
        }
        @keyframes sd-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .sd-action:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(192, 38, 211, 0.6), inset 0 1px 1px rgba(255,255,255,0.5);
        }
        .sd-action svg { width: 18px; height: 18px; transition: transform .3s; }
        .sd-action:hover svg { transform: translateX(4px); }

        @media (max-width: 768px) {
          .sd-overlay {
            padding: 12px;
          }
          .sd-modal {
            flex-direction: column;
            width: 100%;
            height: 100%;
            max-height: calc(100vh - 24px);
            max-height: calc(100dvh - 24px);
            overflow: hidden;
            border-radius: 20px;
          }
          .sd-header {
            width: 100%;
            height: 130px;
            flex-shrink: 0;
            border-right: none;
            border-bottom: 1px solid rgba(139, 92, 246, 0.15);
            padding: 24px 20px 16px 20px;
          }
          .sd-body {
            width: 100%;
            flex: 1;
            padding: 16px 20px 20px 20px;
            overflow-y: hidden;
            display: flex;
            flex-direction: column;
          }
          .sd-title { font-size: 26px; }
          .sd-desc {
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 16px;
            margin-top: 4px;
            padding-right: 0;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            flex-shrink: 0;
            color: rgba(255,255,255,0.7);
          }
          .sd-tags {
            margin-bottom: 24px;
            gap: 6px;
            flex-shrink: 0;
          }
          .sd-tag {
            padding: 4px 10px;
            font-size: 11px;
          }
          .sd-cap-grid { 
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: auto; /* Pushes the button to the bottom perfectly */
          }
          .sd-cap-card {
            background: linear-gradient(to right, rgba(139, 92, 246, 0.1), transparent);
            border: 1px solid rgba(139, 92, 246, 0.15);
            border-left: 3px solid #a855f7;
            border-radius: 8px;
            padding: 14px 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .sd-cap-card::after {
            content: "→";
            color: #a855f7;
            font-size: 18px;
            opacity: 0.6;
          }
          .sd-cap-title {
            font-size: 14px;
            margin-bottom: 0;
            color: #fff;
          }
          .sd-cap-desc {
            display: none; /* Hide descriptions on mobile to tease content! */
          }
          .sd-action {
            margin-top: 24px;
            padding: 16px;
            flex-shrink: 0;
          }
        }

      `}</style>

      <div className="sd-overlay" onClick={onClose}>
        <div className="sd-modal" onClick={(e) => e.stopPropagation()}>
          <button className="sd-close" onClick={onClose} aria-label="Close">
            <X strokeWidth={2.5} />
          </button>

          <div className="sd-header">
            <div className="sd-header-bg" style={{ backgroundImage: `url(${service.image})` }} />
            <div className="sd-header-gradient" />
            <div className="sd-header-content">
              <span className="sd-num">SERVICE {service.num}</span>
              <h2 className="sd-title">{service.title}</h2>
            </div>
          </div>

          <div className="sd-body">
            <p className="sd-desc">{service.description}</p>

            <div className="sd-tags">
              {service.tags.map((t) => (
                <span key={t} className="sd-tag">
                  {t}
                </span>
              ))}
            </div>

            <div className="sd-cap-grid">
              {service.capabilities.map((cap, i) => (
                <div key={i} className="sd-cap-card">
                  <div className="sd-cap-title">{cap.title}</div>
                  <div className="sd-cap-desc">{cap.desc}</div>
                </div>
              ))}
            </div>

            <Link to={`/${service.id}`} onClick={onClose} className="sd-action">
              View Full Documentation <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
