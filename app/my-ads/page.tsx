"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { MapPin, Trash2, Plus, Pencil } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useTheme } from "@/components/ThemeProvider";
import { useAuth } from "@/components/AuthProvider";
import { AuthNav } from "@/components/AuthNav";
import { fetchMyAds, type LiveAd, type AdStatus } from "@/lib/ads";
import { supabase } from "@/lib/supabase";
import { fmt } from "@/lib/format";
import type { Lang } from "@/lib/i18n";

const dict = {
  en: {
    pageTitle: "My ads", pageSub: "Ads you've submitted, and their current review status.",
    noAds: "You haven't posted any ads yet.", postOne: "Post an ad",
    pending: "Pending", approved: "Approved", rejected: "Rejected", suspended: "Suspended",
    deleteA: "Delete", editA: "Edit", confirmDelete: "Delete this listing? This cannot be undone.", cancel: "Cancel", confirm: "Confirm",
    posted: "Posted", updatedBanner: "Your ad was updated successfully.",
  },
  si: {
    pageTitle: "මගේ දැන්වීම්", pageSub: "ඔබ ඉදිරිපත් කළ දැන්වීම් සහ ඒවායේ වත්මන් සමාලෝචන තත්ත්වය.",
    noAds: "ඔබ තවම දැන්වීමක් පළ කර නැත.", postOne: "දැන්වීමක් පළ කරන්න",
    pending: "අපේක්ෂිත", approved: "අනුමතයි", rejected: "ප්‍රතික්ෂේපිතයි", suspended: "අත්හිටුවා ඇත",
    deleteA: "මකන්න", editA: "සංස්කරණය කරන්න", confirmDelete: "මෙම දැන්වීම මකන්නද? මෙය අහෝසි කළ නොහැක.", cancel: "අවලංගු කරන්න", confirm: "තහවුරු කරන්න",
    posted: "පළ කළේ", updatedBanner: "ඔබේ දැන්වීම සාර්ථකව යාවත්කාලීන කරන ලදී.",
  },
  ta: {
    pageTitle: "என் விளம்பரங்கள்", pageSub: "நீங்கள் சமர்ப்பித்த விளம்பரங்கள் மற்றும் அவற்றின் தற்போதைய நிலை.",
    noAds: "நீங்கள் இதுவரை எந்த விளம்பரமும் இடவில்லை.", postOne: "விளம்பரம் இடு",
    pending: "நிலுவையில்", approved: "அங்கீகரிக்கப்பட்டது", rejected: "நிராகரிக்கப்பட்டது", suspended: "இடைநிறுத்தப்பட்டது",
    deleteA: "நீக்கு", editA: "திருத்து", confirmDelete: "இந்த பட்டியலை நீக்கவா? இதை மீட்டெடுக்க முடியாது.", cancel: "ரத்து செய்", confirm: "உறுதிப்படுத்து",
    posted: "வெளியிடப்பட்டது", updatedBanner: "உங்கள் விளம்பரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது.",
  },
};

export default function MyAdsPage() {
  return (
    <Suspense fallback={null}>
      <MyAdsPageInner />
    </Suspense>
  );
}

