# Interactive results audit — Phase 1

Goal: make totalcalculation.com feel like an interactive calculation platform.
This document is the audit the expansion program is built on. Sources: the
generated catalogue plus `docs/keyword-intelligence/tool-inventory.csv`
(292 rows, one per live tool), the component tree, the test suite, and the
Lighthouse runs recorded in `docs/totalcalculation-rebrand.md`.

## 1. What exists today

### Inventory

| Surface | Count | Detail |
|---|---|---|
| Calculators / converters | 292 | all indexable, `reviewStatus: 'reviewed'`, 0 unreviewed |
| Categories | 12 | math, finance, health, conversion, construction, time, tech, science, food&auto, sports&home, misc, daily |
| Guides | 10 | 4 indexable, 6 noindex |
| Prerendered pages | 614 | incl. 292 `/embed/:slug` widgets (noindex, must stay frameable) |
| Sitemap URLs | 316 | |

### Implementation kinds (from `tool-inventory.csv`)

- **custom** — bespoke React components in `src/components/calculators/`, registered in `CalculatorRenderer.tsx` `LAZY_COMPONENTS`. These own their formulas, state and results. ~37 component files cover the flagship tools.
- **config** — data-driven calculators rendered from catalog config (no bespoke component).
- **converter** — single-pair unit converters (~31 flagged in prior audits as near-identical templates).
- **content** — catalog-rendered pages (intro, how-it-works, example, ≥3 FAQs) with no widget.

### Result experience as it stands

- Most **custom** calculators already recompute live on input change — the platform is
  de-facto interactive; what is missing is the *shape* of the interaction (breakdowns,
  scenarios, gauges), not event wiring.
- Chart engine: **echarts**, wrapped by `src/components/charts/EChart.tsx` (+ `charts/index.tsx`),
  lazy-loaded per consumer. Current consumers: `MortgageCalculator` (real amortization
  series + payment-component stack) and `CompoundInterestCalculator` (verified yearly
  growth series backed by `compoundInterestYearlySeries()` and two regression tests that
  tie chart data to the engine to 1e-9).
- Gauge: `common/DialGauge.tsx` (SVG dial, BMI) and a vendored accessible gauge kit in
  `src/components/gauge/control.tsx` — both already wired to computed values.
- Interactive comparison: `common/ScenarioCompare.tsx` (side-by-side recalculation).
- Export/share: `common/ExportModal.tsx`, `ShareButton`, `CalculationHistoryModal`.
- Formula integrity guardrail to copy: chart data must derive from the same functions as
  the headline number (the compound-interest tests are the pattern).

### Dependencies and constraints

- No chart library beyond echarts; bundle currently splits echarts per consumer.
- Tailwind v4, React 18/19 + Vite, tokens per the Total Calculation design system
  (`docs/totalcalculation-rebrand.md`): indigo interactive, emerald positive/brand only,
  zinc neutrals, `--primary-on-dark` / `--brand-on-dark` for always-dark panels.
- Accessibility baseline: Lighthouse 1.0 (best-practices/SEO) on the homepage and the
  five checked tool pages in light mode; dark-mode color-contrast sampling in Lighthouse
  is unreliable with our `oklch` tokens (computed values verified manually instead).
- SEO baseline: full prerender, per-page canonical, JSON-LD (publisher = 44Tag Studios),
  SEO prerender audit in the build.

## 2. Classification rubric

Applied per tool, never forced:

1. **Basic result** — a number is genuinely sufficient (simple converters, lookups).
2. **Breakdown** — a meaningful distribution or cost split (payment → principal/interest
   + taxes; unit price → per-litre/per-piece splits).
3. **Trend** — a time-based projection (compound growth, amortisation, savings reach,
   usage over time).
4. **Comparison** — two or more options scored (term vs term; product per-unit;
   rent vs buy; tariffs).
5. **Gauge** — a defensible percentage/range with clear thresholds (BMI band, fuel
   consumption efficiency band, battery SoC, % of income spent).
6. **Planner** — assumption controls that rerun the engine directly (rate, term, tariff,
   distance), sharing state with the main result.

Rules adopted: nothing becomes a chart unless the chart answers a question the number
cannot; every visual derives from the calculation engine (no fabricated data, extend the
compound-interest regression-test pattern); every chart gets an accessible text summary
and, where tabular, use the existing table components; heavy visuals stay lazy-loaded and
client-only so prerendered HTML keeps its text-first SEO content.

## 3. Per-category classification

(Full row-level classification lives in `tool-inventory.csv`; the `action` column carries
forward. Batch lists in §6.)

