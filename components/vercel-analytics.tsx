"use client"

import { Analytics } from "@vercel/analytics/next"
import type { BeforeSendEvent } from "@vercel/analytics/next"
import { hasAnalyticsConsent } from "@/lib/consent"
import { sanitizeAnalyticsUrl } from "@/lib/analytics-url"

function beforeSend(event: BeforeSendEvent): BeforeSendEvent | null {
  if (!hasAnalyticsConsent()) return null
  return { ...event, url: sanitizeAnalyticsUrl(event.url) }
}

/** Only Vercel production deployments expose the first-party collection routes. */
export function VercelAnalytics() {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") return null
  return <Analytics beforeSend={beforeSend} debug={false} />
}
