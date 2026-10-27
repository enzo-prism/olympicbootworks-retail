"use client"

import { Button } from "@/components/ui/button"
import { fittingInquiryUrl } from "@/lib/fitting-inquiry"
import { trackConversion } from "@/lib/track-conversion"

/** Footer fitting CTA; a client island so the email lead is tracked like every other fitting mailto. */
export default function FooterFittingButton() {
  return (
    <Button asChild size="sm" className="shadow-sm">
      <a href={fittingInquiryUrl()} onClick={() => trackConversion("email_click", { location: "footer_fitting" })}>
        Book a Boot Fitting
      </a>
    </Button>
  )
}
