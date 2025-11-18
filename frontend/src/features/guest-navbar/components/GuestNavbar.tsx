'use client'

import { Navbar, NavbarContent, NavbarLeft, NavbarRight } from '@/components/shared/navbar'
import { useAuthStore } from '@/stores/authStore'

import { DesktopNavLinks } from './DesktopNavLinks'
import { Logo } from './Logo'
import { NavbarSkeleton } from './NavbarSkeleton'
import { SearchTrigger } from './SearchTrigger'
import { UnregisteredMenu } from './UnregisteredMenu'
import { UserProfileMenu } from './UserProfileMenu'

export function GuestNavbar() {
  const { isAuthenticated, isLoading } = useAuthStore()

  // Show skeleton during loading
  if (isLoading) {
    return <NavbarSkeleton isAuthenticated={isAuthenticated} />
  }

  return (
    <Navbar variant="default" position="sticky" size="md" hideOnScroll={true}>
      <NavbarContent>
        <NavbarLeft>
          <Logo />
        </NavbarLeft>

        <NavbarRight>
          <SearchTrigger />

          {isAuthenticated ? (
            <>
              {/* State 2: Logged In User */}
              <DesktopNavLinks />
              <UserProfileMenu />
            </>
          ) : (
            <>
              {/* State 1: Unregistered User */}
              <UnregisteredMenu />
            </>
          )}
        </NavbarRight>
      </NavbarContent>
    </Navbar>
  )
}
