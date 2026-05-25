export type Lang = "ro" | "ru";

export type ServiceItem = {
  title: string;
  description: string;
};

export type WhyItem = {
  letter: string;
  title: string;
  description: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type SiteContent = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    about: string;
    services: string;
    process: string;
    contact: string;
  };
  hero: {
    brand: string;
    h1: string;
    subtitle: string;
    lead: string;
    trust: string;
    cta: string;
    chips: string[];
    overlayMid: string;
    overlayEnd: string;
  };
  about: {
    h2: string;
    paragraphs: string[];
    bullets: string[];
    closing: string;
  };
  services: {
    h2: string;
    footnote: string;
    items: ServiceItem[];
  };
  why: {
    h2: string;
    intro: string;
    items: WhyItem[];
    closing: string;
    bullets: string[];
  };
  process: {
    h2: string;
    steps: ProcessStep[];
    closing: string;
  };
  stats: {
    yearsLabel: string;
    since: string;
    tagline: string;
  };
  gallery: {
    h2: string;
    subtitle: string;
  };
  cta: {
    h2: string;
    text: string;
    book: string;
    call: string;
    note: string;
  };
  contact: {
    h2: string;
    lead: string;
    maps: string;
    route: string;
    businessName: string;
  };
  footer: {
    description: string;
    copyright: string;
  };
};
