/**
 * IndexNow submission for the production sitemap.
 *
 * IndexNow tells participating engines (Bing — and therefore Microsoft Copilot
 * citations — plus Yandex, Naver and Seznam) that URLs changed, instead of
 * waiting for a recrawl. Google does not participate, so this never replaces
 * the sitemap; it only shortens the delay for the engines that listen.
 *
 * Run this AFTER a deployment, never before: the protocol requires the key file
 * to be live at the site root before anything is submitted.
 *
 *   npm run indexnow                  # live sitemap -> real submission
 *   npm run indexnow -- --dry-run     # show what would be sent, send nothing
 *   npm run indexnow -- --from-dist   # use the local dist/ sitemap instead
 *
 * Exit code is non-zero on any failure, so a post-deploy job fails loudly
 * rather than reporting a silent no-op.
 */
import fs from 'node:fs';
import path from 'node:path';
import { CANONICAL_ORIGIN } from '../src/lib/siteConfig';

/** The key file published at the site root must be named after the key itself. */
const INDEXNOW_KEY = '6b7f105a7b84cda5355bb95ab3608acf';

const ENDPOINT = (process.env.INDEXNOW_ENDPOINT || 'https://api.indexnow.org/indexnow').replace(
  /\/+$/,
  ''
);
const SITE = (process.env.INDEXNOW_SITE || CANONICAL_ORIGIN).replace(/\/+$/, '');
const KEY_LOCATION = `${SITE}/${INDEXNOW_KEY}.txt`;
const SITEMAP_URL = `${SITE}/sitemap.xml`;

/** The protocol rejects a request with more than 10,000 URLs. */
const MAX_URLS_PER_REQUEST = 10_000;
const TIMEOUT_MS = 30_000;

const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run');
const fromDist = args.has('--from-dist');

function fail(message: string): never {
  console.error(`IndexNow submission failed: ${message}`);
  process.exit(1);
}

async function get(url: string): Promise<Response> {
  try {
    return await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  } catch (error) {
    return fail(
      `could not fetch ${url} (${(error as Error).message}). ` +
        'Is the deployment live and reachable?'
    );
  }
}

async function readSitemap(): Promise<string> {
  if (!fromDist) {
    const response = await get(SITEMAP_URL);
    if (!response.ok) fail(`${SITEMAP_URL} returned HTTP ${response.status}`);
    return response.text();
  }
  const file = path.join(process.cwd(), 'dist', 'sitemap.xml');
  if (!fs.existsSync(file)) fail(`no local sitemap at ${file}. Run the build first.`);
  return fs.readFileSync(file, 'utf8');
}

function parseUrls(sitemapXml: string): string[] {
  const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
    match[1].trim()
  );
  return [...new Set(urls)];
}

async function verifyKeyIsLive(): Promise<void> {
  const response = await get(KEY_LOCATION);
  if (!response.ok) {
    fail(
      `${KEY_LOCATION} returned HTTP ${response.status}. ` +
        'The key file must be deployed before submitting URLs.'
    );
  }
  const body = (await response.text()).trim();
  if (!body.includes(INDEXNOW_KEY)) {
    fail(
      `${KEY_LOCATION} does not contain the key "${INDEXNOW_KEY}". ` +
        'Fix the file or rotate the key in scripts/indexnow.ts.'
    );
  }
}

async function submit(batch: string[]): Promise<void> {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: new URL(SITE).host,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: batch,
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  const body = await response.text();
  // 200 = accepted, 202 = accepted but the key is still being validated.
  if (response.status !== 200 && response.status !== 202) {
    fail(
      `${ENDPOINT} returned HTTP ${response.status}${body ? `: ${body.slice(0, 500)}` : ''}`
    );
  }
  console.log(
    `  ${batch.length} URL(s) accepted (HTTP ${response.status})${body ? ` — ${body.slice(0, 200)}` : ''}`
  );
}

async function main(): Promise<void> {
  if (SITE !== CANONICAL_ORIGIN) {
    console.warn(
      `Warning: submitting for ${SITE} instead of the canonical ${CANONICAL_ORIGIN} (INDEXNOW_SITE override).`
    );
  }

  const urls = parseUrls(await readSitemap());
  if (!urls.length) {
    // Preview builds deliberately ship an empty sitemap; say so plainly.
    if (dryRun) {
      console.log('The sitemap contains no URLs — nothing to submit.');
      return;
    }
    fail('the sitemap contains no URLs');
  }

  const foreign = urls.filter((url) => !url.startsWith(`${SITE}/`));
  if (foreign.length) {
    fail(
      `${foreign.length} sitemap URL(s) are not on ${SITE} (e.g. ${foreign[0]}). ` +
        'IndexNow requires every URL in a request to belong to the declared host.'
    );
  }

  console.log(
    `${dryRun ? 'Dry run: ' : ''}submitting ${urls.length} URL(s) from ` +
      `${fromDist ? 'dist/sitemap.xml' : SITEMAP_URL} under host ${new URL(SITE).host}`
  );

  if (dryRun) {
    urls.slice(0, 5).forEach((url) => console.log(`  would submit ${url}`));
    if (urls.length > 5) console.log(`  …and ${urls.length - 5} more`);
    return;
  }

  await verifyKeyIsLive();

  for (let i = 0; i < urls.length; i += MAX_URLS_PER_REQUEST) {
    await submit(urls.slice(i, i + MAX_URLS_PER_REQUEST));
  }

  console.log(`IndexNow submission complete: ${urls.length} URL(s) sent for ${SITE}.`);
}

main().catch((error: unknown) => {
  fail((error as Error).message ?? String(error));
});
