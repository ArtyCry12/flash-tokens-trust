"use client";

import Image from "next/image";
import AnimatedContent from "@/components/react-bits/AnimatedContent";
import { useLanguage } from "@/lib/i18n";
import { SECTION_IDS, SERVICE_IMAGES } from "@/lib/constants";

const SERVICE_STYLES = [
  { border: "border-[#2997ff]/40", glow: "from-[#2997ff]/20" },
  { border: "border-emerald-500/40", glow: "from-emerald-500/20" },
  { border: "border-slate-400/40", glow: "from-slate-400/20" },
  { border: "border-violet-500/40", glow: "from-violet-500/20" },
  { border: "border-cyan-500/40", glow: "from-cyan-500/20" },
  { border: "border-amber-500/40", glow: "from-amber-500/20" },
  { border: "border-rose-500/40", glow: "from-rose-500/20" },
  { border: "border-indigo-500/40", glow: "from-indigo-500/20" },
];

export function ServicesSection() {
  const { content } = useLanguage();
  const s = content.services;

  return (
    <section id={SECTION_IDS.services} className="bg-[var(--gw-bg)] py-24 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedContent>
          <h2 className="mb-4 text-center text-3xl font-semibold tracking-tight md:text-5xl">
            {s.h2}
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-white/60">{s.footnote}</p>
        </AnimatedContent>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {s.items.map((item, i) => {
            const style = SERVICE_STYLES[i] ?? SERVICE_STYLES[0];
            const image = SERVICE_IMAGES[i] ?? SERVICE_IMAGES[0];
            return (
              <li key={item.title}>
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-gradient-to-b to-black/80 ${style.border} ${style.glow}`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col gap-1 p-4">
                    <h3 className="text-sm font-semibold leading-snug md:text-base">
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-white/60 md:text-sm">
                      {item.description}
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
