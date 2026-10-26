# Go-Live Checklist

> **Status: PARTIALLY VERIFIED — NOT READY FOR PUBLIC LAUNCH.** Counts refreshed 2026-10-26 after
> Wave 11. The local audit passes for 290 calculators and 10 guides (616 checks, 616 pass); 141
> calculator tests, 8 SEO tests, TypeScript, and the local build (607 pages / 311 sitemap URLs) pass.
> The catalogue is 287 indexable and 3 unreviewed; 4 guides are indexable and 6 remain `noindex`.
> `npm audit` reports zero vulnerabilities.
> The last full build was local and therefore emitted `http://localhost:3000` canonicals; a
> production-origin build with `SITE_URL` must be re-run before launch and is unchecked below.
> Eight confirmed duplicate-intent URLs permanently redirect to canonical pages in Vercel
> configuration. Hosted CI, hosted redirects, and hosted unknown-route HTTP 404 remain unverified.
> Local Vite preview returns HTTP 200 for an unknown path; this does not establish Vercel behavior.
> 2026-10-26 push-prep fixes: stale `bun.lock` regenerated (CI frozen install would have failed),
> generated catalog index files git-ignored with a CI generation step (fresh-clone typecheck would
> have failed), and the global `X-Frame-Options` removed from `/embed/(.*)` (it would have blocked
> third-party embeds on Vercel). All three need the hosted run to confirm.

## Build & Code — run these, then tick

- [x] `bun install --frozen-lockfile` — `bun.lock` was regenerated with Bun 1.4.4 on 2026-10-26
      (it was stale: it had no entries for `echarts`, `jsdom`, or `@types/jsdom`, so the frozen install
      in CI would have failed) and `bun install --frozen-lockfile --dry-run` now exits 0. Local checks
      still run on npm; a real Bun install is exercised by CI.
- [x] `npm run audit` — **`Total tools: 290 | Guides: 10 | Audited: 616 | PASS: 616 | FAIL: 0`**; the
      repository script completed successfully (run 2026-10-26).
  - `OK [integrity] catalogue  290 unique slugs across 290 entries`
  - `OK [integrity] catalogue  290 unique normalized display names`
  - `OK [integrity] Vercel calculator redirects  8 permanent redirects target existing calculators`
  - `OK [edge-case] Credit Card Payoff  non-amortising payment returns a non-finite payoff, not a misleading 0`
  - `OK [edge-case] Work Hours  overnight 22:00-06:00 resolves to 8 hours`
  - `OK [edge-case] Loan Payment  0% APR resolves to amount / months, not NaN`
  - `OK [edge-case] Price per Unit ...`
  - `OK [edge-case] Break-Even ...`
  - `OK [edge-case] Fraction Calculator ...`
  - `OK [edge-case] Weekly Timesheet ...`
  - `OK [policy] catalogue  indexable 287 | reviewed-noindex 0 | unreviewed 3 of 290`
- [x] `npm run lint` — clean TypeScript check (`tsc --noEmit`)
- [x] `npm run test:calculators` — **141 passed, 0 failed**, including graph parsing, z-score,
      compound-interest, solid-volume edge cases, and 36 multi-input formula cases for the Wave 11
      config calculators.
- [x] `npm run test:seo` — **8 passed, 0 failed**, including exact-route parsing, the `/embed/:slug`
      cases, and production/preview origin safeguards.
- [x] `npm audit` — final result **0 vulnerabilities** after compatible lockfile updates for Vite,
      undici, and source-map-js.
- [x] `npx tsc --noEmit` — clean TypeScript check.
- [ ] Production-mode `npm run build` with `SITE_URL` — **must be re-run.** The last full build was
      local and emitted `http://localhost:3000` canonicals: 607 pages and 311 sitemap URLs, with the
      prerender SEO audit passing. That is not evidence for a production-origin build.
- [x] Production guard check — a production build without `SITE_URL` failed with the expected
      `SITE_URL is required for production builds` message (verified before Wave 11; the guard code is
      unchanged, but re-confirm on the launch candidate).
- [x] Catalogue count is **290 entries / 290 unique slugs and display names** (calculator audit)
- [x] Six guides remain intentionally noindex pending source/editorial review; four are indexable.
- [x] Browser inspection confirmed graphing, z-score, and volume pages render; at 390 px they had
      no horizontal overflow. Example z-score and cone-volume results matched the checked formulas.
- [x] `dist/sitemap.xml` has **no duplicate `<loc>`** and **287** `/calculators/` URLs; 311 URLs total
      (287 calculators, 4 guides, 12 categories, 8 static)
- [x] `dist/404.html` contains `robots: noindex` and **no** `rel="canonical"`
- [x] All 290 prerendered calculator pages contain non-empty calculator markup and no lazy-component loading skeleton
- [x] The catalog audit verifies eight permanent Vercel redirects point to existing canonical calculator slugs
- [x] `src/data/*.generated.ts` is git-ignored and CI generates it with `bun run catalog:index` before
      audit/typecheck. Verified that a checkout without those files fails `tsc --noEmit` (six
      `TS2307` errors), which is what the new CI step prevents.
- [x] `vercel.json` no longer sends `X-Frame-Options` on `/embed/(.*)` — `SAMEORIGIN` there would have
      blocked every third-party iframe of the embed widgets — and sends
      `Content-Security-Policy: frame-ancestors *` instead; all other paths keep `SAMEORIGIN`.
      The negative-lookahead path pattern was checked against path-to-regexp semantics locally.
      Hosted header behaviour remains unverified.
