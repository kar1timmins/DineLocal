'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

export type NavbarLeftProps = React.ComponentProps<'div'>

function NavbarLeft({ className, children, ...props }: NavbarLeftProps) {
  return (
    <div data-slot="navbar-left" className={cn('flex items-center gap-4', className)} {...props}>
      {children}
    </div>
  )
}

export { NavbarLeft }
