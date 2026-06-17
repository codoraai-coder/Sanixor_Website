import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme =
  | "midnight" // dark navy/purple (default)
  | "nebula" // dark blue/cyan
  | "obsidian"; // near-black + purple

export const THEMES: { id: Theme; label: string; swatch: string; mode: "dark" | "light" }[] = [
  {
    id: "midnight",
    label: "Midnight",
    swatch: "linear-gradient(135deg,#1f2150,#5a2a8a,#8a4dc8)",
    mode: "dark",
  },
  {
    id: "nebula",
    label: "Nebula",
    swatch: "linear-gradient(135deg,#0b1e3f,#1e6fb8,#22c1c3)",
    mode: "dark",
  },
  {
    id: "obsidian",
    label: "Obsidian",
    swatch: "linear-gradient(135deg,#0a0a0f,#3a1d5c,#7e3ff2)",
    mode: "dark",
  },
];

const ALL_THEME_CLASSES = THEMES.map((t) => `theme-${t.id}`);

type Ctx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void; // quick light/dark swap
};

const ThemeCtx = createContext<Ctx>({
  theme: "midnight",
  setTheme: () => {},
  toggle: () => {},
});

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

  useEffect(() => {
    const saved = (typeof window !== "undefined" &&
      localStorage.getItem("sanixor-theme")) as Theme | null;
    const initial: Theme = saved && THEMES.some((t) => t.id === saved) ? saved : "midnight";
    setThemeState(initial);
    applyTheme(initial);
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    applyTheme(t);
    try {
      localStorage.setItem("sanixor-theme", t);
    } catch {}
  };

  const toggle = () => {
    const currentIndex = THEMES.findIndex((t) => t.id === theme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    setTheme(THEMES[nextIndex].id);
  };

  return <ThemeCtx.Provider value={{ theme, setTheme, toggle }}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);
