import type { Metadata } from "next"
import MinimalPageHero from "@/components/minimal-page-hero"
import EBikesClient from "./ebikes-client"
import { bikes, cheapestBikePrice, formatPrice, maxSavingsPct } from "@/data/bikes"

export const metadata: Metadata = {
  title: "Fantic E-Bikes for Sale — Authorized US Dealer",
  description: `Shop in-stock Fantic e-bikes at up to ${maxSavingsPct}% off from an authorized dealer with the largest Fantic inventory in the USA. Trail, enduro, and urban models with $299 nationwide shipping and Lake Tahoe test rides.`,
  alternates: { canonical: "/e-bikes" },
  openGraph: {
    title: "Fantic E-Bikes for Sale — Authorized US Dealer | Olympic Bootworks",
    description:
      "In-stock Fantic e-bikes at sale pricing from the largest Fantic inventory in the USA. $299 nationwide shipping, professional assembly, and Lake Tahoe test rides.",
    url: "https://www.olympicbootworks.com/e-bikes",
    type: "website",
    images: ["/images/og-default.png"],
  },
}

const SITE = "https://www.olympicbootworks.com"

const faqs = [
  {
    question: "Do you ship e-bikes nationwide?",
    answer:
      "Yes. We ship Fantic e-bikes anywhere in the USA for a flat $299 — just add shipping at checkout. Local pickup is available at our Olympic Valley and South Lake Tahoe stores.",
  },
  {
    question: "Can I test ride before buying?",
    answer:
      "Absolutely — that's the best way to choose. Both Lake Tahoe locations offer test rides by appointment this summer. Email or call either store and we'll set up a time.",
  },
  {
    question: "Why are prices discounted?",
    answer:
      "We're clearing current in-stock inventory at sale pricing while it lasts, with Fantic's new 2026 models on the way. Every bike is new, from an authorized dealer, with full factory warranty.",
  },
  {
    question: "What about warranty and service?",
    answer:
      "We've been an authorized Fantic dealer for 8 years. Your bike comes with Fantic's factory warranty, and our Tahoe shops handle warranty support and service.",
  },
  {
    question: "Do you offer financing?",
    answer:
      "Contact us about current payment options — we're happy to walk you through what's available for your purchase.",
  },
]

function EBikesJsonLd() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Fantic E-Bikes at Olympic Bootworks",
    numberOfItems: bikes.length,
    itemListElement: bikes.map((bike, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: `Fantic ${bike.name}`,
        image: bike.image,
        description: bike.blurb,
        brand: { "@type": "Brand", name: "Fantic" },
        offers: {
          "@type": "Offer",
          url: `${SITE}${bike.shopUrl}`,
          price: bike.price,
          priceCurrency: "USD",
          availability: bike.inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          seller: { "@type": "Organization", name: "Olympic Bootworks" },
        },
      },
    })),
  }

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  }

  const safe = (obj: unknown) => JSON.stringify(obj).replace(/</g, "\\u003c")

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safe(itemList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safe(faqPage) }} />
    </>
  )
}

export default function EBikesPage() {
  const fromClause =
    cheapestBikePrice !== null ? ` — trail, enduro, and urban models from ${formatPrice(cheapestBikePrice)}` : ""

  return (
    <div className="flex flex-col">
      <EBikesJsonLd />

      <MinimalPageHero
        eyebrow={`Authorized Fantic Dealer • Up to ${maxSavingsPct}% Off`}
        title="Fantic E-Bikes"
        description={`Italian-engineered e-bikes from the largest Fantic inventory in the USA${fromClause}, with flat-rate nationwide shipping and test rides at both Lake Tahoe stores.`}
        actions={[
          { href: "#models", label: "Shop the sale" },
          { href: "#test-ride", label: "Book a test ride", variant: "secondary" },
        ]}
      />

      <EBikesClient />

      {/* FAQ — server-rendered to match the FAQPage structured data */}
      <section className="border-t py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-3xl font-bold">E-bike questions, answered</h2>
          <div className="mx-auto max-w-3xl space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="mb-2 font-semibold">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
