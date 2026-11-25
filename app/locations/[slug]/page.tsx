import { ShopHours } from "@/components/shop-hours"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { GoogleReviewButton } from "@/components/google-review-button"
import SiteImage from "@/components/site-image"
import StockPill from "@/components/stock-pill"
import { formatCityLine, locationUrl, locations, seasonalScheduleNotice } from "@/data/locations"
import { shopFaqs } from "@/data/shop-faqs"
import { breadcrumbJsonLd, pageMetadata, serializeJsonLd, SITE_URL, WEBSITE_ID } from "@/lib/seo"
import ShopActions from "./shop-actions"

type ShopPageProps = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return locations.map(({ id }) => ({ slug: id }))
}

export async function generateMetadata({ params }: ShopPageProps): Promise<Metadata> {
  const { slug } = await params
  const shop = locations.find(({ id }) => id === slug)
  if (!shop) notFound()

  const { address, flagship } = shop
  return pageMetadata({
    title: `Custom Ski Boot Fitting in ${address.city}, CA`,
    description: flagship
      ? "Visit Olympic Bootworks’ North Lake Tahoe flagship in Olympic Valley for ski boots, custom fitting, and Heel-Loc footbeds. Get directions or request a fitting."
      : "Book a custom ski boot fitting at Olympic Bootworks on Ski Run Boulevard in South Lake Tahoe. Get directions, call the shop, or ask about ski boots and liners.",
    path: locationUrl(shop),
  })
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { slug } = await params
  const shop = locations.find(({ id }) => id === slug)
  if (!shop) notFound()

  const otherShop = locations.find(({ id }) => id !== shop.id)
  const { address, flagship } = shop
  const city = address.city
  const path = locationUrl(shop)
  const faqs = shopFaqs(shop)
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": ["WebPage", "FAQPage"],
      "@id": `${SITE_URL}${path}#webpage`,
      url: `${SITE_URL}${path}`,
      name: `Olympic Bootworks in ${city}`,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": `${SITE_URL}/#${shop.id}` },
      mainEntity: faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Contact & Locations", path: "/contact" },
      { name: city, path },
    ]),
  ]

  return (
    <div className="bg-gradient-to-b from-primary/5 via-background to-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-14">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link href="/contact" className="text-primary hover:underline">Contact &amp; Locations</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{city}</span>
        </nav>
        <div className="mt-8 grid items-start gap-8 md:mt-12 lg:grid-cols-2 lg:gap-x-16">
          <section>
            <p className="text-sm font-semibold text-primary">
              {flagship ? "North Lake Tahoe flagship" : "Ski Run Boulevard shop"}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Custom Ski Boot Fitting in {city}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {flagship
                ? `Visit the original Olympic Bootworks shop in Olympic Valley, near ${shop.nearbySkiArea}. We fit new ski boots and can assess the pair you already ski in for shell, liner, or footbed work.`
                : `Our South Lake Tahoe shop is on Ski Run Boulevard, near ${shop.nearbySkiArea}. Come in for a new ski boot fitting, or bring the boots you already ski in so we can look at pressure points, heel movement, or liner fit.`}
            </p>
            {flagship && (
              <SiteImage src="/images/shop-exterior.jpg" alt="The Olympic Valley shop near Palisades Tahoe" width={720} height={440} sizes="(min-width: 1024px) 50vw, 100vw" className="mt-6 aspect-video w-full rounded-xl object-cover" />
            )}
            <div className="mt-6">
              <StockPill>{seasonalScheduleNotice.bannerPrimaryShort}</StockPill>
            </div>
          </section>

          <section className="min-w-0 rounded-xl border bg-card p-6 shadow-sm md:p-8 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <h2 className="text-2xl font-semibold">Visit the {city} shop</h2>
            <address className="mt-4 not-italic leading-relaxed text-muted-foreground">
              Olympic Bootworks<br />
              {address.line1}<br />
              {formatCityLine(address)}
            </address>
            <p className="mt-4 text-sm text-muted-foreground">
              {flagship
                ? "From Highway 89, take Olympic Valley Road toward Palisades Tahoe. Use the shop pin for directions to the storefront. The Google listing identifies accessible parking."
                : "From US 50, turn onto Ski Run Boulevard and follow the map to the shop."}
            </p>
            <p className="mt-2 text-sm text-muted-foreground"><ShopHours location={shop} details /></p>
            <ShopActions shopId={shop.id} address={address} phone={shop.contact.phone} email={shop.contact.email} />
            <p className="mt-4 text-sm text-muted-foreground">
              The shop will reply to confirm availability and arrange your fitting. If you need parking or unloading directions before arriving, call this shop.
            </p>
            <GoogleReviewButton shop={shop} size="sm" analyticsItemId="google_review_location" className="mt-4" />
          </section>

          <section className="space-y-3 border-t pt-6">
            <h2 className="text-2xl font-semibold">Before your fitting</h2>
            <p className="text-muted-foreground">
              Share your preferred dates, what you ski, and any fit issues. If you want help with boots you own,
              bring them to the appointment so the fitter can check the shell, liner, and footbed together.
            </p>
            <Link href="/boot-fitting" className="inline-flex items-center gap-2 font-medium text-primary hover:underline">
              Explore the fitting process <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </section>
        </div>

        <section aria-labelledby="shop-questions" className="mt-12 border-t pt-10 md:mt-16 md:pt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Quick answers</p>
          <h2 id="shop-questions" className="mt-3 text-3xl font-semibold md:text-4xl">
            {city} shop questions
          </h2>
          <dl className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {faqs.map(({ question, answer }) => (
              <div key={question}>
                <dt className="font-sans text-lg font-semibold tracking-normal">{question}</dt>
                <dd className="mt-2 break-words leading-relaxed text-muted-foreground">{answer}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 text-muted-foreground">
            Services at this shop include{" "}
            <Link href="/boot-fitting" className="font-medium text-primary hover:underline">custom ski boot fitting</Link>,
            shell and liner work, <Link className="text-primary underline" href="/boot-fitting/custom-footbeds">Heel-Loc custom footbeds</Link>, and <Link className="text-primary underline" href="/boot-fitting/zipfit-liners">ZipFit liner fitting</Link>. Looking for an e-bike?{" "}
            <Link href="/e-bikes" className="font-medium text-primary hover:underline">Compare Fantic e-bike prices</Link>.
          </p>
        </section>

        {otherShop && (
          <div className="mt-12 border-t py-6 text-sm text-muted-foreground">
            Visiting the other side of the lake?{" "}
            <Link href={locationUrl(otherShop)} className="font-medium text-primary hover:underline">
              See the {otherShop.address.city} shop
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
