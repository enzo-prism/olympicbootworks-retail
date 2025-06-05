"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import EnhancedImage from "@/components/enhanced-image"
import { cn } from "@/lib/utils"

interface SimpleYouTubeEmbedProps {
  videoId: string
  title: string
  className?: string
  aspectRatio?: "square" | "video" | "portrait" | "landscape"
  thumbnailQuality?: "default" | "hqdefault" | "mqdefault" | "sddefault" | "maxresdefault"
  autoplay?: boolean
}

export default function SimpleYouTubeEmbed({
  videoId,
  title,
  className,
  aspectRatio = "video",
  thumbnailQuality = "maxresdefault",
  autoplay = true,
}: SimpleYouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Get aspect ratio class
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square"
      case "video":
        return "aspect-video"
      case "portrait":
        return "aspect-[3/4]"
      case "landscape":
        return "aspect-[4/3]"
      default:
        return "aspect-video"
    }
  }

  // YouTube thumbnail URL
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${thumbnailQuality}.jpg`

  // YouTube embed URL with parameters
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&autoplay=${autoplay ? "1" : "0"}&mute=1`

  return (
    <div className={cn("relative overflow-hidden rounded-lg", getAspectRatioClass(), className)}>
      {!isPlaying ? (
        // Thumbnail with play button
        <div
          className="w-full h-full cursor-pointer"
          onClick={() => setIsPlaying(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <EnhancedImage
            src={thumbnailUrl}
            alt={title}
            fill
            className={cn("object-cover transition-transform duration-300", isHovered && "scale-105")}
            fallbackSrc={`/placeholder.svg?height=720&width=1280&query=${encodeURIComponent(title)}`}
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div
              className={cn(
                "flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300",
                isHovered ? "scale-110 bg-white/30" : "scale-100",
              )}
            >
              <Play className="h-8 w-8 text-white fill-white" />
            </div>
          </div>
        </div>
      ) : (
        // YouTube iframe
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full border-0"
        ></iframe>
      )}
    </div>
  )
}
