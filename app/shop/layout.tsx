import { generateMetadata as createMetadata, shopPageSEO, localBusinessSchema } from "@/lib/seo"
import Script from "next/script"

export const metadata = createMetadata(shopPageSEO)

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Script
        id="shop-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <Script
        id="shop-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://olympicbootworks.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Shop",
                "item": "https://olympicbootworks.com/shop"
              }
            ]
          }),
        }}
      />
      <Script
        id="fantic-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Fantic Mountain E-Bikes",
            "description": "Premium Italian electric mountain bikes including XTF Carbon, Trail, All Mountain, and Enduro models",
            "numberOfItems": 4,
            "itemListElement": [
              {
                "@type": "Product",
                "position": 1,
                "name": "Fantic XTF Carbon Factory",
                "description": "Lightest Fantic e-bike at 19.9kg with premium carbon frame and advanced suspension",
                "category": "Electric Mountain Bike",
                "brand": {
                  "@type": "Brand",
                  "name": "Fantic"
                },
                "offers": {
                  "@type": "Offer",
                  "availability": "https://schema.org/InStock",
                  "priceCurrency": "USD",
                  "seller": {
                    "@type": "Organization",
                    "name": "Olympic Bootworks"
                  }
                }
              },
              {
                "@type": "Product",
                "position": 2,
                "name": "Fantic Trail E-Bike",
                "description": "Designed for long distances and moderately difficult slopes with excellent balance",
                "category": "Electric Mountain Bike",
                "brand": {
                  "@type": "Brand",
                  "name": "Fantic"
                },
                "offers": {
                  "@type": "Offer",
                  "availability": "https://schema.org/InStock",
                  "priceCurrency": "USD",
                  "seller": {
                    "@type": "Organization",
                    "name": "Olympic Bootworks"
                  }
                }
              },
              {
                "@type": "Product",
                "position": 3,
                "name": "Fantic All Mountain E-Bike",
                "description": "170mm travel full suspension for maximum shock absorption and versatility",
                "category": "Electric Mountain Bike",
                "brand": {
                  "@type": "Brand",
                  "name": "Fantic"
                },
                "offers": {
                  "@type": "Offer",
                  "availability": "https://schema.org/InStock",
                  "priceCurrency": "USD",
                  "seller": {
                    "@type": "Organization",
                    "name": "Olympic Bootworks"
                  }
                }
              },
              {
                "@type": "Product",
                "position": 4,
                "name": "Fantic Enduro E-Bike",
                "description": "Designed for natural descents, bike parks and aggressive slopes with Sport, Race, and Factory versions",
                "category": "Electric Mountain Bike",
                "brand": {
                  "@type": "Brand",
                  "name": "Fantic"
                },
                "offers": {
                  "@type": "Offer",
                  "availability": "https://schema.org/InStock",
                  "priceCurrency": "USD",
                  "seller": {
                    "@type": "Organization",
                    "name": "Olympic Bootworks"
                  }
                }
              }
            ]
          }),
        }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Are Fantic e-bikes affordable?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! We offer competitive pricing on all Fantic models with financing options available. As an authorized dealer with the largest USA inventory, we provide the best value for premium Italian e-bikes."
                }
              },
              {
                "@type": "Question",
                "name": "Do you ship Fantic e-bikes nationwide?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we provide nationwide shipping for $299 with free local delivery in the Lake Tahoe area. All bikes are professionally packed and insured for safe transport."
                }
              },
              {
                "@type": "Question",
                "name": "What's included with Fantic e-bike purchase?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Every Fantic e-bike purchase includes professional setup, safety inspection, and ongoing maintenance support from our expert team with 8+ years of Fantic experience."
                }
              },
              {
                "@type": "Question",
                "name": "Why choose Olympic Bootworks for Fantic e-bikes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We are an authorized Fantic dealer with the largest USA inventory and 8+ years of experience. We provide expert fitting, professional service, and comprehensive support for all Fantic e-bike models."
                }
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}