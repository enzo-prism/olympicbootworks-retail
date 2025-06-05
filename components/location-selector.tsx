"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { locations } from "@/data/locations"

interface LocationSelectorProps {
  compact?: boolean
  className?: string
}

export default function LocationSelector({ compact = false, className = "" }: LocationSelectorProps) {
  const [selectedLocation, setSelectedLocation] = useState(locations[0].id)
  const location = locations.find((loc) => loc.id === selectedLocation) || locations[0]

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size={compact ? "sm" : "default"} className="flex items-center gap-2">
            <MapPin className={compact ? "h-3 w-3" : "h-4 w-4"} />
            <span className="text-sm">{compact ? location.address.city : location.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {locations.map((loc) => (
            <DropdownMenuItem
              key={loc.id}
              onClick={() => setSelectedLocation(loc.id)}
              className={loc.id === selectedLocation ? "bg-primary/10" : ""}
            >
              <div className="flex flex-col">
                <span className="font-medium">{loc.name}</span>
                <span className="text-xs text-muted-foreground">
                  {loc.address.city}, {loc.address.state}
                </span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
