import React from "react"
import { BOOT_FITTING_SERVICE_ID, FOUNDER_ID, ORGANIZATION_ID, SITE_URL, WEBSITE_ID, serializeJsonLd } from "@/lib/seo"
import { directionsUrl, locationUrl, locations, shopHoursSchema, seasonalScheduleNotice } from "@/data/locations"

/** Services named on the visible fitting page; nothing here is priced or promised beyond that copy. */
const fittingServices = [
  "Custom ski boot fitting",
  "Ski boot shell modification",
  "Ski boot liner molding",
  "Heel-Loc custom footbeds",
  "ZipFit liners",
]

/**
 * Sitewide entity graph: website, organization, founder, both shops and the fitting service.
 * Every fact is visible elsewhere on the site (About, Boot Fitting, location pages) or in data/locations.ts.
 */
export default function SeoJsonLd() {
  const graph = [
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      publisher: { "@id": ORGANIZATION_ID },
      name: "Olympic Bootworks",
      url: SITE_URL,
      inLanguage: "en",
    },
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "Olympic Bootworks",
      url: SITE_URL,
      logo: `${SITE_URL}/images/olympic-bootworks-transparent-logo.png`,
      description:
        "Olympic Bootworks is a Lake Tahoe ski boot fitting shop founded by boot fitter Buck Brown in 1994. It sells ski boots with custom fitting, Heel-Loc custom footbeds and ZipFit liners, and is an authorized Fantic e-bike dealer, with shops in Olympic Valley and South Lake Tahoe, California.",
      foundingDate: "1994",
      founder: { "@id": FOUNDER_ID },
      award: "2025 USA TODAY 10BEST Readers' Choice Awards runner-up for Best Ski Shop",
      areaServed: { "@type": "Place", name: "Lake Tahoe, California" },
      knowsAbout: ["Ski boot fitting", "Custom footbeds", "Heel-Loc", "ZipFit liners", "Fantic e-bikes"],
      subOrganization: locations.map((location) => ({ "@id": `${SITE_URL}/#${location.id}` })),
      contactPoint: locations.map((location) => ({
        "@type": "ContactPoint",
        contactType: "customer service",
        areaServed: "US",
        availableLanguage: "en",
        telephone: `+1-${location.contact.phone.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}`,
        email: location.contact.email,
        name: `Olympic Bootworks ${location.address.city}`,
      })),
      sameAs: [
        "https://10best.usatoday.com/awards/olympic-bootworks-olympic-valley-california/",
        "https://www.facebook.com/olympicbootworks/",
        "https://www.instagram.com/olympicbootworks/",
      ],
    },
    {
      "@type": "Person",
      "@id": FOUNDER_ID,
      name: "Buck Brown",
      jobTitle: "Founder & Master Boot Fitter",
      worksFor: { "@id": ORGANIZATION_ID },
      url: `${SITE_URL}/about`,
      image: `${SITE_URL}/images/buck-in-shop.jpg`,
      knowsAbout: ["Ski boot fitting", "Heel-Loc"],
    },
    ...locations.map((location) => ({
      "@type": "SportingGoodsStore",
      "@id": `${SITE_URL}/#${location.id}`,
      name: `Olympic Bootworks - ${location.address.city}`,
      alternateName: `Olympic Bootworks - ${location.name}`,
      url: `${SITE_URL}${locationUrl(location)}`,
      image: `${SITE_URL}/images/og-default.jpg`,
      telephone: location.contact.phone,
      email: location.contact.email,
      description: [location.description, `${seasonalScheduleNotice.title}.`].filter(Boolean).join(" "),
      parentOrganization: { "@id": ORGANIZATION_ID },
      address: {
        "@type": "PostalAddress",
        streetAddress: [location.address.line1, location.address.line2].filter(Boolean).join(", "),
        addressLocality: location.address.city,
        addressRegion: location.address.state,
        postalCode: location.address.zip,
        addressCountry: "US",
      },
      geo: { "@type": "GeoCoordinates", ...location.geo },
      hasMap: directionsUrl(location.address),
      areaServed: [location.address.city, "Lake Tahoe"],
      brand: { "@type": "Brand", name: "Fantic" },
      makesOffer: fittingServices.map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name, provider: { "@id": ORGANIZATION_ID } },
      })),
      ...shopHoursSchema(location),
    })),
    {
      "@type": "Service",
      "@id": BOOT_FITTING_SERVICE_ID,
      name: "Custom ski boot fitting",
      serviceType: "Ski boot fitting",
      url: `${SITE_URL}/boot-fitting`,
      description:
        "Ski boot fitting, shell and liner adjustments, Heel-Loc custom footbeds, and ZipFit liners in Olympic Valley and South Lake Tahoe.",
      provider: { "@id": ORGANIZATION_ID },
      areaServed: ["Olympic Valley", "South Lake Tahoe", "Lake Tahoe"],
      availableChannel: locations.map((location) => ({
        "@type": "ServiceChannel",
        serviceLocation: { "@id": `${SITE_URL}/#${location.id}` },
        servicePhone: location.contact.phone,
        serviceUrl: `${SITE_URL}${locationUrl(location)}`,
      })),
    },
  ]

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd({ "@context": "https://schema.org", "@graph": graph }) }}
    />
  )
}
