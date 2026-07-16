import type { Config } from "tailwindcss";

/**
 * The prototype design is expressed with inline styles + a small set of
 * design tokens (see lib/theme.ts). These Tailwind tokens mirror the brand
 * palette so utility classes stay consistent with the existing design.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#F4B400",
        teal: { light: "#0F3D3E", dark: "#1D9E75" },
        danger: "#D64545",
        success: "#0F6E56",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
