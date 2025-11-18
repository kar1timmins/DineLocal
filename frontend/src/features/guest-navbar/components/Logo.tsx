import Link from 'next/link'

import { ROUTES } from '../constants/routes'

export function Logo() {
  return (
    <Link
      href={ROUTES.DISCOVER}
      className="text-foreground hover:text-primary text-2xl font-bold transition-colors"
      aria-label="DineLocal home"
    >
      DineLocal
    </Link>
  )
}
