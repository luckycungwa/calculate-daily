# Cloudflare Pages deployment (chosen: Option 2)

Decision 2026-10-30: host on **Cloudflare Pages**, domain `totalcalculation.com`
registered at Cloudflare. Vercel remains the current origin until the Pages
project is live and the domain is switched; do not detach anything until that
point.

## Why the extra files exist

`vercel.json` is not read by Cloudflare Pages, so its behaviour was ported to
two files that Pages reads from the build output root:

- `public/_redirects` — the 8 legacy duplicate-intent 301s.
- `public/_headers` — asset/font caching, security headers, and the embed
  framing rules. Pages cannot wildcard-exclude a path (Vercel's
  `/((?!embed/).*)` trick), so framing is enforced with
  `Content-Security-Policy: frame-ancestors 'self'` on everything and
  `frame-ancestors *` on `/embed/*`, placed *below* the catch-all so it wins.
- `public/ads.txt` — the AdSense seller line for
  `pub-8180440849942257`.

All three are inert under Vercel, so shipping them early is safe.

## Create the Pages project

1. Cloudflare dashboard → Compute (Workers & Pages) → Create → **Pages** →
   "Import an existing Git repository" → this repo.
2. Build settings:
   - Framework preset: **None**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: environment variable `NODE_VERSION` = `24` (Pages defaults
     elsewhere; the repo builds on Node 24)
3. Production env vars before the first build:
   - `SITE_URL=https://totalcalculation.com` (Pages cannot read Vercel env)
   - `VITE_GA4_ID=` — add the GA4 ID when the measurement is wanted
   - `GOOGLE_SITE_VERIFICATION=` — the GSC token for the domain property
4. Deploy, then verify: `/_headers`, `/_redirects`, and `/ads.txt` all exist in
   the built output (`public/` is copied verbatim into `dist/`).

## Post-deploy verification (do before DNS cutover)

- `curl -I https://<pages-domain>/embed/percentage-calculator` → headers must
  show `Content-Security-Policy: frame-ancestors *` and **no**
  `X-Frame-Options: SAMEORIGIN`. CF Pages resolves duplicate header keys by
  rule order — this is the one behaviour to confirm, because the whole embed
  surface depends on it (AGENTS.md: embeds must stay frameable).
- `curl -I https://<pages-domain>/calculators/tip-split-calculator` → HTTP
  **301** to `/calculators/tip-calculator`.
- `curl -I https://<pages-domain>/definitely-not-a-page` → HTTP **404**
  rendering `404.html` (Pages serves it automatically; the prerender already
  emits it).
- `https://<pages-domain>/sitemap.xml` → 316 URLs on
  `https://totalcalculation.com` (set by `SITE_URL` at build time).
- `https://<pages-domain>/ads.txt` → the seller line.
- Two HTML spot-checks: canonical/`og:url` = `https://totalcalculation.com/...`
  on `/` and a calculator page.

## DNS cutover

1. Pages project → Custom domains → set production domain → add
   `totalcalculation.com` (and `www`, redirecting to apex per the sitting
   convention) — follow Cloudflare's activation prompts. The zone is already
   at Cloudflare, so CNAME records are one click and proxied automatically.
2. Keep the old Vercel deployment alive at
   `calculate-daily.vercel.app` for direct old links; Vercel domain stays
   attached there (internal alias only, not referenced by the new site).
3. Search Console: submit the new sitemap on the domain property.
4. AdSense: add the site to the existing approved account
   (`pub-8180440849942257`), which now matches `/ads.txt`.

## Before enabling ad units (not before launch)

- Rewrite `PrivacyPage.tsx` — today's copy truthfully says no ad scripts run;
  ad scripts change cookies, consent, and third-party sections.
- Add a cookie-consent/CMP banner offering accept/decline of non-essential
  cookies, like the studio site does.
- Only then place ad units, never inside calculator controls.
