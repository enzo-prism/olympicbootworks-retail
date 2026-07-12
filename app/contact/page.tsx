import type { Metadata } from "next"
import ContactClient from "./contact-client"
import MinimalPageHero from "@/components/minimal-page-hero"
import { GoogleGIcon } from "@/components/google-g-icon"
import { GOOGLE_BUSINESS_REVIEW_URL } from "@/lib/google-business"
import { seasonalScheduleNotice } from "@/data/locations"

export const metadata: Metadata = {
  title: "Contact & Lake Tahoe Locations",
  description:
    "Contact Olympic Bootworks to request an appointment, ask about products, or reach our North Lake Tahoe and South Lake Tahoe locations.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact & Lake Tahoe Locations | Olympic Bootworks",
    description:
      "Contact Olympic Bootworks to request an appointment, ask about products, or reach our North Lake Tahoe and South Lake Tahoe locations.",
    url: "https://www.olympicbootworks.com/contact",
    type: "website",
    images: ["/images/og-default.png"],
  },
}

export default function ContactPage() {
  return (
    <>
      <MinimalPageHero
        eyebrow="Two Tahoe locations"
        title="Contact Olympic Bootworks"
        description={seasonalScheduleNotice.summary}
        actions={[
          { href: "mailto:buck@olympicbootworks.com", label: "Request Appointment" },
          { href: "tel:+15305810747", label: "Call North Lake", variant: "secondary" },
          {
            href: GOOGLE_BUSINESS_REVIEW_URL,
            label: "Leave a Google review",
            variant: "secondary",
            external: true,
            leadingIcon: <GoogleGIcon className="h-[1.15rem] w-[0.8rem]" />,
          },
        ]}
      />
      <ContactClient />
    </>
  )
}
