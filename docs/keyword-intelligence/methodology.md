# Methodology — how this research pack was produced

**Run type:** read-only research. No production code, route, catalog entry, or build script was
modified. Every recommendation below is a proposal until it is accepted into
`docs/research-and-roadmap.md` and implemented.

**Data period:** the most recent evidence available during this run is the Google Trends export
ending 23 Oct 2026, so the pack is current as of **October 2026**.

---

## 1. Inputs actually used

| Input | What it is | How it was used |
|---|---|---|
| `H:\website assets\calculate daily - Seed list explorer.md` | 749-line seed list, 26 category sections, ~617 unique query lines | Seed layer for the keyword database (`demand_evidence = seed_list`) |
| `H:\website assets\richtext_converted_to_markdown (31).md` | The research brief (11 phases) | Defined scope, scoring expectations, and the quality gate |
| `src/data/catalog/*.ts` (7 files) | The only source of truth for the current catalog | Built `tool-inventory.csv` |
| `scripts/prerender.ts`, `scripts/audit-calculators.ts`, `src/types.ts` | Indexation, sitemap, and audit behaviour | Established what is *actually* indexable vs. merely intended |
| `docs/research-and-roadmap.md` (670 lines) | Prior competitive research (4 competitors) | Reused as prior evidence, re-verified where it made counts |
| `docs/keyword-intelligence/raw/*.md` | Fresh sitemap captures of 7 competitors | The only evidence used for coverage claims |
| Google Trends exports | Two user-supplied Worldwide top and rising query exports; see `trends-execution-2026-10-24.md` | Relative prioritization only; not volume or first-party performance |

## 2. Phase 1 — verifying the inventory

The brief warned: *"Do not assume the current count of 170 is accurate without verifying it."*

Verification method: every `slug:` line in `src/data/catalog/*.ts` was extracted directly from
source and reconciled against `name:`/`category:`/`kind:`/`componentId:`/`unitGroup:` lines.

**Result: 170 entries confirmed exactly** (`tool-inventory.csv`, 170 data rows + header).

| Category | Tools | | Category | Tools |
|---|---|---|---|---|
| Unit Conversion | 40 | | Construction & DIY | 6 |
| Finance & Money | 33 | | Food & Cooking | 2 |
| Health & Fitness | 32 | | Sports & Strength | 2 |
| Math | 25 | | Automotive & Home (`misc`) | 2 |
| Time & Schedule | 16 | | Everyday Tools (`daily`) | 12 |

Breakdown by implementation: **23 custom components**, **106 config calculators**, **41 unit
converters** (10 group converters + 31 single-pair pages).

### 2.1 What the code actually does about indexation

This matters more than any count. From `scripts/prerender.ts`:

```ts
const isIndexable = (calc: any) =>
  calc.seo?.status !== 'noindex' && calc.seo?.reviewStatus !== 'pending';
```

and the sitemap is built with `CALCULATOR_CATALOG.filter(isIndexable)`.

Because a missing `seo` object makes both comparisons true, **a tool with no `seo` block is
indexable and enters the sitemap at the default priority 0.6.** In this catalog **57 tools carry
an explicit `status: 'index'` + `reviewStatus: 'reviewed'` block; 113 do not.** All 170 are
therefore live in the sitemap today, but only 57 have been explicitly signed off.

`AGENTS.md` states "`reviewStatus: 'reviewed'` to be indexable". The code enforces the opposite
default. The gap between the documented convention and the implemented behaviour is an
indexation-quality risk and is raised in `report.md` §7. **It is not a code change this run
makes** — it is a decision for the owner.

A second, smaller inconsistency: `GUIDE_REGISTRY` entries are pushed into the sitemap
unconditionally, with no `isIndexable` filter, so guide pages bypass the review gate entirely.

### 2.2 Duplicate and cannibalisation detection

Three tests were applied to all 170 tools:

1. **Identical display name** → certain duplicate. Found: `simple-interest-calculator` vs
   `simple-interest-calculator-v2` (both named "Simple Interest Calculator"), and
   `tip-calculator` vs `tip-split-calculator` (both named "Tip & Bill Split(ter)").
