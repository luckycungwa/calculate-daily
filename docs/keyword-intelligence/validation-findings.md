# Validation findings — research pack, pre-implementation review

**Run: read-only validation.** No production code, routes, catalog entries, sitemap behaviour, or
calculator implementations were touched. The original research files are preserved unchanged; every
correction lives in a new file.

| Deliverable | What it contains |
|---|---|
| [`keyword-master-validated.csv`](./keyword-master-validated.csv) | The keyword database with field alignment repaired; IDs and keyword text preserved |
| `validation-findings.md` | This document — defects found, coverage reconciliation, tool audit, recomputation, change log |
| [`corrected-opportunity-review.csv`](./corrected-opportunity-review.csv) | All 168 candidates re-stated with corrected coverage status, duplication checks and priority actions |
| [`revised-priority-backlog.csv`](./revised-priority-backlog.csv) | Recomputed build order with strategic tier separated from build order |

---

## Executive summary

The pack's structure held up. Its **evidence did not, in one specific and important way**.

| # | Finding | Severity | Status |
|---|---|---|---|
| **V1** | `keyword-master.csv` had **71 rows with 13 fields instead of 12** (70 with a redundant `,seed,inferred,` pair; `K0247` with a stray `bmi` token) | **High** — breaks schema integrity in ~9% of rows | **Fixed** in the validated file |
| **V2** | The same file ended with 2 blank lines | Low | **Fixed** |
| **V3** | **Every "zero coverage" claim I spot-checked was wrong.** Price per unit has 2 competitors, word counter 1, conversion rate 2, Unix timestamp 2, ROAS 1, LTV/CAC 1, time zone 3 | **Critical** — the differentiator argument rested on it | **Corrected** in the review and backlog |
| **V4** | Root cause: my coverage greps were **case-sensitive and synonym-blind** ("Conversion Rate" did not match `[Cc]onversion rate`; "unit price" did not match "price per unit"; "Cord of Wood" did not match "firewood") | **Critical** — methodological, not clerical | Documented; re-verified case-robustly |
| **V5** | Because three of seven captures are **partial**, "confirmed zero coverage" is not supportable for any intent | **High** | All such claims reclassified `limited_coverage` or `unverified` |
| **V6** | The opportunity list contains **5 internal near-duplicates** (triangle/right-triangle, fuel-consumption/gas-mileage, density-converter/density-calculator, reading-time/word-counter share a URL, future-value vs an existing duplicate tool) | Medium | Flagged `DUP-RISK` / `merge_first` |
| **V7** | Sensitive tools (pregnancy, ovulation, pet calories, tax, retirement) were not consistently marked for **source review** | Medium | Flagged `YMYL-SOURCE`, `TAX-DATA-FEED`, `FIN-ADV` |
| **V8** | `revised-priority-backlog.csv` (first draft, this run) contained bare quotes and unquoted commas | Low | Rebuilt clean |

**What this means strategically:** the plan does not collapse, but its *justification* changes. We
cannot say "nobody else does this" — competitors do most of it, thinly. The durable case for these
tools is **execution** (workflow chaining, ingredient density, comparison, regional tables), not
novelty. Any priority that rested on "zero competition" has been re-labelled, and four
agriculture/developer tools dropped from build to **monitor**.

---

## 1. Keyword master validation

### Method

No shell was available this session (the environment's Windows sandbox still fails with
`SetNamedSecurityInfoW failed (Win32 5): grantWrite`), so a scripted validator was impossible. I used
**regex oracles over the file** instead, which is why the checks below are exact rather than sampled:

| Check | Oracle | Result |
|---|---|---|
| Rows with **more** than 12 fields | `^([^,]*,){12}` (≥12 commas) | **71 matches** |
| Rows with **fewer** than 12 fields | `^([^,]*,){0,10}[^,]*$` | **2 matches — both blank lines at EOF** |
| Embedded quotes / malformed quoting | `"` | **0 matches** — the file contains no quoted fields at all |
| Total lines | file read | **792** = 1 header + 789 data + 2 blank |
| ID boundaries | `^K0001,` … `^K0789,` | present; first and last IDs correct |

### The defect

All 71 over-long rows were the same class of error, introduced when the file was written in
successive chunks:

```
K0038,home insurance calculator,FIN-10,finance,estimator,global,seed,inferred,0,none,/home-insurance-calculator,build_new,P4
                                                            ^^^^^^^^^^^^^^ two evidence values
```

