import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Palanchi.lk — Sri Lanka's rental marketplace",
  description:
    "Rent scaffolding, machinery, vehicles and tools from anyone, anywhere in Sri Lanka — or list what you own.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
