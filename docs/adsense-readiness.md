# AdSense Readiness and Ranking Audit

> **Date:** 2026-11-14 (site work started 2026-11-13)
> **Scope:** all generated pages (327 public, 294 embed shells), the catalogue audit,
> the formula test suite, the sitemap, robots, structured data, the trust pages, and
> the Search Console exports (pages, queries, countries, indexing).
> **Verdict:** the content and compliance surface is ready to be reviewed. Two launch-time
> items remain and both are publisher-side settings, not code: a Google-certified consent
> management platform, and the ad code itself. Nothing here guarantees approval.

## Apply, or wait?

**Apply - but deploy this build first, then submit. Do not wait for more traffic.**

The reasoning, from the Search Console export:

| Signal | Value | What it means |
| --- | --- | --- |
| Impressions (pages export) | 41,598 across 266 pages | The site is already being shown. It is not waiting for discovery. |
| Clicks (pages export) | 14 | CTR of 0.03%, which is what positions 30-90 look like, not a quality problem. |
| Average position | 35.9 (pages), 65.5 (queries) | 75 pages sit at position 51+; 787 of 1,000 queries sit at 51+. |
| Indexing | 142 discovered-not-indexed, 6 crawled-not-indexed | Pages known but not crawled. |
| Never crawled | 16 URLs (last crawled 1970-01-01) | Including `/guides` and `/guides/how-to-use-a-scientific-calculator`. |
| US | 10,146 impressions at position 46.5 | The money market is page 4-5. |

AdSense review is judged on content quality, policy compliance, and site behaviour, not on
traffic. A site with 41k monthly impressions is eligible for monetisation today; a site with
no impressions is equally eligible, but earns nothing. Waiting for traffic before applying
would forfeit months of ad revenue on impressions the site is already receiving, and the
traffic work is not blocked by being under review.

The one condition: apply with the current build deployed, because the live build is missing
the Disclaimer page and the advertising-cookie disclosure in the Privacy Policy - the exact
things a reviewer looks for.

## Score

| Category | Weight | Score | Notes |
| --- | --- | --- | --- |
| Calculator functionality and usefulness | 25 | 24 | 294 tools, formulas audited, boundary-probed, undefined results now explained. |
| Content quality and originality | 20 | 18 | Median 4,251 characters, zero duplicate descriptions, all 10 guides now indexable. |
| Policy compliance and transparency | 20 | 18 | Disclaimer, advertising disclosure, methodology, publisher identity, `ads.txt`. CMP cannot be verified until configured. |
| Technical SEO | 15 | 14 | Canonicals, sitemap, robots, structured data and internal links verified on every build. 3 titles over 70 characters. |
| UX and mobile experience | 10 | 9 | Bounded inputs with announced clamps, responsive layouts, accessible controls. No measured field data. |
| Trust and website completeness | 10 | 9 | About and methodology, contact, privacy, terms, disclaimer, savings-goal, corrections process. |
| **Total** | **100** | **92** | |

The remaining 8 points are not content: consent configuration that only exists once AdSense
is live, unmeasured Core Web Vitals, and the last title lengths.

## What the search data showed, and what was done about it

### 1. Zero clicks at good positions - the snippet never answers the question

Brazil, Russia, Bangladesh and Indonesia all sit at position 17-18 with a 0% CTR. At those
positions a title and description that state the answer are worth several times a description
that describes the tool. The competitors ranking for "kg to lbs" answer in the snippet
("Multiply the kilograms by 2.20462 to get pounds... 5kg = 11.023lbs") and put a table
underneath; our descriptions said what the tool does, not what the answer is.

Fixed on 49 pages: titles and descriptions now carry the number. `Kg to Lbs Converter - 1 kg =
2.20462 lb`, `Minutes to Hours Converter - 60 min = 1 hr`, `Credit Card Interest Calculator -
Monthly Cost`, and so on. Every title keeps its head term first and now adds the answer or the
method after a dash.

### 2. Twelve thousand impressions on conversion pages that ranked 45-90

`meters-to-feet` (3,656 impressions, position 65.6), `miles-to-km` (2,216 at 53.9), `kg-to-lbs`
(1,798 at 53.3), `mph-to-kph` (1,379 at 43.1), `grams-to-ounces` (1,242 at 62.8), `km-to-miles`
(1,216 at 46.9), `gallons-to-liters` (1,078 at 57.5), `cm-to-inches` (934 at 45.1). Every
`x to y` query the site could answer was sitting on page three or worse, with no clicks.

