'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

export type NavbarRightProps = React.ComponentProps<'div'>

function NavbarRight({ className, children, ...props }: NavbarRightProps) {
  return (
    <div
      data-slot="navbar-right"
      className={cn('flex items-center justify-end gap-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { NavbarRight }
