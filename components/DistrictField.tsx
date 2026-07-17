"use client";

import { useMemo, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { DISTRICTS } from "@/lib/data";

interface DistrictFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  inputStyle: React.CSSProperties;
}

/** Searchable autocomplete over the fixed 25-district list (all client-side, no API call needed). */
export function DistrictField({ value, onChange, placeholder, inputStyle }: DistrictFieldProps) {
  const { colors } = useTheme();
  const { surface, border, text, textMuted } = colors;
  const [open, setOpen] = useState(false);

  const options = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return DISTRICTS;
    return DISTRICTS.filter((d) => d.toLowerCase().includes(q));
  }, [value]);

  return (
    <div style={{ position: "relative" }}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        placeholder={placeholder}
        autoComplete="off"
        style={inputStyle}
      />
      {open && options.length > 0 && (
        <div
          style={{
            position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 30,
            background: surface, border: `1px solid ${border}`, borderRadius: 10,
            maxHeight: 220, overflowY: "auto", boxShadow: "0 8px 24px rgba(0,0,0,0.14)",
          }}
        >
          {options.map((d) => (
            <div
              key={d}
              onMouseDown={(e) => { e.preventDefault(); onChange(d); setOpen(false); }}
              className="row-hover"
              style={{ padding: "9px 13px", fontSize: 13.5, cursor: "pointer", color: d === value ? text : textMuted }}
            >
              {d}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
