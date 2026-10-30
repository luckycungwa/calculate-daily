# Production Integrity Audit — Calculate Daily

**Date:** research run of October 2026.
**Scope:** read-only inspection of the repository plus the research pack, with **no production
changes applied** — see §8 for why, and §9 for the exact patches.

**Status of this audit: inspection complete; verification incomplete.** The environment blocked every
command (§7). Nothing in this document claims a build, type-check, or test passed.

> **Follow-up:** the minimal patches arising from this audit — what was applied, what was deliberately
> left as a proposal, and the gate to run when a shell is available — are recorded in
> [`production-fix-plan.md`](./production-fix-plan.md) and
> [`production-fix-results.md`](./production-fix-results.md).

---

## 1. What actually exists

| Fact | Verified how |
|---|---|
| Framework: **Vite 6 + React 19 SPA**, TypeScript 5.8, Tailwind 4, ECharts 6, Radix UI | `package.json`, `vite.config.ts` |
| **No server**: routing is a hand-rolled history router (`src/lib/router.tsx`), not React Router | file read |
| Build: `vite build && tsx scripts/prerender.ts` | `package.json` scripts |
| Prerender uses **jsdom + `renderToStaticMarkup`** to write one HTML file per route | `scripts/prerender.ts:117-134, 403-433` |
| Scripts: `dev`, `build`, `audit`, `start`, `clean`, `lint` (`lint` = `tsc --noEmit`) | `package.json` |
| **No test runner and no test files.** A glob for `*.{test,spec}.{ts,tsx,js,mjs}` matched only `node_modules` | glob executed |
| Catalogue: **7 files, 170 entries, 169 unique slugs** | `^    slug: '` grep → 170 matches; duplicate scan §5 |
| Content enforcement: `scripts/audit-calculators.ts` (not a test — a content/self-consistency checker) | file read |
| Route types: `home`, `calculators`, `calculator/:slug`, `category/:id`, `savings-goal`, `about`, `privacy`, `terms`, `contact`, `guides`, `guide/:slug`, `not-found` | `src/lib/router.tsx:3-15` |
| **Deployment: NOT live.** `https://totalcalculation.com/sitemap.xml` returns a one-URL sitemap pointing at `/lander` (a domain-parking page) | live fetch during this audit |
| `SITE_URL` defaults to `https://totalcalculation.com`; overridable by env | `scripts/prerender.ts:9` |

The deployment finding matters for everything below: **no indexation damage can have occurred yet**,
because nothing is published. This is the cheapest possible moment to fix the gate.

---

## 2. Intended indexation policy

Three documents state or imply a policy:

1. **`AGENTS.md` line 13** — "Every catalog entry needs … `seo` metadata (`reviewStatus: 'reviewed'`
   to be indexable)." → *intent: nothing is indexable until explicitly reviewed.*
2. **`src/types.ts:78-80`** — `SeoStatus = 'index' | 'noindex'`, `ReviewStatus = 'pending' | 'reviewed'`,
   both optional on `CalculatorMeta.seo`.
3. **`docs/launch-checklist.md`** — build must prerender all pages and submit a sitemap; no explicit
   statement about unreviewed tools.

**The intended policy, stated plainly:** a tool is indexable only when a human has marked it
reviewed; anything else should be `noindex` and excluded from the sitemap.

## 3. What the code actually does

```ts
// scripts/prerender.ts:30-31
const isIndexable = (calc: any) =>
  calc.seo?.status !== 'noindex' && calc.seo?.reviewStatus !== 'pending';
```

When `seo` is **absent**, both comparisons are `true`, so the tool is indexable. `seo` is optional
(`types.ts:99`). The default is therefore **index**, not noindex — the inverse of `AGENTS.md`.

`src/pages/CalculatorPage.tsx:24` mirrors the same predicate at runtime, so client-side hydration
agrees with the prerendered HTML. That consistency is good; the default is the problem.

### 3.1 How many tools exercise the gate?

| Measurement | Result |
|---|---|
| Entries with an explicit `seo` block (`status: 'index'`, `reviewStatus: 'reviewed'`) | **57** |
| Entries with **no** `seo` block | **113** |
| Entries with `status: 'noindex'` | **0** |
| Guides with `status: 'noindex'` | **0** |

Verified by grepping `reviewStatus` / `noindex` across `src/`. Every `noindex` occurrence is type
definition, the SEO helper, the guide *not-found* branch, or the CalculatorPage predicate —
**no catalogue entry or guide declares noindex**.

**Conclusion: the gate has never closed.** In one direction 113 tools are published unreviewed; in
the other, nothing is ever withheld. The mechanism exists but no data exercises it.

---

## 4. Indexation findings

