import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, PhoneCall, ShoppingCart } from "lucide-react"
import { notFound } from "next/navigation"
import BikeInquiryButton from "@/components/bike-inquiry-button"
import CopyEmailButton from "@/components/copy-email-button"
import { Button } from "@/components/ui/button"
import {
  bikes,
  familyLabels,
  formatPrice,
  getBikeBySlug,
  savingsPct,
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
    description: `${bike.blurb} Read the plain-language description, compare the sale price, and email Olympic Bootworks about current sizing and availability.`,
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
    image: bike.image,
    description: bike.overview,
    brand: { "@type": "Brand", name: "Fantic" },
    offers: {
      "@type": "Offer",
      url: `https://www.olympicbootworks.com/e-bikes/${bike.slug}`,
      price: bike.price,
      priceCurrency: "USD",
      availability: bike.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: "Olympic Bootworks" },
    },
  }

  return (
    <div className="fantic-theme border-b bg-gradient-to-b from-red-50/70 via-background to-background dark:from-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="container mx-auto px-4 py-8 md:py-14">
        <Link
          href="/e-bikes#models"
          className="mb-8 inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
          Back to all Fantic models
        </Link>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-square overflow-hidden rounded-2xl border bg-white shadow-sm">
            <Image
              src={bike.image}
              alt={`Fantic ${bike.name}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-6 md:p-10"
            />
            <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground shadow">
              Save {savingsPct(bike)}%
            </span>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              {familyLabels[bike.family]}
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
              Fantic {bike.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-bold">{formatPrice(bike.price)}</span>
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(bike.compareAtPrice)}
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900">
                {bike.inStock ? "Listed as in stock" : "Ask about availability"}
              </span>
            </div>

            <p className="mt-7 text-lg leading-8 text-muted-foreground">{bike.overview}</p>

            <div className="mt-8 rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-bold">A good match for</h2>
              <ul className="mt-4 space-y-3">
                {bike.goodFor.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 rounded-xl bg-primary/5 p-6">
              <h2 className="text-xl font-bold">Ask Buck about this bike</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Email Buck with the model already filled in. He can confirm current size and color
                choices, share the exact technical specifications for the bike in stock, answer
                questions, and explain pickup, test-ride, or shipping next steps.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <BikeInquiryButton bike={bike} className="sm:flex-1" />
                <Button asChild size="lg" variant="outline" className="sm:flex-1">
                  <a href="tel:+15305810747">
                    <PhoneCall className="mr-2 h-4 w-4" aria-hidden="true" />
                    Call Buck
                  </a>
                </Button>
              </div>
              <CopyEmailButton
                email="buck@olympicbootworks.com"
                className="mt-4 justify-start text-sm text-muted-foreground"
                emailClassName="text-foreground"
                buttonClassName="text-primary"
              />
            </div>

            <div className="mt-6 text-center sm:text-left">
              {bike.checkoutPrice === undefined || bike.checkoutPrice === bike.price ? (
                <Button asChild variant="link" className="px-0 text-muted-foreground">
                  <Link href={bike.shopUrl}>
                    <ShoppingCart className="mr-2 h-4 w-4" aria-hidden="true" />
                    View secondary online purchase options
                  </Link>
                </Button>
              ) : (
                <p className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground">
                  Online checkout is being updated. Email Buck to get the owner-confirmed {formatPrice(bike.price)} price.
                </p>
              )}
              <p className="mt-1 text-xs text-muted-foreground">
                Availability changes. Email the shop before making a special trip.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
