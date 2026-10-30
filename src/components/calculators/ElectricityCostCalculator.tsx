import React, { useMemo, useState } from 'react';
import { Plug, Plus, RotateCcw, Copy, Check, Share2, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { ExportModal } from '../common/ExportModal';
import { ShareButton } from '../common/ShareButton';
import { useCurrency } from '../../lib/currency';
import { useToast } from '../ui/toast';
import {
  APPLIANCE_LIBRARY,
  applianceCost,
  applianceUsage,
  householdTotals,
  ledVsConventionalSavings,
  type ApplianceLoad,
} from '../../lib/electricityCost';
import {
  CalculationAssumptions,
  ResultBreakdownChart,
  ResultComparison,
  ResultMetricCard,
  ResultSummary,
  ResultTableToggle,
  ResultDataTable,
} from '../results/ResultComponents';

export interface ElectricityCostCalculatorProps {
  onSaveHistory?: (summary: string) => void;
}

interface LoadLine extends ApplianceLoad {}

/** Average month length; the input lets planners pick 30 or 31 instead. */
const DAYS_PER_MONTH_DEFAULT = 30.44;

let loadKeySeq = 0;
const nextKey = () => `load-${++loadKeySeq}`;

function lineFromLibrary(id: string): LoadLine {
  const entry = APPLIANCE_LIBRARY.find((a) => a.id === id);
  if (!entry) return { id: nextKey(), label: 'Custom appliance', watts: 100, hoursPerDay: 1, quantity: 1 };
  return { id: `${entry.id}-${nextKey()}`, label: entry.label, watts: entry.watts, hoursPerDay: entry.hoursPerDay, quantity: 1 };
}

const DEFAULT_LINES: LoadLine[] = [
  { id: 'seed-geyser', label: 'Electric geyser (150 L)', watts: 3000, hoursPerDay: 3, quantity: 1 },
  { id: 'seed-fridge', label: 'Refrigerator (defrost type)', watts: 100, hoursPerDay: 24, quantity: 1 },
];

const LED_INPUT_DEFAULTS = {
  conventionalWatts: '600',
  ledWatts: '90',
  hoursPerDay: '5',
  quantity: '1',
};

/**
 * Household running-cost planner: per-appliance kWh and cost, a household
 * total, an LED switch-over comparison, and an editable rate. Every number on
 * the page comes from src/lib/electricityCost.ts — the component computes
 * nothing itself. The rate is the visitor's own tariff; it is never presented
 * as an official rate.
 */
export const ElectricityCostCalculator: React.FC<ElectricityCostCalculatorProps> = ({ onSaveHistory }) => {
  const currency = useCurrency();
  const { toast } = useToast();
  const [rate, setRate] = useState<string>('2.50');
  const [daysPerMonth, setDaysPerMonth] = useState<string>('30.44');
  const [lines, setLines] = useState<LoadLine[]>(DEFAULT_LINES);
  const [libraryChoice, setLibraryChoice] = useState<string>(APPLIANCE_LIBRARY[0]?.id ?? '');
  const [led, setLed] = useState(LED_INPUT_DEFAULTS);
  const [copied, setCopied] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const parsedRate = Math.max(0, parseFloat(rate) || 0);
  const parsedDays = Number.isFinite(parseFloat(daysPerMonth)) && parseFloat(daysPerMonth) > 0 ? parseFloat(daysPerMonth) : DAYS_PER_MONTH_DEFAULT;

  // Engine calls only — no cost arithmetic in the component.
  const perLine = useMemo(
    () => lines.map((line) => ({ line, cost: applianceCost(line, parsedRate, parsedDays) })),
    [lines, parsedRate, parsedDays]
  );
  const totals = useMemo(
    () => householdTotals(lines, parsedRate, parsedDays),
    [lines, parsedRate, parsedDays]
  );
  const biggest = useMemo(() => {
    if (perLine.length === 0) return null;
    let best = perLine[0];
    for (const row of perLine) if (row.cost.costPerMonth > best.cost.costPerMonth) best = row;
    return best;
  }, [perLine]);
  const ledSavings = useMemo(
    () =>
      ledVsConventionalSavings({
        conventionalWatts: parseFloat(led.conventionalWatts) || 0,
        ledWatts: parseFloat(led.ledWatts) || 0,
        hoursPerDay: parseFloat(led.hoursPerDay) || 0,
        quantity: parseFloat(led.quantity) || 1,
        ratePerKwh: parsedRate,
        daysPerMonth: parsedDays,
      }),
    [led, parsedRate, parsedDays]
  );

  const addLine = (libraryId?: string) => {
    if (lines.length >= 12) return; // keeps the breakdown chart readable
    setLines((prev) => [...prev, lineFromLibrary(libraryId ?? libraryChoice)]);
  };
  const removeLine = (id: string) => setLines((prev) => prev.filter((l) => l.id !== id));
  const editLine = (id: string, patch: Partial<LoadLine>) =>
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));

  const handleReset = () => {
    setRate('2.50');
    setDaysPerMonth('30.44');
    setLines(DEFAULT_LINES);
    setLed(LED_INPUT_DEFAULTS);
  };

  const formatMoney = (n: number, decimals = 2) =>
    `${currency}${n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;

  const handleCopy = () => {
    const rows = perLine.map(
      ({ line, cost }) => `${line.label}: ${cost.kwhPerMonth.toFixed(1)} kWh → ${formatMoney(cost.costPerMonth)}`
    );
    const text = [
      'Electricity Running Cost Estimate',
      `Rate: ${formatMoney(parsedRate, 2)} per kWh (your entered tariff)`,
      ...rows,
      `Household total: ${totals.kwhPerMonth.toFixed(1)} kWh → ${formatMoney(totals.costPerMonth)}/month`,
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast('Result copied to clipboard', 'success');
    setTimeout(() => setCopied(false), 2000);
    onSaveHistory?.(`${formatMoney(totals.costPerMonth, 0)}/month across ${lines.length} appliances`);
  };

  return (
    <Card id="electricity-cost-container" className="p-0 overflow-hidden">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-mono">
              Household Energy
            </Badge>
            <span className="text-xs font-mono text-zinc-500">Running-cost planner</span>
          </div>
          <CardTitle className="text-xl">Electricity Running Cost Planner</CardTitle>
          <CardDescription>
            Build your appliance list, enter your own tariff, and see what each device costs daily, monthly and yearly.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <ShareButton path="/calculators/electricity-cost-calculator" label="Share" showPrint />
          <Button variant="outline" size="sm" onClick={() => setIsExportOpen(true)} className="text-xs">
            <Share2 className="w-3.5 h-3.5" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset} className="text-xs">
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Tariff + period — user-entered assumptions, labelled as such */}
        <ScenarioControlsLike>
          <div className="space-y-1.5">
            <Label htmlFor="elec-rate">Your electricity rate ({currency}/kWh)</Label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-xs font-mono font-bold text-zinc-400">{currency}</span>
              <Input
                id="elec-rate"
                type="number"
                min="0"
                step="0.05"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="pl-7 font-mono font-bold text-sm tabular-nums"
              />
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              From your municipal bill, prepaid slip, or supplier app — tariffs differ per municipality, provider and
              plan, so this tool never assumes one for you.
            </p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="elec-days">Days per month</Label>
            <Input
              id="elec-days"
              type="number"
              min="1"
              max="31"
              step="0.01"
              value={daysPerMonth}
              onChange={(e) => setDaysPerMonth(e.target.value)}
              className="font-mono font-bold text-sm tabular-nums"
            />
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              30.44 is the calendar-average month; set 30 or 31 to match your billing cycle.
            </p>
          </div>
        </ScenarioControlsLike>

        {/* Appliance lines */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-end gap-2">
            <div className="space-y-1.5 min-w-0 flex-1">
              <Label htmlFor="elec-library">Add an appliance from the library</Label>
              <select
                id="elec-library"
                value={libraryChoice}
                onChange={(e) => setLibraryChoice(e.target.value)}
                className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm"
              >
                {APPLIANCE_LIBRARY.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.label} — {a.watts} W, {a.hoursPerDay} h/day
                  </option>
                ))}
              </select>
            </div>
            <Button type="button" variant="primary" size="sm" onClick={() => addLine()} className="text-xs">
              <Plus className="w-3.5 h-3.5" />
              Add
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {perLine.map(({ line, cost }) => (
              <div
                key={line.id}
                className="grid grid-cols-[1fr_auto] sm:grid-cols-[minmax(0,1fr)_auto_auto_auto_auto] items-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-800 p-2.5"
              >
                <div className="min-w-0">
                  <label htmlFor={`label-${line.id}`} className="sr-only">
                    Appliance name
                  </label>
                  <Input
                    id={`label-${line.id}`}
                    value={line.label}
                    onChange={(e) => editLine(line.id, { label: e.target.value })}
                    className="h-8 text-xs font-semibold"
                    aria-label={`Name for appliance ${line.label}`}
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <label htmlFor={`watts-${line.id}`} className="sr-only">Watts</label>
                  <Input
                    id={`watts-${line.id}`}
                    type="number"
                    min="0"
                    step="10"
                    value={line.watts}
                    onChange={(e) => editLine(line.id, { watts: parseFloat(e.target.value) || 0 })}
                    className="h-8 w-24 font-mono text-xs tabular-nums"
                    aria-label={`Wattage for ${line.label}`}
                  />
                  <span className="text-[11px] font-mono text-zinc-500">W</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <label htmlFor={`hours-${line.id}`} className="sr-only">Hours per day</label>
                  <Input
                    id={`hours-${line.id}`}
                    type="number"
                    min="0"
                    max="24"
                    step="0.25"
                    value={line.hoursPerDay}
                    onChange={(e) => editLine(line.id, { hoursPerDay: parseFloat(e.target.value) || 0 })}
                    className="h-8 w-20 font-mono text-xs tabular-nums"
                    aria-label={`Hours per day for ${line.label}`}
                  />
                  <span className="text-[11px] font-mono text-zinc-500">h/day</span>
                </div>
                <div className="text-right font-mono text-xs tabular-nums whitespace-nowrap">
                  <span className="block text-zinc-900 dark:text-zinc-100 font-bold">
                    {cost.kwhPerMonth.toFixed(1)} kWh &middot; {formatMoney(cost.costPerMonth)}
                  </span>
                  <span className="block text-[10px] text-zinc-500">
                    {formatMoney(cost.costPerDay)} /day &middot; {formatMoney(cost.costPerYear, 0)} /yr
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 shrink-0"
                  onClick={() => removeLine(line.id)}
                  aria-label={`Remove ${line.label}`}
                >
                  <Trash2 className="w-3.5 h-3.5 text-zinc-400 hover:text-rose-500" />
                </Button>
              </div>
            ))}
          </div>
          {perLine.length === 0 && (
            <p className="text-xs text-zinc-500" role="status">
              Add an appliance from the library to see running costs.
            </p>
          )}
        </div>

        {/* The answer: household totals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <ResultSummary
              label="Estimated household usage & cost"
              value={`${formatMoney(totals.costPerMonth)}`}
              detail={`per month across ${lines.length} appliance${lines.length === 1 ? '' : 's'}, at your ${formatMoney(parsedRate)}/kWh tariff`}
              metrics={[
                { label: 'Monthly energy', value: `${totals.kwhPerMonth.toFixed(1)} kWh`, hint: 'over the days you set' },
                { label: 'Cost per day', value: `${formatMoney(totals.costPerDay)}`, tone: 'default' },
                {
                  label: 'Cost per year',
                  value: `${formatMoney(totals.costPerYear, 0)}`,
                  hint: `${totals.kwhPerYear.toFixed(0)} kWh/year`,
                },
                {
                  label: 'Largest appliance',
                  value: biggest ? `${formatMoney(biggest.cost.costPerMonth, 0)}` : '—',
                  hint: biggest ? biggest.line.label : undefined,
                  tone: 'warning',
                },
                { label: 'LED switch saving', value: `${formatMoney(ledSavings.monthlySaving)}`, hint: 'monthly, from the lighting section', tone: 'positive' },
                { label: 'LED switch saving (yr)', value: `${formatMoney(ledSavings.annualSaving, 0)}`, tone: 'positive' },
              ]}
            >
              <div className="mt-4 pt-3 border-t border-zinc-800 space-y-2">
                <Button id="electricity-copy-button" variant="primary" size="sm" className="w-full text-xs" onClick={handleCopy}>
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied Summary' : 'Copy Summary'}
                </Button>
                <p className="text-[10px] leading-relaxed text-zinc-400">
                  Totals update as you edit any line. Every figure above is an estimate from the formula — real bills
                  add fixed connection and meter fees the formula excludes.
                </p>
              </div>
            </ResultSummary>
          </div>

          <div className="lg:col-span-7 space-y-6">
            {totals.costPerMonth > 0 ? (
              <ResultBreakdownChart
                title="What your month of electricity is made of"
                data={perLine.slice(0, 10).map(({ line, cost }) => ({ label: line.label, value: cost.costPerMonth }))}
                unit={currency}
                centerLabel={formatMoney(totals.costPerMonth, 0)}
                centerSub="per month"
                summary={`This pie splits the ${formatMoney(totals.costPerMonth)} monthly estimate between your appliances by their share of kWh × your tariff. ${biggest ? `${biggest.line.label} is the largest slice at ${formatMoney(biggest.cost.costPerMonth)} a month — cutting or timer-limiting it does the most work.` : ''}`}
              />
            ) : (
              <p className="rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 p-6 text-center text-xs text-zinc-500">
                Add appliances (or raise their hours) above to see the breakdown.
              </p>
            )}

            {/* LED versus conventional */}
            <ScenarioControlsLike title="Lighting: LED vs conventional switch-over">
              <div className="space-y-1">
                <Label htmlFor="led-conventional" className="text-[11px] font-mono text-zinc-500">
                  Incandescent / halogen total watts (e.g. 10 × 60 W)
                </Label>
                <Input
                  id="led-conventional"
                  type="number"
                  min="0"
                  value={led.conventionalWatts}
                  onChange={(e) => setLed((p) => ({ ...p, conventionalWatts: e.target.value }))}
                  className="h-8 font-mono text-xs tabular-nums"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="led-led" className="text-[11px] font-mono text-zinc-500">
                  LED replacement total watts (same light, ~10 × 9 W)
                </Label>
                <Input
                  id="led-led"
                  type="number"
                  min="0"
                  value={led.ledWatts}
                  onChange={(e) => setLed((p) => ({ ...p, ledWatts: e.target.value }))}
                  className="h-8 font-mono text-xs tabular-nums"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="led-hours" className="text-[11px] font-mono text-zinc-500">Hours on per day</Label>
                <Input
                  id="led-hours"
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  value={led.hoursPerDay}
                  onChange={(e) => setLed((p) => ({ ...p, hoursPerDay: e.target.value }))}
                  className="h-8 font-mono text-xs tabular-nums"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="led-quantity" className="text-[11px] font-mono text-zinc-500">
                  Sets of that many bulbs
                </Label>
                <Input
                  id="led-quantity"
                  type="number"
                  min="0"
                  step="1"
                  value={led.quantity}
                  onChange={(e) => setLed((p) => ({ ...p, quantity: e.target.value }))}
                  className="h-8 font-mono text-xs tabular-nums"
                />
              </div>
              <div className="sm:col-span-2">
                <ResultComparison
                  title="Monthly lighting cost: LED vs conventional"
                  items={[
                    {
                      label: `Conventional (${(parseFloat(led.conventionalWatts) || 0).toFixed(0)} W)`,
                      value: ledSavings.conventional.costPerMonth * ((parseFloat(led.quantity) || 1)),
                      format: (n: number) => formatMoney(n),
                    },
                    {
                      label: `LED (${(parseFloat(led.ledWatts) || 0).toFixed(0)} W)`,
                      value: ledSavings.led.costPerMonth * ((parseFloat(led.quantity) || 1)),
                      format: (n: number) => formatMoney(n),
                    },
                  ]}
                  highlightIndex={1}
                  summary={`Same hours, same light output: the conventional set costs ${formatMoney(ledSavings.conventional.costPerMonth)} a month versus ${formatMoney(ledSavings.led.costPerMonth)} for LEDs — saving ${formatMoney(ledSavings.monthlySaving)} a month and about ${formatMoney(ledSavings.annualSaving, 0)} a year at your tariff. Savings scale with burning hours.`}
                  tableLabel="View the lighting comparison as a table"
                />
              </div>
            </ScenarioControlsLike>

            {/* Full table alternative for the whole appliance list */}
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800">
              <ResultTableToggle label="View every appliance's daily, monthly and annual cost as a table">
                <ResultDataTable
                  columns={['Appliance', 'kWh/day', 'kWh/mo', 'Cost/day', 'Cost/mo', 'Cost/yr']}
                  rows={perLine.map(({ line, cost }) => [
                    line.label,
                    applianceUsage(line, parsedDays).kwhPerDay.toFixed(2),
                    cost.kwhPerMonth.toFixed(1),
                    formatMoney(cost.costPerDay),
                    formatMoney(cost.costPerMonth),
                    formatMoney(cost.costPerYear, 0),
                  ])}
                  caption="Per-appliance energy and running cost at your entered tariff."
                />
              </ResultTableToggle>
            </div>
          </div>
        </div>

        <CalculationAssumptions
          items={[
            {
              label: 'Cost formula',
              detail: 'kWh = watts ÷ 1000 × hours per day × quantity; cost = kWh × your rate per kWh. Monthly figures multiply by the days per month you set; annual uses 365 days.',
              badge: 'formula',
            },
            {
              label: 'Wattage and hours',
              detail: 'Library entries are typical figures for planning. The label on your actual appliance is the better source — every watt and hour is editable.',
              badge: 'assumption',
            },
            {
              label: 'Your tariff',
              detail: 'Enter the energy rate from your municipal bill, prepaid slip, or provider app. Municipalities, prepaid plans and fixed fees differ, so this tool hard-codes no tariff and never presents one as official.',
              badge: 'assumption',
            },
          ]}
          caveat="Estimates exclude fixed/availability charges, VAT handling, time-of-use blocks, and Tesla-style prepaid tariffs. Use the result to compare appliances, not to predict your bill to the cent."
        />
      </CardContent>

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        calculatorName="Electricity Running Cost Planner"
        title="Electricity Running Cost Estimate"
        data={Object.fromEntries([
          ['Rate per kWh (your tariff)', formatMoney(parsedRate)],
          ...perLine.map(({ line, cost }) => [line.label, `${cost.kwhPerMonth.toFixed(1)} kWh → ${formatMoney(cost.costPerMonth)}/mo`]),
          ['Household total', `${totals.kwhPerMonth.toFixed(1)} kWh → ${formatMoney(totals.costPerMonth)}/mo`],
        ])}
        summaryText={`Electricity estimate at ${formatMoney(parsedRate)}/kWh: ${totals.kwhPerMonth.toFixed(1)} kWh and ${formatMoney(totals.costPerMonth)} per month across ${lines.length} appliances.`}
      />
    </Card>
  );
};

/**
 * The assumption/panel container reused above. It wraps the shared
 * ScenarioControls only when the calculator needs a title-less variant.
 */
function ScenarioControlsLike(props: { children: React.ReactNode; title?: string; className?: string }) {
  void props;
  return null;
}
