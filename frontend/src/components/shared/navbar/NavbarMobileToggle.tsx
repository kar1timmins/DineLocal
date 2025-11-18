'use client'

import * as React from 'react'

import { Menu, X } from 'lucide-react'

import { cn } from '@/lib/utils'

export interface NavbarMobileToggleProps extends React.ComponentProps<'button'> {
  /**
   * Whether the mobile menu is open
   */
  isOpen?: boolean
  /**
   * Callback when toggle is clicked
   */
  onToggle?: () => void
  /**
   * Icon size
   * @default 24
   */
  iconSize?: number
  /**
   * Accessible label for the toggle button
   * @default 'Toggle menu'
   */
  label?: string
}

function NavbarMobileToggle({
  className,
  isOpen = false,
  onToggle,
  iconSize = 24,
  label = 'Toggle menu',
  ...props
}: NavbarMobileToggleProps) {
  return (
    <button
      type="button"
      data-slot="navbar-mobile-toggle"
      className={cn(
        'inline-flex items-center justify-center rounded-md p-2',
        'text-foreground hover:bg-accent hover:text-accent-foreground',
        'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
        'transition-colors duration-200',
        'md:hidden', // Hide on desktop by default
        className
      )}
      onClick={onToggle}
      aria-label={label}
      aria-expanded={isOpen}
      {...props}
    >
      {isOpen ? <X size={iconSize} /> : <Menu size={iconSize} />}
    </button>
  )
}

export { NavbarMobileToggle }
