# Calculate Daily growth loop status

**Updated: 2026-10-26.** Local implementation and verification only; no commit, deployment, domain, or DNS change.

## Product and editorial inventory

- Calculator catalog: **181 entries / 181 unique slugs and normalized display names** (178 indexable, 3 unreviewed/noindex in finance).
- The removed legacy calculator paths have eight permanent Vercel redirects to canonical tools.
  Local audits validate their targets and catalog exclusion; hosted HTTP 301 responses remain
  unverified.
- Tools added in the growth cycle:
  - **Graphing Calculator** (`/calculators/graphing-calculator`): browser-local expression parsing and graphing, ranges, pan/zoom, evaluation, coordinate display, and a value table.
  - **Z-Score Calculator** (`/calculators/z-score-calculator`): finite-input checks, positive standard-deviation validation, signed z-score, and a clear limit against inferring probabilities.
  - **Volume Calculator** (`/calculators/solid-volume-calculator`): cube, rectangular prism, sphere, cylinder, and cone with explicit formulas, same-unit dimensions, and overflow/input validation.
  - **Distinct Opportunity Batch (10 Calculators)**:
    - **Debt Payoff Calculator** (`/calculators/debt-payoff-calculator`): Snowball vs. Avalanche strategy comparison with interest paid, months to debt-free, and monthly amortization breakdown.
    - **Rental Yield Calculator** (`/calculators/rental-yield-calculator`): Gross vs. net rental yields accounting for purchase price, monthly rent, vacancy, and operating expenses.
    - **Commission Calculator** (`/calculators/commission-calculator`): Flat vs. tiered tier-split calculations with effective commission rate and net payout.
    - **Tile Calculator** (`/calculators/tile-calculator`): Box and tile coverage with user-configurable waste percentage and grout line spacing.
    - **Landscape Material Calculator** (`/calculators/landscape-material-calculator`): Mulch, gravel, topsoil, and stone cubic yards/tonnage estimation with density adjustments.
    - **Roofing Calculator** (`/calculators/roofing-calculator`): Roofing squares, pitch multiplier slope adjustments, and bundle counts with waste.
    - **Gas Mileage Calculator** (`/calculators/gas-mileage-calculator`): Fuel economy in MPG and L/100km with trip cost projection.
    - **Word Counter** (`/calculators/word-counter`): Word, character, sentence, paragraph counts, and reading/speaking time estimates with adjustable WPM.
    - **Unix Timestamp Converter** (`/calculators/unix-timestamp-converter`): Bidirectional conversion between Unix timestamps (seconds & milliseconds) and UTC / ISO 8601 datetimes with relative time offsets.
    - **Density Calculator** (`/calculators/density-calculator`): Mass, volume, and density solving with multi-unit support (kg/m³, g/cm³, lb/ft³) and material reference presets.
- The graphing calculator does not claim symbolic algebra, derivatives, integrals, implicit equations, inequalities, regression, or equation-solving support. The volume tool does not estimate construction materials or waste.
- The editorial backlog retains 25 mapped concepts and five unpublished drafts. Graphing, z-score, solid-volume, and all 10 opportunity tools have comprehensive on-page guides, step-by-step methodologies, and examples; no duplicate guide URLs were added.
- `docs/opportunity-register.csv` remains the living backlog. All 10 opportunity tools are logged with status `tested`.
- Ranked next opportunities from the actual research pack:
  1. **Confidence interval calculator** — query rows K0358-K0359, cluster MAT-11, opportunity O048 / OP-MAT-002.
     Global calculator intent, no matching current tool, moderate complexity, and a natural
     statistical-learning use case. Sourcing authoritative formulas and boundary tests required.
  2. **Sample size calculator** — K0360-K0361, cluster MAT-12, opportunity O049 / OP-MAT-003. Related intent
     with shared confidence-level and margin-of-error foundations; medium complexity and no current
     matching tool.
  3. **Triangle solver** — opportunity O058, cluster MAT-23. A distinct job from the existing
     right-triangle/Pythagorean tool; medium-high complexity because SSS/SAS/ASA ambiguity and
     triangle inequalities require explicit handling. Competitor evidence is recorded, but the
     query-to-row mapping and current coverage count should be rechecked before implementation.
  4. **General equation solver** — opportunity O059, cluster MAT-37. Potentially useful, but high
     complexity and a material risk of overclaiming symbolic support; build only after the supported
     equation classes are specified and tested.
  5. **Matrix calculator** — opportunity O069, cluster MAT-44. Medium-high implementation effort;
     dimension checks, singular-matrix behavior, and precision need coverage before it is ready.
