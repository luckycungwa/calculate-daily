# Owner-supplied information still required

This file tracks information the site needs from its owner but which no agent can
verify or invent. Nothing here has been silently filled in: where the value is
unknown, the site either omits the claim or states plainly that it is not
published.

Status as of 28 October 2026.

| # | Item | Current state in the product | Why it matters | Suggested owner action |
|---|------|------------------------------|----------------|------------------------|
| 1 | Publisher legal identity (registered name, entity type, registration number) | `/about` says the site is independently published and that a registered company name is **not published** | Consumer-protection and advertising rules in most jurisdictions expect the operator to be identifiable; ad networks and payment providers require it | Supply the trading name and registration details, then replace the "not published" paragraph in `src/components/AboutSection.tsx` |
| 2 | Registered or postal address | Not shown anywhere on the site | Some jurisdictions (e.g. EU/UK imprint rules) require a contactable address; app-store and ad reviews often ask for one | Decide whether to publish a business address or a service address; add it to `/about` and `/contact` |
| 3 | Named editor / reviewer and credentials | `/about` describes checks but names no person and claims no credentials | Health and finance pages are "your money or your life" content; a named, qualified reviewer is the usual trust signal — and the site should not claim one until it exists | If a qualified reviewer is engaged, record their name, role, and scope of review; otherwise keep the current honest wording |
| 4 | Support expectation | `/contact` now says messages are read but **no response time is guaranteed** | The previous "1-3 business days" line was an unsupported service promise | Either accept the no-SLA wording or commit to a published target the owner can actually meet |
| 5 | Contact email ownership | `/contact` uses `hello@calculatedaily.com` | The production canonical origin is `https://calculate-daily.vercel.app`; an email on a different domain is only valid if that inbox exists and is monitored | Confirm the mailbox exists and is monitored, or switch to an address on the domain that actually serves the site |
| 6 | Canonical domain decision | `SITE_URL` builds and documents `https://calculate-daily.vercel.app`; `calculatedaily.com` is treated as stale | Canonicals, `og:url`, sitemap, and robots all follow `SITE_URL`; a wrong value splits ranking signals | If a custom domain is attached, set `SITE_URL` to it, add a redirect from the Vercel host, and rebuild |
| 7 | Analytics decision and consent | `VITE_GA4_ID` is empty by default; `/privacy` states that no analytics events are sent when it is absent, and that no consent prompt exists | Enabling GA4 without a consent flow would contradict the published policy in consent jurisdictions | Decide on analytics; if enabling, add a consent mechanism and update `/privacy` before setting the ID |
| 8 | Fuel-price update ownership | `/calculators/south-africa-fuel-calculator` shows the DMPR schedule effective 7 October 2026, a last-verified date, the pending 4 November 2026 adjustment, and the source link | Prices change monthly; a stale page is worse than no page | Nominate who checks the DMPR schedule at each adjustment and update `src/data/fuelPrices.ts` plus `src/lib/fuelPrices.test.ts` together |
| 9 | Legal review of Terms and Privacy | Both pages exist and describe actual behaviour, but have not been reviewed by a lawyer | Liability, consumer law, and privacy obligations vary by jurisdiction | Have counsel review `/terms` and `/privacy` before promotion |
| 10 | Content and AI-assistance disclosure | No AI-assistance claim is made anywhere | Several platforms and jurisdictions now expect disclosure of AI-generated content; overclaiming is equally harmful | Decide the policy, then state it on `/about` only if it is accurate |

## Rules for filling these in

1. Do not invent a legal entity, address, reviewer, credential, or response-time
   promise to make a page look complete.
2. When a value is supplied, update the page **and** this file in the same change
   so the two never disagree.
3. Anything that changes a published figure (fuel prices, rates, tax thresholds)
   must be updated together with its test and its "last verified" date.
