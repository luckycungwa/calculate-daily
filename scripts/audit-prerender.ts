import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';
import { resolveSite } from '../src/lib/siteConfig';

const distDir = path.resolve(process.cwd(), 'dist');
const site = resolveSite({
  SITE_URL: process.env.SITE_URL,
  VERCEL_ENV: process.env.VERCEL_ENV,
  VERCEL_URL: process.env.VERCEL_URL,
});
const errors: string[] = [];

function collectHtmlFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? collectHtmlFiles(entryPath) : entry.name.endsWith('.html') ? [entryPath] : [];
  });
}

function pagePathFromFile(file: string): string {
  const relative = path.relative(distDir, file).replace(/\\/g, '/');
  if (relative === 'index.html') return '/';
  return `/${relative.replace(/\.html$/, '')}`;
}

function fileForPagePath(pagePath: string): string {
  const relative = pagePath === '/' ? 'index.html' : `${pagePath.slice(1)}.html`;
  const file = path.resolve(distDir, relative);
  if (!file.startsWith(`${distDir}${path.sep}`) && file !== path.join(distDir, 'index.html')) {
    throw new Error(`Page path escapes the build output directory: ${pagePath}`);
  }
  return file;
}

function addError(message: string) {
  errors.push(message);
}

if (!fs.existsSync(distDir)) {
  throw new Error('Build output directory "dist" does not exist.');
}

const sitemapPath = path.join(distDir, 'sitemap.xml');
const robotsPath = path.join(distDir, 'robots.txt');
if (!fs.existsSync(sitemapPath) || !fs.existsSync(robotsPath)) {
  throw new Error('Expected prerendered sitemap.xml and robots.txt in dist.');
}

const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const sitemapSet = new Set(sitemapUrls);
const duplicateUrls = sitemapUrls.filter((url, index) => sitemapUrls.indexOf(url) !== index);
if (duplicateUrls.length) addError(`Duplicate sitemap URLs: ${[...new Set(duplicateUrls)].join(', ')}`);
if (site.isPreview && sitemapUrls.length) addError('Preview sitemap must not contain URLs.');
if (!site.isPreview && !sitemapUrls.length) addError('Non-preview sitemap unexpectedly contains no URLs.');

const robotsTxt = fs.readFileSync(robotsPath, 'utf8');
if (site.isPreview && !/Disallow:\s*\/\s*(?:\r?\n|$)/m.test(robotsTxt)) {
  addError('Preview robots.txt must disallow crawling.');
}
if (!site.isPreview && /Disallow:\s*\/\s*(?:\r?\n|$)/m.test(robotsTxt)) {
  addError('Non-preview robots.txt must not disallow the entire site.');
}

for (const url of sitemapUrls) {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    addError(`Invalid sitemap URL: ${url}`);
    continue;
  }
  if (parsed.origin !== site.url) {
    addError(`Sitemap URL uses ${parsed.origin}, expected ${site.url}: ${url}`);
    continue;
  }
  if (parsed.search || parsed.hash || (parsed.pathname !== '/' && parsed.pathname.endsWith('/'))) {
    addError(`Sitemap URL is not in preferred canonical format: ${url}`);
  }

  const file = fileForPagePath(parsed.pathname);
  if (!fs.existsSync(file)) {
    addError(`Sitemap URL has no prerendered page: ${url} (${path.relative(distDir, file)})`);
    continue;
  }

  const document = new JSDOM(fs.readFileSync(file, 'utf8')).window.document;
  const canonicals = [...document.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]')];
  if (canonicals.length !== 1 || canonicals[0]?.href !== url) {
    addError(`Sitemap URL and canonical differ or are duplicated: ${url}`);
  }
  if ([...document.querySelectorAll<HTMLMetaElement>('meta[name="robots"]')].some((meta) =>
    meta.content.toLowerCase().includes('noindex')
  )) {
    addError(`Noindex page appears in the sitemap: ${url}`);
  }
}

