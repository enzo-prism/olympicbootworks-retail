import { pageMetadata, productJsonLd } from "@/lib/seo"
import Link from "next/link"
import MinimalPageHero from "@/components/minimal-page-hero"
import EBikesClient from "./ebikes-client"
import { bikes, cheapestBikePrice, formatPrice } from "@/data/bikes"

export const metadata = pageMetadata({
  title: "Fantic E-Bikes & Prices in Lake Tahoe",
  description: "Compare current Fantic e-bike prices and model descriptions, then email Olympic Bootworks about sizing, availability, test rides, and next steps.",
  path: "/e-bikes",
})

const faqs = [
  {
    question: "Where can I buy a Fantic e-bike in Lake Tahoe?",
    answer:
      "Olympic Bootworks is an authorized Fantic dealer with shops in Olympic Valley and South Lake Tahoe. Compare the models here, then email Buck to confirm the exact bike and arrange your visit. Bike purchases are arranged directly with the shop; there is no online checkout.",
  },
  {
    question: "How do I choose between trail, all-mountain, and enduro models?",
    answer:
      "Start with how you ride. The XTF trail models focus on everyday singletrack; XMF all-mountain models suit varied terrain with more descending focus; XEF enduro models are aimed at more demanding descents. Tell Buck about your terrain and riding goals, then confirm the specifications and fit of the actual bike before deciding.",
  },
  {
    question: "Can a bike be shipped?",
    answer:
      "Email the shop with the model and destination. The team will confirm whether shipping is available for that bike and explain delivery or local pickup options.",
  },
  {
    question: "Can I test ride before buying?",
    answer:
      "Email or call with the model you are considering. The team will confirm current test-ride availability and arrange a time when possible.",
  },
  {
    question: "Are these the current prices?",
    answer:
      "These are the current website prices. Email the shop to confirm the exact bike, size, color, specifications, and availability.",
  },
  {
    question: "What about warranty and service?",
    answer:
      "Olympic Bootworks is an authorized Fantic dealer. Email the shop for current warranty, support, and service details for the specific model you are considering.",
  },
  {
    question: "How do I pay for a bike?",
    answer:
      "Email the shop about the model you are considering and the team will explain the currently available payment options.",
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
      item: productJsonLd(bike),
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
    <div className="fantic-theme flex flex-col">
      <EBikesJsonLd />

      <MinimalPageHero
        eyebrow="Fantic • Italian Made Freedom • Current Pricing"
        title="Compare Current Fantic E-Bikes"
        description={`Read what each model is designed for${fromClause}, compare pricing, then email Buck about sizing, current availability, and the best next step.`}
        actions={[
          { href: "#models", label: "See model descriptions" },
          { href: "mailto:buck@olympicbootworks.com?subject=Fantic%20E-Bike%20Question", label: "Email Buck", variant: "secondary" },
        ]}
      />

      <section className="border-b bg-secondary/60 py-10">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold mb-4">Your Lake Tahoe Fantic dealer</h2>
          <p className="leading-7 text-muted-foreground">
            Olympic Bootworks helps riders compare Fantic mountain and urban e-bikes, with shops in Olympic Valley and South Lake Tahoe.
            Start with a model description and website price, then email Buck to confirm size, model year, exact specifications, and availability.
            Test rides, pickup, and available shipping are arranged with the shop.
          </p>
          <p className="mt-4">
            <Link href="/contact" className="font-medium text-primary underline underline-offset-4">Check Tahoe shop locations and appointment details</Link>
          </p>
        </div>
      </section>

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
