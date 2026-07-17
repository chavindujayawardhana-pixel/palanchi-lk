"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MapPin, Phone, Mail } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useTheme } from "@/components/ThemeProvider";
import { useAuth } from "@/components/AuthProvider";
import { AuthNav } from "@/components/AuthNav";
import { DistrictField } from "@/components/DistrictField";
import { TownField } from "@/components/TownField";
import { useCategories } from "@/lib/categories";
import { danger } from "@/lib/theme";
import { supabase } from "@/lib/supabase";

const dict = {
  en: {
    formTitle: "Edit your advertisement", formSub: "Update the details below. Our team reviews any changes to a live ad before they go public again.",
    sectionBasic: "Basic details", title: "Title", titlePh: "e.g. 20 kVA Diesel Generator",
    description: "Description", descPh: "Describe condition, specifications, and anything a renter should know...",
    category: "Category", selectCategory: "Select category",
    sectionLocation: "Location", district: "District", town: "Town", selectDistrict: "Select district", selectTown: "Select town",
    address: "Address", addressPh: "Street, area or landmark", mapLocation: "Google map location", mapPh: "Paste map link (optional)",
    sectionPricing: "Rental pricing", price: "Rental price (Rs)", pricePh: "0.00", period: "Rental period",
    perHour: "Per hour", perDay: "Per day", perWeek: "Per week", perMonth: "Per month",
    quantity: "Available quantity", condition: "Condition", condNew: "New", condUsed: "Used",
    sectionContact: "Contact details", contactName: "Contact name", contactNamePh: "Full name",
    phone: "Phone", phonePh: "07X XXX XXXX", whatsapp: "WhatsApp", whatsappPh: "07X XXX XXXX",
    email: "Email", emailPh: "you@example.com",
    save: "Save changes", saving: "Saving...",
    required: "This field is required",
    submitError: "Something went wrong while saving your ad. Please try again.",
    reReviewNotice: "This ad is currently live. Saving changes will send it back for review before it's public again.",
  },
  si: {
    formTitle: "ඔබේ දැන්වීම සංස්කරණය කරන්න", formSub: "පහත විස්තර යාවත්කාලීන කරන්න. ප්‍රකාශිත දැන්වීමකට කරන ඕනෑම වෙනසක් නැවත ප්‍රසිද්ධ කිරීමට පෙර අපගේ කණ්ඩායම සමාලෝචනය කරයි.",
    sectionBasic: "මූලික විස්තර", title: "මාතෘකාව", titlePh: "උදා: 20 kVA ඩීසල් ජනරේටරය",
    description: "විස්තරය", descPh: "තත්ත්වය, විශේෂාංග සහ කුලියට ගන්නා අයෙකු දැනගත යුතු ඕනෑම දෙයක් විස්තර කරන්න...",
    category: "කාණ්ඩය", selectCategory: "කාණ්ඩය තෝරන්න",
    sectionLocation: "ස්ථානය", district: "දිස්ත්‍රික්කය", town: "නගරය", selectDistrict: "දිස්ත්‍රික්කය තෝරන්න", selectTown: "නගරය තෝරන්න",
    address: "ලිපිනය", addressPh: "වීදිය, ප්‍රදේශය හෝ සන්ධිස්ථානය", mapLocation: "ගූගල් සිතියම් ස්ථානය", mapPh: "සිතියම් සබැඳිය අලවන්න (විකල්ප)",
    sectionPricing: "කුලී මිල", price: "කුලී මිල (රු)", pricePh: "0.00", period: "කුලී කාලය",
    perHour: "පැයකට", perDay: "දිනකට", perWeek: "සතියකට", perMonth: "මාසයකට",
    quantity: "ලබාගත හැකි ප්‍රමාණය", condition: "තත්ත්වය", condNew: "අලුත්", condUsed: "පරණ",
    sectionContact: "සම්බන්ධතා විස්තර", contactName: "සම්බන්ධතා නම", contactNamePh: "සම්පූර්ණ නම",
    phone: "දුරකථනය", phonePh: "07X XXX XXXX", whatsapp: "WhatsApp", whatsappPh: "07X XXX XXXX",
    email: "විද්‍යුත් තැපෑල", emailPh: "you@example.com",
    save: "වෙනස්කම් සුරකින්න", saving: "සුරකිමින්...",
    required: "මෙම කෙත්‍රය අවශ්‍යයි",
    submitError: "ඔබේ දැන්වීම සුරැකීමේදී දෝෂයක් ඇති විය. නැවත උත්සාහ කරන්න.",
    reReviewNotice: "මෙම දැන්වීම දැනට ප්‍රසිද්ධයි. වෙනස්කම් සුරැකීමෙන් එය නැවත ප්‍රසිද්ධ කිරීමට පෙර සමාලෝචනය සඳහා යවනු ලැබේ.",
  },
  ta: {
    formTitle: "உங்கள் விளம்பரத்தைத் திருத்தவும்", formSub: "கீழே உள்ள விவரங்களைப் புதுப்பிக்கவும். நேரடி விளம்பரத்தில் செய்யப்படும் மாற்றங்களை மீண்டும் வெளியிடுவதற்கு முன் எங்கள் குழு ஆய்வு செய்யும்.",
    sectionBasic: "அடிப்படை விவரங்கள்", title: "தலைப்பு", titlePh: "உதா: 20 kVA டீசல் ஜெனரேட்டர்",
    description: "விளக்கம்", descPh: "நிலை, விவரக்குறிப்புகள் மற்றும் வாடகைதாரர் அறிய வேண்டிய அனைத்தையும் விவரிக்கவும்...",
    category: "வகை", selectCategory: "வகையை தேர்ந்தெடுக்கவும்",
    sectionLocation: "இடம்", district: "மாவட்டம்", town: "நகரம்", selectDistrict: "மாவட்டத்தை தேர்ந்தெடுக்கவும்", selectTown: "நகரத்தை தேர்ந்தெடுக்கவும்",
    address: "முகவரி", addressPh: "தெரு, பகுதி அல்லது அடையாளம்", mapLocation: "கூகிள் மேப் இடம்", mapPh: "மேப் இணைப்பை ஒட்டவும் (விருப்பம்)",
    sectionPricing: "வாடகை விலை", price: "வாடகை விலை (Rs)", pricePh: "0.00", period: "வாடகை காலம்",
    perHour: "மணிக்கு", perDay: "நாளுக்கு", perWeek: "வாரத்திற்கு", perMonth: "மாதத்திற்கு",
    quantity: "கிடைக்கும் அளவு", condition: "நிலை", condNew: "புதியது", condUsed: "பழையது",
    sectionContact: "தொடர்பு விவரங்கள்", contactName: "தொடர்பு பெயர்", contactNamePh: "முழு பெயர்",
    phone: "தொலைபேசி", phonePh: "07X XXX XXXX", whatsapp: "WhatsApp", whatsappPh: "07X XXX XXXX",
    email: "மின்னஞ்சல்", emailPh: "you@example.com",
    save: "மாற்றங்களைச் சேமி", saving: "சேமிக்கிறது...",
    required: "இந்த புலம் அவசியம்",
    submitError: "உங்கள் விளம்பரத்தை சேமிக்கும் போது பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.",
    reReviewNotice: "இந்த விளம்பரம் தற்போது நேரடி நிலையில் உள்ளது. மாற்றங்களைச் சேமித்தால் அது மீண்டும் பொதுவில் வெளியாவதற்கு முன் மதிப்பாய்வுக்கு அனுப்பப்படும்.",
  },
};

