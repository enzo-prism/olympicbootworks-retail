"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { sendGa4PageView } from "@/lib/gtag"

/**
 * Next.js App Router does not fire full document loads on in-app navigation.
 * Sends explicit GA4 page_view on each route (and query) change to both web streams.
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
    sendGa4PageView(path)
  }, [pathname, searchParams])

  return null
}
