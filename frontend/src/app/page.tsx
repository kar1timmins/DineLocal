'use client'

import { Button } from '@/components/shared/button'
import { Box } from '@/components/shared/container'
import { Heading, Paragraph } from '@/components/shared/typography'
import { GuestNavbar } from '@/features/guest-navbar/components'
import { DUMMY_USER, useAuthStore } from '@/stores/authStore'

export default function HomePage() {
  const { isAuthenticated, user, login, logout, setLoading } = useAuthStore()

  const handleToggleAuth = () => {
    if (isAuthenticated) {
      logout()
    } else {
      login(DUMMY_USER)
    }
  }

  const handleToggleHostStatus = () => {
    if (user) {
      login({
        ...user,
        registeredAsHost: !user.registeredAsHost,
      })
    }
  }

  const handleToggleLoading = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <>
      {/* Guest Navbar */}
      <GuestNavbar />

      {/* Page Content - Scrollable to test navbar behavior */}
      <Box className="min-h-dvh pt-20">
        <Box className="mx-auto max-w-4xl space-y-12 px-4 py-12 md:px-6 lg:px-8">
          {/* Hero Section */}
          <Box className="space-y-4 text-center">
            <Heading as="h1" className="text-4xl font-bold md:text-5xl">
              Guest Navbar Demo
            </Heading>
            <Paragraph className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Testing the responsive guest navbar with authentication states, mobile menu, and
              loading skeleton.
            </Paragraph>
          </Box>

          {/* Test Controls */}
          <Box className="bg-card space-y-4 rounded-lg border p-6">
            <Heading as="h2" className="text-xl font-semibold">
              Test Controls
            </Heading>

            <Box className="flex flex-wrap gap-3">
              <Button onClick={handleToggleAuth} variant="default">
                {isAuthenticated ? 'Logout (State 1)' : 'Login (State 2)'}
              </Button>

              {isAuthenticated && (
                <Button onClick={handleToggleHostStatus} variant="outline">
                  {user?.registeredAsHost ? 'Remove Host Status' : 'Make Host'}
                </Button>
              )}

              <Button onClick={handleToggleLoading} variant="secondary">
                Show Loading State (2s)
              </Button>
            </Box>

            <Box className="space-y-2 pt-4">
              <Paragraph className="text-sm">
                <strong>Current State:</strong>{' '}
                {isAuthenticated ? 'Logged In (State 2)' : 'Unregistered (State 1)'}
              </Paragraph>
              {isAuthenticated && user && (
                <>
                  <Paragraph className="text-sm">
                    <strong>User:</strong> {user.firstName} {user.lastName}
                  </Paragraph>
                  <Paragraph className="text-sm">
                    <strong>Host Status:</strong>{' '}
                    {user.registeredAsHost ? 'Registered as Host' : 'Not a Host'}
                  </Paragraph>
                </>
              )}
            </Box>
          </Box>

          {/* Features Grid */}
          <Box className="grid gap-6 md:grid-cols-2">
            <Box className="bg-card space-y-3 rounded-lg border p-6">
              <Heading as="h3" className="text-xl font-semibold">
                State 1: Unregistered User
              </Heading>
              <Paragraph className="text-muted-foreground text-sm">
                Mobile: Burger menu with Discover, Help, Login/Register, and Become a Host buttons.
                Desktop: Inline links and buttons in navbar.
              </Paragraph>
            </Box>

            <Box className="bg-card space-y-3 rounded-lg border p-6">
              <Heading as="h3" className="text-xl font-semibold">
                State 2: Logged In Guest
              </Heading>
              <Paragraph className="text-muted-foreground text-sm">
                Mobile: Avatar menu with profile links. Desktop: Icon links (Discover, Bookings,
                Favourites) with tooltips + avatar dropdown.
              </Paragraph>
            </Box>

            <Box className="bg-card space-y-3 rounded-lg border p-6">
              <Heading as="h3" className="text-xl font-semibold">
                Responsive Design
              </Heading>
              <Paragraph className="text-muted-foreground text-sm">
                Breakpoint at 768px (md). Mobile uses Sheet menus, desktop uses inline links and
                dropdown menus. Try resizing!
              </Paragraph>
            </Box>

            <Box className="bg-card space-y-3 rounded-lg border p-6">
              <Heading as="h3" className="text-xl font-semibold">
                Loading Skeleton
              </Heading>
              <Paragraph className="text-muted-foreground text-sm">
                Click &ldquo;Show Loading State&rdquo; to see the skeleton loader that displays
                during app initialization.
              </Paragraph>
            </Box>
          </Box>

          {/* Scroll Content */}
          {Array.from({ length: 6 }).map((_, i) => (
            <Box key={i} className="bg-card space-y-4 rounded-lg border p-8">
              <Heading as="h2" className="text-2xl font-semibold">
                Section {i + 1}
              </Heading>
              <Paragraph className="text-muted-foreground">
                This is demo content to demonstrate the navbar scroll behavior. The navbar hides on
                scroll down and reappears on scroll up or after idle timeout. Try scrolling to test
                the auto-hide feature!
              </Paragraph>
              <Paragraph className="text-muted-foreground">
                The navbar uses the existing shared components (Navbar, NavbarContent, NavbarLeft,
                NavbarRight) as building blocks, with feature-specific components for the guest
                experience.
              </Paragraph>
            </Box>
          ))}

          {/* Footer Spacer */}
          <Box className="py-20 text-center">
            <Paragraph className="text-muted-foreground">
              Scroll back to top to see the navbar again ⬆️
            </Paragraph>
          </Box>
        </Box>
      </Box>
    </>
  )
}
