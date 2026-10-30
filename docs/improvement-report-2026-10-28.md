# Improvement report — 28 October 2026

Scope: correctness of published figures, indexing/canonical behaviour, About-page
transparency, two new finance calculators, test coverage, and build reliability.
No calculators, routes, guides, or categories were removed, and the brand and
canonical origin are unchanged.

## Result at a glance

| Check | Before this session | After | Evidence |
|---|---|---|---|
| Calculators in catalogue | 290 | **292** | `npm run catalog:index` → `catalog index: 292 calculators` |
| Catalogue audit | pass | **pass** | `npm run audit` → `Calculator and guide integrity checks passed.` |
| Indexable / reviewed | 289 index / 3 pending | **292 index, 0 pending** | `[policy] indexable 292 \| reviewed-noindex 0 \| unreviewed 0 of 292` |
| Prerendered pages | 607 | **614** | `Prerendered 614 pages + 404.html + robots.txt + sitemap.xml` |
| Sitemap URLs | 311 | **316** | `sitemap: 316 urls` |
| HTML files audited | 608 | **615** | `Prerender SEO audit passed: 615 HTML files` |
| Calculator/lib tests | 141 | **164** | `npm test` → `pass 164` |
| SEO/router tests | 8 | **8** | `npm test` → `pass 8` |
| Type check | pass | **pass** | `npx tsc --noEmit` (no output) |
| Production build | pass | **pass, exit 0** | `SITE_URL=https://calculate-daily.vercel.app npm run build` |

Page-count reconciliation: +2 calculators add a page and an embed shell each
(+4 HTML), and the 3 finance pages flipped from `noindex` to indexable each gain
the embed shell that indexable calculators require (+3 HTML). Sitemap gains those
2 calculator pages and the 3 newly indexable pages (+5 URLs). The numbers agree.

## What changed

### 1. South African fuel prices (stale data → dated, sourced data)

- New `src/data/fuelPrices.ts` holds the DMPR schedule effective **7 October
  2026** (inland 95 R30.25, 93 R29.88, diesel 50ppm R32.80, 500ppm R31.95;
  coastal 95 R29.38, 93 R29.01, 50ppm R31.93, 500ppm R31.08), the verification
  date, the pending 4 November 2026 adjustment, both source links, and the
  province → pricing-region mapping.
- `SaFuelCalculator` reads that module, shows effective and verified dates with
  the source link, labels diesel as a **wholesale baseline** (it is not a
  regulated pump price), validates distance and consumption, and announces
  errors with `aria-live`.
- Catalogue copy, worked example, and four FAQs were rewritten around the new
  figures. Example checked by hand: 568 km × 7.5 L/100 km × R30.25 = R1,288.65.
- **Not published:** the 4 November 2026 prices. They did not exist at the time
  of writing, so the page shows the adjustment as scheduled, not as a number.

### 2. Mortgage example vs. calculator (page contradicted itself)

For $400,000 at 6.5% over 30 years with $80,000 down, $4,000/yr tax and
$1,200/yr insurance, the page now shows **$2,022.62** principal and interest and
**$2,455.95** total monthly payment, matching the component's output. The
catalogue entry also switched from `R` to `$` for a US-dollar scenario.

While testing, a real defect surfaced in `buildAmortization`: biweekly mode
halved the payment but kept monthly rows, which stretched the term instead of
shortening it. It now models biweekly as 13/12 of the monthly payment over the
same row count, and the test suite pins both behaviours.

### 3. Indexing and canonical behaviour

- Three complete but `noindex`/`pending` finance calculators
  (`car-loan-calculator`, `personal-loan-emi-calculator`,
  `gold-loan-emi-calculator`) were marked `index`/`reviewed`. They were not thin
  pages — they had full content and were being excluded by omission.
- `src/lib/seo.ts` no longer derives the canonical origin from
  `window.location.origin`; it preserves the origin the page was prerendered
  with, so a preview host cannot rewrite canonicals client-side.
