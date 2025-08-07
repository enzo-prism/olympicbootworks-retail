import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.olympicbootworks.com"
  const lastMod = new Date()

  return [
    { url: `${base}/`, lastModified: lastMod, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/pros`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/gallery`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/testimonials`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/shop`, lastModified: lastMod, changeFrequency: "weekly", priority: 0.9 },
    // Include known nested routes:
    { url: `${base}/shop/boots`, lastModified: lastMod, changeFrequency: "weekly", priority: 0.8 },
  ]
}
