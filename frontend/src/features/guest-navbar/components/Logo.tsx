'use client'

import Link from 'next/link'

import { useExperienceSearchStore } from '../store/experienceSearchStore'
import { ROUTES } from '../constants/routes'

export function Logo() {
  const clearCriteria = useExperienceSearchStore((state) => state.clearCriteria)

  return (
    <Link
      href={ROUTES.DISCOVER}
      onClick={() => clearCriteria(false)}
      className="text-foreground hover:text-primary text-2xl font-bold transition-colors"
      aria-label="DineLocal home"
    >
      DineLocal
    </Link>
  )
}
