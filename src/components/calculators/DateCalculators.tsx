import React, { useState, useMemo } from 'react';
import { CalendarDays, ArrowRightLeft, Timer, PartyPopper, Copy, Check, Share2, RotateCcw } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { ExportModal } from '../common/ExportModal';
import { useToast } from '../ui/toast';

interface CalculatorProps {
  onSaveHistory?: (summary: string) => void;
}

const ZODIAC_SIGNS = [
  { name: 'Capricorn', start: [1, 1], end: [1, 19] },
  { name: 'Aquarius', start: [1, 20], end: [2, 18] },
  { name: 'Pisces', start: [2, 19], end: [3, 20] },
  { name: 'Aries', start: [3, 21], end: [4, 19] },
  { name: 'Taurus', start: [4, 20], end: [5, 20] },
  { name: 'Gemini', start: [5, 21], end: [6, 20] },
  { name: 'Cancer', start: [6, 21], end: [7, 22] },
  { name: 'Leo', start: [7, 23], end: [8, 22] },
  { name: 'Virgo', start: [8, 23], end: [9, 22] },
  { name: 'Libra', start: [9, 23], end: [10, 22] },
  { name: 'Scorpio', start: [10, 23], end: [11, 21] },
  { name: 'Sagittarius', start: [11, 22], end: [12, 21] },
  { name: 'Capricorn', start: [12, 22], end: [12, 31] },
];

function getZodiac(month: number, day: number): string {
  for (const sign of ZODIAC_SIGNS) {
    const [sm, sd] = sign.start;
    const [em, ed] = sign.end;
    if (month === sm && day >= sd) return sign.name;
    if (month === em && day <= ed) return sign.name;
    if (month > sm && month < em) return sign.name;
  }
  return 'Capricorn';
}

function parseDateUTC(dateStr: string): Date | null {
  if (!dateStr) return null;
  const parts = dateStr.split('-');
  if (parts.length !== 3) return null;
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10);
  const d = parseInt(parts[2], 10);
  if (isNaN(y) || isNaN(m) || isNaN(d)) return null;
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;
  const date = new Date(Date.UTC(y, m - 1, d));
  if (date.getUTCFullYear() !== y || date.getUTCMonth() !== m - 1 || date.getUTCDate() !== d) return null;
  return date;
}

