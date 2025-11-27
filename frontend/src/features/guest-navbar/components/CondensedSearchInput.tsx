'use client'

import { Search } from 'lucide-react'
import { format } from 'date-fns'

import { Button } from '@/components/shared'
import { useExperienceSearchStore } from '../store/experienceSearchStore'

interface CondensedSearchInputProps {
  onClick: () => void
}

/**
 * Condensed search input shown on /search page navbar
 * Displays current search criteria: "Dublin, Ireland · 29 Nov - 29 Nov · 2 Guests"
 * On click, opens the search sheet (mobile) or dialog (desktop)
 */
export function CondensedSearchInput({ onClick }: CondensedSearchInputProps) {
  const { location, dateFrom, dateTo, guestCount } = useExperienceSearchStore()

  // Build secondary parts (dates, guests) - shown in muted color
  const secondaryParts: string[] = []
  if (dateFrom) {
    const fromStr = format(dateFrom, 'd MMM')
    if (dateTo) {
      const toStr = format(dateTo, 'd MMM')
      secondaryParts.push(`${fromStr} - ${toStr}`)
    } else {
      secondaryParts.push(fromStr)
    }
  }
  if (guestCount) {
    secondaryParts.push(`${guestCount} ${guestCount === 1 ? 'Guest' : 'Guests'}`)
  }

  const secondaryText = secondaryParts.length > 0 ? secondaryParts.join(' · ') : ''

  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="bg-background hover:bg-accent h-auto w-full justify-start gap-2 px-3 py-2 text-sm font-normal md:w-auto md:min-w-[280px] md:max-w-[400px]"
      aria-label="Edit search criteria"
    >
      <Search className="text-muted-foreground h-5 w-5 flex-shrink-0" />
      <span className="truncate">
        {location ? (
          <>
            <span className="text-foreground">{location}</span>
            {secondaryText && <span className="text-muted-foreground"> · {secondaryText}</span>}
          </>
        ) : (
          <span className="text-muted-foreground">Search experiences...</span>
        )}
      </span>
    </Button>
  )
}