Fixed with a shared component (`src/components/common/ConversionReference.tsx`) that renders
on every unit converter page:

- A **Quick Answer** line - `1 kg = 2.20462 lb`, computed from the exact factor in the unit
  group, not typed in.
- A **Common Conversions** table of the values people actually look up (a person's weight, a
  road distance, a can of beer), for the unit pair the page opens with.

The table is server-rendered, so it is in the HTML a crawler reads, and it differs per unit
pair, so the pages are no longer near-duplicates of each other. The same page also gained a
title and description that state the factor.

### 3. `credit-card-interest`: 1,307 impressions at position 81.5

A money page in the position band where Google applies its "Your Money Your Life" bar. Deepened:
four new FAQs (APR vs APY, grace period, what paying down $1,000 saves, why a statement
differs), a worked example that shows the effect of paying $500 down, and two CFPB sources so
the page shows where the method comes from.

### 4. Five guides were finished but not indexable

`bmi-body-fat-weight`, `running-pace-training-zones`, `tdee-macros-complete`,
`debt-payoff-strategy` and `compound-interest-savings` were `noindex`/`pending`. Each was read
and its numbers re-checked against the calculators and against independent arithmetic:
the compound-interest scenarios ($280,968 vs $243,994 at 7% monthly, $19,672 at 10 years), the
running pace derivation from a 25-minute 5K, the TDEE multipliers and the Mifflin-St Jeor
coefficients, and the credit-card interest of $83.33 on $5,000 at 20%.

All five now carry `status: 'index'` and `reviewStatus: 'reviewed'`. Two figures were corrected
in the process (daily compounding of $10,000 at 7% for 10 years is $20,136, not $20,137; the
normal BMI band for a 5-foot-10 man runs 129 to 174 pounds, not 150 to 180). Indexable pages
and sitemap URLs: 321 to 326.

### 5. Category pages that were a line and a list

Each of the 12 category pages now opens with a category-specific introduction: what the tools
share, how the maths is done, and where the model stops being a good guide. The shortest
category page went from 1,027 to 1,525 characters.

### 6. The chunk that looked like a performance problem but was not

The `core-*.js` chunk (627 KB raw) is ECharts and zrender, loaded on demand by the charting
pages only. The chunk every page loads is the entry bundle at 166 KB raw / 50 KB gzip. No
change was made; the earlier note in this file that called it a core-bundle LCP risk was wrong.

## What was measured

Collected from a fresh `npm run build` output in `dist/`.

| Measurement | Result |
| --- | --- |
| Generated pages | 621 (327 public + 294 embed shells) |
| Indexable pages / sitemap URLs | 326 / 326, identical sets |
| Median main-text length | 4,251 characters |
| Public pages under 1,200 characters | 2 (`404.html` at 66, `contact.html` at 1,168) |
| Duplicate meta descriptions | 0 |
| Descriptions outside 70-160 characters | 0 |
| Titles over 60 characters | 45 (3 over 70) |
| `<h1>` per page | exactly 1 on every page |
| Images without `alt` | 0 of 326 |
| `lang`, viewport | present on every page |
| JSON-LD | `WebApplication`, `BreadcrumbList`, `FAQPage` per calculator; `Article` per guide |
| JavaScript | entry bundle 166 KB raw / 50 KB gzip; ECharts 627 KB raw, loaded only on chart pages |
| CSS | 82 KB, one file |

Gates that ran clean on this build: `npx tsc --noEmit`, `npm run audit` (638 PASS / 0 FAIL),
`npm test` (187 + 24 pass), `npm run build` (prerender audit + domain-migration audit passed).

## Calculator verification

- 294 catalogue entries: 170 `config`, 86 `custom`, 38 `converter`.
- Every config result is evaluated by `npm run audit`; a non-finite result on defaults fails the build.
- Inputs are clamped to declared `min`/`max` by `parseBoundedNumber`, and the clamp is announced.
- A boundary probe ran 1,080 checks at the declared minimum and maximum of every field. 38
  returned a non-finite value and all 38 are legitimate: zero denominators (`roi`, `cagr`,
  `markup-margin`, `overtime`, `swim-pace`, `stair`), probability odds at 0 or 1, a `slope` with
  two identical points, complex quadratic roots, exponential overflow at an absurd maximum, and
  `retirement` at its ceiling. They render as "Not calculable" and the result panel now says why.
- Known limitation: coverage is by audit defaults, boundary probes, and hand-computed cases in
  `src/lib/*.test.ts` - not one reference value per formula for all 170 config entries.

## Trust pages

