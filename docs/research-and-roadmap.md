# CalculateDaily — Competitive Intelligence, Opportunity Audit & Build Roadmap

> **Purpose of this document.** This is not a "build more calculators" plan. It is the result of a full
> competitive intelligence pass against the four reference competitors — **calculator.net** (~215 tools),
> **thecalculatorsite.com** (~150 tools), **calculatequick.com** (~87 tools), and
> **online-calculator.com** (~15 tools) — plus a competitive quality audit of every existing CalculateDaily tool.
>
> **Principle.** Competitor coverage ≠ market coverage. The goal is to leave no significant calculator /
> search-intent opportunity uncovered, to beat competitors where it matters, and to build signature
> workflow ecosystems competitors do not have.
>
> **Deliverables in this file:**
> - **A.** Competitor coverage matrix (complete inventories, tool-by-tool)
> - **B.** Master calculator taxonomy (all categories + every opportunity we found)
> - **C.** Gap analysis — first-, second-, and third-order gaps
> - **D.** Existing-tool quality audit (the `npm run audit` PASS does *not* mean "done")
> - **E.** Workflow ecosystem map (12 signature ecosystems)
> - **F.** Regional opportunity map
> - **G.** Unique opportunity list (things competitors do not cover)
> - **H.** Priority backlog (ranked, with intent / effort / value / difficulty)
> - **I.** Revised roadmap (strategic batches, not a raw count)
> - **J.** Strategic conclusion (what CalculateDaily will do that nobody else does)

---

## A. Competitor Coverage Matrix

### A.1 Inventory — calculator.net (~215 unique tools)

**Financial (largest collection on the market, ~85):**
Mortgage, Loan, Auto Loan, Interest, Payment, Retirement, Amortization, Investment, Currency,
Inflation, Finance, Mortgage Payoff, Income Tax, Compound Interest, Salary, 401K, Interest Rate,
Sales Tax, House Affordability, Savings, Rent, Marriage Tax, Estate Tax, Pension, Social Security,
Annuity, Annuity Payout, Credit Card, Credit Cards Payoff, Debt Payoff, Debt Consolidation,
Repayment, Student Loan, College Cost, Simple Interest, CD, Bond, Mutual Fund, Roth IRA, IRA, RMD,
VAT, Cash Back vs Low Interest, Auto Lease, Depreciation, Average Return, Margin, Discount, Business
Loan, Debt-to-Income, Real Estate, Take-Home-Paycheck, Personal Loan, Boat Loan, Lease, Refinance,
Budget, Rental Property, IRR, ROI, APR, FHA Loan, VA Mortgage, Home Equity, HELOC, Down Payment,
Rent vs Buy, Payback Period, Present Value, Future Value, Commission, Mortgage UK, Canadian
Mortgage, Mortgage Amortization, Percent Off.

**Fitness & Health (~32):** BMI, Calorie, Body Fat, BMR, Macro, Ideal Weight, Pregnancy, Pregnancy
Weight Gain, Conception, Due Date, Pace, Army Body Fat, Carbohydrate, Lean Body Mass, Healthy Weight,
Calories Burned, One Rep Max, Target Heart Rate, Protein, Fat Intake, TDEE, Ovulation, Period, GFR,
Body Type, Body Surface Area, BAC, Anorexic BMI, Weight Watchers Points, Overweight.

**Math (~45):** Scientific, Fraction, Percentage, Triangle, Volume, Standard Deviation, Random
Number Generator, Number Sequence, Percent Error, Exponent, Binary, Hex, Half-Life, Quadratic,
Slope, Log, Area, Sample Size, Probability, Statistics, Mean/Median/Mode/Range, Permutation &
Combination, Z-score, Confidence Interval, Ratio, Distance, Circle, Surface Area, Pythagorean,
Right Triangle, Root, LCM, GCF, Factor, Rounding, Matrix, Scientific Notation, Big Number, Prime
Factorization, Common Factor, Basic, Long Division, Average, P-value.

**Other (~50):** Age, Date, Time, Hours, GPA, Grade, Height, Concrete, IP Subnet, Bra Size, Password
Generator, Dice Roller, Conversion, Fuel Cost, Voltage Drop, BTU, Square Footage, Time Card, Time
Zone, Love, GDP, Gas Mileage, Horsepower, Engine Horsepower, Stair, Resistor, Ohms Law, Electricity,
Shoe Size, Tip, Mileage, Density, Mass, Weight, Speed, Molarity, Molecular Weight, Roman Numerals,
Golf Handicap, Sleep, Tire Size, Roofing, Tile, Mulch, Gravel, Wind Chill, Heat Index, Dew Point,
Bandwidth, Base64, URL Encode, Time Duration, Day Counter, Day of the Week.

**Distribution channels:** embeddable calculators-for-your-site program (Mortgage/Math/Scientific/
Love/Concrete), sitemap.html index, per-category landing pages.

**Weaknesses (our attack surface):** dated dense UI, ad-heavy, US-centric, minimal supporting content
(a paragraph + formula), almost no visualization, no scenario compare, no shareable/URL-encoded
result state, thin cross-linking between related tools, no workflow guidance.

### A.2 Inventory — thecalculatorsite.com (~150 unique tools)

**Finance (~45):** Compound Interest, Compound Interest (Daily), Compound Interest (Formula), APR,
APY, CAGR, Car Loan, Cash Back, Credit Card Repayment, Currency, Forex Compounding, Future Value,
How Long to Save, How Long Will Money Last, Interest Rate, Investment, IRR, Loan, Loan Payoff,
Margin, Million↔Billion, MMA, Money Counter, Mortgage, Mortgage Refinance, Price per Sq Ft,
Retirement, Savings, Savings Goals, Simple Interest, SIP, Stock Average, Hourly→Salary,
Salary→Hourly, Overtime, Pay Raise, Time and a Half.

**Conversions (~40 single-pair tools + ~19 unit groups):** cm→ft, cm→in, ft→in, ft→m, in→cm, in→ft,
m→ft/in, mm→in, g→lb, kg→stone, kg→lb, mcg→mg, mcg→g, mg→g, oz→lb, stone→lb, cu ft→gal, gal→oz,
L→gal, L→oz, cu yd→ton, gal→lb, L→ton, in-lb→ft-lb, Nm→ft-lb, acres→sq ft, sq ft→acres, sq m→sq ft,
sq ft→cu ft, sq ft→cu yd, amps→watts, Hz→seconds, lumens→watts, watts→amps, plus full group
converters (acceleration, area, data storage, data transfer, energy, fuel consumption, gold, height,
length, liquid volume, mass, power, pressure, temperature, time, velocity, water weight, weight,
weight-to-volume).

