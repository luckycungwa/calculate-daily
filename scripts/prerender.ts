import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const distDir = path.join(process.cwd(), 'dist');
// Production canonical origin. Override per-environment with SITE_URL.
const SITE_URL = (process.env.SITE_URL || 'https://calculatedaily.com').replace(/\/$/, '');
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

const isIndexable = (calc: any) =>
  calc.seo?.status !== 'noindex' && calc.seo?.reviewStatus !== 'pending';

function setMeta(html: string, pattern: RegExp, replacement: string): string {
  if (pattern.test(html)) {
    return html.replace(pattern, replacement);
  }
  return html;
}

function buildShell(
  shell: string,
  content: string,
  title: string,
  description: string,
  canonicalPath: string,
  jsonLd: object[],
  noindex = false
): string {
  let html = shell;

  html = setMeta(
    html,
    /<title>[^<]*<\/title>/,
    `<title>${esc(title)}</title>`
  );
  html = setMeta(
    html,
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${esc(description)}" />`
  );
  html = setMeta(
    html,
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${esc(title)}" />`
  );
  html = setMeta(
    html,
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${esc(description)}" />`
  );
  html = setMeta(
    html,
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${esc(title)}" />`
  );
  html = setMeta(
    html,
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${esc(description)}" />`
  );
  html = setMeta(
    html,
    /<meta property="og:image" content="[^"]*" \/>/,
    `<meta property="og:image" content="${SITE_URL}/og-default.png" />`
  );
  html = setMeta(
    html,
    /<meta name="twitter:image" content="[^"]*" \/>/,
    `<meta name="twitter:image" content="${SITE_URL}/og-default.png" />`
  );

  const robotsMeta = noindex
    ? `<meta name="robots" content="noindex" />`
    : '';

  const headExtra = [
    robotsMeta,
    GOOGLE_SITE_VERIFICATION
      ? `<meta name="google-site-verification" content="${esc(GOOGLE_SITE_VERIFICATION)}" />`
      : '',
    noindex ? '' : `<link rel="canonical" href="${SITE_URL}${canonicalPath}" />`,
    noindex ? '' : `<meta property="og:url" content="${SITE_URL}${canonicalPath}" />`,
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
  const { preloadCalculatorComponents } = await import(
    '../src/components/calculators/CalculatorRenderer'
  );

  // Resolve all lazily-loaded calculator components up front so
  // renderToStaticMarkup emits full calculator markup (no loading fallbacks).
  await preloadCalculatorComponents();

  const shell = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

  const pages: PageDefinition[] = [];

  // Home
  pages.push({
    path: '/',
    file: 'index.html',
    title: 'CalculateDaily - Free Online Calculators & Unit Converters',
    description:
      'Free online calculators and unit converters for math, finance, health, construction, cooking, and everyday life. Split bills, check BMI, compare mortgages, convert units, plan savings, and more. Fast, private, and accurate.',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'CalculateDaily',
        url: `${SITE_URL}/`,
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
    title: 'All Calculators & Unit Converters',
    description:
      'Browse every free online calculator and unit converter on CalculateDaily, including percentage, BMI, mortgage, savings, temperature, length, weight, and more.',
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
      title: `${calc.name} - Free Online Calculator`,
      description: `${calc.shortDesc} Use the free ${calc.name} to get accurate results instantly, with a worked example and answers to common questions.`,
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
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
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

  // Per-category pages
  CATEGORIES.forEach((cat) => {
    const url = `${SITE_URL}/categories/${cat.id}`;
    const tools = CALCULATOR_CATALOG.filter((c) => c.category === cat.id);
    pages.push({
      path: `/categories/${cat.id}`,
      file: `categories/${cat.id}.html`,
      title: `${CATEGORY_LABELS[cat.id] || cat.label} Calculators`,
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
      title: 'Daily Savings Goal Challenge',
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
      title: 'About & Methodology',
      description:
        'About CalculateDaily: fast, private, browser-native calculators for finance, health, construction, and everyday math. Learn how our tools work.',
    },
    {
      path: '/privacy',
      file: 'privacy.html',
      title: 'Privacy Policy',
      description:
        'How CalculateDaily handles your data: all calculations run locally in your browser, with no account, tracking, or data sharing.',
    },
    {
      path: '/terms',
      file: 'terms.html',
      title: 'Terms of Service',
      description:
        'The terms governing your use of CalculateDaily free online calculators and unit converters.',
    },
    {
      path: '/contact',
      file: 'contact.html',
      title: 'Contact Us',
      description:
        'Get in touch with the CalculateDaily team about our calculators, converters, or partnership opportunities.',
    }
  );

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
      page.noindex || false
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
    'Page Not Found - CalculateDaily',
    'The page you requested does not exist. Browse free calculators and unit converters on CalculateDaily.',
    '/404.html',
    []
  );
  fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml);

  // Static SEO files (replaces what the Express server used to generate)
  fs.writeFileSync(
    path.join(distDir, 'robots.txt'),
    `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`
  );

  const sitemapUrls: string[] = [
    `${SITE_URL}/`,
    `${SITE_URL}/calculators`,
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

  const lastmod = new Date().toISOString().slice(0, 10);

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

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map((u) => {
  const pathname = new URL(u).pathname;
  const prio = pagePriority[pathname] ?? 0.6;
  return `  <url>\n    <loc>${u}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${prio}</priority>\n  </url>`;
}).join('\n')}
</urlset>`;
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml);

  console.log(`Prerendered ${rendered} pages + 404.html + robots.txt + sitemap.xml into ${distDir}`);
}

main().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});