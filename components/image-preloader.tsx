"use client"

import { useEffect } from "react"

interface ImagePreloaderProps {
  imagePaths?: string[]
}

export default function ImagePreloader({
  imagePaths = [
    "/images/shop-exterior.jpg",
    "/ski-boot-fitting-station.png",
    "/images/buck-in-shop.jpg",
    "/images/fitting-process.jpg",
    "/images/fitting-process-2.jpg",
  ],
}: ImagePreloaderProps) {
  useEffect(() => {
    // Preload critical images
    imagePaths.forEach((path) => {
      if (!path) return

      const img = new Image()
      img.src = path

      // Log any errors for debugging
      img.onerror = () => {
        console.warn(`Failed to preload image: ${path}`)
      }
    })
  }, [imagePaths])

  // This component doesn't render anything
  return null
}
