"use client"
import Link from "next/link"
import Script from "next/script" // Import the Script component
import { Button } from "@/components/ui/button"
// Removed Input, Textarea, Calendar, Popover, format, CalendarIcon, CheckCircle as they were part of the old form
import VimeoVideoHero from "@/components/vimeo-video-hero"
import LocationCard from "@/components/location-card"
import { locations } from "@/data/locations"
// Removed cn as it was used for the calendar button
import VimeoApiScript from "@/components/vimeo-api-script"

export default function ContactPage() {
  // Removed useState for date, formSubmitted, isPending and handleSubmit function

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
      {/* Load Vimeo API */}
      <VimeoApiScript />

      {/* Hero Section with Vimeo Background */}
      <VimeoVideoHero
        title="Contact Us"
        subtitle="Schedule an appointment or ask our team a question"
        videoId="1085840202"
        height="small"
      />

      {/* Locations Section */}
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

      {/* Contact Form Section - Replaced with Typeform */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">Contact Form</h3>
            <div className="bg-card border rounded-lg p-6 shadow-sm min-h-[500px]">
              {" "}
              {/* Added min-h for better initial rendering */}
              <div data-tf-live="01JXV0J8RSVSNPNMFE402ZMF8X"></div>
            </div>
          </div>
        </div>
      </section>
      <Script src="//embed.typeform.com/next/embed.js" strategy="lazyOnload" />

      {/* Map Section */}
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

      {/* FAQ Section */}
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

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="max-w-2xl mx-auto mb-8">Subscribe to our newsletter for updates, special offers, and events.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            {/* The Input component was removed from imports, ensure it's re-added if needed or this section is updated */}
            {/* For now, assuming Input is still available from a global context or needs to be re-imported if this section is kept */}
            <input
              type="email"
              placeholder="Your email address"
              className="bg-primary-foreground text-primary p-2 rounded-md border border-primary-foreground/50 focus:ring-2 focus:ring-secondary"
            />
            <Button variant="secondary" className="text-secondary-foreground shadow-sm">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
