"use client";

import AnimatedContent from "@/components/react-bits/AnimatedContent";
import BlurText from "@/components/react-bits/BlurText";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { useLanguage } from "@/lib/i18n";
import { SECTION_IDS } from "@/lib/constants";
import Image from "next/image";

export function AboutSection() {
  const { content } = useLanguage();
  const a = content.about;

  return (
    <section
      id={SECTION_IDS.about}
      className="bg-[var(--gw-surface-light)] py-24 text-[var(--gw-text-primary)]"
    >
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedContent direction="vertical" distance={80}>
          <BlurText
            text={a.h2}
            className="mb-8 text-3xl font-semibold tracking-tight md:text-5xl"
          />
        </AnimatedContent>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <AnimatedContent direction="horizontal" reverse distance={60} delay={0.1}>
            <div className="space-y-4 text-base leading-relaxed text-[var(--gw-text-secondary)] md:text-lg">
              {a.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <p className="font-medium text-[var(--gw-text-primary)]">{a.closing}</p>
            </div>
            <ul className="mt-8 grid gap-2 sm:grid-cols-2">
              {a.bullets.map((b) => (
                <li
                  key={b}
                  className="rounded-lg border border-black/5 bg-white px-4 py-2 text-sm font-medium shadow-sm"
                >
                  {b}
                </li>
              ))}
            </ul>
          </AnimatedContent>

          <div className="md:hidden">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--gw-muted)]">
              Mercedes-Benz · Chișinău
            </p>
            <Image
              src="/og-poster.webp"
              alt="GELANDEWAGEN — service Mercedes-Benz Chișinău"
              width={1200}
              height={630}
              className="w-full rounded-2xl object-cover shadow-lg"
            />
          </div>
          <div className="hidden md:block">
            <ContainerScroll
              titleComponent={
                <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gw-muted)]">
                  Mercedes-Benz · Chișinău
                </p>
              }
            >
              <Image
                src="/og-poster.webp"
                alt="GELANDEWAGEN — service Mercedes-Benz Chișinău"
                width={1200}
                height={630}
                className="mx-auto h-full w-full rounded-2xl object-cover"
              />
            </ContainerScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
