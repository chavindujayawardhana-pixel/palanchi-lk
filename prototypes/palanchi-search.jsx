import React, { useState, useMemo } from "react";
import {
  Search, MapPin, Sun, Moon, ChevronDown, SlidersHorizontal, X,
  Wrench, Zap, Truck, Container, Tractor, HardHat, Cable, PartyPopper,
  Layers3, Fence, Globe, Star, ArrowUpDown
} from "lucide-react";

const LANGS = { en: "English", si: "සිංහල", ta: "தமிழ்" };

const dict = {
  en: {
    navHome: "Home", navCreate: "Create ad", navContact: "Contact", login: "Log in", register: "Register",
    resultsFor: "results", filters: "Filters", category: "Category", district: "District", town: "Town",
    minPrice: "Min price", maxPrice: "Max price", sortBy: "Sort by",
    newest: "Newest", oldest: "Oldest", featuredSort: "Featured",
    apply: "Apply filters", clear: "Clear all", allCategories: "All categories", allDistricts: "All districts", allTowns: "All towns",
    perDay: "/ day", perHour: "/ hour", perWeek: "/ week", perMonth: "/ month",
    condition: "Used", conditionNew: "New", noResults: "No listings match your filters",
    noResultsSub: "Try widening your search or clearing a filter.",
    searchPlaceholder: "Search title or description...",
  },
  si: {
    navHome: "මුල් පිටුව", navCreate: "දැන්වීමක් පළ කරන්න", navContact: "අමතන්න", login: "පිවිසෙන්න", register: "ලියාපදිංචි වන්න",
    resultsFor: "ප්‍රතිඵල", filters: "පෙරහන්", category: "කාණ්ඩය", district: "දිස්ත්‍රික්කය", town: "නගරය",
    minPrice: "අවම මිල", maxPrice: "උපරිම මිල", sortBy: "අනුපිළිවෙල",
    newest: "අලුත්ම", oldest: "පැරණිතම", featuredSort: "විශේෂාංගිත",
    apply: "පෙරහන් යොදන්න", clear: "සියල්ල ඉවත් කරන්න", allCategories: "සියලු කාණ්ඩ", allDistricts: "සියලු දිස්ත්‍රික්ක", allTowns: "සියලු නගර",
    perDay: "/ දිනකට", perHour: "/ පැයකට", perWeek: "/ සතියකට", perMonth: "/ මාසයකට",
    condition: "පරණ", conditionNew: "අලුත්", noResults: "ඔබේ පෙරහන්වලට ගැලපෙන දැන්වීම් නැත",
    noResultsSub: "ඔබේ සෙවීම පුළුල් කරන්න හෝ පෙරහනක් ඉවත් කරන්න.",
    searchPlaceholder: "මාතෘකාව හෝ විස්තරය සොයන්න...",
  },
  ta: {
    navHome: "முகப்பு", navCreate: "விளம்பரம் இடு", navContact: "தொடர்பு", login: "உள்நுழை", register: "பதிவு செய்க",
    resultsFor: "முடிவுகள்", filters: "வடிகட்டிகள்", category: "வகை", district: "மாவட்டம்", town: "நகரம்",
    minPrice: "குறைந்த விலை", maxPrice: "அதிக விலை", sortBy: "வரிசைப்படுத்து",
    newest: "புதியது", oldest: "பழையது", featuredSort: "சிறப்பு",
    apply: "வடிகட்டிகளை பயன்படுத்து", clear: "அனைத்தையும் அழி", allCategories: "அனைத்து வகைகள்", allDistricts: "அனைத்து மாவட்டங்கள்", allTowns: "அனைத்து நகரங்கள்",
    perDay: "/ நாள்", perHour: "/ மணி", perWeek: "/ வாரம்", perMonth: "/ மாதம்",
    condition: "பழையது", conditionNew: "புதியது", noResults: "உங்கள் வடிகட்டிகளுக்கு பொருந்தும் விளம்பரங்கள் இல்லை",
    noResultsSub: "உங்கள் தேடலை விரிவுபடுத்தவும் அல்லது வடிகட்டியை அழிக்கவும்.",
    searchPlaceholder: "தலைப்பு அல்லது விளக்கத்தை தேடுங்கள்...",
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

const DISTRICTS = ["Colombo", "Gampaha", "Kandy", "Galle", "Matara", "Kurunegala", "Jaffna", "Anuradhapura", "Ratnapura", "Badulla"];
const TOWNS = {
  Colombo: ["Colombo 01", "Kaduwela", "Nugegoda", "Homagama", "Maharagama"],
  Gampaha: ["Negombo", "Ja-Ela", "Wattala", "Gampaha Town", "Minuwangoda"],
  Kandy: ["Kandy Town", "Peradeniya", "Gampola", "Katugastota"],
  Galle: ["Galle Town", "Hikkaduwa", "Ambalangoda"],
  Matara: ["Matara Town", "Weligama", "Akuressa"],
  Kurunegala: ["Kurunegala Town", "Kuliyapitiya", "Narammala"],
  Jaffna: ["Jaffna Town", "Chavakachcheri", "Point Pedro"],
  Anuradhapura: ["Anuradhapura Town", "Kekirawa"],
  Ratnapura: ["Ratnapura Town", "Balangoda"],
  Badulla: ["Badulla Town", "Bandarawela"],
};

const ADS = [
  { id: 1, title: "20 kVA Diesel Generator", cat: "generators", price: 4500, period: "perDay", town: "Kaduwela", district: "Colombo", cond: "used", featured: true, img: "https://picsum.photos/seed/genset1/600/450" },
  { id: 2, title: "Steel Cup-Lock Scaffolding Set", cat: "scaffolding", price: 12000, period: "perWeek", town: "Kandy Town", district: "Kandy", cond: "used", featured: true, img: "https://picsum.photos/seed/scaffold2/600/450" },
  { id: 3, title: "JCB 3DX Backhoe Loader", cat: "excavators", price: 18500, period: "perDay", town: "Negombo", district: "Gampaha", cond: "used", featured: true, img: "https://picsum.photos/seed/backhoe3/600/450" },
  { id: 4, title: "Bosch Rotary Hammer Drill", cat: "powertools", price: 950, period: "perDay", town: "Matara Town", district: "Matara", cond: "new", featured: false, img: "https://picsum.photos/seed/drill4/600/450" },
  { id: 5, title: "20ft Storage Container", cat: "containers", price: 9000, period: "perMonth", town: "Ja-Ela", district: "Gampaha", cond: "used", featured: false, img: "https://picsum.photos/seed/container5/600/450" },
  { id: 6, title: "Mini Tipper Truck 3T", cat: "vehicles", price: 7200, period: "perDay", town: "Galle Town", district: "Galle", cond: "used", featured: false, img: "https://picsum.photos/seed/tipper6/600/450" },
  { id: 7, title: "PA Sound System, 2 Speakers", cat: "event", price: 6000, period: "perDay", town: "Nugegoda", district: "Colombo", cond: "new", featured: false, img: "https://picsum.photos/seed/sound7/600/450" },
  { id: 8, title: "Portable Welding Machine", cat: "electrical", price: 1800, period: "perDay", town: "Kurunegala Town", district: "Kurunegala", cond: "used", featured: false, img: "https://picsum.photos/seed/weld8/600/450" },
  { id: 9, title: "Concrete Mixer 500L", cat: "construction", price: 3200, period: "perDay", town: "Colombo 01", district: "Colombo", cond: "used", featured: false, img: "https://picsum.photos/seed/mixer9/600/450" },
  { id: 10, title: "Mini Excavator 1.5T", cat: "excavators", price: 9800, period: "perDay", town: "Peradeniya", district: "Kandy", cond: "new", featured: true, img: "https://picsum.photos/seed/excav10/600/450" },
  { id: 11, title: "Angle Grinder Set (3pc)", cat: "powertools", price: 600, period: "perDay", town: "Homagama", district: "Colombo", cond: "used", featured: false, img: "https://picsum.photos/seed/grinder11/600/450" },
  { id: 12, title: "10ft Refrigerated Container", cat: "containers", price: 14000, period: "perMonth", town: "Wattala", district: "Gampaha", cond: "used", featured: false, img: "https://picsum.photos/seed/reefer12/600/450" },
];

function fmt(n) { return new Intl.NumberFormat("en-LK").format(n); }

export default function PalanchiSearch() {
  const [lang, setLang] = useState("en");
  const [dark, setDark] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(true);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [district, setDistrict] = useState("");
  const [town, setTown] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("newest");

  const t = dict[lang];

  const bg = dark ? "#10161A" : "#F8F9FA";
  const surface = dark ? "#1A2226" : "#FFFFFF";
  const text = dark ? "#F3F4F6" : "#1F2937";
  const textMuted = dark ? "#9CA3AF" : "#6B7280";
  const border = dark ? "#2A343A" : "#E7E5DE";
  const gold = "#F4B400";
  const teal = dark ? "#1D9E75" : "#0F3D3E";

  const results = useMemo(() => {
    let r = ADS.filter(a =>
      (!query || a.title.toLowerCase().includes(query.toLowerCase())) &&
      (!category || a.cat === category) &&
      (!district || a.district === district) &&
      (!town || a.town === town) &&
      (!minPrice || a.price >= Number(minPrice)) &&
      (!maxPrice || a.price <= Number(maxPrice))
    );
    if (sort === "featured") r = [...r].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    if (sort === "oldest") r = [...r].reverse();
    return r;
  }, [query, category, district, town, minPrice, maxPrice, sort]);

  const clearAll = () => { setQuery(""); setCategory(""); setDistrict(""); setTown(""); setMinPrice(""); setMaxPrice(""); };

  const fieldStyle = {
    width: "100%", background: dark ? "#141B1F" : "#F8F9FA", border: `1px solid ${border}`,
    borderRadius: 10, padding: "10px 12px", color: text, fontSize: 14, outline: "none"
  };
  const labelStyle = { fontSize: 12.5, fontWeight: 600, color: textMuted, marginBottom: 6, display: "block" };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: bg, color: text, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap');
        * { box-sizing: border-box; }
        .disp { font-family: 'Space Grotesk', sans-serif; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .btn { cursor:pointer; border:none; transition: transform .15s, background .2s; }
        .btn:active { transform: scale(0.97); }
        .card-hover { transition: transform .25s ease, box-shadow .25s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(0,0,0,0.10); }
        ::placeholder { color: ${textMuted}; }
        @media (max-width: 860px) { .filters-col { display: none !important; } .filters-col.open { display: block !important; } }
      `}</style>

      <header style={{ position: "sticky", top: 0, zIndex: 50, background: dark ? "rgba(16,22,26,0.9)" : "rgba(255,255,255,0.9)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div className="disp" style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 20 }}>
            <div style={{ width: 30, height: 30, borderRadius: 9, background: gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Wrench size={16} color="#1F2937" />
            </div>
            Palanchi<span style={{ color: gold }}>.lk</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: "1 1 320px", background: surface, border: `1px solid ${border}`, borderRadius: 10, padding: "9px 12px" }}>
            <Search size={16} color={textMuted} />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder={t.searchPlaceholder}
              style={{ border: "none", outline: "none", background: "transparent", color: text, fontSize: 14, width: "100%" }} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ position: "relative" }}>
              <button className="btn" onClick={() => setLangOpen(!langOpen)} style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: `1px solid ${border}`, borderRadius: 10, padding: "8px 12px", color: text, fontSize: 13.5 }}>
                <Globe size={15} /> {LANGS[lang]} <ChevronDown size={13} />
              </button>
              {langOpen && (
                <div style={{ position: "absolute", top: 42, right: 0, background: surface, border: `1px solid ${border}`, borderRadius: 10, overflow: "hidden", minWidth: 130, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 60 }}>
                  {Object.entries(LANGS).map(([code, label]) => (
                    <div key={code} onClick={() => { setLang(code); setLangOpen(false); }}
                      style={{ padding: "10px 14px", cursor: "pointer", background: lang === code ? (dark ? "#233038" : "#FFF7E0") : "transparent", fontSize: 13.5 }}>{label}</div>
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

      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <div className="disp" style={{ fontSize: 20, fontWeight: 600 }}>{results.length} {t.resultsFor}</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button className="btn" onClick={() => setFiltersOpen(!filtersOpen)} style={{ display: "none", alignItems: "center", gap: 6, background: surface, border: `1px solid ${border}`, borderRadius: 10, padding: "8px 12px", color: text, fontSize: 13.5 }}>
              <SlidersHorizontal size={15} /> {t.filters}
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: surface, border: `1px solid ${border}`, borderRadius: 10, padding: "8px 12px" }}>
              <ArrowUpDown size={14} color={textMuted} />
              <select value={sort} onChange={e => setSort(e.target.value)} style={{ border: "none", outline: "none", background: "transparent", color: text, fontSize: 13.5 }}>
                <option value="newest">{t.newest}</option>
                <option value="oldest">{t.oldest}</option>
                <option value="featured">{t.featuredSort}</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 24, alignItems: "start" }} className="layout">
          <aside className={"filters-col" + (filtersOpen ? " open" : "")} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 20, position: "sticky", top: 88 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div className="disp" style={{ fontWeight: 600, fontSize: 15 }}>{t.filters}</div>
              <button onClick={clearAll} style={{ background: "none", border: "none", color: teal, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>{t.clear}</button>
            </div>

            <label style={labelStyle}>{t.category}</label>
            <select value={category} onChange={e => setCategory(e.target.value)} style={{ ...fieldStyle, marginBottom: 16 }}>
              <option value="">{t.allCategories}</option>
              {CATEGORIES.map(c => <option key={c.key} value={c.key}>{c[lang]}</option>)}
            </select>

            <label style={labelStyle}>{t.district}</label>
            <select value={district} onChange={e => { setDistrict(e.target.value); setTown(""); }} style={{ ...fieldStyle, marginBottom: 16 }}>
              <option value="">{t.allDistricts}</option>
              {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>

            <label style={labelStyle}>{t.town}</label>
            <select value={town} onChange={e => setTown(e.target.value)} disabled={!district} style={{ ...fieldStyle, marginBottom: 16, opacity: district ? 1 : 0.5 }}>
              <option value="">{t.allTowns}</option>
              {(TOWNS[district] || []).map(tn => <option key={tn} value={tn}>{tn}</option>)}
            </select>

            <label style={labelStyle}>{t.minPrice}</label>
            <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="0" style={{ ...fieldStyle, marginBottom: 16 }} />

            <label style={labelStyle}>{t.maxPrice}</label>
            <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="50000" style={{ ...fieldStyle, marginBottom: 4 }} />
          </aside>

          <div>
            {results.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 20px", background: surface, border: `1px dashed ${border}`, borderRadius: 16 }}>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{t.noResults}</div>
                <div style={{ fontSize: 14, color: textMuted }}>{t.noResultsSub}</div>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 18 }}>
                {results.map(ad => (
                  <div key={ad.id} className="card-hover" style={{ background: surface, border: `1px solid ${border}`, borderRadius: 18, overflow: "hidden", cursor: "pointer" }}>
                    <div style={{ position: "relative" }}>
                      <img src={ad.img} alt={ad.title} style={{ width: "100%", height: 148, objectFit: "cover", display: "block" }} />
                      {ad.featured && <span style={{ position: "absolute", top: 10, left: 10, background: gold, color: "#1F2937", fontSize: 11, fontWeight: 700, padding: "4px 9px", borderRadius: 8 }}>FEATURED</span>}
                      <span style={{ position: "absolute", top: 10, right: 10, background: dark ? "rgba(16,22,26,0.85)" : "rgba(255,255,255,0.9)", fontSize: 10.5, fontWeight: 600, padding: "4px 9px", borderRadius: 8, color: ad.cond === "new" ? "#0F3D3E" : "#6B7280" }}>
                        {ad.cond === "new" ? t.conditionNew : t.condition}
                      </span>
                    </div>
                    <div style={{ padding: "16px" }}>
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
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
