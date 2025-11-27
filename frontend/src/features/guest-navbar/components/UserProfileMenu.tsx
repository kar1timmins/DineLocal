'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { DoorOpen, X } from 'lucide-react'
import { toast } from 'sonner'

import { Avatar, AvatarFallback } from '@/components/shared/avatar/avatar'
import { Button } from '@/components/shared/button'
import { Box, Flex } from '@/components/shared/container'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shared/dropdown-menu'
import { Separator } from '@/components/shared/separator'
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/shared/sheet'
import { Heading } from '@/components/shared/typography'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/authStore'

import { useExperienceSearchStore } from '../store/experienceSearchStore'
import { USER_MENU_DESKTOP_SECTIONS, USER_MENU_MOBILE_SECTIONS } from '../constants/menuItems'
import { ROUTES } from '../constants/routes'

export function UserProfileMenu() {
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const [mobileOpen, setMobileOpen] = useState(false)
  const clearCriteria = useExperienceSearchStore((state) => state.clearCriteria)

  if (!user) return null

  const userFullName = `${user.firstName} ${user.lastName}`

  // Truncate long names with ellipsis
  const displayName =
    userFullName.length > 20 ? `${userFullName.substring(0, 20)}...` : userFullName

  const handleLogout = () => {
    logout()
    toast.success("You've been logged out")
    router.push(ROUTES.DISCOVER)
    setMobileOpen(false)
  }

  return (
    <>
      {/* Mobile: Avatar Button with Sheet */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label={mobileOpen ? 'Close user menu' : 'Open user menu'}
      >
        {mobileOpen ? (
          <X size={20} strokeWidth={1.5} />
        ) : (
          <Avatar>
            <AvatarFallback fullname={userFullName} />
          </Avatar>
        )}
      </Button>

      {/* Mobile: Sheet Menu */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="flex w-full flex-col [&>button:last-child]:hidden">
          {/* Accessible title and description for screen readers */}
          <SheetTitle className="sr-only">Account</SheetTitle>
          <SheetDescription className="sr-only">
            Manage your account settings and navigate to different sections
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

          <nav className="flex flex-1 flex-col gap-2 px-4 pb-4">
            {/* User Name */}
            <div className="mb-2">
              <p className="text-foreground text-sm font-semibold">{displayName}</p>
            </div>

            {/* Menu Sections */}
            {USER_MENU_MOBILE_SECTIONS.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <Separator className="my-2" />
                {section.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex h-12 items-center gap-3 rounded-md px-3 text-sm font-medium',
                        'text-foreground hover:bg-accent hover:text-accent-foreground transition-colors'
                      )}
                      onClick={() => {
                        if (item.href === ROUTES.DISCOVER) {
                          clearCriteria(false)
                        }
                        setMobileOpen(false)
                      }}
                    >
                      {Icon && <Icon size={20} strokeWidth={1.5} />}
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            ))}

            {/* Logout */}
            <Separator className="my-2" />
            <button
              onClick={handleLogout}
              className={cn(
                'flex h-12 items-center gap-3 rounded-md px-3 text-sm font-medium',
                'text-foreground hover:bg-accent hover:text-accent-foreground transition-colors'
              )}
            >
              <DoorOpen size={20} strokeWidth={1.5} />
              Log Out
            </button>

          </nav>

          {/* Become a Host / Switch to Host Button - Fixed at bottom */}
          <Box className="mt-auto border-t px-4 py-4">
            <Button asChild className="w-full">
              <Link
                href={user.registeredAsHost ? ROUTES.HOST_DASHBOARD : ROUTES.BECOME_HOST}
                onClick={() => setMobileOpen(false)}
              >
                {user.registeredAsHost ? 'Switch to Host' : 'Become a Host'}
              </Link>
            </Button>
          </Box>
        </SheetContent>
      </Sheet>

      {/* Desktop: Avatar with Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="hidden md:inline-flex">
          <Button variant="ghost" size="icon" aria-label="Open user menu">
            <Avatar>
              <AvatarFallback fullname={userFullName} />
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="z-[1100] w-56">
          {/* User Name */}
          <div className="px-2 py-2">
            <p className="text-foreground text-sm font-semibold">{displayName}</p>
          </div>

          {/* Become a Host / Switch to Host Button */}
          <div className="px-2 pb-2">
            <Button asChild className="w-full" size="sm">
              <Link href={user.registeredAsHost ? ROUTES.HOST_DASHBOARD : ROUTES.BECOME_HOST}>
                {user.registeredAsHost ? 'Switch to Host' : 'Become a Host'}
              </Link>
            </Button>
          </div>

          {/* Menu Sections */}
          {USER_MENU_DESKTOP_SECTIONS.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <DropdownMenuSeparator />
              {section.map((item) => {
                const Icon = item.icon
                return (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="flex items-center gap-3">
                      {Icon && <Icon size={16} strokeWidth={1.5} />}
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                )
              })}
            </div>
          ))}

          {/* Logout */}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-3">
            <DoorOpen size={16} strokeWidth={1.5} />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
