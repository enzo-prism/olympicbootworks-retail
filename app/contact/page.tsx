import { pageMetadata } from "@/lib/seo"
import { fittingInquiryUrl } from "@/lib/fitting-inquiry"
import ContactClient from "./contact-client"
import MinimalPageHero from "@/components/minimal-page-hero"
import { GoogleGIcon } from "@/components/google-g-icon"
import { GOOGLE_BUSINESS_REVIEW_URL } from "@/lib/google-business"
import { northLakeLocation, phoneHref, seasonalScheduleNotice } from "@/data/locations"

export const metadata = pageMetadata({
  title: "Contact & Lake Tahoe Locations",
  description: "Contact Olympic Bootworks to book a boot fitting, ask about ski boots in stock, or reach our North Lake Tahoe and South Lake Tahoe locations.",
  path: "/contact",
})

export default function ContactPage() {
  return (
    <>
      <MinimalPageHero
        eyebrow="Two Tahoe locations"
        title="Contact Olympic Bootworks"
        description={seasonalScheduleNotice.summary}
        actions={[
          { href: fittingInquiryUrl(), label: "Book a Fitting" },
          { href: phoneHref(northLakeLocation.contact.phone), label: "Call North Lake", variant: "secondary" },
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
