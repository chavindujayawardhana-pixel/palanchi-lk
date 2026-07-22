"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

interface TownFieldProps {
  district: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  inputStyle: React.CSSProperties;
}

/**
 * Search-as-you-type autocomplete over GN divisions ("towns"). Independent of
 * District — selectable and searchable whether or not a district is picked;
 * passing `district` just narrows suggestions to that district. Filtering
 * happens server-side (app/api/locations/towns) so the ~13,400-entry dataset
 * never has to be shipped to the client — only the top ~20 matches are.
 */
export function TownField({ district, value, onChange, placeholder, disabled, inputStyle }: TownFieldProps) {
  const { colors } = useTheme();
  const { surface, border, text, textMuted } = colors;
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams({ q: value });
    if (district) params.set("district", district);
    const handle = setTimeout(() => {
      fetch(`/api/locations/towns?${params.toString()}`)
        .then((r) => r.json())
        .then((json) => { if (!cancelled) setOptions(json.towns ?? []); })
        .catch(() => { if (!cancelled) setOptions([]); });
    }, 200);
    return () => { cancelled = true; clearTimeout(handle); };
  }, [district, value]);

  return (
    <div style={{ position: "relative" }}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        style={inputStyle}
      />
      {open && !disabled && options.length > 0 && (
        <div
          style={{
            position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 30,
            background: surface, border: `1px solid ${border}`, borderRadius: 10,
            maxHeight: 220, overflowY: "auto", boxShadow: "0 8px 24px rgba(0,0,0,0.14)",
          }}
        >
          {options.map((tn) => (
            <div
              key={tn}
              onMouseDown={(e) => { e.preventDefault(); onChange(tn); setOpen(false); }}
              className="row-hover"
              style={{ padding: "9px 13px", fontSize: 13.5, cursor: "pointer", color: tn === value ? text : textMuted }}
            >
              {tn}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
