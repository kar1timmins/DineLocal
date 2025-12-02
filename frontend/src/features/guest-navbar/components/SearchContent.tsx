'use client'

import { X } from 'lucide-react'

import { Button } from '@/components/shared/button'
import { Box, Flex } from '@/components/shared/container'
import { Separator } from '@/components/shared/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shared/tooltip'
import { Heading } from '@/components/shared/typography'
import { cn } from '@/lib/utils'

import { useExperienceSearchStore } from '../store/experienceSearchStore'

import { ExperienceSearchResults } from './ExperienceSearchResults'
import { SearchCriteriaForm } from './SearchCriteriaForm'

export interface SearchContentProps {
  onClose: () => void
}

/**
 * Shared search content component used by both Sheet (mobile) and Dialog (desktop)
 *
 * Structure:
 * - Header: Title + Close button + Search criteria form (fixed)
 * - Body: Search results with centered empty states (scrollable)
 * - Footer: Clear + Search buttons (fixed)
 *
 * UX Laws Applied:
 * - Fitts's Law: Touch targets ≥48px, criteria always accessible
 * - Jakob's Law: Matches marketplace patterns (filters at top)
 * - Law of Proximity: Related elements grouped
 * - Visual Hierarchy: Clear header/body/footer separation
 * - Aesthetic-Usability: Consistent padding (p-4 = 16px)
 * - Scroll Affordance: Shadow appears when content scrolls below criteria
 */
export function SearchContent({ onClose }: SearchContentProps) {
  const { experiences, location, search, clearCriteria } = useExperienceSearchStore()

  const handleSearch = async () => {
    await search()
    // Results will show in the dialog - don't close!
  }

  const handleClear = () => {
    clearCriteria(false) // Clear location (triggers auto-detect in SearchCriteriaForm)
  }

  const isSearchDisabled = !location.trim()

  return (
    <div className="flex h-full flex-col">
      {/* Header - Title + Search Criteria (fixed) */}
      <Box>
        {/* Title Section - Centered with balanced layout */}
        <Box className="px-4 py-2.5">
          <Flex alignItems="center" justifyContent="between">
            {/* Invisible spacer to balance close button */}
            <div className="h-8 w-8" />
            <Heading as="h2" className="text-sm font-semibold">
              Search
            </Heading>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={onClose}
              aria-label="Close search"
            >
              <X className="h-4 w-4" />
            </Button>
          </Flex>
        </Box>

        <Separator />

        {/* Search Criteria Form */}
        <Box className="p-3">
          <SearchCriteriaForm showSearchField={true} layout="vertical" />
        </Box>
      </Box>

      {/* Body - Results only (scrollable, centers when empty) */}
      <Box
        className={cn(
          'flex-1 overflow-y-auto px-3 pt-1 pb-3',
          experiences.length === 0 && 'flex items-center justify-center'
        )}
      >
        <ExperienceSearchResults className="w-full" />
      </Box>

      {/* Footer - Action buttons (fixed) */}
      <Box className="border-t p-3">
        <Flex className="gap-3">
          <Button variant="outline" size="lg" onClick={handleClear} className="flex-1">
            Clear
          </Button>
          {isSearchDisabled ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex-1">
                    <Button
                      disabled
                      size="lg"
                      className="w-full"
                      aria-label="Find your table - Location is required"
                    >
                      Find your table
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Location is required</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button
              onClick={handleSearch}
              size="lg"
              className="flex-1"
              aria-label="Find your table"
            >
              Find your table
            </Button>
          )}
        </Flex>
      </Box>
    </div>
  )
}
