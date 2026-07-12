import type { Metadata } from "next"
import ShopClient from "./shop-client"
import SeoIntro from "@/components/seo-intro"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Shop Fantic E-Bikes, Ski Boots & Liners",
  description:
    "Shop Olympic Bootworks for Fantic e-bikes at sale pricing with $299 nationwide shipping, plus ski boots, ZipFit liners, and footbeds with expert fitting support in Lake Tahoe.",
  alternates: { canonical: "/shop" },
}

export default function ShopPage() {
  return (
    <>
      <SeoIntro
        as="h1"
        title="Shop Fantic E-Bikes, Ski Boots, and Liners"
        description="Browse our in-stock Fantic e-bike inventory at sale pricing — the largest Fantic selection in the USA, with $299 nationwide shipping. Ski boots, ZipFit liners, and footbeds are fitted in store."
        bullets={[
          "Fantic e-bikes in stock now, from trail and enduro eMTBs to urban riders",
          "Professionally assembled and tuned before delivery by an authorized dealer",
          "Ski boots, ZipFit liners, and custom footbeds fitted by experts in store",
        ]}
      />
      <nav aria-label="Shop categories" className="container mx-auto px-4 -mt-2 mb-2 text-sm">
        <ul className="flex flex-wrap gap-3">
          <li><Link className="underline underline-offset-2" href="/e-bikes">E-bike models &amp; pricing</Link></li>
          <li><Link className="underline underline-offset-2" href="/shop#store">Browse all products</Link></li>
          <li><Link className="underline underline-offset-2" href="/contact">Boot &amp; liner fitting</Link></li>
        </ul>
      </nav>
      <noscript>
        <section className="container mx-auto px-4 py-4 text-sm">
          <p>
            JavaScript is disabled, so our embedded store is not interactive. Please visit the categories above or contact us to place an order.
          </p>
        </section>
      </noscript>
      <ShopClient />
    </>
  )
}
