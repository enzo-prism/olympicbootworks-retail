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
  description?: string
}

/**
 * Ski-season status shared by the banner, location cards, footer, and JSON-LD.
 * Source: Buck's October 26, 2026 email asking the site to highlight that the
 * shops are stocked and ready to go. It is a general stock message only — never
 * publish specific boot models, sizes, or quantities from it. Exact winter hours
 * have not been confirmed, so visitors are asked to call ahead instead.
 */
export const seasonalScheduleNotice = {
  label: "Ski season 2026–27",
  title: "Stocked and ready for ski season",
  summary:
    "Both Olympic Bootworks shops are stocked with ski boots for the 2026–27 season. Call or email your preferred location to confirm today's hours or book a boot fitting.",
  bannerPrimary: "Ski boots in stock at both Tahoe shops",
  /** Compact variant for the one-line mobile banner. */
  bannerPrimaryShort: "Ski boots in stock",
  bannerSecondary: "Call or email to book your fitting",
  hoursStatus: "Call ahead to confirm today's hours",
}

const sharedStoreHours: LocationHours[] = [
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
      email: "buck@olympicbootworks.com",
    },
    hours: sharedStoreHours,
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
    hours: sharedStoreHours,
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

/** Street line(s) as displayed, e.g. "1235 Ski Run Blvd." */
export const formatStreetAddress = (address: LocationAddress) =>
  [address.line1, address.line2].filter(Boolean).join(", ")

/** City line as displayed, e.g. "South Lake Tahoe, CA 96150" */
export const formatCityLine = (address: LocationAddress) =>
  `${address.city}, ${address.state} ${address.zip}`

/** E.164 tel: link for a displayed US number, e.g. "(530) 581-0747" -> "tel:+15305810747" */
export const phoneHref = (phone: string) => `tel:+1${phone.replace(/\D/g, "")}`
