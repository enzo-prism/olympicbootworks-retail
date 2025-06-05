import React from "react"
import Link from "next/link"
import { MapPin, Clock, Phone, ExternalLink, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { LocationData } from "@/data/locations"

interface LocationCardNoImageProps {
  location: LocationData
  showHours?: boolean
  className?: string
  colorScheme?: "blue" | "green" | "purple" | "amber"
}

export default function LocationCardNoImage({
  location,
  showHours = true,
  className = "",
  colorScheme = "blue",
}: LocationCardNoImageProps) {
  const fullAddress = `${location.address.line1}, ${location.address.city}, ${location.address.state} ${location.address.zip}`

  // Color schemes for different locations
  const colorSchemes = {
    blue: {
      header: "bg-gradient-to-r from-blue-600 to-blue-400",
      accent: "border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800",
      icon: "text-blue-600 dark:text-blue-400",
      badge: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800",
      hover: "hover:border-blue-300 hover:shadow-blue-100/50 dark:hover:border-blue-700",
    },
    green: {
      header: "bg-gradient-to-r from-emerald-600 to-emerald-400",
      accent: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800",
      icon: "text-emerald-600 dark:text-emerald-400",
      badge:
        "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-800",
      hover: "hover:border-emerald-300 hover:shadow-emerald-100/50 dark:hover:border-emerald-700",
    },
    purple: {
      header: "bg-gradient-to-r from-purple-600 to-purple-400",
      accent: "border-purple-200 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:border-purple-800",
      icon: "text-purple-600 dark:text-purple-400",
      badge:
        "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-800",
      hover: "hover:border-purple-300 hover:shadow-purple-100/50 dark:hover:border-purple-700",
    },
    amber: {
      header: "bg-gradient-to-r from-amber-600 to-amber-400",
      accent: "border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:border-amber-800",
      icon: "text-amber-600 dark:text-amber-400",
      badge:
        "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:border-amber-800",
      hover: "hover:border-amber-300 hover:shadow-amber-100/50 dark:hover:border-amber-700",
    },
  }

  const colors = colorSchemes[colorScheme]

  return (
    <div
      className={cn(
        "bg-card border rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg",
        colors.hover,
        className,
      )}
    >
      {/* Header with gradient background - improved alignment */}
      <div className={cn("py-4 px-6 text-white", colors.header)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 flex-shrink-0" />
            <h3 className="text-xl font-bold">{location.name}</h3>
          </div>
          {location.flagship && (
            <div
              className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1",
                "bg-white/20 backdrop-blur-sm",
              )}
            >
              <Award className="h-3 w-3" />
              Flagship
            </div>
          )}
        </div>
      </div>

      {/* Content - improved spacing */}
      <div className="p-6">
        {/* Address - improved spacing and alignment */}
        <div className={cn("rounded-lg p-4 mb-5 border", colors.accent)}>
          <div className="flex flex-col gap-1.5">
            <p className="font-medium">{location.address.line1}</p>
            {location.address.line2 && <p>{location.address.line2}</p>}
            <p>
              {location.address.city}, {location.address.state} {location.address.zip}
            </p>
            <Link
              href={`https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`}
              target="_blank"
              className={cn("text-sm flex items-center gap-1 mt-2 hover:underline", colors.icon)}
            >
              <ExternalLink className="h-3 w-3" />
              View on Map
            </Link>
          </div>
        </div>

        {/* Phone - improved alignment */}
        <div className="flex items-center gap-3 mb-5">
          <div className={cn("p-2 rounded-full", colors.badge)}>
            <Phone className={cn("h-4 w-4", colors.icon)} />
          </div>
          <a href={`tel:${location.contact.phone.replace(/[^0-9]/g, "")}`} className="hover:underline">
            {location.contact.phone}
          </a>
        </div>

        {/* Hours - improved spacing and alignment */}
        {showHours && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className={cn("p-2 rounded-full", colors.badge)}>
                <Clock className={cn("h-4 w-4", colors.icon)} />
              </div>
              <h4 className="font-semibold">Hours:</h4>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm ml-10">
              {location.hours.slice(0, 4).map((item, index) => (
                <React.Fragment key={index}>
                  <div className="font-medium">{item.day}</div>
                  <div className="text-muted-foreground">{item.hours}</div>
                </React.Fragment>
              ))}
            </div>
            <Button variant="link" asChild className={cn("p-0 h-auto ml-10 mt-3", colors.icon)}>
              <Link href="/contact">View Full Hours</Link>
            </Button>
          </div>
        )}

        {/* Contact Button - improved spacing */}
        <Button asChild variant="outline" className={cn("w-full border mt-2", colors.hover.replace("hover:", ""))}>
          <Link href="/contact">Contact This Location</Link>
        </Button>
      </div>
    </div>
  )
}
