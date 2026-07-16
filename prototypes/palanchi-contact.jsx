import React, { useState } from "react";
import {
  Wrench, Sun, Moon, Globe, ChevronDown, Phone, Mail, MapPin, Clock,
  MessageCircle, Facebook, Instagram, Youtube, ChevronDown as Chev, Send, CheckCircle2
} from "lucide-react";

const LANGS = { en: "English", si: "සිංහල", ta: "தமிழ்" };

const dict = {
  en: {
    navHome: "Home", navCreate: "Create ad", navContact: "Contact", login: "Log in", register: "Register",
    pageTitle: "Get in touch", pageSub: "Questions, feedback, or need help with a listing? We're here for you.",
    callUs: "Call us", whatsapp: "WhatsApp", emailUs: "Email us", visitUs: "Visit us",
    hours: "Working hours", hoursValue: "Mon – Sat, 8:30 AM – 6:00 PM",
    formTitle: "Send us a message", name: "Your name", namePh: "Full name",
    email: "Email", emailPh: "you@example.com", subject: "Subject", subjectPh: "How can we help?",
    message: "Message", messagePh: "Write your message here...",
    send: "Send message", sending: "Sending...", required: "This field is required",
    sentTitle: "Message sent", sentBody: "Thanks for reaching out — our team will get back to you soon.",
    faqTitle: "Frequently asked questions",
    faqs: [
      { q: "Do I need an account to post an ad?", a: "No. You can publish an ad as a guest, but registering lets you edit and manage your listings later." },
      { q: "How long does approval take?", a: "Most ads are reviewed within 24 hours before going live." },
      { q: "Is listing an ad free?", a: "Yes, publishing a standard listing is free. Featured placement is optional." },
      { q: "What areas does Palanchi.lk cover?", a: "All 25 districts and their towns across Sri Lanka." },
    ],
    follow: "Follow us",
  },
  si: {
    navHome: "මුල් පිටුව", navCreate: "දැන්වීමක් පළ කරන්න", navContact: "අමතන්න", login: "පිවිසෙන්න", register: "ලියාපදිංචි වන්න",
    pageTitle: "අප හා සම්බන්ධ වන්න", pageSub: "ප්‍රශ්න, අදහස්, හෝ දැන්වීමක් සම්බන්ධව උදව් අවශ්‍යද? අපි ඔබ වෙනුවෙන් මෙහි සිටිමු.",
    callUs: "අමතන්න", whatsapp: "WhatsApp", emailUs: "විද්‍යුත් තැපෑල", visitUs: "අප වෙත පැමිණෙන්න",
    hours: "වැඩ කරන වේලාවන්", hoursValue: "සඳුදා – සෙනසුරාදා, පෙ.ව 8:30 – ප.ව 6:00",
    formTitle: "අපට පණිවිඩයක් එවන්න", name: "ඔබේ නම", namePh: "සම්පූර්ණ නම",
    email: "විද්‍යුත් තැපෑල", emailPh: "you@example.com", subject: "විෂය", subjectPh: "අපට කෙසේ උදව් කළ හැකිද?",
    message: "පණිවිඩය", messagePh: "ඔබේ පණිවිඩය මෙහි ලියන්න...",
    send: "පණිවිඩය එවන්න", sending: "එවමින්...", required: "මෙම කෙත්‍රය අවශ්‍යයි",
    sentTitle: "පණිවිඩය එවා ඇත", sentBody: "සම්බන්ධ වීම ගැන ස්තුතියි — අපගේ කණ්ඩායම ඉක්මනින් ඔබ හා සම්බන්ධ වනු ඇත.",
    faqTitle: "නිතර අසන ප්‍රශ්න",
    faqs: [
      { q: "දැන්වීමක් පළ කිරීමට ගිණුමක් අවශ්‍යද?", a: "නැත. ඔබට අමුත්තෙකු ලෙස දැන්වීමක් පළ කළ හැක, නමුත් ලියාපදිංචි වීමෙන් පසුව ඔබේ දැන්වීම් සංස්කරණය කිරීමට හා කළමනාකරණය කිරීමට හැකියි." },
      { q: "අනුමැතියට කොපමණ කාලයක් ගතවේද?", a: "බොහෝ දැන්වීම් ප්‍රකාශයට පත් කිරීමට පෙර පැය 24ක් තුළ සමාලෝචනය කෙරේ." },
      { q: "දැන්වීමක් පළ කිරීම නොමිලේද?", a: "ඔව්, සම්මත දැන්වීමක් පළ කිරීම නොමිලේ. විශේෂාංගිත ස්ථානගත කිරීම විකල්පයකි." },
      { q: "Palanchi.lk ආවරණය කරන ප්‍රදේශ මොනවාද?", a: "ශ්‍රී ලංකාවේ සියලුම දිස්ත්‍රික්ක 25 සහ ඒවායේ නගර." },
    ],
    follow: "අප අනුගමනය කරන්න",
  },
  ta: {
    navHome: "முகப்பு", navCreate: "விளம்பரம் இடு", navContact: "தொடர்பு", login: "உள்நுழை", register: "பதிவு செய்க",
    pageTitle: "எங்களை தொடர்பு கொள்ளுங்கள்", pageSub: "கேள்விகள், கருத்துகள், அல்லது பட்டியலில் உதவி தேவையா? நாங்கள் இங்கே இருக்கிறோம்.",
    callUs: "எங்களை அழைக்கவும்", whatsapp: "WhatsApp", emailUs: "மின்னஞ்சல் அனுப்பவும்", visitUs: "எங்களை பார்வையிடவும்",
    hours: "வேலை நேரம்", hoursValue: "திங்கள் – சனி, காலை 8:30 – மாலை 6:00",
    formTitle: "எங்களுக்கு செய்தி அனுப்பவும்", name: "உங்கள் பெயர்", namePh: "முழு பெயர்",
    email: "மின்னஞ்சல்", emailPh: "you@example.com", subject: "பொருள்", subjectPh: "நாங்கள் எப்படி உதவ முடியும்?",
    message: "செய்தி", messagePh: "உங்கள் செய்தியை இங்கே எழுதவும்...",
    send: "செய்தி அனுப்பு", sending: "அனுப்புகிறது...", required: "இந்த புலம் அவசியம்",
    sentTitle: "செய்தி அனுப்பப்பட்டது", sentBody: "தொடர்பு கொண்டதற்கு நன்றி — எங்கள் குழு விரைவில் உங்களை தொடர்பு கொள்ளும்.",
    faqTitle: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    faqs: [
      { q: "விளம்பரம் இட கணக்கு தேவையா?", a: "இல்லை. நீங்கள் விருந்தினராக விளம்பரத்தை வெளியிடலாம், ஆனால் பதிவு செய்வதன் மூலம் பின்னர் உங்கள் பட்டியல்களை திருத்தலாம் மற்றும் நிர்வகிக்கலாம்." },
      { q: "அங்கீகாரத்திற்கு எவ்வளவு நேரம் ஆகும்?", a: "பெரும்பாலான விளம்பரங்கள் வெளியிடப்படுவதற்கு முன் 24 மணி நேரத்திற்குள் மதிப்பாய்வு செய்யப்படும்." },
      { q: "விளம்பரம் இடுவது இலவசமா?", a: "ஆம், standard பட்டியலை வெளியிடுவது இலவசம். சிறப்பு இடம் விருப்பமானது." },
      { q: "Palanchi.lk எந்த பகுதிகளை உள்ளடக்குகிறது?", a: "இலங்கை முழுவதும் உள்ள அனைத்து 25 மாவட்டங்களும் அவற்றின் நகரங்களும்." },
    ],
    follow: "எங்களை பின்தொடரவும்",
  },
};

