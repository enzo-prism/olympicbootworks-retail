"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { sendGa4PageView } from "@/lib/gtag"

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
    if (window.__olympicBootworksLastPageView === path) return
    window.__olympicBootworksLastPageView = path
    sendGa4PageView(path)
  }, [pathname, searchParams])

  return null
}
