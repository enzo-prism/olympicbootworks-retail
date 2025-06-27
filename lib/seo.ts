import type { Metadata } from "next"

interface SEOConfig {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  noIndex?: boolean
  canonical?: string
}

const baseUrl = "https://olympicbootworks.com"
const defaultImage = "/images/olympic-bootworks-transparent-logo.png"

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = defaultImage,
    url,
    type = 'website',
    noIndex = false,
    canonical
  } = config

  const fullTitle = title 
    ? `${title} | Olympic Bootworks`
    : "Olympic Bootworks | Ski & Mountain Bike Shop"

  const fullDescription = description 
    ? description
    : "Premier ski and mountain bike shop serving athletes of all levels. Authorized Fantic e-bike dealer with largest inventory in USA."

  const fullUrl = url ? `${baseUrl}${url}` : baseUrl
  const imageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`

  const metadata: Metadata = {
    title: fullTitle,
    description: fullDescription,
    keywords: keywords.length > 0 ? keywords.join(', ') : undefined,
    authors: [{ name: "Olympic Bootworks" }],
    creator: "Olympic Bootworks",
    publisher: "Olympic Bootworks",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonical || fullUrl,
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      siteName: "Olympic Bootworks",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "en_US",
      type: type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [imageUrl],
      creator: "@olympicbootworks",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
    },
  }

  return metadata
}

export const shopPageSEO = {
  title: "Shop Premium Ski & E-Bike Equipment",
  description: "Shop affordable Fantic mountain e-bikes, ski equipment, and more. Authorized Fantic dealer with largest inventory in USA. Expert fitting and nationwide shipping available.",
  keywords: [
    "affordable Fantic mountain e-bikes",
    "Fantic e-bike dealer USA",
    "cheapest Fantic XTF carbon bikes",
    "Italian electric mountain bikes",
    "Fantic trail enduro e-bikes",
    "ski equipment Lake Tahoe",
    "mountain bike shop California",
    "e-bike sales Truckee",
    "affordable electric bikes",
    "Fantic dealer largest inventory"
  ],
  url: "/shop"
}

export const fanticEBikeSEO = {
  title: "Affordable Fantic E-Bikes - Largest USA Inventory",
  description: "Discover affordable Fantic mountain e-bikes from authorized dealer with 8+ years experience. XTF Carbon, Trail, Enduro models available. Expert service, nationwide shipping $299.",
  keywords: [
    "affordable Fantic e-bikes",
    "Fantic XTF carbon factory",
    "Italian electric mountain bikes",
    "Fantic trail e-bike",
    "Fantic enduro e-bike",
    "cheapest Fantic bikes USA",
    "Fantic dealer California",
    "electric mountain bike sales",
    "Fantic e-bike financing",
    "Fantic authorized dealer"
  ]
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${baseUrl}/#organization`,
  "name": "Olympic Bootworks",
  "image": `${baseUrl}${defaultImage}`,
  "description": "Premier ski and mountain bike shop serving athletes of all levels. Authorized Fantic e-bike dealer with largest inventory in USA.",
  "url": baseUrl,
  "telephone": "+1-530-581-0747",
  "email": "buck@olympicbootworks.com",
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "11085 Donner Pass Rd",
      "addressLocality": "Truckee",
      "addressRegion": "CA",
      "postalCode": "96161",
      "addressCountry": "US"
    },
    {
      "@type": "PostalAddress", 
      "streetAddress": "1002 Ski Run Blvd",
      "addressLocality": "South Lake Tahoe",
      "addressRegion": "CA",
      "postalCode": "96150",
      "addressCountry": "US"
    }
  ],
  "geo": [
    {
      "@type": "GeoCoordinates",
      "latitude": 39.3211,
      "longitude": -120.1829
    },
    {
      "@type": "GeoCoordinates",
      "latitude": 38.9399,
      "longitude": -119.9772
    }
  ],
  "openingHours": [
    "Mo-Su 08:00-18:00"
  ],
  "priceRange": "$$",
  "paymentAccepted": "Cash, Credit Card",
  "currenciesAccepted": "USD",
  "areaServed": [
    {
      "@type": "State",
      "name": "California"
    },
    {
      "@type": "State", 
      "name": "Nevada"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Olympic Bootworks Products",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Fantic Mountain E-Bikes",
          "description": "Premium Italian electric mountain bikes including XTF Carbon, Trail, and Enduro models"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Ski Equipment",
          "description": "Professional ski equipment, boots, and accessories"
        }
      }
    ]
  },
  "specialty": [
    "Fantic E-Bike Dealer",
    "Ski Boot Fitting",
    "Mountain Bike Sales",
    "Equipment Service"
  ],
  "knowsAbout": [
    "Fantic Electric Bikes",
    "Ski Equipment",
    "Mountain Bikes",
    "Professional Fitting"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.8,
    "reviewCount": 127
  }
}