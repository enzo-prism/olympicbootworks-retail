import { pageMetadata } from "@/lib/seo"
import HomeClient from "@/components/home-client"

export const metadata = pageMetadata({
  title: "Ski Boots In Stock & Custom Boot Fitting in Lake Tahoe",
  description: "Ski boots in stock for 2026–27 with custom fitting, Heel-Loc footbeds and ZipFit liners at our Olympic Valley and South Lake Tahoe shops. Fantic e-bikes too.",
  path: "/",
})

// Server Component that renders the interactive homepage client component.
// This composition keeps metadata on the server and UI interactivity on the client, per Next.js guidance. [^1]
export default function Page() {
  return (
    <>
      <noscript>
        <section className="container mx-auto px-4 py-4 text-sm">
          <p>
            JavaScript is disabled. You can still learn about our ski boots, custom boot fitting, and shop locations on this page. Enable JavaScript for interactive galleries and videos.
          </p>
        </section>
      </noscript>
      <HomeClient />
    </>
  )
}
