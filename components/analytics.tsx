"use client"

import Script from "next/script"
import { GA4_DEBUG_MODE, GA4_MEASUREMENT_IDS, GOOGLE_ADS_ID } from "@/lib/analytics-config"

function gtagBootstrapScript(): string {
  const parts: string[] = [
    "window.dataLayer = window.dataLayer || [];",
    "function gtag(){dataLayer.push(arguments);}",
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
  const primaryId = GA4_MEASUREMENT_IDS[0]
  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`} />
      <Script id="gtag-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: gtagBootstrapScript() }} />
    </>
  )
}
