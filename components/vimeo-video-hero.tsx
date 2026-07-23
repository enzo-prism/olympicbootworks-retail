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
  const rootRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  // The Vimeo iframe (~1.5MB of player JS + stream) is deferred until after
  // the window load event and an idle period, so it never competes with
  // above-the-fold work. The poster covers the gap.
  const [canMountVideo, setCanMountVideo] = useState(false)

  // Mirrors isPlaying so observer/event callbacks never read a stale closure.
  const isPlayingRef = useRef(false)
  // True while the user has explicitly paused via the toggle button; the
  // offscreen observer must not resume playback over an explicit pause.
  const userPausedRef = useRef(false)
  // True while playback is paused because the hero scrolled fully offscreen,
  // so re-entry only resumes a pause that the observer itself issued.
  const pausedByObserverRef = useRef(false)

  const postPlayerMessage = (method: "play" | "pause") => {
    iframeRef.current?.contentWindow?.postMessage(
      { method },
      "https://player.vimeo.com",
    )
  }

  const setPlaybackState = (playing: boolean) => {
    isPlayingRef.current = playing
    setIsPlaying(playing)
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches)
      // Preference changes remount (or remove) the iframe, so playback
      // bookkeeping starts fresh.
      userPausedRef.current = false
      pausedByObserverRef.current = false
      setPlaybackState(!mediaQuery.matches)
    }

    updatePreference()
    mediaQuery.addEventListener("change", updatePreference)
    return () => mediaQuery.removeEventListener("change", updatePreference)
  }, [])

  // Defer mounting the video until the page has fully loaded and the main
  // thread is idle (requestIdleCallback where available; Safari lacks it, so
  // fall back to a ~2500ms timeout).
  useEffect(() => {
    let cancelled = false
    let idleCallbackId: number | null = null
    let timeoutId: number | null = null

    const mountWhenIdle = () => {
      if (cancelled) return
      if (typeof window.requestIdleCallback === "function") {
        idleCallbackId = window.requestIdleCallback(
          () => {
            if (!cancelled) setCanMountVideo(true)
          },
          { timeout: 2500 },
        )
      } else {
        timeoutId = window.setTimeout(() => {
          if (!cancelled) setCanMountVideo(true)
        }, 2500)
      }
    }

    if (document.readyState === "complete") {
      mountWhenIdle()
    } else {
      window.addEventListener("load", mountWhenIdle, { once: true })
    }

    return () => {
      cancelled = true
      window.removeEventListener("load", mountWhenIdle)
      if (idleCallbackId !== null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleCallbackId)
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [])

  // Pause the background video while the hero is fully offscreen; resume on
  // re-entry only when the pause was ours (never over a manual pause).
  useEffect(() => {
    if (prefersReducedMotion || !canMountVideo) return
    if (typeof IntersectionObserver === "undefined") return
    const node = rootRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1]
        if (!entry) return
        if (!entry.isIntersecting) {
          if (isPlayingRef.current) {
            pausedByObserverRef.current = true
            postPlayerMessage("pause")
            setPlaybackState(false)
          }
        } else if (pausedByObserverRef.current && !userPausedRef.current) {
          pausedByObserverRef.current = false
          postPlayerMessage("play")
          setPlaybackState(true)
        }
      },
      { threshold: 0 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [prefersReducedMotion, canMountVideo])

  const togglePlayback = () => {
    const nextPlayingState = !isPlayingRef.current
    userPausedRef.current = !nextPlayingState
    if (nextPlayingState) {
      pausedByObserverRef.current = false
    }
    postPlayerMessage(nextPlayingState ? "play" : "pause")
    setPlaybackState(nextPlayingState)
  }

  const shouldMountVideo = !prefersReducedMotion && canMountVideo

  // Height classes based on the height prop
  const heightClasses = {
    small: "min-h-[40vh]",
    medium: "min-h-[60vh]",
    large: "min-h-[80vh]",
    full: "min-h-screen",
  }

  return (
    <div
        ref={rootRef}
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
          {shouldMountVideo && (
            <>
              {/* React 19 hoists these into <head>; rendered only once the
                  component has committed to mounting the video. */}
              <link rel="preconnect" href="https://player.vimeo.com" />
              <link rel="preconnect" href="https://f.vimeocdn.com" />
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
                onLoad={() => {
                  // The iframe autoplays; if state already says paused by the
                  // time the player is ready (e.g. the hero scrolled fully
                  // offscreen before the player loaded), re-assert the pause.
                  if (!isPlayingRef.current) {
                    postPlayerMessage("pause")
                  }
                }}
              />
            </>
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

        {shouldMountVideo && (
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