**Home & Garden (~8):** CBM, Cubic Feet, Cubic Yards, Square Footage, Flooring, Asphalt, Gravel, Mulch.
**Home Energy (4):** Electricity Cost, LED Savings, Miles per kWh, MPGe.
**Cooking (~26):** Cooking Converter, Air Fryer, Baking Conversions, Butter, Cups↔Grams, Cups↔mL,
Cups↔Pounds, Cups↔Tbsp, Grams↔Cups, Grams↔mL, Grams↔Ounces, Grams↔Pounds, Grams↔Tbsp, Grams↔Tsp,
mL↔Grams, Ounces↔Cups, Ounces↔Grams, Ounces↔mL, Oven Temperatures, Pints↔Cups, Pounds↔Cups,
Quarts↔Cups, Tbsp↔Grams, Tbsp↔Tsp, Tsp↔Grams, Tsp↔mL.
**Time (~8):** Age, Age Difference, Chronological Age, Date, Days Between, Days From, Days Until, Generation.
**Education (~3):** Final Grade, Uni Grade, Sig Figs (sister site).
**Math (~6):** Decimal↔Fraction, Density, Fractions, Hex↔Decimal, Percentage, Percentage Change.
**Health (~12):** BMI, BMR, How Long to Walk a Mile, Steps in a Mile, kJ→Calories, Miles→Steps,
Pregnancy, Sobriety, Steps→Calories, Steps→Km, Steps→Miles, WHR.
**Handy (3):** Birthday, Roman Numerals, Scientific Calculator.

**Weaknesses (our attack surface):** dated design, mega-menu that is hard to scan, thin per-page
content, US/UK unit mixing, almost no visualization, no scenario compare, no result sharing, ad clutter,
Finance section is strong but construction/health sections are shallow, no regional variants.

### A.3 Inventory — calculatequick.com (~87 unique tools, 20 categories)

This is the most complete sitemap extraction of CalculateQuick to date (full post-sitemap, page-sitemap,
and category-sitemap). It confirms **87 calculator pages** plus ~17 informational pages
(calculator-builder, apps, browser-extensions, custom-calculator-service, partnerships, media-centre,
editorial-policies, careers, etc.).

**AI (3):** Claude Token Cost, DeepSeek API Cost, Kimi API Cost.
**Animal (2):** Maine Coon Color, Pigeon Velocity.
**Anatomy (3):** Clavicle Length, Body Somatotype, Hand Size.
**Biology (1):** Baby Eye Color.
**Chemistry (3):** Muriatic Acid Pool, Mole-to-Mole Worksheet, Hydrogen Peroxide Dilution.
**Construction (10):** WWTP Hydraulic Profile, Embedded Loss in Bolted Joints, Wainscoting, Shaker
Wall Panelling, Window Film, Board Foot, Fire Alarm Battery, Round Pen, Angle Iron Weight, Copper Wire Weight.
**Conversion (8):** oz→Cups, kg→Lbs, ml→oz, km→Miles, Grams→Cups, cm→Inches, mg→ml, Grams→Ounces.
**Education (2):** Test Grade, GPA.
**Engineering (1):** Klipper Rotation Distance.
**Everyday Life (7):** Typing Speed, Sleep Cycle, Playback Speed, Weighted Blanket, Age, Time, Tip.
**Finance (13):** Stamp Duty (UK), Price Elasticity of Demand, Bradford Factor, Maximum Allowable
Offer, Wage, Rent Affordability (UK), Rental Yield, Solana Staking, Binance BSC Staking, Ethereum
Staking, Cardano Staking, Boat Loan, Compound Interest.
**Food (3):** Beef Freezer Space, Perfect Boiled Egg, Recipe Conversion.
**Health (10):** Red Light Therapy, Ovulation, Pregnancy Due Date, Sleep Debt, Macros, Calorie,
Protein, TDEE, BMI, Harris-Benedict.
**Math (5):** Synthetic Division, Booth's Algorithm, Matrix Multiplication, Circumference, Percentage.
**Misc (3):** Vocal Range, One-Block Wonder, Semitone.
**Sport (6):** Instant Center, Quarter-Mile Gear Ratio, Tinman Running Pace, Pentathlon, Golf
Handicap, One Rep Max.
**Statistics (1):** P-value.
**Technology (5):** CIDR→IP Range, IP Subnet, Wildcard Mask, VLSM, SHA-256.
**Time (1):** Timesheet.

**Moat mechanisms:** per-page Sources + Formula + Embed iframe + Cite (APA/MLA/Chicago) + Share +
Related + Feedback + Last Updated; AI calculator builder; embeddable widgets; Android app; browser
extensions; custom calculator service; GenerateQuick sister site.

**Weaknesses (our attack surface):** breadth still small vs calculator.net; many "niche" pages are
shallow calculators wrapped in long content (linkbait risk); category coverage uneven (Statistics has
1 tool, Biology 1, Engineering 1); no scenario compare; no result URL sharing; WordPress overhead; some
tools exist only to chase novelty keywords.

### A.4 Inventory — online-calculator.com (~15 unique tools)

Full Screen Calculator, Scientific Calculator, Simple Calculator, Online Abacus, Darts Calculator,
Maths Calculator, Google Calculator, BMI Calculator (+ full-screen variants). Sitemap also confirms
multi-language clones (es, fr, de, af, zh-CN, iw, nl, sv, el) of the same ~5 core tools, plus earlier
research noted patio, ring-size, and a few converters.

**Weaknesses:** virtually no finance/health/math breadth; the abacus and full-screen calculator are
its only distinctive assets; everything else is commodity.

### A.5 How to read the matrix below

| Code | Meaning |
|---|---|
| **COVERED** | We already satisfy the intent adequately. |
| **IMPROVE** | We have it, but a competitor provides materially more value. |
| **MISSING** | We do not satisfy the intent at all. |
| **VARIANT** | We have the general tool but are missing an important variation/use-case. |
| **CLUSTER** | The competitor tool exposes a much larger ecosystem we should build. |
| **GAP** | Competitors don't have it (or do it poorly) but there's a strong reason to build it. |
| **UNIQUE** | A differentiated tool that could give us an advantage. |
| **LOW** | Technically possible, weak strategic value. |
| **DON'T** | Not worth building. Reason given. |

### A.6 Tool-by-tool coverage matrix

