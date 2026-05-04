import { GA4_MEASUREMENT_IDS } from "@/lib/analytics-config"

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function waitForGtag(callback: () => void, maxRetries = 35, delay = 100) {
  if (typeof window === "undefined") {
    return
  }

  let retries = 0
  const checkGtag = () => {
    if (window.gtag) {
      callback()
    } else if (retries < maxRetries) {
      retries++
      setTimeout(checkGtag, delay)
    } else {
      console.warn("Google tag (gtag) not available after waiting")
    }
  }
  checkGtag()
}

type Ga4ParamValue = string | number | boolean | undefined

/**
 * Sends an event to every configured GA4 data stream (not Google Ads).
 * Use recommended event names where possible; register custom params in GA4 > Admin > Custom definitions.
 */
export function sendGa4Event(eventName: string, params?: Record<string, Ga4ParamValue>) {
  if (typeof window === "undefined") {
    return
  }

  const payload = compactParams(params)

  const run = () => {
    if (!window.gtag) {
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
export function sendGa4PageView(pagePathWithQuery: string) {
  if (typeof window === "undefined") {
    return
  }

  const run = () => {
    if (!window.gtag) {
      return
    }
    const page_path = pagePathWithQuery.startsWith("/") ? pagePathWithQuery : `/${pagePathWithQuery}`
    const page_location = window.location.href
    const page_title = document.title

    for (const measurementId of GA4_MEASUREMENT_IDS) {
      window.gtag("event", "page_view", {
        send_to: measurementId,
        page_path,
        page_location,
        page_title,
      })
    }
  }

  if (window.gtag) {
    run()
  } else {
    waitForGtag(run)
  }
}

function compactParams(params?: Record<string, Ga4ParamValue>) {
  if (!params) {
    return {}
  }
  return Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== ""),
  ) as Record<string, Ga4ParamValue>
}
