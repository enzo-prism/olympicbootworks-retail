"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Script from "next/script"
import { cn } from "@/lib/utils"
import EnhancedImage from "@/components/enhanced-image"

interface YouTubeVideoHeroProps {
  title: string
  subtitle?: string
  videoId: string
  height?: "small" | "medium" | "large"
  overlay?: boolean
  children?: React.ReactNode
  fallbackImage?: string
}

// Declare the YT variable to avoid TypeScript errors
declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export default function YouTubeVideoHero({
  title,
  subtitle,
  videoId,
  height = "large",
  overlay = true,
  children,
  fallbackImage = `/placeholder.svg?height=1080&width=1920&query=video thumbnail for ${videoId}`,
}: YouTubeVideoHeroProps) {
  const [isApiReady, setIsApiReady] = useState(false)
  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const [isApiError, setIsApiError] = useState(false)
  const playerRef = useRef<YT.Player | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const apiTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const heightClasses = {
    small: "min-h-[50vh]",
    medium: "min-h-[70vh]",
    large: "min-h-[90vh]",
  }

  // Initialize YouTube API with improved error handling
  useEffect(() => {
    if (!isApiReady) return

    // Clear any existing timeout
    if (apiTimeoutRef.current) {
      clearTimeout(apiTimeoutRef.current)
    }

    // Set a longer timeout to detect API loading failures
    apiTimeoutRef.current = setTimeout(() => {
      if (!isPlayerReady) {
        console.error("YouTube API failed to initialize within timeout")
        setIsApiError(true)
      }
    }, 15000) // Increased to 15 seconds from 10 seconds

    // Check if YT is already available (might be loaded from another component)
    if (window.YT && window.YT.Player) {
      initializePlayer()
      return
    }

    // Define the onYouTubeIframeAPIReady function
    window.onYouTubeIframeAPIReady = initializePlayer

    // Load YouTube API if not already loaded
    if (!document.getElementById("youtube-iframe-api")) {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      tag.id = "youtube-iframe-api"
      const firstScriptTag = document.getElementsByTagName("script")[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy()
      }

      // Clear timeout on cleanup
      if (apiTimeoutRef.current) {
        clearTimeout(apiTimeoutRef.current)
      }
    }
  }, [videoId, isApiReady])

  // Add this function to handle player initialization
  const initializePlayer = () => {
    if (!containerRef.current) return

    try {
      // Remove any existing player element
      const existingPlayer = document.getElementById("youtube-player")
      if (existingPlayer) {
        existingPlayer.remove()
      }

      const playerDiv = document.createElement("div")
      playerDiv.id = "youtube-player"
      containerRef.current.appendChild(playerDiv)

      playerRef.current = new window.YT.Player("youtube-player", {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          loop: 1,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          showinfo: 0,
          mute: 1,
          playlist: videoId, // Required for looping
        },
        events: {
          onReady: (event) => {
            event.target.playVideo()
            event.target.mute()
            setIsPlayerReady(true)

            // Clear timeout when player is ready
            if (apiTimeoutRef.current) {
              clearTimeout(apiTimeoutRef.current)
            }

            // Adjust player size
            handleResize()
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.playVideo()
            }
          },
          onError: (event) => {
            console.error("YouTube player error:", event.data)
            setIsApiError(true)

            // Clear timeout on error
            if (apiTimeoutRef.current) {
              clearTimeout(apiTimeoutRef.current)
            }
          },
        },
      })

      // Add resize handler
      const handleResize = () => {
        if (!containerRef.current || !playerRef.current) return

        const containerWidth = containerRef.current.offsetWidth
        const containerHeight = containerRef.current.offsetHeight

        // Calculate the size to maintain aspect ratio and cover the container
        const aspectRatio = 16 / 9
        let width = containerWidth
        let height = containerWidth / aspectRatio

        if (height < containerHeight) {
          height = containerHeight
          width = containerHeight * aspectRatio
        }

        playerRef.current.setSize(width, height)

        // Center the player
        const playerElement = document.getElementById("youtube-player")
        if (playerElement) {
          playerElement.style.position = "absolute"
          playerElement.style.left = `${(containerWidth - width) / 2}px`
          playerElement.style.top = `${(containerHeight - height) / 2}px`
        }
      }

      window.addEventListener("resize", handleResize)
    } catch (error) {
      console.error("Error initializing YouTube player:", error)
      setIsApiError(true)

      // Clear timeout on error
      if (apiTimeoutRef.current) {
        clearTimeout(apiTimeoutRef.current)
      }
    }
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (apiTimeoutRef.current) {
        clearTimeout(apiTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className={cn("relative w-full overflow-hidden flex items-center justify-center", heightClasses[height])}>
      {/* YouTube API Script */}
      <Script
        src="https://www.youtube.com/iframe_api"
        strategy="lazyOnload"
        onLoad={() => {
          console.log("YouTube API script loaded")
          setIsApiReady(true)
        }}
        onError={() => {
          console.error("YouTube API script failed to load")
          setIsApiError(true)
        }}
      />

      {/* Video Container or Fallback Image */}
      {isApiError ? (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <div className="w-full h-full">
            <EnhancedImage
              src={fallbackImage}
              alt={`Thumbnail for ${title}`}
              fill
              className="object-cover"
              priority
              fallbackSrc="/video-thumbnail.png"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div
                className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm cursor-pointer hover:bg-white/30 hover:scale-110 transition-all duration-300"
                onClick={() => window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white fill-white" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden bg-gray-900" />
      )}

      {/* Overlay */}
      {overlay && <div className="absolute inset-0 bg-black/40 z-10" />}

      {/* Content - Centered both vertically and horizontally */}
      <div className="relative z-20 container mx-auto px-4 py-8 flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-slideUp">{title}</h1>
        {subtitle && (
          <p className="text-xl md:text-2xl max-w-2xl mb-8 animate-slideUp" style={{ animationDelay: "0.1s" }}>
            Performance Solutions for Skiers, Pickleball Players & Outdoor Enthusiasts
          </p>
        )}
        <div
          className="w-full flex flex-col items-center justify-center animate-slideUp"
          style={{ animationDelay: "0.2s" }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
