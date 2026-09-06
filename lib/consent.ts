export const ANALYTICS_CONSENT_STORAGE_KEY = "olympic-bootworks-analytics-consent"
export const ANALYTICS_OPT_OUT_PARAM = "_analytics_opt_out"

export type AnalyticsConsent = "accepted" | "declined" | null

declare global {
  interface Window {
    __olympicAnalyticsConsent?: AnalyticsConsent
  }
}

export function readAnalyticsConsent(): AnalyticsConsent {
  if (typeof window === "undefined") return null
  if (window.__olympicAnalyticsConsent !== undefined) return window.__olympicAnalyticsConsent
  // A failed persistence withdrawal reloads with this fail-closed marker.
  if (new URLSearchParams(window.location?.search).get(ANALYTICS_OPT_OUT_PARAM) === "1") {
    window.__olympicAnalyticsConsent = "declined"
    return "declined"
  }

  try {
    const sessionChoice = window.sessionStorage?.getItem(ANALYTICS_CONSENT_STORAGE_KEY)
    if (sessionChoice === "accepted" || sessionChoice === "declined") return sessionChoice
  } catch { /* Storage can be independently restricted. */ }

  try {
    const stored = window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY)
    return stored === "accepted" || stored === "declined" ? stored : null
  } catch {
    // Privacy-restricted browsers can block localStorage. Essential links must
    // continue to work even when optional analytics consent cannot be stored.
    return window.__olympicAnalyticsConsent ?? null
  }
}

export function writeAnalyticsConsent(choice: Exclude<AnalyticsConsent, null>) {
  if (typeof window === "undefined") return false

  // Session fallback keeps consent state consistent if browser storage is blocked.
  window.__olympicAnalyticsConsent = choice
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, choice)
    try { window.sessionStorage?.removeItem(ANALYTICS_CONSENT_STORAGE_KEY) } catch { /* Optional fallback. */ }
    return true
  } catch {
    // A per-tab fallback survives SPA navigation and reload when persistent writes fail.
    try {
      window.sessionStorage?.setItem(ANALYTICS_CONSENT_STORAGE_KEY, choice)
      return window.sessionStorage?.getItem(ANALYTICS_CONSENT_STORAGE_KEY) === choice
    } catch {
      return false
    }
  }
}

export function hasAnalyticsConsent() {
  return readAnalyticsConsent() === "accepted"
}
