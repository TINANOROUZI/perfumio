import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Véla — Modern Fragrance & Beauty",
  description: "A unique, editorial storefront for perfumes & cosmetics.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
