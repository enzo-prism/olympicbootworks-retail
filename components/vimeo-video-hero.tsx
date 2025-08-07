import type React from "react"
import Script from "next/script"

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
}: VimeoVideoHeroProps) {
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
        className={`relative w-screen overflow-hidden flex items-center justify-center ${heightClasses[height]} ${className}`}
        style={{ maxWidth: "100vw", marginLeft: "calc(50% - 50vw)" }}
      >
        {/* Video Background Container */}
        <div className="absolute inset-0 w-full h-full bg-black z-0">
          <iframe
            src={`https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&dnt=1`}
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
            frameBorder="0"
          ></iframe>
        </div>

        {/* Enhanced Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80 z-[2]"
          style={{ opacity: overlayOpacity }}
        ></div>
        <div className="absolute inset-0 bg-black/30 z-[3]"></div>

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
      </div>
    </>
  )
}
