# Calculate Daily — Keyword Intelligence & Calculator Expansion

**Research run: October 2026. Read-only.** No production code, route, or catalog entry was changed.
Everything below is a proposal until it is accepted into `docs/research-and-roadmap.md`.

> **CORRECTED — read [`validation-findings.md`](./validation-findings.md) alongside this file.**
> A later validation pass found that several coverage claims in this report (§3, §5, §6, §8) were
> overstated: intents described here as "zero coverage" or "whitespace" are in fact served by 1–3
> competitors. The root cause was case-sensitive keyword searching that produced false negatives.
> The corrections, the re-scored priorities and the revised build order are recorded in
> [`validation-findings.md`](./validation-findings.md) and
> [`revised-priority-backlog.csv`](./revised-priority-backlog.csv). This file is kept unchanged as
> the historical record of the first pass.

Supporting data: [`tool-inventory.csv`](./tool-inventory.csv) · [`keyword-master.csv`](./keyword-master.csv) ·
[`intent-clusters.csv`](./intent-clusters.csv) · [`competitor-gaps.csv`](./competitor-gaps.csv) ·
[`tool-opportunities.csv`](./tool-opportunities.csv) · [`priority-backlog.csv`](./priority-backlog.csv) ·
[`decisions-log.csv`](./decisions-log.csv) · [`methodology.md`](./methodology.md) · [`raw/`](./raw/)

---

## The short version

1. **The inventory is 170 tools — the brief's number was right** — but 113 of the 170 (66%) are
   live in the sitemap without ever being signed off, because a missing `seo` block defaults to
   *indexable*. Expansion is not the most urgent problem; **indexation hygiene is.**
2. **Eight URLs are genuine duplicates**, including two pages both titled "Simple Interest
   Calculator" and three tip pages. This is our own cannibalisation, not a competitor's.
3. **No Google Trends data for this site exists.** The 23 export files in the assets folder are all
   South African SASSA grant queries from a different project. I excluded them rather than
   manufacture demand evidence, so **no volume, CPC, or difficulty number appears anywhere in this
   pack** — they are marked `unknown` with instructions to obtain them.
4. **The competitive field is far bigger than the old roadmap assumed** — 204 + 187 + 417 + 420 +
   711 + ~2,270 tools across seven sites — but nearly all of that growth is *breadth*: pairwise
   converters, clinical scoring instruments, machining metrology. Almost nobody builds **workflow,
   comparison, or regional intelligence.** That remains the defensible position.
5. **The highest-value opportunities are unglamorous**: price-per-unit comparison, break-even,
   rental yield, ROAS/conversion-rate, time card, and the intents we simply don't serve yet
   (debt payoff, car loan, pregnancy due date, tile/roofing/gravel/mulch, fractions).

---

## 1. Verified current inventory

Extracted from `src/data/catalog/*.ts`, reconciled entry by entry — not inherited from the brief.

| Category | Tools | | Category | Tools |
|---|---|---|---|---|
| Unit Conversion | 40 | | Construction & DIY | 6 |
| Finance & Money | 33 | | Food & Cooking | 2 |
| Health & Fitness | 32 | | Sports & Strength | 2 |
| Math | 25 | | Automotive & Home (`misc`) | 2 |
| Time & Schedule | 16 | | Everyday Tools (`daily`) | 12 |
| **Total** | **170** | | | |

By implementation: **23 custom components**, **106 config calculators**, **41 unit converters**
(10 group converters + 31 single-pair pages).

### The indexation finding

`scripts/prerender.ts` decides indexability like this:

```ts
const isIndexable = (calc) =>
  calc.seo?.status !== 'noindex' && calc.seo?.reviewStatus !== 'pending';
```

A missing `seo` object makes both comparisons true, so **an unreviewed tool is indexable and enters
the sitemap at priority 0.6**. Only **57 of 170** tools carry an explicit
`status: 'index'` + `reviewStatus: 'reviewed'` block. **All 170 are therefore submitted to Google.**

`AGENTS.md` states the opposite policy ("`reviewStatus: 'reviewed'` to be indexable"). The gap
between the written convention and the implemented default is the single largest quality risk in
this report. Separately, `GUIDE_REGISTRY` is pushed into the sitemap with **no** indexability
filter, so guides bypass the gate entirely.

