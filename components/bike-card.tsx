"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { sendGa4Event } from "@/lib/gtag"
import { trackConversion } from "@/lib/track-conversion"
import {
  familyLabels,
  formatPrice,
  bikeDetailUrl,
  bikeInquiryUrl,
  type Bike,
} from "@/data/bikes"

interface BikeCardProps {
  bike: Bike
  /** Where the card is rendered, for analytics (e.g. "home_featured", "ebikes_hub") */
  surface: string
  className?: string
  priority?: boolean
}

export default function BikeCard({ bike, surface, className, priority = false }: BikeCardProps) {
  const trackView = () => {
    sendGa4Event("select_item", {
      item_list_id: "fantic_ebikes",
      item_list_name: "Fantic E-Bikes",
      currency: "USD",
      items: [{ item_id: bike.slug, item_name: bike.name, price: bike.price }],
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
      <Link href={bikeDetailUrl(bike)} onClick={trackView} className="relative block aspect-square bg-white">
        <Image
          src={bike.image}
          alt={`Fantic ${bike.name}`}
          fill
          loading={priority ? "eager" : "lazy"}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground shadow">
          Current price
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          {familyLabels[bike.family]}
        </p>
        <h3 className="mt-1 text-lg font-bold">Fantic {bike.name}</h3>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="sr-only">Current price: </span>
          <span className="text-2xl font-bold text-foreground">{formatPrice(bike.price)}</span>
        </div>
        <p className="mt-3 flex-1 text-sm text-muted-foreground">{bike.blurb}</p>

        <div className="mt-5 flex flex-col gap-2">
          <Button asChild className="w-full shadow-sm">
            <Link href={bikeDetailUrl(bike)} onClick={trackView}>
              View bike details
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <a
              href={bikeInquiryUrl(bike)}
              onClick={() => trackConversion("email_click", {
                location: `${surface}_ebike_card_${bike.slug}`,
                contentId: bike.slug,
                contentName: `Fantic ${bike.name}`,
              })}
            >
              <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
              Ask Buck about this bike
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
