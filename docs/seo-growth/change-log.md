# Change Log — 2026-10-31 cycle

All paths are relative to the repository root. Every change below is in the working tree; nothing was committed.

## Content and tools

| ID | Change | Files |
|---|---|---|
| C1 | **New tool — Scientific Notation Calculator.** Converts decimal → scientific / engineering / E-notation with selectable mantissa precision, accepts `3.5e4` and `3.5 × 10^4` input, and multiplies / divides / adds / subtracts two numbers in scientific form. 6 FAQs, 4 formulas, 4 result explanations, 2 workflow links. | `src/components/calculators/ScientificNotationCalculator.tsx`, `src/lib/scientificNotation.ts`, `src/lib/scientificNotation.test.ts`, `src/data/catalog/math.ts` |
| C2 | **New tool — Significant Figures Calculator.** Counts sig figs from the text as written, flags ambiguous trailing zeros instead of guessing, rounds to n figures, warns when rounding adds unsupported precision, cites NIST SP 811. 5 FAQs. | `src/components/calculators/SignificantFiguresCalculator.tsx`, `src/lib/significantFigures.ts`, `src/lib/significantFigures.test.ts`, `src/data/catalog/math.ts` |
| C3 | **Scientific calculator fixed and rewritten.** Evaluator extracted and repaired (scientific-notation input, implicit multiplication, rejection of trailing input); EE key added; content expanded with 6 FAQs and internal links. Priority raised 0.8 → 0.9. | `src/lib/scientificExpression.ts`, `src/lib/scientificExpression.test.ts`, `src/components/calculators/ScientificCalculator.tsx`, `src/data/catalog/math.ts` |
| C4 | **New guide — how to use a scientific calculator.** Six sections covering what a scientific calculator is, DEG vs RAD, notation and the `e` key, logs/powers/roots, significant figures, and five common mistakes. 5 FAQs, 4 embedded tools. | `src/data/guides/individual/scientific-calculator.ts`, `src/data/guides/index.ts` |
| C5 | **Internal links into the cluster.** `exponent-root-calculator` and `rounding-calculator` link to the new tools; `molecular-weight-calculator` links to the sig-fig tool; `graphing-calculator` already linked the scientific calculator. `updatedAt` bumped on each edited entry. | `src/data/catalog/math.ts`, `src/data/catalog/science.ts` |

## Metadata and SEO infrastructure

| ID | Change | Files |
|---|---|---|
| M1 | **Meta description replacement fixed.** Tags are now addressed structurally instead of by literal single-line regex, and the build throws if a tag is missing. Before this, all 614 pages shipped the home page's description. | `scripts/prerender.ts` |
| M2 | **`seo.title` / `seo.description` overrides.** Optional fields on calculators and guides, honoured by both the client and the prerenderer so hydration cannot change the title. Three pages use them. | `src/types.ts`, `src/pages/CalculatorPage.tsx`, `src/pages/GuideDetailPage.tsx`, `scripts/prerender.ts` |
| M3 | **Prerender guard.** Refuses to run against an already-prerendered shell, which previously leaked the home page's canonical and markup into other pages. | `scripts/prerender.ts` |
| M4 | **Prerender audit rewritten without JSDOM.** Removed the duplicate per-sitemap-URL parse and replaced document parsing with targeted tag extraction. Runtime 600 s+ (failing at the heap limit) → ~6 s. | `scripts/audit-prerender.ts` |
| M5 | **New audit assertions.** (a) the shell description must not appear on any page except `/`; (b) no description may be shared by more than two pages; (c) `og:description` must equal `meta description`. | `scripts/audit-prerender.ts` |
| M6 | **Repeatable inventory.** New script writes `docs/seo-growth/calculator-inventory.csv` from the catalogue and prints indexability, duplicate-metadata, inbound-link and FAQ counts. | `scripts/seo-inventory.ts`, `package.json` (`seo:inventory`) |
| M7 | **New component IDs registered** in the audit's allow-list so the two new tools pass the custom-component check. | `scripts/audit-calculators.ts`, `src/components/calculators/CalculatorRenderer.tsx` |
| M8 | **Tests wired into CI.** The three new test files were added to `test:calculators`; the suite is now 187 tests, up from 176. | `package.json` |

## Regression caught and fixed during this cycle

Tightening the description regex exposed the same fragility in the robots-tag stripping (`\s+[^>]*\sname=` needs two whitespace runs, so the shell's `index, follow` tag survived beside a page's `noindex`). The audit failed the build with `Expected exactly one noindex tag` on 300 pages and it was fixed before release. Recorded because it shows the check does its job — it is not a defect in the shipped build.

## Documentation added

`docs/seo-growth/`: `README.md`, `baseline-audit.md`, `technical-seo-audit.md`, `keyword-clusters.md`, `competitor-analysis.md`, `content-gap-analysis.md`, `implementation-roadmap.md`, `change-log.md`, `qa-report.md`, `trends-opportunity-map.csv`, `calculator-inventory.csv` (generated), and `raw/` with both source exports preserved verbatim.

## Numbers before → after

| Measure | Before | After |
|---|---|---|
| Calculators | 292 | **294** |
| Indexable calculators | 292 | **294** |
| Guides (indexable) | 10 (4) | **11 (5)** |
| Sitemap URLs | 316 | **319** |
| Generated HTML files | 614 | **620** |
| Pages with a distinct meta description | 1 | **620 of 620** |
| `seo.title` overrides | 0 | 3 |
| Calculators with zero contextual inbound links | 69 | 65 |
| Test count (`test:calculators`) | 176 | 187 |
