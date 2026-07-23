"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { MapPin, X } from "lucide-react"
import ButtonIcon from "@/components/button-icon"
import { Button } from "@/components/ui/button"
import { locations, seasonalScheduleNotice } from "@/data/locations"

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
    <div ref={bannerRef} className="bg-background border-b border-border py-2 relative location-banner">
      <div className="container mx-auto pl-4 pr-14 md:px-14">
        <div className="flex flex-col md:flex-row items-center justify-center text-center gap-2 md:gap-6 text-sm location-banner-content">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3 text-primary" />
            <span className="font-medium">{seasonalScheduleNotice.label}:</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-6">
            <span className="text-muted-foreground">{seasonalScheduleNotice.bannerPrimary}</span>
            <span className="hidden md:inline text-muted-foreground">|</span>
            <span className="text-muted-foreground">{seasonalScheduleNotice.bannerSecondary}</span>
            <span className="hidden md:inline text-muted-foreground">|</span>
            <span className="text-muted-foreground">{locations.length} Tahoe locations</span>
          </div>

          <Button asChild variant="link" size="sm" className="p-0 h-auto text-primary">
            <Link href="/contact">
              <ButtonIcon label="Request an Appointment" href="/contact" />
              Request Appointment
            </Link>
          </Button>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1/2 -translate-y-1/2 h-11 w-11"
        onClick={dismiss}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
    </div>
  )
}
