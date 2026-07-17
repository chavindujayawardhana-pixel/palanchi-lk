"use client";

import { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard, FileText, Users, Tag, Settings, LogOut, Search, Check, X,
  Trash2, Star, Ban, Clock, CheckCircle2, XCircle, Sparkles, Menu, Eye, ImageOff,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid,
} from "recharts";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { useTheme } from "@/components/ThemeProvider";
import { fmt } from "@/lib/format";
import type { AdStatus } from "@/lib/ads";

const dict = {
  en: {
    dashboard: "Dashboard", ads: "Advertisements", usersNav: "Users", categoriesNav: "Categories", settingsNav: "Settings", logout: "Log out",
    overview: "Overview", welcomeBack: "Here's what's happening with Palanchi.lk today.",
    totalUsers: "Total users", pendingAds: "Pending ads", approvedAds: "Approved ads", rejectedAds: "Rejected ads", featuredAds: "Featured ads", totalCategories: "Categories",
    adsOverTime: "Advertisements over time", adsByCategory: "Ads by category",
    latestUsers: "Latest users", latestAds: "Latest advertisements", viewAll: "View all",
    joined: "Joined", status: "Status", actions: "Actions",
    pending: "Pending", approved: "Approved", rejected: "Rejected", suspended: "Suspended",
    approve: "Approve", reject: "Reject", deleteA: "Delete", suspend: "Suspend", feature: "Feature", unfeature: "Unfeature",
    searchPh: "Search ads or users...",
    manageAds: "Manage advertisements", manageUsers: "Manage users", manageCategories: "Manage categories",
    listing: "Listing", user: "User", category: "Category", location: "Location", price: "Price", date: "Date",
    confirmDelete: "Delete this listing? This cannot be undone.", cancel: "Cancel", confirm: "Confirm",
    addCategory: "Add category", categoryName: "Category name", adCount: "Ads",
    adminPanel: "ADMIN PANEL", nameCol: "Name", emailCol: "Email", townCol: "Town",
    settingsPlaceholder: "Settings — prototype placeholder",
    adminLoginTitle: "Admin sign in", adminLoginSub: "Enter the admin password to manage Palanchi.lk.",
    passwordLabel: "Password", passwordPh: "Enter password", loginBtn: "Sign in", wrongPassword: "Incorrect password",
    view: "View", noPhotos: "No photos", quantity: "Quantity", condition: "Condition", condNew: "New", condUsed: "Used",
    description: "Description", contactDetails: "Contact details", contactName: "Contact name", phone: "Phone",
    whatsapp: "WhatsApp", email: "Email", close: "Close",
  },
  si: {
    dashboard: "ඩෑෂ්බෝඩ්", ads: "දැන්වීම්", usersNav: "පරිශීලකයන්", categoriesNav: "කාණ්ඩ", settingsNav: "සැකසුම්", logout: "ඉවත් වන්න",
    overview: "දළ විශ්ලේෂණය", welcomeBack: "අද Palanchi.lk හි සිදුවෙමින් පවතින දේ මෙන්න.",
    totalUsers: "මුළු පරිශීලකයන්", pendingAds: "අපේක්ෂිත දැන්වීම්", approvedAds: "අනුමත දැන්වීම්", rejectedAds: "ප්‍රතික්ෂේපිත දැන්වීම්", featuredAds: "විශේෂාංගිත දැන්වීම්", totalCategories: "කාණ්ඩ",
    adsOverTime: "කාලයත් සමඟ දැන්වීම්", adsByCategory: "කාණ්ඩ අනුව දැන්වීම්",
    latestUsers: "නවතම පරිශීලකයන්", latestAds: "නවතම දැන්වීම්", viewAll: "සියල්ල බලන්න",
    joined: "එකතු වූ දිනය", status: "තත්ත්වය", actions: "ක්‍රියා",
    pending: "අපේක්ෂිත", approved: "අනුමතයි", rejected: "ප්‍රතික්ෂේපිතයි", suspended: "අත්හිටුවා ඇත",
    approve: "අනුමත කරන්න", reject: "ප්‍රතික්ෂේප කරන්න", deleteA: "මකන්න", suspend: "අත්හිටුවන්න", feature: "විශේෂාංගිත කරන්න", unfeature: "විශේෂාංග ඉවත් කරන්න",
    searchPh: "දැන්වීම් හෝ පරිශීලකයන් සොයන්න...",
    manageAds: "දැන්වීම් කළමනාකරණය", manageUsers: "පරිශීලකයන් කළමනාකරණය", manageCategories: "කාණ්ඩ කළමනාකරණය",
    listing: "දැන්වීම", user: "පරිශීලකයා", category: "කාණ්ඩය", location: "ස්ථානය", price: "මිල", date: "දිනය",
    confirmDelete: "මෙම දැන්වීම මකන්නද? මෙය අහෝසි කළ නොහැක.", cancel: "අවලංගු කරන්න", confirm: "තහවුරු කරන්න",
    addCategory: "කාණ්ඩයක් එකතු කරන්න", categoryName: "කාණ්ඩයේ නම", adCount: "දැන්වීම්",
    adminPanel: "පරිපාලක පැනලය", nameCol: "නම", emailCol: "විද්‍යුත් තැපෑල", townCol: "නගරය",
    settingsPlaceholder: "සැකසුම් — මූලාකෘති ස්ථානගත කරන්නා",
    adminLoginTitle: "පරිපාලක පිවිසුම", adminLoginSub: "Palanchi.lk කළමනාකරණය කිරීමට පරිපාලක මුරපදය ඇතුළත් කරන්න.",
    passwordLabel: "මුරපදය", passwordPh: "මුරපදය ඇතුළත් කරන්න", loginBtn: "පිවිසෙන්න", wrongPassword: "වැරදි මුරපදයකි",
    view: "බලන්න", noPhotos: "ඡායාරූප නැත", quantity: "ප්‍රමාණය", condition: "තත්ත්වය", condNew: "අලුත්", condUsed: "පරණ",
    description: "විස්තරය", contactDetails: "සම්බන්ධතා විස්තර", contactName: "සම්බන්ධතා නම", phone: "දුරකථනය",
    whatsapp: "WhatsApp", email: "විද්‍යුත් තැපෑල", close: "වසන්න",
  },
  ta: {
    dashboard: "டாஷ்போர்டு", ads: "விளம்பரங்கள்", usersNav: "பயனர்கள்", categoriesNav: "வகைகள்", settingsNav: "அமைப்புகள்", logout: "வெளியேறு",
    overview: "மேலோட்டம்", welcomeBack: "இன்று Palanchi.lk இல் நடப்பது இதோ.",
    totalUsers: "மொத்த பயனர்கள்", pendingAds: "நிலுவையிலுள்ள விளம்பரங்கள்", approvedAds: "அங்கீகரிக்கப்பட்ட விளம்பரங்கள்", rejectedAds: "நிராகரிக்கப்பட்ட விளம்பரங்கள்", featuredAds: "சிறப்பு விளம்பரங்கள்", totalCategories: "வகைகள்",
    adsOverTime: "காலப்போக்கில் விளம்பரங்கள்", adsByCategory: "வகை வாரியான விளம்பரங்கள்",
    latestUsers: "புதிய பயனர்கள்", latestAds: "புதிய விளம்பரங்கள்", viewAll: "அனைத்தையும் பார்க்க",
    joined: "சேர்ந்த தேதி", status: "நிலை", actions: "செயல்கள்",
    pending: "நிலுவையில்", approved: "அங்கீகரிக்கப்பட்டது", rejected: "நிராகரிக்கப்பட்டது", suspended: "இடைநிறுத்தப்பட்டது",
    approve: "அங்கீகரி", reject: "நிராகரி", deleteA: "நீக்கு", suspend: "இடைநிறுத்து", feature: "சிறப்பித்து காட்டு", unfeature: "சிறப்பை நீக்கு",
    searchPh: "விளம்பரங்கள் அல்லது பயனர்களை தேடுங்கள்...",
    manageAds: "விளம்பரங்களை நிர்வகி", manageUsers: "பயனர்களை நிர்வகி", manageCategories: "வகைகளை நிர்வகி",
    listing: "பட்டியல்", user: "பயனர்", category: "வகை", location: "இடம்", price: "விலை", date: "தேதி",
    confirmDelete: "இந்த பட்டியலை நீக்கவா? இதை மீட்டெடுக்க முடியாது.", cancel: "ரத்து செய்", confirm: "உறுதிப்படுத்து",
    addCategory: "வகையைச் சேர்", categoryName: "வகையின் பெயர்", adCount: "விளம்பரங்கள்",
    adminPanel: "நிர்வாக பலகம்", nameCol: "பெயர்", emailCol: "மின்னஞ்சல்", townCol: "நகரம்",
    settingsPlaceholder: "அமைப்புகள் — மாதிரி ஒதுக்கிடம்",
    adminLoginTitle: "நிர்வாக உள்நுழைவு", adminLoginSub: "Palanchi.lk ஐ நிர்வகிக்க நிர்வாக கடவுச்சொல்லை உள்ளிடவும்.",
    passwordLabel: "கடவுச்சொல்", passwordPh: "கடவுச்சொல்லை உள்ளிடவும்", loginBtn: "உள்நுழை", wrongPassword: "தவறான கடவுச்சொல்",
    view: "பார்வை", noPhotos: "புகைப்படங்கள் இல்லை", quantity: "அளவு", condition: "நிலை", condNew: "புதியது", condUsed: "பழையது",
    description: "விளக்கம்", contactDetails: "தொடர்பு விவரங்கள்", contactName: "தொடர்பு பெயர்", phone: "தொலைபேசி",
    whatsapp: "WhatsApp", email: "மின்னஞ்சல்", close: "மூடு",
  },
};

