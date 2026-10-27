# Production Fix Results — verification record (revision 2)

> ## UNVERIFIED — BUILD NOT RUN
> No command has executed successfully in this session. The shell fails during sandbox provisioning
> with `Error: SetNamedSecurityInfoW failed (Win32 5): grantWrite(H:\2026\calculate-daily)` before the
> process starts. `npm run audit`, `npx tsc --noEmit` and `npm run build` **have not been run**.
> Every change below is justified by **source inspection and arithmetic only**. No test is claimed to
> pass.

Related documents: [`patch-review.md`](./patch-review.md) (line-by-line review and the 8-point
regression review), [`indexation-policy.md`](./indexation-policy.md) (the rule), 
[`regression-test-matrix.csv`](./regression-test-matrix.csv) (43 cases),
[`production-fix-plan.md`](./production-fix-plan.md) (defect rationale).

---

## 1. Headline correction

The previous audit reported **“57 reviewed / 113 unreviewed tools”**. **That was wrong, and it is the
most important finding of this pass.**

Every one of the **169** catalogue entries declares `status: 'index'` **and**
`reviewStatus: 'reviewed'`. The 113 figure came from a line-anchored grep that matched only
**multi-line** `seo` blocks; the other 113 write their `seo` on a single line, so `reviewStatus` never
appeared at line start.

| Check | Count |
|---|---|
| Catalogue entries | 169 |
| `status: 'index'` | 169 |
| `reviewStatus: 'reviewed'` | 169 |
| `seo: {` blocks | 169 |
| Guides reviewed + index | 10 |

Consequence: the review-gated policy **changes no page's indexability today**. Its value is
prospective — a future entry with missing metadata now fails closed instead of publishing silently.
The research pack's recommendation to “review the 113 tools” (decision D14) is retired.

## 2. Files changed

### Source — 8 files

| # | File | Change | Where |
|---|---|---|---|
| 1 | `src/data/catalog/other.ts` | Removed dead duplicate `tip-split` entry (1002 → 952 lines) | 908-909 boundary |
| 2 | `src/data/catalog/finance.ts` | Credit-card payoff guards (balance ≤ 0, APR 0, payment ≤ interest); loan payment 0% branch; payoff worked example corrected | 387-389, 1315-1324, 1329 |
| 3 | `src/data/catalog/time.ts` | Midnight rollover, negative-break clamp, description/tips, example arithmetic fixed | 23-32, 41 |
| 4 | `src/components/calculators/ConfigCalculator.tsx` | Non-finite results kept as `NaN`; rendered “Not calculable” | 59-63, 86-90 |
| 5 | `src/pages/CalculatorPage.tsx` | `noindex` when the slug is unknown | 19-28 |
| 6 | `src/App.tsx` | New `NotFoundPage` (noindex) replaces the inline not-found block | 17-42, 137-138 |
| 7 | `scripts/prerender.ts` | Fail-closed `isIndexable`; guide pages gated; sitemap gated; 404 noindex | 34, 375, 463-466, 425-433 |
| 8 | `scripts/audit-calculators.ts` | Contract check + 5 new audit rows | 209-310 |

### Documents — 6 files

`production-integrity-audit.md` (follow-up pointer), `production-fix-plan.md`,
`production-fix-results.md` (this), `patch-review.md`, `indexation-policy.md`,
`regression-test-matrix.csv`.

**Untouched:** `src/data/calculators.ts`, `src/lib/seo.ts`, `vite.config.ts`, `vercel.json`,
`src/types.ts`, all other calculator components, every `docs/keyword-intelligence/**` file including
the immutable `keyword-master.csv`, and `dist/` (stale).

## 3. Indexation policy — implemented

The rule is `status === 'index' && reviewStatus === 'reviewed'`; anything else is `noindex`, has no
canonical and is absent from the sitemap. Full detail in
[`indexation-policy.md`](./indexation-policy.md).

What changed structurally:

- `isIndexable` now requires an explicit opt-in (was: `!== 'noindex' && !== 'pending'`, which made
  absence mean *indexable*).
