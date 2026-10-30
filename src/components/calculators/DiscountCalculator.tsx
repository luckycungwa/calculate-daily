import React, { useState, useMemo } from 'react';
import { Tag, RotateCcw, Copy, Check, Share2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { ExportModal } from '../common/ExportModal';
import { useCurrency } from '../../lib/currency';
import { useToast } from '../ui/toast';

interface DiscountCalculatorProps {
  onSaveHistory?: (summary: string) => void;
}

export const DiscountCalculator: React.FC<DiscountCalculatorProps> = ({ onSaveHistory }) => {
  const currency = useCurrency();
  const { toast } = useToast();
  const [originalPrice, setOriginalPrice] = useState<string>('120');
  const [discountPercent, setDiscountPercent] = useState<string>('25');
  const [extraCouponPercent, setExtraCouponPercent] = useState<string>('0');
  const [salesTaxPercent, setSalesTaxPercent] = useState<string>('8');
  const [copied, setCopied] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  const results = useMemo(() => {
    const price = Math.max(0, parseFloat(originalPrice) || 0);
    const d1 = Math.min(100, Math.max(0, parseFloat(discountPercent) || 0)) / 100;
    const d2 = Math.min(100, Math.max(0, parseFloat(extraCouponPercent) || 0)) / 100;
    const taxRate = Math.max(0, parseFloat(salesTaxPercent) || 0) / 100;

    const afterFirstDiscount = price * (1 - d1);
    const afterExtraCoupon = afterFirstDiscount * (1 - d2);
    const taxAmount = afterExtraCoupon * taxRate;
    const finalPrice = afterExtraCoupon + taxAmount;
    const totalSaved = Math.max(0, price - afterExtraCoupon);

    return {
      price,
      afterFirstDiscount,
      finalPrice,
      totalSaved,
      taxAmount,
      savingsPct: price > 0 ? (totalSaved / price) * 100 : 0,
    };
  }, [originalPrice, discountPercent, extraCouponPercent, salesTaxPercent]);

  const handleCopy = () => {
    const text = `Discount Summary:\nOriginal Price: ${currency}${results.price.toFixed(2)}\nDiscount: ${discountPercent}%\nTotal Saved: ${currency}${results.totalSaved.toFixed(2)}\nFinal Checkout Price: ${currency}${results.finalPrice.toFixed(2)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast('Result copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
    if (onSaveHistory) onSaveHistory(`Discount: ${currency}${results.finalPrice.toFixed(2)} (Saved ${currency}${results.totalSaved.toFixed(2)})`);
  };

  const handleReset = () => {
    setOriginalPrice('120');
    setDiscountPercent('25');
    setExtraCouponPercent('0');
    setSalesTaxPercent('8');
  };

  return (
    <Card id="discount-calculator-container" className="p-0 overflow-hidden">
      {/* Header */}
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-mono">
              Retail & Markdown
            </Badge>
            <span className="text-xs font-mono text-zinc-500">Sales Tax Stacking</span>
          </div>
          <CardTitle className="text-xl">Discount & Sales Tax Calculator</CardTitle>
          <CardDescription>
            Compute final register totals with stacked promotional markdown discounts and sales taxes.
          </CardDescription>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExportOpen(true)}
            className="text-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            Export
          </Button>
          <Button
            id="discount-reset-button"
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Inputs */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Original Retail Price ({currency})</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-mono font-bold text-zinc-400">{currency}</span>
                  <Input
                    type="number"
                    min="0"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    className="pl-7 font-mono font-bold text-sm tabular-nums"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Primary Discount (%)</Label>
                <div className="relative">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(e.target.value)}
                    className="pr-7 font-mono font-bold text-sm tabular-nums"
                  />
                  <span className="absolute right-3 top-2 text-xs font-mono font-bold text-zinc-400">%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Extra Promo Code (%)</Label>
                <div className="relative">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={extraCouponPercent}
                    onChange={(e) => setExtraCouponPercent(e.target.value)}
                    placeholder="0"
                    className="pr-7 font-mono font-bold text-sm tabular-nums"
                  />
                  <span className="absolute right-3 top-2 text-xs font-mono font-bold text-zinc-400">%</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Sales Tax (%)</Label>
                <div className="relative">
                  <Input
                    type="number"
                    min="0"
                    max="50"
                    value={salesTaxPercent}
                    onChange={(e) => setSalesTaxPercent(e.target.value)}
                    className="pr-7 font-mono font-bold text-sm tabular-nums"
                  />
                  <span className="absolute right-3 top-2 text-xs font-mono font-bold text-zinc-400">%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Output */}
          <div className="lg:col-span-5 bg-zinc-950 text-white rounded-xl p-5 border border-zinc-800 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono text-zinc-400">
                <span>Final Price at Checkout</span>
                <span>{results.savingsPct.toFixed(0)}% Off</span>
              </div>

              <div className="my-4 text-center">
                <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                  Total Due
                </p>
                <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white tabular-nums">
                  {currency}{results.finalPrice.toFixed(2)}
                </div>
              </div>

              <div className="space-y-1.5 text-xs font-mono text-zinc-300 pt-3 border-t border-zinc-800">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Total Money Saved:</span>
                  <span className="font-bold text-primary-on-dark tabular-nums">
                    {currency}{results.totalSaved.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Calculated Sales Tax:</span>
                  <span className="font-mono tabular-nums">+{currency}{results.taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-zinc-500 pt-1 border-t border-zinc-800">
                  <span>Pre-Tax Subtotal:</span>
                  <span className="tabular-nums">{currency}{(results.price - results.totalSaved).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleCopy}
              className="w-full text-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied Deal Summary' : 'Copy Deal Summary'}
            </Button>
          </div>
        </div>
      </CardContent>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        calculatorName="Discount & Sales Tax Calculator"
        title="Shopping Markdown & Discount Summary"
        data={{
          'Original Retail Price': `${currency}${results.price.toFixed(2)}`,
          'Primary Discount': `${discountPercent}%`,
          'Extra Promo': `${extraCouponPercent}%`,
          'Sales Tax': `${salesTaxPercent}% (${currency}${results.taxAmount.toFixed(2)})`,
          'Total Money Saved': `${currency}${results.totalSaved.toFixed(2)} (${results.savingsPct.toFixed(0)}%)`,
          'Final Checkout Price': `${currency}${results.finalPrice.toFixed(2)}`,
        }}
        summaryText={`Discount Summary:\nOriginal Price: ${currency}${results.price.toFixed(2)}\nDiscount: ${discountPercent}%\nTotal Saved: ${currency}${results.totalSaved.toFixed(2)}\nFinal Checkout Price: ${currency}${results.finalPrice.toFixed(2)}`}
      />
    </Card>
  );
};
