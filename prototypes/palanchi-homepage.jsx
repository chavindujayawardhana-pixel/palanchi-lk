import React, { useState, useMemo } from "react";
import {
  Search, MapPin, Sun, Moon, Menu, X, ChevronDown, Star,
  Wrench, Zap, Truck, Container, Tractor, HardHat, Cable,
  PartyPopper, Layers3, Fence, Phone, ShieldCheck, Clock,
  BadgeCheck, ArrowRight, Globe, Plus
} from "lucide-react";

const LANGS = { en: "English", si: "සිංහල", ta: "தமிழ்" };

const dict = {
  en: {
    navHome: "Home", navCreate: "Create ad", navContact: "Contact",
    login: "Log in", register: "Register",
    heroTitle: "Rent anything, from anyone, anywhere in Sri Lanka",
    heroSub: "Scaffolding, machinery, vehicles and tools — find gear near you or list what you own.",
    searchPlaceholder: "What are you looking for? e.g. Generator, Backhoe...",
    searchDistrict: "District", searchBtn: "Search",
    popularCategories: "Popular categories", browseAll: "Browse all",
    featured: "Featured listings", latest: "Latest listings", viewAll: "View all",
    perDay: "/ day", perHour: "/ hour", perWeek: "/ week", perMonth: "/ month",
    why: "Why choose Palanchi.lk",
    why1t: "Verified listers", why1d: "Every ad is reviewed by our team before it goes live.",
    why2t: "Island-wide reach", why2d: "All 25 districts, thousands of towns, one marketplace.",
    why3t: "No commission to list", why3d: "Publish an ad in minutes, no account required.",
    reviews: "What renters say",
    footerTag: "Sri Lanka's rental marketplace for equipment, machinery and tools.",
    fQuick: "Quick links", fCategories: "Categories", fSupport: "Support",
    fPrivacy: "Privacy policy", fTerms: "Terms of service", fContact: "Contact us",
    copyright: "© 2026 Palanchi.lk", madeBy: "Made with care by Chavindu Jayawardana",
    condition: "Used", conditionNew: "New",
  },
  si: {
    navHome: "මුල් පිටුව", navCreate: "දැන්වීමක් පළ කරන්න", navContact: "අමතන්න",
    login: "පිවිසෙන්න", register: "ලියාපදිංචි වන්න",
    heroTitle: "ශ්‍රී ලංකාව පුරා ඕනෑම දෙයක් කුලියට ගන්න",
    heroSub: "ස්කැෆෝල්ඩිං, යන්ත්‍රෝපකරණ, වාහන සහ මෙවලම් — ඔබ අසල සොයන්න හෝ ඔබේ දේ ලැයිස්තුගත කරන්න.",
    searchPlaceholder: "ඔබ සොයන්නේ කුමක්ද? උදා: ජනරේටරය, බැක්හෝ...",
    searchDistrict: "දිස්ත්‍රික්කය", searchBtn: "සොයන්න",
    popularCategories: "ජනප්‍රිය කාණ්ඩ", browseAll: "සියල්ල බලන්න",
    featured: "විශේෂාංගිත දැන්වීම්", latest: "නවතම දැන්වීම්", viewAll: "සියල්ල බලන්න",
    perDay: "/ දිනකට", perHour: "/ පැයකට", perWeek: "/ සතියකට", perMonth: "/ මාසයකට",
    why: "Palanchi.lk තෝරාගන්නේ ඇයි",
    why1t: "සත්‍යාපිත දැන්වීම්කරුවන්", why1d: "සෑම දැන්වීමක්ම ප්‍රකාශයට පත් කිරීමට පෙර අපගේ කණ්ඩායම විසින් සමාලෝචනය කරයි.",
    why2t: "දිවයින පුරා ව්‍යාප්ත", why2d: "දිස්ත්‍රික්ක 25ම, නගර දහස් ගණනක්, එක් වෙළඳපොලක්.",
    why3t: "ලැයිස්තුගත කිරීමට කොමිසමක් නැත", why3d: "මිනිත්තු කිහිපයකින් දැන්වීමක් පළ කරන්න, ගිණුමක් අවශ්‍ය නැත.",
    reviews: "කුලී ගැනුම්කරුවන් පවසන දේ",
    footerTag: "යන්ත්‍රෝපකරණ හා මෙවලම් සඳහා ශ්‍රී ලංකාවේ කුලී වෙළඳපොල.",
    fQuick: "ඉක්මන් සබැඳි", fCategories: "කාණ්ඩ", fSupport: "සහාය",
    fPrivacy: "පෞද්ගලිකත්ව ප්‍රතිපත්තිය", fTerms: "සේවා නියම", fContact: "අප අමතන්න",
    copyright: "© 2026 Palanchi.lk", madeBy: "Chavindu Jayawardana විසින් සකසන ලදී",
    condition: "පරණ", conditionNew: "අලුත්",
  },
  ta: {
    navHome: "முகப்பு", navCreate: "விளம்பரம் இடு", navContact: "தொடர்பு",
    login: "உள்நுழை", register: "பதிவு செய்க",
    heroTitle: "இலங்கை முழுவதும் எதையும் யாரிடமிருந்தும் வாடகைக்கு பெறுங்கள்",
    heroSub: "ஸ்கஃபோல்டிங், இயந்திரங்கள், வாகனங்கள் மற்றும் கருவிகள் — உங்களுக்கு அருகில் தேடுங்கள் அல்லது உங்களுடையதை பட்டியலிடுங்கள்.",
    searchPlaceholder: "நீங்கள் தேடுவது என்ன? உதா: ஜெனரேட்டர், பேக்ஹோ...",
    searchDistrict: "மாவட்டம்", searchBtn: "தேடு",
    popularCategories: "பிரபலமான வகைகள்", browseAll: "அனைத்தையும் பார்க்க",
    featured: "சிறப்பு பட்டியல்கள்", latest: "புதிய பட்டியல்கள்", viewAll: "அனைத்தையும் பார்க்க",
    perDay: "/ நாள்", perHour: "/ மணி", perWeek: "/ வாரம்", perMonth: "/ மாதம்",
    why: "Palanchi.lk ஐ ஏன் தேர்வு செய்ய வேண்டும்",
    why1t: "சரிபார்க்கப்பட்ட விற்பனையாளர்கள்", why1d: "ஒவ்வொரு விளம்பரமும் வெளியிடப்படுவதற்கு முன் எங்கள் குழுவால் ஆய்வு செய்யப்படுகிறது.",
    why2t: "தீவு தழுவிய சேவை", why2d: "அனைத்து 25 மாவட்டங்களும், ஆயிரக்கணக்கான நகரங்களும், ஒரே சந்தை.",
    why3t: "பட்டியலிட கமிஷன் இல்லை", why3d: "சில நிமிடங்களில் விளம்பரத்தை வெளியிடுங்கள், கணக்கு தேவையில்லை.",
    reviews: "வாடகைதாரர்கள் கூறுவது",
    footerTag: "உபகரணங்கள், இயந்திரங்கள் மற்றும் கருவிகளுக்கான இலங்கையின் வாடகை சந்தை.",
    fQuick: "விரைவு இணைப்புகள்", fCategories: "வகைகள்", fSupport: "ஆதரவு",
    fPrivacy: "தனியுரிமைக் கொள்கை", fTerms: "சேவை விதிமுறைகள்", fContact: "எங்களை தொடர்பு கொள்ள",
    copyright: "© 2026 Palanchi.lk", madeBy: "Chavindu Jayawardana ஆல் உருவாக்கப்பட்டது",
    condition: "பழையது", conditionNew: "புதியது",
  },
};

