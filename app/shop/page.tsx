import type { Metadata } from "next"
import ShopClient from "./shop-client"
import SeoIntro from "@/components/seo-intro"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Shop",
  description: "Explore bikes, boots, and gear at Olympic Bootworks.",
  alternates: { canonical: "/shop" },
}

export default function ShopPage() {
  return (
    <>
      <SeoIntro
        as="h1"
        title="Shop Ski Boots, Liners, and Accessories"
        description="Browse our curated selection of ski boots, ZipFit liners, footbeds, and accessories. Visit the categories below or use the embedded shop."
        bullets={[
          "Ski boots from top brands, fitted by experts",
          "ZipFit liners for locked-in heel hold and control",
          "Footbeds and accessories to complete your setup",
        ]}
      />
      <nav aria-label="Shop categories" className="container mx-auto px-4 -mt-2 mb-2 text-sm">
        <ul className="flex flex-wrap gap-3">
          <li><Link className="underline underline-offset-2" href="/shop#boots">Boots</Link></li>
          <li><Link className="underline underline-offset-2" href="/shop#liners">Liners</Link></li>
          <li><Link className="underline underline-offset-2" href="/shop#accessories">Accessories</Link></li>
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