function MyAdsPageInner() {
  const { lang, dark, colors } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const [ads, setAds] = useState<LiveAd[]>([]);
  const [loadingAds, setLoadingAds] = useState(true);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const showUpdatedBanner = searchParams.get("updated") === "1";

  const t = dict[lang as Lang];
  const { bg, surface, text, textMuted, border, gold, teal, danger, success } = colors;

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login?next=/my-ads&notice=login-required");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    fetchMyAds(user.id).then((data) => {
      if (!cancelled) {
        setAds(data);
        setLoadingAds(false);
      }
    });
    return () => { cancelled = true; };
  }, [user]);

  async function doDelete(id: string) {
    const { error } = await supabase.from("advertisements").delete().eq("id", id);
    if (!error) setAds((prev) => prev.filter((a) => a.id !== id));
    setConfirmId(null);
  }

  const statusStyle = (status: AdStatus) => {
    const map: Record<AdStatus, { bg: string; fg: string }> = {
      pending: { bg: dark ? "#2A2410" : "#FAEEDA", fg: "#854F0B" },
      approved: { bg: dark ? "#123028" : "#E1F5EE", fg: success },
      rejected: { bg: dark ? "#2E1414" : "#FCEBEB", fg: danger },
      suspended: { bg: dark ? "#22242A" : "#EDEDED", fg: textMuted },
    };
    return map[status];
  };

  if (authLoading || !user) return null;

  return (
    <div style={{ background: bg, color: text, minHeight: "100vh" }}>
      <Navbar maxWidth={1100} logoProps={{ fontSize: 20 }} right={<AuthNav />} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 60px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
          <div>
            <h1 className="disp" style={{ fontSize: 26, fontWeight: 700, margin: "0 0 6px" }}>{t.pageTitle}</h1>
            <p style={{ fontSize: 14.5, color: textMuted, margin: 0 }}>{t.pageSub}</p>
          </div>
          <Link href="/create-ad" className="btn" style={{ display: "flex", alignItems: "center", gap: 6, background: gold, color: "#1F2937", borderRadius: 10, padding: "10px 18px", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
            <Plus size={16} /> {t.postOne}
          </Link>
        </div>

        {showUpdatedBanner && (
          <div style={{ background: dark ? "#123028" : "#E1F5EE", border: `1px solid ${success}`, borderRadius: 12, padding: "12px 14px", fontSize: 13.5, color: text, marginBottom: 20 }}>
            {t.updatedBanner}
          </div>
        )}

        {!loadingAds && ads.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", background: surface, border: `1px dashed ${border}`, borderRadius: 16 }}>
            <div style={{ fontSize: 15, color: textMuted, marginBottom: 16 }}>{t.noAds}</div>
            <Link href="/create-ad" className="btn" style={{ display: "inline-block", background: gold, color: "#1F2937", borderRadius: 10, padding: "10px 20px", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
              {t.postOne}
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16 }}>
            {ads.map((ad) => {
              const s = statusStyle(ad.status);
              const canDelete = ad.status === "pending" || ad.status === "rejected";
              return (
                <div key={ad.id} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, overflow: "hidden" }}>
                  <Link href={`/ads/${ad.id}`} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                    <img src={ad.images[0]} alt={ad.title} style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }} />
                  </Link>
                  <div style={{ padding: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                      <Link href={`/ads/${ad.id}`} style={{ fontSize: 14.5, fontWeight: 600, textDecoration: "none", color: text }}>{ad.title}</Link>
                      <span style={{ fontSize: 10.5, fontWeight: 600, padding: "4px 9px", borderRadius: 8, background: s.bg, color: s.fg, whiteSpace: "nowrap" }}>{t[ad.status]}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: textMuted, marginBottom: 10 }}>
                      <MapPin size={12} /> {ad.town}, {ad.district}
                    </div>
                    <div className="mono" style={{ fontSize: 15, fontWeight: 600, color: teal, marginBottom: 12 }}>Rs {fmt(ad.price)}</div>
                    <div style={{ fontSize: 11.5, color: textMuted, marginBottom: 12 }}>
                      {t.posted} {new Date(ad.createdAt).toISOString().slice(0, 10)}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Link
                        href={`/my-ads/${ad.id}/edit`}
                        className="btn"
                        style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: `1px solid ${border}`, color: text, borderRadius: 8, padding: "7px 12px", fontSize: 12.5, fontWeight: 500, textDecoration: "none" }}
                      >
                        <Pencil size={13} /> {t.editA}
                      </Link>
                      {canDelete && (
                        <button
                          type="button"
                          onClick={() => setConfirmId(ad.id)}
                          className="btn"
                          style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: `1px solid ${border}`, color: danger, borderRadius: 8, padding: "7px 12px", fontSize: 12.5, fontWeight: 500 }}
                        >
                          <Trash2 size={13} /> {t.deleteA}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {confirmId && (
        <div onClick={() => setConfirmId(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: surface, borderRadius: 18, padding: 26, maxWidth: 360, width: "100%" }}>
            <p style={{ fontSize: 14.5, marginBottom: 20 }}>{t.confirmDelete}</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn" onClick={() => setConfirmId(null)} style={{ flex: 1, background: "transparent", border: `1px solid ${border}`, color: text, borderRadius: 10, padding: "11px" }}>{t.cancel}</button>
              <button className="btn" onClick={() => doDelete(confirmId)} style={{ flex: 1, background: danger, color: "#fff", borderRadius: 10, padding: "11px", fontWeight: 600 }}>{t.confirm}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
