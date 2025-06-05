"use client"

import { useEffect } from "react"

export default function EnsurePlaceholder() {
  useEffect(() => {
    // Check if placeholder.png exists
    const img = new Image()
    img.src = "/placeholder.png"

    img.onerror = () => {
      console.warn("Warning: /placeholder.png not found. This is used as a fallback for missing images.")
    }
  }, [])

  // This component doesn't render anything
  return null
}
