"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Let the browser and Next.js land on the requested section, including
    // links to a fragment on a different page and initial deep links.
    if (window.location.hash) return

    // Instant jump on route change — "smooth" here would animate a visible
    // rewind from the previous page's scroll position on every navigation.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [pathname])

  return null // This component doesn't render anything
}
