"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { LocationData } from "@/data/locations"

interface LocationCardRobustProps {
  location: LocationData
  showHours?: boolean
  className?: string
}

export default function LocationCardRobust({ location, showHours = true, className = "" }: LocationCardRobustProps) {
  const [imageError, setImageError] = React.useState(false)
  const fullAddress = `${location.address.line1}, ${location.address.city}, ${location.address.state} ${location.address.zip}`

  // Determine image source based on location and handle fallbacks
  const getImageSrc = () => {
    if (imageError) {
      return `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(location.name)}`
    }

    return location.flagship ? "/images/shop-exterior.jpg" : "/ski-boot-fitting-station.png"
  }

  return (
    <div className={`bg-card border rounded-lg overflow-hidden shadow-md ${className}`}>
      <div className="relative h-48">
        <Image
          src={getImageSrc() || "/placeholder.svg"}
          alt={location.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={true}
          className="object-cover"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-6 w-full">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">{location.name}</h3>
              {location.flagship && <Badge className="bg-primary text-white">Flagship</Badge>}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-muted-foreground">{location.address.line1}</p>
            {location.address.line2 && <p className="text-muted-foreground">{location.address.line2}</p>}
            <p className="text-muted-foreground">
              {location.address.city}, {location.address.state} {location.address.zip}
            </p>
            <Link
              href={`https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`}
              target="_blank"
              className="text-sm text-primary hover:underline"
            >
              View on Map
            </Link>
          </div>
        </div>

        {showHours && (
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Hours:</h4>
            <div className="grid grid-cols-1 gap-2 text-sm">
              {location.hours.map((item, index) => (
                <div key={index} className="py-1">
                  <div className="font-medium">{item.day}</div>
                  <div className="text-muted-foreground">{item.hours}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-sm text-primary">
              <p>To request an appointment, please fill out our contact form below.</p>
            </div>
            <Button variant="link" asChild className="p-0 h-auto text-primary mt-1">
              <Link href="/contact">Request Appointment</Link>
            </Button>
          </div>
        )}

        <Button asChild variant="outline" className="w-full">
          <Link href="/contact">Contact This Location</Link>
        </Button>
      </div>
    </div>
  )
}
