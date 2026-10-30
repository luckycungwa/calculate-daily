import { useEffect } from 'react';
import { withBrand } from './pageTitle';

interface PageMetaOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalPath?: string;
  noindex?: boolean;
}

function setMeta(name: string, content?: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!content) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setPropertyMeta(property: string, content?: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!content) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setRobots(noindex: boolean) {
  let el = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
  const preview = el?.getAttribute('data-preview') === 'true';
  if (noindex || preview) {
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', 'robots');
      document.head.appendChild(el);
    }
    el.setAttribute('content', 'noindex');
  } else if (el) {
    el.remove();
  }
}

function resolveCanonicalOrigin(): string {
  // Preserve the origin baked into the prerendered HTML. Rebuilding the URL
  // from window.location.origin would rewrite a production canonical to a
  // preview host during client-side navigation. Fall back to the live origin
  // only when no canonical or og:url exists (for example in local dev).
  const existing =
    document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.getAttribute('href') ??
    document.head.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.getAttribute('content');

  if (existing) {
    try {
      return new URL(existing, window.location.href).origin;
    } catch {
      // Fall through to the live origin.
    }
  }
  return window.location.origin;
}

function setCanonical(canonicalPath?: string, noindex = false) {
  const link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (noindex || !canonicalPath) {
    link?.remove();
    return;
  }

  const canonical = link ?? document.createElement('link');
  canonical.setAttribute('rel', 'canonical');
  canonical.setAttribute('href', `${resolveCanonicalOrigin()}${canonicalPath}`);
  if (!link) {
    document.head.appendChild(canonical);
  }
}

function setOgUrl(canonicalPath?: string, noindex = false) {
  const url = document.head.querySelector<HTMLMetaElement>('meta[property="og:url"]');
  if (noindex || !canonicalPath) {
    url?.remove();
    return;
  }

  const ogUrl = url ?? document.createElement('meta');
  ogUrl.setAttribute('property', 'og:url');
  ogUrl.setAttribute('content', `${resolveCanonicalOrigin()}${canonicalPath}`);
  if (!url) {
    document.head.appendChild(ogUrl);
  }
}

export function usePageMeta({
  title,
  description,
  keywords,
  canonicalPath,
  noindex = false,
}: PageMetaOptions) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const pageTitle = withBrand(title);
    document.title = pageTitle;

    setMeta('description', description);
    setMeta('keywords', keywords && keywords.length > 0 ? keywords.join(', ') : undefined);
    setPropertyMeta('og:title', pageTitle);
    setPropertyMeta('og:description', description);
    setMeta('twitter:title', pageTitle);
    setMeta('twitter:description', description);
    const preview = document.head
      .querySelector<HTMLMetaElement>('meta[name="robots"]')
      ?.getAttribute('data-preview') === 'true';
    const effectiveNoindex = noindex || preview;
    setRobots(effectiveNoindex);
    setCanonical(canonicalPath, effectiveNoindex);
    setOgUrl(canonicalPath, effectiveNoindex);
  }, [title, description, canonicalPath, noindex, keywords?.join(',')]);
}