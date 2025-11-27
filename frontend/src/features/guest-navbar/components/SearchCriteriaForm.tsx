'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, Calendar, Users, X, Loader2, Minus, Plus, Check } from 'lucide-react'
import { format } from 'date-fns'
import { cva, type VariantProps } from 'class-variance-authority'
import { Button, Input, Separator } from '@/components/shared'
import { Box, Flex } from '@/components/shared/container'
import { Calendar as CalendarComponent } from '@/components/shared/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shared/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/shared/command'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/hooks'
import { useExperienceSearchStore } from '../store/experienceSearchStore'
import { searchLocations, detectUserLocation } from '../api/searchExperiences'
import type { Location } from '../store/experienceSearchStore'

const searchCriteriaFormVariants = cva(
  // Base styles (always applied)
  'flex rounded-lg border border-gray-200 bg-white',
  {
    variants: {
      layout: {
        vertical: 'flex-col',
        horizontal: 'flex-col md:flex-row md:items-center',
      },
    },
    defaultVariants: {
      layout: 'vertical', // Better UX: larger touch targets, clear hierarchy
    },
  }
)

export interface SearchCriteriaFormProps extends VariantProps<typeof searchCriteriaFormVariants> {
  className?: string
  showSearchField?: boolean // Sheet shows it, Dialog doesn't (search is in header)
}

/**
 * Unified grouped input search form (Airbnb-style)
 * Single border container with visual dividers between fields
 *
 * UX Laws Applied:
 * - Fitts's Law: Vertical layout = larger full-width touch targets
 * - Hick's Law: Clear top-to-bottom hierarchy reduces cognitive load
 * - Law of Proximity: Each field gets dedicated visual space
 * - Visual Hierarchy: Natural scanning pattern (top-to-bottom)
 * - Aesthetic-Usability: Premium feel with generous spacing
 */
