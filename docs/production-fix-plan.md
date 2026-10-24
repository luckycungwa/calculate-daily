# Production Fix Plan — minimal integrity patch

**Scope:** the confirmed mechanical defects from `production-integrity-audit.md` §9, re-verified
against the current source before touching anything.
**Constraint:** the shell cannot start (`SetNamedSecurityInfoW failed (Win32 5): grantWrite`), so no
command has been run. Every applied change is therefore **UNVERIFIED — BUILD NOT RUN**.
**Principle:** a small, explainable patch beats a large one. Six defects examined, five fixed in code,
one split into a partial fix plus a proposed patch, and one policy question left to the owner.

---

## 1. Status at a glance

| ID | Defect | Status | Verified how |
|---|---|---|---|
| **D1** | Duplicate `tip-split-calculator` slug | **Applied** | Source inspection + full slug sweep (169 unique) |
| **D2** | No slug-uniqueness check in the audit | **Applied** | Source inspection |
| **D3** | Credit-card payoff reports a finite payoff when the payment cannot reduce the balance | **Applied** (2 files) | Arithmetic + source inspection |
| **D4** | Overnight shifts produce negative hours | **Applied** | Arithmetic + source inspection |
| **D5** | 404 / unknown-route SEO handling | **Partially applied** — `404.html` and unknown *calculator slug* fixed; unknown *route* proposed only | Source inspection |
| **D6** | `SITE_URL` vs runtime origin mismatch | **Not applied** — proposed patch + operational gate | Source inspection |
| **P1** | 113 tools indexable without review | **Pending owner decision** — visibility added, behaviour unchanged | Source inspection |

No calculator routes were added. No packages installed. No test framework introduced. No deployment
platform change.

---

## 2. D1 — Duplicate `tip-split-calculator` slug

**Root cause.** `CALCULATOR_CATALOG` concatenates seven per-category arrays
(`src/data/calculators.ts:14-24`). Two arrays each declared the same slug: `finance.ts:1216`
(`id: 'tip-calculator-v2'`) and `other.ts:911` (`id: 'tip-split'`). Because Finance is concatenated
before Daily, `getCalculatorBySlug` returned the **finance** entry and the **daily** entry was dead
code — but `prerender.ts:457-459` maps the whole catalogue, so `/calculators/tip-split-calculator`
was pushed into the sitemap **twice**.

**Reference check before deleting.** A repository-wide grep for `tip-split-calculator` returned only
the two declarations — no `related`, no `workflowLinks`, no guide embed. Nothing pointed at the daily
entry.

**Decision.** Keep the finance entry (the one that renders today) and delete the daily entry.

| | finance entry (kept) | other.ts entry (deleted) |
|---|---|---|
| Results | 2 | 3 (also `Total Bill`) |
| `formulaDescription` | real text | **the literal string `'undefined'`** |
| `workflowLinks` | `budget-calculator` twice (duplicate) | 2 distinct |

Deleting the *rendered* entry would have silently changed live output. Deleting the dead entry also
prevents its `formulaDescription: 'undefined'` from ever becoming visible.

**Fix.** Removed the entire `id: 'tip-split'` object from `other.ts` (was lines 909–958).
`other.ts` is now 952 lines; `},` at 908 is directly followed by the `sa-fuel` entry at 909.

**Risk.** Low. One entry fewer in the `daily` category (catalogue 170 → **169**). Nothing imports the
removed identifier. The intended tip tool (`tip-calculator`, custom component) is untouched.

**Residual (content, not integrity).** The kept entry still has `budget-calculator` listed twice in
`workflowLinks`, and a tip tool filed under `finance`. Both are content decisions tracked in
`decisions-log.csv` D06, not this patch.

## 3. D2 — Slug uniqueness is unenforced

**Root cause.** `scripts/audit-calculators.ts` validates config maths, converters, custom-component
registration and content, but never checks that slugs are unique — which is why D1 survived.

**Fix.** Added an `integrity` check inside `main()` that counts slugs and fails on any duplicate.
It reports `169 unique slugs across 169 entries` once D1 is applied.

**Risk.** Low. Additive; no existing assertion changed. The check runs in `npm run audit`, which is
already part of the launch checklist, so it needs no new infrastructure — this is *why* no test
framework was added.

## 4. D3 — Credit-card payoff: misleading zero

**Root cause — and the audit's assumption was incomplete.** The formula at `finance.ts:1316-1317`
computes `-log(1 - (balance·r)/payment)`. When `payment ≤ balance·r`, the log argument is ≤ 0 and the
result is `NaN`. But the value never reached the screen as `NaN`: **`ConfigCalculator.tsx:60`
coerced every non-finite result to `0`**:

```ts
return typeof out === 'number' && Number.isFinite(out) ? out : 0;
```

