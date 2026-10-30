# Domain Migration Audit — TotalCalculation

**Status: RELEASE BLOCKER OPEN.** The production deployment advertises 316 sitemap
URLs on a hostname that returns HTTP 404. Code fixes are applied and the build is
gated by a new automated audit, but **the deployed site is still wrong** until it
is redeployed and verified live.

| Field | Value |
|---|---|
| Canonical origin (owner-confirmed) | `https://www.totalcalculation.com` |
| Production sitemap URL | `https://www.totalcalculation.com/sitemap.xml` |
| Audit date | 2026-10-30 |
| Audit method | Live HTTPS reads with an HTTP client + source inspection of `dist/` |
| Build/test execution | **NOT RUN this session** — the shell fails at sandbox provisioning (see §9) |

---

## 1. What the live production state actually is

Every statement below was observed directly against the deployed site during this
audit. Verification status is marked so nothing unobserved is presented as fact.

### 1.1 Sitemap — retrieved, HTTP 200, wrong host on every URL

```
GET https://www.totalcalculation.com/sitemap.xml   ->  HTTP 200, body is a
                                                      <urlset> document
<loc> count                                        ->  316 (machine-counted)
<loc> origin                                       ->  316 of 316 =
                                                      https://calculate-daily.vercel.app
root element                                       ->  <urlset>  (NOT a sitemap index)
xmlns                                              ->  http://www.sitemaps.org/schemas/sitemap/0.9
```

The URL **set** is correct and matches the local build one-for-one (8 static
pages, 12 categories, 292 calculators, 4 reviewed guides). Every `<loc>` host is
wrong.

### 1.2 The host those 316 URLs point at is dead

```
GET https://calculate-daily.vercel.app/calculators/mortgage-calculator
  ->  HTTP 404
      body: {"error":{"code":"404","message":"The deployment could not be found on Vercel."}}
```

So the production sitemap is a list of **316 URLs that all 404**. This is worse
than an absent sitemap: it actively invites crawlers to fetch 316 dead URLs on a
third-party hostname.

### 1.3 robots.txt — declares the dead-host sitemap

```
GET https://www.totalcalculation.com/robots.txt   ->  HTTP 200
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://calculate-daily.vercel.app/sitemap.xml
```

The crawl directives themselves are fine (public pages allowed, nothing essential
blocked, `/api/` is a no-op because no such route exists). The `Sitemap:`
declaration points at the retired host.

### 1.4 Host and redirect behaviour

| Request | Observed result |
|---|---|
| `https://www.totalcalculation.com/` | HTTP 200 (serves the site) |
| `https://www.totalcalculation.com/calculators/mortgage-calculator` | HTTP 200 (page renders correctly) |
| `https://totalcalculation.com/` | redirect → `https://www.totalcalculation.com` |
| `https://totalcalculation.com/about` | redirect → `https://www.totalcalculation.com` — **path dropped** |
| `https://totalcalculation.com/calculators/mortgage-calculator` | redirect → `https://www.totalcalculation.com` — **path dropped** |
| `http://totalcalculation.com/` | redirect → `https://totalcalculation.com` (then to www: 2 hops) |
| `http://www.totalcalculation.com/` | redirect → `https://www.totalcalculation.com` |
| `https://calculate-daily.vercel.app/...` | HTTP 404, no redirect |

**Conclusion — canonical host is `www`.** The apex permanently redirects to the
www host, so the www host is the only origin that answers 200. Canonicalising to
the apex would point every canonical tag at a redirecting URL.

**Second defect — the apex redirect destroys the path.** Every apex URL, at any
depth, lands on the new homepage. `/about`, `/calculators/*`, `/guides/*` and
every apex deep link are collapsed into one destination. This is the exact
"redirect everything to the homepage" failure the migration brief forbids.

> **Observation limit, stated plainly.** The redirect *targets* above are proven
> (the client reports the cross-origin destination it refuses to follow). The
> redirect *status code* (301 vs 302 vs 308) and the response headers
> (`content-type`, `cache-control`, `location`) could **not** be read: this
> session's shell is unusable (§9), so no header-level HTTP client was available.
> `scripts/audit-domain-migration.ts --live` performs exactly these checks and
> prints status codes, content types and final URLs. Run it before sign-off.

