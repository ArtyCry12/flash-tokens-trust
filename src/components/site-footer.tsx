"use client";

import { Footer7 } from "@/components/ui/footer-7";
import { useLanguage } from "@/lib/i18n";
import { SECTION_IDS, TIKTOK_URL } from "@/lib/constants";

export function SiteFooter() {
  const { content } = useLanguage();
  const n = content.nav;

  return (
    <Footer7
      logo={{ title: content.hero.brand }}
      description={content.footer.description}
      copyright={content.footer.copyright}
      sections={[
        {
          title: "Navigation",
          links: [
            { name: n.home, href: `#${SECTION_IDS.hero}` },
            { name: n.about, href: `#${SECTION_IDS.about}` },
            { name: n.services, href: `#${SECTION_IDS.services}` },
            { name: n.contact, href: `#${SECTION_IDS.contact}` },
          ],
        },
        {
          title: "Social",
          links: [
            {
              name: "TikTok @gelandewagen.md",
              href: TIKTOK_URL,
            },
          ],
        },
      ]}
    />
  );
}
