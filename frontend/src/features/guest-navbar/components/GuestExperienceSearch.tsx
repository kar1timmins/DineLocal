'use client'

import { usePathname } from 'next/navigation'

import { Search } from 'lucide-react'

import { Button } from '@/components/shared/button'
import { useMediaQuery } from '@/hooks'

import { useExperienceSearchStore } from '../store/experienceSearchStore'

import { CondensedSearchInput } from './CondensedSearchInput'
import { ExperienceSearchDialog } from './ExperienceSearchDialog'
import { ExperienceSearchSheet } from './ExperienceSearchSheet'

/**
 * Guest experience search trigger buttons and modals
 * Shows sheet on mobile (<768px), dialog on desktop (>=768px)
 * On /search page, shows condensed search input instead of icon
 * Uses SSR-safe useMediaQuery hook for viewport detection
 */
export function GuestExperienceSearch() {
  const pathname = usePathname()
  const { toggleSheet, toggleDialog } = useExperienceSearchStore()
  const isMobile = useMediaQuery('(max-width: 767px)')

  const isSearchPage = pathname === '/search' || pathname.startsWith('/search/')

  const handleClick = isMobile ? toggleSheet : toggleDialog

  // On /search page, show condensed search input
  if (isSearchPage) {
    return (
      <>
        <CondensedSearchInput onClick={handleClick} />
        {isMobile ? <ExperienceSearchSheet /> : <ExperienceSearchDialog />}
      </>
    )
  }

  // Default: show search icon
  return (
    <>
      {isMobile ? (
        <>
          {/* Mobile: Sheet */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSheet}
            aria-label="Search dining experiences"
          >
            <Search size={20} strokeWidth={1.5} />
          </Button>
          <ExperienceSearchSheet />
        </>
      ) : (
        <>
          {/* Desktop: Dialog */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDialog}
            aria-label="Search dining experiences"
          >
            <Search size={20} strokeWidth={1.5} />
          </Button>
          <ExperienceSearchDialog />
        </>
      )}
    </>
  )
}

/**
 * Export SearchTrigger alias for backward compatibility
 */
export { GuestExperienceSearch as SearchTrigger }
