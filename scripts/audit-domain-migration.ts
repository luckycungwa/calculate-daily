/**
 * Domain-migration and sitemap audit.
 *
 * Two clearly separated modes:
 *
 *   tsx scripts/audit-domain-migration.ts          LOCAL BUILD VERIFICATION
 *   tsx scripts/audit-domain-migration.ts --live   LOCAL + LIVE PRODUCTION
 *
 * The local pass inspects the generated `dist/` output and is the gate that stops
 * a wrong-canonical build from being deployed. It validates sitemap XML, hostname
 * consistency, duplicates, the route inventory, canonicals, robots.txt, redirects,
 * headers and stale-domain references.
 *
 * The `--live` pass then checks the deployed domain over HTTPS: real status codes,
 * real redirects and the real canonical tags. A green local run says nothing about
 * the live site — that is exactly how this project shipped a sitemap full of
 * `calculate-daily.vercel.app` URLs from a build that looked fine.
 *
 * Exit code 0 = pass, 1 = at least one failure.
 */
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';
import {
  APEX_REDIRECT_ORIGIN,
  CANONICAL_ORIGIN,
  RETIRED_HOSTNAMES,
  resolveSite,
} from '../src/lib/siteConfig';

const distDir = path.resolve(process.cwd(), 'dist');
const args = process.argv.slice(2);
const runLive = args.includes('--live');
const checkEveryLiveUrl = args.includes('--all');
const LIVE_SAMPLE_SIZE = 12;
const PROTOCOL_URL_LIMIT = 50_000;
const PROTECTED_PATHS = [
  '/',
  '/calculators',
  '/calculators/mortgage-calculator',
  '/guides',
  '/categories/math',
  '/sitemap.xml',
  '/robots.txt',
  '/assets/app.js',
  '/fonts/dm-sans-latin.woff2',
];
/** Brand strings that must not survive in public output. */
const RETIRED_BRAND_PATTERNS: Array<{ pattern: RegExp; label: string; hard: boolean }> = [
  { pattern: /calculatedaily/i, label: 'calculatedaily', hard: true },
  { pattern: /calculate-daily/i, label: 'calculate-daily', hard: true },
  { pattern: /calculate\s+daily/i, label: 'Calculate Daily', hard: false },
];

const failures: string[] = [];
const warnings: string[] = [];
const info: string[] = [];

const fail = (message: string) => failures.push(message);
const warn = (message: string) => warnings.push(message);

const site = resolveSite({
  SITE_URL: process.env.SITE_URL,
  VERCEL_ENV: process.env.VERCEL_ENV,
  VERCEL_URL: process.env.VERCEL_URL,
});

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

function collectFiles(directory: string, extensions?: string[]): string[] {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return collectFiles(entryPath, extensions);
      if (!extensions) return [entryPath];
      return extensions.includes(path.extname(entry.name)) ? [entryPath] : [];
    });
}

function pagePathFromFile(file: string): string {
  const relative = path.relative(distDir, file).replace(/\\/g, '/');
  if (relative === 'index.html') return '/';
  return `/${relative.replace(/\.html$/, '')}`;
}

function fileForPagePath(pagePath: string): string {
  const relative = pagePath === '/' ? 'index.html' : `${pagePath.slice(1)}.html`;
  return path.resolve(distDir, relative);
}

