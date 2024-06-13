
import { forwardRef } from 'react';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';


const variantsBadge = cva("icon-badge", {
  variants: {
    variant: {
      default: "bg-layout text-dark",
      primary: "bg-primary text-white",
      success: "badge-success text-white",
      warning: "badge-warning text-white",
      error: "bg-red text-white",
      info: "bg-sky text-white",
      "foreground-info": "bg-sky/20 text-sky",
      "foreground-success": "bg-primary/20 text-primary",
      "foreground-warning": "bg-yellow/20 text-yellow",
      "foreground-error": "bg-red/20 text-red",
      "foreground-purple": "bg-purple/20 text-purple",
      "foreground-neutral": "bg-slate-200 text-slate-500"
    },
    size: {
      default: "w-36 h-36 p-6",
      sm: "w-8 h-8 p-2",
      md: "w-12 h-12 p-3",
      lg: "w-16 h-16 p-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});


export interface FigureProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof variantsBadge> {
  asChild?: boolean;
}


const Badge = forwardRef<HTMLDivElement, FigureProps>(
  ({ className, variant, size, asChild, children, ...props }, ref) => {
    return (
      <figure
        ref={ref}
        className={cn(variantsBadge({ variant, size, className }))}
        {...props}
      >
        {children}
      </figure>
    )
  }
);

export type BadgeTypes = VariantProps<typeof variantsBadge>;

Badge.displayName = 'Badge'

export default Badge;
