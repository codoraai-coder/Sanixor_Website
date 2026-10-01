/** Total rotation of the channel knob from the first to the last detent. */
const KNOB_SWEEP_DEG = 200;

/**
 * Half-width of the "turning" zone around each channel boundary, in channel
 * units. Inside it the knob is physically moving between detents and the
 * signal weakens; outside it the knob rests in its detent and the picture
 * is clean.
 */
const RISER = 0.16;

export function detentAngle(position: number, count: number) {
  return -KNOB_SWEEP_DEG / 2 + (position * KNOB_SWEEP_DEG) / Math.max(1, count - 1);
}

const smoothstep = (t: number) => t * t * (3 - 2 * t);

/**
 * Maps scroll progress (0–1) onto the channel timeline. Each channel owns an
 * equal slice; the channel flips exactly at a slice boundary, which is also
 * the midpoint of the knob's travel between detents.
 */
export function readDial(progress: number, count: number) {
  const x = Math.min(1, Math.max(0, progress)) * count;
  const channel = Math.min(count - 1, Math.floor(x));
  const boundary = Math.min(count - 1, Math.max(1, Math.round(x)));
  const offset = x - boundary;

  let knob = channel;
  let tune = 0;
  if (count > 1 && Math.abs(offset) < RISER) {
    knob = boundary - 1 + smoothstep((offset + RISER) / (2 * RISER));
    tune = 1 - Math.abs(offset) / RISER;
  }

  return { channel, knob, tune, needle: x / count };
}
