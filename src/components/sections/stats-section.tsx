"use client";

import CountUp from "@/components/react-bits/CountUp";
import { useLanguage } from "@/lib/i18n";
import { SECTION_IDS } from "@/lib/constants";

const YEARS_SINCE_1996 = new Date().getFullYear() - 1996;

export function StatsSection() {
  const { content } = useLanguage();
  const s = content.stats;

  return (
    <section
      id={SECTION_IDS.stats}
      className="border-y border-white/10 bg-[var(--gw-surface)] py-20 text-white"
    >
      <div className="container mx-auto flex flex-col items-center gap-6 px-4 text-center md:px-6">
        <CountUp
          to={YEARS_SINCE_1996}
          duration={2.5}
          className="text-6xl font-semibold tracking-tighter text-[#2997ff] md:text-8xl"
        />
        <p className="text-xl text-white/80">{s.yearsLabel}</p>
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">
          {s.since} · {s.tagline}
        </p>
      </div>
    </section>
  );
}
