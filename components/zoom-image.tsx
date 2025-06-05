"use client"

import { useState } from "react"
import StandardImage from "./standard-image"
import { cn } from "@/lib/utils"

interface ZoomImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  zoomFactor?: number
  className?: string
}

export default function ZoomImage({ src, alt, width, height, zoomFactor = 1.5, className }: ZoomImageProps) {
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <div className="relative overflow-hidden cursor-zoom-in" onClick={() => setIsZoomed(!isZoomed)}>
      <StandardImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn("transition-transform duration-300", isZoomed && `scale-[${zoomFactor}]`, className)}
      />
    </div>
  )
}
