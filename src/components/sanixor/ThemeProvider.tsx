import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useConsent } from "@/hooks/useConsent";

export type Theme = "midnight";

// eslint-disable-next-line react-refresh/only-export-components
export const THEMES: { id: Theme; label: string; swatch: string; mode: "dark" | "light" }[] = [
  {
    id: "midnight",
    label: "Midnight",
    swatch: "linear-gradient(135deg,#1f2150,#5a2a8a,#8a4dc8)",
    mode: "dark",
  },
];

const ALL_THEME_CLASSES = THEMES.map((t) => `theme-${t.id}`);

type Ctx = {
  theme: Theme;
  mode: "dark";
  setTheme: (t: Theme) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeCtx = createContext<Ctx>({
  theme: "midnight",
  mode: "dark",
  setTheme: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeCtx);

function applyTheme(t: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  ALL_THEME_CLASSES.forEach((c) => root.classList.remove(c));
  root.classList.add(`theme-${t}`);
  const meta = THEMES.find((x) => x.id === t);
  root.classList.toggle("dark", meta?.mode === "dark");
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("midnight");
  const { allows } = useConsent();
  const mayPersist = allows("functional");

  useEffect(() => {
    // Only read the stored preference if functional storage was consented
    // to. Without consent the theme simply starts at the default each
    // visit — the site works, it just does not remember.
    if (!mayPersist) {
      applyTheme("midnight");
      return;
    }
    try {
      const saved = localStorage.getItem("sanixor-theme") as Theme;
      const initial: Theme = THEMES.find((t) => t.id === saved) ? saved : "midnight";
      setThemeState(initial);
      applyTheme(initial);
    } catch {
      applyTheme("midnight");
    }
  }, [mayPersist]);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    applyTheme(t);

    // Applying the theme for this session is always fine; persisting it
    // across visits is what needs consent.
    if (!mayPersist) return;

    try {
      localStorage.setItem("sanixor-theme", t);
    } catch {
      // Ignore storage errors (e.g. sandboxed iframe or private browsing)
    }
  };

  return (
    <ThemeCtx.Provider value={{ theme, mode: "dark", setTheme }}>{children}</ThemeCtx.Provider>
  );
}