So a user entering a payment below the monthly interest saw **“0 months to pay off” and “$0 total
interest”** — precisely the misleading finite payoff duration the brief forbids, and worse than a
visible error.

**Fix, two parts.**

1. `finance.ts` — both results now carry an explicit guard: `if (payment <= i) return NaN;`. The same
   edit also handles **APR 0**, which previously produced `NaN` via `log(1) = 0`; it now returns
   `balance / payment` months, the correct answer. A `tips` entry explains the non-amortising case.
2. `ConfigCalculator.tsx` — non-finite results now stay `NaN` and render as **“Not calculable”**
   instead of `0`.

**Verification by arithmetic** (balance 5000, APR 19%, payment 200): `r = 0.0158333`,
`i = 79.1667`, `1 − i/payment = 0.604167`, `−ln(0.604167)/ln(1.0158333) = 32.08 → 33 months`.
With `payment = 1`: `i = 79.17 > 1` ⇒ guard returns `NaN` ⇒ renders “Not calculable”. This is exactly
the assertion added in §6.

**Risk — the one to review.** Change 2 is **shared by every other config calculator (105)**. Previously any
undefined maths rendered as `0`; it now renders “Not calculable”. That is more correct, but it is a
behaviour change beyond this one tool. Narrower alternative if the owner prefers zero shared risk:
revert `ConfigCalculator.tsx` and convert `credit-card-payoff-calculator` to a custom component that
renders the message itself (more code, cannot be verified here either).

**Pre-existing content error found, not fixed.** The tool's worked example claims “31 months … $934”
and “19 months … $564”. Those numbers do **not** reproduce from the stated formula; the correct
values at the same defaults are **33 months / $1,600**, and **20 months / $1,000** at $300/month.
The copy should be corrected in the implementation task — it is prose, and rewriting it blind is a
content decision, not a mechanical fix.

## 5. D4 — Overnight shifts

**Root cause.** `time.ts:24` computed `((end − start) − break)/60` from 24-hour integers with no
day-rollover. A 22:00 → 06:00 shift returned **−16 hours**. The entry's own tip (“use the 24-hour
clock so afternoon shifts do not underflow”) documented the limitation instead of fixing it.

**Fix.** Both results now use an IIFE that adds 24 h when the end time is earlier than the start:

```js
(function(){ var s = startHour * 60 + startMin; var e = endHour * 60 + endMin;
             if (e < s) { e += 1440; } return (e - s - breakMin) / 60; })()
```

**Behaviour preserved.** Same-day 09:00 → 17:30 with a 30-minute break still yields `8.0` hours
(`1050 − 540 − 30 = 480`). Breaks are still subtracted after rollover. `e < s` (not `≤`) means an
identical start and end stays a zero-length same-day shift rather than silently becoming 24 hours.

**Risk.** Low. The `formulaDescription` and tips were updated to match, so the UI no longer states the
old limitation.

**Pre-existing content error found, not fixed.** The example text reads
`(510 - 540 + 30) converted and divided by 60`, which evaluates to 0. The correct arithmetic is
`(1050 - 540 - 30) / 60 = 8.0`. Flagged for the content pass.

## 6. D5 — 404 and unknown-route SEO

**Root cause.** `buildShell` emits `noindex` and suppresses the canonical only when its final
`noindex` argument is truthy (`prerender.ts:92-102`). The 404 page was built **without** that
argument, so `404.html` shipped with a canonical pointing at `/404.html` and **no** robots meta.
Separately, `CalculatorPage` set `noindex` from metadata alone, so an unknown slug evaluated
`undefined === 'noindex' → false` and produced a **self-canonicalising soft 404**.

**Applied.**

- `prerender.ts` — the 404 `buildShell` call now passes `true`, so `404.html` gets
  `<meta name="robots" content="noindex">` and **no** canonical or `og:url`.
- `CalculatorPage.tsx` — `noindex` now includes `!meta`, so an unknown slug is noindexed and, because
  `usePageMeta` only writes a canonical when `!noindex`, it no longer self-canonicalises.

**Proposed only — unknown *route*.** `App.tsx:116-129` renders a not-found block with **no**
`usePageMeta` call at all, so a client-side navigation to an unknown path keeps the previous page's
title and canonical. It was not fixed because the correct behaviour depends on hosting: if unknown
paths are rewritten to `404.html` (now noindexed) the branch rarely renders, and if they are rewritten
to `index.html` it needs its own noindex. The patch is in §9 and needs a hosting decision.

**Risk.** Low for both applied changes. The 404 page previously had a canonical; removing it is the
intended behaviour for an error page.

## 7. D6 — `SITE_URL` vs runtime origin

**Finding: a real divergence, but conditional on deployment configuration — so not applied.**