| ID | Finding | Severity | Where |
|---|---|---|---|
| **I1** | 113 of 170 tools are indexable and sitemapped without a review; `AGENTS.md` says the opposite | **High** | `prerender.ts:30-31, 457` |
| **I2** | **Guides bypass the gate.** Guide pages are built with no `noindex` field and pushed to the sitemap unconditionally, ignoring `guide.seo` entirely | Medium (latent — every guide currently declares `reviewed`) | `prerender.ts:365-401, 460-462` |
| **I3** | **`404.html` is indexable and self-canonical.** `buildShell` is called without `noindex`, so it emits `<link rel="canonical" href="…/404.html">` and **no** robots meta | **High if the host serves 404.html with HTTP 200** (common SPA fallback) | `prerender.ts:425-433` + `92-102` |
| **I4** | **Unknown calculator slug = self-canonicalising soft 404.** `CalculatorPage` renders "Calculator Not Found" but passes `canonicalPath: /calculators/<bogus>` with `noindex: false` (both predicates evaluate `false` when `meta` is `undefined`) | Medium | `CalculatorPage.tsx:19-25` |
| **I5** | **Unknown route sets no metadata at all** — no title, no canonical, no robots; the shell's default title persists | Low (static hosts serve 404.html) | `App.tsx:116-129` |
| **I6** | **Duplicate `<loc>` in the sitemap.** The catalogue is mapped, not deduplicated, so the duplicate slug (§5) is pushed twice | High (with the duplicate) | `prerender.ts:457-459` |
| **I7** | `robots.txt` disallows `/api/`, which does not exist in a static build (harmless remnant) | Low | `prerender.ts:436-443` |
| **I8** | `pagePriority` is built from the full catalogue, so a duplicate slug silently overwrites its own priority | Low | `prerender.ts:478-480` |

**Routes that should be indexable but are blocked:** none. No entry sets `noindex`, and no guide does
either. This audit found no wrongly-blocked route.

**Routes that can be indexed unintentionally:** the 113 unreviewed tools (I1), guides if one is ever
added unreviewed (I2), `404.html` (I3), any `/calculators/<unknown>` URL if a host rewrites
everything to the SPA shell (I4), and the duplicated tip-split URL (I6).

### 4.1 Canonical generation

`buildShell` emits canonical **only when not noindex** (`prerender.ts:101`), always built as
`${SITE_URL}${pathname}`. Consequences: if `SITE_URL` is left at the default while the site is
deployed to a `*.vercel.app` domain, **every canonical and the whole sitemap point at a domain that
serves a parking page** — a site-wide indexing failure. The launch checklist already flags this
(`launch-checklist.md:13`), but it is worth restating: it is the single highest-impact deployment
risk in this repository.

---

## 5. The duplicate slug

### 5.1 Scope of the check

All **170** slug declarations were extracted and scanned. Exactly **one** value is duplicated:

| Entry | File | Line | `id` | `name` | Category |
|---|---|---|---|---|---|
| A | `src/data/catalog/finance.ts` | 1216 | `tip-calculator-v2` | Tip & Bill Split Calculator | `finance` |
| B | `src/data/catalog/other.ts` | 911 | `tip-split` | Tip & Split Calculator | `daily` |

A third, *different* tool exists: `tip-calculator` ("Tip & Bill Splitter", `kind: 'custom'`,
`other.ts:274`) — not a duplicate slug, but a third overlapping tip intent.

### 5.2 Which entry is canonical

`CALCULATOR_CATALOG` (`src/data/calculators.ts:14-24`) concatenates MATH, FINANCE, HEALTH, CONVERSION,
TIME, CONSTRUCTION, FOOD, FITNESS, DAILY. **Finance precedes Daily**, so
`getCalculatorBySlug('tip-split-calculator')` returns **entry A**, and entry A is what
`prerender.ts:209` renders to `calculators/tip-split-calculator.html`. Entry B is unreachable and
its `seo.priority: 0.8` still overwrites A's `0.9` in the sitemap map (I8).

| | A (finance.ts) — **renders today** | B (other.ts) — **dead** |
|---|---|---|
| Results | 2 (Tip Amount, Per Person) | 3 (+ Total Bill) |
| `formulaDescription` | `'tip = bill x tip%'` | **the literal string `'undefined'`** |
| Tips array | none | 2 tips |
| FAQs | 3 | 3 |
| `workflowLinks` | **`budget-calculator` twice** (duplicate link) | 2 distinct |
| Category | `finance` (arguably wrong for a tip tool) | `daily` (arguably right) |

**Decision: keep A, delete B.** A is the implementation users would see, so deleting it would
silently change live output; B is dead code whose `formulaDescription: 'undefined'` would become a
user-visible bug the moment it rendered. Minimal risk wins.

