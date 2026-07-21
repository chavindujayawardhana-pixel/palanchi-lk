"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface DarkModeToggleProps {
  size?: number;
  iconSize?: number;
}

const LABEL = {
  en: "Toggle dark mode",
  si: "අඳුරු ප්‍රකාරය මාරු කරන්න",
  ta: "இருண்ட பயன்முறையை மாற்று",
};

/** Sun/Moon button that toggles the shared dark-mode state. */
export function DarkModeToggle({ size = 36, iconSize = 16 }: DarkModeToggleProps) {
  const { dark, toggleDark, colors, lang } = useTheme();
  return (
    <button
      className="btn nav-icon-btn"
      onClick={toggleDark}
      aria-label={LABEL[lang]}
      style={{
        width: `var(--nav-control-size, ${size}px)`,
        height: `var(--nav-control-size, ${size}px)`,
        borderRadius: 10,
        background: "transparent",
        border: `1px solid ${colors.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: colors.text,
        flexShrink: 0,
      }}
    >
      {dark ? <Sun size={iconSize} /> : <Moon size={iconSize} />}
    </button>
  );
}
