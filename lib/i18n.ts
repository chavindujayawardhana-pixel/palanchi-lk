/** Supported UI languages: English, Sinhala, Tamil. */
export const LANGS = {
  en: "English",
  si: "සිංහල",
  ta: "தமிழ்",
} as const;

export type Lang = keyof typeof LANGS;
