# totalcalculation.com cutover checklist

Status as of 30 October 2026: **hosting decision made — Cloudflare Pages**
(see `docs/cloudflare-pages-deploy.md` for the build, verification and DNS
steps). `totalcalculation.com` is bought but not yet attached. The repository
is prepared for both hosts: Vercel config stays valid, and the Pages-side
`_redirects`, `_headers`, and `ads.txt` files are inert under Vercel. — no code changes.

The code currently emits `https://calculate-daily.vercel.app` for every
canonical, `og:url`, JSON-LD URL, sitemap and robots.txt entry via the
`SITE_URL` build variable. That stays until step 4 below is possible.

## Preconditions (owner)

1. **totalcalculation.com is bought** — keep it in the same registrar/DNS account stack
   you can actually change.
2. Decide the mailbox plan BEFORE announcing the new brand address. Today the
   site publishes `hello@calculatedaily.com`, which works. Either keep the old
   address as a forwarding account after cutover, or verify the new mailbox is
   live before swapping the address.
3. Confirm the Vercel project name/ownership for the production alias, and
   access to add a domain to it.

## Cutover steps

### 1. Add the domain in Vercel (does not go live yet)

- Project → Settings → Domains → Add `totalcalculation.com` and `www.totalcalculation.com`.
- Accept the domain (it verifies once DNS exists).
- Do NOT remove `calculate-daily.vercel.app` and do NOT set the new domain as
  production alias yet.

### 2. DNS (registrar)

- Apex `@` → ALIAS/ANAME to `cname.vercel-dns.com` (or A records to
  `76.76.21.21` as Vercel instructs for the account).
- `www` → CNAME to `cname.vercel-dns.com`.
- Wait for propagation and confirm Vercel issues TLS certificates for both.

### 3. Redirects from the old host (SEO-critical)

The old domain must 301-redirect **every path, preserving the path and query**,
to the new host. All slugs are identical today, so this is a whole-domain
301, not a page-by-page mapping. Check for:

- No redirect chains (old → new only, depth 1).
- `calculate-daily.vercel.app/calculators/mortgage-calculator →
  totalcalculation.com/calculators/mortgage-calculator` etc., query strings intact.

If Vercel keeps both domains on one project, its automatic domain redirect
takes care of this once totalcalculation.com is the *primary* domain. Otherwise add
redirect rules in `vercel.json` (source `/(.*)` → destination
`https://totalcalculation.com/$1`, permanent) and re-verify the embed path
`/embed/:slug` still frames correctly from third-party sites — do not let a
global X-Frame-Options rule regress it (see AGENTS.md).

### 4. Flip the canonical origin (code)

- `.env.example`: `SITE_URL="https://totalcalculation.com"`.
- Vercel project env: set `SITE_URL=https://totalcalculation.com` for
  **Production**.
- Update the contact email (`src/pages/ContactPage.tsx`,
  `src/lib/brand.ts` → `contactEmail`) to the verified totalcalculation.com mailbox.
- Update `src/lib/brand.ts` `currentCanonicalOrigin`, and this document's
  status line.
- Rebuild and redeploy. Verify (see verification list below) before the old
  domain starts redirecting traffic.

### 5. Search engines

- Google Search Console: add the `totalcalculation.com` property, verify via the
  injected `google-site-verification` token (build-time env var already
  supported: `GOOGLE_SITE_VERIFICATION`).
- Submit `https://totalcalculation.com/sitemap.xml`.
- In the OLD domain's property, watch the Change-of-Address tool; once
  redirects are live for at least the whole domain, run
  Change-of-Address from calculate-daily.vercel.app → totalcalculation.com if both
  properties are available (the Vercel-hosted domain counts as a resource).
- Bing Webmaster Tools: repeat (auto-import from GSC is fine).

### 6. Post-cutover monitoring (first 2–4 weeks)

- GSC: crawl errors, indexing (pages should re-crawl across properties),
  404 trend (must be ~zero; the slug set is unchanged).
- `site:calculatedaily.vercel.app` should wither; `site:totalcalculation.com`
  should grow.
- 3rd-party embeds: they keep working (iframe src unchanged if you keep the
  old host serving `/embed/*`; if the old host is decommissioned, published
  embed snippets must be replaced — announce a grace period).

## Verification after the flip

- [ ] `curl -I https://totalcalculation.com` → 200 from the new project build with
      `SITE_URL=https://totalcalculation.com`.
- [ ] Every prerendered page: only one canonical, matching `og:url`, hostname
      totalcalculation.com (run `scripts/audit-prerender.ts` — it fails if a stale
      origin survives; update its expectations for the new domain).
- [ ] `https://totalcalculation.com/sitemap.xml` reachable, 316 URLs, new host.
- [ ] `https://totalcalculation.com/robots.txt` has the new sitemap URL.
- [ ] Sample 10 URLs on the old domain → 301 → identical path on new domain,
      query preserved.
- [ ] No redirect loops or chains (`curl -IL` chain length 1 hop).
- [ ] `/embed/mortgage-calculator` frameable (no X-Frame-Options regression).
- [ ] GA4 property still receives traffic (VITE_GA4_ID unchanged) — meaningful
      comparison across the migration.
- [ ] New mailbox verified by actually sending and receiving mail.

## What stays true regardless of when this happens

- The catalogue, routes and slugs do not change at cutover, so the mapping is
  1:1 per path (nothing redirects to the homepage).
- The embed protocol and localStorage keys are already decoupled from the
  domain.
- Preview deployments remain noindex (handled by `siteConfig` + prerender).
