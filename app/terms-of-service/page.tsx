import type { Metadata } from "next";
import { TermsOfServiceClient } from "./TermsOfServiceClient";

const title = "Terms of Service";
const description = "The terms that govern using Palanchi.lk to rent or list equipment, machinery and tools in Sri Lanka.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terms-of-service" },
  openGraph: { title, description, url: "/terms-of-service", type: "website" },
};

export default function TermsOfServicePage() {
  return <TermsOfServiceClient />;
}