| Competitor tool | We have | Our version | Class | Notes / decision |
|---|---|---|---|---|
| **Percent off / discount** | Discount + Sales Tax (custom) | Strong | COVERED | Add "percent off original price" reverse mode. |
| **Percentage (multi-mode)** | Percentage (custom) | Good | IMPROVE | Add % change reverse, % of, what-% game-like modes to match calculator.net depth. |
| **Tip calculator** | Tip & Bill Splitter | Better than most | COVERED | |
| **Mortgage** | Mortgage & Loan Planner | Good base | IMPROVE→CLUSTER | Competitor mortgage ecosystem (affordability, payoff, amortization table, PMI, HOA, extra payments, biweekly, refi) is much deeper. Build the Mortgage Ecosystem. |
| **Loan payment** | Loan Payment (config) | Equivalent | COVERED | Add extra-payment payoff view. |
| **Simple interest** | Simple Interest (config) | Equivalent | COVERED | |
| **Compound interest** | Compound Interest (custom) | Strong | IMPROVE | Add daily/continuous compounding + growth chart + contribution slider (ECharts). |
| **Savings goals / how long to save** | Daily Savings Goal + Savings Goal page | Unique daily-challenge angle | COVERED→GAP | Add "how long to reach target at given rate" mode. |
| **Emergency fund** | Emergency Fund (config) | Equivalent | COVERED | |
| **Salary ↔ hourly** | Hourly→Annual (config) | Good | IMPROVE | Add salary→hourly direction + overtime + time-and-a-half + take-home estimate. |
| **ROI / IRR** | ROI (config) | Basic | IMPROVE | Add IRR, CAGR, APY, payback period cluster. |
| **Credit card interest** | Credit Card Interest (config) | Basic | IMPROVE→CLUSTER | Add payoff timeline, minimum-payment math, debt snowball/avalanche. |
| **Debt payoff / consolidation / repayment** | — | — | MISSING→CLUSTER | High intent. Build Debt Payoff ecosystem. |
| **Retirement / 401K / annuity / pension / social security** | — | — | MISSING | US-intent; decide region strategy (see F). |
| **Inflation / present value / future value** | — | — | MISSING | Finance core. |
| **Tax: income / sales / VAT / estate / marriage** | — | — | MISSING→VARIANT | Regional-dependent; see F. |
| **Budget / 50-30-20** | — | — | MISSING→GAP | Tie to take-home → savings workflow. |
| **Rent vs buy / affordability / DTI / down payment** | — | — | MISSING→CLUSTER | Core of Home-Buying workflow. |
| **Business: margin, markup, commission** | Markup & Margin (config) | Good | COVERED | Add commission. |
| **Fuel cost / gas mileage** | Fuel Cost (config) | Equivalent | COVERED | Add L/100km + price-per-mile. |
| **Electricity cost** | Electricity Cost (config) | Equivalent | COVERED | Add appliance library + LED savings. |
| **BMI** | BMI (custom) | Better (healthy-weight band) | COVERED | |
| **BMR / TDEE / calorie** | BMR + Calories Burned + Protein | Good | IMPROVE→CLUSTER | Add TDEE, full macros, weight-goal timeline. Health Ecosystem. |
| **Body fat (Navy) / lean mass / healthy weight** | Body Fat (Navy) + Ideal Weight | Good | COVERED | Add lean body mass, BSA. |
| **Pregnancy / due date / conception / ovulation / period** | — | — | MISSING→CLUSTER | Big intent. Build Pregnancy ecosystem. |
| **One rep max** | One Rep Max (config) | Equivalent | COVERED | |
| **Pace / running** | Running Pace (config) | Good | IMPROVE | Add race-time prediction, pace ↔ speed both directions. |
| **Target heart rate** | Target Heart Rate (config) | Equivalent | COVERED | |
| **Steps → miles/km/calories** | — | — | MISSING | The Calculator Site owns this; easy config tools. |
| **Sleep cycle / sleep debt** | — | — | MISSING | CalculateQuick has both; high long-tail intent. |
| **Age / date / days between / days until** | — | — | MISSING→CLUSTER | Core date ecosystem; cheap to build, huge intent. |
| **Time card / hours / time duration** | Work Hours + Decimal Hours | Good | IMPROVE | Add multi-shift time card + overnight + total pay. |
| **Time zone** | — | — | MISSING | |
| **GPA / final grade / test score** | GPA + Test Score (config) | Good | IMPROVE | Add final-grade-needed mode. |
| **Fraction / decimal / percent / hex / binary / scientific notation** | Fraction→Percent, Ratio | Partial | VARIANT | Add fraction ops, decimal↔fraction, hex/binary converters. |
| **Scientific calculator / basic calculator / big number** | — | — | MISSING→UNIQUE | Full-screen scientific calculator is a must-have surface; calculatequick/online-calc have it, calculator.net does too but ugly. Build one that is genuinely excellent (ECharts + keyboard). |
| **Statistics: std dev, mean/median/mode, z-score, confidence interval, sample size, p-value, probability** | — | — | MISSING→CLUSTER | calculator.net + calculatequick both strong; cheap config tools. |
| **Triangle / circle / area / volume / surface area / pythagorean** | Room Area + Room Volume | Partial | VARIANT→CLUSTER | Add geometry cluster (circle, triangle, right triangle, pythagorean). |
| **Concrete / paint / flooring / lumber** | All four + Room Area + Room Volume | Good | COVERED | Add tile, roofing, mulch, gravel, wallpaper, stairs → Construction Ecosystem. |
| **Cooking: oz↔cups, grams↔cups, tbsp/tsp, oven temps, air fryer** | oz→cups + cups→grams | Good start | IMPROVE→CLUSTER | The Calculator Site's biggest moat (~26 pages). Build the ingredient-aware Cooking Converter with density database + all unit pairs + oven temps + air fryer. |
| **Recipe scaler** | Recipe Scaler (config) | Equivalent | COVERED | |
| **Unit converters (temp/length/weight/volume/speed/area/data)** | 7 unit groups | Good | COVERED→VARIANT | Add power, pressure, energy, fuel consumption, force, time, gold/water weight, height, weight-to-volume. |
| **Currency** | Currency (custom, 40+ currencies) | Strong | COVERED | Add fee-adjusted rate view. |
| **IP subnet / CIDR / wildcard / VLSM** | — | — | MISSING | Calculator.net has IP subnet; calculatequick has 5. Developer cluster (see G). |
| **SHA-256 / Base64 / URL encode / hex** | — | — | MISSING→UNIQUE | Developer/tooling cluster. |
| **Password generator / dice / random number** | — | — | LOW | Weak strategic value. |
| **Love / birthday / generation / bra size / shoe size** | — | — | LOW | calculator.net filler. |
| **Tire size / horsepower / GDP / density / molarity / molecular weight** | — | — | LOW→VARIANT | Density + molarity are homework-intent; rest low. |
| **Voltage drop / resistor / ohms law / BTU / bandwidth** | — | — | MISSING→GAP | Small engineering cluster; cheap, defensible. |
| **Golf handicap / wind chill / heat index / dew point** | — | — | LOW | Localized novelty. |
| **Maine Coon color / pigeon velocity / vocal range / one-block wonder / semitone** | — | — | DON'T | CalculateQuick novelty filler; not strategic for us. |
| **Typing speed / playback speed / weighted blanket / beef freezer** | — | — | LOW→DON'T | Novelty; skip or revisit later. |
| **Red light therapy / somatotype / clavicle length / hand size** | — | — | DON'T | Pseudo-precise niche; no strategic value. |

---

## B. Master Calculator Taxonomy

Every opportunity discovered across the four competitors **plus** opportunities none of them cover,
classified. Legend: **MH**=must-have, **HV**=high-value, **LT**=long-tail, **N**=niche,
**ECO**=ecosystem anchor, **U**=unique to us, **REG**=regional.

