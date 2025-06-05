"use client"

import type React from "react"

import { useEffect, useState } from "react"
import VimeoVideoHero from "./vimeo-video-hero"
import VimeoVideoHeroRobust from "./vimeo-video-hero-robust"

/**
 * AdaptiveVideoHero selects the appropriate video hero implementation based on browser detection.
 * Both implementations now support full viewport width video backgrounds.
 */
interface AdaptiveVideoHeroProps {
  title: string
  subtitle?: string
  children?: React.ReactNode
  videoId?: string
  overlayOpacity?: number
  height?: "small" | "medium" | "large" | "full"
  className?: string
}

export default function AdaptiveVideoHero(props: AdaptiveVideoHeroProps) {
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    // Detect Safari
    const isSafariBrowser =
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || /iPad|iPhone|iPod/.test(navigator.userAgent)

    setIsSafari(isSafariBrowser)
  }, [])

  // Use the robust version for Safari, standard for others
  return isSafari ? <VimeoVideoHeroRobust {...props} /> : <VimeoVideoHero {...props} />
}
