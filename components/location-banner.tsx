"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { MapPin, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { locations } from "@/data/locations"

export default function LocationBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const bannerRef = useRef<HTMLDivElement>(null)

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

  if (!isVisible) {
    return null
  }

  return (
    <div ref={bannerRef} className="bg-background border-b border-border py-2 relative location-banner">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center text-center gap-2 md:gap-6 text-sm location-banner-content">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3 text-primary" />
            <span className="font-medium">We have two locations:</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-6">
            {locations.map((location, index) => (
              <div key={location.id} className="flex items-center gap-1">
                <span className="font-medium">{location.name}:</span>
                <span className="text-muted-foreground">
                  {location.address.city}, {location.address.state}
                </span>
                {index === 0 && <span className="hidden md:inline text-muted-foreground">|</span>}
              </div>
            ))}
          </div>

          <Button asChild variant="link" size="sm" className="p-0 h-auto text-primary">
            <Link href="/contact">View Details</Link>
          </Button>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-3 w-3" />
        <span className="sr-only">Close</span>
      </Button>
    </div>
  )
}