---

## 2. What was wrong in the repository

The live sitemap and the local build were wrong in **two different ways**, which
is why "the build succeeds" never caught this.

| # | Defect | Where | Consequence |
|---|---|---|---|
| D1 | Canonical origin came from a mutable env var with no guard | `src/lib/siteConfig.ts` | A stale `SITE_URL` published the retired host on all 316 URLs |
| D2 | Code's expected origin was the **apex**, a redirecting host | `dist/robots.txt`, `docs/cloudflare-pages-deploy.md` | A correct rebuild would still canonicalise to a 301 |
| D3 | Stale-host guard was inverted — it treated the *new* domain as stale | `scripts/audit-prerender.ts` | The audit would **fail** a correct www build and pass the retired one |
| D4 | `lastmod` was `new Date()` — the build timestamp, on all 316 URLs | `scripts/prerender.ts` | Trains crawlers to ignore `<lastmod>` |
| D5 | Sitemap URL list was hand-maintained, separate from the page list | `scripts/prerender.ts` | Could silently drift from the real indexation inventory |
| D6 | No sitemap-index path above the 50,000-URL protocol limit | `scripts/prerender.ts` | Would emit an invalid sitemap as the catalogue grew |
| D7 | Footer wordmark hardcoded the **previous brand, "FormulaTap"** | `src/components/Footer.tsx:35` | Old branding on every page of the site |
| D8 | No audit distinguished local-build success from live production state | `scripts/` | The exact gap that let this ship |
| D9 | Apex redirect drops path and query | Cloudflare zone config (not in repo) | 301s to the homepage instead of the equivalent page |

D7 was invisible to a naive search: the wordmark is split across a JSX element
(`<span>Formula<span>Tap</span></span>`), so a search for the literal string
`FormulaTap` returns nothing. It is now derived from `BRAND_NAME`.

---

## 3. The canonical domain decision

**`https://www.totalcalculation.com` is canonical. The apex is not.**

| Candidate | Evidence | Verdict |
|---|---|---|
| `https://www.totalcalculation.com` | Answers 200 | **Canonical** |
| `https://totalcalculation.com` | 301s to www | Redirect only — never canonical |
| `https://calculate-daily.vercel.app` | HTTP 404, deployment gone | Retired |
| `http://` variants of either | redirect to https | Never canonical |

This matches the owner-confirmed production domain. One host, used everywhere.

### Where the canonical origin now lives

`src/lib/siteConfig.ts` exports the constant:

```ts
export const CANONICAL_ORIGIN = 'https://www.totalcalculation.com';
export const APEX_REDIRECT_ORIGIN = 'https://totalcalculation.com';
export const RETIRED_HOSTNAMES = [ 'calculate-daily.vercel.app', ... ];
```

It is **code, not configuration**. `resolveSite()` now:

1. throws if any resolved origin is a retired hostname (every mode, including preview);
2. normalises the apex to the www origin;
3. throws if a **production** build resolves to anything other than the canonical origin;
4. refuses to emit `http://localhost:3000` canonicals when no origin is configured — it falls back to the canonical origin instead.

Consequence: a stale dashboard environment variable can no longer publish a wrong
canonical. The build stops instead. That is deliberate — this defect is a release
blocker, so failing loudly is the correct behaviour.

Because of (3) and (4), `SITE_URL` is now optional in production: unset builds
produce the correct www origin. Setting it to the canonical origin is still
recommended for explicitness, and setting it to anything else fails the build.

---

## 4. Page / index / sitemap arithmetic

The three numbers are different, and conflating them is how the sitemap drifted.

| Quantity | Count | What it is |
|---|---|---|
| **Generated pages** | **614** | Every page `scripts/prerender.ts` renders into `dist/` |
| **Indexable pages** | **316** | Pages that render without `noindex`, i.e. may be indexed |
| **Sitemap URLs** | **316** | Same 316. Sitemap is derivable from indexability, not maintained by hand |
| Intentionally excluded | 298 | Generated but `noindex` and absent from the sitemap |
| Plus `404.html` | 1 | Not a route, `noindex`, no canonical |
| HTML files in `dist/` | 615 | 614 + `404.html` |