| Page | State |
| --- | --- |
| `/about` | About & Methodology: formulas, testing, dated sources, corrections, limitations, publisher identity |
| `/contact` | Working mailbox, what to include in a report, what the inbox is and is not for |
| `/privacy` | Discloses Google advertising cookies, the publisher ID, opt-out links, and the consent position for the EEA, UK and Switzerland |
| `/terms` | Limitation of liability, advertising and third-party links, privacy, embeds |
| `/disclaimer` | Estimates not advice per domain, assumptions, sources, corrections, currency, advertising |
| `/savings-goal` | Hand-written feature page |

The footer carries the estimates disclaimer on every page and links to `/disclaimer`.

## Critical blockers

None of these are content defects; they are launch steps.

1. **Consent management platform.** A Google-certified CMP must be configured in AdSense
   (Privacy & messaging) before ads serve in the EEA, the UK, or Switzerland. It is a
   publisher-side setting; there is no CMP code in this repository.
2. **Ad code.** No ad script ships today. The AdSense snippet (or Auto ads) has to be added
   once the account is approved, and placement must keep ads clear of the result panel,
   labelled as advertising, and never styled to resemble a calculator control.
3. **Ownership verification.** Confirm AdSense can verify the site (ads.txt crawl or the
   verification snippet) after deploying this build, then re-fetch
   `https://www.totalcalculation.com/ads.txt`.
4. **Deploy.** The live site runs the `030aa14` build. It has no Disclaimer page and no
   advertising-cookie disclosure. Deploy before submitting, then resubmit the sitemap in Search
   Console (it will carry 326 URLs and the 2026-11-13/14 lastmod dates) and run `npm run indexnow`.

## Optional improvements

- Push the 142 discovered-not-indexed pages: the 2026-11-13/14 `lastmod` dates plus IndexNow
  should trigger a recrawl; request indexing for the top 30 URLs in Search Console as well.
- Trim the 3 titles still over 70 characters.
- Finish the `/guides` listing page: it has never been crawled and the guide pages are the
  best-performing content on the site (`home-renovation-math-guide` sits at position 7.5).
- Add reference-value assertions for the highest-traffic config formulas.
- Measure real Core Web Vitals in the field (PSI quota was exhausted during this audit).
- Consider dedicated landing pages for long-tail conversion queries ("5 feet in inches"), the
  usual programmatic step - but only with genuinely different content, not a template swap.

## Honest readiness estimate

Deploy this build, add the CMP, submit. Review typically takes days to a few weeks, and the
ranking work above continues in parallel - it is not blocked by being under review, and content
improvements after approval do not affect an approval already granted.

Expect the first month to be about the same traffic as the export shows, with clicks rising as
the answer-in-the-snippet and the conversion tables take effect. The review outcome depends
more on ad placement and density than on the calculator library, which is the strongest part
of the site.

## Changes made in this pass

| File | Change |
| --- | --- |
| `src/components/common/ConversionReference.tsx` | New: quick answer plus common-value table on every unit converter page |
| `src/components/common/ToolInfoSection.tsx` | Renders the reference block |
| `src/pages/CalculatorPage.tsx` | Passes the unit pair a converter page opens with |
| `src/data/catalog/conversion.ts` | 28 titles and descriptions rewritten around the exact factor |
| `src/data/catalog/math.ts`, `finance.ts`, `other.ts`, `time.ts`, `foodAndAuto.ts`, `sportsAndHome.ts` | 21 titles and descriptions rewritten around the answer or the method |
| `src/data/catalog/finance.ts` | Credit card interest page: four FAQs, longer worked example, two CFPB sources |
| `src/data/guides/individual/*.ts`, `src/data/guides/index.ts` | Five guides reviewed and flipped to index; four titles trimmed; two figures corrected |
| `src/data/categories.ts`, `src/pages/CategoryPage.tsx` | Per-category introductions |
| `src/pages/DisclaimerPage.tsx` | New disclaimer page |
| `src/pages/PrivacyPage.tsx`, `TermsPage.tsx`, `ContactPage.tsx`, `src/components/AboutSection.tsx` | Trust and advertising disclosure |
| `src/components/calculators/ConfigCalculator.tsx` | Explains undefined results |
| `src/lib/router.tsx`, `src/App.tsx`, `src/lib/pageRegistry.ts`, `scripts/prerender.ts` | `/disclaimer` route, static page, sitemap, `lastmod`, priority |
| `src/components/Footer.tsx` | Disclaimer link on every page |
| `docs/launch-checklist.md` | AdSense gate added |
