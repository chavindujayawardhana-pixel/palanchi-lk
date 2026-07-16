"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getColors, type Colors } from "@/lib/theme";
import type { Lang } from "@/lib/i18n";

interface ThemeContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  dark: boolean;
  setDark: (dark: boolean) => void;
  toggleDark: () => void;
  colors: Colors;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const LANG_KEY = "palanchi-lang";
const DARK_KEY = "palanchi-dark";

/**
 * Holds the language + dark-mode state that every prototype managed locally,
 * lifted here so the selection persists across page navigation and reloads.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [dark, setDarkState] = useState(false);

  // Hydrate from localStorage after mount (avoids SSR/client mismatch).
  useEffect(() => {
    const storedLang = localStorage.getItem(LANG_KEY) as Lang | null;
    const storedDark = localStorage.getItem(DARK_KEY);
    if (storedLang === "en" || storedLang === "si" || storedLang === "ta") {
      setLangState(storedLang);
    }
    if (storedDark != null) setDarkState(storedDark === "true");
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    localStorage.setItem(LANG_KEY, next);
  };

  const setDark = (next: boolean) => {
    setDarkState(next);
    localStorage.setItem(DARK_KEY, String(next));
  };

  const toggleDark = () => setDark(!dark);

  const colors = getColors(dark);

  // Expose a few tokens as CSS variables for pseudo-element styling
  // (placeholders, row hovers) that inline styles can't reach.
  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty("--pg-muted", colors.textMuted);
    root.setProperty("--pg-border", colors.border);
    root.setProperty("--pg-row-hover", dark ? "#1E282D" : "#FBFAF6");
    document.body.style.background = colors.bg;
    document.body.style.color = colors.text;
  }, [colors, dark]);

  return (
    <ThemeContext.Provider value={{ lang, setLang, dark, setDark, toggleDark, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
