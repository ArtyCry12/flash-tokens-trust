"use client";

import { motion } from "motion/react";
import { CtaLink } from "@/components/ui/cta-link";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        className="h-full w-full text-slate-800"
        viewBox="0 0 696 316"
        fill="none"
        aria-hidden
      >
        <title>Background paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 20 + (path.id % 10),
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  secondaryCta,
}: {
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCta?: { label: string; href: string };
}) {
  const words = title.split(" ");

  return (
    <div className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden bg-neutral-950">
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="mx-auto max-w-4xl"
        >
          <h2 className="mb-6 text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="mr-4 inline-block last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.08 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    className="inline-block bg-gradient-to-r from-white to-white/75 bg-clip-text text-transparent"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h2>
          {subtitle && (
            <p className="mx-auto mb-8 max-w-xl text-lg text-white/70">{subtitle}</p>
          )}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="inline-block rounded-2xl border border-white/10 bg-white/5 p-px backdrop-blur-lg">
              <CtaLink
                href={ctaHref}
                variant="ghost"
                size="lg"
                className="rounded-[1.1rem] border border-white/10 bg-white text-black hover:bg-white/90"
              >
                {ctaLabel}
              </CtaLink>
            </div>
            {secondaryCta && (
              <CtaLink
                href={secondaryCta.href}
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
              >
                {secondaryCta.label}
              </CtaLink>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
