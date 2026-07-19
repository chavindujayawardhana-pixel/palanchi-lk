import {
  Fence,
  HardHat,
  Zap,
  Wrench,
  Tractor,
  Container,
  Truck,
  Cable,
  PartyPopper,
  Layers3,
  Forklift,
  Wheat,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Lang } from "./i18n";

/** Rental period keys — resolved to a localized label via each page dictionary.
 * "perKm" only applies to Vehicles > For Hire (vehicle + driver) listings. */
export type Period = "perHour" | "perDay" | "perWeek" | "perMonth" | "perKm";
export type Condition = "new" | "used";

/** Vehicle-only sub-category: renting the vehicle itself vs. hiring it with a driver. */
export type VehicleSubcategory = "forRent" | "forHire";

/** English name of the category (as stored in the `categories` table) that
 * triggers the For Rent / For Hire sub-category flow in the Post Ad form. */
export const VEHICLES_CATEGORY_NAME = "Vehicles";

/** Icon per category, keyed by the `categories.name_en` value from Supabase
 * (the 14-category seed list — see supabase/schema.sql). Used by the Post Ad
 * form's category cards. */
export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Scaffolding": Fence,
  "Construction equipment": HardHat,
  "Generators": Zap,
  "Power tools": Wrench,
  "Excavators": Tractor,
  "Backhoes": Tractor,
  "Forklifts": Forklift,
  "Rollers": Layers3,
  "Containers": Container,
  "Vehicles": Truck,
  "Agricultural equipment": Wheat,
  "Electrical equipment": Cable,
  "Event equipment": PartyPopper,
  "Others": Layers3,
};

/** Icon-backed categories, used on the homepage and search page. */
export interface Category {
  key: string;
  icon: LucideIcon;
  en: string;
  si: string;
  ta: string;
}

export const CATEGORIES: Category[] = [
  { key: "scaffolding", icon: Fence, en: "Scaffolding", si: "ස්කැෆෝල්ඩිං", ta: "ஸ்கஃபோல்டிங்" },
  { key: "construction", icon: HardHat, en: "Construction equip.", si: "ඉදිකිරීම් උපකරණ", ta: "கட்டுமான உபகரணங்கள்" },
  { key: "generators", icon: Zap, en: "Generators", si: "ජනරේටර්", ta: "ஜெனரேட்டர்கள்" },
  { key: "powertools", icon: Wrench, en: "Power tools", si: "විදුලි මෙවලම්", ta: "மின் கருவிகள்" },
  { key: "excavators", icon: Tractor, en: "Excavators", si: "කැණීම් යන්ත්‍ර", ta: "அகழ்வாராய்ச்சி" },
  { key: "containers", icon: Container, en: "Containers", si: "කන්ටේනර්", ta: "கொள்கலன்கள்" },
  { key: "vehicles", icon: Truck, en: "Vehicles", si: "වාහන", ta: "வாகனங்கள்" },
  { key: "electrical", icon: Cable, en: "Electrical", si: "විදුලි උපකරණ", ta: "மின் உபகரணங்கள்" },
  { key: "event", icon: PartyPopper, en: "Event equipment", si: "උත්සව උපකරණ", ta: "நிகழ்வு உபகரணங்கள்" },
  { key: "other", icon: Layers3, en: "Others", si: "වෙනත්", ta: "மற்றவை" },
];

/** Flat, per-language category names used by the "Create ad" form. */
export const AD_CATEGORIES: Record<Lang, string[]> = {
  en: ["Scaffolding", "Construction equipment", "Generators", "Power tools", "Excavators", "Backhoes", "Forklifts", "Rollers", "Containers", "Vehicles", "Agricultural equipment", "Electrical equipment", "Event equipment", "Others"],
  si: ["ස්කැෆෝල්ඩිං", "ඉදිකිරීම් උපකරණ", "ජනරේටර්", "විදුලි මෙවලම්", "කැණීම් යන්ත්‍ර", "බැක්හෝ", "ෆෝක්ලිෆ්ට්", "රෝලර්", "කන්ටේනර්", "වාහන", "කෘෂිකාර්මික උපකරණ", "විදුලි උපකරණ", "උත්සව උපකරණ", "වෙනත්"],
  ta: ["ஸ்கஃபோல்டிங்", "கட்டுமான உபகரணங்கள்", "ஜெனரேட்டர்கள்", "மின் கருவிகள்", "அகழ்வாராய்ச்சி", "பேக்ஹோ", "ஃபோர்க்லிஃப்ட்", "ரோலர்", "கொள்கலன்கள்", "வாகனங்கள்", "விவசாய உபகரணங்கள்", "மின் உபகரணங்கள்", "நிகழ்வு உபகரணங்கள்", "மற்றவை"],
};

