'use client'

import * as React from 'react'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

const tabsListVariants = cva('inline-flex items-center justify-center', {
  variants: {
    variant: {
      boxed:
        'h-auto rounded-md border border-card-border bg-card-background p-1 text-muted-foreground',
      'boxed-2': 'h-auto bg-transparent',
      'boxed-3': 'shadow-xs h-auto -space-x-px bg-background p-0 rtl:space-x-reverse',
      lifted:
        'relative h-auto gap-0.5  bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border ',
      button: 'h-9 gap-1',
      'bordered-b': 'h-8 gap-1 border border-transparent border-b-input-border',
    },
  },
  defaultVariants: {
    variant: 'button',
  },
})

interface TabsListProps
  extends React.ComponentProps<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

function TabsList({ className, variant, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(tabsListVariants({ variant, className }))}
      {...props}
    />
  )
}

const tabsTriggerVariants = cva(
  'inline-flex w-full items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        boxed:
          'h-9 rounded-sm data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground',
        'boxed-2': 'h-9 data-[state=active]:bg-muted data-[state=active]:shadow-none',
        'boxed-3':
          '[state=active]:border-outline-primary-border relative h-9 overflow-hidden rounded-none border border-outline-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-outline-primary-background data-[state=active]:text-primary data-[state=active]:after:bg-primary',
        lifted:
          '[state=active]:border-b-none overflow-hidden rounded-b-none  bg-muted py-2 data-[state=active]:z-10 data-[state=active]:bg-outline-primary-background data-[state=active]:text-primary  data-[state=active]:shadow-none',
        button:
          'h-9 border border-outline-border bg-outline-background text-outline-foreground  data-[state=active]:border-outline-primary-border data-[state=active]:bg-outline-primary-background data-[state=active]:text-outline-primary-foreground data-[state=active]:shadow-sm',
        'bordered-b':
          'rounded-none border-2 border-transparent pb-1 text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-primary',
      },
    },
    defaultVariants: {
      variant: 'button',
    },
  }
)

interface TabsTriggerProps
  extends React.ComponentProps<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

function TabsTrigger({ variant, className, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant, className }))}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  )
}

export { Tabs, TabsContent, TabsList, TabsTrigger }
