# GELANDEWAGEN — Design direction (full rebrand)

## Philosophy
Premium automotive service — calm confidence, not crypto/AI slop. Reference: Mercedes editorial (dark graphite, silver metal, single cool accent).

## Color (oklch)
| Token | Value | Use |
|-------|-------|-----|
| `--gw-bg` | `oklch(0.12 0.01 260)` | Page background |
| `--gw-surface` | `oklch(0.18 0.012 260)` | Cards, sections |
| `--gw-silver` | `oklch(0.78 0.02 260)` | Headings, borders |
| `--gw-muted` | `oklch(0.55 0.02 260)` | Body secondary |
| `--gw-accent` | `oklch(0.72 0.14 230)` | CTAs, links (Mercedes-tech blue) |
| `--gw-accent-hover` | `oklch(0.62 0.16 230)` | Hover |

## Typography
- **Display:** Geist (existing) — tight tracking on H1
- **Body:** Geist — 1.05 line-height for RO/RU readability

## Layout
- Max width content: `72rem`
- Section padding: `py-20 md:py-28`
- Mobile-first; dock nav bottom on `< md`

## Motion
- Hero: muted loop video, `poster` for LCP
- Sections: fade-up on view (motion/react-bits), max 400ms
- `prefers-reduced-motion`: static poster, no scroll/video autoplay

## Components map
| Section | Pattern |
|---------|---------|
| Hero | Video + SplitText / BlurText |
| Services | ChromaGrid or GlareHover cards |
| Why | Letter tiles GWAGEN |
| Gallery | BounceCards |
| Nav | Dock (existing) |

## Anti-patterns (taste / ui-ux-pro-max)
- No purple gradients, no glassmorphism overload
- No stock “AI handshake” imagery
- Max 1 accent color
