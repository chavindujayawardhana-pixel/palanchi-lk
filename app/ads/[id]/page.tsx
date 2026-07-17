"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  MapPin, Phone, Mail, MessageCircle, ChevronLeft, ChevronRight, Heart,
  Share2, Flag, Calendar, Package, Tag, X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useTheme } from "@/components/ThemeProvider";
import { AuthNav } from "@/components/AuthNav";
import { type Period } from "@/lib/data";
import { fetchAdById, fetchApprovedAds, type LiveAd } from "@/lib/ads";
import { fmt } from "@/lib/format";
import type { Lang } from "@/lib/i18n";

const dict = {
  en: {
    navCreate: "Create ad",
    backToResults: "Back to results", perDay: "/ day", perHour: "/ hour", perWeek: "/ week", perMonth: "/ month",
    condition: "Condition", conditionNew: "New", conditionUsed: "Used",
    quantity: "Available quantity", category: "Category", posted: "Posted",
    description: "Description", location: "Location", viewOnMap: "View on map",
    contactLister: "Contact lister", call: "Call", whatsapp: "WhatsApp", email: "Email",
    save: "Save", share: "Share", report: "Report", verified: "Verified lister",
    similarAds: "Similar listings", safetyTitle: "Safety tips",
    safetyTips: [
      "Meet in a public place or verify the item in person before paying.",
      "Avoid transferring money before inspecting the equipment.",
      "Confirm rental period and condition in writing.",
    ],
  },
  si: {
    navCreate: "දැන්වීමක් පළ කරන්න",
    backToResults: "ප්‍රතිඵල වෙත ආපහු", perDay: "/ දිනකට", perHour: "/ පැයකට", perWeek: "/ සතියකට", perMonth: "/ මාසයකට",
    condition: "තත්ත්වය", conditionNew: "අලුත්", conditionUsed: "පරණ",
    quantity: "ලබාගත හැකි ප්‍රමාණය", category: "කාණ්ඩය", posted: "පළ කළේ",
    description: "විස්තරය", location: "ස්ථානය", viewOnMap: "සිතියමේ බලන්න",
    contactLister: "දැන්වීම්කරු අමතන්න", call: "අමතන්න", whatsapp: "WhatsApp", email: "විද්‍යුත් තැපෑල",
    save: "සුරකින්න", share: "බෙදාගන්න", report: "වාර්තා කරන්න", verified: "සත්‍යාපිත දැන්වීම්කරු",
    similarAds: "සමාන දැන්වීම්", safetyTitle: "ආරක්ෂක ඉඟි",
    safetyTips: [
      "ගෙවීමට කලින් ප්‍රසිද්ධ ස්ථානයක හමුවී උපකරණය පරීක්ෂා කරන්න.",
      "උපකරණය පරීක්ෂා කිරීමට කලින් මුදල් ට්‍රාන්ස්ෆර් කිරීමෙන් වළකින්න.",
      "කුලී කාලය සහ තත්ත්වය ලිඛිතව තහවුරු කරගන්න.",
    ],
  },
  ta: {
    navCreate: "விளம்பரம் இடு",
    backToResults: "முடிவுகளுக்கு திரும்பு", perDay: "/ நாள்", perHour: "/ மணி", perWeek: "/ வாரம்", perMonth: "/ மாதம்",
    condition: "நிலை", conditionNew: "புதியது", conditionUsed: "பழையது",
    quantity: "கிடைக்கும் அளவு", category: "வகை", posted: "வெளியிடப்பட்டது",
    description: "விளக்கம்", location: "இடம்", viewOnMap: "மேப்பில் பார்க்க",
    contactLister: "விளம்பரதாரரை தொடர்பு கொள்ள", call: "அழை", whatsapp: "WhatsApp", email: "மின்னஞ்சல்",
    save: "சேமி", share: "பகிர்", report: "புகார்", verified: "சரிபார்க்கப்பட்ட விளம்பரதாரர்",
    similarAds: "ஒத்த விளம்பரங்கள்", safetyTitle: "பாதுகாப்பு குறிப்புகள்",
    safetyTips: [
      "பணம் செலுத்தும் முன் பொது இடத்தில் சந்தித்து பொருளை சரிபார்க்கவும்.",
      "உபகரணத்தை ஆய்வு செய்யும் முன் பணத்தை மாற்றுவதைத் தவிர்க்கவும்.",
      "வாடகை காலம் மற்றும் நிலையை எழுத்துப்பூர்வமாக உறுதிப்படுத்தவும்.",
    ],
  },
};

type DetailDict = (typeof dict)[Lang];