`prerender.ts:9` builds canonical URLs, `og:url` and the entire sitemap from
`process.env.SITE_URL || 'https://calculatedaily.com'`. At runtime, `seo.ts:63` rewrites the canonical
to `${window.location.origin}${canonicalPath}`. If `SITE_URL` is not set for the deployment, the
prerendered HTML and sitemap advertise `calculatedaily.com` — which today serves a parking lander —
while the hydrated page advertises the real host: two conflicting canonicals on every page.

This is **not a code defect with a safe blind fix**, because which host is correct is a deployment
fact I cannot observe. It is captured as: a proposed patch (§9) plus a hard gate item.

**Also confirmed:** `src/lib/analytics.ts:1` already uses `import.meta.env.VITE_GA4_ID`, so a
`VITE_SITE_URL` would follow an established pattern.

## 8. P1 — Indexation policy is **not decided here**

The audit found 113 of 169 entries indexable without `reviewStatus: 'reviewed'`, because
`isIndexable` treats a missing `seo` block as indexable — the inverse of `AGENTS.md:13`. **Nothing
about that behaviour was changed.**

Nothing was noindexed, nothing deleted, and the default was not altered. Instead:

- Added a **non-failing** `policy` line to the audit that prints
  `N/169 entries indexable without reviewStatus=reviewed; M explicit noindex` on every run, so the
  state is visible rather than silent.

**The decision required from the site owner** — one question, two coherent answers:

> **Should an unreviewed calculator be publicly indexable?**
>
> **Option A — review-gated (matches `AGENTS.md`).** Change `isIndexable` to require
> `reviewStatus === 'reviewed'`. Consequence: the 113 unreviewed tools drop out of the sitemap and
> become `noindex` on the next build. Publishing 169 tools then requires 113 content reviews.
>
> **Option B — publish by default (matches today's behaviour).** Keep the predicate, and make the
> intent explicit by requiring a `seo` block on every entry that states `status` and `reviewStatus`,
> with the audit failing any entry that omits it. Consequence: no traffic loss, but the catalogue must
> declare intent honestly, and the audit gate becomes the guarantee.

Either option is implementable in one small change. Option B can be staged: add the audit assertion in
warn-only mode first, then make it fail once the 113 entries are annotated. **This plan does not
choose between them.**

## 9. Patches deliberately not applied

### P-1 Unknown route noindex (`src/App.tsx`)

```tsx
// 1. add to the imports
import { usePageMeta } from './lib/seo';

// 2. add a component above `export default function App()`
const NotFoundPage: React.FC = () => {
  usePageMeta({ title: 'Page Not Found', canonicalPath: '/404.html', noindex: true });
  return (
    <div className="max-w-2xl mx-auto py-20 text-center space-y-4">
      <h1 className="text-2xl font-bold text-zinc-950 dark:text-zinc-50">Page Not Found</h1>
      <p className="text-sm text-zinc-500">The page you requested does not exist.</p>
      <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold">
        Back to Home
      </Link>
    </div>
  );
};

// 3. replace the `default:` branch of renderPage() with
      default:
        return <NotFoundPage />;
```

**Blocked on:** confirming how the host serves unknown paths (404.html vs index.html rewrite).

### P-2 Single canonical host (`vite.config.ts` + `src/lib/seo.ts`)

```ts
// vite.config.ts — expose the same value the prerenderer already uses
define: {
  __SITE_URL__: JSON.stringify(process.env.SITE_URL || 'https://calculatedaily.com'),
},

// src/lib/seo.ts — replace the origin-based canonical
link.setAttribute('href', `${__SITE_URL__}${canonicalPath}`);
// plus a declaration in src/vite-env.d.ts:
// declare const __SITE_URL__: string;
```

**Blocked on:** the deployment host being decided. Setting `SITE_URL` correctly at build time solves
the immediate risk without any code change — this patch only prevents the two sources from ever
diverging again.

### P-3 Worked-example corrections (content)

`credit-card-payoff-calculator` and `work-hours-calculator` both carry examples whose arithmetic does
not reproduce (see §4 and §5). Corrected figures are supplied there; the copy edit belongs in the
content pass, not in a mechanical patch.

---

## 10. What would change this plan

- If `npm run audit` reports a new failure, the most likely cause is the shared
  `ConfigCalculator` change (§4 risk) — revert that one file first and keep the catalogue guard.
- If the build fails in `scripts/audit-calculators.ts`, the likely cause is the new `evalResult`
  helper's typing; it is self-contained and can be deleted without affecting any other fix.
- If TypeScript objects to `!meta ||` in the `noindex` expression, replace it with
  `noindex: !meta ? true : (meta.seo?.status === 'noindex' || meta.seo?.reviewStatus === 'pending')`.
