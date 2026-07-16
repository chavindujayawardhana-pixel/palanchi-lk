"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { DarkModeToggle } from "./DarkModeToggle";

export interface NavLink {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface NavbarProps {
  maxWidth?: number;
  /** Sticky translucent header (default) vs. a plain bordered header (auth). */
  sticky?: boolean;
  translucent?: boolean;
  logoProps?: { boxSize?: number; iconSize?: number; fontSize?: number };
  /** Desktop nav links (also mirrored into the mobile menu). */
  links?: NavLink[];
  /** Optional center slot, e.g. a search input. */
  center?: React.ReactNode;
  /** Optional right slot rendered after the language + dark controls. */
  right?: React.ReactNode;
  langCompact?: boolean;
  darkSize?: number;
  darkIcon?: number;
}

/**
 * Shared site header used by every page except the admin panel (which has its
 * own sidebar chrome). Composes the Logo, LanguageSwitcher and DarkModeToggle.
 */
export function Navbar({
  maxWidth = 1240,
  sticky = true,
  translucent = true,
  logoProps,
  links,
  center,
  right,
  langCompact = true,
  darkSize = 36,
  darkIcon = 16,
}: NavbarProps) {
  const { dark, colors } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        ...(sticky ? { position: "sticky", top: 0, zIndex: 50 } : {}),
        background: translucent
          ? dark
            ? "rgba(16,22,26,0.85)"
            : "rgba(255,255,255,0.85)"
          : "transparent",
        backdropFilter: translucent ? "blur(10px)" : "none",
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <div
        style={{
          maxWidth,
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: center ? "wrap" : "nowrap",
        }}
      >
        <Logo {...logoProps} />

        {links && (
          <nav className="desktop-nav" style={{ display: "flex", gap: 28, fontSize: 15, fontWeight: 500 }}>
            {links.map((l, i) =>
              l.onClick ? (
                <a
                  key={i}
                  href={l.href ?? "#"}
                  onClick={(e) => {
                    e.preventDefault();
                    l.onClick?.();
                  }}
                  style={{ color: colors.text, textDecoration: "none" }}
                >
                  {l.label}
                </a>
              ) : (
                <Link key={i} href={l.href ?? "#"} style={{ color: colors.text, textDecoration: "none" }}>
                  {l.label}
                </Link>
              )
            )}
          </nav>
        )}

        {center}

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <LanguageSwitcher compact={langCompact} />
          <DarkModeToggle size={darkSize} iconSize={darkIcon} />
          {right}
          {links && (
            <button
              className="btn mobile-nav"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              style={{ background: "transparent", border: "none", color: colors.text, display: "none" }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>
      </div>

      {links && menuOpen && (
        <div
          className="mobile-nav"
          style={{
            display: "none",
            flexDirection: "column",
            gap: 12,
            padding: "8px 24px 16px",
            borderTop: `1px solid ${colors.border}`,
          }}
        >
          {links.map((l, i) =>
            l.onClick ? (
              <a
                key={i}
                href={l.href ?? "#"}
                onClick={(e) => {
                  e.preventDefault();
                  l.onClick?.();
                  setMenuOpen(false);
                }}
                style={{ color: colors.text, textDecoration: "none", fontSize: 15 }}
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={i}
                href={l.href ?? "#"}
                onClick={() => setMenuOpen(false)}
                style={{ color: colors.text, textDecoration: "none", fontSize: 15 }}
              >
                {l.label}
              </Link>
            )
          )}
        </div>
      )}
    </header>
  );
}
