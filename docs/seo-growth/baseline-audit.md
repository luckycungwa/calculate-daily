# Baseline Audit — Total Calculation

**Date:** 2026-10-31
**Scope:** repository + all calculator URLs, read from source rather than assumed.
**Evidence:** `npm run seo:inventory` (regenerates [`calculator-inventory.csv`](./calculator-inventory.csv)), `npm run audit`, `npm run build`, `npx tsx scripts/audit-prerender.ts`.

This is the audit of record for the 2026-10-31 trends cycle. Numbers here are generated, not counted by hand:
`calculator-inventory.csv` is written by `scripts/seo-inventory.ts` straight from the catalogue.

## 1. Verified architecture

| Layer | What it actually is | Where |
|---|---|---|
| Build | Vite 6 + React 19, TypeScript, Tailwind 4 | `vite.config.ts`, `package.json` |
| Rendering | SPA that is **prerendered at build time** — `renderToStaticMarkup` inside JSDOM, one HTML file per route | `scripts/prerender.ts` |
| Routing | Client router with an explicit parse table: `/calculators/:slug`, `/categories/:id`, `/guides/:slug`, `/embed/:slug`, plus 8 static pages | `src/lib/router.tsx` |
| Catalogue | 294 typed entries across 12 content modules; split into lazy chunks; a generated index carries names/descriptions only | `src/data/catalog/*.ts`, `src/data/catalogRuntime.ts` |
| Generator UI | Three kinds: `config` (declarative formula spec), `converter` (unit groups), `custom` (hand-built React component) | `src/components/calculators/CalculatorRenderer.tsx` |
| Guides | 11 typed articles in `src/data/guides/` | `src/data/guides/index.ts` |
| SEO metadata | Review-gated: indexable **only** when `seo.status === 'index'` **and** `seo.reviewStatus === 'reviewed'` | `scripts/prerender.ts:isIndexable` |
| Structured data | `WebSite` + `Organization` (home), `WebApplication` + `FAQPage` + `BreadcrumbList` (calculator), `Article` + `FAQPage` + `BreadcrumbList` (guide) | `scripts/prerender.ts` |
| Sitemap / robots | Generated at build from the same predicate; `<lastmod>` from `seo.updatedAt` / `publishedAt` / `STATIC_PAGE_DATES` | `scripts/prerender.ts` |
| Verification | calculator audit + prerender audit + domain-migration audit all run inside `npm run build` | `scripts/*.ts` |

## 2. Verified baseline counts (before this cycle's changes)

| Measure | Value |
|---|---|
| Calculators | **292** |
| Categories | 12 (`math` 40, `finance` 59, `health` 38, `conversion` 40, `time` 17, `construction` 33, `other` 19, `tech` 12, `science` 12, `foodAndAuto` 12, `sportsAndHome` 9, `ai` 1 in the generated index) |
| Indexable calculators | **292 of 292** (reviewed; 0 unreviewed, 0 reviewed-noindex) |
| Guides | 10, of which **4 indexable** |
| Sitemap URLs | 316 |
| Generated HTML files | 614 |
| Duplicate calculator names | 0 |
| Duplicate short descriptions | 0 |
| Calculators with ≥3 FAQs | 292 (audit enforces ≥2) |
| Calculators with **no documented formula** | **7** |
| Calculators with **zero contextual inbound links** | **69 (24%)** |
| `seo.title` / `seo.description` overrides in use | **0** |

## 3. Defects found by this audit

### D1 — Every page shipped the home page's meta description (critical, fixed)
`index.html` wraps the description over two lines:

```html
<meta name="description"
  content="Free online calculators and unit converters …" />
```

`scripts/prerender.ts` replaced metadata with literal single-line regexes (`/<meta name="description" content="[^"]*" \/>/`). None matched, and `setMeta()` returned the input unchanged when it did not match. Result: **all 614 prerendered pages carried an identical description**, while titles and canonicals were correct and every existing check passed.

Fixed by addressing tags structurally (`setMetaContent`), throwing when a tag is missing, and adding two audit assertions: the shell description must not appear on any page except `/`, and no description may be shared by more than two pages. After the fix, **620 of 620 pages have a distinct description**.

### D2 — Prerender silently reused an already-prerendered shell (fixed)
Running `scripts/prerender.ts` twice against the same `dist/` fed the generated home page back in as the template: the home page's canonical and JSON-LD leaked into `404.html`, and because `<div id="root"></div>` no longer existed, other pages kept the home page's markup. Now the script refuses to run unless the shell is a fresh Vite build.

### D3 — Prerender audit exhausted the Node heap (fixed)
`audit-prerender.ts` parsed all 620 pages, then parsed every sitemap URL a second time, with JSDOM. Peak memory sat at the ~4 GB heap limit and began failing with `JavaScript heap out of memory`. The second parse duplicated checks the first pass already made; the JSDOM parse was replaced with targeted tag extraction. The audit now runs in **~6 s** and constant memory, with the same assertions plus the D1 checks.

### D4 — Auto-generated descriptions shared a boilerplate tail (fixed, capability added)
Default calculator descriptions were `${shortDesc} Use the free ${name} to get accurate results instantly, with a worked example and answers to common questions.` — unique per page but formulaic. `seo.title` and `seo.description` overrides now exist in both the client (`src/pages/CalculatorPage.tsx`) and the prerenderer, and are used by the three pages this cycle reworked.

### D5 — Internal linking gaps (partially fixed)
69 calculators are referenced by no other calculator or guide; they are reachable only from category and directory listings. This cycle fixed inbound links for the scientific-calculation cluster. The remaining 65 are listed in the inventory and queued in the roadmap.

### D6 — 7 calculators document no formula (open)
`config` entries with an empty or placeholder `formulaDescription`. Not touched this cycle: none are in the priority cluster.

### D7 — 6 of 11 guides remain unreviewed/noindex (open, pre-existing)
Deliberate under the indexation policy, but it means half the editorial surface earns nothing. Out of scope for this cycle; flagged in the roadmap.

## 4. What was *not* verified

- No Search Console, Analytics, or ranking data was available, and none is inferred anywhere in this pack.
- Core Web Vitals and field data were not measured; there is no CrUX/GSC access in this workspace.
- Hosted behaviour (Vercel redirects, CDN caching, live 404s) was not tested. `npm run audit:domain:live` is the command that would, and it needs network access to the deployed host.
- Mobile rendering was reviewed from the responsive classes in source, not on a device.