- **Guides are gated** — previously their pages and sitemap entries ignored `guide.seo` entirely.
- `audit-calculators.ts` no longer treats `pending` or `noindex`-without-review as errors (both are
  legitimate states); it fails only the contradiction `status:'index'` without `reviewed`.
- The audit now prints the three states: `indexable N | reviewed-noindex N | unreviewed N of 169`.

## 4. Regression checks added

All run under the existing `npm run audit`. No new framework, dependency or script.

| Check | Kind | Fails when |
|---|---|---|
| Slug uniqueness | `integrity` | any slug appears more than once |
| Credit-card payoff, non-amortising | `edge-case` | `payment = 1` returns a finite payoff |
| Work hours, overnight | `edge-case` | `22:00 → 06:00` ≠ 8 hours |
| Loan payment, 0% APR | `edge-case` | payment ≠ `amount / months` (i.e. NaN) |
| Indexation states | `policy` | never — reports the three counts |
| `status:'index'` without `reviewed` | content check | per entry, any such contradiction |

Expected new lines after the fixes:

```
OK [integrity] catalogue  169 unique slugs across 169 entries
OK [edge-case] Credit Card Payoff  non-amortising payment returns a non-finite payoff, not a misleading 0
OK [edge-case] Work Hours  overnight 22:00-06:00 resolves to 8 hours
OK [edge-case] Loan Payment  0% APR resolves to amount / months, not NaN
OK [policy] catalogue  indexable 169 | reviewed-noindex 0 | unreviewed 0 of 169
```

## 5. Commands attempted

| Command | Result |
|---|---|
| `Write-Output "probe"; node --version` | `SetNamedSecurityInfoW failed (Win32 5): grantWrite(H:\2026\calculate-daily)` |
| `npm run audit` | **NOT RUN** |
| `npx tsc --noEmit` | **NOT RUN** |
| `npm run build` | **NOT RUN** |

## 6. Verification status per item

| Item | Status | Basis |
|---|---|---|
| Duplicate slug removed | Applied — **unverified** | 169 slugs enumerated; `tip-split-calculator` appears once; boundary re-read |
| Indexation policy | Applied — **unverified** | Predicate, guide gate and sitemap filter read back |
| Payoff guards | Applied — **unverified** | Six branches analysed by hand |
| Loan 0% branch | Applied — **unverified** | Default case reproduces the documented 396.05 |
| Overnight + clamp | Applied — **unverified** | Five arithmetic cases |
| Non-finite rendering | Applied — **unverified** | Every formatter path traced to `formatResult` |
| 404 / unknown routes | Applied — **unverified** | `buildShell` flag read; `vercel.json` has no rewrites |
| Worked examples | Corrected — **unverified** | Recalculated from source defaults |
| HTTP 404 on the live host | **Unverified — not checkable from source** | Requires a live request |

## 7. Risks to watch on the first real build

1. **`ConfigCalculator.tsx` is shared by 105 config tools.** Undefined maths now shows
   “Not calculable” instead of `0`. If anything regresses, revert this file first — the catalogue
   guards still protect payoff and loan.
2. **`audit-calculators.ts` typing.** If `tsc` objects, delete the `evalResult` helper and its four
   callers; the uniqueness and policy checks are independent.
3. **`App.tsx`** — if `NotFoundPage` causes a problem, restore the inline JSX and drop the import.
4. **`dist/` is stale.** Rebuild; never deploy the current output.

---

# Production integrity gate

Do not start the seven-calculator batch until every item passes or a residual risk is accepted in
writing.

### G1 — TypeScript
```bash
npx tsc --noEmit
```
**Pass:** exit 0.

### G2 — Audit
```bash
npm run audit
```
**Pass:** `FAIL: 0`, plus the five lines in §4 with `indexable 169 | reviewed-noindex 0 | unreviewed 0`.

### G3 — Production build
```bash
npm run build
```
**Pass:** exit 0 and prerender completes.

