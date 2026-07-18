"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { DarkModeToggle } from "./DarkModeToggle";
import { AuthNav } from "./AuthNav";

export interface NavLink {
  label: string;
  href?: string;
  onClick?: () => void;
}

const CORE_NAV_DICT = {
  en: { home: "Home", createAd: "Create ad", contact: "Contact" },
  si: { home: "මුල් පිටුව", createAd: "දැන්වීමක් පළ කරන්න", contact: "අමතන්න" },
  ta: { home: "முகப்பு", createAd: "விளம்பரம் இடு", contact: "தொடர்பு" },
};

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
 *
 * The hamburger menu (mobile only, <860px) always renders regardless of the
 * `links`/`right` props, so Home/Create ad/Contact + the signed-in/out auth
 * controls stay reachable on every page even when the desktop nav row or the
 * `right` slot are hidden on small screens.
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
  const { lang, dark, colors } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  // The mobile menu always offers Home/Create ad/Contact, even on pages that don't
  // render a desktop `links` row — falls back to these plain-href defaults so the
  // desktop nav (gated on `links` below) is never affected.
  const t = CORE_NAV_DICT[lang];
  const mobileLinks: NavLink[] = links ?? [
    { label: t.home, href: "/" },
    { label: t.createAd, href: "/create-ad" },
    { label: t.contact, href: "/contact" },
  ];

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
          flexWrap: "wrap",
          rowGap: 8,
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
          <button
            className="btn mobile-nav"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            style={{ background: "transparent", border: "none", color: colors.text, display: "none" }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="mobile-nav"
          style={{
            display: "none",
            flexDirection: "column",
            gap: 14,
            padding: "8px 24px 20px",
            borderTop: `1px solid ${colors.border}`,
          }}
        >
          {mobileLinks.map((l, i) =>
            l.onClick ? (
              <a
                key={i}
                href={l.href ?? "#"}
                onClick={(e) => {
                  e.preventDefault();
                  l.onClick?.();
                  closeMenu();
                }}
                style={{ color: colors.text, textDecoration: "none", fontSize: 15 }}
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={i}
                href={l.href ?? "#"}
                onClick={closeMenu}
                style={{ color: colors.text, textDecoration: "none", fontSize: 15 }}
              >
                {l.label}
              </Link>
            )
          )}

          <div style={{ height: 1, background: colors.border }} />

          <AuthNav mobile onNavigate={closeMenu} />
        </div>
      )}
    </header>
  );
}
