"use client"

import { Mail } from "lucide-react"
import { bikeInquiryUrl, formatPrice, type Bike } from "@/data/bikes"
import { trackConversion } from "@/lib/track-conversion"

/**
 * Mobile-only sticky bottom bar for bike detail pages. Keeps the primary
 * conversion (prefilled email to Buck) one tap away at any scroll position;
 * the desktop layout keeps the inline inquiry box instead.
 */
export default function BikeStickyInquiryBar({ bike }: { bike: Bike }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 backdrop-blur-sm p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
      <a
        href={bikeInquiryUrl(bike)}
        onClick={() =>
          trackConversion("email_click", {
            location: `ebike_${bike.slug}_sticky`,
            contentId: bike.slug,
            contentName: `Fantic ${bike.name}`,
          })
        }
        className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary text-base font-semibold text-primary-foreground shadow-md hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Mail className="h-5 w-5" aria-hidden="true" />
        Email Buck about this bike &middot; {formatPrice(bike.price)}
      </a>
    </div>
  )
}
