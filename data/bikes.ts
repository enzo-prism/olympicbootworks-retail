/**
 * Fantic e-bike catalog for the /e-bikes hub and homepage merchandising.
 *
 * Prices reflect the current published offers, including the July 13 Seven Day
 * correction. This catalog deliberately has no checkout integration: visitors
 * review the lineup here, then contact Olympic Bootworks to confirm the exact
 * bike, availability, and next steps.
 * Last price review: July 13, 2026.
 */

export type BikeFamily =
  | "trail"
  | "all-mountain"
  | "enduro"
  | "race"
  | "urban"
  | "scooter"

export interface Bike {
  /** Public model name */
  name: string
  /** Stable, human-readable route segment for the on-site description page */
  slug: string
  family: BikeFamily
  /** Current website price in USD */
  price: number
  /** One-line, rider-focused description (no invented specs) */
  blurb: string
  /** Plain-language model overview; intentionally avoids unverified technical specs */
  overview: string
  /** Useful comparison points based on the model's intended riding category */
  goodFor: string[]
  /** Product photo stored with the website */
  image: string
  /** Show on the homepage featured row */
  featured?: boolean
}

export const familyLabels: Record<BikeFamily, string> = {
  trail: "Trail eMTB",
  "all-mountain": "All-Mountain eMTB",
  enduro: "Enduro eMTB",
  race: "Race eMTB",
  urban: "Urban E-Bike",
  scooter: "E-Scooter",
}

