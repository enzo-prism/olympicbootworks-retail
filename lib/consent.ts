export const ANALYTICS_CONSENT_STORAGE_KEY = "olympic-bootworks-analytics-consent"

export type AnalyticsConsent = "accepted" | "declined" | null

export function readAnalyticsConsent(): AnalyticsConsent {
  if (typeof window === "undefined") return null

  try {
    const stored = window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY)
    return stored === "accepted" || stored === "declined" ? stored : null
  } catch {
    // Privacy-restricted browsers can block localStorage. Essential links must
    // continue to work even when optional analytics consent cannot be stored.
    return null
  }
}

export function writeAnalyticsConsent(choice: Exclude<AnalyticsConsent, null>) {
  if (typeof window === "undefined") return false

  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, choice)
    return true
  } catch {
    return false
  }
}

export function hasAnalyticsConsent() {
  return readAnalyticsConsent() === "accepted"
}