### G4 — Unique calculator slugs
```bash
node -e "const fs=require('fs');const s=fs.readFileSync('dist/sitemap.xml','utf8');const u=(s.match(/\/calculators\/[^<]+/g)||[]);console.log('calculator urls',u.length,'unique',new Set(u).size)"
```
**Pass:** both numbers **169**.

### G5 — Unique sitemap URLs
```bash
node -e "const fs=require('fs');const s=fs.readFileSync('dist/sitemap.xml','utf8');const u=[...s.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);const d=u.filter((x,i)=>u.indexOf(x)!==i);console.log('urls',u.length,'unique',new Set(u).size,'dupes',d)"
```
**Pass:** `dupes []`.

### G6 — Indexation states
```bash
npm run audit | grep -i "indexation"
```
**Pass:** `indexable 169 | reviewed-noindex 0 | unreviewed 0 of 169`. A different split means the
fail-closed rule is doing something unexpected — investigate before releasing.

### G7 — Canonical host
```bash
node -e "const fs=require('fs');for(const f of ['dist/index.html','dist/calculators/mortgage-calculator.html']){const h=fs.readFileSync(f,'utf8');const m=h.match(/rel=\"canonical\" href=\"([^\"]+)\"/);console.log(f,m&&m[1])}"
```
**Pass:** identical host on both, matching the live deployment, with `SITE_URL` set in the build
environment. If the host is undecided this gate **fails**.

### G8 — 404 handling
```bash
node -e "const fs=require('fs');const h=fs.readFileSync('dist/404.html','utf8');console.log('noindex',/name=\"robots\" content=\"noindex\"/.test(h),'canonical',/rel=\"canonical\"/.test(h))"
```
**Pass:** `noindex true canonical false`. **Then, on the deployed host**, request a nonsense path and
confirm an HTTP **404** status — the status code cannot be verified from the build output, and
`vercel.json` has no rewrites (which is why 404 is expected).

### G9 — Unknown routes
- `GET /calculators/does-not-exist` → noindex, no canonical.
- Client-navigate to an unknown path → title “Page Not Found”, noindex.
- Neither URL appears in `sitemap.xml`.

### G10 — Credit-card payoff edge cases
- 5000 / 19% / **1** → “Not calculable”
- 5000 / 19% / **200** → **33 months**, **$1,600**
- 5000 / **0%** / 200 → **25 months**, **$0**
- **0** balance → **0 months**, **$0**

### G11 — Overnight shifts
- 22:00 → 06:00, break 0 → **8 h / 480 min**
- 09:00 → 17:30, break 30 → **8 h** (unchanged)
- 09:00 → 09:00 → **0 h** (not 24)
- 09:00 → 10:00, break 120 → **0 h** (not negative)

### G12 — Loan payment at 0%
- 20 000 / **0%** / 5 yr → **333.33** monthly, **$20,000** total paid, **$0** interest
- 20 000 / 7% / 5 yr → **≈396.05** (regression: unchanged)

### G13 — No page loss
```bash
node -e "const fs=require('fs');const s=fs.readFileSync('dist/sitemap.xml','utf8');console.log('sitemap urls',(s.match(/<loc>/g)||[]).length)"
```
**Pass:** exactly **one** fewer `<loc>` than the previous build (the removed duplicate) and no other
drop. A larger drop means the fail-closed rule withheld something unintentionally.

### G14 — Residual decisions
- [ ] `SITE_URL` confirmed for the deployment (G7).
- [ ] Live 404 status confirmed (G8).
- [ ] Known residual accepted: a stale canonical can survive client-side navigation to an unknown
      path (`usePageMeta` adds canonicals but never removes them). Crawler impact is nil because
      unknown paths never render the SPA on this host configuration.

---

## 8. Final status

**What is defensible today:** the source. Eight files, no new dependencies, no new routes, no
deployment change, one policy implemented fail-closed, and five regression checks that encode the
exact bugs found — including two defects discovered *during* this review (the 0% loan regression and
the false “113 unreviewed” premise).

**What is not:** nothing has been compiled, type-checked, audited or built. G1–G14 remain open, and
the seven-calculator batch stays blocked until they pass.
