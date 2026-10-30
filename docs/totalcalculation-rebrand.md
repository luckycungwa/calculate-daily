# Total Calculation rebrand — implementation map (Stage B–E)

Scope of this session: brand identity, design tokens, the reference homepage,
the two reference calculators (mortgage = finance reference, compound interest
= chart reference), and Stage E — rolling the indigo/Genesis interactive states
through the rest of the catalogue. The homepage + two reference calculators
established the patterns; Stage E applied them mechanically (see §7).

## 1. Domain safety (owner requirement #1)

- The canonical origin is resolved **only** from the `SITE_URL` build-time env
  var (`src/lib/siteConfig.ts`, `scripts/prerender.ts`, `.env.example`). Nothing
  in this session changed it: production builds still emit
  `https://calculate-daily.vercel.app` everywhere canonicals are written.
- No canonical, sitemap, OG or JSON-LD URL references totalcalculation.com. The
  owned domain exists only as documentation in `src/lib/brand.ts` and
  `docs/totalcalculation-domain-cutover.md`.
- `hello@calculatedaily.com` is deliberately unchanged: the mailbox exists
  today; a totalcalculation.com address would bounce until the domain is actually
  connected.
- The embed height-report protocol (`calculatedaily:height`) is deliberately
  unchanged: already-published third-party embeds listen for it.

## 2. Brand configuration (single source of truth)

`src/lib/brand.ts` holds `BRAND` (name, tagline, contact, current origin,
intended domain). `src/lib/pageTitle.ts` derives `SITE_NAME`/`DEFAULT_TITLE`
from it, so page titles (browser + prerender + tests) now read
`… | Total Calculation`. Prerender-side brand strings (`scripts/prerender.ts`) import
`BRAND_NAME` so the static HTML and hydrated client can never drift apart.

