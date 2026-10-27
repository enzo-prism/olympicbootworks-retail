"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { MapPin, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { seasonalScheduleNotice } from "@/data/locations"

const DISMISS_STORAGE_KEY = "location-banner-dismissed"

export default function LocationBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const bannerRef = useRef<HTMLDivElement>(null)

  // Read the dismissal flag in an effect (not during render) to avoid a
  // hydration mismatch; guard for SSR / disabled storage.
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.sessionStorage.getItem(DISMISS_STORAGE_KEY) === "1") {
        setIsVisible(false)
      }
    } catch {
      // sessionStorage unavailable (private mode, etc.) — keep banner visible
    }
  }, [])

  // Set CSS variable for banner height on mount and resize
  useEffect(() => {
    const updateBannerHeight = () => {
      if (bannerRef.current) {
        const height = bannerRef.current.offsetHeight
        document.documentElement.style.setProperty("--banner-height", `${height}px`)
      }
    }

    updateBannerHeight()
    window.addEventListener("resize", updateBannerHeight)

    return () => {
      window.removeEventListener("resize", updateBannerHeight)
      document.documentElement.style.setProperty("--banner-height", "0px")
    }
  }, [isVisible])

  const dismiss = () => {
    setIsVisible(false)
    try {
      window.sessionStorage.setItem(DISMISS_STORAGE_KEY, "1")
    } catch {
      // sessionStorage unavailable — dismissal lasts for this page only
    }
  }

  if (!isVisible) {
    return null
  }

  return (
    <div ref={bannerRef} className="bg-ink text-ink-foreground py-2 relative location-banner">
      <div className="container mx-auto pl-4 pr-14 md:px-14">
        {/* Mobile: one tappable line. The full shop details live on /contact. */}
        <Link
          href="/#shops"
          className="md:hidden flex items-center justify-center gap-2 py-1 text-xs location-banner-content"
        >
          <span className="h-2 w-2 shrink-0 rounded-full bg-stock-light" aria-hidden="true" />
          <span className="font-medium">{seasonalScheduleNotice.bannerPrimaryShort}</span>
          <span className="font-semibold text-white/70 whitespace-nowrap">&middot; Find a shop</span>
        </Link>

        {/* Desktop: full status row */}
        <div className="hidden md:flex items-center justify-center text-center gap-5 text-sm location-banner-content">
          <span className="flex items-center gap-2 font-semibold">
            <span className="h-2 w-2 shrink-0 rounded-full bg-stock-light" aria-hidden="true" />
            {seasonalScheduleNotice.label}
          </span>
          <span className="text-white/40" aria-hidden="true">|</span>
          <span className="text-white/85">{seasonalScheduleNotice.bannerPrimary}</span>
          <span className="hidden lg:inline text-white/40" aria-hidden="true">|</span>
          <span className="hidden lg:inline text-white/70">{seasonalScheduleNotice.bannerSecondary}</span>
          <Link
            href="/#shops"
            className="inline-flex items-center gap-1 font-semibold underline-offset-4 hover:underline"
          >
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            Find a shop
          </Link>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1/2 -translate-y-1/2 h-11 w-11 text-white/70 hover:bg-white/10 hover:text-white"
        onClick={dismiss}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
    </div>
  )
}
