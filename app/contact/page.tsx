import type { Metadata } from "next"
import ContactClient from "./contact-client"

export const metadata: Metadata = {
  title: "Contact & Lake Tahoe Locations",
  description:
    "Contact Olympic Bootworks to book a custom boot fitting, ask about products, or visit our North Lake Tahoe and South Lake Tahoe locations.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact & Lake Tahoe Locations | Olympic Bootworks",
    description:
      "Contact Olympic Bootworks to book a custom boot fitting, ask about products, or visit our North Lake Tahoe and South Lake Tahoe locations.",
    url: "https://www.olympicbootworks.com/contact",
    type: "website",
  },
}

export default function ContactPage() {
  return (
    <>
      <section className="container mx-auto px-4 py-6 text-sm text-muted-foreground" aria-label="Contact introduction">
        <h1 className="mb-2 text-base font-semibold text-foreground">Contact Olympic Bootworks</h1>
        <p>
          Book a fitting or ask a question. Contact the location that works best for you: Olympic Valley or South Lake Tahoe.
        </p>
      </section>
      <ContactClient />
    </>
  )
}