2. **Same output from the same inputs** under a different URL → duplicate intent. Found: mortgage
   payment, compound future value, emergency-fund target, water temperature, bedtime/sleep cycle.
3. **Same input space, overlapping but not identical output** → overlapping; keep only if a
   genuinely different user job exists (see §6).

Verdict: **8 redirect/merge candidates and 13 overlap candidates** are flagged in
`tool-inventory.csv` (`intent_role` + `action`).

## 3. Phase 2 — Google Trends evidence and limits

Two user-supplied Worldwide top and rising query exports cover 2021-10-24 through 2026-10-24.
The original data is preserved in `raw/`; implementation decisions and query mappings are in
[`trends-execution-2026-10-24.md`](./trends-execution-2026-10-24.md).

23 Google Trends CSV exports were found in `H:\website assets`. Every one is geography **ZA** and
every query is SASSA / SRD social-grant related (payment dates, status checks, R350/R370), e.g.
`searched_with_top-searches_queries_ZA_20261015-1143_20261022-1143.csv` and
`time_series_ZA_20260723-1308_20261023-1308.csv` (seeds: `sassa grant`, `sassa payment dates`,
`sassa appeal`, `srd grant`, `sassa online application`, `sassa login`, `sassa gold card`,
`SASSA Status Check`). They belong to a different project in the same assets folder.

The separate ZA SASSA/SRD exports remain excluded from calculator prioritization because they
contain no calculator, converter, estimator, or solver queries. They belong to another project.
The two supplied Worldwide exports are relevant but are not absolute demand data: their search
interest scores are relative, and their percent changes do not predict future traffic.

Consequences that are honoured throughout this pack:

- **No monthly search volume, CPC, RPM, or keyword-difficulty number is available** from these
   exports. Those fields remain `unknown` and are never inferred from relative interest scores.
- The exports can guide query-cluster prioritization, but they do not establish impressions, clicks,
   rankings, or first-party demand. No cluster is labeled as having measured Search Console demand.
- See `trends-execution-2026-10-24.md` for the executed page mapping, rejected brand terms, and
   indexation safeguards.

## 4. Phase 3–4 — keyword discovery and competitor capture

**Discovery** started from the 617 seed queries and expanded by: unit-pair inversion, question
reformulation ("how much do I need", "how many … do I need"), regional qualification (US/UK/ZA/IN/AU),
audience qualification (student, contractor, freelancer, landlord, parent), and competitor-only
tools surfaced in §4 capture.

**Competitor capture** used live sitemaps, read by seven independent capture agents that recorded
only pages they actually fetched. Raw captures are in `docs/keyword-intelligence/raw/`:

| Competitor | Claim before this run | Verified this run |
|---|---|---|
| calculator.net | ~215 tools, ~85 finance | **204** (Finance 75, Health 31, Math 44, Other 54) — both sitemaps agree exactly |
| thecalculatorsite.com | ~150 tools | **187 pages** = 132 named tools + 55 pair/preset converters; no sitemap exists, enumerated from category indexes |
| calculatequick.com | 87 tools | **89** across 20 categories |
| omnicalculator.com | not previously audited | **~2,270 tool URLs captured**; site publishes **3,938** across 14 categories |
| inchcalculator.com | "3,500+ tools" (unverified prior estimate) | **711 curated tools** + thousands of programmatic pair/countdown URLs that exceed fetch limits |
| gigacalculator.com | not previously audited | **420** = 251 calculators + 155 converters + 14 randomizers |
| calculatorsoup.com | not previously audited | **417** (Financial 105, Math 64, Conversions 53) |

Prior counts are treated as unverified claims: the calculator.net claim was wrong by 11 pages and
the finance claim by 10, which is exactly why §1 re-verifies rather than inherits.

**Coverage is recoded as a count, never as a proxy for volume.** `competitors_covering = 5` means
"five of the seven published a page for this intent", which is discovery evidence — not demand.

