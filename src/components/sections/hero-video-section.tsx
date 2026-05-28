"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SplitText from "@/components/react-bits/SplitText";
import { HeroCtaPanel } from "@/components/sections/hero-cta-panel";
import { useLanguage } from "@/lib/i18n";
import { HERO_VIDEO, SECTION_IDS } from "@/lib/constants";

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
    if (!el || reducedMotion || !HERO_VIDEO.encoded) return;
    el.play().catch(() => {
      /* autoplay blocked — poster remains visible */
    });
  }, [reducedMotion, videoReady]);

  const showVideo = HERO_VIDEO.encoded && !reducedMotion;

  return (
    <section
      id={SECTION_IDS.hero}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[var(--gw-bg)]"
      aria-label={h.h1}
    >
      <div className="absolute inset-0">
        {showVideo && (
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
            {HERO_VIDEO.hasWebm && (
              <source src={HERO_VIDEO.webm} type="video/webm" />
            )}
            <source src={HERO_VIDEO.mp4} type="video/mp4" />
          </video>
        )}
        <Image
          src={HERO_VIDEO.poster}
          alt=""
          fill
          priority
          fetchPriority="high"
          className={`object-cover ${showVideo && videoReady ? "opacity-0" : "opacity-100"} transition-opacity duration-700`}
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[var(--gw-bg)] via-[var(--gw-bg)]/75 to-[var(--gw-bg)]/40"
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-28 pt-24 md:px-12 md:pb-32 lg:justify-center lg:pb-24">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_minmax(280px,380px)] lg:items-center lg:gap-12">
          <div>
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
            <p className="mt-4 max-w-xl text-base text-[var(--gw-muted)] md:text-lg">{h.lead}</p>
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
          </div>
          <HeroCtaPanel />
        </div>
      </div>
    </section>
  );
}
