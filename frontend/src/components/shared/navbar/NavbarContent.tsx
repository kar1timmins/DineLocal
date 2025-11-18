'use client'

import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const navbarContentVariants = cva('mx-auto flex h-full w-full items-center justify-between', {
  variants: {
    maxWidth: {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      '2xl': 'max-w-screen-2xl',
      full: 'max-w-full',
    },
    gap: {
      none: 'gap-0',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    },
  },
  defaultVariants: {
    maxWidth: 'full',
    gap: 'md',
  },
})

export interface NavbarContentProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof navbarContentVariants> {}

function NavbarContent({
  className,
  maxWidth = 'full',
  gap = 'md',
  children,
  ...props
}: NavbarContentProps) {
  return (
    <div
      data-slot="navbar-content"
      className={cn(navbarContentVariants({ maxWidth, gap }), className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { NavbarContent, navbarContentVariants }
