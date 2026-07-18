import type { Metadata } from "next";
import { PrivacyPolicyClient } from "./PrivacyPolicyClient";

const title = "Privacy Policy";
const description = "How Palanchi.lk collects, uses and protects your information when you rent, list or browse equipment on Sri Lanka's rental marketplace.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy-policy" },
  openGraph: { title, description, url: "/privacy-policy", type: "website" },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