interface FormState {
  title: string;
  description: string;
  category: string;
  district: string;
  town: string;
  address: string;
  mapLink: string;
  price: string;
  period: string;
  quantity: number | string;
  condition: string;
  contactName: string;
  phone: string;
  whatsapp: string;
  email: string;
}

const EMPTY_FORM: FormState = {
  title: "", description: "", category: "", district: "", town: "",
  address: "", mapLink: "", price: "", period: "perDay", quantity: 1, condition: "used",
  contactName: "", phone: "", whatsapp: "", email: "",
};

export default function EditAdPage() {
  const params = useParams<{ id: string }>();
  const { lang, dark, colors } = useTheme();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const categories = useCategories();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [originalStatus, setOriginalStatus] = useState<string | null>(null);
  const [loadingAd, setLoadingAd] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const t = dict[lang];
  const { bg, surface, text, textMuted, border, gold } = colors;

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace(`/login?next=/my-ads/${params.id}/edit&notice=login-required`);
    }
  }, [authLoading, user, params.id, router]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    supabase
      .from("advertisements")
      .select("*")
      .eq("id", params.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error || !data || data.user_id !== user.id) {
          setNotFound(true);
          setLoadingAd(false);
          return;
        }
        setOriginalStatus(data.status);
        setForm({
          title: data.title ?? "",
          description: data.description ?? "",
          category: data.category_id ? String(data.category_id) : "",
          district: data.district ?? "",
          town: data.town ?? "",
          address: data.address ?? "",
          mapLink: data.map_link ?? "",
          price: String(data.price ?? ""),
          period: data.rental_period ?? "perDay",
          quantity: data.quantity ?? 1,
          condition: data.condition ?? "used",
          contactName: data.contact_name ?? "",
          phone: data.phone ?? "",
          whatsapp: data.whatsapp ?? "",
          email: data.email ?? "",
        });
        setLoadingAd(false);
      });
    return () => { cancelled = true; };
  }, [user, params.id]);

  const fieldStyle = (err?: boolean): React.CSSProperties => ({
    width: "100%", background: dark ? "#141B1F" : "#F8F9FA", border: `1px solid ${err ? danger : border}`,
    borderRadius: 10, padding: "11px 13px", color: text, fontSize: 14.5, outline: "none",
  });
  const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: text, marginBottom: 7, display: "block" };

  function update(key: keyof FormState, val: string | number) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function validate() {
    const req: (keyof FormState)[] = ["title", "description", "category", "district", "town", "price", "contactName", "phone"];
    const errs: Record<string, boolean> = {};
    req.forEach((k) => { if (!String(form[k]).trim()) errs[k] = true; });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !validate()) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const update: Record<string, unknown> = {
        title: form.title,
        description: form.description,
        category_id: form.category ? Number(form.category) : null,
        district: form.district,
        town: form.town,
        price: Number(form.price),
        rental_period: form.period,
        quantity: Number(form.quantity) || 1,
        condition: form.condition,
        contact_name: form.contactName,
        phone: form.phone,
        whatsapp: form.whatsapp || null,
        email: form.email || null,
        address: form.address || null,
        map_link: form.mapLink || null,
      };
      if (originalStatus === "approved") {
        update.status = "pending";
      }

      const { error } = await supabase.from("advertisements").update(update).eq("id", params.id);
      if (error) throw error;

      router.push("/my-ads?updated=1");
    } catch (err) {
      console.error(err);
      setSubmitError(t.submitError);
    } finally {
      setSubmitting(false);
    }
  }

  if (authLoading || !user || loadingAd) return null;

  if (notFound) {
    router.replace("/my-ads");
    return null;
  }

  return (
    <div style={{ background: bg, color: text, minHeight: "100vh" }}>
      <Navbar maxWidth={900} logoProps={{ fontSize: 20 }} right={<AuthNav />} />

      <form onSubmit={handleSubmit} style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 80px" }}>
        <h1 className="disp" style={{ fontSize: 26, fontWeight: 700, margin: "0 0 6px" }}>{t.formTitle}</h1>
        <p style={{ fontSize: 14.5, color: textMuted, margin: "0 0 20px", maxWidth: 560 }}>{t.formSub}</p>

        {originalStatus === "approved" && (
          <div style={{ background: dark ? "#2A2410" : "#FFF7E0", border: `1px solid ${gold}`, borderRadius: 12, padding: "12px 14px", fontSize: 13.5, color: text, marginBottom: 24 }}>
            {t.reReviewNotice}
          </div>
        )}

        <Section title={t.sectionBasic}>
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>{t.title} *</label>
            <input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder={t.titlePh} style={fieldStyle(errors.title)} />
            {errors.title && <FieldError text={t.required} />}
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>{t.description} *</label>
            <textarea value={form.description} onChange={(e) => update("description", e.target.value)} placeholder={t.descPh} rows={4} style={{ ...fieldStyle(errors.description), resize: "vertical", fontFamily: "inherit" }} />
            {errors.description && <FieldError text={t.required} />}
          </div>
          <div>
            <label style={labelStyle}>{t.category} *</label>
            <select value={form.category} onChange={(e) => update("category", e.target.value)} style={fieldStyle(errors.category)}>
              <option value="">{t.selectCategory}</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c[`name_${lang}`]}</option>)}
            </select>
            {errors.category && <FieldError text={t.required} />}
          </div>
        </Section>

        <Section title={t.sectionLocation}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }} className="grid2">
            <div>
              <label style={labelStyle}>{t.district} *</label>
              <DistrictField value={form.district} onChange={(v) => { update("district", v); update("town", ""); }} placeholder={t.selectDistrict} inputStyle={fieldStyle(errors.district)} />
              {errors.district && <FieldError text={t.required} />}
            </div>
            <div>
              <label style={labelStyle}>{t.town} *</label>
              <TownField district={form.district} value={form.town} onChange={(v) => update("town", v)} placeholder={t.selectTown} disabled={!form.district} inputStyle={{ ...fieldStyle(errors.town), opacity: form.district ? 1 : 0.5 }} />
              {errors.town && <FieldError text={t.required} />}
            </div>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>{t.address}</label>
            <input value={form.address} onChange={(e) => update("address", e.target.value)} placeholder={t.addressPh} style={fieldStyle(false)} />
          </div>
          <div>
            <label style={labelStyle}>{t.mapLocation}</label>
            <div style={{ position: "relative" }}>
              <MapPin size={16} color={textMuted} style={{ position: "absolute", left: 13, top: 13 }} />
              <input value={form.mapLink} onChange={(e) => update("mapLink", e.target.value)} placeholder={t.mapPh} style={{ ...fieldStyle(false), paddingLeft: 36 }} />
            </div>
          </div>
        </Section>

        <Section title={t.sectionPricing}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }} className="grid2">
            <div>
              <label style={labelStyle}>{t.price} *</label>
              <input type="number" value={form.price} onChange={(e) => update("price", e.target.value)} placeholder={t.pricePh} style={fieldStyle(errors.price)} />
              {errors.price && <FieldError text={t.required} />}
            </div>
            <div>
              <label style={labelStyle}>{t.period}</label>
              <select value={form.period} onChange={(e) => update("period", e.target.value)} style={fieldStyle(false)}>
                <option value="perHour">{t.perHour}</option>
                <option value="perDay">{t.perDay}</option>
                <option value="perWeek">{t.perWeek}</option>
                <option value="perMonth">{t.perMonth}</option>
              </select>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="grid2">
            <div>
              <label style={labelStyle}>{t.quantity}</label>
              <input type="number" min={1} value={form.quantity} onChange={(e) => update("quantity", e.target.value)} style={fieldStyle(false)} />
            </div>
            <div>
              <label style={labelStyle}>{t.condition}</label>
              <div style={{ display: "flex", gap: 8 }}>
                {([["used", t.condUsed], ["new", t.condNew]] as const).map(([val, lab]) => (
                  <button type="button" key={val} onClick={() => update("condition", val)} className="btn" style={{
                    flex: 1, padding: "11px", borderRadius: 10, fontSize: 14, fontWeight: 500,
                    border: `1px solid ${form.condition === val ? gold : border}`,
                    background: form.condition === val ? (dark ? "#2A2410" : "#FFF7E0") : "transparent",
                    color: text,
                  }}>{lab}</button>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section title={t.sectionContact}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }} className="grid2">
            <div>
              <label style={labelStyle}>{t.contactName} *</label>
              <input value={form.contactName} onChange={(e) => update("contactName", e.target.value)} placeholder={t.contactNamePh} style={fieldStyle(errors.contactName)} />
              {errors.contactName && <FieldError text={t.required} />}
            </div>
            <div>
              <label style={labelStyle}>{t.phone} *</label>
              <div style={{ position: "relative" }}>
                <Phone size={15} color={textMuted} style={{ position: "absolute", left: 13, top: 13 }} />
                <input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder={t.phonePh} style={{ ...fieldStyle(errors.phone), paddingLeft: 36 }} />
              </div>
              {errors.phone && <FieldError text={t.required} />}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="grid2">
            <div>
              <label style={labelStyle}>{t.whatsapp}</label>
              <input value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} placeholder={t.whatsappPh} style={fieldStyle(false)} />
            </div>
            <div>
              <label style={labelStyle}>{t.email}</label>
              <div style={{ position: "relative" }}>
                <Mail size={15} color={textMuted} style={{ position: "absolute", left: 13, top: 13 }} />
                <input value={form.email} onChange={(e) => update("email", e.target.value)} placeholder={t.emailPh} style={{ ...fieldStyle(false), paddingLeft: 36 }} />
              </div>
            </div>
          </div>
        </Section>

        {submitError && (
          <div style={{ fontSize: 13.5, color: danger, marginBottom: 14, textAlign: "center" }}>{submitError}</div>
        )}

        <button type="submit" disabled={submitting} className="btn" style={{
          width: "100%", background: gold, color: "#1F2937", borderRadius: 14, padding: "16px",
          fontWeight: 600, fontSize: 16, opacity: submitting ? 0.7 : 1,
        }}>
          {submitting ? t.saving : t.save}
        </button>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <div style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 18, padding: 24, marginBottom: 20 }}>
      <div className="disp" style={{ fontSize: 16, fontWeight: 600, marginBottom: 18 }}>{title}</div>
      {children}
    </div>
  );
}

function FieldError({ text }: { text: string }) {
  return <div style={{ fontSize: 12, color: danger, marginTop: 5 }}>{text}</div>;
}
