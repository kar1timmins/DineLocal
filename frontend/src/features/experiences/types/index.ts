/**
 * Experience-related type definitions
 * Used across experience search, cards, and detail pages
 */

export interface ExperienceItem {
  id: string

  // Core Info
  name: string
  description: string
  location: string
  coordinates?: {
    lat: number
    lng: number
  }

  // Host Information
  host: {
    id: string
    name: string
    avatar?: string
    verified: boolean
    languages?: string[]
  }

  // Dining Experience Details
  cuisine: string
  cuisineIcon?: string
  menu_description?: string
  dietary_info?: string[]

  // Event & Availability
  event_date: Date
  event_time?: string
  event_remain_spots: number
  max_guests: number
  duration?: string

  // Pricing
  price: number
  currency: string
  includes?: string[]

  // Social Proof
  rating: number
  reviews: number
  featured?: boolean

  // Media
  image: string
  images?: string[]

  // Additional Filters
  tags?: string[]
  instant_book?: boolean

  // Favorites (Client-side)
  isFavorited?: boolean
}

export interface Location {
  id: string
  name: string
  coordinates: {
    lat: number
    lng: number
  }
}
