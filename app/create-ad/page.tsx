"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { UploadCloud, X, Star, MapPin, Phone, Mail, CheckCircle2, ImagePlus } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useTheme } from "@/components/ThemeProvider";
import { DISTRICTS, TOWNS } from "@/lib/data";
import { danger } from "@/lib/theme";
import { supabase } from "@/lib/supabase";

const dict = {
  en: {
    formTitle: "Publish an advertisement", formSub: "Fill in the details below. Our team reviews every ad before it goes live.",
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
    sectionImages: "Photos", imagesSub: "Upload up to 10 photos. Drag to reorder, click the star to set the cover image.",
    dropText: "Drag and drop photos here, or click to browse", dropSub: "JPG or PNG, max 5MB each",
    cover: "Cover", setCover: "Set as cover",
    submit: "Submit for review", submitting: "Submitting...",
    required: "This field is required",
    successTitle: "Your advertisement has been submitted successfully.",
    successBody: "Our team will review it before publishing.",
    backHome: "Back to home", postAnother: "Post another ad",
    maxImages: "Maximum 10 images allowed",
    submitError: "Something went wrong while submitting your ad. Please try again.",
  },
  si: {
    formTitle: "දැන්වීමක් පළ කරන්න", formSub: "පහත විස්තර පුරවන්න. අපගේ කණ්ඩායම සෑම දැන්වීමක්ම ප්‍රකාශයට පත් කිරීමට පෙර සමාලෝචනය කරයි.",
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
    sectionImages: "ඡායාරූප", imagesSub: "ඡායාරූප 10ක් දක්වා උඩුගත කරන්න. නැවත සකස් කිරීමට drag කරන්න, කවර පින්තූරය සැකසීමට තරුව ක්ලික් කරන්න.",
    dropText: "ඡායාරූප මෙතනට drag කරන්න, හෝ ක්ලික් කර browse කරන්න", dropSub: "JPG හෝ PNG, උපරිම 5MB බැගින්",
    cover: "කවරය", setCover: "කවර පින්තූරය කරන්න",
    submit: "සමාලෝචනය සඳහා ඉදිරිපත් කරන්න", submitting: "ඉදිරිපත් කරමින්...",
    required: "මෙම කෙත්‍රය අවශ්‍යයි",
    successTitle: "ඔබේ දැන්වීම සාර්ථකව ඉදිරිපත් කර ඇත.",
    successBody: "ප්‍රකාශයට පත් කිරීමට පෙර අපගේ කණ්ඩායම එය සමාලෝචනය කරනු ඇත.",
    backHome: "මුල් පිටුවට", postAnother: "තවත් දැන්වීමක් පළ කරන්න",
    maxImages: "උපරිම ඡායාරූප 10ක් පමණි",
    submitError: "ඔබේ දැන්වීම ඉදිරිපත් කිරීමේදී දෝෂයක් ඇති විය. නැවත උත්සාහ කරන්න.",
  },
  ta: {
    formTitle: "விளம்பரத்தை வெளியிடுங்கள்", formSub: "கீழே உள்ள விவரங்களை நிரப்பவும். வெளியிடுவதற்கு முன் எங்கள் குழு ஒவ்வொரு விளம்பரத்தையும் ஆய்வு செய்கிறது.",
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
    sectionImages: "புகைப்படங்கள்", imagesSub: "10 புகைப்படங்கள் வரை பதிவேற்றவும். மறுவரிசைப்படுத்த இழுக்கவும், அட்டைப் படமாக அமைக்க நட்சத்திரத்தை கிளிக் செய்யவும்.",
    dropText: "புகைப்படங்களை இங்கே இழுத்து விடவும், அல்லது கிளிக் செய்து உலாவவும்", dropSub: "JPG அல்லது PNG, ஒன்றுக்கு அதிகபட்சம் 5MB",
    cover: "அட்டை", setCover: "அட்டைப் படமாக அமை",
    submit: "மதிப்பாய்வுக்கு சமர்ப்பிக்கவும்", submitting: "சமர்ப்பிக்கிறது...",
    required: "இந்த புலம் அவசியம்",
    successTitle: "உங்கள் விளம்பரம் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது.",
    successBody: "வெளியிடுவதற்கு முன் எங்கள் குழு அதை மதிப்பாய்வு செய்யும்.",
    backHome: "முகப்புக்கு திரும்பு", postAnother: "மற்றொரு விளம்பரத்தை இடுங்கள்",
    maxImages: "அதிகபட்சம் 10 படங்கள் மட்டுமே அனுமதிக்கப்படும்",
    submitError: "உங்கள் விளம்பரத்தை சமர்ப்பிக்கும் போது பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.",
  },
};

