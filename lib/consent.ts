export const ANALYTICS_CONSENT_STORAGE_KEY = "olympic-bootworks-analytics-consent"

export function hasAnalyticsConsent() {
  return (
    typeof window !== "undefined" &&
    window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY) === "accepted"
  )
}
