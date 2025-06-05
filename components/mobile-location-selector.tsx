"use client"

import { useState } from "react"
import { MapPin, ChevronDown, ChevronUp, Phone } from "lucide-react"
import { locations } from "@/data/locations"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface MobileLocationSelectorProps {
  className?: string
  onLocationSelect?: (locationId: string) => void
}

export default function MobileLocationSelector({ className, onLocationSelect }: MobileLocationSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(locations[0].id)

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId)
    setIsExpanded(false)
    if (onLocationSelect) {
      onLocationSelect(locationId)
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <button
        className="flex items-center justify-between w-full p-3 rounded-lg border bg-card text-left"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls="location-dropdown"
      >
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
          <span className="font-medium truncate">
            {locations.find((loc) => loc.id === selectedLocation)?.name || "Select Location"}
          </span>
        </div>
        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {isExpanded && (
        <div
          id="location-dropdown"
          className="mt-2 rounded-lg border bg-card overflow-hidden animate-in slide-in-from-top-2 duration-200"
        >
          {locations.map((location) => (
            <div
              key={location.id}
              className={cn(
                "p-3 border-b last:border-b-0 transition-colors",
                selectedLocation === location.id ? "bg-primary/5" : "hover:bg-muted/50",
              )}
            >
              <button className="w-full text-left" onClick={() => handleLocationSelect(location.id)}>
                <div className="flex flex-col">
                  <span className="font-medium">{location.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {location.address.city}, {location.address.state}
                  </span>
                </div>
              </button>

              <div className="flex items-center gap-4 mt-2">
                <a
                  href={`tel:${location.contact.phone.replace(/[^0-9]/g, "")}`}
                  className="text-xs text-primary flex items-center gap-1"
                >
                  <Phone className="h-3 w-3" />
                  {location.contact.phone}
                </a>

                <Link href="/contact" className="text-xs text-primary hover:underline">
                  View Map
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
