import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
	"btn items-center gap-4 whitespace-nowrap ring-offset-white transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
	{
		variants: {
			variant: {
				default:
					"bg-layout dark:bg-dark hover:bg-layout/90 dark:text-white dark:hover:bg-dark/80",
				primary:
					"bg-primary dark:bg-primary/90 text-white hover:bg-emerald-400/90 text-black",
				destructive:
					"bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
				outline:
					"border-2 border-gray-400 bg-layout dark:text-white dark:bg-dark hover:bg-slate-200 dark:border-slate-500 dark:hover:bg-slate-700",
				secondary:
					"bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
				ghost:
					"hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
				warning: "badge-warning text-black",
				info: "bg-blue-700 hover:bg-blue-700/80 text-white dark:bg-blue-900 dark:hover:bg-blue-900/80",
				black: "bg-black hover:bg-black/70 text-white",
				"foreground-success": "bg-white/50 text-primary",
			},
			size: {
				default: "h-10 px-4 rounded-md py-2",
				wide: "w-full max-w-sm px-4 py-2 rounded-md",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
				icon: "h-10 w-10",
				"icon-lg": "h-12 w-12",
				"icon-sm": "h-8 w-8 rounded-[6px] p-3 justify-center items-center",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export default Button;
