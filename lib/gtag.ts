import { sanitizeAnalyticsUrl, sanitizeAnalyticsReferrer } from "@/lib/analytics-url"
import { GA4_MEASUREMENT_IDS } from "@/lib/analytics-config"
import { hasAnalyticsConsent } from "@/lib/consent"

declare global {
  interface Window {
    __olympicBootworksCurrentPageReferrer?: string
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function waitForGtag(callback: () => void, maxRetries = 35, delay = 100) {
  if (!hasAnalyticsConsent()) {
    return
  }

  let retries = 0
  let cancelled = false
  let timer: ReturnType<typeof setTimeout> | undefined
  const checkGtag = () => {
    if (cancelled || !hasAnalyticsConsent()) return
    if (window.gtag) {
      callback()
    } else if (retries < maxRetries) {
      retries++
      timer = setTimeout(checkGtag, delay)
    } else {
      console.warn("Google tag (gtag) not available after waiting")
    }
  }
  checkGtag()
  return () => {
    cancelled = true
    if (timer) clearTimeout(timer)
  }
}

type Ga4ItemParam = Record<string, string | number | boolean | undefined>
type Ga4ParamValue = string | number | boolean | undefined | Ga4ItemParam[]

/**
 * Sends an event to every configured GA4 data stream (not Google Ads).
 * After dual-tag de-dupe this is the single keep stream (property 508275630).
 * Use recommended event names where possible; register custom params in GA4 > Admin > Custom definitions.
 */
export function sendGa4Event(eventName: string, params?: Record<string, Ga4ParamValue>) {
  if (!hasAnalyticsConsent()) {
    return
  }

  const payload = {
    ...compactParams(params),
    page_location: sanitizeAnalyticsUrl(window.location.href),
    page_referrer: window.__olympicBootworksCurrentPageReferrer ?? sanitizeAnalyticsReferrer(document.referrer),
  }

  const run = () => {
    if (!hasAnalyticsConsent() || !window.gtag) {
      return
    }
    for (const measurementId of GA4_MEASUREMENT_IDS) {
      window.gtag("event", eventName, {
        send_to: measurementId,
        ...payload,
      })
    }
  }

  if (window.gtag) {
    run()
  } else {
    waitForGtag(run)
  }
}

/**
 * Virtual page views for App Router navigations. Initial load is covered by this via AnalyticsRouteListener.
 * GA4 configs use send_page_view: false to avoid double-counting with this explicit event.
 */
export function sendGa4PageView(pagePathWithQuery: string, onQueued?: () => void) {
  if (!hasAnalyticsConsent()) return

  // Capture now: a delayed tag must not pair an earlier route with a later URL/title.
  const page_location = sanitizeAnalyticsUrl(pagePathWithQuery, window.location.origin)
  if (!page_location) return
  const url = new URL(page_location)
  const page_path = `${url.pathname}${url.search}`
  const page_title = document.title

  const run = () => {
    if (!hasAnalyticsConsent() || !window.gtag) return
    if (window.__olympicBootworksLastPageView === page_location) return
    const page_referrer = window.__olympicBootworksLastPageView
      ? sanitizeAnalyticsReferrer(window.__olympicBootworksLastPageView)
      : sanitizeAnalyticsReferrer(document.referrer)
    // Keep automatically collected engagement events aligned with the current virtual page.
    window.gtag("set", { page_location, page_referrer, page_title })
    for (const measurementId of GA4_MEASUREMENT_IDS) {
      window.gtag("event", "page_view", {
        send_to: measurementId,
        page_path,
        page_location,
        page_title,
        page_referrer,
      })
    }
    window.__olympicBootworksLastPageView = page_location
    window.__olympicBootworksCurrentPageReferrer = page_referrer
    onQueued?.()
  }

  return waitForGtag(run)
}

function compactParams(params?: Record<string, Ga4ParamValue>) {
  if (!params) {
    return {}
  }
  return Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== ""),
  ) as Record<string, Ga4ParamValue>
}