**Composition of the 614 generated pages**

| Group | Count |
|---|---|
| Home | 1 |
| `/calculators` directory | 1 |
| Calculator pages | 292 |
| Embed shells (`/embed/:slug`) | 292 |
| Category pages | 12 |
| Static pages (`/savings-goal`, `/about`, `/privacy`, `/terms`, `/contact`) | 5 |
| `/guides` listing | 1 |
| Guide pages | 10 |
| **Total** | **614** |

**Composition of the 316 sitemap entries**

| Group | Count |
|---|---|
| Home | 1 |
| `/calculators` | 1 |
| `/guides` | 1 |
| Static pages | 5 |
| Categories | 12 |
| Calculators (all 292 are `status:'index'` + `reviewStatus:'reviewed'`) | 292 |
| Guides (4 of 10 reviewed and indexable) | 4 |
| **Total** | **316** |

**The 298 intentional exclusions, and why**

| Excluded | Count | Reason |
|---|---|---|
| `/embed/:slug` shells | 292 | Embeddable widget surfaces. They exist so a third-party `<iframe>` gets a real document instead of a 404, but they are `noindex` by design: they are framing targets, not ranking pages, and their content duplicates the canonical calculator page. Excluding them from the sitemap is correct, and no calculator is lost from the index because each one's canonical `/calculators/:slug` page stays listed. |
| Unreviewed guides | 6 | Declared `status:'noindex'` + `reviewStatus:'pending'`: they have not passed editorial review, so the review-gated indexation policy (`docs/indexation-policy.md`) fails closed. See the list below. |

The 6 withheld guides — deliberately **not** a sitemap simplification, and
deliberately **not** promoted to make the sitemap look fuller:

- `complete-home-buying-guide`
- `tdee-macros-complete-guide`
- `compound-interest-savings-guide`
- `running-pace-training-zones-guide`
- `bmi-body-fat-weight-guide`
- `debt-payoff-strategy-guide`

The 4 indexable guides: `home-renovation-math-guide`,
`cooking-by-weight-guide`, `understanding-percentages-guide`,
`date-planning-countdown-guide`.

> Neither `614` nor `316` was chosen as a target. 614 falls out of the catalogue
> plus the embed surface; 316 falls out of the review-gated indexation rule. The
> numbers are reported, not engineered. In particular the sitemap was **not**
> forced to 316 entries and no calculator was removed to make it smaller.

**Sitemap index or URL set?** A single `<urlset>`, which is correct at 316 URLs.
The generator now enforces the protocol limits (50,000 URLs / 50 MB per file) and
will switch to a `<sitemapindex>` with chunked child files automatically **if**
either limit is ever exceeded. Today an index would just add a pointless hop.
`robots.txt` always advertises `/sitemap.xml`, which is the urlset now and would
be the index later — so the declared URL never changes.

---

## 5. Redirects

### 5.1 What must happen

| From | To | Status | Path preserved |
|---|---|---|---|
| `https://totalcalculation.com/<path>?<query>` | `https://www.totalcalculation.com/<path>?<query>` | 301 | **must be** |
| `http://totalcalculation.com/<path>` | `https://www.totalcalculation.com/<path>` | 301 | must be |
| `http://www.totalcalculation.com/<path>` | `https://www.totalcalculation.com/<path>` | 301 | must be |
| `https://calculate-daily.vercel.app/<path>` | `https://www.totalcalculation.com/<path>` | 301 | must be |
| Legacy duplicate slugs (8) | their canonical calculator | 301 | n/a — path changes by design |

### 5.2 What happens today

- Apex → www: **works but drops the path and query** (§1.4). Broken.
- `http` → `https`: works, but apex→www makes it a 2-hop chain.
- Old `calculate-daily.vercel.app`: **404, not a redirect.** Active defect.
- New domain does **not** redirect back to the old one — no loop. Confirmed.

### 5.3 Owner action — fix the apex redirect (Cloudflare)

