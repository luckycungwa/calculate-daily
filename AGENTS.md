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
- Validate with `npm run audit` after adding tools; it enforces content completeness.
- Prerender (`scripts/prerender.ts`) generates all static pages + sitemap + robots at build time from the catalog. New calculators are picked up automatically.
- Custom calculator components should be added to `LAZY_COMPONENTS` in `src/components/calculators/CalculatorRenderer.tsx` for code splitting.
- Do not commit unless asked. Keep DESIGN.md palette (emerald accent, zinc neutrals) when building UI.
- Roadmap and strategy live in `docs/research-and-roadmap.md`; phase reports in `docs/`.
