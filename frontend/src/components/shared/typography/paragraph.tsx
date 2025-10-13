import { Slot } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/lib/utils';

const paragraphVariants = cva('font-inter', {
  variants: {
    display: {
      block: 'block',
      'inline-block': 'inline-block',
      inline: 'inline',
      hidden: 'hidden',
    },
    variant: {
      caption: 'text-xs',
      default: 'text-sm',
      '16': 'text-base',
      '18': 'text-lg',
    },
    fontWeight: {
      medium: 'font-medium',
      light: 'font-light',
      normal: 'font-normal',
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
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
      muted: 'text-muted-foreground',
    },
    textOverflow: {
      none: '',
      truncate: 'truncate',
      ellipsis: 'text-ellipsis',
      clip: 'text-clip',
    },
    lineClamp: {
      none: '',
      '1': 'line-clamp-1',
      '2': 'line-clamp-2',
      '3': 'line-clamp-3',
      '4': 'line-clamp-4',
      '5': 'line-clamp-5',
      '6': 'line-clamp-6',
    },
    wordBreak: {
      none: '',
      'break-normal': 'break-normal',
      'break-words': 'break-words',
      'break-all': 'break-all',
      'break-keep': 'break-keep',
    },
    hyphens: {
      none: '',
      manual: 'hyphens-manual',
      auto: 'hyphens-auto',
    },
    whitespace: {
      none: '',
      normal: 'whitespace-normal',
      nowrap: 'whitespace-nowrap',
      pre: 'whitespace-pre',
      'pre-line': 'whitespace-pre-line',
      'pre-wrap': 'whitespace-pre-wrap',
      'break-spaces': 'whitespace-break-spaces',
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
  },
  defaultVariants: {
    display: 'block',
    variant: 'default',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'none',
    textWrap: 'pretty',
    textOverflow: 'none',
    textColor: 'default',
    lineClamp: 'none',
    wordBreak: 'none',
    hyphens: 'none',
    whitespace: 'none',
    letterSpacing: 'none',
    lineHeight: 'normal',
  },
});

export interface ParagraphProps
  extends React.ComponentPropsWithoutRef<'p'>,
    VariantProps<typeof paragraphVariants> {
  asChild?: boolean;
}

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  (
    {
      display,
      variant,
      fontWeight,
      fontStyle,
      textAlign,
      textWrap,
      textOverflow,
      textColor,
      lineClamp,
      wordBreak,
      hyphens,
      whitespace,
      letterSpacing,
      lineHeight,
      className,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'p';

    return (
      <Comp
        className={cn(
          paragraphVariants({
            display,
            variant,
            fontWeight,
            fontStyle,
            textAlign,
            textWrap,
            textColor,
            textOverflow,
            lineClamp,
            wordBreak,
            hyphens,
            whitespace,
            letterSpacing,
            lineHeight,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Paragraph.displayName = 'Paragraph';

export { Paragraph, paragraphVariants };
