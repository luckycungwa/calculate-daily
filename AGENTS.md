# AGENTS.md

Instructions for AI agents working in this repository.

## Production-readiness checks
When the user asks to "test if we are production ready", "are we ready to go live", or anything similar:
1. Read and re-verify every item in `docs/launch-checklist.md` (build, env vars, deploy, post-launch SEO).
2. Run `npm run audit`, `npx tsc --noEmit`, and `npm run build` before answering.
3. Report which checklist items are still unchecked/manual.

## Project conventions
- Calculators live in `src/data/catalog/*.ts` (config/converter entries) or as custom components in `src/components/calculators/` registered in `CalculatorRenderer.tsx`.
- Every catalog entry needs: intro, howItWorks, example (≥30 chars), ≥3 FAQs, related slugs that exist, workflowLinks, and `seo` metadata (`reviewStatus: 'reviewed'` to be indexable).
- Set `seo.updatedAt` (YYYY-MM-DD) whenever you meaningfully change a calculator's or guide's content. It is the only real source for the sitemap's `<lastmod>`; edit the copy without bumping it and the sitemap reports the page as unchanged. Hand-written pages keep their dates in `STATIC_PAGE_DATES` in `scripts/prerender.ts`.
- Validate with `bun run audit` after adding tools; it enforces content completeness.
- The catalog index modules (`src/data/*.generated.ts`) are git-ignored and rebuilt by `npm run catalog:index` (runs automatically before `npm run dev` and `npm run build`). After a fresh clone, run `npm run catalog:index` before `npm run lint`.
- IndexNow: `npm run indexnow` submits the **deployed** sitemap to participating engines; it runs automatically after production deploys via `.github/workflows/indexnow.yml`. It reads the live sitemap, refuses non-canonical hosts, and verifies `public/6b7f105a7b84cda5355bb95ab3608acf.txt` is reachable at the site root first — that key file is public by design, so keep it in `public/`.
- Embeddable widgets live at `/embed/:slug`. They are `noindex` and must stay frameable by third parties, so `vercel.json` deliberately omits `X-Frame-Options` on `/embed/(.*)`; do not add a global `X-Frame-Options` rule.
- Prerender (`scripts/prerender.ts`) generates all static pages + sitemap + robots at build time from the catalog. New calculators are picked up automatically.
- Custom calculator components should be added to `LAZY_COMPONENTS` in `src/components/calculators/CalculatorRenderer.tsx` for code splitting.
- Do not commit unless asked. Follow the Total Calculation design system (`docs/totalcalculation-rebrand.md`): indigo `--primary`/`--primary-tint` for interactive elements and focus rings, emerald `--brand` only for the wordmark and positive/success states, zinc neutrals, 6px controls / 12px cards. `DESIGN.md` is the superseded pre-rebrand system.
- Roadmap and strategy live in `docs/research-and-roadmap.md`; phase reports in `docs/`.
