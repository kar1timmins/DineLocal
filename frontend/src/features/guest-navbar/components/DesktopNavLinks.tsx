import Link from 'next/link'

import { DESKTOP_NAV_LINKS } from '../constants/menuItems'

export function DesktopNavLinks() {
  return (
    <div className="hidden items-center gap-6 md:flex">
      {DESKTOP_NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-foreground hover:text-primary text-sm font-medium transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}
