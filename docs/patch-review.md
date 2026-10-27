# Patch Review — source-level

> **UNVERIFIED — BUILD NOT RUN.** No command executed in this session; `pwsh` fails at sandbox
> provisioning (`SetNamedSecurityInfoW failed (Win32 5): grantWrite`). This review is derived from
> reading the source. It is **not** a verification that the patch compiles, builds, or behaves
> correctly at runtime. Every claim below cites the file and construct it rests on.

Scope reviewed: the seven files from the previous patch (`other.ts`, `finance.ts`, `time.ts`,
`ConfigCalculator.tsx`, `CalculatorPage.tsx`, `prerender.ts`, `audit-calculators.ts`) **plus** the
indexation changes and two files touched in this pass (`App.tsx`).

---

## 1. Verdict summary

| Area | Verdict | Basis |
|---|---|---|
| Duplicate slug removal | **Correct** | 169 entries, 169 unique slugs, no surviving references |
| Slug-uniqueness audit check | **Correct** | Logic reads `CALCULATOR_CATALOG` directly |
| Credit-card payoff guards | **Correct**, two further guards added | Arithmetic + branch analysis |
| `ConfigCalculator` non-finite handling | **Correct**, with a disclosed blast radius | Code path traced end-to-end |
| Overnight shift handling | **Correct**, one clamp added | Arithmetic |
| 404 / unknown-route SEO | **Correct at source**, hosting status unverified | `vercel.json` read |
| Review-gated indexation | **Correct**, changes no page today | 169/169 + 10/10 already compliant |
| Worked examples | **Corrected** | Recalculated from source defaults |
| **Overall** | **Source-defensible. Not verified.** | — |

## 2. Findings raised during this review

| ID | Finding | Severity | Action |
|---|---|---|---|
| F1 | **"113 unreviewed calculators" was false.** Every one of the 169 entries declares `status: 'index'` + `reviewStatus: 'reviewed'`; the earlier count was a line-anchor artefact that only matched multi-line `seo` blocks | **High** (invalidated an audit premise and a decision) | Corrected in `indexation-policy.md` §7; decision D14 in the research pack is retired |
| F2 | Two audit checks contradicted the new policy (`pending` treated as an error; `noindex` without `reviewStatus` treated as an error) | Medium | Replaced with one contradiction check |
| F3 | Guide pages bypassed the indexation gate entirely (pages and sitemap) | Medium | Gate now applied to both |
| F4 | The shared `NaN` change would have exposed a pre-existing `0/0` in `loan-payment-calculator` at **0% APR** — a real product, not an error | **High** (would have regressed a flagship tool) | Zero-rate branch added to all three results |
| F5 | Genuine division-by-zero elsewhere (e.g. ROI with cost 0) now renders "Not calculable" instead of `0` | Low (intended) | Documented as blast radius |
| F6 | Negative balance produced **negative months** on the payoff tool | Medium | `balance <= 0 → 0` guard added |
| F7 | A break longer than the shift produced **negative hours** | Medium | `Math.max(0, …)` clamp added |
| F8 | Both worked examples were arithmetically wrong | Medium | Corrected (§7) |

## 3. File-by-file review

### 3.1 `src/data/catalog/other.ts` — duplicate removal

- File is now **952 lines** (was 1002); exactly the 50-line block was removed.
- Boundary re-read after the edit: line 908 is `},` closing `boiling-point-calculator`; 909 opens
  `sa-fuel`. Array separators remain valid.
- `grep -c "tip-split-calculator"` across `src/` → **1** (the finance entry). No `related`,
  `workflowLinks`, guide embed or component reference survives.
- `other.ts` still exports `FOOD_CALCULATORS`, `FITNESS_CALCULATORS`, `DAILY_CALCULATORS`; only an
  element was removed, so all three exports remain valid arrays.
- **Note:** the `tip-calculator` custom entry (line 274) is untouched, so the intended tip tool is
  unaffected.