### Duplicates and cannibalisation

| Flag | Count | Examples |
|---|---|---|
| **Duplicate — redirect** | 9 rows | `simple-interest-calculator-v2` (same title as the canonical), `tip-split-calculator` (twice), `mortgage-payment-calculator`, `compound-interest-future-value`, `emergency-fund-target-calculator`, `water-temperature-converter`, `bedtime-calculator`, `waist-circumference-calculator` |
| **Overlapping — differentiate or merge** | 13 | three waist tools, three calorie tools, two ROI tools, two affordability tools, sleep cycle/bedtime/sleep-hours |

These are documented with a rationale each in [`decisions-log.csv`](./decisions-log.csv): D05–D12
cover all nine duplicate rows (both `tip-split` entries fall under D06), D13 keeps the converter pairs
deliberately, D14 governs the unreviewed base, and D19–D20 handle the health and ROI overlaps.

**A worse defect than duplication: one slug is declared twice.** `tip-split-calculator` exists in
*both* `src/data/catalog/finance.ts` and `src/data/catalog/other.ts`. Consequences: the sitemap emits
the same `<loc>` twice; `getCalculatorBySlug` returns only the first match, so the second entry is
unreachable dead code; and the catalog holds **170 entries but only 169 distinct URLs**. This is a
bug, not a content decision — it should be fixed before any new tool is added.

---

## 2. Google Trends: what was supplied, and why I did not use it

**No calculator-related Trends data was supplied for this site.**

