'use client'

import * as React from 'react'

import { VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { flexVariants } from './container/flex'
import { headingVariants } from './typography/heading'
import { paragraphVariants } from './typography/paragraph'

export interface CardProps extends React.ComponentProps<'div'>, VariantProps<typeof flexVariants> {}

function Card({
  display,
  justifyContent,
  alignContent,
  alignItems,
  placeContent,
  direction = 'column',
  wrap,
  overflow,
  overflowX,
  overflowY,
  className,
  ...props
}: CardProps) {
  return (
    <div
      data-slot="card"
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
        }),
        'bg-card text-card-foreground gap-6 rounded-xl border py-6 shadow-sm'
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className
      )}
      {...props}
    />
  )
}

export interface CardTitleProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof headingVariants> {}

function CardTitle({
  display,
  variant = 'h5',
  fontFamily,
  fontWeight,
  fontStyle,
  textAlign,
  textWrap,
  textColor,
  letterSpacing,
  lineHeight = 'none',
  textOverflow,
  className,
  ...props
}: CardTitleProps) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        headingVariants({
          display,
          variant,
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
      {...props}
    />
  )
}

export interface CardDescriptionProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof paragraphVariants> {}

function CardDescription({
  display,
  variant,
  fontWeight,
  fontStyle,
  textAlign,
  textWrap,
  textOverflow,
  textColor = 'muted',
  lineClamp,
  wordBreak,
  hyphens,
  whitespace,
  letterSpacing,
  lineHeight,
  className,
  ...props
}: CardDescriptionProps) {
  return (
    <div
      data-slot="card-description"
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
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('px-6', className)} {...props} />
}

export interface CardFooterProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof flexVariants> {}

function CardFooter({
  display,
  justifyContent,
  alignContent,
  alignItems = 'center',
  placeContent,
  direction,
  wrap,
  overflow,
  overflowX,
  overflowY,
  className,
  ...props
}: CardFooterProps) {
  return (
    <div
      data-slot="card-footer"
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
        }),
        'px-6 [.border-t]:pt-6'
      )}
      {...props}
    />
  )
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
