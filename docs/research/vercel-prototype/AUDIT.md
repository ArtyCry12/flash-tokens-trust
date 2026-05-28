# Prototype audit — flash-tokens-trust.vercel.app

**Date:** 2026-05-28

## Strengths
- RO/RU i18n with `?lang=`
- Rich sections: process, stats, gallery, GWAGEN
- JSON-LD LocalBusiness
- Scroll-frame hero (heavy but distinctive)

## Gaps (addressed in rebuild)
| Issue | Fix |
|-------|-----|
| ~120 frame WebPs hurt LCP/bandwidth | Replace with hero video + poster |
| Preload `frame-0001.webp` in layout | Preload video poster only |
| Generic Geist-only look | Rebrand tokens (graphite/silver) |
| No Playwright e2e | Add `e2e/` suite |
| Opening hours missing in schema | Add Mon–Sat placeholder |
| hreflang incomplete | `alternates.languages` + link tags |

## Design / motion
- Loading % on hero — remove with video poster approach
- Section motion OK; tune reduced-motion
- Gallery reuses images in services — dedupe in UI

## Technical
- `npm run check` required before deploy
- Remove unused animation modules after hero migration
