'use client'

import { Skeleton } from '@/components/shared'
import { Box, Flex } from '@/components/shared/container'
import { cn } from '@/lib/utils'

export interface ExperienceCardSkeletonProps {
  layout?: 'compact' | 'comfortable'
  className?: string
}

/**
 * Skeleton loading state for ExperienceCard
 * Matches the layout of ExperienceCard for smooth transitions
 */
export function ExperienceCardSkeleton({
  layout = 'compact',
  className,
}: ExperienceCardSkeletonProps) {
  if (layout === 'comfortable') {
    // Comfortable layout skeleton - Airbnb-style borderless (matches ExperienceCard)
    return (
      <Box className={cn(className)}>
        {/* Image Skeleton - rounded corners */}
        <Skeleton className="h-[220px] w-full rounded-xl md:h-[200px]" />

        {/* Content Skeleton - matches space-y-2 pt-3 */}
        <Box className="space-y-2 pt-3">
          {/* Group 1: Name + Rating, Location, Host (space-y-0) */}
          <Box className="space-y-0">
            <Flex justifyContent="between" alignItems="center" className="gap-2">
              <Skeleton className="h-5 w-3/5" />
              <Skeleton className="h-4 w-1/5" />
            </Flex>
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-4 w-1/3" />
          </Box>

          {/* Date/Time + Spots */}
          <Flex justifyContent="between" alignItems="center">
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-4 w-1/4" />
          </Flex>

          {/* Price */}
          <Skeleton className="h-5 w-1/3" />
        </Box>
      </Box>
    )
  }

  // Compact layout skeleton (mobile/drawer)
  return (
    <Flex
      alignItems="stretch"
      className={cn('bg-card gap-4 rounded-lg border p-3', className)}
    >
      {/* Image Skeleton: 140px width, flexible height (matches text) */}
      <Skeleton className="w-[140px] flex-shrink-0 rounded-md" />

      {/* Content Skeleton */}
      <Flex className="flex-1 flex-col justify-between py-0.5">
        {/* Top Section: Name + Location + Host */}
        <Box className="space-y-0.5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
        </Box>

        {/* Bottom Section */}
        <Box className="space-y-0.5">
          <Flex justifyContent="between">
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-3 w-1/4" />
          </Flex>
          <Flex justifyContent="between">
            <Skeleton className="h-3 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
          </Flex>
        </Box>
      </Flex>
    </Flex>
  )
}

/**
 * Multiple skeletons for list views
 */
export function ExperienceCardSkeletonList({
  count = 3,
  layout = 'compact',
  className,
}: {
  count?: number
  layout?: 'compact' | 'comfortable'
  className?: string
}) {
  return (
    <Box
      className={cn(
        layout === 'compact' && 'space-y-4',
        layout === 'comfortable' &&
          'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <ExperienceCardSkeleton key={i} layout={layout} className={className} />
      ))}
    </Box>
  )
}