The declared schema has **one** `demand_evidence` column. 70 rows carried two values (`seed` and
`inferred`), shifting every subsequent field one position right: `competitors_covering` received
`inferred`, `current_cover` received the count, `target_url` received `none`, and so on. A consumer
parsing columns by position would have read garbage for those rows.

`K0247` was a separate error — a stray `bmi` token inserted after the keyword:

```
before: K0247,am I overweight,bmi,HLT-01,...
after:  K0247,am I overweight,HLT-01,...
```

### How the ambiguity was resolved

Deleting one token fixes the structure, but which token survives is a semantic question, and the
brief says not to reinterpret ambiguous evidence. I resolved it against **the seed list**, which is
the actual source the value refers to — not by preference:

- **57 rows**: the intent appears in the seed list → kept `seed`.
- **14 rows** (`K0129`, `K0162`, `K0177`, `K0204`, `K0241`, `K0243`, `K0247`, `K0275`, `K0314`,
  `K0609`, `K0616`, `K0667`, `K0716`, `K0718`) → the intent is absent from the seed list (Roth IRA,
  transfer duty, subscription tracking, CPM, crypto staking, loan affordability, waist circumference,
  alcohol units, air fryer, grams-to-ml, parking cost, base64, SHA-256) → kept `inferred`.

Where the call was genuinely borderline (e.g. `K0243 loan affordability`, adjacent to the
seed-listed "home affordability"), the more conservative value (`inferred`) was used. **Every one of
the 71 rows, with its final value and reason, is listed in §5.**

### What could not be verified

- **Duplicate-ID detection at scale.** Sequential IDs plus an exactly-matching row count
  (789 = `K0789` − `K0001` + 1) make a duplicate-plus-gap pair impossible *unless* two errors offset.
  I verified the decade boundaries (`K0100`…`K0700`) and sampled rows across every chunk; a full
  duplicate scan needs a script and should be run when the shell is restored.
- **Byte-identical preservation** of untouched rows is asserted by construction (a mechanical
  copy with two replacement rules) and checked by sampling, not by a diff.

---

## 2. Coverage reconciliation

### 2.1 The six intents under review

| Intent | report.md said | tool-opportunities said | competitor-gaps said | Verified this pass | Corrected status |
|---|---|---|---|---|---|
| **ROAS** | "whitespace… nobody serves it well" | `covering = 0` | `1` (omni L1241) — *corrected before the validation run* | **1** — omnicalculator `finance/roas` | **limited_coverage** |
| **Conversion rate** | "zero coverage" | `0` | `0` | **2** — gigacalculator L20, omnicalculator L1204 | **limited_coverage** |
| **Unix timestamp** | "zero coverage" | `0` | `2` (giga, omni) — *corrected before the run* | **2** — giga L387, omni L1489 | **limited_coverage** |
| **Time zone** | "only one competitor handles this properly — a real gap" | `1` | `1` (calculator.net) | **3** — calculator.net L183, omni L1493, gigacalculator L385 | **verified_coverage** |
| **Word counter** | "zero coverage" | `0` | `-` (unverified) | **1** — calculatorsoup L292–293 (word counter **and** character counter) | **limited_coverage** |
| **Price per unit** | "zero coverage across all seven… a true differentiator" | `0` | `0` | **2** — omnicalculator ×3 pages (unit price, price per ounce, price per unit), inchcalculator L429 | **limited_coverage** |

### 2.2 Additional corrections found while checking the above

| Intent | Was | Now | Evidence |
|---|---|---|---|
| Break-even | "three sites" | **≥2 verified** (giga L15, omni L1194); a third was claimed but not confirmed | — |
| Fertiliser | "no competition" | **1** (omnicalculator L2003, L2020) | — |
| Grass seed | 1 | **2** (omnicalculator L2006 + inchcalculator L106) | — |
| Firewood / cord | **0** | **1** — omnicalculator "Cord of Wood Calculator" L1712 | — |
| Tree height | **0** | **1** — omnicalculator L2025 | — |
| SHA-256 | 1 | **2** — gigacalculator L262, calculatequick L96 | — |
| Livestock feed | **0 confirmed** | **unverified** — omnicalculator has a *livestock fence cost* tool (L1996), not a feed tool, and its biology block was truncated | — |

### 2.3 Status definitions applied

