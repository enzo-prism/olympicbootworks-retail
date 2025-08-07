import type { Metadata } from "next"
import HomeClient from "@/components/home-client"

// Unique, SEO-friendly metadata for the homepage.
// The layout's title template will format this as "Ski & Mountain Bike Shop | Olympic Bootworks".
export const metadata: Metadata = {
  title: "Ski & Mountain Bike Shop",
  description:
    "Premier ski and mountain bike shop in Lake Tahoe offering precision boot fitting, Heel-Loc technology, and top products.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ski & Mountain Bike Shop | Olympic Bootworks",
    description:
      "Premier ski and mountain bike shop in Lake Tahoe offering precision boot fitting, Heel-Loc technology, and top products.",
    url: "https://www.olympicbootworks.com/",
    type: "website",
  },
}

// Server Component that renders the interactive homepage client component.
// This composition keeps metadata on the server and UI interactivity on the client, per Next.js guidance. [^1]
export default function Page() {
  return <HomeClient />
}