- Recommended next batch: confidence intervals and sample size as a paired statistics feature, after
  selecting and independently validating authoritative methods and writing boundary tests. Keep
  both in research status until their assumptions and sources are settled.
- `docs/backlink-opportunities.csv` contains uncontacted hypotheses only. No backlink is claimed as acquired.

## Evidence and growth measurement

- Used the aligned `keyword-master-validated.csv`, `intent-clusters.csv`, and `tool-opportunities.csv`; the research pack records 789 candidate keyword rows and 293 clusters.
- These are research inventory counts, not demand estimates. No first-party Search Console data or verified search-volume, CPC, or keyword-difficulty metrics are available.
- The z-score, common-solid-volume, and 10 scale opportunity concepts were present in the local opportunity research. Their keyword and competitor records are hypotheses/evidence labels from that pack, not current Google rankings or demand forecasts.
- Public competitor evidence checked on 2026-10-24: Omni's Math page stated 687 calculators; Calculator.net stated about 200 sitewide; Inch Calculator stated 3,500+; CalculatorSoup described broad math/science coverage. These are competitor-published totals, not independent inventory counts or evidence of Calculate Daily demand.
- SpyFu's public overview displayed third-party estimates for omnicalculator.com: 1,588,952 organic keywords, 6,287,705 estimated monthly SEO clicks, and an estimated monthly change of -114,295. These estimates were observed on 2026-10-24; their methodology and freshness were not independently verified.
- Desmos' calculator/help pages were inaccessible in the browser; no feature details were claimed as independently verified or copied.
- The 2,000,000 first-month impression goal remains an unforecast stretch target. See `docs/growth-measurement-plan.md`.
- No SASSA-related Trends data was used.

## Verification

- `npm audit`: **PASS**, 0 vulnerabilities after compatible lockfile updates. The initial scan
  reported three high-severity advisories in Vite, undici, and source-map-js; the updated dependency
  tree resolves them without a major-version or manifest change.
- `npm run audit`: **PASS**, 181 tools and 10 guides; 395 audit checks, 0 failures. The audit verifies
  normalized display-name uniqueness (181 unique), valid slugs, content completeness, and all eight permanent redirects.
- `npm run test:calculators`: **PASS**, 32 tests covering expression parsing, graph ranges,
  z-score cases, compound-interest examples, common-solid volume formulas, loan EMIs, and all 10 distinct opportunity calculators.
- `npm run test:seo`: **PASS**, 6 route and production/preview origin tests.
- `npx tsc --noEmit`: **PASS**, no diagnostics.
- Production build with `SITE_URL=https://ci.calculatedaily.test` and `VERCEL_ENV=production`: **PASS**,
  209 prerendered routes and 200 unique sitemap URLs (178 indexable calculators + 4 indexable guides + home + hubs).
- Prerendered static assertion: **PASS**, 181 calculator pages with non-empty markup and no
  lazy-loading skeletons; the audit checked 210 HTML files, 200 sitemap URLs, canonicals, indexation,
  metadata, internal links, robots directives, and homepage WebSite JSON-LD. `404.html` has one
  noindex tag and no canonical.
- Local preview builds with `SITE_URL` set and unset: **PASS**, 209 routes and zero sitemap URLs in
  both cases. Pages are noindex and canonical-free; `robots.txt` disallows crawling.
- Production origin guard: **PASS**, a production build without `SITE_URL` failed with the expected required-variable message.
- Local browser examples: all 10 scale opportunity calculators render properly and produce deterministic outputs.
- Static `404.html` is noindex and has no canonical. A local Vite preview request for an unknown
  path returned HTTP 200 while rendering “Page Not Found”; hosted HTTP 404 and hosted redirects are
  not verified.
- Vite emits the existing non-blocking large-chunk warning: `core` ~642 kB and `index` ~677 kB
  minified.
- Full GitHub Actions, hosted Vercel preview, production-domain behavior, Search Console, analytics, and live search performance remain unverified.

## Readiness and next cycle

- **Production decision: NOT READY.** Local code checks pass; hosted CI, hosted 301/404 behavior, and
  production-domain configuration are unresolved. The owner has not configured Search Console.
  No deployment or domain changes were made.
- Continue the open-ended backlog with distinct, formula-tested opportunities; recheck current
  catalog and research evidence before each batch.
- Next implementation: research and source the confidence-interval/sample-size methods, then build
  the paired tools with formula tests and explicit statistical assumptions.
