/**
 * What a lead is about, so GA4 can report "boot-fitting leads by source" separately from e-bikes.
 * Sent as the `lead_category` event parameter (register it as an event-scoped custom dimension).
 */
export type LeadCategory = "boot_fitting" | "ebikes" | "general"

type LeadContext = {
  location?: string
  contentId?: string
  category?: LeadCategory
}

/**
 * Explicit categories win. Otherwise: anything tied to a bike model, a test ride or an e-bike
 * surface is `ebikes`; email links default to `boot_fitting` because almost every site email CTA
 * opens the prefilled fitting request; calls and directions without context are `general`.
 */
export function leadCategory(type: string, { location = "", contentId, category }: LeadContext = {}): LeadCategory {
  if (category) return category
  if (type === "test_ride_request" || contentId || /e-?bike|bike/i.test(location)) return "ebikes"
  if (/fitting|boot|heel_loc/i.test(location)) return "boot_fitting"
  if (type === "email_click" || type === "email_copy") return "boot_fitting"
  return "general"
}
