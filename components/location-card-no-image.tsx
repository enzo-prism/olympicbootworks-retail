"use client"

import React from "react"
import { trackConversion } from "@/lib/track-conversion"
import Link from "next/link"
import { MapPin, Clock, Phone, ExternalLink, Award } from "lucide-react"
import ButtonIcon from "@/components/button-icon"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { seasonalScheduleNotice, type LocationData } from "@/data/locations"

interface LocationCardNoImageProps {
  location: LocationData
  showHours?: boolean
  className?: string
}

export default function LocationCardNoImage({
  location,
  showHours = true,
  className = "",
}: LocationCardNoImageProps) {
  const fullAddress = `${location.address.line1}, ${location.address.city}, ${location.address.state} ${location.address.zip}`
  const groupedHours = location.hours.reduce<Array<{ label: string; hours: string }>>((groups, item) => {
    const previous = groups[groups.length - 1]

    if (!previous || previous.hours !== item.hours) {
      groups.push({ label: item.day, hours: item.hours })
      return groups
    }

    previous.label = previous.label.includes("–")
      ? `${previous.label.split("–")[0]}–${item.day}`
      : `${previous.label}–${item.day}`

    return groups
  }, [])

  return (
    <div
      className={cn(
        "bg-card border rounded-lg overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-lg",
        className,
      )}
    >
      {/* Header — ink band */}
      <div className="py-4 px-6 bg-ink text-ink-foreground">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <h3 className="text-xl font-semibold font-sans tracking-normal">{location.name}</h3>
          </div>
          {location.flagship && (
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.22em]">
              <Award className="h-3 w-3" aria-hidden="true" />
              Flagship
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Address */}
        <div className="rounded-lg p-4 mb-5 border bg-secondary/60">
          <div className="flex flex-col gap-1.5">
            <p className="font-medium">{location.address.line1}</p>
            {location.address.line2 && <p>{location.address.line2}</p>}
            <p>
              {location.address.city}, {location.address.state} {location.address.zip}
            </p>
            <Link
              href={`https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`}
              target="_blank"
              className="text-sm flex items-center gap-1 mt-2 text-primary hover:underline"
            >
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
              View on Map
            </Link>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-full bg-secondary">
            <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
          </div>
          <a
            href={`tel:${location.contact.phone.replace(/[^0-9]/g, "")}`}
            className="hover:underline"
            onClick={() => trackConversion("phone_click", { location: `about_${location.id}` })}
          >
            {location.contact.phone}
          </a>
        </div>

        {/* Hours */}
        {showHours && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-full bg-secondary">
                <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
              </div>
              <h4 className="font-semibold">Current availability:</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm ml-10">
              {groupedHours.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="font-medium">{item.label}</div>
                  <div className="text-muted-foreground">{item.hours}</div>
                </React.Fragment>
              ))}
            </div>
            <p className="ml-10 mt-3 text-sm text-muted-foreground">{seasonalScheduleNotice.hoursStatus}.</p>
            <Button variant="link" asChild className="p-0 h-auto ml-10 mt-3">
              <Link href="/contact">
                <ButtonIcon label="Request an Appointment" href="/contact" />
                Request Appointment
              </Link>
            </Button>
          </div>
        )}

        {/* Contact Button */}
        <Button asChild variant="outline" className="w-full mt-2">
          <Link href="/contact">
            <ButtonIcon label="Contact This Location" href="/contact" />
            Contact This Location
          </Link>
        </Button>
      </div>
    </div>
  )
}
