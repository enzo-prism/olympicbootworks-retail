import React from "react"

// Injects JSON-LD structured data into <head> safely.
// Replace '<' with '\u003c' to mitigate script injection as recommended. [^1]
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

  const safe = (obj: unknown) => JSON.stringify(obj).replace(/</g, "\\u003c")

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safe(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safe(organizationJsonLd) }}
      />
    </>
  )
}
