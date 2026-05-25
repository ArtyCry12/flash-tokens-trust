"use client";

import Dock from "@/components/react-bits/Dock";
import { useLanguage } from "@/lib/i18n";
import { SECTION_IDS } from "@/lib/constants";
import { VscHome, VscInfo, VscTools, VscListOrdered, VscLocation } from "react-icons/vsc";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: "smooth" });
}

export function SiteDock() {
  const { content } = useLanguage();
  const n = content.nav;

  const items = [
    { icon: <VscHome size={18} />, label: n.home, onClick: () => scrollTo(SECTION_IDS.hero) },
    { icon: <VscInfo size={18} />, label: n.about, onClick: () => scrollTo(SECTION_IDS.about) },
    {
      icon: <VscTools size={18} />,
      label: n.services,
      onClick: () => scrollTo(SECTION_IDS.services),
    },
    {
      icon: <VscListOrdered size={18} />,
      label: n.process,
      onClick: () => scrollTo(SECTION_IDS.process),
    },
    {
      icon: <VscLocation size={18} />,
      label: n.contact,
      onClick: () => scrollTo(SECTION_IDS.contact),
    },
  ];

  return <Dock items={items} panelHeight={68} baseItemSize={48} magnification={64} />;
}
