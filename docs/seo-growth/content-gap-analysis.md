# Content Gap Analysis — eight priority clusters

Only **cluster 1 (Scientific Calculator)** had Trends data in this cycle; both supplied exports belong to that seed. The other seven were audited from the repository, which is stated per cluster. Nothing here claims search demand that was not supplied.

Legend: **Implemented** = changed in this cycle · **Queued** = identified, not built · **Verified OK** = checked, no change needed · **Blocked** = needs input we do not have.

---

## 1. Scientific Calculator — *Implemented*

**Existing page:** `/calculators/scientific-calculator` (custom component, reviewed, priority 0.8).

### What was actually wrong (found by reading the code, then proved with tests)

| Defect | Evidence | Effect |
|---|---|---|
| Scientific-notation input mishandled | tokenizer consumed `2.5e` as a number, leaving `-3` as a subtraction | `2.5e-3` returned `-0.4975` instead of `0.0025` |
| Implicit multiplication broken | `parseTerm` stopped at `(` | `2(3)` returned **2**, `2(3+1)` returned 2 |
| Trailing input ignored | parser never checked that all tokens were consumed | wrong answers presented as right ones |
| No EE key, no notation guidance | keypad and quick reference | users had no way to enter exponent form |

### What was done

- Evaluator extracted to `src/lib/scientificExpression.ts` and covered by `src/lib/scientificExpression.test.ts` (8 tests: precedence, right-associative powers, `-2^2 = -4`, scientific notation with negative exponents, implicit multiplication, DEG/RAD trigonometry and inverses, factorial/percent, rejection of incomplete input).
- Component now uses it, gains an **EE** key and `e`/`E` keyboard support; the quick reference documents `1.5e-3 → 0.0015` and `2(3+4) → 14`.
- Content rewritten: longer intro, parser explanation, worked examples, four formulas, result explanations, a `DEG/RAD` result note, six FAQs (including "why does sin(30) give 0.5" and "is this an exam calculator"), and internal links to the two new tools.
- SEO title/description now target the generic "online scientific calculator" wording.

### Remaining gaps (queued)
- No memory registers (M+, MR) — the queries did not ask for them and they complicate the expression model.
- No fractions display (results are decimal or exponent form only).
- No dedicated logarithm page.

---

## 2. GPA Calculator — *Queued*

**Existing:** `/calculators/gpa-calculator`, a `config` tool with two inputs: total grade points and total credit hours.

**Gap:** it is a *checker*, not a GPA builder. A student has to compute grade points by hand before using it. Missing: per-course rows, letter-grade → point mapping (4.0 / 4.3 / weighted / 10-point), cumulative GPA across semesters, and a clear statement of which scale is assumed.

**Why not built this cycle:** it is a substantial component (dynamic rows, editable table, scale selection) and no GPA query appeared in the supplied data. Queued at high priority because the intent is large and the current tool under-serves it.

---

## 3. Mortgage Calculator — *Verified OK, one gap*

**Existing:** `/calculators/mortgage-calculator` — home price, down payment, annual rate, extra monthly payment, with currency switching.

**Confirmed working:** extra-payment modelling, currency symbol handling.
**Gap:** no property tax, insurance or HOA inputs, and no adjustable-rate scenario. International usability depends on the user supplying a rate; there is no regional assumption baked in, which is the safer default but means no country-specific guidance.
**Action:** queued. No regional tax content will be added without an authoritative source and an effective date.

---

## 4. Loan Calculator — *Verified OK*

**Existing:** `/calculators/loan-payment-calculator` plus dedicated `car-loan-calculator`, `personal-loan-emi-calculator`, `gold-loan-emi-calculator`, `debt-payoff-calculator`.
**Gap:** no overpayment *savings* summary (interest saved vs term reduced) on the generic loan page.
**Action:** queued; the mortgage and amortization pages already demonstrate the pattern.

---

## 5. Tax Calculator — *Partially covered*

**Existing:** `/calculators/vat-calculator` and take-home/salary tools. There is **no income-tax calculator**, and this is correct: income tax is jurisdiction-specific and changes annually.
**Position:** do not publish tax rates without a verified official source and an effective date. The VAT tool takes the rate as an input, which is defensible at any date.
**Action:** blocked on country + official source + maintenance owner. Recorded here so it is not repeatedly re-proposed as a "quick win".

---

## 6. Currency Converter — *Verified OK (the critical concern is already handled)*

**Existing:** `/calculators/currency-converter`.

Checked specifically because silently presenting stale rates as live is a trust failure:

- It fetches from `open.er-api.com` and tracks an `isLive` state.
- The header reads **"Live rates"** only when the feed succeeded, **"Checking live rates"** while fetching.
- On failure it keeps offline rates and shows `Live feed unavailable, showing reference rates as of ${RATES_AS_OF}`, plus a card note that results are for planning, not transactions.
- The export payload records the source as `Live rates (open.er-api.com)` or `Reference rates as of … (offline)`.

**No change needed.** This is the standard the rest of the catalogue should meet.

---

## 7. BMI Calculator — *Verified OK*

**Existing:** `/calculators/bmi-calculator` — metric and imperial weight/height inputs. Category bands and healthy-weight range are documented on the page; the tool states BMI's limits (muscle vs fat, frame size) in its FAQs and the health guides carry the same caveat.
**Action:** none. No medical claim was added or strengthened.

---

## 8. Interest Calculator — *Verified OK*

**Existing:** `/calculators/compound-interest-calculator`, `/calculators/simple-interest-calculator`, plus amortization and savings tools. Compounding frequency and contribution scenarios are covered, with tests in `src/lib/compoundInterest.test.ts`.
**Action:** none.

---

## Cross-cutting gaps (all clusters)

| Gap | Scale | Status |
|---|---|---|
| 69 calculators with no contextual inbound links | 24% of catalogue | 4 fixed this cycle, 65 queued (listed in `calculator-inventory.csv` where `inbound_links = 0`) |
| 7 calculators document no formula | small | queued |
| 6 of 11 guides are unreviewed/noindex | half the editorial surface | queued — needs editorial sign-off, not code |
| Description templates shared a boilerplate tail | all calculators | fixed: `seo.description` override now exists |
| FAQ answers are short by design | all tools | acceptable: they answer the question directly, which is what AEO needs |
