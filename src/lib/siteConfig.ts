/**
 * Canonical origin resolution.
 *
 * The production site is served from https://www.totalcalculation.com. The apex
 * domain (https://totalcalculation.com) permanently redirects to the www host,
 * so the www host is the ONLY origin that answers 200 and is therefore the only
 * origin that may appear in a canonical, og:url, JSON-LD url, sitemap or
 * robots.txt declaration. Canonicalising to the apex would point every page at a
 * URL that immediately redirects — a canonical/redirect conflict.
 *
 * Because this is a release-blocking SEO invariant, the origin is a code
 * constant, not purely an environment variable. A stale SITE_URL in a hosting
 * dashboard (which is exactly how the site shipped a sitemap full of
 * `calculate-daily.vercel.app` URLs) now fails the build instead of silently
 * publishing the wrong host.
 *
 * See docs/domain-migration-audit.md.
 */

export interface SiteContext {
  url: string;
  isPreview: boolean;
}

interface SiteEnvironment {
  SITE_URL?: string;
  VERCEL_ENV?: string;
  VERCEL_URL?: string;
}

/** The single canonical production origin. Everything public must use this. */
export const CANONICAL_ORIGIN = 'https://www.totalcalculation.com';

/** The apex host. It 301-redirects to CANONICAL_ORIGIN, so it is never canonical. */
export const APEX_REDIRECT_ORIGIN = 'https://totalcalculation.com';

/**
 * Hostnames that must never appear in generated output. These are previous
 * production hosts (and the brand variants that were tried along the way).
 * A build that resolves to one of them is a migration failure, not a preference.
 */
export const RETIRED_HOSTNAMES: readonly string[] = [
  'calculate-daily.vercel.app',
  'totalcalculation.vercel.app',
  'calculatordaily.com',
  'www.calculatordaily.com',
];

function parseOrigin(value: string, variableName: string): URL {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(
      `${variableName} must be an absolute HTTP(S) origin such as https://example.com (received "${value}").`
    );
  }

  if (
    (url.protocol !== 'https:' && url.protocol !== 'http:') ||
    !url.hostname ||
    url.username ||
    url.password ||
    url.pathname !== '/' ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      `${variableName} must be an HTTP(S) origin without credentials, path, query, or fragment (received "${value}").`
    );
  }

  return url;
}

function rejectRetiredHost(origin: URL, variableName: string): void {
  if (RETIRED_HOSTNAMES.includes(origin.hostname.toLowerCase())) {
    throw new Error(
      `${variableName} resolves to the retired host "${origin.hostname}". ` +
        `Canonical URLs must use ${CANONICAL_ORIGIN}. ` +
        'Update the hosting environment variable; do not rebuild with the old domain.'
    );
  }
}

export function resolveSite(env: SiteEnvironment): SiteContext {
  const explicit = (env.SITE_URL || '').trim();
  const vercelEnv = (env.VERCEL_ENV || '').trim();
  const vercelUrl = (env.VERCEL_URL || '').trim();

  const isPreviewDeployment = vercelEnv === 'preview';

  // Preview deployments are never indexable. They may use whatever host they are
  // served from, but still may not claim a retired production hostname.
  if (isPreviewDeployment) {
    const raw = explicit || (vercelUrl ? `https://${vercelUrl}` : '');
    if (!raw) return { url: 'http://localhost:3000', isPreview: true };
    const origin = parseOrigin(raw, explicit ? 'SITE_URL' : 'VERCEL_URL');
    rejectRetiredHost(origin, explicit ? 'SITE_URL' : 'VERCEL_URL');
    return { url: origin.origin, isPreview: true };
  }

  if (explicit) {
    const origin = parseOrigin(explicit, 'SITE_URL');
    rejectRetiredHost(origin, 'SITE_URL');

    if (vercelEnv === 'production' && origin.protocol !== 'https:') {
      throw new Error('SITE_URL must use HTTPS for production builds.');
    }

    // The apex host redirects to www, so accept it but normalise to the host that
    // actually serves 200. Anything else in a production build is refused: it
    // would emit canonicals that contradict the canonical domain.
    if (origin.origin === APEX_REDIRECT_ORIGIN) {
      return { url: CANONICAL_ORIGIN, isPreview: false };
    }
    if (origin.origin === CANONICAL_ORIGIN) {
      return { url: CANONICAL_ORIGIN, isPreview: false };
    }
    if (vercelEnv === 'production') {
      throw new Error(
        `SITE_URL must be ${CANONICAL_ORIGIN} for production builds (received "${origin.origin}"). ` +
          'Refusing to emit canonical URLs on a non-canonical host.'
      );
    }
    // Non-production local build with an explicit override: honour it for inspection.
    return { url: origin.origin, isPreview: false };
  }

  // A production deployment with no SITE_URL still serves the real site, so it must
  // canonicalise to the canonical origin. Falling back to VERCEL_URL here would
  // publish a *.vercel.app sitemap; going into preview mode would ship noindex pages.
  if (vercelEnv === 'production') {
    return { url: CANONICAL_ORIGIN, isPreview: false };
  }

  if (vercelUrl) {
    const origin = parseOrigin(`https://${vercelUrl}`, 'VERCEL_URL');
    rejectRetiredHost(origin, 'VERCEL_URL');
    return { url: origin.origin, isPreview: true };
  }

  // No configuration at all (Cloudflare Pages with a missing env var, a plain
  // local `npm run build`, CI). Fall back to the confirmed production origin
  // rather than localhost: a build that emits `http://localhost:3000` canonicals
  // is worse than one that emits the real domain.
  return { url: CANONICAL_ORIGIN, isPreview: false };
}
