# 25-Article Launch Plan

**Status: editorial candidates only. Nothing here is registered, published, or scheduled.** This
map follows the existing `Guide` content model; it does not require a CMS or a new publishing
system. The row-by-row working data is in [25-article-launch-plan.csv](./25-article-launch-plan.csv).

## Evidence and deduplication rules

- The source pack contains 789 candidate keyword rows. The original
  [keyword-master.csv](../keyword-intelligence/keyword-master.csv) has 71 malformed rows with
  shifted fields; mappings therefore use the aligned
  [keyword-master-validated.csv](../keyword-intelligence/keyword-master-validated.csv). “Validated”
  means the row fields are aligned, not that search demand has been measured.
- Competitor statements use the corrected
  [validation findings](../keyword-intelligence/validation-findings.md),
  [corrected opportunity review](../keyword-intelligence/corrected-opportunity-review.csv), and
  [revised priority backlog](../keyword-intelligence/revised-priority-backlog.csv) ahead of older
  claims in [competitor-gaps.csv](../keyword-intelligence/competitor-gaps.csv) and
  [tool-opportunities.csv](../keyword-intelligence/tool-opportunities.csv). For example, the old
  gaps table calls price-per-unit coverage zero, while the corrected review verifies two
  competitors; break-even counts also conflict between older captures. Counts are labeled
  historical and not presented as a current search-results-page check.
- No Calculate Daily search volume, CPC, keyword difficulty, Google Trends, or Search Console
  metrics are available. The SASSA-related Trends exports are unrelated and excluded.
- Existing useful routes are retained rather than duplicated: debt payoff, compound interest,
  percentages, date planning, home renovation, cooking by weight, loan payment, savings goal,
  subscription total, ROI/CAGR, standard deviation, and mean/median/mode. Where adjacent queries
  have one underlying intent, the plan improves one existing page or combines them into one guide.
- The specific APR-versus-interest-rate candidate was not retained: no exact validated keyword row
  for that proposed intent was located. It is replaced by the supported mean/median/mode
  opportunity (K0351-K0353, MAT-08).

## Candidate map

| ID | Candidate | Evidence mapping | Content action | Priority / batch |
|---|---|---|---|---|
| E01 | Compare price per unit across package sizes | K0229-K0233 · FIN-75 | New guide beside existing calculator | P1 · Batch 1 |
| E02 | Break-even units, revenue, and contribution margin | K0182-K0185 · FIN-57 | New guide beside existing calculator | P1 · Batch 1 |
| E03 | Credit-card payoff and debt strategies | K0065-K0074 · FIN-17/18/19 | Improve existing debt-payoff guide | P1 · Batch 2 |
| E04 | Loan and car-loan cost: payment versus total repayment | K0045-K0059 · FIN-12/13/14 | Add content to existing loan-payment page; no auto-specific claims without matching inputs | P1 · Batch 2 |
| E05 | Gross rental yield and rental cash flow | K0165-K0170 · FIN-50/51 | One new guide; wait for an appropriate calculator or publish without implying one exists | P1 · Batch 3 |
| E06 | ROAS definition and calculation | K0197-K0200 · FIN-62 | New guide after the planned tool and measurement review | P1 · Batch 3 |
| E07 | Conversion rate and denominator choice | K0201-K0203 · FIN-63 | New guide after the planned tool and measurement review | P1 · Batch 3 |
| E08 | Simple versus compound interest | K0082-K0089 · FIN-23/24 | Improve existing compound-interest guide | P1 · Batch 2 |
| E09 | Monthly savings needed for a target | K0112-K0115 · FIN-32 | Add content to existing savings calculator page | P2 · Batch 2 |
| E10 | Timesheets, breaks, overnight shifts, and decimal hours | K0464-K0469 · TME-08/09 | New focused guide; trim the overlapping section in the existing date-planning guide | P1 · Batch 1 |
| E11 | Overtime arithmetic and jurisdictional limits | K0138-K0141 · FIN-41 | New guide only after tool scope and legal/regional review | P1 · Batch 3 |
| E12 | Fraction arithmetic and fraction/decimal/percent conversions | K0337-K0345 · MAT-03/04/05 | New fraction-focused guide; keep broad percentage explanations on the existing guide | P1 · Batch 1 |
| E13 | Percentage change versus percentage points | K0327-K0336 · MAT-01/02 | Improve existing percentages guide and calculator page | P2 · Batch 2 |
| E14 | Sample versus population standard deviation | K0348-K0350 · MAT-07 | New guide beside the existing statistics calculator | P2 · Batch 1 |
| E15 | Roofing material estimates | K0502-K0505 · CON-08 | New guide only after the roofing tool and manufacturer checks | P1 · Batch 3 |
| E16 | Gravel, mulch, and topsoil estimates | K0524-K0532 · CON-16/17/18 | One landscaping section in the existing home-renovation guide; no three near-duplicate guides | P2 · Batch 3 |
| E17 | Tile quantities, boxes, and waste | K0499-K0501 · CON-07 | New tile guide only with a dedicated tile tool; otherwise a section in home-renovation guide | P2 · Batch 3 |
| E18 | Cooking weight versus volume conversions | K0601-K0605 · CNV-18 | Improve the existing cooking-by-weight guide | P2 · Batch 2 |
| E19 | Dimensional weight for parcels | K0226-K0228 · FIN-74 | New guide after a tool and current carrier-source verification | P1 · Batch 3 |
| E20 | ROI versus CAGR | K0096-K0101 · FIN-27/28 | New comparison guide linked to both existing tools | P2 · Batch 3 |
| E21 | CPC and CPM calculations | K0204-K0206 · FIN-64 | New guide only after fresh competitor review and tool scoping | P3 · Batch 4 |
| E22 | Commission calculations | K0179-K0181 · FIN-56 | New guide after a commission tool and contract-scope review | P3 · Batch 4 |
| E23 | Gross profit versus net profit | K0186-K0188 · FIN-58 | Concise content on the existing markup/margin page or future profit tool | P2 · Batch 3 |
| E24 | Monthly and annual subscription cost | K0177-K0178 · FIN-55 | Add examples to the existing subscription-total calculator page | P3 · Batch 4 |
| E25 | Mean, median, and mode | K0351-K0353 · MAT-08 | Improve the existing statistics calculator page | P2 · Batch 3 |

The full CSV also records primary and supporting queries, audience/problem, current link targets,
competitor evidence, overlap, source/review requirements, unknown metrics, and the proposed
publication batch.

The CSV includes a supplemental E26 graphing-calculator content opportunity. It is a
calculator-page improvement, not a 26th standalone article: no exact local query row or intent
cluster was verified, and a separate guide would overlap the calculator's primary intent.

## First five drafts

Drafts are intentionally outside `src/data/guides/`, are marked unpublished/noindex, and are not
added to the guide registry:

1. E01 — **price per unit**, primary query `price per unit calculator`.
2. E02 — **break-even point**, primary query `break even calculator`.
3. E10 — **timesheets and overnight hours**, primary query `time card calculator`.
4. E12 — **fraction arithmetic**, primary query `fraction calculator`.
5. E14 — **standard deviation**, primary query `standard deviation calculator`.

Each draft uses the site's `Guide` shape and includes editorial source/review notes. Before
publication, assign a real author and factual reviewer, resolve each note, approve overlap changes,
and run the calculator audit/build. In particular, the Federal Trade Commission unit-pricing page
returned HTTP 403 to the available fetcher; its link is supplied for manual verification, not
represented as reviewed content.