### B.1 Finance & Money
- **Mortgage Ecosystem (ECO, MH)**: mortgage payment, affordability/how-much-house, amortization
  schedule, amortization table (monthly/yearly + payoff date), extra payment / biweekly / early
  payoff, refinance savings ("when does refi pay off"), down payment / PMI / closing costs, LTV,
  DTI, rent vs buy, mortgage payoff date. *Existing:* mortgage base. **9 new tools.**
- **Loan family (MH)**: loan payment, auto loan, personal loan, student loan, boat loan, business
  loan, lease vs buy, loan payoff, debt consolidation. *Existing:* loan payment. **7 new.**
- **Interest family (MH)**: simple, compound (daily/continuous), APR vs APY, CAGR, IRR, ROI,
  present/future value, average return, payback period, interest-rate solver. *Existing:* simple,
  compound, ROI. **7 new.**
- **Debt family (HV, ECO)**: credit card payoff, minimum payment, debt snowball vs avalanche,
  debt-to-income, credit utilization. *Existing:* credit card interest. **5 new.**
- **Savings & retirement (HV, REG)**: savings goal, how-long-to-save, emergency fund, 401K,
  IRA/Roth, retirement number, annuity, pension, social security, CD, bond, mutual fund.
  *Existing:* savings goal, emergency fund. **Region strategy required (F).**
- **Pay & income (HV)**: hourly↔salary, take-home pay (tax estimate), overtime/time-and-a-half,
  pay raise, commission. *Existing:* hourly→salary. **4 new.**
- **Business (HV)**: markup/margin, break-even, unit economics (price per unit / per oz), 
  price-per-sqft, sales tax, VAT. *Existing:* markup/margin. **4 new.**
- **Tax (REG)**: income tax estimator, sales tax, VAT, stamp duty, payroll tax. **Regional.**
- **Crypto (LT, U)**: staking APY projection (generic, not coin-specific like CQ). *Existing:* none. **1-2 new.**

### B.2 Health & Fitness
- **Body metrics (MH)**: BMI, BMR, TDEE, body fat, lean body mass, ideal weight, body surface area,
  healthy weight range, waist-to-height. *Existing:* 5 of 9. **4 new.**
- **Nutrition (HV)**: calorie intake (TDEE-based), macros (full P/C/F split), protein, carbohydrate,
  water intake, kcal↔kJ. *Existing:* protein, water, calories-burned, BMR. **4 new.**
- **Pregnancy ecosystem (HV, ECO)**: due date, conception, ovulation, fertility window, pregnancy
  weight gain, pregnancy timeline. **6 new (all missing).**
- **Fitness (HV)**: one-rep max, pace, race-time prediction, calories burned, target heart rate,
  steps→miles/km/calories. *Existing:* 5. **4 new.**
- **Sleep (LT, U)**: sleep cycle (bedtime/waketime calculator), sleep debt. **2 new (CQ has both).**
- **General health (N)**: dog age (have), sleep, GFR, BAC, sobriety, WHR. **3-4 new.**

### B.3 Math
- **Core (MH)**: percentage (multi-mode), percent change, discount, ratio/proportion, fraction↔
  percent, decimal↔fraction, fraction operations. *Existing:* 6. **3 new.**
- **Scientific / basic (MH, U)**: full-screen scientific calculator, basic calculator, big-number
  mode. **3 new — none of us have a calculator surface at all.**
- **Statistics (HV)**: mean/median/mode/range, std dev, variance, z-score, confidence interval,
  sample size, p-value, probability, average. **9 new (all missing).**
- **Geometry (HV)**: circle (circumference/area), triangle, right triangle, pythagorean, square
  footage, volume (shapes). *Existing:* room area/volume. **4 new.**
- **Number systems (LT)**: binary, hex, decimal, scientific notation, roman numerals, exponents/roots. **5 new.**
- **School (HV)**: GPA (have), test score (have), final-grade-needed, uni-grade. **2 new.**

### B.4 Time & Date
- **Date family (MH, ECO)**: age, date difference, add/subtract dates, days until, days from today,
  day of week, time duration, time zone. **8 new (all missing).**
- **Work time (HV)**: work hours (have), decimal hours (have), time card (multi-day), overtime
  calculator, shift differential. **3 new.**

### B.5 Construction & DIY
- **Home material family (MH)**: room area (have), room volume (have), concrete (have), paint
  (have), flooring (have), lumber (have), tile, roofing/shingles, mulch, gravel, wallpaper, drywall,
  stairs, fence, asphalt. **9 new.**
- **HVAC/electrical (LT)**: BTU, voltage drop, resistor/ohms law, watts↔amps. **4 new (GAP).**

### B.6 Conversion
- **Unit groups (MH)**: temp/length/weight/volume/speed/area/data (have). **Add: power, pressure,
  energy, fuel consumption, force, time, gold weight, water weight, height, weight-to-volume — 10 new groups.**
- **Cooking converter (MH, ECO, U)**: ingredient-density-aware conversion across ~40 ingredients
  and all unit pairs (cups, tbsp, tsp, grams, oz, ml, pounds, pints, quarts), oven temperatures,
  air fryer scaling. *Existing:* oz↔cups + cups↔grams (manual density). **Rebuild as the killer
  cooking converter with an ingredient database — beats thecalculatorsite's static pages.**

### B.7 Food
- Recipe scaler (have), cost per meal (have), **price per unit / price per oz (HV, U)** — nobody
  does grocery unit pricing well; meal-cost compare.

### B.8 Developer / Technology (U — nobody serves this well at scale)
- **IP/networking**: IP subnet, CIDR, wildcard mask, VLSM. (calculator.net: subnet only; CQ: 5 tools.)
- **Crypto/hash**: SHA-256, Base64, URL encode/decode, hex, binary. (CQ: SHA-256; calculator.net: base64/url.)
- **Data**: data storage (have), bandwidth, data transfer rate, throughput.
- **AI cost (LT, U)**: token-cost calculator (generic model table) — CQ has 3; one good generic tool + model comparison.

### B.9 Workflow & Estimation (U — the signature layer)
- **Scenario compare** across any financial tool (side-by-side sliders).
- **Money flow**: take-home → budget → savings → retirement.
- **Home flow**: room dims → area → flooring → tile → paint → mulch.
- **Shopping flow**: price per unit → discount → tax → tip.
- **Travel flow**: distance → fuel cost → currency → time zone.
- **Project flow**: dims → material qty → wastage → cost → estimate.

---

## C. Gap Analysis (first / second / third order)

### C.1 First-order gaps (competitor has a tool, we have none)
Scientific & basic calculators, age/date/days-between/days-until, time-zone, sleep cycle, sleep debt,
pregnancy/due-date/ovulation, TDEE, macros, steps→miles/km/calories, retirement, take-home pay,
budget, rent-vs-buy, mortgage affordability, amortization table, early-payoff/biweekly, refi savings,
debt payoff/snowball, inflation, PV/FV, final-grade-needed, statistics cluster (std dev, z-score,
confidence interval, sample size, p-value), geometry cluster, number systems, power/pressure/energy
converters, cooking converter (tbsp/tsp/oven/air-fryer), roofing/tile/mulch/gravel, IP subnet,
developer tooling, price-per-unit.

