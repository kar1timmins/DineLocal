'use client'

import { useEffect, useState } from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const appLoaderVariants = cva('flex flex-col items-center justify-center gap-6', {
  variants: {
    variant: {
      fullscreen: 'fixed inset-0 z-[9999] bg-background',
      inline: 'w-full py-8',
      overlay: 'fixed inset-0 z-[9998] bg-black/10 backdrop-blur-sm',
    },
    size: {
      sm: 'gap-5',
      md: 'gap-6',
      lg: 'gap-8',
    },
  },
  defaultVariants: {
    variant: 'fullscreen',
    size: 'md',
  },
})

// Dot size based on loader size
const dotSizeMap = {
  sm: 'size-2.5',
  md: 'size-3',
  lg: 'size-4',
} as const

export interface AppLoaderProps extends VariantProps<typeof appLoaderVariants> {
  /** Loading message */
  label?: string

  /** Show/hide loader */
  isLoading?: boolean

  /** Minimum display time to prevent flash (ms) */
  minDuration?: number

  /** Optional delay before showing (ms) */
  delay?: number

  /** Custom className for styling */
  className?: string

  /** Accessibility label for screen readers */
  ariaLabel?: string
}

/**
 * AppLoader - Loading indicator for DineLocal app
 *
 * Features:
 * - Three variants: fullscreen, inline, overlay
 * - Playful bouncing dots animation
 * - Configurable display timing (minDuration, delay)
 * - WCAG 2.2 AA compliant
 * - Respects prefers-reduced-motion
 *
 * @example
 * ```tsx
 * // Fullscreen loader
 * <AppLoader variant="fullscreen" label="Loading app..." isLoading />
 *
 * // Inline loader
 * <AppLoader variant="inline" isLoading/>
 *
 * // With React Query
 * {isLoading && <AppLoader variant="overlay" label="Submitting..." isLoading23w/>}
 * ```
 */
export function AppLoader({
  variant = 'fullscreen',
  label,
  isLoading,
  minDuration = 300,
  delay = variant === 'fullscreen' ? 0 : 200,
  size = 'md',
  className,
  ariaLabel = 'Loading content',
}: AppLoaderProps) {
  const [shouldShow, setShouldShow] = useState(delay === 0)
  const [isVisible, setIsVisible] = useState(false)

  // Handle delay before showing loader
  useEffect(() => {
    if (!isLoading) {
      setShouldShow(false)
      return
    }

    if (delay === 0) {
      setShouldShow(true)
      return
    }

    const delayTimer = setTimeout(() => {
      setShouldShow(true)
    }, delay)

    return () => clearTimeout(delayTimer)
  }, [isLoading, delay])

  // Handle minimum duration
  useEffect(() => {
    if (!shouldShow) {
      setIsVisible(false)
      return
    }

    setIsVisible(true)

    if (!isLoading && minDuration > 0) {
      const minTimer = setTimeout(() => {
        setIsVisible(false)
      }, minDuration)

      return () => clearTimeout(minTimer)
    }
  }, [shouldShow, isLoading, minDuration])

  // Don't render if not visible
  if (!isVisible) return null

  // Get dot size based on size variant
  const dotSize = dotSizeMap[size ?? 'md']

  return (
    <div
      className={cn(appLoaderVariants({ variant, size }), className)}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={ariaLabel}
    >
      {/* Bouncing Dots */}
      <div className="flex gap-2" aria-hidden="true">
        <span
          className={cn(
            dotSize,
            'animate-bounce-playful bg-primary rounded-full',
            '[animation-delay:-0.3s]',
            // Reduce motion for accessibility
            'motion-reduce:animate-pulse'
          )}
        ></span>
        <span
          className={cn(
            dotSize,
            'animate-bounce-playful bg-primary rounded-full',
            '[animation-delay:-0.15s]',
            'motion-reduce:animate-pulse'
          )}
        ></span>
        <span
          className={cn(
            dotSize,
            'animate-bounce-playful bg-primary rounded-full',
            'motion-reduce:animate-pulse'
          )}
        ></span>
      </div>

      {/* Loading Label */}
      {label && (
        <p className="animate-in fade-in text-foreground text-base font-medium duration-200">
          <span>{label}</span>
          <span className="loading-dots"></span>
        </p>
      )}
    </div>
  )
}
