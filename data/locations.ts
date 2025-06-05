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
    },
    hours: [
      { day: "Summer Hours", hours: "Open by appointment only" },
      { day: "Fall Re-opening", hours: "Regular hours resume in Fall" },
    ],
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
      email: "SouthLakeOlympic@gmail.com",
    },
    hours: [
      { day: "Summer Hours", hours: "Open by appointment only" },
      { day: "Fall Re-opening", hours: "Regular hours resume in Fall" },
    ],
    description:
      "Our South Lake Tahoe location provides expert boot fitting, equipment tuning, and a full range of outdoor gear for skiers and mountain bikers.",
  },
]
