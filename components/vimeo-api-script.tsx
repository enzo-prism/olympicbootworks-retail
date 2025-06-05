"use client"

import { useEffect } from "react"
import Script from "next/script"

export default function VimeoApiScript() {
  useEffect(() => {
    // Create a global callback function
    window.onVimeoApiReady = () => {
      console.log("Vimeo API loaded")
    }
  }, [])

  return (
    <Script
      src="https://player.vimeo.com/api/player.js"
      strategy="beforeInteractive"
      onLoad={() => {
        if (typeof window.onVimeoApiReady === "function") {
          window.onVimeoApiReady()
        }
      }}
    />
  )
}
