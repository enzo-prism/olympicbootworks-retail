"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Info, ChevronDown, ChevronUp, Bike } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HeroButtonsProps {
  className?: string
  showDescription?: boolean
}

export default function HeroButtons({ className, showDescription = true }: HeroButtonsProps) {
  const [expanded, setExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      {/* Primary buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
        <Button
          asChild
          variant="outline-on-dark"
          size="lg"
          className="w-full shadow-md backdrop-blur-sm border border-white/20 hover:bg-white/30 transition-all font-semibold ring-1 ring-inset ring-white/25"
        >
          <Link href="/shop">
            <span className="flex items-center justify-center">
              <Bike className="h-5 w-5 mr-2 flex-shrink-0" />
              Shop eBikes
            </span>
          </Link>
        </Button>

        <Button
          asChild
          variant="outline-on-dark"
          size="lg"
          className="w-full shadow-md backdrop-blur-sm border border-white/20 hover:bg-white/30 transition-all font-semibold ring-1 ring-inset ring-white/25"
        >
          <Link href="/about">
            <span className="flex items-center justify-center">
              <Info className="h-5 w-5 mr-2 flex-shrink-0" />
              About Us
            </span>
          </Link>
        </Button>
      </div>

      {/* Mobile description toggle */}
      {isMobile && showDescription && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-center gap-1 text-xs text-white/80 mt-4 mx-auto px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm"
        >
          {expanded ? "Hide details" : "Show details"}
          {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </button>
      )}

      {/* Description - always visible on desktop, toggleable on mobile */}
      {showDescription && (!isMobile || expanded) && (
        <div className="flex items-center justify-center gap-2 text-sm text-white/80 text-center max-w-md mx-auto mt-4 animate-fadeIn">
          <Info className="h-4 w-4 flex-shrink-0" />
          <p>
            Featuring interviews with Travis Ganong (US Olympic Ski Team), Ralph Backstrom (2013 Freeride World Tour
            Champion), and Doug Stoup (CEO Ice Axe Expeditions)
          </p>
        </div>
      )}
    </div>
  )
}
