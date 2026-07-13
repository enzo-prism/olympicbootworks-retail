/**
 * Fantic e-bike catalog for the /e-bikes hub and homepage merchandising.
 *
 * Prices, stock, and deep links mirror the live Ecwid store (id 115212795) and
 * must be kept in sync with it — the store is the source of truth for checkout.
 * Last synced with the storefront: July 12, 2026.
 */

export type BikeFamily =
  | "trail"
  | "all-mountain"
  | "enduro"
  | "race"
  | "urban"
  | "scooter"

export interface Bike {
  /** Ecwid product id */
  id: number
  /** Exact product name as listed in the store */
  name: string
  /** Stable, human-readable route segment for the on-site description page */
  slug: string
  family: BikeFamily
  /** Current sale price in USD */
  price: number
  /** Original list price in USD (strikethrough) */
  compareAtPrice: number
  /** One-line, rider-focused description (no invented specs) */
  blurb: string
  /** Plain-language model overview; intentionally avoids unverified technical specs */
  overview: string
  /** Useful comparison points based on the model's intended riding category */
  goodFor: string[]
  /** Deep link into the embedded store product page */
  shopUrl: string
  /** Product photo from the store CDN */
  image: string
  inStock: boolean
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
    id: 739856819,
    name: "XTF 1.5",
    slug: "xtf-1-5",
    family: "trail",
    price: 2499,
    compareAtPrice: 5500,
    blurb:
      "The do-it-all Tahoe trail bike — confident climbing and playful descending for everyday singletrack.",
    overview:
      "A versatile trail e-bike for riders who want one Fantic for regular singletrack, rolling climbs, and fun descents. It is the most approachable place to start when comparing the mountain-bike lineup.",
    goodFor: ["Everyday trail riding", "Mixed climbs and descents", "Riders choosing a first Fantic eMTB"],
    shopUrl: "/shop#!/XTF-1-5/p/739856819",
    image: "https://d2j6dbq0eux0bg.cloudfront.net/images/115212795/4928981386.jpg",
    inStock: true,
    featured: true,
  },
  {
    id: 739855148,
    name: "XTF 1.5 Carbon",
    slug: "xtf-1-5-carbon",
    family: "trail",
    price: 4200,
    compareAtPrice: 7900,
    blurb:
      "The XTF trail platform with a lighter carbon frame for riders chasing quicker handling and longer days.",
    overview:
      "The carbon version of the versatile XTF trail platform. It is aimed at riders who like the all-around character of the XTF 1.5 and want a lighter-feeling premium option.",
    goodFor: ["All-around trail riding", "Longer days on the bike", "Riders comparing alloy and carbon options"],
    shopUrl: "/shop#!/XTF-1-5-Carbon/p/739855148",
    image: "https://d2j6dbq0eux0bg.cloudfront.net/images/115212795/4928981826.jpg",
    inStock: true,
  },
  {
    id: 739855138,
    name: "XMF 1.7",
    slug: "xmf-1-7",
    family: "all-mountain",
    price: 3799,
    compareAtPrice: 7200,
    blurb:
      "Fantic's all-mountain workhorse — big-terrain capability that still pedals well everywhere else.",
    overview:
      "An all-mountain Fantic for riders whose routes mix sustained climbing with rougher, more demanding descents. It sits between the everyday trail models and the gravity-focused enduro bikes.",
    goodFor: ["All-mountain terrain", "Technical trail days", "Riders wanting more descending focus"],
    shopUrl: "/shop#!/XMF-1-7/p/739855138",
    image: "https://d2j6dbq0eux0bg.cloudfront.net/images/115212795/4928964322.jpg",
    inStock: true,
  },
  {
    id: 739855620,
    name: "XMF 1.7 Carbon Sport",
    slug: "xmf-1-7-carbon-sport",
    family: "all-mountain",
    price: 4900,
    compareAtPrice: 7900,
    blurb:
      "Carbon-framed all-mountain build for aggressive riders who want one bike for the whole mountain.",
    overview:
      "A carbon all-mountain option for riders who want a premium Fantic for varied terrain. It is positioned for bigger trail days without moving all the way to a dedicated enduro or race model.",
    goodFor: ["Varied mountain terrain", "Bigger trail days", "Premium all-mountain shoppers"],
    shopUrl: "/shop#!/XMF-1-7-Carbon-Sport/p/739855620",
    image: "https://d2j6dbq0eux0bg.cloudfront.net/images/115212795/4928986837.jpg",
    inStock: true,
    featured: true,
  },
  {
    id: 739855144,
    name: "1.4 Carbon Sport",
    slug: "1-4-carbon-sport",
    family: "all-mountain",
    price: 4000,
    compareAtPrice: 4900,
    blurb: "Light, lively carbon build — a fast option for riders stepping up to a premium eMTB.",
    overview:
      "A lively carbon eMTB for riders comparing premium, responsive-feeling options. Email Buck with your usual terrain and riding priorities so the shop can confirm whether this is the right match.",
    goodFor: ["Responsive trail riding", "Premium eMTB shoppers", "A shop-guided model comparison"],
    shopUrl: "/shop#!/1-4-Carbon-Sport/p/739855144",
    image: "https://d2j6dbq0eux0bg.cloudfront.net/images/115212795/4928938543.jpg",
    inStock: true,
  },
  {
    id: 739853690,
    name: "XEF 1.9 Factory",
    slug: "xef-1-9-factory",
    family: "enduro",
    price: 5900,
    compareAtPrice: 10073,
    blurb:
      "The flagship enduro machine — top-spec components for riders who want the most capable bike in the lineup.",
    overview:
      "A high-end enduro option for riders prioritizing steep, technical descents and demanding mountain terrain. It belongs on the shortlist when descending capability matters more than an easygoing trail feel.",
    goodFor: ["Enduro riding", "Steep and technical descents", "Riders comparing premium gravity-focused builds"],
    shopUrl: "/shop#!/XEF-1-9-Factory/p/739853690",
    image: "https://d2j6dbq0eux0bg.cloudfront.net/images/115212795/4928964302.jpg",
    inStock: true,
  },
  {
    id: 739853694,
    name: "XEF 1.9 Race",
    slug: "xef-1-9-race",
    family: "enduro",
    price: 5100,
    compareAtPrice: 8900,
    blurb:
      "Race-bred enduro geometry built for steep, technical Tahoe descents — and the climbs back up.",
    overview:
      "An enduro-focused Fantic for riders drawn to steep terrain, faster descending, and a more aggressive ride. Contact the shop to compare its fit and intended use with the Factory and all-mountain models.",
    goodFor: ["Aggressive enduro riding", "Technical Tahoe terrain", "Comparing race and factory builds"],
    shopUrl: "/shop#!/XEF-1-9-Race/p/739853694",
    image: "https://d2j6dbq0eux0bg.cloudfront.net/images/115212795/4928986822.jpg",
    inStock: true,
    featured: true,
  },
  {
    id: 739856815,
    name: "XXF 2.0 Race",
    slug: "xxf-2-0-race",
    family: "race",
    price: 4900,
    compareAtPrice: 7500,
    blurb: "Gravity-focused and race-ready — Fantic's hardest-hitting eMTB for lift laps and big lines.",
    overview:
      "The most gravity-focused option in this lineup, intended for riders who put descending and demanding terrain first. Buck can help confirm whether this specialist model or a more versatile enduro bike better fits your riding.",
    goodFor: ["Gravity-focused riding", "Lift-accessed terrain", "Experienced riders seeking a specialist option"],
    shopUrl: "/shop#!/XXF-2-0-Race/p/739856815",
    image: "https://d2j6dbq0eux0bg.cloudfront.net/images/115212795/4928981408.jpg",
    inStock: true,
  },
  {
    id: 739853219,
    name: "Issimo Urban",
    slug: "issimo-urban",
    family: "urban",
    price: 1499,
    compareAtPrice: 4400,
    blurb:
      "The moped-style Italian city bike — comfortable, fun, and unmistakable around town or the campground.",
    overview:
      "A distinctive urban Fantic built around relaxed, practical riding rather than mountain-bike terrain. It is a natural option for town trips, campground use, and riders who prefer an upright, approachable format.",
    goodFor: ["Around-town trips", "Campground and neighborhood riding", "A distinctive urban-bike format"],
    shopUrl: "/shop#!/Issimo-Urban/p/739853219",
    image: "https://d2j6dbq0eux0bg.cloudfront.net/images/115212795/4928944095.jpg",
    inStock: true,
    featured: true,
  },
  {
    id: 739855142,
    name: "Seven Day Living",
    slug: "seven-day-living",
    family: "urban",
    price: 1799,
    compareAtPrice: 4200,
    blurb: "A practical everyday commuter and cruiser — errands, bike paths, and casual lake loops.",
    overview:
      "An everyday urban e-bike for practical trips and relaxed recreational riding. Choose it when comfort, errands, bike paths, and casual loops matter more than technical trail performance.",
    goodFor: ["Daily errands", "Bike paths and casual loops", "Comfort-oriented urban riding"],
    shopUrl: "/shop#!/Seven-Day-Living/p/739855142",
    image: "https://d2j6dbq0eux0bg.cloudfront.net/images/115212795/4928944105.jpg",
    inStock: true,
  },
  {
    id: 739855141,
    name: "TX2 Scooter",
    slug: "tx2-scooter",
    family: "scooter",
    price: 299,
    compareAtPrice: 999,
    blurb: "Compact electric scooter for quick trips — the easiest way into electric riding.",
    overview:
      "A compact electric scooter for short, simple trips. It is listed alongside the urban Fantic lineup but is not an e-bike; email the shop to confirm whether it suits your intended use.",
    goodFor: ["Short local trips", "Compact storage", "Shoppers who want a scooter rather than an e-bike"],
    shopUrl: "/shop#!/TX2-Scooter/p/739855141",
    image: "https://d2j6dbq0eux0bg.cloudfront.net/images/115212795/4928960768.jpg",
    inStock: true,
  },
]

