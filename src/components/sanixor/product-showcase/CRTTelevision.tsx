import type { ReactNode, Ref } from "react";
import { detentAngle } from "./tuning";

/**
 * The physical set. It never moves — only its channel knob and tuning
 * needle respond to the viewer, and the picture changes inside the tube.
 */
export function CRTTelevision({
  screen,
  readout,
  presets,
  channelCount,
  knobRef,
  powered,
}: {
  screen: ReactNode;
  readout: ReactNode;
  presets: ReactNode;
  channelCount: number;
  knobRef: Ref<HTMLDivElement>;
  powered: boolean;
}) {
  return (
    <div className="crt" data-power={powered ? "on" : "off"}>
      <svg className="crt-antenna" viewBox="0 0 240 60" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="crt-rod" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#6d6a78" />
            <stop offset="0.5" stopColor="#d9d6e4" />
            <stop offset="1" stopColor="#4a4755" />
          </linearGradient>
        </defs>
        <line x1="120" y1="52" x2="10" y2="5" stroke="url(#crt-rod)" strokeWidth="2.2" />
        <line x1="120" y1="52" x2="230" y2="12" stroke="url(#crt-rod)" strokeWidth="2.2" />
        <circle cx="10" cy="5" r="3" fill="#9b98a8" />
        <circle cx="230" cy="12" r="3" fill="#9b98a8" />
        <path d="M100 60 Q100 44 120 44 Q140 44 140 60 Z" fill="#17161c" />
        <path d="M104 56 Q107 47 120 46" stroke="#ffffff" strokeOpacity="0.14" fill="none" />
      </svg>

      <div className="crt-top" aria-hidden="true" />

      <div className="crt-cabinet">
        <div className="crt-grain" aria-hidden="true" />

        <div className="crt-front">
          <div className="crt-bezel">
            <div className="crt-bezel-spill" aria-hidden="true" />
            {screen}
          </div>
          <div className="crt-nameplate" aria-hidden="true">
            <span>Sanixor</span>
            <small>Signal · 5 Channel Colour</small>
          </div>
        </div>

        <div className="crt-panel">
          <div className="crt-screws" aria-hidden="true">
            <i />
            <i />
          </div>

          {readout}

          <div className="crt-controls" aria-hidden="true">
            <div className="crt-dial">
              <div className="crt-dial-ring">
                {Array.from({ length: channelCount }, (_, index) => (
                  <span
                    key={index}
                    style={{ ["--a" as string]: `${detentAngle(index, channelCount)}deg` }}
                  >
                    <b>{index + 1}</b>
                  </span>
                ))}
              </div>
              <div className="crt-knob-well crt-knob-large">
                <div className="crt-knob" ref={knobRef}>
                  <div className="crt-knob-cap">
                    <i />
                  </div>
                </div>
              </div>
              <small>Channel</small>
            </div>

            <div className="crt-dial crt-dial-small">
              <div className="crt-knob-well crt-knob-small">
                <div className="crt-knob">
                  <div className="crt-knob-cap">
                    <i />
                  </div>
                </div>
              </div>
              <small>Fine</small>
            </div>
          </div>

          {presets}

          <div className="crt-grille" aria-hidden="true" />

          <div className="crt-power" aria-hidden="true">
            <span className="crt-led" />
            <span className="crt-power-switch" />
            <small>Power</small>
          </div>
        </div>
      </div>

      <div className="crt-feet" aria-hidden="true">
        <i />
        <i />
      </div>
    </div>
  );
}
