'use client'

import { usePathname } from 'next/navigation'
import { Navbar, NavbarContent, NavbarLeft, NavbarRight } from '@/components/shared/navbar'
import { useAuthStore } from '@/stores/authStore'

import { DesktopNavLinks } from './DesktopNavLinks'
import { Logo } from './Logo'
import { NavbarSkeleton } from './NavbarSkeleton'
import { GuestExperienceSearch } from './GuestExperienceSearch'
import { UnregisteredMenu } from './UnregisteredMenu'
import { UserProfileMenu } from './UserProfileMenu'

export function GuestNavbar() {
  const pathname = usePathname()
  const { isAuthenticated, isLoading } = useAuthStore()

  const isSearchPage = pathname === '/search' || pathname.startsWith('/search/')

  // Show skeleton during loading
  if (isLoading) {
    return <NavbarSkeleton isAuthenticated={isAuthenticated} />
  }

  return (
    <Navbar variant="default" position="sticky" size="md" padding="sm" hideOnScroll={true}>
      <NavbarContent maxWidth="2xl">
        {/* On /search page: hide logo on mobile/tablet, show on desktop */}
        <NavbarLeft className={isSearchPage ? 'hidden lg:flex' : ''}>
          <Logo />
        </NavbarLeft>

        {/* Mobile/Tablet: search input takes full width */}
        {isSearchPage && (
          <div className="flex flex-1 lg:hidden">
            <GuestExperienceSearch />
          </div>
        )}

        <NavbarRight>
          {/* Desktop: search input on right side, before nav links */}
          {isSearchPage && (
            <div className="hidden lg:block">
              <GuestExperienceSearch />
            </div>
          )}

          {/* Non-search pages: search icon in NavbarRight */}
          {!isSearchPage && <GuestExperienceSearch />}
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
