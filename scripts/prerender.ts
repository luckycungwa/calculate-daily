import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { resolveSite } from '../src/lib/siteConfig';
import { parsePath } from '../src/lib/router';
import { PAGE_SOURCES } from '../src/lib/pageRegistry';
import { BRAND_NAME, PUBLISHER } from '../src/lib/brand';
import { withBrand, DEFAULT_TITLE } from '../src/lib/pageTitle';
import { buildDescription, DESCRIPTION_MAX } from '../src/lib/metaDescription';
import { CATALOG_CHUNK_BY_SLUG } from '../src/data/catalogChunks.generated';

const distDir = path.join(process.cwd(), 'dist');

const site = resolveSite({
  SITE_URL: process.env.SITE_URL,
  VERCEL_ENV: process.env.VERCEL_ENV,
  VERCEL_URL: process.env.VERCEL_URL,
});
const SITE_URL = site.url;
const IS_PREVIEW = site.isPreview;
// Google Search Console verification token. Set GOOGLE_SITE_VERIFICATION at
// build time to inject <meta name="google-site-verification"> on every page.
const GOOGLE_SITE_VERIFICATION = (process.env.GOOGLE_SITE_VERIFICATION || '').trim();

interface PageDefinition {
  path: string;
  file: string;
  title: string;
  description: string;
  noindex?: boolean;
  jsonLd?: object[];
}

const esc = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// Review-gated indexation (see docs/indexation-policy.md).
// A page is indexable ONLY when it explicitly opts in with both status: 'index' and
// reviewStatus: 'reviewed'. Missing or partial metadata fails CLOSED: the page is
// rendered with `noindex`, receives no canonical, and is excluded from the sitemap.
const isIndexable = (page: any) =>
  page.seo?.status === 'index' && page.seo?.reviewStatus === 'reviewed';

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Rewrites the `content` of an existing `<meta>` tag, addressed by `name` or
 * `property`.
 *
 * The previous implementation matched each tag with a literal single-line regex
 * (`<meta name="description" content="…" />`). `index.html` formats those tags
 * across two lines, so no pattern ever matched and **every** prerendered page
 * silently shipped the home page's description. Matching the whole tag with a
 * whitespace-tolerant pattern fixes that; throwing when the tag is absent stops
 * it recurring as a silent failure.
 */
function setMetaContent(
  html: string,
  attribute: 'name' | 'property',
  key: string,
  content: string
): string {
  // `(?:\s)${attribute}=` (not `<meta\s+[^>]*\sname=`) so a tag whose attribute
  // follows the element name directly on the same spacing still matches, and so
  // `property="og:name"` cannot be mistaken for `name="og:name"`.
  const tagPattern = new RegExp(
    `<meta\\b[^>]*?(?:\\s)${attribute}="${escapeRegExp(key)}"[^>]*>`,
    'i'
  );
  const tag = html.match(tagPattern);
  if (!tag) {
    throw new Error(
      `index.html is missing the <meta ${attribute}="${key}"> tag. ` +
        'Prerendering cannot set this page metadata, and emitting the shell default would be wrong.'
    );
  }
  if (!/\bcontent="[^"]*"/i.test(tag[0])) {
    throw new Error(`<meta ${attribute}="${key}"> has no content attribute to replace.`);
  }
  const updated = tag[0].replace(/\bcontent="[^"]*"/i, () => `content="${esc(content)}"`);
  return html.replace(tagPattern, () => updated);
}

