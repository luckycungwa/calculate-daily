# Indexation Policy — review-gated

> **Counts are superseded.** The audit figures below are from a 168-calculator run. The current
> catalogue is 290 calculators, 287 indexable and 3 unreviewed; 4 of 10 guides are indexable. The
> rule itself is unchanged. See `docs/launch-checklist.md` for current build numbers.

> **Status: implemented and locally verified; hosted behavior remains unverified.** The latest local
> audit passed 168 calculators and 10 guides (359 checks); the production prerender audit passed for
> 197 HTML files and 190 sitemap URLs. Hosted CI, Vercel redirect responses, and HTTP 404 behavior
> have not been verified.

---

## 1. The rule

**A page is indexable only if it explicitly opts in.** Missing or partial SEO metadata never grants
indexability — it fails closed.

```
indexable  ⇔  seo.status === 'index'  AND  seo.reviewStatus === 'reviewed'
```

Everything else is rendered with `<meta name="robots" content="noindex">`, receives **no** canonical
URL and **no** `og:url`, and is **excluded from the sitemap**.

## 2. The three states

| State | `status` | `reviewStatus` | Rendered | In sitemap | Canonical |
|---|---|---|---|---|---|
| **Reviewed / indexable** | `'index'` | `'reviewed'` | normal | **yes** | yes |
| **Reviewed / withheld** | `'noindex'` | `'reviewed'` | normal | no | no |
| **Unreviewed** | absent or `'noindex'` | absent or `'pending'` | normal | no | no |

The third row is the important one: an entry with **no** `seo` block at all is *unreviewed*, not
"indexed by default". A reviewer publishes it by adding `status: 'index'` **and**
`reviewStatus: 'reviewed'`.

Any other combination (e.g. `status: 'index'` with `reviewStatus: 'pending'`) is a contradiction: it
is treated as **not indexable**, and `npm run audit` fails the entry with
`status=index requires reviewStatus=reviewed` so the mistake cannot pass silently.

## 3. Where it is enforced

| Path | File | Behaviour |
|---|---|---|
| Prerender decision | `scripts/prerender.ts:34` | `isIndexable()` requires both fields |
| Calculator page output | `scripts/prerender.ts:214` | `noindex: !indexable` |
| Guide page output | `scripts/prerender.ts:375` | `noindex: !isIndexable(guide)` — **now gated too** |
| Sitemap — calculators | `scripts/prerender.ts:463` | `CALCULATOR_CATALOG.filter(isIndexable)` |
| Sitemap — guides | `scripts/prerender.ts:466` | `GUIDE_REGISTRY.filter(isIndexable)` — **now gated too** |
| Shell meta | `scripts/prerender.ts:92-102` | `noindex` ⇒ robots meta, no canonical, no `og:url` |
| Runtime meta | `src/lib/seo.ts:55-64` | same rule; canonical only when not noindex |
| Runtime calculator page | `src/pages/CalculatorPage.tsx:19-28` | `noindex` also when the slug is unknown |
| 404 page | `scripts/prerender.ts:425-433` | always `noindex: true` |
| Unknown route | `src/App.tsx:24-42` | `NotFoundPage` sets `noindex: true` |
| Enforcement | `scripts/audit-calculators.ts` | contradiction check + three-state report |

## 4. How a calculator becomes eligible

1. Add the catalogue entry. It has **no** `seo` block yet, so it is **unreviewed**: it renders,
   is browseable and linkable, but is `noindex` and absent from the sitemap.
2. Complete the content: `intro`, `howItWorks`, `example` (≥30 chars), ≥3 FAQs, `related`,
   `workflowLinks`.
3. Review it — maths checked against a worked example, formula documented, sources cited where the
   claim is health/financial/legal, edge cases stated.
4. Add `seo: { status: 'index', reviewStatus: 'reviewed', priority: <0.6-0.95> }`.
5. `npm run audit` must pass; `npm run build` then emits the page with a canonical and includes it in
   `sitemap.xml`.

