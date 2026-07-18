"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, MapPin, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useTheme } from "@/components/ThemeProvider";
import { AuthNav } from "@/components/AuthNav";
import { DistrictField } from "@/components/DistrictField";
import { TownField } from "@/components/TownField";
import { type Period } from "@/lib/data";
import { fetchApprovedAds, type LiveAd } from "@/lib/ads";
import { useCategories } from "@/lib/categories";
import { fmt } from "@/lib/format";
import type { Lang } from "@/lib/i18n";

const dict = {
  en: {
    navCreate: "Create ad",
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
    navCreate: "දැන්වීමක් පළ කරන්න",
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
    navCreate: "விளம்பரம் இடு",
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

type SearchDict = (typeof dict)[Lang];

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchPageInner />
    </Suspense>
  );
}

function SearchPageInner() {
  const { lang, dark, colors } = useTheme();
  const searchParams = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(true);

  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [category, setCategory] = useState("");
  const [district, setDistrict] = useState(() => searchParams.get("district") ?? "");
  const [town, setTown] = useState(() => searchParams.get("town") ?? "");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("newest");
  const [ads, setAds] = useState<LiveAd[]>([]);
  const categories = useCategories();

  useEffect(() => {
    let cancelled = false;
    fetchApprovedAds().then((data) => {
      if (!cancelled) setAds(data);
    });
    return () => { cancelled = true; };
  }, []);

  const t: SearchDict = dict[lang];
  const { surface, text, textMuted, border, gold, teal } = colors;

  const results = useMemo(() => {
    let r = ads.filter(
      (a) =>
        (!query || a.title.toLowerCase().includes(query.toLowerCase())) &&
        (!category || String(a.categoryId) === category) &&
        (!district || a.district === district) &&
        (!town || a.town === town) &&
        (!minPrice || a.price >= Number(minPrice)) &&
        (!maxPrice || a.price <= Number(maxPrice))
    );
    if (sort === "featured") r = [...r].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    if (sort === "oldest") r = [...r].reverse();
    return r;
  }, [ads, query, category, district, town, minPrice, maxPrice, sort]);

  const clearAll = () => {
    setQuery("");
    setCategory("");
    setDistrict("");
    setTown("");
    setMinPrice("");
    setMaxPrice("");
  };

  const fieldStyle: React.CSSProperties = {
    width: "100%", background: dark ? "#141B1F" : "#F8F9FA", border: `1px solid ${border}`,
    borderRadius: 10, padding: "10px 12px", color: text, fontSize: 14, outline: "none",
  };
  const labelStyle: React.CSSProperties = { fontSize: 12.5, fontWeight: 600, color: textMuted, marginBottom: 6, display: "block" };

  return (
    <div style={{ background: colors.bg, color: text, minHeight: "100vh" }}>
      <Navbar
        center={
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: "1 1 320px", background: surface, border: `1px solid ${border}`, borderRadius: 10, padding: "9px 12px" }}>
            <Search size={16} color={textMuted} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.searchPlaceholder}
              style={{ border: "none", outline: "none", background: "transparent", color: text, fontSize: 14, width: "100%" }} />
          </div>
        }
        right={
          <>
            <Link href="/create-ad" className="btn desktop-nav" style={{ background: gold, color: "#1F2937", borderRadius: 10, padding: "9px 16px", fontSize: 13.5, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
              {t.navCreate}
            </Link>
            <AuthNav />
          </>
        }
      />

      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <div className="disp" style={{ fontSize: 20, fontWeight: 600 }}>{results.length} {t.resultsFor}</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button className="btn" onClick={() => setFiltersOpen(!filtersOpen)} style={{ display: "none", alignItems: "center", gap: 6, background: surface, border: `1px solid ${border}`, borderRadius: 10, padding: "8px 12px", color: text, fontSize: 13.5 }}>
              <SlidersHorizontal size={15} /> {t.filters}
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: surface, border: `1px solid ${border}`, borderRadius: 10, padding: "8px 12px" }}>
              <ArrowUpDown size={14} color={textMuted} />
              <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ border: "none", outline: "none", background: "transparent", color: text, fontSize: 13.5 }}>
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
            <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ ...fieldStyle, marginBottom: 16 }}>
              <option value="">{t.allCategories}</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c[`name_${lang}`]}</option>)}
            </select>

            <label style={labelStyle}>{t.district}</label>
            <div style={{ marginBottom: 16 }}>
              <DistrictField value={district} onChange={(v) => { setDistrict(v); setTown(""); }} placeholder={t.allDistricts} inputStyle={fieldStyle} />
            </div>

            <label style={labelStyle}>{t.town}</label>
            <div style={{ marginBottom: 16 }}>
              <TownField district={district} value={town} onChange={setTown} placeholder={t.allTowns} disabled={!district} inputStyle={{ ...fieldStyle, opacity: district ? 1 : 0.5 }} />
            </div>

            <label style={labelStyle}>{t.minPrice}</label>
            <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="0" style={{ ...fieldStyle, marginBottom: 16 }} />

            <label style={labelStyle}>{t.maxPrice}</label>
            <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="50000" style={{ ...fieldStyle, marginBottom: 4 }} />
          </aside>

          <div>
            {results.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 20px", background: surface, border: `1px dashed ${border}`, borderRadius: 16 }}>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{t.noResults}</div>
                <div style={{ fontSize: 14, color: textMuted }}>{t.noResultsSub}</div>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 18 }}>
                {results.map((ad) => (
                  <Link key={ad.id} href={`/ads/${ad.id}`} className="card-hover" style={{ background: surface, border: `1px solid ${border}`, borderRadius: 18, overflow: "hidden", cursor: "pointer", textDecoration: "none", color: "inherit", display: "block" }}>
                    <div style={{ position: "relative" }}>
                      <img src={ad.images[0]} alt={ad.title} style={{ width: "100%", height: 148, objectFit: "cover", display: "block" }} />
                      {ad.featured && <span style={{ position: "absolute", top: 10, left: 10, background: gold, color: "#1F2937", fontSize: 11, fontWeight: 700, padding: "4px 9px", borderRadius: 8 }}>FEATURED</span>}
                      <span style={{ position: "absolute", top: 10, right: 10, background: dark ? "rgba(16,22,26,0.85)" : "rgba(255,255,255,0.9)", fontSize: 10.5, fontWeight: 600, padding: "4px 9px", borderRadius: 8, color: ad.condition === "new" ? "#0F3D3E" : "#6B7280" }}>
                        {ad.condition === "new" ? t.conditionNew : t.condition}
                      </span>
                    </div>
                    <div style={{ padding: "16px" }}>
                      <div style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 6, lineHeight: 1.35 }}>{ad.title}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: textMuted, marginBottom: 12 }}>
                        <MapPin size={12} /> {ad.town}, {ad.district}
                      </div>
                      <div className="mono" style={{ fontSize: 17, fontWeight: 600, color: teal }}>
                        Rs {fmt(ad.price)} <span style={{ fontSize: 12, fontWeight: 500, color: textMuted }}>{t[ad.period as Period]}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 860px) { .filters-col { display: none !important; } .filters-col.open { display: block !important; } }`}</style>
    </div>
  );
}
