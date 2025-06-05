"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp, Bike, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeroButtonsNewProps {
  className?: string
  showDescription?: boolean
}

export default function HeroButtonsNew({ className, showDescription = true }: HeroButtonsNewProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={cn("w-full max-w-xl mx-auto relative z-20", className)}>
      {/* Primary buttons with enhanced white styling */}
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        <Link
          href="/shop"
          className="group relative overflow-hidden rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-4 text-white font-medium transition-all hover:bg-white/30 hover:scale-105 flex items-center justify-center shadow-lg"
        >
          <Bike className="h-5 w-5 mr-3 flex-shrink-0 text-white" />
          <span className="text-white font-semibold">Shop Now</span>
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-shimmer"></div>
        </Link>

        <Link
          href="/contact"
          className="group relative overflow-hidden rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-4 text-white font-medium transition-all hover:bg-white/30 hover:scale-105 flex items-center justify-center shadow-lg"
        >
          <MessageCircle className="h-5 w-5 mr-3 flex-shrink-0 text-white" strokeWidth={2} />
          <span className="text-white font-semibold">Contact Us</span>
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-shimmer"></div>
        </Link>
      </div>

      {/* Description toggle with white styling */}
      {showDescription && (
        <div className="mt-8 relative z-20">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-center gap-2 text-sm text-white mx-auto px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all shadow-lg border border-white/20"
          >
            <span className="text-white font-medium">{expanded ? "Hide details" : "Show details"}</span>
            {expanded ? <ChevronUp className="h-4 w-4 text-white" /> : <ChevronDown className="h-4 w-4 text-white" />}
          </button>

          {expanded && (
            <div className="flex items-center justify-center gap-2 text-sm text-white text-center max-w-md mx-auto mt-4 animate-fadeIn p-4 rounded-lg bg-white/10 backdrop-blur-sm shadow-lg border border-white/20">
              <MessageCircle className="h-4 w-4 flex-shrink-0 text-white" />
              <p className="text-white">
                Featuring interviews with Travis Ganong (US Olympic Ski Team), Ralph Backstrom (2013 Freeride World Tour
                Champion), and Doug Stoup (CEO Ice Axe Expeditions)
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
