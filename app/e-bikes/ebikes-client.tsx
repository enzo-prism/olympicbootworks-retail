"use client"

import { useEffect } from "react"
import Link from "next/link"
import {
  Bike,
  Calendar,
  Mail,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import BikeCard from "@/components/bike-card"
import { trackConversion } from "@/lib/track-conversion"
import { locations } from "@/data/locations"
import { bikes, maxSavingsPct, type BikeFamily } from "@/data/bikes"

const sections: { families: BikeFamily[]; title: string; tagline: string }[] = [
  {
    families: ["trail", "all-mountain"],
    title: "Trail & All-Mountain",
    tagline: "Everyday Tahoe singletrack to big alpine days",
  },
  {
    families: ["enduro", "race"],
    title: "Enduro & Race",
    tagline: "For steep, technical terrain and gravity riding",
  },
  {
    families: ["urban", "scooter"],
    title: "Urban & Around Town",
    tagline: "Commutes, cruises, and campground fun",
  },
]

const trustPoints = [
  {
    icon: Truck,
    title: "Shipping options available",
    text: "Shipping is available. Email the shop to confirm current pricing and delivery details for your bike.",
  },
  {
    icon: Wrench,
    title: "Support from a real bike shop",
    text: "Ask the team about preparation, pickup, delivery, service, and the best next step for your bike.",
  },
  {
    icon: ShieldCheck,
    title: "Authorized Fantic dealer",
    text: "Current warranty guidance, support, and service from two Lake Tahoe stores.",
  },
  {
    icon: MapPin,
    title: "Ride it before you buy it",
    text: "Email or call and we will confirm the current test-ride options for the model you are considering.",
  },
]

const testRideSubject = encodeURIComponent("Fantic Test Ride Request")

export default function EBikesClient() {
  useEffect(() => {
    trackConversion("bike_page_view", { location: "ebikes_hub" })
  }, [])

  return (
    <div className="flex flex-col">
      {/* Sale banner */}
      <section className="bg-primary py-10 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em]">Italian Made Freedom • Fantic Summer Sale</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">
            Up to {maxSavingsPct}% off — while current inventory lasts
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/85">
            Start with a clear model description, then email Buck for current sizing, availability,
            pickup, test-ride, or shipping details.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="on-dark" className="shadow-sm">
              <Link href="#models">
                <Bike className="mr-2 h-5 w-5" aria-hidden="true" />
                Read bike descriptions
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline-on-dark" className="shadow-sm">
              <Link href="#test-ride">
                <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
                Book a test ride
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Model grid by family */}
      <section id="models" className="scroll-mt-24 py-16">
        <div className="container mx-auto px-4">
          {sections.map((group, groupIndex) => {
            const groupBikes = bikes.filter((b) => group.families.includes(b.family))
            if (groupBikes.length === 0) return null
            return (
              <div key={group.title} className="mb-14 last:mb-0">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold md:text-3xl">{group.title}</h2>
                  <p className="mt-1 text-muted-foreground">{group.tagline}</p>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {groupBikes.map((bike, bikeIndex) => (
                    <BikeCard
                      key={bike.id}
                      bike={bike}
                      surface="ebikes_hub"
                      priority={groupIndex === 0 && bikeIndex === 0}
                    />
                  ))}
                </div>
              </div>
            )
          })}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Website prices reflect Buck&apos;s latest approved offers. Email the shop to confirm the
            exact bike, size, color, technical specifications, and checkout details before making a special trip.
          </p>
        </div>
      </section>

      {/* Why buy from us */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold">Why buy from Olympic Bootworks</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Get personal guidance from a real Tahoe shop before choosing your bike.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((point) => (
              <div key={point.title} className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-4 inline-block rounded-full bg-primary/10 p-3 text-primary">
                  <point.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-semibold">{point.title}</h3>
                <p className="text-sm text-muted-foreground">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Test ride */}
      <section id="test-ride" className="scroll-mt-24 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold">Book a Fantic test ride</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Tell us which bike interests you and where you ride. We&apos;ll confirm current test-ride
              options and arrange a time when possible.
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
            {locations.map((location) => (
              <div key={location.id} className="rounded-lg border bg-card p-8 text-center shadow-sm">
                <h3 className="text-xl font-bold">{location.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {location.address.line1}, {location.address.city}
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Button asChild className="shadow-sm">
                    <a
                      href={`mailto:${location.contact.email}?subject=${testRideSubject}`}
                      onClick={() =>
                        trackConversion("test_ride_request", { location: location.id })
                      }
                    >
                      <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                      Email to book a test ride
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a
                      href={`tel:${location.contact.phone.replace(/[^\d+]/g, "")}`}
                      onClick={() => trackConversion("phone_click", { location: location.id })}
                    >
                      <PhoneCall className="mr-2 h-4 w-4" aria-hidden="true" />
                      Call {location.contact.phone}
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current lineup contact */}
      <section className="bg-secondary/50 py-14">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Find your next ride
          </p>
          <h2 className="mt-2 text-2xl font-bold md:text-3xl">Ask about the latest Fantic lineup</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Inventory and model availability change throughout the season. Ask our team what is in
            stock now, what is arriving next, and which bike best fits your riding.
          </p>
          <Button asChild size="lg" className="mt-6 shadow-sm">
            <a
              href={`mailto:buck@olympicbootworks.com?subject=${encodeURIComponent("Latest Fantic Lineup")}`}
              onClick={() => trackConversion("email_click", { location: "ebikes_lineup" })}
            >
              <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
              Ask about the latest lineup
            </a>
          </Button>
        </div>
      </section>
    </div>
  )
}