To **withhold** a reviewed tool without deleting it, set `status: 'noindex'` and keep
`reviewStatus: 'reviewed'`. The page stays reachable and listed; it is simply not advertised.

**Withholding an individual page is reversible and non-destructive.** A reviewed tool can remain
reachable while being noindexed and excluded from the sitemap. Separately, eight confirmed
duplicate-intent catalog entries were consolidated; their old URLs have permanent Vercel redirects
to the canonical calculators.

## 5. Schema assessment — no change required

`src/types.ts:99-103` already models all three states:

```ts
seo?: { status?: SeoStatus; reviewStatus?: ReviewStatus; priority?: number };
```

`SeoStatus = 'index' | 'noindex'` and `ReviewStatus = 'pending' | 'reviewed'` cover the three states
with no new field, no migration and no data rewrite. The previous problem was not the schema — it was
the **predicate**, which inverted the meaning of absence.

**Recommended future hardening (not applied):** make `status` and `reviewStatus` required *inside*
`seo` (`seo?: { status: SeoStatus; reviewStatus: ReviewStatus; priority?: number }`). Every one of the
168 entries and 10 guides already supplies both, so this would compile as a no-op today and would make
a partial `seo` block a type error rather than an audit failure. It is deliberately deferred because
the existing audit already rejects contradictory indexability states, and a schema change is not
needed to address a confirmed defect.

## 6. What is in the sitemap

Only eligible canonical URLs:

- `/`, `/calculators`, `/guides`, `/savings-goal`, `/about`, `/privacy`, `/terms`, `/contact`
- all 10 category pages
- `/calculators/<slug>` for entries where `status=index` **and** `reviewStatus=reviewed`
- `/guides/<slug>` for guides meeting the same rule

Excluded: `/404.html` (noindex), any unknown route, and any calculator or guide that is not
explicitly reviewed and indexable.

## 7. Correction to the earlier audit

`production-integrity-audit.md` §3.1 reported **"57 reviewed / 113 unreviewed"**. **That was wrong.**

The figure came from a line-anchored grep (`^\s*(name|status|reviewStatus):`) that matched only
**multi-line** `seo` blocks. 57 entries format their `seo` block across several lines; the other 113
write it on one line (`seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.7 },`), so their
`reviewStatus` never appeared at line start.

Verified in this pass:

| Check | Count |
|---|---|
| Catalogue entries | **168** |
| `status: 'index'` occurrences | **168** |
| `reviewStatus: 'reviewed'` occurrences | **168** |
| `seo: {` block openers | **168** |
| Guides with `status: 'index'` + `reviewStatus: 'reviewed'` | **4** |

**All 168 remaining calculators are explicitly reviewed and indexable.** Of the 10 guides, four are
reviewed and indexable while six are pending and noindex. The policy keeps those six guides out of
the sitemap until their source and editorial checks are complete; a future entry that omits metadata
also fails closed instead of silently publishing.

This also retires the "review the 113 tools" recommendation in
`docs/keyword-intelligence/validation-findings.md` (decision D14) — the earlier count was a
line-formatting error; the current calculator catalog has been audited and every remaining tool is
explicitly reviewed.

## 8. Consequences for the release gate

- **The latest local sitemap** contains 190 unique URLs, including **168** calculator URLs. Eight
  duplicate-intent calculator URLs were removed from the catalog and now redirect to canonical
  routes on Vercel. Confirm those redirects against a hosted preview.
- **All 168 remaining calculators are explicitly reviewed and indexable.** Six guides are
  intentionally pending and noindex until their source/reviewer checks are complete.
- **The gate must confirm**, not assume, that `indexable 168 | reviewed-noindex 0 | unreviewed 0` is
  what the audit prints. If any page shifts state, the fail-closed rule is the reason and it must be
  investigated before release.
