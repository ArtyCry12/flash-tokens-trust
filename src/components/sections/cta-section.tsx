"use client";

import { BackgroundPaths } from "@/components/ui/background-paths";
import { useLanguage } from "@/lib/i18n";
import { PHONES, SECTION_IDS } from "@/lib/constants";

export function CtaSection() {
  const { content } = useLanguage();
  const c = content.cta;

  return (
    <section id={SECTION_IDS.cta}>
      <BackgroundPaths
        title={c.h2}
        subtitle={c.text}
        ctaLabel={c.book}
        ctaHref={`#${SECTION_IDS.contact}`}
        secondaryCta={{ label: c.call, href: PHONES[0].href }}
      />
      <p className="bg-neutral-950 pb-8 text-center text-sm text-white/50">{c.note}</p>
    </section>
  );
}
