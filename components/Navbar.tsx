"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useAuth } from "./AuthProvider";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { DarkModeToggle } from "./DarkModeToggle";
import { AuthNav, AUTH_NAV_DICT } from "./AuthNav";

export interface NavLink {
  label: string;
  href?: string;
  onClick?: () => void;
}

const CORE_NAV_DICT = {
  en: { home: "Home", createAd: "Create ad", contact: "Contact", toggleMenu: "Toggle menu", closeMenu: "Close menu" },
  si: { home: "මුල් පිටුව", createAd: "දැන්වීමක් පළ කරන්න", contact: "අමතන්න", toggleMenu: "මෙනුව විවෘත/වසන්න", closeMenu: "මෙනුව වසන්න" },
  ta: { home: "முகப்பு", createAd: "விளம்பரம் இடு", contact: "தொடர்பு", toggleMenu: "மெனுவைத் திற/மூடு", closeMenu: "மெனுவை மூடு" },
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
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  // Lock body scroll while the drawer is open so the dimmed page behind it can't scroll.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  // The mobile menu always offers Home/Create ad/Contact, even on pages that don't
  // render a desktop `links` row — falls back to these plain-href defaults so the
  // desktop nav (gated on `links` below) is never affected. My ads is always
  // appended on top of either source whenever the user is signed in.
  const t = CORE_NAV_DICT[lang];
  const authT = AUTH_NAV_DICT[lang];
  const baseLinks: NavLink[] = links ?? [
    { label: t.home, href: "/" },
    { label: t.createAd, href: "/create-ad" },
    { label: t.contact, href: "/contact" },
  ];
  const mobileLinks: NavLink[] = [
    ...baseLinks,
    ...(user ? [{ label: authT.myAds, href: "/my-ads" }] : []),
  ];

  return (
    <>
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
          padding: "14px var(--nav-pad-x, 24px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--nav-gap, 16px)",
          flexWrap: "nowrap",
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

        <div style={{ display: "flex", alignItems: "center", gap: "var(--nav-right-gap, 10px)", flexShrink: 0 }}>
          <LanguageSwitcher compact={langCompact} />
          <DarkModeToggle size={darkSize} iconSize={darkIcon} />
          {right}
          <button
            className="btn mobile-nav nav-icon-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={t.toggleMenu}
            style={{
              width: `var(--nav-control-size, ${darkSize}px)`,
              height: `var(--nav-control-size, ${darkSize}px)`,
              padding: 0,
              background: "transparent",
              border: "none",
              color: colors.text,
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>

    {/* Dimming overlay behind the drawer. Rendered as a header sibling (not a child) because
        the header's backdrop-filter would otherwise become the containing block for these
        fixed-position elements, trapping them inside the header's own box. Always mounted
        (rather than conditionally rendered) so the opacity transition can play both ways. */}
    <div
      className="mobile-nav"
      onClick={closeMenu}
      aria-hidden={!menuOpen}
      style={{
        display: "none",
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(2px)",
        zIndex: 998,
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "auto" : "none",
        transition: "opacity 0.3s ease",
      }}
    />

    <div
      className="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-hidden={!menuOpen}
      style={{
        display: "none",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: "76%",
        maxWidth: 320,
        background: dark ? "#10161A" : "#FFFFFF",
        borderLeft: `1px solid ${colors.border}`,
        boxShadow: "-12px 0 32px rgba(0,0,0,0.25)",
        zIndex: 999,
        padding: "18px 22px 28px",
        overflowY: "auto",
        transform: menuOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s ease",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 18 }}>
        <button
          type="button"
          onClick={closeMenu}
          aria-label={t.closeMenu}
          className="btn"
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "transparent",
            border: `1px solid ${colors.border}`,
            color: colors.text,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <X size={20} />
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
              style={{ color: colors.text, textDecoration: "none", fontSize: 15.5, fontWeight: 500 }}
            >
              {l.label}
            </a>
          ) : (
            <Link
              key={i}
              href={l.href ?? "#"}
              onClick={closeMenu}
              style={{ color: colors.text, textDecoration: "none", fontSize: 15.5, fontWeight: 500 }}
            >
              {l.label}
            </Link>
          )
        )}

        <div style={{ height: 1, background: colors.border }} />

        <AuthNav mobile onNavigate={closeMenu} />
      </div>
    </div>
    </>
  );
}
