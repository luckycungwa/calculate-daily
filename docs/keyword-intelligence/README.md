# Keyword Intelligence & Calculator Expansion — Research Pack

This folder holds the evidence and deliverables of the Calculate Daily keyword-intelligence
research loop. **Nothing here changes production code, routes, or the catalog.** Findings are
proposals until they are accepted into `docs/research-and-roadmap.md` and implemented.

## At a glance

| | |
|---|---|
| Tools verified in the catalog | **170** (but only **169 distinct URLs** — one slug is declared twice) |
| Tools indexable without review | **113** of 170 |
| Duplicate URLs to consolidate | **8** |
| Keyword opportunities mapped | **789** |
| Intent clusters | **293** |
| Candidates scored | **168** |
| Verified competitor-gap assertions | **95** across **7** competitors |
| Backlog items sequenced | **45** (3 repairs + first 20 + batches) |
| Measured demand data supplied | **none** — see `report.md` §2 |

## What is in here

| File | What it answers |
|---|---|
| [`report.md`](./report.md) | The full research report: verified inventory, trends position, competitor gaps, scoring, first 20 builds, quality gate, future loop. Start here. |
| [`methodology.md`](./methodology.md) | How every number and score in this pack was produced, what evidence would raise confidence, and how to re-run the loop. |
| [`tool-inventory.csv`](./tool-inventory.csv) | The verified 170-tool inventory read from `src/data/catalog/*.ts`, with duplicate/overlap flags and indexation state. |
| [`keyword-master.csv`](./keyword-master.csv) | The normalized keyword/opportunity database. |
| [`intent-clusters.csv`](./intent-clusters.csv) | Queries merged into search-intent clusters, each mapped to one URL decision. |
| [`competitor-gaps.csv`](./competitor-gaps.csv) | Tool-level coverage versus seven competitors, with evidence URLs. |
| [`tool-opportunities.csv`](./tool-opportunities.csv) | Candidate tools/features scored on the published rubric. |
| [`priority-backlog.csv`](./priority-backlog.csv) | The ranked build order: first 20, then batches. |
| [`decisions-log.csv`](./decisions-log.csv) | Decisions already made (merge, noindex, do-not-build) so they don't reappear without new evidence. |
| [`keyword-master-validated.csv`](./keyword-master-validated.csv) | Validated copy of the keyword database — 789 rows, IDs and keyword text preserved, field alignment repaired. |
| [`validation-findings.md`](./validation-findings.md) | The pre-implementation validation pass: defects found, coverage reconciliation, tool audit, recomputation, change log. **Read with `report.md`.** |
| [`corrected-opportunity-review.csv`](./corrected-opportunity-review.csv) | All 168 candidates with corrected coverage status, duplication checks and readiness flags. |
| [`revised-priority-backlog.csv`](./revised-priority-backlog.csv) | Recomputed build order: strategic tier separate from build order, all unknown metrics marked. |
| [`first-batch-readiness.csv`](./first-batch-readiness.csv) | Readiness review of the 7 first-batch candidates: overlap, formula, edge cases, acceptance tests, decision. |
| [`csv-integrity-validation.md`](./csv-integrity-validation.md) | Executed CSV checks, the limits of what could be proven, and a runnable validation script. |
| [`raw/`](./raw/) | Untouched competitor sitemap/index evidence captured during the run. |

Production integrity (indexation gate, duplicate slug, deployment state) is audited separately in
[`../production-integrity-audit.md`](../production-integrity-audit.md).

## Ground rules this pack follows

1. **No invented metrics.** No search volume, CPC, RPM, or keyword-difficulty figure appears
   anywhere unless a source supplied it. Where commercial data is missing the value is `unknown`
   and the way to obtain it is named.
2. **Coverage is not demand.** A competitor having a tool is evidence someone searched for it;
   it is not proof of volume. The two are scored separately.
3. **One tool per intent.** Synonyms are merged into clusters; only materially different
   functionality earns a new URL.
4. **Indexation is earned.** Every proposed page must pass the quality gate in `report.md`
   before it is allowed into the sitemap.
