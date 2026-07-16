"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface DarkModeToggleProps {
  size?: number;
  iconSize?: number;
}

/** Sun/Moon button that toggles the shared dark-mode state. */
export function DarkModeToggle({ size = 36, iconSize = 16 }: DarkModeToggleProps) {
  const { dark, toggleDark, colors } = useTheme();
  return (
    <button
      className="btn"
      onClick={toggleDark}
      aria-label="Toggle dark mode"
      style={{
        width: size,
        height: size,
        borderRadius: 10,
        background: "transparent",
        border: `1px solid ${colors.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: colors.text,
      }}
    >
      {dark ? <Sun size={iconSize} /> : <Moon size={iconSize} />}
    </button>
  );
}
