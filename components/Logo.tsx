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
        gap: 8,
        fontWeight: 700,
        fontSize,
        color: colors.text,
        textDecoration: "none",
      }}
    >
      <div
        style={{
          width: boxSize,
          height: boxSize,
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
