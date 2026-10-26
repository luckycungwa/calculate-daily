# Production Readiness Report

> **Counts are superseded.** This report records a 168-calculator / 196-route verification run. The
> current catalogue is 290 calculators (287 indexable, 3 unreviewed), with 141 calculator tests, 8 SEO
> tests, and a 607-page local build. See `docs/launch-checklist.md` for the current gate state.

**Decision: NOT READY FOR PUBLIC LAUNCH.** Local code, catalogue, formula, SEO, prerender, and
preview safeguards pass. Hosted CI, hosted Vercel redirects, and hosted unknown-route HTTP 404
behavior are not verified. No production domain was supplied or configured, and no deployment was
attempted.

## Gate results

| Gate | Status | Command or URL and observed result | Severity / action |
|---|---|---|---|
| Calculator and guide integrity | **PASS** | `npm run audit` — 168 calculators, 10 guides, 359 checks passed, 0 failed. Calculator slugs and normalized display names are unique; guide IDs/slugs and references are valid. | Continue running the audit for every content batch. |
| Duplicate-intent route cleanup | **PASS (local)** | Consolidated eight verified duplicate-intent URLs: mortgage payment, tip split, simple-interest v2, compound future value, emergency-fund target, water temperature, bedtime, and waist circumference. Their old catalog entries are removed and eight permanent Vercel redirects target existing canonical calculators. | Hosted 301 responses remain unverified; test all redirects on preview. |
| Redirect configuration integrity | **PASS (configuration audit)** | `npm run audit` validates that each Vercel redirect is permanent, its source is absent from the catalog, and its target exists. | This does not execute Vercel routing; confirm HTTP 301 on hosted preview. |
| Calculator formula tests | **PASS** | `npm run test:calculators` — 12 passed, 0 failed; includes graph parsing/ranges, z-scores, common solid volumes, and compound-interest examples. | Keep in CI and expand with each formula batch. |
| SEO and origin tests | **PASS** | `npm run test:seo` — 6 passed, 0 failed; exact-route parsing, strict production origin, and preview safeguards. | Keep in CI. |
| TypeScript | **PASS** | `npx tsc --noEmit` — no diagnostics. | None. |
| Dependency audit | **PASS (after fixes)** | `npm audit` initially found 3 high-severity advisories in Vite, undici, and source-map-js. `npm audit fix` updated compatible lockfile versions; the final `npm audit` reports 0 vulnerabilities. | Keep auditing dependencies; no major-version or manifest change was needed. |
| Production build and prerender | **PASS (reserved origin)** | `SITE_URL=https://ci.calculatedaily.test`, `VERCEL_ENV=production`, `npm run build` — 196 routes plus `404.html`; `audit-prerender` inspected 197 HTML files. | The `.test` host is for verification only, not a production domain. |
| Production sitemap and canonicals | **PASS (local output)** | `dist/sitemap.xml` has 190 unique URLs, including 168 calculator URLs. The prerender audit verified same-origin canonical URLs, noindex exclusions, generated pages, metadata, internal-link destinations, robots directives, and homepage WebSite JSON-LD. | Re-run in hosted CI using the owner's configured production origin. |
| Preview without `SITE_URL` | **PASS (local build)** | `VERCEL_ENV=preview`, `VERCEL_URL=ci-preview.vercel.app`, `SITE_URL` unset — 196 routes, empty sitemap, noindex pages, no canonicals, `robots.txt` disallows crawling. | Hosted preview remains required. |
| Preview with `SITE_URL` | **PASS (local build)** | `VERCEL_ENV=preview` with a reserved preview origin — same noindex, canonical-free, empty-sitemap safeguards. | Hosted preview remains required. |
| Production origin guard | **PASS (local negative check)** | Production build without `SITE_URL` fails with `SITE_URL is required for production builds`. | None. |
| Static 404 metadata | **PASS (local output)** | `dist/404.html` contains one `robots=noindex` tag and no canonical. | Does not prove the host serves an HTTP 404. |
| Unknown-route HTTP status | **FAIL locally / BLOCKED hosted** | Local Vite preview previously returned HTTP 200 for an unknown route while rendering “Page Not Found”; route parsing now rejects malformed/extra segments. | **High.** Verify an unknown URL on Vercel preview returns HTTP 404, not a 200 SPA shell. |
| Hosted legacy redirects | **BLOCKED** | Redirect configuration is present and audited, but no hosted response was available to inspect. | **High.** Verify all eight old paths return HTTP 301 to the canonical route. |
| Full GitHub Actions workflow | **BLOCKED** | The CI workflow includes audit, typecheck, calculator tests, SEO tests, build, prerender assertions, preview builds, and a production-origin guard; it has not run as hosted CI in this environment. | **High.** Require a green hosted workflow before release. |
| Guide indexation | **PASS with editorial holds** | Four reviewed guides are indexable; six finance/health guides remain `noindex` with `reviewStatus: 'pending'`, excluded from the sitemap. | Keep those guides noindex until credible sourcing and editorial review are complete. |
| Privacy and analytics claims | **PASS locally; owner decision pending** | GA4 is optional; page-view events omit query strings. Privacy copy describes Google Fonts, browser storage, and the currency-rate API. The site has no analytics-consent prompt. | Do not enable GA4 in jurisdictions requiring prior consent until consent support exists. |
| Bundle size | **PASS with warning** | Vite build completed; minified `core` is about 642 kB and `index` about 677 kB, above the 500 kB warning threshold. | **Medium.** Review chunking and measure real-user performance; not a build failure. |
| Domain, Search Console, and live measurement | **BLOCKED / owner action** | No production domain, analytics ID, or Search Console token was supplied. No DNS change, production deployment, or Search Console verification was attempted. | Configure the owner's chosen production origin and properties only after hosted preview gates pass. |

## Content and route findings

- Corrected compound-interest calculations/examples and added regression coverage.
- Removed eight duplicate-intent pages rather than leaving multiple indexable URLs for the same job.
  Vercel permanent redirects preserve their old paths; the canonical pages remain in the catalog and
  sitemap. Route redirect status must still be confirmed on a hosted preview.
- Calculator and guide integrity checks pass, including unique normalized calculator display names.
  This is not a semantic similarity detector; continue manual overlap review before adding routes.
- All 168 remaining calculators are explicitly reviewed/indexable. Six guides with unresolved
  finance/health sourcing remain pending and noindex.
- No claim is made about Google approval, indexing, search traffic, or the 2-million-impression
  stretch goal.

## Verification note

The first attempt to run both preview builds concurrently hit a Windows `EBUSY` error because both
builds write to `dist/`. The preview builds were rerun serially; both passed their prerender audits.
The dependency audit first reported three high-severity advisories; compatible patched releases were
applied to the lockfile and verified by a clean `npm audit`. The latest production build uses Vite
6.4.5 and passed. It retains the existing non-blocking chunk-size warning (`core` ~642 kB, `index`
~677 kB minified).

## Exact next actions

1. Run the GitHub Actions workflow on the branch and resolve any failure.
2. Publish a non-indexable Vercel preview. Verify JavaScript-loaded metadata, each legacy HTTP 301,
   an unknown-route HTTP 404, robots/sitemap behavior, calculator interactions, and console/network
   errors.
3. After preview passes, the owner can configure the production domain and `SITE_URL`, choose any
   analytics/consent setup, verify Search Console, and reassess the public-launch decision.