### 3.2 `src/data/catalog/finance.ts`

**Credit-card payoff (lines 1315-1324).** Branch analysis of
`(function(){ var r = apr/12/100; if (balance <= 0) return 0; if (r === 0) return Math.ceil(balance/payment); var i = balance*r; if (payment <= i) return NaN; return Math.ceil(-Math.log(1-i/payment)/Math.log(1+r)); })()`:

| Input | Path | Result |
|---|---|---|
| balance 5000, apr 19, payment 200 | `payment > i` | `33` months, `$1,600` |
| balance 5000, apr 19, payment **1** | `payment <= i` | `NaN` → "Not calculable" |
| balance 5000, apr **0**, payment 200 | `r === 0` | `25` months, `$0` |
| balance **0** | `balance <= 0` | `0` months, `$0` |
| balance **−1000** | `balance <= 0` | `0` months (previously `−4`) |
| payment **0** or negative | field `min: 1` but manual entry possible → `payment <= i` | `NaN` → "Not calculable" |

`Math.log(1 + r)` is only reached when `r > 0`, so no division by zero. ✔

**Loan payment (lines 387-389).** Same structural shape: `r === 0 → amount / n`, otherwise
`amount * r * f / (f − 1)` with `f > 1`. The ternary evaluates only the taken branch, so the
`f − 1` division never executes at `r = 0`. Default case reproduces the documented example
(20 000 / 7% / 5 yr → ≈ 396.05), which is the correct cross-check the credit-card example failed. ✔

### 3.3 `src/data/catalog/time.ts`

`(function(){ var s = startHour*60+startMin; var e = endHour*60+endMin; if (e < s) { e += 1440; } return Math.max(0, e - s - breakMin) / 60; })()`

| Input | Result |
|---|---|
| 22:00 → 06:00, break 0 | `8.0` h / `480` min (was **−16 h**) |
| 09:00 → 17:30, break 30 | `8.0` h / `480` min (unchanged) |
| 09:00 → 09:00, break 0 | `0` h (identical times stay same-day; not 24 h) |
| 09:00 → 10:00, break 120 | `0` h (clamped; was **−1 h**) |
| hour 25 entered manually | treated as 1500 min; still arithmetic, no crash |

`e < s` (not `≤`) is deliberate: a zero-length same-day shift must not silently become 24 hours.
✔

### 3.4 `src/components/calculators/ConfigCalculator.tsx`

Path traced: `evaluatedResults` (memo) → `typeof out === 'number' ? out : NaN`, `catch → NaN` →
`formatResult` → `if (!Number.isFinite(num)) return 'Not calculable'`.

- `formatResult` is the **only** formatter: used for the primary value (line 92), secondary rows
  (line 234), `exportData` (line 110) and `handleCopy` (line 95). So `NaN` cannot reach the DOM as
  `NaN` anywhere in a config calculator.
- `evaluatedResults[idx] ?? 0` does **not** swallow `NaN` (`??` only catches `null`/`undefined`), so
  the guard survives.
- `toLocaleString` is never called on a non-finite value. ✔

### 3.5 `src/pages/CalculatorPage.tsx`

`noindex: !meta || meta.seo?.status === 'noindex' || meta.seo?.reviewStatus === 'pending'`.
For an unknown slug `meta` is `undefined` → `noindex: true`; `usePageMeta` only writes a canonical
when `!noindex` (`seo.ts:56`), so an unknown slug **cannot self-canonicalise**. This is the same rule
as the prerenderer, expressed as the positive form of `isIndexable`. ✔

### 3.6 `scripts/prerender.ts`

1. `isIndexable` now `status === 'index' && reviewStatus === 'reviewed'` (fail-closed).
2. Guide pages gained `noindex: !isIndexable(guide)` — previously absent, which was the bypass.
3. Sitemap calculators: unchanged filter (now stricter via the helper).
4. Sitemap guides: `GUIDE_REGISTRY.filter(isIndexable)` — previously unfiltered.
5. 404 page: `buildShell(..., true)` → robots noindex, no canonical, no `og:url`
   (`buildShell` lines 92-102 gate both on the same flag).
