'use client'

import Link from 'next/link'

import { DESKTOP_NAV_LINKS } from '../constants/menuItems'
import { ROUTES } from '../constants/routes'
import { useExperienceSearchStore } from '../store/experienceSearchStore'

export function DesktopNavLinks() {
  const clearCriteria = useExperienceSearchStore((state) => state.clearCriteria)

  return (
    <div className="hidden items-center gap-6 md:flex">
      {DESKTOP_NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={link.href === ROUTES.DISCOVER ? () => clearCriteria(false) : undefined}
          className="text-foreground hover:text-primary text-sm font-medium transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}
