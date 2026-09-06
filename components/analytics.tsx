"use client"

import Script from "next/script"
import { sanitizeAnalyticsUrl, sanitizeAnalyticsReferrer } from "@/lib/analytics-url"
import {
  GA4_DEBUG_MODE,
  GA4_MEASUREMENT_IDS,
  GA4_PRIMARY_MEASUREMENT_ID,
  GOOGLE_ADS_ID,
} from "@/lib/analytics-config"

function gtagBootstrapScript(): string {
  const parts: string[] = [
    "window.dataLayer = window.dataLayer || [];",
    "function gtag(){dataLayer.push(arguments);}",
    // This component only mounts after analytics consent; no Google script loads before then.
    "gtag('consent', 'default', {analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'});",
    "gtag('consent', 'update', {analytics_storage: 'granted', ad_storage: 'granted', ad_user_data: 'denied', ad_personalization: 'denied'});",
    `var sanitizeAnalyticsUrl = ${sanitizeAnalyticsUrl.toString()};`,
    `var sanitizeAnalyticsReferrer = ${sanitizeAnalyticsReferrer.toString()};`,
    "gtag('set', {page_location: sanitizeAnalyticsUrl(window.location.href), page_referrer: sanitizeAnalyticsReferrer(document.referrer)});",
    "gtag('js', new Date());",
  ]

  for (const id of GA4_MEASUREMENT_IDS) {
    const opts: string[] = ["send_page_view: false"]
    if (GA4_DEBUG_MODE) {
      opts.push("debug_mode: true")
    }
    parts.push(`gtag('config', '${id}', { ${opts.join(", ")} });`)
  }

  parts.push(`gtag('config', '${GOOGLE_ADS_ID}');`)
  return parts.join("")
}

export function Analytics() {
  return (
    <>
      <Script id="gtag-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: gtagBootstrapScript() }} />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_PRIMARY_MEASUREMENT_ID}`}
      />
    </>
  )
}