function toLocalDateStr(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

function todayUTC(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

export const AgeCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const { toast } = useToast();
  const [dob, setDob] = useState<string>('2000-06-15');
  const [copied, setCopied] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  const results = useMemo(() => {
    const birthDate = parseDateUTC(dob);
    if (!birthDate) {
      return { valid: false, years: 0, months: 0, days: 0, totalDays: 0, zodiac: '', nextBirthday: '', daysUntilNext: 0, nextBirthdayDate: '' };
    }
    const today = todayUTC();
    let years = today.getUTCFullYear() - birthDate.getUTCFullYear();
    let months = today.getUTCMonth() - birthDate.getUTCMonth();
    let days = today.getUTCDate() - birthDate.getUTCDate();
    if (days < 0) {
      months--;
      const prevMonth = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 0));
      days += prevMonth.getUTCDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    const totalDays = daysBetween(birthDate, today);
    const bMonth = birthDate.getUTCMonth() + 1;
    const bDay = birthDate.getUTCDate();
    const zodiac = getZodiac(bMonth, bDay);
    let nextBYear = today.getUTCFullYear();
    let nextBDate = new Date(Date.UTC(nextBYear, bMonth - 1, bDay));
    if (nextBDate <= today) {
      nextBYear++;
      nextBDate = new Date(Date.UTC(nextBYear, bMonth - 1, bDay));
    }
    const daysUntilNext = daysBetween(today, nextBDate);
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const nextBirthday = `${weekdays[nextBDate.getUTCDay()]}, ${nextBDate.getUTCFullYear()}`;
    return { valid: true, years, months, days, totalDays, zodiac, nextBirthday, daysUntilNext, nextBirthdayDate: toLocalDateStr(nextBDate) };
  }, [dob]);

  const handleCopy = () => {
    const text = results.valid
      ? `Age Calculator Result:\nAge: ${results.years} years, ${results.months} months, ${results.days} days\nTotal Days Lived: ${results.totalDays.toLocaleString()}\nZodiac Sign: ${results.zodiac}\nNext Birthday: ${results.nextBirthday} (${results.daysUntilNext} days away)`
      : 'Age Calculator: Enter a valid date of birth.';
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast('Result copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
    if (onSaveHistory && results.valid) {
      onSaveHistory(`Age: ${results.years} years, ${results.months}m ${results.days}d | Zodiac: ${results.zodiac}`);
    }
  };

  const handleReset = () => {
    setDob('2000-06-15');
  };

  return (
    <Card id="age-calculator-container" className="p-0 overflow-hidden">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-mono">Time & Date</Badge>
            <span className="text-xs font-mono text-zinc-500">Live Math</span>
          </div>
          <CardTitle className="text-xl">Age Calculator</CardTitle>
          <CardDescription>Compute exact age in years, months, and days with birthday countdown and zodiac sign.</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsExportOpen(true)} className="text-xs">
            <Share2 className="w-3.5 h-3.5" /> Share / Export
          </Button>
          <Button id="age-reset-button" variant="outline" size="sm" onClick={handleReset} className="text-xs" title="Reset to defaults">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="age-dob-input">Date of Birth</Label>
                <span className="text-xs text-zinc-400 font-mono">Select date</span>
              </div>
              <Input
                id="age-dob-input"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                max={toLocalDateStr(todayUTC())}
                className="font-mono font-bold text-sm dark:[color-scheme:dark]"
              />
            </div>
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase text-zinc-600 dark:text-zinc-400 font-semibold">Quick Profiles</span>
              <div className="flex flex-wrap gap-1.5">
                <Button type="button" variant="outline" size="sm" onClick={() => setDob('2000-01-01')} className="h-7 text-xs font-mono">2000</Button>
                <Button type="button" variant="outline" size="sm" onClick={() => setDob('1990-06-15')} className="h-7 text-xs font-mono">1990</Button>
                <Button type="button" variant="outline" size="sm" onClick={() => setDob('1985-12-25')} className="h-7 text-xs font-mono">1985</Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-zinc-950 text-white rounded-xl p-5 border border-zinc-800 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono text-zinc-300">
                  <span>Age Breakdown</span>
                  <span className="inline-flex items-center gap-1 text-zinc-200 font-semibold">
                    <CalendarDays className="w-3.5 h-3.5 text-primary-on-dark" /> {results.valid ? results.zodiac : '\u2014'}
                  </span>
                </div>
                {results.valid ? (
                  <>
                    <div className="my-4 text-center">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1 font-semibold">Exact Age</p>
                      <div className="text-3xl sm:text-4xl font-bold text-white font-mono tracking-tight tabular-nums">
                        {results.years} <span className="text-lg text-zinc-400">yr</span>{' '}
                        {results.months} <span className="text-lg text-zinc-400">mo</span>{' '}
                        {results.days} <span className="text-lg text-zinc-400">d</span>
                      </div>
                      <p className="text-[11px] text-primary-on-dark font-mono mt-1 font-semibold">
                        {results.totalDays.toLocaleString()} total days lived
                      </p>
                    </div>
                    <div className="space-y-2 pt-3 border-t border-zinc-800 text-xs font-mono">
                      <div className="flex justify-between text-zinc-200">
                        <span className="text-zinc-400">Years:</span>
                        <span className="font-bold tabular-nums">{results.years}</span>
                      </div>
                      <div className="flex justify-between text-zinc-200">
                        <span className="text-zinc-400">Months:</span>
                        <span className="font-bold tabular-nums">{results.months}</span>
                      </div>
                      <div className="flex justify-between text-zinc-200">
                        <span className="text-zinc-400">Days:</span>
                        <span className="font-bold tabular-nums">{results.days}</span>
                      </div>
                      <div className="flex justify-between text-zinc-100 pt-2 border-t border-zinc-800">
                        <span className="font-semibold">Total Days Lived:</span>
                        <span className="font-bold text-white tabular-nums">{results.totalDays.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-zinc-200">
                        <span className="text-zinc-400">Zodiac Sign:</span>
                        <span className="font-bold text-primary-on-dark tabular-nums">{results.zodiac}</span>
                      </div>
                      <div className="flex justify-between text-zinc-300 pt-2 border-t border-zinc-800">
                        <span className="text-zinc-400">Next Birthday:</span>
                        <span className="font-mono tabular-nums text-primary-on-dark font-bold">{results.nextBirthday}</span>
                      </div>
                      <div className="flex justify-between text-zinc-300">
                        <span className="text-zinc-400">Days Until Next Bday:</span>
                        <span className="font-mono tabular-nums text-primary-on-dark font-bold">
                          {results.daysUntilNext === 0 ? 'Today!' : `${results.daysUntilNext} days`}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="my-8 text-center">
                    <p className="text-sm text-zinc-400 font-mono">Enter a valid date of birth to see results.</p>
                  </div>
                )}
              </div>
              <div className="pt-3 border-t border-zinc-800">
                <Button id="age-copy-button" type="button" variant="primary" size="sm" onClick={handleCopy} className="w-full text-xs">
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied to Clipboard' : 'Copy Age Result'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        calculatorName="Age Calculator"
        title="Age Calculation Summary"
        data={results.valid ? {
          'Date of Birth': dob,
          'Age': `${results.years} years, ${results.months} months, ${results.days} days`,
          'Total Days Lived': results.totalDays.toLocaleString(),
          'Zodiac Sign': results.zodiac,
          'Next Birthday': results.nextBirthday,
          'Days Until Next Birthday': results.daysUntilNext,
        } : { 'Status': 'Enter a valid date of birth' }}
        summaryText={results.valid ? `Age Calculator Result:\nAge: ${results.years} years, ${results.months} months, ${results.days} days\nTotal Days Lived: ${results.totalDays.toLocaleString()}\nZodiac Sign: ${results.zodiac}\nNext Birthday: ${results.nextBirthday} (${results.daysUntilNext} days away)` : 'Age Calculator: Enter a valid date of birth.'}
      />
    </Card>
  );
};


export const DateDifferenceCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const { toast } = useToast();
  const today = todayUTC();
  const defaultStart = new Date(today.getTime() - 30 * 86400000);
  const [startDate, setStartDate] = useState<string>(toLocalDateStr(defaultStart));
  const [endDate, setEndDate] = useState<string>(toLocalDateStr(today));
  const [copied, setCopied] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  const results = useMemo(() => {
    const start = parseDateUTC(startDate);
    const end = parseDateUTC(endDate);
    if (!start || !end) {
      return { valid: false, totalDays: 0, totalDaysAbs: 0, weeks: 0, remDays: 0, years: 0, months: 0, daysRemaining: 0, businessDays: 0, direction: 1 };
    }
    const direction = end >= start ? 1 : -1;
    const absDays = Math.abs(daysBetween(start, end));
    const weeks = Math.floor(absDays / 7);
    const remDays = absDays % 7;

    const absStart = direction >= 0 ? start : end;
    const absEnd = direction >= 0 ? end : start;

    let y = absEnd.getUTCFullYear() - absStart.getUTCFullYear();
    let m = absEnd.getUTCMonth() - absStart.getUTCMonth();
    let d = absEnd.getUTCDate() - absStart.getUTCDate();
    if (d < 0) {
      m--;
      const prevMonth = new Date(Date.UTC(absEnd.getUTCFullYear(), absEnd.getUTCMonth(), 0));
      d += prevMonth.getUTCDate();
    }
    if (m < 0) {
      y--;
      m += 12;
    }

    let businessDays = 0;
    const iterStart = new Date(Math.min(start.getTime(), end.getTime()));
    const iterEnd = new Date(Math.max(start.getTime(), end.getTime()));
    for (let t = new Date(iterStart); t <= iterEnd; t = new Date(t.getTime() + 86400000)) {
      const dow = t.getUTCDay();
      if (dow !== 0 && dow !== 6) businessDays++;
    }

    return { valid: true, totalDays: direction * absDays, totalDaysAbs: absDays, weeks, remDays, years: y, months: m, daysRemaining: d, businessDays, direction };
  }, [startDate, endDate]);

  const handleCopy = () => {
    const text = results.valid
      ? `Date Difference Result:\nTotal Days: ${results.totalDaysAbs.toLocaleString()} (${results.totalDays >= 0 ? 'future' : 'past'})\nWeeks & Days: ${results.weeks} weeks, ${results.remDays} days\nYears, Months, Days: ${results.years}y ${results.months}m ${results.daysRemaining}d\nBusiness Days (Mon-Fri): ${results.businessDays.toLocaleString()}`
      : 'Date Difference: Enter valid start and end dates.';
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast('Result copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
    if (onSaveHistory && results.valid) {
      onSaveHistory(`${results.totalDaysAbs} days between dates (${results.businessDays} business days)`);
    }
  };

  const handleReset = () => {
    const t = todayUTC();
    setStartDate(toLocalDateStr(new Date(t.getTime() - 30 * 86400000)));
    setEndDate(toLocalDateStr(t));
  };

  return (
    <Card id="date-diff-calculator-container" className="p-0 overflow-hidden">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-mono">Time & Date</Badge>
            <span className="text-xs font-mono text-zinc-500">Live Math</span>
          </div>
          <CardTitle className="text-xl">Date Difference Calculator</CardTitle>
          <CardDescription>Calculate the exact time between two dates in days, weeks, months, and business days.</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsExportOpen(true)} className="text-xs">
            <Share2 className="w-3.5 h-3.5" /> Share / Export
          </Button>
          <Button id="diff-reset-button" variant="outline" size="sm" onClick={handleReset} className="text-xs" title="Reset to defaults">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="diff-start-date">Start Date</Label>
                <span className="text-xs text-zinc-400 font-mono">From</span>
              </div>
              <Input
                id="diff-start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="font-mono font-bold text-sm dark:[color-scheme:dark]"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="diff-end-date">End Date</Label>
                <span className="text-xs text-zinc-400 font-mono">To</span>
              </div>
              <Input
                id="diff-end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="font-mono font-bold text-sm dark:[color-scheme:dark]"
              />
            </div>
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase text-zinc-600 dark:text-zinc-400 font-semibold">Quick Presets</span>
              <div className="flex flex-wrap gap-1.5">
                <Button type="button" variant="outline" size="sm" onClick={() => { setStartDate(toLocalDateStr(new Date(today.getTime() - 7 * 86400000))); setEndDate(toLocalDateStr(today)); }} className="h-7 text-xs font-mono">7 days</Button>
                <Button type="button" variant="outline" size="sm" onClick={() => { setStartDate(toLocalDateStr(new Date(today.getTime() - 30 * 86400000))); setEndDate(toLocalDateStr(today)); }} className="h-7 text-xs font-mono">30 days</Button>
                <Button type="button" variant="outline" size="sm" onClick={() => { setStartDate(toLocalDateStr(new Date(today.getTime() - 365 * 86400000))); setEndDate(toLocalDateStr(today)); }} className="h-7 text-xs font-mono">1 year</Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-zinc-950 text-white rounded-xl p-5 border border-zinc-800 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono text-zinc-300">
                  <span>Difference Breakdown</span>
                  <span className="inline-flex items-center gap-1 text-zinc-200 font-semibold">
                    <ArrowRightLeft className="w-3.5 h-3.5 text-primary-on-dark" /> {results.valid ? `${results.totalDaysAbs} days` : '\u2014'}
                  </span>
                </div>
                {results.valid ? (
                  <>
                    <div className="my-4 text-center">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1 font-semibold">Total Days</p>
                      <div className="text-3xl sm:text-4xl font-bold text-white font-mono tracking-tight tabular-nums">
                        {results.totalDaysAbs.toLocaleString()}
                      </div>
                      <p className="text-[11px] text-primary-on-dark font-mono mt-1 font-semibold">
                        {results.businessDays.toLocaleString()} business days (Mon-Fri)
                      </p>
                    </div>
                    <div className="space-y-2 pt-3 border-t border-zinc-800 text-xs font-mono">
                      <div className="flex justify-between text-zinc-200">
                        <span className="text-zinc-400">Weeks & Days:</span>
                        <span className="font-bold tabular-nums">{results.weeks} weeks, {results.remDays} days</span>
                      </div>
                      <div className="flex justify-between text-zinc-100 pt-2 border-t border-zinc-800">
                        <span className="font-semibold">Years, Months, Days:</span>
                        <span className="font-bold text-white tabular-nums">{results.years}y {results.months}m {results.daysRemaining}d</span>
                      </div>
                      <div className="flex justify-between text-zinc-200">
                        <span className="text-zinc-400">Calendar Days:</span>
                        <span className="font-bold text-white tabular-nums">{results.totalDaysAbs.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-zinc-300 pt-2 border-t border-zinc-800">
                        <span className="text-zinc-400">Business Days:</span>
                        <span className="font-mono tabular-nums text-primary-on-dark font-bold">{results.businessDays.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-zinc-300">
                        <span className="text-zinc-400">Weekend Days:</span>
                        <span className="font-mono tabular-nums text-primary-on-dark font-bold">{results.totalDaysAbs - results.businessDays}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="my-8 text-center">
                    <p className="text-sm text-zinc-400 font-mono">Enter valid start and end dates to see results.</p>
                  </div>
                )}
              </div>
              <div className="pt-3 border-t border-zinc-800">
                <Button id="diff-copy-button" type="button" variant="primary" size="sm" onClick={handleCopy} className="w-full text-xs">
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied to Clipboard' : 'Copy Difference Result'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        calculatorName="Date Difference Calculator"
        title="Date Difference Report"
        data={results.valid ? {
          'Start Date': startDate,
          'End Date': endDate,
          'Total Calendar Days': results.totalDaysAbs.toLocaleString(),
          'Weeks & Days': `${results.weeks} weeks, ${results.remDays} days`,
          'Years, Months, Days': `${results.years}y ${results.months}m ${results.daysRemaining}d`,
          'Business Days': results.businessDays.toLocaleString(),
          'Weekend Days': results.totalDaysAbs - results.businessDays,
        } : { 'Status': 'Enter valid start and end dates' }}
        summaryText={results.valid ? `Date Difference Result:\nTotal Days: ${results.totalDaysAbs.toLocaleString()}\nWeeks & Days: ${results.weeks} weeks, ${results.remDays} days\nYears, Months, Days: ${results.years}y ${results.months}m ${results.daysRemaining}d\nBusiness Days: ${results.businessDays.toLocaleString()}` : 'Date Difference: Enter valid start and end dates.'}
      />
    </Card>
  );
};


export const DaysUntilCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const { toast } = useToast();
  const today = todayUTC();
  const defaultTarget = new Date(today.getTime() + 365 * 86400000);
  const [targetDate, setTargetDate] = useState<string>(toLocalDateStr(defaultTarget));
  const [copied, setCopied] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  const results = useMemo(() => {
    const target = parseDateUTC(targetDate);
    if (!target) {
      return { valid: false, daysRemaining: 0, weeks: 0, remDays: 0, dayOfWeek: '', isPast: false, isToday: false };
    }
    const t = todayUTC();
    const diff = daysBetween(t, target);
    const absDays = Math.abs(diff);
    const isPast = diff < 0;
    const isToday = diff === 0;
    const weeks = Math.floor(absDays / 7);
    const remDays = absDays % 7;
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = weekdays[target.getUTCDay()];
    return { valid: true, daysRemaining: absDays, weeks, remDays, dayOfWeek, isPast, isToday };
  }, [targetDate]);

  const handleCopy = () => {
    const text = results.valid
      ? `Countdown Result:\nTarget Date: ${targetDate}\nDay of Week: ${results.dayOfWeek}\n${results.isToday ? 'Target is today!' : results.isPast ? `${results.daysRemaining} days ago` : `${results.daysRemaining} days remaining (${results.weeks} weeks, ${results.remDays} days)`}`
      : 'Countdown: Enter a valid target date.';
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast('Result copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
    if (onSaveHistory && results.valid) {
      const status = results.isToday ? 'today' : results.isPast ? `${results.daysRemaining} days ago` : `${results.daysRemaining} days away`;
      onSaveHistory(`Target ${targetDate} (${results.dayOfWeek}): ${status}`);
    }
  };

  const handleReset = () => {
    const t = todayUTC();
    setTargetDate(toLocalDateStr(new Date(t.getTime() + 365 * 86400000)));
  };

  return (
    <Card id="days-until-calculator-container" className="p-0 overflow-hidden">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-mono">Time & Date</Badge>
            <span className="text-xs font-mono text-zinc-500">Live Math</span>
          </div>
          <CardTitle className="text-xl">Days Until Calculator</CardTitle>
          <CardDescription>Count the days, weeks, and day of week until any future date or from any past date.</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsExportOpen(true)} className="text-xs">
            <Share2 className="w-3.5 h-3.5" /> Share / Export
          </Button>
          <Button id="countdown-reset-button" variant="outline" size="sm" onClick={handleReset} className="text-xs" title="Reset to defaults">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="countdown-target-date">Target Date</Label>
                <span className="text-xs text-zinc-400 font-mono">Select date</span>
              </div>
              <Input
                id="countdown-target-date"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="font-mono font-bold text-sm dark:[color-scheme:dark]"
              />
            </div>
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase text-zinc-600 dark:text-zinc-400 font-semibold">Quick Presets</span>
              <div className="flex flex-wrap gap-1.5">
                <Button type="button" variant="outline" size="sm" onClick={() => setTargetDate(toLocalDateStr(new Date(today.getTime() + 30 * 86400000)))} className="h-7 text-xs font-mono">+30 days</Button>
                <Button type="button" variant="outline" size="sm" onClick={() => setTargetDate(toLocalDateStr(new Date(today.getTime() + 90 * 86400000)))} className="h-7 text-xs font-mono">+90 days</Button>
                <Button type="button" variant="outline" size="sm" onClick={() => setTargetDate(toLocalDateStr(new Date(today.getTime() + 365 * 86400000)))} className="h-7 text-xs font-mono">+1 year</Button>
              </div>
            </div>
            {results.valid && (
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-1">
                  <Timer className="w-3.5 h-3.5 text-primary dark:text-primary-tint" />
                  <span className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">Target falls on</span>
                </div>
                <span className="text-sm font-mono font-bold text-zinc-900 dark:text-zinc-100">{results.dayOfWeek}</span>
              </div>
            )}
          </div>

          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-zinc-950 text-white rounded-xl p-5 border border-zinc-800 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono text-zinc-300">
                  <span>Countdown</span>
                  <span className="inline-flex items-center gap-1 text-zinc-200 font-semibold">
                    <Timer className="w-3.5 h-3.5 text-primary-on-dark" /> {results.valid ? results.dayOfWeek : '\u2014'}
                  </span>
                </div>
                {results.valid ? (
                  <>
                    <div className="my-4 text-center">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1 font-semibold">
                        {results.isToday ? 'Target is Today!' : results.isPast ? 'Days Ago' : 'Days Remaining'}
                      </p>
                      {results.isToday ? (
                        <div className="text-3xl sm:text-4xl font-bold text-primary-on-dark font-mono tracking-tight tabular-nums">
                          <PartyPopper className="w-8 h-8 mx-auto mb-2 text-primary-on-dark" />
                          Today!
                        </div>
                      ) : (
                        <div className="text-3xl sm:text-4xl font-bold text-white font-mono tracking-tight tabular-nums">
                          {results.daysRemaining.toLocaleString()} <span className="text-lg text-zinc-400">{results.daysRemaining === 1 ? 'day' : 'days'}</span>
                        </div>
                      )}
                      <p className="text-[11px] text-primary-on-dark font-mono mt-1 font-semibold">
                        {results.isPast ? `Occurred ${results.weeks}w ${results.remDays}d ago` : `${results.weeks} weeks, ${results.remDays} days from now`}
                      </p>
                    </div>
                    <div className="space-y-2 pt-3 border-t border-zinc-800 text-xs font-mono">
                      <div className="flex justify-between text-zinc-200">
                        <span className="text-zinc-400">Weeks & Days:</span>
                        <span className="font-bold tabular-nums">{results.weeks} weeks, {results.remDays} days</span>
                      </div>
                      <div className="flex justify-between text-zinc-200">
                        <span className="text-zinc-400">Day of Week:</span>
                        <span className="font-bold text-primary-on-dark tabular-nums">{results.dayOfWeek}</span>
                      </div>
                      <div className="flex justify-between text-zinc-200 pt-2 border-t border-zinc-800">
                        <span className="text-zinc-400">Target Date:</span>
                        <span className="font-bold text-white tabular-nums">{targetDate}</span>
                      </div>
                      <div className="flex justify-between text-zinc-300">
                        <span className="text-zinc-400">Status:</span>
                        <span className="font-mono tabular-nums text-primary-on-dark font-bold">
                          {results.isToday ? 'Today' : results.isPast ? 'Past' : 'Upcoming'}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="my-8 text-center">
                    <p className="text-sm text-zinc-400 font-mono">Enter a valid target date to see the countdown.</p>
                  </div>
                )}
              </div>
              <div className="pt-3 border-t border-zinc-800">
                <Button id="countdown-copy-button" type="button" variant="primary" size="sm" onClick={handleCopy} className="w-full text-xs">
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied to Clipboard' : 'Copy Countdown Result'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        calculatorName="Days Until Calculator"
        title="Countdown Report"
        data={results.valid ? {
          'Target Date': targetDate,
          'Day of Week': results.dayOfWeek,
          'Total Days': results.isToday ? 'Today' : `${results.daysRemaining} days`,
          'Weeks & Days': `${results.weeks} weeks, ${results.remDays} days`,
          'Status': results.isToday ? 'Today' : results.isPast ? 'Past' : 'Upcoming',
        } : { 'Status': 'Enter a valid target date' }}
        summaryText={results.valid ? `Countdown Result:\nTarget Date: ${targetDate}\nDay of Week: ${results.dayOfWeek}\n${results.isToday ? 'Target is today!' : results.isPast ? `${results.daysRemaining} days ago` : `${results.daysRemaining} days remaining (${results.weeks} weeks, ${results.remDays} days)`}` : 'Countdown: Enter a valid target date.'}
      />
    </Card>
  );
};
