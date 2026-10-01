import { useEffect, useState } from "react";

let cachedNoise: string | null = null;

/** Builds one tile of monochrome TV snow, once per page load. */
function createNoiseTile() {
  if (cachedNoise) return cachedNoise;
  const size = 160;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) return null;
  const image = context.createImageData(size, size);
  for (let i = 0; i < image.data.length; i += 4) {
    // Bias towards dark with bright specks, like real snow.
    const value = Math.pow(Math.random(), 1.6) * 255;
    image.data[i] = value;
    image.data[i + 1] = value;
    image.data[i + 2] = value;
    image.data[i + 3] = 255;
  }
  context.putImageData(image, 0, 0);
  cachedNoise = canvas.toDataURL("image/png");
  return cachedNoise;
}

/**
 * Signal layers sitting between the broadcast and the glass. Their
 * intensity is driven entirely by CSS from the screen's `data-phase`
 * attribute and the scroll-driven `--tune` variable, so a channel change
 * costs no React work beyond the phase flip.
 */
export function ChannelTransition() {
  const [noise, setNoise] = useState<string | null>(null);

  useEffect(() => {
    setNoise(createNoiseTile());
  }, []);

  return (
    <div
      className="tv-signal-fx"
      data-tune=""
      aria-hidden="true"
      style={noise ? { ["--tv-noise" as string]: `url(${noise})` } : undefined}
    >
      <div className="tv-snow" />
      <div className="tv-rollbar" />
      <div className="tv-flash" />
    </div>
  );
}
