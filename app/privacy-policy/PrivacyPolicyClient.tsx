"use client";

import { Navbar } from "@/components/Navbar";
import { useTheme } from "@/components/ThemeProvider";
import type { Lang } from "@/lib/i18n";

type Section = { heading: string; body: string[] };

const dict: Record<Lang, { title: string; lastUpdated: string; intro: string; sections: Section[]; seeAlso: string; termsLink: string }> = {
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: 18 July 2026",
    intro: "This Privacy Policy explains what information Palanchi.lk collects, how we use it, and the choices you have. This is a general placeholder policy — please review and adapt it to your business and applicable law before relying on it.",
    sections: [
      {
        heading: "1. Information we collect",
        body: [
          "When you create an account, we collect your name, email address, phone number, district and town. When you publish an advertisement, we collect the listing details you provide, including photos, pricing, description and your contact information (phone, WhatsApp, email).",
          "When you send us a message through the Contact page, we store your name, email address, subject and message so our team can respond to you.",
        ],
      },
      {
        heading: "2. How we use your information",
        body: [
          "We use the information you provide to operate the marketplace: to display your advertisements to other users, to let you manage your listings from \"My Ads\", to respond to support requests, and to maintain the security of the platform.",
          "Contact details on a published advertisement (phone, WhatsApp, email) are shown publicly on that listing so interested renters can reach you directly.",
        ],
      },
      {
        heading: "3. Cookies and local storage",
        body: [
          "We use your browser's local storage to remember your language and light/dark theme preference. We use authentication cookies to keep you signed in. We do not use third-party advertising or tracking cookies.",
        ],
      },
      {
        heading: "4. Third-party services",
        body: [
          "We use Supabase to store account, listing and message data, and to handle authentication. Images you upload are stored with our hosting provider. These providers process data on our behalf and are not permitted to use it for their own purposes.",
        ],
      },
      {
        heading: "5. Data retention",
        body: [
          "We keep your account and listing data for as long as your account is active. You can delete individual listings at any time from \"My Ads\". To request deletion of your account and associated data, contact us using the details on our Contact page.",
        ],
      },
      {
        heading: "6. Your rights",
        body: [
          "You can access, correct or delete the personal information associated with your account at any time by editing your listings or contacting us. If you believe your data has been misused, you may also lodge a complaint with the relevant authority in your jurisdiction.",
        ],
      },
      {
        heading: "7. Contact us",
        body: [
          "If you have questions about this Privacy Policy or how your data is handled, please reach out via the Contact page.",
        ],
      },
    ],
    seeAlso: "See also our",
    termsLink: "Terms of Service",
  },
  si: {
    title: "පෞද්ගලිකත්ව ප්‍රතිපත්තිය",
    lastUpdated: "අවසන් වරට යාවත්කාලීන කළේ: 2026 ජූලි 18",
    intro: "මෙම පෞද්ගලිකත්ව ප්‍රතිපත්තිය මගින් Palanchi.lk විසින් රැස් කරන තොරතුරු මොනවාද, ඒවා අප භාවිත කරන ආකාරය සහ ඔබට ඇති තේරීම් පැහැදිලි කරයි. මෙය පොදු නියැදි ප්‍රතිපත්තියක් වන අතර, එය මත රඳා පැවතීමට පෙර ඔබේ ව්‍යාපාරයට සහ අදාළ නීතියට ගැළපෙන පරිදි සමාලෝචනය කර සකස් කරගන්න.",
    sections: [
      {
        heading: "1. අප රැස් කරන තොරතුරු",
        body: [
          "ඔබ ගිණුමක් සාදන විට, අපි ඔබේ නම, විද්‍යුත් තැපැල් ලිපිනය, දුරකථන අංකය, දිස්ත්‍රික්කය සහ නගරය රැස් කරමු. ඔබ දැන්වීමක් පළ කරන විට, ඡායාරූප, මිල ගණන්, විස්තරය සහ ඔබේ සම්බන්ධතා තොරතුරු (දුරකථනය, WhatsApp, විද්‍යුත් තැපෑල) ඇතුළුව ඔබ ලබා දෙන දැන්වීම් විස්තර අපි රැස් කරමු.",
          "ඔබ අමතන්න පිටුව හරහා අපට පණිවිඩයක් එවන විට, අපගේ කණ්ඩායමට ඔබට පිළිතුරු දිය හැකි වන පරිදි ඔබේ නම, විද්‍යුත් තැපැල් ලිපිනය, විෂය සහ පණිවිඩය අප ගබඩා කරමු.",
        ],
      },
      {
        heading: "2. ඔබේ තොරතුරු අප භාවිත කරන ආකාරය",
        body: [
          "වෙළඳපොළ ක්‍රියාත්මක කිරීම සඳහා ඔබ ලබා දෙන තොරතුරු අප භාවිත කරමු: ඔබේ දැන්වීම් අනෙකුත් පරිශීලකයන්ට පෙන්වීමට, \"මගේ දැන්වීම්\" හරහා ඔබේ දැන්වීම් කළමනාකරණය කිරීමට ඉඩ දීමට, සහාය ඉල්ලීම්වලට පිළිතුරු දීමට, සහ වේදිකාවේ ආරක්ෂාව පවත්වා ගැනීමට.",
          "පළ කරන ලද දැන්වීමක ඇති සම්බන්ධතා තොරතුරු (දුරකථනය, WhatsApp, විද්‍යුත් තැපෑල) එම දැන්වීමේ ප්‍රසිද්ධියේ පෙන්වනු ලබන්නේ, කුලියට ගැනීමට උනන්දුවක් දක්වන අයට ඔබ හා සෘජුවම සම්බන්ධ විය හැකි වන පිණිසය.",
        ],
      },
      {
        heading: "3. කුකීස් සහ ස්ථානීය ගබඩාව",
        body: [
          "ඔබේ භාෂාව සහ දීප්තිමත්/අඳුරු තේමා අභිප්‍රාය මතක තබා ගැනීමට අපි ඔබේ බ්‍රවුසරයේ ස්ථානීය ගබඩාව භාවිත කරමු. ඔබව පුරන ලද තත්ත්වයේ තබා ගැනීමට අපි සත්‍යාපන කුකීස් භාවිත කරමු. අපි තෙවන පාර්ශ්ව දැන්වීම් හෝ ලුහුබැඳීමේ කුකීස් භාවිත නොකරමු.",
        ],
      },
      {
        heading: "4. තෙවන පාර්ශ්ව සේවා",
        body: [
          "ගිණුම්, දැන්වීම් සහ පණිවිඩ දත්ත ගබඩා කිරීමට සහ සත්‍යාපනය හැසිරවීමට අපි Supabase භාවිත කරමු. ඔබ උඩුගත කරන රූප අපගේ සත්කාරක සේවා සපයන්නා සමඟ ගබඩා වේ. මෙම සේවා සපයන්නන් අප වෙනුවෙන් දත්ත සකසන අතර, ඔවුන්ගේම අරමුණු සඳහා එය භාවිත කිරීමට ඉඩ නොදේ.",
        ],
      },
      {
        heading: "5. දත්ත රඳවා තබා ගැනීම",
        body: [
          "ඔබේ ගිණුම ක්‍රියාකාරීව පවතින තාක් කල් අපි ඔබේ ගිණුම් සහ දැන්වීම් දත්ත රඳවා ගනිමු. ඕනෑම වේලාවක \"මගේ දැන්වීම්\" හරහා තනි තනි දැන්වීම් ඉවත් කළ හැක. ඔබේ ගිණුම සහ ඒ හා සම්බන්ධ දත්ත ඉවත් කිරීමට ඉල්ලීමක් කිරීමට, අපගේ අමතන්න පිටුවේ ඇති විස්තර භාවිතයෙන් අප හා සම්බන්ධ වන්න.",
        ],
      },
      {
        heading: "6. ඔබේ අයිතිවාසිකම්",
        body: [
          "ඔබේ දැන්වීම් සංස්කරණය කිරීමෙන් හෝ අප හා සම්බන්ධ වීමෙන් ඔබේ ගිණුම හා සම්බන්ධ පුද්ගලික තොරතුරු වෙත ඕනෑම වේලාවක ප්‍රවේශ වීමට, නිවැරදි කිරීමට හෝ ඉවත් කිරීමට ඔබට හැකිය. ඔබේ දත්ත අනිසි ලෙස භාවිත කර ඇතැයි ඔබ විශ්වාස කරන්නේ නම්, ඔබේ බලප්‍රදේශයේ අදාළ බලධාරියා වෙත පැමිණිල්ලක් ඉදිරිපත් කිරීමටද ඔබට හැකිය.",
        ],
      },
      {
        heading: "7. අප හා සම්බන්ධ වන්න",
        body: [
          "මෙම පෞද්ගලිකත්ව ප්‍රතිපත්තිය හෝ ඔබේ දත්ත හසුරුවන ආකාරය පිළිබඳව ඔබට ප්‍රශ්න තිබේ නම්, කරුණාකර අමතන්න පිටුව හරහා අප හා සම්බන්ධ වන්න.",
        ],
      },
    ],
    seeAlso: "අපගේ",
    termsLink: "සේවා නියම ද බලන්න",
  },
  ta: {
    title: "தனியுரிமைக் கொள்கை",
    lastUpdated: "கடைசியாக புதுப்பிக்கப்பட்டது: 18 ஜூலை 2026",
    intro: "இந்த தனியுரிமைக் கொள்கை Palanchi.lk எந்தத் தகவல்களைச் சேகரிக்கிறது, அவற்றை நாங்கள் எவ்வாறு பயன்படுத்துகிறோம், மற்றும் உங்களுக்கு உள்ள தேர்வுகள் என்ன என்பதை விளக்குகிறது. இது ஒரு பொதுவான மாதிரிக் கொள்கையாகும் — இதை நம்பி செயல்படுவதற்கு முன் உங்கள் வணிகத்திற்கும் பொருந்தும் சட்டத்திற்கும் ஏற்ப மதிப்பாய்வு செய்து மாற்றியமைக்கவும்.",
    sections: [
      {
        heading: "1. நாங்கள் சேகரிக்கும் தகவல்",
        body: [
          "நீங்கள் ஒரு கணக்கை உருவாக்கும்போது, உங்கள் பெயர், மின்னஞ்சல் முகவரி, தொலைபேசி எண், மாவட்டம் மற்றும் நகரத்தை நாங்கள் சேகரிக்கிறோம். நீங்கள் ஒரு விளம்பரத்தை வெளியிடும்போது, புகைப்படங்கள், விலை, விளக்கம் மற்றும் உங்கள் தொடர்பு தகவல்கள் (தொலைபேசி, WhatsApp, மின்னஞ்சல்) உள்பட நீங்கள் வழங்கும் விளம்பர விவரங்களை நாங்கள் சேகரிக்கிறோம்.",
          "நீங்கள் தொடர்பு பக்கம் மூலம் எங்களுக்கு ஒரு செய்தி அனுப்பும்போது, எங்கள் குழு உங்களுக்கு பதிலளிக்க முடியும் வகையில் உங்கள் பெயர், மின்னஞ்சல் முகவரி, தலைப்பு மற்றும் செய்தியை நாங்கள் சேமிக்கிறோம்.",
        ],
      },
      {
        heading: "2. உங்கள் தகவலை நாங்கள் பயன்படுத்தும் விதம்",
        body: [
          "சந்தையை இயக்குவதற்கு நீங்கள் வழங்கும் தகவலை நாங்கள் பயன்படுத்துகிறோம்: உங்கள் விளம்பரங்களை மற்ற பயனர்களுக்குக் காண்பிக்க, \"என் விளம்பரங்கள்\" மூலம் உங்கள் விளம்பரங்களை நிர்வகிக்க அனுமதிக்க, ஆதரவு கோரிக்கைகளுக்கு பதிலளிக்க, மற்றும் தளத்தின் பாதுகாப்பைப் பராமரிக்க.",
          "வெளியிடப்பட்ட விளம்பரத்தில் உள்ள தொடர்பு விவரங்கள் (தொலைபேசி, WhatsApp, மின்னஞ்சல்) அந்த விளம்பரத்தில் பகிரங்கமாகக் காட்டப்படும், இதனால் ஆர்வமுள்ள வாடகைதாரர்கள் உங்களை நேரடியாக தொடர்பு கொள்ள முடியும்.",
        ],
      },
      {
        heading: "3. குக்கீகள் மற்றும் உள்ளூர் சேமிப்பு",
        body: [
          "உங்கள் மொழி மற்றும் லைட்/டார்க் தீம் விருப்பத்தை நினைவில் வைக்க உங்கள் பிரவுசரின் உள்ளூர் சேமிப்பை நாங்கள் பயன்படுத்துகிறோம். உங்களை உள்நுழைந்த நிலையில் வைத்திருக்க அங்கீகார குக்கீகளை நாங்கள் பயன்படுத்துகிறோம். மூன்றாம் தரப்பு விளம்பர அல்லது கண்காணிப்பு குக்கீகளை நாங்கள் பயன்படுத்துவதில்லை.",
        ],
      },
      {
        heading: "4. மூன்றாம் தரப்பு சேவைகள்",
        body: [
          "கணக்கு, விளம்பர மற்றும் செய்தித் தரவைச் சேமிக்கவும், அங்கீகாரத்தை நிர்வகிக்கவும் நாங்கள் Supabase-ஐப் பயன்படுத்துகிறோம். நீங்கள் பதிவேற்றும் படங்கள் எங்கள் ஹோஸ்டிங் வழங்குநருடன் சேமிக்கப்படும். இந்த வழங்குநர்கள் எங்களுக்காக தரவை செயலாக்குகின்றனர், அவர்களின் சொந்த நோக்கங்களுக்காக அதைப் பயன்படுத்த அனுமதிக்கப்படுவதில்லை.",
        ],
      },
      {
        heading: "5. தரவு தக்கவைப்பு",
        body: [
          "உங்கள் கணக்கு செயலில் இருக்கும் வரை உங்கள் கணக்கு மற்றும் விளம்பரத் தரவை நாங்கள் வைத்திருக்கிறோம். எந்த நேரத்திலும் \"என் விளம்பரங்கள்\" மூலம் தனிப்பட்ட விளம்பரங்களை நீங்கள் நீக்கலாம். உங்கள் கணக்கு மற்றும் தொடர்புடைய தரவை நீக்கக் கோர, எங்கள் தொடர்பு பக்கத்தில் உள்ள விவரங்களைப் பயன்படுத்தி எங்களைத் தொடர்பு கொள்ளவும்.",
        ],
      },
      {
        heading: "6. உங்கள் உரிமைகள்",
        body: [
          "உங்கள் விளம்பரங்களைத் திருத்துவதன் மூலம் அல்லது எங்களைத் தொடர்புகொள்வதன் மூலம், உங்கள் கணக்குடன் தொடர்புடைய தனிப்பட்ட தகவலை எந்த நேரத்திலும் அணுகவும், திருத்தவும் அல்லது நீக்கவும் உங்களால் முடியும். உங்கள் தரவு தவறாகப் பயன்படுத்தப்பட்டதாக நீங்கள் நம்பினால், உங்கள் அதிகார எல்லைக்குட்பட்ட தொடர்புடைய அதிகார அமைப்பிடம் புகார் அளிக்கவும் உங்களால் முடியும்.",
        ],
      },
      {
        heading: "7. எங்களை தொடர்பு கொள்ளுங்கள்",
        body: [
          "இந்த தனியுரிமைக் கொள்கை அல்லது உங்கள் தரவு எவ்வாறு கையாளப்படுகிறது என்பது குறித்து உங்களுக்கு ஏதேனும் கேள்விகள் இருந்தால், தொடர்பு பக்கம் மூலம் எங்களை தொடர்பு கொள்ளவும்.",
        ],
      },
    ],
    seeAlso: "எங்கள்",
    termsLink: "சேவை விதிமுறைகளையும் பார்க்கவும்",
  },
};

