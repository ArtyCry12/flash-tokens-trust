"use client";

import GlareHover from "@/components/react-bits/GlareHover";
import AnimatedContent from "@/components/react-bits/AnimatedContent";
import { useLanguage } from "@/lib/i18n";
import { SECTION_IDS } from "@/lib/constants";

export function WhySection() {
  const { content } = useLanguage();
  const w = content.why;

  return (
    <section id={SECTION_IDS.why} className="bg-[var(--gw-surface-light)] py-24 text-[var(--gw-text-primary)]">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedContent>
          <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-5xl">{w.h2}</h2>
          <p className="mb-12 max-w-2xl text-lg text-[#6e6e73]">{w.intro}</p>
        </AnimatedContent>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {w.items.map((item, i) => (
            <AnimatedContent
              key={`${item.letter}-${item.title}`}
              delay={i * 0.05}
            >
              <GlareHover
                background="#fff"
                borderColor="#e0e0e0"
                glareColor="#2997ff"
                glareOpacity={0.25}
                className="p-6 text-left"
              >
                <span className="text-4xl font-bold text-[#2997ff]">{item.letter}</span>
                <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-[#6e6e73]">{item.description}</p>
              </GlareHover>
            </AnimatedContent>
          ))}
        </div>

        <p className="mt-10 text-center text-base text-[#333]">{w.closing}</p>
        <ul className="mt-6 flex flex-wrap justify-center gap-2">
          {w.bullets.map((b) => (
            <li
              key={b}
              className="rounded-full bg-white px-4 py-1.5 text-xs font-medium shadow-sm"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
