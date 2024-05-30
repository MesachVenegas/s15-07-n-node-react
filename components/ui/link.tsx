'use client'

import Link from 'next/link';
import type { LinkProps } from 'next/link';

import { forwardRef } from 'react';

import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const linkVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "text-blue-800 dark:text-blue-300 hover:underline",
        button: "flex items-center justify-between bg-layout dark:bg-dark rounded-lg font-bold shadow-badge"
      },
      size: {
        default: "w-fit h-fit",
        btnWide: "w-full max-w-md py-3 px-4",
        btn: "w-full max-w-sm py-2 px-3"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

export interface CustomLinkProps extends React.HTMLAttributes<HTMLAnchorElement>, VariantProps<typeof linkVariants>, LinkProps {
  asChild?: boolean;
  href: string;
}


const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ className, href, variant, size, asChild, children, ...props }, ref) => {

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(linkVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </Link>
    )
  })

CustomLink.displayName = "CustomLink"

export default CustomLink;
