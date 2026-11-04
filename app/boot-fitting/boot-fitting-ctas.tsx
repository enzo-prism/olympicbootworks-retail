"use client"

import Link from "next/link"
import { Mail, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { phoneHref } from "@/data/locations"
import { fittingInquiryUrl } from "@/lib/fitting-inquiry"
import { trackConversion } from "@/lib/track-conversion"

export function BootFittingPhoneLink({ phone, shopId }: { phone: string; shopId: string }) {
  return (
    <a
      href={phoneHref(phone)}
      className="whitespace-nowrap font-medium text-primary underline-offset-4 hover:underline"
      onClick={() => trackConversion("phone_click", { location: `boot_fitting_stock_${shopId}`, shopId })}
    >
      {phone}
    </a>
  )
}

/** Client CTA row for the boot-fitting closing band (tracked email conversion). */
export default function BootFittingCtas() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xs sm:max-w-none mx-auto">
      <Button asChild variant="on-dark" size="lg" className="w-full sm:w-auto">
        <a
          href={fittingInquiryUrl()}
          onClick={() => trackConversion("email_click", { location: "boot_fitting_closing" })}
        >
          <Mail className="h-5 w-5 mr-2" aria-hidden="true" />
          Book a Fitting
        </a>
      </Button>
      <Button asChild variant="outline-on-dark" size="lg" className="backdrop-blur-sm w-full sm:w-auto">
        <Link href="/pros">
          <Trophy className="h-5 w-5 mr-2" aria-hidden="true" />
          The pros who ski our work
        </Link>
      </Button>
    </div>
  )
}