const htmlFiles = collectHtmlFiles(distDir);
for (const file of htmlFiles) {
  const relative = path.relative(distDir, file).replace(/\\/g, '/');
  const document = new JSDOM(fs.readFileSync(file, 'utf8')).window.document;
  const pagePath = relative === '404.html' ? '/404.html' : pagePathFromFile(file);
  const url = `${site.url}${pagePath}`;
  const is404 = relative === '404.html';
  const isListed = sitemapSet.has(url);
  const robots = [...document.querySelectorAll<HTMLMetaElement>('meta[name="robots"]')];
  const noindex = robots.some((meta) => meta.content.toLowerCase().includes('noindex'));
  const canonicals = [...document.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]')];

  if (
    !document.title.trim() ||
    !document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content.trim()
  ) {
    addError(`Missing title or meta description: ${relative}`);
  }

  if (site.isPreview || is404 || !isListed) {
    if (!noindex || robots.length !== 1) addError(`Expected exactly one noindex tag: ${relative}`);
    if (canonicals.length) addError(`Noindex page must not have a canonical: ${relative}`);
    if (isListed) addError(`Non-indexable page appears in sitemap: ${relative}`);
  } else {
    if (noindex) addError(`Indexable page is marked noindex: ${relative}`);
    if (canonicals.length !== 1 || canonicals[0]?.href !== url) {
      addError(`Indexable page canonical is missing, duplicated, or incorrect: ${relative}`);
    }
  }

  if (relative === 'index.html' && !site.isPreview) {
    const websiteSchemas = [...document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]')]
      .flatMap((script) => {
        try {
          const data = JSON.parse(script.textContent || 'null');
          return data?.['@type'] === 'WebSite' ? [data] : [];
        } catch {
          addError('Homepage contains invalid JSON-LD.');
          return [];
        }
      });
    if (websiteSchemas.length !== 1 || websiteSchemas[0]?.url !== `${site.url}/`) {
      addError('Homepage must contain exactly one WebSite schema with an absolute canonical URL.');
    }
  }

  for (const anchor of document.querySelectorAll<HTMLAnchorElement>('a[href]')) {
    const href = anchor.getAttribute('href') || '';
    if (!href || href.startsWith('#') || href.startsWith('//')) continue;
    let target: URL;
    try {
      target = new URL(href, `${site.url}/`);
    } catch {
      addError(`Invalid link in ${relative}: ${href}`);
      continue;
    }
    if (target.origin !== site.url || path.extname(target.pathname)) continue;
    if (target.pathname !== '/' && target.pathname.endsWith('/')) {
      addError(`Internal link is not in preferred URL format in ${relative}: ${href}`);
      continue;
    }
    if (!fs.existsSync(fileForPagePath(target.pathname))) {
      addError(`Internal link has no prerendered destination in ${relative}: ${href}`);
    }
  }
}

/**
 * Embed shells must exist for every indexable calculator and must stay out of
 * the sitemap. A missing file breaks a third-party iframe with a 404, and the
 * generic link check cannot catch it because an iframe `src` is not an anchor.
 * The shell must also carry the attribution link back to the canonical page.
 */
const embedSlugs = sitemapUrls
  .map((url) => new URL(url).pathname)
  .filter((pagePath) => pagePath.startsWith('/calculators/'))
  .map((pagePath) => pagePath.slice('/calculators/'.length));

for (const slug of embedSlugs) {
  const embedFile = path.join(distDir, 'embed', `${slug}.html`);
  if (!fs.existsSync(embedFile)) {
    addError(`Indexable calculator has no prerendered embed shell: /embed/${slug}`);
    continue;
  }
  const embedDocument = new JSDOM(fs.readFileSync(embedFile, 'utf8')).window.document;
  if (!embedDocument.querySelector(`a[href="/calculators/${slug}"]`)) {
    addError(`Embed shell has no attribution link to /calculators/${slug}`);
  }
  if (sitemapSet.has(`${site.url}/embed/${slug}`)) {
    addError(`Embed shell appears in the sitemap: /embed/${slug}`);
  }
}

const notFound = path.join(distDir, '404.html');if (!fs.existsSync(notFound)) {
  addError('Missing generated 404.html.');
} else {
  const document = new JSDOM(fs.readFileSync(notFound, 'utf8')).window.document;
  if (
    ![...document.querySelectorAll<HTMLMetaElement>('meta[name="robots"]')].some((meta) =>
      meta.content.toLowerCase().includes('noindex')
    ) ||
    document.querySelector('link[rel="canonical"]')
  ) {
    addError('404.html must be noindex and must not have a canonical.');
  }
}

if (errors.length) {
  console.error(`Prerender SEO audit failed (${errors.length} issue(s)):\n- ${errors.join('\n- ')}`);
  process.exitCode = 1;
} else {
  console.log(
    `Prerender SEO audit passed: ${htmlFiles.length} HTML files, ${sitemapUrls.length} sitemap URLs, ` +
      `${site.isPreview ? 'preview safeguards' : 'canonical, indexation, and internal-link checks'}.`
  );
}
