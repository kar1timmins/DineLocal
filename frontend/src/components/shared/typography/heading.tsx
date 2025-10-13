import { Slot } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import React, { JSX } from 'react';

import { cn } from '@/lib/utils';

export type THeadingElementType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

// "as" = controls the variant (for example: as = 'h3' -> variant = as)

const headingVariants = cva('', {
  variants: {
    display: {
      block: 'block',
      'inline-block': 'inline-block',
      inline: 'inline',
      hidden: 'hidden',
    },
    variant: {
      h1: 'scroll-m-20 text-4xl',
      h2: 'scroll-m-20 text-3xl',
      h3: 'scroll-m-20 text-2xl',
      h4: 'scroll-m-20 text-xl',
      h5: 'scroll-m-20 text-lg',
      h6: 'scroll-m-20 text-base',
    },
    fontWeight: {
      medium: 'font-medium',
      'semi-bold': 'font-semibold',
      bold: 'font-bold',
      'extra-bold': 'font-extrabold',
      black: 'font-black',
    },
    fontFamily: {
      default: 'font-inter',
      righteous: 'font-righteous',
    },
    fontStyle: {
      italic: 'italic',
      normal: '',
    },
    textAlign: {
      none: '',
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
      start: 'text-start',
      end: 'text-end',
    },
    textWrap: {
      wrap: 'text-wrap',
      nowrap: 'text-nowrap',
      balance: 'text-balance',
      pretty: 'text-pretty',
    },
    textColor: {
      default: 'text-foreground',
      primary: 'text-primary',
      muted: 'text-muted-foreground',
      gradient: 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text  text-transparent',
    },
    letterSpacing: {
      none: '',
      tighter: 'tracking-tighter',
      tight: 'tracking-tight',
      normal: 'tracking-normal',
      wide: 'tracking-wide',
      wider: 'tracking-wider',
      widest: 'tracking-widest',
    },
    lineHeight: {
      '3': 'leading-3',
      '4': 'leading-4',
      '5': 'leading-5',
      '6': 'leading-6',
      '7': 'leading-7',
      '8': 'leading-8',
      '9': 'leading-9',
      '10': 'leading-10',
      none: 'leading-none',
      tight: 'leading-tight',
      snug: 'leading-snug',
      normal: 'leading-normal',
      relaxed: 'leading-relaxed',
      loose: 'leading-loose',
    },
    textOverflow: {
      none: '',
      truncate: 'truncate',
      ellipsis: 'text-ellipsis',
      clip: 'text-clip',
    },
  },
  defaultVariants: {
    display: 'block',
    variant: 'h3',
    fontFamily: 'default',
    fontWeight: 'semi-bold',
    fontStyle: 'normal',
    textAlign: 'none',
    textWrap: 'nowrap',
    textColor: 'default',
    letterSpacing: 'tight',
    lineHeight: 'none',
    textOverflow: 'none',
  },
});

export interface HeadingProps<T extends keyof JSX.IntrinsicElements>
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headingVariants> {
  as?: T;
  asChild?: boolean;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps<THeadingElementType>>(
  (
    {
      as = 'h3',
      display,
      // variant,
      fontFamily,
      fontWeight,
      fontStyle,
      textAlign,
      textWrap,
      textColor,
      letterSpacing,
      lineHeight,
      textOverflow,
      className,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : (as as React.ElementType);

    return (
      <Comp
        className={cn(
          headingVariants({
            display,
            variant: as,
            fontFamily,
            fontWeight,
            fontStyle,
            textAlign,
            textWrap,
            textColor,
            letterSpacing,
            lineHeight,
            textOverflow,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Heading.displayName = 'Heading';

export { Heading, headingVariants };
