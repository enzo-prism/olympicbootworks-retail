"use client"

import { usePathname } from "next/navigation"
import { locationUrl, locations } from "@/data/locations"
import { Button } from "@/components/ui/button"
import { fittingInquiryUrl } from "@/lib/fitting-inquiry"
import { trackConversion } from "@/lib/track-conversion"

/** Footer fitting CTA; a client island so the email lead is tracked like every other fitting mailto. */
export default function FooterFittingButton() {
  const pathname = usePathname()
  const shop = locations.find((location) => locationUrl(location) === pathname)
  const href = shop ? fittingInquiryUrl({ email: shop.contact.email, locationName: shop.address.city }) : fittingInquiryUrl()

  return (
    <Button asChild size="sm" className="shadow-sm">
      <a
        href={href}
        onClick={() => trackConversion("email_click", { location: "footer_fitting", shopId: shop?.id })}
      >
        Book a Boot Fitting
      </a>
    </Button>
  )
}
