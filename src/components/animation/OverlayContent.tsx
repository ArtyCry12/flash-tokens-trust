"use client";

import SplitText from "@/components/react-bits/SplitText";
import { CtaLink } from "@/components/ui/cta-link";
import { useLanguage } from "@/lib/i18n";
import { PHONES, SECTION_IDS } from "@/lib/constants";

type OverlayContentProps = {
  progress: number;
};

export function OverlayContent({ progress }: OverlayContentProps) {
  const { content } = useLanguage();
  const h = content.hero;

  const introOpacity = progress < 0.25 ? 1 - progress / 0.25 : 0;
  const midOpacity =
    progress >= 0.35 && progress <= 0.65
      ? 1 - Math.abs(progress - 0.5) / 0.15
      : 0;
  const endOpacity = progress > 0.78 ? (progress - 0.78) / 0.22 : 0;

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-12">
      <div
        className="pointer-events-auto max-w-3xl transition-opacity duration-300"
        style={{ opacity: introOpacity }}
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
          {h.brand}
        </p>
        <h1 className="text-4xl font-semibold tracking-tighter text-white md:text-6xl lg:text-7xl">
          {h.h1}
        </h1>
        <SplitText
          text={h.subtitle}
          tag="p"
          splitType="words"
          className="mt-3 text-xl text-white/90 md:text-2xl"
          threshold={0.2}
        />
        <p className="mt-4 max-w-xl text-base text-white/75 md:text-lg">{h.lead}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {h.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur-md"
            >
              {chip}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <CtaLink
            href={`#${SECTION_IDS.contact}`}
            size="lg"
            className="bg-[#2997ff] text-white hover:bg-[#0077ed]"
          >
            {h.cta}
          </CtaLink>
          <CtaLink
            href={PHONES[0].href}
            size="lg"
            variant="outline"
            className="border-white/30 bg-white/10 text-white hover:bg-white/20"
          >
            {PHONES[0].display}
          </CtaLink>
        </div>
      </div>

      <p
        className="pointer-events-none absolute left-6 right-6 top-1/3 max-w-lg text-lg text-white/90 md:left-12 md:text-2xl"
        style={{ opacity: midOpacity }}
      >
        {h.overlayMid}
      </p>

      <div
        className="pointer-events-auto absolute bottom-24 left-6 right-6 flex flex-col items-start gap-3 md:left-12"
        style={{ opacity: endOpacity }}
      >
        <p className="text-lg text-white/90">{h.overlayEnd}</p>
        <CtaLink
          href={PHONES[1].href}
          size="lg"
          className="bg-white text-black hover:bg-white/90"
        >
          {PHONES[1].display}
        </CtaLink>
      </div>
    </div>
  );
}
