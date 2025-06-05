"use client"

import type React from "react"
import Script from "next/script"
import { useEffect, useRef, useState } from "react"
import "../app/components/video-background.css"

interface VimeoVideoHeroProps {
  title: string
  subtitle?: string
  children?: React.ReactNode
  videoId?: string
  overlayOpacity?: number
  height?: "small" | "medium" | "large" | "full"
  className?: string
}

export default function VimeoVideoHeroRobust({
  title,
  subtitle,
  children,
  videoId = "1085840202",
  overlayOpacity = 0.7, // Increased from 0.4 to 0.7 for better contrast
  height = "large",
  className = "",
}: VimeoVideoHeroProps) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Update window size on resize
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Set initial size
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Calculate video dimensions to ensure coverage
  const videoScale = Math.max(2, windowSize.width / windowSize.height > 16 / 9 ? 2 : 1.5)

  // Height classes based on the height prop
  const heightClasses = {
    small: "min-h-[40vh]",
    medium: "min-h-[60vh]",
    large: "min-h-[80vh]",
    full: "min-h-screen",
  }

  return (
    <>
      <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />

      <div
        ref={containerRef}
        className={`relative full-width-video-container flex items-center justify-center ${heightClasses[height]} ${className}`}
      >
        {/* Video Background Container */}
        <div className="absolute inset-0 w-full h-full bg-black vimeo-container">
          <iframe
            src={`https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&dnt=1`}
            allow="autoplay; fullscreen; picture-in-picture"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "177.77777778vh" /* 16:9 aspect ratio */,
              height: "56.25vw" /* 16:9 aspect ratio */,
              minWidth: "100%",
              minHeight: "100%",
              transform: "translate(-50%, -50%)",
              objectFit: "cover",
              pointerEvents: "none",
              zIndex: 1,
            }}
            aria-hidden="true"
            frameBorder="0"
            className="vimeo-fullwidth-iframe"
          ></iframe>
        </div>

        {/* Enhanced Overlay - Darker and with stronger gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80 z-[2]"
          style={{ opacity: overlayOpacity }}
        ></div>

        {/* Additional dark layer for better text contrast */}
        <div className="absolute inset-0 bg-black/30 z-[3]"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 py-12 flex flex-col items-center justify-center text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight drop-shadow-md">
              {title}
            </h1>

            {subtitle && (
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md">{subtitle}</p>
            )}

            {children && <div className="mt-8 w-full">{children}</div>}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-[5] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/60 to-transparent z-[5] pointer-events-none"></div>
      </div>
    </>
  )
}
