"use client";

import { motion } from "motion/react";
import { CtaLink } from "@/components/ui/cta-link";
import { useLanguage } from "@/lib/i18n";
import { PHONES, SECTION_IDS } from "@/lib/constants";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      <svg className="h-full w-full text-slate-700" viewBox="0 0 696 316" fill="none" aria-hidden>
        <title>Decorative paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.12 + path.id * 0.02}
            initial={{ pathLength: 0.3, opacity: 0.5 }}
            animate={{ pathLength: 1, opacity: [0.25, 0.5, 0.25] }}
            transition={{
              duration: 18 + (path.id % 8),
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function HeroCtaPanel() {
  const { content } = useLanguage();
  const c = content.cta;

  return (
    <aside
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/75 p-6 shadow-2xl backdrop-blur-xl md:p-8"
      aria-label={c.h2}
    >
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
      <div className="relative z-10 flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">{c.h2}</h2>
        <p className="text-sm leading-relaxed text-white/70 md:text-base">{c.text}</p>
        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
          <CtaLink
            href={`#${SECTION_IDS.contact}`}
            size="lg"
            className="w-full justify-center sm:w-auto"
          >
            {c.book}
          </CtaLink>
          <CtaLink
            href={PHONES[0].href}
            size="lg"
            variant="outline"
            className="w-full border-white/30 bg-white/5 text-white hover:bg-white/10 sm:w-auto"
          >
            {c.call}
          </CtaLink>
        </div>
        <p className="text-xs text-white/50">{c.note}</p>
      </div>
    </aside>
  );
}
