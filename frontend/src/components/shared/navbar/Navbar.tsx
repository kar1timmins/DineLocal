'use client'

import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { useNavbarScroll } from './useNavbarScroll'

const navbarVariants = cva(
  'w-full transition-all duration-300 ease-out motion-reduce:transition-none',
  {
    variants: {
      variant: {
        default: 'bg-background',
        transparent: 'bg-transparent',
        elevated: 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border',
      },
      position: {
        static: 'relative',
        sticky: 'sticky top-0 z-[1000]',
        fixed: 'fixed top-0 left-0 right-0 z-[1000]',
      },
      size: {
        sm: 'min-h-14 py-2',
        md: 'min-h-16 py-3',
        lg: 'min-h-20 py-4',
      },
      padding: {
        none: 'px-0',
        sm: 'px-4',
        md: 'px-6',
        lg: 'px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      position: 'sticky',
      size: 'md',
      padding: 'md',
    },
  }
)

export interface NavbarProps
  extends React.ComponentProps<'nav'>,
    VariantProps<typeof navbarVariants> {
  hideOnScroll?: boolean
  scrollThreshold?: number
  idleDelay?: number
}

function Navbar({
  className,
  variant = 'default',
  position = 'sticky',
  size = 'md',
  padding = 'md',
  hideOnScroll = true,
  scrollThreshold = 50,
  idleDelay = 300,
  children,
  ...props
}: NavbarProps) {
  const { isVisible, isElevated } = useNavbarScroll({
    hideOnScroll,
    scrollThreshold,
    idleDelay,
  })

  // Determine if we should show elevated variant
  const effectiveVariant = isElevated && variant === 'default' ? 'elevated' : variant

  return (
    <nav
      data-slot="navbar"
      className={cn(
        navbarVariants({ variant: effectiveVariant, position, size, padding }),
        // Hide/show animation (only if hideOnScroll is true)
        hideOnScroll && (isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'),
        className
      )}
      {...props}
    >
      {children}
    </nav>
  )
}

export { Navbar, navbarVariants }
