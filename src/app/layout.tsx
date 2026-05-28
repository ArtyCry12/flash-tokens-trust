import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ro } from "@/content/ro";
import { buildJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: ro.meta.title,
  description: ro.meta.description,
  keywords: ro.meta.keywords,
  alternates: {
    canonical: "/",
    languages: {
      "ro-MD": "/",
      "ru-MD": "/?lang=ru",
      ro: "/",
      ru: "/?lang=ru",
    },
  },
  openGraph: {
    title: ro.meta.title,
    description: ro.meta.description,
    url: SITE_URL,
    siteName: "GELANDEWAGEN",
    locale: "ro_MD",
    type: "website",
    images: [{ url: "/og-poster.webp", width: 1200, height: 630, alt: "GELANDEWAGEN Mercedes Service" }],
  },
  twitter: {
    card: "summary_large_image",
    title: ro.meta.title,
    description: ro.meta.description,
    images: ["/og-poster.webp"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = buildJsonLd();

  return (
    <html
      lang="ro"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preload" href="/videos/hero-poster.webp" as="image" type="image/webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-[var(--gw-bg)] text-foreground">
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