/** All 25 Sri Lankan districts. GN-division-level town data lives in lib/data/gn-divisions.json (server-only — see app/api/locations/towns). */
export const DISTRICTS = [
  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", "Hambantota",
  "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", "Matale",
  "Matara", "Moneragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura",
  "Trincomalee", "Vavuniya",
];

export interface Ad {
  id: number;
  title: string;
  cat: string;
  price: number;
  period: Period;
  town: string;
  district: string;
  cond: Condition;
  featured: boolean;
  img: string;
  /** Extra fields shown on the ad detail page (/ads/[id]). */
  qty: number;
  posted: string;
  description: string;
  contactName: string;
  phone: string;
  whatsapp: string;
  email: string;
  verified: boolean;
}

/**
 * Mock listings. The homepage uses the first 8; the search page uses all 12.
 */
export const ADS: Ad[] = [
  { id: 1, title: "20 kVA Diesel Generator", cat: "generators", price: 4500, period: "perDay", town: "Kaduwela", district: "Colombo", cond: "used", featured: true, img: "https://picsum.photos/seed/genset1/600/450", qty: 3, posted: "2026-07-10", description: "Reliable 20 kVA diesel generator suitable for construction sites, events and backup power. Silent-canopy model with low fuel consumption. Delivery and pickup can be arranged within Colombo district.", contactName: "Ruwan Perera", phone: "+94 77 234 5671", whatsapp: "+94 77 234 5671", email: "ruwan.perera@mail.com", verified: true },
  { id: 2, title: "Steel Cup-Lock Scaffolding Set", cat: "scaffolding", price: 12000, period: "perWeek", town: "Kandy Town", district: "Kandy", cond: "used", featured: true, img: "https://picsum.photos/seed/scaffold2/600/450", qty: 5, posted: "2026-07-08", description: "Complete steel cup-lock scaffolding set including standards, ledgers and base plates. Ideal for residential and commercial building work. Sets are cleaned and inspected between rentals.", contactName: "Suresh Kumara", phone: "+94 71 345 6782", whatsapp: "+94 71 345 6782", email: "suresh.kumara@mail.com", verified: true },
  { id: 3, title: "JCB 3DX Backhoe Loader", cat: "excavators", price: 18500, period: "perDay", town: "Negombo", district: "Gampaha", cond: "used", featured: true, img: "https://picsum.photos/seed/backhoe3/600/450", qty: 1, posted: "2026-07-13", description: "Well-maintained JCB 3DX backhoe loader available for daily rental. Suitable for excavation, trenching, and material handling on construction sites. Operator available on request at an additional cost. Machine serviced regularly, all documents up to date. Delivery within Gampaha district can be arranged.", contactName: "Fathima Rizvi", phone: "+94 77 123 4567", whatsapp: "+94 77 123 4567", email: "fathima@mail.com", verified: true },
  { id: 4, title: "Bosch Rotary Hammer Drill", cat: "powertools", price: 950, period: "perDay", town: "Matara Town", district: "Matara", cond: "new", featured: false, img: "https://picsum.photos/seed/drill4/600/450", qty: 4, posted: "2026-07-14", description: "Bosch rotary hammer drill, brand new, suitable for concrete drilling and light demolition work. Comes with a set of SDS-plus bits. Great for short-term renovation jobs.", contactName: "Chamara Silva", phone: "+94 76 456 7893", whatsapp: "+94 76 456 7893", email: "chamara.silva@mail.com", verified: false },
  { id: 5, title: "20ft Storage Container", cat: "containers", price: 9000, period: "perMonth", town: "Ja-Ela", district: "Gampaha", cond: "used", featured: false, img: "https://picsum.photos/seed/container5/600/450", qty: 2, posted: "2026-07-05", description: "20ft steel storage container in good condition, weatherproof and lockable. Suitable for site storage, temporary offices or long-term equipment storage. Delivery within Gampaha district available.", contactName: "Niroshan Fernando", phone: "+94 70 567 8904", whatsapp: "+94 70 567 8904", email: "niroshan.fernando@mail.com", verified: true },
  { id: 6, title: "Mini Tipper Truck 3T", cat: "vehicles", price: 7200, period: "perDay", town: "Galle Town", district: "Galle", cond: "used", featured: false, img: "https://picsum.photos/seed/tipper6/600/450", qty: 1, posted: "2026-07-11", description: "Mini tipper truck with 3-tonne capacity, well maintained and serviced regularly. Suitable for construction debris removal, sand and gravel transport. Driver available on request.", contactName: "Priyantha Jayasuriya", phone: "+94 75 678 9015", whatsapp: "+94 75 678 9015", email: "priyantha.jayasuriya@mail.com", verified: false },
  { id: 7, title: "PA Sound System, 2 Speakers", cat: "event", price: 6000, period: "perDay", town: "Nugegoda", district: "Colombo", cond: "new", featured: false, img: "https://picsum.photos/seed/sound7/600/450", qty: 2, posted: "2026-07-15", description: "PA sound system with two speakers, mixer and cabling included. Suitable for weddings, outdoor events and small functions. Setup assistance available on the day.", contactName: "Dilani Wickramasinghe", phone: "+94 77 789 0126", whatsapp: "+94 77 789 0126", email: "dilani.wickramasinghe@mail.com", verified: true },
  { id: 8, title: "Portable Welding Machine", cat: "electrical", price: 1800, period: "perDay", town: "Kurunegala Town", district: "Kurunegala", cond: "used", featured: false, img: "https://picsum.photos/seed/weld8/600/450", qty: 3, posted: "2026-07-09", description: "Portable welding machine suitable for site and workshop use. Includes cables, holder and mask. Recently serviced and tested before every rental.", contactName: "Asela Bandara", phone: "+94 71 890 1237", whatsapp: "+94 71 890 1237", email: "asela.bandara@mail.com", verified: false },
  { id: 9, title: "Concrete Mixer 500L", cat: "construction", price: 3200, period: "perDay", town: "Colombo 01", district: "Colombo", cond: "used", featured: false, img: "https://picsum.photos/seed/mixer9/600/450", qty: 2, posted: "2026-07-12", description: "500L concrete mixer, petrol powered, suitable for medium-scale construction work. Cleaned and checked before each rental. Delivery available within Colombo.", contactName: "Malith Gunawardena", phone: "+94 76 901 2348", whatsapp: "+94 76 901 2348", email: "malith.gunawardena@mail.com", verified: true },
  { id: 10, title: "Mini Excavator 1.5T", cat: "excavators", price: 9800, period: "perDay", town: "Peradeniya", district: "Kandy", cond: "new", featured: true, img: "https://picsum.photos/seed/excav10/600/450", qty: 1, posted: "2026-07-07", description: "Compact 1.5T mini excavator, ideal for landscaping, small excavation and tight-access sites. Well maintained with low operating hours. Operator available at extra cost.", contactName: "Harsha Dissanayake", phone: "+94 77 012 3459", whatsapp: "+94 77 012 3459", email: "harsha.dissanayake@mail.com", verified: true },
  { id: 11, title: "Angle Grinder Set (3pc)", cat: "powertools", price: 600, period: "perDay", town: "Homagama", district: "Colombo", cond: "used", featured: false, img: "https://picsum.photos/seed/grinder11/600/450", qty: 6, posted: "2026-07-14", description: "Set of three angle grinders in varying sizes, suitable for cutting and grinding metal or masonry. Discs included. Great for short-term construction or fabrication jobs.", contactName: "Kasun Rathnayake", phone: "+94 70 123 4560", whatsapp: "+94 70 123 4560", email: "kasun.rathnayake@mail.com", verified: false },
  { id: 12, title: "10ft Refrigerated Container", cat: "containers", price: 14000, period: "perMonth", town: "Wattala", district: "Gampaha", cond: "used", featured: false, img: "https://picsum.photos/seed/reefer12/600/450", qty: 1, posted: "2026-07-06", description: "10ft refrigerated container, suitable for cold storage of perishable goods. Reliable cooling unit, recently serviced. Suitable for events, farms or temporary storage needs.", contactName: "Sanduni Perera", phone: "+94 71 234 5671", whatsapp: "+94 71 234 5671", email: "sanduni.perera@mail.com", verified: true },
];

/** Derives a 4-photo gallery from an ad's picsum seed (used on the detail page). */
export function adGallery(img: string): string[] {
  const seed = img.match(/seed\/([^/]+)\//)?.[1] ?? "placeholder";
  return [
    `https://picsum.photos/seed/${seed}/900/650`,
    `https://picsum.photos/seed/${seed}b/900/650`,
    `https://picsum.photos/seed/${seed}c/900/650`,
    `https://picsum.photos/seed/${seed}d/900/650`,
  ];
}

export interface Review {
  name: string;
  town: string;
  en: string;
  rating: number;
}

export const REVIEWS: Review[] = [
  { name: "Nadeesha P.", town: "Colombo", en: "Rented a generator within an hour of posting. Smooth, no drama.", rating: 5 },
  { name: "Suresh K.", town: "Kandy", en: "Listed my scaffolding set for free and had renters calling the same day.", rating: 5 },
  { name: "Fathima R.", town: "Galle", en: "Verification gave me confidence the lister was legitimate.", rating: 4 },
];
