import React from 'react';
import { Command, CornerDownLeft, Search, RotateCcw, Moon, History } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const shortcuts = [
    { key: 'Enter', desc: 'Copy current calculation result to clipboard and log to history', icon: CornerDownLeft },
    { key: 'Esc', desc: 'Reset current calculator inputs to default values', icon: RotateCcw },
    { key: '/', desc: 'Quick jump to calculator search bar', icon: Search },
    { key: 'H', desc: 'Open recent calculation history modal', icon: History },
    { key: 'T', desc: 'Toggle Dark / Light theme mode', icon: Moon },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader className="pb-2 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Command className="w-4 h-4 text-primary dark:text-primary-tint" />
            <DialogTitle>Keyboard Shortcuts</DialogTitle>
          </div>
          <DialogDescription>
            Quick hotkeys to speed up your workflow.
          </DialogDescription>
        </DialogHeader>

        <div className="my-2 space-y-2">
          {shortcuts.map((sc) => {
            const Icon = sc.icon;
            return (
              <div
                key={sc.key}
                className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs"
              >
                <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                  <Icon className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="text-xs">{sc.desc}</span>
                </div>
                <kbd className="px-2 py-0.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded text-[11px] font-mono font-bold text-zinc-800 dark:text-zinc-200">
                  {sc.key}
                </kbd>
              </div>
            );
          })}
        </div>

        <DialogFooter className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <Button
            variant="default"
            size="sm"
            onClick={onClose}
            className="w-full text-xs"
          >
            Dismiss
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