### C.2 Second-order gaps (competitor implements it, but weakly)
- **Mortgage affordability**: calculator.net's is thin; nobody ties it into a buying workflow.
- **Sleep calculators**: CQ has them but as shallow content-wrapped tools.
- **Macros**: all four are basic; none connect BMR → TDEE → macros → weight goal → progress.
- **Steps**: The Calculator Site owns steps family; none visualize or link to health workflow.
- **Cooking conversion**: thecalculatorsite has the breadth but zero ingredient-density UX and a
  clunky page-per-pair model; no single smart converter.
- **Final grade / GPA**: all basic; no "what do I need on the final" mode with grade scale options.
- **Price per unit**: essentially absent everywhere (only spotty examples).
- **Statistics**: calculator.net is deep but impenetrable; no guided use-case UX.
- **Savings**: no site connects daily challenge → compound growth → emergency fund as a journey.

### C.3 Third-order gaps (the user's real problem — nobody owns these workflows)
1. **"Can I afford to buy a house?"** → income required, DTI, down payment, closing costs, mortgage
   payment, property tax, insurance, PMI, total ownership cost, rent-vs-buy, affordability.
2. **"Should I refinance?"** → current payment, new payment, break-even point, savings over term,
   closing-cost payback, cash-out vs rate-term.
3. **"How do I pay off my debt fast?"** → balance, APR, minimums, snowball vs avalanche, payoff
   date, interest saved, debt-free projection chart.
4. **"How much should I weigh / what should I eat?"** → BMI, BMR, TDEE, calorie target, macro
   split, weight-goal timeline, water, steps, exercise burn.
5. **"When is my baby due / am I fertile?"** → LMP, due date, conception date, ovulation, fertile
   window, pregnancy week-by-week, weight gain.
6. **"How much will this renovation cost?"** → room dims, area, flooring, tile, paint, trim, labor,
   wastage, total estimate.
7. **"How much do I need to retire?"** → savings, contributions, rate, inflation, withdrawal,
   age targets, FIRE projection.
8. **"What does my paycheck really buy?"** → hourly→salary→take-home→budget→savings→retirement.
9. **"Is this trip worth it?"** → distance→fuel→currency→per-day budget→comparison.
10. **"Is this the right loan?"** → payment, APR, total interest, compare 2 loans side by side.

These are the ecosystems in section E. No competitor strings these together.

---

## D. Existing-Tool Quality Audit

`npm run audit` (52/52 PASS) proves the *implementation* works. It proves nothing about intent
coverage, competitive quality, content depth, UX, SEO, or cluster depth. Findings:

| Existing tool | Correct? | Competitive UX | Content depth | FAQs | Related links | Needs charts | Needs compare | Needs region | Needs specialized version | Beaten by |
|---|---|---|---|---|---|---|---|---|---|---|
| Percentage | ✅ | ✅ | ✅ 3 | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ multi-mode | CalculateQuick (slightly) |
| Discount & Tax | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | Equivalent |
| Ratio/Proportion | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | Equivalent |
| Fraction→Percent | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | Equivalent |
| Markup & Margin | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ donut | ❌ | ❌ | ✅ commission | Equivalent |
| GPA | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ weighted | CQ GPA |
| Test Score | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ final-grade mode | calculator.net Grade |
| Compound Interest | ✅ | ✅ | ✅ | ✅ | ✅ | **❌ (chart needed)** | ✅ | ❌ | ✅ daily/continuous | CalculateQuick + TCS |
| Mortgage | ✅ | ✅ | ✅ | ✅ | ✅ | **❌ (amort chart needed)** | ✅ | ❌ | ✅ full ecosystem | calculator.net (depth) |
| Daily Savings Goal | ✅ | ✅ unique | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | **UNIQUE** |
| Loan Payment | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ amort | ✅ | ❌ | ✅ extra payments | calculator.net |
| Simple Interest | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ solver mode | Equivalent |
| Hourly→Salary | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ take-home + reverse | TCS (both directions) |
| ROI | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ IRR/CAGR | calculator.net |
| Credit Card Interest | ✅ | ✅ | ✅ | ✅ | ✅ | **❌ payoff timeline** | ✅ | ❌ | ✅ payoff/snowball | calculator.net payoff |
| Emergency Fund | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ "how long" mode | Equivalent |
| BMI | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ weight band | ❌ | ❌ | ❌ | Equivalent |
| BMR | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ vs TDEE | ❌ | ❌ | ✅ TDEE + macros | CQ TDEE |
| Calories Burned | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ activity presets | calculator.net |
| Body Fat (Navy) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ category | ❌ | ❌ | ❌ | Equivalent |
| Ideal Weight | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | Equivalent |
| Water Intake | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | Equivalent |
| Protein Intake | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ full macros | CQ Macros |
| Target Heart Rate | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ zones | ❌ | ❌ | ❌ | Equivalent |
| Dog Age | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ breed-size | Equivalent |
| oz→Cups | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ full cooking converter | TCS (breadth) |
| Cups→Grams | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ ingredient DB | TCS |
| Currency | ✅ | ✅ | ✅ (4 FAQs) | ✅ | ✅ | ❌ | ✅ | ✅ fee view | ❌ | Equivalent |
| Temp/Length/Weight/Speed/Area/Volume/Data | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ more groups | TCS (more groups) |
| Work Hours | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ time card multi-day | calculator.net Time Card |
| Decimal Hours | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | Equivalent |
| Days↔Weeks/Months | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ date-diff | TCS |
| Room Area | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ shapes | Equivalent |
| Room Volume | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ shapes | Equivalent |
| Concrete | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ wastage + cost | calculator.net |
| Paint | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ ceiling/walls | Equivalent |
| Flooring | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ tile-specific | Equivalent |
| Lumber | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ cost | CQ Board Foot |
| Recipe Scaler | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | CQ Recipe Conversion |
| Meal Cost | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ price-per-unit | Equivalent |
| Running Pace | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ race prediction | Equivalent |
| One Rep Max | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ training % | Equivalent |
| Tip & Bill Split | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | Equivalent |
| Fuel Cost | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ L/100km | Equivalent |
| Electricity Cost | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ appliance list | ❌ | ❌ | ✅ LED savings | TCS LED |

**Systemic findings:**
1. **Every tool has correct math** — good baseline.
2. **Content is consistently strong** (intro/howItWorks/example/3 FAQs) — but **only 3 FAQs** vs
   CalculateQuick's sources/formula/cite/embed depth. Upgrade path: sources + 6-8 FAQs + workflow links.
3. **Zero visualization anywhere.** This is the single biggest quality gap vs. the market and our
   single best differentiator (user explicitly asked for ECharts visual libraries).
