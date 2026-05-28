"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SplitText from "@/components/react-bits/SplitText";
import { CtaLink } from "@/components/ui/cta-link";
import { useLanguage } from "@/lib/i18n";
import { HERO_VIDEO, PHONES, SECTION_IDS } from "@/lib/constants";

export function HeroVideoSection() {
  const { content } = useLanguage();
  const h = content.hero;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reducedMotion) return;
    el.play().catch(() => {
      /* autoplay blocked — poster remains visible */
    });
  }, [reducedMotion, videoReady]);

  return (
    <section
      id={SECTION_IDS.hero}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[var(--gw-bg)]"
      aria-label={h.h1}
    >
      <div className="absolute inset-0">
        {HERO_VIDEO.encoded && !reducedMotion && (
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
            muted
            loop
            playsInline
            preload="metadata"
            poster={HERO_VIDEO.poster}
            onCanPlay={() => setVideoReady(true)}
          >
            <source src={HERO_VIDEO.webm} type="video/webm" />
            <source src={HERO_VIDEO.mp4} type="video/mp4" />
          </video>
        )}
        <Image
          src={HERO_VIDEO.poster}
          alt=""
          fill
          priority
          fetchPriority="high"
          className={`object-cover ${HERO_VIDEO.encoded && !reducedMotion && videoReady ? "opacity-0" : "opacity-100"} transition-opacity duration-700`}
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[var(--gw-bg)] via-[var(--gw-bg)]/70 to-[var(--gw-bg)]/30"
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-28 pt-24 md:px-12 md:pb-32">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-[var(--gw-silver)]/80">
          {h.brand}
        </p>
        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
          {h.h1}
        </h1>
        <SplitText
          text={h.subtitle}
          tag="p"
          splitType="words"
          className="mt-3 text-xl text-[var(--gw-silver)] md:text-2xl"
          threshold={0.2}
        />
        <p className="mt-4 max-w-xl text-base text-[var(--gw-muted)] md:text-lg">
          {h.lead}
        </p>
        <p className="mt-2 max-w-xl text-sm text-[var(--gw-muted)]/90">{h.trust}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {h.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-[var(--gw-silver)] backdrop-blur-sm"
            >
              {chip}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <CtaLink href={`#${SECTION_IDS.contact}`} size="lg">
            {h.cta}
          </CtaLink>
          <CtaLink
            href={PHONES[0].href}
            size="lg"
            variant="outline"
            className="border-white/25 bg-white/5 text-white hover:bg-white/15"
          >
            {PHONES[0].display}
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