6. `noindex` also suppresses the `WebApplication`/`FAQPage` JSON-LD? **No** — JSON-LD is still
   emitted for a noindexed page. Harmless (search engines ignore structured data on noindexed URLs),
   but worth noting as intentional.

### 3.7 `scripts/audit-calculators.ts`

- `evalResult` takes a local `const spec = calc.config` after a null guard, so TypeScript narrowing
  does not depend on a property access inside a closure.
- Four new checks: slug uniqueness, payoff non-amortising, overnight shift, 0% loan, plus a
  three-state indexation report.
- The two replaced SEO checks now assert only the contradiction
  (`status: 'index'` without `reviewStatus: 'reviewed'`), which is the one combination that silently
  withholds a page the author believes is published.
- `kind` values `integrity`, `edge-case`, `policy` are plain strings in `AuditItem.kind: string`. ✔

### 3.8 `src/App.tsx`

`NotFoundPage` is a module-level component using `usePageMeta` — hooks are called unconditionally
inside the component, and the component only mounts for `route.name === 'not-found'`. The
`default:` branch now returns `<NotFoundPage />`; the switch and `renderPage` structure are intact
(verified: lines 116-140). `Link` is still used inside the component, so the import is not orphaned. ✔

## 4. Critical regression review — item by item

### 4.1 Every calculator using `ConfigCalculator.tsx`

105 config calculators use it (`kind: 'config'`). Inventory of maths that can go non-finite:

| Risk class | Example | New behaviour | Correct? |
|---|---|---|---|
| Division by an input that may be 0 | ROI-style tools where cost = 0 | "Not calculable" | **Yes** — genuinely undefined |
| Amortisation with 0% rate | `loan-payment` | **Fixed** to `amount / n` | **Yes** |
| Payoff where payment ≤ interest | `credit-card-payoff` | "Not calculable" | **Yes** |
| Log/exp of an invalid argument | payoff, CAGR with 0 start | "Not calculable" | **Yes** |
| Overflow to `Infinity` | extreme inputs | "Not calculable" | **Yes** |

Only **one** case had a well-defined answer being masked (`loan-payment` at 0%); it is fixed. The
rest are genuinely undefined and now say so instead of printing `0`.

### 4.2 How non-finite values render

Traced in §3.4. Every user-visible path funnels through `formatResult`; the string is
**"Not calculable"**, never `NaN`/`Infinity`/`undefined`. Not verified visually — no browser ran.

### 4.3 Zero-APR debt payoff

Covered by the table in §3.2: invalid balance, zero/negative payment, non-amortising payment, zero
APR and normal operation all produce a defined outcome. The non-amortising case returns `NaN`
deliberately so the UI says "Not calculable" rather than implying a payoff date.

### 4.4 Overnight, same-day, breaks, invalid times

Covered by the table in §3.3. Clamping at 0 prevents negative hours from an over-long break.

### 4.5 The two worked examples

Recalculated from the source defaults, then corrected in the catalogue.

**Credit-card payoff** — defaults are `balance 5000`, `apr 19`, `payment 200` (`finance.ts:1311-1313`).
`r = 19/1200 = 0.0158333`, `i = 79.1667`, `−ln(1 − i/payment)/ln(1+r) = 32.08 → 33` months,
interest `33 × 200 − 5000 = 1,600`. At `payment 300`: `19.50 → 20` months, `1,000`.
Prose changed from “31 months … $934 / 19 months … $564” to **“33 months … $1,600 / 20 months …
$1,000”**.

**Work hours** — defaults `09:00`, `17:30`, break 30. `(1050 − 540 − 30) = 480 → 8.0`. The prose
previously read `(510 - 540 + 30)`, which evaluates to `0`. Corrected to
`(1050 - 540 - 30) = 480 minutes, divided by 60`.