## 5. Phase 5 — normalization and intent clustering

Queries were normalized (lowercase, strip punctuation, singular/plural, strip filler like "online"
/"free"/"calculator" only for matching, keep it for targeting), then merged into clusters using
four merge tests. **Two queries join one cluster if they share the same inputs and the same
output.** They earn separate tools/URLs only if at least one is true:

| Test | Separate URL justified when… | Example |
|---|---|---|
| Different inputs | the form fields materially differ | BMI (height/weight) vs BMR (age/sex/height/weight) |
| Different output | the user needs a different number | CAGR (annualised rate) vs ROI (total return) |
| Different regulation | tax/legal rate tables differ by jurisdiction | UK stamp duty vs ZA transfer duty |
| Different job | the user is doing a different task | "how much concrete" vs "how many bags of concrete" |

Otherwise the synonyms are **one cluster → one URL**, and the extra queries become supporting
content, H2s, FAQ entries, and internal-link anchors. This is the direct implementation of the
brief's rule: *do not create multiple URLs for synonyms one high-quality tool can satisfy.*

Exception recorded deliberately: existing single-pair converter pages (`pounds-to-kg`,
`kg-to-lbs`, …) are kept, because in conversion the *query itself is the URL* and the intent is
navigational. They must not proliferate into cooking units, where density makes them wrong.

## 6. Phase 6 — the scoring rubric

Every candidate is scored on 14 factors, 0–3 each, in `tool-opportunities.csv`. No factor is
inferred from a metric that does not exist.

**Benefit factors**

| Factor | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| `evidence_tier` | none | E4 inferred | E3 single-source | E2 multi-source | 
| `gap` (competitive) | saturated, all 7 cover | 5–6 cover | 3–4 cover | 0–2 cover |
| `utility` | novelty only | occasional | common | everyday / recurring job |
| `differentiation` | we'd be a worse copy | parity | we can add workflow/visualisation | nobody else can do it credibly |

`evidence_tier` is capped at E2 (never E1/measured) because no measured data was supplied. Tiers:
**E1** measured export · **E2** ≥3 competitors publish it *and* it appears in the seed list ·
**E3** 1–2 competitors or seed list only · **E4** semantic inference only.

**Cost factors**

| Factor | 1 | 2 | 3 |
|---|---|---|---|
| `effort` | config entry (<2 h) | custom component (1–2 d) | ecosystem (3–7 d) |
| `maintenance` | 0 static | 1 periodic content refresh | 2 live data feed (rates, prices, tz) |
| `risk` | 0 none | 1 thin/duplication/YMYL source needed | 2 legal, medical, or financial-advice exposure |

**Priority Score** (0–80 max, published in the CSV so it can be recomputed):

```
Score = (evidence_tier/3)*30 + (gap/3)*20 + (utility/3)*20 + (differentiation/3)*10
        − effort*5 − maintenance*3 − risk*5
```

Bands: **P1 ≥ 52**, **P2 42–51.9**, **P3 32–41.9**, **P4 < 32**. Two hard gates override the score:

- `regulatory = 2` (medical/financial advice, tax filing) cannot be P1 without named sources.
- `dup_risk = 3` cannot be BUILT — it must become an extension of an existing tool.

### Two things the score deliberately does *not* do

**It does not measure "we lack a page that everybody else has".** `gap` is scored as competitive
whitespace, so an intent all seven competitors publish scores **0** there even though Calculate
Daily may have nothing for it. That is intentional — the score ranks *where we can win*, and being
the seventh entrant to "gravel calculator" is not a win. But it means the score alone would
under-rate table-stakes coverage.

For that reason `priority-backlog.csv` runs **two tracks**: **parity** (high-demand intents the
market has proven and we lack) and **whitespace** (intents nobody serves well). The first 20 draw
ten from each. Parity items can therefore appear in the build order with a P2/P3 score, and that
is not an inconsistency — it is the second lens.

