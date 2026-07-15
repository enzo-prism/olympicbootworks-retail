"use client"

import { PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Bike } from "@/data/bikes"
import { trackConversion } from "@/lib/track-conversion"
import { cn } from "@/lib/utils"

type BikeCallButtonProps = {
  bike: Bike
  className?: string
}

export default function BikeCallButton({ bike, className }: BikeCallButtonProps) {
  return (
    <Button asChild size="lg" variant="outline" className={cn(className)}>
      <a
        href="tel:+15305810747"
        onClick={() =>
          trackConversion("phone_click", {
            location: `ebike_${bike.slug}`,
            contentId: bike.slug,
            contentName: `Fantic ${bike.name}`,
          })
        }
      >
        <PhoneCall className="mr-2 h-4 w-4" aria-hidden="true" />
        Call Buck
      </a>
    </Button>
  )
}
