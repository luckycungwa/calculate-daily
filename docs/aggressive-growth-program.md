# Aggressive Growth Program — keyword triage, waves, and release gates

> **Status:** Wave 1 shipped (6 tools, audited and prerendered). This document replaces "build every
> keyword on the list" with an ordered program: what already exists, what must not be duplicated,
> what to build next, and what must be true before a page is allowed into the sitemap.
>
> **Baseline at time of writing:** 187 calculators, 215 prerendered pages, 206 sitemap URLs, all
> functional audits, unit tests, TypeScript, and the prerender SEO audit passing.

---

## 1. The strategic correction

The competitor gap is not a page-count gap. OmniCalculator's ~3,900 pages and InchCalculator's
mechanical pairwise URLs are not a target to match; they are the reason those sites carry a large
tail of thin pages. Two things follow:

1. **One intent = one URL.** Building `/home-affordability-calculator` next to the existing
   `/mortgage-affordability-calculator` splits authority and creates an internal duplicate. Google
   does not reward the second page; it picks one and ignores the other.
2. **Depth beats coverage per page.** A page wins when it answers the query completely: the number,
   the formula, a worked example, the edge cases, the citation, and the next step in the workflow.

The keyword list you supplied contains **roughly 450 phrases**. Triaged against the catalogue, they
fall into four buckets, not one:

| Bucket | Share of list | Action |
|---|---|---|
| Already covered by an existing slug | ~35% | Optimise title/H1/intro, do **not** create a new page |
| Covered but under a different name | ~10% | Alias or redirect to the canonical page, or extend the existing page |
| True gap | ~50% | Build, in wave order |
| Not viable / policy risk | ~5% | Decline or gate (see §6) |

*(Shares are an author estimate from matching the supplied list against the 187-entry catalogue, not
keyword-tool volume data. Validate demand in Search Console before a wave is built.)*

### 1.1 Do not build these — they already exist

| Keyword in your list | Existing canonical URL |
|---|---|
| mortgage calculator | `/calculators/mortgage-calculator` |
| home affordability / mortgage affordability | `/calculators/mortgage-affordability-calculator` |
| loan calculator / loan payoff | `/calculators/loan-payment-calculator`, `/calculators/amortization-schedule-calculator` |
| compound interest, savings, investment return | `/calculators/compound-interest-calculator`, `/calculators/savings-goal-calculator`, `/calculators/roi-calculator` |
| debt payoff, debt-to-income, credit card payoff | already shipped |
| salary, hourly to salary | `/calculators/hourly-to-annual-salary-calculator`, `/calculators/salary-to-hourly-calculator` |
| rental yield, net worth, retirement, car loan | already shipped |
| square footage, room area, area converter | `/calculators/room-area-calculator`, `/calculators/area-converter` |
| percentage, percentage change/increase | `/calculators/percentage-calculator` |
| fraction calculator, simplify fractions | `/calculators/fraction-calculator` (simplification is built in) |
| GPA, grade, final exam grade | already shipped |
| mean/median/mode, standard deviation, z-score | already shipped |
| BMI, BMR, TDEE, calorie, macro, body fat, water, protein, pace, heart rate, 1RM, waist-to-height | already shipped |
| concrete, paint, flooring, tile, roofing, lumber | already shipped |
| time card, work hours, time zone, unix timestamp, date difference, age | already shipped |
| gas mileage, fuel cost, electricity cost, commute cost | already shipped |
| cups to grams, recipe scaling, coffee ratio, meal cost | already shipped |
| dog age, pet food cost | already shipped |
| price per unit, break-even, commission, rent vs buy | already shipped |

**Consequence:** roughly 150 of the phrases on the list need title/intro/FAQ tuning, not new routes.
That is a content operation, not a build operation, and it is cheaper and safer than new URLs.

### 1.2 Covered but mis-slugged — decide, do not duplicate

