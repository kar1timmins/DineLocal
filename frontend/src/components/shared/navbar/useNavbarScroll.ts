'use client'

import { useEffect, useRef, useState } from 'react'

interface UseNavbarScrollOptions {
  hideOnScroll?: boolean
  scrollThreshold?: number
  idleDelay?: number
}

interface UseNavbarScrollReturn {
  isVisible: boolean
  isElevated: boolean
  scrollDirection: 'up' | 'down' | null
}

export function useNavbarScroll({
  hideOnScroll = true,
  scrollThreshold = 50,
  idleDelay = 150,
}: UseNavbarScrollOptions = {}): UseNavbarScrollReturn {
  const [isVisible, setIsVisible] = useState(true)
  const [isElevated, setIsElevated] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)

  // Use refs to avoid dependency issues
  const lastScrollY = useRef(0)
  const idleTimerRef = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    // If hideOnScroll is disabled, always show navbar
    if (!hideOnScroll) {
      setIsVisible(true)
      return
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Update elevated state based on scroll position
      setIsElevated(currentScrollY > 10)

      // Always show navbar at the top of the page
      if (currentScrollY < 10) {
        setIsVisible(true)
        setScrollDirection(null)
        lastScrollY.current = currentScrollY
        return
      }

      // Calculate scroll difference
      const scrollDiff = currentScrollY - lastScrollY.current

      // Only update if scrolled more than threshold
      if (Math.abs(scrollDiff) < scrollThreshold) {
        return
      }

      // Determine scroll direction
      const direction = scrollDiff > 0 ? 'down' : 'up'
      setScrollDirection(direction)

      // Update visibility based on scroll direction
      if (direction === 'down') {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      // Update last scroll position
      lastScrollY.current = currentScrollY

      // Clear existing idle timer
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
      }

      // Set idle timer - show navbar after idle delay
      idleTimerRef.current = setTimeout(() => {
        setIsVisible(true)
      }, idleDelay)
    }

    // Throttle scroll events using requestAnimationFrame for performance
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    // Set initial scroll position
    lastScrollY.current = window.scrollY

    // Initial check
    handleScroll()

    // Add scroll listener
    window.addEventListener('scroll', throttledScroll, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledScroll)
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
      }
    }
  }, [hideOnScroll, scrollThreshold, idleDelay])

  return {
    isVisible,
    isElevated,
    scrollDirection,
  }
}
