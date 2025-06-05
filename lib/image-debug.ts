/**
 * Utility functions for debugging image issues
 */

// Log image loading attempts
export function logImageLoad(src: string, component: string): void {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
    console.log(`[${component}] Loading image: ${src}`)
  }
}

// Log image loading errors with detailed information
export function logImageError(src: string, component: string, error?: any): void {
  if (typeof window !== "undefined") {
    console.error(`[${component}] Failed to load image: ${src}`, error)

    // Collect environment information
    const info = {
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      connection: navigator.connection
        ? {
            effectiveType: (navigator.connection as any).effectiveType,
            downlink: (navigator.connection as any).downlink,
            rtt: (navigator.connection as any).rtt,
          }
        : "Not available",
      timestamp: new Date().toISOString(),
    }

    console.error("Environment:", info)
  }
}

// Check if an image exists by preloading it
export function checkImageExists(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (!url) {
      resolve(false)
      return
    }

    // For data URLs, assume they exist
    if (url.startsWith("data:")) {
      resolve(true)
      return
    }

    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
}

// Generate a data URL fallback image
export function generateFallbackImage(width: number, height: number, text: string): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${Math.max(14, Math.min(width, height) / 10)}px" fill="#888">${text}</text>
    </svg>
  `

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}