export function PrivacyPolicyClient() {
  const { colors, lang } = useTheme();
  const { bg, surface, text, textMuted, border, gold } = colors;
  const t = dict[lang];

  return (
    <div style={{ background: bg, color: text, minHeight: "100vh" }}>
      <Navbar maxWidth={1100} logoProps={{ fontSize: 20 }} />

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 80px" }}>
        <h1 className="disp" style={{ fontSize: "clamp(26px,4vw,36px)", fontWeight: 700, margin: "0 0 8px" }}>
          {t.title}
        </h1>
        <p style={{ fontSize: 14, color: textMuted, marginBottom: 8 }}>{t.lastUpdated}</p>
        <p style={{ fontSize: 15, color: textMuted, lineHeight: 1.7, marginBottom: 36 }}>
          {t.intro}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {t.sections.map((s) => (
            <section key={s.heading} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 24 }}>
              <h2 className="disp" style={{ fontSize: 17, fontWeight: 600, margin: "0 0 12px" }}>{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i} style={{ fontSize: 14.5, lineHeight: 1.7, color: textMuted, margin: i === 0 ? "0 0 10px" : "0 0 0" }}>
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <p style={{ fontSize: 13, color: textMuted, marginTop: 32 }}>
          {t.seeAlso} <a href="/terms-of-service" style={{ color: gold, fontWeight: 600, textDecoration: "none" }}>{t.termsLink}</a>.
        </p>
      </div>
    </div>
  );
}
