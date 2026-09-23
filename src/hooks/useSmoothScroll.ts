import { useEffect } from "react";
import Lenis from "lenis";

export let lenisInstance: Lenis | null = null;

export function useSmoothScroll() {
  useEffect(() => {
    // Respect the visitor's OS-level reduce-motion preference: smooth-scroll
    // hijacking is exactly the kind of motion that setting asks us to drop,
    // so we never initialise Lenis at all and leave native scrolling intact.
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });

    lenisInstance = lenis;
    let frameId: number;

    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}
