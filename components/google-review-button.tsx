"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GoogleGIcon } from "@/components/google-g-icon"
import type { LocationData } from "@/data/locations"
import { sendGa4Event } from "@/lib/gtag"
import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"

type ButtonProps = ComponentProps<typeof Button>

type GoogleReviewButtonProps = {
  className?: string
  shop: Pick<LocationData, "id" | "address" | "googlePlaceId">
  /** Optional GA4 event when clicked */
  analyticsItemId?: string
} & Pick<ButtonProps, "size" | "variant">

export function GoogleReviewButton({
  className,
  shop,
  size = "default",
  variant = "outline",
  analyticsItemId = "google_review_footer",
}: GoogleReviewButtonProps) {
  return (
    <Button asChild size={size} variant={variant} className={cn("gap-2 shadow-sm", className)}>
      <Link
        href={`https://search.google.com/local/writereview?placeid=${shop.googlePlaceId}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          sendGa4Event("select_content", {
            content_type: "google_review_cta",
            item_id: analyticsItemId,
            shop_id: shop.id,
          })
        }
      >
        <GoogleGIcon className="h-[1.15rem] w-[0.8rem]" />
        Review {shop.address.city}
      </Link>
    </Button>
  )
}