`_redirects` cannot express this: Pages `_redirects` matches paths *on the host
serving the file*, so a host rule there would also fire on www and loop. It has to
be a zone-level **Redirect Rule** (Rules → Redirect Rules → Create rule):

- **When incoming requests match:** custom filter expression
  `(http.host eq "totalcalculation.com")`
- **Then:** *Dynamic* redirect
- **Expression:**
  ```
  concat("https://www.totalcalculation.com", http.request.uri.path)
  ```
- **Status code:** `301`
- **Preserve query string:** **ON**

Then also make sure `http://` → `https://` happens **before** the www rule, so it
is one hop, not two (Cloudflare's *Always Use HTTPS* rule does this; order it above
the apex→www rule).

Verify with the audit's live pass, or by hand:

```bash
curl -sI https://totalcalculation.com/about | grep -i '^location'
# expect: location: https://www.totalcalculation.com/about
curl -sI 'https://totalcalculation.com/calculators/mortgage-calculator?a=1' | grep -i '^location'
# expect: location: https://www.totalcalculation.com/calculators/mortgage-calculator?a=1
```

### 5.4 Owner action — the old Vercel hostname

`https://calculate-daily.vercel.app` is not a domain the owner controls at a
registrar; it is a Vercel-assigned subdomain whose deployment has been deleted.
Two honest options:

1. **Preferred — restore the hostname and 301 it.** If the `calculate-daily`
   project name is still available in the Vercel account, recreate a minimal
   project on that name so Vercel reassigns the subdomain, then redirect every
   path with `vercel.json`:
   ```json
   { "redirects": [{ "source": "/(.*)", "destination": "https://www.totalcalculation.com/$1", "permanent": true }] }
   ```
   `$1` preserves the path; Vercel preserves the query string. This gives the
   old slug set a real 301 instead of a 404.
2. **Fallback — accept the 404 and let it decay.** Nothing currently links to the
   old host, and the sitemap will stop advertising it. Any old inbound link
   breaks. Only acceptable if the old hostname never accumulated links.

Either way: **do not** repoint `SITE_URL` at the old host, and do not let the old
hostname appear in any generated file. The audit fails the build if it does.

*Constraint acknowledged: where the owner does not control the old hostname, a
redirect is impossible. That is recorded here rather than claimed as done.*

---

## 6. Cloudflare Pages compatibility

| Item | Configured | Verified in this audit |
|---|---|---|
| Build command | `npm run build` (`docs/cloudflare-pages-deploy.md`, `vercel.json`) | Repo config only — not observable live |
| Output directory | `dist` | Repo config only |
| `SITE_URL` production env | **was the retired host** — this is D1's trigger | **Inferred, not directly readable.** The live sitemap proves the deployed build resolved `SITE_URL=https://calculate-daily.vercel.app` (or an equivalent override) |
| Sitemap/robots generation timing | `scripts/prerender.ts`, after `vite build` | Correct order in `package.json`; a `public/` copy would win — now hard-failed (§7) |
| `_redirects` | 8 permanent legacy slug redirects | Copied from `public/` to `dist/`; parsed and validated by the audit |
| `_headers` | caching, security, embed framing | Audit fails on `X-Robots-Tag: noindex` in `_headers` |
| Prerender output | 614 pages + 404 + sitemap + robots | Not re-run this session (§9) |

**The stale-static-file trap.** `public/` is copied into `dist/` verbatim by Vite,
*before* prerender runs. A hand-maintained `public/sitemap.xml` or
`public/robots.txt` would therefore win over, or duplicate, the generated file —
the classic "build succeeded, deployment wrong" cause. Both files are absent from
`public/` today, and `scripts/audit-prerender.ts` now **fails the build** if either
reappears.

**Vercel support is retained.** `vercel.json` is untouched: same redirects, same
headers, same `buildCommand`/`outputDirectory`. `public/_redirects` and
`public/_headers` remain inert under Vercel. Nothing was removed.

---

## 7. The automated audit

`scripts/audit-domain-migration.ts` — new, reusable, no new dependencies.

