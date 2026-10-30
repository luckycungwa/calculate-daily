import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '../../lib/utils';

type ToastKind = 'success' | 'info' | 'warning';

interface ToastItem {
  id: number;
  message: string;
  kind: ToastKind;
}

interface ToastContextValue {
  toast: (message: string, kind?: ToastKind) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast(): ToastContextValue {
  return useContext(ToastContext);
}

const TOAST_ICONS: Record<ToastKind, React.ReactNode> = {
  success: <CheckCircle2 className="w-3.5 h-3.5 text-brand" />,
  info: <Info className="w-3.5 h-3.5 text-zinc-400" />,
  warning: <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />,
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, kind: ToastKind = 'success') => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev.slice(-2), { id, message, kind }]);
      setTimeout(() => dismiss(id), 3000);
    },
    [dismiss]
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-[calc(100vw-2rem)]"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="flex items-start gap-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-lg px-3.5 py-2.5 text-xs text-zinc-800 dark:text-zinc-100 max-w-xs animate-[toastIn_0.18s_ease-out]"
            role="status"
          >
            <span className="mt-px shrink-0">{TOAST_ICONS[t.kind]}</span>
            <span className="leading-relaxed">{t.message}</span>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notification"
              className="ml-1 shrink-0 rounded p-0.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};