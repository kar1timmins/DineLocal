"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"
import { headingVariants } from "./typography/heading"
import { VariantProps } from "class-variance-authority"
import { flexVariants } from "./container/flex"
import { paragraphVariants } from "./typography/paragraph"
import { Box } from "./container"
import { Spinner } from "./spinner"

function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

export interface AlertDialogHeaderProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof flexVariants> {}

function AlertDialogHeader({
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
}: AlertDialogHeaderProps) {
  return (
    <div
      data-slot="alert-dialog-header"
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
      'gap-2 text-center sm:text-left'
    )}
    {...props}
    />
  )
}

export interface AlertDialogFooterProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof flexVariants> {}

function AlertDialogFooter({
  display,
  justifyContent,
  alignContent,
  alignItems,
  placeContent,
  direction = 'column-reverse',
  wrap,
  overflow,
  overflowX,
  overflowY,
  className,
  ...props
}: AlertDialogFooterProps) {
  return (
    <div
      data-slot="alert-dialog-footer"
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
        'gap-2 sm:flex-row sm:justify-end'
      )}
      {...props}
    />
  )
}


export interface AlertDialogTitleProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>,
    VariantProps<typeof headingVariants> {}

function AlertDialogTitle({
  display,
  variant = 'h5',
  fontFamily,
  fontWeight,
  fontStyle,
  textAlign,
  textWrap,
  textColor,
  letterSpacing = 'none',
  lineHeight,
  textOverflow,
  className,
  ...props
}: AlertDialogTitleProps) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
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

export interface AlertDialogDescriptionProps
  extends React.ComponentProps<typeof AlertDialogPrimitive.Description>,
    VariantProps<typeof paragraphVariants> {}

function AlertDialogDescription({
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
}: AlertDialogDescriptionProps) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
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

export interface AlertDialogActionProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>,
    VariantProps<typeof buttonVariants> {
  iconStart?: React.ReactNode | null;
  iconEnd?: React.ReactNode | null;
  isLoading?: boolean;
}


function AlertDialogAction({
  isLoading,
  iconStart = null,
  iconEnd = null,
  variant,
  size,
  children,
  className,
  ...props
}: AlertDialogActionProps) {
  function renderLoader() {
      return (
        <Box className="w-[50px]">
          <Spinner/>
        </Box>
      );
    }

  function renderContent() {
    return (
      <>
        {iconStart && iconStart}
        {children && children}
        {iconEnd && iconEnd}
      </>
    );
  }
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
        {!isLoading ? renderContent() : renderLoader()}
    </AlertDialogPrimitive.Action>
  )
}

function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: "outline" }), className)}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
