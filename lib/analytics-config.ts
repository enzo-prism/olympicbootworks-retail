/**
 * Central GA4 / Google Ads IDs. Override with NEXT_PUBLIC_* in Vercel when rotating tags.
 *
 * If you use manual page_view (AnalyticsRouteListener), turn OFF GA4 Admin → Data streams →
 * Enhanced measurement → Page views → “Page changes based on browser history” to avoid duplicate hits.
 */
export const GA4_PRIMARY_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? "G-BDFVXXMY5Z"

export const GA4_SECONDARY_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID_SECONDARY ?? "G-NDRPCY4GVO"

export const GA4_MEASUREMENT_IDS = [
  GA4_PRIMARY_MEASUREMENT_ID,
  GA4_SECONDARY_MEASUREMENT_ID,
] as const

export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "AW-17608821238"

/** Full send_to target for the primary Google Ads conversion action */
export const GOOGLE_ADS_CONVERSION_SEND_TO =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_SEND_TO ??
  "AW-17608821238/ZWXjCI_f_aUbEPaTxcxB"

/** Set NEXT_PUBLIC_GA4_DEBUG=true to stream hits to GA4 DebugView */
export const GA4_DEBUG_MODE =
  process.env.NEXT_PUBLIC_GA4_DEBUG === "1" || process.env.NEXT_PUBLIC_GA4_DEBUG === "true"
