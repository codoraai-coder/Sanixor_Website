import { useEffect, useRef, useState } from "react";

/**
 * Analog channel-change state machine.
 *
 *   idle ──► lose ──► static ──► acquire ──► idle
 *            (picture      (snow; the      (new picture
 *             destabilises) broadcast       rolls in and
 *                           is swapped)     settles)
 *
 * The scroll position decides the *target* channel; this hook decides what
 * the tube is actually *showing*. Target changes that arrive mid-switch are
 * coalesced: the swap always picks up the latest target, and a change during
 * `acquire` drops back into static — like continuing to turn the dial.
 */
export type TunerPhase = "idle" | "lose" | "static" | "acquire";

const LOSE_MS = 150;
const STATIC_MS = 190;
const ACQUIRE_MS = 400;

export function useChannelTuner(target: number, instant: boolean) {
  const [shown, setShown] = useState(target);
  const [phase, setPhase] = useState<TunerPhase>("idle");
  // Increments on every completed swap so on-screen graphics can replay.
  const [tuneCount, setTuneCount] = useState(0);

  const targetRef = useRef(target);
  const shownRef = useRef(target);
  const phaseRef = useRef<TunerPhase>("idle");
  const timerRef = useRef<number | undefined>(undefined);

  targetRef.current = target;

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  useEffect(() => {
    const enter = (next: TunerPhase) => {
      phaseRef.current = next;
      setPhase(next);
    };

    const swap = () => {
      shownRef.current = targetRef.current;
      setShown(targetRef.current);
      setTuneCount((count) => count + 1);
    };

    const runFromStatic = () => {
      window.clearTimeout(timerRef.current);
      enter("static");
      swap();
      timerRef.current = window.setTimeout(() => {
        enter("acquire");
        timerRef.current = window.setTimeout(() => {
          // The dial may have moved again while the picture was settling.
          if (targetRef.current !== shownRef.current) {
            runFromLose();
          } else {
            enter("idle");
          }
        }, ACQUIRE_MS);
      }, STATIC_MS);
    };

    const runFromLose = () => {
      window.clearTimeout(timerRef.current);
      enter("lose");
      timerRef.current = window.setTimeout(runFromStatic, LOSE_MS);
    };

    if (instant) {
      window.clearTimeout(timerRef.current);
      if (shownRef.current !== target) swap();
      enter("idle");
      return;
    }

    const current = phaseRef.current;
    if (current === "idle") {
      if (target !== shownRef.current) runFromLose();
    } else if (current === "acquire") {
      if (target !== shownRef.current) runFromStatic();
    }
    // In `lose` / `static` the pending swap reads targetRef, nothing to do.
  }, [target, instant]);

  return { shown, phase, tuneCount };
}
