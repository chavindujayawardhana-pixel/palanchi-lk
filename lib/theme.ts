/**
 * Shared design tokens for Palanchi.lk.
 *
 * The prototypes computed these colors inline from a `dark` boolean. They are
 * centralized here so every page/component derives the exact same palette.
 */

export const gold = "#F4B400";
export const danger = "#D64545";
export const success = "#0F6E56";

export interface Colors {
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  gold: string;
  teal: string;
  danger: string;
  success: string;
}

export function getColors(dark: boolean): Colors {
  return {
    bg: dark ? "#10161A" : "#F8F9FA",
    surface: dark ? "#1A2226" : "#FFFFFF",
    text: dark ? "#F3F4F6" : "#1F2937",
    textMuted: dark ? "#9CA3AF" : "#6B7280",
    border: dark ? "#2A343A" : "#E7E5DE",
    gold,
    teal: dark ? "#1D9E75" : "#0F3D3E",
    danger,
    success,
  };
}
