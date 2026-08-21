import React, { useState } from 'react';
import { Trash2, Clock, Copy, Check } from 'lucide-react';
import { CalculationHistoryItem } from '../types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useToast } from './ui/toast';

interface CalculationHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: CalculationHistoryItem[];
  onClearHistory: () => void;
}

export const CalculationHistoryModal: React.FC<CalculationHistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onClearHistory,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCopy = (item: CalculationHistoryItem) => {
    navigator.clipboard.writeText(item.summary);
    setCopiedId(item.id);
    toast('Result copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md max-h-[85vh] flex flex-col">
        <DialogHeader className="pb-2 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
            <DialogTitle>Calculation History</DialogTitle>
          </div>
          <DialogDescription>
            Locally stored calculation summaries from your current session.
          </DialogDescription>
        </DialogHeader>

        {/* Modal Body */}
        <div className="my-2 flex-1 overflow-y-auto space-y-2 pr-1 max-h-[50vh]">
          {history.length === 0 ? (
            <div className="text-center py-10 text-zinc-400 text-xs font-mono">
              No recent calculations recorded yet.
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-start justify-between gap-3 text-xs"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100 truncate">
                      {item.calculatorName}
                    </span>
                    <Badge variant="outline" className="text-[10px] font-mono py-0">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Badge>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-300 font-mono text-[11px] whitespace-pre-wrap leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopy(item)}
                  className="h-7 w-7 shrink-0"
                  title="Copy to clipboard"
                >
                  {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <DialogFooter className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between sm:justify-between">
          {history.length > 0 ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearHistory}
              className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 p-0 h-auto font-mono"
            >
              <Trash2 className="w-3 h-3 mr-1" /> Clear All
            </Button>
          ) : <div />}
          <Button
            variant="default"
            size="sm"
            onClick={onClose}
            className="text-xs"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
