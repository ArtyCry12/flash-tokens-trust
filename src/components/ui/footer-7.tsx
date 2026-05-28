import React from "react";

type Footer7Props = {
  logo?: { title: string };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  copyright?: string;
};

export function Footer7({
  logo = { title: "GELANDEWAGEN" },
  sections = [],
  description = "",
  copyright = "",
}: Footer7Props) {
  return (
    <footer className="border-t border-border bg-[#0a0a0a] py-16 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start">
          <div className="flex max-w-md flex-col gap-4">
            <h2 className="text-xl font-semibold tracking-tight">{logo.title}</h2>
            <p className="text-sm text-white/60">{description}</p>
          </div>
          <div className="grid w-full gap-8 sm:grid-cols-2 md:grid-cols-3 lg:max-w-2xl">
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="mb-3 text-sm font-bold text-white">{section.title}</h3>
                <ul className="space-y-2 text-sm text-white/60">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="transition-colors hover:text-[#2997ff]"
                        {...(link.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/50">
          {copyright}
        </div>
      </div>
    </footer>
  );
}
