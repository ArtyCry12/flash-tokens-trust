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
  alternates: {
    languages: {
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
        <link rel="preload" href="/frames/frame-0001.webp" as="image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-black text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
