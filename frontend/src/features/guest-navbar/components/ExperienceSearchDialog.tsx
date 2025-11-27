'use client'

import { useEffect } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/shared'
import { useExperienceSearchStore } from '../store/experienceSearchStore'
import { SearchContent } from './SearchContent'


/**
 * Desktop dialog for experience search
 * Uses shared SearchContent component for consistent UX with mobile Sheet
 *
 * Keyboard Shortcut: Cmd+K or Ctrl+K (desktop only)
 *
 * UX Laws Applied:
 * - Fitts's Law: Touch targets ≥48px (lg buttons)
 * - Jakob's Law: Matches marketplace patterns (filters at top)
 * - Law of Proximity: Related elements grouped in SearchContent
 * - Visual Hierarchy: Clear header/body/footer separation
 * - Aesthetic-Usability: Consistent 16px padding throughout
 */
export function ExperienceSearchDialog() {
  const { isDialogOpen, toggleDialog } = useExperienceSearchStore()

  // Keyboard shortcut: Cmd+K or Ctrl+K to open dialog (desktop only)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Only respond on desktop viewport
      if (window.innerWidth < 768) return

      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggleDialog()
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [toggleDialog])

  return (
    <Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
      <DialogContent
        className="flex h-[88vh] max-h-[88vh] max-w-3xl flex-col gap-0 overflow-hidden p-0"
        showCloseButton={false}
      >
        {/* Accessible title and description for screen readers */}
        <DialogTitle className="sr-only">Search dining experiences</DialogTitle>
        <DialogDescription className="sr-only">
          Search for authentic home-cooked meals by location, date, and number of guests
        </DialogDescription>

        {/* Shared search content (header + body + footer) */}
        <SearchContent onClose={toggleDialog} />
      </DialogContent>
    </Dialog>
  )
}