export default function PalanchiContact() {
  const [lang, setLang] = useState("en");
  const [dark, setDark] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const t = dict[lang];

  const bg = dark ? "#10161A" : "#F8F9FA";
  const surface = dark ? "#1A2226" : "#FFFFFF";
  const text = dark ? "#F3F4F6" : "#1F2937";
  const textMuted = dark ? "#9CA3AF" : "#6B7280";
  const border = dark ? "#2A343A" : "#E7E5DE";
  const gold = "#F4B400";
  const teal = dark ? "#1D9E75" : "#0F3D3E";
  const danger = "#D64545";

  const fieldStyle = (err) => ({
    width: "100%", background: dark ? "#141B1F" : "#F8F9FA", border: `1px solid ${err ? danger : border}`,
    borderRadius: 10, padding: "11px 13px", color: text, fontSize: 14.5, outline: "none", fontFamily: "inherit"
  });
  const labelStyle = { fontSize: 13, fontWeight: 600, color: text, marginBottom: 6, display: "block" };

  function update(key, val) { setForm(f => ({ ...f, [key]: val })); }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    ["name", "email", "subject", "message"].forEach(k => { if (!form[k].trim()) errs[k] = true; });
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 900);
  }

  const contactCards = [
    { Icon: Phone, label: t.callUs, value: "+94 11 234 5678" },
    { Icon: MessageCircle, label: t.whatsapp, value: "+94 77 123 4567" },
    { Icon: Mail, label: t.emailUs, value: "hello@palanchi.lk" },
    { Icon: MapPin, label: t.visitUs, value: "142 Galle Road, Colombo 03" },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: bg, color: text, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        .disp { font-family: 'Space Grotesk', sans-serif; }
        .btn { cursor:pointer; border:none; transition: transform .15s, background .2s; }
        .btn:active { transform: scale(0.97); }
        ::placeholder { color: ${textMuted}; }
        input:focus, textarea:focus { border-color: ${gold} !important; }
        .card-hover { transition: transform .2s ease, box-shadow .2s ease; }
        .card-hover:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(0,0,0,0.08); }
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

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 0", textAlign: "center" }}>
        <h1 className="disp" style={{ fontSize: "clamp(28px,4vw,38px)", fontWeight: 700, margin: "0 0 12px" }}>{t.pageTitle}</h1>
        <p style={{ fontSize: 15.5, color: textMuted, maxWidth: 520, margin: "0 auto" }}>{t.pageSub}</p>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14 }}>
          {contactCards.map((c, i) => (
            <div key={i} className="card-hover" style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: dark ? "#233038" : "#FFF7E0", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <c.Icon size={19} color={gold} />
              </div>
              <div style={{ fontSize: 12.5, color: textMuted, marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontSize: 14.5, fontWeight: 600 }}>{c.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="split">

        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 18, padding: 26 }}>
          <h2 className="disp" style={{ fontSize: 18, fontWeight: 600, margin: "0 0 20px" }}>{t.formTitle}</h2>
          {sent ? (
            <div style={{ textAlign: "center", padding: "36px 10px" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: dark ? "#123028" : "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <CheckCircle2 size={26} color="#0F6E56" />
              </div>
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>{t.sentTitle}</div>
              <div style={{ fontSize: 13.5, color: textMuted }}>{t.sentBody}</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }} className="grid2">
                <div>
                  <label style={labelStyle}>{t.name}</label>
                  <input value={form.name} onChange={e => update("name", e.target.value)} placeholder={t.namePh} style={fieldStyle(errors.name)} />
                  {errors.name && <FieldError text={t.required} color={danger} />}
                </div>
                <div>
                  <label style={labelStyle}>{t.email}</label>
                  <input value={form.email} onChange={e => update("email", e.target.value)} placeholder={t.emailPh} style={fieldStyle(errors.email)} />
                  {errors.email && <FieldError text={t.required} color={danger} />}
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>{t.subject}</label>
                <input value={form.subject} onChange={e => update("subject", e.target.value)} placeholder={t.subjectPh} style={fieldStyle(errors.subject)} />
                {errors.subject && <FieldError text={t.required} color={danger} />}
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>{t.message}</label>
                <textarea value={form.message} onChange={e => update("message", e.target.value)} placeholder={t.messagePh} rows={5} style={{ ...fieldStyle(errors.message), resize: "vertical" }} />
                {errors.message && <FieldError text={t.required} color={danger} />}
              </div>
              <button type="submit" disabled={sending} className="btn" style={{ width: "100%", background: gold, color: "#1F2937", borderRadius: 12, padding: "13px", fontWeight: 600, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: sending ? 0.7 : 1 }}>
                <Send size={15} /> {sending ? t.sending : t.send}
              </button>
            </form>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: dark ? "#152025" : "#0F3D3E", borderRadius: 18, overflow: "hidden", position: "relative", minHeight: 220, flex: 1 }}>
            <div style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
              backgroundImage: "radial-gradient(circle at 30% 30%, rgba(244,180,0,0.15), transparent 60%), radial-gradient(circle at 70% 70%, rgba(244,180,0,0.1), transparent 60%)"
            }}>
              <div style={{ textAlign: "center", color: "#F0FBF8" }}>
                <MapPin size={30} color={gold} style={{ marginBottom: 10 }} />
                <div style={{ fontSize: 14, fontWeight: 500 }}>142 Galle Road, Colombo 03</div>
                <div style={{ fontSize: 12.5, color: "#B8CFCB", marginTop: 4 }}>Map preview — connect Google Maps API for live map</div>
              </div>
            </div>
          </div>

          <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <Clock size={17} color={teal} />
              <div style={{ fontSize: 13.5, fontWeight: 600 }}>{t.hours}</div>
            </div>
            <div style={{ fontSize: 13.5, color: textMuted, marginBottom: 16 }}>{t.hoursValue}</div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: textMuted, marginBottom: 10 }}>{t.follow}</div>
            <div style={{ display: "flex", gap: 8 }}>
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <div key={i} className="btn" style={{ width: 34, height: 34, borderRadius: 10, background: dark ? "#233038" : "#FFF7E0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={16} color={gold} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px 64px" }}>
        <h2 className="disp" style={{ fontSize: 20, fontWeight: 600, textAlign: "center", marginBottom: 20 }}>{t.faqTitle}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {t.faqs.map((f, i) => (
            <div key={i} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 14, overflow: "hidden" }}>
              <div onClick={() => setOpenFaq(openFaq === i ? -1 : i)} style={{ padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                <span style={{ fontSize: 14.5, fontWeight: 500 }}>{f.q}</span>
                <Chev size={16} color={textMuted} style={{ transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform .2s", flexShrink: 0, marginLeft: 12 }} />
              </div>
              {openFaq === i && (
                <div style={{ padding: "0 18px 16px", fontSize: 13.5, color: textMuted, lineHeight: 1.6 }}>{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`@media (max-width: 800px) { .split { grid-template-columns: 1fr !important; } .grid2 { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

function FieldError({ text, color }) {
  return <div style={{ fontSize: 11.5, color, marginTop: 5 }}>{text}</div>;
}
