import { pageMetadata } from "@/lib/seo"
import HomeClient from "@/components/home-client"

export const metadata = pageMetadata({
  title: "Lake Tahoe Ski Boot Fitting & Fantic E-Bikes",
  description: "Custom ski boot fitting, Heel-Loc footbeds, ZipFit liners and Fantic e-bikes in Olympic Valley and South Lake Tahoe. Contact either shop to plan a visit.",
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
            JavaScript is disabled. You can still learn about our services, custom boot fitting, and shop hours on this page. Enable JavaScript for interactive galleries and videos.
          </p>
        </section>
      </noscript>
      <HomeClient />
    </>
  )
}