Intentionally NOT renamed (legacy-compat): localStorage keys
(`calculate_daily_theme/history` — renaming would wipe users' saved data), the
embed postMessage protocol, the repo folder, internal identifiers.

## 3. Design-system → token map (Genesis spec)

| Genesis rule | Implementation |
|---|---|
| Primary #6366F1 for interactive elements | `--primary-tint` token in `src/index.css`; rings/washes/active-link tints use it |
| Primary Hover #4F46E5 | Used as the **fill** (`--primary`) for AA text-on-fill contrast; #6366F1 stays `--primary-tint` for rings and washes (`--ring`) |
| Background #FAFAFA, Surface #FFFFFF, Text #0A0A0A/#6B6B6B, Border #E8E8EC | `--background/--card/--foreground/--muted-foreground/--border` |
| Secondary green reserved for the DESIGN.md brand highlight | `--brand` (`#059669` light / `#10B981` dark) — used only in the wordmark ("Total Calculation"), the homepage hero accent, and positive-delta data (Success green, per Genesis: interest earned, savings challenge) |
| Warning #F59E0B, Error #EF4444 | mortgage interest cost renders amber (cost ≠ success); destructive stays rose/red |
| Display: General Sans (Fontshare), Body: DM Sans, Code/numeric: JetBrains Mono | Self-hosted from `/fonts` (7 woff2 files, latin + latin-ext; see §6a) — no third-party font origins at runtime; `--font-display` (`-0.03em`/`-0.04em` tracking via `.font-display`/`.font-display-heading`), `--font-sans`, `--font-mono` |
| Radii 4/6/8/12px | buttons+inputs `rounded-md` (6px), cards `rounded-xl` (12px), chips `rounded-full` |
| Minimal shadows: flat cards, hover = 2px lift + soft shadow | `.hover-lift` utility in `index.css` (disabled under `prefers-reduced-motion`) |
| Primary button tinted glow on hover | `hover:shadow-[0_4px_12px_rgba(99,102,241,0.35)]` on the `primary` variant |
| Focus: 3px indigo ring | `focus-visible:ring-[3px] focus-visible:ring-ring/60` (Genesis suggests 0.12 alpha, which fails the 3:1 focus-indicator requirement; 0.60 keeps the indigo wash and stays visible) |
| Buttons shift up 1px on hover | `hover:-translate-y-px active:translate-y-0` in the button base class, `motion-reduce:transform-none` |
| Dot grid = the only decorative element | `.dot-grid` CSS utility on the homepage hero (no gradients, no illustrations) |
| One primary button per view section | applied in the homepage hero (single indigo Search button) |

Chart theme (`src/components/charts/EChart.tsx` `useChartThemeColors`) now uses
the Genesis indigo family as the default series colour, Genesis neutrals for
axes/tooltips, and exposes `green` (#20970B-family) for positive-delta series.

## 4. Reference experience build

### Homepage (`src/pages/HomePage.tsx`)

Genesis editorial rebuild: dot-grid hero with display headline ("Tap the
formula. See the answer."), prominent search, featured-tool chips, a
verifiable "what Total Calculation is" strip (real counts from the generated catalogue
index — no invented stats), 12 category cards with live-tool-link counts,
featured + popular tool cards, two honest CTAs (Savings challenge, full
directory). The 1 MB `hero-bg.jpg` background was removed — the new hero is
pure CSS, which also drops ~1 MB from the deployed bundle.

### Reference calculator 1 — finance: mortgage (`mortgage-calculator`)

Already the catalogue's most complete finance tool (P&I + tax/insurance/PMI,
biweekly model, extra payments, amortisation). Kept intact; re-themed: chart
series now come from the chart-theme tokens (no hardcoded hex), the interest
cost displays use the Genesis warning amber, and the tax/insurance checkbox
uses `accent-primary`-style states. Its charts remain strictly tied to
`buildAmortization()` output — the real-data rule.

### Reference calculator 2 — chart: compound interest (`compound-interest-calculator`)

Added a collapsible "growth projection" section: year-by-year balance vs
deposits to date, plus a plain-language summary sentence and an honest
constant-rate disclaimer.

Chart-data integrity is enforced by construction:

- New pure function `compoundInterestYearlySeries()` in
  `src/lib/compoundInterest.ts` reuses the *same monthly-compounding model*
  (same formulas, same monthly rate) as the headline result; the chart renders
  only its output.
- Regression tests in `src/lib/compoundInterest.test.ts` pin: the yearly
  series' final row equals `calculateCompoundInterest()`'s `futureValue` /
  `totalInterestEarned` to 1e-9; deposits follow the contribution schedule;
  balances grow monotonically; zero-rate behaves exactly.

## 5. Chart engine decision (EvilCharts evaluation)

EvilCharts is a Recharts-based component registry. The repo already ships
**echarts 6** with a lazy-loaded, viewport-gated wrapper (`EChart.tsx`),
theme-colour integration, and five consumers (amortisation, affordability
gauge, down-payment savings, scenario compare, + this session's compound
chart). Installing Recharts alongside it would mean two chart engines in one
bundle — exactly what the rebrand brief forbids ("Do not install both Recharts
and Apache ECharts unnecessarily"). All needed chart types (line/area/bar/
donut/gauge) already exist on the current engine.

Decision: keep echarts, restyle to the Genesis tokens, and keep the
`LineChart/AreaChart/BarChart/DonutChart/GaugeChart` component API as the
single chart surface every future calculator must use. If a future need is
truly Recharts-specific (e.g. an EvilCharts-exclusive pattern), that would be
the first *justified* addition — not now.

Gauge UI: an accessible SVG gauge kit is already vendored in
`src/components/gauge/`, and `GaugeChart` covers the budget-utilisation cases.
No new gauge dependency is required.

## 6. Stage E — catalogue-wide interactive-state sweep

All 339 `emerald-*` class occurrences across 56 files were classified, not
blindly replaced:

- **Interactive / structural emerald → indigo.** Section-heading icons, card
  hover borders, arrows, links, focus rings (`focus-visible:ring-primary-tint`),
  form accents, slider range/thumb, selected segments, primary buttons,
  breadcrumbs, guide pills, result-value highlights. The emerald 600/700
  shades become `text-primary` + `dark:text-primary-tint`; red-flag states
  untouched.
- **Positive / success emerald → `--brand`.** Copy-confirmation ticks, toasts,
  the `success` badge, "on track", "best value", "already meets target",
  password-strength pass states, percentage increase (vs rose decrease),
  interest earned, and the savings-challenge accents. Green therefore still
  means "good", never "clickable".
- **Always-dark result panels.** These panels are `bg-zinc-950` in both themes,
  so a theme-dependent tint would render too dark in light mode. Added one
  static token, `--color-primary-on-dark: #818cf8` (indigo 400, AA on near
  black), and used `text-primary-on-dark` there instead of `text-primary-tint`.
- **Dark-mode washes** that came from `emerald-900/950` now use
  `bg-primary-tint/10`, keeping visible indigo-tinted chips on near-black cards.

Dead code removed after confirming zero references: `src/components/HeroSection.tsx`
and `public/hero-bg.jpg` (1 MB).

### 6a. Self-hosted fonts (stage F)

The three brand faces used to be fetched from three third-party origins on
first paint (Fontshare for General Sans, Google Fonts for DM Sans and JetBrains
Mono). They are now served from `public/fonts` and declared with `@font-face`
in `src/index.css`:

| File | Family | Weight | Bytes |
|---|---|---|---|
| `dm-sans-latin.woff2` | DM Sans (variable) | 400–700 | 62.7 kB |
| `dm-sans-latin-ext.woff2` | DM Sans (variable) | 400–700 | 31.3 kB |
| `general-sans-500.woff2` | General Sans | 500 | 22.9 kB |
| `general-sans-600.woff2` | General Sans | 600 | 23.1 kB |
| `general-sans-700.woff2` | General Sans | 700 | 21.2 kB |
| `jetbrains-mono-latin.woff2` | JetBrains Mono (variable) | 400–700 | 31.4 kB |
| `jetbrains-mono-latin-ext.woff2` | JetBrains Mono (variable) | 400–700 | 11.6 kB |

- Licences: DM Sans and JetBrains Mono are OFL; General Sans is free to
  self-host under the Fontshare licence. The files are unmodified originals
  from those CDNs, kept byte-for-byte.
- `unicode-range` is copied from the Google Fonts CSS for the latin and
  latin-ext subsets, so a glyph outside those ranges still falls through to the
  system stack exactly as before.
- `index.html` preloads only the two faces used above the fold
  (`dm-sans-latin.woff2`, `general-sans-700.woff2`, 83.9 kB combined); the
  remaining files load when a page needs them.
- `vercel.json` caches `/fonts/(.*)` for 7 days with
  `stale-while-revalidate`, rather than the immutable one-year rule used for
  content-hashed `/assets` (the font filenames are stable, so `immutable` would
  pin a future replacement).
- DM Sans and JetBrains Mono are loaded as variable fonts (one file covers all
  weights) instead of the previous per-weight static requests.

Also removed: the two remaining redundant `dark:text-brand` halves in the
header wordmark and homepage hero — `--brand` already switches value inside
`.dark`, so the `dark:` variant duplicated the same colour.

Display-type consistency: every page-level `<h1>` (calculator, category, all
calculators, guides, about, contact, legal, savings-goal, 404) now uses
`font-display` like the homepage, instead of body DM Sans. The South Africa
fuel widget's duplicated inner `<h1>` became an `<h2>`, so each page has exactly
one `<h1>`. `<h2>` section labels inside tools stay DM Sans — they are labels,
not display copy.

## 7. Verified in this session

- `npm run catalog:index` → 292 calculators.
- `npm run audit` → passed (`indexable 292 | reviewed-noindex 0`).
- `npm test` → 166 calculator/lib tests + 8 SEO/router tests, 0 failures
  (was 164; +2 for the yearly-series regression tests).
- `npx tsc --noEmit` → clean.
- Production build with `SITE_URL=https://calculate-daily.vercel.app` +
  `VERCEL_ENV=production`: 614 static pages, 316 sitemap URLs, prerender SEO
  audit passed.
- `dist/` contains no case-sensitive "CalculateDaily" remnant; the only
  case-insensitive hit is the intentional `hello@calculatedaily.com` mailbox.
- Stage E: zero `emerald-*` utility classes remain in `src/` (only three
  explanatory comments mention emerald); generated CSS contains
  `text-primary-on-dark`, `bg-brand/10`, `bg-brand/15`,
  `dark:bg-primary-tint/10` utilities.
- Browser spot-checks (light + dark): date-difference result panel renders
  `#818CF8` on the dark panel and no longer emerald; percentage increase stays
  brand green `#059669`; BMI "Normal weight" badge stays brand green; guide
  pills/nav active state render indigo; homepage has zero emerald classes.
- Raster assets regenerated from the vector mark in `Header.tsx` (GDI+):
  `favicon-32x32.png` 32×32 (was mislabelled 96×96), `favicon-96x96.png`,
  `favicon.ico`, `apple-touch-icon.png` 180×180,
  `web-app-manifest-192/512.png`, and a new 1200×630 `og-default.png`
  (dot grid, display headline, "292 calculators"). `site.webmanifest` and
  `apple-mobile-web-app-title` no longer say "MyWebSite"/"MySite".
- Self-hosted fonts: build output contains 7 woff2 files under `/fonts` and
  **zero** references to `fonts.googleapis.com`, `fonts.gstatic.com` or
  `fontshare.com` in any built HTML/CSS file; the generated CSS declares all
  seven `@font-face` rules and the built homepage preloads the two above-fold
  faces. Browser check confirmed both preloaded fonts return 200, `document.fonts`
  reports DM Sans/JetBrains Mono/General Sans loaded (and the unused 500 weight
  unloaded), and the computed heading font is General Sans.
- Heading audit: `/`, `/guides`, `/categories/finance`, `/about`,
  `/calculators/mortgage-calculator`, `/calculators/compound-interest-calculator`
  and `/calculators/south-africa-fuel-calculator` each render exactly one `<h1>`
  in General Sans with no console errors and no horizontal overflow at 994 px.
- Accessibility pass on the tool pages:
  - `--brand` in light mode is `#047857` (emerald 700) — the Genesis `#059669`
    only reached 3.77:1 on white, below AA for the small success text it also
    colours. Dark mode keeps `#10b981`.
  - Dark `--primary` is `#5f62ee`, not `#6366f1`: white 12px button text on
    `#6366f1` measured 4.46:1, just under AA.
  - New `--color-brand-on-dark` (`#10b981`) for green text and chips on the
    always-dark result panels (footer wordmark, amortization, compound interest,
    daily savings, down payment, statistics, tax/NPV, developer, science,
    opportunity). The light-theme `#047857` only reaches 3.6:1 on near-black.
  - `CardTitle` now renders `<h2>` instead of `<h3>` (a card title is the first
    heading under the page `h1` in every calculator and listing page, so `h3`
    skipped a level), and the footer column headings went `h4` → `h2`.
  - Labelled the previously unassociated inputs on the two reference
    calculators (compound interest ×3, percentage ×6) with `id`/`htmlFor`.
  - The BMI unit toggle was a Radix Tabs list with no `TabsContent`, so every
    trigger pointed `aria-controls` at an element that never existed; it is now
    a pressed-button group (`role="group"`, `aria-pressed`) with no invalid ARIA.

## 8. Open items (owner actions or later stages)

1. **Domain cutover** remains the owner's action — see
   `docs/totalcalculation-domain-cutover.md`. Production canonicals intentionally
   still point at `calculate-daily.vercel.app`.
2. Any non-latin UI copy added later needs the matching subset added to
   `public/fonts` and `src/index.css`; the current site copy is latin-only.