const CATEGORIES = [
  { key: "scaffolding", icon: Fence, en: "Scaffolding", si: "ස්කැෆෝල්ඩිං", ta: "ஸ்கஃபோல்டிங்" },
  { key: "construction", icon: HardHat, en: "Construction equip.", si: "ඉදිකිරීම් උපකරණ", ta: "கட்டுமான உபகரணங்கள்" },
  { key: "generators", icon: Zap, en: "Generators", si: "ජනරේටර්", ta: "ஜெனரேட்டர்கள்" },
  { key: "powertools", icon: Wrench, en: "Power tools", si: "විදුලි මෙවලම්", ta: "மின் கருவிகள்" },
  { key: "excavators", icon: Tractor, en: "Excavators", si: "කැණීම් යන්ත්‍ර", ta: "அகழ்வாராய்ச்சி" },
  { key: "containers", icon: Container, en: "Containers", si: "කන්ටේනර්", ta: "கொள்கலன்கள்" },
  { key: "vehicles", icon: Truck, en: "Vehicles", si: "වාහන", ta: "வாகனங்கள்" },
  { key: "electrical", icon: Cable, en: "Electrical", si: "විදුලි උපකරණ", ta: "மின் உபகரணங்கள்" },
  { key: "event", icon: PartyPopper, en: "Event equipment", si: "උත්සව උපකරණ", ta: "நிகழ்வு உபகரணங்கள்" },
  { key: "other", icon: Layers3, en: "Others", si: "වෙනත්", ta: "மற்றவை" },
];

