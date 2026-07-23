import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, Mail } from "lucide-react"
import { notFound } from "next/navigation"
import BikeInquiryButton from "@/components/bike-inquiry-button"
import BikeCallButton from "@/components/bike-call-button"
import BikeStickyInquiryBar from "@/components/bike-sticky-inquiry-bar"
import CopyEmailButton from "@/components/copy-email-button"
import { GoogleGIcon } from "@/components/google-g-icon"
import { GOOGLE_BUSINESS_PROFILE_URL } from "@/lib/google-business"
import {
  bikes,
  familyLabels,
  formatPrice,
  getBikeBySlug,
} from "@/data/bikes"

type BikeDetailPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return bikes.map((bike) => ({ slug: bike.slug }))
}

export async function generateMetadata({ params }: BikeDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const bike = getBikeBySlug(slug)
  if (!bike) return {}

  return {
    title: `Fantic ${bike.name} — Description, Price & Inquiry`,
    description: `${bike.blurb} Read the plain-language description, see the current website price, and email Olympic Bootworks about sizing and availability.`,
    alternates: { canonical: `/e-bikes/${bike.slug}` },
    openGraph: {
      title: `Fantic ${bike.name} | Olympic Bootworks`,
      description: bike.blurb,
      url: `https://www.olympicbootworks.com/e-bikes/${bike.slug}`,
      type: "website",
      images: [bike.image],
    },
  }
}

export default async function BikeDetailPage({ params }: BikeDetailPageProps) {
  const { slug } = await params
  const bike = getBikeBySlug(slug)
  if (!bike) notFound()

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Fantic ${bike.name}`,
    image: `https://www.olympicbootworks.com${bike.image}`,
    description: bike.overview,
    brand: { "@type": "Brand", name: "Fantic" },
    offers: {
      "@type": "Offer",
      url: `https://www.olympicbootworks.com/e-bikes/${bike.slug}`,
      price: bike.price,
      priceCurrency: "USD",
      seller: { "@type": "Organization", name: "Olympic Bootworks" },
    },
  }

  return (
    <div className="fantic-theme border-b bg-gradient-to-b from-red-50/70 via-background to-background dark:from-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c") }}
      />

      <BikeStickyInquiryBar bike={bike} />

      <div className="container mx-auto px-4 py-8 pb-24 md:py-14 lg:pb-14">
        <Link
          href="/e-bikes#models"
          className="mb-8 inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
          Back to all Fantic models
        </Link>

        <div className="grid min-w-0 items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative min-w-0 aspect-[4/3] overflow-hidden rounded-lg border bg-white sm:aspect-square">
            <Image
              src={bike.image}
              alt={`Fantic ${bike.name}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-6 md:p-10"
            />
            <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground shadow">
              Current price
            </span>
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              {familyLabels[bike.family]}
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
              Fantic {bike.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-baseline gap-3">
              <span className="sr-only">Current price: </span>
              <span className="text-3xl font-bold">{formatPrice(bike.price)}</span>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground">
                Contact Buck to confirm availability
              </span>
            </div>

            <BikeInquiryButton bike={bike} className="mt-5 w-full lg:hidden" />

            <p className="mt-7 text-lg leading-8 text-muted-foreground">{bike.overview}</p>

            <div className="mt-8 rounded-lg border bg-card p-6">
              <h2 className="font-sans tracking-normal text-lg font-bold">A good match for</h2>
              <ul className="mt-4 space-y-3">
                {bike.goodFor.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 rounded-lg bg-primary/5 p-6">
              <h2 className="font-sans tracking-normal text-xl font-bold">Ask Buck about this bike</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Email Buck with the model already filled in. He can confirm current size and color
                choices, share the exact technical specifications for the bike being offered, answer
                questions, and explain pickup, test-ride, or shipping next steps.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <BikeInquiryButton bike={bike} className="sm:flex-1" />
                <BikeCallButton bike={bike} className="sm:flex-1" />
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-primary/10 pt-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                  Authorized Fantic dealer
                </span>
                <a
                  href={GOOGLE_BUSINESS_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-foreground underline-offset-4 hover:underline"
                >
                  <GoogleGIcon className="h-4 w-4" />
                  Read our Google reviews
                </a>
              </div>
              <CopyEmailButton
                email="buck@olympicbootworks.com"
                className="mt-4 justify-start text-sm text-muted-foreground"
                emailClassName="text-foreground"
                buttonClassName="text-primary"
                trackingLocation={`ebike_${bike.slug}_email_copy`}
                contentId={bike.slug}
                contentName={`Fantic ${bike.name}`}
              />
            </div>

            <div className="mt-6 rounded-lg border p-6">
              <h2 className="font-sans tracking-normal text-lg font-bold">How to get this bike</h2>
              <ol className="mt-4 grid gap-4 text-sm text-muted-foreground sm:grid-cols-3">
                <li><span className="font-semibold text-foreground">1. Ask Buck</span><br />Email the model and your riding goals.</li>
                <li><span className="font-semibold text-foreground">2. Confirm the bike</span><br />Buck will confirm size, color, specifications, and availability.</li>
                <li><span className="font-semibold text-foreground">3. Arrange the handoff</span><br />Plan a test ride, pickup, or available shipping and payment options.</li>
              </ol>
              <p className="mt-5 flex gap-2 rounded-lg bg-muted p-4 text-sm text-foreground">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                Olympic Bootworks does not use online checkout for these bikes. The listed price is {formatPrice(bike.price)}; availability changes, so contact the shop before making a special trip.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