function buildShell(
  shell: string,
  content: string,
  title: string,
  description: string,
  canonicalPath: string,
  jsonLd: object[],
  noindex = false,
  preloads: string[] = []
): string {
  // Strip the shell's default robots tag (any formatting) before deciding what
  // this page should emit; buildShell adds the correct one back below.
  // The `(?:\s)name=` form is deliberate: `\s+[^>]*\sname=` requires a second run
  // of whitespace that a tag like `<meta name="robots" …>` does not have, so the
  // shell's `index, follow` tag would survive alongside the page's `noindex`.
  let html = shell.replace(/<meta\b[^>]*?(?:\s)name="robots"[^>]*>\s*/gi, '');

  if (!/<title>[^<]*<\/title>/.test(html)) {
    throw new Error('index.html has no <title> element to replace.');
  }
  html = html.replace(/<title>[^<]*<\/title>/, () => `<title>${esc(title)}</title>`);

  html = setMetaContent(html, 'name', 'description', description);
  html = setMetaContent(html, 'property', 'og:title', title);
  html = setMetaContent(html, 'property', 'og:description', description);
  html = setMetaContent(html, 'name', 'twitter:title', title);
  html = setMetaContent(html, 'name', 'twitter:description', description);
  html = setMetaContent(html, 'property', 'og:image', `${SITE_URL}/og-default.png`);
  html = setMetaContent(html, 'name', 'twitter:image', `${SITE_URL}/og-default.png`);

  const robotsMeta = noindex
    ? `<meta name="robots" content="noindex"${IS_PREVIEW ? ' data-preview="true"' : ''} />`
    : '';

  const headExtra = [
    robotsMeta,
    GOOGLE_SITE_VERIFICATION
      ? `<meta name="google-site-verification" content="${esc(GOOGLE_SITE_VERIFICATION)}" />`
      : '',
    noindex ? '' : `<link rel="canonical" href="${SITE_URL}${canonicalPath}" />`,
    noindex ? '' : `<meta property="og:url" content="${SITE_URL}${canonicalPath}" />`,
    ...preloads.map((file) => `<link rel="modulepreload" crossorigin href="/${file}" />`),
    ...jsonLd.map(
      (obj) =>
        `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`
    ),
  ]
    .filter(Boolean)
    .join('\n    ');

  html = html.replace('</head>', `    ${headExtra}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${content}</div>`);

  return html;
}

