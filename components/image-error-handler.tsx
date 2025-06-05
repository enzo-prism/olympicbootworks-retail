"use client"

import { useEffect } from "react"

export default function ImageErrorHandler() {
  useEffect(() => {
    // Global handler for image errors
    const handleImageError = (event: Event) => {
      const img = event.target as HTMLImageElement

      // Skip if already handled
      if (img.dataset.errorHandled) return

      // Mark as handled to prevent loops
      img.dataset.errorHandled = "true"

      // Set to placeholder
      img.src = "/placeholder.png"

      // Log error
      console.warn(`Image failed to load: ${img.src}. Using placeholder.`)
    }

    // Add global event listener
    document.addEventListener("error", handleImageError, true)

    return () => {
      document.removeEventListener("error", handleImageError, true)
    }
  }, [])

  // This component doesn't render anything
  return null
}