interface AdminAd {
  id: string;
  title: string;
  description: string;
  user: string;
  phone: string;
  whatsapp: string | null;
  email: string | null;
  district: string;
  town: string;
  categoryName: { name_en: string; name_si: string; name_ta: string } | null;
  price: number;
  period: string;
  quantity: number;
  condition: string;
  date: string;
  status: AdStatus;
  featured: boolean;
  images: string[];
}

interface AdminAdRow {
  id: string;
  title: string;
  description: string | null;
  contact_name: string;
  phone: string;
  whatsapp: string | null;
  email: string | null;
  district: string;
  town: string;
  price: number;
  rental_period: string;
  quantity: number;
  condition: string;
  status: AdStatus;
  featured: boolean;
  created_at: string;
  categories: { name_en: string; name_si: string; name_ta: string } | null;
  advertisement_images: { image_url: string; is_cover: boolean; sort_order: number }[] | null;
}

function mapAdminAdRow(row: AdminAdRow): AdminAd {
  const images = (row.advertisement_images ?? [])
    .slice()
    .sort((a, b) => (a.is_cover === b.is_cover ? a.sort_order - b.sort_order : a.is_cover ? -1 : 1))
    .map((img) => img.image_url);
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? "",
    user: row.contact_name,
    phone: row.phone,
    whatsapp: row.whatsapp,
    email: row.email,
    district: row.district,
    town: row.town,
    categoryName: row.categories,
    price: Number(row.price),
    period: row.rental_period,
    quantity: row.quantity,
    condition: row.condition,
    date: row.created_at.slice(0, 10),
    status: row.status,
    featured: row.featured,
    images,
  };
}