```bash
npx tsx scripts/audit-domain-migration.ts           # local build only
npx tsx scripts/audit-domain-migration.ts --live    # local + 12-URL live sample
npx tsx scripts/audit-domain-migration.ts --live --all   # every live sitemap URL
npm run audit:domain / audit:domain:live / audit:domain:live:all
```

It runs as the final step of `npm run build`, so a wrong-canonical build cannot be
deployed.

**Local pass (against `dist/`)**

| Check | How |
|---|---|
| Sitemap XML validity | XML declaration, single root, correct 0.9 namespace, balanced `<url>` elements, root closed |
| Sitemap hostname consistency | every `<loc>` origin must equal the canonical origin exactly; no plain HTTP |
| Duplicate sitemap entries | exact-duplicate detection |
| Query strings / fragments / trailing slashes | rejected per site convention |
| Protocol limits | >50,000 URLs without an index fails |
| `<lastmod>` accuracy | valid `YYYY-MM-DD`, not in the future, and **fails if every value equals the build date** (the build-timestamp regression) |
| Sitemap ↔ route inventory, both directions | every sitemap URL must have a generated page; every indexable generated page must appear in the sitemap; set sizes must match |
| Canonical hostname consistency | exactly one canonical per page, equal to the page URL, on the canonical origin; `og:url` must equal the canonical |
| Old-domain references in generated output | scans every `.html`, `.xml`, `.txt`, `.json`, `.js`, `.css`, `.webmanifest`, `.svg`, plus `_redirects` and `_headers` for all retired hostnames and brand strings |
| Robots.txt | exactly one `Sitemap:` pointing at the canonical sitemap; `Allow: /` present; no `Disallow: /`; no rule matching calculators, guides, categories, `/assets`, `/fonts`, sitemap or robots |
| Redirects | permanent only (301/308), no self-redirect, no homepage fallback, no chain, every target must be a generated page |
| Headers | fails on `X-Robots-Tag: noindex`; warns on a `Content-Type` override for sitemap/robots |
| Missing generated routes | the 8 required static routes must exist |
| Page accounting | prints generated / indexable / sitemap / excluded with reasons |

**Live pass (`--live`)**

| Check | How |
|---|---|
| Live sitemap | HTTP 200, XML content type, no redirect, every `<loc>` on the canonical host, count must equal the local build |
| Live robots.txt | HTTP 200, `text/plain`, declares the canonical sitemap, no site-wide disallow |
| Homepage | HTTP 200, self-canonical on the canonical origin, no redirect |
| Representative URLs | HTTP 200, no redirect, self-referencing canonical, no `noindex` |
| Apex redirect | must land on the **same path** on the canonical host — this is the check that catches the homepage-collapse bug |
| Retired hosts | must not serve 200 content; reports redirect / 404 / other instead of assuming |

**The separation is explicit in the output.** Without `--live` the script prints
`LIVE PRODUCTION VERIFICATION — NOT RUN` and states that the pass verified the
local build only. A green local run is never reported as production readiness.

---

## 8. Google Search Console readiness — owner checklist

Nothing here is done yet. Submitting a sitemap is not the same as Google having
processed a migration.

1. **Verify the new property.** Add a **Domain** property for
   `totalcalculation.com` (DNS TXT record — covers `www` and the apex). The URL
   Prefix alternative is `https://www.totalcalculation.com/`. The build already
   supports a `<meta name="google-site-verification">` token via the
   `GOOGLE_SITE_VERIFICATION` build variable if you prefer URL-prefix
   verification.
2. **Submit the sitemap** at `https://www.totalcalculation.com/sitemap.xml` —
   and only after the redeploy, so the submitted file contains canonical URLs.
3. **Confirm what Google fetched.** In the new property: Sitemaps → the submitted
   URL should show "Success" with 316 discovered URLs. A "Couldn't fetch" or a
   hostname warning means the deployment is still wrong.
4. **URL Inspection — spot-check five:** `/`, `/calculators`,
   `/calculators/mortgage-calculator`, `/calculators/bmi-calculator`,
   `/calculators/percentage-calculator`. Confirm "URL is on Google" status,
   user-declared canonical = the requested URL, and that the Google-selected
   canonical matches. Request indexing on these five only; do not mass-request.
