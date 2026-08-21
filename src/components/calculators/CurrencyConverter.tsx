import React, { useState, useEffect, useMemo } from 'react';
import { Copy, Check, RotateCcw, ArrowDownUp, Share2, Wifi, WifiOff } from 'lucide-react';
import { CURRENCIES, FALLBACK_RATES, RATES_AS_OF, CURRENCY_API_URL } from '../../data/currencies';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { ExportModal } from '../common/ExportModal';
import { useToast } from '../ui/toast';

interface CurrencyConverterProps {
  onSaveHistory?: (summary: string) => void;
}

export const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ onSaveHistory }) => {
  const { toast } = useToast();
  const [amount, setAmount] = useState<string>('100');
  const [fromCode, setFromCode] = useState<string>('USD');
  const [toCode, setToCode] = useState<string>('EUR');
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    fetch(CURRENCY_API_URL, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('bad status'))))
      .then((data) => {
        if (cancelled) return;
        if (data && data.result === 'success' && data.rates && typeof data.rates === 'object') {
          setRates({ ...FALLBACK_RATES, ...data.rates });
          setIsLive(true);
        }
      })
      .catch(() => {
        /* keep offline fallback rates */
      })
      .finally(() => {
        if (!cancelled) setIsChecking(false);
        clearTimeout(timeout);
      });

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const from = CURRENCIES.find((c) => c.code === fromCode) || CURRENCIES[0];
  const to = CURRENCIES.find((c) => c.code === toCode) || CURRENCIES[1];

  const result = useMemo(() => {
    const num = parseFloat(amount);
    if (!Number.isFinite(num)) return 0;
    const fromRate = rates[fromCode] || 1;
    const toRate = rates[toCode] || 1;
    if (fromRate <= 0 || toRate <= 0) return 0;
    const out = (num / fromRate) * toRate;
    return Number.isFinite(out) ? out : 0;
  }, [amount, fromCode, toCode, rates]);

  const formatMoney = (n: number, currency: typeof to) => {
    const digits = currency.code === 'JPY' || currency.code === 'KRW' || currency.code === 'VND' || currency.code === 'IDR' ? 0 : 2;
    return `${currency.symbol}${n.toLocaleString('en-US', { maximumFractionDigits: digits, minimumFractionDigits: digits })}`;
  };

  const rateText = rates[fromCode] && rates[toCode] ? `1 ${fromCode} = ${(rates[toCode] / rates[fromCode]).toFixed(4)} ${toCode}` : '—';

  const handleSwap = () => {
    setFromCode(toCode);
    setToCode(fromCode);
  };

  const handleReset = () => {
    setAmount('100');
    setFromCode('USD');
    setToCode('EUR');
  };

  const handleCopy = () => {
    const text = `${amount} ${fromCode} = ${formatMoney(result, to)} (${rateText})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast('Result copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
    if (onSaveHistory) {
      onSaveHistory(`Currency Converter: ${text}`);
    }
  };

  const exportData: Record<string, string | number> = {
    Amount: `${amount} ${fromCode}`,
    'Converted To': `${formatMoney(result, to)} (${toCode})`,
    Rate: rateText,
    Source: isLive ? 'Live rates (open.er-api.com)' : `Reference rates as of ${RATES_AS_OF} (offline)`,
  };

  return (
    <Card className="p-0 overflow-hidden">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-mono">
              Currency Converter
            </Badge>
            {isChecking ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 animate-pulse">
                <Wifi className="w-3 h-3" /> Checking live rates
              </span>
            ) : isLive ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                <Wifi className="w-3 h-3" /> Live rates
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-600 dark:text-amber-400">
                <WifiOff className="w-3 h-3" /> Reference rates
              </span>
            )}
          </div>
          <CardTitle className="text-xl">Currency Converter</CardTitle>
          <CardDescription>Convert between 40+ currencies with live exchange rates.</CardDescription>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsExportOpen(true)} className="text-xs">
            <Share2 className="w-3.5 h-3.5" />
            Export
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={handleReset} className="text-xs">
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="cc-amount">Amount</Label>
              <Input
                id="cc-amount"
                type="number"
                step="any"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="font-mono font-bold text-sm tabular-nums"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-end gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="cc-from">From</Label>
                <select
                  id="cc-from"
                  value={fromCode}
                  onChange={(e) => setFromCode(e.target.value)}
                  className="flex h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 py-1 text-xs text-zinc-950 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-emerald-600 shadow-xs cursor-pointer"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} · {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleSwap}
                aria-label="Swap currencies"
                className="h-9 w-9 shrink-0"
              >
                <ArrowDownUp className="w-4 h-4" />
              </Button>

              <div className="space-y-1.5">
                <Label htmlFor="cc-to">To</Label>
                <select
                  id="cc-to"
                  value={toCode}
                  onChange={(e) => setToCode(e.target.value)}
                  className="flex h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 py-1 text-xs text-zinc-950 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-emerald-600 shadow-xs cursor-pointer"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} · {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300">
              <span className="font-mono text-[11px] font-bold text-zinc-900 dark:text-white block mb-1">
                Exchange Rate
              </span>
              <span className="font-mono text-[11px] text-zinc-500">{rateText}</span>
              <span className="block text-[11px] text-zinc-400 mt-1.5">
                {isLive
                  ? 'Rates refresh daily from open.er-api.com. Use the bank rate for large transfers. Interbank vs. retail rates differ.'
                  : `Live feed unavailable, showing reference rates as of ${RATES_AS_OF}. Results are a close estimate for planning, not for transactions.`}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-zinc-950 text-white rounded-xl p-5 border border-zinc-800 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                Converted Amount
              </span>

              <div className="my-4 text-center">
                <div className="text-3xl sm:text-4xl font-bold font-mono text-white tracking-tight tabular-nums">
                  {formatMoney(result, to)}
                </div>
                <p className="text-[11px] text-zinc-400 font-mono mt-1">
                  {to.code} · {to.name}
                </p>
              </div>

              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-center text-xs font-mono text-zinc-300">
                {amount} {fromCode} = {formatMoney(result, to)}
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800">
              <Button
                id="cc-copy-button"
                type="button"
                variant="primary"
                size="sm"
                onClick={handleCopy}
                className="w-full text-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied Result' : 'Copy Result'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        calculatorName="Currency Converter"
        title="Currency Conversion Breakdown"
        data={exportData}
        summaryText={`${amount} ${fromCode} = ${formatMoney(result, to)} (${rateText})`}
      />
    </Card>
  );
};