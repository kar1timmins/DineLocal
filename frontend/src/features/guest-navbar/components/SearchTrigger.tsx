'use client'

import { useState } from 'react'

import { Search } from 'lucide-react'

import { Button } from '@/components/shared/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from '@/components/shared/command'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/shared/sheet'

export function SearchTrigger() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [desktopOpen, setDesktopOpen] = useState(false)

  return (
    <>
      {/* Mobile: Sheet */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Search experiences"
      >
        <Search size={20} strokeWidth={1.5} />
      </Button>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="bottom" className="h-[90vh]">
          <SheetHeader>
            <SheetTitle>Search Experiences</SheetTitle>
          </SheetHeader>
          <div className="text-muted-foreground mt-8 flex items-center justify-center">
            <p>Search functionality coming soon...</p>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop: Command Dialog */}
      <Button
        variant="ghost"
        size="icon"
        className="hidden md:inline-flex"
        onClick={() => setDesktopOpen(true)}
        aria-label="Search experiences"
      >
        <Search size={20} strokeWidth={1.5} />
      </Button>

      <CommandDialog
        open={desktopOpen}
        onOpenChange={setDesktopOpen}
        title="Search Experiences"
        description="Search for dining experiences"
      >
        <CommandInput placeholder="Search experiences..." />
        <CommandList>
          <CommandEmpty>Search functionality coming soon...</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <div className="text-muted-foreground p-4 text-center text-sm">
              Experience search will be available soon
            </div>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
