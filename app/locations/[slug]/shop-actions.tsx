"use client"

import { Mail, MapPin, Phone } from "lucide-react"
import CopyEmailButton from "@/components/copy-email-button"
import { Button } from "@/components/ui/button"
import { formatCityLine, phoneHref, type LocationAddress } from "@/data/locations"
import { fittingInquiryParts, fittingInquiryUrl } from "@/lib/fitting-inquiry"
import { trackConversion } from "@/lib/track-conversion"

type ShopActionsProps = {
  shopId: string
  address: LocationAddress
  phone: string
  email?: string
}

export default function ShopActions({ shopId, address, phone, email }: ShopActionsProps) {
  const inquiryOptions = { email, locationName: address.city }
  const inquiry = fittingInquiryParts(inquiryOptions)
  const tracking = { location: `location_page_${shopId}`, shopId }
  const destination = `Olympic Bootworks, ${address.line1}, ${formatCityLine(address)}`
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`

  return (
    <>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {email && (
          <Button asChild size="lg" className="sm:col-span-2">
            <a href={fittingInquiryUrl(inquiryOptions)} onClick={() => trackConversion("email_click", tracking)}>
              <Mail aria-hidden="true" />
              Request a fitting by email
            </a>
          </Button>
        )}
        <Button asChild size="lg" variant="outline">
          <a href={phoneHref(phone)} onClick={() => trackConversion("phone_click", tracking)}>
            <Phone aria-hidden="true" />
            Call {phone}
          </a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href={directions} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion("directions_click", tracking)}>
            <MapPin aria-hidden="true" />
            Get directions
          </a>
        </Button>
      </div>
      {email && (
        <CopyEmailButton
          {...inquiry}
          className="mt-3 justify-start text-sm text-muted-foreground"
          emailClassName="text-foreground"
          buttonClassName="text-primary"
          trackingLocation={tracking.location}
          shopId={shopId}
        />
      )}
    </>
  )
}
