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

export const seasonalScheduleNotice = {
  label: "Spring vacation update",
  title: "Closed for spring vacation",
  summary:
    "Olympic Bootworks is closed through Monday, June 1. Starting Tuesday, June 2, both locations will be open by appointment while regular summer hours are being finalized.",
  closedThrough: "Closed through Monday, June 1",
  appointmentOnlyStarting: "Appointment-only beginning Tuesday, June 2",
  summerHoursStatus: "Regular summer hours are being finalized",
}

const sharedStoreHours: LocationHours[] = [
  { day: "Through Monday, June 1", hours: "Closed for spring vacation" },
  { day: "Starting Tuesday, June 2", hours: "Open by appointment" },
  { day: "Summer hours", hours: "Being finalized" },
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
