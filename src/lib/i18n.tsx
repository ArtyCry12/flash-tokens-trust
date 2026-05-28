"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { ro } from "@/content/ro";
import { ru } from "@/content/ru";
import type { Lang, SiteContent } from "@/content/types";

const CONTENT: Record<Lang, SiteContent> = { ro, ru };
const LANG_CHANGE = "gelandewagen-lang-change";

type LanguageContextValue = {
  lang: Lang;
  content: SiteContent;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

let hydrated = false;
let overrideLang: Lang | null = null;

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

function getLangSnapshot(): Lang {
  if (overrideLang) return overrideLang;
  if (!hydrated) return "ro";
  return readLangFromBrowser();
}

function getLangServerSnapshot(): Lang {
  return "ro";
}

function subscribeToLang(onStoreChange: () => void) {
  const notify = () => onStoreChange();
  window.addEventListener(LANG_CHANGE, notify);
  window.addEventListener("popstate", notify);
  return () => {
    window.removeEventListener(LANG_CHANGE, notify);
    window.removeEventListener("popstate", notify);
  };
}

function emitLangChange() {
  window.dispatchEvent(new Event(LANG_CHANGE));
}

function applyLang(next: Lang) {
  overrideLang = next;
  document.documentElement.lang = next;
  localStorage.setItem("gelandewagen-lang", next);
  syncLangToUrl(next);
  emitLangChange();
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(
    subscribeToLang,
    getLangSnapshot,
    getLangServerSnapshot,
  );

  useEffect(() => {
    hydrated = true;
    const initial = readLangFromBrowser();
    overrideLang = initial;
    document.documentElement.lang = initial;
    localStorage.setItem("gelandewagen-lang", initial);
    syncLangToUrl(initial);
    emitLangChange();
    return () => {
      hydrated = false;
      overrideLang = null;
    };
  }, []);

  const setLang = useCallback((next: Lang) => {
    applyLang(next);
  }, []);

  const toggleLang = useCallback(() => {
    const current = overrideLang ?? readLangFromBrowser();
    applyLang(current === "ro" ? "ru" : "ro");
  }, []);

  const value = useMemo(
    () => ({
      lang,
      content: CONTENT[lang],
      setLang,
      toggleLang,
    }),
    [lang, setLang, toggleLang],
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
