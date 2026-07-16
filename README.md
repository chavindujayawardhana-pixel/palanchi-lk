# Palanchi.lk

Sri Lanka's rental marketplace for equipment, machinery and tools — a Next.js 14
(App Router) + TypeScript + Tailwind CSS application converted from the original
React prototypes.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Pages

| Route         | Source prototype             | Description                          |
| ------------- | ---------------------------- | ------------------------------------ |
| `/`           | `palanchi-homepage.jsx`      | Home + hero search + featured/latest |
| `/search`     | `palanchi-search.jsx`        | Listing search with filters          |
| `/ads/[id]`   | `palanchi-ad-detail.jsx`     | Ad detail — gallery, contact, similar |
| `/create-ad`  | `palanchi-create-ad.jsx`     | Multi-section ad submission form     |
| `/admin`      | `palanchi-admin.jsx`         | Admin dashboard (Recharts)           |
| `/login`      | `palanchi-auth.jsx`          | Login / register                     |
| `/contact`    | `palanchi-contact.jsx`       | Contact form + FAQ                   |

The original prototypes are preserved under `prototypes/` for reference.

## Project structure

```
app/                 App Router pages + root layout + globals.css
components/           Reusable UI
  ThemeProvider.tsx   Shared language + dark-mode state (persisted to localStorage)
  Navbar.tsx          Shared site header (all pages except admin)
  Logo.tsx            Wordmark
  LanguageSwitcher.tsx  EN / SI / TA dropdown
  DarkModeToggle.tsx  Sun/Moon toggle
lib/
  theme.ts            Color tokens (getColors) + brand constants
  i18n.ts             LANGS + Lang type
  data.ts             Mock categories / districts / towns / listings / reviews
  format.ts           Number formatting (en-LK)
```

## Design notes

- **i18n** — Sinhala / English / Tamil. Language is held in `ThemeProvider` and
  persisted, so it now stays consistent across page navigation.
- **Dark mode** — the same `dark` boolean drives the `getColors()` palette used
  by every page's inline styles; persisted to `localStorage`.
- **Fonts** — Space Grotesk (display), Inter (body), JetBrains Mono (prices),
  loaded in `app/globals.css`.
- Listing images use `picsum.photos` placeholder seeds (same as the prototypes).

## Not yet wired up

Per the current scope, everything runs on the in-repo mock data in `lib/data.ts`.
Supabase (data/auth) and Cloudinary (image uploads) are intentionally **not**
integrated yet — the create-ad form and admin actions operate on local state only.