| Phrase | Situation | Decision |
|---|---|---|
| how much concrete do I need / bags of concrete | `concrete-calculator` exists but does not answer bag counts | **Extend** the existing page with a bags section (40/60/80 lb) |
| how much paint do I need | `paint-calculator` exists | **Extend** with coats + primer |
| how many tiles | `tile-calculator` exists | Already answers it; tune the title |
| how much flooring | `flooring-calculator` exists | Already answers it |
| gravel / mulch / topsoil | `landscape-material-calculator` covers the maths generically | **Build dedicated pages** — each material has a different density/bag model and a different query. Keep the generic page as the hub and cross-link. |
| cylinder / cone / sphere volume | `solid-volume-calculator` has a shape selector | **Build cylinder and cone only** (highest volume, distinct diagrams); sphere stays inside the hub |
| scientific notation converter | covered by `scientific-calculator` partially | **Build** the converter (different intent: convert, not evaluate) |

---

## 2. What shipped in Wave 1 (APS → ovulation)

The span you named is now a vertical slice, not a plan:

| Slug | Type | Why it wins |
|---|---|---|
| `aps-score-calculator` | custom | SA-specific admissions intent; NSC 7-point mapping, Life Orientation toggle, statutory pass check. Competitors are US/UK-centric. |
| `confidence-interval-calculator` | custom | Pairs with the existing z-score/SD tools; reports SE, ME, and critical value, not just the interval. |
| `sample-size-calculator` | custom | Cochran + finite population correction; the natural next step from the CI tool. |
| `due-date-calculator` | custom | Naegele with cycle-length adjustment, gestational age, trimester, progress, and conception reverse-date. |
| `ovulation-calculator` | custom | Luteal-phase model, six-day fertile window, three-cycle forecast. |
| `conception-calculator` | custom | Reverse dating from EDD or LMP, with the intercourse window rather than a single false-precision date. |

Shared infrastructure added in the same pass:

- `src/lib/academicAndHealthCalculations.ts` — pure functions, UTC-safe date arithmetic (a local-time
  `setDate` implementation drifts by a day west of UTC and across DST).
- 10 unit tests plus 3 catalogue-level edge-case regressions in `npm run audit`.
- Both clusters are code-split into two lazy chunks (13.1 kB and 15.2 kB gzipped ~3.9 kB each).
- Every page has `WebApplication` + `FAQPage` + `BreadcrumbList` JSON-LD and a cited source block.

---

## 3. Wave plan (ordered by intent value ÷ effort, not by category)

Each wave is a release unit: build, audit, test, prerender, then submit the new URLs in one batch.

### Wave 2 — Student + statistics completion (8 tools)

`pregnancy-week-calculator`, `variance-calculator`, `percentile-calculator`,
`margin-of-error-calculator`, `probability-calculator`, `normal-distribution-calculator`,
`triangle-calculator` (SSS/SAS/ASA/AAS), `fraction-to-decimal-calculator`.

Rationale: completes the two clusters that now have internal links pointing at missing tools. The
triangle solver is the one genuinely hard build (ambiguous SSA case must be surfaced, not hidden).

### Wave 3 — Construction depth (9 tools)

`roof-pitch-calculator`, `drywall-calculator`, `siding-calculator`, `gravel-calculator`,
`topsoil-calculator`, `mulch-calculator`, `fence-calculator`, `deck-calculator`,
`stair-calculator`.

Rationale: highest dwell time and the strongest workflow chain in the catalogue (area → material →
cost). Each needs a real diagram and a waste-factor model, not a text field.

### Wave 4 — Money, tax, and business (9 tools)

`take-home-pay-calculator`, `vat-calculator`, `income-tax-calculator`, `inflation-calculator`,
`capital-gains-tax-calculator`, `property-tax-calculator`, `roas-calculator`,
`npv-calculator`, `irr-calculator`.

Rationale: the finance catalogue is deep but stops at the payslip and the tax line. Regional tax
tools need a jurisdiction selector and dated rate tables — see §6.2.

### Wave 5 — Developer + technology (9 tools, shipped)

`ip-subnet-calculator`, `aspect-ratio-calculator`, `pixels-per-inch-calculator`,
`download-time-calculator`, `binary-to-decimal-calculator`, `password-entropy-calculator`,
`url-encoder-decoder`, `hex-to-rgb-converter`, `contrast-ratio-calculator`.

