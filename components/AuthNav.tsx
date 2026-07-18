"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useAuth } from "./AuthProvider";

const dict = {
  en: { login: "Log in", register: "Register", myAds: "My ads", logout: "Log out" },
  si: { login: "පිවිසෙන්න", register: "ලියාපදිංචි වන්න", myAds: "මගේ දැන්වීම්", logout: "ඉවත් වන්න" },
  ta: { login: "உள்நுழை", register: "பதிவு செய்க", myAds: "என் விளம்பரங்கள்", logout: "வெளியேறு" },
};

interface AuthNavProps {
  /** Renders full-width, stacked controls for the mobile hamburger menu instead of the desktop-only inline row. */
  mobile?: boolean;
  /** Called after any navigation/logout action — used to close the mobile menu. */
  onNavigate?: () => void;
}

/** Auth-aware navbar content: login/register when signed out, name + My Ads + Log out when signed in. */
export function AuthNav({ mobile = false, onNavigate }: AuthNavProps) {
  const { lang, colors } = useTheme();
  const { user, profile, loading, signOut } = useAuth();
  const t = dict[lang];
  const { text, border, gold } = colors;

  if (loading) return null;

  if (!user) {
    return (
      <>
        <Link
          href="/login"
          onClick={onNavigate}
          className={mobile ? "btn" : "btn desktop-nav"}
          style={{
            background: "transparent", color: text, border: `1px solid ${border}`, borderRadius: 10,
            padding: "9px 16px", fontSize: mobile ? 15 : 14, fontWeight: 500, textDecoration: "none",
            ...(mobile ? { display: "block", width: "100%", textAlign: "center" } : {}),
          }}
        >
          {t.login}
        </Link>
        <Link
          href="/login?mode=register"
          onClick={onNavigate}
          className={mobile ? "btn" : "btn desktop-nav"}
          style={{
            background: gold, color: "#1F2937", borderRadius: 10, padding: "9px 16px",
            fontSize: mobile ? 15 : 14, fontWeight: 600, textDecoration: "none",
            ...(mobile ? { display: "block", width: "100%", textAlign: "center" } : {}),
          }}
        >
          {t.register}
        </Link>
      </>
    );
  }

  const displayName = profile?.first_name || user.email || "";

  if (mobile) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <span style={{ fontSize: 15, color: text, fontWeight: 600 }}>{displayName}</span>
        <Link href="/my-ads" onClick={onNavigate} style={{ color: text, fontSize: 15, fontWeight: 500, textDecoration: "none" }}>
          {t.myAds}
        </Link>
        <button
          type="button"
          onClick={() => { signOut(); onNavigate?.(); }}
          className="btn"
          style={{ background: "transparent", border: `1px solid ${border}`, color: text, borderRadius: 10, padding: "9px 16px", fontSize: 15, fontWeight: 500, width: "100%", textAlign: "center" }}
        >
          {t.logout}
        </button>
      </div>
    );
  }

  return (
    <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <Link href="/my-ads" style={{ color: text, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
        {t.myAds}
      </Link>
      <span style={{ fontSize: 14, color: text, fontWeight: 600, whiteSpace: "nowrap" }}>{displayName}</span>
      <button
        type="button"
        onClick={() => signOut()}
        className="btn"
        style={{ background: "transparent", border: `1px solid ${border}`, color: text, borderRadius: 10, padding: "8px 14px", fontSize: 13.5, fontWeight: 500 }}
      >
        {t.logout}
      </button>
    </div>
  );
}