| Status | Meaning | Rule used |
|---|---|---|
| `verified_coverage` | ≥3 of 7 publish a page for this intent | Directly seen in a capture |
| `limited_coverage` | 1–2 of 7 publish it | Directly seen; still a real but unremarkable opportunity |
| `unverified` | No page found, **but the category capture was incomplete** | Cannot claim absence |
| `confirmed_zero_coverage` | No page found across **all seven complete captures** | **No intent qualifies** — three of seven captures are partial (omnicalculator 7 of 14 categories truncated; thecalculatorsite has no sitemap; inchcalculator's page-sitemap is truncated and its programme-generated URLs are unenumerable) |

### 2.4 Root cause

Three interacting errors, all mine:

1. **Case-sensitive regex.** `[Cc]onversion rate` cannot match "Conversion Rate". Several of the
   zero-coverage findings were false negatives produced by that one mistake. Re-verified with
   case-robust stems (`onversion [Rr]ate`, `rice [Pp]er [Uu]nit`).
2. **Synonym blindness.** "Cord of Wood" is a firewood calculator; "unit price" is a price-per-unit
   calculator. Searching the literal phrase missed both.
3. **Partial captures treated as complete.** omnicalculator's *Finance* category was captured at
   ~211 of 618 tools, *Health* at 205 of 440, *Other* at 190 of 228. Any "we found nothing" claim
   inside those categories is unsound.

The first two were fixable within this pass. The third cannot be fixed by more searching — it needs a
complete re-capture, which is listed as a required follow-up in §6.

---

## 3. Tool audit

### 3.1 New tool vs improvement

Of the 168 candidates: **~125 are genuinely new pages**, **~38 are improvements to pages we already
own**, **5 are consolidations** (merges that must happen before related builds). The review CSV's
`type` column records this per row.

### 3.2 Duplication and cannibalisation

| Proposed tool | Conflicts with | Verdict |
|---|---|---|
| `O027` Future value | **Existing `compound-interest-future-value`** (already flagged for merge into compound interest) | **merge_first** — do not build until the merge lands; then decide if a standalone FV-of-annuity page earns its URL |
| `O058` Triangle vs `O064` Right triangle | Each other | **merge_first** — one triangle tool with a right-angle mode |
| `O095` Fuel consumption converter vs `O106` Gas mileage | Each other (both convert economy) | **merge_first** — one tool, two output units |
| `O102` Density converter vs `O113` Density calculator | Each other (name collision, different maths) | Keep both but rename the converter "Density units converter" to avoid a confusing pair |
| `O068` Reading time vs `O050` Word counter | **Same target URL** `/word-counter` | Merge — reading time is an output, not a page |
| `O055` Margin of error | CI (`O048`) + Sample size (`O049`) | Keep as a mode of CI, not a third page |
| `O054` Volume of shapes | Existing `room-volume-calculator` | Adjacent, not duplicate — different shapes and inputs; cross-link |
| `O006` Loan payoff | Existing `amortization-schedule-calculator` | Adjacent — different output (payoff date vs schedule); ship after the duplicate merge |
| `O003` Price per unit | Existing `meal-cost-calculator` | Adjacent — grocery comparison vs recipe costing |
| `O042` Dog food | `O041` Pet calorie | Adjacent — portion size vs energy need; build the second only if the first earns traffic |
| `O134` PPI/DPI | `O130` Aspect ratio | Adjacent image cluster |
| `O017` Rental cash flow | `O002` Rental yield | Adjacent landlord cluster; yield first |

### 3.3 Formula, edge-case and source requirements

Most consumer arithmetic is fully specified. The gaps concentrate in four groups:

**A. Health / YMYL — `YMYL-SOURCE` (must cite before indexing)**
- *Due date / conception / ovulation / pregnancy week / weight gain*: Naegele's rule on LMP (+280
  days) is the formula, but the edge cases are what matter — irregular cycles, unknown LMP,
  ultrasound-based re-dating, twin pregnancies. Any tool that silently applies Naegele to an unknown
  LMP is publishing a wrong date to a pregnant user. **Require**: ACOG or NICE citation, an explicit
  "this is an estimate" statement, and an ultrasound-adjustment input. This is the highest-risk group
  in the pack.
- *Pet calorie (RER = 70 × kg^0.75; MER = RER × life-stage factor)*: needs a WSAVA-style source and
  species separation (cat vs dog factors differ).
- *TDEE / calorie / macro / sleep / steps*: formula sources exist but are contested (Mifflin-St Jeor
  vs Harris-Benedict). State which equation and why.

