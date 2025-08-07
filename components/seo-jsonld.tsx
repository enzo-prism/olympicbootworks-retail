import React from "react"

/**
 * Injects JSON-LD structured data into <head>.
 * Kept conservative with WebSite and Organization graphs only,
 * as we don't have verified address/phone details for LocalBusiness.
 */
export default function SeoJsonLd() {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Olympic Bootworks",
    url: "https://www.olympicbootworks.com",
    inLanguage: "en",
  }

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Olympic Bootworks",
    url: "https://www.olympicbootworks.com",
    logo: "https://www.olympicbootworks.com/images/olympic-bootworks-transparent-logo.png",
  }

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
    </>
  )
}
