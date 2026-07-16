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
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Lang } from "./i18n";

/** Rental period keys — resolved to a localized label via each page dictionary. */
export type Period = "perHour" | "perDay" | "perWeek" | "perMonth";
export type Condition = "new" | "used";

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

export const DISTRICTS = ["Colombo", "Gampaha", "Kandy", "Galle", "Matara", "Kurunegala", "Jaffna", "Anuradhapura", "Ratnapura", "Badulla"];

export const TOWNS: Record<string, string[]> = {
  Colombo: ["Colombo 01", "Kaduwela", "Nugegoda", "Homagama", "Maharagama"],
  Gampaha: ["Negombo", "Ja-Ela", "Wattala", "Gampaha Town", "Minuwangoda"],
  Kandy: ["Kandy Town", "Peradeniya", "Gampola", "Katugastota"],
  Galle: ["Galle Town", "Hikkaduwa", "Ambalangoda"],
  Matara: ["Matara Town", "Weligama", "Akuressa"],
  Kurunegala: ["Kurunegala Town", "Kuliyapitiya", "Narammala"],
  Jaffna: ["Jaffna Town", "Chavakachcheri", "Point Pedro"],
  Anuradhapura: ["Anuradhapura Town", "Kekirawa"],
  Ratnapura: ["Ratnapura Town", "Balangoda"],
  Badulla: ["Badulla Town", "Bandarawela"],
};

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
}

/**
 * Mock listings. The homepage uses the first 8; the search page uses all 12.
 */
export const ADS: Ad[] = [
  { id: 1, title: "20 kVA Diesel Generator", cat: "generators", price: 4500, period: "perDay", town: "Kaduwela", district: "Colombo", cond: "used", featured: true, img: "https://picsum.photos/seed/genset1/600/450" },
  { id: 2, title: "Steel Cup-Lock Scaffolding Set", cat: "scaffolding", price: 12000, period: "perWeek", town: "Kandy Town", district: "Kandy", cond: "used", featured: true, img: "https://picsum.photos/seed/scaffold2/600/450" },
  { id: 3, title: "JCB 3DX Backhoe Loader", cat: "excavators", price: 18500, period: "perDay", town: "Negombo", district: "Gampaha", cond: "used", featured: true, img: "https://picsum.photos/seed/backhoe3/600/450" },
  { id: 4, title: "Bosch Rotary Hammer Drill", cat: "powertools", price: 950, period: "perDay", town: "Matara Town", district: "Matara", cond: "new", featured: false, img: "https://picsum.photos/seed/drill4/600/450" },
  { id: 5, title: "20ft Storage Container", cat: "containers", price: 9000, period: "perMonth", town: "Ja-Ela", district: "Gampaha", cond: "used", featured: false, img: "https://picsum.photos/seed/container5/600/450" },
  { id: 6, title: "Mini Tipper Truck 3T", cat: "vehicles", price: 7200, period: "perDay", town: "Galle Town", district: "Galle", cond: "used", featured: false, img: "https://picsum.photos/seed/tipper6/600/450" },
  { id: 7, title: "PA Sound System, 2 Speakers", cat: "event", price: 6000, period: "perDay", town: "Nugegoda", district: "Colombo", cond: "new", featured: false, img: "https://picsum.photos/seed/sound7/600/450" },
  { id: 8, title: "Portable Welding Machine", cat: "electrical", price: 1800, period: "perDay", town: "Kurunegala Town", district: "Kurunegala", cond: "used", featured: false, img: "https://picsum.photos/seed/weld8/600/450" },
  { id: 9, title: "Concrete Mixer 500L", cat: "construction", price: 3200, period: "perDay", town: "Colombo 01", district: "Colombo", cond: "used", featured: false, img: "https://picsum.photos/seed/mixer9/600/450" },
  { id: 10, title: "Mini Excavator 1.5T", cat: "excavators", price: 9800, period: "perDay", town: "Peradeniya", district: "Kandy", cond: "new", featured: true, img: "https://picsum.photos/seed/excav10/600/450" },
  { id: 11, title: "Angle Grinder Set (3pc)", cat: "powertools", price: 600, period: "perDay", town: "Homagama", district: "Colombo", cond: "used", featured: false, img: "https://picsum.photos/seed/grinder11/600/450" },
  { id: 12, title: "10ft Refrigerated Container", cat: "containers", price: 14000, period: "perMonth", town: "Wattala", district: "Gampaha", cond: "used", featured: false, img: "https://picsum.photos/seed/reefer12/600/450" },
];

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
