import type { ExperienceItem, Location } from '@/features/experiences/types'

import { DUMMY_EXPERIENCES, DUMMY_LOCATIONS } from './dummyData'

export interface SearchCriteria {
  location: string
  searchTerm?: string
  dateFrom?: Date | null
  dateTo?: Date | null
  guestCount?: number
}

/**
 * Search for dining experiences based on criteria
 * Currently uses dummy data, will be replaced with real API calls
 */
export async function searchExperiences(criteria: SearchCriteria): Promise<ExperienceItem[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  let results = [...DUMMY_EXPERIENCES]

  // Filter by location (REQUIRED)
  if (criteria.location) {
    const locationLower = criteria.location.toLowerCase()
    results = results.filter((exp) => exp.location.toLowerCase().includes(locationLower))
  }

  // Filter by search term (optional)
  if (criteria.searchTerm && criteria.searchTerm.trim()) {
    const searchLower = criteria.searchTerm.toLowerCase()
    results = results.filter(
      (exp) =>
        exp.name.toLowerCase().includes(searchLower) ||
        exp.cuisine.toLowerCase().includes(searchLower) ||
        exp.description.toLowerCase().includes(searchLower) ||
        exp.menu_description?.toLowerCase().includes(searchLower) ||
        exp.tags?.some((tag) => tag.toLowerCase().includes(searchLower)) ||
        exp.dietary_info?.some((diet) => diet.toLowerCase().includes(searchLower))
    )
  }

  // Filter by date range (optional)
  if (criteria.dateFrom && criteria.dateTo) {
    const fromTime = criteria.dateFrom.getTime()
    const toTime = criteria.dateTo.getTime()

    results = results.filter((exp) => {
      const eventTime = new Date(exp.event_date).getTime()
      return eventTime >= fromTime && eventTime <= toTime
    })
  } else if (criteria.dateFrom) {
    // If only dateFrom is provided, show experiences on or after that date
    const fromTime = criteria.dateFrom.getTime()
    results = results.filter((exp) => {
      const eventTime = new Date(exp.event_date).getTime()
      return eventTime >= fromTime
    })
  }

  // Filter by guest count (optional)
  // Only show experiences that can accommodate the requested number of guests
  if (criteria.guestCount && criteria.guestCount > 0) {
    results = results.filter(
      (exp) =>
        exp.max_guests >= criteria.guestCount! && exp.event_remain_spots >= criteria.guestCount!
    )
  }

  // Sort by featured first, then by rating
  results.sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return b.rating - a.rating
  })

  return results
}

/**
 * Search for locations (autocomplete)
 * Currently uses dummy data, will be replaced with real API calls
 */
export async function searchLocations(query: string): Promise<Location[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  if (!query || query.trim().length < 2) {
    return []
  }

  const queryLower = query.toLowerCase()
  const results = DUMMY_LOCATIONS.filter((loc) => loc.name.toLowerCase().includes(queryLower))

  // Limit to 5 results for autocomplete
  return results.slice(0, 5)
}

/**
 * Get user's current location using Geolocation API
 * Returns the nearest city from our locations list
 */
export async function detectUserLocation(): Promise<string | null> {
  return new Promise<string | null>((resolve) => {
    if (!navigator.geolocation) {
      resolve(null)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords

        // Find nearest city from dummy locations
        // In real implementation, this would call a reverse geocoding API
        let nearestCity = null as Location | null
        let minDistance = Infinity

        for (const loc of DUMMY_LOCATIONS) {
          const distance = Math.sqrt(
            Math.pow(loc.coordinates.lat - latitude, 2) +
              Math.pow(loc.coordinates.lng - longitude, 2)
          )

          if (distance < minDistance) {
            minDistance = distance
            nearestCity = loc
          }
        }

        resolve(nearestCity?.name ?? null)
      },
      (error) => {
        console.error('Geolocation error:', error)
        resolve(null)
      },
      {
        timeout: 5000,
        maximumAge: 300000, // 5 minutes cache
      }
    )
  })
}
