# Technical SEO Audit

**Date:** 2026-10-31 · verified against a real `npm run build`, not assumed from source.

## 1. Canonical host and origins — PASS

- `CANONICAL_ORIGIN` is a code constant, `https://www.totalcalculation.com`, and `resolveSite()` **throws** if a production build resolves to anything else (`src/lib/siteConfig.ts`).
- The apex `https://totalcalculation.com` is normalised to the www host rather than canonicalised to a redirecting URL.
- Retired hosts (`calculate-daily.vercel.app`, `totalcalculator.vercel.app`, …) are rejected at build time and scanned for in output.
- Verified in the built output: `Retired-domain references in output: 0`.
- Every indexable page has exactly one `<link rel="canonical">` pointing at its own absolute URL, plus a matching `og:url`. The prerender audit asserts both.

## 2. Indexability — PASS

`indexable ⇔ seo.status === 'index' AND seo.reviewStatus === 'reviewed'` (`docs/indexation-policy.md`). Partial metadata fails closed: noindex, no canonical, absent from the sitemap.

Built output, verified:

| State | Count |
|---|---|
| Indexable pages | 319 |
| Excluded — embed shells (noindex by design) | 294 |
| Excluded — unreviewed guides | 6 |
| Pages carrying exactly one `robots` tag | 301 |
| Pages carrying no `robots` tag (indexable, default) | 319 |
| Pages carrying more than one `robots` tag | 0 |

The 294 `/embed/:slug` pages stay frameable and out of the index; `vercel.json` deliberately omits `X-Frame-Options` for them.

## 3. Titles and descriptions — FIXED THIS CYCLE

**Before:** 614 pages, 1 distinct meta description (the home page's — see `baseline-audit.md` D1).

**After:**

| Check | Result |
|---|---|
| Distinct `<meta name="description">` values | 620 of 620 pages |
| `og:description` equal to `meta description` | all pages |
| Duplicate description shared by >2 pages | none |
| Pages keeping the shell description | none except `/` |

Cause and fix are documented in `change-log.md` C1. Two guard assertions were added to `scripts/audit-prerender.ts` so the failure cannot return silently.

**Titles** are `${name} | Total Calculation` by default. Three pages now use a query-shaped `seo.title` while keeping their real H1:

| Page | Title | H1 |
|---|---|---|
| `/calculators/scientific-calculator` | Scientific Calculator Online — Trig, Logs, Fractions & Scientific Notation | Scientific Calculator |
| `/calculators/scientific-notation-calculator` | Scientific Notation Calculator — Converter & Arithmetic (a × 10ⁿ) | Scientific Notation Calculator |
| `/calculators/significant-figures-calculator` | Sig Fig Calculator — Count & Round Significant Figures | Significant Figures Calculator |

The client (`usePageMeta`) and the prerenderer read the same fields, so the title does not change after hydration.

## 4. Sitemap and robots — PASS

- Generated at build from the same indexability predicate; no hand-maintained file may exist in `public/` (the audit refuses to build if one does).
- 319 URLs, single `<urlset>`, no duplicates, no redirecting/apex/embed URLs.
- `<lastmod>` comes from real content dates only. 319 of 319 URLs carry one; 6 distinct values. Pages with no recorded date emit no `<lastmod>` rather than the build date.
- `robots.txt`: one `Disallow: /api/`, sitemap absolute and on the canonical host. Preview builds emit a full `Disallow: /` instead.

## 5. Prerendered content — PASS

Calculator pages ship the tool **and** the prose in the initial HTML. Verified on the new pages: the prerendered body contains the calculator inputs (`#sn-value`, `#sn-a`), the conversion output panel, all content cards, 10 FAQ headings and 12 internal calculator links before any JavaScript runs. The same is true of the scientific calculator and the new guide.

This matters for AEO/GEO: an answer engine that does not execute JavaScript still sees the definition, the formula, the worked example and the FAQ.

## 6. Structured data — PASS, no invented properties

| Page type | Types emitted |
|---|---|
| Home | `WebSite`, `Organization`, `ItemList` (featured) |
| Calculator directory | `ItemList`, `BreadcrumbList` |
| Calculator | `WebApplication` (price `0`), `FAQPage`, `BreadcrumbList` |
| Category | `ItemList`, `BreadcrumbList` |
| Guide | `Article`, `FAQPage`, `BreadcrumbList` |

No `aggregateRating`, `review`, fake price or author entity is emitted. FAQ markup mirrors the visible FAQ section — it is not a hidden keyword block. `SoftwareApplication` is deliberately **not** used: these are web tools, and `WebApplication` is the accurate type.

## 7. Internal linking — PARTIALLY FIXED

- Every calculator page renders related calculators, a "Continue the Workflow" block and breadcrumb links.
- **69 of 292 calculators had zero contextual inbound links** before this cycle (24%). The scientific-calculation cluster now has inbound links from `exponent-root-calculator`, `rounding-calculator`, `graphing-calculator` and `molecular-weight-calculator`, plus the new guide.
- The prerender audit checks that every internal anchor resolves to a prerendered file, and that internal URLs are in the preferred format (no trailing slash, no double slash). Both pass for 620 files.

## 8. Build integrity — PASS

`npm run build` chains: catalogue index → calculator/content audit → Vite build → prerender (619 pages + 404) → prerender SEO audit → domain-migration audit. Exit code 0 on 2026-10-31. Any failure stops the deploy.

## 9. Performance — NOT MEASURED

No Lighthouse/CrUX run was performed in this cycle, so no performance claim is made here. Known unmeasured risks from source review: `echarts` is a large dependency used by the chart components, and pages load a fonts stylesheet. Both are pre-existing; neither was changed. Measuring this needs a Lighthouse run against a deployed preview, which this workspace has no access to.

## 10. Accessibility and UX of the changed tools

The new calculators use labelled inputs (`<label for>`), `role="alert"` for validation messages, `inputMode` hints for mobile keyboards, and a visible focus order. The scientific calculator keeps its keyboard handler and DEG/RAD toggle. No automated accessibility audit was run.
