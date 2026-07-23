"use client"

import Link from "next/link"
import { Mail, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fittingInquiryUrl } from "@/lib/fitting-inquiry"
import { trackConversion } from "@/lib/track-conversion"

/** Client CTA row for the boot-fitting closing band (tracked email conversion). */
export default function BootFittingCtas() {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <Button asChild variant="on-dark" size="lg">
        <a
          href={fittingInquiryUrl()}
          onClick={() => trackConversion("email_click", { location: "boot_fitting_closing" })}
        >
          <Mail className="h-5 w-5 mr-2" aria-hidden="true" />
          Request a Fitting
        </a>
      </Button>
      <Button asChild variant="outline-on-dark" size="lg" className="backdrop-blur-sm">
        <Link href="/pros">
          <Trophy className="h-5 w-5 mr-2" aria-hidden="true" />
          The pros who ski our work
        </Link>
      </Button>
    </div>
  )
}
