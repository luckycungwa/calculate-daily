# Implementation Roadmap

Ordered by the score in [`trends-opportunity-map.csv`](./trends-opportunity-map.csv), then by cost. "Score" is the internal 100-point model in `keyword-clusters.md`; it is not a ranking prediction.

## Shipped in the 2026-10-31 cycle

| # | Work | URL / file | Score | Evidence |
|---|---|---|---|---|
| 1 | Scientific Notation Calculator (converter + arithmetic) | `/calculators/scientific-notation-calculator` | 95 | `scientific notation calculator` 15, +170% |
| 2 | Significant Figures Calculator (count + round) | `/calculators/significant-figures-calculator` | 88 | `sig fig calculator` +500%; absent from calculator.net's sitemap |
| 3 | Scientific calculator: parser fixed, EE key, content rewritten | `/calculators/scientific-calculator` | 81 | `online scientific calculator` 22, +30% |
| 4 | Guide: how to use a scientific calculator | `/guides/how-to-use-a-scientific-calculator` | 82 | `how to use scientific calculator` +70%, `what is a scientific calculator` 11, +110% |
| 5 | Internal links into the cluster | 4 catalogue entries | — | 69 pages had zero inbound links |
| 6 | Metadata defects fixed (descriptions, shell reuse, audit memory) | `scripts/prerender.ts`, `scripts/audit-prerender.ts` | — | `baseline-audit.md` D1–D3 |

## Next cycle — highest value first

### N1. GPA builder (score ~70, large intent, weak current tool)
Turn `/calculators/gpa-calculator` into a real semester GPA builder: dynamic course rows, letter-grade → point mapping with selectable scales (4.0, 4.3, weighted +1.0), cumulative GPA across terms, and an explicit statement of the scale assumed. The current two-number tool cannot serve "compute my semester GPA", which is what the page is about.
*Acceptance:* rows add/remove, GPA recomputes on edit, unit tests for weighted vs unweighted, no GPA scale presented as universal.

### N2. Equation solver (score ~67)
`math solver` (13, +140%) and `maths solver` (5, +100%) want **solving**, not evaluating. A linear/quadratic system solver with steps reuses `advancedMath` helpers and would not duplicate `quadratic-formula-calculator` (which solves a single quadratic) if it handles systems and shows work.
*Guard:* do not ship a "solver" that is just an expression evaluator with a different title.

### N3. Logarithm page (score ~55)
`log` and `ln` currently exist only inside the scientific calculator. A dedicated page can cover base changes, log rules, and the log-vs-ln confusion. Not prioritised this cycle because neither export showed log demand.

### N4. Internal linking sweep (score n/a — catalogue-wide)
65 calculators still have zero contextual inbound links. Mechanically: for each, add 1–3 genuine related links from sibling tools in the same intent cluster. No reciprocal-link spam; each link should describe a real next step. The inventory CSV lists exactly which slugs.

### N5. Icons/formula documentation for 7 calculators
`formulaDescription` is empty or a placeholder on 7 `config` entries. Each needs the actual formula in words plus a worked example — the pattern already used by the reviewed tools.

### N6. Review the 6 pending guides
Half the editorial surface is noindex. Either complete the source/review checks and publish, or fold the content into a live guide. Leaving them unreviewed indefinitely wastes the work.

## Deliberately not planned

| Item | Why |
|---|---|
| Desmos / Casio / TI brand pages | Impersonation risk; the demand is navigational to a third party |
| State-test calculator pages (VA/GA/NC) | Assessment policy changes per state and per year; a wrong answer misleads a student in an exam |
| Buyer's guides with prices | Every figure would need re-verification; thin affiliate content is the failure mode described in the brief |
| Income-tax calculator without a jurisdiction | Rates change annually and require an official source plus a maintenance owner |
| Translated clones of existing calculators | Duplicate content across locales without genuinely localised formulas |

## How the next cycle starts

1. Drop the new Top/Rising exports into `docs/seo-growth/raw/` with the cycle date in the filename.
2. `npm run seo:inventory` to refresh the inventory.
3. Diff the new query set against `trends-opportunity-map.csv` — new rows get classified, existing rows keep their history.
4. Re-score and update this roadmap; never overwrite the previous map (append with a new cycle file or a `cycle` column).
5. Implement, then re-run `npm run audit && npm test && npm run build`.