const USERS = [
  { id: 1, name: "Nadeesha Perera", email: "nadeesha@mail.com", town: "Kaduwela", joined: "2026-07-14", ads: 3 },
  { id: 2, name: "Suresh Kumara", email: "suresh@mail.com", town: "Kandy Town", joined: "2026-07-13", ads: 1 },
  { id: 3, name: "Fathima Rizvi", email: "fathima@mail.com", town: "Negombo", joined: "2026-07-12", ads: 2 },
  { id: 4, name: "Kasun De Silva", email: "kasun@mail.com", town: "Matara Town", joined: "2026-07-10", ads: 1 },
  { id: 5, name: "Amara Senanayake", email: "amara@mail.com", town: "Ja-Ela", joined: "2026-07-08", ads: 1 },
];

const CATS = [
  { name: "Scaffolding", count: 24 }, { name: "Construction equipment", count: 41 }, { name: "Generators", count: 18 },
  { name: "Power tools", count: 33 }, { name: "Excavators", count: 12 }, { name: "Containers", count: 9 },
  { name: "Vehicles", count: 27 }, { name: "Event equipment", count: 15 }, { name: "Others", count: 7 },
];

const TREND = [
  { d: "Jul 08", ads: 12 }, { d: "Jul 09", ads: 18 }, { d: "Jul 10", ads: 15 }, { d: "Jul 11", ads: 22 },
  { d: "Jul 12", ads: 19 }, { d: "Jul 13", ads: 27 }, { d: "Jul 14", ads: 24 },
];

