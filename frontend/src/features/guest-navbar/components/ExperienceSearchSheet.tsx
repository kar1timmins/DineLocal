'use client'

import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/shared/sheet'

import { useExperienceSearchStore } from '../store/experienceSearchStore'

import { SearchContent } from './SearchContent'

/**
 * Mobile fullscreen sheet for experience search
 * Uses shared SearchContent component for consistent UX with desktop Dialog
 *
 * UX Laws Applied:
 * - Fitts's Law: Touch targets ≥48px (lg buttons)
 * - Jakob's Law: Matches marketplace patterns (filters at top)
 * - Law of Proximity: Related elements grouped in SearchContent
 * - Visual Hierarchy: Clear header/body/footer separation
 * - Aesthetic-Usability: Consistent 16px padding throughout
 */
export function ExperienceSearchSheet() {
  const { isSheetOpen, toggleSheet } = useExperienceSearchStore()

  return (
    <Sheet open={isSheetOpen} onOpenChange={toggleSheet}>
      <SheetContent
        side="right"
        className="flex w-full flex-col sm:max-w-full [&>button:last-child]:hidden"
      >
        {/* Accessible title and description for screen readers */}
        <SheetTitle className="sr-only">Search dining experiences</SheetTitle>
        <SheetDescription className="sr-only">
          Search for authentic home-cooked meals by location, date, and number of guests
        </SheetDescription>

        {/* Shared search content (header + body + footer) */}
        <SearchContent onClose={toggleSheet} />
      </SheetContent>
    </Sheet>
  )
}
