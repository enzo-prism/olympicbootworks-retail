"use client"

import type React from "react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Pause, Play } from "lucide-react"

interface VimeoVideoHeroProps {
  title?: string
  subtitle?: string
  children?: React.ReactNode
  videoId?: string
  overlayOpacity?: number
  height?: "small" | "medium" | "large" | "full"
  className?: string
  /**
   * When provided, the hero will render this content instead of the default
   * title/subtitle/children stack. This gives full control of above-the-fold
   * composition while keeping the video background and overlay behavior.
   */
  customContent?: React.ReactNode
  /**
   * Static poster shown beneath the video: paints immediately on first load
   * (no black-box before hydration) and is the permanent backdrop for
   * reduced-motion visitors, who never get the iframe.
   */
  posterSrc?: string
  posterAlt?: string
}

export default function VimeoVideoHero({
  title = "",
  subtitle,
  children,
  videoId = "1096995547",
  overlayOpacity = 0.7,
  height = "large",
  className = "",
  customContent,
  posterSrc,
  posterAlt = "",
}: VimeoVideoHeroProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches)
      setIsPlaying(!mediaQuery.matches)
    }

    updatePreference()
    mediaQuery.addEventListener("change", updatePreference)
    return () => mediaQuery.removeEventListener("change", updatePreference)
  }, [])

  const togglePlayback = () => {
    const nextPlayingState = !isPlaying
    iframeRef.current?.contentWindow?.postMessage(
      { method: nextPlayingState ? "play" : "pause" },
      "https://player.vimeo.com",
    )
    setIsPlaying(nextPlayingState)
  }

  // Height classes based on the height prop
  const heightClasses = {
    small: "min-h-[40vh]",
    medium: "min-h-[60vh]",
    large: "min-h-[80vh]",
    full: "min-h-screen",
  }

  return (
    <div
        className={`relative w-full overflow-hidden flex items-center justify-center ${heightClasses[height]} ${className}`}
      >
        {/* Video Background Container */}
        <div className="absolute inset-0 w-full h-full bg-ink z-0">
          {posterSrc && (
            <Image
              src={posterSrc}
              alt={posterAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
          {!prefersReducedMotion && (
            <iframe
              ref={iframeRef}
              src={`https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&dnt=1&api=1`}
              allow="autoplay; fullscreen; picture-in-picture"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "177.77777778vh" /* 16:9 aspect ratio coverage */,
                height: "56.25vw" /* 16:9 aspect ratio coverage */,
                minWidth: "100%",
                minHeight: "100%",
                transform: "translate(-50%, -50%)",
                objectFit: "cover",
                pointerEvents: "none",
                zIndex: 1,
              }}
              aria-hidden="true"
              title="Decorative background video"
            />
          )}
        </div>

        {/* Overlay — single gradient scrim, darkest where the text sits */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink/80 z-[2]"
          style={{ opacity: overlayOpacity }}
        ></div>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-6 py-12 flex flex-col items-center justify-center text-center">
          <div className="max-w-4xl mx-auto">
            {customContent ? (
              customContent
            ) : (
              <>
                {title && (
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-lg">
                    {subtitle}
                  </p>
                )}
                {children && <div className="mt-8 w-full relative z-20">{children}</div>}
              </>
            )}
          </div>
        </div>

        {/* Edge gradients */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-[5] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/60 to-transparent z-[5] pointer-events-none"></div>

        {!prefersReducedMotion && (
          <button
            type="button"
            onClick={togglePlayback}
            className="absolute bottom-6 right-6 z-30 inline-flex items-center gap-2 rounded-full border border-white/60 bg-black/60 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {isPlaying ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
            {isPlaying ? "Pause background video" : "Play background video"}
          </button>
        )}
      </div>
  )
}