Deliberate deviations from the first draft: `cidr-calculator` folded into the subnet tool,
`ppi-calculator` became `pixels-per-inch-calculator` (the term people actually search),
`bandwidth-calculator` became `download-time-calculator` (the clearer intent), and
`binary-hex-converter` was consolidated into `binary-to-decimal-calculator` so one URL owns base
conversion instead of two competing pages.

### Wave 6 — Science + electrical (9 tools, shipped)

`molarity-calculator`, `molecular-weight-calculator`, `dilution-calculator`, `ph-calculator`,
`half-life-calculator`, `ohms-law-calculator`, `voltage-drop-calculator`, `wire-size-calculator`,
`resistor-color-code-calculator`.

`energy-consumption-calculator` was replaced by `half-life-calculator`: the existing
`electricity-cost-calculator` already owns the energy-consumption intent, so a second URL would
have split authority. The science cluster instead gained a decay tool with no overlap.

### Wave 7 — Food signature + automotive (8 tools, shipped)

`ingredient-weight-converter` (the density-aware signature tool), `butter-converter`,
`flour-converter`, `oven-temperature-converter`, `pizza-dough-calculator`,
`tire-size-calculator`, `car-depreciation-calculator`, `speed-distance-time-calculator`.

The four kitchen tools are custom components because unit switching and ingredient tables do not
fit the number-only config schema. The three calculation tools stay config-driven and therefore
inherit URL state. Densities are seeded from USDA and King Arthur references, not invented.

### Wave 8 — Sports, pets, outdoors, home (8 tools, shipped)

`race-time-predictor`, `golf-handicap-calculator`, `pet-calorie-calculator`,
`aquarium-volume-calculator`, `fertilizer-calculator`, `pond-volume-calculator`,
`salary-increase-calculator`, `moving-cost-calculator`.

Two substitutions from the first draft: `marathon-pace-calculator` would have duplicated the
existing `running-pace-calculator`, so it became `race-time-predictor` (Riegel formula — a
different question, not a second pace page). `cost-of-living-calculator` would have competed with
`inflation-calculator`, which already targets that term, so it became `salary-increase-calculator`.
The golf and pet tools use the published WHS and NRC equations rather than a proprietary score.

### Wave 9 — Gated signature tools (only what passes §6)

`ai-token-cost-calculator` shipped in pricing-agnostic form: the user supplies the input and output
price per million tokens, so the tool cannot go stale when a provider changes its rates. The
stamp-duty tool is **not** built: multi-jurisdiction legal review is not satisfied, and a
rate-agnostic version would be the existing percentage calculator with a new title. The ingredient
table is seeded with sourced densities in Wave 7 and expanded over time; each addition needs a
citation, not a guess.

**Programme total:** 187 → 248 tools. That is the deliberate ceiling for this phase: it covers
every head term on your list without manufacturing thin long-tail pages.

---

## 4. The four moats, ranked by cost to copy

| Moat | Status | Verdict |
|---|---|---|
| Clean, fast, ad-light UI | shipped | Keep. It is the wedge, not the moat — competitors can copy it. |
| Workflow chaining (`workflowLinks`) | shipped but shallow | **Highest ROI.** Every tool must hand off to the next; this is what makes a session 4 pages instead of 1. |
| Shareable URL state (`?params`) | not built | **Build once, platform-wide.** A shared amortisation schedule is a backlink; a screenshot is not. |
| Visuals (payoff curves, schedules, distributions) | partial (mortgage, debt, compound) | Build per cluster, only where the chart changes the decision. |

Recommendation: make **URL-encoded state** the next platform investment, before Wave 3. It is one
abstraction applied to every calculator, and it is the only moat on this list that produces
externally shareable artefacts.

---

## 5. Measurement (no invented numbers)

- **Search Console** is the source of truth: impressions, clicks, CTR, average position, indexed
  count, per cluster. Nothing in this repository should claim a traffic number that did not come
  from GSC, GA4, or the platform.
- Release in waves of 6–9 URLs, then wait for crawl before the next wave. A 70-page dump on a young
  domain is the pattern that gets a site classified as scaled content abuse.
- Per-wave scorecard: indexed ratio after 14 days, impressions per URL, CTR vs position, and
  scroll/engagement on the cluster hub. Kill or merge any page with zero impressions after 8 weeks
  rather than adding more pages beside it.
