import type React from "react"
import { standardizePath } from "@/lib/image-utils"

interface DirectImageProps {
  src: string | null | undefined
  alt: string
  width?: string | number
  height?: string | number
  className?: string
  style?: React.CSSProperties
}

export default function DirectImage({
  src,
  alt,
  width = "auto",
  height = "auto",
  className = "",
  style = {},
}: DirectImageProps) {
  // Standardize the path
  const standardizedSrc = standardizePath(src || "")

  return (
    <img
      src={standardizedSrc || "/placeholder.png"}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
    />
  )
}
