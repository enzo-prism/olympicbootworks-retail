import React from "react"
import { ORGANIZATION_ID, WEBSITE_ID, serializeJsonLd } from "@/lib/seo"
import { locations, seasonalScheduleNotice, type LocationHours } from "@/data/locations"

// Injects JSON-LD structured data into <head> safely.
// Replace '<' with '\u003c' to mitigate script injection as recommended. [^1]
export default function SeoJsonLd() {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    publisher: { "@id": ORGANIZATION_ID },
    name: "Olympic Bootworks",
    url: "https://www.olympicbootworks.com",
    inLanguage: "en",
  }

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Olympic Bootworks",
    url: "https://www.olympicbootworks.com",
    logo: "https://www.olympicbootworks.com/images/olympic-bootworks-transparent-logo.png",
    award: "2025 USA TODAY 10BEST Readers' Choice Awards runner-up for Best Ski Shop",
    sameAs: [
      "https://10best.usatoday.com/awards/olympic-bootworks-olympic-valley-california/",
      "https://www.facebook.com/olympicbootworks/",
      "https://www.instagram.com/olympicbootworks/",
    ],
  }

  const schemaDayMap: Record<string, string> = {
    Monday: "https://schema.org/Monday",
    Tuesday: "https://schema.org/Tuesday",
    Wednesday: "https://schema.org/Wednesday",
    Thursday: "https://schema.org/Thursday",
    Friday: "https://schema.org/Friday",
    Saturday: "https://schema.org/Saturday",
    Sunday: "https://schema.org/Sunday",
  }

  const to24HourTime = (time: string) => {
    const match = time.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i)

    if (!match) {
      return null
    }

    let hour = Number(match[1]) % 12
    const minutes = match[2] ?? "00"

    if (match[3].toUpperCase() === "PM") {
      hour += 12
    }

    return `${String(hour).padStart(2, "0")}:${minutes}`
  }

  const openingHoursSpecification = (hours: LocationHours[]) =>
    hours.flatMap((entry) => {
      if (!schemaDayMap[entry.day] || entry.hours.toLowerCase() === "closed") {
        return []
      }

      return entry.hours.split(",").flatMap((range) => {
        const [opensRaw, closesRaw] = range.split(/[–—-]/).map((value) => value.trim())
        const opens = opensRaw ? to24HourTime(opensRaw) : null
        const closes = closesRaw ? to24HourTime(closesRaw) : null

        if (!opens || !closes) {
          return []
        }

        return {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: schemaDayMap[entry.day],
          opens,
          closes,
        }
      })
    })

  const locationJsonLd = locations.map((location) => {
    const openingHours = openingHoursSpecification(location.hours)

    return {
      "@context": "https://schema.org",
      "@type": "SportingGoodsStore",
      "@id": `https://www.olympicbootworks.com/#${location.id}`,
      name: `Olympic Bootworks - ${location.name}`,
      url: `https://www.olympicbootworks.com/contact#${location.id}`,
      image: "https://www.olympicbootworks.com/images/og-default.jpg",
      telephone: location.contact.phone,
      email: location.contact.email,
      description: [location.description, seasonalScheduleNotice.summary].filter(Boolean).join(" "),
      parentOrganization: {
        "@id": ORGANIZATION_ID,
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: [location.address.line1, location.address.line2].filter(Boolean).join(", "),
        addressLocality: location.address.city,
        addressRegion: location.address.state,
        postalCode: location.address.zip,
        addressCountry: "US",
      },
      ...(openingHours.length > 0 ? { openingHoursSpecification: openingHours } : {}),
    }
  })

  const safe = serializeJsonLd

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
      {locationJsonLd.map((location) => (
        <script
          key={location["@id"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safe(location) }}
        />
      ))}
    </>
  )
}
