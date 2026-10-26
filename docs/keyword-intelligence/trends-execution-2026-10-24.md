# Worldwide Search-Trend Intake and Execution

**Source:** the two user-supplied Worldwide query exports covering 2021-10-24 through 2026-10-24. Original CSVs are preserved under [`raw/`](./raw/).

## How to read the data

The export's `search interest` is a relative interest score, not monthly searches, clicks, or a forecast. `Increase percent` indicates change in the export's comparison window; it does not establish commercial value or future growth. The exports provide no CPC, keyword difficulty, conversion rate, country-level segmentation, or Search Console performance. Worldwide mixes distinct lending markets and terminology.

Do not treat a score such as 100 as 100 searches. Do not multiply these scores into an organic-traffic forecast. Use them to prioritize which existing tasks to serve and which distinct tools to investigate.

## Query groups and actions

| Query cluster | Supplied signal | Canonical page/action | Status |
| --- | --- | --- | --- |
| Home loan / mortgage EMI | `loan calculator home` 100, `home loan calculator` 97, each +30%; home-loan EMI rows 24-25, +40-50% | Improved the existing `/calculators/mortgage-calculator`; no duplicate home-loan URL | Implemented |
| General loan / EMI | EMI variants score 65-69, +50-70%; `loan payment calculator` 28, +10% | Improved the existing `/calculators/loan-payment-calculator` with EMI language; one canonical general tool | Implemented |
| Car financing | `car loan calculator` 76, -7%; `car loan EMI calculator` 12, +60% | Added `/calculators/car-loan-calculator` with vehicle price, fees, down payment, trade-in equity, APR, and term | Built; pending review/noindex |
| Personal loan | `personal loan calculator` 42, +30%; personal-loan EMI 13, +60% | Added `/calculators/personal-loan-emi-calculator` to compare net proceeds after the entered origination fee with repayments | Built; pending review/noindex |
| Gold-backed lending | `gold loan calculator` 6, +130%; gold-loan EMI 1, +120% | Added `/calculators/gold-loan-emi-calculator`; price, purity, and LTV are user-entered assumptions, not live valuations | Built; pending review/noindex |
| Monthly investment / SIP | `sip calculator` 2, +450% | Extended the existing `/calculators/compound-interest-calculator` to explain fixed monthly contribution scenarios; clearly disclaims fund-performance prediction | Implemented |
| Home-loan prepayment | Rising query score 1, +110% | Improved the existing `/calculators/amortization-schedule-calculator`, which models extra monthly payments | Implemented |
| Business loan EMI | `business loan emi calculator` 1, +120%; `business loan calculator` 7, +50% | Queue for country/rate-model clarification; the general loan tool remains useful but does not model business fees or repayment variants | Research |
| Education loan | `education loan calculator` 2, +80%; education-loan EMI 1, +60% | Queue only after geography and repayment/grace-period assumptions are chosen | Research |

Brand/provider queries such as Carvana, Navy Federal, SBI, HDFC, Pag-IBIG, and CommBank are not treated as authorization to create official-looking brand pages. The site is not affiliated with these providers. Country-specific calculators require jurisdiction-specific assumptions and review.

## Execution and indexation

The finance catalog now contains three distinct additions: car loan, personal loan EMI, and gold loan. All three are `noindex` with pending review metadata. They render and function, but are excluded from the production sitemap until formulas, jurisdiction scope, disclaimers, and content receive human review. The existing calculator audit confirms 171 unique tools, 168 indexable and three pending/noindex.

The home-loan, general-EMI, recurring-contribution, and prepayment intents were handled by improving existing canonical pages rather than creating synonym URLs. This keeps the menu and internal links useful without manufacturing near-duplicate landing pages.

## Path toward 500+ tools

The current inventory is 171, not 500. A 500-tool objective means at least 329 additional distinct tools, not 329 keyword variants. Do not publish to hit the count. Each candidate must represent a separate calculation job, have correct formulas and edge-case tests, use a canonical route, provide meaningful visible utility, and pass human review before indexation. Region-specific finance, tax, health, and legal tools require authoritative local sources and maintenance ownership. If a candidate only changes a keyword, lender name, currency label, or FAQ, merge it into the existing canonical page instead.

## Publisher-policy guardrails

- No AdSense code is currently present in `src/` (checked 2026-10-25). Keep ads visually distinct from calculator controls and do not place them where users could mistake them for menu, submit, copy, or download actions.
- Do not ask users to click/view ads, incentivize traffic, or place ad units on pages before there is substantive, usable main content.
- Preserve clear navigation, accurate claims, privacy disclosures, and the site's explicit review/noindex gate.
- Search Console trend exports are not first-party Search Console performance. After launch, use actual indexed-page, impression, click, CTR, query, and landing-page data to reprioritize.

Google guidance: [helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [Search spam policies](https://developers.google.com/search/docs/essentials/spam-policies), and [AdSense program policies](https://support.google.com/adsense/answer/48182?hl=en).
