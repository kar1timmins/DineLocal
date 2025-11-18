'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

export interface NavbarCenterProps extends React.ComponentProps<'div'> {}

function NavbarCenter({ className, children, ...props }: NavbarCenterProps) {
  return (
    <div
      data-slot="navbar-center"
      className={cn('flex flex-1 items-center justify-center gap-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { NavbarCenter }
