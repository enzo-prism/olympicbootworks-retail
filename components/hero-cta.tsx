"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { type ReactNode } from "react"

type CTAProps = {
  href?: string
  children?: ReactNode
  icon?: ReactNode
  className?: string
  ariaLabel?: string
}

/**
 * High-contrast filled pill button for dark/video hero backgrounds.
 * White glass with dark text for maximum readability.
 */
export function HeroPrimaryCTA({
  href = "/shop",
  children = "Shop Now",
  icon,
  className,
  ariaLabel,
}: CTAProps) {
  const content = (
    <span className="inline-flex items-center gap-2">
      {icon}
      <span>{children}</span>
    </span>
  )

  return (
    <Link
      href={href}
      aria-label={ariaLabel || (typeof children === "string" ? children : "Primary action")}
      className={cn(
        "group relative inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold",
        // High contrast on dark backgrounds
        "text-gray-900 bg-white/95 hover:bg-white",
        // Subtle glass + border + shadows
        "border border-white/80 backdrop-blur-md shadow-[0_12px_30px_rgba(0,0,0,0.25)]",
        // Focus styles for accessibility
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        // Subtle inner highlight
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)]",
        // Gentle shine on hover
        "before:absolute before:inset-0 before:rounded-full before:bg-[radial-gradient(120px_60px_at_0%_0%,rgba(255,255,255,0.25),transparent)] before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500",
        "transition-colors",
        className,
      )}
    >
      {content}
    </Link>
  )
}

/**
 * Transparent glass outline pill for dark/video hero backgrounds.
 * White text and border; stays readable before hover.
 */
export function HeroSecondaryCTA({
  href = "/contact",
  children = "Book a Fitting",
  icon,
  className,
  ariaLabel,
}: CTAProps) {
  const content = (
    <span className="inline-flex items-center gap-2">
      {icon}
      <span>{children}</span>
    </span>
  )

  return (
    <Link
      href={href}
      aria-label={ariaLabel || (typeof children === "string" ? children : "Secondary action")}
      className={cn(
        "group inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold",
        // High contrast on dark backgrounds
        "text-white border border-white/75",
        // Glass background with gentle hover
        "bg-white/10 hover:bg-white/15 backdrop-blur-md",
        // Shadow and focus ring
        "shadow-[0_8px_24px_rgba(0,0,0,0.20)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        // Subtle inner highlight
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.45)]",
        "transition-colors",
        className,
      )}
    >
      {content}
    </Link>
  )
}
