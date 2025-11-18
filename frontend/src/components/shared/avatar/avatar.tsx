'use client'

import * as React from 'react'

import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from '@/lib/utils'

import { getColorClassFromLetter, getInitials } from './constants'

function Avatar({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn('relative flex size-8 shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('aspect-square size-full', className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  fullname = '',
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback> & { fullname?: string }) {
  const initials = getInitials(fullname)
  const bgColor = getColorClassFromLetter(initials[0])
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        `${bgColor} bg-muted flex size-full items-center justify-center rounded-full`,
        className
      )}
      {...props}
    >
      {initials}
    </AvatarPrimitive.Fallback>
  )
}

export { Avatar, AvatarFallback, AvatarImage }
