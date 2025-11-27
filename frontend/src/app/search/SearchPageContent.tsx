'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, AlertCircle, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { Box, Flex } from '@/components/shared/container'
import { Heading, Paragraph } from '@/components/shared/typography'
import { Alert, AlertTitle, AlertDescription } from '@/components/shared/alert'
import { Button, Skeleton } from '@/components/shared'
import { GuestNavbar } from '@/features/guest-navbar/components'
import { useExperienceSearchStore } from '@/features/guest-navbar/store/experienceSearchStore'
import { ExperienceCard } from '@/features/experiences/components/ExperienceCard'
import { ExperienceCardSkeletonList } from '@/features/experiences/components/ExperienceCardSkeleton'

interface SearchPageContentProps {
  initialLocation?: string
  initialSearch?: string
  initialDateFrom?: string
  initialDateTo?: string
  initialGuests?: string
}

/**
 * Client component for /search page
 * Syncs URL searchParams with Zustand store
 * Displays results in 2-column grid (comfortable layout)
 * Updates URL on search criteria changes
 */
export function SearchPageContent({
  initialLocation,
  initialSearch,
  initialDateFrom,
  initialDateTo,
  initialGuests,
}: SearchPageContentProps) {
  const router = useRouter()
  const [hasInitialized, setHasInitialized] = useState(false)

  const {
    location,
    experiences,
    totalCount,
    isLoading,
    error,
    setLocation,
    setSearchTerm,
    setDateRange,
    setGuestCount,
    search,
    toggleFavorite,
    clearCriteria,
  } = useExperienceSearchStore()

  // Initialize store from URL params on mount
  useEffect(() => {
    if (!hasInitialized) {
      if (initialLocation) setLocation(initialLocation)
      if (initialSearch) setSearchTerm(initialSearch)
      if (initialDateFrom)
        setDateRange(new Date(initialDateFrom), initialDateTo ? new Date(initialDateTo) : null)
      if (initialGuests) setGuestCount(parseInt(initialGuests, 10))

      // Auto-search if location is provided
      if (initialLocation) {
        search()
      }

      setHasInitialized(true)
    }
  }, [
    hasInitialized,
    initialLocation,
    initialSearch,
    initialDateFrom,
    initialDateTo,
    initialGuests,
    setLocation,
    setSearchTerm,
    setDateRange,
    setGuestCount,
    search,
  ])

  // Show error state
  if (error) {
    return (
      <Box className="container mx-auto max-w-7xl px-4 py-12">
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

  return (
    <>
      <GuestNavbar />
      <Box className="container mx-auto max-w-screen-2xl px-4 pt-0 pb-8 md:pt-4">
        {/* Results Section */}
        <Box>
          {/* Sticky Results Header */}
          {!isLoading && experiences.length > 0 && (
            <Flex
              alignItems="center"
              justifyContent="between"
              className="bg-background sticky top-0 z-10 mb-2 py-4"
            >
              {/* Left: Count + Location */}
              <Box>
                <Heading as="h2" className="text-base font-semibold">
                  {totalCount} {totalCount === 1 ? 'experience' : 'experiences'}
                </Heading>
                <Paragraph textColor="muted" variant="default">
                  near {location || 'all locations'}
                </Paragraph>
              </Box>

              {/* Right: Filter + Sort */}
              <Flex className="gap-2">
                <Button variant="outline" size="sm">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden md:inline">Filters</span>
                </Button>
                <Button variant="outline" size="sm">
                  <span className="hidden md:inline">Sort</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </Flex>
            </Flex>
          )}

          {/* Loading State */}
          {isLoading && (
            <>
              {/* Header skeleton */}
              <Flex
                alignItems="center"
                justifyContent="between"
                className="bg-background sticky top-0 z-10 mb-2 py-4"
              >
                <Box className="space-y-1">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-40" />
                </Box>
                <Flex className="gap-2">
                  <Skeleton className="h-9 w-20 rounded-md" />
                  <Skeleton className="h-9 w-16 rounded-md" />
                </Flex>
              </Flex>

              {/* Card skeletons */}
              <ExperienceCardSkeletonList count={6} layout="comfortable" />
            </>
          )}

          {/* Generic Empty State - No results */}
          {!isLoading && experiences.length === 0 && (
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="center"
              className="min-h-[calc(100vh-200px)] gap-4 px-4 py-12"
            >
              <Box className="bg-muted flex size-24 items-center justify-center rounded-full">
                <Search className="text-muted-foreground size-12" />
              </Box>

              <Flex direction="column" alignItems="center" className="gap-2">
                <Heading as="h3" className="text-center">
                  Nothing found
                </Heading>
                <Paragraph textColor="muted" className="max-w-md text-center">
                  Try adjusting your filters or explore other experiences nearby.
                </Paragraph>
              </Flex>

              <Button variant="outline" onClick={() => router.push('/')}>
                Go to Home
              </Button>
            </Flex>
          )}

          {/* Results Grid (responsive comfortable layout) */}
          {!isLoading && experiences.length > 0 && (
            <Box className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {experiences.map((experience, index) => (
                <ExperienceCard
                  key={experience.id}
                  experience={experience}
                  layout="comfortable"
                  showHeart
                  onFavoriteClick={toggleFavorite}
                  onClick={() => router.push(`/experiences/${experience.id}`)}
                  cardIndex={index}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </>
  )
}
