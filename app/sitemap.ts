import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600; // regenerate at most once an hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/search`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms-of-service`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const { data: ads } = await supabase
    .from("advertisements")
    .select("id, created_at")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  const adPages: MetadataRoute.Sitemap = (ads ?? []).map((ad) => ({
    url: `${SITE_URL}/ads/${ad.id}`,
    lastModified: ad.created_at,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...adPages];
}
