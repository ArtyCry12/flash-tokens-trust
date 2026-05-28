"use client";

import { useLanguage } from "@/lib/i18n";

export function TrustStrip() {
  const { content } = useLanguage();
  const items = content.hero.chips;

  return (
    <div
      className="border-y border-white/10 bg-[var(--gw-surface)] py-4"
      role="region"
      aria-label="Trust highlights"
    >
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 text-center text-sm text-[var(--gw-silver)] md:text-base">
        {items.map((item) => (
          <span key={item} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gw-accent)]" aria-hidden />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
