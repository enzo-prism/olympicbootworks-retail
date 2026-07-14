import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Bike, Check, Footprints, Mail, PhoneCall } from "lucide-react"
import BikeInquiryButton from "@/components/bike-inquiry-button"
import MinimalPageHero from "@/components/minimal-page-hero"
import { Button } from "@/components/ui/button"
import { bikeDetailUrl, bikes, formatPrice } from "@/data/bikes"

export const metadata: Metadata = {
  title: "How to Get a Fantic E-Bike",
  description:
    "See current Fantic e-bike prices, compare models, and contact Buck Brown directly about availability, sizing, test rides, pickup, or shipping.",
  alternates: { canonical: "/shop" },
}

const steps = [
  {
    number: "01",
    title: "Compare models and prices",
    text: "Read the plain-language descriptions and choose the Fantic that best matches your riding.",
  },
  {
    number: "02",
    title: "Email Buck",
    text: "Tell Buck the model, your height or usual bike size, where you ride, and whether you need pickup or shipping.",
  },
  {
    number: "03",
    title: "Confirm the bike and next steps",
    text: "Buck will confirm availability, exact specifications, test-ride options, payment, pickup, or available shipping.",
  },
]

export default function HowToBuyPage() {
  return (
    <div className="fantic-theme flex flex-col">
      <MinimalPageHero
        eyebrow="Fantic • Italian Made Freedom"
        title="How to Get Your Fantic E-Bike"
        description="There is no online checkout. Start with the current models and listed prices, then work directly with Buck to confirm the exact bike and arrange the purchase."
        actions={[
          { href: "/e-bikes", label: "See models & prices" },
          {
            href: "mailto:buck@olympicbootworks.com?subject=Fantic%20E-Bike%20Question",
            label: "Email Buck",
            variant: "secondary",
          },
        ]}
      />

      <section className="border-b bg-secondary/40 py-14" aria-labelledby="bike-process-heading">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Simple and personal</p>
            <h2 id="bike-process-heading" className="mt-2 text-3xl font-bold">Three steps from interest to your bike</h2>
          </div>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <li key={step.number} className="rounded-xl border bg-card p-6 shadow-sm">
                <span className="text-sm font-bold text-primary">{step.number}</span>
                <h3 className="mt-3 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-8 flex max-w-3xl gap-3 rounded-xl border border-primary/20 bg-primary/5 p-5 text-sm leading-6">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            Olympic Bootworks does not use online checkout for these bikes. The prices below are the current website prices; contact Buck to confirm current size, color, specifications, and availability.
          </p>
        </div>
      </section>

      <section className="py-16" aria-labelledby="current-prices-heading">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Current listed prices</p>
            <h2 id="current-prices-heading" className="mt-2 text-3xl font-bold">Choose a model to start the conversation</h2>
            <p className="mt-3 text-muted-foreground">Every email is prefilled with the model and price so Buck can respond with the right details.</p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
            {bikes.map((bike) => (
              <article key={bike.slug} className="rounded-xl border bg-card p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">Fantic</p>
                    <h3 className="mt-1 text-xl font-bold">{bike.name}</h3>
                  </div>
                  <p className="text-xl font-bold" aria-label={`Current price ${formatPrice(bike.price)}`}>
                    {formatPrice(bike.price)}
                  </p>
                </div>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <Button asChild size="lg" variant="outline" className="sm:flex-1">
                    <Link href={bikeDetailUrl(bike)}>
                      View details
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <BikeInquiryButton bike={bike} label="Ask Buck" className="sm:flex-1" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container mx-auto grid gap-6 px-4 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-7 shadow-sm">
            <Bike className="h-7 w-7 text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold">Need help choosing a bike?</h2>
            <p className="mt-3 text-muted-foreground">Tell Buck where you ride and what you want from the bike. He can narrow the lineup and arrange a test ride when possible.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <a href="mailto:buck@olympicbootworks.com?subject=Help%20Choosing%20a%20Fantic%20E-Bike">
                  <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                  Email Buck
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="tel:+15305810747">
                  <PhoneCall className="mr-2 h-4 w-4" aria-hidden="true" />
                  Call Buck
                </a>
              </Button>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-7 shadow-sm">
            <Footprints className="h-7 w-7 text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold">Looking for ski boots or liners?</h2>
            <p className="mt-3 text-muted-foreground">Boots, ZipFit liners, custom footbeds, and fitting services are handled personally at the shop.</p>
            <Button asChild variant="outline" className="mt-6">
              <Link href="/contact">Request a fitting or ask a question</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