export function SearchCriteriaForm({
  className,
  showSearchField = true,
  layout = 'vertical',
}: SearchCriteriaFormProps) {
  // Responsive behavior: 2 months on desktop, 1 month on mobile
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const {
    location,
    searchTerm,
    dateFrom,
    dateTo,
    guestCount,
    setLocation,
    setSearchTerm,
    setDateRange,
    setGuestCount,
  } = useExperienceSearchStore()

  // Local state for location autocomplete
  const [locationQuery, setLocationQuery] = useState(location)
  const [locationSuggestions, setLocationSuggestions] = useState<Location[]>([])
  const [isLoadingLocations, setIsLoadingLocations] = useState(false)
  const [locationPopoverOpen, setLocationPopoverOpen] = useState(false)
  const [isDetectingLocation, setIsDetectingLocation] = useState(false)

  // Date picker state
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const [dateRange, setDateRangeState] = useState<{ from: Date | undefined; to: Date | undefined }>(
    {
      from: dateFrom || undefined,
      to: dateTo || undefined,
    }
  )

  // Auto-detect location only on initial mount (not when user clears it)
  useEffect(() => {
    if (!location) {
      handleDetectLocation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run on mount

  // Sync locationQuery with store location
  useEffect(() => {
    setLocationQuery(location)
  }, [location])

  // Sync local dateRange state with store dateFrom/dateTo
  useEffect(() => {
    setDateRangeState({
      from: dateFrom || undefined,
      to: dateTo || undefined,
    })
  }, [dateFrom, dateTo])

  // Debounced location search
  useEffect(() => {
    if (!locationQuery || locationQuery.length < 2) {
      setLocationSuggestions([])
      setIsLoadingLocations(false)
      return
    }

    setIsLoadingLocations(true)

    const timer = setTimeout(async () => {
      try {
        const results = await searchLocations(locationQuery)
        setLocationSuggestions(results)
      } catch (error) {
        console.error('Failed to search locations:', error)
        setLocationSuggestions([])
      } finally {
        setIsLoadingLocations(false)
      }
    }, 300)

    return () => {
      clearTimeout(timer)
      setIsLoadingLocations(false)
    }
  }, [locationQuery])

  const handleDetectLocation = async () => {
    setIsDetectingLocation(true)
    try {
      const detectedLocation = await detectUserLocation()
      if (detectedLocation) {
        setLocation(detectedLocation)
        setLocationQuery(detectedLocation)
      }
    } catch (error) {
      console.error('Failed to detect location:', error)
    } finally {
      setIsDetectingLocation(false)
    }
  }

  const handleLocationSelect = (loc: Location) => {
    setLocation(loc.name)
    setLocationQuery('')
    setLocationPopoverOpen(false)
  }

  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDateRangeState(range)
    if (range.from && range.to) {
      setDateRange(range.from, range.to)
    } else if (range.from) {
      setDateRange(range.from, null)
    }
  }

  const handleClearDateRange = () => {
    setDateRangeState({ from: undefined, to: undefined })
    setDateRange(null, null)
  }

  const handleGuestCountChange = (increment: boolean) => {
    const newCount = increment ? guestCount + 1 : Math.max(1, guestCount - 1)
    setGuestCount(Math.min(50, newCount))
  }

  return (
    <Box className={cn(searchCriteriaFormVariants({ layout }), className)}>
      {/* Search Field (Optional - only in Sheet) */}
      {showSearchField && (
        <>
          <Flex alignItems="center" className="relative min-h-[56px] flex-1 px-4">
            <Search className="text-muted-foreground mr-3 h-5 w-5 flex-shrink-0" />
            <Input
              type="text"
              inputMode="search"
              placeholder="Italian, Thai, Mexican..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="placeholder:text-muted-foreground h-auto border-0 bg-transparent p-0 text-sm font-normal shadow-none focus-visible:ring-0"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground ml-2 h-8 w-8 flex-shrink-0 p-0"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </Flex>
        </>
      )}

      <Separator className="h-px bg-gray-200" />

      {/* Location + Date Fields: Responsive 2-column on desktop, vertical on mobile */}
      <Flex className="flex-col md:flex-row md:divide-x md:divide-gray-200">
        {/* Location Field (REQUIRED) */}
        <Flex alignItems="center" className="min-h-[56px] flex-1 px-4">
          <MapPin className="text-muted-foreground mr-3 h-5 w-5 flex-shrink-0" />
          <Popover open={locationPopoverOpen} onOpenChange={setLocationPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                role="combobox"
                aria-expanded={locationPopoverOpen}
                aria-required="true"
                disabled={isDetectingLocation}
                className={cn(
                  'h-auto flex-1 justify-start p-0 font-normal',
                  !location && 'hover:bg-transparent'
                )}
              >
                <span
                  className={cn(
                    'flex-1 text-left text-sm',
                    location ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {location || 'Where are you going? *'}
                </span>
                {isDetectingLocation && <Loader2 className="h-5 w-5 animate-spin" />}
                {location && !isDetectingLocation && (
                  <Box
                    role="button"
                    tabIndex={0}
                    className="text-muted-foreground hover:text-foreground flex h-8 w-8 items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation()
                      setLocation('')
                      setLocationQuery('')
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        e.stopPropagation()
                        setLocation('')
                        setLocationQuery('')
                      }
                    }}
                    aria-label="Clear location"
                  >
                    <X className="h-4 w-4" />
                  </Box>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder="Search locations..."
                  value={locationQuery}
                  onValueChange={setLocationQuery}
                />
                <CommandList>
                  {isLoadingLocations ? (
                    <CommandEmpty>
                      <Flex alignItems="center" justifyContent="center" className="gap-2 py-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Searching...</span>
                      </Flex>
                    </CommandEmpty>
                  ) : locationSuggestions.length === 0 && locationQuery.length >= 2 ? (
                    <CommandEmpty>No locations found. Try a different search.</CommandEmpty>
                  ) : (
                    <CommandGroup>
                      {locationSuggestions.map((loc) => (
                        <CommandItem
                          key={loc.id}
                          value={loc.name}
                          onSelect={() => handleLocationSelect(loc)}
                        >
                          <MapPin className="text-muted-foreground mr-2 h-5 w-5" />
                          <span>{loc.name}</span>
                          <Check
                            className={cn(
                              'ml-auto h-4 w-4',
                              location === loc.name ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </Flex>

        <Separator className="h-px bg-gray-200 md:hidden" />

        {/* Date Range Field */}
        <Flex alignItems="center" className="min-h-[56px] flex-1 px-4">
          <Calendar className="text-muted-foreground mr-3 h-5 w-5 flex-shrink-0" />
          <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  'h-auto flex-1 justify-start p-0 text-sm font-normal',
                  !dateRange.from && 'text-muted-foreground hover:bg-transparent'
                )}
              >
                <span className="flex-1 text-left">
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, 'MMM d')} - {format(dateRange.to, 'MMM d')}
                      </>
                    ) : (
                      format(dateRange.from, 'MMM d')
                    )
                  ) : (
                    'Add dates'
                  )}
                </span>
                {(dateRange.from || dateRange.to) && (
                  <Box
                    role="button"
                    tabIndex={0}
                    className="text-muted-foreground hover:text-foreground ml-2 flex h-8 w-8 flex-shrink-0 cursor-pointer items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleClearDateRange()
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        e.stopPropagation()
                        handleClearDateRange()
                      }
                    }}
                    aria-label="Clear date range"
                  >
                    <X className="h-4 w-4" />
                  </Box>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="range"
                selected={dateRange}
                onSelect={(range) =>
                  handleDateRangeChange({
                    from: range?.from,
                    to: range?.to,
                  })
                }
                disabled={(date) => date < new Date()}
                numberOfMonths={isDesktop ? 2 : 1}
              />
            </PopoverContent>
          </Popover>
        </Flex>
      </Flex>

      <Separator className="h-px bg-gray-200" />

      {/* Guest Count Field */}
      <Flex alignItems="center" className="relative min-h-[56px] flex-1 px-4">
        <Users className="text-muted-foreground mr-3 h-5 w-5 flex-shrink-0" />
        <span className="flex-1 text-sm font-normal">
          {guestCount} {guestCount === 1 ? 'guest' : 'guests'}
        </span>
        <Flex className="gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => handleGuestCountChange(false)}
            disabled={guestCount <= 1}
            aria-label="Decrease guest count"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => handleGuestCountChange(true)}
            disabled={guestCount >= 50}
            aria-label="Increase guest count"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}
