"use client"
import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import ButtonIcon from "@/components/button-icon"
import CopyEmailButton from "@/components/copy-email-button"
import { Button } from "@/components/ui/button"
import LocationCard from "@/components/location-card"
import { locations, seasonalScheduleNotice } from "@/data/locations"
import { fittingInquiryParts, fittingInquiryUrl } from "@/lib/fitting-inquiry"
import { trackConversion } from "@/lib/track-conversion"

const northInquiryOptions = { locationName: "Olympic Valley (North Lake Tahoe)" }
const southInquiryOptions = {
  email: "SouthLake@Olympicbootworks.com",
  locationName: "South Lake Tahoe",
}

export default function ContactClient() {
  useEffect(() => {
    trackConversion('contact_page_view')
  }, [])
  const northInquiry = fittingInquiryParts(northInquiryOptions)
  const southInquiry = fittingInquiryParts(southInquiryOptions)
  const faqs = [
    {
      question: "Are you open right now?",
      answer:
        seasonalScheduleNotice.summary,
    },
    {
      question: "Can I walk in?",
      answer:
        "Please call or email your preferred shop before visiting. The team will confirm an appointment and the current schedule for your visit.",
    },
    {
      question: "When do regular hours resume?",
      answer:
        "Regular store hours resume in the fall. Email or call either location for the most current availability.",
    },
  ]

  return (
    <div className="flex flex-col">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Our Locations</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {seasonalScheduleNotice.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {locations.map((location) => (
              <div key={location.id} id={location.id} className="scroll-mt-36">
                <LocationCard location={location} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/60">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">Get in Touch</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                For <Link href="/boot-fitting" className="text-primary underline underline-offset-4">ski boot fitting</Link>,
                email your preferred location with your dates, current boots, and fit concerns. For
                {" "}<Link href="/e-bikes" className="text-primary underline underline-offset-4">Fantic e-bikes</Link>,
                email Buck with the model and your riding goals to confirm sizing and availability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card border rounded-lg p-8 shadow-sm">
                <h3 className="font-sans tracking-normal text-2xl font-bold mb-4">North Lake Tahoe</h3>
                <p className="text-muted-foreground mb-2">Olympic Valley Location</p>
                <p className="text-sm text-muted-foreground mb-6">1602 Squaw Valley Road, Box 3514</p>
                <Button asChild size="lg" className="w-full">
                  <a
                    href={fittingInquiryUrl(northInquiryOptions)}
                    onClick={() => trackConversion('email_click', { location: 'north_lake_tahoe' })}
                  >
                    <ButtonIcon label="Request an Appointment" href="mailto:buck@olympicbootworks.com" />
                    Request Appointment
                  </a>
                </Button>
                <CopyEmailButton
                  email={northInquiry.email}
                  subject={northInquiry.subject}
                  body={northInquiry.body}
                  className="mt-3 justify-start text-sm text-muted-foreground"
                  emailClassName="text-foreground"
                  buttonClassName="text-primary"
                  trackingLocation="contact_north_lake_tahoe"
                />
                <p className="text-sm text-muted-foreground mt-3">
                  <a
                    href={fittingInquiryUrl(northInquiryOptions)}
                    className="hover:text-primary hover:underline break-all"
                    onClick={() => trackConversion('email_click', { location: 'north_lake_tahoe' })}
                  >
                    buck@olympicbootworks.com
                  </a>
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  Phone: <a 
                    href="tel:+15305810747" 
                    className="text-primary hover:underline"
                    onClick={() => trackConversion('phone_click', { location: 'north_lake_tahoe' })}
                  >
                    (530) 581-0747
                  </a>
                </p>
              </div>

              <div className="bg-card border rounded-lg p-8 shadow-sm">
                <h3 className="font-sans tracking-normal text-2xl font-bold mb-4">South Lake Tahoe</h3>
                <p className="text-muted-foreground mb-2">Ski Run Blvd Location</p>
                <p className="text-sm text-muted-foreground mb-6">1235 Ski Run Blvd.</p>
                <Button asChild size="lg" className="w-full">
                  <a
                    href={fittingInquiryUrl(southInquiryOptions)}
                    onClick={() => trackConversion('email_click', { location: 'south_lake_tahoe' })}
                  >
                    <ButtonIcon
                      label="Request an Appointment"
                      href="mailto:SouthLake@Olympicbootworks.com"
                    />
                    Request Appointment
                  </a>
                </Button>
                <CopyEmailButton
                  email={southInquiry.email}
                  subject={southInquiry.subject}
                  body={southInquiry.body}
                  className="mt-3 justify-start text-sm text-muted-foreground"
                  emailClassName="text-foreground"
                  buttonClassName="text-primary"
                  trackingLocation="contact_south_lake_tahoe"
                />
                <p className="text-sm text-muted-foreground mt-3">
                  <a
                    href={fittingInquiryUrl(southInquiryOptions)}
                    className="hover:text-primary hover:underline break-all"
                    onClick={() => trackConversion('email_click', { location: 'south_lake_tahoe' })}
                  >
                    SouthLake@Olympicbootworks.com
                  </a>
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  Phone: <a 
                    href="tel:+15306004056" 
                    className="text-primary hover:underline"
                    onClick={() => trackConversion('phone_click', { location: 'south_lake_tahoe' })}
                  >
                    (530) 600-4056
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Find Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {seasonalScheduleNotice.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {locations.map((location) => (
              <div key={location.id} className="relative aspect-video w-full rounded-lg overflow-hidden border shadow-sm">
                <Image
                  src={location.flagship ? "/images/shop-exterior.jpg" : "/ski-boot-fitting-station.jpg"}
                  alt={`Olympic Bootworks — ${location.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-transparent" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-sans tracking-normal font-semibold text-white">{location.name}</h3>
                  <p className="mt-1 text-sm text-white/80">
                    {location.address.line1}, {location.address.city}, {location.address.state} {location.address.zip}
                  </p>
                  <Button asChild size="sm" className="mt-4 shadow-sm">
                    <Link
                      href={`https://maps.google.com/?q=${encodeURIComponent(
                        `${location.address.line1}, ${location.address.city}, ${location.address.state} ${location.address.zip}`,
                      )}`}
                      target="_blank"
                    >
                      <ButtonIcon label="View on Google Maps" href="https://maps.google.com" />
                      View on Google Maps
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/60">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to our most commonly asked questions.
            </p>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg p-6 bg-card shadow-sm">
                <h3 className="font-sans tracking-normal text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
