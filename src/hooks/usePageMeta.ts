import { useEffect } from "react";

const DEFAULT_TITLE = "Sanixor AI — Intelligent Agent Systems";
const DEFAULT_DESCRIPTION =
  "Sanixor AI builds production-grade AI agent systems, platforms, and tools for enterprises and developers.";

/**
 * Sets `document.title` and the `<meta name="description">` tag for the
 * current page. Restores defaults on unmount so route transitions stay clean.
 */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    // ── title ──
    document.title = title;

    // ── meta description ──
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDescription = meta?.content ?? DEFAULT_DESCRIPTION;

    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;

    return () => {
      document.title = DEFAULT_TITLE;
      if (meta) meta.content = prevDescription;
    };
  }, [title, description]);
}