const ADS = [
  { id: 1, title: "20 kVA Diesel Generator", cat: "generators", price: 4500, period: "perDay", town: "Kaduwela", district: "Colombo", cond: "used", featured: true, img: "https://picsum.photos/seed/genset1/600/450" },
  { id: 2, title: "Steel Cup-Lock Scaffolding Set", cat: "scaffolding", price: 12000, period: "perWeek", town: "Kandy Town", district: "Kandy", cond: "used", featured: true, img: "https://picsum.photos/seed/scaffold2/600/450" },
  { id: 3, title: "JCB 3DX Backhoe Loader", cat: "excavators", price: 18500, period: "perDay", town: "Negombo", district: "Gampaha", cond: "used", featured: true, img: "https://picsum.photos/seed/backhoe3/600/450" },
  { id: 4, title: "Bosch Rotary Hammer Drill", cat: "powertools", price: 950, period: "perDay", town: "Matara Town", district: "Matara", cond: "new", featured: false, img: "https://picsum.photos/seed/drill4/600/450" },
  { id: 5, title: "20ft Storage Container", cat: "containers", price: 9000, period: "perMonth", town: "Ja-Ela", district: "Gampaha", cond: "used", featured: false, img: "https://picsum.photos/seed/container5/600/450" },
  { id: 6, title: "Mini Tipper Truck 3T", cat: "vehicles", price: 7200, period: "perDay", town: "Galle Town", district: "Galle", cond: "used", featured: false, img: "https://picsum.photos/seed/tipper6/600/450" },
  { id: 7, title: "PA Sound System, 2 Speakers", cat: "event", price: 6000, period: "perDay", town: "Nugegoda", district: "Colombo", cond: "new", featured: false, img: "https://picsum.photos/seed/sound7/600/450" },
  { id: 8, title: "Portable Welding Machine", cat: "electrical", price: 1800, period: "perDay", town: "Kurunegala Town", district: "Kurunegala", cond: "used", featured: false, img: "https://picsum.photos/seed/weld8/600/450" },
];

const DISTRICTS = ["Colombo", "Gampaha", "Kandy", "Galle", "Matara", "Kurunegala", "Jaffna", "Anuradhapura", "Ratnapura", "Badulla"];

const REVIEWS = [
  { name: "Nadeesha P.", town: "Colombo", en: "Rented a generator within an hour of posting. Smooth, no drama.", rating: 5 },
  { name: "Suresh K.", town: "Kandy", en: "Listed my scaffolding set for free and had renters calling the same day.", rating: 5 },
  { name: "Fathima R.", town: "Galle", en: "Verification gave me confidence the lister was legitimate.", rating: 4 },
];

function fmt(n) {
  return new Intl.NumberFormat("en-LK").format(n);
}

