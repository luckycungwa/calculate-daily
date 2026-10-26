export interface SiteContext {
  url: string;
  isPreview: boolean;
}

interface SiteEnvironment {
  SITE_URL?: string;
  VERCEL_ENV?: string;
  VERCEL_URL?: string;
}

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

export function resolveSite(env: SiteEnvironment): SiteContext {
  const explicit = (env.SITE_URL || '').trim();
  const vercelEnv = (env.VERCEL_ENV || '').trim();
  const vercelUrl = (env.VERCEL_URL || '').trim();

  if (explicit) {
    const origin = parseOrigin(explicit, 'SITE_URL');
    if (vercelEnv === 'production' && origin.protocol !== 'https:') {
      throw new Error('SITE_URL must use HTTPS for production builds.');
    }
    return { url: origin.origin, isPreview: vercelEnv === 'preview' };
  }

  if (vercelEnv === 'preview') {
    const url = vercelUrl
      ? parseOrigin(`https://${vercelUrl}`, 'VERCEL_URL').origin
      : 'http://localhost:3000';
    return { url, isPreview: true };
  }

  if (vercelEnv === 'production') {
    throw new Error(
      'SITE_URL is required for production builds. Set it in the Vercel project settings. ' +
        'Refusing to guess a canonical host.'
    );
  }

  if (vercelUrl) {
    return {
      url: parseOrigin(`https://${vercelUrl}`, 'VERCEL_URL').origin,
      isPreview: true,
    };
  }

  return { url: 'http://localhost:3000', isPreview: false };
}
