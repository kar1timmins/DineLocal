'use client'

import { useRouter } from 'next/navigation'
import { Search, AlertCircle } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/shared/alert'
import { Button, Skeleton } from '@/components/shared'
import { Box, Flex } from '@/components/shared/container'
import { Heading, Paragraph } from '@/components/shared/typography'
import { cn } from '@/lib/utils'
import { useExperienceSearchStore } from '../store/experienceSearchStore'
import { ExperienceCard } from '@/features/experiences/components/ExperienceCard'
import { ExperienceCardSkeletonList } from '@/features/experiences/components/ExperienceCardSkeleton'

export interface ExperienceSearchResultsProps {
  className?: string
}

/**
 * Experience search results display component
 * Handles:
 * - Loading skeleton state
 * - Empty state (before search)
 * - No results state (after search)
 * - Results list (up to 10 cards)
 * - "View all X experiences" sticky button when >10 results
 * - Favoriting experiences
 */
export function ExperienceSearchResults({ className }: ExperienceSearchResultsProps) {
  const router = useRouter()
  const {
    experiences,
    totalCount,
    displayedCount,
    isLoading,
    error,
    location,
    searchTerm,
    dateFrom,
    dateTo,
    guestCount,
    toggleFavorite,
    clearCriteria,
    setDialogOpen,
    setSheetOpen,
  } = useExperienceSearchStore()

  const hasSearched = experiences.length > 0 || error !== null
  const hasNoResults = hasSearched && experiences.length === 0 && !isLoading

  // Navigate to /search page with current criteria
  const handleViewAll = () => {
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (searchTerm) params.set('search', searchTerm)
    if (dateFrom) params.set('dateFrom', dateFrom.toISOString())
    if (dateTo) params.set('dateTo', dateTo.toISOString())
    if (guestCount !== 2) params.set('guests', guestCount.toString())

    // Close both dialogs before navigating (only one will be open at a time)
    setDialogOpen(false)
    setSheetOpen(false)

    router.push(`/search?${params.toString()}`)
  }

  // Show loading skeleton
  if (isLoading) {
    return (
      <Box className={cn(className)}>
        {/* Header skeleton */}
        <Flex alignItems="center" justifyContent="between" className="mb-2 px-1 pb-2">
          <Box className="space-y-1">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-36" />
          </Box>
          <Skeleton className="h-3 w-24" />
        </Flex>

        {/* Card skeletons */}
        <ExperienceCardSkeletonList count={5} layout="compact" />
      </Box>
    )
  }

  // Show error state
  if (error) {
    return (
      <Box className={cn('px-4 py-6', className)}>
        <Alert variant="error">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            {error}
            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() => clearCriteria(true)}
            >
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      </Box>
    )
  }

  // Show empty state (before search)
  if (!hasSearched && experiences.length === 0) {
    return (
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        className={cn('gap-4 px-4', className)}
      >
        <Box className="bg-muted flex size-20 items-center justify-center rounded-full">
          <Search className="text-muted-foreground size-10" />
        </Box>

        <Flex direction="column" alignItems="center" className="gap-2">
          <Heading as="h4" textWrap="wrap" className="text-center">
            Find an experience
          </Heading>
          <Paragraph textColor="muted" className="max-w-md text-center">
            Discover home-cooked meals hosted by locals near you.
          </Paragraph>
        </Flex>
      </Flex>
    )
  }

  // Show no results state (after search)
  if (hasNoResults) {
    return (
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        className={cn('gap-4 px-4 py-12', className)}
      >
        <Box className="bg-muted flex size-20 items-center justify-center rounded-full">
          <Search className="text-muted-foreground size-10" />
        </Box>

        <Flex direction="column" alignItems="center" className="gap-2">
          <Heading as="h4" textWrap="balance" className="text-center">
            Nothing found
          </Heading>
          <Paragraph textColor="muted" className="max-w-md text-center">
            Try adjusting your filters or search term.
          </Paragraph>
        </Flex>

        <Button variant="outline" onClick={() => clearCriteria(true)}>
          Clear search
        </Button>
      </Flex>
    )
  }

  // Show results
  return (
    <Box className={cn(className)}>
      {/* Results header */}
      <Flex
        alignItems="center"
        justifyContent="between"
        className="bg-background sticky -top-2 z-10 mb-2 px-1 pb-2"
      >
        {/* Left: Count + Location */}
        <Box>
          <Heading as="h3" className="text-sm font-semibold">
            {totalCount} {totalCount === 1 ? 'experience' : 'experiences'}
          </Heading>
          {location && (
            <Paragraph textColor="muted" variant="caption">
              near {location}
            </Paragraph>
          )}
        </Box>

        {/* Right: Pagination info */}
        {totalCount > displayedCount && (
          <Paragraph textColor="muted" variant="caption">
            Showing {displayedCount} of {totalCount}
          </Paragraph>
        )}
      </Flex>

      {/* Results list - no nested scrolling, parent handles scroll */}
      <Box className="space-y-4">
        {experiences.slice(0, displayedCount).map((experience, index) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            layout="compact"
            showHeart
            onFavoriteClick={toggleFavorite}
            onClick={() => router.push(`/experiences/${experience.id}`)}
            cardIndex={index}
          />
        ))}
      </Box>

      {/* "View all" button when >10 results */}
      {totalCount > displayedCount && (
        <Box className="pt-6">
          <Button
            className="w-full"
            variant={'outline'}
            onClick={handleViewAll}
            aria-label={`View all ${totalCount} experiences`}
          >
            View all {totalCount} experiences →
          </Button>
        </Box>
      )}
    </Box>
  )
}
