"use client";

import { Navbar } from "@/components/Navbar";
import { useTheme } from "@/components/ThemeProvider";

const SECTIONS: { heading: string; body: string[] }[] = [
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
];

export function TermsOfServiceClient() {
  const { colors } = useTheme();
  const { bg, surface, text, textMuted, border, gold } = colors;

  return (
    <div style={{ background: bg, color: text, minHeight: "100vh" }}>
      <Navbar maxWidth={1100} logoProps={{ fontSize: 20 }} />

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 80px" }}>
        <h1 className="disp" style={{ fontSize: "clamp(26px,4vw,36px)", fontWeight: 700, margin: "0 0 8px" }}>
          Terms of Service
        </h1>
        <p style={{ fontSize: 14, color: textMuted, marginBottom: 8 }}>Last updated: 18 July 2026</p>
        <p style={{ fontSize: 15, color: textMuted, lineHeight: 1.7, marginBottom: 36 }}>
          These Terms of Service govern your use of Palanchi.lk. This is a general placeholder — please review
          and adapt it to your business and applicable law before relying on it.
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
          See also our <a href="/privacy-policy" style={{ color: gold, fontWeight: 600, textDecoration: "none" }}>Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
