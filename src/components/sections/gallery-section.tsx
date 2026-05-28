"use client";

import { GalleryModelViewer } from "@/components/gallery/gallery-model-viewer";
import { AnimatedGlowCard } from "@/components/ui/animated-glow-card";
import { useLanguage } from "@/lib/i18n";
import { GALLERY_MODELS, SECTION_IDS } from "@/lib/constants";

export function GallerySection() {
  const { content } = useLanguage();
  const g = content.gallery;

  return (
    <section id={SECTION_IDS.gallery} className="bg-[var(--gw-bg)] py-24 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-center text-3xl font-semibold tracking-tight md:text-5xl">{g.h2}</h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-white/60">{g.subtitle}</p>
        <ul className="mt-16 grid gap-8 md:grid-cols-3">
          {GALLERY_MODELS.map((model) => (
            <li key={model.src}>
              <AnimatedGlowCard label={model.label}>
                <GalleryModelViewer url={model.src} />
              </AnimatedGlowCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