async function main() {
  const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>', {
    url: `${SITE_URL}/`,
  });
  const { window } = dom;

  (globalThis as any).window = window;
  (globalThis as any).document = window.document;
  Object.defineProperty(globalThis, 'navigator', {
    value: window.navigator,
    configurable: true,
  });
  (globalThis as any).localStorage = window.localStorage;
  (globalThis as any).history = window.history;
  (globalThis as any).requestAnimationFrame = (cb: () => void) => setTimeout(cb, 0);

  const { default: App } = await import('../src/App');
  const { CALCULATOR_CATALOG, CATEGORIES, CATEGORY_LABELS } = await import('../src/data/calculators');
  const { GUIDE_REGISTRY } = await import('../src/data/guides');
  const { preloadCalculatorComponents } = await import(
    '../src/components/calculators/CalculatorRenderer'
  );
  const { preloadAllCatalogData } = await import('../src/data/catalogRuntime');
  const { preloadAllPages } = await import('../src/lib/pageRegistry');

  // Route modules are split into per-page chunks for the browser. Node needs
  // them resolved before `renderToStaticMarkup`, which cannot await Suspense.
  await preloadAllPages();

  // The browser loads one content chunk per calculator; Node needs every entry
  // synchronously so renderToStaticMarkup can emit the tool and prose markup.
  await preloadAllCatalogData();

  // Resolve all lazily-loaded calculator components up front so
  // renderToStaticMarkup emits full calculator markup (no loading fallbacks).
  await preloadCalculatorComponents();

  const shell = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

  // The shell must be the fresh Vite build of index.html. Running this script a
  // second time against an existing dist/ feeds a already-prerendered page back in
  // as the template: the home page's canonical and JSON-LD leak into every other
  // page, and `<div id="root"></div>` no longer exists so pages keep the home
  // page's markup. Refuse instead of emitting a subtly wrong site.
  if (!shell.includes('<div id="root"></div>')) {
    throw new Error(
      'dist/index.html is not a fresh build shell: <div id="root"></div> is missing, so this ' +
        'looks like an already-prerendered page. Run `vite build` before `scripts/prerender.ts` ' +
        '(or use `npm run build`, which does both in order).'
    );
  }

  // Vite's manifest maps source modules to hashed chunk files. We use it to
  // emit modulepreload tags for the current route's page chunk and catalogue
  // chunk so they download in parallel with the entry instead of after it.
  const manifest = JSON.parse(
    fs.readFileSync(path.join(distDir, '.vite', 'manifest.json'), 'utf8')
  ) as Record<string, { file: string; imports?: string[] }>;

  const shellFiles = new Set<string>();
  const collectShell = (key: string) => {
    const entry = manifest[key];
    if (!entry || shellFiles.has(entry.file)) return;
    shellFiles.add(entry.file);
    (entry.imports || []).forEach(collectShell);
  };
  collectShell('index.html');

  const filesForChunk = (key: string, seen = new Set<string>()): string[] => {
    const entry = manifest[key];
    if (!entry || seen.has(entry.file)) return [];
    seen.add(entry.file);
    const files = [entry.file];
    (entry.imports || []).forEach((imp) => files.push(...filesForChunk(imp, seen)));
    return files;
  };

  const preloadFilesFor = (pathname: string): string[] => {
    const route = parsePath(pathname);
    if (route.name === 'not-found') return [];

    const sources: string[] = [PAGE_SOURCES[route.name]];

    if (route.name === 'calculator' || route.name === 'embed') {
      const chunk = CATALOG_CHUNK_BY_SLUG[route.slug];
      if (chunk) sources.push(`src/data/catalog/${chunk}.ts`);
    }

    if (route.name === 'guide') {
      const guide = GUIDE_REGISTRY.find((g) => g.slug === route.slug);
      for (const slug of guide?.embeddedCalculators || []) {
        const chunk = CATALOG_CHUNK_BY_SLUG[slug];
        if (chunk) sources.push(`src/data/catalog/${chunk}.ts`);
      }
    }

    const files = new Set<string>();
    for (const source of sources) {
      for (const file of filesForChunk(source)) {
        if (!shellFiles.has(file)) files.add(file);
      }
    }
    return [...files];
  };

  const pages: PageDefinition[] = [];

  // Home
  pages.push({
    path: '/',
    file: 'index.html',
    title: DEFAULT_TITLE,
    description:
      'Free online calculators and unit converters for math, finance, health, construction, cooking, and everyday life. Fast browser-based tools with worked examples.',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: BRAND_NAME,
        url: `${SITE_URL}/`,
        publisher: {
          '@type': 'Organization',
          name: PUBLISHER.name,
          url: PUBLISHER.url,
        },
        description:
          'Free online calculators and unit converters for math, finance, health, construction, cooking, and everyday life.',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Featured Calculators',
        itemListElement: CALCULATOR_CATALOG.filter((c) => c.featured).map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.name,
          url: `${SITE_URL}/calculators/${c.slug}`,
        })),
      },
    ],
  });

  // Directory
  pages.push({
    path: '/calculators',
    file: 'calculators.html',
    title: withBrand('All Calculators'),
    description:
      'Browse every free online calculator and unit converter on Total Calculation, including percentage, BMI, mortgage, savings, temperature, length, and weight.',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'All Calculators',
        itemListElement: CALCULATOR_CATALOG.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.name,
          url: `${SITE_URL}/calculators/${c.slug}`,
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Calculators', item: `${SITE_URL}/calculators` },
        ],
      },
    ],
  });

  // Per-calculator pages
  CALCULATOR_CATALOG.forEach((calc) => {
    const indexable = isIndexable(calc);
    const url = `${SITE_URL}/calculators/${calc.slug}`;
    pages.push({
      path: `/calculators/${calc.slug}`,
      file: `calculators/${calc.slug}.html`,
      // `seo.title` / `seo.description` override the defaults for priority tools.
      // Otherwise the description is generated from the page's own introduction
      // (see `src/lib/metaDescription.ts`) — never from a shared template tail,
      // which is what produced near-duplicate snippets across the catalogue.
      title: withBrand(calc.seo?.title ?? calc.name),
      description: buildDescription({
        explicit: calc.seo?.description,
        intro: calc.content.intro,
        shortDesc: calc.shortDesc,
        name: calc.name,
      }),
      noindex: !indexable,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: calc.name,
          description: calc.shortDesc,
          url,
          applicationCategory: 'UtilityApplication',
          operatingSystem: 'Any',
          // No `offers` block: the tool is free and there is no purchasable
          // product. Declaring `price: 0, priceCurrency: USD` on a South African
          // or Brazilian page asserted a currency the page never used.
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: calc.content.faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Calculators', item: `${SITE_URL}/calculators` },
            { '@type': 'ListItem', position: 3, name: calc.name, item: url },
          ],
        },
      ],
    });
  });

  // Embeddable calculator shells. They are framed by other sites rather than
  // ranked, so every one is noindex and none enters the sitemap. Prerendering
  // still matters: an iframe navigates directly to the file, and a static host
  // cannot fall back to the app shell for a missing document.
  CALCULATOR_CATALOG.filter(isIndexable).forEach((calc) => {
    pages.push({
      path: `/embed/${calc.slug}`,
      file: `embed/${calc.slug}.html`,
      title: withBrand(`${calc.name} (Embed)`),
      description: `Embeddable ${calc.name}: ${calc.shortDesc}`,
      noindex: true,
    });
  });

  // Per-category pages
  CATEGORIES.forEach((cat) => {    const url = `${SITE_URL}/categories/${cat.id}`;
    const tools = CALCULATOR_CATALOG.filter((c) => c.category === cat.id);
    pages.push({
      path: `/categories/${cat.id}`,
      file: `categories/${cat.id}.html`,
      title: withBrand(`${CATEGORY_LABELS[cat.id] || cat.label} Calculators`),
      description: `${cat.description} Explore free ${(CATEGORY_LABELS[cat.id] || cat.label).toLowerCase()} calculators with accurate formulas, examples, and FAQs.`,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `${cat.label} Calculators`,
          itemListElement: tools.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.name,
            url: `${SITE_URL}/calculators/${c.slug}`,
          })),
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Calculators', item: `${SITE_URL}/calculators` },
            { '@type': 'ListItem', position: 3, name: cat.label, item: url },
          ],
        },
      ],
    });
  });

  // Static feature pages
  pages.push(
    {
      path: '/savings-goal',
      file: 'savings-goal.html',
      title: withBrand('Daily Savings Goal Challenge'),
      description:
        'Break a large savings target into a realistic daily, weekly, and monthly deposit pace. See the habit-sized number you need to save every day.',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Savings Goal', item: `${SITE_URL}/savings-goal` },
          ],
        },
      ],
    },
    {
      path: '/about',
      file: 'about.html',
      title: withBrand('About & Methodology'),
      description:
        'About Total Calculation: browser-based calculators for finance, health, construction, and everyday math. Learn how our tools and checks work.',
    },
    {
      path: '/privacy',
      file: 'privacy.html',
      title: withBrand('Privacy Policy'),
      description:
        'How Total Calculation handles calculator inputs, browser storage, optional analytics, and third-party services.',
    },
    {
      path: '/terms',
      file: 'terms.html',
      title: withBrand('Terms of Service'),
      description:
        'The terms governing your use of Total Calculation free online calculators and unit converters.',
    },
    {
      path: '/contact',
      file: 'contact.html',
      title: withBrand('Contact Us'),
      description:
        'Get in touch with the Total Calculation team about our calculators, converters, or partnership opportunities.',
    }
  );

  // Guide listing page
  pages.push({
    path: '/guides',
    file: 'guides.html',
    title: withBrand('Guides & Articles'),
    description:
      'In-depth guides for using calculators effectively. Learn about mortgages, BMI, unit conversions, and everyday math with practical examples.',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Guides & Articles',
        itemListElement: GUIDE_REGISTRY.map((g, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: g.name,
          url: `${SITE_URL}/guides/${g.slug}`,
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guides` },
        ],
      },
    ],
  });

  // Individual guide pages
  GUIDE_REGISTRY.forEach((guide) => {
    const guideUrl = `${SITE_URL}/guides/${guide.slug}`;
    // `Article` needs `headline`, `author`, `dateModified` and `image` to be
    // eligible for article rich results. Every value here comes from real
    // frontmatter: `updatedAt` is only emitted when the guide actually records
    // one, because a fabricated date is worse than an absent one.
    const article: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.seo?.title ?? guide.name,
      name: guide.name,
      description: guide.shortDesc,
      url: guideUrl,
      mainEntityOfPage: { '@type': 'WebPage', '@id': guideUrl },
      datePublished: guide.publishedAt,
      author: {
        '@type': 'Organization',
        name: PUBLISHER.name,
        url: PUBLISHER.url,
      },
      publisher: {
        '@type': 'Organization',
        name: PUBLISHER.name,
        url: PUBLISHER.url,
      },
      image: `${SITE_URL}/og-default.png`,
    };
    if (guide.seo?.updatedAt) {
      article.dateModified = guide.seo.updatedAt;
    }

    pages.push({
      path: `/guides/${guide.slug}`,
      file: `guides/${guide.slug}.html`,
      title: withBrand(guide.seo?.title ?? guide.name),
      description: buildDescription({
        explicit: guide.seo?.description,
        intro: guide.shortDesc,
        shortDesc: guide.shortDesc,
        name: guide.name,
      }),
      noindex: !isIndexable(guide),
      jsonLd: [
        article,
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: guide.faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guides` },
            { '@type': 'ListItem', position: 3, name: guide.name, item: `${SITE_URL}/guides/${guide.slug}` },
          ],
        },
      ],
    });
  });

  /**
   * Descriptions must be unique across indexable pages and inside the published
   * bounds. `buildDescription` is deterministic, so a collision means two pages
   * genuinely share an introduction — a content problem, not a formatting one —
   * and the build must fail rather than ship two identical snippets.
   */
  {
    const byDescription = new Map<string, string>();
    for (const page of pages) {
      if (page.noindex) continue;
      const length = page.description.trim().length;
      if (length < 70 || length > DESCRIPTION_MAX) {
        throw new Error(
          `Description for ${page.path} is ${length} characters (allowed 70-${DESCRIPTION_MAX}): "${page.description}"`
        );
      }
      const clash = byDescription.get(page.description);
      if (clash) {
        throw new Error(
          `Duplicate description on ${page.path} and ${clash}: "${page.description}"`
        );
      }
      byDescription.set(page.description, page.path);
    }
  }

  let rendered = 0;
  for (const page of pages) {
    window.history.pushState({}, '', page.path);
    const content = renderToStaticMarkup(React.createElement(App));
    const html = buildShell(
      shell,
      content,
      page.title,
      page.description,
      page.path,
      page.jsonLd || [],
      page.noindex || IS_PREVIEW,
      preloadFilesFor(page.path)
    );
    const outPath = path.join(distDir, page.file);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html);
    rendered++;
  }

  // 404 page (served by static hosts for any unknown URL)
  window.history.pushState({}, '', '/page-not-found');
  const notFoundContent = renderToStaticMarkup(React.createElement(App));
  const notFoundHtml = buildShell(
    shell,
    notFoundContent,
    `Page Not Found - ${BRAND_NAME}`,
    'The page you requested does not exist. Browse free calculators and unit converters on Total Calculation.',
    '/404.html',
    [],
    true
  );
  fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml);

  // Static SEO files (replaces what the Express server used to generate)
  const robotsTxt = IS_PREVIEW
    ? `# Preview build - not intended for indexing.
User-agent: *
Disallow: /
`
    : `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt);

  const sitemapUrls: string[] = [
    `${SITE_URL}/`,
    `${SITE_URL}/calculators`,
    `${SITE_URL}/guides`,
    `${SITE_URL}/savings-goal`,
    `${SITE_URL}/about`,
    `${SITE_URL}/privacy`,
    `${SITE_URL}/terms`,
    `${SITE_URL}/contact`,
  ];
  CATEGORIES.forEach((cat) => sitemapUrls.push(`${SITE_URL}/categories/${cat.id}`));
  CALCULATOR_CATALOG.filter(isIndexable).forEach((calc) =>
    sitemapUrls.push(`${SITE_URL}/calculators/${calc.slug}`)
  );
  GUIDE_REGISTRY.filter(isIndexable).forEach((guide) =>
    sitemapUrls.push(`${SITE_URL}/guides/${guide.slug}`)
  );

  // <lastmod> must reflect a real content change. Stamping the build date on every
  // URL trains crawlers to ignore the field, and the prerender audit fails such a
  // sitemap (see docs/domain-migration-audit.md, defect D4). Pages with no recorded
  // content date emit no <lastmod> at all rather than a fabricated one.
  //
  // Sources: calculator and guide dates come from the catalogue (`seo.updatedAt`,
  // or a guide's `publishedAt`); listing pages take the newest date of the content
  // they list; hand-written pages use STATIC_PAGE_DATES.
  const newest = (dates: (string | undefined)[]): string | undefined =>
    dates.filter((d): d is string => Boolean(d)).sort().pop();

  /**
   * Pages whose copy is hand-written in a component rather than held in the
   * catalogue. Each date is the day that page's copy last changed in source
   * control — bump the entry whenever you edit the page's text, because crawlers
   * use it to decide whether a page is worth recrawling. `/` is not listed here:
   * it is derived from the newest content it links to (see listDatesFor below).
   */
  const STATIC_PAGE_DATES: Record<string, string> = {
    '/about': '2026-10-30',
    '/contact': '2026-10-30',
    '/privacy': '2026-10-30',
    '/terms': '2026-10-30',
    '/savings-goal': '2026-10-30',
  };

  const contentDateByPath = new Map<string, string>();
  const listDatesFor = (pathname: string, dates: (string | undefined)[]) => {
    const date = newest(dates);
    if (date) contentDateByPath.set(pathname, date);
  };
  CALCULATOR_CATALOG.forEach((calc) => {
    if (calc.seo?.updatedAt) {
      contentDateByPath.set(`/calculators/${calc.slug}`, calc.seo.updatedAt);
    }
  });
  GUIDE_REGISTRY.forEach((guide) => {
    const date = guide.seo?.updatedAt ?? guide.publishedAt;
    if (date) contentDateByPath.set(`/guides/${guide.slug}`, date);
  });

  // A listing page changes when anything it lists changes.
  listDatesFor('/calculators', CALCULATOR_CATALOG.map((c) => c.seo?.updatedAt));
  listDatesFor('/guides', GUIDE_REGISTRY.map((g) => g.seo?.updatedAt ?? g.publishedAt));
  listDatesFor('/', [
    ...CALCULATOR_CATALOG.map((c) => c.seo?.updatedAt),
    ...GUIDE_REGISTRY.map((g) => g.seo?.updatedAt ?? g.publishedAt),
  ]);
  CATEGORIES.forEach((cat) => {
    listDatesFor(
      `/categories/${cat.id}`,
      CALCULATOR_CATALOG.filter((c) => c.category === cat.id).map((c) => c.seo?.updatedAt)
    );
  });
  Object.entries(STATIC_PAGE_DATES).forEach(([pathname, date]) => {
    contentDateByPath.set(pathname, date);
  });

  const undatedPages = sitemapUrls.filter((u) => !contentDateByPath.has(new URL(u).pathname));
  if (!IS_PREVIEW && undatedPages.length) {
    console.warn(
      `Warning: ${undatedPages.length} sitemap URL(s) have no content date, so they emit no <lastmod>: ${undatedPages
        .slice(0, 5)
        .join(', ')}`
    );
  }


  const pagePriority: Record<string, number> = {
    '/': 1.0,
    '/calculators': 0.9,
    '/savings-goal': 0.7,
    '/about': 0.5,
    '/privacy': 0.3,
    '/terms': 0.3,
    '/contact': 0.5,
  };
  CATEGORIES.forEach((cat) => {
    pagePriority[`/categories/${cat.id}`] = 0.6;
  });
  CALCULATOR_CATALOG.forEach((calc) => {
    pagePriority[`/calculators/${calc.slug}`] = calc.seo?.priority ?? 0.6;
  });
  GUIDE_REGISTRY.forEach((guide) => {
    pagePriority[`/guides/${guide.slug}`] = guide.seo?.priority ?? 0.7;
  });
  pagePriority['/guides'] = 0.8;

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${(IS_PREVIEW ? [] : sitemapUrls).map((u) => {
  const pathname = new URL(u).pathname;
  const prio = pagePriority[pathname] ?? 0.6;
  const lastmod = contentDateByPath.get(pathname);
  const lastmodXml = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';
  return `  <url>\n    <loc>${u}</loc>${lastmodXml}\n    <changefreq>weekly</changefreq>\n    <priority>${prio}</priority>\n  </url>`;
}).join('\n')}
</urlset>`;
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml);

  const sitemapCount = IS_PREVIEW ? 0 : sitemapUrls.length;
  console.log(
    `Prerendered ${rendered} pages + 404.html + robots.txt + sitemap.xml into ${distDir}\n` +
      `  canonical origin: ${SITE_URL}\n` +
      `  sitemap: ${sitemapCount} urls${IS_PREVIEW ? ' (preview mode: every page noindex, sitemap intentionally empty)' : ''}`
  );
}

main().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});