"use client";

import ChromaGrid, { type ChromaItem } from "@/components/react-bits/ChromaGrid";
import AnimatedContent from "@/components/react-bits/AnimatedContent";
import { useLanguage } from "@/lib/i18n";
import { SECTION_IDS } from "@/lib/constants";

const SERVICE_STYLES = [
  { borderColor: "#2997ff", gradient: "linear-gradient(145deg, #1c3a5f, #000)" },
  { borderColor: "#10B981", gradient: "linear-gradient(180deg, #0f4c3a, #000)" },
  { borderColor: "#C0C0C0", gradient: "linear-gradient(165deg, #3d3d3d, #000)" },
  { borderColor: "#8B5CF6", gradient: "linear-gradient(195deg, #3b2d5c, #000)" },
  { borderColor: "#06B6D4", gradient: "linear-gradient(135deg, #0c4a6e, #000)" },
  { borderColor: "#F59E0B", gradient: "linear-gradient(210deg, #5c3d0a, #000)" },
];

const SERVICE_IMAGES = [
  "/images/gallery-1.webp",
  "/images/gallery-2.webp",
  "/images/gallery-3.webp",
  "/images/gallery-5.webp",
  "/images/gallery-1.webp",
  "/images/gallery-2.webp",
];

export function ServicesSection() {
  const { content } = useLanguage();
  const s = content.services;

  const items: ChromaItem[] = s.items.map((item, i) => ({
    image: SERVICE_IMAGES[i] ?? "/images/gallery-1.webp",
    title: item.title,
    subtitle: item.description,
    borderColor: SERVICE_STYLES[i].borderColor,
    gradient: SERVICE_STYLES[i].gradient,
  }));

  return (
    <section id={SECTION_IDS.services} className="bg-[var(--gw-bg)] py-24 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedContent>
          <h2 className="mb-4 text-center text-3xl font-semibold tracking-tight md:text-5xl">
            {s.h2}
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-white/60">{s.footnote}</p>
        </AnimatedContent>
        <div className="relative min-h-[520px]">
          <ChromaGrid items={items} radius={320} />
        </div>
      </div>
    </section>
  );
}