export const bikes: Bike[] = [
  {
    name: "XTF 1.5",
    slug: "xtf-1-5",
    family: "trail",
    price: 2499,
    blurb:
      "The do-it-all Tahoe trail bike — confident climbing and playful descending for everyday singletrack.",
    overview:
      "A versatile trail e-bike for riders who want one Fantic for regular singletrack, rolling climbs, and fun descents. It is the most approachable place to start when comparing the mountain-bike lineup.",
    goodFor: ["Everyday trail riding", "Mixed climbs and descents", "Riders choosing a first Fantic eMTB"],
    image: "/images/e-bikes/xtf-1-5.jpg",
    featured: true,
  },
  {
    name: "XTF 1.5 Carbon",
    slug: "xtf-1-5-carbon",
    family: "trail",
    price: 4200,
    blurb:
      "The XTF trail platform with a lighter carbon frame for riders chasing quicker handling and longer days.",
    overview:
      "The carbon version of the versatile XTF trail platform. It is aimed at riders who like the all-around character of the XTF 1.5 and want a lighter-feeling premium option.",
    goodFor: ["All-around trail riding", "Longer days on the bike", "Riders comparing alloy and carbon options"],
    image: "/images/e-bikes/xtf-1-5-carbon.jpg",
  },
  {
    name: "XMF 1.7",
    slug: "xmf-1-7",
    family: "all-mountain",
    price: 3799,
    blurb:
      "Fantic's all-mountain workhorse — big-terrain capability that still pedals well everywhere else.",
    overview:
      "An all-mountain Fantic for riders whose routes mix sustained climbing with rougher, more demanding descents. It sits between the everyday trail models and the gravity-focused enduro bikes.",
    goodFor: ["All-mountain terrain", "Technical trail days", "Riders wanting more descending focus"],
    image: "/images/e-bikes/xmf-1-7.jpg",
  },
  {
    name: "XMF 1.7 Carbon Sport",
    slug: "xmf-1-7-carbon-sport",
    family: "all-mountain",
    price: 4900,
    blurb:
      "Carbon-framed all-mountain build for aggressive riders who want one bike for the whole mountain.",
    overview:
      "A carbon all-mountain option for riders who want a premium Fantic for varied terrain. It is positioned for bigger trail days without moving all the way to a dedicated enduro or race model.",
    goodFor: ["Varied mountain terrain", "Bigger trail days", "Premium all-mountain shoppers"],
    image: "/images/e-bikes/xmf-1-7-carbon-sport.jpg",
    featured: true,
  },
  {
    name: "1.4 Carbon Sport",
    slug: "1-4-carbon-sport",
    family: "all-mountain",
    price: 4000,
    blurb: "Light, lively carbon build — a fast option for riders stepping up to a premium eMTB.",
    overview:
      "A lively carbon eMTB for riders comparing premium, responsive-feeling options. Email Buck with your usual terrain and riding priorities so the shop can confirm whether this is the right match.",
    goodFor: ["Responsive trail riding", "Premium eMTB shoppers", "A shop-guided model comparison"],
    image: "/images/e-bikes/1-4-carbon-sport.jpg",
  },
  {
    name: "XEF 1.9 Factory",
    slug: "xef-1-9-factory",
    family: "enduro",
    price: 5900,
    blurb:
      "The flagship enduro machine — top-spec components for riders who want the most capable bike in the lineup.",
    overview:
      "A high-end enduro option for riders prioritizing steep, technical descents and demanding mountain terrain. It belongs on the shortlist when descending capability matters more than an easygoing trail feel.",
    goodFor: ["Enduro riding", "Steep and technical descents", "Riders comparing premium gravity-focused builds"],
    image: "/images/e-bikes/xef-1-9-factory.jpg",
  },
  {
    name: "XEF 1.9 Race",
    slug: "xef-1-9-race",
    family: "enduro",
    price: 5100,
    blurb:
      "Race-bred enduro geometry built for steep, technical Tahoe descents — and the climbs back up.",
    overview:
      "An enduro-focused Fantic for riders drawn to steep terrain, faster descending, and a more aggressive ride. Contact the shop to compare its fit and intended use with the Factory and all-mountain models.",
    goodFor: ["Aggressive enduro riding", "Technical Tahoe terrain", "Comparing race and factory builds"],
    image: "/images/e-bikes/xef-1-9-race.jpg",
    featured: true,
  },
  {
    name: "XXF 2.0 Race",
    slug: "xxf-2-0-race",
    family: "race",
    price: 4900,
    blurb: "Gravity-focused and race-ready — Fantic's hardest-hitting eMTB for lift laps and big lines.",
    overview:
      "The most gravity-focused option in this lineup, intended for riders who put descending and demanding terrain first. Buck can help confirm whether this specialist model or a more versatile enduro bike better fits your riding.",
    goodFor: ["Gravity-focused riding", "Lift-accessed terrain", "Experienced riders seeking a specialist option"],
    image: "/images/e-bikes/xxf-2-0-race.jpg",
  },
  {
    name: "Issimo Urban",
    slug: "issimo-urban",
    family: "urban",
    price: 1499,
    blurb:
      "The moped-style Italian city bike — comfortable, fun, and unmistakable around town or the campground.",
    overview:
      "A distinctive urban Fantic built around relaxed, practical riding rather than mountain-bike terrain. It is a natural option for town trips, campground use, and riders who prefer an upright, approachable format.",
    goodFor: ["Around-town trips", "Campground and neighborhood riding", "A distinctive urban-bike format"],
    image: "/images/e-bikes/issimo-urban.jpg",
    featured: true,
  },
  {
    name: "Seven Day Living",
    slug: "seven-day-living",
    family: "urban",
    price: 1499,
    blurb: "A practical everyday commuter and cruiser — errands, bike paths, and casual lake loops.",
    overview:
      "An everyday urban e-bike for practical trips and relaxed recreational riding. Choose it when comfort, errands, bike paths, and casual loops matter more than technical trail performance.",
    goodFor: ["Daily errands", "Bike paths and casual loops", "Comfort-oriented urban riding"],
    image: "/images/e-bikes/seven-day-living.jpg",
  },
  {
    name: "TX2 Scooter",
    slug: "tx2-scooter",
    family: "scooter",
    price: 299,
    blurb: "Compact electric scooter for quick trips — the easiest way into electric riding.",
    overview:
      "A compact electric scooter for short, simple trips. It is listed alongside the urban Fantic lineup but is not an e-bike; email the shop to confirm whether it suits your intended use.",
    goodFor: ["Short local trips", "Compact storage", "Shoppers who want a scooter rather than an e-bike"],
    image: "/images/e-bikes/tx2-scooter.jpg",
  },
]

/** Cheapest listed e-bike price (scooter excluded), or null when no bikes are listed */
const listedBikes = bikes.filter((bike) => bike.family !== "scooter")

export const cheapestBikePrice = listedBikes.length
  ? Math.min(...listedBikes.map((bike) => bike.price))
  : null

export const featuredBikes = bikes.filter((bike) => bike.featured)

export const bikeDetailUrl = (bike: Pick<Bike, "slug">) => `/e-bikes/${bike.slug}`

export const getBikeBySlug = (slug: string) => bikes.find((bike) => bike.slug === slug)

export const bikeInquiryUrl = (bike: Pick<Bike, "name" | "price">) => {
  const subject = `Fantic ${bike.name} inquiry`
  const body = `Hi Buck,\n\nI'm interested in the Fantic ${bike.name} listed at ${formatPrice(bike.price)}.\n\nMy height / usual bike size:\nWhere and how I ride:\nTest-ride interest:\nPickup location or shipping ZIP:\n\nPlease let me know about current availability, exact specifications, and next steps.\n\nThank you.`
  return `mailto:buck@olympicbootworks.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