Both corrections use values confirmed from the source defaults; no example was invented.

### 4.6 Is the 404 actually HTTP 404?

**Cannot be verified from source alone; the configuration is unambiguous, so here is what it implies.**

`vercel.json` declares `cleanUrls: true`, `trailingSlash: false`, security headers, `buildCommand`
and `outputDirectory: dist` — and **no `rewrites`, `redirects` or `routes`**. Without a rewrite rule,
Vercel does not funnel unknown paths to `index.html`; it serves the build's `404.html` with an HTTP
**404** status. That is the behaviour the patch assumes, and it is why `404.html` must be noindex: it
is a real error page, and it must not be indexable if a host ever serves it with 200.

**Residual risk:** a future `rewrites` entry (or a different host) would turn unknown paths into 200s
serving the SPA shell. The gate must therefore assert the *status code* on the deployed host, not
just the presence of the meta tag.

### 4.7 Can unknown routes produce canonicals or sitemap entries?

- **Sitemap:** built only from `CALCULATOR_CATALOG` and `GUIDE_REGISTRY` (filtered). An arbitrary path
  can never appear. ✔
- **Prerender:** one file per known slug; unknown slugs are never rendered. ✔
- **Runtime, unknown calculator slug:** `CalculatorPage` → `noindex: true` → canonical suppressed. ✔
- **Runtime, unknown route:** previously inherited the previous page's title/canonical; `NotFoundPage`
  now sets `noindex: true`, and `usePageMeta` does not write a canonical when noindex. ✔
- **One gap remains:** `usePageMeta` *adds* a canonical but never *removes* one left in `<head>` by a
  previous page. On a fresh load of `/404.html` there is none (either the page was prerendered with
  `noindex`, or the shell has none), so this is confined to client-side navigation between known
  pages. Documented; not fixed.

### 4.8 Does the duplicate removal break anything?

| Check | Result |
|---|---|
| Catalogue count | 170 → **169** entries; `CALCULATOR_CATALOG.length` used only for display/priorities |
| Unique slugs | **169 unique** (verified by enumerating all `^    slug: '` lines) |
| Imports | `other.ts` still exports all three arrays; nothing imports an individual entry |
| Internal links | no `related`/`workflowLinks`/guide reference to `tip-split-calculator` besides the removed entry |
| Components | the removed entry was `kind: 'config'` — no component registration involved |
| Audit `REGISTERED_CUSTOM` | unaffected (custom component set unchanged) |
| Sitemap | one fewer `<loc>`; the URL remains once via the finance entry |

## 5. Residual risks

1. **Nothing compiled.** The most likely failures are TypeScript complaints in the new audit blocks
   or the `App.tsx` component; both are isolated and revertible (§6).
2. **`ConfigCalculator` blast radius (F5).** 105 tools now show "Not calculable" where they showed
   `0` for undefined maths. Intended, but it is a visible change.
3. **Hosting assumptions (4.6).** `vercel.json` supports the 404 assumption; only a live request
   confirms it.
4. **Stale canonical on SPA navigation (4.7).** Minor, documented.
5. **`dist/` is stale** and predates every change in this patch. Never deploy it as-is.

## 6. Revert order if the build fails

1. `scripts/audit-calculators.ts` — the four new checks are additive; delete them first.
2. `src/App.tsx` — restore the inline not-found JSX and drop `NotFoundPage`.
3. `src/components/calculators/ConfigCalculator.tsx` — revert to `? out : 0`; the catalogue guards
   still protect payoff and loan.
4. The catalogue formula edits are independent of each other and of the components.

## 7. Commands to run when the shell returns

```bash
npx tsc --noEmit          # types across src + scripts
npm run audit             # expect FAIL: 0 and the four new PASS lines
npm run build             # vite build + prerender
```

Then the gate in `production-fix-results.md`. **None of these have been run.**
