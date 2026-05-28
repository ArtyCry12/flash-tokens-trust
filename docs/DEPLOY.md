# Deploy checklist — GELANDEWAGEN

## 1. Vercel (preview → production)

```bash
npm run check
npm run test:e2e
npx.cmd vercel --prod
```

Set env on Vercel:
- `NEXT_PUBLIC_SITE_URL` = `https://flash-tokens-trust.vercel.app` (preview) then `https://mercedesservice.md` (prod)

## 2. DNS (after approval)

Point `mercedesservice.md` A/CNAME to Vercel per project settings.

## 3. Post-launch SEO (manual)

- Google Search Console: add property, submit sitemap `/sitemap.xml`
- Google Business Profile: verify address str. Criuleni 82
- Update `OPENING_HOURS` in `src/lib/constants.ts` when hours confirmed

## 4. Optional hero video

Install ffmpeg, then:

```bash
npm run hero:video
```

Commit `public/videos/hero.webm` and `hero.mp4` when generated.

## 5. Client assets

Drop files in `public/images/incoming/` — logo SVG, workshop photos.
