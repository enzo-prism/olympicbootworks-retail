'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Action = {
href: string
label: string
variant?: 'solid' | 'outline'
ariaLabel?: string
}

type MinimalHeroContentProps = {
eyebrow?: string
title?: string
subtitle?: string
actions?: Action[]
logoSrc?: string
logoHeight?: number
align?: 'center' | 'left'
className?: string
onDark?: boolean
}

export default function MinimalHeroContent({
eyebrow = 'Lake Tahoe • Since 1994',
title = 'Precision Boot Fitting',
subtitle = 'Ski & mountain boot experts.',
actions = [
  { href: '/contact', label: 'Book a fitting', variant: 'solid' },
  { href: '/gallery', label: 'Explore gallery', variant: 'outline' },
],
logoSrc = '/images/olympic-bootworks-transparent-logo.png',
logoHeight = 56,
align = 'center',
className,
onDark = true,
}: MinimalHeroContentProps) {
const isCenter = align === 'center'

return (
  <div
    className={cn(
      'relative z-10 mx-auto w-full max-w-4xl',
      isCenter ? 'text-center' : 'text-left',
      className
    )}
    aria-label="Hero content"
  >
    {/* Eyebrow */}
    {eyebrow ? (
      <div
        className={cn(
          'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
          onDark
            ? 'bg-white/10 text-white/90 ring-1 ring-inset ring-white/20 backdrop-blur'
            : 'bg-black/5 text-black/70 ring-1 ring-inset ring-black/10 backdrop-blur'
        )}
      >
        {eyebrow}
      </div>
    ) : null}

    {/* Logo */}
    <div className={cn('mt-4 mb-4', isCenter ? 'mx-auto' : '')} style={{ width: 'auto' }}>
      <Image
        src={logoSrc || "/placeholder.svg"}
        alt="Olympic Bootworks logo"
        width={logoHeight * 4}
        height={logoHeight}
        className={cn('h-auto w-auto', isCenter ? 'mx-auto' : '')}
        style={{ maxHeight: logoHeight }}
        priority
      />
    </div>

    {/* Heading */}
    {title ? (
      <h1
        className={cn(
          'font-semibold tracking-tight',
          onDark ? 'text-white' : 'text-gray-900',
          'text-4xl sm:text-5xl'
        )}
      >
        {title}
      </h1>
    ) : null}

    {/* Subheading */}
    {subtitle ? (
      <p
        className={cn(
          'mt-3 max-w-2xl',
          isCenter ? 'mx-auto' : '',
          onDark ? 'text-white/80' : 'text-gray-600',
          'text-base sm:text-lg'
        )}
      >
        {subtitle}
      </p>
    ) : null}

    {/* Actions */}
    {actions && actions.length > 0 ? (
      <div
        className={cn(
          'mt-6 flex flex-wrap gap-3',
          isCenter ? 'justify-center' : 'justify-start'
        )}
      >
        {actions.map(({ href, label, variant = 'solid', ariaLabel }) => (
          <Button
            key={href + label}
            asChild
            size="lg"
            // Map to dedicated high-contrast variants designed for dark/video backgrounds
            variant={variant === 'solid' ? 'on-dark' : 'outline-on-dark'}
            className="px-5"
            aria-label={ariaLabel || label}
          >
            <Link href={href}>{label}</Link>
          </Button>
        ))}
      </div>
    ) : null}
  </div>
)
}
