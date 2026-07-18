"use client";

import { Navbar } from "@/components/Navbar";
import { useTheme } from "@/components/ThemeProvider";

const SECTIONS: { heading: string; body: string[] }[] = [
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
];

export function PrivacyPolicyClient() {
  const { colors } = useTheme();
  const { bg, surface, text, textMuted, border, gold } = colors;

  return (
    <div style={{ background: bg, color: text, minHeight: "100vh" }}>
      <Navbar maxWidth={1100} logoProps={{ fontSize: 20 }} />

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 80px" }}>
        <h1 className="disp" style={{ fontSize: "clamp(26px,4vw,36px)", fontWeight: 700, margin: "0 0 8px" }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: 14, color: textMuted, marginBottom: 8 }}>Last updated: 18 July 2026</p>
        <p style={{ fontSize: 15, color: textMuted, lineHeight: 1.7, marginBottom: 36 }}>
          This Privacy Policy explains what information Palanchi.lk collects, how we use it, and the choices
          you have. This is a general placeholder policy — please review and adapt it to your business and
          applicable law before relying on it.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {SECTIONS.map((s) => (
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
          See also our <a href="/terms-of-service" style={{ color: gold, fontWeight: 600, textDecoration: "none" }}>Terms of Service</a>.
        </p>
      </div>
    </div>
  );
}
