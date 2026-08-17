import type { Metadata } from "next"
import HomeClient from "@/components/home-client"

export const metadata: Metadata = {
  title: "Fantic E-Bikes & Custom Ski Boot Fitting",
  description:
    "Olympic Bootworks is a 2025 USA TODAY 10Best Best Ski Shop runner-up offering expert Lake Tahoe ski boot fitting, Heel-Loc footbeds, ZipFit liners, and Fantic e-bikes.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Fantic E-Bikes & Custom Ski Boot Fitting | Olympic Bootworks",
    description:
      "A 2025 USA TODAY 10Best Best Ski Shop runner-up offering expert Lake Tahoe ski boot fitting, Heel-Loc footbeds, ZipFit liners, and Fantic e-bikes.",
    url: "https://www.olympicbootworks.com/",
    type: "website",
    images: ["/images/og-default.jpg"],
  },
}

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
