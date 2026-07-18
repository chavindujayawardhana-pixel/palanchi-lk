import type { Metadata } from "next";
import { SearchClient } from "./SearchClient";

const title = "Search Rental Equipment, Machinery & Tools in Sri Lanka";
const description =
  "Browse scaffolding, generators, excavators, vehicles and more for rent across all 25 districts of Sri Lanka. Filter by category, district, town and price on Palanchi.lk.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/search" },
  openGraph: { title, description, url: "/search", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function SearchPage() {
  return <SearchClient />;
}
