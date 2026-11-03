# QA Report — 2026-10-31 cycle

Every result below was produced by running the command, not inferred. Commands were run from the repository root on 2026-10-31.

## 1. Checks and results

| Check | Command | Result |
|---|---|---|
| Type safety | `npx tsc --noEmit` | **PASS** — no errors |
| Catalogue + content audit | `npm run audit` | **PASS** — 294 tools, 11 guides, 625 checks, 0 failures |
| Calculator/unit tests | `npm run test:calculators` | **PASS** — 187 tests, 0 failures |
| Router/site/title tests | `npm run test:seo` | **PASS** — 15 tests, 0 failures |
| Production build | `npm run build` | **PASS** — exit 0 (index → audit → vite build → prerender → SEO audit → domain audit) |
| Prerender SEO audit | `npx tsx scripts/audit-prerender.ts` | **PASS** — 620 HTML files, 319 sitemap URLs |
| Domain migration audit | part of `npm run build` | **PASS (local build only)** — 0 retired-domain references, 8 single-hop redirects |

## 2. Calculator maths verification

The three tools touched in this cycle are covered by tests rather than by assertion:

**Scientific expression evaluator** (`src/lib/scientificExpression.test.ts`, 8 tests)

| Case | Expected | Covered |
|---|---|---|
| `2 + 3 * 4` | 14 | yes |
| `2^3^2` | 512 (right-associative) | yes |
| `-2^2` / `(-2)^2` | −4 / 4 | yes |
| `2.5e-3`, `1e-7 * 1e7` | 0.0025, 1 | yes |
| `2(3)`, `2(3+1)`, `2pi`, `3sin(30)` | 6, 8, 2π, 1.5 | yes |
| `sin(30)` DEG / `sin(pi/2)` RAD / `asin(0.5)` DEG | 0.5 / 1 / 30 | yes |
| `5!`, `50%`, `200 * 15%` | 120, 0.5, 30 | yes |
| `log(100)`, `ln(e)`, `sqrt(144)`, `cbrt(27)` | 2, 1, 12, 3 | yes |
| `2 3`, `2 +`, `sin(`, `(2+3`, `2+3)`, `foo(2)` | all rejected | yes |
| Division by zero | `Undefined`, not `Infinity` | yes |

**Scientific notation** (`src/lib/scientificNotation.test.ts`, 6 tests) — normalisation, mantissa carry at 10 (`99999` @3 s.f. → `1.00 × 10⁵`), engineering exponents in multiples of three, all four output formats, all five input formats, and arithmetic across magnitudes. Division by zero throws.

**Significant figures** (`src/lib/significantFigures.test.ts`, 5 tests) — `0.00450`=3, `1.230`=4, `6.022e23`=4, `4500.`=4, `10,500`=3, `1200`=2 **flagged ambiguous**, `0` documented as a special case, rounding including the carry to `10.0`, and rejection of invalid significant-figure counts.

Two real defects were caught by these tests during development and fixed in the library, not by loosening the tests:
- `4.5 × 10^-3` parsed via float multiplication gave `0.0045000000000000005`; it now composes an exponent string so the value is exact.
- `formatDecimal(0.0025)` printed `0.00250000000000000005`; exponent expansion is now done as string manipulation.

One initial **test expectation** was wrong (`9.995` at 3 s.f. is `9.99` in IEEE 754, because 9.995 is stored as 9.99499…). The test was corrected to use `9.996` for the carry case; the library was not changed to match a mistaken expectation.

## 3. Rendered-output verification

Checked directly in the built HTML, not in the source:

| Assertion | Result |
|---|---|
| `/calculators/scientific-notation-calculator.html` contains its calculator inputs (`#sn-value`, `#sn-a`) prerendered | yes |
| Same page contains content cards, 10 FAQ headings, 12 internal calculator links before JS | yes |
| Canonical on each new page equals its own URL | yes |
| `robots` tag count per page | 301 pages × 1, 319 × 0, **0 pages with duplicates** |
| Distinct `meta description` across all 620 files | **620** |
| `og:description` matches `meta description` | all pages |
| Pages still carrying the shell description | only `/` |
| New URLs present in `sitemap.xml` with `<lastmod>2026-10-31</lastmod>` | yes (319 URLs total) |

## 4. Behaviour confirmed by inspection, not by automated test

- Client-side metadata uses the same `seo.title` / `seo.description` fields as the prerenderer (`src/pages/CalculatorPage.tsx`, `src/pages/GuideDetailPage.tsx`), so the title does not change after hydration.
- The two new components are registered in `LAZY_COMPONENTS`, so they are code-split rather than added to the main bundle.
- Currency converter's live/offline rate disclosure was re-read and is correct (see `content-gap-analysis.md` §6).

## 5. Not tested — stated as limitations

| Gap | Why | What would cover it |
|---|---|---|
| Hosted behaviour (redirects, 404s, CDN headers) | no network access to the deployed host in this workspace | `npm run audit:domain:live` |
| Search Console / GA data, rankings, impressions, clicks | none supplied or accessible | connect GSC, re-run after 4–8 weeks |
| Core Web Vitals (LCP/INP/CLS) | no Lighthouse run | Lighthouse or PageSpeed against a deployed preview |
| Mobile device rendering | reviewed from responsive classes only | real-device pass |
| Automated accessibility audit | not run | axe/Lighthouse a11y on the three changed pages |
| Interactive behaviour of the new calculators in a browser | verified by unit tests + prerendered markup, not by clicking | manual or Playwright pass on the two new pages |
| Competitor coverage beyond calculator.net | only two pages were fetched | fetch Omni / Calculator Site / CalculateQuick tool pages |

No ranking, traffic or indexing outcome is claimed anywhere in this pack. The work makes the pages correct, crawlable and useful; whether they rank is decided by Google.
