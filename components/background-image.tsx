import type React from "react"
import { standardizePath } from "@/lib/image-utils"
import { cn } from "@/lib/utils"

interface BackgroundImageProps {
  src: string
  alt: string
  children?: React.ReactNode
  className?: string
  overlayColor?: string
  overlayOpacity?: number
}

export default function BackgroundImage({
  src,
  alt,
  children,
  className,
  overlayColor = "black",
  overlayOpacity = 0.5,
}: BackgroundImageProps) {
  // Standardize the path
  const standardizedSrc = standardizePath(src)

  return (
    <div className={cn("relative overflow-hidden", className)} aria-label={alt}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${standardizedSrc})` }}
      />

      <div
        className="absolute inset-0"
        style={{
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  )
}
