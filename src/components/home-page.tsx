"use client";

import { HeroVideoSection } from "@/components/sections/hero-video-section";
import { TrustStrip } from "@/components/sections/trust-strip";
import { SiteHeader } from "@/components/site-header";
import { SiteDock } from "@/components/site-dock";
import { AboutSection } from "@/components/sections/about-section";
import { ServicesSection } from "@/components/sections/services-section";
import { WhySection } from "@/components/sections/why-section";
import { ProcessSection } from "@/components/sections/process-section";
import { StatsSection } from "@/components/sections/stats-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { ContactSection } from "@/components/sections/contact-section";
import { SiteFooter } from "@/components/site-footer";

export function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="pb-28">
        <HeroVideoSection />
        <TrustStrip />
        <AboutSection />
        <ServicesSection />
        <WhySection />
        <ProcessSection />
        <StatsSection />
        <GallerySection />
        <ContactSection />
        <SiteFooter />
      </main>
      <SiteDock />
    </>
  );
}
