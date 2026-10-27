export const SITE_NAME = 'CalculateDaily';

/** The home-page title, used when a route supplies no page-specific title. */
export const DEFAULT_TITLE = 'CalculateDaily - Free Online Calculators & Unit Converters';

/**
 * Single source of truth for document titles.
 *
 * Both the browser (`usePageMeta`) and the prerenderer use this helper, so the
 * title a crawler reads in the static HTML is exactly the title a visitor sees
 * after hydration. Without it the two drift — a prerendered
 * "… - Free Online Calculator" would be replaced with "… | CalculateDaily" on
 * the client, which splits the page's title signal between two strings.
 */
export function withBrand(title?: string): string {
  const trimmed = title?.trim();
  return trimmed ? `${trimmed} | ${SITE_NAME}` : DEFAULT_TITLE;
}
