import * as React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-xs text-foreground transition-[border-color,box-shadow] file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/25 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-900 dark:text-zinc-50 shadow-xs',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
