# Keyword Clusters — from the 2026-10-31 exports

**Inputs:** two Google Trends exports supplied by the owner, preserved verbatim in [`raw/`](./raw/):

| File | Rows | What it is |
|---|---|---|
| `raw/top-2026-10-31.csv` | 50 | Top related queries |
| `raw/rising-2026-10-31.csv` | 50 | Rising related queries |

Both files cover **Worldwide, 2026-07-31 → 2026-10-31**, and both belong to the **Scientific Calculator** seed topic. The request also asked for GPA, Mortgage, Loan, Tax, Currency, BMI and Interest seeds; **those exports were not supplied**, so nothing about them is asserted here. Their treatment stays as it was in `docs/keyword-intelligence/` (which used the earlier 2021–2026 exports).

There is no "Breakout" marker in either file. `search interest` is a relative score, not volume; `increase percent` is a change in that score.

## What the data actually says

84 unique queries after deduplication (17 appear in both files). They are not 84 opportunities — they collapse into a handful of intents, and the single largest one is not addressable.

### Cluster 1 — A competitor's brand (11 queries, ~60% of all interest)
`desmos scientific calculator` (100), `scientific calculator desmos` (100), `desmos` (100), `desmos calculator scientific` (99), `desmos calculator` (96), `desmos scientific` (97), `calculator desmos scientific` (94), `desmos graphing calculator` (10), `desmos graphing` (10), `graphing calculator desmos` (10), `desmos scientific graphing calculator` (10) — plus misspellings `desmo`, `demos`, `demos scientific calculator`, `desmo scientific calculator`.

**Decision: F — do not target.** This is navigational demand for one named third-party product. We are not Desmos and a page titled "Desmos Scientific Calculator" would be an impersonation. The underlying need — a free scientific calculator that opens in the browser — is captured by optimising our own page for the generic wording, which cluster 2 does.

### Cluster 2 — Generic online scientific calculator (11 queries)
`online scientific calculator` (22, +30%), `scientific calculator online` (21), `calculator scientific online` (20), `online calculator scientific` (20), `free scientific calculator` (7, −50%), `math calculator` (19), `online calculator` (22), `calculator online` (21), `decimal scientific calculator` (5, +170%), `scientific calculator app` (5, −30%), `scientific graphing calculator` (15).

**Decision: A — optimise the existing page.** One canonical URL (`/calculators/scientific-calculator`), retitled around "online scientific calculator", with the tool itself fixed (see `content-gap-analysis.md`). Word-order variants (`scientific calculator online`, `calculator scientific online`) are the same intent and get no separate URL.

### Cluster 3 — Scientific notation (5 queries)
`scientific notation calculator` (15, +170%), `scientific notation` (15, +170%), `scientific notation converter` (0, +150%), `write in scientific notation calculator` (2, +350%), `how to do scientific notation on calculator` (1, +400%).

**Decision: C + D — build.** One calculator covers conversion and arithmetic; the how-to wording is answered on the page and in the guide. Interest 15 with +170% is the strongest *addressable* signal in either file.

### Cluster 4 — Significant figures (1 query)
`sig fig calculator` (0, +500%).

**Decision: C — build.** Low absolute interest but a real, self-contained calculation job, sharply rising, and absent from calculator.net's published sitemap. Cheap to do correctly.

### Cluster 5 — How-to and definition (2 queries)
`how to use scientific calculator` (5, +70%), `what is a scientific calculator` (11, +110%).

**Decision: D — guide.** Neither is a calculator; both are answered by one guide.

### Cluster 6 — Physical devices and buying (17 queries)
`casio` family (48–49 each, **−70%**), `texas instruments` family (7, −80%), `ti 84` / `ti84` / `scientific calculator ti 84` (2, +250%), `non-programmable scientific calculator` (2, +250%), `non graphing scientific calculator` (1, +150%), `scientific calculator fx 991` (2, +170%), `casio fx-991cw classwiz…` (1, +1050%), `best scientific calculator` (11, −40%), `best scientific calculator for engineering students` (1, +250%), `scientific calculator price` (12, −5%), `how much is a scientific calculator` (2, +160%), `buy scientific calculator` (4, +20%), plus brand-navigational `google calculator` (7, −9%).

**Decision: F / deferred.** Purchase intent for hardware we do not sell. A buyer's guide is defensible but every claim in it (current models, prices, exam approval) is a fact that changes and must be verified — writing it from memory would be exactly the thin, invented content we are trying to avoid. Deferred with the reason recorded, not silently dropped.

Note the direction of travel: the Casio and Texas Instruments families are falling 70–80% in this window while generic "online scientific calculator" is rising 30–40%. That supports the browser-tool strategy over device content.

### Cluster 7 — Solvers and adjacent tools (3 queries)
`math solver` (13, +140%), `maths solver` (5, +100%), `periodic table` (1, +160%).

**Decision: C / monitor.** "Math solver" is equation *solving*, which our expression evaluator does not do. It needs a real solver (linear systems, step-by-step algebra) — queued, not faked with a keyword page. `periodic table` is reference data, not a calculation; a separate product decision.

### Cluster 8 — Irrelevant (7 queries)
`ixl`, `delta math`, `deltamath`, `studentvue` (school portals), `joinus scientific calculator` (another brand), `calc` (too ambiguous), `caculator` (misspelling of a term already targeted).

**Decision: F — ignore.** No page. Misspellings never earn their own URL.

## Scoring model (internal, 100 points)

| Component | Max | What it measures |
|---|---|---|
| Trends growth signal | 20 | Growth in the export, discounted when the base is near zero |
| Relevance to Total Calculation | 20 | Can a calculator or guide honestly answer it |
| Ability to satisfy the intent | 20 | Can we actually solve the underlying job |
| Existing site readiness | 15 | Does the right page already exist |
| Competitive opportunity | 15 | Is the intent already well served |
| Practical business value | 10 | Does it bring a user who does a calculation |

Ties were broken by implementation cost. The per-query scores are in [`trends-opportunity-map.csv`](./trends-opportunity-map.csv). This is a decision tool, not a Google metric, and no search volume is assigned anywhere.
