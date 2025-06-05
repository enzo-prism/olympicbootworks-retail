import Image from "next/image"
import { ShopButton } from "@/components/ui/shop-button"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  iconAlt?: string
  shopUrl?: string
  shopText?: string
  className?: string
}

export default function ServiceCard({
  title,
  description,
  icon,
  iconAlt,
  shopUrl = "/shop",
  shopText = "Shop Now",
  className,
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md",
        className,
      )}
    >
      <div className="mb-4 flex items-center gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-primary/10">
          <Image src={icon || "/placeholder.svg"} alt={iconAlt || title} fill className="object-cover p-2" />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>

      <p className="mb-6 text-muted-foreground">{description}</p>

      <div className="mt-auto">
        <ShopButton
          href={shopUrl}
          variant="outline"
          size="sm"
          className="opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
        >
          {shopText}
        </ShopButton>
      </div>
    </div>
  )
}
