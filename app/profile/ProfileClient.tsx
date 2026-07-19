"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useTheme } from "@/components/ThemeProvider";
import { useAuth } from "@/components/AuthProvider";
import { AuthNav } from "@/components/AuthNav";
import { DistrictField } from "@/components/DistrictField";
import { TownField } from "@/components/TownField";
import { supabase } from "@/lib/supabase";
import { danger } from "@/lib/theme";

const dict = {
  en: {
    pageTitle: "My profile", pageSub: "View and update your personal details.",
    firstName: "First name", lastName: "Last name", email: "Email",
    emailNote: "Changing your email requires re-verification and can't be done here.",
    phone: "Phone", phonePh: "07X XXX XXXX",
    district: "District", town: "Town", selectDistrict: "Select district", selectTown: "Select town",
    save: "Save changes", saving: "Saving...",
    required: "This field is required",
    success: "Your profile has been updated.",
    saveError: "Something went wrong while saving your profile. Please try again.",
  },
  si: {
    pageTitle: "මගේ පැතිකඩ", pageSub: "ඔබේ පුද්ගලික විස්තර බලන්න සහ යාවත්කාලීන කරන්න.",
    firstName: "මුල් නම", lastName: "අග නම", email: "විද්‍යුත් තැපෑල",
    emailNote: "විද්‍යුත් තැපෑල වෙනස් කිරීමට යළි තහවුරු කිරීමක් අවශ්‍ය වන අතර එය මෙතැනින් කළ නොහැක.",
    phone: "දුරකථනය", phonePh: "07X XXX XXXX",
    district: "දිස්ත්‍රික්කය", town: "නගරය", selectDistrict: "දිස්ත්‍රික්කය තෝරන්න", selectTown: "නගරය තෝරන්න",
    save: "වෙනස්කම් සුරකින්න", saving: "සුරකිමින්...",
    required: "මෙම කෙත්‍රය අවශ්‍යයි",
    success: "ඔබේ පැතිකඩ සාර්ථකව යාවත්කාලීන කරන ලදී.",
    saveError: "ඔබේ පැතිකඩ සුරැකීමේදී දෝෂයක් ඇති විය. නැවත උත්සාහ කරන්න.",
  },
  ta: {
    pageTitle: "என் சுயவிவரம்", pageSub: "உங்கள் தனிப்பட்ட விவரங்களைப் பார்க்கவும் புதுப்பிக்கவும்.",
    firstName: "முதல் பெயர்", lastName: "கடைசி பெயர்", email: "மின்னஞ்சல்",
    emailNote: "மின்னஞ்சலை மாற்ற மறு சரிபார்ப்பு தேவை, இதை இங்கே செய்ய முடியாது.",
    phone: "தொலைபேசி", phonePh: "07X XXX XXXX",
    district: "மாவட்டம்", town: "நகரம்", selectDistrict: "மாவட்டத்தை தேர்ந்தெடுக்கவும்", selectTown: "நகரத்தை தேர்ந்தெடுக்கவும்",
    save: "மாற்றங்களைச் சேமி", saving: "சேமிக்கிறது...",
    required: "இந்த புலம் அவசியம்",
    success: "உங்கள் சுயவிவரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது.",
    saveError: "உங்கள் சுயவிவரத்தை சேமிக்கும் போது பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.",
  },
};

interface FormState {
  firstName: string;
  lastName: string;
  phone: string;
  district: string;
  town: string;
}

const EMPTY_FORM: FormState = { firstName: "", lastName: "", phone: "", district: "", town: "" };

