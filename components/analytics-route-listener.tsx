"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { bikes } from "@/data/bikes"
import { analyticsPageEvent } from "@/lib/analytics-page-events"
import { sendGa4PageView, sendGa4Event } from "@/lib/gtag"

declare global {
  interface Window {
    __olympicBootworksLastPageView?: string
  }
}

/**
 * Next.js App Router does not fire full document loads on in-app navigation.
 * Sends explicit GA4 page_view on each route (and query) change to the configured web stream.
 */
export function AnalyticsRouteListener() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!pathname) {
      return
    }
    const query = searchParams?.toString()
    const path = query ? `${pathname}?${query}` : pathname
    return sendGa4PageView(path, () => {
      const event = analyticsPageEvent(pathname, bikes)
      if (event) sendGa4Event(event.name, event.params)
    })
  }, [pathname, searchParams])

  return null
}
