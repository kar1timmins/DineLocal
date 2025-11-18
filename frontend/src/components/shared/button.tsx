'use client'

import * as React from 'react'

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { Box } from './container'
import { Spinner } from './spinner'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error",
  {
    variants: {
      variant: {
        default: 'bg-primary/96 text-primary-foreground hover:bg-primary-700',
        error: 'bg-error text-error-foreground hover:bg-error-700',
        warning: 'bg-warning text-warning-foreground hover:bg-warning-600',
        success: 'bg-success text-success-foreground hover:bg-success-600',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        'outline-primary':
          'border-2 bg-background shadow-xs border-primary-100 text-primary hover:bg-primary-50',
        'outline-success':
          'border bg-background shadow-xs border-success-100 text-success-600 hover:bg-success-50',
        'outline-warning':
          'border bg-background shadow-xs border-warning-100 text-warning hover:bg-warning-50',
        'outline-error':
          'border bg-background shadow-xs border-error-100 text-error-500 hover:bg-error-50',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        'secondary-dark': 'bg-gray-900 text-primary-foreground hover:bg-gray-900/80',
        'secondary-primary': 'bg-primary-50 text-primary hover:bg-primary-50/80',
        'secondary-success': 'bg-success-50 text-success hover:bg-success-50/80',
        'secondary-error': 'bg-error-50 text-error-500 hover:bg-error-50/80',
        'secondary-warning': 'bg-warning-50 text-warning-500 hover:bg-warning-50/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        'ghost-primary': 'text-primary hover:bg-primary-50',
        'ghost-error': 'text-error-500 hover:bg-error-50',
        'ghost-success': 'text-success hover:bg-success-50',
        'ghost-warning': 'text-warning-500 hover:bg-warning-50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        xl: 'h-11 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-xs': 'size-7',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
        'icon-xl': 'size-11',
        'icon-circle': 'size-9 rounded-full',
        'icon-circle-xs': 'size-7 rounded-full',
        'icon-circle-sm': 'size-8 rounded-full',
        'icon-circle-lg': 'size-10 rounded-full',
        'icon-circle-xl': 'size-11 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  iconStart?: React.ReactNode | null
  iconEnd?: React.ReactNode | null
  isLoading?: boolean
  asChild?: boolean
}

function Button({
  className,
  variant,
  size,
  children,
  isLoading,
  iconStart = null,
  iconEnd = null,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  function renderLoader() {
    return (
      <Box className="flex w-[50px] items-center justify-center">
        <Spinner />
      </Box>
    )
  }

  function renderContent() {
    if (asChild) {
      return children
    }

    return (
      <>
        {iconStart && iconStart}
        {children && children}
        {iconEnd && iconEnd}
      </>
    )
  }

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {!isLoading ? renderContent() : renderLoader()}
    </Comp>
  )
}

export { Button, buttonVariants }