export function ProfileClient() {
  const { lang, dark, colors } = useTheme();
  const router = useRouter();
  const { user, profile, loading: authLoading, refreshProfile } = useAuth();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [prefilled, setPrefilled] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const t = dict[lang];
  const { bg, surface, text, textMuted, border, gold } = colors;

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login?next=/profile&notice=login-required");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (profile && !prefilled) {
      setForm({
        firstName: profile.first_name ?? "",
        lastName: profile.last_name ?? "",
        phone: profile.phone ?? "",
        district: profile.district ?? "",
        town: profile.town ?? "",
      });
      setPrefilled(true);
    }
  }, [profile, prefilled]);

  const fieldStyle = (err?: boolean): React.CSSProperties => ({
    width: "100%", background: dark ? "#141B1F" : "#F8F9FA", border: `1px solid ${err ? danger : border}`,
    borderRadius: 10, padding: "11px 13px 11px 38px", color: text, fontSize: 14.5, outline: "none",
  });
  const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: text, marginBottom: 6, display: "block" };
  const iconStyle: React.CSSProperties = { position: "absolute", left: 13, top: 13 };

  function update(key: keyof FormState, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
    setSaved(false);
  }

  function validate() {
    const req: (keyof FormState)[] = ["firstName", "lastName", "phone", "district", "town"];
    const errs: Record<string, boolean> = {};
    req.forEach((k) => { if (!form[k].trim()) errs[k] = true; });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !validate()) return;

    setSaving(true);
    setSaveError(null);
    setSaved(false);

    const { error } = await supabase
      .from("users")
      .update({
        first_name: form.firstName,
        last_name: form.lastName,
        phone: form.phone,
        district: form.district,
        town: form.town,
      })
      .eq("id", user.id);

    setSaving(false);

    if (error) {
      console.error(error);
      setSaveError(t.saveError);
      return;
    }

    await refreshProfile();
    setSaved(true);
  }

  if (authLoading || !user) return null;

  return (
    <div style={{ background: bg, color: text, minHeight: "100vh" }}>
      <Navbar maxWidth={900} logoProps={{ fontSize: 20 }} right={<AuthNav />} />

      <div style={{ maxWidth: 560, margin: "0 auto", padding: "40px 24px 80px" }}>
        <h1 className="disp" style={{ fontSize: 26, fontWeight: 700, margin: "0 0 6px" }}>{t.pageTitle}</h1>
        <p style={{ fontSize: 14.5, color: textMuted, margin: "0 0 28px" }}>{t.pageSub}</p>

        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 22, padding: "28px 26px", boxShadow: "0 12px 40px rgba(0,0,0,0.06)" }}>
          <form onSubmit={handleSubmit}>
            {saved && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: dark ? "#123028" : "#E1F5EE", border: "1px solid #0F6E56", borderRadius: 12, padding: "12px 14px", fontSize: 13.5, color: text, marginBottom: 20 }}>
                <CheckCircle2 size={16} color="#0F6E56" />
                {t.success}
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }} className="grid2">
              <div>
                <label style={labelStyle}>{t.firstName} *</label>
                <div style={{ position: "relative" }}>
                  <User size={16} color={textMuted} style={iconStyle} />
                  <input value={form.firstName} onChange={(e) => update("firstName", e.target.value)} style={fieldStyle(errors.firstName)} />
                </div>
                {errors.firstName && <FieldError text={t.required} />}
              </div>
              <div>
                <label style={labelStyle}>{t.lastName} *</label>
                <input value={form.lastName} onChange={(e) => update("lastName", e.target.value)} style={{ ...fieldStyle(errors.lastName), paddingLeft: 13 }} />
                {errors.lastName && <FieldError text={t.required} />}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>{t.email}</label>
              <div style={{ position: "relative" }}>
                <Mail size={16} color={textMuted} style={iconStyle} />
                <input value={profile?.email ?? user.email ?? ""} readOnly disabled style={{ ...fieldStyle(false), opacity: 0.65, cursor: "not-allowed" }} />
              </div>
              <div style={{ fontSize: 12, color: textMuted, marginTop: 5 }}>{t.emailNote}</div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>{t.phone} *</label>
              <div style={{ position: "relative" }}>
                <Phone size={16} color={textMuted} style={iconStyle} />
                <input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder={t.phonePh} style={fieldStyle(errors.phone)} />
              </div>
              {errors.phone && <FieldError text={t.required} />}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }} className="grid2">
              <div>
                <label style={labelStyle}>{t.district} *</label>
                <div style={{ position: "relative" }}>
                  <MapPin size={16} color={textMuted} style={{ ...iconStyle, zIndex: 2 }} />
                  <DistrictField value={form.district} onChange={(v) => { update("district", v); update("town", ""); }} placeholder={t.selectDistrict} inputStyle={fieldStyle(errors.district)} />
                </div>
                {errors.district && <FieldError text={t.required} />}
              </div>
              <div>
                <label style={labelStyle}>{t.town} *</label>
                <TownField district={form.district} value={form.town} onChange={(v) => update("town", v)} placeholder={t.selectTown} disabled={!form.district} inputStyle={{ ...fieldStyle(errors.town), paddingLeft: 13, opacity: form.district ? 1 : 0.5 }} />
                {errors.town && <FieldError text={t.required} />}
              </div>
            </div>

            {saveError && <div style={{ marginBottom: 16 }}><FieldError text={saveError} /></div>}

            <button type="submit" disabled={saving} className="btn" style={{ width: "100%", background: gold, color: "#1F2937", borderRadius: 12, padding: "13px", fontWeight: 600, fontSize: 15, opacity: saving ? 0.7 : 1 }}>
              {saving ? t.saving : t.save}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function FieldError({ text }: { text: string }) {
  return <div style={{ fontSize: 11.5, color: danger, marginTop: 5 }}>{text}</div>;
}
