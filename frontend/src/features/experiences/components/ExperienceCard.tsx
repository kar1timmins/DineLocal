'use client'

import Image from 'next/image'

import { format } from 'date-fns'
import { Heart, Star } from 'lucide-react'

import { Button } from '@/components/shared'
import { Box, Flex } from '@/components/shared/container'
import { Heading, Paragraph } from '@/components/shared/typography'
import type { ExperienceItem } from '@/features/experiences/types'
import { cn } from '@/lib/utils'

export interface ExperienceCardProps {
  experience: ExperienceItem
  layout?: 'compact' | 'comfortable' // Different layouts for different contexts
  showHeart?: boolean // Default: true
  onFavoriteClick?: (id: string) => void
  onClick?: () => void // Navigate to detail page
  className?: string
  cardIndex?: number // For loading strategy optimization (first 3 cards load eagerly)
}

/**
 * Reusable ExperienceCard component for displaying dining experiences
 * Used across:
 * - Search results drawer/command
 * - /search page
 * - Host dashboard
 * - User favorites page
 * - Homepage featured experiences
 */
export function ExperienceCard({
  experience,
  layout = 'compact',
  showHeart = true,
  onFavoriteClick,
  onClick,
  className,
  cardIndex,
}: ExperienceCardProps) {
  const {
    id,
    name,
    cuisine,
    location,
    host,
    event_date,
    event_time,
    event_remain_spots,
    price,
    currency,
    rating,
    reviews,
    image,
    isFavorited,
  } = experience

  const formattedDate = format(new Date(event_date), 'EEE, MMM d')
  const currencySymbol = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : currency

  // Descriptive alt text for accessibility (WCAG 2.2 AA)
  const imageAlt = `${cuisine} - ${name}`

  // Loading strategy: First 3 cards load eagerly for better LCP
  const shouldEagerLoad = cardIndex !== undefined && cardIndex < 3
  const loadingStrategy = shouldEagerLoad ? 'eager' : 'lazy'

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
    onFavoriteClick?.(id)
  }

  const handleCardClick = () => {
    onClick?.()
  }

  if (layout === 'comfortable') {
    // Comfortable layout for desktop /search page - Airbnb-style borderless
    return (
      <Box
        className={cn('group', onClick && 'cursor-pointer', className)}
        onClick={handleCardClick}
      >
        {/* Image - standalone with rounded corners */}
        <Box className="relative h-[220px] overflow-hidden rounded-xl md:h-[200px]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={loadingStrategy}
          />
          {showHeart && (
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'bg-background/80 hover:bg-background absolute top-2 right-2 h-10 w-10 rounded-full p-0 backdrop-blur-sm',
                isFavorited && 'text-red-500'
              )}
              onClick={handleFavoriteClick}
              aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={cn('h-5 w-5', isFavorited && 'fill-current')} />
            </Button>
          )}
        </Box>

        {/* Content - clean layout below image */}
        <Box className="space-y-2 pt-3">
          {/* Group 1: Name + Rating, Location, Host */}
          <Box className="space-y-0">
            <Flex alignItems="start" justifyContent="between" className="gap-2">
              <Heading
                as="h3"
                className="group-hover:text-primary min-w-0 flex-1 truncate text-base font-semibold"
              >
                {name}
              </Heading>
              <Flex alignItems="center" className="flex-shrink-0 gap-1 text-sm">
                <Star className="h-4 w-4 fill-black stroke-none dark:fill-white" />
                <span className="font-medium">{rating.toFixed(1)}</span>
                <span className="text-muted-foreground">({reviews})</span>
              </Flex>
            </Flex>
            <Paragraph textColor="muted" textOverflow="truncate" variant="default">
              {location}
            </Paragraph>
            <Paragraph textColor="muted" variant="default">
              with {host.name}
            </Paragraph>
          </Box>

          {/* Date & Time + Spots */}
          <Flex alignItems="center" justifyContent="between" className="text-sm">
            <Paragraph fontWeight="medium">
              {formattedDate}
              {event_time && <span> • {event_time}</span>}
            </Paragraph>
            <span className={cn(event_remain_spots <= 3 && 'text-destructive font-semibold')}>
              {event_remain_spots} spot{event_remain_spots !== 1 && 's'} left
            </span>
          </Flex>

          {/* Price */}
          <Paragraph className="text-base font-semibold">
            {currencySymbol}
            {price} <span className="text-muted-foreground text-sm font-normal">per person</span>
          </Paragraph>
        </Box>
      </Box>
    )
  }

  // Compact layout for mobile and drawer/command
  // UX-optimized: Applying Miller's Law (5-7 chunks) + Proximity Law (grouped spacing)
  return (
    <Flex
      className={cn(
        'group bg-card items-stretch gap-4 overflow-hidden rounded-lg border p-3 transition-all hover:shadow-md',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={handleCardClick}
    >
      {/* Image: 140px width, flexible height (matches text content height for perfect vertical balance) */}
      <Box className="relative w-[140px] flex-shrink-0 overflow-hidden rounded-md">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="140px"
          loading={loadingStrategy}
        />
      </Box>

      {/* Content: Applying Proximity Law - related items grouped with spacing */}
      <Flex className="min-w-0 flex-1 flex-col gap-3 py-0.5">
        {/* Group 1: Identity (Name + Location + Host) */}
        <Box className="space-y-0">
          {/* Name & Heart */}
          <Flex alignItems="start" justifyContent="between" className="gap-2">
            <Heading
              as="h3"
              className="group-hover:text-primary min-w-0 flex-1 truncate text-sm font-semibold"
            >
              {name}
            </Heading>
            {showHeart && (
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'h-auto w-auto flex-shrink-0 p-0 transition-colors',
                  isFavorited ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
                )}
                onClick={handleFavoriteClick}
                aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={cn('h-4 w-4', isFavorited && 'fill-current')} />
              </Button>
            )}
          </Flex>

          {/* Location */}
          <Paragraph variant="caption" textColor="muted" textOverflow="truncate">
            {location}
          </Paragraph>

          {/* Host */}
          <Paragraph variant="caption" textColor="muted" textOverflow="truncate">
            with {host.name}
          </Paragraph>
        </Box>

        {/* Group 2: Details (Date + Spots, Price + Rating) */}
        <Box className="space-y-2">
          {/* Date & Time + Spots (responsive: vertical on mobile, horizontal on desktop) */}
          <Flex className="flex-col gap-1 text-xs md:flex-row md:items-center md:justify-between md:gap-0">
            <span className="text-muted-foreground">
              {formattedDate}
              {event_time && <span> • {event_time}</span>}
            </span>
            <span className={cn(event_remain_spots <= 3 && 'text-destructive font-semibold')}>
              {event_remain_spots} spot{event_remain_spots !== 1 && 's'} left
            </span>
          </Flex>

          {/* Price + Rating (always horizontal with justify-between) */}
          <Flex alignItems="center" justifyContent="between" className="text-xs">
            <span className="text-sm font-bold">
              {currencySymbol}
              {price}
              <span className="text-muted-foreground text-[10px] font-normal">/person</span>
            </span>
            <Flex alignItems="center" className="text-muted-foreground gap-0.5">
              <Star className="h-3.5 w-3.5 fill-black stroke-none dark:fill-white" />
              <span className="text-foreground font-medium">{rating.toFixed(1)}</span>
              <span>({reviews})</span>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  )
}