**B. Tax / statutory — `TAX-DATA-FEED`**
- *Stamp/transfer duty, property tax, take-home pay, capital gains*: the maths is trivial and the
  **rates are the product**. Each needs a dated table with an official source URL and an "effective
  from" date, plus a visible disclaimer that it is an estimate, not advice. Building these without
  that machinery produces a page that is wrong within one budget cycle.

**C. Finance advice boundary — `FIN-ADV`**
- *Retirement / FIRE*: the calculation is fine; the liability is implying an outcome. Frame as a
  projection with stated assumptions, never as a recommendation.

**D. Data-feed / maintenance**
- *Inflation* (CPI series), *solar / EV / energy* (tariffs), *business days* (holiday calendars),
  *moving cost* (regional rates), *golf handicap* (rule changes). Each raises maintenance from
  static to recurring.

**Missing worked examples.** The backlog specifies functionality and formula for the top 45, but
worked examples are only sketched. Each new page needs a concrete numeric example in its content
block (the audit already enforces an `example` field ≥30 chars, but a real worked example is more
than that).

### 3.4 Deliberate non-builds, re-affirmed

Gambling odds, novelty calculators, love/birthday/generator pages, password generators, JSON
formatters (D01–D04, DEV-11, DEV-12) remain **DO NOT BUILD** — unchanged by this validation.

---

## 4. Backlog recomputation

### 4.1 What changed

| Change | Effect |
|---|---|
| Coverage corrections (§2) | Four tools moved from "whitespace P1" to "differentiation P1" with an honest rationale. **None was dropped** on this basis — 1–2 competitors is still a thin market |
| Four agriculture/dev tools reclassified `unverified` | Moved from *build next* to **monitor** (`blocked_on_evidence`) — livestock feed, rainwater, irrigation, CSS clamp, rem-to-px |
| Pregnancy re-scored | Due date **53.4 → 60.0**; Ovulation **51.7 → 65.0**; Conception **48.3 → 61.6**; Weight gain **43.3 → 50.0**. Correction: coverage was overstated at 5–6, actually 2–4, which *raises* the gap score |
| Time zone re-scored | **62.3 → 55.6** (coverage 1 → 3, gap tier down) |
| Future value | Moved to `merge_first` — it collides with an existing duplicate tool |
| Triangle / right triangle, fuel consumption / gas mileage | Collapsed to one build each |

### 4.2 Separation of concerns, as required

- **Strategic tier** (`strategic_tier` column) = should we own this intent at all? P1 / P2 / monitor /
  merge-first.
- **Build order** (`build_order` column) = what ships next. Repairs, then parity, then
  differentiation, then the merged/deferred items.
- **Competitor evidence** (`competitor_evidence` = n of 7 verified + status) is never presented as
  demand.
- **Demand evidence** (`demand_evidence`) is only ever `seed`, `seed+competitor`, `competitor` or
  `inferred`. **No row claims measured demand**, because none was supplied.
- **`search_volume`, `cpc`, `rpm`, `keyword_difficulty` are `UNKNOWN` in every row.** They stay
  unknown until the Trends exports described in `report.md` §2 and a keyword-tool export exist.

### 4.3 The recomputed order

Repairs 1–3, exactly as before (they are defects). Then:

- **Parity** (market-proven, we have nothing): debt payoff, car loan, pregnancy due date, roofing,
  tile, gravel, mulch, time card, fractions, ovulation, conception, loan payoff, overtime.
- **Differentiation** (1–2 competitors, real utility): price per unit, break-even, gas mileage,
  rental yield, ROAS, conversion rate, dimensional weight, time zone, word counter, Unix timestamp,
  cooking converter, roof pitch, drywall, deck, insulation, siding, BTU, trip cost, EV charging.
- **Monitor**: livestock feed, rainwater, irrigation, CSS clamp, rem-to-px.
- **Merge-first**: future value; plus the five internal duplicates in §3.2.

Full detail with readiness (`ready` / `needs_formula` / `needs_source` / `needs_data` /
`blocked_by_merge` / `blocked_on_evidence`) in
[`revised-priority-backlog.csv`](./revised-priority-backlog.csv).

---

## 5. Change log

### 5.1 Keyword master (structural — 71 rows)

Rule applied: remove the redundant evidence token; keep the value justified by the seed list.
`col` = the field that was shifted; all rows were repaired to exactly 12 fields.