- [ ] Working tree committed on a branch (not `main`)

## Environment Variables (Vercel → Settings → Environment Variables)

| Variable | Environment | Purpose |
|---|---|---|
| `SITE_URL` | **Production (required)** | Canonical origin, e.g. `https://calculatedaily.com`. **The production build fails without it** — it will not fall back to a guessed host. |
| `SITE_URL` | Preview (optional) | Leave **unset** to use `https://$VERCEL_URL`; if set, it supplies the preview origin only. Preview builds remain noindex and emit no canonicals either way. |
| `VITE_GA4_ID` | All | GA4 measurement ID (`G-XXXXXXXXXX`) |
| `GOOGLE_SITE_VERIFICATION` | Production | Search Console token; injects the verification meta tag |

GA4 is optional. The site has no analytics-consent prompt; do not enable GA4 in jurisdictions
requiring prior consent until consent support is implemented.

How `scripts/prerender.ts` resolves the canonical origin:

1. `SITE_URL` set → used verbatim (must be absolute). If `VERCEL_ENV=preview`, the build still
   stays in **preview mode**: every page is `noindex`, no canonical is emitted, `robots.txt`
   disallows everything and `sitemap.xml` is empty.
2. `VERCEL_ENV=preview` and no `SITE_URL` → `https://$VERCEL_URL` with the same preview safeguards.
3. `VERCEL_ENV=production` and no `SITE_URL` → **build fails** with
   `SITE_URL is required for production builds`.
4. Local build → `http://localhost:3000` for inspection only.

- [ ] `SITE_URL` set for **Production** scope (and *not* set to the parked domain by accident)
- [ ] `VITE_GA4_ID` set
- [ ] `GOOGLE_SITE_VERIFICATION` set

## Preview deployment (test before production)

- [ ] Push the branch; let Vercel create a **Preview** deployment
- [x] Local preview builds with `SITE_URL` set and unset both report preview mode and `sitemap: 0 urls`
      (verified at the 196-route state; the mode logic is unchanged, but re-confirm on the launch candidate).
- [ ] Re-confirm preview mode on the current 607-page build: one `noindex` tag per page, no canonical,
      `robots.txt` has `Disallow: /`, and the sitemap is empty. Last confirmed at 196 routes.
- [x] Local browser: noindex remains after JavaScript loads on graph, z-score, and volume pages;
      each has no canonical. Hosted preview navigation is still unverified.
- [x] Local preview `robots.txt` is `Disallow: /`; hosted preview remains unverified.
- [ ] Confirm an unknown path on a **Vercel preview** returns HTTP **404** (not a 200 shell).
      Local Vite preview returned 200 for the unknown path; hosted behavior remains unverified.
- [ ] Confirm all eight legacy-route redirects return HTTP **301** to their canonical calculators.
- [ ] Confirm framing headers on the preview: `curl -I .../embed/<slug>` returns **no**
      `X-Frame-Options` and `Content-Security-Policy: frame-ancestors *`, while `curl -I .../` still
      returns `X-Frame-Options: SAMEORIGIN`. If Vercel rejects or ignores the negative-lookahead
      pattern, fall back to dropping `X-Frame-Options` entirely and keeping only a CSP.
- [ ] Exercise: `/calculators/credit-card-payoff-calculator` (0% APR, payment below interest),
      `/calculators/work-hours-calculator` (22:00→06:00), `/calculators/loan-payment-calculator` (0% APR)
- [ ] Exercise: `/calculators/price-per-unit-calculator`, `/calculators/break-even-calculator`,
      `/calculators/fraction-calculator`, and `/calculators/time-card-calculator`
- [ ] **Do not** point `calculatedaily.com` at the preview

## Deploy to production (manual, only after the preview passes)

- [ ] Merge the branch to `main`
- [ ] Vercel production build with `SITE_URL` set to the real domain
- [ ] Verify the build log shows the production origin (not a preview host)
- [ ] Verify live homepage view-source: canonical, `og:url`, GA4 snippet
- [ ] Verify a live unknown URL returns an HTTP **404** with the noindex page
- [ ] Verify `https://<domain>/sitemap.xml` lists 287 calculator URLs and no duplicates

## Post-launch SEO (manual)

- [ ] Google Search Console: verify domain → submit `https://<domain>/sitemap.xml`
- [ ] Request indexing for top pages (mortgage-calculator, percentage-calculator, bmi-calculator,
      compound-interest-calculator, tip-calculator)
- [ ] Bing Webmaster Tools: import from GSC

## Continuous integration

`.github/workflows/ci.yml` runs on every push and pull request:
`bun install --frozen-lockfile` → `bun run catalog:index` → `bun run audit` → `bun run lint` →
calculator and SEO tests → `bun run build` → prerendered calculator markup → sitemap uniqueness →
404 SEO assertions → canonical-host assertion → preview-mode builds with `SITE_URL` both unset and
set, which must remain unindexable → a **production-guard** build that must fail without `SITE_URL`.

- [ ] Workflow has run green on the branch at least once

## Expectation

Launch ≠ traffic. Do not forecast traffic from page counts. Continue tested batches from the living
opportunity register and use real Search Console data after launch to reprioritise. Do not publish
until the hosted CI and preview gates above pass.
