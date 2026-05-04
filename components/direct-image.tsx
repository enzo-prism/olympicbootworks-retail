import type React from "react"
import { standardizePath } from "@/lib/image-utils"

interface DirectImageProps {
  src: string | null | undefined
  alt: string
  width?: string | number
  height?: string | number
  className?: string
  style?: React.CSSProperties
  fallbackSrc?: string
}

export default function DirectImage({
  src,
  alt,
  width = "auto",
  height = "auto",
  className = "",
  style = {},
  fallbackSrc = "/placeholder.png",
}: DirectImageProps) {
  // Standardize the path
  const standardizedSrc = standardizePath(src || fallbackSrc)

  return (
    <img
      src={standardizedSrc || fallbackSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
    />
  )
}
