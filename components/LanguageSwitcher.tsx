"use client";

import { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { LANGS, type Lang } from "@/lib/i18n";
import { useTheme } from "./ThemeProvider";

interface LanguageSwitcherProps {
  /** Slightly smaller sizing used by most pages; the homepage uses the larger. */
  compact?: boolean;
}

/** Globe dropdown that switches between English / Sinhala / Tamil. */
export function LanguageSwitcher({ compact = true }: LanguageSwitcherProps) {
  const { lang, setLang, dark, colors } = useTheme();
  const [open, setOpen] = useState(false);

  const globeSize = compact ? 15 : 16;
  const chevSize = compact ? 13 : 14;
  const fontSize = compact ? 13.5 : 14;

  return (
    <div style={{ position: "relative" }}>
      <button
        className="btn"
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "transparent",
          border: `1px solid ${colors.border}`,
          borderRadius: 10,
          padding: "8px 12px",
          color: colors.text,
          fontSize,
        }}
      >
        <Globe size={globeSize} /> {LANGS[lang]} <ChevronDown size={chevSize} />
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: 42,
            right: 0,
            background: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: 10,
            overflow: "hidden",
            minWidth: compact ? 130 : 140,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            zIndex: 60,
          }}
        >
          {(Object.entries(LANGS) as [Lang, string][]).map(([code, label]) => (
            <div
              key={code}
              onClick={() => {
                setLang(code);
                setOpen(false);
              }}
              style={{
                padding: "10px 14px",
                cursor: "pointer",
                background: lang === code ? (dark ? "#233038" : "#FFF7E0") : "transparent",
                fontSize,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
