import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold',
        secondary:
          'border-transparent bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 font-medium',
        destructive:
          'border-rose-300 bg-rose-50 text-rose-900 dark:bg-rose-950/70 dark:text-rose-200 dark:border-rose-800 font-semibold',
        outline:
          'text-zinc-800 border-zinc-300 bg-zinc-50 dark:text-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 font-medium',
        success:
          'border-brand/30 bg-brand/10 text-brand font-semibold',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge: React.FC<BadgeProps> = ({ className, variant, children, ...props }) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </div>
  );
};

export { badgeVariants };