function parseSitemap(xml: string, file: string, depth = 0): string[] {
  if (!/^\s*<\?xml\b/.test(xml)) fail(`${file}: missing XML declaration.`);
  const roots = [...xml.matchAll(/<(urlset|sitemapindex)\b([^>]*)>/g)];
  if (roots.length !== 1) {
    fail(`${file}: expected exactly one <urlset> or <sitemapindex> root, found ${roots.length}.`);
    return [];
  }
  const [root] = roots;
  if (!/xmlns\s*=\s*"http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/.test(root[2])) {
    fail(`${file}: wrong or missing sitemaps.org 0.9 namespace.`);
  }
  if (!new RegExp(`</${root[1]}>\\s*$`).test(xml)) fail(`${file}: root element is not closed.`);
  // Cheap well-formedness probe: every opening <url> must have a matching </url>.
  const openUrls = (xml.match(/<url>/g) || []).length;
  const closeUrls = (xml.match(/<\/url>/g) || []).length;
  if (openUrls !== closeUrls) fail(`${file}: unbalanced <url> elements (${openUrls} open, ${closeUrls} closed).`);

  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  if (root[1] === 'urlset') return locs;

  if (depth > 1) {
    fail(`${file}: nested sitemap index is not supported.`);
    return [];
  }
  return locs.flatMap((childUrl) => {
    const childPath = path.join(distDir, new URL(childUrl).pathname.replace(/^\//, ''));
    if (!fs.existsSync(childPath)) {
      fail(`${file}: sitemap index references a missing file: ${childUrl}`);
      return [];
    }
    return parseSitemap(fs.readFileSync(childPath, 'utf8'), path.relative(distDir, childPath), depth + 1);
  });
}

function jsonLdUrls(value: unknown, found: string[] = []): string[] {
  if (typeof value === 'string') {
    if (/^https?:\/\//.test(value)) found.push(value);
    return found;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => jsonLdUrls(item, found));
    return found;
  }
  if (value && typeof value === 'object') {
    Object.values(value as Record<string, unknown>).forEach((item) => jsonLdUrls(item, found));
  }
  return found;
}

interface PageFacts {
  relative: string;
  pagePath: string;
  url: string;
  noindex: boolean;
  canonical?: string;
  ogUrl?: string;
  is404: boolean;
}

const RETIRED_SET = new Set(RETIRED_HOSTNAMES.map((host) => host.toLowerCase()));

function originProblem(value: string): string | undefined {
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    return 'not an absolute URL';
  }
  if (RETIRED_SET.has(parsed.hostname.toLowerCase())) return `retired host ${parsed.hostname}`;
  if (parsed.origin !== CANONICAL_ORIGIN) return `origin ${parsed.origin} is not ${CANONICAL_ORIGIN}`;
  if (parsed.protocol !== 'https:') return 'not HTTPS';
  return undefined;
}

// ---------------------------------------------------------------------------
// 0. output present
// ---------------------------------------------------------------------------

if (!fs.existsSync(distDir)) {
  console.error(`FAILED: ${distDir} does not exist. Run "npm run build" first.`);
  process.exit(1);
}
const sitemapPath = path.join(distDir, 'sitemap.xml');
const robotsPath = path.join(distDir, 'robots.txt');
for (const required of [sitemapPath, robotsPath, path.join(distDir, 'index.html'), path.join(distDir, '404.html')]) {
  if (!fs.existsSync(required)) fail(`Missing generated file: ${path.relative(distDir, required)}`);
}
if (failures.length) {
  console.error(`FAILED (output incomplete):\n- ${failures.join('\n- ')}`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// 1. preview builds have their own, much smaller contract
// ---------------------------------------------------------------------------

if (site.isPreview) {
  info.push(`Build mode: PREVIEW (origin ${site.url}) — indexability checks do not apply.`);
  const previewSitemap = fs.readFileSync(sitemapPath, 'utf8');
  if (/<loc>/.test(previewSitemap)) fail('Preview sitemap must be empty.');
  const previewRobots = fs.readFileSync(robotsPath, 'utf8');
  if (!/Disallow:\s*\/\s*(?:\r?\n|$)/m.test(previewRobots)) fail('Preview robots.txt must disallow crawling.');
  const previewPages = collectFiles(distDir, ['.html']).filter((file) => !file.endsWith('404.html'));
  for (const file of previewPages) {
    const dom = new JSDOM(fs.readFileSync(file, 'utf8'));
    if (!dom.window.document.querySelector('meta[name="robots"][content*="noindex"]')) {
      fail(`Preview page is not noindex: ${path.relative(distDir, file)}`);
    }
    if (dom.window.document.querySelector('link[rel="canonical"]')) {
      fail(`Preview page must not emit a canonical: ${path.relative(distDir, file)}`);
    }
    dom.window.close();
  }
  console.log(info.join('\n'));
  console.log(failures.length ? `FAILED:\n- ${failures.join('\n- ')}` : 'PASS (preview contract).');
  process.exit(failures.length ? 1 : 0);
}

// ---------------------------------------------------------------------------
// 2. canonical origin of the build
// ---------------------------------------------------------------------------

if (site.url !== CANONICAL_ORIGIN) {
  fail(
    `This build resolved the origin ${site.url}, but the canonical origin is ${CANONICAL_ORIGIN}. ` +
      'Every canonical, og:url, JSON-LD url, sitemap entry and robots declaration would be wrong.'
  );
}

// ---------------------------------------------------------------------------
// 3. sitemap: validity, host, duplicates, limits
// ---------------------------------------------------------------------------

const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
const sitemapUrls = parseSitemap(sitemapXml, 'sitemap.xml');
const sitemapSet = new Set(sitemapUrls);

if (!sitemapUrls.length) fail('sitemap.xml advertises zero URLs.');
if (sitemapUrls.length > PROTOCOL_URL_LIMIT && !/<sitemapindex/.test(sitemapXml)) {
  fail(`sitemap.xml lists ${sitemapUrls.length} URLs without a sitemap index (protocol limit ${PROTOCOL_URL_LIMIT}).`);
}

const duplicateUrls = sitemapUrls.filter((url, index) => sitemapUrls.indexOf(url) !== index);
if (duplicateUrls.length) fail(`Duplicate sitemap URLs: ${[...new Set(duplicateUrls)].join(', ')}`);

for (const url of sitemapUrls) {
  const problem = originProblem(url);
  if (problem) {
    fail(`Sitemap URL uses the wrong host (${problem}): ${url}`);
    continue;
  }
  const parsed = new URL(url);
  if (parsed.search) fail(`Sitemap URL carries a query string: ${url}`);
  if (parsed.hash) fail(`Sitemap URL carries a fragment: ${url}`);
  if (parsed.pathname !== '/' && parsed.pathname.endsWith('/')) {
    fail(`Sitemap URL uses a trailing slash (site convention has none): ${url}`);
  }
}

// lastmod must be a real date, never the build timestamp
const buildDate = new Date().toISOString().slice(0, 10);
const lastmods = [...sitemapXml.matchAll(/<lastmod>([^<]*)<\/lastmod>/g)].map((match) => match[1].trim());
for (const value of lastmods) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    fail(`Sitemap <lastmod> is not a YYYY-MM-DD date: "${value}"`);
    continue;
  }
  if (value > buildDate) fail(`Sitemap <lastmod> is in the future: ${value}`);
}
if (lastmods.length > 1 && new Set(lastmods).size === 1 && lastmods[0] === buildDate) {
  fail(
    `Every sitemap <lastmod> equals the build date (${buildDate}). ` +
      'lastmod must reflect real content changes, not the build timestamp.'
  );
}
info.push(
  `Sitemap: ${sitemapUrls.length} URLs, ${/<sitemapindex/.test(sitemapXml) ? 'sitemap index' : 'single urlset'}, ` +
    `${lastmods.length} lastmod values (${new Set(lastmods).size} distinct).`
);

// ---------------------------------------------------------------------------
// 4. route inventory from the generated HTML, cross-checked both ways
// ---------------------------------------------------------------------------

const htmlFiles = collectFiles(distDir, ['.html']);
const pages: PageFacts[] = htmlFiles.map((file) => {
  const relative = path.relative(distDir, file).replace(/\\/g, '/');
  const is404 = relative === '404.html';
  const pagePath = is404 ? '/404.html' : pagePathFromFile(file);
  const dom = new JSDOM(fs.readFileSync(file, 'utf8'));
  const document = dom.window.document;
  const robots = [...document.querySelectorAll<HTMLMetaElement>('meta[name="robots"]')];
  const facts: PageFacts = {
    relative,
    pagePath,
    url: `${CANONICAL_ORIGIN}${pagePath}`,
    noindex: robots.some((meta) => (meta.content || '').toLowerCase().includes('noindex')),
    canonical: document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href || undefined,
    ogUrl: document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.content?.trim() || undefined,
    is404,
  };
  dom.window.close();
  return facts;
});

const routablePages = pages.filter((page) => !page.is404);
const indexablePages = routablePages.filter((page) => !page.noindex);
const excludedPages = routablePages.filter((page) => page.noindex);

info.push(
  `Generated pages: ${routablePages.length} (+404.html) | indexable: ${indexablePages.length} | ` +
    `intentionally excluded: ${excludedPages.length}`
);

const excludedByReason = new Map<string, number>();
for (const page of excludedPages) {
  const reason = page.pagePath.startsWith('/embed/') ? 'embed shell (noindex by design)' : 'unreviewed content (noindex)';
  excludedByReason.set(reason, (excludedByReason.get(reason) || 0) + 1);
}
for (const [reason, count] of excludedByReason) info.push(`  excluded — ${reason}: ${count}`);
for (const page of excludedPages) {
  if (page.canonical) fail(`Noindex page must not declare a canonical: ${page.relative}`);
  if (sitemapSet.has(page.url)) fail(`Noindex page is listed in the sitemap: ${page.url}`);
}

// Every sitemap URL must resolve to a generated, indexable page.
for (const url of sitemapUrls) {
  const pagePath = new URL(url).pathname;
  const file = fileForPagePath(pagePath);
  if (!fs.existsSync(file)) {
    fail(`Sitemap URL has no generated page: ${url}`);
    continue;
  }
  const page = pages.find((candidate) => candidate.pagePath === pagePath);
  if (page && page.noindex) fail(`Sitemap URL points at a noindex page: ${url}`);
}

// Every indexable page must be in the sitemap (completeness, the other direction).
for (const page of indexablePages) {
  if (!sitemapSet.has(page.url)) {
    fail(`Indexable page is missing from the sitemap: ${page.relative}`);
  }
}
if (sitemapSet.size !== indexablePages.length) {
  fail(
    `Sitemap has ${sitemapSet.size} entries but there are ${indexablePages.length} indexable pages. ` +
      'The sitemap is not generated from the route inventory.'
  );
}

// ---------------------------------------------------------------------------
// 5. canonical / og:url / structured-data host consistency, per page
// ---------------------------------------------------------------------------

for (const page of routablePages) {
  if (page.noindex) continue;
  if (!page.canonical) {
    fail(`Indexable page has no canonical: ${page.relative}`);
    continue;
  }
  if (page.canonical !== page.url) {
    fail(`Canonical does not match the page URL (${page.canonical}): ${page.relative}`);
  }
  const canonicalProblem = originProblem(page.canonical);
  if (canonicalProblem) fail(`Canonical host problem (${canonicalProblem}): ${page.relative}`);
  if (!page.ogUrl) {
    fail(`Indexable page has no og:url: ${page.relative}`);
  } else if (page.ogUrl !== page.canonical) {
    fail(`og:url differs from canonical (${page.ogUrl}): ${page.relative}`);
  }
}

// ---------------------------------------------------------------------------
// 6. stale domain and brand references anywhere in the deployed output
// ---------------------------------------------------------------------------

const textExtensions = ['.html', '.xml', '.txt', '.json', '.js', '.css', '.webmanifest', '.svg'];
const textFiles = collectFiles(distDir, textExtensions).concat(
  ['_redirects', '_headers'].map((name) => path.join(distDir, name)).filter((file) => fs.existsSync(file))
);

let staleHitCount = 0;
for (const file of textFiles) {
  const relative = path.relative(distDir, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf8');
  for (const retired of RETIRED_HOSTNAMES) {
    if (content.includes(retired)) {
      fail(`Retired domain "${retired}" appears in generated output: ${relative}`);
      staleHitCount++;
    }
  }
  for (const { pattern, label, hard } of RETIRED_BRAND_PATTERNS) {
    const match = content.match(pattern);
    if (!match) continue;
    const message = `Retired brand "${label}" appears in generated output: ${relative}`;
    if (hard) {
      fail(message);
      staleHitCount++;
    } else {
      warn(`${message} (check it is ordinary prose, not branding)`);
    }
  }
}
info.push(`Retired-domain references in output: ${staleHitCount}`);

// ---------------------------------------------------------------------------
// 7. robots.txt
// ---------------------------------------------------------------------------

const robotsTxt = fs.readFileSync(robotsPath, 'utf8');
const robotsLines = robotsTxt
  .split(/\r?\n/)
  .map((line) => line.replace(/#.*$/, '').trim())
  .filter(Boolean);

if (!robotsLines.some((line) => /^User-agent:\s*\*$/i.test(line))) fail('robots.txt has no "User-agent: *" group.');
if (!robotsLines.some((line) => /^Allow:\s*\/$/i.test(line))) fail('robots.txt should allow crawling of / explicitly.');

const sitemapDeclarations = robotsLines
  .filter((line) => /^Sitemap:/i.test(line))
  .map((line) => line.replace(/^Sitemap:\s*/i, '').trim());
const expectedSitemap = `${CANONICAL_ORIGIN}/sitemap.xml`;
if (sitemapDeclarations.length !== 1) {
  fail(`robots.txt must declare exactly one sitemap, found ${sitemapDeclarations.length}.`);
} else if (sitemapDeclarations[0] !== expectedSitemap) {
  fail(`robots.txt declares ${sitemapDeclarations[0]}, expected ${expectedSitemap}.`);
}

const disallowRules = robotsLines
  .filter((line) => /^Disallow:/i.test(line))
  .map((line) => line.replace(/^Disallow:\s*/i, '').trim())
  .filter(Boolean);

if (disallowRules.includes('/')) fail('robots.txt disallows the entire site.');

const toRegExp = (rule: string) => {
  const escaped = rule.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
  return new RegExp(`^${escaped}`);
};
for (const rule of disallowRules) {
  for (const protectedPath of PROTECTED_PATHS) {
    if (toRegExp(rule).test(protectedPath)) {
      fail(`robots.txt rule "Disallow: ${rule}" blocks an essential public path: ${protectedPath}`);
    }
  }
}
info.push(`robots.txt: ${disallowRules.length} Disallow rule(s), sitemap -> ${sitemapDeclarations[0] || 'MISSING'}`);

// ---------------------------------------------------------------------------
// 8. redirects (_redirects) — permanent, single hop, real destinations
// ---------------------------------------------------------------------------

const redirectsPath = path.join(distDir, '_redirects');
if (!fs.existsSync(redirectsPath)) {
  warn('dist/_redirects is missing; Cloudflare Pages will not apply the legacy 301s.');
} else {
  const rules = fs
    .readFileSync(redirectsPath, 'utf8')
    .split(/\r?\n/)
    .map((line) => line.replace(/#.*$/, '').trim())
    .filter(Boolean)
    .map((line) => line.split(/\s+/));

  const sources = new Set<string>();
  const parsedRules: Array<{ source: string; target: string; status: string }> = [];

  for (const parts of rules) {
    if (parts.length < 2) {
      fail(`Malformed _redirects rule: "${parts.join(' ')}"`);
      continue;
    }
    const [source, target, status = '301'] = parts;
    if (!source.startsWith('/')) fail(`_redirects source must be a path: "${source}"`);
    if (status !== '301' && status !== '308') {
      fail(`_redirects rule "${source}" uses ${status}; permanent redirects must be 301/308.`);
    }
    if (sources.has(source)) fail(`Duplicate _redirects source: ${source}`);
    sources.add(source);
    parsedRules.push({ source, target, status });

    const retired = RETIRED_HOSTNAMES.find((host) => target.includes(host));
    if (retired) fail(`_redirects rule "${source}" targets the retired domain ${retired}.`);

    const targetPath = /^https?:\/\//.test(target) ? new URL(target).pathname : target;
    if (/^https?:\/\//.test(target)) {
      const problem = originProblem(target);
      if (problem) fail(`_redirects rule "${source}" targets a bad origin (${problem}): ${target}`);
    }
    if (targetPath === source) fail(`_redirects rule "${source}" redirects to itself (loop).`);
    if (targetPath === '/' && source !== '/') {
      fail(`_redirects rule "${source}" redirects to the homepage; preserve the specific destination.`);
    }
    if (!targetPath.includes(':')) {
      const destinationFile = fileForPagePath(targetPath);
      if (!fs.existsSync(destinationFile) && !sources.has(targetPath)) {
        fail(`_redirects rule "${source}" targets ${targetPath}, which is not a generated page.`);
      }
    }
  }

  // A target that is itself a redirect source creates a chain.
  const chain = parsedRules.find((rule) => sources.has(rule.target) && rule.target !== rule.source);
  if (chain) {
    fail(`_redirects chain: "${chain.source}" -> "${chain.target}", which is itself a redirect source.`);
  }
  info.push(`_redirects: ${parsedRules.length} permanent redirect(s), all single-hop and on-site.`);
}

// ---------------------------------------------------------------------------
// 9. headers (_headers)
// ---------------------------------------------------------------------------

const headersPath = path.join(distDir, '_headers');
if (!fs.existsSync(headersPath)) {
  warn('dist/_headers is missing; security and caching headers will not be applied on Cloudflare Pages.');
} else {
  const headerText = fs.readFileSync(headersPath, 'utf8');
  if (/X-Robots-Tag\s*:\s*[^\n]*noindex/i.test(headerText)) {
    fail('_headers sets X-Robots-Tag: noindex, which would deindex the entire deployment.');
  }
  for (const file of ['/sitemap.xml', '/robots.txt']) {
    const blockMatch = headerText.match(new RegExp(`${file}\\s*\\n([\\s\\S]*?)(?=\\n\\S|$)`));
    if (blockMatch && /Content-Type\s*:/i.test(blockMatch[1])) {
      warn(`_headers overrides Content-Type for ${file}; confirm the served type is XML/plain text.`);
    }
  }
}

// ---------------------------------------------------------------------------
// 10. required static routes
// ---------------------------------------------------------------------------

for (const required of [
  '/',
  '/calculators',
  '/guides',
  '/savings-goal',
  '/about',
  '/privacy',
  '/terms',
  '/contact',
]) {
  if (!fs.existsSync(fileForPagePath(required))) fail(`Required route was not generated: ${required}`);
}

// ---------------------------------------------------------------------------
// report: local
// ---------------------------------------------------------------------------

const banner = '='.repeat(72);
console.log(banner);
console.log('LOCAL BUILD VERIFICATION — generated output in dist/');
console.log(banner);
console.log(`canonical origin : ${CANONICAL_ORIGIN}`);
console.log(`build origin     : ${site.url}`);
info.forEach((line) => console.log(line));

// ---------------------------------------------------------------------------
// 11. optional: live production verification
// ---------------------------------------------------------------------------

interface Probe {
  url: string;
  status: number;
  /** URL after any redirects were followed. Differs from `url` when redirected. */
  finalUrl: string;
  redirected: boolean;
  contentType: string;
  body?: string;
  error?: string;
}

/**
 * Fetch a URL, following redirects, and report where it actually landed. Comparing
 * `finalUrl` with the requested `url` is how a redirect (or a redirect chain that
 * drops the path) is detected without needing per-hop inspection.
 */
async function probe(url: string): Promise<Probe> {
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: { 'user-agent': 'TotalCalculationDomainAudit/1.0 (+domain migration verification)' },
    });
    return {
      url,
      status: response.status,
      finalUrl: response.url || url,
      redirected: response.redirected === true,
      contentType: response.headers.get('content-type') || '',
      body: await response.text(),
    };
  } catch (error) {
    return {
      url,
      status: 0,
      finalUrl: url,
      redirected: false,
      contentType: '',
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function liveAudit(): Promise<void> {
  console.log('');
  console.log(banner);
  console.log('LIVE PRODUCTION VERIFICATION — HTTPS requests to the deployed domain');
  console.log(banner);

  const liveFailures: string[] = [];
  const liveNotes: string[] = [];
  const liveFail = (message: string) => {
    liveFailures.push(message);
    fail(`[live] ${message}`);
  };

  // robots.txt
  const robotsLive = await probe(`${CANONICAL_ORIGIN}/robots.txt`);
  if (robotsLive.error) {
    liveFail(`robots.txt request failed: ${robotsLive.error}`);
  } else {
    if (robotsLive.status !== 200) liveFail(`robots.txt returned HTTP ${robotsLive.status}, expected 200.`);
    if (!/text\/plain/i.test(robotsLive.contentType)) {
      liveFail(`robots.txt content-type is "${robotsLive.contentType}", expected text/plain.`);
    }
    const liveRobots = robotsLive.body || '';
    const declared = liveRobots
      .split(/\r?\n/)
      .filter((line) => /^Sitemap:/i.test(line.trim()))
      .map((line) => line.replace(/^Sitemap:\s*/i, '').trim());
    if (!declared.includes(expectedSitemap)) {
      liveFail(`robots.txt does not declare ${expectedSitemap} (found: ${declared.join(', ') || 'none'}).`);
    }
    if (/^\s*Disallow:\s*\/\s*$/m.test(liveRobots)) liveFail('Live robots.txt disallows the entire site.');
    liveNotes.push(`robots.txt: HTTP ${robotsLive.status}, ${robotsLive.contentType}`);
  }

  // sitemap.xml
  const sitemapLive = await probe(`${CANONICAL_ORIGIN}/sitemap.xml`);
  let liveSitemapUrls: string[] = [];
  if (sitemapLive.error) {
    liveFail(`sitemap.xml request failed: ${sitemapLive.error}`);
  } else {
    if (sitemapLive.status !== 200) liveFail(`sitemap.xml returned HTTP ${sitemapLive.status}, expected 200.`);
    if (!/xml/i.test(sitemapLive.contentType)) {
      liveFail(`sitemap.xml content-type is "${sitemapLive.contentType}", expected XML.`);
    }
    if (sitemapLive.redirected) {
      liveFail(`sitemap.xml redirected to ${sitemapLive.finalUrl}; it must answer 200 directly.`);
    }
    liveSitemapUrls = [...(sitemapLive.body || '').matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    if (!liveSitemapUrls.length) liveFail('Live sitemap contains no URLs.');
    for (const url of liveSitemapUrls) {
      const problem = originProblem(url);
      if (problem) liveFail(`Live sitemap URL uses the wrong host (${problem}): ${url}`);
    }
    if (liveSitemapUrls.length !== sitemapUrls.length) {
      liveFail(
        `Live sitemap has ${liveSitemapUrls.length} URLs but the local build has ${sitemapUrls.length}. ` +
          'The deployed build is not the current build.'
      );
    }
    liveNotes.push(`sitemap.xml: HTTP ${sitemapLive.status}, ${liveSitemapUrls.length} URLs, ${sitemapLive.contentType}`);
  }

  // homepage
  const homeLive = await probe(`${CANONICAL_ORIGIN}/`);
  if (homeLive.error) {
    liveFail(`Homepage request failed: ${homeLive.error}`);
  } else {
    if (homeLive.status !== 200) liveFail(`Homepage returned HTTP ${homeLive.status}.`);
    if (homeLive.redirected) liveFail(`Homepage redirected to ${homeLive.finalUrl}.`);
    const dom = new JSDOM(homeLive.body || '');
    const canonical = dom.window.document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href;
    dom.window.close();
    if (canonical !== `${CANONICAL_ORIGIN}/`) {
      liveFail(`Homepage canonical is "${canonical || 'missing'}", expected ${CANONICAL_ORIGIN}/.`);
    }
    liveNotes.push(`homepage: HTTP ${homeLive.status}, canonical ${canonical || 'MISSING'}`);
  }

  // representative URLs (or all of them with --all)
  const sample = checkEveryLiveUrl
    ? liveSitemapUrls
    : liveSitemapUrls.filter((_, index) => index % Math.max(1, Math.floor(liveSitemapUrls.length / LIVE_SAMPLE_SIZE)) === 0).slice(0, LIVE_SAMPLE_SIZE);

  let checked = 0;
  for (const url of sample) {
    const live = await probe(url);
    if (live.error) {
      liveFail(`${url} request failed: ${live.error}`);
      continue;
    }
    if (live.status !== 200) liveFail(`${url} returned HTTP ${live.status}, expected 200.`);
    if (live.redirected) liveFail(`${url} redirects to ${live.finalUrl}; sitemap URLs must not redirect.`);
    const dom = new JSDOM(live.body || '');
    const document = dom.window.document;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href;
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]')?.content || '';
    dom.window.close();
    if (canonical !== url) liveFail(`${url} canonical is "${canonical || 'missing'}", expected itself.`);
    if (/noindex/i.test(robots)) liveFail(`${url} is served with noindex but is listed in the sitemap.`);
    checked++;
  }
  liveNotes.push(`sampled URLs checked: ${checked} (${checkEveryLiveUrl ? 'all' : 'sample'})`);

  // apex host must 301 to the canonical host and PRESERVE the path
  const apexPath = '/calculators/mortgage-calculator';
  const apexLive = await probe(`${APEX_REDIRECT_ORIGIN}${apexPath}`);
  if (apexLive.error) {
    liveFail(`Apex redirect check failed: ${apexLive.error}`);
  } else {
    const expected = `${CANONICAL_ORIGIN}${apexPath}`;
    if (apexLive.finalUrl !== expected || apexLive.status !== 200) {
      liveFail(
        `Apex ${APEX_REDIRECT_ORIGIN}${apexPath} ends at "${apexLive.finalUrl}" (HTTP ${apexLive.status}), ` +
          `expected "${expected}". The apex redirect must preserve the path.`
      );
    } else {
      liveNotes.push(`apex redirect: ${APEX_REDIRECT_ORIGIN}${apexPath} -> ${apexLive.finalUrl} (path preserved)`);
    }
  }

  // retired hosts must not still serve the site
  for (const host of RETIRED_HOSTNAMES) {
    const retired = await probe(`https://${host}${apexPath}`);
    if (retired.error) {
      liveNotes.push(`retired host ${host}: unreachable (${retired.error})`);
      continue;
    }
    if (retired.status === 200 && retired.finalUrl.startsWith(`https://${host}`)) {
      liveFail(`Retired host https://${host} still serves live content (duplicate site).`);
      continue;
    }
    if (retired.finalUrl === `${CANONICAL_ORIGIN}${apexPath}`) {
      liveNotes.push(`retired host ${host}: redirects to the canonical URL`);
    } else if (retired.status === 404 || retired.status === 410) {
      liveNotes.push(`retired host ${host}: HTTP ${retired.status} (not redirecting; old links break)`);
    } else {
      liveNotes.push(`retired host ${host}: HTTP ${retired.status} -> ${retired.finalUrl}`);
    }
  }

  console.log('');
  liveNotes.forEach((line) => console.log(`  ${line}`));
  if (liveFailures.length) {
    console.log('');
    console.log(`LIVE VERIFICATION FAILED (${liveFailures.length}):`);
    liveFailures.forEach((line) => console.log(`- ${line}`));
  } else {
    console.log('');
    console.log('LIVE VERIFICATION PASSED.');
  }
}

// ---------------------------------------------------------------------------
// final report
// ---------------------------------------------------------------------------

const summary = [
  `generated pages: ${routablePages.length}`,
  `indexable pages: ${indexablePages.length}`,
  `sitemap URLs: ${sitemapUrls.length}`,
  `intentionally excluded: ${excludedPages.length}`,
];

async function main(): Promise<void> {
  if (!runLive) {
    console.log('');
    console.log('LIVE PRODUCTION VERIFICATION — NOT RUN');
    console.log('  This pass verified the local build only. It says nothing about the deployed domain.');
    console.log('  Run with --live to check the real status codes, redirects and canonicals:');
    console.log('    npx tsx scripts/audit-domain-migration.ts --live');
  } else {
    await liveAudit();
  }

  console.log('');
  console.log(banner);
  console.log(`SUMMARY — ${summary.join(' | ')}`);
  if (warnings.length) {
    console.log('');
    console.log(`WARNINGS (${warnings.length}):`);
    warnings.forEach((line) => console.log(`- ${line}`));
  }
  if (failures.length) {
    console.log('');
    console.log(`FAILURES (${failures.length}):`);
    failures.forEach((line) => console.log(`- ${line}`));
    console.log('');
    console.log('DOMAIN MIGRATION AUDIT FAILED.');
    process.exitCode = 1;
    return;
  }
  console.log('');
  console.log(`DOMAIN MIGRATION AUDIT PASSED (${runLive ? 'local + live' : 'local build only'}).`);
}

main().catch((error) => {
  console.error('Domain migration audit crashed:', error);
  process.exit(1);
});