export default function AdminPage() {
  const { lang, dark, colors } = useTheme();
  const [nav, setNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [ads, setAds] = useState<AdminAd[]>([]);
  const [search, setSearch] = useState("");
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [viewAd, setViewAd] = useState<AdminAd | null>(null);
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  const t = dict[lang];
  const { bg, surface, text, textMuted, border, gold, teal, danger, success } = colors;

  async function loadAds() {
    const res = await fetch("/api/admin/ads");
    if (res.status === 401) {
      setAuthed(false);
      return;
    }
    if (res.ok) {
      const json = await res.json();
      setAds((json.ads as AdminAdRow[]).map(mapAdminAdRow));
      setAuthed(true);
    }
  }

  useEffect(() => {
    loadAds();
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError(false);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoggingIn(false);
    if (res.ok) {
      setPassword("");
      await loadAds();
    } else {
      setLoginError(true);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setAds([]);
  }

  const stats = useMemo(
    () => ({
      users: USERS.length + 214,
      pending: ads.filter((a) => a.status === "pending").length,
      approved: ads.filter((a) => a.status === "approved").length,
      rejected: ads.filter((a) => a.status === "rejected").length,
      featured: ads.filter((a) => a.featured).length,
      categories: CATS.length,
    }),
    [ads]
  );

  const filteredAds = ads.filter(
    (a) => !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.user.toLowerCase().includes(search.toLowerCase())
  );

  async function setStatus(id: string, status: AdStatus) {
    const res = await fetch(`/api/admin/ads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) setAds((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  }
  async function toggleFeature(id: string) {
    const ad = ads.find((a) => a.id === id);
    if (!ad) return;
    const featured = !ad.featured;
    const res = await fetch(`/api/admin/ads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured }),
    });
    if (res.ok) setAds((prev) => prev.map((a) => (a.id === id ? { ...a, featured } : a)));
  }
  async function doDelete(id: string) {
    const res = await fetch(`/api/admin/ads/${id}`, { method: "DELETE" });
    if (res.ok) setAds((prev) => prev.filter((a) => a.id !== id));
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

  const navItems: { key: string; label: string; icon: LucideIcon }[] = [
    { key: "dashboard", label: t.dashboard, icon: LayoutDashboard },
    { key: "ads", label: t.ads, icon: FileText },
    { key: "users", label: t.usersNav, icon: Users },
    { key: "categories", label: t.categoriesNav, icon: Tag },
    { key: "settings", label: t.settingsNav, icon: Settings },
  ];

  if (authed === null) return null;

  if (!authed) {
    return (
      <div style={{ background: bg, color: text, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <form onSubmit={handleLogin} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 18, padding: 32, maxWidth: 360, width: "100%" }}>
          <h1 className="disp" style={{ fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>{t.adminLoginTitle}</h1>
          <p style={{ fontSize: 13.5, color: textMuted, margin: "0 0 20px" }}>{t.adminLoginSub}</p>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, display: "block" }}>{t.passwordLabel}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.passwordPh}
            style={{ width: "100%", background: dark ? "#141B1F" : "#F8F9FA", border: `1px solid ${border}`, borderRadius: 10, padding: "11px 13px", color: text, fontSize: 14.5, outline: "none", marginBottom: loginError ? 8 : 18 }}
          />
          {loginError && <div style={{ fontSize: 12.5, color: danger, marginBottom: 14 }}>{t.wrongPassword}</div>}
          <button type="submit" disabled={loggingIn} className="btn" style={{ width: "100%", background: gold, color: "#1F2937", borderRadius: 12, padding: "13px", fontWeight: 600, fontSize: 15, opacity: loggingIn ? 0.7 : 1 }}>
            {t.loginBtn}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ background: bg, color: text, minHeight: "100vh", display: "flex" }}>
      {/* SIDEBAR */}
      <aside style={{
        width: sidebarOpen ? 230 : 0, overflow: "hidden", background: surface, borderRight: `1px solid ${border}`,
        transition: "width .25s", flexShrink: 0, position: "sticky", top: 0, height: "100vh", display: "flex", flexDirection: "column",
      }}>
        <div style={{ padding: "20px 20px 16px", display: "flex", alignItems: "center", gap: 8 }}>
          <Logo boxSize={30} iconSize={16} fontSize={17} />
        </div>
        <div style={{ fontSize: 11, fontWeight: 600, color: textMuted, letterSpacing: 0.5, padding: "10px 20px 6px", whiteSpace: "nowrap" }}>{t.adminPanel}</div>
        <nav style={{ flex: 1, padding: "4px 12px" }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = nav === item.key;
            return (
              <div key={item.key} onClick={() => setNav(item.key)} className="btn" style={{
                display: "flex", alignItems: "center", gap: 11, padding: "10px 12px", borderRadius: 10, marginBottom: 3,
                background: active ? (dark ? "#233038" : "#FFF7E0") : "transparent",
                color: active ? gold : text, fontSize: 14, fontWeight: active ? 600 : 500, whiteSpace: "nowrap",
              }}>
                <Icon size={17} /> {item.label}
              </div>
            );
          })}
        </nav>
        <div style={{ padding: 12, borderTop: `1px solid ${border}` }}>
          <div onClick={handleLogout} className="btn" style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 12px", borderRadius: 10, color: textMuted, fontSize: 14, whiteSpace: "nowrap" }}>
            <LogOut size={17} /> {t.logout}
          </div>
        </div>
      </aside>

      <div style={{ flex: 1, minWidth: 0 }}>
        {/* TOPBAR */}
        <header style={{ position: "sticky", top: 0, zIndex: 40, background: dark ? "rgba(16,22,26,0.9)" : "rgba(255,255,255,0.9)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${border}` }}>
          <div style={{ padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <button className="btn" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "transparent", border: `1px solid ${border}`, borderRadius: 9, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", color: text }}>
                <Menu size={16} />
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: surface, border: `1px solid ${border}`, borderRadius: 10, padding: "8px 12px", minWidth: 220 }}>
                <Search size={15} color={textMuted} />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.searchPh} style={{ border: "none", outline: "none", background: "transparent", color: text, fontSize: 13.5, width: "100%" }} />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <LanguageSwitcher />
              <DarkModeToggle />
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: teal, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600 }}>AD</div>
            </div>
          </div>
        </header>

        <main style={{ padding: 24 }}>
          {nav === "dashboard" && (
            <>
              <h1 className="disp" style={{ fontSize: 24, fontWeight: 700, margin: "0 0 4px" }}>{t.overview}</h1>
              <p style={{ fontSize: 14, color: textMuted, margin: "0 0 24px" }}>{t.welcomeBack}</p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14, marginBottom: 24 }}>
                <StatCard label={t.totalUsers} value={fmt(stats.users)} icon={Users} color={teal} />
                <StatCard label={t.pendingAds} value={stats.pending} icon={Clock} color="#854F0B" />
                <StatCard label={t.approvedAds} value={stats.approved} icon={CheckCircle2} color={success} />
                <StatCard label={t.rejectedAds} value={stats.rejected} icon={XCircle} color={danger} />
                <StatCard label={t.featuredAds} value={stats.featured} icon={Sparkles} color={gold} />
                <StatCard label={t.totalCategories} value={stats.categories} icon={Tag} color={teal} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginBottom: 24 }} className="chart-grid">
                <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 20 }}>
                  <div className="disp" style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>{t.adsOverTime}</div>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={TREND}>
                      <CartesianGrid strokeDasharray="3 3" stroke={border} vertical={false} />
                      <XAxis dataKey="d" tick={{ fontSize: 11, fill: textMuted }} axisLine={{ stroke: border }} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: textMuted }} axisLine={false} tickLine={false} width={26} />
                      <Tooltip contentStyle={{ background: surface, border: `1px solid ${border}`, borderRadius: 8, fontSize: 12 }} />
                      <Line type="monotone" dataKey="ads" stroke={gold} strokeWidth={2.5} dot={{ r: 3, fill: gold }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 20 }}>
                  <div className="disp" style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>{t.adsByCategory}</div>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={CATS.slice(0, 6)} layout="vertical" margin={{ left: 10 }}>
                      <XAxis type="number" hide />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 10.5, fill: textMuted }} width={110} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background: surface, border: `1px solid ${border}`, borderRadius: 8, fontSize: 12 }} />
                      <Bar dataKey="count" fill={teal} radius={[0, 6, 6, 0]} barSize={14} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="chart-grid">
                <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <div className="disp" style={{ fontSize: 15, fontWeight: 600 }}>{t.latestUsers}</div>
                    <a href="#" onClick={(e) => { e.preventDefault(); setNav("users"); }} style={{ fontSize: 12.5, color: teal, fontWeight: 600, textDecoration: "none" }}>{t.viewAll}</a>
                  </div>
                  {USERS.slice(0, 5).map((u) => (
                    <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderTop: `1px solid ${border}` }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: dark ? "#233038" : "#FFF7E0", color: "#854F0B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>
                        {u.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.name}</div>
                        <div style={{ fontSize: 11.5, color: textMuted }}>{u.town}</div>
                      </div>
                      <div style={{ fontSize: 11.5, color: textMuted, flexShrink: 0 }}>{u.joined}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <div className="disp" style={{ fontSize: 15, fontWeight: 600 }}>{t.latestAds}</div>
                    <a href="#" onClick={(e) => { e.preventDefault(); setNav("ads"); }} style={{ fontSize: 12.5, color: teal, fontWeight: 600, textDecoration: "none" }}>{t.viewAll}</a>
                  </div>
                  {ads.slice(0, 5).map((a) => {
                    const s = statusStyle(a.status);
                    return (
                      <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderTop: `1px solid ${border}` }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13.5, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.title}</div>
                          <div className="mono" style={{ fontSize: 11.5, color: textMuted }}>Rs {fmt(a.price)}</div>
                        </div>
                        <span style={{ fontSize: 10.5, fontWeight: 600, padding: "4px 9px", borderRadius: 8, background: s.bg, color: s.fg, flexShrink: 0 }}>{t[a.status]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {nav === "ads" && (
            <>
              <h1 className="disp" style={{ fontSize: 24, fontWeight: 700, margin: "0 0 18px" }}>{t.manageAds}</h1>
              <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, overflow: "hidden" }}>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5, minWidth: 820 }}>
                    <thead>
                      <tr style={{ borderBottom: `1px solid ${border}` }}>
                        {["", t.listing, t.user, t.category, t.location, t.price, t.status, t.actions].map((h, i) => (
                          <th key={i} style={{ textAlign: "left", padding: "12px 16px", fontSize: 11.5, fontWeight: 600, color: textMuted, letterSpacing: 0.3 }}>{h.toUpperCase()}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAds.map((a) => {
                        const s = statusStyle(a.status);
                        return (
                          <tr key={a.id} className="row-hover" style={{ borderBottom: `1px solid ${border}` }}>
                            <td style={{ padding: "8px 16px" }}>
                              {a.images.length > 0 ? (
                                <img src={a.images[0]} alt="" style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover", display: "block" }} />
                              ) : (
                                <div style={{ width: 40, height: 40, borderRadius: 8, background: dark ? "#22242A" : "#EDEDED", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <ImageOff size={16} color={textMuted} />
                                </div>
                              )}
                            </td>
                            <td style={{ padding: "12px 16px", fontWeight: 500 }}>
                              {a.title} {a.featured && <Star size={12} color={gold} fill={gold} style={{ marginLeft: 4, verticalAlign: -1 }} />}
                            </td>
                            <td style={{ padding: "12px 16px", color: textMuted }}>{a.user}</td>
                            <td style={{ padding: "12px 16px", color: textMuted }}>{a.categoryName ? a.categoryName[`name_${lang}`] : "—"}</td>
                            <td style={{ padding: "12px 16px", color: textMuted }}>{a.town}, {a.district}</td>
                            <td className="mono" style={{ padding: "12px 16px" }}>Rs {fmt(a.price)}</td>
                            <td style={{ padding: "12px 16px" }}>
                              <span style={{ fontSize: 10.5, fontWeight: 600, padding: "4px 9px", borderRadius: 8, background: s.bg, color: s.fg }}>{t[a.status]}</span>
                            </td>
                            <td style={{ padding: "12px 16px" }}>
                              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                <IconBtn title={t.view} onClick={() => setViewAd(a)} color={teal} Icon={Eye} border={border} />
                                {a.status !== "approved" && (
                                  <IconBtn title={t.approve} onClick={() => setStatus(a.id, "approved")} color={success} Icon={Check} border={border} />
                                )}
                                {a.status !== "rejected" && (
                                  <IconBtn title={t.reject} onClick={() => setStatus(a.id, "rejected")} color={danger} Icon={X} border={border} />
                                )}
                                {a.status !== "suspended" && (
                                  <IconBtn title={t.suspend} onClick={() => setStatus(a.id, "suspended")} color={textMuted} Icon={Ban} border={border} />
                                )}
                                <IconBtn title={a.featured ? t.unfeature : t.feature} onClick={() => toggleFeature(a.id)} color={gold} Icon={Star} border={border} filled={a.featured} />
                                <IconBtn title={t.deleteA} onClick={() => setConfirmId(a.id)} color={danger} Icon={Trash2} border={border} />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {nav === "users" && (
            <>
              <h1 className="disp" style={{ fontSize: 24, fontWeight: 700, margin: "0 0 18px" }}>{t.manageUsers}</h1>
              <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, overflow: "hidden" }}>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5, minWidth: 560 }}>
                    <thead>
                      <tr style={{ borderBottom: `1px solid ${border}` }}>
                        {[t.nameCol, t.emailCol, t.townCol, t.joined, t.adCount].map((h, i) => (
                          <th key={i} style={{ textAlign: "left", padding: "12px 16px", fontSize: 11.5, fontWeight: 600, color: textMuted, letterSpacing: 0.3 }}>{h.toUpperCase()}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {USERS.map((u) => (
                        <tr key={u.id} className="row-hover" style={{ borderBottom: `1px solid ${border}` }}>
                          <td style={{ padding: "12px 16px", fontWeight: 500 }}>{u.name}</td>
                          <td style={{ padding: "12px 16px", color: textMuted }}>{u.email}</td>
                          <td style={{ padding: "12px 16px", color: textMuted }}>{u.town}</td>
                          <td style={{ padding: "12px 16px", color: textMuted }}>{u.joined}</td>
                          <td className="mono" style={{ padding: "12px 16px" }}>{u.ads}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {nav === "categories" && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
                <h1 className="disp" style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>{t.manageCategories}</h1>
                <button className="btn" style={{ background: gold, color: "#1F2937", borderRadius: 10, padding: "9px 16px", fontSize: 13.5, fontWeight: 600 }}>+ {t.addCategory}</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14 }}>
                {CATS.map((c) => (
                  <div key={c.name} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 14, padding: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: textMuted, marginTop: 3 }}>{c.count} {t.adCount.toLowerCase()}</div>
                    </div>
                    <Tag size={17} color={gold} />
                  </div>
                ))}
              </div>
            </>
          )}

          {nav === "settings" && (
            <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 40, textAlign: "center", color: textMuted, fontSize: 14 }}>
              {t.settingsPlaceholder}
            </div>
          )}
        </main>
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

      {viewAd && (
        <div onClick={() => setViewAd(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 110, padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: surface, borderRadius: 18, padding: 28, maxWidth: 640, width: "100%", maxHeight: "85vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 18 }}>
              <div>
                <div className="disp" style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
                  {viewAd.title} {viewAd.featured && <Star size={14} color={gold} fill={gold} style={{ marginLeft: 6, verticalAlign: -1 }} />}
                </div>
                <span style={{ fontSize: 10.5, fontWeight: 600, padding: "4px 9px", borderRadius: 8, background: statusStyle(viewAd.status).bg, color: statusStyle(viewAd.status).fg }}>{t[viewAd.status]}</span>
              </div>
              <button type="button" onClick={() => setViewAd(null)} className="btn" style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${border}`, background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: text, flexShrink: 0 }}>
                <X size={15} />
              </button>
            </div>

            {viewAd.images.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(100px,1fr))", gap: 8, marginBottom: 20 }}>
                {viewAd.images.map((src, i) => (
                  <img key={i} src={src} alt="" style={{ width: "100%", height: 90, objectFit: "cover", borderRadius: 10, display: "block" }} />
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: dark ? "#22242A" : "#EDEDED", color: textMuted, borderRadius: 10, padding: "14px 16px", fontSize: 13, marginBottom: 20 }}>
                <ImageOff size={16} /> {t.noPhotos}
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
              <DetailItem label={t.category} value={viewAd.categoryName ? viewAd.categoryName[`name_${lang}`] : "—"} />
              <DetailItem label={t.price} value={`Rs ${fmt(viewAd.price)}`} />
              <DetailItem label={t.location} value={`${viewAd.town}, ${viewAd.district}`} />
              <DetailItem label={t.quantity} value={viewAd.quantity} />
              <DetailItem label={t.condition} value={viewAd.condition === "new" ? t.condNew : t.condUsed} />
              <DetailItem label={t.date} value={viewAd.date} />
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11.5, fontWeight: 600, color: textMuted, marginBottom: 6, letterSpacing: 0.3 }}>{t.description.toUpperCase()}</div>
              <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>{viewAd.description || "—"}</p>
            </div>

            <div style={{ height: 1, background: border, margin: "18px 0" }} />

            <div style={{ fontSize: 11.5, fontWeight: 600, color: textMuted, marginBottom: 12, letterSpacing: 0.3 }}>{t.contactDetails.toUpperCase()}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <DetailItem label={t.contactName} value={viewAd.user} />
              <DetailItem label={t.phone} value={viewAd.phone} />
              {viewAd.whatsapp && <DetailItem label={t.whatsapp} value={viewAd.whatsapp} />}
              {viewAd.email && <DetailItem label={t.email} value={viewAd.email} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: string | number; icon: LucideIcon; color: string }) {
  const { colors } = useTheme();
  return (
    <div style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 14, padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontSize: 12, color: colors.textMuted, fontWeight: 500 }}>{label}</span>
        <Icon size={16} color={color} />
      </div>
      <div className="disp" style={{ fontSize: 22, fontWeight: 700 }}>{value}</div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <div>
      <div style={{ fontSize: 11, color: colors.textMuted, marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 13.5, fontWeight: 500 }}>{value}</div>
    </div>
  );
}

function IconBtn({ title, onClick, color, Icon, border, filled }: { title: string; onClick: () => void; color: string; Icon: LucideIcon; border: string; filled?: boolean }) {
  return (
    <button type="button" title={title} onClick={onClick} className="btn" style={{
      width: 28, height: 28, borderRadius: 8, border: `1px solid ${border}`, background: "transparent",
      display: "flex", alignItems: "center", justifyContent: "center", color,
    }}>
      <Icon size={13} fill={filled ? color : "none"} />
    </button>
  );
}