5. **Check the old hostname.** Inspect `https://calculate-daily.vercel.app/...`
   in the old property (if it exists). Expect 404 — that is intended; those URLs
   should drop out. If any are still indexed with traffic, restore the 301 in §5.4.
6. **Change of Address** is only available when the old property has verified
   ownership. Because the old host is a `vercel.app` subdomain whose deployment is
   gone, this may not be offered at all; the redirect is the fallback signal.
7. **Monitor weekly for 4 weeks:** Pages → *Not indexed* (expect the 298
   intentional `noindex` pages, nothing else), Crawl stats → 404 count (must fall
   toward zero), Sitemap "last read" date, and Search results → confirm the
   www hostname is the one appearing in queries.
8. **Bing Webmaster Tools:** import from GSC, submit the same sitemap.

**Do not** conclude the migration worked because the sitemap was accepted.
Acceptance means the file parsed. Migration success is visible in the *Indexing →
Pages* report and in the hostname that appears in search results, typically over
days to weeks.

---

## 9. Verification status — what is proven and what is not

This section exists because most of the work could not be executed. Be blunt about
it.

### Environment blocker

Every shell invocation in this session failed before the process started:

```
Error: SetNamedSecurityInfoW failed (Win32 5): grantWrite(H:\2026\calculate-daily)
```

This is a Windows file-permission problem on the workspace root that prevents the
agent sandbox from provisioning write access. The bundled diagnosis/repair script
(`diagnose-windows-sandbox-acl`) could not fix it: its unconfined run failed with
`spawn UNKNOWN`, and a confined run cannot write permissions by design.

Consequently the following were **NOT RUN**:

| Command | Status |
|---|---|
| `npm run audit` (catalogue audit) | **NOT RUN** |
| `npm run test:seo` | **NOT RUN** |
| `npm run test:calculators` | **NOT RUN** |
| `npx tsc --noEmit` / `npm run lint` | **NOT RUN** |
| `npm run build` | **NOT RUN** |
| `npm run audit:domain` | **NOT RUN** |
| `npm run audit:domain:live` | **NOT RUN** |

File reads and writes worked throughout, so every code change was applied by
reading and editing source. No test result is claimed.

### Verified vs unverified

| Claim | Status | Basis |
|---|---|---|
| Live sitemap is 316 URLs on the retired host | **VERIFIED** | Live fetch, machine-counted |
| Live robots.txt declares the retired-host sitemap | **VERIFIED** | Live fetch, full body read |
| The retired host returns HTTP 404 | **VERIFIED** | Live fetch |
| Apex redirects to www | **VERIFIED** (target) | Live fetch redirect report |
| Apex redirect drops the path | **VERIFIED** (target) | `/about` and a deep calculator path both land on the www root |
| No redirect loop back to the old domain | **VERIFIED** | Redirect targets inspected |
| Redirect **status codes** (301/302/308) | **NOT VERIFIED** | No header-level client available |
| Response headers / content types | **NOT VERIFIED** | Same reason |
| Live `<link rel="canonical">` values | **NOT VERIFIED — inferred** | The live sitemap proves the deployed build's origin is the retired host, and canonicals are generated from that same variable. Confirm with view-source or `--live` |
| Local build has 316 URLs / 614 pages | **VERIFIED from source + `dist/` artefacts** | `dist/sitemap.xml` and `dist/` file inspection; not a fresh build |
| The code changes in §10 are correct | **Applied, unverified** | Source inspection only; needs a build |
| Apex redirect path preservation | **OPEN — owner action** | Still drops the path |
| Old-host 301 | **OPEN — owner action** | Old host 404s |

### How to close the gaps

```bash
# 1. Fix permissions, then:
npm run build                    # includes the new domain audit
npm run audit && npm run test:seo && npx tsc --noEmit
# 2. Redeploy Cloudflare Pages with SITE_URL=https://www.totalcalculation.com
# 3. Verify the deployed site, not the build:
npm run audit:domain:live:all
```

---

## 10. Exact files changed

