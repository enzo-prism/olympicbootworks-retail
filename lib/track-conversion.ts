import { GOOGLE_ADS_CONVERSION_SEND_TO } from "@/lib/analytics-config"
import { sendGa4Event, waitForGtag } from "@/lib/gtag"

export type ConversionType =
  | "email_click"
  | "phone_click"
  | "shop_visit"
  | "contact_page_view"
  | "test_ride_request"
  | "bike_page_view"

/**
 * Passive engagement types are mirrored to GA4 but do NOT fire the Google Ads
 * conversion — pouring high-volume page views into the same conversion label
 * as real leads dilutes Smart Bidding.
 */
const GA4_ONLY_TYPES: ReadonlySet<ConversionType> = new Set(["bike_page_view"])

interface ConversionOptions {
  value?: number
  currency?: string
  location?: string
}

function mirrorEngagementToGa4(
  type: ConversionType,
  value: number,
  currency: string,
  location: string,
) {
  switch (type) {
    case "test_ride_request":
      sendGa4Event("generate_lead", {
        value,
        currency,
        lead_source: location,
        lead_type: "bike_test_ride",
      })
      break
    case "bike_page_view":
      sendGa4Event("view_item_list", {
        item_list_id: "fantic_ebikes",
        item_list_name: "Fantic E-Bikes",
        surface: location,
      })
      break
    case "email_click":
      sendGa4Event("generate_lead", {
        value,
        currency,
        lead_source: location,
        contact_method: "email",
      })
      break
    case "phone_click":
      sendGa4Event("generate_lead", {
        value,
        currency,
        lead_source: location,
        contact_method: "phone",
      })
      break
    case "shop_visit":
      sendGa4Event("online_store_engagement", {
        engagement_type: "embed_shop_mount",
        store_platform: "lightspeed_ecwid",
      })
      break
    case "contact_page_view":
      sendGa4Event("contact_funnel", {
        funnel_step: "contact_page",
        surface: "contact_client_mount",
      })
      break
  }
}

/**
 * Fires the Google Ads conversion (existing behavior) and mirrors intent to GA4
 * using recommended events where applicable (e.g. generate_lead for email/phone).
 */
export function trackConversion(type: ConversionType, options: ConversionOptions = {}) {
  if (typeof window === "undefined") {
    return
  }

  const { value = 1.0, currency = "USD", location } = options
  const loc = location ?? "unknown"

  const send = () => {
    if (!window.gtag) {
      console.warn("Google tag (gtag) not available")
      return
    }

    mirrorEngagementToGa4(type, value, currency, loc)

    if (GA4_ONLY_TYPES.has(type)) {
      return
    }

    window.gtag("event", "conversion", {
      send_to: GOOGLE_ADS_CONVERSION_SEND_TO,
      value,
      currency,
      event_category: "engagement",
      event_label: location ? `${type}_${location}` : type,
    })
  }

  if (window.gtag) {
    send()
  } else {
    waitForGtag(send)
  }
}
