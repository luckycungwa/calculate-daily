/**
 * Total Calculation brand configuration — the single source of truth for
 * public-facing brand strings. Import from here instead of hardcoding the brand
 * name so a future rename touches this file, not a hundred call sites.
 *
 * IMPORTANT: this file covers the *brand* (names shown to users). The
 * *canonical origin* is a separate concern and lives in src/lib/siteConfig.ts as
 * the `CANONICAL_ORIGIN` constant, because it is an SEO invariant that must not
 * be overridable by a stale hosting environment variable. The values below are
 * documentation only — nothing here generates a URL.
 *
 * Canonical production origin: https://www.totalcalculation.com (www, because the
 * apex redirects to it). See docs/domain-migration-audit.md.
 */
export const BRAND = {
  name: 'Total Calculation',
  /** The origin that serves production. Mirrors siteConfig CANONICAL_ORIGIN. */
  currentCanonicalOrigin: 'https://www.totalcalculation.com',
  /** Same origin, kept under the historical field name for existing references. */
  intendedDomain: 'https://www.totalcalculation.com',
  tagline: 'Free Online Calculators & Unit Converters',
  shortTagline: 'Free calculators & unit converters',
  /** Existing mailbox. A totalcalculation.com address needs mail configured first. */
  contactEmail: 'hello@totalcalculation.com',
} as const;

export const BRAND_NAME = BRAND.name;
export const BRAND_TAGLINE = BRAND.tagline;

/**
 * The studio that builds and operates the site. These are the studio's real,
 * published details (44tagstudios.co.za) — do not add a company registration
 * number, postal address, or named editor that the studio has not published
 * itself.
 */
export const PUBLISHER = {
  name: '44Tag Studios',
  url: 'https://44tagstudios.co.za',
  email: '44tagstudios@gmail.com',
  phone: '+27 69 494 4349',
  locality: 'Johannesburg',
  country: 'South Africa',
  founder: 'Lucky Cungwa',
  description: 'Professional graphic and web design studio in Johannesburg, South Africa.',
} as const;