- `scripts/audit-prerender.ts` now also validates `og:url` against the sitemap
  URL and fails if a stale `calculatedaily.com` origin survives in a canonical,
  `og:url`, or sitemap entry.
- `.env.example` documents `SITE_URL=https://calculate-daily.vercel.app`, the
  origin that actually serves the site today.

### 4. Two new calculators (added value, not keyword pages)

- **Customer Acquisition Cost** — total sales and marketing spend ÷ new customers
  acquired, with channel-level input and a worked example.
- **Customer Lifetime Value** — ARPA × gross margin × average customer lifetime,
  plus the CAC:LTV ratio.

Both are full catalogue entries (intro, method, example, ≥3 FAQs, related links,
workflow links, SEO metadata) and both have formula cases in
`catalogFormulas.test.ts`.

### 5. About page (replaced generic copy with verifiable specifics)

`/about` now covers: what the site offers and its scope, who publishes it (and
explicitly that a registered entity is **not** published), how results are
calculated with named formulas, how the work is tested (catalogue audit, formula
tests, type check, prerender audit), where external data comes from, how to
report an error, and limitations. Claims are bounded — e.g. it states that test
coverage is uneven and that a passing build does not mean every number has been
independently reviewed.

The unsupported "Average response time: 1-3 business days" promise on `/contact`
was replaced with a statement that messages are read but no response time is
guaranteed.

### 6. Build reliability (root cause, not retry)

The production build was crashing **after** printing a successful prerender
audit, with `FATAL ERROR: Ineffective mark-compacts near heap limit` (~4 GB).
Cause: `audit-prerender.ts` created one JSDOM instance per page (615 pages plus
316 sitemap pages plus embed shells and 404) and never closed their windows, so
thousands of retained DOMs exhausted the heap during teardown. Each window is
now closed after use; the audit passes and the build exits 0 instead of a
misleading exit 1 on an otherwise complete build.

## Verified vs. unverified

Verified in this session:

- Official fuel figures and effective date against the DMPR schedule page, plus a
  secondary listing; encoded in tests.
- Mortgage payment arithmetic recomputed from the amortisation formula.
- Every page in `dist/` has exactly one canonical, a matching `og:url`, a
  sitemap entry when indexable, and no `noindex` on indexed pages (audit output).
- Audit, 172 tests, type check, and a full production build all pass.
- Rendered output checked directly: `dist/calculators/south-africa-fuel-calculator.html`
  contains `30.25`, `7 October 2026`, `4 November 2026`, `wholesale`;
  `dist/calculators/mortgage-calculator.html` contains `2,022.62` and `2,455.95`.

Not verified / open:

- 4 November 2026 fuel prices — not published yet.
- Publisher legal identity, address, named reviewer credentials, support SLA,
  contact-mailbox ownership, custom-domain decision, analytics/consent, and legal
  review of Terms/Privacy. These are tracked in
  [`docs/owner-supplied-info.md`](./owner-supplied-info.md); none were invented.
- Search-engine indexing is not something a local build can prove; the build
  proves the markup that indexing depends on.

## Reproduce

```powershell
npm run catalog:index
npm run audit
npm test
npx tsc --noEmit
$env:SITE_URL = "https://calculate-daily.vercel.app"
$env:VERCEL_ENV = "production"
npm run build
```

## Files touched

Modified: `.env.example`, `package.json`, `scripts/audit-prerender.ts`,
`src/components/AboutSection.tsx`, `src/components/calculators/SaFuelCalculator.tsx`,
`src/data/catalog/finance.ts`, `src/data/catalog/other.ts`,
`src/lib/catalogFormulas.test.ts`, `src/lib/mortgage.ts`, `src/lib/seo.ts`,
`src/pages/ContactPage.tsx`.

Added: `src/data/fuelPrices.ts`, `src/lib/fuelPrices.test.ts`,
`src/lib/mortgage.test.ts`, `docs/owner-supplied-info.md`, this report.

No commits were made. Generated `src/data/*.generated.ts` files remain
git-ignored and are rebuilt by `npm run catalog:index`.
