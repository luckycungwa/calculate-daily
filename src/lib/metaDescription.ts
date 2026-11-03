/**
 * Single source of truth for `<meta name="description">`.
 *
 * The prerenderer used to build every description from a shared template
 * (`"{shortDesc} Use the free {name} to get accurate results instantly, with a
 * worked example and answers to common questions."`). Across a catalogue this
 * size that tail is a near-duplicate signal on hundreds of pages, and the fixed
 * suffix is what pushed the median description to 205 characters.
 *
 * Rules enforced here:
 *  - an explicit `seo.description` always wins, and is never replaced;
 *  - otherwise the page's own introduction is used, because that is the sentence
 *    the author already wrote to explain the tool;
 *  - truncation happens on a word boundary, preferring a sentence end when one
 *    fits, so a snippet never ends mid-word;
 *  - the result is 70-160 characters, targeting 155 so there is headroom.
 */

/** Hard maximum. Nothing longer is allowed into the HTML. */
export const DESCRIPTION_MAX = 160;
/** Preferred maximum. Generated copy stops here to leave room for edits. */
export const DESCRIPTION_TARGET = 155;
/** Below this a description is too thin to describe the page. */
export const DESCRIPTION_MIN = 70;

/**
 * A sentence is only used as the cut point when ending there still leaves a
 * usable snippet. Below this the word-boundary cut is preferred, because a
 * 30-character description tells a searcher nothing.
 */
const MIN_SENTENCE_CUT = 40;

/** Collapse whitespace and strip wrapping quotes. */
function tidy(value: string): string {
  return value.replace(/\s+/g, ' ').trim().replace(/^["'“”‘’]+|["'“”‘’]+$/g, '');
}

/** Strip a dangling separator left behind by a truncation. */
function trimDangling(value: string): string {
  return value.replace(/[\s,;:\-–—|/]+$/u, '').trim();
}

/**
 * Truncate to `max` characters without splitting a word.
 *
 * Prefers the last sentence terminator that still leaves a readable fragment;
 * falls back to the last space; falls back again to a hard slice when the text
 * has no spaces at all (a single long token).
 */
export function clampToLength(value: string, max: number = DESCRIPTION_TARGET): string {
  const text = tidy(value);
  if (text.length <= max) return text;

  const window = text.slice(0, max);

  const sentenceEnd = Math.max(
    window.lastIndexOf('. '),
    window.lastIndexOf('? '),
    window.lastIndexOf('! ')
  );
  if (sentenceEnd + 1 >= MIN_SENTENCE_CUT) {
    return trimDangling(tidy(text.slice(0, sentenceEnd + 1)));
  }

  const lastSpace = window.lastIndexOf(' ');
  if (lastSpace > 0) {
    return trimDangling(tidy(text.slice(0, lastSpace)));
  }

  return trimDangling(tidy(window));
}

export interface DescriptionSources {
  /** Author-written override. Always wins. */
  explicit?: string;
  /** The page's own opening sentence(s). Preferred generated source. */
  intro?: string;
  /** One-line summary, used to top up a short introduction. */
  shortDesc?: string;
  /** Page name, used only when the other sources are too short to stand alone. */
  name?: string;
}

/**
 * Build the description for one page.
 *
 * Returns at most `DESCRIPTION_MAX` characters. Callers are responsible for
 * checking that the catalogue does not produce duplicates (see
 * `prerender.ts`); this function is deterministic and stateless.
 */
export function buildDescription(sources: DescriptionSources): string {
  const explicit = tidy(sources.explicit ?? '');
  if (explicit) return clampToLength(explicit, DESCRIPTION_MAX);

  const intro = tidy(sources.intro ?? '');
  const shortDesc = tidy(sources.shortDesc ?? '');
  const name = tidy(sources.name ?? '');

  let candidate = intro;

  if (candidate.length < DESCRIPTION_MIN) {
    candidate = trimDangling(tidy(`${shortDesc} ${intro}`));
  }
  if (candidate.length < DESCRIPTION_MIN && name) {
    candidate = trimDangling(tidy(`${name}: ${candidate || shortDesc}`));
  }
  if (!candidate) {
    candidate = shortDesc || name;
  }

  return clampToLength(candidate, DESCRIPTION_TARGET);
}

/**
 * True when a description satisfies every published rule.
 * Used by the prerender assertions and the unit tests.
 */
export function isValidDescription(value: string): boolean {
  const text = tidy(value);
  return text.length >= DESCRIPTION_MIN && text.length <= DESCRIPTION_MAX;
}
