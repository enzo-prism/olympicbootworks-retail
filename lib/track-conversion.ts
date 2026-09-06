import { track } from "@vercel/analytics"
import { GOOGLE_ADS_CONVERSION_SEND_TO } from "@/lib/analytics-config"
import { sendGa4Event, waitForGtag } from "@/lib/gtag"
import { isGa4OnlyConversion } from "@/lib/conversion-policy"
import { hasAnalyticsConsent } from "@/lib/consent"

export type ConversionType =
  | "email_click"
  | "email_copy"
  | "phone_click"
  | "contact_page_view"
  | "test_ride_request"
  | "bike_page_view"

/**
 * Passive engagement types are mirrored to GA4 but do NOT fire the Google Ads
 * conversion — pouring high-volume page views into the same conversion label
 * as real leads dilutes Smart Bidding.
 */
interface ConversionOptions {
  value?: number
  currency?: string
  location?: string
  contentId?: string
  contentName?: string
}

function mirrorEngagementToGa4(
  type: ConversionType,
  value: number,
  currency: string,
  location: string,
  contentId?: string,
  contentName?: string,
) {
  switch (type) {
    case "test_ride_request":
      sendGa4Event("generate_lead", {
        value,
        currency,
        lead_source: location,
        lead_type: "bike_test_ride",
        content_id: contentId,
        content_name: contentName,
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
        content_id: contentId,
        content_name: contentName,
      })
      break
    case "email_copy":
      sendGa4Event("contact", {
        lead_source: location,
        contact_method: "email_copy",
        content_id: contentId,
        content_name: contentName,
      })
      break
    case "phone_click":
      sendGa4Event("generate_lead", {
        value,
        currency,
        lead_source: location,
        contact_method: "phone",
        content_id: contentId,
        content_name: contentName,
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
  if (!hasAnalyticsConsent()) {
    return
  }

  const { value = 1.0, currency = "USD", location, contentId, contentName } = options
  const loc = location ?? "unknown"

  // Vercel events are independent of Google tag readiness. The included plan supports two properties.
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
    track(type, { surface: loc, ...(contentId ? { model: contentId } : {}) })
  }

  const send = () => {
    if (!hasAnalyticsConsent()) return
    if (!window.gtag) {
      console.warn("Google tag (gtag) not available")
      return
    }

    mirrorEngagementToGa4(type, value, currency, loc, contentId, contentName)

    if (isGa4OnlyConversion(type)) {
      return
    }

    window.gtag("event", "conversion", {
      send_to: GOOGLE_ADS_CONVERSION_SEND_TO,
      value,
      currency,
      event_category: "engagement",
      event_label: location ? `${type}_${location}` : type,
      content_id: contentId,
      content_name: contentName,
    })
  }

  if (window.gtag) {
    send()
  } else {
    waitForGtag(send)
  }
}