4. **Zero scenario comparison.** Add a compare mode to all financial tools.
5. **Zero URL-state sharing.** Add input → `?params` → loadable link.
6. **Related links exist but are sparse** (2-3 per tool) and don't follow workflows.
7. **Regional variants absent** (currency prefix `$` is a literal default; the R-default in examples
   is inconsistent with the `$` prefix in configs — a known inconsistency to fix).
8. **Missing specialized versions** of 12 core tools (see matrix).

---

## E. Workflow Ecosystem Map (12 signature ecosystems)

Each ecosystem is a cluster of calculators + guides + cross-linking that follows the user's real
problem end-to-end. These become signature CalculateDaily experiences.

| # | Ecosystem | Entry intent | Tools in chain | Anchor content |
|---|---|---|---|---|
| 1 | **Home Buying** | "how much house can I afford" | Income required → DTI → Down payment → Closing costs → Mortgage payment → Property tax → Insurance → PMI → Total ownership → **Rent vs Buy** | Guide: "How much house can I afford" |
| 2 | **Mortgage & Refinance** | "mortgage calculator" | Payment → Amortization table → Payoff date → Extra payment → Biweekly → **Refinance break-even** | Guide: "Should I refinance?" |
| 3 | **Debt Freedom** | "debt payoff calculator" | Balance → APR → Minimums → Snowball vs Avalanche → Payoff date → Interest saved → Debt-free chart | Guide: "How to pay off debt fast" |
| 4 | **Retirement / FIRE** | "retirement calculator" | Savings → Contributions → Rate → Inflation → Withdrawal → Age targets → FIRE number | Guide: "How much do I need to retire" |
| 5 | **Paycheck to Wealth** | "take home pay" | Hourly→Salary → Take-home → Budget (50-30-20) → Savings goal → Emergency fund → Compound growth | Guide: "What your paycheck really buys" |
| 6 | **Body & Nutrition** | "TDEE calculator" | BMI → BMR → TDEE → Calorie target → Macros → Protein → Water → Steps → Burn → Weight-goal timeline | Guide: "How much should I eat" |
| 7 | **Pregnancy & Fertility** | "due date calculator" | LMP → Due date → Conception → Ovulation → Fertile window → Week-by-week → Weight gain | Guide: "When is my baby due" |
| 8 | **Home Renovation** | "how much flooring do I need" | Room dims → Area → Flooring → Tile → Paint → Trim/wallpaper → Wastage → Total estimate | Guide: "Renovation cost estimator" |
| 9 | **Baking & Cooking** | "grams to cups" | Ingredient density DB → All unit pairs → Oven temps → Air fryer → Recipe scaler → Meal cost | Guide: "Baking by weight" |
| 10 | **Statistics for Students** | "standard deviation calculator" | Mean/Median/Mode → Std dev → Variance → Z-score → Confidence interval → Sample size → P-value | Guide: "Statistics without tears" |
| 11 | **Developer Toolbox** | "ip subnet calculator" | IP subnet → CIDR → Wildcard → VLSM → SHA-256 → Base64 → URL encode → Data/bandwidth | Guide: "Networking quick reference" |
| 12 | **Travel Planner** | "fuel cost calculator" | Distance → Fuel cost → Price-per-mile → Currency → Time zone → Date diff → Per-day budget | Guide: "Trip cost estimator" |

---

## F. Regional Opportunity Map

Where geography genuinely changes the math (do NOT build US-only everywhere):

| Domain | US | UK | EU/VAT | India | ZA | Australia | Build strategy |
|---|---|---|---|---|---|---|---|
| Income tax / take-home | Yes | Yes (NI + income tax) | — | Yes (old/new regime) | Yes (PAYE) | Yes | **Parameterized tax engine**; one tool, per-region rate tables. |
| VAT / sales tax | Sales tax (state) | VAT 20% | VAT 17-27% | GST | VAT | GST | Already have discount+tax; add region presets. |
| Stamp duty | — | Yes (CQ has UK) | — | Yes | Transfer duty | Yes | **GAP across all competitors except CQ (UK only).** |
| Mortgage | Yes (PMI/FHA) | Yes | — | Yes | Yes | Yes | Region switch on mortgage ecosystem (calculator.net does UK/CA variants). |
| Salary ↔ hourly | Yes | Yes (TCS does both) | — | Yes | Yes | Yes | Currency + tax + pay-period differences. |
| Fuel | gal/mi | L/100km | L/100km | L/100km | L/100km | L/100km | Region unit presets. |
| Electricity | kWh $ | kWh £/p | kWh € | kWh ₹ | kWh R (tariff tiers) | kWh $ | Tariff presets per region. |
| Weight/height units | lb/ft | stone/kg | kg | kg | kg | kg | **Existing weight converter already has stone** — surface per-region defaults. |
| Retirement | 401K/IRA | Pension | — | PF/PPF | RA | Super | Full retirement ecosystem is US/ZA/AU specific. |
| Currency | ✅ have | ✅ | ✅ | ✅ | ✅ (R default) | ✅ | Already global; add fee-adjusted view. |

**Prioritized regions:** US (head term volume), ZA (site default + existing R examples), UK (CQ's
stamp-duty/rent-affordability is an open door), India (SIP/FD/stamp-duty/GST — completely uncovered
by all four), Australia (super + stamp duty). Build a **Region context provider** (currency, units,
tax/VAT rate defaults, mortgage conventions) that re-skins every tool — not separate country pages.

---

## G. Unique Opportunity List (things competitors do not cover well or at all)

1. **Scenario Compare engine** — side-by-side sliders for any financial tool (rate/term/amount).
   *Nobody has this.*
2. **Result URL sharing** — every result is a loadable, shareable `?params` URL. *Nobody has this.*
3. **Ingredient-aware Cooking Converter** — one smart tool with a ~40-ingredient density database,
   replacing thecalculatorsite's 26 static pages. *Best-in-class potential.*
4. **Price-per-unit / grocery unit pricing** — compare package sizes & prices. *Essentially absent everywhere.*
5. **Developer Toolbox** — networking + crypto/hash + data + AI-token-cost in one ecosystem.
   *Only fragmented coverage exists.*
6. **Money workflow journey** — Daily Savings Challenge (existing unique) → take-home → budget →
   emergency → compound, as a guided path with carry-forward of values.
7. **Sleep optimizer** — bedtime/waketime from sleep cycles with a wake-between-cycles visual
   (ECharts timeline). CQ has cycle tool but no visualization.
8. **Retirement/FIRE projection with chart** — inflation-adjusted curve vs. targets.
9. **Statistics guided UX** — plain-language use-case selection instead of raw formula forms.
10. **AI token-cost calculator** (generic model table + compare) — CQ has 3 model-specific pages;
    one clean generic tool beats three narrow ones.
11. **Regional stamp duty / property transfer** across UK/IN/AU/ZA — nobody covers more than one.
12. **Revenue/margin/budget small-business suite** with a pricing workflow.
13. **Climate/practical household tools** (only if aligned later): no — mark as **DON'T for now**.

