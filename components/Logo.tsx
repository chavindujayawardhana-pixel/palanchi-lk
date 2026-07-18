"use client";

import Link from "next/link";
import { Wrench } from "lucide-react";
import { gold } from "@/lib/theme";
import { useTheme } from "./ThemeProvider";

interface LogoProps {
  boxSize?: number;
  iconSize?: number;
  fontSize?: number;
  href?: string;
}

/** Palanchi.lk wordmark with the wrench-in-gold-box icon. */
export function Logo({ boxSize = 30, iconSize = 16, fontSize = 20, href = "/" }: LogoProps) {
  const { colors } = useTheme();
  return (
    <Link
      href={href}
      className="disp"
      style={{
        display: "flex",
        alignItems: "center",
        gap: `var(--nav-logo-gap, ${8}px)`,
        fontWeight: 700,
        fontSize: `var(--nav-logo-font, ${fontSize}px)`,
        color: colors.text,
        textDecoration: "none",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      <div
        className="nav-logo-icon"
        style={{
          width: `var(--nav-logo-box, ${boxSize}px)`,
          height: `var(--nav-logo-box, ${boxSize}px)`,
          borderRadius: boxSize >= 34 ? 10 : 9,
          background: gold,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Wrench size={iconSize} color="#1F2937" />
      </div>
      Palanchi<span style={{ color: gold }}>.lk</span>
    </Link>
  );
}
