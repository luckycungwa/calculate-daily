import { CALCULATOR_LINKS } from './catalogLinks.generated';

/**
 * Slug → name/icon lookups for links between tools.
 *
 * Calculator and guide pages need to render related-tool links, but they must
 * not download the full directory index to do it. This compact map is the only
 * catalogue-wide data they import.
 */
export interface CalculatorLink {
  name: string;
  iconName: string;
  shortDesc: string;
}

export function getCalculatorLink(slug: string): CalculatorLink | undefined {
  return CALCULATOR_LINKS[slug];
}

export function hasCalculator(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(CALCULATOR_LINKS, slug);
}
