import type { Metadata } from "next"
import ShopClient from "./shop-client"

export const metadata: Metadata = {
  title: "Shop",
  description: "Explore bikes, boots, and gear at Olympic Bootworks.",
  alternates: { canonical: "/shop" },
}

export default function ShopPage() {
  // Server Component responsible only for metadata and composing the client UI
  return <ShopClient />
}