- Track AI referral traffic separately (ChatGPT/Perplexity referrers) and the queries that produce
  citations; that is the GEO loop, and it rewards citable formulas and sources, which is why every
  Wave 1 page carries them.

---

## 6. Release gates (the "do not break Search Console or Ads" rules)

### 6.1 Indexation

The existing review gate stays: `status: 'index'` **and** `reviewStatus: 'reviewed'` or the page is
`noindex` and absent from the sitemap. New pages ship reviewed, with a worked example that matches
the formula and an edge case that is actually rejected.

### 6.2 YMYL — health, fertility, tax, and money

- Health pages carry a dated source (ACOG, NICE, WHO) and an explicit "estimate, not medical
  advice" statement. No diagnosis, no treatment claim, no "safe/unsafe" verdict.
- Fertility pages must state that calendar methods are not contraception.
- Tax and pay pages need a jurisdiction selector, a rate-effective date, and a "rules change"
  caveat. Never hard-code a rate without a date.
- A clinician or tax professional should skim these clusters before paid amplification. That is a
  human gate, not something this repository can self-certify.

### 6.3 Google and Ads policy

- No doorway pages: each slug must have a distinct formula, example, and FAQ. Material variants
  (gravel vs mulch) qualify because density and bag coverage differ; "mortgage calculator 2026"
  does not.
- No scaled content abuse: waves, not dumps.
- No medical claims in ad copy; no "guaranteed approval", "cure", or "diagnose" language.
- Calculators are free and the offer is truthful (`price: 0`).

---

## 7. Immediate next actions

1. **Wave 1 verification** — confirm the six new URLs render and calculate in a browser, then submit
   them in GSC after the next deploy.
2. **Platform: URL state** — one `useShareableState` hook wired into calculators, starting with the
   mortgage and pregnancy clusters.
3. **Wave 2 build** — 8 tools, with `pregnancy-week-calculator` first: it is the missing middle step
   between the due-date and ovulation pages, which currently have nowhere to hand off to.
4. **Alias audit** — for the ~10 mis-slugged phrases in §1.2, add permanent redirects or extend the
   canonical page; do not add competing URLs.

---

## 8. Performance and metadata baseline (after route splitting)

Measured on a production build (`npm run build`), cold cache, desktop viewport, from the decoded
JavaScript the page actually requested. These are observations, not targets.

| Route | Decoded JS before | Decoded JS now | Notes |
|---|---:|---:|---|
| `/` | ~1,200 kB | 361 kB | 12 featured cards instead of the full catalogue |
| `/calculators` | ~1,200 kB | 462 kB | includes the 110 kB listing/search projection |
| `/calculators/mortgage-calculator` | ~1,200 kB | 610 kB | 139 kB finance content chunk |
| `/calculators/ovulation-calculator` | ~1,200 kB | 571 kB | |
| `/calculators/pizza-dough-calculator` | ~1,200 kB | 489 kB | |
| `/calculators/compound-interest-calculator` | ~1,200 kB | 597 kB | |
| `/categories/health` | ~1,200 kB | 461 kB | listing projection only |
| `/guides/complete-home-buying-guide` | ~1,200 kB | 686 kB | 4 embedded calculators; echarts deferred |

Before the split, every route shipped the whole catalogue, every page module, and the icon map as one
entry chunk (~1,012 kB) plus React (~188 kB).

What changed:

1. **Catalogue split by content area.** Each calculator page loads exactly one content chunk. The
   app shell loads a 9 kB slug-to-chunk map, not the 117 kB listing index.
2. **Route-level page chunks.** Every page is a dynamic import behind `src/lib/pageRegistry.ts`. The
   shell knows how to load a page, not what a page imports. Prerendering preloads all pages because
   `renderToStaticMarkup` cannot await Suspense; the browser preloads only the current route.
3. **Compact projections.** Directory cards, related-tool links, and the home page use generated
   projections (`catalogLinks`, `homeIndex`) instead of the full catalogue entries.
4. **Charts defer echarts.** echarts is ~642 kB. `EChart` now loads it when the chart is within 600 px
   of the viewport, so a guide with four embedded calculators does not download every chart module
   for charts the visitor never reaches. A chart already on screen still loads immediately.
