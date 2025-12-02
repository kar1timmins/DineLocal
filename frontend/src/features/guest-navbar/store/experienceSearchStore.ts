import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import type { ExperienceItem } from '@/features/experiences/types'

// Re-export for backward compatibility
export type { ExperienceItem, Location } from '@/features/experiences/types'

interface ExperienceSearchState {
  // Criteria (Form State)
  location: string // REQUIRED
  searchTerm: string // Optional
  dateFrom: Date | null // Optional
  dateTo: Date | null // Optional
  guestCount: number // Optional (default: 2)

  // Results State
  experiences: ExperienceItem[]
  totalCount: number
  displayedCount: number // Max 10 in sheet/dialog

  // UI State
  isLoading: boolean
  error: string | null
  isSheetOpen: boolean // For mobile
  isDialogOpen: boolean // For desktop

  // Favorited IDs (synced with backend)
  favoritedExperienceIds: string[]

  // Actions
  setLocation: (location: string) => void
  setSearchTerm: (term: string) => void
  setDateRange: (from: Date | null, to: Date | null) => void
  setGuestCount: (count: number) => void
  search: () => Promise<void>
  clearCriteria: (keepLocation?: boolean) => void
  clearField: (field: 'searchTerm' | 'dateFrom' | 'dateTo' | 'guestCount') => void
  toggleSheet: () => void
  toggleDialog: () => void
  setSheetOpen: (open: boolean) => void
  setDialogOpen: (open: boolean) => void
  toggleFavorite: (experienceId: string) => Promise<void>
  reset: () => void
}

const initialState = {
  // Criteria
  location: '',
  searchTerm: '',
  dateFrom: null,
  dateTo: null,
  guestCount: 2,

  // Results
  experiences: [],
  totalCount: 0,
  displayedCount: 0,

  // UI
  isLoading: false,
  error: null,
  isSheetOpen: false,
  isDialogOpen: false,

  // Favorites
  favoritedExperienceIds: [],
}

export const useExperienceSearchStore = create<ExperienceSearchState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Set location (REQUIRED field)
      setLocation: (location: string) => {
        set({ location })
      },

      // Set search term (optional)
      setSearchTerm: (searchTerm: string) => {
        set({ searchTerm })
      },

      // Set date range (optional)
      setDateRange: (dateFrom: Date | null, dateTo: Date | null) => {
        set({ dateFrom, dateTo })
      },

      // Set guest count (optional)
      setGuestCount: (guestCount: number) => {
        set({ guestCount })
      },

      // Search for experiences
      search: async () => {
        const { location, searchTerm, dateFrom, dateTo, guestCount } = get()

        // Validate: Location is required
        if (!location.trim()) {
          set({ error: 'Location is required' })
          return
        }

        set({ isLoading: true, error: null })

        try {
          // Dynamic import to avoid circular dependency
          const { searchExperiences } = await import('../api/searchExperiences')

          const results = await searchExperiences({
            location,
            searchTerm,
            dateFrom,
            dateTo,
            guestCount,
          })

          // Limit to 10 for sheet/dialog display
          const displayedCount = Math.min(results.length, 10)

          set({
            experiences: results,
            totalCount: results.length,
            displayedCount,
            isLoading: false,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to search experiences',
            isLoading: false,
          })
        }
      },

      // Clear all criteria and reset to defaults
      // keepLocation: false = clear location (triggers auto-detect), true = keep current location
      clearCriteria: (keepLocation = false) => {
        set({
          location: keepLocation ? get().location : '',
          searchTerm: '',
          dateFrom: null,
          dateTo: null,
          guestCount: 2,
          // Clear results to show empty state
          experiences: [],
          totalCount: 0,
          displayedCount: 0,
          error: null,
        })
      },

      // Clear individual field
      clearField: (field) => {
        switch (field) {
          case 'searchTerm':
            set({ searchTerm: '' })
            break
          case 'dateFrom':
            set({ dateFrom: null, dateTo: null }) // Clear both dates
            break
          case 'dateTo':
            set({ dateTo: null })
            break
          case 'guestCount':
            set({ guestCount: 2 }) // Reset to default
            break
        }
      },

      // Toggle sheet (mobile) - closes dialog for mutual exclusion
      toggleSheet: () => {
        set((state) => ({
          isSheetOpen: !state.isSheetOpen,
          isDialogOpen: false,
        }))
      },

      // Toggle dialog (desktop) - closes sheet for mutual exclusion
      toggleDialog: () => {
        set((state) => ({
          isDialogOpen: !state.isDialogOpen,
          isSheetOpen: false,
        }))
      },

      // Set sheet open state
      setSheetOpen: (open: boolean) => {
        set({ isSheetOpen: open })
      },

      // Set dialog open state
      setDialogOpen: (open: boolean) => {
        set({ isDialogOpen: open })
      },

      // Toggle favorite (requires authentication)
      toggleFavorite: async (experienceId: string) => {
        const { favoritedExperienceIds, experiences } = get()
        const isFavorited = favoritedExperienceIds.includes(experienceId)

        try {
          if (isFavorited) {
            // Unfavorite
            set({
              favoritedExperienceIds: favoritedExperienceIds.filter((id) => id !== experienceId),
              experiences: experiences.map((exp) =>
                exp.id === experienceId ? { ...exp, isFavorited: false } : exp
              ),
            })

            // TODO: Call API to remove favorite
            // await removeFavorite(experienceId)
          } else {
            // Favorite
            set({
              favoritedExperienceIds: [...favoritedExperienceIds, experienceId],
              experiences: experiences.map((exp) =>
                exp.id === experienceId ? { ...exp, isFavorited: true } : exp
              ),
            })

            // TODO: Call API to add favorite
            // await addFavorite(experienceId)
          }
        } catch (error) {
          // Revert on error
          console.error('Failed to toggle favorite:', error)
          // Could show toast notification here
        }
      },

      // Reset to initial state
      reset: () => {
        set(initialState)
      },
    }),
    { name: 'ExperienceSearch' }
  )
)