**Deliberately NOT building (DON'T):** Maine Coon color, pigeon velocity, vocal range, one-block
wonder, semitone, red-light therapy, clavicle length, hand size, somatotype, beef freezer space,
perfect boiled egg, weighted blanket, typing speed, playback speed — CalculateQuick's novelty filler.
Low intent, low strategic value, high content cost.

---

## H. Priority Backlog (ranked)

Columns: **ID, Tool/Cluster, Category, Intent, Type, Effort, Comp. difficulty, Value, Action.**

> Effort: S=small (config, <2h), M=medium (custom component, 1-2d), L=large (ecosystem, 3-7d).
> Value: H=high, M=medium. Diff: L=low, M=medium, H=high (competitor strength).

| ID | Opportunity | Cat | Intent | Type | Effort | Diff | Value | Action |
|---|---|---|---|---|---|---|---|---|
| P01 | **Scientific & Basic calculator surface** | math | "scientific calculator" | MISSING→U | M | M | H | Custom component, ECharts plot, keyboard-first. |
| P02 | **Mortgage Ecosystem** (9 tools) | finance | mortgage cluster | CLUSTER | L | M | H | Extend existing mortgage + add affordability, amort table, extra pay, refi, rent-vs-buy. |
| P03 | **Cooking Converter with ingredient DB** | conversion | "grams to cups" | CLUSTER→U | L | M | H | Rebuild oz-cups + cups-grams into density-aware converter; add oven/air-fryer/tbsp/tsp. |
| P04 | **Date/Time ecosystem** (age, date diff, days until, timezone) | time | "age calculator" | CLUSTER | M | L | H | 4-6 config tools + ECharts calendar highlight. |
| P05 | **Health: TDEE/Macros/Weight-goal** | health | "tdee calculator" | IMPROVE | M | M | H | Extend BMR; add TDEE, full macros, timeline chart. |
| P06 | **Pregnancy & Fertility** (due date, ovulation, fertile window) | health | "due date calculator" | CLUSTER | M | L | H | 4 config tools + timeline visual. |
| P07 | **Debt Payoff / snowball-avalanche** | finance | "debt payoff" | CLUSTER | M | L | H | Payoff date + interest-saved chart + snowball vs avalanche. |
| P08 | **Statistics cluster** (std dev, z-score, CI, sample size, p-value) | math | "standard deviation" | CLUSTER | M | M | H | Guided UX config tools + distribution chart. |
| P09 | **Charting infrastructure (ECharts)** | platform | — | GAP | M | L | H | Shared chart components wired into all financial/health tools. |
| P10 | **Scenario compare + URL share** | platform | — | U | M | L | H | Platform capability applied to all financial tools. |
| P11 | **Converters: power/pressure/energy/fuel/force/time/gold/water/height/wt-to-vol** | conversion | unit converters | VARIANT | S | L | H | 10 new unit groups (reuse UnitConverter). |
| P12 | **Geometry cluster** (circle, triangle, pythagorean, surface) | math | "circle calculator" | VARIANT | S | L | M | 4 config tools. |
| P13 | **Steps family** (steps↔miles/km/calories) | health | "steps to miles" | MISSING | S | L | M | 3 config tools. |
| P14 | **Sleep cycle + sleep debt** | health | "sleep calculator" | MISSING | S | L | M | 2 config tools + timeline chart. |
| P15 | **Retirement/FIRE projection** | finance | "retirement calculator" | MISSING | M | M | M | Contribution+withdrawal+inflation curve (US/ZA defaults). |
| P16 | **Take-home pay** | finance | "take home pay" | MISSING | M | M | M | Parameterized tax engine (US first). |
| P17 | **Final-grade-needed / uni grade** | math | "what do i need on my final" | MISSING | S | L | M | 2 config tools. |
| P18 | **Price-per-unit** | food | "price per ounce" | U | S | L | M | Compare package sizes. |
| P19 | **Break-even + commission + price-per-sqft** | finance | "break even calculator" | MISSING | S | L | M | 3 config tools. |
| P20 | **Developer Toolbox** (subnet, CIDR, SHA-256, base64, url) | misc | "ip subnet calculator" | U | M | L | M | 5-6 config tools + hex view. |
| P21 | **HVAC/electrical** (BTU, voltage drop, ohms law, watts↔amps) | construction | "btu calculator" | MISSING | S | L | M | 4 config tools. |
| P22 | **Geometry/volume of shapes + wastage + cost** for renovation | construction | "tile calculator" | VARIANT | M | L | M | Tile, roofing, mulch, gravel + cost + wastage. |
| P23 | **Time card (multi-day) + overtime** | time | "time card calculator" | IMPROVE | S | L | M | Extend work hours. |
| P24 | **Savings solver** (how long to save) | finance | "how long to save" | VARIANT | S | L | M | Add to savings goal. |
| P25 | **Region context provider** | platform | — | REG | M | L | M | Currency+units+tax defaults; re-skin all tools. |
| P26 | **Content upgrade** (sources + 6-8 FAQs + workflow links) | all | — | IMPROVE | S | L | H | Extend ToolContent schema; batch all 51 tools. |
| P27 | **Money workflow journey** (challenge→budget→emergency→compound) | finance | — | U | M | L | M | Guided flow with value carry-forward. |
| P28 | **Crypto staking APY (generic)** | finance | "staking calculator" | LT | S | M | L | One generic tool + model table. |
| P29 | **AI token-cost calculator** | misc | "token cost" | LT | S | L | L | Generic model table + compare. |
| P30 | **Number systems** (binary/hex/roman/sci notation) | math | "binary to hex" | VARIANT | S | L | L | 4 config tools. |
| P31 | **Loan family variants** (auto/personal/student/boat/business) | finance | "auto loan calculator" | VARIANT | S | L | M | Parameterized loan config. |
| P32 | **Region: stamp duty / transfer duty** | finance | "stamp duty calculator" | REG | S | L | L | UK/IN/AU/ZA rate tables. |
| P33 | **Salary→hourly reverse + overtime + time-and-a-half** | finance | "salary to hourly" | IMPROVE | S | L | M | Extend existing. |
| P34 | **Grocery/meal cost compare** | food | — | U | S | L | L | Extend meal cost. |

**Do NOT build (DON'T):** novelty filler (Maine Coon, pigeon velocity, vocal range, one-block
wonder, semitone, red-light, clavicle, hand size, somatotype, beef freezer, boiled egg, weighted
blanket, typing speed, playback speed, love calculator, birthday/generation/bra size/shoe size
novelty pages).

---

## I. Revised Roadmap

Strategic batches. Every batch exists because it unlocks specific search intents + ecosystems.

### Phase 0 — Platform capabilities (foundation for everything)
1. **ECharts integration (locked decision)** — add `echarts` (core) as the single charting library
   for all visualization: line, area, bar, donut, gauge, timeline, scatter. Wire into a shared React
   chart wrapper (respects dark mode + JetBrains Mono tabular + emerald accent; no gradients).
   Use `echarts`'s built-in formatters/tooltips for the cockpit-dense metric readouts.
2. **Scenario Compare engine** + **URL-state sharing** + print.
3. **ToolContent v2 schema** — sources, 6-8 FAQs, workflow `next`/`prev` links, region metadata.
4. **Region context provider** (currency/units/tax defaults) — wire into existing tools (fix the
   `$` vs `R` inconsistency).
5. **Scientific + Basic calculator surface** (P01) — the biggest visible hole.
6. **Hero/ambient visual layer** — the `src/img/` backgrounds (`bg_ (0).png`, `bg_ (1).jpg`,
   `bg_ (2).jpg`, `bg_ (2).png`, `bg_ (3).jpg`, `bg_ (4).jpg`) are currently unreferenced. Use them
   as subtle, dark-mode-safe hero/hero-adjacent backdrops behind the home page, category headers, and
   the Savings Goal page (respecting DESIGN.md: no gradients/decoration overload, high-contrast text
   over the texture, `image-rendering` clean). Keep at most one backdrop per viewport.

### Batch 1 — Mortgage & Home ecosystem
*Unlocks:* "mortgage calculator", "how much house can I afford", "amortization", "mortgage
refinance", "rent vs buy" intents. Largest finance intent cluster + competitor depth gap (calculator.net
has it but poor UX). **P02, P10 on mortgage, P22 partial.**
Deliverables: affordability, amortization table + chart, extra-payment/early payoff, biweekly, refi
break-even, down-payment/PMI, DTI, rent-vs-buy, closing costs, region presets.