const MAX_IMAGES = 10;
const MAX_SIZE = 5 * 1024 * 1024;

interface UploadedImage {
  file: File;
  url: string;
  id: string;
}

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

interface CategoryRow {
  id: number;
  name_en: string;
  name_si: string;
  name_ta: string;
}

const EMPTY_FORM: FormState = {
  title: "", description: "", category: "", district: "", town: "",
  address: "", mapLink: "", price: "", period: "perDay", quantity: 1, condition: "used",
  contactName: "", phone: "", whatsapp: "", email: "",
};

export default function CreateAdPage() {
  const { lang, dark, colors } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [coverIndex, setCoverIndex] = useState(0);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryRow[]>([]);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("categories")
      .select("id, name_en, name_si, name_ta")
      .order("id")
      .then(({ data, error }) => {
        if (!cancelled && !error && data) setCategories(data);
      });
    return () => { cancelled = true; };
  }, []);

  const t = dict[lang];
  const { bg, surface, text, textMuted, border, gold } = colors;

  const fieldStyle = (err?: boolean): React.CSSProperties => ({
    width: "100%", background: dark ? "#141B1F" : "#F8F9FA", border: `1px solid ${err ? danger : border}`,
    borderRadius: 10, padding: "11px 13px", color: text, fontSize: 14.5, outline: "none",
  });
  const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: text, marginBottom: 7, display: "block" };

  function update(key: keyof FormState, val: string | number) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function handleFiles(fileList: FileList) {
    const incoming = Array.from(fileList).filter((f) => f.type.startsWith("image/") && f.size <= MAX_SIZE);
    setImages((prev) => {
      const room = MAX_IMAGES - prev.length;
      const toAdd = incoming.slice(0, room).map((f) => ({ file: f, url: URL.createObjectURL(f), id: Math.random().toString(36).slice(2) }));
      return [...prev, ...toAdd];
    });
  }

  function removeImage(id: string) {
    setImages((prev) => {
      const idx = prev.findIndex((i) => i.id === id);
      const next = prev.filter((i) => i.id !== id);
      if (idx === coverIndex) setCoverIndex(0);
      else if (idx < coverIndex) setCoverIndex((c) => c - 1);
      return next;
    });
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
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const { data: ad, error: insertError } = await supabase
        .from("advertisements")
        .insert({
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
          status: "pending",
        })
        .select("id")
        .single();

      if (insertError) throw insertError;

      if (images.length > 0) {
        const rows = [];
        for (let idx = 0; idx < images.length; idx++) {
          const img = images[idx];
          const ext = img.file.name.split(".").pop();
          const path = `${ad.id}/${img.id}.${ext}`;
          const { error: uploadError } = await supabase.storage
            .from("advertisement-images")
            .upload(path, img.file);
          if (uploadError) throw uploadError;
          const { data: pub } = supabase.storage.from("advertisement-images").getPublicUrl(path);
          rows.push({
            advertisement_id: ad.id,
            image_url: pub.publicUrl,
            is_cover: idx === coverIndex,
            sort_order: idx,
          });
        }
        const { error: imagesError } = await supabase.from("advertisement_images").insert(rows);
        if (imagesError) throw imagesError;
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitError(t.submitError);
    } finally {
      setSubmitting(false);
    }
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setImages([]);
    setCoverIndex(0);
    setErrors({});
    setSubmitError(null);
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div style={{ background: bg, color: text, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 20, padding: 40, maxWidth: 440, textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.10)" }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: dark ? "#123028" : "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <CheckCircle2 size={30} color="#0F6E56" />
          </div>
          <h2 className="disp" style={{ fontSize: 20, fontWeight: 600, margin: "0 0 10px" }}>{t.successTitle}</h2>
          <p style={{ fontSize: 14.5, color: textMuted, lineHeight: 1.6, margin: "0 0 28px" }}>{t.successBody}</p>
          <button className="btn" onClick={resetForm} style={{ width: "100%", background: gold, color: "#1F2937", borderRadius: 12, padding: "13px", fontWeight: 600, fontSize: 15, marginBottom: 10 }}>{t.postAnother}</button>
          <Link href="/" className="btn" style={{ display: "block", textAlign: "center", width: "100%", background: "transparent", border: `1px solid ${border}`, color: text, borderRadius: 12, padding: "13px", fontWeight: 500, fontSize: 15, textDecoration: "none" }}>{t.backHome}</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: bg, color: text, minHeight: "100vh" }}>
      <Navbar maxWidth={900} logoProps={{ fontSize: 20 }} />

      <form onSubmit={handleSubmit} style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 80px" }}>
        <h1 className="disp" style={{ fontSize: 26, fontWeight: 700, margin: "0 0 6px" }}>{t.formTitle}</h1>
        <p style={{ fontSize: 14.5, color: textMuted, margin: "0 0 32px", maxWidth: 560 }}>{t.formSub}</p>

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
              <select value={form.district} onChange={(e) => { update("district", e.target.value); update("town", ""); }} style={fieldStyle(errors.district)}>
                <option value="">{t.selectDistrict}</option>
                {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              {errors.district && <FieldError text={t.required} />}
            </div>
            <div>
              <label style={labelStyle}>{t.town} *</label>
              <select value={form.town} onChange={(e) => update("town", e.target.value)} disabled={!form.district} style={{ ...fieldStyle(errors.town), opacity: form.district ? 1 : 0.5 }}>
                <option value="">{t.selectTown}</option>
                {(TOWNS[form.district] || []).map((tn) => <option key={tn} value={tn}>{tn}</option>)}
              </select>
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

        <Section title={t.sectionImages}>
          <p style={{ fontSize: 13, color: textMuted, margin: "-6px 0 16px" }}>{t.imagesSub}</p>

          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
            style={{
              border: `2px dashed ${dragOver ? gold : border}`, borderRadius: 14, padding: "36px 20px",
              textAlign: "center", cursor: "pointer", background: dragOver ? (dark ? "#2A2410" : "#FFFCF2") : "transparent",
              marginBottom: images.length ? 18 : 4,
            }}
          >
            <UploadCloud size={26} color={dragOver ? gold : textMuted} style={{ marginBottom: 10 }} />
            <div style={{ fontSize: 14, fontWeight: 500 }}>{t.dropText}</div>
            <div style={{ fontSize: 12.5, color: textMuted, marginTop: 4 }}>{t.dropSub}</div>
            <input ref={fileInputRef} type="file" accept="image/*" multiple hidden onChange={(e) => e.target.files && handleFiles(e.target.files)} />
          </div>

          {images.length >= MAX_IMAGES && <div style={{ fontSize: 12.5, color: danger, marginBottom: 14 }}>{t.maxImages}</div>}

          {images.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))", gap: 12 }}>
              {images.map((img, idx) => (
                <div key={img.id} style={{ position: "relative", borderRadius: 12, overflow: "hidden", border: `1px solid ${idx === coverIndex ? gold : border}`, aspectRatio: "1" }}>
                  <img src={img.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <button type="button" onClick={() => removeImage(img.id)} className="btn" style={{ position: "absolute", top: 6, right: 6, width: 22, height: 22, borderRadius: "50%", background: "rgba(0,0,0,0.55)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <X size={13} />
                  </button>
                  <button type="button" onClick={() => setCoverIndex(idx)} className="btn" title={t.setCover} style={{
                    position: "absolute", bottom: 6, left: 6, display: "flex", alignItems: "center", gap: 4,
                    background: idx === coverIndex ? gold : "rgba(0,0,0,0.55)", color: idx === coverIndex ? "#1F2937" : "#fff",
                    fontSize: 10.5, fontWeight: 600, padding: "3px 8px", borderRadius: 8,
                  }}>
                    <Star size={11} fill={idx === coverIndex ? "#1F2937" : "none"} /> {idx === coverIndex ? t.cover : ""}
                  </button>
                </div>
              ))}
              {images.length < MAX_IMAGES && (
                <div onClick={() => fileInputRef.current?.click()} style={{ aspectRatio: "1", borderRadius: 12, border: `1px dashed ${border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <ImagePlus size={22} color={textMuted} />
                </div>
              )}
            </div>
          )}
        </Section>

        {submitError && (
          <div style={{ fontSize: 13.5, color: danger, marginBottom: 14, textAlign: "center" }}>{submitError}</div>
        )}

        <button type="submit" disabled={submitting} className="btn" style={{
          width: "100%", background: gold, color: "#1F2937", borderRadius: 14, padding: "16px",
          fontWeight: 600, fontSize: 16, opacity: submitting ? 0.7 : 1,
        }}>
          {submitting ? t.submitting : t.submit}
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
