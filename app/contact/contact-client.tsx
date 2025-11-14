"use client"
import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import VimeoVideoHero from "@/components/vimeo-video-hero"
import LocationCard from "@/components/location-card"
import { locations } from "@/data/locations"
import VimeoApiScript from "@/components/vimeo-api-script"
import { trackConversion } from "@/lib/track-conversion"

export default function ContactClient() {
  useEffect(() => {
    trackConversion('contact_page_view')
  }, [])
  const faqs = [
    {
      question: "Do I need an appointment for equipment service?",
      answer:
        "While we accept walk-ins, we recommend scheduling an appointment for services like boot fitting and bike service, especially during peak season.",
    },
    {
      question: "How far in advance should I book lessons?",
      answer:
        "We recommend booking lessons at least 48 hours in advance, especially during holidays and weekends. For private lessons with specific instructors, booking 1-2 weeks ahead is advised.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "For services and lessons, we require 24-hour notice for cancellations. Late cancellations or no-shows may be subject to a fee.",
    },
  ]

  return (
    <div className="flex flex-col">
      <VimeoApiScript />
      <VimeoVideoHero
        title="Contact Us"
        subtitle="Schedule an appointment or ask our team a question"
        videoId="1085840202"
        height="small"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Locations</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Visit us at either of our two convenient locations in Lake Tahoe.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Get in Touch</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Contact us directly via email for appointments, questions, or equipment inquiries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card border rounded-lg p-8 shadow-sm">
                <h4 className="text-2xl font-bold mb-4">North Lake Tahoe</h4>
                <p className="text-muted-foreground mb-2">Olympic Valley Location</p>
                <p className="text-sm text-muted-foreground mb-6">1602 Squaw Valley Road, Box 3514</p>
                <Button asChild size="lg" className="w-full">
                  <Link 
                    href="mailto:buck@olympicbootworks.com"
                    onClick={() => trackConversion('email_click', { location: 'north_lake_tahoe' })}
                  >
                    Email buck@olympicbootworks.com
                  </Link>
                </Button>
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
                <h4 className="text-2xl font-bold mb-4">South Lake Tahoe</h4>
                <p className="text-muted-foreground mb-2">Ski Run Blvd Location</p>
                <p className="text-sm text-muted-foreground mb-6">1235 Ski Run Blvd.</p>
                <Button asChild size="lg" className="w-full">
                  <Link 
                    href="mailto:SouthLake@Olympicbootworks.com"
                    onClick={() => trackConversion('email_click', { location: 'south_lake_tahoe' })}
                  >
                    Email SouthLake@Olympicbootworks.com
                  </Link>
                </Button>
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

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Find Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We have two convenient locations to serve you in the Lake Tahoe area.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {locations.map((location) => (
              <div key={location.id} className="aspect-video w-full rounded-lg overflow-hidden border shadow-sm">
                <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex flex-col items-center justify-center p-4">
                  <h3 className="font-semibold mb-2">{location.name}</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    {location.address.line1}, {location.address.city}, {location.address.state} {location.address.zip}
                  </p>
                  <Button asChild size="sm" className="shadow-sm">
                    <Link
                      href={`https://maps.google.com/?q=${encodeURIComponent(
                        `${location.address.line1}, ${location.address.city}, ${location.address.state} ${location.address.zip}`,
                      )}`}
                      target="_blank"
                    >
                      View on Google Maps
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to our most commonly asked questions.
            </p>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg p-6 bg-card shadow-sm">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
