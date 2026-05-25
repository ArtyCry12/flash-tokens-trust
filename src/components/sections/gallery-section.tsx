"use client";

import BounceCards from "@/components/react-bits/BounceCards";
import { useLanguage } from "@/lib/i18n";
import { SECTION_IDS, GALLERY_IMAGES } from "@/lib/constants";

const TRANSFORMS = [
  "rotate(8deg) translate(-150px)",
  "rotate(3deg) translate(-75px)",
  "rotate(-4deg)",
  "rotate(6deg) translate(75px)",
  "rotate(-6deg) translate(150px)",
];

export function GallerySection() {
  const { content } = useLanguage();
  const g = content.gallery;
  const images = GALLERY_IMAGES.map((img) => img.src);

  return (
    <section id={SECTION_IDS.gallery} className="bg-black py-24 text-white">
      <div className="container mx-auto px-4 text-center md:px-6">
        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{g.h2}</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/60">{g.subtitle}</p>
        <div className="mt-16 flex justify-center">
          <BounceCards
            images={images}
            containerWidth={520}
            containerHeight={280}
            transformStyles={TRANSFORMS}
            enableHover={false}
          />
        </div>
      </div>
    </section>
  );
}
