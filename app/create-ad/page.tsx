import type { Metadata } from "next";
import { CreateAdClient } from "./CreateAdClient";

const title = "Post a Rental Ad for Free";
const description =
  "List your equipment, machinery, vehicle or tools for rent on Palanchi.lk — free to publish, reviewed within 24 hours, seen across all 25 districts of Sri Lanka.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/create-ad" },
  openGraph: { title, description, url: "/create-ad", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function CreateAdPage() {
  return <CreateAdClient />;
}
