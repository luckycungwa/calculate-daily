import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-medium ring-offset-background transition-[background-color,border-color,color,box-shadow,transform] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/60 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0 cursor-pointer hover:-translate-y-px active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none',
  {
    variants: {
      variant: {
        /* Genesis: indigo fill, white text, tinted glow on hover. Fill and
           hover use the deeper AA-contrast pair of the genesis indigo
           (#4F46E5 fill / #6366F1 tint); see src/index.css. */
        primary:
          'bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-xs hover:shadow-[0_4px_12px_rgba(99,102,241,0.35)]',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-xs font-semibold',
        default:
          'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 shadow-xs font-semibold',
        outline:
          'border border-border bg-card hover:bg-secondary text-foreground dark:bg-zinc-900 shadow-xs font-medium',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 font-medium',
        ghost: 'hover:bg-secondary text-zinc-800 hover:text-foreground dark:text-zinc-200 font-medium',
        link: 'text-primary underline-offset-4 hover:underline dark:text-primary-tint font-medium',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-6 text-sm',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
