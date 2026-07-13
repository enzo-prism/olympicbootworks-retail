import type { ConversionType } from "@/lib/track-conversion"

const GA4_ONLY_TYPES: ReadonlySet<ConversionType> = new Set([
  "bike_page_view",
  "contact_page_view",
  "shop_visit",
])

export function isGa4OnlyConversion(type: ConversionType) {
  return GA4_ONLY_TYPES.has(type)
}
