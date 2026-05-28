"use client";

import AnimatedContent from "@/components/react-bits/AnimatedContent";
import { useLanguage } from "@/lib/i18n";
import {
  ADDRESS,
  MAPS_DIRECTIONS,
  MAPS_EMBED,
  MAPS_SEARCH,
  PHONES,
  SECTION_IDS,
} from "@/lib/constants";
import { MapPin, ExternalLink, Navigation } from "lucide-react";

export function ContactSection() {
  const { content } = useLanguage();
  const c = content.contact;

  return (
    <section id={SECTION_IDS.contact} className="bg-[var(--gw-surface)] py-20 text-white">
      <div className="container mx-auto max-w-3xl px-4 md:px-6">
        <AnimatedContent>
          <h2 className="mb-2 text-3xl font-semibold tracking-tight md:text-4xl">{c.h2}</h2>
          <p className="mb-8 text-white/70">{c.lead}</p>
        </AnimatedContent>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a]">
          <div className="relative aspect-[16/10] w-full">
            <iframe
              title="GELANDEWAGEN location map"
              src={MAPS_EMBED}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="space-y-4 p-6">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/90">
                <MapPin className="h-5 w-5 text-white" />
              </span>
              <div>
                <p className="font-semibold">{c.businessName}</p>
                <p className="text-sm text-white/60">{ADDRESS.line}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              {PHONES.map((phone) => (
                <a
                  key={phone.href}
                  href={phone.href}
                  className="text-lg font-medium text-white hover:text-white/80"
                >
                  {phone.display}
                </a>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={MAPS_SEARCH}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                <ExternalLink className="h-4 w-4" />
                {c.maps}
              </a>
              <a
                href={MAPS_DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#2997ff] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0077ed]"
              >
                <Navigation className="h-4 w-4" />
                {c.route}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
