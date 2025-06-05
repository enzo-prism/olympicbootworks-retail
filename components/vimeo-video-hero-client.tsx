"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface VimeoVideoHeroClientProps {
  videoId: string
  title: string
  subtitle?: string
  children?: React.ReactNode
  height?: string
  overlayOpacity?: number
}

export default function VimeoVideoHeroClient({
  videoId,
  title,
  subtitle,
  children,
  height = "100vh",
  overlayOpacity = 0.5,
}: VimeoVideoHeroClientProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<HTMLIFrameElement>(null)
  const vimeoPlayerRef = useRef<any>(null)

  useEffect(() => {
    const loadVimeoPlayer = async () => {
      try {
        if (!window.Vimeo?.Player) {
          console.warn("Vimeo Player API not loaded")
          return
        }

        if (playerRef.current && !vimeoPlayerRef.current) {
          const player = new window.Vimeo.Player(playerRef.current)
          vimeoPlayerRef.current = player

          player.on("loaded", () => {
            setIsLoaded(true)
            player.setVolume(0)
            player.play().catch((err) => console.error("Error playing video:", err))
          })

          player.on("play", () => {
            setIsPlaying(true)
          })

          player.on("pause", () => {
            setIsPlaying(false)
          })

          player.on("volumechange", (event: any) => {
            setIsMuted(event.volume === 0)
          })

          player.on("error", (err: any) => {
            console.error("Vimeo player error:", err)
          })
        }
      } catch (error) {
        console.error("Error initializing Vimeo player:", error)
      }
    }

    loadVimeoPlayer()

    return () => {
      if (vimeoPlayerRef.current) {
        vimeoPlayerRef.current.destroy().catch((err: any) => {
          console.error("Error destroying Vimeo player:", err)
        })
        vimeoPlayerRef.current = null
      }
    }
  }, [])

  const togglePlay = () => {
    if (vimeoPlayerRef.current) {
      if (isPlaying) {
        vimeoPlayerRef.current.pause()
      } else {
        vimeoPlayerRef.current.play()
      }
    }
  }

  const toggleMute = () => {
    if (vimeoPlayerRef.current) {
      vimeoPlayerRef.current.setVolume(isMuted ? 1 : 0)
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video container */}
      <div className="absolute inset-0 w-full h-full">
        <iframe
          ref={playerRef}
          src={`https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&byline=0&title=0`}
          allow="autoplay; fullscreen; picture-in-picture"
          className="absolute w-full h-full top-0 left-0"
          style={{
            width: "100%",
            height: "100%",
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        ></iframe>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black z-10" style={{ opacity: overlayOpacity }}></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-white px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 animate-fade-in">{title}</h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-center max-w-3xl mx-auto mb-8 animate-fade-in-delayed">{subtitle}</p>
        )}
        <div className="animate-fade-in-delayed-more">{children}</div>
      </div>

      {/* Video controls */}
      <div
        className={`absolute bottom-4 right-4 z-30 flex gap-2 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={togglePlay}
          className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button
          onClick={toggleMute}
          className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </div>
  )
}