5. **Build-consistent chunk hashes.** Lazy-import specifiers are written after a chunk hash is
   computed, so a shared chunk could keep its filename while pointing at a renamed lazy chunk. A
   per-build hash salt prevents a cached importer from requesting a chunk that no longer exists.

Titles are composed by one helper (`src/lib/pageTitle.ts`) used by both `usePageMeta` and the
prerenderer. Previously the static HTML said "... - Free Online Calculator" while the hydrated page
said "... | totalcalculation", splitting the title signal; the two now match on every route.

Remaining costs, stated plainly: `/calculators` still loads a 110 kB listing projection to support
search and category filtering; calculator pages carry their 35-140 kB content chunk (formula, prose,
FAQs); a guide that embeds four calculators reaches ~1.3 MB after the charts load, because four
interactive tools and echarts are genuinely on the page.

---

## 9. Wave 10 - practical toolkit (7 tools, shipped)

Shipped after the route-splitting and chart work, from the remaining unserved intents in
`docs/keyword-intelligence/revised-priority-backlog.csv` and the cross-check against the existing
catalogue. Each was checked for cannibalisation first: `fuel-cost-calculator` already prices fuel,
`recipe-scaling-calculator` already scales servings, and `ingredient-weight-converter` already owns
density-aware cooking conversion, so the new tools add a different decision rather than a second URL
for the same one.

| Tool | URL | What it adds that did not exist |
|---|---|---|
| Conversion Rate Calculator | `/calculators/conversion-rate-calculator` | Rate plus a Wilson 95% interval, cost per conversion, revenue per visitor, and traffic needed for a target |
| Dimensional Weight Calculator | `/calculators/dimensional-weight-calculator` | Billable parcel weight from carton volume and four carrier divisors (139, 166, 5000, 6000) |
| Freelance Rate Calculator | `/calculators/freelance-rate-calculator` | Rate from after-tax income, expenses, and realistic billable hours, not a 2,080-hour salary divide |
| EV Charging Cost Calculator | `/calculators/ev-charging-cost-calculator` | Home vs public session cost with charging losses, range added, and cost per mile or km |
| Trip Cost Calculator | `/calculators/trip-cost-calculator` | Whole-trip budget (fuel, tolls, parking, lodging, food) with per-person and per-distance split |
| BTU Calculator | `/calculators/btu-calculator` | Room cooling load from area, ceiling, insulation, sun, occupants, and kitchen, with common unit sizes |
| Insulation Calculator | `/calculators/insulation-calculator` | Additional R-value, installed thickness, package count, and cost, with cavity-depth warnings |

Every entry carries a worked example, at least five FAQs, formula definitions, result explanations,
workflow links, verified related slugs, and named sources (Wilson 1927 and GA4 key events; UPS,
FedEx, and USPS dimensional-weight pages; DOE Fuel Economy and EPA label data; IRS self-employment
and business-expense guidance; ASHRAE Fundamentals, ACCA Manual J, and DOE room-AC guidance; DOE
insulation guidance, the FTC R-Value Rule, and the DOE Insulation Fact Sheet). Sources name the
document and what it supports; no URL, reviewer, or credential was invented.

Arithmetic lives in `src/lib/practicalCalculations.ts` with 20 tests in
`src/lib/practicalCalculations.test.ts`, including rejected edge cases: zero visitors, conversions
above visitors, fractional conversions, zero carton dimensions, an empty or reversed EV charge
window, 100% tax, 52 weeks off, zero MPG, fractional travellers, a 5 ft ceiling, openings larger
than the wall, and unknown materials or carrier profiles.

### 9.1 Sources were stored but never shown

`ToolContent.sources` existed in the type and was populated on 74 catalogue entries, but
`ToolInfoSection` never rendered it, so the references were invisible in both the static HTML and
the hydrated page. A "Sources and References" card now renders them on all 74 pages, with a note
that a superseded standard or tariff is replaced by its current edition. This is a trust fix, not a
word-count fix: it makes the method auditable rather than decorative.

### 9.2 Verification for this wave

Run on the final build:

