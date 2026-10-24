# Go-Live Checklist

> **Status: NOT RE-VERIFIED.** The last executed verification was 2026-08-21 (commit `ee26c77`).
> Every code change since then (duplicate-slug removal, fail-closed indexation, payoff/time fixes,
> `SITE_URL` resolution, CI) has **not been built or tested** — the shell cannot start in this
> environment (`SetNamedSecurityInfoW failed (Win32 5): grantWrite`).
> Nothing below may be checked off until the corresponding command has actually run and passed.

## Build & Code — run these, then tick

- [ ] `npm ci` — installs from `package-lock.json` (a lockfile is present)
- [ ] `npm run audit` — expect **`FAIL: 0`** and these lines:
  - `OK [integrity] catalogue  169 unique slugs across 169 entries`
  - `OK [edge-case] Credit Card Payoff  non-amortising payment returns a non-finite payoff, not a misleading 0`
  - `OK [edge-case] Work Hours  overnight 22:00-06:00 resolves to 8 hours`
  - `OK [edge-case] Loan Payment  0% APR resolves to amount / months, not NaN`
  - `OK [policy] catalogue  indexable 169 | reviewed-noindex 0 | unreviewed 0 of 169`
- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run build` — vite build + prerender; log must report
      `canonical origin: <expected host>` and `sitemap: 169+ urls`
- [ ] Catalogue count is **169 entries / 169 unique slugs**
- [ ] `dist/sitemap.xml` has **no duplicate `<loc>`** and **169** `/calculators/` URLs
- [ ] `dist/404.html` contains `robots: noindex` and **no** `rel="canonical"`
- [ ] Prerendered calculator pages contain full calculator markup (no loading skeletons)
- [ ] Working tree committed on a branch (not `main`)

## Environment Variables (Vercel → Settings → Environment Variables)

| Variable | Environment | Purpose |
|---|---|---|
| `SITE_URL` | **Production (required)** | Canonical origin, e.g. `https://calculatedaily.com`. **The production build fails without it** — it will not fall back to a guessed host. |
| `SITE_URL` | Preview (optional) | Leave **unset** to let preview builds use their own `https://$VERCEL_URL`. Set it only if you want a fixed preview canonical. |
| `VITE_GA4_ID` | All | GA4 measurement ID (`G-XXXXXXXXXX`) |
| `GOOGLE_SITE_VERIFICATION` | Production | Search Console token; injects the verification meta tag |

How `scripts/prerender.ts` resolves the canonical origin:

1. `SITE_URL` set → used verbatim (must be absolute).
2. `VERCEL_ENV=preview` and no `SITE_URL` → `https://$VERCEL_URL`, **preview mode**: every page is
   `noindex`, no canonical is emitted, `robots.txt` disallows everything and `sitemap.xml` is empty.
3. `VERCEL_ENV=production` and no `SITE_URL` → **build fails** with
   `SITE_URL is required for production builds`.
4. Local build → `http://localhost:3000` for inspection only.

- [ ] `SITE_URL` set for **Production** scope (and *not* set to the parked domain by accident)
- [ ] `VITE_GA4_ID` set
- [ ] `GOOGLE_SITE_VERIFICATION` set

## Preview deployment (test before production)

- [ ] Push the branch; let Vercel create a **Preview** deployment
- [ ] Confirm the preview build log shows `PREVIEW` mode and `sitemap: 0 urls`
- [ ] Confirm preview pages return `<meta name="robots" content="noindex">`
- [ ] Confirm `https://<preview-host>/robots.txt` is `Disallow: /`
- [ ] Confirm an unknown path on the preview returns an **HTTP 404** (not a 200 shell)
- [ ] Exercise: `/calculators/credit-card-payoff-calculator` (0% APR, payment below interest),
      `/calculators/work-hours-calculator` (22:00→06:00), `/calculators/loan-payment-calculator` (0% APR)
- [ ] **Do not** point `calculatedaily.com` at the preview

## Deploy to production (manual, only after the preview passes)

- [ ] Merge the branch to `main`
- [ ] Vercel production build with `SITE_URL` set to the real domain
- [ ] Verify the build log shows the production origin (not a preview host)
- [ ] Verify live homepage view-source: canonical, `og:url`, GA4 snippet
- [ ] Verify a live unknown URL returns an HTTP **404** with the noindex page
- [ ] Verify `https://<domain>/sitemap.xml` lists 169 calculator URLs and no duplicates

## Post-launch SEO (manual)

- [ ] Google Search Console: verify domain → submit `https://<domain>/sitemap.xml`
- [ ] Request indexing for top pages (mortgage-calculator, percentage-calculator, bmi-calculator,
      compound-interest-calculator, tip-calculator)
- [ ] Bing Webmaster Tools: import from GSC

## Continuous integration

`.github/workflows/ci.yml` runs on every push and pull request:
`npm ci` → `npm run audit` → `npx tsc --noEmit` → `npm run build` → sitemap uniqueness → 404 SEO
assertions → canonical-host assertion → an explicit **preview-mode** build that must be unindexable →
a **production-guard** build that must fail without `SITE_URL`.

- [ ] Workflow has run green on the branch at least once

## Expectation

Launch ≠ traffic. Expect 3–6 months before meaningful organic traffic. Growth engine = the roadmap
batches in `docs/research-and-roadmap.md`. The seven-calculator batch stays blocked until this
checklist's Build & Code section has actually passed.
