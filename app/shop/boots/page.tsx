import type { Metadata } from "next"
import { permanentRedirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Ski Boots",
  description: "Shop ski boots, liners, and accessories from Olympic Bootworks.",
  alternates: { canonical: "/shop" },
}

export default function BootsPage() {
  // Consolidate to the main shop to avoid duplicate content/titles.
  permanentRedirect("/shop#boots")
}