23 Google Trends CSV exports exist in `H:\website assets\`. Every one is geography **ZA**, and every
query is SASSA / SRD social-grant related — payment dates, status checks, R350/R370, appeals. The
time-series file's seeds are `sassa grant`, `sassa payment dates`, `sassa appeal`, `srd grant`,
`sassa online application`, `sassa login`, `sassa gold card`, `SASSA Status Check`. They belong to
the SassaHelpHub project in the same folder.

**Decision: excluded.** They contain zero calculator, converter, estimator, or solver queries, and
importing a neighbouring project's trends would fabricate demand evidence for this site. The
consequences are honoured throughout:

- No search volume, CPC, RPM, or keyword-difficulty figure appears in any file.
- No intent can claim `demand_evidence = measured`. The strongest tier available is
  **multi-source competitor corroboration** (`E2`) — an intent that ≥3 of the seven competitors
  publish *and* that appears in the seed list.
- Where commercial data is missing it is marked `unknown`, with the acquisition method named in
  [`methodology.md`](./methodology.md) §6.

**To run Phase 2 properly**, export and drop into `docs/keyword-intelligence/raw/trends/`:

1. **Interest over time** for the 40 highest-priority primary queries from
   [`keyword-master.csv`](./keyword-master.csv) (batch in groups of 5, keep each batch's normalisation
   separate, 5-year window).
2. **Interest by region** for the same queries at country level (US, UK, ZA, IN, AU).
3. **Related queries** (top and rising) for each of the 25 seed-list head terms.
4. Naming convention `trends_<geo>_<type>_<from>_<to>.csv`, and record the seed batch in the file
   header — normalised scores are **not comparable across batches**.

---

## 3. Competitive coverage — verified, not inherited

Each site was captured from its own sitemaps or index pages by an independent agent; raw evidence is
in [`raw/`](./raw/). Prior counts in this repo were checked, and **three were wrong** (§9).

| Competitor | Verified this run | What they are actually deep in |
|---|---|---|
| calculator.net | **204** pages (Finance 75, Health 31, Math 44, Other 54) | loan/mortgage variants, retirement, investment |
| thecalculatorsite.com | **187** (132 tools + 55 pair converters) | cooking/baking (26 pages), unit-pair converters |
| calculatorsoup.com | **417** (Financial 105, Math 64, Conversions 53) | time-value-of-money (25 variants), fractions (12 pages) |
| gigacalculator.com | **420** (251 calc + 155 converters + 14 randomizers) | **converters (155)**, statistics/biostatistics (29), corporate finance (23) |
| inchcalculator.com | **711** curated + thousands of programme-generated URLs | construction (91), electrical (63), science (58), math (178) |
| omnicalculator.com | **~2,270 captured**; publishes **3,938** | engineering maths, clinical scores, statistics tail, SaaS/ad metrics |
| calculatequick.com | **89** | nothing systematically — ~22 of 89 are curiosities |

**Three structural readings:**

1. **Breadth is a solved game and we cannot win it by matching it.** Omnicalculator publishes 3,938
   calculators; inchcalculator generates thousands of pairwise URLs. Adding our 171st tool does not
   move us. What none of them do is **chain a user's numbers across a workflow**, and none of them
   are **regional**.
2. **The pairwise-converter model is their moat *and* their weakness.** 155 converters at
   gigacalculator and 55 pair pages at thecalculatorsite are built one unit at a time, which is why
   a *density-aware* cooking converter beats twenty of their pages — and why our own 31 single-pair
   pages should be kept only where the query is genuinely navigational (`kg to lbs`), never expanded
   into cooking.
3. **Whole categories are thin even at the top.** Construction: calculatorsoup 11, gigacalculator 12,
   calculatequick 10. Pets/agriculture: almost nothing anywhere. Marketing metrics: one site.
   These are the openings.

The tool-by-tool matrix with a verified cell per competitor is in
[`competitor-gaps.csv`](./competitor-gaps.csv) (95 assertions). Where a capture was truncated
mid-fetch the cell is `-` ("unverified"), never "absent" — that distinction is what caused two of my
own early conclusions to be corrected mid-run (§11).

---

## 4. The keyword database

[`keyword-master.csv`](./keyword-master.csv): **789 rows**, `K0001`–`K0789`, every row a query a
person plausibly types or a defensible reformulation of one.

| Composition | Share |
|---|---|
| Mapped to a tool we already own (`exact` or `partial`) | the largest group — around half |
| Mapped to a tool we should build | about a third |
| Explicitly `do_not_target`, each with a recorded reason | the remainder (~8%) |

Each row records: intent type (calculator / converter / estimator / solver / generator / comparison /
question / regional / feature), geography, **demand-evidence tier**, how many of the seven competitors
publish something for it, current coverage, target URL, and the action
(`build_new` / `extend_existing` / `add_feature` / `merge_into` / `do_not_target`).

**Why 789 and not 1,000:** the brief asks for at least 1,000 *if the evidence supports it*, and
explicitly prefers an honest number over padding. Reaching 1,000 from here requires mechanical
permutation ("free X calculator", "best X calculator 2026", every unit-pair × every adjective), and
that is precisely the thin-content pattern the brief's Phase 9 exists to prevent. I did not do it.
The missing 211 rows are mostly long-tail variants that belong as **H2s, FAQ entries and internal
anchors on an existing page**, not as rows in a targeting database. When real volume data arrives,
the next run will legitimately add several hundred — *with* evidence attached.

---

## 5. Intent clusters and the merge rule

[`intent-clusters.csv`](./intent-clusters.csv): **293 clusters**, each carrying exactly one decision —
`build_new`, `extend_existing`, `add_feature`, `keep`, `merge_into`, `do_not_build`, or
`research_further` — plus the target URL, a verified competitor-coverage count, an evidence tier, and
a strategic priority.

Queries were merged unless at least one of four tests was met: different inputs, different output,
different regulation, or a genuinely different user job. Otherwise **one cluster → one URL**, with
the synonyms becoming supporting content.

This matters because **the seed list is itself full of duplicates.** It contains 355 query lines, of
which 5 are exact repeats (`percentage calculator` ×3, `standard deviation`, `unix timestamp
converter`, `car loan calculator`) and roughly 40 more resolve into about 20 shared intents
(`date calculator` / `days between` / `time between dates` / `calendar days`, `sleep calculator` /
`sleep cycle`, `hours calculator` / `time card` / `work hours`, `fraction` / `simplify` / `fraction
solver` / `fraction to decimal`). Building the seed list literally would have produced ~20 duplicate
pages — the exact failure the brief warns against.

**Two priority columns, deliberately.** `intent-clusters.csv.priority` is the *strategic* tier
(should we own this intent?); `tool-opportunities.csv.band` is the *build-order* tier (build it
next?). They legitimately disagree.

---

## 6. Commercial opportunity assessment

[`tool-opportunities.csv`](./tool-opportunities.csv): **168 candidates** scored on a published,
recomputable rubric (14 factors; weights in [`methodology.md`](./methodology.md) §6), banded
**P1 build-now → P2 build-next → P3 opportunistic → P4 not yet**. The score column is in the file, so
any band can be recomputed and challenged.

**What the scores say:**

- **The whitespace is in operator metrics, not consumer finance.** ROAS, conversion rate, LTV/CAC,
  billable hours, dimensional weight, price-per-unit. Outside break-even (three sites), each of these
  is served by **at most one** competitor — and several by none. High utility, trivial build,
  near-zero maintenance, and an operator audience with explicit commercial intent (the usual proxy for
  advertiser value, though unmeasured here).
- **Table-stakes gaps score deceptively low.** Gravel (41.7) and mulch (35.0) score *below* LTV/CAC
  because `gap` measures **competitive whitespace**, and all seven competitors own them. But we have
  **zero** aggregate calculators while the seed list names four. This is why the backlog runs a
  **parity track** alongside the score — see §8.
- **Regional intelligence is the only true moat on offer.** Stamp/transfer duty is covered by one
  competitor for one country. Property tax: one. Take-home pay: four, each single-country.
  A region provider that re-skins currency, units, and rate tables is defensible in a way that a
  171st calculator is not.
- **The saturated zones to refuse**: IRR/NPV (calculatorsoup has 25 TVM variants), depreciation
  (11 variants at calculatorsoup), p-values, WACC, annuity, stat distributions beyond the basics.
  Building these is buying a ticket to page 4.

**What is *not* claimed:** no revenue, RPM, CPC or traffic projection appears anywhere, because none
was supplied. The "commercial intent" signal here is a **proxy** — an operator/business audience — not
a measured payout. To convert this into a forecast you need the Trends exports (§2), Search Console
once live, and ideally a keyword tool export; the rubric has a column waiting for each.

---

## 7. Indexation and AdSense quality gate

### Risks found

| # | Risk | Severity | Evidence |
|---|---|---|---|
| R1 | **113 of 170 tools indexable without review** (default-on) | **High** | `prerender.ts` lines 30–31, 457 |
| R2 | **8 duplicate URLs** live in the sitemap | **High** | `tool-inventory.csv` |
| R3 | **Guides bypass the indexability gate** | Medium | `prerender.ts` line 460 |
| R4 | **31 single-pair converters** with near-identical templates | Medium | `tool-inventory.csv` (`conversion` rows) |
| R5 | **YMYL pages without citations** (A1C, blood pressure, metabolic age, caffeine) | Medium | `tool-inventory.csv` notes |
| R6 | **Thin standalone tools** (absolute value, modulo, boiling point, screen-time cost, pet food) | Low | `tool-inventory.csv` |
| R7 | **No deployed site** — `calculatedaily.com` currently serves a parking lander (`/lander`); `sitemap.xml` contains one URL | **High** | live fetch during this run |
| R8 | **Misc category holds 2 tools** ("Automotive & Home") — a near-empty category page | Low | `calculators.ts` |

R7 is worth stating plainly: the launch checklist's deploy items are unchecked, and the domain
resolves to a parking page. **There is no Search Console data to analyse because there is no
deployed site** — which also means the "wait for Search Console" advice in §11 is not a delay
tactic, it is the actual sequence.

### The gate (apply before any page enters the sitemap)

1. **Correct maths with a worked example** visible on the page (not just a formula).
2. **≥3 FAQs** answering real objections, not restating the intro.
3. **One differentiator** — a chart, compare mode, URL-shared state, or regional table — or a written
   justification for why parity is enough.
4. **No live near-duplicate** (run the merge tests in §5 first).
5. **Sources** for every health, money, or legal claim; dated rate tables where rates are involved.
6. **The bookmark test**: would a person bookmark this and come back? If not, it is a blog post.

### Immediate repair list (before any new tool ships)

- Resolve the 8 duplicates with 301s (D05–D12).
- Decide the 113: either add `reviewStatus: 'reviewed'` deliberately, or set `noindex` until reviewed
  — but stop letting absence mean "publish" (D14).
- Apply `isIndexable` to guides.
- Retire or consolidate the 6 thinnest tools listed in R6.
- Reconcile `misc`: populate it properly or fold its 2 tools into `daily`.

---

## 8. The first 20 builds

[`priority-backlog.csv`](./priority-backlog.csv) holds all 45 with functionality, formula, content
requirements, related tools, regional notes, effort and indexation recommendation. Ranks 1–3 are
**repairs**, ranks 4–23 are the **first 20 builds** — ten **parity** (the market proved the demand,
we simply don't serve it) and ten **whitespace** (nobody serves it well).

### Repair first (ranks 1–3, ~2 days total)

| # | Item | Why first |
|---|---|---|
| 1 | 301 the 8 duplicates | Fewer, stronger pages. Cheapest quality win available. |
| 2 | Decide the 113 unreviewed tools | Stop multiplying an unreviewed base. |
| 3 | Gate guides on `isIndexable` | One-line consistency fix. |

### Parity track (demand proven, coverage absent here)

| # | Tool | Score | Why |
|---|---|---|---|
| 4 | **Debt payoff — snowball vs avalanche** | 60.0 | Top-scored in *both* prior audits, still unbuilt. Anchors a debt ecosystem. |
| 5 | **Car loan** | 55.0 | 6 of 7 competitors; we have no auto-loan page. |
| 6 | **Pregnancy due date** | 53.4 | Largest unserved health intent; opens fertility. |
| 7 | **Tile** | 46.7 | All seven have it; seed list names "how many tiles". |
| 8 | **Gravel** | 41.7 | Seed-list question, zero coverage here. |
| 9 | **Mulch** | 35.0 | Completes the aggregate trio. |
| 10 | **Roofing / shingles** | 53.4 | Contractors, large-ticket intent, pairs with pitch. |
| 11 | **Time card / timesheet** | 60.0 | Payroll intent with weekly repeat use. |
| 12 | **Gas mileage / MPG** | 61.6 | Distinct from fuel *cost*; explicitly in the seed list. |
| 13 | **Fraction calculator** | 53.4 | calculator.net has 12 fraction pages; we have none. |

### Whitespace track (nobody serves it)

| # | Tool | Score | Why |
|---|---|---|---|
| 14 | **Price per unit** | 65.0 | Zero coverage across all seven. Universal grocery utility. |
| 15 | **Break-even** | 65.0 | One competitor. Textbook build-now. |
| 16 | **Rental yield** | 62.0 | Seed list, two competitors, landlord audience. |
| 17 | **Time zone converter** | 62.3 | One competitor does it properly — a real gap. |
| 18 | **ROAS** | 58.3 | One thin competitor page; operator audience. |
| 19 | **Conversion rate** | 58.3 | Same cluster, near-zero marginal cost. |
| 20 | **Dimensional weight** | 58.4 | Small-seller intent, clear formula. |
| 21 | **Unix timestamp** | 55.0 | Developer utility, zero maintenance. |
| 22 | **Word counter** | 55.0 | Students/writers, weekly return, trivial build. |
| 23 | **Air fryer conversion** | 55.0 | Timely, cheap, feeds the cooking workflow. |

### Then, in ecosystem order (ranks 24–45)

Roof pitch → drywall → BTU → **cooking converter (the differentiator)** → loan payoff → overtime →
commission → **stamp duty (regional moat)** → fertiliser → number bases → inflation → take-home pay →
business days → density → pressure group → steps modes → TDEE/macro workflow.

**Each batch ships with**: content that passes §7's gate, workflow links to neighbour tools, and a
decision entry in [`decisions-log.csv`](./decisions-log.csv).

---

## 9. Where the existing documents were wrong

Correcting the record matters more than adding to it.

| Prior claim | Verified reality |
|---|---|
| calculator.net "~215 tools" | **204** — both of their sitemaps agree exactly |
| calculator.net "~85 finance tools" | **75** — their own hub page lists 71 and calls itself complete |
| calculatequick "87 tools" | **89** |
| "Single-unit converters are thin pages" (red-team audit §20) | **Half right.** `kg to lbs` is a navigational query with real demand and thecalculatorsite publishes ~40 such pages. Keep high-demand pairs and make each non-thin; retire the exotic ones. Do **not** extend the model into cooking units, where density makes it wrong. |
| TDEE, retirement, standard deviation listed as "MISSING" | All three **exist now** (built since that audit). They are unreviewed and shallow, which is a different problem — clusters `HLT-03`, `FIN-34`, `MAT-07` treat them as *extend*, not *build*. |
| "IP subnet is competitor-dominated without differentiation" | Coverage is **fragmented** (calculator.net, calculatequick, omnicalculator), not saturated. Recorded as `research_further` (D17), not rejected. |
| inchcalculator "3,500+ tools" | **711 curated** tools, plus thousands of programme-generated pair/countdown URLs that no sitemap enumerates fully. The estimate is not wrong about scale, but it is not a tool count. |
| Gambling odds, novelty calculators | **Carried forward as DO NOT BUILD** (decisions D01–D03), unchanged. |

The two prior documents also disagree with each other on developer tools; I have not silently picked
a winner — D17 records the conflict and the condition for resolving it.

---

## 10. The reusable loop

Documented in [`methodology.md`](./methodology.md) §9. In brief, each cycle:

1. **Ingest** new exports → `raw/trends/` with the naming convention.
2. **Normalise** without comparing scales across batches.
3. **Diff** vs the previous export: new / rising / declining.
4. **Join** to `keyword-master.csv` on keyword and cluster.
5. **Re-score** only rows whose evidence or competition changed.
6. **Emit** ≤5 builds plus the rejected list.
7. **Append** every decision to `decisions-log.csv` with a date and reason, so a rejected idea cannot
   return without **new** evidence.

Cadence: monthly loop, quarterly full competitor re-capture, and after any batch of ≥5 launches.
The `decisions-log.csv` is the loop's memory — that is its whole purpose.

---

## 11. What should wait for real performance data

- Every `demand_evidence = inferred` row — the ones with neither competitor corroboration nor a
  seed-list match. These are hypotheses until Search Console speaks.
- The regional rate tables (take-home pay, property tax, stamp duty, capital gains). Build the
  *engine* now; load rate tables where you can cite an official source with an effective date.
- The long-tail question clusters (agri, science, pets). Real utility, weak demand evidence — ideal
  candidates to test three of, then expand if they earn impressions.
- Any further breadth. **Do not build the 201st–300th tool** until the 113 unreviewed pages are
  resolved and the first 20 are live.

**What to do regardless of data:** the repairs in §8, because they are defects, not bets.

---

## 12. Limitations

1. **No measured demand data** (see §2). Ranking reflects corroboration and whitespace, not traffic.
2. **Two competitor captures are partial.** omnicalculator's category pages each lost a middle block
   to fetch limits, and its capture was *replaced mid-run* by a much larger one. I re-ran the
   coverage scans and **corrected three of my own conclusions** as a result — ROAS, CAC/CLTV and Unix
   timestamp are *not* zero-coverage. Those corrections are visible in `competitor-gaps.csv` as
   changes from "zero coverage confirmed" to named comparators.
3. **Unverified cells are marked `-`, not "absent."** Zero-coverage claims for agriculture and
   word-counter-type tools are labelled provisional because the omnicalculator blocks that would
   contain them were truncated.
4. **Duplication findings are static-analysis findings** — same display name, same documented
   formula, same inputs. Strong signals, not proof that two live pages render identical output.
5. **The shell was unavailable during this run.** The environment's Windows sandbox could not
   provision write access to the workspace (`SetNamedSecurityInfoW failed (Win32 5)`), so
   `npm run audit`, `npx tsc --noEmit`, and `npm run build` were **not** run. No code changed, so the
   build state is unchanged — but it is **unverified** and must be verified before the first
   implementation batch. Two small artifacts remain from this: an empty
   `raw/.write-probe` file, and row counts verified by sequential IDs rather than by script.
6. **No monetisation data.** The commercial assessment in §6 is qualitative and says so.

---

## What I would do on Monday

1. Run the three repairs (half a day) and re-run `npm run audit` + `npx tsc --noEmit`.
2. Decide the 113 unreviewed tools — this is an owner decision, not an engineering one.
3. Build the ten parity tools; they are uncontroversial and the market has already proved demand.
4. Build price-per-unit and break-even next; they are the cheapest differentiators on the list.
5. Export the Trends batches in §2 so the next run can replace `inferred` with `measured`.
6. Ship the region provider before any tax tool — it is what makes the regional moat real rather
   than three disconnected rate tables.