export const savingsPct = (bike: Bike) =>
  Math.round((1 - bike.price / bike.compareAtPrice) * 100)

/** In-stock e-bikes (scooter excluded) — the basis for "e-bike" sale claims */
const saleBikes = bikes.filter((b) => b.inStock && b.family !== "scooter")

/**
 * Highest discount among in-stock e-bikes, for "up to X% off" copy.
 * Deliberately excludes the scooter and sold-out items so the headline claim
 * is always purchasable. Falls back to 0 if everything sells out.
 */
export const maxSavingsPct = saleBikes.length
  ? Math.max(...saleBikes.map(savingsPct))
  : 0

/** Cheapest in-stock e-bike price, or null when nothing is in stock */
export const cheapestBikePrice = saleBikes.length
  ? Math.min(...saleBikes.map((b) => b.price))
  : null

export const featuredBikes = bikes.filter((b) => b.featured && b.inStock)

export const bikeDetailUrl = (bike: Pick<Bike, "slug">) => `/e-bikes/${bike.slug}`

export const getBikeBySlug = (slug: string) => bikes.find((bike) => bike.slug === slug)

export const bikeInquiryUrl = (bike: Pick<Bike, "name" | "price">) => {
  const subject = `Fantic ${bike.name} inquiry`
  const body = `Hi Buck,\n\nI'm interested in the Fantic ${bike.name} listed at ${formatPrice(bike.price)}. Please let me know about current availability, sizing, and next steps.\n\nThank you.`
  return `mailto:buck@olympicbootworks.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)

/**
 * Financing display config. Keep `enabled: false` until Klarna (or another
 * BNPL provider) is actually switched on in the Ecwid admin — the UI only
 * shows monthly-payment framing when this is true, so we never advertise
 * financing that checkout can't deliver.
 */
export const financing = {
  enabled: false,
  provider: "Klarna",
  /** Term used for the "from $X/mo" estimate */
  termMonths: 24,
}

export const monthlyEstimate = (price: number) =>
  Math.ceil(price / financing.termMonths)