**Two priority columns exist on purpose.** `intent-clusters.csv.priority` is the *strategic tier*
(should we own this intent at all?). `tool-opportunities.csv.band` is the *build-order tier*
(should we build it next?). They disagree where a strategically important intent is expensive or
crowded. When sequencing, the build-order band wins; when planning coverage, the strategic tier
wins.

### What is deliberately *not* scored

CPC, RPM, traffic, keyword difficulty, and revenue potential. They were not supplied, and the
brief explicitly forbids inventing them. How to obtain them is specified in `report.md` §6.

## 7. Phase 8 — the keyword database

`keyword-master.csv` schema:

`id, keyword, cluster_id, category, intent_type, geo, demand_evidence, competitors_covering,
current_cover, target_url, action, priority`

- `intent_type`: calculator · converter · estimator · solver · generator · comparison · question ·
  regional · feature
- `current_cover`: `exact` (tool exists and matches) · `partial` (exists, missing the variation) ·
  `none`
- `action`: `build_new` · `extend_existing` · `add_feature` · `merge_into` · `do_not_target`

**The count is a result, not a target.** The database reports what the evidence supports. Every row
is a real query a person types or a defensible reformulation of one; there is no padding by
mechanical permutation, because padding is the failure mode the brief was written to prevent.

## 8. Phase 9 — the indexation quality gate

Applied to every proposal before it is allowed a URL (see `report.md` §7 for the full list and
owner actions). A tool passes only if: correct formula with a visible worked example; ≥3 FAQs that
answer real objections; ≥1 genuinely differentiator feature or a clear differentiation note;
no near-duplicate already live; sources for every health/money/legal claim; and a reason to exist
that survives the question "would a person bookmark this?".

## 9. Phase 11 — the repeatable loop

The pack is built to be re-run, not re-read:

1. **Ingest** new Trends exports into `docs/keyword-intelligence/raw/trends/` with the naming
   convention `trends_<geo>_<type>_<from>_<to>.csv`.
2. **Normalize** to `keyword` + `geo` + `type` + `period`, preserving the export's own scale.
3. **Diff** against the previous export: flag new, rising, declining. Never compare normalized
   scores across different export periods or seeds.
4. **Join** to `keyword-master.csv` on `keyword`/`cluster_id`.
5. **Re-score** only the rows whose evidence tier or competition changed.
6. **Emit** a batch of at most 5 builds plus the rejected list.
7. **Append** every decision to `decisions-log.csv` with a date and reason, so a rejected idea
   cannot return without *new* evidence.

Suggested cadence: monthly for the loop, quarterly for a full competitor re-capture, and after any
launch of ≥5 new tools.

## 10. Known limitations

1. **No measured demand data.** Ranking rests on corroboration, not traffic. Treat P1 as
   "build first", not "highest volume".
2. **Sitemaps show pages, not performance.** A competitor page can exist and be thin or dead.
3. **Competitor captures are point-in-time, and two are necessarily partial.** omnicalculator's
   capture was replaced mid-run by a much larger one (~2,270 tools vs the first ~1,484); the
   coverage scans were re-run against the final file and three "zero coverage" claims were
   **corrected** as a result (ROAS, CAC/CLTV, Unix timestamp each turned out to have an
   omnicalculator page). Where a category page was truncated mid-fetch, the cell is recorded as
   `-` (unverified) rather than as "absent", and the affected zero-coverage claims are labelled
   provisional. inchcalculator and thecalculatorsite both hide unenumerable tails behind
   pagination or missing sitemaps.
4. **Shell commands were unavailable during this run** (the environment's Windows sandbox could not
   provision write access to the workspace, `SetNamedSecurityInfoW failed (Win32 5)`), so
   `npm run audit`, `tsc`, and `npm run build` were **not** run. This run changed no code, so the
   build state is unchanged from before the run — but it is unverified, and it must be verified
   before any implementation batch begins.
5. **Duplication findings are static-analysis findings**, based on names, slugs, and the documented
   formulas in catalog content. They are strong signals, not proof that two live pages render
   identical output.
