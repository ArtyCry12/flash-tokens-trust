"use client";

import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const { lang, toggleLang, content } = useLanguage();

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
        <a
          href="#hero"
          className="text-sm font-semibold tracking-[0.25em] text-white"
        >
          {content.hero.brand}
        </a>
        <Button
          variant="outline"
          size="sm"
          className="border-white/20 bg-transparent text-white hover:bg-white/10"
          onClick={toggleLang}
          aria-label="Toggle language"
        >
          {lang === "ro" ? "RU" : "RO"}
        </Button>
      </div>
    </header>
  );
}
