import { ADDRESS, OPENING_HOURS, PHONES, SITE_URL } from "@/lib/constants";

export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "GELANDEWAGEN",
        description:
          "Service specializat Mercedes-Benz în Chișinău. Diagnostic și reparații din 1996.",
        inLanguage: ["ro", "ru"],
      },
      {
        "@type": ["AutoRepair", "LocalBusiness"],
        "@id": `${SITE_URL}/#business`,
        name: "GELANDEWAGEN",
        description:
          "Service specializat Mercedes-Benz în Chișinău. Diagnostic, reparații motor, cutie automată, electrică, suspensie și climatizare.",
        url: SITE_URL,
        telephone: PHONES.map((p) => p.href.replace("tel:", "")),
        foundingDate: "1996",
        image: `${SITE_URL}/og-poster.webp`,
        address: {
          "@type": "PostalAddress",
          streetAddress: "str. Criuleni 82",
          addressLocality: "Chișinău",
          addressCountry: "MD",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: ADDRESS.lat,
          longitude: ADDRESS.lng,
        },
        openingHoursSpecification: OPENING_HOURS.map((slot) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: slot.dayOfWeek,
          opens: slot.opens,
          closes: slot.closes,
        })),
        areaServed: {
          "@type": "Country",
          name: "Moldova",
        },
        knowsAbout: [
          "Mercedes-Benz",
          "Computer diagnostics",
          "Engine repair",
          "Automatic transmission",
          "SBC repair",
          "Suspension repair",
          "Air conditioning service",
        ],
      },
    ],
  };
}
