# UI Audit — GELANDEWAGEN (2026-05-28)

## Live vs local checklist

| Issue | Status | Fix |
|-------|--------|-----|
| Hero poster only (`NEXT_PUBLIC_HERO_VIDEO_ENCODED=false`) | Fixed | Seedance MP4 in `public/videos/hero.mp4`, encoded flag |
| Contact phones `text-[#2997ff]` | Fixed | `text-white` |
| Dock jitter (`dock-outer` height spring) | Fixed | Fixed outer height, absolute labels |
| CTA separate section | Fixed | `HeroCtaPanel` in hero; `CtaSection` removed |
| Hero duplicate CTAs (diag + phone) | Fixed | Removed from hero left column |
| Services: 6 cards, gallery image reuse | Fixed | 8 cards + dedicated `public/images/services/` |
| Gallery: BounceCards | Fixed | 3× glow card + R3F GLB rotation |
| Footer generic | Fixed | TikTok + nav anchors |
| About `#333` on light section | Fixed | Design tokens |
| About ContainerScroll mobile overflow | Fixed | Static image below `md` |

## E2E expectations

- `#hero` with CTA panel (no `#cta` section)
- 8 service cards visible
- Contact `tel:` links white
- RO default, `?lang=ru` toggle
