import React, { JSX } from 'react'

import { Slot } from '@radix-ui/react-slot'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { TContainerType } from './types'

const gridVariants = cva('', {
  variants: {
    display: {
      grid: 'grid',
      'inline-grid': 'inline-grid',
      hidden: 'hidden',
    },
    cols: {
      none: '',
      subgrid: 'grid-cols-subgrid',
      '1': 'grid-cols-1',
      '2': 'grid-cols-2',
      '3': 'grid-cols-3',
      '4': 'grid-cols-4',
      '5': 'grid-cols-5',
      '6': 'grid-cols-6',
      '7': 'grid-cols-7',
      '8': 'grid-cols-8',
      '9': 'grid-cols-9',
      '10': 'grid-cols-10',
      '11': 'grid-cols-11',
      '12': 'grid-cols-12',
    },
    rows: {
      none: '',
      subgrid: 'grid-rows-subgrid',
      '1': 'grid-rows-1',
      '2': 'grid-rows-2',
      '3': 'grid-rows-3',
      '4': 'grid-rows-4',
      '5': 'grid-rows-5',
      '6': 'grid-rows-6',
      '7': 'grid-rows-7',
      '8': 'grid-rows-8',
      '9': 'grid-rows-9',
      '10': 'grid-rows-10',
      '11': 'grid-rows-11',
      '12': 'grid-rows-12',
    },
    flow: {
      none: '',
      row: 'grid-flow-row',
      column: 'grid-flow-col',
      dense: 'grid-flow-dense',
      'row-dense': 'grid-flow-row-dense',
      'col-dense': 'grid-flow-col-dense',
    },
    autoCols: {
      none: '',
      auto: 'auto-cols-auto',
      min: 'auto-cols-min',
      max: 'auto-cols-max',
      fr: 'auto-cols-fr',
    },
    autoRows: {
      none: '',
      auto: 'auto-rows-auto',
      min: 'auto-rows-min',
      max: 'auto-rows-max',
      fr: 'auto-rows-fr',
    },
    justifyContent: {
      normal: 'justify-normal',
      center: 'justify-center',
      start: 'justify-start',
      end: 'justify-end',
      around: 'justify-around',
      evenly: 'justify-evenly',
      stretch: 'justify-stretch',
      between: 'justify-between',
      none: '',
    },
    justifyItems: {
      center: 'justify-items-center',
      start: 'justify-items-start',
      end: 'justify-items-end',
      stretch: 'justify-items-stretch',
      none: '',
    },
    alignContent: {
      normal: 'content-normal',
      center: 'content-center',
      start: 'content-start',
      end: 'content-end',
      around: 'content-around',
      evenly: 'content-evenly',
      baseline: 'content-baseline',
      stretch: 'content-stretch',
      between: 'content-between',
      none: '',
    },
    alignItems: {
      center: 'items-center',
      start: 'items-start',
      end: 'items-end',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
      none: '',
    },
    placeContent: {
      center: 'place-content-center',
      start: 'place-content-start',
      end: 'place-content-end',
      around: 'place-content-around',
      evenly: 'place-content-evenly',
      baseline: 'place-content-baseline',
      stretch: 'place-content-stretch',
      between: 'place-content-between',
      none: '',
    },
    placeItems: {
      center: 'place-items-center',
      start: 'place-items-start',
      end: 'place-items-end',
      baseline: 'place-items-baseline',
      stretch: 'place-items-stretch',
      none: '',
    },
    overflow: {
      none: '',
      auto: 'overflow-auto',
      hidden: 'overflow-hidden',
      clip: 'overflow-clip',
      visible: 'overflow-visible',
      scroll: 'overflow-scroll',
    },
    overflowX: {
      none: '',
      auto: 'overflow-x-auto',
      hidden: 'overflow-x-hidden',
      clip: 'overflow-x-clip',
      visible: 'overflow-x-visible',
      scroll: 'overflow-x-scroll',
    },
    overflowY: {
      none: '',
      auto: 'overflow-y-auto',
      hidden: 'overflow-y-hidden',
      clip: 'overflow-y-clip',
      visible: 'overflow-y-visible',
      scroll: 'overflow-y-scroll',
    },
  },
  defaultVariants: {
    display: 'grid',
    cols: 'none',
    rows: 'none',
    flow: 'none',
    autoCols: 'auto',
    autoRows: 'auto',
    justifyContent: 'normal',
    justifyItems: 'stretch',
    alignContent: 'normal',
    alignItems: 'stretch',
    placeContent: 'none',
    placeItems: 'none',
    overflow: 'none',
    overflowX: 'none',
    overflowY: 'none',
  },
})

export interface GridProps<T extends keyof JSX.IntrinsicElements>
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof gridVariants> {
  as?: T
  asChild?: boolean
}

const Grid = React.forwardRef<HTMLElement, GridProps<TContainerType>>(
  (
    {
      as = 'div',
      display,
      rows,
      cols,
      flow,
      autoCols,
      autoRows,
      justifyContent,
      justifyItems,
      alignContent,
      alignItems,
      placeContent,
      placeItems,
      overflow,
      overflowX,
      overflowY,
      className,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : (as as React.ElementType)

    if (as === 'span') {
      display = 'inline-grid'
    }

    return (
      <Comp
        className={cn(
          gridVariants({
            display,
            rows,
            cols,
            flow,
            autoCols,
            autoRows,
            justifyContent,
            justifyItems,
            alignContent,
            alignItems,
            placeContent,
            placeItems,
            overflow,
            overflowX,
            overflowY,
            className,
          })
        )}
        ref={ref as React.Ref<HTMLElement>}
        {...props}
      />
    )
  }
)

Grid.displayName = 'Grid'

export { Grid, gridVariants }
