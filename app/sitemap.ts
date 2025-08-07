import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.olympicbootworks.com"
  const lastModified = new Date()

  return [
    { url: `${base}/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/pros`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/gallery`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/testimonials`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/shop`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    // We intentionally omit /shop/boots because it 308-redirects to /shop#boots
  ]
}
