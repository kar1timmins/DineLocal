'use client'

import { useState } from 'react'
import Link from 'next/link'

import { Menu, X } from 'lucide-react'

import { Button } from '@/components/shared/button'
import { Separator } from '@/components/shared/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/shared/sheet'
import { cn } from '@/lib/utils'

import { UNREGISTERED_LINKS } from '../constants/menuItems'
import { ROUTES } from '../constants/routes'

export function UnregisteredMenu() {
  const [mobileOpen, setMobileOpen] = useState(false)

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
        <SheetContent side="right" className="w-full">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-4 p-6">
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
                    onClick={() => setMobileOpen(false)}
                  >
                    {Icon && <Icon size={20} strokeWidth={1.5} />}
                    {link.label}
                  </Link>
                )
              })}
            </div>

            <Separator />

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
