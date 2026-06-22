import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Doctor Platform — Find & book doctors in Udaipur",
  description:
    "Search trusted, verified doctors in Udaipur and book an appointment in minutes.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh antialiased bg-white text-slate-800">
        <SiteNav />
        <main className="pt-16">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
