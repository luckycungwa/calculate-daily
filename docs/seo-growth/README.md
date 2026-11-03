# SEO Growth Loop — 2026-10-31 cycle

This folder is the working record of the search-growth loop for Total Calculation. It replaces
nothing: the earlier research lives in [`../keyword-intelligence/`](../keyword-intelligence/) and the
strategy in [`../research-and-roadmap.md`](../research-and-roadmap.md). Where the two disagree, this
folder is newer and says so.

## What happened in this cycle

The two Trends exports supplied (both **Scientific Calculator**, Worldwide, 2026-07-31 → 2026-10-31)
were read, deduplicated to 84 unique queries, classified A–F, scored, and matched against the real
catalogue of 292 calculators. The cluster's genuine gaps were then built:

- **Scientific Notation Calculator** — `/calculators/scientific-notation-calculator` *(new)*
- **Significant Figures Calculator** — `/calculators/significant-figures-calculator` *(new)*
- **Scientific Calculator** — `/calculators/scientific-calculator` *(repaired + rewritten)*
- **How to use a scientific calculator** — `/guides/how-to-use-a-scientific-calculator` *(new)*

While auditing, three technical defects were found and fixed, the most serious being that **every one
of the 614 prerendered pages shipped the home page's meta description**.

## The files

| File | What it answers |
|---|---|
| [`baseline-audit.md`](./baseline-audit.md) | What the site actually is, verified counts, and the defects the audit found |
| [`calculator-inventory.csv`](./calculator-inventory.csv) | One row per calculator: indexability, dates, FAQ/formula counts, inbound links *(generated)* |
| [`trends-opportunity-map.csv`](./trends-opportunity-map.csv) | All 84 unique queries with intent, existing page, classification, score and status |
| [`keyword-clusters.md`](./keyword-clusters.md) | How the 84 queries collapse into 8 intents, and the decision for each |
| [`competitor-analysis.md`](./competitor-analysis.md) | Verified competitor coverage, what our pages must do to beat "another converter" |
| [`content-gap-analysis.md`](./content-gap-analysis.md) | The eight priority clusters: what exists, what is missing, what was done |
| [`technical-seo-audit.md`](./technical-seo-audit.md) | Canonicals, indexability, titles, sitemap, schema, prerendering, internal links |
| [`implementation-roadmap.md`](./implementation-roadmap.md) | What shipped, what is next, and what is deliberately not planned |
| [`change-log.md`](./change-log.md) | Every file changed, with before → after numbers |
| [`qa-report.md`](./qa-report.md) | Commands run, results, and what was **not** tested |
| [`raw/`](./raw/) | The two source exports, preserved verbatim |

## Ground rules

1. **No invented data.** No search volume, CPC, difficulty, click or impression figure appears
   anywhere. Trends `search interest` is a relative score and is labelled as one. Where data is
   missing the answer is "not measured", with the command or access that would measure it.
2. **One intent, one URL.** Word-order and spelling variants never earn a page; they are merged into
   the canonical tool and recorded as merged.
3. **Brand demand is not our demand.** The largest cluster in both exports is a competitor's brand
   (Desmos). It is classified F and left alone. Network access is not an excuse to impersonate.
4. **The tool is the product.** Content supports a working, tested calculation; it never replaces one.
5. **Numbers are generated.** `calculator-inventory.csv` is written by `scripts/seo-inventory.ts`
   (`npm run seo:inventory`), so a stale doc is visible as a stale CSV rather than a wrong sentence.

## Re-running the loop

```bash
# 1. drop new exports into raw/ with the cycle date in the name
npm run seo:inventory       # refresh the inventory
npm run audit               # content completeness gate
npm test                    # maths and routing tests
npm run build               # prerender + SEO audits
```

Then classify the new queries against `trends-opportunity-map.csv`, re-score, and append to
`implementation-roadmap.md`. Do not overwrite a previous cycle's map — the history is the point.
