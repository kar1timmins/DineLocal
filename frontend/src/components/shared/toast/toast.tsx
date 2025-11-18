'use client'

import React, { ReactNode } from 'react'

import { cva, VariantProps } from 'class-variance-authority'
import {
  Bell,
  CheckCircle2Icon,
  CircleX,
  InfoIcon,
  PopcornIcon,
  TriangleAlert,
  X,
} from 'lucide-react'
import { toast as sonnerToast } from 'sonner'

import { Button } from '@/components/shared'
import { Box, Flex } from '@/components/shared/container'
import { cn } from '@/lib/utils'

type ButtonVariants =
  | 'default'
  | 'error'
  | 'warning'
  | 'success'
  | 'outline'
  | 'outline-primary'
  | 'outline-success'
  | 'outline-warning'
  | 'outline-error'
  | 'secondary'
  | 'secondary-primary'
  | 'secondary-success'
  | 'secondary-error'
  | 'secondary-warning'
  | 'ghost'
  | 'ghost-primary'
  | 'ghost-error'
  | 'ghost-success'
  | 'ghost-warning'
  | 'link'

type ToastButton = {
  label: ReactNode
  variant?: ButtonVariants
  className?: string
  iconStart?: React.ReactNode | null
  iconEnd?: React.ReactNode | null
  isLoading?: boolean
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const toastVariants = cva(
  "relative group w-full md:min-w-[364px] md:max-w-[364px] rounded-lg border px-4 py-3 items-center [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 [&_svg]:mb-auto [&_svg]:translate-y-[2px] [&_svg]:text-current",
  {
    variants: {
      variant: {
        default:
          "bg-card text-card-foreground [&_[data-slot='toast-description']]:text-gray-600 border border-gray-200",
        error:
          "text-error [&_[data-slot='toast-title']]:text-error [&_[data-slot='toast-description']]:text-error bg-error-50 border border-error-200",
        warning:
          "text-warning-600 [&_[data-slot='toast-title']]:text-warning-600 [&_[data-slot='toast-description']]:text-warning-600/90 bg-warning-50 border border-warning-200",
        success:
          "text-success-600 [&_[data-slot='toast-title']]:text-success-600 [&_[data-slot='toast-description']]:text-success-600/90 bg-success-50 border border-success-200",
        info: "text-primary-700 [&_[data-slot='toast-title']]:text-primary-600 [&_[data-slot='toast-description']]:text-primary-600/90 bg-primary-50 border border-primary-200",
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

type ToastProps = VariantProps<typeof toastVariants> &
  React.ComponentProps<'div'> & {
    id: any
    title?: string
    description?: string
    actionButton?: ToastButton
    cancelButton?: ToastButton
    customButton?: ReactNode
    className?: string
    noToastIcon?: boolean
    customToastIcon?: ReactNode
    showCloseBtn?: boolean
  }

function Toast({
  id,
  variant = 'default',
  noToastIcon = false,
  customToastIcon = null,
  title,
  description,
  actionButton,
  cancelButton,
  className,
  showCloseBtn,
}: ToastProps) {
  function renderIcons() {
    if (noToastIcon) return null

    if (customToastIcon) return customToastIcon

    if (variant == 'info') {
      return <InfoIcon />
    }

    if (variant == 'success') {
      return <CheckCircle2Icon />
    }

    if (variant == 'warning') {
      return <TriangleAlert />
    }

    if (variant == 'error') {
      return <CircleX />
    }

    return <Bell />
  }

  function handleXVariant(): ButtonVariants {
    if (variant == 'info') {
      return 'ghost-primary'
    }

    if (variant == 'success') {
      return 'ghost-success'
    }

    if (variant == 'warning') {
      return 'ghost-warning'
    }

    if (variant == 'error') {
      return 'ghost-error'
    }

    return 'ghost'
  }

  return (
    <Box className={cn(toastVariants({ variant }), className)}>
      <Flex alignItems={'start'} className="gap-3">
        {renderIcons()}

        <Box className="min-w-0 flex-1">
          {title && (
            <p data-slot="toast-title" className="text-sm font-semibold">
              {title}
            </p>
          )}
          {description && (
            <p data-slot="toast-description" className="text-sm">
              {description}
            </p>
          )}

          {(actionButton || cancelButton) && (
            <Flex alignItems={'center'} className="mt-3 gap-2">
              {actionButton && (
                <Button
                  variant={actionButton.variant || 'secondary-dark'}
                  onClick={(e) => {
                    actionButton.onClick(e)
                    sonnerToast.dismiss(id)
                  }}
                  size={'sm'}
                  className={`rounded transition-colors duration-200`}
                >
                  {actionButton.label}
                </Button>
              )}
              {cancelButton && (
                <Button
                  variant={cancelButton.variant || 'ghost'}
                  onClick={(e) => {
                    cancelButton.onClick(e)
                    sonnerToast.dismiss(id)
                  }}
                  size={'sm'}
                  className={`rounded transition-colors duration-200`}
                >
                  {cancelButton.label}
                </Button>
              )}
            </Flex>
          )}
        </Box>
      </Flex>
      <Box className="absolute top-1 right-1 flex-shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:opacity-80">
        <Button variant={handleXVariant()} size={'icon-xs'} onClick={() => sonnerToast.dismiss(id)}>
          <X />
        </Button>
      </Box>
    </Box>
  )
}

/** I recommend abstracting the toast function
 *  so that you can call it without having to use toast.custom everytime. */
export function customToast(toast: Omit<ToastProps, 'id'>) {
  return sonnerToast.custom((id) => (
    <Toast
      id={id as string}
      title={toast.title}
      description={toast.description}
      variant={toast.variant}
      actionButton={toast.actionButton}
      cancelButton={toast.cancelButton}
      noToastIcon={toast.noToastIcon}
      customToastIcon={toast.customToastIcon}
      className={toast.className}
      showCloseBtn={toast.showCloseBtn}
    />
  ))
}
