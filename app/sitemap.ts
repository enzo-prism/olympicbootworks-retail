import type { MetadataRoute } from "next"
import { bikeDetailUrl, bikes } from "@/data/bikes"
import { locationUrl, locations } from "@/data/locations"

import { fittingServices, fittingServiceUrl } from "@/data/fitting-services"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.olympicbootworks.com"
  // Omit lastModified until per-page editorial dates are maintained. Build time is not content freshness.

  const bikePages: MetadataRoute.Sitemap = bikes.map((bike) => ({
    url: `${base}${bikeDetailUrl(bike)}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/e-bikes`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/boot-fitting`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/pros`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/gallery`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/testimonials`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    // /shop and /shop/boots are 308 redirects, so they stay out of the sitemap.
    ...locations.map((location) => ({ url: `${base}${locationUrl(location)}` })),
    ...fittingServices.map(({ slug }) => ({ url: base + fittingServiceUrl(slug) })),
    ...bikePages,
  ]
}
