"use client"

import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { bikeInquiryUrl, type Bike } from "@/data/bikes"
import { trackConversion } from "@/lib/track-conversion"
import { cn } from "@/lib/utils"

interface BikeInquiryButtonProps {
  bike: Bike
  label?: string
  className?: string
}

export default function BikeInquiryButton({
  bike,
  label = `Email Buck about the ${bike.name}`,
  className,
}: BikeInquiryButtonProps) {
  return (
    <Button asChild size="lg" className={cn("shadow-sm", className)}>
      <a
        href={bikeInquiryUrl(bike)}
        onClick={() =>
          trackConversion("email_click", {
            location: `ebike_${bike.slug}`,
            contentId: bike.slug,
            contentName: `Fantic ${bike.name}`,
          })
        }
      >
        <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
        {label}
      </a>
    </Button>
  )
}
