import { supabase } from "./supabase";
import type { Period, Condition } from "./data";

const PLACEHOLDER_IMAGE = "https://picsum.photos/seed/placeholder/900/650";

export interface CategoryName {
  en: string;
  si: string;
  ta: string;
}

export interface LiveAd {
  id: string;
  title: string;
  description: string;
  categoryId: number | null;
  categoryName: CategoryName | null;
  district: string;
  town: string;
  price: number;
  period: Period;
  quantity: number;
  condition: Condition;
  contactName: string;
  phone: string;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  mapLink: string | null;
  featured: boolean;
  createdAt: string;
  images: string[];
}

const AD_SELECT = `
  id, title, description, category_id, district, town, price, rental_period, quantity,
  condition, contact_name, phone, whatsapp, email, address, map_link, featured, created_at,
  categories ( name_en, name_si, name_ta ),
  advertisement_images ( image_url, is_cover, sort_order )
`;

interface AdRow {
  id: string;
  title: string;
  description: string | null;
  category_id: number | null;
  district: string;
  town: string;
  price: number;
  rental_period: Period;
  quantity: number;
  condition: Condition;
  contact_name: string;
  phone: string;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  map_link: string | null;
  featured: boolean;
  created_at: string;
  categories: { name_en: string; name_si: string; name_ta: string } | null;
  advertisement_images: { image_url: string; is_cover: boolean; sort_order: number }[] | null;
}

function mapRow(row: AdRow): LiveAd {
  const images = (row.advertisement_images ?? [])
    .slice()
    .sort((a, b) => (a.is_cover === b.is_cover ? a.sort_order - b.sort_order : a.is_cover ? -1 : 1))
    .map((img) => img.image_url);

  return {
    id: row.id,
    title: row.title,
    description: row.description ?? "",
    categoryId: row.category_id,
    categoryName: row.categories
      ? { en: row.categories.name_en, si: row.categories.name_si, ta: row.categories.name_ta }
      : null,
    district: row.district,
    town: row.town,
    price: Number(row.price),
    period: row.rental_period,
    quantity: row.quantity,
    condition: row.condition,
    contactName: row.contact_name,
    phone: row.phone,
    whatsapp: row.whatsapp,
    email: row.email,
    address: row.address,
    mapLink: row.map_link,
    featured: row.featured,
    createdAt: row.created_at,
    images: images.length ? images : [PLACEHOLDER_IMAGE],
  };
}

export async function fetchApprovedAds(): Promise<LiveAd[]> {
  const { data, error } = await supabase
    .from("advertisements")
    .select(AD_SELECT)
    .eq("status", "approved")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return (data as unknown as AdRow[]).map(mapRow);
}

export async function fetchAdById(id: string): Promise<LiveAd | null> {
  const { data, error } = await supabase
    .from("advertisements")
    .select(AD_SELECT)
    .eq("id", id)
    .eq("status", "approved")
    .maybeSingle();
  if (error || !data) return null;
  return mapRow(data as unknown as AdRow);
}
