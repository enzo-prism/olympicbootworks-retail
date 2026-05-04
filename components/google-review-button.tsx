"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GoogleGIcon } from "@/components/google-g-icon"
import { GOOGLE_BUSINESS_REVIEW_URL } from "@/lib/google-business"
import { sendGa4Event } from "@/lib/gtag"
import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"

type ButtonProps = ComponentProps<typeof Button>

type GoogleReviewButtonProps = {
  className?: string
  label?: string
  /** Optional GA4 event when clicked */
  analyticsItemId?: string
} & Pick<ButtonProps, "size" | "variant">

export function GoogleReviewButton({
  className,
  label = "Leave a Google review",
  size = "default",
  variant = "outline",
  analyticsItemId = "google_review_footer",
}: GoogleReviewButtonProps) {
  return (
    <Button asChild size={size} variant={variant} className={cn("gap-2 shadow-sm", className)}>
      <Link
        href={GOOGLE_BUSINESS_REVIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          sendGa4Event("select_content", {
            content_type: "google_review_cta",
            item_id: analyticsItemId,
          })
        }
      >
        <GoogleGIcon className="h-[1.15rem] w-[0.8rem]" />
        {label}
      </Link>
    </Button>
  )
}
