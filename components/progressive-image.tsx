"use client"
import StandardImage from "./standard-image"
import type { ImageProps } from "next/image"

interface ProgressiveImageProps extends Omit<ImageProps, "src"> {
  lowQualitySrc?: string
  highQualitySrc: string
}

export default function ProgressiveImage({
  lowQualitySrc,
  highQualitySrc,
  priority = false,
  ...props
}: ProgressiveImageProps) {
  // If priority is true, we skip the low quality image
  const src = priority ? highQualitySrc : lowQualitySrc || highQualitySrc

  return <StandardImage src={src || "/placeholder.png"} priority={priority} {...props} />
}
