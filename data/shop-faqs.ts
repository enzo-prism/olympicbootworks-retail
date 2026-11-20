import {
  WINTER_START,
  formatCityLine,
  formatStreetAddress,
  seasonalScheduleNotice,
  winterScheduleSummary,
  type LocationData,
} from "@/data/locations"

const winterStartLabel = new Date(`${WINTER_START}T12:00:00Z`).toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
})

/**
 * Visible, self-contained answers for a shop page. Each answer repeats the shop's name and
 * facts so it still makes sense when quoted on its own (search snippets, AI answers).
 * Every fact comes from data/locations.ts or the owner-approved fitting copy.
 */
export function shopFaqs(location: LocationData) {
  const { address, contact } = location
  const city = address.city
  return [
    {
      question: `Where is Olympic Bootworks in ${city}?`,
      answer: `Olympic Bootworks ${city} is at ${formatStreetAddress(address)}, ${formatCityLine(address)}, near ${location.nearbySkiArea}. Call ${contact.phone} if you need help finding the shop.`,
    },
    {
      question: `What are the ${city} shop's hours?`,
      answer: `Starting ${winterStartLabel}, the ${city} shop's winter schedule is: ${winterScheduleSummary} Call ${contact.phone} to confirm before you visit.`,
    },
    {
      question: `Does the ${city} shop have ski boots in stock?`,
      answer: `Yes. ${seasonalScheduleNotice.summary.replace(/ Call or email.*$/, "")} Every pair is sold with a fitting. The website does not list specific models or sizes, so call ${contact.phone}${contact.email ? ` or email ${contact.email}` : ""} to ask about fit and availability.`,
    },
    {
      question: `Do I need an appointment for a boot fitting in ${city}?`,
      answer: `Call or email the ${city} shop before visiting so the fitter can set aside time for you. Share your preferred dates, what you ski, and any fit issues.`,
    },
    {
      question: `Can the ${city} shop work on ski boots I already own?`,
      answer: `Yes, Olympic Bootworks offers shell and liner adjustments and Heel-Loc custom footbeds as part of its fitting services. Bring your boots to the ${city} shop so the fitter can check the shell, liner, and footbed together and recommend the right work.`,
    },
  ]
}
