import React, { useState } from "react";
import {
  Wrench, Sun, Moon, Globe, ChevronDown, Mail, Lock, User, Phone,
  Eye, EyeOff, MapPin, CheckCircle2
} from "lucide-react";

const LANGS = { en: "English", si: "සිංහල", ta: "தமிழ்" };

const dict = {
  en: {
    loginTitle: "Welcome back", loginSub: "Log in to manage your advertisements.",
    registerTitle: "Create your account", registerSub: "Register to publish and manage advertisements.",
    email: "Email", emailPh: "you@example.com", password: "Password", passwordPh: "Enter your password",
    confirmPassword: "Confirm password", rememberMe: "Remember me", forgotPassword: "Forgot password?",
    login: "Log in", register: "Register", continueGuest: "Continue as guest",
    noAccount: "Don't have an account?", haveAccount: "Already have an account?",
    signUp: "Sign up", signIn: "Sign in",
    firstName: "First name", lastName: "Last name", phone: "Phone", phonePh: "07X XXX XXXX",
    district: "District", town: "Town", selectDistrict: "Select district", selectTown: "Select town",
    agreeTerms: "I agree to the", termsLink: "Terms of service", andText: "and", privacyLink: "Privacy policy",
    required: "This field is required", passwordMismatch: "Passwords do not match",
    mustAgree: "You must agree to the terms to continue",
  },
  si: {
    loginTitle: "නැවත සාදරයෙන් පිළිගනිමු", loginSub: "ඔබේ දැන්වීම් කළමනාකරණය කිරීමට පිවිසෙන්න.",
    registerTitle: "ඔබේ ගිණුම සාදන්න", registerSub: "දැන්වීම් පළ කිරීමට සහ කළමනාකරණය කිරීමට ලියාපදිංචි වන්න.",
    email: "විද්‍යුත් තැපෑල", emailPh: "you@example.com", password: "මුරපදය", passwordPh: "ඔබේ මුරපදය ඇතුළත් කරන්න",
    confirmPassword: "මුරපදය තහවුරු කරන්න", rememberMe: "මතක තබාගන්න", forgotPassword: "මුරපදය අමතක වුණාද?",
    login: "පිවිසෙන්න", register: "ලියාපදිංචි වන්න", continueGuest: "අමුත්තෙකු ලෙස ඉදිරියට යන්න",
    noAccount: "ගිණුමක් නැද්ද?", haveAccount: "දැනටමත් ගිණුමක් තිබේද?",
    signUp: "ලියාපදිංචි වන්න", signIn: "පිවිසෙන්න",
    firstName: "මුල් නම", lastName: "අග නම", phone: "දුරකථනය", phonePh: "07X XXX XXXX",
    district: "දිස්ත්‍රික්කය", town: "නගරය", selectDistrict: "දිස්ත්‍රික්කය තෝරන්න", selectTown: "නගරය තෝරන්න",
    agreeTerms: "මම එකග වෙමි", termsLink: "සේවා නියමයන්ට", andText: "සහ", privacyLink: "පෞද්ගලිකත්ව ප්‍රතිපත්තියට",
    required: "මෙම කෙත්‍රය අවශ්‍යයි", passwordMismatch: "මුරපද නොගැලපේ",
    mustAgree: "ඉදිරියට යාමට ඔබ නියමයන්ට එකග විය යුතුය",
  },
  ta: {
    loginTitle: "மீண்டும் வருக", loginSub: "உங்கள் விளம்பரங்களை நிர்வகிக்க உள்நுழையவும்.",
    registerTitle: "உங்கள் கணக்கை உருவாக்கவும்", registerSub: "விளம்பரங்களை வெளியிட மற்றும் நிர்வகிக்க பதிவு செய்யவும்.",
    email: "மின்னஞ்சல்", emailPh: "you@example.com", password: "கடவுச்சொல்", passwordPh: "உங்கள் கடவுச்சொல்லை உள்ளிடவும்",
    confirmPassword: "கடவுச்சொல்லை உறுதிப்படுத்தவும்", rememberMe: "என்னை நினைவில் வை", forgotPassword: "கடவுச்சொல் மறந்துவிட்டதா?",
    login: "உள்நுழை", register: "பதிவு செய்க", continueGuest: "விருந்தினராக தொடரவும்",
    noAccount: "கணக்கு இல்லையா?", haveAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
    signUp: "பதிவு செய்க", signIn: "உள்நுழை",
    firstName: "முதல் பெயர்", lastName: "கடைசி பெயர்", phone: "தொலைபேசி", phonePh: "07X XXX XXXX",
    district: "மாவட்டம்", town: "நகரம்", selectDistrict: "மாவட்டத்தை தேர்ந்தெடுக்கவும்", selectTown: "நகரத்தை தேர்ந்தெடுக்கவும்",
    agreeTerms: "நான் ஒப்புக்கொள்கிறேன்", termsLink: "சேவை விதிமுறைகளுக்கு", andText: "மற்றும்", privacyLink: "தனியுரிமைக் கொள்கைக்கு",
    required: "இந்த புலம் அவசியம்", passwordMismatch: "கடவுச்சொற்கள் பொருந்தவில்லை",
    mustAgree: "தொடர நீங்கள் விதிமுறைகளுக்கு ஒப்புக்கொள்ள வேண்டும்",
  },
};

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

