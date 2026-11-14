export interface LocationHours {
  day: string
  hours: string
}

export interface LocationAddress {
  line1: string
  line2?: string
  city: string
  state: string
  zip: string
}

export interface LocationContact {
  phone: string
  email?: string
}

export interface LocationData {
  id: string
  name: string
  flagship: boolean
  address: LocationAddress
  contact: LocationContact
  hours: LocationHours[]
  /** One-line hours copy shown on cards, location pages, and the footer. */
  hoursSummary: string
  description?: string
}

export const APPOINTMENT_INBOX = "Info@olympicbootworks.com"

export const OLYMPIC_VALLEY_HOURS_SUMMARY = "Open Wednesday–Sunday, 10 AM–3 PM"

const schemaDayMap: Record<string, string> = {
  Monday: "https://schema.org/Monday",
  Tuesday: "https://schema.org/Tuesday",
  Wednesday: "https://schema.org/Wednesday",
  Thursday: "https://schema.org/Thursday",
  Friday: "https://schema.org/Friday",
  Saturday: "https://schema.org/Saturday",
  Sunday: "https://schema.org/Sunday",
}

/**
 * Ski-season status shared by the banner, location cards, footer, and JSON-LD.
 * Source: Buck's October 26, 2026 email asking the site to highlight that the
 * shops are stocked and ready to go. It is a general stock message only — never
 * publish specific boot models, sizes, or quantities from it.
 *
 * Olympic Valley hours were confirmed November 13, 2026 (Wednesday–Sunday,
 * 10 AM–3 PM, closed Monday and Tuesday). South Lake Tahoe hours have not been
 * confirmed, so that shop still asks visitors to call ahead.
 */
export const seasonalScheduleNotice = {
  label: "Ski season 2026–27",
  title: "Stocked and ready for ski season",
  summary:
    "Both Olympic Bootworks shops are stocked with ski boots for the 2026–27 season. The Olympic Valley flagship is open Wednesday–Sunday, 10 AM–3 PM. Call or email South Lake Tahoe to confirm today's hours, and book a fitting at either shop.",
  bannerPrimary: "Ski boots in stock at both Tahoe shops",
  /** Compact variant for the one-line mobile banner. */
  bannerPrimaryShort: "Ski boots in stock",
  bannerSecondary: "Call or email to book your fitting",
  hoursStatus: "Call ahead to confirm today's hours",
}

const olympicValleyHours: LocationHours[] = [
  { day: "Monday", hours: "Closed" },
  { day: "Tuesday", hours: "Closed" },
  { day: "Wednesday", hours: "10 AM–3 PM" },
  { day: "Thursday", hours: "10 AM–3 PM" },
  { day: "Friday", hours: "10 AM–3 PM" },
  { day: "Saturday", hours: "10 AM–3 PM" },
  { day: "Sunday", hours: "10 AM–3 PM" },
]

const southLakeStoreHours: LocationHours[] = [
  { day: "Ski season", hours: "Boots in stock · book a fitting by phone or email" },
]

export const locations: LocationData[] = [
  {
    id: "olympic-valley",
    name: "North Lake Tahoe",
    flagship: true,
    address: {
      line1: "1602 Squaw Valley Road, Box 3514",
      city: "Olympic Valley",
      state: "CA",
      zip: "96146",
    },
    contact: {
      phone: "(530) 581-0747",
      email: APPOINTMENT_INBOX,
    },
    hours: olympicValleyHours,
    hoursSummary: OLYMPIC_VALLEY_HOURS_SUMMARY,
    description:
      "Our flagship store in Olympic Valley offers comprehensive ski boot fitting, bike services, and equipment for all your mountain adventures.",
  },
  {
    id: "south-lake-tahoe",
    name: "South Lake Tahoe",
    flagship: false,
    address: {
      line1: "1235 Ski Run Blvd.",
      city: "South Lake Tahoe",
      state: "CA",
      zip: "96150",
    },
    contact: {
      phone: "(530) 600-4056",
      email: "SouthLake@Olympicbootworks.com",
    },
    hours: southLakeStoreHours,
    hoursSummary: seasonalScheduleNotice.hoursStatus,
    description:
      "Our South Lake Tahoe location provides expert boot fitting and a full range of outdoor gear for skiers and mountain bikers.",
  },
]

function requireLocation(id: string): LocationData {
  const location = locations.find((entry) => entry.id === id)
  if (!location) throw new Error(`Unknown location: ${id}`)
  return location
}

/** Named shops for pages that render them separately; details stay in `locations` above. */
export const northLakeLocation = requireLocation("olympic-valley")
export const southLakeLocation = requireLocation("south-lake-tahoe")

export const locationUrl = (location: Pick<LocationData, "id">) => `/locations/${location.id}`

/** Street line(s) as displayed, e.g. "1235 Ski Run Blvd." */
export const formatStreetAddress = (address: LocationAddress) =>
  [address.line1, address.line2].filter(Boolean).join(", ")

/** City line as displayed, e.g. "South Lake Tahoe, CA 96150" */
export const formatCityLine = (address: LocationAddress) =>
  `${address.city}, ${address.state} ${address.zip}`

/** E.164 tel: link for a displayed US number, e.g. "(530) 581-0747" -> "tel:+15305810747" */
export const phoneHref = (phone: string) => `tel:+1${phone.replace(/\D/g, "")}`

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

/** Schema.org opening hours for a shop. Closed days and non-clock ranges are omitted. */
export const openingHoursSpecification = (hours: LocationHours[]) =>
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
