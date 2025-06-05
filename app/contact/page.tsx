"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, CheckCircle } from "lucide-react"
import VimeoVideoHero from "@/components/vimeo-video-hero"
import LocationCard from "@/components/location-card"
import { locations } from "@/data/locations"
import { cn } from "@/lib/utils"
import VimeoApiScript from "@/components/vimeo-api-script"

export default function ContactPage() {
  const [date, setDate] = useState<Date>()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPending(true)
    // Simulate a form submission delay
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setFormSubmitted(true)
    setIsPending(false)
  }

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

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card border rounded-lg p-6 shadow-sm">
              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                  <p className="text-muted-foreground mb-6">
                    Your message has been received. We'll get back to you as soon as possible.
                  </p>
                  <Button onClick={() => setFormSubmitted(false)} className="shadow-sm">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-6">Contact Form</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-medium">
                          First Name
                        </label>
                        <Input id="firstName" required />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-medium">
                          Last Name
                        </label>
                        <Input id="lastName" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" required />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone
                      </label>
                      <Input id="phone" type="tel" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Preferred Date (Optional)</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal shadow-sm",
                              !date && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Select a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea id="message" rows={4} required />
                    </div>

                    <Button type="submit" disabled={isPending} className="w-full shadow-sm">
                      {isPending ? "Submitting..." : "Submit"}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

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
                {/* In a real application, you would embed a Google Map here */}
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
            {[
              {
                question: "Do I need an appointment for equipment service?",
                answer:
                  "While we accept walk-ins, we recommend scheduling an appointment for ski tuning, boot fitting, and bike service, especially during peak season.",
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
              {
                question: "Do you offer season-long rentals?",
                answer:
                  "Yes, we offer season-long ski and snowboard rentals for both adults and growing children. Our kids' program includes a mid-season size adjustment if needed.",
              },
            ].map((faq, index) => (
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
            <Input type="email" placeholder="Your email address" className="bg-primary-foreground text-primary" />
            <Button variant="secondary" className="text-secondary-foreground shadow-sm">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
