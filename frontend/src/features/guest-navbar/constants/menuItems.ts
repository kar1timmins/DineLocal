import { Bell, BookOpen, Cog, Heart, HelpCircle, Home, MessageCircle, User } from 'lucide-react'

import type { MenuItem } from '../types'

import { ROUTES } from './routes'

// Unregistered user menu links (State 1)
export const UNREGISTERED_LINKS: MenuItem[] = [
  { label: 'Discover', href: ROUTES.DISCOVER, icon: Home },
  { label: 'Help', href: ROUTES.HELP, icon: HelpCircle },
]

// User profile menu items for MOBILE (State 2)
// Includes Discover, which is not shown on desktop
export const USER_MENU_MOBILE_SECTIONS: MenuItem[][] = [
  [
    { label: 'View Profile', href: ROUTES.PROFILE, icon: User },
    { label: 'Discover', href: ROUTES.DISCOVER, icon: Home },
    { label: 'Bookings', href: ROUTES.BOOKINGS, icon: BookOpen },
    { label: 'Favourites', href: ROUTES.FAVOURITES, icon: Heart },
  ],
  [
    { label: 'Inbox', href: ROUTES.INBOX, icon: MessageCircle },
    { label: 'Notifications', href: ROUTES.NOTIFICATIONS, icon: Bell },
  ],
  [
    { label: 'Help', href: ROUTES.HELP, icon: HelpCircle },
    { label: 'App Settings', href: ROUTES.SETTINGS, icon: Cog },
  ],
]

// User profile menu items for DESKTOP (State 2)
// Excludes Discover (shown as icon link in navbar)
export const USER_MENU_DESKTOP_SECTIONS: MenuItem[][] = [
  [{ label: 'View Profile', href: ROUTES.PROFILE, icon: User }],
  [
    { label: 'Inbox', href: ROUTES.INBOX, icon: MessageCircle },
    { label: 'Notifications', href: ROUTES.NOTIFICATIONS, icon: Bell },
  ],
  [
    { label: 'Help', href: ROUTES.HELP, icon: HelpCircle },
    { label: 'App Settings', href: ROUTES.SETTINGS, icon: Cog },
  ],
]

// Desktop icon links (State 2) - shown in navbar
export const DESKTOP_NAV_LINKS: MenuItem[] = [
  { label: 'Discover', href: ROUTES.DISCOVER, icon: Home },
  { label: 'Bookings', href: ROUTES.BOOKINGS, icon: BookOpen },
  { label: 'Favourites', href: ROUTES.FAVOURITES, icon: Heart },
]
