"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ro } from "@/content/ro";
import { ru } from "@/content/ru";
import type { Lang, SiteContent } from "@/content/types";

const CONTENT: Record<Lang, SiteContent> = { ro, ru };

type LanguageContextValue = {
  lang: Lang;
  content: SiteContent;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readLangFromBrowser(): Lang {
  const params = new URLSearchParams(window.location.search);
  const q = params.get("lang");
  if (q === "ru" || q === "ro") return q;
  const stored = localStorage.getItem("gelandewagen-lang") as Lang | null;
  if (stored === "ro" || stored === "ru") return stored;
  return "ro";
}

function syncLangToUrl(lang: Lang) {
  const url = new URL(window.location.href);
  url.searchParams.set("lang", lang);
  window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
}

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "ro";
  return readLangFromBrowser();
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem("gelandewagen-lang", lang);
    syncLangToUrl(lang);
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((current) => (current === "ro" ? "ru" : "ro"));
  }, []);

  const value = useMemo(
    () => ({
      lang,
      content: CONTENT[lang],
      setLang,
      toggleLang,
    }),
    [lang, setLang, toggleLang]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
