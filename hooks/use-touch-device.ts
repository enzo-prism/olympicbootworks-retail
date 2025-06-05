"use client"

import { useState, useEffect } from "react"

export function useTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Check if device supports touch events
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0,
      )
    }

    checkTouch()

    // Also check on resize as some devices can switch between touch/non-touch
    window.addEventListener("resize", checkTouch)

    return () => {
      window.removeEventListener("resize", checkTouch)
    }
  }, [])

  return isTouchDevice
}
