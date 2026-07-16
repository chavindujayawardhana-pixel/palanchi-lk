import React, { useState } from "react";
import {
  Wrench, Sun, Moon, Globe, ChevronDown, MapPin, Phone, Mail, MessageCircle,
  ChevronLeft, ChevronRight, Heart, Share2, Flag, Calendar, Package, Tag,
  ShieldCheck, Star, X
} from "lucide-react";

const LANGS = { en: "English", si: "සිංහල", ta: "தமிழ்" };

const dict = {
  en: {
    navHome: "Home", navCreate: "Create ad", navContact: "Contact", login: "Log in", register: "Register",
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
    navHome: "මුල් පිටුව", navCreate: "දැන්වීමක් පළ කරන්න", navContact: "අමතන්න", login: "පිවිසෙන්න", register: "ලියාපදිංචි වන්න",
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
    navHome: "முகப்பு", navCreate: "விளம்பரம் இடு", navContact: "தொடர்பு", login: "உள்நுழை", register: "பதிவு செய்க",
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

const AD = {
  id: 3,
  title: "JCB 3DX Backhoe Loader",
  price: 18500,
  period: "perDay",
  cat: "Excavators",
  town: "Negombo",
  district: "Gampaha",
  cond: "used",
  qty: 1,
  posted: "2026-07-13",
  contactName: "Fathima Rizvi",
  phone: "+94 77 123 4567",
  whatsapp: "+94 77 123 4567",
  email: "fathima@mail.com",
  verified: true,
  description: "Well-maintained JCB 3DX backhoe loader available for daily rental. Suitable for excavation, trenching, and material handling on construction sites. Operator available on request at an additional cost. Machine serviced regularly, all documents up to date. Delivery within Gampaha district can be arranged.",
  images: [
    "https://picsum.photos/seed/backhoe3/900/650",
    "https://picsum.photos/seed/backhoe3b/900/650",
    "https://picsum.photos/seed/backhoe3c/900/650",
    "https://picsum.photos/seed/backhoe3d/900/650",
  ],
};

const SIMILAR = [
  { id: 10, title: "Mini Excavator 1.5T", price: 9800, period: "perDay", town: "Peradeniya", img: "https://picsum.photos/seed/excav10/500/380" },
  { id: 9, title: "Concrete Mixer 500L", price: 3200, period: "perDay", town: "Colombo 01", img: "https://picsum.photos/seed/mixer9/500/380" },
  { id: 6, title: "Mini Tipper Truck 3T", price: 7200, period: "perDay", town: "Galle Town", img: "https://picsum.photos/seed/tipper6/500/380" },
];

function fmt(n) { return new Intl.NumberFormat("en-LK").format(n); }

export default function PalanchiAdDetail() {
  const [lang, setLang] = useState("en");
  const [dark, setDark] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [saved, setSaved] = useState(false);
  const [lightbox, setLightbox] = useState(false);

  const t = dict[lang];

  const bg = dark ? "#10161A" : "#F8F9FA";
  const surface = dark ? "#1A2226" : "#FFFFFF";
  const text = dark ? "#F3F4F6" : "#1F2937";
  const textMuted = dark ? "#9CA3AF" : "#6B7280";
  const border = dark ? "#2A343A" : "#E7E5DE";
  const gold = "#F4B400";
  const teal = dark ? "#1D9E75" : "#0F3D3E";

  const nextImg = () => setActiveImg((activeImg + 1) % AD.images.length);
  const prevImg = () => setActiveImg((activeImg - 1 + AD.images.length) % AD.images.length);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: bg, color: text, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap');
        * { box-sizing: border-box; }
        .disp { font-family: 'Space Grotesk', sans-serif; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .btn { cursor:pointer; border:none; transition: transform .15s, background .2s; }
        .btn:active { transform: scale(0.96); }
        .card-hover { transition: transform .2s ease, box-shadow .2s ease; }
        .card-hover:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(0,0,0,0.08); }
        .thumb { cursor: pointer; opacity: 0.6; transition: opacity .2s, border-color .2s; }
        .thumb.active { opacity: 1; }
      `}</style>

      <header style={{ position: "sticky", top: 0, zIndex: 50, background: dark ? "rgba(16,22,26,0.9)" : "rgba(255,255,255,0.9)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div className="disp" style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 20 }}>
            <div style={{ width: 30, height: 30, borderRadius: 9, background: gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Wrench size={16} color="#1F2937" />
            </div>
            Palanchi<span style={{ color: gold }}>.lk</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ position: "relative" }}>
              <button className="btn" onClick={() => setLangOpen(!langOpen)} style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: `1px solid ${border}`, borderRadius: 10, padding: "8px 12px", color: text, fontSize: 13.5 }}>
                <Globe size={15} /> {LANGS[lang]} <ChevronDown size={13} />
              </button>
              {langOpen && (
                <div style={{ position: "absolute", top: 42, right: 0, background: surface, border: `1px solid ${border}`, borderRadius: 10, overflow: "hidden", minWidth: 130, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 60 }}>
                  {Object.entries(LANGS).map(([code, label]) => (
                    <div key={code} onClick={() => { setLang(code); setLangOpen(false); }} style={{ padding: "10px 14px", cursor: "pointer", background: lang === code ? (dark ? "#233038" : "#FFF7E0") : "transparent", fontSize: 13.5 }}>{label}</div>
                  ))}
                </div>
              )}
            </div>
            <button className="btn" onClick={() => setDark(!dark)} style={{ width: 36, height: 36, borderRadius: 10, background: "transparent", border: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", color: text }}>
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button className="btn" style={{ background: gold, color: "#1F2937", borderRadius: 10, padding: "9px 16px", fontSize: 13.5, fontWeight: 600 }}>{t.navCreate}</button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 24px 0" }}>
        <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13.5, color: textMuted, textDecoration: "none" }}>
          <ChevronLeft size={15} /> {t.backToResults}
        </a>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 24px 60px", display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 28 }} className="layout">

        <div>
          {/* Image gallery */}
          <div style={{ position: "relative", borderRadius: 18, overflow: "hidden", background: surface, border: `1px solid ${border}` }}>
            <img src={AD.images[activeImg]} alt={AD.title} onClick={() => setLightbox(true)} style={{ width: "100%", height: 420, objectFit: "cover", display: "block", cursor: "zoom-in" }} />
            <button className="btn" onClick={prevImg} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.5)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ChevronLeft size={18} />
            </button>
            <button className="btn" onClick={nextImg} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.5)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ChevronRight size={18} />
            </button>
            <span style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: 12, padding: "4px 10px", borderRadius: 8 }}>
              {activeImg + 1} / {AD.images.length}
            </span>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            {AD.images.map((img, i) => (
              <img key={i} src={img} onClick={() => setActiveImg(i)} className={"thumb" + (i === activeImg ? " active" : "")} style={{ width: 78, height: 58, objectFit: "cover", borderRadius: 10, border: `2px solid ${i === activeImg ? gold : "transparent"}` }} />
            ))}
          </div>

          {/* Title + price block */}
          <div style={{ marginTop: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
              <div>
                <h1 className="disp" style={{ fontSize: 24, fontWeight: 700, margin: "0 0 8px" }}>{AD.title}</h1>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13.5, color: textMuted }}>
                  <MapPin size={14} /> {AD.town}, {AD.district}
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
              Rs {fmt(AD.price)} <span style={{ fontSize: 14, fontWeight: 500, color: textMuted }}>{t[AD.period]}</span>
            </div>

            {/* Spec grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10, marginTop: 22 }}>
              <SpecItem icon={Tag} label={t.category} value={AD.cat} surface={surface} border={border} textMuted={textMuted} gold={gold} />
              <SpecItem icon={Package} label={t.condition} value={AD.cond === "new" ? t.conditionNew : t.conditionUsed} surface={surface} border={border} textMuted={textMuted} gold={gold} />
              <SpecItem icon={Package} label={t.quantity} value={AD.qty} surface={surface} border={border} textMuted={textMuted} gold={gold} />
              <SpecItem icon={Calendar} label={t.posted} value={AD.posted} surface={surface} border={border} textMuted={textMuted} gold={gold} />
            </div>

            <div style={{ marginTop: 26 }}>
              <h2 className="disp" style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.description}</h2>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: textMuted }}>{AD.description}</p>
            </div>

            <div style={{ marginTop: 26 }}>
              <h2 className="disp" style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.location}</h2>
              <div style={{ background: dark ? "#152025" : "#0F3D3E", borderRadius: 16, padding: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#F0FBF8" }}>
                  <MapPin size={18} color={gold} />
                  <span style={{ fontSize: 14 }}>{AD.town}, {AD.district}</span>
                </div>
                <button className="btn" style={{ background: gold, color: "#1F2937", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 600 }}>{t.viewOnMap}</button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 18, padding: 22, position: "sticky", top: 88 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: teal, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 600, flexShrink: 0 }}>
                {AD.contactName.split(" ").map(n => n[0]).slice(0, 2).join("")}
              </div>
              <div>
                <div style={{ fontSize: 14.5, fontWeight: 600 }}>{AD.contactName}</div>
                {AD.verified && (
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11.5, color: "#0F6E56" }}>
                    <ShieldCheck size={12} /> {t.verified}
                  </div>
                )}
              </div>
            </div>

            <div style={{ height: 1, background: border, margin: "18px 0" }} />

            <div className="disp" style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 12 }}>{t.contactLister}</div>

            <a href={`tel:${AD.phone}`} className="btn" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", background: gold, color: "#1F2937", borderRadius: 12, padding: "12px", fontWeight: 600, fontSize: 14.5, marginBottom: 10, textDecoration: "none" }}>
              <Phone size={16} /> {t.call} · {AD.phone}
            </a>
            <a href={`https://wa.me/${AD.whatsapp.replace(/[^0-9]/g, "")}`} className="btn" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", background: "#25D366", color: "#fff", borderRadius: 12, padding: "12px", fontWeight: 600, fontSize: 14.5, marginBottom: 10, textDecoration: "none" }}>
              <MessageCircle size={16} /> {t.whatsapp}
            </a>
            <a href={`mailto:${AD.email}`} className="btn" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", background: "transparent", border: `1px solid ${border}`, color: text, borderRadius: 12, padding: "12px", fontWeight: 500, fontSize: 14.5, textDecoration: "none" }}>
              <Mail size={16} /> {t.email}
            </a>

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
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 60px" }}>
        <h2 className="disp" style={{ fontSize: 18, fontWeight: 600, marginBottom: 18 }}>{t.similarAds}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
          {SIMILAR.map(ad => (
            <div key={ad.id} className="card-hover" style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, overflow: "hidden", cursor: "pointer" }}>
              <img src={ad.img} alt={ad.title} style={{ width: "100%", height: 130, objectFit: "cover", display: "block" }} />
              <div style={{ padding: 14 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{ad.title}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: textMuted, marginBottom: 10 }}>
                  <MapPin size={11} /> {ad.town}
                </div>
                <div className="mono" style={{ fontSize: 15, fontWeight: 600, color: teal }}>
                  Rs {fmt(ad.price)} <span style={{ fontSize: 11, fontWeight: 500, color: textMuted }}>{t[ad.period]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <button className="btn" onClick={() => setLightbox(false)} style={{ position: "absolute", top: 20, right: 20, width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.15)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={20} />
          </button>
          <img src={AD.images[activeImg]} alt="" style={{ maxWidth: "90%", maxHeight: "85vh", objectFit: "contain", borderRadius: 8 }} onClick={e => e.stopPropagation()} />
        </div>
      )}

      <style>{`@media (max-width: 860px) { .layout { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

function SpecItem({ icon: Icon, label, value, surface, border, textMuted, gold }) {
  return (
    <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: "12px 14px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: textMuted, marginBottom: 6 }}>
        <Icon size={13} color={gold} /> {label}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600 }}>{value}</div>
    </div>
  );
}
