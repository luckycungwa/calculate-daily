# Competitor Analysis — scientific calculation cluster

**Method:** only what could be read directly is asserted. Two pages were fetched on 2026-10-31: `https://www.calculator.net/` and `https://www.calculator.net/sitemap.html` (both HTTP 200). Everything else is marked unverified. No ranking, traffic or "weak rankings" claim is made anywhere — no rank data was available.

## 1. Verified coverage

`calculator.net`'s published sitemap lists these relevant tools:

| Tool | calculator.net | Total Calculation |
|---|---|---|
| Scientific Calculator | Yes | Yes — `/calculators/scientific-calculator` |
| Scientific Notation Calculator | **Yes** | Yes — `/calculators/scientific-notation-calculator` (new) |
| Significant figures | **No** | Yes — `/calculators/significant-figures-calculator` (new) |
| Log Calculator | Yes | No dedicated page (logs exist inside the scientific calculator) |
| Exponent / Root Calculator | Yes (both separately) | Yes — `/calculators/exponent-root-calculator` |
| Rounding Calculator | Yes | Yes — `/calculators/rounding-calculator` |
| Fraction Calculator | Yes | Yes — `/calculators/fraction-calculator` |
| Matrix Calculator | Yes | **No** |
| Big Number Calculator | Yes | **No** |
| Prime Factorization | Yes | Partial (`/calculators/prime-number-checker`) |
| P-value Calculator | Yes | **No** |

Two conclusions follow, and only these two:

1. **Significant figures is a genuine gap** at least against this competitor. It is the one new tool in this cluster where we are not following.
2. **Scientific notation is contested.** We are not first, so the page has to be better than "another converter", not merely present.

Unverified for this cycle: Omni Calculator, The Calculator Site, CalculateQuick, Calculator Soup, Inch Calculator. The prior pack (`docs/keyword-intelligence/competitor-gaps.csv`) holds line-referenced captures for seven competitors, but none of those captures cover scientific notation or significant figures, so **no claim is made about their coverage here**. Verifying it means fetching their tool pages; that is the first task of the next cycle.

## 2. What a competitive scientific-notation page has to do

A converter that only maps `35000` → `3.5 × 10⁴` is a one-line script. The queries tell us what people actually struggle with: `write in scientific notation`, `scientific notation converter`, and `how to do scientific notation on calculator`. That is three jobs — write it, convert it, and *do arithmetic with it* — plus the conceptual trap that `e` means two different things.

Our page therefore does:

- decimal → scientific / engineering / E-notation, with selectable mantissa precision;
- scientific → decimal, including exponent form typed as `3.5 × 10^4`;
- multiply / divide / add / subtract in scientific notation, showing the normalised result and the plain decimal;
- order of magnitude as a separate output;
- a normalisation note (99999 at 3 s.f. is `1.00 × 10⁵`, not `10.0 × 10⁴`);
- an FAQ that answers the `e`-is-not-Euler's-number question explicitly.

## 3. What a competitive significant-figures page has to do

Counting is easy; counting *correctly at the edges* is the product. Our page:

- applies the standard rules literally to the text typed (`0.00450` = 3, `1.230` = 4, `4500.` = 4);
- **flags ambiguity instead of guessing** — `1200` is reported as 2 with an explanation that it could be 2, 3 or 4, and that writing `1.2 × 10³` states the intent;
- treats zero as a documented special case rather than inventing a count;
- rounds to n significant figures and shows both scientific and flat decimal forms;
- warns when you round to *more* figures than the input supports;
- cites NIST SP 811 for the unit conventions.

The ambiguity handling is the differentiator: a tool that silently answers "2" for `1200` is wrong for a student whose measurement was to four figures.

## 4. Where we are weaker

| Gap | Evidence | Status |
|---|---|---|
| No matrix calculator | calculator.net sitemap | Out of scope this cycle |
| No big-number / arbitrary precision | calculator.net sitemap | Note: `factorial-calculator` documents the 170! double-precision limit rather than pretending |
| No p-value calculator | calculator.net sitemap | Queued |
| Logs have no dedicated landing page | scientific calculator is the only entry point | Queued — the query set did not show log demand, so it was not prioritised |
| Brand recognition | — | We are not established; the strategy is long-tail intent and tool quality, not brand bidding |

## 5. What we deliberately do not do

- **No competitor-brand pages.** The Desmos and Casio/TI queries are the largest signal in the export and the most tempting to chase. A page titled "Desmos Scientific Calculator" on a site with no affiliation is an impersonation, and comparative claims ("works just like Desmos") would need verification we do not have.
- **No state-test pages.** `desmos scientific calculator virginia/georgia/nc` asks which calculator a state assessment permits. Getting that wrong misleads a student in an exam. Not our content to publish without an authoritative source per state.
- **No emulated TI-84/Casio interfaces.** Copying a device's keypad layout is a trademark risk for no functional gain.
