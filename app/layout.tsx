import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const defaultTitle = "Palanchi.lk - Sri Lanka's Rental Marketplace for Equipment, Machinery & Tools";
const defaultDescription =
  "Rent scaffolding, machinery, vehicles, generators and tools from anyone, anywhere in Sri Lanka — or list what you own for free. Covering all 25 districts.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: defaultTitle, template: `%s | ${SITE_NAME}` },
  description: defaultDescription,
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_LK",
    url: SITE_URL,
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