- `npx tsc --noEmit` - clean.
- `npm run audit` - passes; catalogue is 255 tools, 252 indexable, 3 pre-existing unreviewed tools.
- `npm run test:calculators` - 105 tests pass (85 before the wave, plus 20 new).
- `npm run test:seo` - 8 tests pass.
- `npm run build` - 285 pages, 276 sitemap URLs, prerender SEO audit passes.
- Browser checks on all seven pages: correct title and H1, calculator hydrated with default results,
  zero console errors. Interaction checks: trip unit switch resets to metric defaults ($812 for
  800 km), EV unit switch converts 3.5 mi/kWh to 5.63 km/kWh (253.35 km), conversions above
  visitors shows the validation message, and an existing R-40 against a target of R-38 reports
  "Already meets target" with zero packages.

Not claimed: search demand, rankings, traffic, or revenue for these pages. No Search Console export
was available, so the measurement plan in section 5 still governs.

---

## 10. Embeddable calculators (Priority 5, shipped)

The link-worthy asset is the calculator itself, not a badge or a link page: a host site can frame any
reviewed tool on its own page with a copy-paste snippet.

### 10.1 What shipped

| Piece | Where | Behaviour |
|---|---|---|
| Embed route | `/embed/:slug` in `src/lib/router.tsx`, page in `src/pages/EmbedPage.tsx` | Calculator only: no site header, footer, history UI, or page padding |
| Attribution | Rendered inside the embed document | "Free calculator by totalcalculation" plus a link to the canonical `/calculators/:slug` page |
| Sizing | `postMessage` from the embed to its parent | Reports content height on mount and on `ResizeObserver` changes, so the frame is not clipped |
| Snippet card | `src/components/common/EmbedCard.tsx` on every reviewed calculator page | Copyable iframe plus the height listener, a preview link, and the attribution condition |
| Prerendering | `scripts/prerender.ts` | 252 embed shells, one per indexable calculator; not in the sitemap |

The snippet's height listener validates `event.origin` against the site origin and matches the frame
by `contentWindow`, so it works with absolute or relative `src` values and cannot be driven by another
window. The embed posts its own height with a wildcard target because the content is public and the
parent origin is unknown.

### 10.2 Indexation policy

Embeds are deliberately `noindex`, carry no canonical, and are absent from the sitemap. They repeat
the canonical calculator and exist to be framed. Crawling is still allowed, so the `noindex` is
visible; blocking the path in `robots.txt` would hide that signal and risk a URL-only listing when a
host site links the frame. Unreviewed tools get no embed shell at all: 252 shells for 252 indexable
tools, and none for the three loans that remain out of the index.

`scripts/audit-prerender.ts` now enforces all of it: every sitemap calculator must have an embed
file, the shell must contain the attribution link, and no embed URL may enter the sitemap. The check
was tested negatively by renaming one shell, which failed the build with
`Indexable calculator has no prerendered embed shell: /embed/bmi-calculator`.

### 10.3 Verification

Run on the final build:

- `npx tsc --noEmit` - clean.
- `npm run audit` - passes; 255 tools, 252 indexable, 3 unreviewed.
- `npm run test:calculators` - 105 tests pass.
- `npm run test:seo` - 8 tests pass, including the new `/embed/:slug` parse cases and the malformed
  `/embed`, `/embed//x`, and `/embed/x/` rejections.
- `npm run build` - 537 pages (285 site pages plus 252 embed shells), 276 sitemap URLs, and the
  prerender audit passes over 538 HTML files.
- Direct load of `/embed/bmi-calculator`: title `BMI & Body Health (Embed) | totalcalculation`,
  `noindex` present, no canonical, no header or footer, two hydrated inputs, attribution link
  pointing at the canonical page.
- Host-page simulation: an iframe pointing at `/embed/trip-cost-calculator` posted a height of 1,239
  px, the snippet listener set `height="1239"`, and the frame rendered at that height with all 12
  inputs hydrated. Zero console errors.
- Snippet card on `/calculators/trip-cost-calculator`: heading present, code contains the absolute
  iframe `src`, the height listener, and the origin guard.

### 10.4 Honest limits

