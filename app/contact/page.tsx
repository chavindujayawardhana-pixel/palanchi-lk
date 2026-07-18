import type { Metadata } from "next";
import { ContactClient } from "./ContactClient";

const title = "Contact Us";
const description =
  "Get in touch with Palanchi.lk — questions about renting or listing equipment, machinery and tools anywhere in Sri Lanka. We usually reply within 24 hours.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description, url: "/contact", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need an account to post an ad?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. You can publish an ad as a guest, but registering lets you edit and manage your listings later.",
      },
    },
    {
      "@type": "Question",
      name: "How long does approval take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most ads are reviewed within 24 hours before going live.",
      },
    },
    {
      "@type": "Question",
      name: "Is listing an ad free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, publishing a standard listing is free. Featured placement is optional.",
      },
    },
    {
      "@type": "Question",
      name: "What areas does Palanchi.lk cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All 25 districts and their towns across Sri Lanka.",
      },
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ContactClient />
    </>
  );
}
