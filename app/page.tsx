import type { Metadata } from "next"
import HomeClient from "@/components/home-client"
import SeoIntro from "@/components/seo-intro"

export const metadata: Metadata = {
  title: "Custom Ski Boot Fitting & Mountain Bikes",
  description:
    "Olympic Bootworks in Lake Tahoe offers expert ski boot fitting, Heel-Loc custom footbeds, ZipFit liners, Fantic e-bikes, and mountain gear.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Custom Ski Boot Fitting & Mountain Bikes | Olympic Bootworks",
    description:
      "Olympic Bootworks in Lake Tahoe offers expert ski boot fitting, Heel-Loc custom footbeds, ZipFit liners, Fantic e-bikes, and mountain gear.",
    url: "https://www.olympicbootworks.com/",
    type: "website",
    images: ["/images/og-default.png"],
  },
}

// Server Component that renders the interactive homepage client component.
// This composition keeps metadata on the server and UI interactivity on the client, per Next.js guidance. [^1]
export default function Page() {
  return (
    <>
      <SeoIntro
        as="h2"
        description="Olympic Bootworks is Lake Tahoe’s trusted ski boot fitting and mountain bike shop. We specialize in custom Heel-Loc boot fitting, ZipFit liners, and curated gear for snow and trail."
        bullets={[
          "Precision custom boot fitting for comfort and performance",
          "ZipFit liners and premium accessories",
          "Expert advice from decades of experience in Tahoe",
        ]}
      />
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
