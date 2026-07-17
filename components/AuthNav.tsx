"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useAuth } from "./AuthProvider";

const dict = {
  en: { login: "Log in", register: "Register", myAds: "My ads", logout: "Log out" },
  si: { login: "පිවිසෙන්න", register: "ලියාපදිංචි වන්න", myAds: "මගේ දැන්වීම්", logout: "ඉවත් වන්න" },
  ta: { login: "உள்நுழை", register: "பதிவு செய்க", myAds: "என் விளம்பரங்கள்", logout: "வெளியேறு" },
};

/** Auth-aware right-side navbar content: login/register when signed out, name + My Ads + Log out when signed in. */
export function AuthNav() {
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
          className="btn desktop-nav"
          style={{ background: "transparent", color: text, border: `1px solid ${border}`, borderRadius: 10, padding: "9px 16px", fontSize: 14, fontWeight: 500, textDecoration: "none" }}
        >
          {t.login}
        </Link>
        <Link
          href="/login?mode=register"
          className="btn desktop-nav"
          style={{ background: gold, color: "#1F2937", borderRadius: 10, padding: "9px 16px", fontSize: 14, fontWeight: 600, textDecoration: "none" }}
        >
          {t.register}
        </Link>
      </>
    );
  }

  const displayName = profile?.first_name || user.email || "";

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
