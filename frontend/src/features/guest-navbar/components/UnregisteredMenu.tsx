'use client'

import { useState } from 'react'
import Link from 'next/link'

import { Menu, X } from 'lucide-react'

import { Button } from '@/components/shared/button'
import { Box, Flex } from '@/components/shared/container'
import { Separator } from '@/components/shared/separator'
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/shared/sheet'
import { Heading } from '@/components/shared/typography'
import { cn } from '@/lib/utils'

import { UNREGISTERED_LINKS } from '../constants/menuItems'
import { ROUTES } from '../constants/routes'
import { useExperienceSearchStore } from '../store/experienceSearchStore'

export function UnregisteredMenu() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const clearCriteria = useExperienceSearchStore((state) => state.clearCriteria)

  return (
    <>
      {/* Mobile: Burger Menu Icon */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
      >
        {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
      </Button>

      {/* Mobile: Sheet Menu */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="flex w-full flex-col [&>button:last-child]:hidden">
          {/* Accessible title and description for screen readers */}
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <SheetDescription className="sr-only">
            Navigate to different sections or login to your account
          </SheetDescription>

          {/* Header - Centered title with close button */}
          <Box className="px-4 pt-2">
            <Flex alignItems="center" justifyContent="between">
              {/* Invisible spacer to balance close button */}
              <div className="h-8 w-8" />
              <Heading as="h2" className="text-sm font-semibold">
                Menu
              </Heading>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </Button>
            </Flex>
          </Box>

          <nav className="flex flex-1 flex-col gap-4 px-4">
            {/* Links Group */}
            <div className="flex flex-col">
              {UNREGISTERED_LINKS.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex h-12 items-center gap-3 rounded-md px-3 text-base font-medium',
                      'text-foreground hover:bg-accent hover:text-accent-foreground transition-colors'
                    )}
                    onClick={() => {
                      if (link.href === ROUTES.DISCOVER) {
                        clearCriteria(false)
                      }
                      setMobileOpen(false)
                    }}
                  >
                    {Icon && <Icon size={20} strokeWidth={1.5} />}
                    {link.label}
                  </Link>
                )
              })}
            </div>

            {/* Action Buttons Group */}
            <div className="flex flex-col gap-3">
              <Button asChild className="h-12 w-full">
                <Link href={ROUTES.LOGIN} onClick={() => setMobileOpen(false)}>
                  Login / Register
                </Link>
              </Button>

              <Button asChild variant="outline" className="h-12 w-full">
                <Link href={ROUTES.BECOME_HOST} onClick={() => setMobileOpen(false)}>
                  Become a Host
                </Link>
              </Button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop: Inline Links and Buttons */}
      <div className="hidden items-center gap-6 md:flex">
        {UNREGISTERED_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={link.href === ROUTES.DISCOVER ? () => clearCriteria(false) : undefined}
            className="text-foreground hover:text-primary text-sm font-medium transition-colors"
          >
            {link.label}
          </Link>
        ))}

        {/* Action Buttons Container */}
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="default">
            <Link href={ROUTES.BECOME_HOST}>Become a Host</Link>
          </Button>

          <Button asChild size="default">
            <Link href={ROUTES.LOGIN}>Login / Register</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
