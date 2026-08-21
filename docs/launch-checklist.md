# Go-Live Checklist

> Re-verify every item when testing production readiness. Last verified: 2026-08-21 (commit ee26c77)

## Build & Code
- [x] `npm run audit` — all calculators functional + content complete (115/115)
- [x] `npx tsc --noEmit` — clean
- [x] `npm run build` — vite build + prerender all pages + 404.html + robots.txt + sitemap.xml
- [x] Prerendered HTML contains full calculator markup (no loading skeletons)
- [x] Working tree committed

## Environment Variables (set in Vercel → Settings → Environment Variables)
- [ ] `SITE_URL` = deployment URL (use `*.vercel.app` initially; switch to `https://calculatedaily.com` once domain is registered — then rebuild)
- [ ] `VITE_GA4_ID` = GA4 measurement ID (`G-XXXXXXXXXX`) — enables analytics
- [ ] `GOOGLE_SITE_VERIFICATION` = Search Console token — injects verification meta on all pages

## Deploy (manual)
- [ ] Push repo to GitHub
- [ ] Import project in Vercel (framework: Vite; build `npm run build`; output `dist`)
- [ ] Set env vars above → redeploy
- [ ] Verify live homepage view-source: canonical, og:url, GA4 snippet present

## Post-Launch SEO (manual)
- [ ] Google Search Console: verify domain → submit `https://<domain>/sitemap.xml`
- [ ] Request indexing for top money pages (mortgage-calculator, percentage-calculator, bmi-calculator, compound-interest-calculator, tip-calculator…)
- [ ] Bing Webmaster Tools: import from GSC (2 clicks)
- [ ] Register `calculatedaily.com`, attach in Vercel, update `SITE_URL`, rebuild, re-submit sitemap

## Expectation
Launch ≠ traffic. Calculators are hyper-competitive; expect 3–6 months before meaningful organic traffic. Growth engine = executing roadmap batches in `docs/research-and-roadmap.md` (Batch 1 mortgage ecosystem done; next: percentage/shopping upgrades, health, date/time).