Two residual defects in the retained entry are **content**, not integrity, and are out of scope here:
the duplicated `budget-calculator` workflow link, and the `finance` category for a tip tool.

### 5.3 Redirect?

**None required.** The site is not deployed, so no URL has accrued equity, and a redirect from
`/calculators/tip-split-calculator` to itself is explicitly forbidden. If the owner later decides (per
`decisions-log.csv` D06) that `tip-split-calculator` should fold into `tip-calculator`, *that* would
justify a host-level 301 — a separate, content-level decision, not this integrity fix.

### 5.4 Regression coverage

There is no test runner, so "add a test" would mean introducing one (vitest/jest) that cannot be run
here. The proportionate mechanism is to extend the **existing** enforcement script,
`scripts/audit-calculators.ts`, with two assertions:

1. every `slug` is unique across `CALCULATOR_CATALOG`;
2. the sitemap URL set contains no duplicates.

`npm run audit` is already part of the launch checklist, so the check would run on every release
without new infrastructure. Adding a test framework is a separate decision and should not be smuggled
into an integrity fix.

---

## 6. First-batch readiness

Full detail in [`first-batch-readiness.csv`](./keyword-intelligence/first-batch-readiness.csv)
(7 candidates × 17 fields). Summary:

| # | Candidate | Decision | Overlap | Competitor evidence | Demand |
|---|---|---|---|---|---|
| C1 | Price per unit | **Build new** (custom) | /meal-cost-calculator adjacent | limited (2) | UNKNOWN |
| C2 | Break-even | **Build new** | /markup-margin-calculator adjacent | limited (2) | UNKNOWN |
| C3 | Debt payoff | **Build new** (custom) | single-debt payoff only; no multi-debt | verified (3) | UNKNOWN |
| C4 | Car loan | **Build new — conditional** | /loan-payment-calculator **already targets** "auto loan"/"car loan" | verified (6) | UNKNOWN |
| C5 | Fraction calculator | **Build new** (custom) | /fraction-to-percent-calculator is conversion only | verified (6) | UNKNOWN |
| C6 | Timesheet | **Build new** (custom) | /work-hours-calculator is one day only | verified (4) | UNKNOWN |
| C7 | Roofing estimator | **Build new** | lumber/flooring/paint/concrete exist; no roofing | verified (5) | UNKNOWN |

**All seven are ready for a separate implementation task**, subject to two conditions:

- **C4 (car loan)** must, in the same change, remove `auto loan` and `car loan` from
  `loan-payment-calculator`'s keyword list (`finance.ts:378`), or the two pages will compete for the
  same query. If that keyword surgery is unwanted, the alternative is to extend the existing loan tool
  with a vehicle mode instead of adding a route.

**Two confirmed defects surfaced while writing the acceptance tests** — worth fixing in the
implementation task rather than here:

1. **`credit-card-payoff-calculator`** (`finance.ts:1316-1317`) uses
   `-log(1 - (balance·r)/payment)`. When the payment is less than or equal to the monthly interest,
   the argument is ≤ 0 and the result is `NaN`/`Infinity` with no guard. The debt-payoff tool must not
   inherit this.
2. **`work-hours-calculator`** (`time.ts:24`) computes `(end − start − break)` from 24-hour integers
   with no overnight handling, so a 22:00–06:00 shift returns a **negative** figure. Its own tip
   ("use the 24-hour clock so afternoon shifts do not underflow") describes the limitation rather
   than preventing it.

Search volume, CPC, RPM and keyword difficulty remain **UNKNOWN** for all seven. Competitor coverage
is evidence of intent, not a measurement of demand.

The five `monitor` candidates from the validation pass (livestock feed, rainwater collection,
irrigation, CSS clamp, rem-to-px) are **excluded** from this batch and were not assessed for build.

---

## 7. Commands attempted

Every command failed at sandbox provisioning, before the process started. This is an environment
failure, not a project failure.

| Command | Result |
|---|---|
| `Write-Output "probe"; node --version` | `Error: SetNamedSecurityInfoW failed (Win32 5): grantWrite(H:\2026\calculate-daily)` |
| Any `pwsh` invocation (confined or `danger-full-access`) | Same error on every attempt across this session |
| `npm run audit` | **NOT RUN** |
| `npx tsc --noEmit` | **NOT RUN** |
| `npm run build` | **NOT RUN** |

**Therefore:** the current build, type-check and audit state is **UNVERIFIED**. It is not "passing",
and this audit does not claim it is. File reads and writes work; command execution does not.

