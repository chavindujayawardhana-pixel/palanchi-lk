"use client";

import { Navbar } from "@/components/Navbar";
import { useTheme } from "@/components/ThemeProvider";
import type { Lang } from "@/lib/i18n";

type Section = { heading: string; body: string[] };

const dict: Record<Lang, { title: string; lastUpdated: string; intro: string; sections: Section[]; seeAlso: string; privacyLink: string }> = {
  en: {
    title: "Terms of Service",
    lastUpdated: "Last updated: 18 July 2026",
    intro: "These Terms of Service govern your use of Palanchi.lk. This is a general placeholder — please review and adapt it to your business and applicable law before relying on it.",
    sections: [
      {
        heading: "1. Acceptance of terms",
        body: [
          "By accessing or using Palanchi.lk, you agree to these Terms of Service. If you do not agree, please do not use the platform.",
        ],
      },
      {
        heading: "2. What Palanchi.lk is",
        body: [
          "Palanchi.lk is a listings marketplace that connects people who want to rent equipment, machinery, vehicles and tools with people who have such items available for rent, across Sri Lanka. We are not a party to any rental agreement made between users — we simply provide the platform that lets listers and renters find each other.",
        ],
      },
      {
        heading: "3. Accounts and listings",
        body: [
          "You may publish an advertisement as a guest, or register an account to edit and manage your listings later. You are responsible for the accuracy of the information in your listing, including price, condition, availability and contact details.",
          "Every advertisement is reviewed by our team before it is published. We may reject, suspend or remove a listing at our discretion, for example if it is inaccurate, misleading, or violates these Terms.",
        ],
      },
      {
        heading: "4. Prohibited use",
        body: [
          "You agree not to post illegal, stolen, counterfeit or misleading listings, not to misuse contact details shared on the platform, and not to attempt to disrupt or abuse the service (including scraping, spamming or circumventing security measures).",
        ],
      },
      {
        heading: "5. Transactions between users",
        body: [
          "Any rental agreement, payment, delivery or dispute is strictly between the lister and the renter. Palanchi.lk does not inspect items, verify ownership, process payments, or guarantee the condition, safety or legality of any listed item. Please see the safety tips shown on every listing page before arranging a rental.",
        ],
      },
      {
        heading: "6. Disclaimer and limitation of liability",
        body: [
          "The platform is provided \"as is\" without warranties of any kind. To the fullest extent permitted by law, Palanchi.lk is not liable for any loss, damage or dispute arising from a listing, a rental transaction, or your use of the site.",
        ],
      },
      {
        heading: "7. Changes to these terms",
        body: [
          "We may update these Terms from time to time. Continued use of Palanchi.lk after a change means you accept the updated Terms.",
        ],
      },
      {
        heading: "8. Governing law",
        body: [
          "These Terms are governed by the laws of Sri Lanka.",
        ],
      },
      {
        heading: "9. Contact us",
        body: [
          "Questions about these Terms can be sent to us via the Contact page.",
        ],
      },
    ],
    seeAlso: "See also our",
    privacyLink: "Privacy Policy",
  },
  si: {
    title: "සේවා නියම",
    lastUpdated: "අවසන් වරට යාවත්කාලීන කළේ: 2026 ජූලි 18",
    intro: "මෙම සේවා නියම මගින් ඔබ Palanchi.lk භාවිත කිරීම පාලනය කරයි. මෙය පොදු නියැදියක් වන අතර, එය මත රඳා පැවතීමට පෙර ඔබේ ව්‍යාපාරයට සහ අදාළ නීතියට ගැළපෙන පරිදි සමාලෝචනය කර සකස් කරගන්න.",
    sections: [
      {
        heading: "1. නියමයන් පිළිගැනීම",
        body: [
          "Palanchi.lk වෙත ප්‍රවේශ වීමෙන් හෝ එය භාවිත කිරීමෙන්, ඔබ මෙම සේවා නියමයන්ට එකඟ වේ. ඔබ එකඟ නොවන්නේ නම්, කරුණාකර මෙම වේදිකාව භාවිත නොකරන්න.",
        ],
      },
      {
        heading: "2. Palanchi.lk යනු කුමක්ද",
        body: [
          "Palanchi.lk යනු උපකරණ, යන්ත්‍රෝපකරණ, වාහන සහ මෙවලම් කුලියට ගැනීමට කැමති පුද්ගලයන් සහ එවැනි ද්‍රව්‍ය කුලියට දීමට ඇති පුද්ගලයන් ශ්‍රී ලංකාව පුරා එකට සම්බන්ධ කරන දැන්වීම් වෙළඳපොළකි. පරිශීලකයන් අතර සිදු කරගන්නා කුලී ගිවිසුමකට අපි පාර්ශ්වයක් නොවෙමු — දැන්වීම් පළ කරන්නන් සහ කුලියට ගන්නන්ට එකිනෙකා සොයාගැනීමට ඉඩ සලසන වේදිකාව අප සරලවම සපයමු.",
        ],
      },
      {
        heading: "3. ගිණුම් සහ දැන්වීම්",
        body: [
          "ඔබට අමුත්තෙකු ලෙස දැන්වීමක් පළ කළ හැක, නැතහොත් පසුව ඔබේ දැන්වීම් සංස්කරණය කර කළමනාකරණය කිරීමට ගිණුමක් ලියාපදිංචි කළ හැක. මිල, තත්ත්වය, ලබාගත හැකි බව සහ සම්බන්ධතා විස්තර ඇතුළුව ඔබේ දැන්වීමේ තොරතුරුවල නිරවද්‍යතාවය සඳහා ඔබ වගකිව යුතුය.",
          "සෑම දැන්වීමක්ම පළ කිරීමට පෙර අපගේ කණ්ඩායම විසින් සමාලෝචනය කරනු ලැබේ. එය නිවැරදි නොවේ නම්, නොමඟ යවන සුළු නම්, හෝ මෙම නියමයන් උල්ලංඝනය කරයි නම් වැනි අවස්ථාවක, අපගේ අභිමතය පරිදි දැන්වීමක් ප්‍රතික්ෂේප කිරීමට, අත්හිටුවීමට හෝ ඉවත් කිරීමට අපට හැකිය.",
        ],
      },
      {
        heading: "4. තහනම් භාවිතය",
        body: [
          "නීති විරෝධී, සොරකම් කරන ලද, ව්‍යාජ හෝ නොමඟ යවන සුළු දැන්වීම් පළ නොකිරීමට, වේදිකාවේ බෙදාගත් සම්බන්ධතා විස්තර අනිසි ලෙස භාවිත නොකිරීමට, සහ සේවාව කඩාකප්පල් කිරීමට හෝ අනිසි ලෙස භාවිත කිරීමට (scraping, spamming හෝ ආරක්ෂක පියවර මගහැරීම ඇතුළුව) උත්සාහ නොකිරීමට ඔබ එකඟ වේ.",
        ],
      },
      {
        heading: "5. පරිශීලකයන් අතර ගනුදෙනු",
        body: [
          "ඕනෑම කුලී ගිවිසුමක්, ගෙවීමක්, බෙදාහැරීමක් හෝ ආරවුලක් දැන්වීම් පළ කරන්නා සහ කුලියට ගන්නා අතර පමණක් සිදු වේ. Palanchi.lk ද්‍රව්‍ය පරීක්ෂා නොකරයි, හිමිකාරිත්වය සත්‍යාපනය නොකරයි, ගෙවීම් සකසන්නේ නැත, තවද ලැයිස්තුගත කර ඇති ඕනෑම ද්‍රව්‍යයක තත්ත්වය, ආරක්ෂාව හෝ නීත්‍යානුකූලභාවය සහතික නොකරයි. කුලියක් සකස් කිරීමට පෙර, කරුණාකර සෑම දැන්වීම් පිටුවකම පෙන්වා ඇති ආරක්ෂක උපදෙස් බලන්න.",
        ],
      },
      {
        heading: "6. වගකීම් ප්‍රතික්ෂේප කිරීම සහ සීමා කිරීම",
        body: [
          "මෙම වේදිකාව කිසිදු ආකාරයක වගකීමකින් තොරව \"ඇති ආකාරයටම\" සපයනු ලැබේ. නීතියෙන් අවසර දෙන උපරිම ප්‍රමාණයට, දැන්වීමක්, කුලී ගනුදෙනුවක් හෝ අඩවිය ඔබ භාවිත කිරීම හේතුවෙන් ඇතිවන කිසිදු අලාභයක්, හානියක් හෝ ආරවුලකට Palanchi.lk වගකිව යුතු නොවේ.",
        ],
      },
      {
        heading: "7. මෙම නියමයන්ට කරන වෙනස්කම්",
        body: [
          "අපි කලින් කලට මෙම නියමයන් යාවත්කාලීන කළ හැක. වෙනසකින් පසුව Palanchi.lk දිගටම භාවිත කිරීමෙන් අදහස් වන්නේ ඔබ යාවත්කාලීන කළ නියමයන්ට එකඟ වන බවයි.",
        ],
      },
      {
        heading: "8. පාලක නීතිය",
        body: [
          "මෙම නියමයන් ශ්‍රී ලංකා නීතියෙන් පාලනය වේ.",
        ],
      },
      {
        heading: "9. අප හා සම්බන්ධ වන්න",
        body: [
          "මෙම නියමයන් පිළිබඳ ප්‍රශ්න අමතන්න පිටුව හරහා අප වෙත එවිය හැක.",
        ],
      },
    ],
    seeAlso: "අපගේ",
    privacyLink: "පෞද්ගලිකත්ව ප්‍රතිපත්තිය ද බලන්න",
  },
  ta: {
    title: "சேவை விதிமுறைகள்",
    lastUpdated: "கடைசியாக புதுப்பிக்கப்பட்டது: 18 ஜூலை 2026",
    intro: "இந்த சேவை விதிமுறைகள் Palanchi.lk-ஐ நீங்கள் பயன்படுத்துவதை நிர்வகிக்கின்றன. இது ஒரு பொதுவான மாதிரியாகும் — இதை நம்பி செயல்படுவதற்கு முன் உங்கள் வணிகத்திற்கும் பொருந்தும் சட்டத்திற்கும் ஏற்ப மதிப்பாய்வு செய்து மாற்றியமைக்கவும்.",
    sections: [
      {
        heading: "1. விதிமுறைகளை ஏற்றுக்கொள்ளுதல்",
        body: [
          "Palanchi.lk-ஐ அணுகுவதன் மூலம் அல்லது பயன்படுத்துவதன் மூலம், நீங்கள் இந்த சேவை விதிமுறைகளுக்கு ஒப்புக்கொள்கிறீர்கள். நீங்கள் ஒப்புக்கொள்ளவில்லை என்றால், தயவுசெய்து இந்த தளத்தைப் பயன்படுத்த வேண்டாம்.",
        ],
      },
      {
        heading: "2. Palanchi.lk என்றால் என்ன",
        body: [
          "Palanchi.lk என்பது உபகரணங்கள், இயந்திரங்கள், வாகனங்கள் மற்றும் கருவிகளை வாடகைக்கு எடுக்க விரும்பும் நபர்களையும், அத்தகைய பொருட்களை வாடகைக்கு வழங்கும் நபர்களையும் இலங்கை முழுவதும் இணைக்கும் ஒரு விளம்பர சந்தையாகும். பயனர்களுக்கு இடையே செய்யப்படும் எந்தவொரு வாடகை ஒப்பந்தத்திற்கும் நாங்கள் தரப்பினர் அல்ல — விளம்பரதாரர்களும் வாடகைதாரர்களும் ஒருவரையொருவர் கண்டுபிடிக்க அனுமதிக்கும் தளத்தை மட்டுமே நாங்கள் வழங்குகிறோம்.",
        ],
      },
      {
        heading: "3. கணக்குகள் மற்றும் விளம்பரங்கள்",
        body: [
          "நீங்கள் ஒரு விருந்தினராக ஒரு விளம்பரத்தை வெளியிடலாம், அல்லது பின்னர் உங்கள் விளம்பரங்களைத் திருத்தி நிர்வகிக்க ஒரு கணக்கைப் பதிவு செய்யலாம். விலை, நிலை, கிடைக்கும் தன்மை மற்றும் தொடர்பு விவரங்கள் உள்ளிட்ட உங்கள் விளம்பரத்தில் உள்ள தகவலின் துல்லியத்திற்கு நீங்கள் பொறுப்பு.",
          "ஒவ்வொரு விளம்பரமும் வெளியிடப்படுவதற்கு முன் எங்கள் குழுவால் மதிப்பாய்வு செய்யப்படும். அது தவறானதாக, தவறாக வழிநடத்துவதாக, அல்லது இந்த விதிமுறைகளை மீறுவதாக இருந்தால், எங்கள் விருப்பப்படி ஒரு விளம்பரத்தை நிராகரிக்கவோ, இடைநிறுத்தவோ அல்லது அகற்றவோ நாங்கள் முடியும்.",
        ],
      },
      {
        heading: "4. தடைசெய்யப்பட்ட பயன்பாடு",
        body: [
          "சட்டவிரோதமான, திருடப்பட்ட, போலியான அல்லது தவறாக வழிநடத்தும் விளம்பரங்களை வெளியிடாமல் இருக்கவும், தளத்தில் பகிரப்பட்ட தொடர்பு விவரங்களை தவறாகப் பயன்படுத்தாமல் இருக்கவும், மற்றும் சேவையை சீர்குலைக்க அல்லது தவறாகப் பயன்படுத்த முயற்சிக்காமல் இருக்கவும் (scraping, spamming அல்லது பாதுகாப்பு நடவடிக்கைகளைத் தவிர்ப்பது உட்பட) நீங்கள் ஒப்புக்கொள்கிறீர்கள்.",
        ],
      },
      {
        heading: "5. பயனர்களுக்கு இடையேயான பரிவர்த்தனைகள்",
        body: [
          "எந்தவொரு வாடகை ஒப்பந்தமும், கட்டணமும், விநியோகமும் அல்லது சர்ச்சையும் விளம்பரதாரருக்கும் வாடகைதாரருக்கும் இடையே மட்டுமே. Palanchi.lk பொருட்களை ஆய்வு செய்யவோ, உரிமையை சரிபார்க்கவோ, கட்டணங்களைச் செயலாக்கவோ, அல்லது பட்டியலிடப்பட்ட எந்தவொரு பொருளின் நிலை, பாதுகாப்பு அல்லது சட்டபூர்வத்தன்மையை உறுதிப்படுத்தவோ செய்யாது. வாடகை ஏற்பாடு செய்வதற்கு முன் ஒவ்வொரு விளம்பரப் பக்கத்திலும் காட்டப்படும் பாதுகாப்பு குறிப்புகளைப் பார்க்கவும்.",
        ],
      },
      {
        heading: "6. பொறுப்புத் துறப்பு மற்றும் பொறுப்பு வரம்பு",
        body: [
          "இந்த தளம் எந்தவிதமான உத்தரவாதங்களும் இல்லாமல் \"இருக்கிறபடி\" வழங்கப்படுகிறது. சட்டம் அனுமதிக்கும் அதிகபட்ச அளவிற்கு, ஒரு விளம்பரம், வாடகை பரிவர்த்தனை, அல்லது தளத்தை நீங்கள் பயன்படுத்துவதால் ஏற்படும் எந்தவொரு இழப்பு, சேதம் அல்லது சர்ச்சைக்கும் Palanchi.lk பொறுப்பாகாது.",
        ],
      },
      {
        heading: "7. இந்த விதிமுறைகளுக்கான மாற்றங்கள்",
        body: [
          "நாங்கள் அவ்வப்போது இந்த விதிமுறைகளைப் புதுப்பிக்கலாம். ஒரு மாற்றத்திற்குப் பிறகு Palanchi.lk-ஐ தொடர்ந்து பயன்படுத்துவது, நீங்கள் புதுப்பிக்கப்பட்ட விதிமுறைகளை ஏற்றுக்கொள்கிறீர்கள் என்பதைக் குறிக்கிறது.",
        ],
      },
      {
        heading: "8. நிர்வாக சட்டம்",
        body: [
          "இந்த விதிமுறைகள் இலங்கையின் சட்டங்களால் நிர்வகிக்கப்படுகின்றன.",
        ],
      },
      {
        heading: "9. எங்களை தொடர்பு கொள்ளுங்கள்",
        body: [
          "இந்த விதிமுறைகள் குறித்த கேள்விகளை தொடர்பு பக்கம் மூலம் எங்களுக்கு அனுப்பலாம்.",
        ],
      },
    ],
    seeAlso: "எங்கள்",
    privacyLink: "தனியுரிமைக் கொள்கையையும் பார்க்கவும்",
  },
};

export function TermsOfServiceClient() {
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
          {t.seeAlso} <a href="/privacy-policy" style={{ color: gold, fontWeight: 600, textDecoration: "none" }}>{t.privacyLink}</a>.
        </p>
      </div>
    </div>
  );
}