| Category | Dominant kinds | Processed tiers | Representative opportunities |
|---|---|---|---|
| finance | custom | Breakdown, Trend, Comparison, Planner | mortgage (payment split + amortisation + term/rate planner), affordability, refinancing, rent-vs-buy, retirement |
| health | custom/config | Gauge, Breakdown, Planner | BMI (gauge + band context, no diagnosis), calorie/maintenance split |
| daily | custom/content | Breakdown, Planner | **South Africa fuel calculator** (trip planner, per-litre breakdown, route comparison) — flagged `unreviewed`; review first |
| math | mixed | Planner (scenarios), Basic | percentage (reverse modes + scenario strip); most stay Basic |
| science/tech | config/content | Basic, Breakdown | keep light; pH/contrast tools already contextual |
| conversion | config | Basic | deliberately Basic; group pages may get tiny comparison chips only |
| construction, time, food&auto, sports&home, misc | mixed | Breakdown, Planner | paint/roofing aggregates, take-home pay split, food nutrition spread |

Existing equivalents already cover part of the SA expansion: `Electricity Cost Calculator`
(misc, reviewed — note says "add appliance library and LED savings") and the regional
`South Africa Fuel Calculator` (daily). New-prepaid/solar/battery/inverter/water tools
must be checked against those + `tool-inventory.csv` `dup_group`s before building.

## 4. Reference batch — three fully upgraded calculators (Phase 3–4 first target)

Chosen to exercise the whole shared system across three categories; upgrades stay inside
existing components (no route or formula changes):

1. **mortgage-calculator** (finance) — headline answer + supporting metrics already exist;
   add interactive *Planner* strip (rate/term/deposit controls rerunning the engine),
   *Comparison* of 2–3 term/rate scenarios, and keep the existing real amortisation line
   chart as the *Trend*. Reuses `ScenarioCompare` patterns.
2. **bmi-calculator** (health) — `DialGauge` already present; formalise as `ResultGauge`,
   add band-context explanation and `CalculationAssumptions` (WHO thresholds shown as
   data, not a diagnosis), mobile-first answer hierarchy.
3. **south-africa-fuel-calculator** (daily) — review (it is the one `unreviewed` tag),
   then trip-cost *Planner* (distance/consumption/price against the monthly price table)
   and *Breakdown* (fuel cost vs total trip cost), all fed by the existing
   `FUEL_PRICE_DATA` table with its effective-date label rather than invented rates.

`compound-interest-calculator` (finance) is already the chart-integrity reference; it gets
the milestone label polish in the shared-system pass rather than a claim of "new upgrade".

## 5. EvilCharts / Gauge UI compatibility summary (Phase 2 gate)

Checked before installing anything — decision point recorded, **nothing installed yet**:

- **EvilCharts** is a copy-in component library of shadcn-style chart wrappers on
  **Recharts** (React + Tailwind), MIT-licensed. Architecture compatibility: high (React,
  Tailwind v4, copy-paste components). Cost: introduces a second chart engine beside the
  existing echarts wrapper — the exact duplication earlier work rejected. Bundle-safety
  option: the `Result*` components speak our API (series, source-of-truth function,
  a11y table) and internally render via **echarts while reusing EvilCharts' interaction
  and tooltip patterns**; Adopting the ReCharts engine wholesale is only justified if
  echarts cannot deliver the required interactions (tooltips, stacked/area/bar, hover
  readouts — it can). Resolution needed from the owner: "EvilCharts as visual/interaction
  pattern source, rendered on echarts" (recommended) vs "second engine".
- **Gauge UI** (gauge-ui.dev): component copies, MIT, React + Tailwind; a gauge kit is
  **already vendored** at `src/components/gauge/control.tsx`. Verify it capably covers
  band/threshold displays, then extend rather than duplicate; `ResultGauge` wraps it.
- Both options keep SSR/prerender safe: prerendered HTML carries the text summary; charts
  hydrate client-side (pattern already proven by the two echarts consumers).

## 6. Prioritised batch list (Phase 4 onward, after the reference batch)

Batch A (finance planners, highest value): mortgage (reference), compound interest,
'affordability', 'refinancing', 'loan', 'prepayment/amortisation', 'rent vs buy',
'retirement'.
Batch B (SA energies — expansion, check duplicates first): prepaid-electricity units,
appliance running-cost (extends `Electricity Cost Calculator`), bill estimator,
tariff comparison (clearly-entered assumptions, never "official"), solar sizing + payback,
battery capacity + inverter runtime + load-shedding planner, generator cost; water:
consumption, tank sizing, cost estimator (verify against `tool-inventory.csv`; start from
`OurPower.co.za` patterns, publish verified-data labels with dates).
Batch C (health/bodily + daily): target-hydration, calorie split, macro distribution;
SA fuel trip planner (reference), quick converters stay Basic.
Batch D (long tail of converters/pages): tiny context chips only; nothing forced.

## 7. Risks / blockers (carried into the report)

- Embedded widgets must remain frameable (env `/embed/*` header rule; verify the CF Pages
  `frame-ancestors` ordering with curl — see `docs/cloudflare-pages-deploy.md`).
- Dark-mode Lighthouse color sampling unreliable with oklch — verify contrast manually.
- The full 292-row classification is carried by `tool-inventory.csv`'s existing data; the
  tier column can be appended mechanically per batch without re-auditing by hand.
- Deploy blockers (unchanged): domain not attached to CF Pages, GA4/GSC env unset,
  privacy policy + consent before any ad unit; Category Pages preview checks pending.
