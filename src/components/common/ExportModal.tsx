import React, { useState } from 'react';
import { Printer, Copy, Check, Share2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: Record<string, string | number>;
  summaryText: string;
  calculatorName: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  title,
  data,
  summaryText,
  calculatorName,
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleCopyText = () => {
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyShareLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('calc', calculatorName.toLowerCase().replace(/\s+/g, '-'));
    navigator.clipboard.writeText(url.toString());
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader className="pb-2 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
            <DialogTitle>Export & Share</DialogTitle>
          </div>
          <DialogDescription>
            {calculatorName} summary data ready for copying or print export.
          </DialogDescription>
        </DialogHeader>

        {/* Content Preview */}
        <div className="my-2 p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 font-mono text-xs text-zinc-800 dark:text-zinc-200 space-y-2">
          <div className="font-bold text-xs text-emerald-600 dark:text-emerald-400 font-sans flex items-center justify-between">
            <span>{title}</span>
            <Badge variant="outline" className="font-mono text-[10px]">Verified</Badge>
          </div>
          <div className="space-y-1 pt-1.5 border-t border-zinc-200 dark:border-zinc-800">
            {Object.entries(data).map(([key, val]) => (
              <div key={key} className="flex justify-between text-[11px]">
                <span className="text-zinc-500 dark:text-zinc-400 font-sans">{key}:</span>
                <span className="font-mono font-bold tabular-nums">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
          <Button
            variant="primary"
            size="sm"
            onClick={handleCopyText}
            className="text-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Formatted Text'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="text-xs"
          >
            <Printer className="w-3.5 h-3.5 text-zinc-500" />
            Print / PDF
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyShareLink}
            className="sm:col-span-2 text-xs border border-zinc-200 dark:border-zinc-800"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copiedUrl ? 'URL Copied!' : 'Copy Direct Share Link'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
