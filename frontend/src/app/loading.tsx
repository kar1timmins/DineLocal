import { AppLoader } from '@/components/shared'

/**
 * Root Loading UI - Shown during page transitions
 *
 * This is automatically shown by Next.js during:
 * - Initial page load
 * - Client-side navigation
 * - Suspense boundaries
 */
export default function Loading() {
  return <AppLoader variant="fullscreen" label="Loading..." />
}
