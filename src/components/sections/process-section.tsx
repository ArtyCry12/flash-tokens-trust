"use client";

import AnimatedContent from "@/components/react-bits/AnimatedContent";
import { useLanguage } from "@/lib/i18n";
import { SECTION_IDS } from "@/lib/constants";

export function ProcessSection() {
  const { content } = useLanguage();
  const p = content.process;

  return (
    <section id={SECTION_IDS.process} className="bg-white py-24 text-[#1d1d1f]">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-semibold tracking-tight md:text-5xl">
          {p.h2}
        </h2>
        <div
          role="list"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {p.steps.map((step, i) => (
            <AnimatedContent key={step.title} delay={i * 0.08} distance={40}>
              <div
                role="listitem"
                className="rounded-2xl border border-black/5 bg-[#f5f5f7] p-6"
              >
                <span className="text-sm font-bold text-[#2997ff]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-[#6e6e73]">{step.description}</p>
              </div>
            </AnimatedContent>
          ))}
        </div>
        <p className="mt-10 text-center text-lg text-[#333]">{p.closing}</p>
      </div>
    </section>
  );
}
