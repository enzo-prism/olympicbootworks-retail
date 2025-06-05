"use client"

import StandardImage from "./standard-image"
import { cn } from "@/lib/utils"
import { Play } from "lucide-react"

interface VideoFallbackProps {
  thumbnailSrc: string
  alt: string
  width?: number
  height?: number
  className?: string
  onPlay?: () => void
}

export default function VideoFallback({ thumbnailSrc, alt, width, height, className, onPlay }: VideoFallbackProps) {
  return (
    <div className={cn("relative cursor-pointer group", className)} onClick={onPlay}>
      <StandardImage src={thumbnailSrc} alt={alt} width={width} height={height} className="w-full h-auto" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black bg-opacity-50 rounded-full p-4 group-hover:bg-opacity-70 transition-all">
          <Play size={24} className="text-white" />
        </div>
      </div>
    </div>
  )
}
