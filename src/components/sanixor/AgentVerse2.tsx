import { useState, useEffect } from "react";
import { AgentVerseDetailsModal } from "./AgentVerseDetailsModal";
import { AgentVerseRegistrationModal } from "./AgentVerseRegistrationModal";
import { AgentVersePartnershipModal } from "./AgentVersePartnershipModal";

interface AgentVerse2Props {
  mode?: "preview" | "full";
  registerTriggerRef?: React.RefObject<(() => void) | null>;
}

export function AgentVerse2({ mode = "full", registerTriggerRef }: AgentVerse2Props) {
  const isPreview = mode === "preview";
  const [showDetails, setShowDetails] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showPartnership, setShowPartnership] = useState(false);

  useEffect(() => {
    if (registerTriggerRef) {
      registerTriggerRef.current = () => setShowRegister(true);
    }
  }, [registerTriggerRef]);

  useEffect(() => {
    if (isPreview) return;
    const params = new URLSearchParams(window.location.search);
    const action = params.get("action");

    if (action === "register" || action === "details") {
      const section = document.getElementById("event");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }

      setTimeout(() => {
        if (action === "register") setShowRegister(true);
        if (action === "details") setShowDetails(true);
        window.history.replaceState({}, "", "/#event");
      }, 300);
    }
  }, [isPreview]);

  return (
    <>
      <style>{`
        .av2-root {
          position: relative;
          width: 100%;
          min-height: 400px;
          background: #09090b;
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.9), inset 0 1px 1px rgba(255, 255, 255, 0.05);
          border-radius: clamp(16px, 3vw, 24px);
          overflow: hidden;
          padding: clamp(30px, 6vw, 100px) clamp(20px, 5vw, 120px) clamp(40px, 6vw, 100px);
          display: flex;
          align-items: center;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .av2-dot-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 32px 32px;
          opacity: 1;
          mask-image: radial-gradient(ellipse at top center, black 50%, transparent 90%);
          -webkit-mask-image: radial-gradient(ellipse at top center, black 50%, transparent 90%);
          pointer-events: none;
          z-index: 0;
        }
        .av2-glow1 {
          position: absolute;
          top: -300px; left: 50%;
          transform: translateX(-50%);
          width: 800px; height: 600px;
          background: radial-gradient(ellipse, rgba(124, 58, 237, 0.2) 0%, transparent 60%);
          pointer-events: none; z-index: 0;
        }

        .av2-body {
          position: relative;
          z-index: 2;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: clamp(32px, 5vw, 60px);
        }
        @media (min-width: 768px) {
          .av2-body {
            display: grid;
            grid-template-columns: 1fr 1.15fr;
            align-items: center;
          }
        }
        .av2-body-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .av2-body-right {
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        .av2-badges {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 24px;
          opacity: 0;
          animation: av2-up .6s .1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .av2-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          backdrop-filter: blur(8px);
        }
        .av2-badge-gold {
          background: rgba(245, 197, 66, 0.08);
          color: #f5c542;
          border: 1px solid rgba(245, 197, 66, 0.2);
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
        }
        .av2-badge-gold::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #f5c542;
          box-shadow: 0 0 8px #f5c542;
          animation: av2-blink 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes av2-blink { 0%,100%{opacity:1; box-shadow: 0 0 8px #f5c542;} 50%{opacity:.4; box-shadow: 0 0 2px #f5c542;} }
        .av2-badge-purple {
          background: rgba(139, 92, 246, 0.1);
          color: #c4b5fd;
          border: 1px solid rgba(139, 92, 246, 0.25);
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.05);
        }
        .av2-eyebrow {
          font-size: 14px;
          font-weight: 700;
          color: #c084fc;
          text-transform: uppercase;
          letter-spacing: .15em;
          margin-bottom: 12px;
          opacity: 0;
          animation: av2-up .6s .18s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .av2-divider {
          width: 60px; height: 2px;
          background: linear-gradient(90deg, #9333ea, transparent);
          border-radius: 2px;
          margin-bottom: 18px;
          opacity: 0;
          animation: av2-up .6s .22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .av2-title {
          font-size: clamp(44px, 7.5vw, 76px);
          font-weight: 800;
          line-height: 1.05;
          color: var(--foreground);
          letter-spacing: -.03em;
          margin-bottom: 16px;
          opacity: 0;
          animation: av2-up .6s .26s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          text-shadow: 0 10px 30px color-mix(in srgb, var(--foreground) 15%, transparent);
        }
        .av2-title em {
          font-style: normal;
          background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .av2-desc {
          font-size: clamp(16px, 2.2vw, 20px);
          line-height: 1.7;
          color: #ffffff;
          margin-bottom: 32px;
          max-width: 600px;
          padding: 20px 24px;
          background: rgba(139, 92, 246, 0.08);
          border: 1px solid rgba(139, 92, 246, 0.2);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 16px;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.2);
          opacity: 0;
          animation: av2-up .6s .32s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .av2-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 32px;
          opacity: 0;
          animation: av2-up .6s .38s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .av2-feat {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.15), 0 8px 32px rgba(0, 0, 0, 0.3);
          border-radius: 14px;
          font-size: clamp(14px, 1.8vw, 17px);
          font-weight: 500;
          color: #e2e8f0;
          transition: all .3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: default;
        }
        .av2-feat:hover {
          background: rgba(139, 92, 246, 0.15);
          border-color: rgba(139, 92, 246, 0.4);
          transform: translateY(-2px);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.25), 0 10px 40px rgba(139, 92, 246, 0.25);
        }
        .av2-feat-ico {
          width: 36px; height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.05));
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 8px;
          flex-shrink: 0;
          color: #c4b5fd;
          transition: all .3s ease;
        }
        .av2-feat:hover .av2-feat-ico {
          color: #fff;
          background: rgba(139, 92, 246, 0.4);
          transform: scale(1.05) rotate(5deg);
        }
        .av2-feat-ico svg {
          width: 18px; height: 18px;
        }
        .av2-callout {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 20px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(0, 0, 0, 0.2) 100%);
          border: 1px solid rgba(139, 92, 246, 0.15);
          border-left: 4px solid #a855f7;
          border-radius: 16px;
          backdrop-filter: blur(12px);
          margin-bottom: 32px;
          opacity: 0;
          animation: av2-up .6s .44s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .av2-callout-ico {
          width: 52px; height: 52px;
          border-radius: 12px;
          background: linear-gradient(135deg, #7c3aed, #4c1d95);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.2), 0 4px 12px rgba(124, 58, 237, 0.3);
        }
        .av2-callout-ico svg { width: 26px; height: 26px; color: white; }
        .av2-callout-title {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 4px;
          letter-spacing: 0.01em;
        }
        .av2-callout-sub {
          font-size: 15px;
          color: #a78bfa;
          line-height: 1.5;
        }
        .av2-actions {
          display: flex;
          gap: 16px;
          opacity: 0;
          animation: av2-up .6s .5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .av2-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: clamp(16px, 2vw, 20px) clamp(20px, 2.5vw, 32px);
          border-radius: 14px;
          font-size: clamp(14px, 1.8vw, 16px);
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: all .3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          text-decoration: none;
        }
        .av2-btn svg { width: 20px; height: 20px; flex-shrink: 0; transition: transform .3s; }
        .av2-btn:hover svg { transform: translateX(3px); }
        .av2-btn-primary {
          background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%);
          color: white;
          border: none;
          box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);
        }
        .av2-btn-primary:hover {
          transform: translateY(-3px);
          background: linear-gradient(135deg, #b062fa 0%, #8b5cf6 100%);
          box-shadow: 0 8px 25px rgba(124, 58, 237, 0.6);
        }
        .av2-btn-primary:active { transform: translateY(0); }
        .av2-btn-outline {
          background: rgba(255, 255, 255, 0.03);
          color: #a1a1aa;
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
        }
        .av2-btn-outline:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          transform: translateY(-2px);
        }
        /* Flashy dual-CTA row: Register Now + Become a Partner */
        .av2-cta-row {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }
        /* Register Now — bold gradient with a periodic shine sweep */
        .av2-btn-flashy {
          background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%);
          color: #fff;
          box-shadow: 0 4px 18px rgba(124, 58, 237, 0.45);
        }
        .av2-btn-flashy::after {
          content: "";
          position: absolute;
          top: 0;
          left: -60%;
          width: 40%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.45), transparent);
          transform: skewX(-20deg);
          pointer-events: none;
          animation: av2-shine 3.2s ease-in-out infinite;
        }
        .av2-btn-flashy:hover {
          transform: translateY(-3px);
          background: linear-gradient(135deg, #b062fa 0%, #8b5cf6 100%);
          box-shadow: 0 10px 30px rgba(124, 58, 237, 0.65);
        }
        .av2-btn-flashy:active { transform: translateY(0); }
        @keyframes av2-shine {
          0% { left: -60%; }
          55%, 100% { left: 130%; }
        }
        /* Become a Partner — elegant glowing outline */
        .av2-btn-glow {
          background: rgba(168, 85, 247, 0.06);
          color: #e9d5ff;
          border: 1px solid rgba(168, 85, 247, 0.45);
        }
        .av2-btn-glow:hover {
          transform: translateY(-3px);
          background: rgba(168, 85, 247, 0.14);
          border-color: rgba(168, 85, 247, 0.8);
          box-shadow: 0 8px 26px rgba(168, 85, 247, 0.4);
          color: #fff;
        }
        .av2-btn-glow:active { transform: translateY(0); }
        @media (max-width: 520px) {
          .av2-cta-row { flex-direction: column; }
        }
        .av2-ribbon {
          margin-top: 24px;
          font-size: 14px;
          font-weight: 600;
          color: #8b5cf6;
          letter-spacing: .08em;
          text-align: left;
          opacity: 0;
          animation: av2-up .6s .62s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          padding-left: 4px;
        }
        .av2-ribbon span { color: #f5c542; }
        @keyframes av2-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── MODAL ── */
        .av2-overlay {
          position: fixed;
          inset: 0;
          background: rgba(3, 3, 10, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: av2-fadeIn .3s cubic-bezier(.22,1,.36,1);
        }
        @keyframes av2-fadeIn { from{opacity:0; backdrop-filter: blur(0px);} to{opacity:1; backdrop-filter: blur(12px);} }
        .av2-modal {
          background: rgba(15, 12, 30, 0.65);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(139, 92, 246, 0.25);
          border-radius: 24px;
          width: 100%;
          max-width: 580px;
          max-height: 85vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 32px 96px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.05), 0 0 40px rgba(139, 92, 246, 0.15);
          animation: av2-modalIn .4s cubic-bezier(.22,1,.36,1);
        }
        .av2-modal::-webkit-scrollbar {
          width: 6px;
        }
        .av2-modal::-webkit-scrollbar-track {
          background: transparent;
        }
        .av2-modal::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.2);
          border-radius: 10px;
        }
        .av2-modal::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.4);
        }
        @keyframes av2-modalIn {
          from { opacity:0; transform: scale(.96) translateY(16px); }
          to   { opacity:1; transform: scale(1) translateY(0); }
        }
        .av2-modal-head {
          padding: 28px 32px 24px;
          border-bottom: 1px solid rgba(139, 92, 246, 0.15);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(180deg, rgba(139, 92, 246, 0.05) 0%, transparent 100%);
        }
        .av2-modal-head h2 {
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .av2-modal-close {
          width: 36px; height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(139, 92, 246, 0.08);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 10px;
          color: #c4b5fd;
          cursor: pointer;
          transition: all .25s cubic-bezier(.22,1,.36,1);
          padding: 0;
        }
        .av2-modal-close svg { width: 18px; height: 18px; }
        .av2-modal-close:hover {
          background: rgba(139, 92, 246, 0.2);
          color: #fff;
          transform: rotate(90deg) scale(1.05);
        }
        .av2-modal-body { padding: 32px; }
        .av2-sec-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          color: #a78bfa;
          text-transform: uppercase;
          letter-spacing: .15em;
          margin-bottom: 12px;
        }
        .av2-sec-text {
          font-size: 14px;
          line-height: 1.7;
          color: #c4b5fd;
          margin-bottom: 24px;
        }
        .av2-detail-row {
          display: flex;
          gap: 14px;
          margin-bottom: 18px;
          align-items: flex-start;
          padding: 16px;
          background: rgba(139, 92, 246, 0.04);
          border: 1px solid rgba(139, 92, 246, 0.08);
          border-radius: 14px;
          transition: all .25s;
        }
        .av2-detail-ico {
          width: 38px; height: 38px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.05));
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 12px;
          color: #c4b5fd;
          transition: all .25s cubic-bezier(.22,1,.36,1);
        }
        .av2-detail-row:hover {
          background: rgba(139, 92, 246, 0.08);
          border-color: rgba(139, 92, 246, 0.15);
        }
        .av2-detail-row:hover .av2-detail-ico {
          background: rgba(139, 92, 246, 0.25);
          color: #fff;
          transform: scale(1.05) rotate(-2deg);
        }
        .av2-detail-ico svg { width: 18px; height: 18px; }
        .av2-detail-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          color: #ddd6fe;
          text-transform: uppercase;
          letter-spacing: .1em;
          margin-bottom: 4px;
        }
        .av2-detail-text { font-size: 13px; color: #a78bfa; line-height: 1.6; }

        /* form */
        .av2-fg { margin-bottom: 20px; }
        .av2-type-grid { 
          display: flex; flex-direction: column; gap: 16px; margin-top: 24px; 
        }
        .av2-type-btn {
          position: relative;
          padding: 20px 24px;
          background: linear-gradient(145deg, rgba(30, 24, 60, 0.4) 0%, rgba(15, 12, 30, 0.7) 100%);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 20px;
          color: #fff;
          cursor: pointer;
          transition: all .4s cubic-bezier(.175,.885,.32,1.275);
          display: flex;
          align-items: center;
          gap: 20px;
          text-align: left;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.05);
          overflow: hidden;
        }
        .av2-type-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent);
          transform: translateX(-100%);
          transition: transform .6s ease;
        }
        .av2-type-btn:hover {
          border-color: rgba(167, 139, 250, 0.5);
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 16px 40px rgba(139, 92, 246, 0.2), inset 0 0 30px rgba(139, 92, 246, 0.08);
          background: linear-gradient(145deg, rgba(40, 28, 80, 0.6) 0%, rgba(20, 15, 40, 0.8) 100%);
        }
        .av2-type-btn:hover::before {
          transform: translateX(100%);
        }
        .av2-type-btn-icon {
          width: 48px; height: 48px;
          background: rgba(139, 92, 246, 0.08);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all .4s ease;
          box-shadow: inset 0 0 10px rgba(139, 92, 246, 0.1);
        }
        .av2-type-btn:hover .av2-type-btn-icon {
          background: linear-gradient(135deg, #7c3aed, #5b21b6);
          border-color: #a78bfa;
          box-shadow: 0 0 20px rgba(124, 58, 237, 0.5);
          transform: scale(1.1) rotate(5deg);
        }
        .av2-type-btn:hover .av2-type-btn-icon svg {
          color: #fff !important;
        }
        .av2-type-btn-title {
          font-size: 16px;
          font-weight: 700;
          color: #f0ecff;
          margin-bottom: 4px;
          letter-spacing: 0.02em;
          transition: color .3s ease, text-shadow .3s ease;
        }
        .av2-type-btn:hover .av2-type-btn-title {
          color: #fff;
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.3);
        }
        .av2-type-btn-desc {
          font-size: 13px;
          color: #b8b0d8;
          font-weight: 400;
          line-height: 1.4;
          transition: color .3s ease;
        }
        .av2-type-btn:hover .av2-type-btn-desc {
          color: #d8cfff;
        }
        .av2-type-btn svg {
          transition: all .3s ease;
        }
        .av2-back-btn {
          background: transparent;
          border: none;
          color: #a78bfa;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 8px;
          margin-bottom: 24px;
          margin-left: -12px;
          text-transform: uppercase;
          letter-spacing: .08em;
          transition: all .2s;
        }
        .av2-back-btn:hover { 
          color: #fff;
          background: rgba(139, 92, 246, 0.1);
        }
        .av2-frow { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .av2-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          color: #c4b5fd;
          text-transform: uppercase;
          letter-spacing: .12em;
          margin-bottom: 8px;
        }
        .av2-input, .av2-select, .av2-textarea {
          width: 100%;
          padding: 14px 16px;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(139, 92, 246, 0.15);
          border-radius: 12px;
          font-size: 14px;
          color: #fff;
          transition: all .3s cubic-bezier(.22,1,.36,1);
          appearance: none;
          outline: none;
          font-family: inherit;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
        }
        .av2-input::placeholder, .av2-textarea::placeholder { color: rgba(167, 139, 250, 0.4); font-weight: 400; }
        .av2-input:hover, .av2-select:hover, .av2-textarea:hover {
          border-color: rgba(139, 92, 246, 0.3);
          background: rgba(0, 0, 0, 0.3);
        }
        .av2-input:focus, .av2-select:focus, .av2-textarea:focus {
          border-color: #a78bfa;
          background: rgba(139, 92, 246, 0.05);
          box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.15), inset 0 2px 4px rgba(0,0,0,0.1);
        }
        .av2-select option { background: #110e26; }
        .av2-textarea { resize: vertical; min-height: 100px; }
        .av2-submit {
          width: 100%;
          margin-top: 24px;
          padding: 16px;
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          color: white;
          border: none;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all .3s cubic-bezier(.22,1,.36,1);
          box-shadow: 0 10px 30px rgba(124, 58, 237, 0.4), inset 0 1px 1px rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-family: inherit;
        }
        .av2-submit svg { width: 18px; height: 18px; transition: transform .3s; }
        .av2-submit:hover { 
          transform: translateY(-2px); 
          box-shadow: 0 15px 40px rgba(124, 58, 237, 0.6), inset 0 1px 1px rgba(255,255,255,0.3); 
        }
        .av2-submit:hover svg { transform: translateX(4px); }
        .av2-submit:active { transform: translateY(0); box-shadow: 0 5px 15px rgba(124, 58, 237, 0.4); }
        .av2-success { text-align: center; padding: 36px 20px; }
        .av2-success-ico {
          width: 60px; height: 60px;
          background: rgba(34,197,94,.12);
          border: 2px solid rgba(34,197,94,.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          color: #22c55e;
          animation: av2-successPop .5s cubic-bezier(.22,1,.36,1);
        }
        @keyframes av2-successPop {
          from { transform: scale(.7); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        .av2-success-ico svg { width: 28px; height: 28px; }
        .av2-success-title { font-size: 18px; font-weight: 700; color: #f0ecff; margin-bottom: 8px; }
        .av2-success-sub { font-size: 13px; color: #b8b0d8; }

        @media (max-width: 960px) {
          .av2-body { grid-template-columns: 1fr; gap: 40px; }
          .av2-desc { margin-bottom: 0; }
        }
        @media (max-width: 768px) {
          .av2-root {
            min-height: auto;
            padding: 32px 20px;
          }
          .av2-modal {
            width: calc(100% - 32px);
          }
          .av2-modal-body {
            padding: 24px;
          }
          .av2-modal-head {
            padding: 24px;
          }
        }
        @media (max-width: 480px) {
          .av2-root {
            padding: 24px 16px;
            border-radius: 16px;
          }
          .av2-title {
            font-size: 32px;
            margin-bottom: 12px;
          }
          .av2-desc {
            font-size: 15px;
            margin-bottom: 24px;
            padding: 16px 20px;
          }
          .av2-features { grid-template-columns: repeat(2, 1fr); gap: 8px; margin-bottom: 24px; }
          .av2-feat { padding: 8px 10px; font-size: 12px; gap: 8px; }
          .av2-feat-ico { width: 28px; height: 28px; flex-shrink: 0; }
          .av2-feat-ico svg { width: 14px; height: 14px; }
          .av2-callout { flex-direction: column; text-align: left; align-items: flex-start; gap: 12px; padding: 16px; margin-bottom: 24px; }
          .av2-actions { flex-direction: column; gap: 10px; }
          .av2-btn { padding: 14px 20px; font-size: 13.5px; }
          .av2-frow { grid-template-columns: 1fr; gap: 0; }
          .av2-fg { margin-bottom: 14px; }
        }
        @media (max-width: 375px) {
          .av2-root { padding: 20px 14px; border-radius: 14px; }
          .av2-badges { gap: 8px; margin-bottom: 16px; }
          .av2-badge { padding: 4px 10px; font-size: 11px; }
          .av2-title { font-size: 28px; margin-bottom: 8px; }
          .av2-desc { font-size: 14px; margin-bottom: 20px; padding: 14px 16px; }
          .av2-features { gap: 6px; margin-bottom: 20px; }
          .av2-feat { padding: 8px 12px; font-size: 12px; }
          .av2-feat-ico { width: 28px; height: 28px; }
          .av2-feat-ico svg { width: 14px; height: 14px; }
          .av2-callout { padding: 12px; margin-bottom: 20px; gap: 10px; }
          .av2-callout-ico { width: 36px; height: 36px; }
          .av2-callout-ico svg { width: 18px; height: 18px; }
          .av2-callout-title { font-size: 14px; margin-bottom: 4px; }
          .av2-callout-desc { font-size: 12px; }
          .av2-btn { padding: 12px 16px; font-size: 12px; }
          .av2-fg label { font-size: 12px; }
          .av2-input, .av2-select, .av2-textarea { padding: 10px 12px; font-size: 13px; }
          .av2-btn svg { width: 16px; height: 16px; }
          
          .av2-overlay { padding: 12px; }
          .av2-modal {
            width: calc(100% - 24px);
            max-height: 85vh;
          }
          .av2-modal-head {
            padding: 16px 20px 16px;
          }
          .av2-modal-head h2 {
            font-size: 18px;
          }
          .av2-modal-body {
            padding: 16px;
          }
          .av2-type-btn {
            padding: 14px 16px;
            gap: 14px;
            border-radius: 16px;
          }
          .av2-type-btn-icon {
            width: 40px; height: 40px;
          }
          .av2-type-btn-title {
            font-size: 15px;
          }
          .av2-type-btn-desc {
            font-size: 12px;
          }
          .av2-detail-row {
            padding: 12px;
            gap: 12px;
          }
          .av2-input, .av2-select, .av2-textarea {
            padding: 12px 14px;
            font-size: 13px;
          }
        }
        @media (max-width: 360px) {
          .av2-root { padding: 24px 16px; }
          .av2-title { font-size: 26px; }
          .av2-type-btn {
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
            gap: 10px;
          }
          .av2-type-btn-icon {
            width: 36px; height: 36px;
          }
        }
      `}</style>

      {/* ── HERO ── */}
      {isPreview ? (
        /* ── PREVIEW MODE: clickable card, left column only ── */
        <a
          href="/events/agentverse-2"
          target="_blank"
          rel="noopener noreferrer"
          className="av2-root"
          style={{ display: "block", textDecoration: "none", color: "inherit", cursor: "pointer" }}
        >
          <div className="av2-dot-grid" />
          <div className="av2-glow1" />
          <div className="av2-body">
            <div className="av2-body-left">
              <div className="av2-badges">
                <span className="av2-badge av2-badge-gold">Register Now</span>
                <span className="av2-badge av2-badge-purple">Season Two</span>
              </div>

              <div className="av2-eyebrow">The Arena for the Next Generation of AI Builders</div>
              <div className="av2-divider" />

              <div className="av2-title">
                Agent<em>Verse</em> 2.0
              </div>

              <p className="av2-desc">
                The world is not waiting for AI to arrive. It already has. The only question is — are
                you building it, or watching it happen? AgentVerse 2.0 is a live, pressured
                environment for Agentic AI Swarms &amp; MCP Servers.
              </p>

              <div className="av2-actions">
                <button
                  className="av2-btn av2-btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open("/events/agentverse-2", "_blank");
                  }}
                >
                  View Details
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 16 16 12 12 8" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </a>
      ) : (
        /* ── FULL MODE: two-column layout with all features, CTAs, modals ── */
        <div className="av2-root">
          <div className="av2-dot-grid" />
          <div className="av2-scanline" />

          <div className="av2-glow1" />
          <div className="av2-body">
            <div className="av2-body-left">
              <div className="av2-badges">
                <span className="av2-badge av2-badge-gold">Register Now</span>
                <span className="av2-badge av2-badge-purple">Season Two</span>
              </div>

              <div className="av2-eyebrow">The Arena for the Next Generation of AI Builders</div>
              <div className="av2-divider" />

              <div className="av2-title">
                Agent<em>Verse</em> 2.0
              </div>

              <p className="av2-desc">
                The world is not waiting for AI to arrive. It already has. The only question is — are
                you building it, or watching it happen? AgentVerse 2.0 is a live, pressured
                environment for Agentic AI Swarms & MCP Servers.
              </p>
            </div>

            <div className="av2-body-right">
              <div className="av2-features">
                {[
                  { label: "Agentic AI Swarms", icon: <path d="M13 10V3L4 14h7v7l9-11h-7z" /> },
                  {
                    label: "MCP Servers",
                    icon: (
                      <>
                        <rect x="2" y="7" width="20" height="14" rx="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </>
                    ),
                  },
                  {
                    label: "Full-Day Online",
                    icon: (
                      <>
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </>
                    ),
                  },
                  {
                    label: "Real Competition",
                    icon: (
                      <>
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                      </>
                    ),
                  },
                ].map(({ label, icon }) => (
                  <div className="av2-feat" key={label}>
                    <div className="av2-feat-ico">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {icon}
                      </svg>
                    </div>
                    {label}
                  </div>
                ))}
              </div>

              <div className="av2-callout">
                <div className="av2-callout-ico">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="8" width="20" height="8" rx="2" />
                    <path d="M6 20v-4M18 20v-4M8 12h.01M16 12h.01M12 8V4H8" />
                  </svg>
                </div>
                <div>
                  <div className="av2-callout-title">A Capability Event, Not Just a Certificate</div>
                  <div className="av2-callout-sub">
                    Top 3 win exclusive prizes. One outstanding builder secures a guaranteed
                    internship.
                  </div>
                </div>
              </div>

              <div className="av2-actions">
                <button className="av2-btn av2-btn-outline" onClick={() => setShowDetails(true)}>
                  View Details
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 16 16 12 12 8" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                </button>
              </div>

              <div
                className="av2-cta-row"
                style={{
                  opacity: 0,
                  animation: "av2-up .6s .6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                }}
              >
                <button className="av2-btn av2-btn-flashy" onClick={() => setShowRegister(true)}>
                  Register Now
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
                <button className="av2-btn av2-btn-glow" onClick={() => setShowPartnership(true)}>
                  Become a Partner
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: 18 }}
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </button>
              </div>

              <div className="av2-ribbon">
                Season Two · <span>Register Now</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isPreview && showDetails && <AgentVerseDetailsModal onClose={() => setShowDetails(false)} />}

      {!isPreview && showRegister && <AgentVerseRegistrationModal onClose={() => setShowRegister(false)} />}

      {!isPreview && showPartnership && <AgentVersePartnershipModal onClose={() => setShowPartnership(false)} />}
    </>
  );
}

export default AgentVerse2;
