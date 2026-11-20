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
  preWinterHours: LocationHours[]
  preWinterSummary: string
  description?: string
  /** Rooftop coordinates for the street address (OpenStreetMap match, Nov 20, 2026). */
  geo: { latitude: number; longitude: number }
  /** Ski area the shop sits beside, as a place name only (no affiliation is implied). */
  nearbySkiArea: string
}

export const APPOINTMENT_INBOX = "Info@olympicbootworks.com"

export const WINTER_START = "2026-11-21"
const winterSummary = "Open daily, 8 AM–5 PM. Closed weekdays from 10 AM to 12:30 PM for Skiesta"
const holidayNotice = "Closed Thanksgiving Day (Nov 26) and Christmas Day (Dec 25)"
const winterHolidays: Record<string, string> = {
  "2026-11-26": "Thanksgiving Day",
  "2026-12-25": "Christmas Day",
}

const tahoeCalendar = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Los_Angeles", year: "numeric", month: "2-digit", day: "2-digit",
})
export const tahoeDate = (instant: Date) => tahoeCalendar.format(instant)

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
 * Ski-season stock status shared by the banner, location cards, and footer.
 * Source: Buck's October 26, 2026 email asking the site to highlight that the
 * shops are stocked and ready to go. It is a general stock message only — never
 * publish specific boot models, sizes, or quantities from it.
 */
export const seasonalScheduleNotice = {
  label: "Ski season 2026–27",
  title: "Stocked and ready for ski season",
  summary:
    "Both Olympic Bootworks shops are stocked with ski boots for the 2026–27 season. Call or email your preferred shop to book a fitting.",
  bannerPrimary: "Ski boots in stock at both Tahoe shops",
  /** Compact variant for the one-line mobile banner. */
  bannerPrimaryShort: "Ski boots in stock",
  bannerSecondary: "Call or email to book your fitting",
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
  { day: "Through Nov 20", hours: "Call ahead to confirm hours" },
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
    preWinterHours: olympicValleyHours,
    preWinterSummary: "Open Wednesday–Sunday, 10 AM–3 PM",
    description:
      "Our flagship store in Olympic Valley offers comprehensive ski boot fitting, bike services, and equipment for all your mountain adventures.",
    geo: { latitude: 39.1992, longitude: -120.2296 },
    nearbySkiArea: "Palisades Tahoe",
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
    preWinterHours: southLakeStoreHours,
    preWinterSummary: "Call ahead to confirm today's hours",
    description:
      "Our South Lake Tahoe location provides expert boot fitting and a full range of outdoor gear for skiers and mountain bikers.",
    geo: { latitude: 38.9417, longitude: -119.9525 },
    nearbySkiArea: "Heavenly Mountain Resort",
  },
]

const winterHours = Object.keys(schemaDayMap).map((day) => ({
  day,
  hours: day === "Saturday" || day === "Sunday" ? "8 AM–5 PM" : "8 AM–10 AM, 12:30 PM–5 PM",
}))

export function shopSchedule(location: LocationData, localDate: string) {
  if (localDate < WINTER_START) {
    return {
      hours: location.preWinterHours,
      summary: location.preWinterSummary,
      notice: `Starting Saturday, Nov 21: ${winterSummary}. ${holidayNotice}.`,
    }
  }
  const holiday = winterHolidays[localDate]
  return {
    hours: winterHours,
    summary: holiday ? `Closed today for ${holiday}` : winterSummary,
    notice: holiday ? `Regular hours: ${winterSummary}. ${holidayNotice}.` : `${holidayNotice}.`,
  }
}

function requireLocation(id: string): LocationData {
  const location = locations.find((entry) => entry.id === id)
  if (!location) throw new Error(`Unknown location: ${id}`)
  return location
}

/** Named shops for pages that render them separately; details stay in `locations` above. */
export const northLakeLocation = requireLocation("olympic-valley")
export const southLakeLocation = requireLocation("south-lake-tahoe")

export const locationUrl = (location: Pick<LocationData, "id">) => `/locations/${location.id}`

/** Google Maps directions link for a shop's street address. */
export const directionsUrl = (address: LocationAddress) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`Olympic Bootworks, ${address.line1}, ${formatCityLine(address)}`)}`

/** Plain-language winter schedule for answers and machine-readable summaries. */
export const winterScheduleSummary = `${winterSummary}. ${holidayNotice}.`

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

/** Date qualifiers keep the search-engine schedule valid on both sides of the change. */
export function shopHoursSchema(location: LocationData) {
  return {
    openingHoursSpecification: [
      ...openingHoursSpecification(location.preWinterHours).map((entry) => ({ ...entry, validThrough: "2026-11-20" })),
      ...openingHoursSpecification(winterHours).map((entry) => ({ ...entry, validFrom: WINTER_START })),
    ],
    specialOpeningHoursSpecification: Object.keys(winterHolidays).map((date) => ({
      "@type": "OpeningHoursSpecification", validFrom: date, validThrough: date, opens: "00:00", closes: "00:00",
    })),
  }
}
