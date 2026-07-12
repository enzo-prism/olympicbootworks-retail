"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { sendGa4Event } from "@/lib/gtag"
import {
  familyLabels,
  financing,
  formatPrice,
  monthlyEstimate,
  savingsPct,
  type Bike,
} from "@/data/bikes"

interface BikeCardProps {
  bike: Bike
  /** Where the card is rendered, for analytics (e.g. "home_featured", "ebikes_hub") */
  surface: string
  className?: string
}

export default function BikeCard({ bike, surface, className }: BikeCardProps) {
  const pct = savingsPct(bike)

  const trackView = () => {
    sendGa4Event("select_item", {
      item_list_id: "fantic_ebikes",
      item_list_name: "Fantic E-Bikes",
      currency: "USD",
      items: [{ item_id: String(bike.id), item_name: bike.name, price: bike.price }],
      surface,
    })
  }

  return (
    <div
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1",
        className,
      )}
    >
      <Link href={bike.shopUrl} onClick={trackView} className="relative block aspect-square bg-white">
        <Image
          src={bike.image}
          alt={`Fantic ${bike.name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground shadow">
          Save {pct}%
        </span>
        {!bike.inStock ? (
          <span className="absolute right-3 top-3 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground shadow">
            Sold out
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          {familyLabels[bike.family]}
        </p>
        <h3 className="mt-1 text-lg font-bold">Fantic {bike.name}</h3>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-foreground">{formatPrice(bike.price)}</span>
          <span className="text-sm text-muted-foreground line-through">
            {formatPrice(bike.compareAtPrice)}
          </span>
        </div>
        {financing.enabled ? (
          <p className="mt-1 text-xs text-muted-foreground">
            From ~{formatPrice(monthlyEstimate(bike.price))}/mo with {financing.provider}
          </p>
        ) : null}

        <p className="mt-3 flex-1 text-sm text-muted-foreground">{bike.blurb}</p>

        <div className="mt-5">
          {bike.inStock ? (
            <Button asChild className="w-full shadow-sm">
              <Link href={bike.shopUrl} onClick={trackView}>
                <ShoppingCart className="mr-2 h-4 w-4" aria-hidden="true" />
                View &amp; Buy
              </Link>
            </Button>
          ) : (
            <Button asChild variant="outline" className="w-full">
              <Link href="/contact">Ask about availability</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
