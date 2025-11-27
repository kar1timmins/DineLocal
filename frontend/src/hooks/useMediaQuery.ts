'use client'

import { useEffect, useState } from 'react'

/**
 * Custom hook to detect media query matches (SSR-safe)
 * Useful for responsive behavior in client components
 *
 * Prevents hydration mismatches by:
 * - Returning false during SSR (server-side render)
 * - Setting actual match value after mount (client-side)
 *
 * @param query - CSS media query string (e.g., '(min-width: 768px)')
 * @returns boolean indicating if the media query matches
 *
 * @example
 * const isDesktop = useMediaQuery('(min-width: 768px)')
 * const isMobile = useMediaQuery('(max-width: 767px)')
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const media = window.matchMedia(query)

    // Set initial value
    setMatches(media.matches)

    // Create listener for changes
    const listener = () => setMatches(media.matches)

    // Modern browsers
    if (media.addEventListener) {
      media.addEventListener('change', listener)
      return () => media.removeEventListener('change', listener)
    } else {
      // Fallback for older browsers
      media.addListener(listener)
      return () => media.removeListener(listener)
    }
  }, [query])

  // Return false during SSR to prevent hydration mismatch
  if (!mounted) {
    return false
  }

  return matches
}