### Batch 2 — Percentage & Shopping ecosystem
*Unlocks:* the single highest generic demand ("percentage calculator", "percent off", "tip",
"price per ounce", "discount"). **P03-related math upgrades, P18, P10 on discount/tip.**
Deliverables: multi-mode percentage (reverse/change/game), percent-off original, unit-price compare,
improved tip with rounding presets, scenario compare on discount.

### Batch 3 — Health ecosystem
*Unlocks:* "BMI/BMR/TDEE/macros/calories/water", "pregnancy/due date/ovulation", "steps to miles",
"sleep". Large demand + many related tools. **P05, P06, P13, P14, P09.**
Deliverables: TDEE, full macros, weight-goal timeline chart, pregnancy suite, fertile window, steps
family, sleep optimizer, health workflow chain.

### Batch 4 — Construction & Home ecosystem
*Unlocks:* "concrete/paint/flooring/tile/roofing/mulch/gravel/btu". Practical intent + long-tail.
**P22, P21, P10.**
Deliverables: tile, roofing, mulch, gravel, wallpaper, cost+wastage mode, BTU/electrical cluster,
renovation workflow chain.

### Batch 5 — Date, Time & Stats ecosystem
*Unlocks:* "age/date/days between/until/time zone", "standard deviation/confidence interval/p-value".
**P04, P08, P17, P23.**
Deliverables: date family, timezone, time card, stats cluster with distribution charts, final-grade-needed.

### Batch 6 — Conversion depth (sweep)
*Unlocks:* every unit-conversion long tail. **P11, P03 (cooking), P09.**
Deliverables: 10 new unit groups, ingredient-aware cooking converter + oven temps + air fryer,
weight-to-volume, height/gold/water weight.

### Batch 7 — Money flow & retirement
*Unlocks:* "take home pay", "retirement calculator", "debt payoff", "budget". **P07, P15, P16,
P19, P24, P27.**
Deliverables: take-home tax engine (US first), retirement/FIRE projection chart, debt snowball vs
avalanche with chart, break-even/commission, budget, money workflow journey.

### Batch 8 — Unique & regional moats
*Unlocks:* what nobody else has. **P20, P25, P28, P29, P32, P31, P33, P34.**
Deliverables: Developer Toolbox, region provider full rollout, stamp duty (UK/IN/AU/ZA), loan family
variants, salary reverse, crypto staking, AI token-cost, meal-cost compare.

### Phase 9 — Content wing & continuous expansion
- `/guides/` long-form explainers (one per ecosystem in E) with tool embeds + internal links.
- Monthly cadence: audit → pick 3-5 highest-opportunity long-tail tools → build → content → measure.
- Analytics on intent coverage; kill or fix tools with zero usage.

---

## J. Strategic Conclusion

> **"If we execute this roadmap, what will CalculateDaily do that calculator.net,
> thecalculatorsite.com, online-calculator.com, and CalculateQuick do not?"**

Four concrete, checkable answers — none of them "better UX" in the abstract:

1. **We will solve the user's real problem, not a single formula.** Every competitor sells an
   isolated calculator. We will sell *workflows*: Home-Buying, Debt-Freedom, Body-Nutrition,
   Renovation, Pregnancy, Retirement, Statistics-for-Students, Developer-Toolbox. A user who
   searches "how much house can I afford" lands on a guided chain that carries their numbers
   forward through affordability → DTI → down payment → mortgage → taxes → rent-vs-buy. **No
   competitor does carry-forward value chaining. This is the single biggest differentiator.**

2. **We will show the math, not just the number.** With ECharts wired into every financial and
   health tool — amortization curves, compounding growth, debt-payoff timelines, sleep cycles,
   weight-goal trajectories, distribution charts — plus a **scenario compare** mode and **shareable
   result URLs**. calculator.net has a few static charts; The Calculator Site has none; CalculateQuick
   has none; online-calculator has none. **No competitor offers interactive scenario comparison or
   URL-shareable results.**

3. **We will cover the same intents with fewer, better pages — and open intents nobody covers.**
   Our ingredient-aware Cooking Converter (one tool vs. The Calculator Site's 26 static pages), the
   Developer Toolbox, price-per-unit shopping, and generic AI-token/ crypto tools take intents the
   market serves poorly or not at all. We explicitly refuse to copy CalculateQuick's novelty filler
   (cat colors, pigeon velocity, vocal range) — **we compete on genuine utility, not keyword noise.**

4. **We will be regionally intelligent where it actually changes the math.** A single region switch
   re-skins currency, units, tax/VAT/stamp-duty rates, and mortgage conventions across US, UK, India,
   South Africa, and Australia. calculator.net is US-only with UK/CA mortgage variants; The Calculator
   Site is UK-only; CalculateQuick has exactly one UK stamp-duty page; online-calculator is language-
   only. **We will be the first platform where one mortgage, one salary, and one tax calculator
   serve five tax jurisdictions from a single codebase.**

**Measured simply:** after this roadmap, for a given search intent, CalculateDaily should either
(a) own the workflow around it, (b) beat the incumbent's tool on visualization and comparison, or
(c) be the only credible result because nobody else built it. Tools that achieve none of these three
are removed. The target is not "200 calculators" — it is **"the best place to solve a real-world
calculation problem end-to-end, including problems the competitors have not solved yet."**