- No backlink, ranking, or traffic claim. The widget makes the tool easy to cite; whether sites embed
  it is not something this repository can measure, and no Search Console export was available.
- Prerendered HTML must not be cached immutably. Each shell references hashed chunks, so a long-lived
  cached embed document can point at deleted assets after a deploy. The same rule already applies to
  every prerendered page.
- The embed follows the visitor's saved theme on this origin. There is no `?theme=` override yet.
- There is no per-host allowlist or removal process. If a host strips the attribution by wrapping the
  frame, the remedy is a report to the site, not a technical block.
- Embedding is offered for reviewed tools only. An unreviewed tool has no shell until its content
  passes the same gate as the canonical page.

---

## 11. Wave 11 - breadth without duplicates (35 tools, shipped)

The first wave built after the embed work, and the first to deliberately remove the cap on tool
count. The constraint was not "find 35 keywords" but "find 35 decisions the catalogue could not
already answer". Every candidate was checked against the existing slug list, the keyword backlog, and
the nearest existing tool before it was written.

| Area | Tools | Distinct decision added |
|---|---|---|
| Construction and home (13) | Gutter, wallpaper, epoxy resin, sod, paver, rainwater harvesting, irrigation water, livestock feed, firewood, solar panel, generator size, rebar, post-hole concrete | Takeoffs that the area-only tools cannot do: linear eave runs and hangers, pattern-repeat roll counts, resin volume at a film thickness, roll and pallet counts, paver modules with joints, roof catchment yield, applied irrigation depth, dry-matter feed cost, cord and face-cord volume, array sizing from kWh, running versus surge watts, two-way rebar grids, and concrete net of the buried post |
| Finance (10) | Overtime, APR to APY, payback period, cap rate, cash-on-cash, house flip, credit utilization, severance, dividend yield, basis points | Pay and rate arithmetic the loan-only finance set lacked: overtime premium and blended rate, nominal versus effective rate, simple payback and target cash flow, unlevered property yield, levered cash yield, flip profit and the 70 percent rule, revolving utilization, severance weeks, current yield versus yield on cost, and basis-point dollar impact |
| Health (3) | LDL cholesterol, mean arterial pressure, pack years | Calculated clinical values rather than body-size ratios: Friedewald LDL with non-HDL and ratios, MAP and pulse pressure, and cumulative smoking exposure |
| Tech (3) | CSS clamp, REM to PX, video file size | Front-end and media production numbers: fluid-type slope and intercept, root-relative unit conversion, and export size from bitrate |
| Science (3) | Specific heat, ideal gas law, projectile motion | Textbook calculations with unit discipline: Q = mc delta T, PV = nRT with density, and no-drag trajectory components |
| Food (2) | Brine, cake pan conversion | Weight-based salinity and pan-volume scaling, neither of which the recipe tools covered |
| Fitness (1) | Swim pace | Pace per 100 m, speed, and 25 m splits, separate from running pace |

Each entry carries an intro, a method explanation, a worked example with the arithmetic shown, a
formula list, result-by-result explanations, at least five FAQs, workflow links, verified related
slugs, and named sources (IRC chapter 9 and SMACNA; ASTM F793 and the Wallcoverings Association;
ASTM D4414 and SSPC; Turfgrass Producers International and USDA NRCS; ICPI and ASTM C936; EPA
Rainwater Harvesting and Texas A&M AgriLife; EPA WaterSense and the Alliance for Water Efficiency;
National Academies beef-cattle requirements and USDA NASS; USDA Forest Service and EPA Burn Wise;
NREL PVWatts and DOE Solar; NFPA 70 Article 702 and PGMA; ACI 318 and CRSI; ACI 332 and the IRC;
DOL Fact Sheets 23 and 17; CFPB and SEC Investor.gov; DOE FEMP and PMI; the Appraisal Institute and
CCIM; IRS Publication 527; IRS Publication 523 and CFPB closing costs; CFPB credit guidance and
FICO; DOL severance and IRS Publication 15-A; SEC Investor.gov and CFA Institute; the Federal
Reserve H.15; NCEP ATP III and the AHA; the AHA and the Surviving Sepsis Campaign; USPSTF and CDC;
MDN and WCAG 2.2; MDN rem and WCAG 1.4.4; YouTube encoding guidance and Apple storage notes; NIST
and OpenStax; USDA FSIS and the FDA Food Code; King Arthur Baking and USDA FSIS; World Aquatics and
USA Swimming). No reviewer, credential, statistic, or URL was invented.

