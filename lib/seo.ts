import type { Metadata } from "next"
import type { Bike } from "@/data/bikes"

export const SITE_URL = "https://www.olympicbootworks.com"
export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

/** Define the complete social objects: Next.js replaces, rather than merges, these fields. */
export function pageMetadata({ title, description, path, image = "/images/og-default.jpg", imageAlt = "Olympic Bootworks in Lake Tahoe" }: {
  title: string
  description: string
  path: string
  image?: string
  imageAlt?: string
}): Metadata {
  const url = `${SITE_URL}${path}`
  const socialTitle = `${title} | Olympic Bootworks`
  return {
    title: { absolute: socialTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: "Olympic Bootworks",
      locale: "en_US",
      type: "website",
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: image, alt: imageAlt }],
    },
  }
}

export function productJsonLd(bike: Pick<Bike, "slug" | "name" | "image" | "overview" | "price">) {
  const url = `${SITE_URL}/e-bikes/${bike.slug}`
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    url,
    name: `Fantic ${bike.name}`,
    image: `${SITE_URL}${bike.image}`,
    description: bike.overview,
    brand: { "@type": "Brand", name: "Fantic" },
    offers: {
      "@type": "Offer",
      url,
      price: bike.price,
      priceCurrency: "USD",
      // Availability, condition, shipping and returns require confirmed owner data.
      seller: { "@id": ORGANIZATION_ID },
    },
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c")
}
