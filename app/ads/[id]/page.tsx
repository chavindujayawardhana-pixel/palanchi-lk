import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import { fetchAdById } from "@/lib/ads";
import { SITE_URL } from "@/lib/site";
import { AdDetailClient } from "./AdDetailClient";

// Dedupe the Supabase fetch between generateMetadata and the page body within one request.
const getAd = cache(fetchAdById);

const PERIOD_UNIT: Record<string, string> = {
  perHour: "HOUR",
  perDay: "DAY",
  perWeek: "WEEK",
  perMonth: "MONTH",
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const ad = await getAd(params.id);
  if (!ad) {
    return { title: "Ad not found", robots: { index: false } };
  }

  const title = `${ad.title} for Rent in ${ad.district}`;
  const categoryLabel = ad.categoryName?.en;
  const description = ad.description
    ? ad.description.slice(0, 155)
    : `Rent ${categoryLabel ? `this ${categoryLabel.toLowerCase()}` : ad.title} in ${ad.town}, ${ad.district}, Sri Lanka on Palanchi.lk.`;
  const image = ad.images[0];
  const url = `/ads/${ad.id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", images: [{ url: image }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function AdDetailPage({ params }: { params: { id: string } }) {
  const ad = await getAd(params.id);
  if (!ad) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: ad.title,
    description: ad.description || ad.title,
    image: ad.images,
    category: ad.categoryName?.en,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/ads/${ad.id}`,
      priceCurrency: "LKR",
      price: ad.price,
      availability: "https://schema.org/InStock",
      areaServed: `${ad.town}, ${ad.district}, Sri Lanka`,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: ad.price,
        priceCurrency: "LKR",
        unitCode: PERIOD_UNIT[ad.period] ?? "DAY",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AdDetailClient id={params.id} />
    </>
  );
}
