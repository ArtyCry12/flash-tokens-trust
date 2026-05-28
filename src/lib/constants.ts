export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mercedesservice.md";

function readPublicFlag(name: string, defaultOn = true): boolean {
  const raw = process.env[name];
  if (raw === undefined || raw.trim() === "") return defaultOn;
  const value = raw.trim().toLowerCase();
  if (value === "false" || value === "0" || value === "no") return false;
  return value === "true" || value === "1" || value === "yes";
}

export const HERO_VIDEO = {
  webm: "/videos/hero.webm",
  mp4: "/videos/hero.mp4",
  /** Autoplay hero.mp4 unless explicitly disabled via env */
  encoded: readPublicFlag("NEXT_PUBLIC_HERO_VIDEO_ENCODED", true),
  hasWebm: readPublicFlag("NEXT_PUBLIC_HERO_VIDEO_WEBM", false),
} as const;

export const PHONES = [
  { display: "079 43 77 73", href: "tel:+37379437773" },
  { display: "079 46 08 06", href: "tel:+37379460806" },
] as const;

export const ADDRESS = {
  line: "Moldova, Chișinău, str. Criuleni 82",
  query: "str. Criuleni 82, Chișinău, Moldova",
  lat: 47.0389,
  lng: 28.8204,
} as const;

/** Placeholder until client confirms — update in constants + schema */
export const OPENING_HOURS = [
  { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "18:00" },
] as const;

export const MAPS_SEARCH = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS.query)}`;
export const MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS.query)}`;
export const MAPS_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS.query)}&z=16&output=embed`;

export const SECTION_IDS = {
  hero: "hero",
  about: "about",
  services: "services",
  why: "why",
  process: "process",
  stats: "stats",
  gallery: "gallery",
  contact: "contact",
} as const;

export const SERVICE_IMAGES = [
  "/images/services/service-01-diagnostics.webp",
  "/images/services/service-02-electrics.webp",
  "/images/services/service-03-engine.webp",
  "/images/services/service-04-at.webp",
  "/images/services/service-05-ac.webp",
  "/images/services/service-06-suspension.webp",
  "/images/services/service-07-brakes.webp",
  "/images/services/service-08-alignment.webp",
] as const;

export const GALLERY_MODELS = [
  {
    src: "/models/mercedes-s-class.glb",
    label: "Mercedes-AMG GT 4-Door",
  },
  {
    src: "/models/brabus-g-class.glb",
    label: "Brabus G-Class",
  },
  {
    src: "/models/mercedes-s-texture.glb",
    label: "Mercedes-Benz S",
  },
] as const;

export const TIKTOK_URL = "https://www.tiktok.com/@gelandewagen.md" as const;

export const GALLERY_IMAGES = [
  { src: "/images/gallery-1.webp", alt: "Mercedes-Benz GLE Coupe" },
  { src: "/images/gallery-2.webp", alt: "Mercedes-Benz AMG sedan" },
  { src: "/images/gallery-3.webp", alt: "Mercedes-Benz GLA" },
  { src: "/images/gallery-4.webp", alt: "Mercedes-Benz G-Class lineup" },
  { src: "/images/gallery-5.webp", alt: "Mercedes-AMG GT" },
] as const;
