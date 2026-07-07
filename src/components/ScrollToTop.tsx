import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { lenisInstance } from "../hooks/useSmoothScroll";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);

    if (lenisInstance) {
      lenisInstance.scrollTo(0, {
        immediate: true,
      });
    }
  }, [pathname]);

  return null;
}