export default function Palanchi() {
  const [lang, setLang] = useState("en");
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState("");
  const [adModal, setAdModal] = useState(false);

  const t = dict[lang];

  const bg = dark ? "#10161A" : "#F8F9FA";
  const surface = dark ? "#1A2226" : "#FFFFFF";
  const text = dark ? "#F3F4F6" : "#1F2937";
  const textMuted = dark ? "#9CA3AF" : "#6B7280";
  const border = dark ? "#2A343A" : "#E7E5DE";
  const gold = "#F4B400";
  const teal = dark ? "#1D9E75" : "#0F3D3E";

  const filteredAds = useMemo(() => {
    return ADS.filter(a =>
      (!query || a.title.toLowerCase().includes(query.toLowerCase())) &&
      (!district || a.district === district)
    );
  }, [query, district]);

  const featured = filteredAds.filter(a => a.featured);
  const latest = filteredAds;

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif", background: bg, color: text,
      minHeight: "100vh", transition: "background .3s, color .3s"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap');
        * { box-sizing: border-box; }
        .disp { font-family: 'Space Grotesk', sans-serif; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .btn { cursor:pointer; border:none; transition: transform .15s, background .2s, box-shadow .2s; }
        .btn:active { transform: scale(0.97); }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(0,0,0,0.10); }
        .card-hover { transition: transform .25s ease, box-shadow .25s ease; }
        .tag-notch { position:relative; }
        input, select { font-family:'Inter',sans-serif; }
        ::placeholder { color: ${textMuted}; }
      `}</style>

      {/* NAVBAR */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50, background: dark ? "rgba(16,22,26,0.85)" : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(10px)", borderBottom: `1px solid ${border}`
      }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div className="disp" style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 22 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Wrench size={18} color="#1F2937" />
            </div>
            Palanchi<span style={{ color: gold }}>.lk</span>
          </div>

          <nav style={{ display: "flex", gap: 28, fontSize: 15, fontWeight: 500 }} className="desktop-nav">
            <a href="#" style={{ color: text, textDecoration: "none" }}>{t.navHome}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setAdModal(true); }} style={{ color: text, textDecoration: "none" }}>{t.navCreate}</a>
            <a href="#" style={{ color: text, textDecoration: "none" }}>{t.navContact}</a>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ position: "relative" }}>
              <button className="btn" onClick={() => setLangOpen(!langOpen)} style={{
                display: "flex", alignItems: "center", gap: 6, background: "transparent", border: `1px solid ${border}`,
                borderRadius: 10, padding: "8px 12px", color: text, fontSize: 14
              }}>
                <Globe size={16} /> {LANGS[lang]} <ChevronDown size={14} />
              </button>
              {langOpen && (
                <div style={{
                  position: "absolute", top: 42, right: 0, background: surface, border: `1px solid ${border}`,
                  borderRadius: 10, overflow: "hidden", minWidth: 140, boxShadow: "0 8px 24px rgba(0,0,0,0.12)"
                }}>
                  {Object.entries(LANGS).map(([code, label]) => (
                    <div key={code} onClick={() => { setLang(code); setLangOpen(false); }}
                      style={{ padding: "10px 14px", cursor: "pointer", background: lang === code ? (dark ? "#233038" : "#FFF7E0") : "transparent", fontSize: 14 }}>
                      {label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="btn" onClick={() => setDark(!dark)} style={{
              width: 38, height: 38, borderRadius: 10, background: "transparent", border: `1px solid ${border}`,
              display: "flex", alignItems: "center", justifyContent: "center", color: text
            }}>
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <button className="btn desktop-nav" style={{ background: "transparent", color: text, border: `1px solid ${border}`, borderRadius: 10, padding: "9px 16px", fontSize: 14, fontWeight: 500 }}>
              {t.login}
            </button>
            <button className="btn desktop-nav" style={{ background: gold, color: "#1F2937", borderRadius: 10, padding: "9px 16px", fontSize: 14, fontWeight: 600 }}>
              {t.register}
            </button>

            <button className="btn mobile-nav" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "transparent", border: "none", color: text, display: "none" }}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "64px 24px 40px", textAlign: "center" }}>
        <h1 className="disp" style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 18px", maxWidth: 760, marginInline: "auto" }}>
          {t.heroTitle}
        </h1>
        <p style={{ fontSize: 17, color: textMuted, maxWidth: 560, margin: "0 auto 36px" }}>{t.heroSub}</p>

        <div style={{
          display: "flex", flexWrap: "wrap", gap: 8, background: surface, border: `1px solid ${border}`,
          borderRadius: 16, padding: 10, maxWidth: 760, margin: "0 auto", boxShadow: "0 8px 30px rgba(0,0,0,0.06)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: "1 1 260px", padding: "8px 10px" }}>
            <Search size={18} color={textMuted} />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder={t.searchPlaceholder}
              style={{ border: "none", outline: "none", background: "transparent", color: text, fontSize: 15, width: "100%" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, borderLeft: `1px solid ${border}`, padding: "8px 10px", flex: "0 1 180px" }}>
            <MapPin size={18} color={textMuted} />
            <select value={district} onChange={e => setDistrict(e.target.value)}
              style={{ border: "none", outline: "none", background: "transparent", color: text, fontSize: 15, width: "100%" }}>
              <option value="">{t.searchDistrict}</option>
              {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <button className="btn" style={{ background: gold, color: "#1F2937", borderRadius: 12, padding: "12px 26px", fontWeight: 600, fontSize: 15 }}>
            {t.searchBtn}
          </button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "24px 24px 56px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <h2 className="disp" style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>{t.popularCategories}</h2>
          <a href="#" style={{ color: teal, fontSize: 14, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>{t.browseAll} <ArrowRight size={14} /></a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 14 }}>
          {CATEGORIES.map(c => {
            const Icon = c.icon;
            return (
              <div key={c.key} className="card-hover" style={{
                background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: "22px 12px",
                textAlign: "center", cursor: "pointer"
              }}>
                <div style={{
                  width: 46, height: 46, borderRadius: 12, background: dark ? "#233038" : "#FFF7E0",
                  display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px"
                }}>
                  <Icon size={22} color={gold} />
                </div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{c[lang]}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED */}
      <AdSection title={t.featured} viewAll={t.viewAll} ads={featured.length ? featured : ADS.filter(a => a.featured)} t={t} surface={surface} border={border} textMuted={textMuted} gold={gold} teal={teal} dark={dark} />

      {/* LATEST */}
      <AdSection title={t.latest} viewAll={t.viewAll} ads={latest.length ? latest : ADS} t={t} surface={surface} border={border} textMuted={textMuted} gold={gold} teal={teal} dark={dark} />

      {/* WHY CHOOSE US */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "40px 24px 60px" }}>
        <h2 className="disp" style={{ fontSize: 22, fontWeight: 600, marginBottom: 24 }}>{t.why}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18 }}>
          {[
            { Icon: ShieldCheck, title: t.why1t, desc: t.why1d },
            { Icon: MapPin, title: t.why2t, desc: t.why2d },
            { Icon: BadgeCheck, title: t.why3t, desc: t.why3d },
          ].map((f, i) => (
            <div key={i} style={{ background: dark ? "#152025" : "#0F3D3E", borderRadius: 18, padding: 24, color: "#F0FBF8" }}>
              <f.Icon size={26} color={gold} />
              <div className="disp" style={{ fontWeight: 600, fontSize: 17, margin: "14px 0 6px" }}>{f.title}</div>
              <div style={{ fontSize: 14, color: "#B8CFCB", lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px 64px" }}>
        <h2 className="disp" style={{ fontSize: 22, fontWeight: 600, marginBottom: 24 }}>{t.reviews}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 18 }}>
          {REVIEWS.map((r, i) => (
            <div key={i} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 22 }}>
              <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
                {Array.from({ length: 5 }).map((_, s) => <Star key={s} size={14} color={s < r.rating ? gold : border} fill={s < r.rating ? gold : "none"} />)}
              </div>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: text, margin: "0 0 14px" }}>{r.en}</p>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{r.name}</div>
              <div style={{ fontSize: 12, color: textMuted }}>{r.town}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: dark ? "#0C1013" : "#1F2937", color: "#E5E7EB", padding: "48px 24px 24px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 32 }} className="footer-grid">
          <div>
            <div className="disp" style={{ fontWeight: 700, fontSize: 20, marginBottom: 10 }}>Palanchi<span style={{ color: gold }}>.lk</span></div>
            <p style={{ fontSize: 13.5, color: "#9CA3AF", lineHeight: 1.6, maxWidth: 260 }}>{t.footerTag}</p>
          </div>
          <FooterCol title={t.fQuick} items={[t.navHome, t.navCreate, t.navContact]} />
          <FooterCol title={t.fCategories} items={CATEGORIES.slice(0, 5).map(c => c[lang])} />
          <FooterCol title={t.fSupport} items={[t.fPrivacy, t.fTerms, t.fContact]} />
        </div>
        <div style={{ maxWidth: 1240, margin: "36px auto 0", borderTop: "1px solid #374151", paddingTop: 18, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, fontSize: 12.5, color: "#9CA3AF" }}>
          <span>{t.copyright}</span>
          <span>{t.madeBy}</span>
        </div>
      </footer>

      {/* CREATE AD MODAL */}
      {adModal && (
        <div onClick={() => setAdModal(false)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: surface, borderRadius: 20, padding: 32, maxWidth: 420, width: "100%",
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)"
          }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: dark ? "#233038" : "#FFF7E0", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              <Plus size={22} color={gold} />
            </div>
            <h3 className="disp" style={{ fontSize: 19, fontWeight: 600, margin: "0 0 10px" }}>{t.navCreate}</h3>
            <p style={{ fontSize: 14.5, color: textMuted, lineHeight: 1.6, margin: "0 0 24px" }}>
              You can publish an advertisement without creating an account. If you login or register, you can edit and manage your advertisements later.
            </p>
            <button className="btn" style={{ width: "100%", background: gold, color: "#1F2937", borderRadius: 12, padding: "13px", fontWeight: 600, fontSize: 15, marginBottom: 10 }}>
              {t.login} & manage ads
            </button>
            <button className="btn" onClick={() => setAdModal(false)} style={{ width: "100%", background: "transparent", border: `1px solid ${border}`, color: text, borderRadius: 12, padding: "13px", fontWeight: 500, fontSize: 15 }}>
              Continue without registration
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>
      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {items.map((it, i) => <a key={i} href="#" style={{ fontSize: 13.5, color: "#9CA3AF", textDecoration: "none" }}>{it}</a>)}
      </div>
    </div>
  );
}

function AdSection({ title, viewAll, ads, t, surface, border, textMuted, gold, teal, dark }) {
  return (
    <section style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px 56px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <h2 className="disp" style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>{title}</h2>
        <a href="#" style={{ color: teal, fontSize: 14, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>{viewAll} <ArrowRight size={14} /></a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 18 }}>
        {ads.map(ad => (
          <div key={ad.id} className="card-hover" style={{
            background: surface, border: `1px solid ${border}`, borderRadius: 18, overflow: "hidden", cursor: "pointer", position: "relative"
          }}>
            <div style={{ position: "relative" }}>
              <img src={ad.img} alt={ad.title} style={{ width: "100%", height: 150, objectFit: "cover", display: "block" }} />
              {ad.featured && (
                <span style={{ position: "absolute", top: 10, left: 10, background: gold, color: "#1F2937", fontSize: 11, fontWeight: 700, padding: "4px 9px", borderRadius: 8 }}>FEATURED</span>
              )}
              <span style={{
                position: "absolute", top: 10, right: 10, background: dark ? "rgba(16,22,26,0.85)" : "rgba(255,255,255,0.9)",
                fontSize: 10.5, fontWeight: 600, padding: "4px 9px", borderRadius: 8,
                color: ad.cond === "new" ? "#0F3D3E" : "#6B7280"
              }}>{ad.cond === "new" ? t.conditionNew : t.condition}</span>
            </div>

            <div style={{ padding: "16px 16px 18px", position: "relative" }}>
              <div style={{
                position: "absolute", top: -1, left: 0, right: 0, height: 0,
                borderTop: `1px dashed ${border}`
              }} />
              {[0, 1].map(side => (
                <div key={side} style={{
                  position: "absolute", top: -6, width: 12, height: 12, borderRadius: "50%",
                  background: "var(--page-behind, transparent)", border: `1px solid ${border}`,
                  left: side === 0 ? -6 : "auto", right: side === 1 ? -6 : "auto"
                }} />
              ))}
              <div style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 6, lineHeight: 1.35 }}>{ad.title}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: textMuted, marginBottom: 12 }}>
                <MapPin size={12} /> {ad.town}, {ad.district}
              </div>
              <div className="mono" style={{ fontSize: 17, fontWeight: 600, color: teal }}>
                Rs {fmt(ad.price)} <span style={{ fontSize: 12, fontWeight: 500, color: textMuted }}>{t[ad.period]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
