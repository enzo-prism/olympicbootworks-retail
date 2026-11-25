import { bikeDetailUrl, bikes, formatPrice } from "@/data/bikes"
import { fittingServices, fittingServiceUrl } from "@/data/fitting-services"
import { bootFittingFaqs } from "@/data/boot-fitting-faqs"
import {
  WINTER_START,
  formatCityLine,
  formatStreetAddress,
  locationUrl,
  locations,
  seasonalScheduleNotice,
  winterScheduleSummary,
} from "@/data/locations"
import { SITE_URL } from "@/lib/seo"

/**
 * Plain-text site summary for AI assistants and answer engines (llmstxt.org format).
 * Built from the same data files as the pages, so prices, hours and contacts never drift.
 * It is a convenience for crawlers, not a ranking or citation guarantee.
 */
export const dynamic = "force-static"

const link = (title: string, path: string, note: string) => `- [${title}](${SITE_URL}${path}): ${note}`

function llmsText() {
  const shops = locations.map((shop) =>
    [
      `### Olympic Bootworks ${shop.address.city}${shop.flagship ? " (flagship)" : ""}`,
      `- Address: ${formatStreetAddress(shop.address)}, ${formatCityLine(shop.address)} (near ${shop.nearbySkiArea})`,
      `- Phone: ${shop.contact.phone}`,
      shop.contact.email ? `- Email: ${shop.contact.email}` : null,
      `- Winter hours from ${WINTER_START}: ${winterScheduleSummary}`,
      `- Page: ${SITE_URL}${locationUrl(shop)}`,
    ]
      .filter(Boolean)
      .join("\n"),
  )

  return [
    "# Olympic Bootworks",
    "",
    "> Lake Tahoe ski boot fitting shop founded by boot fitter Buck Brown in 1994, with shops in Olympic Valley (North Lake Tahoe) and South Lake Tahoe, California. Sells ski boots with custom fitting, Heel-Loc custom footbeds and ZipFit liners, and is an authorized Fantic e-bike dealer.",
    "",
    `${seasonalScheduleNotice.summary} The website does not list specific boot models, sizes or stock counts. There is no online store or checkout: book fittings and ask about e-bikes by email or phone.`,
    "",
    "## Shops",
    "",
    shops.join("\n\n"),
    "",
    "## Ski boots and fitting",
    "",
    link("Ski boots & custom boot fitting", "/boot-fitting", "fitting process, services, Heel-Loc footbeds, ZipFit liners and how to book"),
    ...fittingServices.map((service) => link(service.name, fittingServiceUrl(service.slug), service.description)),
    ...bootFittingFaqs.map(({ question, answer }) => `- ${question} ${answer}`),
    "",
    "## Fantic e-bikes (current website prices, USD)",
    "",
    link("Compare Fantic e-bikes", "/e-bikes", "all models with current website prices; contact the shop to confirm size, availability and test rides"),
    ...bikes.map((bike) => link(`Fantic ${bike.name}`, bikeDetailUrl(bike), `${formatPrice(bike.price)}. ${bike.blurb}`)),
    "",
    "## About",
    "",
    link("About Olympic Bootworks", "/about", "Buck Brown, Heel-Loc technology and the two Lake Tahoe shops"),
    link("Pro athletes", "/pros", "World Cup and freeride athletes the shop fits"),
    link("Customer reviews", "/testimonials", "testimonials from skiers, riders and athletes"),
    link("Contact & locations", "/contact", "phones, emails, hours and directions for both shops"),
    "",
  ].join("\n")
}

export function GET() {
  return new Response(llmsText(), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  })
}