### 11.1 Why these are config calculators

All 35 are `kind: 'config'` with numeric fields only. That keeps them on the shared, code-split
`ConfigCalculator` path: no new component per tool, no bespoke state, and the same share, print,
export, history, and embed behaviour as the rest of the catalogue. The trade-off is explicit: a
tool that needs a select, a date, or a unit direction cannot be expressed as config and was not
added in this wave rather than being forced into a worse shape.

### 11.2 Formula verification

`npm run audit` only evaluates each config formula at its default inputs, which catches syntax
errors but not a formula wired to the wrong field or a wrong constant. `src/lib/catalogFormulas.test.ts`
therefore overrides every field with a distinct value and compares every result against a
hand-computed expectation, with a per-tool tolerance. It is wired into `npm run test:calculators`.

Four expected constants were wrong on the first run and were corrected after re-deriving them by
hand: the litre conversion for the rainwater result (the gallons figure, not the cubic feet, is
multiplied by 3.78541), the post-hole volume and cured weight (radius versus diameter in the
cylinder term), the APR first-year interest (compounding, not simple interest), and the ideal-gas
pressure (373.15 K and 8.314, not 373 K). The formulas themselves were correct; the test expectations
were not. That is the failure mode this test exists to expose.

### 11.3 Verification

Run on the final build:

- `npm run catalog:index` - 290 calculators, chunk map unchanged in shape.
- `npx tsc --noEmit` - clean.
- `npm run audit` - passes; 290 unique slugs, 287 indexable, 3 pre-existing unreviewed loan tools.
- `npm run test:calculators` - 141 tests pass (105 before the wave, plus 36 new multi-input cases).
- `npm run test:seo` - 8 tests pass.
- `npm run build` - 607 prerendered pages (290 calculator pages, 287 embed shells, guides, category
  and static pages), `404.html`, `robots.txt`, a 311-URL sitemap, and the prerender SEO audit passes.
- ASCII check over all 35 new entries - zero characters above U+007E.
- Browser checks at `http://localhost:3100` with a cache-busting `?v=` on each direct load:
  `/calculators/gutter-calculator` (5 inputs), `/calculators/cap-rate-calculator` (5),
  `/calculators/css-clamp-calculator` (5), `/calculators/brine-calculator` (2),
  `/calculators/swim-pace-calculator` (3) - correct title and H1, hydrated inputs, no console errors.
- Interaction check on `/calculators/cap-rate-calculator` with 620000 / 72000 / 21000 / 4 / 7.5:
  NOI $48,120, cap rate 7.76 percent, value at target cap $641,600, expense ratio 33.17 percent,
  matching the hand calculation. Embed card present.
- Interaction check on `/calculators/css-clamp-calculator` with 16 / 24 / 320 / 1200 / 768:
  20.07 px at the preview viewport, 0.91 vw slope, 13.09 px intercept, matching the hand calculation.
- Direct load of `/embed/gutter-calculator`: title `Gutter Calculator (Embed) | totalcalculation`,
  `noindex` present, no canonical, no header or footer, 5 hydrated inputs, attribution link to the
  canonical page.

Not claimed: search demand, rankings, traffic, or revenue for any of these pages. No Search Console
or analytics export was available, so section 5 still governs measurement, and the 35 tools are a
supply-side bet on long-tail intent, not evidence of demand.

### 11.4 What this wave does not fix

- Three pre-existing loan tools remain unreviewed and `noindex`. Adding volume elsewhere does not
  review them.
- The catalogue now has 290 entries and the `/calculators` listing still ships its full projection to
  support search and filtering. That is the next performance ceiling if the list keeps growing.
- Several new tools are US-centric in their sources (IRC, ACI, DOL, IRS, USDA, EPA). The arithmetic
  is jurisdiction-neutral; the regulatory references are not, and each page says so where it matters.
- `stamp-duty-calculator` is still not built. It needs a jurisdictional review, not a formula.