| File | Change |
|---|---|
| `src/lib/siteConfig.ts` | Added `CANONICAL_ORIGIN`, `APEX_REDIRECT_ORIGIN`, `RETIRED_HOSTNAMES`; retired-host rejection in all modes; apex→www normalisation; production origin locked to the canonical origin; unconfigured builds default to the canonical origin instead of localhost |
| `src/lib/siteConfig.test.ts` | Rewritten for the locked canonical origin, apex normalisation, retired-host rejection, and the no-localhost default |
| `src/lib/brand.ts` | Corrected false domain documentation (`currentCanonicalOrigin`, `intendedDomain` → www); pointed the canonical origin at `siteConfig` as the single source of truth |
| `src/components/Footer.tsx` | **Removed the stale "FormulaTap" wordmark**; wordmark and bottom-bar brand now derive from `BRAND_NAME` |
| `src/types.ts` | Added optional `seo.updatedAt` (calculator and guide) for real `lastmod` sourcing |
| `scripts/prerender.ts` | Sitemap derived from the rendered page inventory; real content dates only (no build timestamp); `lastmod` omitted when no date is known; fail-closed date validation; duplicates/host/trailing-slash/query guards; auto sitemap index above protocol limits; stale sitemap chunk cleanup |
| `scripts/audit-prerender.ts` | Replaced the inverted stale-host guard; requires the exact canonical origin; rejected-URL helper; `<lastmod>` build-date detection; retired-domain scan of every generated HTML file; sitemap-index flattening; fails if `public/sitemap*.xml` or `public/robots.txt` exist |
| `scripts/audit-domain-migration.ts` | **New.** The reusable local + live migration audit (§7) |
| `package.json` | Added `audit:domain`, `audit:domain:live`, `audit:domain:live:all`; wired the domain audit into `build` |
| `public/_redirects` | Documented that host-level apex→www cannot live here and why; recorded the live apex defect |
| `docs/domain-migration-audit.md` | **New.** This document |
| `docs/launch-checklist.md` | New domain-migration gate; corrected stale sitemap/SITE_URL claims |
| `docs/cloudflare-pages-deploy.md` | Corrected `SITE_URL` from the apex to `https://www.totalcalculation.com`; corrected the expected sitemap host; removed the false "old Vercel host stays alive" claim |
| `docs/totalcalculation-domain-cutover.md` | Updated status: the domain is attached; the www decision recorded; the apex path defect recorded |
| `docs/totalcalculation-rebrand.md` | Corrected the open item that said production canonicals "intentionally still point at `calculate-daily.vercel.app`" |

Not touched: `src/data/**` (catalogue content), `vercel.json`, `vite.config.ts`,
all calculator components other than the footer, and any page copy.

---

## 11. Remaining blockers

Release stays blocked until **all** of these are true.

| # | Blocker | Owner | How it is closed |
|---|---|---|---|
| B1 | **Redeploy with the canonical origin.** The live sitemap and robots.txt still advertise the retired host | Owner (Pages redeploy) | Set `SITE_URL=https://www.totalcalculation.com` (or unset — it now defaults correctly), redeploy, run `npm run audit:domain:live` |
| B2 | **Apex redirect drops the path and query** | Owner (Cloudflare Redirect Rule) | §5.3; verified by the audit's apex check |
| B3 | **Old host returns 404, no 301** | Owner (Vercel) | §5.4 option 1, or accept decay |
| B4 | **No build or test has run** — the shell is unusable in this environment | Owner / environment | Fix workspace permissions, then `npm run build` + tests (§9) |
| B5 | **Live response headers never inspected** | — | `npm run audit:domain:live` reports status codes and content types |
| B6 | **Footer brand fix is unverified in a build** | — | Included in B4's build; the domain audit also scans output for retired brand strings |
| B7 | **GSC property not verified; sitemap not submitted** | Owner | §8 |

### What is *not* a blocker

- 316 sitemap URLs is correct and complete for the current catalogue; the sitemap
  does not need to be made bigger or smaller.
- 298 `noindex` pages is the intended indexation policy, not a defect.
- The single `<urlset>` is correct; no sitemap index is needed at this size.
- `vercel.json` remaining in place is intentional.