export default function AdDetailPage() {
  const params = useParams<{ id: string }>();
  const { lang, dark, colors } = useTheme();
  const [activeImg, setActiveImg] = useState(0);
  const [saved, setSaved] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [ad, setAd] = useState<LiveAd | null>(null);
  const [allAds, setAllAds] = useState<LiveAd[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchAdById(params.id), fetchApprovedAds()]).then(([foundAd, all]) => {
      if (cancelled) return;
      setAd(foundAd);
      setAllAds(all);
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [params.id]);

  const t: DetailDict = dict[lang];
  const { surface, text, textMuted, border, gold, teal } = colors;

  if (loading) return null;
  if (!ad) notFound();

  const images = ad.images;
  const category = ad.categoryName;
  const similarAds = (
    allAds.filter((a) => a.id !== ad.id && a.categoryId === ad.categoryId).length
      ? allAds.filter((a) => a.id !== ad.id && a.categoryId === ad.categoryId)
      : allAds.filter((a) => a.id !== ad.id)
  ).slice(0, 3);

  const nextImg = () => setActiveImg((activeImg + 1) % images.length);
  const prevImg = () => setActiveImg((activeImg - 1 + images.length) % images.length);

  return (
    <div style={{ background: colors.bg, color: text, minHeight: "100vh" }}>
      <Navbar
        right={
          <>
            <Link href="/create-ad" className="btn" style={{ background: gold, color: "#1F2937", borderRadius: 10, padding: "9px 16px", fontSize: 13.5, fontWeight: 600, textDecoration: "none" }}>
              {t.navCreate}
            </Link>
            <AuthNav />
          </>
        }
      />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 24px 0" }}>
        <Link href="/search" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13.5, color: textMuted, textDecoration: "none" }}>
          <ChevronLeft size={15} /> {t.backToResults}
        </Link>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 24px 60px", display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 28 }} className="layout">
        <div>
          {/* Image gallery */}
          <div style={{ position: "relative", borderRadius: 18, overflow: "hidden", background: surface, border: `1px solid ${border}` }}>
            <img src={images[activeImg]} alt={ad.title} onClick={() => setLightbox(true)} style={{ width: "100%", height: 420, objectFit: "cover", display: "block", cursor: "zoom-in" }} />
            <button className="btn" onClick={prevImg} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.5)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ChevronLeft size={18} />
            </button>
            <button className="btn" onClick={nextImg} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.5)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ChevronRight size={18} />
            </button>
            <span style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: 12, padding: "4px 10px", borderRadius: 8 }}>
              {activeImg + 1} / {images.length}
            </span>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={ad.title}
                onClick={() => setActiveImg(i)}
                className={"thumb" + (i === activeImg ? " active" : "")}
                style={{ width: 78, height: 58, objectFit: "cover", borderRadius: 10, cursor: "pointer", opacity: i === activeImg ? 1 : 0.6, border: `2px solid ${i === activeImg ? gold : "transparent"}` }}
              />
            ))}
          </div>

          {/* Title + price block */}
          <div style={{ marginTop: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
              <div>
                <h1 className="disp" style={{ fontSize: 24, fontWeight: 700, margin: "0 0 8px" }}>{ad.title}</h1>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13.5, color: textMuted }}>
                  <MapPin size={14} /> {ad.town}, {ad.district}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn" onClick={() => setSaved(!saved)} style={{ width: 38, height: 38, borderRadius: 10, border: `1px solid ${border}`, background: saved ? (dark ? "#2A2410" : "#FFF7E0") : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Heart size={16} color={saved ? gold : textMuted} fill={saved ? gold : "none"} />
                </button>
                <button className="btn" style={{ width: 38, height: 38, borderRadius: 10, border: `1px solid ${border}`, background: "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Share2 size={16} color={textMuted} />
                </button>
              </div>
            </div>

            <div className="mono" style={{ fontSize: 30, fontWeight: 700, color: teal, marginTop: 18 }}>
              Rs {fmt(ad.price)} <span style={{ fontSize: 14, fontWeight: 500, color: textMuted }}>{t[ad.period as Period]}</span>
            </div>

            {/* Spec grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10, marginTop: 22 }}>
              <SpecItem icon={Tag} label={t.category} value={category ? category[lang] : "—"} surface={surface} border={border} textMuted={textMuted} gold={gold} />
              <SpecItem icon={Package} label={t.condition} value={ad.condition === "new" ? t.conditionNew : t.conditionUsed} surface={surface} border={border} textMuted={textMuted} gold={gold} />
              <SpecItem icon={Package} label={t.quantity} value={ad.quantity} surface={surface} border={border} textMuted={textMuted} gold={gold} />
              <SpecItem icon={Calendar} label={t.posted} value={new Date(ad.createdAt).toISOString().slice(0, 10)} surface={surface} border={border} textMuted={textMuted} gold={gold} />
            </div>

            <div style={{ marginTop: 26 }}>
              <h2 className="disp" style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.description}</h2>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: textMuted }}>{ad.description}</p>
            </div>

            <div style={{ marginTop: 26 }}>
              <h2 className="disp" style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.location}</h2>
              <div style={{ background: dark ? "#152025" : "#0F3D3E", borderRadius: 16, padding: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#F0FBF8" }}>
                  <MapPin size={18} color={gold} />
                  <span style={{ fontSize: 14 }}>{ad.town}, {ad.district}</span>
                </div>
                {ad.mapLink && (
                  <a href={ad.mapLink} target="_blank" rel="noreferrer" className="btn" style={{ background: gold, color: "#1F2937", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>{t.viewOnMap}</a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 18, padding: 22, position: "sticky", top: 88 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: teal, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 600, flexShrink: 0 }}>
                {ad.contactName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div>
                <div style={{ fontSize: 14.5, fontWeight: 600 }}>{ad.contactName}</div>
              </div>
            </div>

            <div style={{ height: 1, background: border, margin: "18px 0" }} />

            <div className="disp" style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 12 }}>{t.contactLister}</div>

            <a href={`tel:${ad.phone}`} className="btn" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", background: gold, color: "#1F2937", borderRadius: 12, padding: "12px", fontWeight: 600, fontSize: 14.5, marginBottom: 10, textDecoration: "none" }}>
              <Phone size={16} /> {t.call} · {ad.phone}
            </a>
            {ad.whatsapp && (
              <a href={`https://wa.me/${ad.whatsapp.replace(/[^0-9]/g, "")}`} className="btn" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", background: "#25D366", color: "#fff", borderRadius: 12, padding: "12px", fontWeight: 600, fontSize: 14.5, marginBottom: 10, textDecoration: "none" }}>
                <MessageCircle size={16} /> {t.whatsapp}
              </a>
            )}
            {ad.email && (
              <a href={`mailto:${ad.email}`} className="btn" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", background: "transparent", border: `1px solid ${border}`, color: text, borderRadius: 12, padding: "12px", fontWeight: 500, fontSize: 14.5, textDecoration: "none" }}>
                <Mail size={16} /> {t.email}
              </a>
            )}

            <div style={{ height: 1, background: border, margin: "18px 0" }} />

            <button className="btn" style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: textMuted, fontSize: 12.5, padding: 0 }}>
              <Flag size={13} /> {t.report}
            </button>
          </div>

          <div style={{ background: dark ? "#152025" : "#FFF7E0", border: `1px solid ${border}`, borderRadius: 16, padding: 18, marginTop: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{t.safetyTitle}</div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12.5, color: textMuted, lineHeight: 1.8 }}>
              {t.safetyTips.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          </div>
        </div>
      </div>

      {/* Similar ads */}
      {similarAds.length > 0 && (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 60px" }}>
          <h2 className="disp" style={{ fontSize: 18, fontWeight: 600, marginBottom: 18 }}>{t.similarAds}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
            {similarAds.map((sa) => (
              <Link key={sa.id} href={`/ads/${sa.id}`} className="card-hover" style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, overflow: "hidden", cursor: "pointer", textDecoration: "none", color: text, display: "block" }}>
                <img src={sa.images[0]} alt={sa.title} style={{ width: "100%", height: 130, objectFit: "cover", display: "block" }} />
                <div style={{ padding: 14 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{sa.title}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: textMuted, marginBottom: 10 }}>
                    <MapPin size={11} /> {sa.town}
                  </div>
                  <div className="mono" style={{ fontSize: 15, fontWeight: 600, color: teal }}>
                    Rs {fmt(sa.price)} <span style={{ fontSize: 11, fontWeight: 500, color: textMuted }}>{t[sa.period as Period]}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <button className="btn" onClick={() => setLightbox(false)} style={{ position: "absolute", top: 20, right: 20, width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.15)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={20} />
          </button>
          <img src={images[activeImg]} alt="" style={{ maxWidth: "90%", maxHeight: "85vh", objectFit: "contain", borderRadius: 8 }} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}

function SpecItem({
  icon: Icon,
  label,
  value,
  surface,
  border,
  textMuted,
  gold,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  surface: string;
  border: string;
  textMuted: string;
  gold: string;
}) {
  return (
    <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: "12px 14px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: textMuted, marginBottom: 6 }}>
        <Icon size={13} color={gold} /> {label}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600 }}>{value}</div>
    </div>
  );
}