The exact blocker: `SetNamedSecurityInfoW failed (Win32 5): grantWrite(H:\2026\calculate-daily)` — the
harness cannot provision its write grant on the workspace, so every spawned shell dies before running.

---

## 8. Why no production changes were made

The brief's Phase 6 gate: *"If the environment blocks file writes or commands, stop before claiming
fixes."* Commands are blocked, so `tsc --noEmit` cannot confirm that an edit to a `.ts` catalogue file
is syntactically valid, and `npm run audit` cannot confirm the catalogue still enforces content
completeness. Applying the duplicate-slug deletion blind would trade a known, harmless duplicate for
an unknown build break.

**Production files changed: none.** All changes are additive research documents (§10).

## 9. Exact patches, ready to apply

### 9.1 Remove the unreachable duplicate (the only integrity fix required)

**File:** `src/data/catalog/other.ts` — delete lines **909–958** inclusive (the entire object literal
with `id: 'tip-split'`, `slug: 'tip-split-calculator'`, closing `},`).

Structural boundaries confirmed by reading: line 908 is `},` (end of the previous entry), line 909 is
`{`, line 958 is `},`, line 959 is `{` (start of `sa-fuel`). Deleting 909–958 therefore leaves
`},` followed directly by `{` — a valid array element boundary.

**Verify after applying** (all four must pass):

```bash
npx tsc --noEmit
npm run audit
npm run build
node -e "const s=require('fs').readFileSync('dist/sitemap.xml','utf8');const u=[...s.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);console.log(u.length, new Set(u).size)"
```

The last command must print two equal numbers. Until it does, the duplicate is not proven fixed.

### 9.2 Enforce uniqueness in the existing audit script

**File:** `scripts/audit-calculators.ts` — inside `main()`, before the summary:

```ts
const seen = new Map<string, number>();
for (const calc of CALCULATOR_CATALOG) seen.set(calc.slug, (seen.get(calc.slug) ?? 0) + 1);
for (const [slug, count] of seen) {
  if (count > 1) {
    results.push({
      name: slug, slug, kind: 'integrity', status: 'FAIL',
      detail: `duplicate slug declared ${count} times`,
    });
  }
}
```

### 9.3 Close the 404 gap (I3)

**File:** `scripts/prerender.ts:425-433` — pass `true` as the final argument to `buildShell` for the
404 page so it receives `noindex` and no canonical.

### 9.4 Make the gate match AGENTS.md (I1) — a decision, not a patch

Changing `isIndexable` to require `reviewStatus === 'reviewed'` would immediately noindex **113 tools**
and drop them from the sitemap. That is a product decision with a large blast radius and must not be
bundled into an integrity fix. **Recommendation:** ship the duplicate fix and the 404 fix first; then
agree the review policy (either review the 113, or set `noindex` deliberately), then change the
predicate in one deliberate commit.

---

## 10. Change log

| File | Change |
|---|---|
| `docs/keyword-intelligence/first-batch-readiness.csv` | **Created** — 7 candidates × 17 fields |
| `docs/keyword-intelligence/csv-integrity-validation.md` | **Created** — CSV verification results + reproducible script |
| `docs/production-integrity-audit.md` | **Created** — this document |
| `src/**` (all production code, catalogue, routes) | **Unchanged** |
| `scripts/prerender.ts`, `scripts/audit-calculators.ts` | **Unchanged** |
| `docs/keyword-intelligence/keyword-master.csv` | **Unchanged** (treated as immutable, as instructed) |

---

## 11. Risks and unresolved items

**Deployment / indexing risks, ranked**

1. **`SITE_URL` mismatch.** If deployed without setting `SITE_URL`, every canonical and the entire
   sitemap point at `https://totalcalculation.com`, which currently serves a parking page. Total
   indexing failure. Must be set and re-built.
2. **113 unreviewed tools** would go live indexable (§3.1). Not yet damage — nothing is deployed.
3. **`404.html` indexable** (§4 I3) if the host rewrites to it with a 200.
4. **Duplicate `<loc>`** in the sitemap until §9.1 lands.
5. **Domain is parked.** Until the site is deployed, Search Console cannot verify and no performance
   data exists — which is why every demand metric in the research pack is `UNKNOWN`.

**Unresolved / not verified**

- Build, type-check, audit: **unrun** (§7).
- The duplicate-slug patch is **not applied** (§8).
- The five `monitor` candidates remain undecided pending a complete competitor re-capture.
- Whether the retail hosts' rewrite rules serve `404.html` with a 404 or 200 status is unknown from
  the repository; it must be checked on the actual deployment.

**Safe next action**

In an environment with a working shell: apply §9.1, run the four verification commands, then §9.2 and
§9.3, then decide §9.4. Only then start the first-batch implementation task (§6).
