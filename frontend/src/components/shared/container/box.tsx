import React, { JSX } from 'react'

import { Slot } from '@radix-ui/react-slot'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { TContainerType } from './types'

//Box can act as a child to Grid or Flex

const boxVariants = cva('', {
  variants: {
    display: {
      block: 'block',
      'inline-block': 'inline-block',
      inline: 'inline',
      hidden: 'hidden',
      contents: 'contents',
      'flow-root': 'flow-root',
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
    justifySelf: {
      auto: 'justify-self-auto',
      center: 'justify-self-center',
      start: 'justify-self-start',
      end: 'justify-self-end',
      stretch: 'justify-self-stretch',
      none: '',
    },
    alignSelf: {
      auto: 'self-auto',
      center: 'self-center',
      start: 'self-start',
      end: 'self-end',
      baseline: 'self-baseline',
      stretch: 'self-stretch',
      none: '',
    },
    placeSelf: {
      auto: 'place-self-auto',
      center: 'place-self-center',
      start: 'place-self-start',
      end: 'place-self-end',
      stretch: 'place-self-stretch',
      none: '',
    },
    flexGrow: {
      none: '',
      '0': 'grow-0',
      '1': 'grow',
    },
    flexShrink: {
      none: '',
      '0': 'shrink-0',
      '1': 'shrink',
    },
    flex: {
      '1': 'flex-1',
      auto: 'flex-auto',
      initial: 'flex-initial',
      none: '',
    },
    order: {
      '1': 'order-1',
      '2': 'order-2',
      '3': 'order-3',
      '4': 'order-4',
      '5': 'order-5',
      '6': 'order-6',
      '7': 'order-7',
      '8': 'order-8',
      '9': 'order-9',
      '10': 'order-10',
      '11': 'order-11',
      '12': 'order-12',
      first: 'order-first',
      last: 'order-last',
      none: '',
    },
    gridColumnSpan: {
      none: '',
      auto: 'col-auto',
      full: 'col-span-full',
      '1': 'col-span-1',
      '2': 'col-span-2',
      '3': 'col-span-3',
      '4': 'col-span-4',
      '5': 'col-span-5',
      '6': 'col-span-6',
      '7': 'col-span-7',
      '8': 'col-span-8',
      '9': 'col-span-9',
      '10': 'col-span-10',
      '11': 'col-span-11',
      '12': 'col-span-12',
    },
    gridColumnStart: {
      none: '',
      auto: 'col-start-auto',
      '1': 'col-start-1',
      '2': 'col-start-2',
      '3': 'col-start-3',
      '4': 'col-start-4',
      '5': 'col-start-5',
      '6': 'col-start-6',
      '7': 'col-start-7',
      '8': 'col-start-8',
      '9': 'col-start-9',
      '10': 'col-start-10',
      '11': 'col-start-11',
      '12': 'col-start-12',
      '13': 'col-start-13',
    },
    gridColumnEnd: {
      none: '',
      auto: 'col-end-auto',
      '1': 'col-end-1',
      '2': 'col-end-2',
      '3': 'col-end-3',
      '4': 'col-end-4',
      '5': 'col-end-5',
      '6': 'col-end-6',
      '7': 'col-end-7',
      '8': 'col-end-8',
      '9': 'col-end-9',
      '10': 'col-end-10',
      '11': 'col-end-11',
      '12': 'col-end-12',
      '13': 'col-end-13',
    },
    gridRowSpan: {
      none: '',
      auto: 'row-auto',
      full: 'row-span-full',
      '1': 'row-span-1',
      '2': 'row-span-2',
      '3': 'row-span-3',
      '4': 'row-span-4',
      '5': 'row-span-5',
      '6': 'row-span-6',
      '7': 'row-span-7',
      '8': 'row-span-8',
      '9': 'row-span-9',
      '10': 'row-span-10',
      '11': 'row-span-11',
      '12': 'row-span-12',
    },
    gridRowStart: {
      none: '',
      auto: 'row-start-auto',
      '1': 'row-start-1',
      '2': 'row-start-2',
      '3': 'row-start-3',
      '4': 'row-start-4',
      '5': 'row-start-5',
      '6': 'row-start-6',
      '7': 'row-start-7',
      '8': 'row-start-8',
      '9': 'row-start-9',
      '10': 'row-start-10',
      '11': 'row-start-11',
      '12': 'row-start-12',
      '13': 'row-start-13',
    },
    gridRowEnd: {
      none: '',
      auto: 'row-end-auto',
      '1': 'row-end-1',
      '2': 'row-end-2',
      '3': 'row-end-3',
      '4': 'row-end-4',
      '5': 'row-end-5',
      '6': 'row-end-6',
      '7': 'row-end-7',
      '8': 'row-end-8',
      '9': 'row-end-9',
      '10': 'row-end-10',
      '11': 'row-end-11',
      '12': 'row-end-12',
      '13': 'row-end-13',
    },
  },
  defaultVariants: {
    display: 'block',
    overflow: 'none',
    overflowX: 'none',
    overflowY: 'none',
    justifySelf: 'none',
    alignSelf: 'none',
    placeSelf: 'none',
    flexGrow: 'none',
    flexShrink: 'none',
    flex: 'none',
    order: 'none',
    gridColumnSpan: 'none',
    gridColumnStart: 'none',
    gridColumnEnd: 'none',
    gridRowSpan: 'none',
    gridRowStart: 'none',
    gridRowEnd: 'none',
  },
})

export interface BoxProps<T extends keyof JSX.IntrinsicElements>
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof boxVariants> {
  as?: T
  asChild?: boolean
}

const Box = React.forwardRef<HTMLElement, BoxProps<TContainerType>>(
  (
    {
      as = 'div',
      display,
      overflow,
      overflowX,
      overflowY,
      justifySelf,
      alignSelf,
      placeSelf,
      flexGrow,
      flexShrink,
      flex,
      order,
      gridColumnSpan,
      gridColumnStart,
      gridColumnEnd,
      gridRowSpan,
      gridRowStart,
      gridRowEnd,
      className,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : (as as React.ElementType)

    if (as === 'span') {
      display = 'inline-block'
    }

    return (
      <Comp
        className={cn(
          boxVariants({
            display,
            overflow,
            overflowX,
            overflowY,
            justifySelf,
            alignSelf,
            placeSelf,
            flexGrow,
            flexShrink,
            flex,
            order,
            gridColumnSpan,
            gridColumnStart,
            gridColumnEnd,
            gridRowSpan,
            gridRowStart,
            gridRowEnd,
            className,
          })
        )}
        ref={ref as React.Ref<HTMLElement>}
        {...props}
      />
    )
  }
)

Box.displayName = 'Box'

export { Box, boxVariants }
