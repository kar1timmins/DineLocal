import { Suspense } from 'react'
import { Metadata } from 'next'

import { Box } from '@/components/shared/container'
import { ExperienceCardSkeletonList } from '@/features/experiences/components/ExperienceCardSkeleton'
import { SearchPageContent } from '@/features/experiences/pages/SearchPageContent'

export const metadata: Metadata = {
  title: 'Search Dining Experiences | DineLocal',
  description:
    'Discover authentic home-cooked meals hosted by passionate locals in your area. Search by location, cuisine, date, and number of guests.',
}

interface SearchPageProps {
  searchParams: Promise<{
    location?: string
    search?: string
    dateFrom?: string
    dateTo?: string
    guests?: string
  }>
}

/**
 * Search page for dining experiences
 * Server Component that reads URL searchParams
 * Passes params to SearchPageContent client component
 * Next.js 15: searchParams is async and must be awaited
 */
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams

  return (
    <Suspense
      fallback={
        <Box className="container mx-auto max-w-7xl px-4 py-8">
          <ExperienceCardSkeletonList count={6} layout="comfortable" />
        </Box>
      }
    >
      <SearchPageContent
        initialLocation={params.location}
        initialSearch={params.search}
        initialDateFrom={params.dateFrom}
        initialDateTo={params.dateTo}
        initialGuests={params.guests}
      />
    </Suspense>
  )
}