export default function PalanchiAuth() {
  const [lang, setLang] = useState("en");
  const [dark, setDark] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mode, setMode] = useState("login");
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const [login, setLogin] = useState({ email: "", password: "", remember: false });
  const [reg, setReg] = useState({
    firstName: "", lastName: "", email: "", phone: "", district: "", town: "",
    password: "", confirmPassword: "", agree: false
  });

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
    borderRadius: 10, padding: "11px 13px 11px 38px", color: text, fontSize: 14.5, outline: "none"
  });
  const labelStyle = { fontSize: 13, fontWeight: 600, color: text, marginBottom: 6, display: "block" };
  const iconStyle = { position: "absolute", left: 13, top: 13 };

  function handleLoginSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!login.email.trim()) errs.lEmail = true;
    if (!login.password.trim()) errs.lPassword = true;
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSuccess("login");
  }

  function handleRegisterSubmit(e) {
    e.preventDefault();
    const errs = {};
    ["firstName", "lastName", "email", "phone", "district", "town", "password", "confirmPassword"].forEach(k => {
      if (!String(reg[k]).trim()) errs[k] = true;
    });
    if (reg.password && reg.confirmPassword && reg.password !== reg.confirmPassword) errs.confirmPassword = true;
    if (!reg.agree) errs.agree = true;
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSuccess("register");
  }

  if (success) {
    return (
      <div style={{ fontFamily: "'Inter', sans-serif", background: bg, color: text, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600&display=swap'); .disp{font-family:'Space Grotesk',sans-serif;} .btn{cursor:pointer;border:none;transition:transform .15s;} .btn:active{transform:scale(0.97);}`}</style>
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 20, padding: 40, maxWidth: 420, textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}>
          <div style={{ width: 58, height: 58, borderRadius: "50%", background: dark ? "#123028" : "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
            <CheckCircle2 size={28} color="#0F6E56" />
          </div>
          <h2 className="disp" style={{ fontSize: 19, fontWeight: 600, margin: "0 0 8px" }}>
            {success === "login" ? "Logged in successfully" : "Account created successfully"}
          </h2>
          <p style={{ fontSize: 14, color: textMuted, marginBottom: 26 }}>
            {success === "login" ? "Welcome back to Palanchi.lk." : "You can now log in and manage your advertisements."}
          </p>
          <button className="btn" onClick={() => { setSuccess(false); setMode("login"); }} style={{ width: "100%", background: gold, color: "#1F2937", borderRadius: 12, padding: "13px", fontWeight: 600, fontSize: 15 }}>
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: bg, color: text, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        .disp { font-family: 'Space Grotesk', sans-serif; }
        .btn { cursor:pointer; border:none; transition: transform .15s, background .2s; }
        .btn:active { transform: scale(0.97); }
        ::placeholder { color: ${textMuted}; }
        input:focus, select:focus { border-color: ${gold} !important; }
      `}</style>

      <header style={{ borderBottom: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 460, margin: "0 auto", padding: "48px 24px 80px" }}>
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 22, padding: "32px 28px", boxShadow: "0 12px 40px rgba(0,0,0,0.06)" }}>

          <div style={{ display: "flex", background: dark ? "#141B1F" : "#F1EFE8", borderRadius: 12, padding: 4, marginBottom: 28 }}>
            <button className="btn" onClick={() => { setMode("login"); setErrors({}); }} style={{
              flex: 1, padding: "9px", borderRadius: 9, fontSize: 13.5, fontWeight: 600,
              background: mode === "login" ? surface : "transparent", color: mode === "login" ? text : textMuted,
              boxShadow: mode === "login" ? "0 1px 4px rgba(0,0,0,0.08)" : "none"
            }}>{t.signIn}</button>
            <button className="btn" onClick={() => { setMode("register"); setErrors({}); }} style={{
              flex: 1, padding: "9px", borderRadius: 9, fontSize: 13.5, fontWeight: 600,
              background: mode === "register" ? surface : "transparent", color: mode === "register" ? text : textMuted,
              boxShadow: mode === "register" ? "0 1px 4px rgba(0,0,0,0.08)" : "none"
            }}>{t.signUp}</button>
          </div>

          {mode === "login" ? (
            <>
              <h1 className="disp" style={{ fontSize: 22, fontWeight: 700, margin: "0 0 6px" }}>{t.loginTitle}</h1>
              <p style={{ fontSize: 13.5, color: textMuted, margin: "0 0 26px" }}>{t.loginSub}</p>

              <form onSubmit={handleLoginSubmit}>
                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>{t.email}</label>
                  <div style={{ position: "relative" }}>
                    <Mail size={16} color={textMuted} style={iconStyle} />
                    <input value={login.email} onChange={e => setLogin({ ...login, email: e.target.value })} placeholder={t.emailPh} style={fieldStyle(errors.lEmail)} />
                  </div>
                  {errors.lEmail && <FieldError text={t.required} color={danger} />}
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>{t.password}</label>
                  <div style={{ position: "relative" }}>
                    <Lock size={16} color={textMuted} style={iconStyle} />
                    <input type={showPw ? "text" : "password"} value={login.password} onChange={e => setLogin({ ...login, password: e.target.value })} placeholder={t.passwordPh} style={{ ...fieldStyle(errors.lPassword), paddingRight: 38 }} />
                    <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 12, top: 11, background: "none", border: "none", cursor: "pointer", color: textMuted }}>
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.lPassword && <FieldError text={t.required} color={danger} />}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: textMuted, cursor: "pointer" }}>
                    <input type="checkbox" checked={login.remember} onChange={e => setLogin({ ...login, remember: e.target.checked })} />
                    {t.rememberMe}
                  </label>
                  <a href="#" style={{ fontSize: 13, color: teal, fontWeight: 600, textDecoration: "none" }}>{t.forgotPassword}</a>
                </div>

                <button type="submit" className="btn" style={{ width: "100%", background: gold, color: "#1F2937", borderRadius: 12, padding: "13px", fontWeight: 600, fontSize: 15, marginBottom: 10 }}>
                  {t.login}
                </button>
                <button type="button" className="btn" style={{ width: "100%", background: "transparent", border: `1px solid ${border}`, color: text, borderRadius: 12, padding: "13px", fontWeight: 500, fontSize: 14.5 }}>
                  {t.continueGuest}
                </button>
              </form>

              <p style={{ textAlign: "center", fontSize: 13.5, color: textMuted, marginTop: 22 }}>
                {t.noAccount} <span onClick={() => setMode("register")} style={{ color: teal, fontWeight: 600, cursor: "pointer" }}>{t.signUp}</span>
              </p>
            </>
          ) : (
            <>
              <h1 className="disp" style={{ fontSize: 22, fontWeight: 700, margin: "0 0 6px" }}>{t.registerTitle}</h1>
              <p style={{ fontSize: 13.5, color: textMuted, margin: "0 0 26px" }}>{t.registerSub}</p>

              <form onSubmit={handleRegisterSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                  <div>
                    <label style={labelStyle}>{t.firstName}</label>
                    <div style={{ position: "relative" }}>
                      <User size={16} color={textMuted} style={iconStyle} />
                      <input value={reg.firstName} onChange={e => setReg({ ...reg, firstName: e.target.value })} style={fieldStyle(errors.firstName)} />
                    </div>
                    {errors.firstName && <FieldError text={t.required} color={danger} />}
                  </div>
                  <div>
                    <label style={labelStyle}>{t.lastName}</label>
                    <input value={reg.lastName} onChange={e => setReg({ ...reg, lastName: e.target.value })} style={{ ...fieldStyle(errors.lastName), paddingLeft: 13 }} />
                    {errors.lastName && <FieldError text={t.required} color={danger} />}
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>{t.email}</label>
                  <div style={{ position: "relative" }}>
                    <Mail size={16} color={textMuted} style={iconStyle} />
                    <input value={reg.email} onChange={e => setReg({ ...reg, email: e.target.value })} placeholder={t.emailPh} style={fieldStyle(errors.email)} />
                  </div>
                  {errors.email && <FieldError text={t.required} color={danger} />}
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>{t.phone}</label>
                  <div style={{ position: "relative" }}>
                    <Phone size={16} color={textMuted} style={iconStyle} />
                    <input value={reg.phone} onChange={e => setReg({ ...reg, phone: e.target.value })} placeholder={t.phonePh} style={fieldStyle(errors.phone)} />
                  </div>
                  {errors.phone && <FieldError text={t.required} color={danger} />}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                  <div>
                    <label style={labelStyle}>{t.district}</label>
                    <div style={{ position: "relative" }}>
                      <MapPin size={16} color={textMuted} style={iconStyle} />
                      <select value={reg.district} onChange={e => setReg({ ...reg, district: e.target.value, town: "" })} style={fieldStyle(errors.district)}>
                        <option value="">{t.selectDistrict}</option>
                        {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    {errors.district && <FieldError text={t.required} color={danger} />}
                  </div>
                  <div>
                    <label style={labelStyle}>{t.town}</label>
                    <select value={reg.town} onChange={e => setReg({ ...reg, town: e.target.value })} disabled={!reg.district} style={{ ...fieldStyle(errors.town), paddingLeft: 13, opacity: reg.district ? 1 : 0.5 }}>
                      <option value="">{t.selectTown}</option>
                      {(TOWNS[reg.district] || []).map(tn => <option key={tn} value={tn}>{tn}</option>)}
                    </select>
                    {errors.town && <FieldError text={t.required} color={danger} />}
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>{t.password}</label>
                  <div style={{ position: "relative" }}>
                    <Lock size={16} color={textMuted} style={iconStyle} />
                    <input type={showPw ? "text" : "password"} value={reg.password} onChange={e => setReg({ ...reg, password: e.target.value })} style={{ ...fieldStyle(errors.password), paddingRight: 38 }} />
                    <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 12, top: 11, background: "none", border: "none", cursor: "pointer", color: textMuted }}>
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && <FieldError text={t.required} color={danger} />}
                </div>

                <div style={{ marginBottom: 18 }}>
                  <label style={labelStyle}>{t.confirmPassword}</label>
                  <div style={{ position: "relative" }}>
                    <Lock size={16} color={textMuted} style={iconStyle} />
                    <input type={showPw2 ? "text" : "password"} value={reg.confirmPassword} onChange={e => setReg({ ...reg, confirmPassword: e.target.value })} style={{ ...fieldStyle(errors.confirmPassword), paddingRight: 38 }} />
                    <button type="button" onClick={() => setShowPw2(!showPw2)} style={{ position: "absolute", right: 12, top: 11, background: "none", border: "none", cursor: "pointer", color: textMuted }}>
                      {showPw2 ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <FieldError text={reg.password !== reg.confirmPassword && reg.confirmPassword ? t.passwordMismatch : t.required} color={danger} />}
                </div>

                <label style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12.5, color: textMuted, marginBottom: 22, cursor: "pointer" }}>
                  <input type="checkbox" checked={reg.agree} onChange={e => setReg({ ...reg, agree: e.target.checked })} style={{ marginTop: 2 }} />
                  <span>{t.agreeTerms} <a href="#" style={{ color: teal, fontWeight: 600 }}>{t.termsLink}</a> {t.andText} <a href="#" style={{ color: teal, fontWeight: 600 }}>{t.privacyLink}</a></span>
                </label>
                {errors.agree && <div style={{ marginTop: -14, marginBottom: 14 }}><FieldError text={t.mustAgree} color={danger} /></div>}

                <button type="submit" className="btn" style={{ width: "100%", background: gold, color: "#1F2937", borderRadius: 12, padding: "13px", fontWeight: 600, fontSize: 15 }}>
                  {t.register}
                </button>
              </form>

              <p style={{ textAlign: "center", fontSize: 13.5, color: textMuted, marginTop: 22 }}>
                {t.haveAccount} <span onClick={() => setMode("login")} style={{ color: teal, fontWeight: 600, cursor: "pointer" }}>{t.signIn}</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function FieldError({ text, color }) {
  return <div style={{ fontSize: 11.5, color, marginTop: 5 }}>{text}</div>;
}
