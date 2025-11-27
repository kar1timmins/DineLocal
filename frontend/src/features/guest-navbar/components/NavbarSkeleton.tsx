'use client'

import { Navbar, NavbarContent, NavbarLeft, NavbarRight } from '@/components/shared/navbar'
import { Skeleton } from '@/components/shared/skeleton'

interface NavbarSkeletonProps {
  isAuthenticated?: boolean
}

export function NavbarSkeleton({ isAuthenticated = false }: NavbarSkeletonProps) {
  return (
    <Navbar variant="default" position="sticky" size="md" hideOnScroll={true}>
      <NavbarContent>
        <NavbarLeft>
          {/* Logo Skeleton */}
          <Skeleton className="h-6 w-32" />
        </NavbarLeft>

        <NavbarRight>
          {/* Search Icon Skeleton */}
          <Skeleton className="h-10 w-10 rounded-md" />

          {isAuthenticated ? (
            <>
              {/* State 2: Logged In - Desktop Links + Avatar */}
              <div className="hidden items-center gap-4 md:flex">
                {/* Navigation Links (Discover, Bookings, Favourites) */}
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-18" />
                <Skeleton className="h-4 w-20" />
              </div>

              {/* Avatar Skeleton */}
              <Skeleton className="hidden h-10 w-10 rounded-full md:inline-flex" />

              {/* Mobile: Avatar Skeleton */}
              <Skeleton className="h-10 w-10 rounded-full md:hidden" />
            </>
          ) : (
            <>
              {/* State 1: Unregistered - Desktop Links + Buttons */}
              <div className="hidden items-center gap-6 md:flex">
                {/* Navigation Links (Discover, Help) */}
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />

                {/* Buttons Container */}
                <div className="flex items-center gap-2">
                  <Skeleton className="h-12 w-32 rounded-md" />
                  <Skeleton className="h-12 w-36 rounded-md" />
                </div>
              </div>

              {/* Mobile: Menu Icon Skeleton */}
              <Skeleton className="h-10 w-10 rounded-md md:hidden" />
            </>
          )}
        </NavbarRight>
      </NavbarContent>
    </Navbar>
  )
}
