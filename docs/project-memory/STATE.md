# GELANDEWAGEN — Project State

## Decisions (locked)
- **Production path:** Vercel preview → `mercedesservice.md` DNS
- **Design:** Full rebrand (premium Mercedes service, dark graphite + silver)
- **Hero:** Video loop with poster fallback (scroll frames removed)
- **i18n:** RO default, RU via `?lang=ru`
- **Content source:** mercedesservice.md + `src/content/*.ts`

## Business metrics (must preserve)
- Mercedes-Benz only · Since 1996 · Chișinău, str. Criuleni 82
- Phones: 079 43 77 73 · 079 46 08 06
- 6 services · GWAGEN acronym · Trust/honesty/parts/waiting area

## URLs
| Role | URL |
|------|-----|
| Legacy | https://www.mercedesservice.md/ |
| Prototype | https://flash-tokens-trust.vercel.app/ |
| Target prod | https://mercedesservice.md |

## Phase status
| Phase | Status |
|-------|--------|
| 0 Bootstrap | done |
| 1 Audit | done (`docs/research/*/playwright-report.json`, screenshots) |
| 2 Design | done (`docs/design-references/DESIGN-DIRECTION.md`, globals.css tokens) |
| 3 Content | done (humanized ro/ru) |
| 4 Hero video | done (`HeroVideoSection`, poster; encode via `npm run hero:video` + ffmpeg) |
| 5 Sections | done (rebrand classes, TrustStrip) |
| 6 SEO/perf | done (hreflang, schema hours, frames removed) |
| 7 Playwright | done (`e2e/`, `npm run check` green) |
| 8 Deploy | ready (`docs/DEPLOY.md` — awaiting DNS + client approve) |

## Skills extracted
- `~/.agents/skills/`: humanizer, seo-geo, agentmemory, andrej-karpathy, skills-main, marketingskills
- `docs/design-libraries/`: ui-ux-pro-max, taste

## Pending from client
- Logo SVG, workshop photos, confirmed opening hours
- ffmpeg + `npm run hero:video` for hero.webm/mp4 (optional; poster works today)
