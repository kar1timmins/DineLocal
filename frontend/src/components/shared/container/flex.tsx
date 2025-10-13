import { Slot } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import React, { JSX } from 'react';

import { TContainerType } from './types';
import { cn } from '@/lib/utils';

const flexVariants = cva('', {
  variants: {
    display: {
      flex: 'flex',
      'inline-flex': 'inline-flex',
      hidden: 'hidden',
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
    direction: {
      row: 'flex-row',
      'row-reverse': 'flex-row-reverse',
      column: 'flex-col',
      'column-reverse': 'flex-col-reverse',
    },
    wrap: {
      wrap: 'flex-wrap',
      'wrap-reverse': 'flex-wrap-reverse',
      nowrap: 'flex-nowrap',
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
    display: 'flex',
    justifyContent: 'start',
    alignContent: 'normal',
    alignItems: 'stretch',
    placeContent: 'none',
    direction: 'row',
    wrap: 'nowrap',
    overflow: 'none',
    overflowX: 'none',
    overflowY: 'none',
  },
});

export interface FlexProps<T extends keyof JSX.IntrinsicElements>
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof flexVariants> {
  as?: T;
  asChild?: boolean;
}

const Flex = React.forwardRef<HTMLElement, FlexProps<TContainerType>>(
  (
    {
      as = 'div',
      display,
      justifyContent,
      alignContent,
      alignItems,
      placeContent,
      direction,
      wrap,
      overflow,
      overflowX,
      overflowY,
      className,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : (as as React.ElementType);

    if (as === 'span') {
      display = 'inline-flex';
    }

    return (
      <Comp
        className={cn(
          flexVariants({
            display,
            justifyContent,
            alignContent,
            alignItems,
            placeContent,
            direction,
            wrap,
            overflow,
            overflowX,
            overflowY,
            className,
          })
        )}
        ref={ref as React.Ref<HTMLElement>}
        {...props}
      />
    );
  }
);

Flex.displayName = 'Flex';

export { Flex, flexVariants };