| IDs | Count | Change | Value kept |
|---|---|---|---|
| K0038, K0039, K0176, K0192, K0197, K0201, K0212, K0214, K0218, K0224, K0229, K0234, K0236, K0237, K0320, K0324, K0375, K0378, K0425, K0429, K0431, K0433, K0438, K0547, K0623, K0628, K0630, K0631, K0636, K0637, K0664, K0695, K0697, K0699, K0706, K0708, K0709, K0710, K0714, K0727, K0729, K0734, K0736, K0743, K0745, K0749, K0751, K0752, K0755, K0758, K0759, K0760, K0761, K0762, K0764, K0776, K0778 | **57** | `,seed,inferred,` → `,seed,` | seed |
| K0129, K0162, K0177, K0204, K0241, K0243, K0275, K0314, K0609, K0616, K0667, K0716, K0718 | **13** | `,seed,inferred,` → `,inferred,` | inferred (not in seed list) |
| K0247 | **1** | removed stray `bmi` token **and** `seed,` → `inferred` | inferred |

**All keyword text and all IDs are unchanged.** No row was dropped. Total remains **789**.

### 5.2 Report corrections (recorded here; `report.md` is left as the historical record)

| Location | Corrected statement |
|---|---|
| Short version #5, §6, §8 | Price-per-unit, ROAS, conversion rate, word counter and Unix timestamp were described as zero-coverage/whitespace. They are **limited coverage (1–2 competitors)**. The differentiator must be argued on execution, not absence |
| §3, §8 | Time zone was "one competitor / a real gap" — it is **three**. The gap is that *our* page is a stub |
| §6 | Break-even "three sites" → **≥2 verified** |
| §9 | "Three of my own conclusions corrected mid-run" — the true count is **considerably higher**; this document is the correction |
| §2 | Unchanged and still correct: **no calculator Trends data exists**; no volume/CPC/RPM anywhere |

### 5.3 Priority changes

| Tool | Before | After | Why |
|---|---|---|---|
| Price per unit | P1 whitespace, "zero coverage" | P1 differentiation, limited coverage | 2 competitors confirmed |
| ROAS / Conversion rate / LTV-CAC | P1 whitespace | P1 differentiation | 1–2 competitors confirmed |
| Word counter | P1 whitespace | P1 differentiation | calculatorsoup has it |
| Unix timestamp | P1 whitespace | P1 differentiation | 2 competitors |
| Time zone | P1 gap, score 62.3 | P1, score **55.6** | 3 competitors |
| Due date | P1, 53.4 | P1, **60.0** | coverage 6 → 4 |
| Ovulation | P2, 51.7 | P1, **65.0** | coverage 5 → 2 |
| Conception | P2, 48.3 | P1, **61.6** | coverage 5 → 2 |
| Pregnancy weight gain | P2, 43.3 | P2, **50.0** | coverage 3 → 2 |
| Livestock feed, rainwater, irrigation, CSS clamp, rem-to-px | build next | **monitor** | unverified, not absent |
| Future value | build next | **merge first** | collides with existing duplicate |
| Triangle + right triangle | 2 builds | **1 build** | internal duplicate |
| Fuel consumption + gas mileage | 2 builds | **1 build** | internal duplicate |

---

## 6. Residual risks and required follow-ups

1. **Re-capture omnicalculator completely** (7 of 14 categories were truncated) and
   **thecalculatorsite** (no sitemap; ~40% of pair converters unreachable). Until then no
   `confirmed_zero_coverage` claim can be made, and the five `monitor` tools cannot be decided.
2. **Run a scripted CSV validator** when the shell is restored — duplicate-ID detection, per-row
   field counts, and a byte-diff against the original. The regex oracles used here are exact for the
   checks they perform but do not replace a parser.
3. **Malformed-row risk is not evenly distributed.** All 71 defects came from two writing chunks. If
   the same content is regenerated, re-run the oracles; do not assume the file is clean because it
   looks clean.
4. **No measured demand.** Every `UNKNOWN` in the backlog is a place where a real export would change
   the order. Export the Trends batches in `report.md` §2 before the second build batch.
5. **YMYL review is not optional.** The five pregnancy/pet tools should not ship without the cited
   sources described in §3.3A — that is a product-liability decision, not an SEO one.
6. **The duplicate-slug defect is still live in the catalog** (`tip-split-calculator` declared in two
   files, emitting one URL twice). It is out of scope for this read-only pass and remains the first
   repair item.
